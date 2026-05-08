"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowLeft, ShieldCheck, Zap, Star, TrendingUp } from "lucide-react";
import Link from "next/link";

const messages = [
  { from: "user" as const, text: "سلام، عندكم قميص بيسيك؟", delay: 0.5 },
  { from: "bot"  as const, text: "أهلاً! آه عندنا — القميص البريميوم بـ 189 درهم 👕", delay: 1.5 },
  { from: "user" as const, text: "بغيت حجم L، والتوصيل لكازا بشحال؟", delay: 2.8 },
  { from: "bot"  as const, text: "التوصيل 30 درهم، المجموع 219 درهم. تأكد؟", delay: 4.0 },
  { from: "user" as const, text: "آه مؤكد، اسمي محمد والعنوان أكدال", delay: 5.3 },
  { from: "bot"  as const, text: "✅ طلبك #FL-2847 تأكد! التوصيل خلال 48 ساعة 🎉", delay: 6.3 },
];

function WaConversation() {
  const [visible, setVisible] = useState(0);
  const [loop, setLoop] = useState(0);

  useEffect(() => {
    setVisible(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    messages.forEach((msg, i) => {
      timers.push(setTimeout(() => setVisible(i + 1), msg.delay * 1000));
    });
    timers.push(setTimeout(() => setLoop((l) => l + 1), 10000));
    return () => timers.forEach(clearTimeout);
  }, [loop]);

  return (
    <div
      className="bg-[#0B141A] rounded-2xl border border-white/[0.07] overflow-hidden w-[288px] sm:w-[320px]"
      style={{ boxShadow: "0 32px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)" }}
    >
      {/* WA Header */}
      <div className="bg-[#1F2C33] px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#25D366] to-emerald-700 flex items-center justify-center text-white text-[11px] font-black shrink-0">
          F
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-semibold text-white">FunnelsLibrary Bot</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse shrink-0" />
            <p className="text-[10px] text-[#25D366]">يرد تلقائياً الآن</p>
          </div>
        </div>
        <div className="flex flex-col gap-[3px] opacity-30">
          {[0, 1, 2].map((i) => <span key={i} className="w-[3px] h-[3px] rounded-full bg-white block" />)}
        </div>
      </div>

      {/* Chat body */}
      <div
        dir="ltr"
        className="px-3 py-3 space-y-2 min-h-[216px]"
        style={{
          background: "#0B141A",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Ccircle cx='1' cy='1' r='0.8' fill='%23ffffff' fill-opacity='0.012'/%3E%3C/svg%3E\")",
        }}
      >
        {messages.slice(0, visible).map((msg, i) => (
          <motion.div
            key={`${loop}-${i}`}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={`flex ${msg.from === "bot" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] px-3 py-1.5 text-[11.5px] leading-relaxed ${
                msg.from === "bot"
                  ? "bg-[#005C4B] text-white rounded-2xl rounded-tr-sm"
                  : "bg-[#202C33] text-gray-300 rounded-2xl rounded-tl-sm"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
        {visible > 0 && visible < messages.length && (
          <div className="flex justify-end" style={{ direction: "ltr" }}>
            <div className="bg-[#005C4B] px-3 py-2 rounded-2xl rounded-tr-sm flex items-center gap-1.5">
              {[0, 0.2, 0.4].map((d, i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.9, delay: d, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-white/60 inline-block"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const orb3Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-[#060912] pt-20 pb-16">

      {/* Noise */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.032]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='%23ffffff' fill-opacity='0.015'%3E%3Cpath d='M0 0h1v60H0zm60 0v1H0V0z'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none bg-gradient-to-t from-[#060912] to-transparent" />

      {/* Gradient orbs */}
      <motion.div
        style={{ y: orb1Y, background: "radial-gradient(ellipse, rgba(37,211,102,0.13) 0%, transparent 70%)" }}
        className="absolute -top-[240px] -right-[120px] w-[760px] h-[760px] rounded-full pointer-events-none blur-[2px]"
      />
      <motion.div
        style={{ y: orb2Y, background: "radial-gradient(ellipse, rgba(59,130,246,0.09) 0%, transparent 70%)" }}
        className="absolute top-[160px] -left-[180px] w-[580px] h-[580px] rounded-full pointer-events-none blur-[2px]"
      />
      <motion.div
        style={{ y: orb3Y, background: "radial-gradient(ellipse, rgba(139,92,246,0.07) 0%, transparent 70%)" }}
        className="absolute -bottom-[120px] left-[35%] w-[480px] h-[480px] rounded-full pointer-events-none blur-[2px]"
      />

      <motion.div style={{ y: contentY }} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-center">

          {/* Text: right side in RTL */}
          <div className="text-center lg:text-right order-2 lg:order-1">

            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 bg-white/[0.05] border border-white/[0.09] backdrop-blur-sm rounded-full px-4 py-2 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span className="text-[13px] font-semibold text-white/70">
                بوت واتساب بالذكاء الاصطناعي للمتاجر المغربية
              </span>
              <span className="bg-[#25D366]/20 text-[#25D366] text-[10px] font-black px-2 py-0.5 rounded-full border border-[#25D366]/25 font-inter">
                GPT-4
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="text-[52px] sm:text-[64px] lg:text-[76px] xl:text-[88px] font-black leading-[1.04] tracking-tight mb-6"
            >
              <span className="text-white block">بيع أكثر</span>
              <span
                className="block bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #25D366 0%, #86efac 50%, #25D366 100%)" }}
              >
                على واتساب
              </span>
              <span className="block text-white/30 text-[38px] sm:text-[46px] lg:text-[54px] xl:text-[62px] mt-1">
                بدون ما تضيع الوقت
              </span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="text-[17px] text-white/35 leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0"
            >
              بوت ذكي يرد على الزبناء، يعرض الأسعار، يأكد الطلبات{" "}
              <span className="text-white/60 font-semibold">COD</span>، ويجمع المعلومات —{" "}
              <span className="text-white/60 font-semibold">24/7 بدون توقف</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-12"
            >
              <Link
                href="/signup"
                className="group relative flex items-center gap-2 bg-[#25D366] text-white font-bold px-7 py-4 rounded-xl text-[15px] transition-all duration-200 overflow-hidden w-full sm:w-auto justify-center hover:bg-[#22c55e]"
                style={{ boxShadow: "0 0 0 1px rgba(37,211,102,0.25), 0 8px 24px rgba(37,211,102,0.28), 0 24px 48px rgba(37,211,102,0.08)" }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  ابدأ مجاناً — 14 يوم
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700" />
              </Link>
              <a
                href="/#how-it-works"
                className="flex items-center gap-2 text-[15px] font-semibold text-white/40 hover:text-white/80 px-5 py-4 rounded-xl border border-white/[0.08] hover:border-white/[0.18] hover:bg-white/[0.04] transition-all duration-200 w-full sm:w-auto justify-center backdrop-blur-sm"
              >
                شوف كيف يشتغل
              </a>
            </motion.div>

            {/* Trust */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.42 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-[13px] text-white/30"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#25D366]/60" />
                بدون بيانات بنكية
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#25D366]/60" />
                إعداد في 5 دقائق
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400" fill="#F59E0B" />
                  ))}
                </div>
                <span>
                  <strong className="text-white/55">4.9</strong> · 1,200+ متجر
                </span>
              </div>
            </motion.div>
          </div>

          {/* Visual: left side in RTL */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">

              {/* WA conversation */}
              <WaConversation />

              {/* Floating: revenue KPI */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -left-6 lg:-left-14 backdrop-blur-xl border border-white/[0.09] rounded-2xl p-3.5 min-w-[148px]"
                style={{
                  background: "rgba(14,17,23,0.9)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-[#25D366]" />
                  <span className="text-[10px] text-white/35">مبيعات اليوم</span>
                </div>
                <p className="text-[20px] font-black font-inter text-[#25D366] leading-none">
                  6,840 <span className="text-[12px] font-semibold text-white/40">درهم</span>
                </p>
                <div className="flex items-end gap-0.5 h-7 mt-2" dir="ltr">
                  {[40, 55, 42, 70, 60, 85, 72, 100].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-[2px] transition-all"
                      style={{
                        height: `${h}%`,
                        backgroundColor: i === 7 ? "#25D366" : "rgba(37,211,102,0.18)",
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Floating: order confirmed — appears when conversation completes */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-12 -right-6 lg:-right-12 backdrop-blur-xl border border-white/[0.09] rounded-2xl p-3 flex items-center gap-3"
                style={{
                  background: "rgba(14,17,23,0.9)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
                }}
              >
                <div className="w-9 h-9 rounded-xl bg-[#25D366]/15 border border-[#25D366]/20 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[#25D366]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <p className="text-[12px] font-bold text-white leading-none">طلب مؤكد COD</p>
                  <p className="text-[10px] text-white/35 mt-0.5 font-inter">#FL-2847 · الرباط</p>
                </div>
              </motion.div>

              {/* Glow behind widget */}
              <div
                className="absolute inset-0 -z-10 rounded-2xl blur-3xl scale-75"
                style={{ background: "radial-gradient(ellipse, rgba(37,211,102,0.12) 0%, transparent 70%)" }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
