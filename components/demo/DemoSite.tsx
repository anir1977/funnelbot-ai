"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Star, Check, Menu, X } from "lucide-react";
import { type Demo, photo } from "@/lib/demos";

const WA = "212708025467";

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current shrink-0`}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    </svg>
  );
}

export default function DemoSite({ demo: d }: { demo: Demo }) {
  const [open, setOpen] = useState(false);
  const wa = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
  const contactMsg = `Bonjour, je souhaite un site comme la démo "${d.brand}" pour mon entreprise.`;

  const fade = {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
  };

  return (
    <div className="bg-white">
      {/* ─────────  Nav  ───────── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <div
                className="font-black text-[16px] tracking-[0.12em] uppercase leading-none"
                style={{ color: d.accent }}
              >
                {d.brand.split(" ")[0]}
              </div>
              <div className="text-[9px] text-slate-400 tracking-[0.2em] uppercase mt-0.5">
                {d.city}
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8">
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
              href={wa(contactMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 text-white font-bold text-[13px] px-5 py-2.5 rounded-full transition-opacity hover:opacity-90"
              style={{ backgroundColor: d.accent }}
            >
              {d.hero.cta1}
            </a>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 text-slate-600"
              aria-label="Menu"
            >
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

      {/* ─────────  Hero  ───────── */}
      {d.layout === "center" ? (
        <section className="relative min-h-[600px] lg:min-h-[680px] flex items-center">
          <img
            src={photo(d.photos[0], 1800)}
            alt={d.brand}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/92 via-slate-950/70 to-slate-950/45" />
          <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center py-24">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div
                className="text-[11px] font-bold uppercase tracking-[0.25em] mb-5"
                style={{ color: d.accent }}
              >
                {d.tagline} · {d.city}
              </div>
              <h1
                className="font-black text-white leading-[1.06] mb-6 text-balance"
                style={{ fontSize: "clamp(34px, 5.5vw, 60px)", letterSpacing: "-0.03em" }}
              >
                {d.hero.title}
              </h1>
              <p className="text-slate-200 text-[17px] leading-relaxed mb-9 max-w-xl mx-auto">
                {d.hero.sub}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href={wa(contactMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-bold text-[15px] px-7 py-4 rounded-full transition-opacity hover:opacity-90"
                  style={{ backgroundColor: d.accent }}
                >
                  {d.hero.cta1}
                </a>
                <a
                  href="#s0"
                  className="bg-white/10 backdrop-blur-sm border border-white/25 text-white font-bold text-[15px] px-7 py-4 rounded-full hover:bg-white/20 transition-colors"
                >
                  {d.hero.cta2}
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      ) : (
        <section className="bg-slate-50">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div
                  className="text-[11px] font-bold uppercase tracking-[0.25em] mb-5"
                  style={{ color: d.accent }}
                >
                  {d.tagline} · {d.city}
                </div>
                <h1
                  className="font-black text-slate-900 leading-[1.06] mb-6 text-balance"
                  style={{ fontSize: "clamp(32px, 4.5vw, 52px)", letterSpacing: "-0.03em" }}
                >
                  {d.hero.title}
                </h1>
                <p className="text-slate-500 text-[16.5px] leading-relaxed mb-8">
                  {d.hero.sub}
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={wa(contactMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-bold text-[15px] px-7 py-4 rounded-full transition-opacity hover:opacity-90"
                    style={{ backgroundColor: d.accent }}
                  >
                    {d.hero.cta1}
                  </a>
                  <a
                    href="#s0"
                    className="bg-white border border-slate-200 text-slate-900 font-bold text-[15px] px-7 py-4 rounded-full hover:border-slate-300 transition-colors"
                  >
                    {d.hero.cta2}
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <img
                  src={photo(d.photos[0], 1200)}
                  alt={d.brand}
                  className="w-full h-[380px] lg:h-[460px] object-cover rounded-3xl shadow-2xl"
                />
                <div
                  className="absolute -bottom-5 -left-5 bg-white rounded-2xl px-5 py-4 shadow-xl hidden sm:block"
                  style={{ borderLeft: `4px solid ${d.accent}` }}
                >
                  <div className="text-[11px] text-slate-400 font-medium mb-0.5">
                    {d.facts[0].label}
                  </div>
                  <div className="text-[14px] font-bold text-slate-900">
                    {d.facts[0].value}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ─────────  Facts strip  ───────── */}
      <section className="border-b border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {d.facts.map((f, i) => {
              const Icon = [Clock, MapPin, Phone][i] ?? Clock;
              return (
                <div key={f.label} className="py-7 sm:px-8 flex items-start gap-3.5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${d.accent}15` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: d.accent }} />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-1">
                      {f.label}
                    </div>
                    <div className="text-[14px] font-bold text-slate-900">{f.value}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────  Offering  ───────── */}
      <section id="s0" className="py-20 lg:py-28 bg-white scroll-mt-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <motion.div {...fade} transition={{ duration: 0.6 }} className="text-center mb-14">
            <div
              className="text-[11px] font-bold uppercase tracking-[0.25em] mb-4"
              style={{ color: d.accent }}
            >
              {d.offering.label}
            </div>
            <h2
              className="font-black text-slate-900 mb-4"
              style={{ fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-0.03em" }}
            >
              {d.offering.title}
            </h2>
            <p className="text-slate-500 text-[16px] max-w-xl mx-auto">{d.offering.sub}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {d.offering.items.map((it, i) => (
              <motion.div
                key={it.name}
                {...fade}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-900/[0.07] transition-all duration-300"
              >
                <div className="h-44 overflow-hidden">
                  <img
                    src={photo(d.photos[it.img], 600)}
                    alt={it.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-bold text-slate-900 text-[15.5px] leading-snug">
                      {it.name}
                    </h3>
                    <span
                      className="font-black text-[13px] whitespace-nowrap shrink-0 mt-0.5"
                      style={{ color: d.accent }}
                    >
                      {it.price}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[13.5px] leading-relaxed">{it.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────  About  ───────── */}
      <section id="s1" className="py-20 lg:py-28 bg-slate-50 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div {...fade} transition={{ duration: 0.6 }}>
              <img
                src={photo(d.photos[1], 1000)}
                alt={d.brand}
                loading="lazy"
                className="w-full h-[400px] object-cover rounded-3xl"
              />
            </motion.div>
            <motion.div {...fade} transition={{ duration: 0.6, delay: 0.12 }}>
              <h2
                className="font-black text-slate-900 mb-5"
                style={{ fontSize: "clamp(26px, 3.5vw, 40px)", letterSpacing: "-0.03em" }}
              >
                {d.about.title}
              </h2>
              <p className="text-slate-500 text-[16px] leading-relaxed mb-8">
                {d.about.text}
              </p>
              <ul className="space-y-4">
                {d.about.points.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: `${d.accent}1a` }}
                    >
                      <Check className="w-3 h-3" style={{ color: d.accent }} />
                    </span>
                    <span className="text-slate-600 text-[14.5px] leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────  Gallery  ───────── */}
      <section id="s2" className="py-20 lg:py-28 bg-white scroll-mt-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <motion.div {...fade} transition={{ duration: 0.6 }} className="text-center mb-12">
            <div
              className="text-[11px] font-bold uppercase tracking-[0.25em] mb-4"
              style={{ color: d.accent }}
            >
              Galerie
            </div>
            <h2
              className="font-black text-slate-900"
              style={{ fontSize: "clamp(26px, 3.5vw, 40px)", letterSpacing: "-0.03em" }}
            >
              En images
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {d.photos.map((p, i) => (
              <motion.div
                key={p}
                {...fade}
                transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
                className={`overflow-hidden rounded-2xl ${
                  i === 0 ? "col-span-2 row-span-2 lg:col-span-2" : ""
                }`}
              >
                <img
                  src={photo(p, i === 0 ? 1000 : 500)}
                  alt=""
                  loading="lazy"
                  className={`w-full object-cover hover:scale-105 transition-transform duration-700 ${
                    i === 0 ? "h-full min-h-[240px] lg:min-h-[340px]" : "h-[118px] lg:h-[166px]"
                  }`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────  Reviews  ───────── */}
      <section className="py-20 lg:py-28 bg-slate-950">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <motion.div {...fade} transition={{ duration: 0.6 }} className="text-center mb-14">
            <div
              className="text-[11px] font-bold uppercase tracking-[0.25em] mb-4"
              style={{ color: d.accent }}
            >
              Témoignages
            </div>
            <h2
              className="font-black text-white"
              style={{ fontSize: "clamp(26px, 3.5vw, 40px)", letterSpacing: "-0.03em" }}
            >
              Ce que disent nos clients
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {d.reviews.map((r, i) => (
              <motion.div
                key={r.name}
                {...fade}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/[0.05] border border-white/[0.1] rounded-2xl p-6"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star
                      key={k}
                      className="w-3.5 h-3.5"
                      style={{ color: d.accent, fill: d.accent }}
                    />
                  ))}
                </div>
                <p className="text-slate-300 text-[14px] leading-relaxed mb-5">"{r.text}"</p>
                <div className="text-white font-bold text-[13px]">{r.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────  Contact  ───────── */}
      <section id="s3" className="py-20 lg:py-28 bg-white scroll-mt-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fade} transition={{ duration: 0.6 }}>
              <div
                className="text-[11px] font-bold uppercase tracking-[0.25em] mb-4"
                style={{ color: d.accent }}
              >
                Nous trouver
              </div>
              <h2
                className="font-black text-slate-900 mb-8"
                style={{ fontSize: "clamp(26px, 3.5vw, 40px)", letterSpacing: "-0.03em" }}
              >
                {d.hero.cta1}
              </h2>

              <div className="space-y-5 mb-9">
                {[
                  { icon: MapPin, label: "Adresse", value: d.contact.address },
                  { icon: Clock, label: "Horaires", value: d.contact.hours },
                  { icon: Phone, label: "Téléphone", value: d.contact.phone },
                ].map((c) => {
                  const Icon = c.icon;
                  return (
                    <div key={c.label} className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${d.accent}15` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: d.accent }} />
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-0.5">
                          {c.label}
                        </div>
                        <div className="text-[14.5px] font-bold text-slate-900">{c.value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <a
                href={wa(contactMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-green-500 hover:bg-green-600 text-white font-bold text-[15px] px-7 py-4 rounded-full transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Nous écrire sur WhatsApp
              </a>
            </motion.div>

            {/* Map placeholder */}
            <motion.div
              {...fade}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="relative h-[380px] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200"
            >
              <div
                className="absolute inset-0 opacity-[0.5]"
                style={{
                  backgroundImage:
                    "linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-lg"
                  style={{ backgroundColor: d.accent }}
                >
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="text-slate-900 font-bold text-[15px]">{d.brand}</div>
                <div className="text-slate-500 text-[13px] mt-1 px-8 text-center">
                  {d.contact.address}
                </div>
                <div className="text-slate-400 text-[11px] mt-4 bg-white px-3 py-1.5 rounded-full border border-slate-200">
                  Google Maps intégré sur le site final
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────  Footer  ───────── */}
      <footer className="bg-slate-950 text-slate-400 py-14">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <div
                className="font-black text-[17px] tracking-[0.12em] uppercase mb-3"
                style={{ color: d.accent }}
              >
                {d.brand}
              </div>
              <p className="text-[13.5px] leading-relaxed max-w-xs">
                {d.tagline} à {d.city}. {d.contact.hours}.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold text-[13px] mb-4">Navigation</h4>
              <ul className="space-y-2.5 text-[13px]">
                {d.nav.map((nm, i) => (
                  <li key={nm}>
                    <a href={`#s${i}`} className="hover:text-white transition-colors">
                      {nm}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-[13px] mb-4">Contact</h4>
              <ul className="space-y-2.5 text-[13px]">
                <li>{d.contact.address}</li>
                <li>{d.contact.phone}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-7 text-[12.5px] text-slate-500">
            © {new Date().getFullYear()} {d.brand}. Site de démonstration créé par
            FunnelsLibrary.
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={wa(contactMsg)}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-5 z-40 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-2xl shadow-green-500/40 transition-colors"
        aria-label="WhatsApp"
      >
        <WhatsAppIcon className="w-6 h-6 text-white" />
      </a>
    </div>
  );
}
