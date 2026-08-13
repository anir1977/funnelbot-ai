"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";

const types = [
  "Restaurant / Café",
  "Salon de beauté / Barbier",
  "Immobilier",
  "Boutique / Commerce",
  "Santé / Cabinet",
  "Autre activité",
];

const budgets = [
  "Moins de 2 000 MAD",
  "2 000 – 4 000 MAD",
  "4 000 – 8 000 MAD",
  "Plus de 8 000 MAD",
];

const contactDetails = [
  {
    icon: Phone,
    label: "Téléphone",
    value: "+212 708 025 467",
    href: "tel:+212708025467",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@funnelslibrary.com",
    href: "mailto:contact@funnelslibrary.com",
  },
  { icon: MapPin, label: "Zone", value: "Tout le Maroc", href: null },
  { icon: Clock, label: "Horaires", value: "Lun – Sam · 9h – 20h", href: null },
];

export default function Contact() {
  const [form, setForm] = useState({
    nom: "",
    tel: "",
    type: types[0],
    budget: budgets[1],
    message: "",
  });

  const set = (key: keyof typeof form) => (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => setForm({ ...form, [key]: event.target.value });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

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

    // Open WhatsApp first and synchronously: browsers only allow a popup while
    // the click is still being handled, so awaiting the fetch would get it
    // blocked. Recording the enquiry is a safety net, not a gate — if it fails,
    // the conversation must still happen.
    window.open(
      `https://wa.me/212708025467?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );

    void fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom: form.nom,
        telephone: form.tel,
        activite: form.type,
        budget: form.budget,
        message: form.message,
      }),
      keepalive: true,
    }).catch(() => {
      /* Never surface this: the prospect is already in WhatsApp. */
    });
  };

  const inputClass =
    "w-full h-12 bg-slate-50/80 border border-slate-200 rounded-xl px-4 text-[14px] text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-slate-50 py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-80 w-[760px] -translate-x-1/2 rounded-full bg-blue-100/50 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-10 max-w-3xl lg:mb-12"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-700 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            Votre projet commence ici
          </div>
          <h2
            className="max-w-2xl font-black leading-[1.04] text-slate-950"
            style={{
              fontSize: "clamp(34px, 5vw, 58px)",
              letterSpacing: "-0.045em",
            }}
          >
            Transformons votre idée en{" "}
            <span className="text-blue-600">site performant.</span>
          </h2>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-slate-500">
            Parlez-nous de votre activité. Nous vous répondons avec une
            recommandation claire et un devis gratuit, sans engagement.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="grid overflow-hidden rounded-[30px] border border-slate-200/80 bg-white shadow-[0_28px_80px_-36px_rgba(15,23,42,0.35)] lg:grid-cols-[0.85fr_1.35fr]"
        >
          <aside className="relative overflow-hidden bg-slate-950 p-7 text-white sm:p-10 lg:p-12">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />
            <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative flex h-full flex-col">
              <div className="mb-10">
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3.5 py-2 text-[11px] font-bold text-emerald-300">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Disponible maintenant
                </div>

                <h3 className="max-w-sm text-[28px] font-black leading-[1.15] tracking-[-0.03em]">
                  Un échange simple. Une réponse concrète.
                </h3>
                <p className="mt-4 max-w-sm text-[14px] leading-6 text-slate-400">
                  Pas de jargon ni de rendez-vous inutile. Nous étudions votre
                  besoin et vous proposons la meilleure approche.
                </p>
              </div>

              <div className="mb-10 grid gap-3">
                {[
                  "Première réponse sous 2 heures ouvrables",
                  "Devis détaillé et totalement gratuit",
                  "Accompagnement humain du début à la fin",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span className="text-[13px] leading-5 text-slate-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/212708025467?text=Bonjour%2C%20je%20souhaite%20parler%20de%20mon%20projet%20web."
                target="_blank"
                rel="noopener noreferrer"
                className="group mb-10 inline-flex w-full items-center justify-between rounded-2xl bg-emerald-500 px-5 py-4 font-bold text-white transition-all duration-200 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20"
              >
                <span className="flex items-center gap-3">
                  <Phone className="h-[18px] w-[18px]" />
                  Discuter sur WhatsApp
                </span>
                <ArrowUpRight className="h-[18px] w-[18px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              <div className="mt-auto border-t border-white/10 pt-8">
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {contactDetails.map((item) => {
                    const Icon = item.icon;
                    const body = (
                      <>
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
                          <Icon className="h-4 w-4 text-blue-300" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                            {item.label}
                          </div>
                          <div className="mt-0.5 truncate text-[12.5px] font-semibold text-slate-200">
                            {item.value}
                          </div>
                        </div>
                      </>
                    );

                    return item.href ? (
                      <a
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-3 transition-opacity hover:opacity-80"
                      >
                        {body}
                      </a>
                    ) : (
                      <div key={item.label} className="flex items-center gap-3">
                        {body}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          <form
            onSubmit={handleSubmit}
            className="p-7 sm:p-10 lg:p-12 xl:p-14"
          >
            <div className="mb-8 flex items-start justify-between gap-5">
              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">
                  Demande de devis
                </p>
                <h3 className="text-[24px] font-black tracking-[-0.025em] text-slate-950">
                  Parlez-nous de votre projet
                </h3>
                <p className="mt-2 text-[13.5px] text-slate-500">
                  Quelques informations suffisent pour démarrer.
                </p>
              </div>
              <div className="hidden shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-semibold text-slate-500 sm:flex">
                <Clock className="h-3.5 w-3.5 text-blue-600" />
                2 min
              </div>
            </div>

            <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-[12px] font-bold text-slate-700">
                  Votre nom
                </label>
                <input
                  type="text"
                  value={form.nom}
                  onChange={set("nom")}
                  placeholder="Ex : Youssef Alami"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-2 block text-[12px] font-bold text-slate-700">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={form.tel}
                  onChange={set("tel")}
                  placeholder="06 00 00 00 00"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-2 block text-[12px] font-bold text-slate-700">
                  Votre activité
                </label>
                <select
                  value={form.type}
                  onChange={set("type")}
                  className={inputClass}
                >
                  {types.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-[12px] font-bold text-slate-700">
                  Budget estimé
                </label>
                <select
                  value={form.budget}
                  onChange={set("budget")}
                  className={inputClass}
                >
                  {budgets.map((budget) => (
                    <option key={budget}>{budget}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-[12px] font-bold text-slate-700">
                Décrivez votre projet
              </label>
              <textarea
                value={form.message}
                onChange={set("message")}
                rows={5}
                placeholder="Votre activité, vos objectifs et les fonctionnalités souhaitées…"
                className={`${inputClass} h-auto resize-none py-3.5 leading-6`}
              />
            </div>

            <button
              type="submit"
              className="group mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-blue-600 py-4 text-[14px] font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25"
            >
              Envoyer ma demande
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-center text-[11.5px] text-slate-400">
              <ShieldCheck className="h-4 w-4 text-slate-400" />
              Vos informations restent confidentielles. Sans spam.
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
