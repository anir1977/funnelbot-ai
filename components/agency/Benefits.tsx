"use client";

import { motion } from "framer-motion";
import { Smartphone, Zap, Award, Headphones } from "lucide-react";

const benefits = [
  {
    icon: Award,
    title: "Design professionnel",
    desc: "Un site qui reflète l'image de votre entreprise et inspire confiance à vos clients dès le premier regard.",
    color: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    icon: Smartphone,
    title: "Compatible mobile",
    desc: "Votre site s'adapte parfaitement à tous les écrans — téléphone, tablette et ordinateur.",
    color: "bg-purple-50 text-purple-600 border-purple-100",
  },
  {
    icon: Zap,
    title: "Livraison rapide",
    desc: "Votre site web est prêt en 7 jours ouvrables. Nous respectons les délais pour que vous puissiez lancer rapidement.",
    color: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    icon: Headphones,
    title: "Assistance personnalisée",
    desc: "Nous vous accompagnons à chaque étape et restons disponibles pour toute modification ou question.",
    color: "bg-green-50 text-green-600 border-green-100",
  },
];

export default function Benefits() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-blue-600 text-[12px] font-semibold uppercase tracking-widest mb-4">
            Pourquoi nous choisir
          </p>
          <h2
            className="font-black text-slate-900"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-0.03em" }}
          >
            Tout ce qu'il faut pour réussir en ligne
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-300"
              >
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-5 ${b.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-[16px] mb-2">{b.title}</h3>
                <p className="text-slate-500 text-[13.5px] leading-relaxed">{b.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
