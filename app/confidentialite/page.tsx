import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Politique de confidentialité — FunnelsLibrary",
  description:
    "Quelles données nous collectons via le formulaire de contact, pourquoi, où elles sont conservées et comment les faire supprimer.",
  alternates: { canonical: "/confidentialite" },
};

/**
 * Describes what the site genuinely does: the contact form writes five fields
 * to Supabase and opens WhatsApp. No analytics or advertising script is loaded,
 * and this page must be corrected if one ever is.
 */
export default function PrivacyPage() {
  const sections = [
    {
      title: "Ce que nous collectons",
      body: [
        "Le formulaire de contact enregistre uniquement ce que vous y saisissez : votre nom, votre numéro de téléphone, votre secteur d'activité, la fourchette de budget indiquée et votre message. Aucun de ces champs n'est obligatoire, hormis un nom ou un téléphone sans lesquels nous ne pourrions pas vous répondre.",
        "Nous n'utilisons aucun outil de mesure d'audience, aucun cookie publicitaire et aucun pixel de réseau social. Nous ne savons pas quelles pages vous avez consultées avant de nous écrire.",
      ],
    },
    {
      title: "Pourquoi nous les collectons",
      body: [
        "Uniquement pour vous recontacter au sujet de votre demande et vous adresser un devis. Vos coordonnées ne sont ni revendues, ni louées, ni transmises à un tiers à des fins commerciales.",
        "Le formulaire ouvre également WhatsApp avec un message pré-rempli. Si vous poursuivez la conversation, elle relève alors de la politique de confidentialité de WhatsApp, sur laquelle nous n'avons pas la main.",
      ],
    },
    {
      title: "Où elles sont conservées",
      body: [
        "Vos données sont hébergées chez Supabase, sur des serveurs situés en Irlande (Union européenne). L'accès est restreint : la base est configurée pour que le formulaire puisse uniquement écrire, jamais lire. Aucun visiteur ne peut consulter les demandes d'un autre.",
        "Le site lui-même est hébergé par Vercel Inc.",
      ],
    },
    {
      title: "Combien de temps",
      body: [
        "Les demandes sans suite sont supprimées au bout de douze mois. Celles qui aboutissent à une collaboration sont conservées le temps de la relation commerciale, puis pendant la durée légale applicable aux documents comptables.",
      ],
    },
    {
      title: "Vos droits",
      body: [
        "Vous pouvez à tout moment demander à consulter les données que nous détenons sur vous, les faire corriger ou les faire supprimer. Une simple demande sur WhatsApp au +212 708 025 467 suffit ; nous y donnons suite sous huit jours et sans justification à fournir.",
        "Ce traitement relève de la loi 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel.",
      ],
    },
  ];

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
          className="font-black text-slate-900 mb-3"
          style={{ fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-0.035em" }}
        >
          Politique de confidentialité
        </h1>
        <p className="text-slate-500 text-[15px] leading-relaxed mb-12">
          Nous collectons le strict nécessaire pour vous répondre, et rien d'autre.
          Voici le détail.
        </p>

        <div className="space-y-10">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="font-bold text-slate-900 text-[17px] mb-3">{s.title}</h2>
              {s.body.map((p) => (
                <p
                  key={p.slice(0, 40)}
                  className="text-slate-600 text-[14.5px] leading-[1.8] mb-3 last:mb-0"
                >
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-slate-200">
          <p className="text-slate-400 text-[13px]">
            Une question sur vos données ?{" "}
            <a
              href="https://wa.me/212708025467?text=Bonjour%2C%20j%27ai%20une%20question%20sur%20mes%20donn%C3%A9es%20personnelles."
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Écrivez-nous sur WhatsApp
            </a>
            .
          </p>
          <p className="text-slate-400 text-[13px] mt-2">
            <Link href="/mentions-legales" className="hover:text-slate-600">
              Mentions légales
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
