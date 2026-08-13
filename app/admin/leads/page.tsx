import { Inbox, Phone, MessageCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { updateLeadStatus } from "../actions";

export const dynamic = "force-dynamic";

type Lead = {
  id: string;
  created_at: string;
  nom: string | null;
  telephone: string | null;
  activite: string | null;
  budget: string | null;
  message: string | null;
  status: string;
};

const STATUSES = [
  { key: "nouveau", label: "Nouveau", style: "bg-blue-50 text-blue-700 border-blue-200" },
  { key: "contacte", label: "Contacté", style: "bg-amber-50 text-amber-700 border-amber-200" },
  { key: "devis", label: "Devis envoyé", style: "bg-violet-50 text-violet-700 border-violet-200" },
  { key: "client", label: "Client", style: "bg-green-50 text-green-700 border-green-200" },
  { key: "perdu", label: "Perdu", style: "bg-slate-100 text-slate-500 border-slate-200" },
];

const styleFor = (key: string) =>
  STATUSES.find((s) => s.key === key)?.style ?? STATUSES[0].style;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

/** Normalises a Moroccan number into the form wa.me expects. */
const waNumber = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("212")) return digits;
  if (digits.startsWith("0")) return `212${digits.slice(1)}`;
  return digits;
};

export default async function LeadsPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("leads")
    .select("id, created_at, nom, telephone, activite, budget, message, status")
    .order("created_at", { ascending: false })
    .limit(300);

  const leads = (data ?? []) as Lead[];
  const counts = STATUSES.map((s) => ({
    ...s,
    n: leads.filter((l) => l.status === s.key).length,
  }));

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-[26px] font-black text-slate-900 tracking-tight mb-1">
          Demandes reçues
        </h1>
        <p className="text-slate-500 text-[14px]">
          Chaque formulaire envoyé depuis le site, même si le visiteur n'a jamais
          écrit sur WhatsApp.
        </p>
      </div>

      {leads.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-7">
          {counts.map((c) => (
            <span
              key={c.key}
              className={`text-[12.5px] font-semibold px-3 py-1.5 rounded-full border ${c.style}`}
            >
              {c.label} · {c.n}
            </span>
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-[14px] rounded-xl p-4 mb-6">
          Lecture impossible : {error.message}
        </div>
      )}

      {leads.length === 0 && !error ? (
        <div className="border border-dashed border-slate-300 rounded-2xl py-20 text-center">
          <Inbox className="w-8 h-8 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-900 font-semibold text-[15px]">
            Aucune demande pour l'instant
          </p>
          <p className="text-slate-500 text-[13.5px] mt-1.5 max-w-sm mx-auto">
            Les formulaires envoyés depuis la page de contact apparaîtront ici.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-colors"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2 className="font-bold text-slate-900 text-[16px]">
                      {lead.nom || "Sans nom"}
                    </h2>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${styleFor(
                        lead.status
                      )}`}
                    >
                      {STATUSES.find((s) => s.key === lead.status)?.label ?? lead.status}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[12.5px] mt-1">
                    {formatDate(lead.created_at)}
                  </p>
                </div>

                {lead.telephone && (
                  <div className="flex gap-2">
                    <a
                      href={`tel:${lead.telephone}`}
                      className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[13px] font-semibold px-3.5 py-2 rounded-lg transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Appeler
                    </a>
                    <a
                      href={`https://wa.me/${waNumber(lead.telephone)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-[13px] font-semibold px-3.5 py-2 rounded-lg transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      WhatsApp
                    </a>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-[13.5px] mb-3">
                {lead.telephone && (
                  <span className="text-slate-700 font-medium">{lead.telephone}</span>
                )}
                {lead.activite && <span className="text-slate-500">{lead.activite}</span>}
                {lead.budget && <span className="text-slate-500">{lead.budget}</span>}
              </div>

              {lead.message && (
                <p className="text-slate-600 text-[14px] leading-relaxed bg-slate-50 rounded-xl p-3.5 mb-4">
                  {lead.message}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
                <span className="text-[12px] text-slate-400 font-medium mr-1">
                  Marquer comme
                </span>
                {STATUSES.filter((s) => s.key !== lead.status).map((s) => (
                  <form key={s.key} action={updateLeadStatus}>
                    <input type="hidden" name="id" value={lead.id} />
                    <input type="hidden" name="status" value={s.key} />
                    <button
                      type="submit"
                      className="text-[12px] font-semibold text-slate-600 bg-slate-50 hover:bg-slate-900 hover:text-white border border-slate-200 hover:border-slate-900 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      {s.label}
                    </button>
                  </form>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
