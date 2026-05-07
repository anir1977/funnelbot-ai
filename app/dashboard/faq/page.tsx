import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import FaqsClient from "@/components/dashboard/FaqsClient";

export default async function FAQPage() {
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

  const { data: faqs } = await supabase
    .from("faqs")
    .select("id, store_id, question, answer, hit_count, active, created_at")
    .eq("store_id", store.id)
    .order("created_at", { ascending: false });

  return <FaqsClient storeId={store.id} initialFaqs={faqs ?? []} />;
}
