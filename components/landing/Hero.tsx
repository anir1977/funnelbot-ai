"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useEffect } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";

/* ─── Word-by-word reveal component ─────────────────────────────────────────── */

interface WordRevealProps {
  text: string;
  baseDelay?: number;
  className?: string;
  gradient?: boolean;
}

function WordReveal({ text, baseDelay = 0, className = "", gradient = false }: WordRevealProps) {
  const words = text.split(" ");

  return (
    <span
      className={className}
      aria-label={text}
      style={{ display: "inline-flex", flexWrap: "wrap", gap: "0 0.28em", justifyContent: "center" }}
    >
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block overflow-hidden"
          aria-hidden="true"
          style={{ verticalAlign: "bottom" }}
        >
          <motion.span
            className={`inline-block ${gradient ? "bg-clip-text text-transparent" : ""}`}
            style={
              gradient
                ? {
                    backgroundImage:
                      "linear-gradient(90deg, #10B981 0%, #6EE7B7 50%, #10B981 100%)",
                  }
                : undefined
            }
            initial={{ opacity: 0, y: "100%", filter: "blur(4px)" }}
            animate={{ opacity: 1, y: "0%", filter: "blur(0px)" }}
            transition={{
              duration: 0.65,
              delay: index * 0.07 + baseDelay,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ─── Bar chart SVG ──────────────────────────────────────────────────────────── */

function MiniBarChart() {
  const bars = [42, 58, 51, 74, 63, 85, 72, 100];
  return (
    <div className="flex items-end gap-[3px] h-[28px]" dir="ltr">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-[2px] transition-all"
          style={{
            height: `${h}%`,
            backgroundColor:
              i === bars.length - 1
                ? "#10B981"
                : `rgba(16,185,129,${0.15 + (i / bars.length) * 0.25})`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Dashboard preview inside browser chrome ───────────────────────────────── */

function BrowserMockup() {
  const kpis = [
    { label: "محادثات", value: "1,847", change: "+12%" },
    { label: "طلبات", value: "423", change: "+8%" },
    { label: "إيرادات", value: "127K", change: "+21%" },
  ];

  return (
    <div
      className="w-full max-w-[820px] mx-auto rounded-2xl overflow-hidden"
      style={{
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.06), 0 24px 64px rgba(0,0,0,0.7), 0 8px 24px rgba(0,0,0,0.5)",
      }}
    >
      {/* Browser chrome bar */}
      <div
        className="bg-[#1C1E1F] border-b border-white/[0.06] px-4 py-3 flex items-center gap-3"
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        {/* URL bar */}
        <div
          className="flex-1 flex items-center gap-2 bg-[#121414] border border-white/[0.07] rounded-lg px-3 py-1.5 max-w-[340px] mx-auto"
        >
          <svg
            className="w-3 h-3 text-[#525252] shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="text-[11px] text-[#525252] font-inter tracking-tight truncate">
            app.funnelslibrary.com/dashboard
          </span>
        </div>
        <div className="w-16 shrink-0" />
      </div>

      {/* Dashboard body */}
      <div className="bg-[#121414] px-6 py-5" dir="rtl">
        {/* Top row: KPI cards */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="bg-[#181A1B] border border-white/[0.06] rounded-xl px-4 py-3"
            >
              <p className="text-[11px] text-[#9B9B97] mb-1.5">{kpi.label}</p>
              <p className="text-[22px] font-black font-inter text-[#EDEDEA] leading-none mb-1">
                {kpi.value}
              </p>
              <p className="text-[11px] text-[#10B981] font-semibold font-inter">
                {kpi.change} هذا الشهر
              </p>
            </div>
          ))}
        </div>

        {/* Chart + activity row */}
        <div className="grid grid-cols-[1fr_200px] gap-3">
          {/* Main chart card */}
          <div className="bg-[#181A1B] border border-white/[0.06] rounded-xl px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] text-[#9B9B97]">نمو المبيعات — آخر 8 أسابيع</p>
              <span className="text-[10px] font-inter text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/20 rounded-md px-2 py-0.5">
                ↑ +21%
              </span>
            </div>
            {/* Chart bars */}
            <div className="flex items-end gap-1.5 h-[44px]">
              {[30, 42, 38, 55, 48, 65, 58, 78, 70, 90, 82, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-[3px]"
                  style={{
                    height: `${h}%`,
                    backgroundColor:
                      i >= 10
                        ? "#10B981"
                        : `rgba(16,185,129,${0.12 + (i / 12) * 0.3})`,
                  }}
                />
              ))}
            </div>
            {/* X-axis labels */}
            <div className="flex justify-between mt-1.5">
              {["يناير", "فبراير", "مارس", "أبريل"].map((m) => (
                <span key={m} className="text-[9px] text-[#525252] font-inter">
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Recent orders mini list */}
          <div className="bg-[#181A1B] border border-white/[0.06] rounded-xl px-3 py-3">
            <p className="text-[11px] text-[#9B9B97] mb-2.5">آخر الطلبات</p>
            <div className="space-y-2">
              {[
                { id: "#2849", city: "الرباط", amount: "189 د" },
                { id: "#2848", city: "كازا", amount: "340 د" },
                { id: "#2847", city: "مراكش", amount: "219 د" },
              ].map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                    <span className="text-[10px] text-[#EDEDEA] font-inter">
                      {order.id}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#9B9B97]">{order.city}</span>
                  <span className="text-[10px] text-[#10B981] font-semibold font-inter">
                    {order.amount}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-2.5 pt-2 border-t border-white/[0.05]">
              <p className="text-[9px] text-[#525252] text-center">
                تحديث تلقائي كل دقيقة
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade-out */}
      <div
        className="h-20 bg-gradient-to-b from-[#121414] to-[#121414]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(18,20,20,0) 0%, rgba(18,20,20,0.7) 40%, #121414 100%)",
        }}
      />
    </div>
  );
}

/* ─── Main Hero component ────────────────────────────────────────────────────── */

export default function Hero() {
  /* Scroll parallax for center glow */
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  /* Mouse parallax for center glow */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const glowX = useSpring(useTransform(rawX, (v) => v * 0.04), {
    stiffness: 40,
    damping: 20,
  });
  const glowYMouse = useSpring(useTransform(rawY, (v) => v * 0.04), {
    stiffness: 40,
    damping: 20,
  });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      rawX.set(e.clientX - window.innerWidth / 2);
      rawY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [rawX, rawY]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center bg-[#121414] pt-20 pb-0 relative overflow-hidden"
      dir="rtl"
    >
      {/* ── Dot grid background ──────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Center radial glow (scroll + mouse parallax) ─────────────────────── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 1000,
          height: 600,
          left: "50%",
          top: "42%",
          translateX: "-50%",
          translateY: "-50%",
          y: glowY,
          x: glowX,
          background:
            "radial-gradient(ellipse, rgba(16,185,129,0.08) 0%, transparent 60%)",
        }}
      />
      {/* Subtle secondary glow (mouse only, opposite direction) */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 700,
          height: 400,
          left: "50%",
          top: "55%",
          translateX: "-50%",
          translateY: "-50%",
          y: glowYMouse,
          background:
            "radial-gradient(ellipse, rgba(16,185,129,0.04) 0%, transparent 65%)",
        }}
      />

      {/* ── Content container ─────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[720px] mx-auto px-5 flex flex-col items-center text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0 }}
          className="inline-flex items-center gap-2 border border-white/[0.1] bg-white/[0.04] rounded-full px-4 py-1.5 mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
          <span className="text-[12px] text-[#9B9B97] leading-none">
            بوت واتساب مدعوم بـ GPT-4o
          </span>
          <span
            className="text-[10px] font-bold text-[#10B981] border border-[#10B981]/25 rounded-full px-2 py-[2px] leading-none font-inter"
            style={{ backgroundColor: "rgba(16,185,129,0.15)" }}
          >
            جديد
          </span>
        </motion.div>

        {/* Headline — word-by-word reveal */}
        <h1
          className="font-black text-center mb-6"
          style={{
            fontSize: "clamp(52px, 7.5vw, 96px)",
            letterSpacing: "-0.04em",
            lineHeight: 1.02,
          }}
        >
          {/* Line 1 */}
          <span className="block text-[#EDEDEA] mb-1">
            <WordReveal text="بيع على واتساب" baseDelay={0.1} />
          </span>
          {/* Line 2 — gradient */}
          <span className="block">
            <WordReveal
              text="بدون ما تضيع الوقت"
              baseDelay={0.25}
              gradient
            />
          </span>
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-[17px] text-[#9B9B97] max-w-[520px] mx-auto text-center leading-relaxed mb-10"
        >
          بوت ذكي يرد على الزبناء، يعرض الأسعار، ويأكد الطلبات COD — 24/7.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
        >
          {/* Primary CTA */}
          <Link
            href="/signup"
            className="group relative flex items-center gap-2.5 bg-[#10B981] hover:bg-emerald-400 text-white font-bold px-8 py-[15px] rounded-xl text-[15px] transition-colors duration-150 overflow-hidden"
            style={{
              boxShadow:
                "0 0 0 1px rgba(16,185,129,0.25), 0 8px 24px rgba(16,185,129,0.2), 0 20px 40px rgba(16,185,129,0.06)",
            }}
          >
            {/* Shimmer overlay */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/[0.16] to-transparent transition-transform duration-700 pointer-events-none" />
            <span className="relative z-10 flex items-center gap-2">
              ابدأ مجاناً — 14 يوم
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </span>
          </Link>

          {/* Ghost CTA */}
          <a
            href="/#how-it-works"
            className="flex items-center gap-2 border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.07] text-[#9B9B97] hover:text-[#EDEDEA] px-7 py-[15px] rounded-xl text-[15px] font-medium transition-all duration-200"
          >
            شوف كيف يشتغل
          </a>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          className="flex items-center justify-center gap-3 text-[12px] text-[#525252]"
        >
          <span>بدون بطاقة بنكية</span>
          <span className="text-[#2A2A2A]">·</span>
          <span>إعداد في 5 دقائق</span>
          <span className="text-[#2A2A2A]">·</span>
          <span>
            4.9 ⭐ من 1,200+ متجر
          </span>
        </motion.div>
      </div>

      {/* ── Browser chrome product preview ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[900px] mx-auto px-4 mt-16"
      >
        <BrowserMockup />
        {/* Gradient fade at bottom so mockup "peeks" into next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(18,20,20,0.6) 50%, #121414 100%)",
          }}
        />
      </motion.div>
    </section>
  );
}
