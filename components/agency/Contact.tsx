"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

const types = [
  "Restaurant / Café",
  "Salon de beauté / Barbier",
  "Immobilier",
  "Boutique / Commerce",
  "Santé / Cabinet",
  "Autre activité",
];

const budgets = ["Moins de 2 000 MAD", "2 000 – 4 000 MAD", "4 000 – 8 000 MAD", "Plus de 8 000 MAD"];

export default function Contact() {
  const [form, setForm] = useState({
    nom: "",
    tel: "",
    type: types[0],
    budget: budgets[1],
    message: "",
  });

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      "Bonjour FunnelsLibrary,",
      "",
      `Nom : ${form.nom || "—"}`,
      `Téléphone : ${form.tel || "—"}`,
      `Activité : ${form.type}`,
      `Budget : ${form.budget}`,
      "",
      `Mon projet : ${form.message || "Je souhaite créer un site web."}`,
    ].join("\n");

    window.open(
      `https://wa.me/212708025467?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const inputCls =
    "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all duration-200";

  return (
    <section id="contact" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-blue-600 text-[12px] font-semibold uppercase tracking-widest mb-4">
            Contact
          </p>
          <h2
            className="font-black text-slate-900 mb-4"
            style={{ fontSize: "clamp(28px, 4.5vw, 46px)", letterSpacing: "-0.035em" }}
          >
            Parlons de votre projet
          </h2>
          <p className="text-slate-500 text-[16px] max-w-lg mx-auto">
            Remplissez le formulaire ou contactez-nous directement sur WhatsApp. Devis gratuit et sans engagement.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* ── Form ── */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-3 bg-white border border-slate-200 rounded-3xl p-7 sm:p-9"
          >
            <h3 className="font-bold text-slate-900 text-[18px] mb-1.5">Envoyez-nous un message</h3>
            <p className="text-slate-400 text-[13.5px] mb-7">
              Votre demande arrive directement sur notre WhatsApp.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[12.5px] font-semibold text-slate-700 mb-1.5">
                  Votre nom
                </label>
                <input
                  type="text"
                  value={form.nom}
                  onChange={set("nom")}
                  placeholder="Ex : Youssef Alami"
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-slate-700 mb-1.5">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={form.tel}
                  onChange={set("tel")}
                  placeholder="06 00 00 00 00"
                  className={inputCls}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[12.5px] font-semibold text-slate-700 mb-1.5">
                  Votre activité
                </label>
                <select value={form.type} onChange={set("type")} className={inputCls}>
                  {types.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-slate-700 mb-1.5">
                  Budget estimé
                </label>
                <select value={form.budget} onChange={set("budget")} className={inputCls}>
                  {budgets.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-[12.5px] font-semibold text-slate-700 mb-1.5">
                Décrivez votre projet
              </label>
              <textarea
                value={form.message}
                onChange={set("message")}
                rows={4}
                placeholder="Parlez-nous de votre entreprise et de ce que vous souhaitez sur votre site…"
                className={`${inputCls} resize-none`}
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-600 text-white font-bold text-[15px] py-4 rounded-xl transition-all duration-200 shadow-lg shadow-green-500/25"
            >
              <Send className="w-4 h-4" />
              Envoyer sur WhatsApp
            </button>

            <p className="text-center text-slate-400 text-[12px] mt-4">
              Réponse garantie dans les 2 heures ouvrables.
            </p>
          </motion.form>

          {/* ── Info card ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Quick WhatsApp */}
            <div className="bg-slate-900 rounded-3xl p-7">
              <div className="inline-flex items-center gap-2 bg-green-500/15 border border-green-500/25 text-green-400 text-[11px] font-semibold px-3 py-1.5 rounded-full mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Disponible maintenant
              </div>

              <h3 className="font-black text-white text-[20px] mb-2 leading-snug">
                Besoin d'une réponse rapide ?
              </h3>
              <p className="text-slate-400 text-[13.5px] leading-relaxed mb-6">
                Écrivez-nous directement sur WhatsApp. C'est le moyen le plus rapide d'obtenir un devis.
              </p>

              <a
                href="https://wa.me/212708025467?text=Bonjour%2C%20je%20veux%20un%20devis%20pour%20mon%20site%20web."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-600 text-white font-bold text-[15px] py-4 rounded-xl transition-all duration-200"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                </svg>
                Discuter sur WhatsApp
              </a>
            </div>

            {/* Contact details */}
            <div className="bg-white border border-slate-200 rounded-3xl p-7 space-y-5">
              {[
                { icon: Phone, label: "Téléphone", value: "+212 708 025 467", href: "tel:+212708025467" },
                { icon: Mail, label: "Email", value: "contact@funnelslibrary.com", href: "mailto:contact@funnelslibrary.com" },
                { icon: MapPin, label: "Zone", value: "Tout le Maroc", href: null },
                { icon: Clock, label: "Horaires", value: "Lun – Sam · 9h – 20h", href: null },
              ].map((it) => {
                const Icon = it.icon;
                const inner = (
                  <>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-slate-400 text-[11.5px] font-medium mb-0.5">{it.label}</div>
                      <div className="text-slate-900 font-bold text-[13.5px] truncate">{it.value}</div>
                    </div>
                  </>
                );
                return it.href ? (
                  <a key={it.label} href={it.href} className="flex items-center gap-3.5 group">
                    {inner}
                  </a>
                ) : (
                  <div key={it.label} className="flex items-center gap-3.5">
                    {inner}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
