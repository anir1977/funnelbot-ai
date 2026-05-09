"use client";

import { motion } from "framer-motion";

const painPoints = [
  {
    emoji: "⏳",
    category: "الوقت",
    title: "4 ساعات يومياً على واتساب",
    desc: "كل يوم كتضيع نصف وقت عملك كترد على نفس الأسئلة — الأسعار، التوصيل، المقاسات...",
  },
  {
    emoji: "💸",
    category: "الطلبات",
    title: "طلبات ضائعة بسبب الرد البطيء",
    desc: "الزبون اللي ما رديتيش عليه في الوقت غادي يمشي للمنافس. ويمشي للأبد.",
  },
  {
    emoji: "📦",
    category: "التتبع",
    title: "فوضى في تتبع الطلبات",
    desc: "بين النسخ من واتساب لإكسل، الأغلاط كتتكثر والطلبات كتضيع في الفوضى.",
  },
  {
    emoji: "🔄",
    category: "التكرار",
    title: "نفس الأسئلة مئات المرات",
    desc: "«شحال التوصيل؟» «واش COD متاح؟» «عندكم المقاس M؟» — مرات بلا حساب.",
  },
];

export default function PainPoints() {
  return (
    <section
      dir="rtl"
      className="py-24 lg:py-32 bg-[#121414]"
      aria-labelledby="pain-points-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[#9B9B97] text-[12px] uppercase tracking-widest mb-4 font-inter">
            المشاكل الشائعة
          </p>
          <h2
            id="pain-points-heading"
            className="text-4xl lg:text-5xl font-black text-[#EDEDEA] mb-4"
            style={{ letterSpacing: "-0.035em" }}
          >
            كيفاش كانت قبل FunnelsLibrary؟
          </h2>
          <p className="text-[#9B9B97] text-[16px] max-w-xl mx-auto leading-relaxed">
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
              viewport={{ once: true }}
              transition={{
                duration: 0.55,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ scale: 1.01 }}
              className="group bg-[#181A1B] border border-white/[0.06] rounded-2xl p-6 cursor-default transition-all duration-300 hover:border-white/[0.12]"
            >
              {/* Top row: emoji + category */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-3xl leading-none select-none"
                  role="img"
                  aria-hidden="true"
                >
                  {point.emoji}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#9B9B97] font-inter">
                  {point.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-[18px] font-bold text-[#EDEDEA] leading-snug mb-2">
                {point.title}
              </h3>

              {/* Description */}
              <p className="text-[14px] text-[#9B9B97] leading-relaxed">
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
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4"
        >
          <div className="h-px flex-1 bg-white/[0.06]" />
          <p className="text-[#10B981] text-[15px] font-semibold whitespace-nowrap text-center shrink-0 px-2">
            مع FunnelsLibrary، هاد المشاكل راحت للأبد ✦
          </p>
          <div className="h-px flex-1 bg-white/[0.06]" />
        </motion.div>
      </div>
    </section>
  );
}
