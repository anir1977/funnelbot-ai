import Link from "next/link";
import { redirect } from "next/navigation";
import { Inbox, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { LogoMark } from "@/components/agency/Logo";

export const metadata = {
  title: "Espace agence — FunnelsLibrary",
};

/**
 * Minimal back-office for the agency site.
 *
 * Deliberately separate from /dashboard, which belongs to the earlier WhatsApp
 * bot product and reads `profiles` and `stores` — tables the current Supabase
 * project does not have. Anything placed under there redirects to onboarding
 * and is never reached.
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-7">
              <Link href="/" className="flex items-center gap-2.5">
                <LogoMark className="w-8 h-8" />
                <span className="font-black text-slate-900 text-[15px] tracking-tight">
                  Espace agence
                </span>
              </Link>

              <nav className="flex items-center gap-1">
                <Link
                  href="/admin/leads"
                  className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-slate-700 hover:bg-slate-100 px-3 py-2 rounded-lg transition-colors"
                >
                  <Inbox className="w-4 h-4" />
                  Demandes
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <span className="hidden sm:block text-[13px] text-slate-400 truncate max-w-[220px]">
                {user.email}
              </span>
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate-500 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}
