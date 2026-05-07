import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ProductsClient from "@/components/dashboard/ProductsClient";

export default async function ProductsPage() {
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

  const { data: products } = await supabase
    .from("products")
    .select("id, name, description, price, stock, category, sizes, colors, image_url, active, created_at")
    .eq("store_id", store.id)
    .order("created_at", { ascending: false });

  return <ProductsClient storeId={store.id} initialProducts={products ?? []} />;
}
