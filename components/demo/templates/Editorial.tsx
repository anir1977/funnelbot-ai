"use client";

/**
 * Editorial — hospitality and luxury.
 * Dark, full-bleed imagery, Playfair display type, and an offering rendered as
 * a printed menu with dotted leaders rather than cards.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Menu, X } from "lucide-react";
import { type Demo, photo } from "@/lib/demos";
import { FloatingWhatsApp, WhatsAppIcon, waLink, reveal } from "../shared";

export default function Editorial({ demo: d }: { demo: Demo }) {
  const [open, setOpen] = useState(false);
  const serif = { fontFamily: "var(--font-serif), Georgia, serif" };

  return (
    <div className="bg-[#0B0B0C] text-stone-200">
      {/* Nav */}
      <header className="absolute top-0 inset-x-0 z-40">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <div className="flex items-center justify-between h-24">
            <div
              className="text-white text-[19px] tracking-[0.22em] uppercase"
              style={serif}
            >
              {d.brand.split(" ")[0]}
            </div>
            <nav className="hidden md:flex items-center gap-10">
              {d.nav.map((n, i) => (
                <a
                  key={n}
                  href={`#s${i}`}
                  className="text-[11px] tracking-[0.2em] uppercase text-stone-300 hover:text-white transition-colors"
                >
                  {n}
                </a>
              ))}
            </nav>
            <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden bg-black/95 px-6 py-4">
            {d.nav.map((n, i) => (
              <a
                key={n}
                href={`#s${i}`}
                onClick={() => setOpen(false)}
                className="block py-3 text-[12px] tracking-[0.2em] uppercase text-stone-300"
              >
                {n}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative h-[100svh] min-h-[620px] flex items-end">
        <img
          src={photo(d.photos[0], 1800)}
          alt={d.brand}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-black/55 to-black/40" />
        <div className="relative max-w-6xl mx-auto px-6 sm:px-10 pb-24 w-full">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-2xl"
          >
            <div
              className="text-[11px] tracking-[0.3em] uppercase mb-7"
              style={{ color: d.accent }}
            >
              {d.tagline} — {d.city}
            </div>
            <h1
              className="text-white leading-[1.08] mb-8"
              style={{ ...serif, fontSize: "clamp(38px, 6vw, 74px)" }}
            >
              {d.hero.title}
            </h1>
            <p className="text-stone-300 text-[16.5px] leading-[1.85] mb-10 max-w-lg">
              {d.hero.sub}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={waLink(d)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-[0.2em] uppercase px-9 py-4 text-black transition-opacity hover:opacity-85"
                style={{ backgroundColor: d.accent }}
              >
                {d.hero.cta1}
              </a>
              <a
                href="#s0"
                className="text-[11px] tracking-[0.2em] uppercase px-9 py-4 border border-white/30 text-white hover:bg-white/10 transition-colors"
              >
                {d.hero.cta2}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Facts */}
      <section className="border-y border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08]">
          {d.facts.map((f) => (
            <div key={f.label} className="py-9 sm:px-10 text-center sm:text-left">
              <div className="text-[10px] tracking-[0.25em] uppercase text-stone-500 mb-2.5">
                {f.label}
              </div>
              <div className="text-stone-200 text-[15px]" style={serif}>
                {f.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Offering — printed menu */}
      <section id="s0" className="py-24 lg:py-32 scroll-mt-4">
        <div className="max-w-3xl mx-auto px-6 sm:px-10">
          <motion.div {...reveal} transition={{ duration: 0.7 }} className="text-center mb-16">
            <div
              className="text-[10px] tracking-[0.3em] uppercase mb-5"
              style={{ color: d.accent }}
            >
              {d.offering.label}
            </div>
            <h2 className="text-white mb-5" style={{ ...serif, fontSize: "clamp(30px, 4vw, 46px)" }}>
              {d.offering.title}
            </h2>
            <p className="text-stone-400 text-[15px] leading-relaxed">{d.offering.sub}</p>
          </motion.div>

          <div className="space-y-9">
            {d.offering.items.map((it, i) => (
              <motion.div key={it.name} {...reveal} transition={{ duration: 0.5, delay: i * 0.05 }}>
                <div className="flex items-baseline gap-4 mb-2">
                  <h3 className="text-white text-[19px] shrink-0" style={serif}>
                    {it.name}
                  </h3>
                  <span className="flex-1 border-b border-dotted border-white/20 translate-y-[-4px]" />
                  <span
                    className="text-[15px] shrink-0 tracking-wide"
                    style={{ ...serif, color: d.accent }}
                  >
                    {it.price}
                  </span>
                </div>
                <p className="text-stone-400 text-[14px] leading-relaxed max-w-xl">{it.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="s1" className="py-24 lg:py-32 bg-[#111112] scroll-mt-4">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 grid lg:grid-cols-12 gap-14 items-center">
          <motion.div {...reveal} transition={{ duration: 0.7 }} className="lg:col-span-7">
            <img
              src={photo(d.photos[1], 1200)}
              alt=""
              loading="lazy"
              className="w-full h-[460px] object-cover"
            />
          </motion.div>
          <motion.div {...reveal} transition={{ duration: 0.7, delay: 0.12 }} className="lg:col-span-5">
            <h2 className="text-white mb-7 leading-[1.2]" style={{ ...serif, fontSize: "clamp(26px, 3.2vw, 38px)" }}>
              {d.about.title}
            </h2>
            <p className="text-stone-400 text-[15px] leading-[1.9] mb-9">{d.about.text}</p>
            <ul className="space-y-5">
              {d.about.points.map((p) => (
                <li key={p} className="flex gap-4 items-start">
                  <span
                    className="mt-2.5 w-6 h-px shrink-0"
                    style={{ backgroundColor: d.accent }}
                  />
                  <span className="text-stone-300 text-[14px] leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Gallery — asymmetric mosaic */}
      <section id="s2" className="py-24 lg:py-32 scroll-mt-4">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <motion.h2
            {...reveal}
            transition={{ duration: 0.7 }}
            className="text-white text-center mb-14"
            style={{ ...serif, fontSize: "clamp(28px, 3.5vw, 42px)" }}
          >
            En images
          </motion.h2>
          <div className="grid grid-cols-6 gap-3 lg:gap-4">
            {d.photos.map((p, i) => {
              const span = [
                "col-span-6 lg:col-span-4 h-[280px] lg:h-[420px]",
                "col-span-3 lg:col-span-2 h-[180px] lg:h-[420px]",
                "col-span-3 lg:col-span-2 h-[180px] lg:h-[260px]",
                "col-span-3 lg:col-span-2 h-[180px] lg:h-[260px]",
                "col-span-3 lg:col-span-2 h-[180px] lg:h-[260px]",
              ][i % 5];
              return (
                <motion.div key={p} {...reveal} transition={{ duration: 0.55, delay: (i % 3) * 0.08 }} className={span}>
                  <img
                    src={photo(p, 900)}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover hover:opacity-85 transition-opacity duration-500"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 lg:py-32 bg-[#111112]">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 grid md:grid-cols-3 gap-14">
          {d.reviews.map((r, i) => (
            <motion.div key={r.name} {...reveal} transition={{ duration: 0.6, delay: i * 0.1 }}>
              <div className="text-[42px] leading-none mb-4" style={{ ...serif, color: d.accent }}>
                &ldquo;
              </div>
              <p className="text-stone-300 text-[15px] leading-[1.85] mb-6" style={serif}>
                {r.text}
              </p>
              <div className="text-[10px] tracking-[0.25em] uppercase text-stone-500">{r.name}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="s3" className="py-24 lg:py-32 scroll-mt-4">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 text-center">
          <motion.div {...reveal} transition={{ duration: 0.7 }}>
            <h2 className="text-white mb-12" style={{ ...serif, fontSize: "clamp(28px, 3.8vw, 44px)" }}>
              {d.hero.cta1}
            </h2>
            <div className="grid sm:grid-cols-3 gap-9 mb-14">
              {[
                { icon: MapPin, v: d.contact.address },
                { icon: Clock, v: d.contact.hours },
                { icon: Phone, v: d.contact.phone },
              ].map((c, i) => {
                const Icon = c.icon;
                return (
                  <div key={i}>
                    <Icon className="w-4 h-4 mx-auto mb-3.5" style={{ color: d.accent }} />
                    <div className="text-stone-400 text-[13.5px] leading-relaxed">{c.v}</div>
                  </div>
                );
              })}
            </div>
            <a
              href={waLink(d)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase px-10 py-4 text-black transition-opacity hover:opacity-85"
              style={{ backgroundColor: d.accent }}
            >
              <WhatsAppIcon className="w-4 h-4" />
              Nous écrire
            </a>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-white/[0.08] py-12">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white text-[15px] tracking-[0.22em] uppercase" style={serif}>
            {d.brand}
          </div>
          <div className="text-stone-500 text-[12px]">
            © {new Date().getFullYear()} — Démonstration FunnelsLibrary
          </div>
        </div>
      </footer>

      <FloatingWhatsApp demo={d} />
    </div>
  );
}
