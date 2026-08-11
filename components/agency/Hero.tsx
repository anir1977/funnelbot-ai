"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
    accent: "#E11D48",
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

type Site = (typeof sites)[0];

/* ─────────────  Desktop mockup  ───────────── */
function SiteMockup({ site }: { site: Site }) {
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
          <div className="text-white font-black text-[16px] leading-[1.2] mb-3.5 max-w-[78%]">
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
          {["Accueil", site.nav[0], site.nav[1], "Contact"].map((nm) => (
            <span key={nm} className="text-[7px] text-slate-400 font-medium">
              {nm}
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

/* ─────────────  Floating phone mockup  ───────────── */
function PhoneMockup({ site }: { site: Site }) {
  return (
    <div className="w-[118px] rounded-[26px] bg-slate-950 p-[5px] ring-1 ring-white/10 shadow-[0_30px_60px_-15px_rgba(15,23,42,0.5)]">
      <div className="relative rounded-[21px] overflow-hidden bg-white">
        {/* Notch */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-9 h-[5px] rounded-full bg-slate-950 z-10" />

        {/* Photo hero */}
        <div className="relative h-[92px] overflow-hidden">
          <img
            src={site.photo}
            alt=""
            draggable={false}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${site.overlay}`} />
          <div className="absolute bottom-0 left-0 right-0 p-2">
            <div
              className="text-[5px] font-bold uppercase tracking-[0.15em] mb-0.5"
              style={{ color: site.accent }}
            >
              {site.brand}
            </div>
            <div className="text-white font-black text-[7.5px] leading-tight">
              {site.hero}
            </div>
          </div>
        </div>

        {/* Mini cards */}
        <div className="p-2 space-y-1.5">
          {site.cards.slice(0, 2).map((c) => (
            <div
              key={c.label}
              className={`${c.tint} rounded-lg p-1.5 flex items-center gap-1.5`}
            >
              <div className="w-6 h-6 rounded-md bg-black/[0.06] shrink-0" />
              <div className="min-w-0">
                <div className="text-[5.5px] font-bold text-slate-700 truncate">
                  {c.label}
                </div>
                <div
                  className="text-[5px] font-bold"
                  style={{ color: site.accent }}
                >
                  {c.sub}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp bar */}
        <div className="bg-green-500 flex items-center justify-center gap-1 py-1.5">
          <Phone className="w-2 h-2 text-white fill-white" />
          <span className="text-white text-[5.5px] font-bold">Contact WhatsApp</span>
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
  const current = sites[active];

  const next = useCallback(() => setActive((i) => (i + 1) % n), [n]);
  const prev = useCallback(() => setActive((i) => (i - 1 + n) % n), [n]);

  /* Responsive */
  useEffect(() => {
    const check = () => setNarrow(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* Autoplay */
  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 4200);
    return () => clearInterval(t);
  }, [paused, next]);

  /* Keyboard */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  /* Mouse parallax */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 18 });
  const sy = useSpring(my, { stiffness: 55, damping: 18 });
  const tiltY = useTransform(sx, [-0.5, 0.5], [12, -12]);
  const tiltX = useTransform(sy, [-0.5, 0.5], [-7, 7]);

  const onMove = (e: React.MouseEvent) => {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  /* Swipe / drag */
  const dragX = useRef<number | null>(null);
  const dragged = useRef(false);

  const onPointerDown = (e: React.PointerEvent) => {
    dragX.current = e.clientX;
    dragged.current = false;
    setPaused(true);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragX.current === null) return;
    const dx = e.clientX - dragX.current;
    if (Math.abs(dx) > 55) {
      dragged.current = true;
      dx > 0 ? prev() : next();
    }
    dragX.current = null;
  };

  /* Geometry */
  const offsetOf = (i: number) => {
    let d = i - active;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  const spread = narrow ? 42 : 58;
  const depth = narrow ? 170 : 280;
  const rot = narrow ? 30 : 42;
  const maxVisible = narrow ? 1 : 2;

  return (
    <section className="relative bg-white overflow-hidden pt-28 pb-24 lg:pt-32 lg:pb-32">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      {/* Ambient glow — follows active accent */}
      <motion.div
        className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 w-[820px] h-[480px] rounded-full blur-[140px] pointer-events-none"
        animate={{ backgroundColor: current.accent, opacity: 0.18 }}
        transition={{ duration: 1 }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Copy ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
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

          <p className="text-slate-500 text-[17px] leading-relaxed mb-8 max-w-xl mx-auto">
            Nous créons des sites web modernes, rapides et professionnels pour les
            entreprises au Maroc. Livré en 7 jours.
          </p>

          <div className="flex flex-wrap gap-5 justify-center">
            {["Livraison en 7 jours", "Support inclus", "Mobile-first"].map((t) => (
              <div
                key={t}
                className="flex items-center gap-1.5 text-slate-500 text-[13px]"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                {t}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── 3D carousel ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="relative"
        >
          <div
            ref={stageRef}
            onMouseMove={onMove}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => {
              mx.set(0);
              my.set(0);
              setPaused(false);
            }}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            className="relative h-[420px] sm:h-[450px] lg:h-[480px] select-none touch-pan-y"
            style={{ perspective: "2400px", perspectiveOrigin: "50% 42%" }}
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
                    onClick={() => {
                      if (dragged.current) return;
                      if (!isActive) setActive(i);
                    }}
                    className={`absolute top-0 left-1/2 w-[min(88vw,580px)] ${
                      isActive ? "" : "cursor-pointer"
                    }`}
                    style={{
                      marginLeft: "min(-44vw, -290px)",
                      transformStyle: "preserve-3d",
                      zIndex: 30 - ad,
                      pointerEvents: hidden ? "none" : "auto",
                    }}
                    animate={{
                      x: `${d * spread}%`,
                      z: -ad * depth,
                      rotateY: -d * rot,
                      scale: 1 - ad * 0.13,
                      opacity: hidden ? 0 : isActive ? 1 : 0.5,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 85,
                      damping: 19,
                      mass: 0.95,
                    }}
                  >
                    {/* Card — filter lives here so the parent keeps preserve-3d */}
                    <div
                      className="relative"
                      style={{
                        filter: isActive
                          ? "drop-shadow(0 45px 80px rgba(15,23,42,0.30)) drop-shadow(0 14px 28px rgba(15,23,42,0.15))"
                          : "blur(1.8px) drop-shadow(0 22px 45px rgba(15,23,42,0.18))",
                      }}
                    >
                      <SiteMockup site={site} />

                      {/* Directional light falloff on angled cards */}
                      {!isActive && (
                        <div
                          className="absolute inset-0 rounded-2xl pointer-events-none"
                          style={{
                            background:
                              d < 0
                                ? "linear-gradient(to right, rgba(15,23,42,0.38), rgba(15,23,42,0.04))"
                                : "linear-gradient(to left, rgba(15,23,42,0.38), rgba(15,23,42,0.04))",
                          }}
                        />
                      )}
                    </div>

                    {/* Floor reflection */}
                    <div
                      className="mt-3 h-20 rounded-2xl opacity-25 pointer-events-none"
                      style={{
                        background: `linear-gradient(to bottom, ${site.accent}33, transparent 70%)`,
                        transform: "rotateX(74deg) scaleY(0.55)",
                        transformOrigin: "top",
                        filter: "blur(12px)",
                      }}
                    />

                    {/* Floating phone — front layer, active card only */}
                    {isActive && !narrow && (
                      <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="absolute -left-12 lg:-left-16 bottom-2"
                        style={{ transform: "translateZ(110px) rotateY(9deg)" }}
                      >
                        <PhoneMockup site={site} />
                      </motion.div>
                    )}

                    {/* Badge — front layer, active card only */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.15, type: "spring", stiffness: 220 }}
                        className="absolute -top-5 -right-3 sm:-right-8 bg-white rounded-2xl px-4 py-2.5 shadow-xl ring-1 ring-slate-900/[0.06] flex items-center gap-2.5"
                        style={{ transform: "translateZ(80px)" }}
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
          <div className="flex items-center justify-center gap-5 mt-10">
            <button
              onClick={prev}
              aria-label="Modèle précédent"
              className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {sites.map((s, i) =>
                i === active ? (
                  <div
                    key={s.id}
                    className="relative w-8 h-2 rounded-full bg-slate-200 overflow-hidden"
                  >
                    <motion.div
                      key={`fill-${active}-${paused}`}
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ backgroundColor: current.accent }}
                      initial={{ width: paused ? "100%" : "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: paused ? 0.25 : 4.2,
                        ease: "linear",
                      }}
                    />
                  </div>
                ) : (
                  <button
                    key={s.id}
                    onClick={() => setActive(i)}
                    aria-label={s.label}
                    className="w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-400 transition-colors duration-200"
                  />
                )
              )}
            </div>

            <button
              onClick={next}
              aria-label="Modèle suivant"
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
            className="text-center mt-3"
          >
            <span className="text-slate-400 text-[12.5px] font-medium">
              Modèle <span className="font-bold text-slate-700">{current.label}</span>
              <span className="hidden sm:inline text-slate-300"> · glissez pour naviguer</span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
