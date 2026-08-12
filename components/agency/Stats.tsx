"use client";

import { motion } from "framer-motion";

/**
 * Commitments, not social proof.
 *
 * These four numbers are things a visitor can check today — the demos are one
 * click away, the response time is testable by writing to us, and the payment
 * terms are what we put in the quote. Nothing here depends on a track record we
 * would be asking them to take on faith.
 */
const stats = [
  { value: "18", label: "Modèles de sites", sub: "un par métier, à parcourir" },
  { value: "7 jours", label: "Votre site en ligne", sub: "délai de livraison" },
  { value: "2 h", label: "Notre délai de réponse", sub: "du lundi au samedi" },
  { value: "0 DH", label: "Avant de voir le design", sub: "vous validez, puis vous payez" },
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
                className="font-black text-slate-900 mb-1.5 whitespace-nowrap"
                style={{ fontSize: "clamp(26px, 3.2vw, 40px)", letterSpacing: "-0.04em" }}
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
