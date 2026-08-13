import { FolderKanban, Globe, Trash2, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { createProject, updateProjectStatus, deleteProject } from "../actions";

export const dynamic = "force-dynamic";

type Project = {
  id: string;
  business_name: string;
  client_name: string | null;
  sector: string | null;
  phone: string | null;
  plan: string | null;
  amount_mad: number | string | null;
  site_url: string | null;
  domain: string | null;
  domain_expires_on: string | null;
  status: string;
  notes: string | null;
};

const STATUSES = [
  { key: "prospect", label: "Prospect", style: "bg-slate-100 text-slate-600 border-slate-200" },
  { key: "en_cours", label: "En cours", style: "bg-blue-50 text-blue-700 border-blue-200" },
  { key: "livre", label: "Livré", style: "bg-green-50 text-green-700 border-green-200" },
  { key: "maintenance", label: "Maintenance", style: "bg-violet-50 text-violet-700 border-violet-200" },
  { key: "archive", label: "Archivé", style: "bg-slate-100 text-slate-400 border-slate-200" },
];

const styleFor = (key: string) =>
  STATUSES.find((s) => s.key === key)?.style ?? STATUSES[0].style;

const labelFor = (key: string) =>
  STATUSES.find((s) => s.key === key)?.label ?? key;

const daysUntil = (date: string) =>
  Math.ceil(
    (new Date(date).getTime() - new Date().setHours(0, 0, 0, 0)) / 86_400_000
  );

const field =
  "w-full h-11 bg-white border border-slate-200 rounded-xl px-3.5 text-[14px] text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all";

const labelCls = "block text-[12.5px] font-semibold text-slate-700 mb-1.5";

export default async function ProjectsPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select(
      "id, business_name, client_name, sector, phone, plan, amount_mad, site_url, domain, domain_expires_on, status, notes"
    )
    .order("created_at", { ascending: false });

  const projects = (data ?? []) as Project[];

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-[26px] font-black text-slate-900 tracking-tight mb-1">
          Projets clients
        </h1>
        <p className="text-slate-500 text-[14px]">
          Les sites vendus et livrés, avec les échéances de domaine à ne pas manquer.
        </p>
      </div>

      {/* New project */}
      <details className="bg-white border border-slate-200 rounded-2xl mb-8 group">
        <summary className="flex items-center gap-2.5 px-5 py-4 cursor-pointer list-none font-semibold text-slate-900 text-[15px]">
          <Plus className="w-4 h-4 text-blue-600 transition-transform group-open:rotate-45" />
          Ajouter un projet
        </summary>

        <form action={createProject} className="px-5 pb-5 pt-1 border-t border-slate-100">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <div>
              <label className={labelCls}>Nom de l'entreprise *</label>
              <input name="business_name" required placeholder="Café Atlas" className={field} />
            </div>
            <div>
              <label className={labelCls}>Contact</label>
              <input name="client_name" placeholder="Youssef Alami" className={field} />
            </div>
            <div>
              <label className={labelCls}>Téléphone</label>
              <input name="phone" placeholder="06 00 00 00 00" className={field} />
            </div>
            <div>
              <label className={labelCls}>Email</label>
              <input name="email" type="email" placeholder="contact@client.ma" className={field} />
            </div>
            <div>
              <label className={labelCls}>Secteur</label>
              <input name="sector" placeholder="Café / Restaurant" className={field} />
            </div>
            <div>
              <label className={labelCls}>Formule</label>
              <select name="plan" className={field} defaultValue="Professionnel">
                <option>Starter</option>
                <option>Professionnel</option>
                <option>Premium</option>
                <option>Sur mesure</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Montant (MAD)</label>
              <input name="amount_mad" inputMode="decimal" placeholder="2490" className={field} />
            </div>
            <div>
              <label className={labelCls}>Adresse du site</label>
              <input name="site_url" placeholder="https://cafe-atlas.ma" className={field} />
            </div>
            <div>
              <label className={labelCls}>Nom de domaine</label>
              <input name="domain" placeholder="cafe-atlas.ma" className={field} />
            </div>
            <div>
              <label className={labelCls}>Expiration du domaine</label>
              <input name="domain_expires_on" type="date" className={field} />
            </div>
            <div>
              <label className={labelCls}>Expiration de l'hébergement</label>
              <input name="hosting_expires_on" type="date" className={field} />
            </div>
            <div>
              <label className={labelCls}>Statut</label>
              <select name="status" className={field} defaultValue="en_cours">
                {STATUSES.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className={labelCls}>Notes</label>
            <textarea
              name="notes"
              rows={2}
              placeholder="Accès, particularités, engagements pris…"
              className={`${field} h-auto py-3 resize-none`}
            />
          </div>

          <button
            type="submit"
            className="mt-5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[14px] px-6 py-3 rounded-xl transition-colors"
          >
            Enregistrer le projet
          </button>
        </form>
      </details>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-[14px] rounded-xl p-4 mb-6">
          Lecture impossible : {error.message}
        </div>
      )}

      {projects.length === 0 && !error ? (
        <div className="border border-dashed border-slate-300 rounded-2xl py-20 text-center">
          <FolderKanban className="w-8 h-8 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-900 font-semibold text-[15px]">Aucun projet</p>
          <p className="text-slate-500 text-[13.5px] mt-1.5">
            Ajoutez votre premier client ci-dessus.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((p) => {
            const left = p.domain_expires_on ? daysUntil(p.domain_expires_on) : null;
            return (
              <div
                key={p.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-colors"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h2 className="font-bold text-slate-900 text-[16px]">
                        {p.business_name}
                      </h2>
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${styleFor(
                          p.status
                        )}`}
                      >
                        {labelFor(p.status)}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[12.5px] mt-1">
                      {[p.client_name, p.sector, p.phone].filter(Boolean).join(" · ") || "—"}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {p.amount_mad != null && (
                      <span className="font-black text-slate-900 text-[15px]">
                        {Number(p.amount_mad).toLocaleString("fr-MA")} DH
                      </span>
                    )}
                    {p.site_url && (
                      <a
                        href={p.site_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[13px] font-semibold px-3.5 py-2 rounded-lg transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        Ouvrir
                      </a>
                    )}
                  </div>
                </div>

                {(p.domain || p.plan) && (
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] mb-3">
                    {p.plan && <span className="text-slate-500">Formule {p.plan}</span>}
                    {p.domain && (
                      <span className="text-slate-700 font-medium">{p.domain}</span>
                    )}
                    {left !== null && (
                      <span
                        className={`text-[12px] font-bold px-2.5 py-1 rounded-full ${
                          left < 0
                            ? "bg-red-100 text-red-700"
                            : left <= 30
                            ? "bg-amber-100 text-amber-800"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {left < 0
                          ? `Domaine expiré depuis ${Math.abs(left)} j`
                          : `Renouvellement dans ${left} j`}
                      </span>
                    )}
                  </div>
                )}

                {p.notes && (
                  <p className="text-slate-600 text-[13.5px] leading-relaxed bg-slate-50 rounded-xl p-3.5 mb-4">
                    {p.notes}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
                  {STATUSES.filter((s) => s.key !== p.status).map((s) => (
                    <form key={s.key} action={updateProjectStatus}>
                      <input type="hidden" name="id" value={p.id} />
                      <input type="hidden" name="status" value={s.key} />
                      <button
                        type="submit"
                        className="text-[12px] font-semibold text-slate-600 bg-slate-50 hover:bg-slate-900 hover:text-white border border-slate-200 hover:border-slate-900 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        {s.label}
                      </button>
                    </form>
                  ))}

                  <form action={deleteProject} className="ml-auto">
                    <input type="hidden" name="id" value={p.id} />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-slate-400 hover:text-red-600 px-2.5 py-1.5 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Supprimer
                    </button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
