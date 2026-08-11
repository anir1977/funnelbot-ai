"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "+120", label: "Projets réalisés", sub: "pour nos clients" },
  { value: "+70", label: "Entreprises accompagnées", sub: "partout au Maroc" },
  { value: "7", label: "Jours de livraison", sub: "en moyenne" },
  { value: "98%", label: "Clients satisfaits", sub: "nous recommandent" },
];

export default function Stats() {
  return (
    <section className="bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-100">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="py-10 px-6 text-center"
            >
              <div
                className="font-black text-slate-900 mb-1.5"
                style={{ fontSize: "clamp(32px, 4vw, 46px)", letterSpacing: "-0.04em" }}
              >
                {s.value}
              </div>
              <div className="font-bold text-slate-900 text-[13.5px] mb-0.5">{s.label}</div>
              <div className="text-slate-400 text-[12px]">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
