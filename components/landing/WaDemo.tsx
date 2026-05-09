"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const demoMessages = [
  { from: "user" as const, text: "سلام، عندكم جاكيت جلد أسود؟", delay: 0.4 },
  { from: "bot"  as const, text: "أهلاً! آه عندنا — جاكيت الجلد الإيطالي بـ 890 درهم 🧥 متوفر في S, M, L, XL", delay: 1.6 },
  { from: "user" as const, text: "بغيت حجم L، التوصيل لأكادير بشحال؟", delay: 3.0 },
  { from: "bot"  as const, text: "التوصيل لأكادير بـ 40 درهم 🚚\nالمجموع: 930 درهم COD\nتأكد الطلب؟", delay: 4.4 },
  { from: "user" as const, text: "نعم مؤكد، عنواني حي الأمل شارع الرياض", delay: 5.8 },
  { from: "bot"  as const, text: "✅ تم تأكيد طلبك #FL-2852!\nغادي يوصلك خلال 48 ساعة 🎉\nشكراً على ثقتك!", delay: 7.0 },
];

function LiveDemo() {
  const [visible, setVisible] = useState(0);
  const [loop, setLoop] = useState(0);

  useEffect(() => {
    setVisible(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    demoMessages.forEach((msg, i) => {
      timers.push(setTimeout(() => setVisible(i + 1), msg.delay * 1000));
    });
    timers.push(setTimeout(() => setLoop((l) => l + 1), 12000));
    return () => timers.forEach(clearTimeout);
  }, [loop]);

  return (
    <div
      className="bg-[#0B141A] rounded-2xl overflow-hidden w-full max-w-[340px] mx-auto"
      style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)" }}
    >
      {/* WA Header */}
      <div className="bg-[#1F2C33] px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#25D366] to-emerald-700 flex items-center justify-center text-white text-[12px] font-black shrink-0">
          F
        </div>
        <div className="flex-1">
          <p className="text-[13px] font-semibold text-white leading-none">متجر FunnelsLibrary</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
            <p className="text-[10px] text-[#25D366]">يرد تلقائياً</p>
          </div>
        </div>
      </div>

      {/* Chat body */}
      <div
        className="px-3 py-3 space-y-2 min-h-[260px]"
        dir="ltr"
        style={{ background: "#0B141A" }}
      >
        {demoMessages.slice(0, visible).map((msg, i) => (
          <motion.div
            key={`${loop}-${i}`}
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={`flex ${msg.from === "bot" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] px-3 py-2 text-[12px] leading-relaxed whitespace-pre-line ${
                msg.from === "bot"
                  ? "bg-[#005C4B] text-white rounded-xl rounded-br-sm"
                  : "bg-[#202C33] text-gray-200 rounded-xl rounded-bl-sm"
              }`}
            >
              {msg.text}
              <p className={`text-[8.5px] mt-0.5 text-right ${msg.from === "bot" ? "text-white/40" : "text-white/25"}`}>
                {msg.from === "bot" ? "✓✓ " : ""}{["9:41","9:41","9:42","9:42","9:43","9:43"][i]}
              </p>
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        {visible > 0 && visible < demoMessages.length && (
          <div className="flex justify-end">
            <div className="bg-[#005C4B] px-3 py-2.5 rounded-xl rounded-br-sm flex items-center gap-1.5">
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

      {/* Input bar */}
      <div className="bg-[#1F2C33] px-3 py-2.5 flex items-center gap-2">
        <div className="flex-1 bg-[#2A3942] rounded-full px-4 py-2">
          <span className="text-[11px] text-white/20">اكتب رسالة...</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

const steps = [
  { num: "01", title: "اربط واتساب بيزنس", desc: "ربط مباشر خلال دقائق بدون كود" },
  { num: "02", title: "خصص البوت لمتجرك", desc: "أدخل المنتجات، الأسعار، وسياسة التوصيل" },
  { num: "03", title: "شغّل وتابع النتائج", desc: "البوت يشتغل 24/7 وأنت تتابع من الداشبورد" },
];

export default function WaDemo() {
  return (
    <section
      id="how-it-works"
      className="bg-[#121414] py-24 relative"
      dir="rtl"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-[12px] uppercase tracking-widest text-[#10B981] font-semibold font-inter mb-4">
            كيف يعمل
          </p>
          <h2
            className="font-black text-[#EDEDEA] mb-4"
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              letterSpacing: "-0.035em",
              lineHeight: 1.08,
            }}
          >
            شاهد البوت في العمل
          </h2>
          <p className="text-[16px] text-[#9B9B97] max-w-[420px] mx-auto leading-relaxed">
            محادثة حقيقية — من السؤال إلى تأكيد الطلب COD في ثواني.
          </p>
        </motion.div>

        {/* Main content: demo + steps */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Live WhatsApp demo */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1"
          >
            <LiveDemo />
          </motion.div>

          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 space-y-6"
          >
            <h3
              className="font-black text-[#EDEDEA] mb-8"
              style={{ fontSize: "clamp(24px, 3.5vw, 36px)", letterSpacing: "-0.03em" }}
            >
              ابدأ خلال 5 دقائق فقط
            </h3>

            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-4"
              >
                <div
                  className="w-10 h-10 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center shrink-0 font-inter font-black text-[#10B981] text-[13px]"
                >
                  {step.num}
                </div>
                <div className="pt-1">
                  <p className="text-[15px] font-bold text-[#EDEDEA] mb-1">{step.title}</p>
                  <p className="text-[13px] text-[#9B9B97] leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* CTA inside section */}
            <div className="pt-4">
              <a
                href="/signup"
                className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-emerald-400 text-white font-bold px-6 py-3 rounded-xl text-[14px] transition-colors duration-150"
                style={{ boxShadow: "0 0 0 1px rgba(16,185,129,0.25), 0 8px 20px rgba(16,185,129,0.2)" }}
              >
                جرب مجاناً — بدون بطاقة بنكية
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
