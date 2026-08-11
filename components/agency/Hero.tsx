"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

function BrowserMockup() {
  return (
    <div className="relative w-full max-w-[580px] mx-auto">
      {/* Shadow */}
      <div className="absolute inset-0 translate-y-4 scale-95 bg-slate-900/10 rounded-2xl blur-2xl" />
      {/* Browser frame */}
      <div className="relative bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xl shadow-slate-900/10">
        {/* Browser bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-[11px] text-slate-500 font-medium">www.restaurant-laperle.ma</span>
          </div>
        </div>

        {/* Website preview — Restaurant */}
        <div className="bg-white">
          {/* Hero */}
          <div className="relative bg-slate-900 h-[160px] overflow-hidden flex flex-col items-center justify-center">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: "radial-gradient(ellipse at 30% 50%, #b45309 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, #1e3a5f 0%, transparent 60%)",
              }}
            />
            <div className="relative z-10 text-center px-4">
              <div className="w-8 h-[1px] bg-amber-400 mx-auto mb-2" />
              <p className="text-amber-400 text-[9px] tracking-[0.2em] uppercase font-semibold mb-1">Restaurant</p>
              <h2 className="text-white text-[18px] font-black tracking-tight leading-tight">La Perle de Marrakech</h2>
              <div className="w-8 h-[1px] bg-amber-400 mx-auto mt-2" />
            </div>
            <div className="absolute bottom-3 flex gap-2">
              <div className="bg-amber-500 text-white text-[8px] font-bold px-3 py-1 rounded-full">Réserver</div>
              <div className="border border-white/40 text-white text-[8px] font-medium px-3 py-1 rounded-full">Menu</div>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 py-3 grid grid-cols-3 gap-2">
            {[
              { label: "Tajine Royal", price: "120 MAD", color: "bg-amber-50" },
              { label: "Couscous", price: "95 MAD", color: "bg-orange-50" },
              { label: "Pastilla", price: "85 MAD", color: "bg-yellow-50" },
            ].map((item) => (
              <div key={item.label} className={`${item.color} rounded-xl p-2.5`}>
                <div className="w-full h-12 bg-slate-200 rounded-lg mb-1.5" />
                <p className="text-[9px] font-bold text-slate-800">{item.label}</p>
                <p className="text-[8px] text-amber-600 font-semibold">{item.price}</p>
              </div>
            ))}
          </div>

          {/* Footer strip */}
          <div className="border-t border-slate-100 px-4 py-2.5 flex items-center justify-between">
            <div className="flex gap-3">
              {["Accueil", "Menu", "Galerie", "Contact"].map((t) => (
                <span key={t} className="text-[8px] text-slate-500">{t}</span>
              ))}
            </div>
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute -right-4 top-16 bg-white rounded-xl shadow-lg border border-slate-100 px-3 py-2.5 flex items-center gap-2"
      >
        <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
          <Check className="w-3.5 h-3.5 text-green-600" strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-900">Site livré</p>
          <p className="text-[9px] text-slate-500">en 7 jours</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        className="absolute -left-4 bottom-16 bg-white rounded-xl shadow-lg border border-slate-100 px-3 py-2.5 flex items-center gap-2"
      >
        <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-blue-600 text-[10px] font-black">📱</span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-900">100% Mobile</p>
          <p className="text-[9px] text-slate-500">Tous les écrans</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-white flex items-center overflow-hidden pt-16">
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-[12px] font-semibold px-3.5 py-1.5 rounded-full mb-7"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Agence Web au Maroc
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="font-black text-slate-900 mb-6 leading-[1.06]"
              style={{ fontSize: "clamp(36px, 5.5vw, 62px)", letterSpacing: "-0.035em" }}
            >
              Votre entreprise
              <br />
              mérite un site qui
              <br />
              <span className="text-blue-600">inspire confiance.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-slate-500 text-[17px] leading-relaxed mb-10 max-w-[480px]"
            >
              Nous créons des sites web modernes, rapides et professionnels pour les entreprises au Maroc.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <a
                href="#demos"
                className="group inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[15px] px-7 py-4 rounded-xl transition-all duration-200"
              >
                Voir nos réalisations
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="https://wa.me/212600000000?text=Bonjour%2C%20je%20souhaite%20cr%C3%A9er%20un%20site%20web%20pour%20mon%20entreprise."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold text-[15px] px-7 py-4 rounded-xl transition-all duration-200"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                </svg>
                Demander mon site
              </a>
            </motion.div>

            {/* Trust */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-5 text-[13px] text-slate-500"
            >
              {["Livraison en 7 jours", "Support inclus", "Mobile-first"].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={2.5} />
                  {t}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="hidden lg:block"
          >
            <BrowserMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
