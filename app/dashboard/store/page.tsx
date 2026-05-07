import { redirect } from "next/navigation";
import StoreClient from "@/components/dashboard/StoreClient";
import { createClient } from "@/lib/supabase/server";

export default async function StorePage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: stores } = await supabase
    .from("stores")
    .select("id, name, business_type, city, whatsapp_number, bot_tone, welcome_message, active, updated_at")
    .eq("user_id", user.id)
    .order("created_at")
    .limit(1);

  const store = stores?.[0] ?? null;
  if (!store) redirect("/onboarding");

  return <StoreClient initialStore={store} />;
}
