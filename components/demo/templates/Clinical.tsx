"use client";

/**
 * Clinical — professions where the visitor is deciding whether to trust you.
 * Light, tightly structured, generous whitespace, soft tinted surfaces and an
 * offering shown as a calm two-column list rather than a photo grid.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Menu, X, Check, ShieldCheck } from "lucide-react";
import { type Demo, photo } from "@/lib/demos";
import { FloatingWhatsApp, WhatsAppIcon, waLink, reveal } from "../shared";

export default function Clinical({ demo: d }: { demo: Demo }) {
  const [open, setOpen] = useState(false);
  /** Accent at a given hex alpha, e.g. tint("15") for a faint tinted surface. */
  const tint = (alpha: string) => `${d.accent}${alpha}`;

  return (
    <div className="bg-white text-slate-900">
      {/* Nav */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-[72px]">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: tint("15") }}
              >
                <ShieldCheck className="w-[18px] h-[18px]" style={{ color: d.accent }} />
              </div>
              <div>
                <div className="font-bold text-[15px] leading-tight text-slate-900">{d.brand}</div>
                <div className="text-[11px] text-slate-400">{d.tagline}</div>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-7">
              {d.nav.map((n, i) => (
                <a
                  key={n}
                  href={`#s${i}`}
                  className="text-[13.5px] font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {n}
                </a>
              ))}
            </nav>

            <a
              href={waLink(d)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-block text-white font-semibold text-[13.5px] px-5 py-2.5 rounded-lg transition-opacity hover:opacity-90"
              style={{ backgroundColor: d.accent }}
            >
              {d.hero.cta1}
            </a>

            <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-slate-600">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t border-slate-100 px-5 py-3">
            {d.nav.map((n, i) => (
              <a
                key={n}
                href={`#s${i}`}
                onClick={() => setOpen(false)}
                className="block py-2.5 text-[15px] text-slate-700 font-medium"
              >
                {n}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section style={{ backgroundColor: tint("08") }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div
                className="inline-flex items-center gap-2 bg-white border text-[12px] font-semibold px-3.5 py-1.5 rounded-full mb-7"
                style={{ borderColor: tint("30"), color: d.accent }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: d.accent }} />
                {d.tagline} · {d.city}
              </div>
              <h1
                className="font-bold text-slate-900 leading-[1.12] mb-6 text-balance"
                style={{ fontSize: "clamp(31px, 4.4vw, 50px)", letterSpacing: "-0.02em" }}
              >
                {d.hero.title}
              </h1>
              <p className="text-slate-600 text-[16.5px] leading-[1.75] mb-9">{d.hero.sub}</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={waLink(d)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-semibold text-[15px] px-7 py-3.5 rounded-lg transition-opacity hover:opacity-90"
                  style={{ backgroundColor: d.accent }}
                >
                  {d.hero.cta1}
                </a>
                <a
                  href="#s0"
                  className="bg-white border border-slate-200 text-slate-700 font-semibold text-[15px] px-7 py-3.5 rounded-lg hover:border-slate-300 transition-colors"
                >
                  {d.hero.cta2}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={photo(d.photos[0], 1100)}
                alt={d.brand}
                className="w-full h-[400px] lg:h-[440px] object-cover rounded-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Facts */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 grid sm:grid-cols-3 gap-px">
          {d.facts.map((f, i) => {
            const Icon = [Clock, ShieldCheck, Phone][i] ?? Clock;
            return (
              <div key={f.label} className="py-8 sm:px-7 flex gap-4">
                <Icon className="w-5 h-5 shrink-0 mt-0.5" style={{ color: d.accent }} />
                <div>
                  <div className="text-[12px] text-slate-400 font-medium mb-1">{f.label}</div>
                  <div className="text-[14.5px] font-semibold text-slate-900">{f.value}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Offering — two-column list */}
      <section id="s0" className="py-20 lg:py-28 scroll-mt-[72px]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <motion.div {...reveal} transition={{ duration: 0.6 }} className="max-w-2xl mb-14">
            <div
              className="text-[12px] font-bold uppercase tracking-[0.18em] mb-3"
              style={{ color: d.accent }}
            >
              {d.offering.label}
            </div>
            <h2
              className="font-bold text-slate-900 mb-4"
              style={{ fontSize: "clamp(27px, 3.6vw, 40px)", letterSpacing: "-0.02em" }}
            >
              {d.offering.title}
            </h2>
            <p className="text-slate-500 text-[16px] leading-relaxed">{d.offering.sub}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-2">
            {d.offering.items.map((it, i) => (
              <motion.div
                key={it.name}
                {...reveal}
                transition={{ duration: 0.45, delay: (i % 2) * 0.07 }}
                className="py-6 border-b border-slate-100"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-semibold text-slate-900 text-[16px] leading-snug">
                    {it.name}
                  </h3>
                  <span
                    className="font-bold text-[14px] whitespace-nowrap shrink-0"
                    style={{ color: d.accent }}
                  >
                    {it.price}
                  </span>
                </div>
                <p className="text-slate-500 text-[14px] leading-relaxed">{it.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="s1" className="py-20 lg:py-28" style={{ backgroundColor: tint("08") }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div {...reveal} transition={{ duration: 0.6 }}>
            <h2
              className="font-bold text-slate-900 mb-6"
              style={{ fontSize: "clamp(25px, 3.3vw, 38px)", letterSpacing: "-0.02em" }}
            >
              {d.about.title}
            </h2>
            <p className="text-slate-600 text-[16px] leading-[1.8] mb-8">{d.about.text}</p>
            <ul className="space-y-4">
              {d.about.points.map((p) => (
                <li key={p} className="flex items-start gap-3.5">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-px bg-white"
                    style={{ border: `1px solid ${tint("35")}` }}
                  >
                    <Check className="w-3 h-3" style={{ color: d.accent }} />
                  </span>
                  <span className="text-slate-700 text-[14.5px] leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...reveal} transition={{ duration: 0.6, delay: 0.12 }} className="grid grid-cols-2 gap-4">
            {d.photos.slice(1, 5).map((p) => (
              <img
                key={p}
                src={photo(p, 600)}
                alt=""
                loading="lazy"
                className="w-full h-[190px] object-cover rounded-xl"
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reviews */}
      <section id="s2" className="py-20 lg:py-28 scroll-mt-[72px]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <motion.h2
            {...reveal}
            transition={{ duration: 0.6 }}
            className="font-bold text-slate-900 text-center mb-14"
            style={{ fontSize: "clamp(25px, 3.3vw, 38px)", letterSpacing: "-0.02em" }}
          >
            La parole à nos patients
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-5">
            {d.reviews.map((r, i) => (
              <motion.div
                key={r.name}
                {...reveal}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                className="bg-white border border-slate-200 rounded-2xl p-6"
              >
                <p className="text-slate-600 text-[14.5px] leading-relaxed mb-5">{r.text}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[12px]"
                    style={{ backgroundColor: tint("15"), color: d.accent }}
                  >
                    {r.name.charAt(0)}
                  </div>
                  <div className="text-slate-900 font-semibold text-[13px]">{r.name}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="s3" className="py-20 lg:py-28 bg-slate-50 scroll-mt-[72px]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12">
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div {...reveal} transition={{ duration: 0.6 }}>
                <h2
                  className="font-bold text-slate-900 mb-7"
                  style={{ fontSize: "clamp(24px, 3vw, 34px)", letterSpacing: "-0.02em" }}
                >
                  {d.hero.cta1}
                </h2>
                <div className="space-y-5 mb-8">
                  {[
                    { icon: MapPin, label: "Adresse", v: d.contact.address },
                    { icon: Clock, label: "Horaires", v: d.contact.hours },
                    { icon: Phone, label: "Téléphone", v: d.contact.phone },
                  ].map((c) => {
                    const Icon = c.icon;
                    return (
                      <div key={c.label} className="flex items-start gap-4">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{ backgroundColor: tint("12") }}
                        >
                          <Icon className="w-4 h-4" style={{ color: d.accent }} />
                        </div>
                        <div>
                          <div className="text-[12px] text-slate-400 font-medium mb-0.5">
                            {c.label}
                          </div>
                          <div className="text-[14.5px] font-semibold text-slate-900">{c.v}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <a
                  href={waLink(d)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-green-500 hover:bg-green-600 text-white font-bold text-[15px] px-7 py-3.5 rounded-lg transition-colors"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  Nous écrire sur WhatsApp
                </a>
              </motion.div>

              <motion.div
                {...reveal}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="relative rounded-2xl overflow-hidden bg-slate-100 min-h-[300px]"
              >
                <div
                  className="absolute inset-0 opacity-50"
                  style={{
                    backgroundImage:
                      "linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)",
                    backgroundSize: "26px 26px",
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-lg"
                    style={{ backgroundColor: d.accent }}
                  >
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="font-bold text-slate-900 text-[15px]">{d.brand}</div>
                  <div className="text-slate-500 text-[13px] mt-1">{d.contact.address}</div>
                  <div className="text-slate-400 text-[11px] mt-4 bg-white px-3 py-1.5 rounded-full border border-slate-200">
                    Google Maps intégré sur le site final
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-slate-100 py-10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="font-bold text-slate-900 text-[15px]">{d.brand}</div>
          <div className="text-slate-400 text-[12.5px]">
            © {new Date().getFullYear()} — Démonstration FunnelsLibrary
          </div>
        </div>
      </footer>

      <FloatingWhatsApp demo={d} />
    </div>
  );
}
