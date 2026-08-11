"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

/* ─── Restaurant Premium mockup (photo-based) ─── */
function RestaurantMockup() {
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
          www.la-perle-marrakech.ma
        </div>
      </div>

      {/* Navbar */}
      <div className="bg-stone-950 flex items-center justify-between px-4 py-2">
        <span className="text-white font-black text-[10px] tracking-widest uppercase">La Perle</span>
        <div className="flex gap-3">
          {["Menu", "Galerie", "Réserver"].map((n) => (
            <span key={n} className="text-stone-400 text-[7.5px] font-medium">{n}</span>
          ))}
        </div>
      </div>

      {/* Hero with real photo */}
      <div className="relative h-28 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&fit=crop"
          alt="Restaurant"
          className="w-full h-full object-cover"
        />
        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />
        {/* Text overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="text-[9px] text-amber-400 font-semibold uppercase tracking-widest mb-0.5">
            Restaurant Gastronomique · Marrakech
          </div>
          <div className="text-white font-black text-[13px] leading-tight">
            Une expérience culinaire<br />inoubliable
          </div>
          <div className="flex gap-1.5 mt-2">
            <div className="bg-amber-500 text-white text-[7px] font-bold px-2.5 py-1 rounded-full">
              Réserver une table
            </div>
            <div className="bg-white/10 border border-white/20 text-white text-[7px] font-medium px-2.5 py-1 rounded-full">
              Voir le menu
            </div>
          </div>
        </div>
      </div>

      {/* Menu preview */}
      <div className="bg-white p-3">
        <div className="text-[8px] font-bold text-stone-700 uppercase tracking-widest mb-2">Nos spécialités</div>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { name: "Tajine Royal", price: "120 MAD", color: "bg-amber-50" },
            { name: "Pastilla au pigeon", price: "95 MAD", color: "bg-orange-50" },
            { name: "Couscous Maison", price: "85 MAD", color: "bg-stone-50" },
          ].map((item) => (
            <div key={item.name} className={`${item.color} rounded-lg p-1.5`}>
              <div className="w-full h-6 rounded bg-stone-200/60 mb-1" />
              <div className="text-[6.5px] font-bold text-stone-700 leading-tight">{item.name}</div>
              <div className="text-[6px] text-amber-600 font-semibold">{item.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp sticky bar */}
      <div className="bg-green-500 flex items-center justify-center gap-1.5 py-1.5">
        <MessageCircle className="w-2.5 h-2.5 text-white" />
        <span className="text-white text-[7.5px] font-bold">Réserver sur WhatsApp</span>
      </div>
    </div>
  );
}

/* ─── Generic CSS mockup for other types ─── */
function GenericMockup({ type }: { type: string }) {
  const configs: Record<string, {
    bg: string; accent: string; accentText: string;
    title: string; sub: string; nav: string[];
    isDark: boolean; sections: { label: string; w: string }[];
  }> = {
    cafe: {
      bg: "from-stone-800 to-stone-950",
      accent: "#92400E", accentText: "text-amber-300",
      title: "Café Atlas", sub: "Casablanca · Depuis 2010",
      nav: ["Boissons", "Pâtisseries", "À propos"],
      isDark: true,
      sections: [
        { label: "Cappuccino", w: "w-2/3" },
        { label: "Café latte", w: "w-1/2" },
        { label: "Réserver", w: "w-1/3" },
      ],
    },
    salon: {
      bg: "from-rose-50 to-pink-100",
      accent: "#BE185D", accentText: "text-pink-600",
      title: "Studio Rose", sub: "Beauté & Bien-être",
      nav: ["Services", "Galerie", "RDV"],
      isDark: false,
      sections: [
        { label: "Coiffure", w: "w-2/3" },
        { label: "Manucure", w: "w-1/2" },
        { label: "Prendre RDV", w: "w-1/3" },
      ],
    },
    immo: {
      bg: "from-slate-800 to-slate-950",
      accent: "#2563EB", accentText: "text-blue-400",
      title: "Horizon Immo", sub: "Agence immobilière au Maroc",
      nav: ["Acheter", "Louer", "Contact"],
      isDark: true,
      sections: [
        { label: "Appartement · Rabat", w: "w-full" },
        { label: "Villa · Marrakech", w: "w-2/3" },
        { label: "Voir les annonces", w: "w-1/2" },
      ],
    },
    entreprise: {
      bg: "from-blue-950 to-slate-950",
      accent: "#3B82F6", accentText: "text-blue-300",
      title: "Tech Solutions", sub: "Expertise & Innovation",
      nav: ["Services", "À propos", "Contact"],
      isDark: true,
      sections: [
        { label: "Développement web", w: "w-2/3" },
        { label: "Consulting IT", w: "w-1/2" },
        { label: "Nous contacter", w: "w-1/3" },
      ],
    },
    boutique: {
      bg: "from-violet-50 to-purple-100",
      accent: "#7C3AED", accentText: "text-violet-600",
      title: "Boutique Nour", sub: "Mode & Prêt-à-porter",
      nav: ["Catalogue", "Nouveautés", "Contact"],
      isDark: false,
      sections: [
        { label: "Collection été", w: "w-2/3" },
        { label: "Promotions", w: "w-1/2" },
        { label: "Commander", w: "w-1/3" },
      ],
    },
  };

  const c = configs[type];
  if (!c) return null;

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

      {/* Hero */}
      <div className={`bg-gradient-to-br ${c.bg} p-4 h-36 flex flex-col justify-between`}>
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-black ${c.isDark ? "text-white" : "text-slate-800"}`}>
            {c.title}
          </span>
          <div className="flex gap-2">
            {c.nav.map((n) => (
              <span key={n} className={`text-[7px] font-medium ${c.isDark ? "text-white/60" : "text-slate-500"}`}>
                {n}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className={`text-[8px] mb-1 font-medium ${c.accentText}`}>{c.sub}</div>
          <div className={`text-[13px] font-black leading-tight mb-2.5 ${c.isDark ? "text-white" : "text-slate-900"}`}>
            Bienvenue chez<br />{c.title}
          </div>
          <div
            className="text-[7.5px] font-bold text-white px-3 py-1 rounded-full inline-block"
            style={{ backgroundColor: c.accent }}
          >
            Découvrir
          </div>
        </div>
      </div>

      {/* Content rows */}
      <div className="p-3 space-y-2">
        {c.sections.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <div className={`h-5 ${s.w} bg-slate-100 rounded`} />
            <div className="text-[7px] text-slate-400 font-medium truncate">{s.label}</div>
          </div>
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
    desc: "Menu en ligne avec photos de plats, galerie, réservation directe par WhatsApp.",
    emoji: "🍽️",
    badge: "⭐ Le plus demandé",
  },
  {
    id: "cafe",
    category: "Café",
    title: "Café Moderne",
    desc: "Carte des boissons, ambiance, commande à emporter.",
    emoji: "☕",
    badge: null,
  },
  {
    id: "salon",
    category: "Beauté",
    title: "Salon & Beauté",
    desc: "Services, tarifs, galerie avant/après, prise de rendez-vous.",
    emoji: "💅",
    badge: null,
  },
  {
    id: "immo",
    category: "Immobilier",
    title: "Agence Immobilière",
    desc: "Annonces, filtres, formulaire de contact, estimation.",
    emoji: "🏠",
    badge: null,
  },
  {
    id: "entreprise",
    category: "Entreprise",
    title: "Site Vitrine",
    desc: "Présentation, services, équipe, contact professionnel.",
    emoji: "🏢",
    badge: null,
  },
  {
    id: "boutique",
    category: "Boutique",
    title: "Boutique / Catalogue",
    desc: "Catalogue produits, commande WhatsApp, promotions.",
    emoji: "🛍️",
    badge: null,
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
            Des designs premium adaptés à chaque type d'entreprise au Maroc.
          </p>
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 text-amber-700 text-[11px] font-medium px-3 py-1.5 rounded-full mt-4">
            ✦ Concepts de démonstration — designs 100% personnalisables
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
                {d.id === "restaurant" ? (
                  <RestaurantMockup />
                ) : (
                  <GenericMockup type={d.id} />
                )}
              </div>

              <div className="px-5 pb-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{d.emoji}</span>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      {d.category}
                    </span>
                  </div>
                  {d.badge && (
                    <span className="text-[10px] font-semibold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                      {d.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-slate-900 text-[17px] mb-1.5">{d.title}</h3>
                <p className="text-slate-500 text-[13px] leading-relaxed mb-4">{d.desc}</p>

                <a
                  href={`https://wa.me/212708025467?text=Bonjour%2C%20je%20souhaite%20un%20site%20similaire%20au%20mod%C3%A8le%20${encodeURIComponent(d.title)}%20pour%20mon%20entreprise.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold text-[12.5px] px-4 py-2 rounded-lg transition-all duration-200"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  </svg>
                  Je veux ce style
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
            href="https://wa.me/212708025467?text=Bonjour%2C%20je%20souhaite%20cr%C3%A9er%20un%20site%20web%20professionnel%20pour%20mon%20entreprise."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[15px] px-8 py-4 rounded-xl transition-all duration-200"
          >
            Demander un devis gratuit
          </a>
        </motion.div>
      </div>
    </section>
  );
}
