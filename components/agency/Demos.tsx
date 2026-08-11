"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

function SiteMockup({ type }: { type: string }) {
  const configs: Record<string, { bg: string; accent: string; title: string; nav: string[] }> = {
    restaurant: {
      bg: "from-stone-900 to-amber-950",
      accent: "#D97706",
      title: "La Perle",
      nav: ["Menu", "Galerie", "Contact"],
    },
    cafe: {
      bg: "from-stone-700 to-stone-900",
      accent: "#6F4E37",
      title: "Café Atlas",
      nav: ["Boissons", "Pâtisseries", "À propos"],
    },
    salon: {
      bg: "from-rose-100 to-pink-200",
      accent: "#BE185D",
      title: "Studio Rose",
      nav: ["Services", "Galerie", "Réserver"],
    },
    immo: {
      bg: "from-slate-800 to-slate-900",
      accent: "#2563EB",
      title: "Horizon Immo",
      nav: ["Acheter", "Louer", "Contact"],
    },
    entreprise: {
      bg: "from-blue-900 to-slate-900",
      accent: "#3B82F6",
      title: "Tech Solutions",
      nav: ["Services", "À propos", "Contact"],
    },
    boutique: {
      bg: "from-violet-50 to-purple-100",
      accent: "#7C3AED",
      title: "Boutique Nour",
      nav: ["Catalogue", "Nouveautés", "Contact"],
    },
  };

  const c = configs[type];
  const isDark = ["restaurant", "cafe", "immo", "entreprise"].includes(type);

  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 bg-white">
      {/* Browser bar */}
      <div className="bg-slate-100 flex items-center gap-2 px-3 py-2">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
          <div className="w-2 h-2 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded text-[9px] text-slate-400 px-2 py-0.5">
          www.{c.title.toLowerCase().replace(" ", "-")}.ma
        </div>
      </div>

      {/* Site preview */}
      <div className={`bg-gradient-to-br ${c.bg} p-4 h-36 flex flex-col justify-between`}>
        {/* Nav */}
        <div className="flex items-center justify-between">
          <span className={`text-[11px] font-black ${isDark ? "text-white" : "text-slate-800"}`}>
            {c.title}
          </span>
          <div className="flex gap-2">
            {c.nav.map((n) => (
              <span key={n} className={`text-[8px] font-medium ${isDark ? "text-white/70" : "text-slate-500"}`}>
                {n}
              </span>
            ))}
          </div>
        </div>

        {/* Hero text */}
        <div>
          <div className="w-16 h-1 rounded-full mb-2" style={{ backgroundColor: c.accent }} />
          <div className={`text-[13px] font-black leading-tight mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
            Bienvenue chez<br />{c.title}
          </div>
          <div
            className="text-[8px] font-bold text-white px-3 py-1 rounded-full inline-block"
            style={{ backgroundColor: c.accent }}
          >
            Voir plus
          </div>
        </div>
      </div>

      {/* Content blocks */}
      <div className="p-3 grid grid-cols-3 gap-1.5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-slate-50 rounded-lg h-10" />
        ))}
      </div>
    </div>
  );
}

const demos = [
  {
    id: "restaurant",
    category: "Restaurant",
    title: "Restaurant Premium",
    desc: "Menu en ligne, galerie de plats, réservation par WhatsApp.",
    emoji: "🍽️",
  },
  {
    id: "cafe",
    category: "Café",
    title: "Café Moderne",
    desc: "Carte des boissons, ambiance, commande à emporter.",
    emoji: "☕",
  },
  {
    id: "salon",
    category: "Beauté",
    title: "Salon & Beauté",
    desc: "Services, tarifs, galerie avant/après, prise de rendez-vous.",
    emoji: "💅",
  },
  {
    id: "immo",
    category: "Immobilier",
    title: "Agence Immobilière",
    desc: "Annonces, filtres, formulaire de contact, estimation.",
    emoji: "🏠",
  },
  {
    id: "entreprise",
    category: "Entreprise",
    title: "Site Vitrine",
    desc: "Présentation, services, équipe, contact professionnel.",
    emoji: "🏢",
  },
  {
    id: "boutique",
    category: "Boutique",
    title: "Boutique / Catalogue",
    desc: "Catalogue produits, commande WhatsApp, promotions.",
    emoji: "🛍️",
  },
];

export default function Demos() {
  return (
    <section id="demos" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-blue-600 text-[12px] font-semibold uppercase tracking-widest mb-4">
            Réalisations
          </p>
          <h2
            className="font-black text-slate-900 mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.03em" }}
          >
            Choisissez le style de votre futur site
          </h2>
          <p className="text-slate-500 text-[16px] max-w-xl mx-auto">
            Des designs premium adaptés à chaque type d'entreprise.
          </p>
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 text-amber-700 text-[11px] font-medium px-3 py-1.5 rounded-full mt-4">
            ✦ Concepts de démonstration — designs personnalisables
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300"
            >
              <div className="p-4">
                <SiteMockup type={d.id} />
              </div>

              <div className="px-5 pb-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{d.emoji}</span>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{d.category}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-[17px] mb-1.5">{d.title}</h3>
                <p className="text-slate-500 text-[13px] leading-relaxed mb-4">{d.desc}</p>

                <a
                  href="https://wa.me/212600000000?text=Bonjour%2C%20je%20souhaite%20un%20site%20similaire%20pour%20mon%20entreprise."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-semibold text-[13px] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Voir la démo
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="https://wa.me/212600000000?text=Bonjour%2C%20je%20souhaite%20cr%C3%A9er%20un%20site%20web%20pour%20mon%20entreprise."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[15px] px-8 py-4 rounded-xl transition-all duration-200"
          >
            Demander ce style pour mon entreprise
          </a>
        </motion.div>
      </div>
    </section>
  );
}
