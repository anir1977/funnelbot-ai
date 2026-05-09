import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  connectEvolutionInstance,
  createEvolutionInstance,
  deleteEvolutionInstance,
  getEvolutionState,
  instanceNameForStore,
  logoutEvolutionInstance,
  qrImageUrl,
} from "@/lib/evolution";

async function getOwnedStore(storeId?: string | null) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };

  const query = supabase.from("stores").select("id, name, whatsapp_number").eq("user_id", user.id).order("created_at");
  const { data, error } = storeId ? await query.eq("id", storeId).limit(1) : await query.limit(1);

  if (error) return { error: NextResponse.json({ error: error.message }, { status: 500 }) };
  const store = data?.[0];
  if (!store) return { error: NextResponse.json({ error: "Store not found" }, { status: 404 }) };
  return { store };
}

async function createDraftStore(body: any) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };

  const phone = String(body.phone || "").replace(/\D/g, "");
  const name = String(body.storeName || "").trim();
  const category = body.category || "general";

  if (!name || !phone) {
    return { error: NextResponse.json({ error: "Store name and phone are required." }, { status: 400 }) };
  }

  const { data, error } = await supabase
    .from("stores")
    .insert({
      user_id: user.id,
      name,
      business_type: category,
      city: "الدار البيضاء",
      whatsapp_number: phone.startsWith("212") ? phone : `212${phone.replace(/^0/, "")}`,
      bot_tone: "friendly",
      welcome_message: `Preferred language: ${body.language || "arabic"}`,
      active: true,
    })
    .select("id, name, whatsapp_number")
    .single();

  if (error) return { error: NextResponse.json({ error: error.message }, { status: 500 }) };
  return { store: data };
}

export async function GET(request: NextRequest) {
  const storeId = request.nextUrl.searchParams.get("storeId");
  const result = await getOwnedStore(storeId);
  if (result.error) return result.error;

  const instanceName = instanceNameForStore(result.store.id);
  try {
    const session = await getEvolutionState(instanceName);
    return NextResponse.json({ ...session, qrImage: null });
  } catch (error) {
    return NextResponse.json({
      instanceName,
      state: "not_created",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const result = body.storeId
    ? await getOwnedStore(body.storeId)
    : body.storeDraft
      ? await createDraftStore(body.storeDraft)
      : await getOwnedStore();
  if (result.error) return result.error;

  const instanceName = instanceNameForStore(result.store.id);
  try {
    const session = body.reconnect
      ? await connectEvolutionInstance(instanceName, result.store.whatsapp_number)
      : await createEvolutionInstance(result.store.id, result.store.whatsapp_number);

    return NextResponse.json({ ...session, storeId: result.store.id, qrImage: qrImageUrl(session.qrCode) });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not create WhatsApp session." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const result = await getOwnedStore(body.storeId);
  if (result.error) return result.error;

  const instanceName = instanceNameForStore(result.store.id);
  try {
    const action = body.action === "delete" ? "delete" : "logout";
    const data = action === "delete" ? await deleteEvolutionInstance(instanceName) : await logoutEvolutionInstance(instanceName);
    return NextResponse.json({ ok: true, action, data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not disconnect session." },
      { status: 500 },
    );
  }
}
