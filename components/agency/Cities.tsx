"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Check } from "lucide-react";

const cities = [
  {
    name: "Casablanca",
    title: "Création de site web à Casablanca",
    desc: "Capitale économique du Maroc, Casablanca concentre la plus forte concurrence en ligne. Nous créons des sites qui vous démarquent auprès d'une clientèle exigeante et connectée.",
    points: [
      "Sites pour commerces, restaurants et PME du Grand Casablanca",
      "Référencement local optimisé pour les recherches \"près de moi\"",
      "Design premium adapté à une clientèle urbaine",
    ],
  },
  {
    name: "Marrakech",
    title: "Création de site web à Marrakech",
    desc: "Ville touristique par excellence, Marrakech exige des sites multilingues et visuellement forts. Nous mettons en valeur votre établissement auprès des visiteurs marocains et internationaux.",
    points: [
      "Sites multilingues (français, anglais, arabe)",
      "Galeries photos immersives pour riads et restaurants",
      "Système de réservation intégré",
    ],
  },
  {
    name: "Rabat",
    title: "Création de site web à Rabat",
    desc: "Capitale administrative, Rabat rassemble professions libérales, cabinets et institutions. Nous concevons des sites sobres et crédibles qui inspirent confiance.",
    points: [
      "Sites pour cabinets médicaux, avocats et consultants",
      "Design professionnel et rassurant",
      "Prise de rendez-vous en ligne",
    ],
  },
  {
    name: "Tanger",
    title: "Création de site web à Tanger",
    desc: "Porte de l'Europe et pôle industriel en pleine croissance, Tanger attire investisseurs et nouveaux commerces. Votre site doit refléter ce dynamisme.",
    points: [
      "Sites pour commerces, garages et entreprises industrielles",
      "Visibilité auprès d'une clientèle locale et internationale",
      "Contact WhatsApp et formulaire de devis",
    ],
  },
  {
    name: "Agadir",
    title: "Création de site web à Agadir",
    desc: "Station balnéaire et pôle touristique du sud, Agadir vit du tourisme et des loisirs. Nous créons des sites qui captent les visiteurs avant leur arrivée.",
    points: [
      "Sites pour hôtels, restaurants et activités de loisirs",
      "Réservation et devis en ligne",
      "Optimisation mobile pour les voyageurs",
    ],
  },
  {
    name: "Fès",
    title: "Création de site web à Fès",
    desc: "Capitale spirituelle et artisanale, Fès abrite un patrimoine commercial unique. Nous valorisons votre savoir-faire auprès d'une audience plus large.",
    points: [
      "Sites pour artisans, boutiques et riads",
      "Catalogue produits avec commande WhatsApp",
      "Mise en valeur du savoir-faire traditionnel",
    ],
  },
  {
    name: "Meknès",
    title: "Création de site web à Meknès",
    desc: "Ville en développement avec un tissu de PME et commerces de proximité. Un site professionnel vous donne une longueur d'avance sur vos concurrents locaux.",
    points: [
      "Sites pour commerces de proximité et PME",
      "Référencement local prioritaire",
      "Budget adapté aux entreprises locales",
    ],
  },
];

export default function Cities() {
  const [active, setActive] = useState(0);
  const c = cities[active];

  return (
    <section id="villes" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-blue-600 text-[12px] font-semibold uppercase tracking-widest mb-4">
            Partout au Maroc
          </p>
          <h2
            className="font-black text-slate-900 mb-4"
            style={{ fontSize: "clamp(28px, 4.5vw, 46px)", letterSpacing: "-0.035em" }}
          >
            Expertise web par ville
          </h2>
          <p className="text-slate-500 text-[16px] max-w-xl mx-auto">
            Nous accompagnons les entreprises dans toutes les grandes villes du Royaume, avec une stratégie adaptée à chaque marché local.
          </p>
        </motion.div>

        {/* City tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {cities.map((city, i) => (
            <button
              key={city.name}
              onClick={() => setActive(i)}
              className={`flex items-center gap-1.5 text-[13px] font-semibold px-4 py-2.5 rounded-full transition-all duration-200 ${
                i === active
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-blue-200 hover:text-blue-600"
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              {city.name}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.35 }}
            >
              <h3
                className="font-black text-slate-900 mb-4"
                style={{ fontSize: "clamp(22px, 3vw, 30px)", letterSpacing: "-0.03em" }}
              >
                {c.title}
              </h3>
              <p className="text-slate-500 text-[15.5px] leading-relaxed mb-7">{c.desc}</p>

              <ul className="space-y-3.5 mb-8">
                {c.points.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-blue-600" />
                    </span>
                    <span className="text-slate-600 text-[14px] leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/212708025467?text=Bonjour%2C%20je%20cherche%20une%20agence%20web%20%C3%A0%20${encodeURIComponent(c.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[14px] px-6 py-3.5 rounded-xl transition-all duration-200"
              >
                Discuter de mon projet à {c.name}
              </a>
            </motion.div>
          </AnimatePresence>

          {/* Map card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-10 overflow-hidden"
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative">
              <div className="text-white/70 text-[11px] font-semibold uppercase tracking-widest mb-3">
                Zone de couverture
              </div>
              <div
                className="text-white font-black mb-6"
                style={{ fontSize: "clamp(26px, 3.5vw, 36px)", letterSpacing: "-0.03em" }}
              >
                Tout le Maroc 🇲🇦
              </div>

              <div className="grid grid-cols-2 gap-2.5 mb-8">
                {cities.map((city, i) => (
                  <button
                    key={city.name}
                    onClick={() => setActive(i)}
                    className={`text-left flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all duration-200 ${
                      i === active
                        ? "bg-white text-blue-700 font-bold"
                        : "bg-white/10 text-white/90 hover:bg-white/20"
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-[13px]">{city.name}</span>
                  </button>
                ))}
                <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/10 text-white/70">
                  <span className="text-[13px]">+ autres villes</span>
                </div>
              </div>

              <p className="text-blue-100 text-[13.5px] leading-relaxed">
                Nous travaillons à distance avec nos clients partout au Maroc. Tout se fait par WhatsApp — simple et rapide.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
