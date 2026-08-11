"use client";

import { motion } from "framer-motion";
import { Shield, Search, Star, MessageSquare, TrendingUp } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Inspirer confiance à vos clients",
    desc: "Un site professionnel rassure vos clients et montre que vous êtes sérieux. 75% des gens jugent la crédibilité d'une entreprise par son site.",
  },
  {
    icon: Search,
    title: "Apparaître sur Google",
    desc: "Quand quelqu'un cherche un restaurant ou un salon près de chez lui, votre site vous place en tête des résultats.",
  },
  {
    icon: Star,
    title: "Présenter vos services clairement",
    desc: "Photos, tarifs, horaires, localisation — tout est visible en un coup d'œil. Vos clients trouvent ce qu'ils cherchent facilement.",
  },
  {
    icon: MessageSquare,
    title: "Obtenir plus de contacts WhatsApp",
    desc: "Un bouton WhatsApp bien placé transforme les visiteurs en clients. Simple, direct, efficace.",
  },
  {
    icon: TrendingUp,
    title: "Se démarquer des concurrents",
    desc: "La plupart de vos concurrents n'ont pas encore de site professionnel. Prenez l'avance maintenant.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-20 lg:py-28 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <p className="text-blue-400 text-[12px] font-semibold uppercase tracking-widest mb-5">
              Pourquoi un site web
            </p>
            <h2
              className="font-black text-white mb-6 leading-tight"
              style={{ fontSize: "clamp(28px, 4vw, 46px)", letterSpacing: "-0.03em" }}
            >
              Votre présence en ligne,
              <br />
              <span className="text-blue-400">votre meilleur commercial.</span>
            </h2>
            <p className="text-slate-400 text-[16px] leading-relaxed mb-8">
              Un site web professionnel travaille pour vous 24h/24. Il répond aux questions de vos clients, montre votre travail et génère des contacts — même quand vous dormez.
            </p>
            <a
              href="https://wa.me/212708025467?text=Bonjour%2C%20je%20veux%20en%20savoir%20plus%20sur%20la%20cr%C3%A9ation%20de%20site%20web."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[15px] px-7 py-4 rounded-xl transition-all duration-200"
            >
              En savoir plus sur WhatsApp
            </a>
          </motion.div>

          {/* Right */}
          <div className="space-y-4">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex gap-4 bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.14] rounded-xl p-4 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4.5 h-4.5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-[14px] mb-1">{r.title}</h3>
                    <p className="text-slate-400 text-[13px] leading-relaxed">{r.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
