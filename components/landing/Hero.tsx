"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useEffect } from "react";
import { ArrowLeft, Sparkles, CheckCircle2, TrendingUp, MessageCircle, ShoppingBag } from "lucide-react";
import Link from "next/link";

/* ─── Word-by-word reveal ─────────────────────────────────────────────────── */

function WordReveal({
  text,
  baseDelay = 0,
  gradient = false,
}: {
  text: string;
  baseDelay?: number;
  gradient?: boolean;
}) {
  const words = text.split(" ");
  return (
    <span
      aria-label={text}
      style={{ display: "inline-flex", flexWrap: "wrap", gap: "0 0.24em", justifyContent: "center" }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          aria-hidden="true"
          style={{ verticalAlign: "bottom" }}
        >
          <motion.span
            className={`inline-block ${gradient ? "bg-clip-text text-transparent" : ""}`}
            style={
              gradient
                ? { backgroundImage: "linear-gradient(135deg, #10B981 0%, #6EE7B7 45%, #34D399 100%)" }
                : undefined
            }
            initial={{ opacity: 0, y: "110%", filter: "blur(8px)" }}
            animate={{ opacity: 1, y: "0%", filter: "blur(0px)" }}
            transition={{
              duration: 0.72,
              delay: i * 0.085 + baseDelay,
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

/* ─── Floating order notification card ───────────────────────────────────── */

function OrderCard() {
  return (
    <motion.div
      className="absolute z-20"
      style={{ top: -28, right: -36 }}
      initial={{ opacity: 0, x: 24, scale: 0.88 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        className="w-[188px] rounded-2xl p-3.5"
        style={{
          background: "#181A1B",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.85), 0 4px 16px rgba(0,0,0,0.5)",
          transform: "rotate(-1.5deg)",
        }}
      >
        <div className="flex items-start gap-2.5 mb-2.5">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.22)" }}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-[#EDEDEA] leading-none">طلب جديد مؤكد</p>
            <p className="text-[9.5px] text-[#525252] font-inter mt-0.5">الآن</p>
          </div>
        </div>
        <div
          className="rounded-xl px-3 py-2.5"
          style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.08)" }}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-[#EDEDEA] font-inter">#FL-2849</span>
            <span className="text-[9px] text-[#9B9B97]">الرباط</span>
          </div>
          <p className="text-[9.5px] text-[#9B9B97] mb-1.5">بلوزة حمراء L — COD</p>
          <p className="text-[15px] font-black text-[#10B981] font-inter leading-none">390 د</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Floating revenue card ───────────────────────────────────────────────── */

function RevenueCard() {
  return (
    <motion.div
      className="absolute z-20"
      style={{ top: 32, left: -44 }}
      initial={{ opacity: 0, x: -24, scale: 0.88 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="w-[172px] rounded-2xl p-3.5"
        style={{
          background: "#181A1B",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.85), 0 4px 16px rgba(0,0,0,0.5)",
          transform: "rotate(1.5deg)",
        }}
      >
        <div className="flex items-center gap-2 mb-2.5">
          <TrendingUp className="w-3.5 h-3.5 text-[#10B981]" />
          <p className="text-[10px] text-[#9B9B97]">إيرادات اليوم</p>
        </div>
        <p className="font-black text-[26px] text-[#EDEDEA] leading-none font-inter mb-1">
          12.8K
        </p>
        <div className="flex items-center gap-1 mb-2.5">
          <span className="text-[10px] font-bold font-inter text-[#10B981]">↑ +38%</span>
          <span className="text-[9.5px] text-[#525252]">عن الأمس</span>
        </div>
        {/* Mini chart */}
        <div className="flex items-end gap-0.5 h-[18px]">
          {[35, 50, 42, 68, 55, 80, 72, 100].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-[1.5px]"
              style={{
                height: `${h}%`,
                backgroundColor:
                  i === 7
                    ? "#10B981"
                    : `rgba(16,185,129,${0.12 + i * 0.1})`,
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Floating WA chat card ───────────────────────────────────────────────── */

function WaCard() {
  const messages = [
    { from: "user", text: "واش عندكم بلوزة حمراء؟" },
    { from: "bot", text: "آه عندنا! S,M,L بـ 180 درهم 🎉" },
    { from: "user", text: "بغيت L، كازا — COD" },
    { from: "bot", text: "✅ تأكد طلبك #FL-2849!" },
  ];

  return (
    <motion.div
      className="absolute z-20"
      style={{ bottom: 80, left: -36 }}
      initial={{ opacity: 0, y: 24, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.65, delay: 1.95, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.0 }}
        className="w-[210px] rounded-2xl overflow-hidden"
        style={{
          boxShadow: "0 24px 64px rgba(0,0,0,0.9), 0 4px 16px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.07)",
          transform: "rotate(0.5deg)",
        }}
      >
        {/* WA header */}
        <div className="bg-[#1F2C33] px-3 py-2.5 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center text-white text-[9px] font-black shrink-0">
            F
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold text-white leading-none truncate">FunnelsLibrary Bot</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="w-1 h-1 rounded-full bg-[#25D366]" />
              <p className="text-[8px] text-[#25D366]">يرد تلقائياً</p>
            </div>
          </div>
        </div>

        {/* Chat body */}
        <div className="bg-[#0B141A] px-2.5 py-2.5 space-y-1.5" dir="ltr">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: 2.1 + i * 0.15 }}
              className={`flex ${msg.from === "bot" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[88%] px-2.5 py-1.5 text-[9.5px] leading-snug rounded-xl ${
                  msg.from === "bot"
                    ? "bg-[#005C4B] text-white rounded-br-sm"
                    : "bg-[#202C33] text-gray-300 rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Dashboard inside MacBook screen ────────────────────────────────────── */

function DashboardScreen() {
  const kpis = [
    { label: "محادثات", value: "1,847", change: "+22%", color: "#3B82F6", icon: MessageCircle },
    { label: "الطلبات", value: "423", change: "+38%", color: "#10B981", icon: ShoppingBag },
    { label: "الإيرادات", value: "127K", change: "+31%", color: "#8B5CF6", icon: TrendingUp },
  ];
  const bars = [28, 38, 33, 52, 44, 65, 54, 76, 62, 88, 74, 100];

  return (
    <div className="bg-[#0D0F10] px-5 py-4" dir="rtl">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[11px] font-bold text-[#EDEDEA]">لوحة التحكم</p>
          <p className="text-[9px] text-[#525252] font-inter mt-0.5">آخر تحديث: الآن</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#10B981]" />
          </span>
          <span className="text-[9px] font-semibold font-inter text-[#10B981]">LIVE</span>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-3 gap-2.5 mb-3">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div
              key={i}
              className="rounded-xl p-3"
              style={{
                background: "#151719",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center"
                  style={{ background: `${kpi.color}18` }}
                >
                  <Icon className="w-2.5 h-2.5" style={{ color: kpi.color }} />
                </div>
                <span
                  className="text-[8.5px] font-bold font-inter px-1.5 py-0.5 rounded-full"
                  style={{ color: kpi.color, background: `${kpi.color}15` }}
                >
                  {kpi.change}
                </span>
              </div>
              <p className="text-[18px] font-black text-[#EDEDEA] leading-none font-inter mb-0.5">
                {kpi.value}
              </p>
              <p className="text-[9px] text-[#525252]">{kpi.label}</p>
            </div>
          );
        })}
      </div>

      {/* Chart + activity */}
      <div className="grid grid-cols-[1fr_160px] gap-2.5">
        {/* Bar chart */}
        <div
          className="rounded-xl p-3.5"
          style={{ background: "#151719", border: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-semibold text-[#EDEDEA]">الإيرادات الشهرية</p>
            <span
              className="text-[8.5px] font-semibold font-inter px-2 py-0.5 rounded-full"
              style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}
            >
              +31% هذا الشهر
            </span>
          </div>
          <div className="flex items-end gap-1 h-[52px]">
            {bars.map((h, i) => {
              const isLast = i === bars.length - 1;
              const isSecondLast = i === bars.length - 2;
              return (
                <div
                  key={i}
                  className="flex-1 rounded-[2px]"
                  style={{
                    height: `${h}%`,
                    backgroundColor: isLast
                      ? "#10B981"
                      : isSecondLast
                      ? "rgba(16,185,129,0.38)"
                      : `rgba(16,185,129,${0.08 + i * 0.018})`,
                  }}
                />
              );
            })}
          </div>
          <div className="flex justify-between mt-1.5">
            {["يناير", "مارس", "مايو", "يوليو", "سبتمبر", "نونبر"].map((m) => (
              <span key={m} className="text-[7.5px] text-[#3A3A3A] font-inter">
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Recent orders */}
        <div
          className="rounded-xl p-3"
          style={{ background: "#151719", border: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-[10px] font-semibold text-[#EDEDEA] mb-2.5">آخر الطلبات</p>
          <div className="space-y-2">
            {[
              { id: "#2852", city: "الرباط", amt: "390 د", color: "#10B981" },
              { id: "#2851", city: "كازا", amt: "260 د", color: "#3B82F6" },
              { id: "#2850", city: "مراكش", amt: "180 د", color: "#8B5CF6" },
              { id: "#2849", city: "أكادير", amt: "340 د", color: "#F59E0B" },
            ].map((o) => (
              <div key={o.id} className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: o.color }} />
                <span className="text-[9px] font-bold font-inter text-[#EDEDEA]">{o.id}</span>
                <span className="text-[9px] text-[#525252] flex-1 text-center">{o.city}</span>
                <span className="text-[9px] font-semibold font-inter" style={{ color: o.color }}>{o.amt}</span>
              </div>
            ))}
          </div>
          <div className="mt-2.5 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <p className="text-[8px] text-[#3A3A3A] text-center font-inter">تحديث تلقائي</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MacBook frame ───────────────────────────────────────────────────────── */

function MacBook() {
  return (
    <div dir="ltr">
      {/* Lid / screen frame */}
      <div
        className="rounded-t-[18px] rounded-b-[4px] relative"
        style={{
          background: "linear-gradient(160deg, #2E2E30 0%, #252527 40%, #222224 100%)",
          padding: "10px 10px 0",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.07), inset 0 1px 0 rgba(255,255,255,0.08), 0 40px 120px rgba(0,0,0,0.9), 0 12px 40px rgba(0,0,0,0.7)",
        }}
      >
        {/* Camera */}
        <div className="flex justify-center pb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#3A3A3C]" />
        </div>

        {/* Screen bezel */}
        <div
          className="rounded-t-[10px] overflow-hidden"
          style={{ background: "#0D0F10" }}
        >
          {/* Browser chrome */}
          <div
            className="flex items-center gap-3 px-4 py-2.5"
            style={{ background: "#1A1C1E", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
          >
            {/* Traffic lights */}
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            </div>
            {/* URL bar */}
            <div className="flex-1 flex justify-center">
              <div
                className="flex items-center gap-2 rounded-md px-3 py-1.5 w-52"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <svg className="w-2.5 h-2.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#525252" strokeWidth={2.5}>
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className="text-[10px] text-[#525252] font-inter truncate">
                  app.funnelslibrary.com
                </span>
              </div>
            </div>
            <div className="w-16 shrink-0" />
          </div>

          {/* Dashboard */}
          <DashboardScreen />
        </div>
      </div>

      {/* Hinge shadow */}
      <div className="h-[3px] mx-[8px]" style={{ background: "linear-gradient(to bottom, #111113, #1A1A1C)" }} />

      {/* Base */}
      <div
        className="h-[22px] rounded-b-[12px] relative"
        style={{
          background: "linear-gradient(to bottom, #2A2A2C, #222224)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        }}
      >
        {/* Ventilation line */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ width: "35%", height: 1, background: "rgba(255,255,255,0.04)" }}
        />
        {/* Notch */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-sm"
          style={{ width: 80, height: 6, background: "#1C1C1E" }}
        />
      </div>

      {/* Stand foot */}
      <div
        className="h-[6px] rounded-b-lg mx-auto"
        style={{ width: "42%", background: "#1C1C1E" }}
      />
    </div>
  );
}

/* ─── Main Hero ───────────────────────────────────────────────────────────── */

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Scroll parallax */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  /* Mouse parallax */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const glowX = useSpring(useTransform(rawX, (v) => v * 0.028), { stiffness: 38, damping: 22 });
  const glowMouseY = useSpring(useTransform(rawY, (v) => v * 0.028), { stiffness: 38, damping: 22 });

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
      className="relative min-h-screen bg-[#121414] flex flex-col items-center overflow-hidden"
      dir="rtl"
      style={{ paddingTop: "clamp(96px, 12vh, 128px)", paddingBottom: 0 }}
    >
      {/* ── Dot grid ───────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.042) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Vignette edges ─────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(18,20,20,0.6) 100%)",
        }}
      />

      {/* ── Main center glow (scroll + mouse parallax) ─────────────────────── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 1200,
          height: 700,
          left: "50%",
          top: "40%",
          translateX: "-50%",
          translateY: "-50%",
          y: glowY,
          x: glowX,
        }}
      >
        <div
          className="w-full h-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(16,185,129,0.11) 0%, rgba(16,185,129,0.03) 45%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* ── Secondary subtle glow ──────────────────────────────────────────── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 400,
          left: "50%",
          top: "60%",
          translateX: "-50%",
          translateY: "-50%",
          y: glowMouseY,
          background:
            "radial-gradient(ellipse, rgba(16,185,129,0.05) 0%, transparent 65%)",
        }}
      />

      {/* ── Horizontal top accent line ─────────────────────────────────────── */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(16,185,129,0.3) 30%, rgba(16,185,129,0.3) 70%, transparent)",
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* TEXT CONTENT                                                        */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 w-full max-w-[700px] mx-auto px-5 flex flex-col items-center text-center"
      >
        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.09] px-4 py-[7px] mb-10"
          style={{ background: "rgba(255,255,255,0.025)" }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#10B981]" />
          </span>
          <span className="text-[12.5px] text-[#9B9B97] leading-none">
            بوت واتساب مدعوم بالذكاء الاصطناعي
          </span>
          <span
            className="text-[10px] font-bold font-inter text-[#10B981] rounded-full px-2 py-[3px] leading-none"
            style={{ background: "rgba(16,185,129,0.14)", border: "1px solid rgba(16,185,129,0.22)" }}
          >
            جديد
          </span>
        </motion.div>

        {/* ── Headline ─────────────────────────────────────────────────────── */}
        <h1
          className="font-black text-center mb-7"
          style={{
            fontSize: "clamp(54px, 8.5vw, 108px)",
            letterSpacing: "-0.042em",
            lineHeight: 0.98,
          }}
        >
          <span className="block text-[#EDEDEA] mb-3">
            <WordReveal text="بيع على واتساب" baseDelay={0.06} />
          </span>
          <span className="block">
            <WordReveal text="بالذكاء الاصطناعي" baseDelay={0.2} gradient />
          </span>
        </h1>

        {/* ── Subheadline ──────────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#9B9B97] max-w-[480px] mx-auto leading-relaxed mb-11"
          style={{ fontSize: "clamp(15px, 2vw, 18px)" }}
        >
          بوت ذكي يرد على الزبناء، يأكد الطلبات COD، ويتابع المبيعات — على مدار الساعة.
        </motion.p>

        {/* ── CTA buttons ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.64, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-9"
        >
          {/* Primary */}
          <Link
            href="/signup"
            className="group relative inline-flex items-center gap-2.5 font-bold text-white rounded-xl overflow-hidden transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              padding: "14px 32px",
              fontSize: 15,
              background: "#10B981",
              boxShadow:
                "0 0 0 1px rgba(16,185,129,0.35), 0 8px 28px rgba(16,185,129,0.24), 0 2px 6px rgba(0,0,0,0.35)",
            }}
          >
            {/* Shimmer */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/[0.14] to-transparent transition-transform duration-700 pointer-events-none" />
            <span className="relative z-10">ابدأ الآن — مجاناً</span>
            <ArrowLeft className="w-4 h-4 relative z-10 transition-transform duration-200 group-hover:-translate-x-1" />
          </Link>

          {/* Secondary */}
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2.5 rounded-xl font-medium transition-all duration-200 hover:border-white/[0.18] hover:bg-white/[0.06] hover:text-[#EDEDEA]"
            style={{
              padding: "14px 28px",
              fontSize: 15,
              color: "#9B9B97",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.025)",
            }}
          >
            شاهد كيف يعمل
          </a>
        </motion.div>

        {/* ── Trust row ────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.82 }}
          className="flex items-center flex-wrap justify-center gap-x-3 gap-y-1.5"
          style={{ fontSize: 12, color: "#525252" }}
        >
          <span>بدون بطاقة بنكية</span>
          <span style={{ color: "#282828" }}>·</span>
          <span>إعداد في 5 دقائق</span>
          <span style={{ color: "#282828" }}>·</span>
          <span>4.9 ⭐ من 1,200+ متجر</span>
        </motion.div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* PRODUCT MOCKUP                                                      */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 56 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: mockupY }}
        className="relative z-10 w-full max-w-[880px] mx-auto px-6 mt-20 pb-0"
      >
        {/* Ambient glow behind MacBook */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: "70%",
            height: "50%",
            left: "15%",
            top: "10%",
            background:
              "radial-gradient(ellipse, rgba(16,185,129,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Floating notification cards */}
        <OrderCard />
        <RevenueCard />
        <WaCard />

        {/* MacBook */}
        <div className="relative z-10">
          <MacBook />
        </div>

        {/* Bottom gradient fade — mockup bleeds into next section */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: 200,
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(18,20,20,0.5) 40%, #121414 100%)",
          }}
        />
      </motion.div>
    </section>
  );
}
