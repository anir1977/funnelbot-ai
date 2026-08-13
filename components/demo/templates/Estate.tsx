"use client";

/**
 * Estate — listings and projects, where each item is a considered purchase.
 * Serif headline over sans body, a search-style bar under the hero, and an
 * offering shown as wide landscape cards with the price as the headline.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Menu, X, Search, ArrowRight } from "lucide-react";
import { type Demo, photo } from "@/lib/demos";
import { FloatingWhatsApp, WhatsAppIcon, waLink, reveal } from "../shared";

export default function Estate({ demo: d }: { demo: Demo }) {
  const [open, setOpen] = useState(false);
  const serif = { fontFamily: "var(--font-serif), Georgia, serif" };

  return (
    <div className="bg-white text-slate-900">
      {/* Nav */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-[76px]">
            <div>
              <div className="text-[19px] leading-none" style={serif}>
                {d.brand}
              </div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-slate-400 mt-1.5">
                {d.city}
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-9">
              {d.nav.map((n, i) => (
                <a
                  key={n}
                  href={`#s${i}`}
                  className="text-[13px] font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {n}
                </a>
              ))}
            </nav>

            <a
              href={waLink(d)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-block border-2 font-semibold text-[13px] px-6 py-2.5 transition-colors hover:text-white"
              style={{ borderColor: d.accent, color: d.accent }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = d.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              {d.hero.cta1}
            </a>

            <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-slate-600">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t border-slate-200 px-5 py-3">
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
      <section className="relative">
        <img
          src={photo(d.photos[0], 1800)}
          alt={d.brand}
          className="w-full h-[540px] lg:h-[620px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-xl"
            >
              <div
                className="text-[10px] tracking-[0.28em] uppercase mb-6"
                style={{ color: d.accent }}
              >
                {d.tagline}
              </div>
              <h1
                className="text-white leading-[1.1] mb-7"
                style={{ ...serif, fontSize: "clamp(34px, 5vw, 60px)" }}
              >
                {d.hero.title}
              </h1>
              <p className="text-slate-200 text-[16.5px] leading-[1.8] mb-9">{d.hero.sub}</p>
              <a
                href={waLink(d)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-white font-semibold text-[15px] px-8 py-4 transition-opacity hover:opacity-90"
                style={{ backgroundColor: d.accent }}
              >
                {d.hero.cta1}
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search-style bar */}
      <section className="relative -mt-10 z-10 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto bg-white shadow-2xl border border-slate-200">
          <div className="grid sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
            {d.facts.map((f) => (
              <div key={f.label} className="px-6 py-5">
                <div className="text-[10px] tracking-[0.18em] uppercase text-slate-400 mb-1.5">
                  {f.label}
                </div>
                <div className="text-[14px] font-semibold text-slate-900">{f.value}</div>
              </div>
            ))}
            <a
              href={waLink(d)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 text-white font-semibold text-[14px] px-6 py-5 transition-opacity hover:opacity-90"
              style={{ backgroundColor: d.accent }}
            >
              <Search className="w-4 h-4" />
              {d.hero.cta2}
            </a>
          </div>
        </div>
      </section>

      {/* Offering — wide landscape cards */}
      <section id="s0" className="py-20 lg:py-28 scroll-mt-[76px]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <motion.div {...reveal} transition={{ duration: 0.6 }} className="mb-14 max-w-2xl">
            <div
              className="text-[10px] tracking-[0.28em] uppercase mb-4"
              style={{ color: d.accent }}
            >
              {d.offering.label}
            </div>
            <h2 className="text-slate-900 mb-4" style={{ ...serif, fontSize: "clamp(28px, 3.8vw, 44px)" }}>
              {d.offering.title}
            </h2>
            <p className="text-slate-500 text-[16px] leading-relaxed">{d.offering.sub}</p>
          </motion.div>

          <div className="space-y-6">
            {d.offering.items.map((it, i) => (
              <motion.a
                key={it.name}
                href={waLink(d, `Bonjour, je suis intéressé par : ${it.name} (${d.brand}).`)}
                target="_blank"
                rel="noopener noreferrer"
                {...reveal}
                transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
                className="group grid md:grid-cols-12 border border-slate-200 hover:border-slate-400 transition-colors duration-300"
              >
                <div className="md:col-span-5 overflow-hidden">
                  <img
                    src={photo(d.photos[it.img], 800)}
                    alt={it.name}
                    loading="lazy"
                    className="w-full h-[230px] md:h-full md:min-h-[210px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="md:col-span-7 p-7 flex flex-col justify-center">
                  <div
                    className="text-[22px] mb-2.5"
                    style={{ ...serif, color: d.accent }}
                  >
                    {it.price}
                  </div>
                  <h3 className="font-semibold text-slate-900 text-[18px] mb-2.5">{it.name}</h3>
                  <p className="text-slate-500 text-[14.5px] leading-relaxed mb-5">{it.desc}</p>
                  <div className="flex items-center gap-2 text-[13px] font-semibold group-hover:gap-3.5 transition-all" style={{ color: d.accent }}>
                    En savoir plus
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* About — dark band */}
      <section id="s1" className="py-20 lg:py-28 bg-slate-950 scroll-mt-[76px]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...reveal} transition={{ duration: 0.6 }}>
            <h2 className="text-white mb-7 leading-[1.2]" style={{ ...serif, fontSize: "clamp(26px, 3.5vw, 40px)" }}>
              {d.about.title}
            </h2>
            <p className="text-slate-400 text-[16px] leading-[1.85] mb-9">{d.about.text}</p>
            <div className="space-y-6">
              {d.about.points.map((p, i) => (
                <div key={p} className="flex gap-5 items-start">
                  <span
                    className="text-[13px] font-bold shrink-0 pt-0.5"
                    style={{ color: d.accent }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-slate-300 text-[14.5px] leading-relaxed">{p}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...reveal} transition={{ duration: 0.6, delay: 0.12 }} className="grid grid-cols-2 gap-3">
            {d.photos.slice(1, 5).map((p, i) => (
              <img
                key={p}
                src={photo(p, 600)}
                alt=""
                loading="lazy"
                className={`w-full object-cover ${i % 3 === 0 ? "h-[250px]" : "h-[200px]"}`}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reviews */}
      <section id="s2" className="py-20 lg:py-28 scroll-mt-[76px]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <motion.h2
            {...reveal}
            transition={{ duration: 0.6 }}
            className="text-slate-900 mb-14"
            style={{ ...serif, fontSize: "clamp(26px, 3.5vw, 40px)" }}
          >
            Ils nous ont fait confiance
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-10">
            {d.reviews.map((r, i) => (
              <motion.div key={r.name} {...reveal} transition={{ duration: 0.5, delay: i * 0.09 }}>
                <div className="w-10 h-0.5 mb-6" style={{ backgroundColor: d.accent }} />
                <p className="text-slate-600 text-[15px] leading-[1.8] mb-5" style={serif}>
                  {r.text}
                </p>
                <div className="text-[11px] tracking-[0.18em] uppercase text-slate-400">
                  {r.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="s3" className="scroll-mt-[76px]">
        <div className="grid lg:grid-cols-2">
          <div className="bg-slate-50 px-6 sm:px-12 lg:px-16 py-20">
            <motion.div {...reveal} transition={{ duration: 0.6 }}>
              <h2 className="text-slate-900 mb-9" style={{ ...serif, fontSize: "clamp(26px, 3.4vw, 40px)" }}>
                {d.hero.cta1}
              </h2>
              <div className="space-y-6 mb-10">
                {[
                  { icon: MapPin, label: "Adresse", v: d.contact.address },
                  { icon: Clock, label: "Horaires", v: d.contact.hours },
                  { icon: Phone, label: "Téléphone", v: d.contact.phone },
                ].map((c) => {
                  const Icon = c.icon;
                  return (
                    <div key={c.label} className="flex items-start gap-4 pb-6 border-b border-slate-200">
                      <Icon className="w-4 h-4 shrink-0 mt-1" style={{ color: d.accent }} />
                      <div>
                        <div className="text-[10px] tracking-[0.18em] uppercase text-slate-400 mb-1">
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
                className="inline-flex items-center gap-2.5 bg-green-500 hover:bg-green-600 text-white font-bold text-[15px] px-7 py-4 transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Nous écrire sur WhatsApp
              </a>
            </motion.div>
          </div>

          <div className="relative bg-slate-200 min-h-[380px]">
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
              <div
                className="w-14 h-14 flex items-center justify-center mb-5 shadow-xl"
                style={{ backgroundColor: d.accent }}
              >
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="text-slate-900 text-[17px]" style={serif}>
                {d.brand}
              </div>
              <div className="text-slate-600 text-[13px] mt-1.5">{d.contact.address}</div>
              <div className="text-slate-500 text-[11px] mt-5 bg-white px-3 py-1.5 border border-slate-300">
                Google Maps intégré sur le site final
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-white text-[18px]" style={serif}>
            {d.brand}
          </div>
          <div className="text-slate-500 text-[12.5px]">
            © {new Date().getFullYear()} — Démonstration FunnelsLibrary
          </div>
        </div>
      </footer>

      <FloatingWhatsApp demo={d} />
    </div>
  );
}
