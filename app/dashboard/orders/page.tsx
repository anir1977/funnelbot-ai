import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import OrdersClient from "@/components/dashboard/OrdersClient";

export default async function OrdersPage() {
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

  const [{ data: orders }, { data: products }] = await Promise.all([
    supabase
      .from("orders")
      .select("id, customer_name, customer_phone, customer_city, product_snapshot, quantity, unit_price, delivery_fee, total, status, notes, created_at")
      .eq("store_id", store.id)
      .order("created_at", { ascending: false })
      .limit(200),
    supabase
      .from("products")
      .select("id, name, price")
      .eq("store_id", store.id)
      .eq("active", true)
      .order("name"),
  ]);

  return <OrdersClient storeId={store.id} initialOrders={orders ?? []} initialProducts={products ?? []} />;
}
