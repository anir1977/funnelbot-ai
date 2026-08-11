"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { CheckCircle2, Phone, ChevronLeft, ChevronRight } from "lucide-react";

const sites = [
  {
    id: "restaurant",
    label: "Restaurant",
    url: "la-perle-marrakech.ma",
    photo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85&fit=crop",
    overlay: "from-stone-950/90 via-stone-950/35 to-transparent",
    nav: ["Menu", "Galerie", "Réserver"],
    brand: "La Perle",
    accent: "#D97706",
    tagline: "Restaurant Gastronomique · Marrakech",
    hero: "Une expérience culinaire inoubliable",
    cta1: "Réserver une table",
    cta2: "Voir le menu",
    sectionLabel: "Nos spécialités",
    cards: [
      { label: "Tajine Royal", sub: "120 MAD", tint: "bg-amber-50" },
      { label: "Pastilla", sub: "95 MAD", tint: "bg-orange-50" },
      { label: "Couscous", sub: "85 MAD", tint: "bg-stone-50" },
    ],
  },
  {
    id: "salon",
    label: "Salon de beauté",
    url: "studio-rose.ma",
    photo: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=85&fit=crop",
    overlay: "from-rose-950/90 via-rose-900/35 to-transparent",
    nav: ["Services", "Galerie", "RDV"],
    brand: "Studio Rose",
    accent: "#BE185D",
    tagline: "Beauté & Bien-être · Rabat",
    hero: "Révélez votre plus belle version",
    cta1: "Prendre RDV",
    cta2: "Nos tarifs",
    sectionLabel: "Nos services",
    cards: [
      { label: "Coiffure", sub: "150 MAD", tint: "bg-rose-50" },
      { label: "Manucure", sub: "80 MAD", tint: "bg-pink-50" },
      { label: "Soin visage", sub: "200 MAD", tint: "bg-fuchsia-50" },
    ],
  },
  {
    id: "immo",
    label: "Immobilier",
    url: "horizon-immo.ma",
    photo: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=85&fit=crop",
    overlay: "from-slate-950/92 via-slate-900/40 to-transparent",
    nav: ["Acheter", "Louer", "Contact"],
    brand: "Horizon Immo",
    accent: "#3B82F6",
    tagline: "Agence immobilière · Casablanca",
    hero: "Trouvez le bien de vos rêves",
    cta1: "Voir les annonces",
    cta2: "Estimation",
    sectionLabel: "Nos annonces",
    cards: [
      { label: "Villa · Marrakech", sub: "2.5M MAD", tint: "bg-blue-50" },
      { label: "Appart · Rabat", sub: "850K MAD", tint: "bg-slate-50" },
      { label: "Bureau · Casa", sub: "1.2M MAD", tint: "bg-sky-50" },
    ],
  },
  {
    id: "cafe",
    label: "Café",
    url: "cafe-atlas.ma",
    photo: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=85&fit=crop",
    overlay: "from-stone-950/92 via-stone-950/45 to-transparent",
    nav: ["Boissons", "Pâtisseries", "À propos"],
    brand: "Café Atlas",
    accent: "#B45309",
    tagline: "Café & Pâtisseries · Casablanca",
    hero: "Le goût authentique du Maroc",
    cta1: "Commander",
    cta2: "Notre carte",
    sectionLabel: "Notre carte",
    cards: [
      { label: "Cappuccino", sub: "25 MAD", tint: "bg-amber-50" },
      { label: "Croissant", sub: "15 MAD", tint: "bg-yellow-50" },
      { label: "Thé menthe", sub: "12 MAD", tint: "bg-green-50" },
    ],
  },
  {
    id: "boutique",
    label: "Boutique",
    url: "boutique-nour.ma",
    photo: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=85&fit=crop",
    overlay: "from-violet-950/90 via-violet-900/35 to-transparent",
    nav: ["Catalogue", "Nouveautés", "Contact"],
    brand: "Boutique Nour",
    accent: "#8B5CF6",
    tagline: "Mode & Prêt-à-porter · Fès",
    hero: "La mode marocaine réinventée",
    cta1: "Voir le catalogue",
    cta2: "Nouveautés",
    sectionLabel: "Collection",
    cards: [
      { label: "Robe été", sub: "350 MAD", tint: "bg-violet-50" },
      { label: "Accessoires", sub: "120 MAD", tint: "bg-purple-50" },
      { label: "Promo -20%", sub: "280 MAD", tint: "bg-indigo-50" },
    ],
  },
];

/* ─────────────  Site mockup  ───────────── */
function SiteMockup({ site }: { site: (typeof sites)[0] }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-white ring-1 ring-black/[0.08]">
      {/* Browser chrome */}
      <div className="bg-gradient-to-b from-slate-100 to-slate-50 flex items-center gap-2 px-3 py-2.5 border-b border-slate-200/70">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 bg-white rounded-md text-[9.5px] text-slate-400 px-3 py-1 font-mono flex items-center gap-1.5 ring-1 ring-slate-200/70">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          {site.url}
        </div>
      </div>

      {/* Site navbar */}
      <div className="bg-slate-950 flex items-center justify-between px-5 py-2.5">
        <span className="text-white font-black text-[11px] tracking-[0.15em] uppercase">
          {site.brand}
        </span>
        <div className="flex gap-4">
          {site.nav.map((n) => (
            <span key={n} className="text-slate-400 text-[9px] font-medium">
              {n}
            </span>
          ))}
        </div>
      </div>

      {/* Hero photo */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={site.photo}
          alt={site.label}
          draggable={false}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${site.overlay}`} />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div
            className="text-[9px] font-bold uppercase tracking-[0.18em] mb-1.5"
            style={{ color: site.accent }}
          >
            {site.tagline}
          </div>
          <div className="text-white font-black text-[16px] leading-[1.2] mb-3.5 max-w-[80%]">
            {site.hero}
          </div>
          <div className="flex gap-2">
            <div
              className="text-white text-[8.5px] font-bold px-3.5 py-1.5 rounded-full"
              style={{ backgroundColor: site.accent }}
            >
              {site.cta1}
            </div>
            <div className="bg-white/15 backdrop-blur-sm border border-white/25 text-white text-[8.5px] font-medium px-3.5 py-1.5 rounded-full">
              {site.cta2}
            </div>
          </div>
        </div>
      </div>

      {/* Cards row */}
      <div className="bg-white px-3.5 py-3">
        <div className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-2">
          {site.sectionLabel}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {site.cards.map((c) => (
            <div key={c.label} className={`${c.tint} rounded-xl p-2`}>
              <div className="w-full h-8 rounded-lg bg-black/[0.055] mb-1.5" />
              <div className="text-[7px] font-bold text-slate-700 leading-tight truncate">
                {c.label}
              </div>
              <div
                className="text-[6.5px] font-bold mt-0.5"
                style={{ color: site.accent }}
              >
                {c.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer bar */}
      <div className="bg-slate-50 border-t border-slate-100 flex items-center justify-between px-4 py-2">
        <div className="flex gap-3">
          {["Accueil", site.nav[0], site.nav[1], "Contact"].map((n) => (
            <span key={n} className="text-[7px] text-slate-400 font-medium">
              {n}
            </span>
          ))}
        </div>
        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shadow-sm shadow-green-500/40">
          <Phone className="w-3 h-3 text-white fill-white" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────  Hero  ───────────── */
export default function Hero() {
  const [active, setActive] = useState(0);
  const [narrow, setNarrow] = useState(false);
  const [paused, setPaused] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const n = sites.length;

  useEffect(() => {
    const check = () => setNarrow(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((i) => (i + 1) % n), 4000);
    return () => clearInterval(t);
  }, [paused, n]);

  /* Mouse parallax tilt */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const tiltY = useTransform(sx, [-0.5, 0.5], [10, -10]);
  const tiltX = useTransform(sy, [-0.5, 0.5], [-6, 6]);

  const onMove = (e: React.MouseEvent) => {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const current = sites[active];

  // Circular signed distance from active
  const offsetOf = (i: number) => {
    let d = i - active;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  const spread = narrow ? 40 : 56;
  const depth = narrow ? 150 : 230;
  const rot = narrow ? 28 : 40;
  const maxVisible = narrow ? 1 : 2;

  return (
    <section className="relative bg-white overflow-hidden pt-28 pb-20 lg:pt-32 lg:pb-28">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      {/* Ambient glow */}
      <motion.div
        className="absolute left-1/2 top-[42%] -translate-x-1/2 w-[720px] h-[420px] rounded-full blur-[130px] pointer-events-none"
        animate={{ backgroundColor: current.accent, opacity: 0.16 }}
        transition={{ duration: 0.9 }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Copy ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-14 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-[12px] font-semibold px-4 py-2 rounded-full mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Agence Web au Maroc
          </div>

          <h1
            className="font-black text-slate-900 leading-[1.04] mb-6"
            style={{ fontSize: "clamp(36px, 6vw, 68px)", letterSpacing: "-0.04em" }}
          >
            Votre entreprise mérite un site
            <br className="hidden sm:block" />{" "}
            qui <span className="text-blue-600">inspire confiance.</span>
          </h1>

          <p className="text-slate-500 text-[17px] leading-relaxed mb-9 max-w-xl mx-auto">
            Nous créons des sites web modernes, rapides et professionnels pour les
            entreprises au Maroc. Livré en 7 jours.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-8">
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
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold text-[15px] px-7 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-green-500/25"
            >
              <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-white shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
              Demander mon site
            </a>
          </div>

          <div className="flex flex-wrap gap-5 justify-center">
            {["Livraison en 7 jours", "Support inclus", "Mobile-first"].map((t) => (
              <div key={t} className="flex items-center gap-1.5 text-slate-500 text-[13px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                {t}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── 3D carousel ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="relative"
        >
          <div
            ref={stageRef}
            onMouseMove={onMove}
            onMouseLeave={() => {
              onLeave();
              setPaused(false);
            }}
            onMouseEnter={() => setPaused(true)}
            className="relative h-[400px] sm:h-[440px] lg:h-[470px]"
            style={{ perspective: "2200px", perspectiveOrigin: "50% 45%" }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                transformStyle: "preserve-3d",
                rotateX: tiltX,
                rotateY: tiltY,
              }}
            >
              {sites.map((site, i) => {
                const d = offsetOf(i);
                const ad = Math.abs(d);
                const hidden = ad > maxVisible;
                const isActive = d === 0;

                return (
                  <motion.div
                    key={site.id}
                    onClick={() => !isActive && setActive(i)}
                    className={`absolute top-0 left-1/2 w-[min(88vw,560px)] ${
                      isActive ? "" : "cursor-pointer"
                    }`}
                    style={{
                      marginLeft: "min(-44vw, -280px)",
                      transformStyle: "preserve-3d",
                      zIndex: 30 - ad,
                      pointerEvents: hidden ? "none" : "auto",
                    }}
                    animate={{
                      x: `${d * spread}%`,
                      z: -ad * depth,
                      rotateY: -d * rot,
                      scale: 1 - ad * 0.14,
                      opacity: hidden ? 0 : isActive ? 1 : 0.45,
                      filter: isActive ? "blur(0px)" : "blur(1.5px)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 90,
                      damping: 20,
                      mass: 0.9,
                    }}
                  >
                    {/* Card + depth shadow */}
                    <div
                      style={{
                        filter: isActive
                          ? "drop-shadow(0 40px 70px rgba(15,23,42,0.28)) drop-shadow(0 12px 24px rgba(15,23,42,0.14))"
                          : "drop-shadow(0 20px 40px rgba(15,23,42,0.16))",
                      }}
                    >
                      <SiteMockup site={site} />
                    </div>

                    {/* Floor reflection */}
                    <div
                      className="mt-2 h-16 rounded-2xl opacity-30"
                      style={{
                        background: `linear-gradient(to bottom, ${site.accent}22, transparent)`,
                        transform: "rotateX(72deg) scaleY(0.5)",
                        transformOrigin: "top",
                        filter: "blur(10px)",
                      }}
                    />

                    {/* Badge on the active card */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.15, type: "spring", stiffness: 220 }}
                        className="absolute -top-4 -right-3 sm:-right-6 bg-white rounded-2xl px-4 py-2.5 shadow-xl ring-1 ring-slate-900/[0.06] flex items-center gap-2.5"
                        style={{ transform: "translateZ(60px)" }}
                      >
                        <div className="w-7 h-7 rounded-xl bg-green-500 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="text-[12px] font-black text-slate-900 leading-tight">
                            Site livré
                          </div>
                          <div className="text-[10px] text-slate-400">en 7 jours</div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* ── Controls ── */}
          <div className="flex items-center justify-center gap-5 mt-8">
            <button
              onClick={() => setActive((i) => (i - 1 + n) % n)}
              aria-label="Précédent"
              className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {sites.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActive(i)}
                  aria-label={s.label}
                  className="group py-2"
                >
                  <div
                    className="rounded-full transition-all duration-400"
                    style={{
                      width: i === active ? 26 : 8,
                      height: 8,
                      backgroundColor: i === active ? current.accent : "#CBD5E1",
                    }}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={() => setActive((i) => (i + 1) % n)}
              aria-label="Suivant"
              className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="text-center mt-1"
          >
            <span className="text-slate-400 text-[12.5px] font-medium">
              Modèle{" "}
              <span className="font-bold text-slate-700">{current.label}</span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
