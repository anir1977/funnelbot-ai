import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DeliveryClient from "@/components/dashboard/DeliveryClient";

export default async function DeliveryPage() {
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

  const { data: zones } = await supabase
    .from("delivery_zones")
    .select("id, city, price, delivery_time, cod_enabled, active, created_at")
    .eq("store_id", store.id)
    .order("city");

  return <DeliveryClient storeId={store.id} initialZones={zones ?? []} />;
}
