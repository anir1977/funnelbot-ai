"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Phone } from "lucide-react";

const sites = [
  {
    id: "restaurant",
    label: "Restaurant",
    url: "www.la-perle-marrakech.ma",
    photo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=85&fit=crop",
    overlay: "from-stone-950/85 via-stone-950/40 to-transparent",
    nav: ["Menu", "Galerie", "Réserver"],
    brand: "La Perle",
    accent: "#D97706",
    tagline: "Restaurant Gastronomique · Marrakech",
    hero: "Une expérience culinaire inoubliable",
    cta1: "Réserver une table",
    cta2: "Voir le menu",
    cards: [
      { label: "Tajine Royal", sub: "120 MAD", color: "bg-amber-50" },
      { label: "Pastilla", sub: "95 MAD", color: "bg-orange-50" },
      { label: "Couscous", sub: "85 MAD", color: "bg-stone-50" },
    ],
  },
  {
    id: "cafe",
    label: "Café",
    url: "www.cafe-atlas.ma",
    photo: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=700&q=85&fit=crop",
    overlay: "from-stone-950/90 via-stone-950/50 to-transparent",
    nav: ["Boissons", "Pâtisseries", "À propos"],
    brand: "Café Atlas",
    accent: "#92400E",
    tagline: "Café & Pâtisseries · Casablanca",
    hero: "Le goût authentique du Maroc",
    cta1: "Commander",
    cta2: "Notre carte",
    cards: [
      { label: "Cappuccino", sub: "25 MAD", color: "bg-amber-50" },
      { label: "Croissant", sub: "15 MAD", color: "bg-yellow-50" },
      { label: "Thé à la menthe", sub: "12 MAD", color: "bg-green-50" },
    ],
  },
  {
    id: "salon",
    label: "Salon de beauté",
    url: "www.studio-rose.ma",
    photo: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=700&q=85&fit=crop",
    overlay: "from-rose-950/80 via-rose-900/40 to-transparent",
    nav: ["Services", "Galerie", "RDV"],
    brand: "Studio Rose",
    accent: "#BE185D",
    tagline: "Beauté & Bien-être · Rabat",
    hero: "Révélez votre plus belle version",
    cta1: "Prendre RDV",
    cta2: "Nos tarifs",
    cards: [
      { label: "Coiffure", sub: "150 MAD", color: "bg-rose-50" },
      { label: "Manucure", sub: "80 MAD", color: "bg-pink-50" },
      { label: "Soin visage", sub: "200 MAD", color: "bg-fuchsia-50" },
    ],
  },
  {
    id: "boutique",
    label: "Boutique",
    url: "www.boutique-nour.ma",
    photo: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=700&q=85&fit=crop",
    overlay: "from-violet-950/85 via-violet-900/40 to-transparent",
    nav: ["Catalogue", "Nouveautés", "Contact"],
    brand: "Boutique Nour",
    accent: "#7C3AED",
    tagline: "Mode & Prêt-à-porter · Fès",
    hero: "La mode marocaine réinventée",
    cta1: "Voir le catalogue",
    cta2: "Nouveautés",
    cards: [
      { label: "Collection été", sub: "350 MAD", color: "bg-violet-50" },
      { label: "Accessoires", sub: "120 MAD", color: "bg-purple-50" },
      { label: "Promo -20%", sub: "280 MAD", color: "bg-indigo-50" },
    ],
  },
  {
    id: "immo",
    label: "Immobilier",
    url: "www.horizon-immo.ma",
    photo: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=85&fit=crop",
    overlay: "from-slate-950/90 via-slate-900/50 to-transparent",
    nav: ["Acheter", "Louer", "Contact"],
    brand: "Horizon Immo",
    accent: "#2563EB",
    tagline: "Agence immobilière · Maroc",
    hero: "Trouvez le bien de vos rêves",
    cta1: "Voir les annonces",
    cta2: "Estimation",
    cards: [
      { label: "Villa · Marrakech", sub: "2.5M MAD", color: "bg-blue-50" },
      { label: "Appart · Rabat", sub: "850K MAD", color: "bg-slate-50" },
      { label: "Bureau · Casa", sub: "1.2M MAD", color: "bg-sky-50" },
    ],
  },
];

function SiteMockup({ site }: { site: typeof sites[0] }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-white">
      {/* Browser chrome */}
      <div className="bg-slate-100 flex items-center gap-2 px-3 py-2.5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded-md text-[10px] text-slate-400 px-3 py-1 font-mono">
          {site.url}
        </div>
      </div>

      {/* Navbar */}
      <div className="bg-slate-950 flex items-center justify-between px-5 py-2.5">
        <span className="text-white font-black text-[11px] tracking-wider uppercase">{site.brand}</span>
        <div className="flex gap-4">
          {site.nav.map((n) => (
            <span key={n} className="text-slate-400 text-[9px] font-medium">{n}</span>
          ))}
        </div>
      </div>

      {/* Hero photo */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={site.photo}
          alt={site.label}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${site.overlay}`} />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="text-[9px] font-semibold uppercase tracking-widest mb-1" style={{ color: site.accent }}>
            {site.tagline}
          </div>
          <div className="text-white font-black text-[15px] leading-snug mb-3">
            {site.hero}
          </div>
          <div className="flex gap-2">
            <div
              className="text-white text-[8.5px] font-bold px-3 py-1.5 rounded-full"
              style={{ backgroundColor: site.accent }}
            >
              {site.cta1}
            </div>
            <div className="bg-white/15 border border-white/25 text-white text-[8.5px] font-medium px-3 py-1.5 rounded-full">
              {site.cta2}
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="bg-white p-3">
        <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-2">
          {site.id === "immo" ? "Nos annonces" : site.id === "salon" ? "Nos services" : "Nos produits"}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {site.cards.map((c) => (
            <div key={c.label} className={`${c.color} rounded-xl p-2`}>
              <div className="w-full h-8 rounded-lg bg-black/[0.06] mb-1.5" />
              <div className="text-[7px] font-bold text-slate-700 leading-tight">{c.label}</div>
              <div className="text-[6.5px] font-semibold mt-0.5" style={{ color: site.accent }}>{c.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer nav + WhatsApp */}
      <div className="bg-slate-50 border-t border-slate-100 flex items-center justify-between px-4 py-2">
        <div className="flex gap-3">
          {["Accueil", site.nav[0], site.nav[1], "Contact"].map((n) => (
            <span key={n} className="text-[7px] text-slate-400 font-medium">{n}</span>
          ))}
        </div>
        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
          <Phone className="w-3 h-3 text-white fill-white" />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % sites.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const current = sites[active];

  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden pt-20">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: text ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-[12px] font-semibold px-4 py-2 rounded-full mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Agence Web au Maroc
              </div>

              <h1
                className="font-black text-slate-900 leading-[1.05] mb-6"
                style={{ fontSize: "clamp(36px, 5.5vw, 62px)", letterSpacing: "-0.035em" }}
              >
                Votre entreprise mérite
                <br />
                un site qui{" "}
                <span className="text-blue-600">inspire confiance.</span>
              </h1>

              <p className="text-slate-500 text-[17px] leading-relaxed mb-10 max-w-lg">
                Nous créons des sites web modernes, rapides et professionnels pour les entreprises au Maroc. Livré en 7 jours.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <a
                  href="#demos"
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[15px] px-7 py-4 rounded-xl transition-all duration-200"
                >
                  Voir nos réalisations →
                </a>
                <a
                  href="https://wa.me/212708025467?text=Bonjour%2C%20je%20veux%20cr%C3%A9er%20mon%20site%20web."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold text-[15px] px-7 py-4 rounded-xl transition-all duration-200"
                >
                  <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-white shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  </svg>
                  Demander mon site
                </a>
              </div>

              <div className="flex flex-wrap gap-5">
                {["Livraison en 7 jours", "Support inclus", "Mobile-first"].map((t) => (
                  <div key={t} className="flex items-center gap-1.5 text-slate-500 text-[13px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    {t}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right: animated mockup ── */}
          <div className="relative">
            {/* Glow behind */}
            <div
              className="absolute -inset-8 rounded-3xl opacity-20 blur-3xl transition-all duration-1000"
              style={{ backgroundColor: current.accent }}
            />

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="absolute -top-4 -right-4 z-20 bg-white border border-slate-200 rounded-2xl px-4 py-2.5 shadow-xl flex items-center gap-2.5"
            >
              <div className="w-7 h-7 rounded-xl bg-green-500 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-[12px] font-black text-slate-900">Site livré</div>
                <div className="text-[10px] text-slate-400">en 7 jours</div>
              </div>
            </motion.div>

            {/* Mockup with AnimatePresence */}
            <div className="relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <SiteMockup site={current} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots + labels */}
            <div className="flex items-center justify-center gap-3 mt-5">
              {sites.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-1.5 transition-all duration-300 ${
                    i === active ? "opacity-100" : "opacity-40 hover:opacity-60"
                  }`}
                >
                  <div
                    className={`rounded-full transition-all duration-300 ${
                      i === active ? "w-5 h-2" : "w-2 h-2"
                    } bg-slate-700`}
                  />
                </button>
              ))}
              <span className="text-[11px] text-slate-400 font-medium ml-1">
                {current.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
