import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { instanceNameForStore, sendEvolutionText } from "@/lib/evolution";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const conversationId = String(body.conversationId || "");
  const text = String(body.text || "").trim();

  if (!conversationId || !text) {
    return NextResponse.json({ error: "conversationId and text are required." }, { status: 400 });
  }

  const { data: conversation, error: conversationError } = await supabase
    .from("conversations")
    .select("id, store_id, customer_phone, stores!inner(id, user_id)")
    .eq("id", conversationId)
    .eq("stores.user_id", user.id)
    .single();

  if (conversationError || !conversation) {
    return NextResponse.json({ error: "Conversation not found." }, { status: 404 });
  }

  const { data: message, error: messageError } = await supabase
    .from("messages")
    .insert({ conversation_id: conversation.id, role: "agent", body: text, read: true })
    .select("id, conversation_id, role, body, read, created_at")
    .single();

  if (messageError) {
    return NextResponse.json({ error: messageError.message }, { status: 500 });
  }

  await supabase
    .from("conversations")
    .update({ last_message_at: message.created_at, updated_at: message.created_at })
    .eq("id", conversation.id);

  try {
    await sendEvolutionText(instanceNameForStore(conversation.store_id), conversation.customer_phone, text);
  } catch (error) {
    return NextResponse.json({
      message,
      warning: error instanceof Error ? error.message : "Saved locally, but WhatsApp send failed.",
    }, { status: 202 });
  }

  return NextResponse.json({ message });
}
