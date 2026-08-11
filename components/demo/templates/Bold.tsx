"use client";

/**
 * Bold — high-energy trades and fitness.
 * Oversized condensed uppercase type, hard colour blocks, no rounded corners,
 * and an offering laid out as big numbered rows instead of cards.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Menu, X, ArrowRight } from "lucide-react";
import { type Demo, photo } from "@/lib/demos";
import { FloatingWhatsApp, WhatsAppIcon, waLink, reveal } from "../shared";

export default function Bold({ demo: d }: { demo: Demo }) {
  const [open, setOpen] = useState(false);
  const cond = {
    fontFamily: "var(--font-condensed), 'Arial Narrow', sans-serif",
    textTransform: "uppercase" as const,
  };

  return (
    <div className="bg-white text-slate-900">
      {/* Nav */}
      <header className="sticky top-0 z-40 bg-slate-950">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-[68px]">
            <div className="text-white text-[24px] leading-none tracking-wide" style={cond}>
              {d.brand.split(" ")[0]}
              <span style={{ color: d.accent }}>.</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              {d.nav.map((n, i) => (
                <a
                  key={n}
                  href={`#s${i}`}
                  className="text-[13px] tracking-wider text-slate-300 hover:text-white transition-colors"
                  style={cond}
                >
                  {n}
                </a>
              ))}
            </nav>
            <a
              href={waLink(d)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block text-black text-[13px] tracking-wider px-6 py-2.5"
              style={{ ...cond, backgroundColor: d.accent }}
            >
              {d.hero.cta1}
            </a>
            <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden bg-slate-900 px-5 py-3">
            {d.nav.map((n, i) => (
              <a
                key={n}
                href={`#s${i}`}
                onClick={() => setOpen(false)}
                className="block py-3 text-[15px] text-slate-200 tracking-wider"
                style={cond}
              >
                {n}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative bg-slate-950 overflow-hidden">
        <img
          src={photo(d.photos[0], 1800)}
          alt={d.brand}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div
              className="inline-block text-black text-[13px] tracking-[0.2em] px-4 py-1.5 mb-7"
              style={{ ...cond, backgroundColor: d.accent }}
            >
              {d.tagline} — {d.city}
            </div>
            <h1
              className="text-white leading-[0.92] mb-7"
              style={{ ...cond, fontSize: "clamp(46px, 8.5vw, 106px)", fontWeight: 700 }}
            >
              {d.hero.title}
            </h1>
            <p className="text-slate-300 text-[17px] leading-relaxed mb-10 max-w-xl">
              {d.hero.sub}
            </p>
            <div className="flex flex-wrap gap-0">
              <a
                href={waLink(d)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-black text-[15px] tracking-wider px-9 py-5 transition-opacity hover:opacity-90"
                style={{ ...cond, backgroundColor: d.accent }}
              >
                {d.hero.cta1}
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#s0"
                className="inline-flex items-center text-white text-[15px] tracking-wider px-9 py-5 border border-white/25 hover:bg-white/10 transition-colors"
                style={cond}
              >
                {d.hero.cta2}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Facts — colour band */}
      <section style={{ backgroundColor: d.accent }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-black/15">
          {d.facts.map((f) => (
            <div key={f.label} className="py-8 sm:px-8">
              <div className="text-black/60 text-[12px] tracking-[0.2em] mb-1.5" style={cond}>
                {f.label}
              </div>
              <div className="text-black text-[21px] leading-tight" style={cond}>
                {f.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Offering — numbered rows */}
      <section id="s0" className="py-20 lg:py-28 scroll-mt-[68px]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <motion.div {...reveal} transition={{ duration: 0.6 }} className="mb-14">
            <div className="text-[13px] tracking-[0.25em] mb-3" style={{ ...cond, color: d.accent }}>
              {d.offering.label}
            </div>
            <h2
              className="text-slate-900 leading-[0.95] mb-4"
              style={{ ...cond, fontSize: "clamp(36px, 6vw, 68px)", fontWeight: 700 }}
            >
              {d.offering.title}
            </h2>
            <p className="text-slate-500 text-[16px] max-w-xl">{d.offering.sub}</p>
          </motion.div>

          <div className="border-t border-slate-900">
            {d.offering.items.map((it, i) => (
              <motion.a
                key={it.name}
                href={waLink(d, `Bonjour, je suis intéressé par : ${it.name} (${d.brand}).`)}
                target="_blank"
                rel="noopener noreferrer"
                {...reveal}
                transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
                className="group grid grid-cols-12 gap-4 items-center border-b border-slate-900 py-6 hover:bg-slate-950 transition-colors duration-200"
              >
                <div
                  className="col-span-2 sm:col-span-1 text-[26px] leading-none pl-1 group-hover:text-white transition-colors"
                  style={{ ...cond, color: d.accent }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="col-span-10 sm:col-span-3">
                  <h3
                    className="text-slate-900 text-[20px] leading-tight group-hover:text-white transition-colors"
                    style={cond}
                  >
                    {it.name}
                  </h3>
                </div>
                <div className="col-span-12 sm:col-span-5">
                  <p className="text-slate-500 text-[13.5px] leading-relaxed group-hover:text-slate-400 transition-colors">
                    {it.desc}
                  </p>
                </div>
                <div className="col-span-12 sm:col-span-3 sm:text-right">
                  <span
                    className="text-[19px] whitespace-nowrap"
                    style={{ ...cond, color: d.accent }}
                  >
                    {it.price}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* About — offset blocks */}
      <section id="s1" className="py-20 lg:py-28 bg-slate-950 scroll-mt-[68px]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div {...reveal} transition={{ duration: 0.6 }} className="relative">
            <img
              src={photo(d.photos[1], 1100)}
              alt=""
              loading="lazy"
              className="w-full h-[420px] object-cover"
            />
            <div
              className="absolute -bottom-4 -right-4 w-28 h-28 hidden sm:block"
              style={{ backgroundColor: d.accent }}
            />
          </motion.div>
          <motion.div {...reveal} transition={{ duration: 0.6, delay: 0.12 }}>
            <h2
              className="text-white leading-[0.98] mb-6"
              style={{ ...cond, fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700 }}
            >
              {d.about.title}
            </h2>
            <p className="text-slate-400 text-[15.5px] leading-relaxed mb-9">{d.about.text}</p>
            <ul className="space-y-4">
              {d.about.points.map((p, i) => (
                <li key={p} className="flex gap-4 items-start">
                  <span className="text-[14px] shrink-0 pt-0.5" style={{ ...cond, color: d.accent }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-slate-300 text-[14.5px] leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Gallery — full-bleed strip */}
      <section id="s2" className="scroll-mt-[68px]">
        <div className="grid grid-cols-2 lg:grid-cols-5">
          {d.photos.map((p, i) => (
            <motion.div key={p} {...reveal} transition={{ duration: 0.5, delay: (i % 5) * 0.06 }} className="relative group">
              <img
                src={photo(p, 700)}
                alt=""
                loading="lazy"
                className="w-full h-[190px] lg:h-[260px] object-cover"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                style={{ backgroundColor: d.accent }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.h2
            {...reveal}
            transition={{ duration: 0.6 }}
            className="text-slate-900 leading-[0.95] mb-12"
            style={{ ...cond, fontSize: "clamp(32px, 5vw, 58px)", fontWeight: 700 }}
          >
            Ils en parlent
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-0 border-t border-l border-slate-200">
            {d.reviews.map((r, i) => (
              <motion.div
                key={r.name}
                {...reveal}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                className="border-r border-b border-slate-200 p-8"
              >
                <div className="w-10 h-1 mb-6" style={{ backgroundColor: d.accent }} />
                <p className="text-slate-600 text-[15px] leading-relaxed mb-6">{r.text}</p>
                <div className="text-slate-900 text-[15px] tracking-wider" style={cond}>
                  {r.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="s3" className="py-20 lg:py-28 bg-slate-950 scroll-mt-[68px]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14">
          <motion.div {...reveal} transition={{ duration: 0.6 }}>
            <h2
              className="text-white leading-[0.95] mb-9"
              style={{ ...cond, fontSize: "clamp(34px, 5.5vw, 62px)", fontWeight: 700 }}
            >
              {d.hero.cta1}
            </h2>
            <a
              href={waLink(d)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white text-[15px] tracking-wider px-9 py-5 transition-colors"
              style={cond}
            >
              <WhatsAppIcon className="w-5 h-5" />
              WhatsApp
            </a>
          </motion.div>

          <motion.div {...reveal} transition={{ duration: 0.6, delay: 0.12 }} className="space-y-0">
            {[
              { icon: MapPin, label: "Adresse", v: d.contact.address },
              { icon: Clock, label: "Horaires", v: d.contact.hours },
              { icon: Phone, label: "Téléphone", v: d.contact.phone },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.label} className="flex items-start gap-5 py-6 border-b border-white/10">
                  <Icon className="w-5 h-5 shrink-0 mt-0.5" style={{ color: d.accent }} />
                  <div>
                    <div className="text-slate-500 text-[12px] tracking-[0.2em] mb-1" style={cond}>
                      {c.label}
                    </div>
                    <div className="text-white text-[15px]">{c.v}</div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <footer className="bg-black py-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-white text-[20px] tracking-wide" style={cond}>
            {d.brand}
            <span style={{ color: d.accent }}>.</span>
          </div>
          <div className="text-slate-500 text-[12px]">
            © {new Date().getFullYear()} — Démonstration FunnelsLibrary
          </div>
        </div>
      </footer>

      <FloatingWhatsApp demo={d} />
    </div>
  );
}
