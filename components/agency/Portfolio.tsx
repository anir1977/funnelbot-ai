"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { demoSlugForCategory } from "@/lib/demos";

type Project = {
  title: string;
  city: string;
  cat: string;
  desc: string;
  photo: string;
  tags: string[];
  accent: string;
};

const projects: Project[] = [
  {
    title: "La Perle de Marrakech",
    city: "Marrakech",
    cat: "Restaurant",
    desc: "Site vitrine gastronomique avec menu en ligne et réservation WhatsApp.",
    photo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80&fit=crop",
    tags: ["Menu en ligne", "Réservation", "Galerie"],
    accent: "#D97706",
  },
  {
    title: "Café Atlas",
    city: "Casablanca",
    cat: "Café",
    desc: "Carte digitale, commande à emporter et présentation de l'ambiance.",
    photo: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80&fit=crop",
    tags: ["Carte digitale", "Click & Collect"],
    accent: "#92400E",
  },
  {
    title: "Studio Rose",
    city: "Rabat",
    cat: "Beauté",
    desc: "Salon de beauté avec prise de rendez-vous et galerie avant/après.",
    photo: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80&fit=crop",
    tags: ["Prise de RDV", "Galerie", "Tarifs"],
    accent: "#BE185D",
  },
  {
    title: "Horizon Immobilier",
    city: "Casablanca",
    cat: "Immobilier",
    desc: "Portail d'annonces avec filtres de recherche et formulaire d'estimation.",
    photo: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fit=crop",
    tags: ["Annonces", "Filtres", "Estimation"],
    accent: "#2563EB",
  },
  {
    title: "Boutique Nour",
    city: "Fès",
    cat: "Boutique",
    desc: "Catalogue de mode avec commande directe par WhatsApp.",
    photo: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80&fit=crop",
    tags: ["Catalogue", "Commande WhatsApp"],
    accent: "#7C3AED",
  },
  {
    title: "Cabinet Dentaire Sourire",
    city: "Rabat",
    cat: "Santé",
    desc: "Site médical avec présentation des soins et prise de rendez-vous en ligne.",
    photo: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80&fit=crop",
    tags: ["Prise de RDV", "Soins", "Équipe"],
    accent: "#0891B2",
  },
  {
    title: "Auto Prestige",
    city: "Tanger",
    cat: "Automobile",
    desc: "Garage et vente de véhicules avec catalogue et demande de devis.",
    photo: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80&fit=crop",
    tags: ["Catalogue auto", "Devis", "Services"],
    accent: "#DC2626",
  },
  {
    title: "Fit Club Agadir",
    city: "Agadir",
    cat: "Sport",
    desc: "Salle de sport avec planning des cours et abonnements en ligne.",
    photo: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80&fit=crop",
    tags: ["Planning", "Abonnements", "Coachs"],
    accent: "#16A34A",
  },
  {
    title: "Riad Zitoun",
    city: "Marrakech",
    cat: "Hôtellerie",
    desc: "Riad traditionnel avec galerie immersive et réservation de chambres.",
    photo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&fit=crop",
    tags: ["Réservation", "Galerie", "Multilingue"],
    accent: "#B45309",
  },
  {
    title: "Pâtisserie Chahrazad",
    city: "Meknès",
    cat: "Pâtisserie",
    desc: "Vitrine de pâtisserie marocaine avec commandes pour événements.",
    photo: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80&fit=crop",
    tags: ["Commandes", "Événements", "Galerie"],
    accent: "#EA580C",
  },
  {
    title: "Cabinet Alami & Associés",
    city: "Casablanca",
    cat: "Services",
    desc: "Cabinet d'avocats avec présentation des domaines d'expertise.",
    photo: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80&fit=crop",
    tags: ["Expertise", "Contact", "Blog"],
    accent: "#1E40AF",
  },
  {
    title: "Barber House",
    city: "Tanger",
    cat: "Barbier",
    desc: "Salon de barbier avec réservation de créneaux et tarifs affichés.",
    photo: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&q=80&fit=crop",
    tags: ["Réservation", "Tarifs", "Galerie"],
    accent: "#0F172A",
  },
  {
    title: "Atlas Évasion",
    city: "Marrakech",
    cat: "Voyage",
    desc: "Agence de voyage : circuits désert, excursions et réservation en ligne.",
    photo: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80&fit=crop",
    tags: ["Circuits", "Réservation", "Multilingue"],
    accent: "#0D9488",
  },
  {
    title: "Dar Salam Événements",
    city: "Marrakech",
    cat: "Événementiel",
    desc: "Salle des fêtes : présentation des espaces, formules et demande de date.",
    photo: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80&fit=crop",
    tags: ["Espaces", "Formules", "Réservation"],
    accent: "#A21CAF",
  },
  {
    title: "Auto-École Najah",
    city: "Casablanca",
    cat: "Auto-école",
    desc: "Auto-école : forfaits, code en ligne et inscription directe.",
    photo: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80&fit=crop",
    tags: ["Forfaits", "Code en ligne", "Inscription"],
    accent: "#0F766E",
  },
  {
    title: "Institut Horizon",
    city: "Rabat",
    cat: "Formation",
    desc: "Centre de formation : catalogue de cours, tarifs et inscription.",
    photo: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80&fit=crop",
    tags: ["Catalogue", "Tarifs", "Inscription"],
    accent: "#4F46E5",
  },
  {
    title: "Atelier Bennani Architectes",
    city: "Tanger",
    cat: "Architecture",
    desc: "Cabinet d'architecture : portfolio de réalisations et prise de contact.",
    photo: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80&fit=crop",
    tags: ["Réalisations", "Missions", "Contact"],
    accent: "#334155",
  },
  {
    title: "Pharmacie Al Amal",
    city: "Casablanca",
    cat: "Pharmacie",
    desc: "Pharmacie de quartier : services, horaires de garde et livraison.",
    photo: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80&fit=crop",
    tags: ["Services", "Garde", "Livraison"],
    accent: "#059669",
  },
];

/** Derived from the projects themselves so the filter can never drift out of sync. */
const cats = ["Tous", ...Array.from(new Set(projects.map((p) => p.cat)))];

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const slug = demoSlugForCategory(p.cat);

  return (
    <motion.a
      href={slug ? `/demo/${slug}` : "#contact"}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, delay: Math.min(i, 6) * 0.05 }}
      className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-300 flex flex-col"
    >
      {/* Preview */}
      <div className="p-3 pb-0">
        <div className="rounded-xl overflow-hidden border border-slate-200">
          {/* browser bar */}
          <div className="bg-slate-100 flex items-center gap-1.5 px-2.5 py-1.5">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 bg-white rounded text-[7.5px] text-slate-400 px-1.5 py-0.5 truncate font-mono">
              www.{p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.ma
            </div>
          </div>
          {/* photo */}
          <div className="relative h-40 overflow-hidden">
            <img
              src={p.photo}
              alt={p.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <div
                className="text-[8px] font-bold uppercase tracking-widest mb-0.5"
                style={{ color: p.accent }}
              >
                {p.cat} · {p.city}
              </div>
              <div className="text-white font-black text-[13px] leading-tight">{p.title}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-slate-500 text-[13px] leading-relaxed mb-4 flex-1">{p.desc}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {p.tags.map((t) => (
            <span
              key={t}
              className="text-[10.5px] font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-md"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-blue-600 font-bold text-[13px] group-hover:gap-2.5 transition-all duration-200">
          {slug ? "Voir la démo complète" : "Demander ce style"}
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </motion.a>
  );
}

export default function Portfolio() {
  const [cat, setCat] = useState("Tous");
  const [showAll, setShowAll] = useState(false);

  const filtered = cat === "Tous" ? projects : projects.filter((p) => p.cat === cat);
  const visible = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section id="demos" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-blue-600 text-[12px] font-semibold uppercase tracking-widest mb-4">
            Portfolio
          </p>
          <h2
            className="font-black text-slate-900 mb-4"
            style={{ fontSize: "clamp(28px, 4.5vw, 48px)", letterSpacing: "-0.035em" }}
          >
            Nos réalisations récentes
          </h2>
          <p className="text-slate-500 text-[16px] max-w-xl mx-auto">
            Découvrez le style de sites que nous créons pour les entreprises marocaines. Chaque design est adapté au métier du client.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => { setCat(c); setShowAll(false); }}
              className={`text-[13px] font-semibold px-4 py-2 rounded-full transition-all duration-200 ${
                cat === c
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900"
              }`}
            >
              {c}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <ProjectCard key={p.title} p={p} i={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show more */}
        {filtered.length > 6 && !showAll && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-900 font-bold text-[14px] px-6 py-3.5 rounded-xl transition-all duration-200"
            >
              Voir plus de réalisations ({filtered.length - 6})
            </button>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 text-amber-700 text-[11.5px] font-medium px-3.5 py-1.5 rounded-full mb-6">
            ✦ Sites de démonstration navigables — le vôtre sera créé sur mesure
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="/demo"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[15px] px-8 py-4 rounded-xl transition-all duration-200"
            >
              Parcourir toutes les démos
            </a>
            <a
              href="https://wa.me/212708025467?text=Bonjour%2C%20je%20veux%20un%20devis%20pour%20mon%20site%20web."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[15px] px-8 py-4 rounded-xl transition-all duration-200"
            >
              Demander un devis gratuit
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
