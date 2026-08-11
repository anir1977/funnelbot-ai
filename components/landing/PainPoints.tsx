"use client";

import { motion } from "framer-motion";

const painPoints = [
  {
    emoji: "⏳",
    category: "الوقت",
    accent: "rgba(251,146,60,",
    title: "4 ساعات يومياً على واتساب",
    desc: "كل يوم كتضيع نصف وقت عملك كترد على نفس الأسئلة — الأسعار، التوصيل، المقاسات...",
  },
  {
    emoji: "💸",
    category: "الطلبات",
    accent: "rgba(239,68,68,",
    title: "طلبات ضائعة بسبب الرد البطيء",
    desc: "الزبون اللي ما رديتيش عليه في الوقت غادي يمشي للمنافس. ويمشي للأبد.",
  },
  {
    emoji: "📦",
    category: "التتبع",
    accent: "rgba(168,85,247,",
    title: "فوضى في تتبع الطلبات",
    desc: "بين النسخ من واتساب لإكسل، الأغلاط كتتكثر والطلبات كتضيع في الفوضى.",
  },
  {
    emoji: "🔄",
    category: "التكرار",
    accent: "rgba(59,130,246,",
    title: "نفس الأسئلة مئات المرات",
    desc: "«شحال التوصيل؟» «واش COD متاح؟» «عندكم المقاس M؟» — مرات بلا حساب.",
  },
];

export default function PainPoints() {
  return (
    <section
      dir="rtl"
      className="py-24 lg:py-32 bg-[#121414] relative overflow-hidden"
      aria-labelledby="pain-points-heading"
    >
      {/* Ambient bg glow — warm red tint, very subtle */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 400,
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(ellipse, rgba(239,68,68,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#9B9B97] font-semibold font-inter mb-5">
            المشاكل الشائعة
          </p>
          <h2
            id="pain-points-heading"
            className="font-black text-[#EDEDEA] mb-5"
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              letterSpacing: "-0.038em",
              lineHeight: 1.06,
            }}
          >
            كيفاش كانت قبل FunnelsLibrary؟
          </h2>
          <p className="text-[#9B9B97] text-[16px] max-w-md mx-auto leading-relaxed">
            أكثر من 60% من أصحاب المتاجر يعانون من نفس المشاكل
          </p>
        </motion.div>

        {/* Pain Point Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {painPoints.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.55,
                delay: i * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -3 }}
              className="group relative bg-[#181A1B] border border-white/[0.06] rounded-2xl p-6 cursor-default transition-all duration-300 hover:border-white/[0.12] overflow-hidden"
              style={{
                boxShadow: "0 0 0 0 transparent",
              }}
            >
              {/* Hover glow layer */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{
                  background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${point.accent}0.07) 0%, transparent 100%)`,
                }}
              />

              {/* Top accent line that grows on hover */}
              <div
                className="absolute top-0 right-0 left-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(to left, transparent, ${point.accent}0.5) 40%, transparent)`,
                }}
              />

              {/* Top row: emoji container + category */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                  style={{
                    background: `${point.accent}0.08)`,
                    border: `1px solid ${point.accent}0.15)`,
                  }}
                >
                  <span className="text-2xl leading-none select-none" role="img" aria-hidden="true">
                    {point.emoji}
                  </span>
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#525252] group-hover:text-[#9B9B97] transition-colors duration-300 font-inter">
                  {point.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-[18px] font-bold text-[#EDEDEA] leading-snug mb-2.5">
                {point.title}
              </h3>

              {/* Description */}
              <p className="text-[14px] text-[#6B6B67] group-hover:text-[#9B9B97] leading-relaxed transition-colors duration-300">
                {point.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Transition Statement */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4"
        >
          <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.07))" }} />
          <div className="shrink-0 px-4 py-2 rounded-full border border-[#10B981]/20 bg-[#10B981]/[0.05]">
            <p className="text-[#10B981] text-[13px] font-semibold whitespace-nowrap">
              مع FunnelsLibrary، هاد المشاكل راحت للأبد ✦
            </p>
          </div>
          <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(255,255,255,0.07))" }} />
        </motion.div>
      </div>
    </section>
  );
}
