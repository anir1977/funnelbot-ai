import { redirect } from "next/navigation";
import SettingsClient from "@/components/dashboard/SettingsClient";
import { createClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: stores } = await supabase
    .from("stores")
    .select("id, name, whatsapp_number, active, bot_tone, welcome_message, updated_at")
    .eq("user_id", user.id)
    .order("created_at")
    .limit(1);

  const store = stores?.[0] ?? null;
  if (!store) redirect("/onboarding");

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [
    { count: activeProducts },
    { count: deliveryZones },
    { count: activeFaqs },
    { count: totalConversations },
    { count: unreadConversations },
    { count: ordersThisMonth },
    { count: conversationsToday },
  ] = await Promise.all([
    supabase
      .from("products")
      .select("id", { count: "exact", head: true })
      .eq("store_id", store.id)
      .eq("active", true),
    supabase
      .from("delivery_zones")
      .select("id", { count: "exact", head: true })
      .eq("store_id", store.id)
      .eq("active", true),
    supabase
      .from("faqs")
      .select("id", { count: "exact", head: true })
      .eq("store_id", store.id)
      .eq("active", true),
    supabase
      .from("conversations")
      .select("id", { count: "exact", head: true })
      .eq("store_id", store.id),
    supabase
      .from("conversations")
      .select("id", { count: "exact", head: true })
      .eq("store_id", store.id)
      .gt("unread_count", 0),
    supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .eq("store_id", store.id)
      .gte("created_at", startOfMonth.toISOString()),
    supabase
      .from("conversations")
      .select("id", { count: "exact", head: true })
      .eq("store_id", store.id)
      .gte("created_at", startOfDay.toISOString()),
  ]);

  return (
    <SettingsClient
      store={store}
      stats={{
        activeProducts: activeProducts ?? 0,
        deliveryZones: deliveryZones ?? 0,
        activeFaqs: activeFaqs ?? 0,
        totalConversations: totalConversations ?? 0,
        unreadConversations: unreadConversations ?? 0,
        ordersThisMonth: ordersThisMonth ?? 0,
        conversationsToday: conversationsToday ?? 0,
      }}
    />
  );
}
