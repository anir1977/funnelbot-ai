"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

const demoMessages = [
  { from: "user" as const, text: "سلام، عندكم جاكيت جلد أسود؟", delay: 0.5, time: "9:41" },
  { from: "bot"  as const, text: "أهلاً! آه عندنا — جاكيت الجلد الإيطالي بـ 890 درهم 🧥\nمتوفر في S, M, L, XL", delay: 1.8, time: "9:41" },
  { from: "user" as const, text: "بغيت حجم L، التوصيل لأكادير بشحال؟", delay: 3.2, time: "9:42" },
  { from: "bot"  as const, text: "التوصيل 40 درهم 🚚\nالمجموع: 930 درهم COD\nتأكد الطلب؟", delay: 4.8, time: "9:42" },
  { from: "user" as const, text: "نعم مؤكد — عنواني حي الأمل شارع الرياض", delay: 6.2, time: "9:43" },
  { from: "bot"  as const, text: "✅ تم تأكيد طلبك #FL-2852!\nسيصلك خلال 48 ساعة 🎉\nشكراً على ثقتك!", delay: 7.6, time: "9:43" },
];

/* ─── iPhone 15 frame + WA conversation ──────────────────────────────────── */

function LiveDemo() {
  const [visible, setVisible] = useState(0);
  const [typing, setTyping] = useState(false);
  const [loop, setLoop] = useState(0);

  useEffect(() => {
    setVisible(0);
    setTyping(false);
    const timers: ReturnType<typeof setTimeout>[] = [];

    demoMessages.forEach((msg, i) => {
      if (msg.from === "bot") {
        /* show typing indicator 0.7s before the bot message */
        timers.push(setTimeout(() => setTyping(true), (msg.delay - 0.7) * 1000));
      }
      timers.push(
        setTimeout(() => {
          setVisible(i + 1);
          setTyping(false);
        }, msg.delay * 1000)
      );
    });

    timers.push(setTimeout(() => setLoop((l) => l + 1), 13500));
    return () => timers.forEach(clearTimeout);
  }, [loop]);

  return (
    /* ── iPhone outer shell ── */
    <div className="relative mx-auto select-none" style={{ width: 300 }}>
      {/* Glow behind phone */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(16,185,129,0.14) 0%, transparent 70%)",
          filter: "blur(28px)",
          transform: "scale(1.3)",
          zIndex: 0,
        }}
      />

      {/* Phone body */}
      <div
        className="relative rounded-[44px] z-10"
        style={{
          background: "linear-gradient(165deg, #2A2A2C 0%, #1C1C1E 55%, #242426 100%)",
          padding: "10px",
          boxShadow:
            "inset 0 0 0 1px rgba(255,255,255,0.13), inset 0 1px 0 rgba(255,255,255,0.18), 0 60px 120px rgba(0,0,0,0.9), 0 12px 36px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(0,0,0,0.9)",
        }}
      >
        {/* Lid surface sheen */}
        <div
          className="absolute inset-0 rounded-[44px] pointer-events-none"
          style={{
            background: "linear-gradient(160deg, rgba(255,255,255,0.045) 0%, transparent 45%)",
          }}
        />

        {/* Screen */}
        <div className="rounded-[36px] overflow-hidden relative bg-[#0B141A]">
          {/* Dynamic Island */}
          <div
            className="absolute top-[10px] left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-2 px-3"
            style={{
              width: 88,
              height: 26,
              background: "#000",
              borderRadius: 999,
            }}
          >
            <div className="w-2 h-2 rounded-full bg-[#1A1A1A]" />
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: "radial-gradient(circle at 35% 35%, #2A2A2A, #0A0A0A)" }}
            />
          </div>

          {/* WA Header — extra top padding clears Dynamic Island */}
          <div className="bg-[#1F2C33] px-3 pt-10 pb-2.5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#25D366] to-[#075E54] flex items-center justify-center text-white text-[11px] font-black shrink-0">
              F
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-white leading-none">متجر FunnelsLibrary</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                <p className="text-[9.5px] text-[#25D366]">يرد تلقائياً • نشط الآن</p>
              </div>
            </div>
            {/* Call icons */}
            <div className="flex items-center gap-3 shrink-0">
              <svg className="w-4 h-4 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M15 10l5-5m0 0h-4m4 0v4M5 14l-5 5m0 0h4m-4 0v-4" />
              </svg>
              <svg className="w-4 h-4 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.41 2 2 0 0 1 3.6 2.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.72 17z" />
              </svg>
            </div>
          </div>

          {/* Chat wallpaper + messages */}
          <div
            className="px-3 py-3 space-y-2"
            dir="ltr"
            style={{
              minHeight: 310,
              background: "#0B141A",
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ccircle cx='1' cy='1' r='0.6' fill='%23ffffff' fill-opacity='0.012'/%3E%3C/svg%3E\")",
            }}
          >
            {demoMessages.slice(0, visible).map((msg, i) => (
              <motion.div
                key={`${loop}-${i}`}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className={`flex ${msg.from === "bot" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[84%] px-3 py-2 text-[11.5px] leading-relaxed whitespace-pre-line ${
                    msg.from === "bot"
                      ? "bg-[#005C4B] text-white rounded-2xl rounded-br-[4px]"
                      : "bg-[#202C33] text-[#E9EDF0] rounded-2xl rounded-bl-[4px]"
                  }`}
                  style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
                >
                  {msg.text}
                  <p className={`text-[8px] mt-0.5 text-right ${msg.from === "bot" ? "text-white/35" : "text-white/22"}`}>
                    {msg.from === "bot" && <span className="mr-0.5">✓✓ </span>}
                    {msg.time}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Typing indicator */}
            <AnimatePresence>
              {typing && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.2 }}
                  className="flex justify-end"
                >
                  <div
                    className="px-3.5 py-2.5 rounded-2xl rounded-br-[4px] flex items-center gap-1.5"
                    style={{ background: "#005C4B", boxShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
                  >
                    {[0, 0.18, 0.36].map((d, i) => (
                      <motion.span
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                        transition={{ duration: 0.85, delay: d, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-white/70 inline-block"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input bar */}
          <div className="bg-[#1F2C33] px-3 py-2.5 flex items-center gap-2">
            <div className="flex-1 bg-[#2A3942] rounded-full px-4 py-2 flex items-center">
              <span className="text-[10.5px] text-white/20">اكتب رسالة...</span>
            </div>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ background: "#25D366", boxShadow: "0 2px 8px rgba(37,211,102,0.3)" }}
            >
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </div>
          </div>

          {/* Home indicator */}
          <div className="bg-[#1F2C33] pt-1.5 pb-2 flex justify-center">
            <div className="w-[80px] h-[4px] rounded-full bg-white/20" />
          </div>
        </div>
      </div>

      {/* Side buttons */}
      <div className="absolute left-0 top-[78px] -translate-x-full flex flex-col gap-[10px]">
        <div className="w-[3px] h-6 bg-[#2A2A2C] rounded-l-full" />
        <div className="w-[3px] h-10 bg-[#2A2A2C] rounded-l-full" />
        <div className="w-[3px] h-10 bg-[#2A2A2C] rounded-l-full" />
      </div>
      <div className="absolute right-0 top-[96px] translate-x-full">
        <div className="w-[3px] h-14 bg-[#2A2A2C] rounded-r-full" />
      </div>
    </div>
  );
}

/* ─── Steps ───────────────────────────────────────────────────────────────── */

const steps = [
  {
    num: "01",
    title: "اربط واتساب بيزنس",
    desc: "ربط مباشر خلال دقائق بدون أي كود أو إعدادات تقنية.",
    accent: "#10B981",
  },
  {
    num: "02",
    title: "خصّص البوت لمتجرك",
    desc: "أدخل المنتجات، الأسعار، وسياسة التوصيل — والبوت يتعلم منها.",
    accent: "#10B981",
  },
  {
    num: "03",
    title: "شغّل وتابع النتائج",
    desc: "البوت يشتغل 24/7 وأنت تتابع الطلبات والمحادثات من الداشبورد.",
    accent: "#10B981",
  },
];

/* ─── Section ─────────────────────────────────────────────────────────────── */

export default function WaDemo() {
  return (
    <section id="how-it-works" className="relative bg-[#121414] py-28 overflow-hidden" dir="rtl">
      {/* Separator */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)" }} />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Left glow behind phone */}
      <div
        className="absolute pointer-events-none hidden lg:block"
        style={{
          width: 500,
          height: 600,
          left: "5%",
          top: "15%",
          background: "radial-gradient(ellipse, rgba(16,185,129,0.08) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#10B981] font-semibold font-inter mb-5">
            كيف يعمل
          </p>
          <h2
            className="font-black text-[#EDEDEA] mb-5"
            style={{ fontSize: "clamp(32px, 5vw, 56px)", letterSpacing: "-0.038em", lineHeight: 1.06 }}
          >
            شاهد البوت في العمل
          </h2>
          <p className="text-[#9B9B97] max-w-[380px] mx-auto leading-relaxed" style={{ fontSize: 16 }}>
            من السؤال إلى تأكيد الطلب COD — في ثواني، تلقائياً.
          </p>
        </motion.div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1 flex justify-center"
          >
            <LiveDemo />
          </motion.div>

          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2"
          >
            <h3
              className="font-black text-[#EDEDEA] mb-12"
              style={{ fontSize: "clamp(24px, 3.5vw, 38px)", letterSpacing: "-0.032em", lineHeight: 1.08 }}
            >
              ابدأ خلال 5 دقائق فقط
            </h3>

            <div className="space-y-0">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex items-start gap-5 pb-10 last:pb-0"
                >
                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div
                      className="absolute right-[19px] top-[42px] w-px"
                      style={{
                        height: "calc(100% - 8px)",
                        background: "linear-gradient(to bottom, rgba(16,185,129,0.25), rgba(16,185,129,0.04))",
                      }}
                    />
                  )}

                  {/* Step number circle */}
                  <div
                    className="relative w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-inter font-black text-[12px] text-[#10B981] z-10"
                    style={{
                      background: "rgba(16,185,129,0.08)",
                      border: "1px solid rgba(16,185,129,0.18)",
                      boxShadow: "0 0 20px rgba(16,185,129,0.08)",
                    }}
                  >
                    {step.num}
                  </div>

                  {/* Text */}
                  <div className="pt-1.5 flex-1">
                    <p className="text-[16px] font-bold text-[#EDEDEA] mb-1.5 leading-snug">{step.title}</p>
                    <p className="text-[13.5px] text-[#9B9B97] leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10"
            >
              <a
                href="/signup"
                className="group relative inline-flex items-center gap-2.5 font-bold text-white rounded-xl overflow-hidden transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  padding: "13px 28px",
                  fontSize: 14,
                  background: "#10B981",
                  boxShadow: "0 0 0 1px rgba(16,185,129,0.3), 0 8px 24px rgba(16,185,129,0.22)",
                }}
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/[0.14] to-transparent transition-transform duration-700 pointer-events-none" />
                <span className="relative z-10">جرّب مجاناً — بدون بطاقة بنكية</span>
                <ArrowLeft className="w-4 h-4 relative z-10 transition-transform duration-200 group-hover:-translate-x-1" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
