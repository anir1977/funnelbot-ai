import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ConversationsClient from "@/components/dashboard/ConversationsClient";

export default async function ConversationsPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: stores } = await supabase
    .from("stores")
    .select("id")
    .eq("user_id", user.id)
    .order("created_at")
    .limit(1);

  const store = stores?.[0];
  if (!store) redirect("/onboarding");

  const { data: conversations } = await supabase
    .from("conversations")
    .select("id, store_id, customer_phone, customer_name, last_message_at, unread_count, status, created_at, updated_at")
    .eq("store_id", store.id)
    .order("last_message_at", { ascending: false });

  return (
    <ConversationsClient
      storeId={store.id}
      initialConversations={conversations ?? []}
    />
  );
}
