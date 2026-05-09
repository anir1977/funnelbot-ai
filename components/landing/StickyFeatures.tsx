"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
              <div className="bg-[#202C33] text-gray-200 rounded-xl rounded-bl-sm px-3 py-2 text-[12px] max-w-[85%]">
                {msg.q}
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-[#005C4B] text-white rounded-xl rounded-br-sm px-3 py-2 text-[12px] max-w-[85%]">
                {msg.a}
              </div>
            </div>
          </div>
        ))}
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
        <div className="bg-[#10B981]/10 border border-[#10B981]/20 rounded-xl p-3 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#10B981]/20 flex items-center justify-center shrink-0 mt-0.5">
            <Package className="w-4 h-4 text-[#10B981]" />
          </div>
          <div>
            <p className="text-[13px] font-bold text-[#EDEDEA] mb-0.5">طلب جديد #FL-2851</p>
            <p className="text-[11px] text-[#9B9B97]">قميص أبيض L · الدار البيضاء · 219 درهم COD</p>
            <p className="text-[10px] text-[#10B981] mt-1 font-semibold">✓ تم التأكيد تلقائياً</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[{ v: "423", l: "هذا الشهر" }, { v: "98%", l: "نسبة التأكيد" }, { v: "0", l: "أخطاء" }].map((s) => (
            <div key={s.l} className="bg-[#181A1B] rounded-lg p-2.5 text-center border border-white/[0.06]">
              <p className="text-[16px] font-black font-inter text-[#EDEDEA]">{s.v}</p>
              <p className="text-[9px] text-[#9B9B97]">{s.l}</p>
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
        <div className="bg-[#181A1B] rounded-xl border border-white/[0.06] p-3">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] text-[#9B9B97]">المبيعات — 30 يوم</p>
            <span className="text-[10px] text-[#10B981] font-inter font-bold">+34%</span>
          </div>
          <div className="flex items-end gap-1 h-[48px]">
            {[22, 35, 28, 45, 38, 55, 48, 62, 55, 72, 65, 80].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-[2px]"
                style={{
                  height: `${h}%`,
                  backgroundColor: i >= 10 ? "#10B981" : `rgba(16,185,129,${0.12 + i * 0.05})`,
                }}
              />
            ))}
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="features"
      className="bg-[#121414] py-24"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <p className="text-[12px] uppercase tracking-widest text-[#10B981] font-semibold font-inter mb-4">
            المميزات
          </p>
          <h2
            className="font-black text-[#EDEDEA] mb-4"
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              letterSpacing: "-0.035em",
              lineHeight: 1.08,
            }}
          >
            كل ما تحتاجه في مكان واحد
          </h2>
          <p className="text-[16px] text-[#9B9B97] max-w-[440px] mx-auto leading-relaxed">
            من الرد التلقائي إلى تحليل المبيعات — FunnelsLibrary يغطي كل شيء.
          </p>
        </motion.div>

        {/* Feature blocks */}
        <div ref={containerRef} className="space-y-8 mb-20">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="grid md:grid-cols-2 gap-6 items-center"
              >
                {/* Text side */}
                <div className={i % 2 === 0 ? "order-1" : "order-1 md:order-2"}>
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4 border text-[11px] font-semibold font-inter"
                    style={{
                      backgroundColor: `${feat.color}15`,
                      borderColor: `${feat.color}30`,
                      color: feat.color,
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {feat.tag}
                  </div>
                  <h3
                    className="text-[#EDEDEA] font-black mb-3"
                    style={{ fontSize: "clamp(22px, 3vw, 32px)", letterSpacing: "-0.03em" }}
                  >
                    {feat.title}
                  </h3>
                  <p className="text-[15px] text-[#9B9B97] leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {/* Visual side */}
                <div className={i % 2 === 0 ? "order-2" : "order-2 md:order-1"}>
                  <div
                    className="bg-[#181A1B] border border-white/[0.06] rounded-2xl overflow-hidden"
                    style={{
                      boxShadow: `0 0 0 1px ${feat.color}15, 0 16px 40px rgba(0,0,0,0.4)`,
                    }}
                  >
                    {/* Mock header bar */}
                    <div className="bg-[#1C1E1F] border-b border-white/[0.05] px-4 py-2.5 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-white/[0.12]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-white/[0.12]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-white/[0.12]" />
                      </div>
                      <div className="flex-1 h-4 bg-white/[0.05] rounded-md ml-2" />
                    </div>
                    {feat.visual}
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
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="bg-[#181A1B] border border-white/[0.06] rounded-2xl p-5 flex items-start gap-4"
              >
                <div className="w-9 h-9 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center shrink-0">
                  <Icon className="w-4.5 h-4.5 text-[#10B981]" />
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#EDEDEA] mb-1">{extra.title}</p>
                  <p className="text-[13px] text-[#9B9B97]">{extra.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
