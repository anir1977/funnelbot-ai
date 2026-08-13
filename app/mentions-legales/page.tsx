import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Mentions légales — FunnelsLibrary",
  description:
    "Éditeur du site, hébergement, propriété intellectuelle et conditions d'utilisation de funnelslibrary.com.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

/**
 * Legal identity fields are intentionally left as placeholders rather than
 * invented: raison sociale, ICE and RC are matters of public record and a wrong
 * value here is worse than an obvious blank.
 */
const IDENTITY = [
  { label: "Raison sociale", value: "À compléter" },
  { label: "Forme juridique", value: "À compléter" },
  { label: "Siège social", value: "À compléter" },
  { label: "ICE", value: "À compléter" },
  { label: "RC", value: "À compléter" },
];

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-[13.5px] font-medium transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au site
        </Link>

        <h1
          className="font-black text-slate-900 mb-12"
          style={{ fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-0.035em" }}
        >
          Mentions légales
        </h1>

        <div className="space-y-10">
          <section>
            <h2 className="font-bold text-slate-900 text-[17px] mb-4">
              Éditeur du site
            </h2>
            <dl className="space-y-2.5">
              {IDENTITY.map((row) => (
                <div key={row.label} className="flex gap-3 text-[14.5px]">
                  <dt className="text-slate-500 w-36 shrink-0">{row.label}</dt>
                  <dd className="text-slate-900 font-medium">{row.value}</dd>
                </div>
              ))}
              <div className="flex gap-3 text-[14.5px]">
                <dt className="text-slate-500 w-36 shrink-0">Téléphone</dt>
                <dd className="text-slate-900 font-medium">+212 708 025 467</dd>
              </div>
              <div className="flex gap-3 text-[14.5px]">
                <dt className="text-slate-500 w-36 shrink-0">Email</dt>
                <dd className="text-slate-900 font-medium">
                  contact@funnelslibrary.com
                </dd>
              </div>
            </dl>
          </section>

          <section>
            <h2 className="font-bold text-slate-900 text-[17px] mb-3">Hébergement</h2>
            <p className="text-slate-600 text-[14.5px] leading-[1.8]">
              Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut,
              CA 91789, États-Unis. Les données du formulaire de contact sont
              conservées chez Supabase, sur des serveurs situés en Irlande.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-slate-900 text-[17px] mb-3">
              Sites de démonstration
            </h2>
            <p className="text-slate-600 text-[14.5px] leading-[1.8]">
              Les sites présentés dans la section « Nos modèles » sont des
              démonstrations. Les entreprises, adresses, tarifs et témoignages qui
              y figurent sont fictifs et servent uniquement à illustrer le rendu
              d'un site par secteur d'activité. Toute ressemblance avec un
              établissement existant serait fortuite.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-slate-900 text-[17px] mb-3">
              Propriété intellectuelle
            </h2>
            <p className="text-slate-600 text-[14.5px] leading-[1.8]">
              La structure, les textes et les éléments graphiques de ce site sont
              protégés. Leur reproduction sans autorisation écrite préalable est
              interdite. Les photographies utilisées dans les démonstrations
              proviennent d'Unsplash et sont soumises à sa licence.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-slate-900 text-[17px] mb-3">
              Données personnelles
            </h2>
            <p className="text-slate-600 text-[14.5px] leading-[1.8]">
              Le traitement des données collectées via le formulaire de contact
              est décrit dans notre{" "}
              <Link
                href="/confidentialite"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                politique de confidentialité
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
