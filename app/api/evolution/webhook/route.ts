import { NextRequest, NextResponse } from "next/server";
import { buildBotReply } from "@/lib/bot-engine";
import { instanceNameForStore, sendEvolutionText } from "@/lib/evolution";
import { createAdminClient } from "@/lib/supabase/admin";
import { parseEvolutionWebhook } from "@/lib/whatsapp-message";

export const dynamic = "force-dynamic";

async function findStoreByInstance(supabase: ReturnType<typeof createAdminClient>, instanceName: string) {
  const { data, error } = await supabase.from("stores").select("id, name, bot_tone, welcome_message, active").eq("active", true);
  if (error) throw error;
  return (data ?? []).find((store) => instanceNameForStore(store.id) === instanceName) ?? null;
}

async function getOrCreateConversation(
  supabase: ReturnType<typeof createAdminClient>,
  storeId: string,
  customerPhone: string,
  customerName: string | null,
  timestamp: string,
) {
  const { data: existing, error: existingError } = await supabase
    .from("conversations")
    .select("id, unread_count")
    .eq("store_id", storeId)
    .eq("customer_phone", customerPhone)
    .maybeSingle();

  if (existingError) throw existingError;

  if (existing) {
    const { data, error } = await supabase
      .from("conversations")
      .update({ customer_name: customerName, last_message_at: timestamp, unread_count: (existing.unread_count ?? 0) + 1, status: "open" })
      .eq("id", existing.id)
      .select("id")
      .single();
    if (error) throw error;
    return data;
  }

  const { data, error } = await supabase
    .from("conversations")
    .insert({ store_id: storeId, customer_phone: customerPhone, customer_name: customerName, last_message_at: timestamp, unread_count: 1, status: "open" })
    .select("id")
    .single();

  if (error) throw error;
  return data;
}

export async function POST(request: NextRequest) {
  const secret = process.env.EVOLUTION_WEBHOOK_SECRET;
  if (secret && request.headers.get("authorization") !== secret) {
    return NextResponse.json({ error: "Unauthorized webhook." }, { status: 401 });
  }

  const payload = await request.json().catch(() => null);
  const incoming = parseEvolutionWebhook(payload);

  if (!incoming || incoming.fromMe || incoming.isGroup) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const supabase = createAdminClient();
  const store = await findStoreByInstance(supabase, incoming.instanceName);
  if (!store) {
    return NextResponse.json({ ok: false, error: "Store not found for instance." }, { status: 404 });
  }

  const conversation = await getOrCreateConversation(supabase, store.id, incoming.customerPhone, incoming.customerName, incoming.timestamp);

  const { error: userMessageError } = await supabase.from("messages").insert({
    conversation_id: conversation.id,
    role: "user",
    body: incoming.text,
    read: false,
    created_at: incoming.timestamp,
  });
  if (userMessageError) throw userMessageError;

  const [{ data: products }, { data: deliveryZones }, { data: faqs }, { data: messages }] = await Promise.all([
    supabase.from("products").select("id, name, description, price, stock, category, sizes, colors, image_url").eq("store_id", store.id).eq("active", true).order("created_at", { ascending: false }),
    supabase.from("delivery_zones").select("city, price, delivery_time, cod_enabled").eq("store_id", store.id).eq("active", true),
    supabase.from("faqs").select("id, question, answer, hit_count").eq("store_id", store.id).eq("active", true),
    supabase.from("messages").select("role, body, created_at").eq("conversation_id", conversation.id).order("created_at", { ascending: false }).limit(12),
  ]);

  const reply = await buildBotReply(supabase, {
    store,
    customerPhone: incoming.customerPhone,
    latestText: incoming.text,
    messages: ((messages ?? []).reverse() as any),
    products: (products ?? []) as any,
    deliveryZones: (deliveryZones ?? []) as any,
    faqs: (faqs ?? []) as any,
  });

  const { data: botMessage, error: botMessageError } = await supabase
    .from("messages")
    .insert({ conversation_id: conversation.id, role: "bot", body: reply, read: true })
    .select("created_at")
    .single();
  if (botMessageError) throw botMessageError;

  await supabase.from("conversations").update({ last_message_at: botMessage.created_at, updated_at: botMessage.created_at }).eq("id", conversation.id);

  try {
    await sendEvolutionText(incoming.instanceName, incoming.customerPhone, reply);
  } catch (error) {
    console.error("[evolution:webhook] send reply failed", error);
    return NextResponse.json({ ok: true, stored: true, sent: false });
  }

  return NextResponse.json({ ok: true, stored: true, sent: true });
}
