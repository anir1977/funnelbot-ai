"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "1 490",
    desc: "Idéal pour démarrer votre présence en ligne rapidement.",
    features: [
      "Site vitrine 1 page",
      "Design professionnel",
      "Compatible mobile",
      "Bouton WhatsApp",
      "Formulaire de contact",
      "Google Maps intégré",
      "Livraison en 5 jours",
    ],
    cta: "Commencer",
    highlight: false,
    badge: null,
  },
  {
    name: "Professionnel",
    price: "2 490",
    desc: "Le choix le plus populaire pour les PME et commerces.",
    features: [
      "Site vitrine 3-5 pages",
      "Design premium personnalisé",
      "Compatible mobile",
      "Bouton WhatsApp & appel",
      "Galerie photos",
      "Google Maps intégré",
      "Formulaire de contact",
      "Nom de domaine inclus (1 an)",
      "Hébergement inclus (1 an)",
      "Livraison en 7 jours",
      "1 révision gratuite",
    ],
    cta: "Choisir ce plan",
    highlight: true,
    badge: "Le plus populaire",
  },
  {
    name: "Premium",
    price: "4 490",
    desc: "Pour les entreprises qui veulent se démarquer au maximum.",
    features: [
      "Site multi-pages complet",
      "Design sur mesure exclusif",
      "Compatible mobile & tablette",
      "Bouton WhatsApp & appel",
      "Galerie photos avancée",
      "Catalogue / Menu en ligne",
      "Google Maps intégré",
      "Formulaire de contact",
      "Nom de domaine inclus (1 an)",
      "Hébergement inclus (1 an)",
      "SEO de base",
      "Livraison en 10 jours",
      "3 révisions gratuites",
      "Support prioritaire 3 mois",
    ],
    cta: "Choisir ce plan",
    highlight: false,
    badge: null,
  },
];

export default function Pricing() {
  return (
    <section id="tarifs" className="py-20 lg:py-28 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-blue-400 text-[12px] font-semibold uppercase tracking-widest mb-4">
            Nos tarifs
          </p>
          <h2
            className="font-black text-white mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-0.03em" }}
          >
            Des prix clairs, sans surprise
          </h2>
          <p className="text-slate-400 text-[16px] max-w-lg mx-auto">
            Tous les plans incluent un site professionnel livré rapidement. Choisissez selon vos besoins.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl p-7 flex flex-col ${
                p.highlight
                  ? "bg-blue-600 border border-blue-500 shadow-2xl shadow-blue-600/30 scale-[1.03]"
                  : "bg-white/[0.05] border border-white/[0.1] hover:border-white/[0.18] transition-colors duration-300"
              }`}
            >
              {p.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-amber-400 text-amber-900 text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    {p.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`font-bold text-[18px] mb-1 ${p.highlight ? "text-white" : "text-white"}`}>
                  {p.name}
                </h3>
                <p className={`text-[13px] mb-5 ${p.highlight ? "text-blue-100" : "text-slate-400"}`}>
                  {p.desc}
                </p>
                <div className="flex items-baseline gap-1.5">
                  <span className={`font-black text-[38px] leading-none ${p.highlight ? "text-white" : "text-white"}`}>
                    {p.price}
                  </span>
                  <span className={`text-[14px] font-medium ${p.highlight ? "text-blue-200" : "text-slate-400"}`}>
                    MAD
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check
                      className={`w-4 h-4 shrink-0 mt-0.5 ${p.highlight ? "text-blue-200" : "text-blue-400"}`}
                    />
                    <span className={`text-[13.5px] ${p.highlight ? "text-blue-50" : "text-slate-300"}`}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/212600000000?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20le%20plan%20${encodeURIComponent(p.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full text-center font-bold text-[15px] py-3.5 rounded-xl transition-all duration-200 block ${
                  p.highlight
                    ? "bg-white text-blue-600 hover:bg-blue-50"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                }`}
              >
                {p.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-slate-500 text-[13px] mt-10"
        >
          Vous avez un projet spécifique ?{" "}
          <a
            href="https://wa.me/212600000000?text=Bonjour%2C%20j%27ai%20un%20projet%20sp%C3%A9cifique%20%C3%A0%20discuter."
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
          >
            Contactez-nous pour un devis personnalisé.
          </a>
        </motion.p>
      </div>
    </section>
  );
}
