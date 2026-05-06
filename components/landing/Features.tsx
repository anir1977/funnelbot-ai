"use client";

import { motion } from "framer-motion";
import { MessageSquareText, PackageCheck, Truck, Share2, BarChart3, LayoutTemplate } from "lucide-react";

const features = [
  {
    icon: MessageSquareText,
    title: "رد فوري بالدارجة",
    description:
      "ثمن، مقاس، مخزون، توصيل — البوت يرد في ثوانٍ بأسلوب متجرك وبلغة زبنائك الحقيقية.",
    color: "text-green-600",
    bg: "bg-gradient-to-br from-green-50 to-emerald-50",
    border: "border-green-100",
    iconGradient: "from-green-400 to-emerald-500",
    tag: "الأكثر استخداماً",
    tagColor: "bg-green-100 text-green-700 border-green-200",
  },
  {
    icon: PackageCheck,
    title: "طلبات COD تلقائية",
    description:
      "يجمع الاسم والعنوان والهاتف ويسجّل الطلب بالدفع عند الاستلام مباشرة — أنت فقط تشحن.",
    color: "text-blue-600",
    bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
    border: "border-blue-100",
    iconGradient: "from-blue-400 to-indigo-500",
    tag: null,
    tagColor: "",
  },
  {
    icon: Truck,
    title: "أسعار التوصيل لكل مدينة",
    description:
      "يُخبر الزبون تلقائياً بثمن التوصيل ومدة الوصول — كازا، الرباط، مراكش، أكادير وأكثر.",
    color: "text-purple-600",
    bg: "bg-gradient-to-br from-purple-50 to-violet-50",
    border: "border-purple-100",
    iconGradient: "from-purple-400 to-violet-500",
    tag: null,
    tagColor: "",
  },
  {
    icon: Share2,
    title: "واتساب + إنستغرام + فيسبوك",
    description:
      "بوت واحد يغطي جميع قنواتك من لوحة تحكم واحدة — بدون ما تفتح 3 تطبيقات.",
    color: "text-rose-600",
    bg: "bg-gradient-to-br from-rose-50 to-pink-50",
    border: "border-rose-100",
    iconGradient: "from-rose-400 to-pink-500",
    tag: "جديد",
    tagColor: "bg-blue-50 text-blue-600 border-blue-200",
  },
  {
    icon: BarChart3,
    title: "تقارير مبيعات يومية",
    description:
      "طلبات اليوم، معدل التحويل، المنتجات الأكثر مبيعاً — كل شيء في تقارير واضحة بالدرهم.",
    color: "text-orange-600",
    bg: "bg-gradient-to-br from-orange-50 to-amber-50",
    border: "border-orange-100",
    iconGradient: "from-orange-400 to-amber-500",
    tag: null,
    tagColor: "",
  },
  {
    icon: LayoutTemplate,
    title: "قوالب جاهزة — ابدأ في 10 دقائق",
    description:
      "قوالب مخصصة للملابس، العطور، المكملات، الإلكترونيات والمزيد — ابدأ بدون خبرة تقنية.",
    color: "text-teal-600",
    bg: "bg-gradient-to-br from-teal-50 to-cyan-50",
    border: "border-teal-100",
    iconGradient: "from-teal-400 to-cyan-500",
    tag: null,
    tagColor: "",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Features() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-4"
          >
            لماذا FunnelsLibrary؟
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4"
          >
            كل ما يحتاجه متجرك{" "}
            <span className="text-[#25D366]">ليبيع أكثر</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            من أول رسالة يرسلها الزبون حتى تأكيد التسليم — FunnelsLibrary يتكلف
            بالمبيعات وأنت تركز على النمو.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className={`group relative ${f.bg} border ${f.border} rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
              >
                {/* Glass highlight */}
                <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                <div className="relative z-10">
                  {f.tag && (
                    <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full mb-3 border ${f.tagColor}`}>
                      {f.tag}
                    </span>
                  )}

                  <div className={`w-11 h-11 bg-gradient-to-br ${f.iconGradient} rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  <h3 className="text-base font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{f.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
