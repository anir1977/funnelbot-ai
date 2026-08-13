"use client";

/**
 * Catalog — retail.
 * Products come first: a compact hero, then an immediate grid with price tags.
 * Grotesk type, lots of white, square imagery, hover zoom and order buttons.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Menu, X, ShoppingBag, Truck } from "lucide-react";
import { type Demo, photo } from "@/lib/demos";
import { FloatingWhatsApp, WhatsAppIcon, waLink, reveal } from "../shared";

export default function Catalog({ demo: d }: { demo: Demo }) {
  const [open, setOpen] = useState(false);
  const grotesk = { fontFamily: "var(--font-grotesk), system-ui, sans-serif" };

  return (
    <div className="bg-white text-slate-900">
      {/* Announcement */}
      <div
        className="text-center text-[12px] font-medium py-2.5 text-white"
        style={{ backgroundColor: d.accent }}
      >
        {d.facts[2]?.value ?? "Livraison partout au Maroc"} — commande directe sur WhatsApp
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-[70px]">
            <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-slate-700">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <nav className="hidden md:flex items-center gap-8 flex-1">
              {d.nav.slice(0, 2).map((n, i) => (
                <a
                  key={n}
                  href={`#s${i}`}
                  className="text-[13px] font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {n}
                </a>
              ))}
            </nav>

            <div
              className="text-[21px] font-bold tracking-[-0.02em] md:text-center md:flex-1"
              style={grotesk}
            >
              {d.brand.split(" ").slice(-1)[0]}
            </div>

            <div className="flex items-center justify-end gap-6 flex-1">
              <nav className="hidden md:flex items-center gap-8">
                {d.nav.slice(2).map((n, i) => (
                  <a
                    key={n}
                    href={`#s${i + 2}`}
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
                className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: d.accent }}
                aria-label="Commander"
              >
                <ShoppingBag className="w-4 h-4" />
              </a>
            </div>
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

      {/* Hero — compact, two panels */}
      <section className="grid lg:grid-cols-2">
        <div className="order-2 lg:order-1 flex items-center px-6 sm:px-12 lg:px-16 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="text-[11px] font-bold uppercase tracking-[0.22em] mb-6"
              style={{ color: d.accent }}
            >
              {d.tagline} · {d.city}
            </div>
            <h1
              className="font-bold leading-[1.05] mb-6 text-balance"
              style={{ ...grotesk, fontSize: "clamp(34px, 4.6vw, 56px)", letterSpacing: "-0.035em" }}
            >
              {d.hero.title}
            </h1>
            <p className="text-slate-500 text-[16.5px] leading-relaxed mb-9 max-w-md">
              {d.hero.sub}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={waLink(d)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-white font-semibold text-[15px] px-7 py-4 rounded-full transition-opacity hover:opacity-90"
                style={{ backgroundColor: d.accent }}
              >
                <WhatsAppIcon className="w-4 h-4" />
                {d.hero.cta1}
              </a>
              <a
                href="#s0"
                className="inline-flex items-center border border-slate-900 font-semibold text-[15px] px-7 py-4 rounded-full hover:bg-slate-900 hover:text-white transition-colors"
              >
                {d.hero.cta2}
              </a>
            </div>
          </motion.div>
        </div>

        <div className="order-1 lg:order-2 relative">
          <img
            src={photo(d.photos[0], 1200)}
            alt={d.brand}
            className="w-full h-[340px] lg:h-full lg:min-h-[560px] object-cover"
          />
        </div>
      </section>

      {/* Product grid */}
      <section id="s0" className="py-20 lg:py-24 scroll-mt-[70px]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div
            {...reveal}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-end justify-between gap-4 mb-12"
          >
            <div>
              <div
                className="text-[11px] font-bold uppercase tracking-[0.22em] mb-3"
                style={{ color: d.accent }}
              >
                {d.offering.label}
              </div>
              <h2
                className="font-bold"
                style={{ ...grotesk, fontSize: "clamp(28px, 3.6vw, 42px)", letterSpacing: "-0.03em" }}
              >
                {d.offering.title}
              </h2>
            </div>
            <p className="text-slate-500 text-[15px] max-w-sm">{d.offering.sub}</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
            {d.offering.items.map((it, i) => (
              <motion.div
                key={it.name}
                {...reveal}
                transition={{ duration: 0.5, delay: (i % 3) * 0.07 }}
                className="group"
              >
                <div className="relative overflow-hidden bg-slate-50 mb-4">
                  <img
                    src={photo(d.photos[it.img], 700)}
                    alt={it.name}
                    loading="lazy"
                    className="w-full aspect-square object-cover group-hover:scale-[1.06] transition-transform duration-700"
                  />
                  <a
                    href={waLink(d, `Bonjour, je souhaite commander : ${it.name} (${d.brand}).`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-x-3 bottom-3 bg-white text-slate-900 font-semibold text-[13px] py-3 text-center rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
                  >
                    Commander
                  </a>
                </div>
                <h3 className="font-semibold text-[15px] leading-snug mb-1" style={grotesk}>
                  {it.name}
                </h3>
                <p className="text-slate-500 text-[13px] leading-relaxed mb-2 line-clamp-2">
                  {it.desc}
                </p>
                <div className="font-bold text-[14.5px]" style={{ ...grotesk, color: d.accent }}>
                  {it.price}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facts band */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
          {d.facts.map((f, i) => {
            const Icon = [Clock, Truck, ShoppingBag][i] ?? Clock;
            return (
              <div key={f.label} className="py-8 sm:px-8 flex items-center gap-4">
                <Icon className="w-5 h-5 shrink-0" style={{ color: d.accent }} />
                <div>
                  <div className="font-semibold text-[14px]" style={grotesk}>
                    {f.value}
                  </div>
                  <div className="text-slate-400 text-[12px]">{f.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* About */}
      <section id="s1" className="py-20 lg:py-28 scroll-mt-[70px]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div {...reveal} transition={{ duration: 0.6 }}>
            <img
              src={photo(d.photos[1], 1000)}
              alt=""
              loading="lazy"
              className="w-full aspect-[4/5] object-cover"
            />
          </motion.div>
          <motion.div {...reveal} transition={{ duration: 0.6, delay: 0.12 }}>
            <h2
              className="font-bold mb-6 leading-tight"
              style={{ ...grotesk, fontSize: "clamp(26px, 3.4vw, 38px)", letterSpacing: "-0.03em" }}
            >
              {d.about.title}
            </h2>
            <p className="text-slate-500 text-[16px] leading-[1.8] mb-8">{d.about.text}</p>
            <ul className="space-y-4">
              {d.about.points.map((p) => (
                <li key={p} className="flex gap-4 items-start">
                  <span
                    className="mt-2 w-4 h-px shrink-0"
                    style={{ backgroundColor: d.accent }}
                  />
                  <span className="text-slate-700 text-[14.5px] leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Reviews */}
      <section id="s2" className="py-20 lg:py-24 bg-slate-950 text-white scroll-mt-[70px]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.h2
            {...reveal}
            transition={{ duration: 0.6 }}
            className="font-bold mb-12"
            style={{ ...grotesk, fontSize: "clamp(26px, 3.4vw, 38px)", letterSpacing: "-0.03em" }}
          >
            Avis clientes
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {d.reviews.map((r, i) => (
              <motion.div key={r.name} {...reveal} transition={{ duration: 0.5, delay: i * 0.09 }}>
                <p className="text-slate-300 text-[15px] leading-relaxed mb-5">{r.text}</p>
                <div className="text-[13px] font-semibold" style={{ color: d.accent }}>
                  {r.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="s3" className="py-20 lg:py-28 scroll-mt-[70px]">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <motion.div {...reveal} transition={{ duration: 0.6 }}>
            <h2
              className="font-bold mb-4"
              style={{ ...grotesk, fontSize: "clamp(28px, 3.8vw, 42px)", letterSpacing: "-0.03em" }}
            >
              Une question ? Écrivez-nous
            </h2>
            <p className="text-slate-500 text-[16px] mb-10">
              Nous répondons sur WhatsApp dans la journée.
            </p>

            <div className="grid sm:grid-cols-3 gap-8 mb-11">
              {[
                { icon: MapPin, v: d.contact.address },
                { icon: Clock, v: d.contact.hours },
                { icon: Phone, v: d.contact.phone },
              ].map((c, i) => {
                const Icon = c.icon;
                return (
                  <div key={i}>
                    <Icon className="w-4 h-4 mx-auto mb-3" style={{ color: d.accent }} />
                    <div className="text-slate-500 text-[13.5px] leading-relaxed">{c.v}</div>
                  </div>
                );
              })}
            </div>

            <a
              href={waLink(d)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-green-500 hover:bg-green-600 text-white font-bold text-[15px] px-8 py-4 rounded-full transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Commander sur WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="font-bold text-[17px]" style={grotesk}>
            {d.brand}
          </div>
          <div className="text-slate-400 text-[12.5px]">
            © {new Date().getFullYear()} — Démonstration FunnelsLibrary
          </div>
        </div>
      </footer>

      <FloatingWhatsApp demo={d} />
    </div>
  );
}
