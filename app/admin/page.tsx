import Link from "next/link";
import {
  Inbox,
  FolderKanban,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const money = (value: number) =>
  new Intl.NumberFormat("fr-MA", { maximumFractionDigits: 0 }).format(value);

const shortDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });

/** Days from today until a date; negative once it has passed. */
const daysUntil = (date: string) =>
  Math.ceil(
    (new Date(date).getTime() - new Date().setHours(0, 0, 0, 0)) / 86_400_000
  );

export default async function AdminHome() {
  const supabase = await createClient();

  const [{ data: leads }, { data: projects }] = await Promise.all([
    supabase
      .from("leads")
      .select("id, created_at, nom, telephone, activite, status")
      .order("created_at", { ascending: false }),
    supabase
      .from("projects")
      .select("id, business_name, status, amount_mad, domain, domain_expires_on"),
  ]);

  const allLeads = leads ?? [];
  const allProjects = projects ?? [];

  const weekAgo = Date.now() - 7 * 86_400_000;
  const newLeads = allLeads.filter((l) => l.status === "nouveau").length;
  const thisWeek = allLeads.filter(
    (l) => new Date(l.created_at).getTime() > weekAgo
  ).length;

  const won = allLeads.filter((l) => l.status === "client").length;
  const conversion = allLeads.length
    ? Math.round((won / allLeads.length) * 100)
    : 0;

  const active = allProjects.filter((p) =>
    ["en_cours", "livre", "maintenance"].includes(p.status)
  );
  const revenue = allProjects
    .filter((p) => p.status !== "prospect" && p.status !== "archive")
    .reduce((sum, p) => sum + Number(p.amount_mad ?? 0), 0);

  // Anything expiring inside two months, soonest first. An expired domain
  // takes the client's site offline, so these lead the page.
  const renewals = allProjects
    .filter((p) => p.domain_expires_on && daysUntil(p.domain_expires_on) <= 60)
    .sort(
      (a, b) => daysUntil(a.domain_expires_on!) - daysUntil(b.domain_expires_on!)
    );

  const cards = [
    { label: "Demandes non traitées", value: String(newLeads), sub: `${thisWeek} cette semaine`, icon: Inbox, href: "/admin/leads" },
    { label: "Projets actifs", value: String(active.length), sub: `${allProjects.length} au total`, icon: FolderKanban, href: "/admin/projets" },
    { label: "Chiffre d'affaires", value: `${money(revenue)} DH`, sub: "projets non archivés", icon: TrendingUp, href: "/admin/projets" },
    { label: "Taux de conversion", value: `${conversion} %`, sub: `${won} demandes gagnées`, icon: TrendingUp, href: "/admin/leads" },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-[26px] font-black text-slate-900 tracking-tight mb-1">
        Vue d'ensemble
      </h1>
      <p className="text-slate-500 text-[14px] mb-8">
        L'état de votre activité en un coup d'œil.
      </p>

      {/* Renewals first — the only thing here that breaks a live site */}
      {renewals.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
          <div className="flex items-center gap-2.5 mb-4">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h2 className="font-bold text-amber-900 text-[14px]">
              Renouvellements à surveiller
            </h2>
          </div>
          <div className="space-y-2.5">
            {renewals.map((p) => {
              const left = daysUntil(p.domain_expires_on!);
              return (
                <div
                  key={p.id}
                  className="flex flex-wrap items-center justify-between gap-2 bg-white rounded-xl px-4 py-3 border border-amber-100"
                >
                  <div>
                    <span className="font-bold text-slate-900 text-[14px]">
                      {p.business_name}
                    </span>
                    {p.domain && (
                      <span className="text-slate-400 text-[13px] ml-2">{p.domain}</span>
                    )}
                  </div>
                  <span
                    className={`text-[12.5px] font-bold px-3 py-1 rounded-full ${
                      left < 0
                        ? "bg-red-100 text-red-700"
                        : left <= 14
                        ? "bg-amber-100 text-amber-800"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {left < 0
                      ? `Expiré depuis ${Math.abs(left)} j`
                      : left === 0
                      ? "Expire aujourd'hui"
                      : `Dans ${left} jours`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.label}
              href={c.href}
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 hover:shadow-md transition-all"
            >
              <Icon className="w-4 h-4 text-slate-400 mb-4" />
              <div className="text-[26px] font-black text-slate-900 leading-none mb-2 tracking-tight">
                {c.value}
              </div>
              <div className="text-[13px] font-semibold text-slate-700">{c.label}</div>
              <div className="text-[12px] text-slate-400 mt-0.5">{c.sub}</div>
            </Link>
          );
        })}
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-slate-900 text-[16px]">Dernières demandes</h2>
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-[13px] font-semibold"
        >
          Tout voir
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {allLeads.length === 0 ? (
        <div className="border border-dashed border-slate-300 rounded-2xl py-14 text-center">
          <Inbox className="w-7 h-7 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-[14px]">
            Aucune demande pour l'instant.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100">
          {allLeads.slice(0, 6).map((l) => (
            <div key={l.id} className="flex items-center justify-between gap-4 px-5 py-3.5">
              <div className="min-w-0">
                <div className="font-semibold text-slate-900 text-[14px] truncate">
                  {l.nom || "Sans nom"}
                  {l.activite && (
                    <span className="text-slate-400 font-normal"> · {l.activite}</span>
                  )}
                </div>
                <div className="text-slate-400 text-[12.5px]">
                  {l.telephone || "—"} · {shortDate(l.created_at)}
                </div>
              </div>
              {l.status === "nouveau" && (
                <span className="shrink-0 bg-blue-50 text-blue-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-blue-200">
                  Nouveau
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
