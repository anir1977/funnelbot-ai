"use client";

import { motion } from "framer-motion";

const tools = [
  { name: "Next.js", desc: "Framework moderne", mono: "▲" },
  { name: "React", desc: "Interfaces dynamiques", mono: "⚛" },
  { name: "WordPress", desc: "Gestion de contenu", mono: "W" },
  { name: "Tailwind", desc: "Design sur mesure", mono: "≈" },
  { name: "Vercel", desc: "Hébergement rapide", mono: "▲" },
  { name: "Figma", desc: "Maquettes & design", mono: "◈" },
];

export default function Tools() {
  return (
    <section className="py-20 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-blue-600 text-[12px] font-semibold uppercase tracking-widest mb-4">
            Notre stack technique
          </p>
          <h2
            className="font-black text-slate-900 mb-3"
            style={{ fontSize: "clamp(24px, 3.5vw, 38px)", letterSpacing: "-0.03em" }}
          >
            Les outils que nous utilisons
          </h2>
          <p className="text-slate-500 text-[15px] max-w-lg mx-auto">
            Des technologies modernes et éprouvées pour des sites rapides, sécurisés et durables.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {tools.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="bg-white border border-slate-200 rounded-2xl p-5 text-center hover:border-slate-300 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center mx-auto mb-3 text-[18px] font-black group-hover:bg-blue-600 transition-colors duration-300">
                {t.mono}
              </div>
              <div className="font-bold text-slate-900 text-[13.5px] mb-0.5">{t.name}</div>
              <div className="text-slate-400 text-[11.5px]">{t.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
