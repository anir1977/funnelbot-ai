"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Vous choisissez un style",
    desc: "Parcourez nos exemples et choisissez le design qui correspond à votre vision. Nous adaptons tout à votre identité.",
    icon: "🎨",
  },
  {
    num: "02",
    title: "Vous envoyez vos infos",
    desc: "Photos, logo, textes, horaires — on vous guide sur ce dont on a besoin. Pas besoin d'être expert.",
    icon: "📦",
  },
  {
    num: "03",
    title: "Nous créons votre site",
    desc: "Notre équipe développe votre site web en 5 à 7 jours. Vous recevez un lien de prévisualisation avant la mise en ligne.",
    icon: "⚙️",
  },
  {
    num: "04",
    title: "Validation & mise en ligne",
    desc: "Vous validez, on ajuste si nécessaire, puis on met votre site en ligne. Vous êtes prêt à recevoir des clients.",
    icon: "🚀",
  },
];

export default function Process() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-blue-600 text-[12px] font-semibold uppercase tracking-widest mb-4">
            Comment ça marche
          </p>
          <h2
            className="font-black text-slate-900"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-0.03em" }}
          >
            Votre site en 4 étapes
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative">
          {/* Connector line — desktop only */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-[1px] bg-gradient-to-r from-blue-100 via-blue-300 to-blue-100" />

          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Circle */}
              <div className="relative z-10 w-20 h-20 rounded-2xl bg-blue-600 flex flex-col items-center justify-center mb-6 shadow-lg shadow-blue-600/25">
                <span className="text-2xl mb-0.5">{s.icon}</span>
                <span className="text-[9px] text-blue-200 font-bold tracking-widest">{s.num}</span>
              </div>

              <h3 className="font-bold text-slate-900 text-[16px] mb-2">{s.title}</h3>
              <p className="text-slate-500 text-[13.5px] leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-14"
        >
          <a
            href="https://wa.me/212708025467?text=Bonjour%2C%20je%20veux%20d%C3%A9marrer%20mon%20projet%20de%20site%20web."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold text-[15px] px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-green-500/25"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            </svg>
            Démarrer mon projet
          </a>
        </motion.div>
      </div>
    </section>
  );
}
