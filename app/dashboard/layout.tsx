import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Shell from "@/components/dashboard/Shell";

export const metadata = {
  title: "لوحة التحكم — FunnelsLibrary",
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: profile }, { data: stores }] = await Promise.all([
    supabase.from("profiles").select("full_name, email, plan").eq("id", user.id).single(),
    supabase.from("stores").select("id, name, active, bot_tone").eq("user_id", user.id).order("created_at").limit(1),
  ]);

  const store = stores?.[0] ?? null;
  if (!store) redirect("/onboarding");

  return (
    <Shell profile={profile} store={store}>
      {children}
    </Shell>
  );
}
