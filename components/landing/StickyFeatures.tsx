"use client";

import { motion } from "framer-motion";
import { MessageSquare, Package, BarChart3, Zap, ShieldCheck, Globe } from "lucide-react";

const features = [
  {
    id: "auto-reply",
    icon: MessageSquare,
    color: "#10B981",
    tag: "الرد التلقائي",
    title: "رد فوري على كل سؤال",
    description:
      "البوت يفهم أسئلة الزبناء بالدارجة والعربية والفرنسية ويرد بدقة — الأسعار، المقاسات، التوصيل — خلال ثواني.",
    visual: (
      <div className="space-y-2 p-4" dir="rtl">
        {[
          { q: "شحال ثمن القميص البيسيك؟", a: "القميص البيسيك بـ 189 درهم 👕 متوفر في كل المقاسات" },
          { q: "واش التوصيل لمراكش مجاني؟", a: "التوصيل لمراكش بـ 30 درهم 🚚 يوصلك خلال 24-48 ساعة" },
        ].map((msg, i) => (
          <div key={i} className="space-y-1.5">
            <div className="flex justify-start">
              <div className="bg-[#202C33] text-gray-200 rounded-xl rounded-bl-sm px-3 py-2 text-[12px] max-w-[85%] leading-relaxed">
                {msg.q}
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-[#005C4B] text-white rounded-xl rounded-br-sm px-3 py-2 text-[12px] max-w-[85%] leading-relaxed">
                {msg.a}
              </div>
            </div>
          </div>
        ))}
        {/* Typing indicator */}
        <div className="flex justify-end">
          <div className="flex items-center gap-1 bg-[#005C4B]/60 rounded-xl px-3 py-2.5">
            {[0, 1, 2].map((j) => (
              <motion.div
                key={j}
                className="w-1.5 h-1.5 rounded-full bg-white/50"
                animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: j * 0.18 }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "order-confirm",
    icon: Package,
    color: "#6366F1",
    tag: "تأكيد الطلبات",
    title: "طلبات COD مؤكدة تلقائياً",
    description:
      "البوت يجمع المعلومات، يحسب المجموع، يؤكد الطلب، ويحفظه مباشرة في داشبورد متجرك. صفر أخطاء.",
    visual: (
      <div className="p-4 space-y-3" dir="rtl">
        <div className="bg-[#10B981]/[0.08] border border-[#10B981]/[0.15] rounded-xl p-3.5 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#10B981]/[0.12] border border-[#10B981]/[0.18] flex items-center justify-center shrink-0 mt-0.5">
            <Package className="w-4 h-4 text-[#10B981]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold text-[#EDEDEA] mb-0.5">طلب جديد #FL-2851</p>
            <p className="text-[11px] text-[#9B9B97]">قميص أبيض L · الدار البيضاء · 219 درهم COD</p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <p className="text-[10px] text-[#10B981] font-semibold">تم التأكيد تلقائياً</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[{ v: "423", l: "هذا الشهر" }, { v: "98%", l: "نسبة التأكيد" }, { v: "0", l: "أخطاء" }].map((s) => (
            <div key={s.l} className="bg-[#121414] rounded-xl p-2.5 text-center border border-white/[0.05]">
              <p className="text-[17px] font-black font-inter text-[#EDEDEA] leading-none mb-1">{s.v}</p>
              <p className="text-[9px] text-[#6B6B67]">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "analytics",
    icon: BarChart3,
    color: "#F59E0B",
    tag: "التحليلات",
    title: "داشبورد يبيّن كل شيء",
    description:
      "تابع المبيعات، المحادثات، وأداء البوت في الوقت الحقيقي. اتخذ قرارات مبنية على بيانات حقيقية.",
    visual: (
      <div className="p-4" dir="rtl">
        <div className="bg-[#121414] rounded-xl border border-white/[0.05] p-3.5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] text-[#6B6B67] font-inter">المبيعات — 30 يوم</p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span className="text-[10px] text-[#10B981] font-inter font-bold">+34%</span>
            </div>
          </div>
          <div className="flex items-end gap-1 h-[52px]">
            {[22, 35, 28, 45, 38, 55, 48, 62, 55, 72, 65, 80].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${h}%`,
                  backgroundColor:
                    i >= 10
                      ? "#10B981"
                      : i === 9
                      ? "rgba(16,185,129,0.55)"
                      : `rgba(16,185,129,${0.1 + i * 0.04})`,
                }}
              />
            ))}
          </div>
          <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-white/[0.04]">
            <span className="text-[10px] text-[#525252] font-inter">يوليوز 1</span>
            <span className="text-[10px] text-[#525252] font-inter">يوليوز 30</span>
          </div>
        </div>
      </div>
    ),
  },
];

const extras = [
  { icon: Zap, title: "إعداد في 5 دقائق", desc: "ربط مباشر مع واتساب بيزنس API" },
  { icon: ShieldCheck, title: "آمن 100%", desc: "بياناتك محمية ومشفرة بالكامل" },
  { icon: Globe, title: "3 لغات", desc: "الدارجة، العربية، والفرنسية" },
];

export default function StickyFeatures() {
  return (
    <section
      id="features"
      className="bg-[#121414] py-24 relative overflow-hidden"
      dir="rtl"
    >
      {/* Subtle ambient center glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 700,
          height: 500,
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(ellipse, rgba(16,185,129,0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#10B981] font-semibold font-inter mb-5">
            المميزات
          </p>
          <h2
            className="font-black text-[#EDEDEA] mb-5"
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              letterSpacing: "-0.038em",
              lineHeight: 1.06,
            }}
          >
            كل ما تحتاجه في مكان واحد
          </h2>
          <p className="text-[16px] text-[#9B9B97] max-w-[440px] mx-auto leading-relaxed">
            من الرد التلقائي إلى تحليل المبيعات — FunnelsLibrary يغطي كل شيء.
          </p>
        </motion.div>

        {/* Feature blocks */}
        <div className="space-y-10 mb-20">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                {/* Text side */}
                <div className={i % 2 === 0 ? "order-1" : "order-1 md:order-2"}>
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-5 border text-[11px] font-semibold font-inter"
                    style={{
                      backgroundColor: `${feat.color}12`,
                      borderColor: `${feat.color}28`,
                      color: feat.color,
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {feat.tag}
                  </div>
                  <h3
                    className="text-[#EDEDEA] font-black mb-4"
                    style={{ fontSize: "clamp(24px, 3vw, 34px)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
                  >
                    {feat.title}
                  </h3>
                  <p className="text-[15px] text-[#6B6B67] leading-[1.75]">
                    {feat.description}
                  </p>
                </div>

                {/* Visual side */}
                <div className={i % 2 === 0 ? "order-2" : "order-2 md:order-1"}>
                  {/* Ambient glow behind card */}
                  <div className="relative">
                    <div
                      className="absolute inset-0 rounded-3xl pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse 70% 60% at 50% 100%, ${feat.color}0A, transparent)`,
                        filter: "blur(24px)",
                        transform: "translateY(8px) scaleX(0.85)",
                      }}
                    />
                    <motion.div
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="relative bg-[#181A1B] border border-white/[0.06] rounded-2xl overflow-hidden"
                      style={{
                        boxShadow: `0 0 0 1px ${feat.color}12, 0 20px 50px rgba(0,0,0,0.5), 0 0 60px ${feat.color}06`,
                      }}
                    >
                      {/* Mock header bar */}
                      <div className="bg-[#1C1E1F] border-b border-white/[0.05] px-4 py-3 flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                        </div>
                        <div className="flex-1 h-[14px] bg-white/[0.04] rounded-md ml-2" />
                        <div
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: feat.color, boxShadow: `0 0 6px ${feat.color}` }}
                        />
                      </div>
                      {feat.visual}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Extra features row */}
        <div className="grid sm:grid-cols-3 gap-4">
          {extras.map((extra, i) => {
            const Icon = extra.icon;
            return (
              <motion.div
                key={extra.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.09 }}
              >
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="group bg-[#181A1B] border border-white/[0.06] hover:border-[#10B981]/20 rounded-2xl p-5 flex items-start gap-4 transition-colors duration-300"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#10B981]/[0.08] border border-[#10B981]/[0.15] group-hover:bg-[#10B981]/[0.12] group-hover:border-[#10B981]/[0.25] flex items-center justify-center shrink-0 transition-all duration-300">
                    <Icon className="w-4 h-4 text-[#10B981]" />
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-[#EDEDEA] mb-1">{extra.title}</p>
                    <p className="text-[13px] text-[#6B6B67] group-hover:text-[#9B9B97] transition-colors duration-300 leading-relaxed">{extra.desc}</p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
