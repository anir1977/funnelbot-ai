"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowLeft, ShieldCheck, Zap, Star, TrendingUp } from "lucide-react";
import Link from "next/link";

const messages = [
  { from: "user" as const, text: "سلام، عندكم قميص بيسيك بلي جودة؟", delay: 0.5 },
  { from: "bot"  as const, text: "أهلاً محمد! آه عندنا — القميص البريميوم 100% قطن بـ 189 درهم 👕", delay: 1.6 },
  { from: "user" as const, text: "بغيت حجم L، والتوصيل لكازا بشحال؟", delay: 3.0 },
  { from: "bot"  as const, text: "التوصيل لكازا 30 درهم 🚚 المجموع: 219 درهم. تأكد الطلب؟", delay: 4.3 },
  { from: "user" as const, text: "آه مؤكد، عنواني أكدال حي الرياض", delay: 5.6 },
  { from: "bot"  as const, text: "✅ تم تأكيد طلبك رقم #FL-2847! غادي يوصلك خلال 24-48 ساعة 🎉", delay: 6.7 },
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
    timers.push(setTimeout(() => setLoop((l) => l + 1), 11000));
    return () => timers.forEach(clearTimeout);
  }, [loop]);

  return (
    <div
      className="bg-[#0B141A] rounded-2xl overflow-hidden w-[292px] sm:w-[324px]"
      style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.05)" }}
    >
      {/* WA status bar */}
      <div className="bg-[#075E54] px-3 py-1 flex items-center justify-between">
        <span className="text-[9px] text-white/60 font-inter">9:41</span>
        <div className="flex items-center gap-1 opacity-60">
          <div className="flex gap-0.5 items-end h-2.5">
            {[3, 5, 7, 9, 7].map((h, i) => (
              <div key={i} className="w-0.5 bg-white rounded-full" style={{ height: h }} />
            ))}
          </div>
          <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1.5 8.5a13 13 0 0 1 21 0M5.5 12.5a8 8 0 0 1 13 0M9.5 16.5a4 4 0 0 1 5 0M12 20h.01" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" />
          </svg>
          <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 17H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2v3" /><rect x="9" y="11" width="14" height="10" rx="1" /><line x1="13" y1="11" x2="13" y2="21" /><line x1="9" y1="16" x2="23" y2="16" />
          </svg>
        </div>
      </div>

      {/* WA Header */}
      <div className="bg-[#1F2C33] px-3.5 py-2.5 flex items-center gap-3">
        <svg className="w-5 h-5 text-white/50 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#25D366] to-emerald-700 flex items-center justify-center text-white text-[11px] font-black shrink-0">
          F
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12.5px] font-semibold text-white leading-none">FunnelsLibrary Bot</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse shrink-0" />
            <p className="text-[10px] text-[#25D366]">يرد تلقائياً</p>
          </div>
        </div>
        <div className="flex gap-3 opacity-40">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
        </div>
      </div>

      {/* Chat body */}
      <div
        dir="ltr"
        className="px-3 py-3 space-y-[7px] min-h-[220px]"
        style={{
          background: "#0B141A",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Ccircle cx='1' cy='1' r='0.8' fill='%23ffffff' fill-opacity='0.012'/%3E%3C/svg%3E\")",
        }}
      >
        {messages.slice(0, visible).map((msg, i) => (
          <motion.div
            key={`${loop}-${i}`}
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={`flex ${msg.from === "bot" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[86%] px-3 py-1.5 text-[11.5px] leading-relaxed ${
                msg.from === "bot"
                  ? "bg-[#005C4B] text-white rounded-2xl rounded-br-sm"
                  : "bg-[#202C33] text-gray-200 rounded-2xl rounded-bl-sm"
              }`}
            >
              <p>{msg.text}</p>
              <p className={`text-[8.5px] mt-0.5 text-right ${msg.from === "bot" ? "text-white/40" : "text-white/25"}`}>
                {msg.from === "bot" ? "✓✓" : ""} {["9:41","9:41","9:42","9:42","9:43","9:43"][i]}
              </p>
            </div>
          </motion.div>
        ))}
        {visible > 0 && visible < messages.length && (
          <div dir="ltr" className="flex justify-end">
            <div className="bg-[#005C4B] px-3 py-2.5 rounded-2xl rounded-br-sm flex items-center gap-1.5">
              {[0, 0.18, 0.36].map((d, i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                  transition={{ duration: 0.8, delay: d, repeat: Infinity }}
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
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const orb3Y = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  /* Mouse parallax */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 45, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 45, damping: 22 });
  const kpiX = useTransform(smoothX, (v) => v * -0.055);
  const kpiYm = useTransform(smoothY, (v) => v * -0.04);
  const orderX = useTransform(smoothX, (v) => v * 0.04);
  const orderYm = useTransform(smoothY, (v) => v * 0.045);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

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
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='%23ffffff' fill-opacity='0.016'%3E%3Cpath d='M0 0h1v60H0zm60 0v1H0V0z'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* Vignette fade bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none bg-gradient-to-t from-[#060912] to-transparent" />

      {/* Gradient orbs */}
      <motion.div
        style={{ y: orb1Y, background: "radial-gradient(ellipse, rgba(37,211,102,0.14) 0%, transparent 68%)" }}
        className="absolute -top-[260px] -right-[140px] w-[800px] h-[800px] rounded-full pointer-events-none"
      />
      <motion.div
        style={{ y: orb2Y, background: "radial-gradient(ellipse, rgba(59,130,246,0.09) 0%, transparent 68%)" }}
        className="absolute top-[140px] -left-[200px] w-[600px] h-[600px] rounded-full pointer-events-none"
      />
      <motion.div
        style={{ y: orb3Y, background: "radial-gradient(ellipse, rgba(139,92,246,0.07) 0%, transparent 68%)" }}
        className="absolute -bottom-[140px] left-[32%] w-[500px] h-[500px] rounded-full pointer-events-none"
      />

      <motion.div style={{ y: contentY }} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-center">

          {/* Text side */}
          <div className="text-center lg:text-right order-2 lg:order-1">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 mb-8"
            >
              <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.09] backdrop-blur-sm rounded-full px-3.5 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
                </span>
                <span className="text-[12.5px] font-medium text-white/65 leading-none">
                  بوت واتساب بالذكاء الاصطناعي
                </span>
                <span className="h-3 w-px bg-white/[0.12]" />
                <span className="text-[10px] font-black text-[#25D366] font-inter">GPT-4</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="font-black leading-[1.03] mb-6"
              style={{ letterSpacing: "-0.035em" }}
            >
              <span className="block text-white" style={{ fontSize: "clamp(44px, 7vw, 88px)" }}>
                بيع أكثر
              </span>
              <span
                className="block bg-clip-text text-transparent"
                style={{
                  fontSize: "clamp(44px, 7vw, 88px)",
                  backgroundImage: "linear-gradient(130deg, #25D366 0%, #a7f3d0 45%, #25D366 100%)",
                }}
              >
                على واتساب
              </span>
              <span
                className="block text-white/28 mt-1"
                style={{ fontSize: "clamp(28px, 4.5vw, 60px)", letterSpacing: "-0.025em" }}
              >
                بدون ما تضيع الوقت
              </span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.17, ease: [0.22, 1, 0.36, 1] }}
              className="text-[16.5px] text-white/35 leading-[1.75] mb-9 max-w-[460px] mx-auto lg:mx-0"
            >
              بوت ذكي يرد على الزبناء، يعرض الأسعار، يأكد الطلبات{" "}
              <span className="text-white/60 font-semibold">COD</span>، ويجمع المعلومات —{" "}
              <span className="text-white/60 font-semibold">24/7 بدون توقف</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-5"
            >
              <Link
                href="/signup"
                className="group relative flex items-center gap-2.5 bg-[#25D366] text-white font-bold px-7 py-[14px] rounded-xl text-[15px] transition-colors duration-150 overflow-hidden w-full sm:w-auto justify-center hover:bg-[#22c55e]"
                style={{ boxShadow: "0 0 0 1px rgba(37,211,102,0.3), 0 6px 20px rgba(37,211,102,0.3), 0 20px 40px rgba(37,211,102,0.1)" }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  ابدأ مجاناً — 14 يوم
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/[0.14] to-transparent transition-transform duration-700" />
              </Link>
              <a
                href="/#how-it-works"
                className="flex items-center gap-2 text-[15px] font-semibold text-white/38 hover:text-white/80 px-6 py-[14px] rounded-xl border border-white/[0.08] hover:border-white/[0.16] hover:bg-white/[0.03] transition-all duration-200 w-full sm:w-auto justify-center"
              >
                شوف كيف يشتغل
              </a>
            </motion.div>

            {/* Social proof micro line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="text-[12px] text-white/22 mb-8 text-center lg:text-right"
            >
              انضم لـ{" "}
              <span className="text-white/45 font-semibold">1,200+ متجر مغربي</span>
              {" "}يستعمل FunnelsLibrary الآن
            </motion.p>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.44 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-5 text-[12.5px] text-white/28"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]/55 shrink-0" />
                بدون بيانات بنكية
              </div>
              <span className="w-px h-3 bg-white/[0.08]" />
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#25D366]/55 shrink-0" />
                إعداد في 5 دقائق
              </div>
              <span className="w-px h-3 bg-white/[0.08]" />
              <div className="flex items-center gap-1.5">
                <div className="flex gap-px">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-3 h-3 text-amber-400" fill="#F59E0B" />
                  ))}
                </div>
                <span>
                  <strong className="text-white/50">4.9</strong> · 1,200+ تقييم
                </span>
              </div>
            </motion.div>
          </div>

          {/* Visual side */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">

              {/* Pulsing glow ring behind widget */}
              <motion.div
                animate={{ opacity: [0.5, 0.9, 0.5], scale: [0.94, 1.04, 0.94] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-[-24px] -z-10 rounded-3xl"
                style={{ background: "radial-gradient(ellipse, rgba(37,211,102,0.16) 0%, transparent 72%)" }}
              />
              {/* Secondary glow (blue) */}
              <motion.div
                animate={{ opacity: [0.2, 0.5, 0.2], scale: [1.05, 0.95, 1.05] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute inset-[-40px] -z-10 rounded-3xl"
                style={{ background: "radial-gradient(ellipse at 20% 80%, rgba(59,130,246,0.1) 0%, transparent 70%)" }}
              />

              {/* WA conversation */}
              <WaConversation />

              {/* Floating: revenue KPI — parallax layer */}
              <motion.div style={{ x: kpiX, y: kpiYm }} className="absolute -top-14 -left-4 sm:-left-10 lg:-left-16">
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="backdrop-blur-xl border border-white/[0.1] rounded-2xl p-3.5 min-w-[152px]"
                  style={{
                    background: "linear-gradient(145deg, rgba(17,24,32,0.96) 0%, rgba(11,17,21,0.96) 100%)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-md bg-[#25D366]/20 flex items-center justify-center">
                      <TrendingUp className="w-3 h-3 text-[#25D366]" />
                    </div>
                    <span className="text-[10px] text-white/35 font-medium">مبيعات اليوم</span>
                  </div>
                  <p className="text-[22px] font-black font-inter text-white leading-none mb-0.5">
                    6,840
                  </p>
                  <p className="text-[11px] text-[#25D366] font-semibold mb-2">درهم ↑ +18%</p>
                  <div className="flex items-end gap-0.5 h-7" dir="ltr">
                    {[38, 52, 44, 68, 58, 82, 70, 100].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-[2px]"
                        style={{
                          height: `${h}%`,
                          backgroundColor: i === 7 ? "#25D366" : "rgba(37,211,102,0.2)",
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating: order confirmed — parallax layer */}
              <motion.div style={{ x: orderX, y: orderYm }} className="absolute -bottom-14 -right-3 sm:-right-8 lg:-right-14">
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="backdrop-blur-xl border border-white/[0.1] rounded-2xl px-4 py-3 flex items-center gap-3"
                  style={{
                    background: "linear-gradient(145deg, rgba(17,24,32,0.96) 0%, rgba(11,17,21,0.96) 100%)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="w-9 h-9 rounded-xl bg-[#25D366]/15 border border-[#25D366]/25 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#25D366]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-white leading-none">طلب مؤكد COD</p>
                    <p className="text-[10px] text-white/32 mt-0.5 font-inter">#FL-2847 · الرباط · 219 درهم</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
