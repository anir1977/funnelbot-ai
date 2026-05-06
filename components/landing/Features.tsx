"use client";

import { motion } from "framer-motion";
import { MessageSquareText, PackageCheck, Truck, Share2, BarChart3, LayoutTemplate } from "lucide-react";

const features = [
  {
    icon: MessageSquareText,
    title: "رد فوري على أسئلة الزبناء",
    description:
      "البوت يرد في ثوانٍ على أسئلة الثمن، المقاسات، المخزون، وطرق الدفع — بلغة زبنائك وبأسلوب متجرك.",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-100",
    tag: "الأكثر استخداماً",
  },
  {
    icon: PackageCheck,
    title: "تأكيد الطلبات تلقائياً",
    description:
      "يجمع اسم الزبون، عنوانه، ورقم هاتفه ويسجّل الطلب مباشرة — أنت فقط تستلم وتشحن.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    tag: null,
  },
  {
    icon: Truck,
    title: "معلومات التوصيل لكل مدينة",
    description:
      "يُخبر الزبون تلقائياً بتكلفة التوصيل لمدينته ومدة الوصول — سواء كازا، الرباط، مراكش أو غيرها.",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-100",
    tag: null,
  },
  {
    icon: Share2,
    title: "واتساب + إنستغرام + فيسبوك",
    description:
      "بوت واحد يغطي جميع قنواتك: واتساب، DM إنستغرام، وفيسبوك ماسنجر — من لوحة تحكم واحدة.",
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-100",
    tag: "جديد",
  },
  {
    icon: BarChart3,
    title: "تقارير الطلبات والمبيعات",
    description:
      "تابع طلباتك اليومية، عدد المحادثات، ومعدل التحويل — كل شيء في تقارير واضحة وبسيطة.",
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
    tag: null,
  },
  {
    icon: LayoutTemplate,
    title: "قوالب جاهزة لكل نوع متجر",
    description:
      "قوالب مخصصة للكوزميتيك، الملابس، الإكسسوارات، الطعام، والمزيد — ابدأ في أقل من 10 دقائق.",
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-100",
    tag: null,
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
            منصة شاملة تحول واتساب متجرك من مجرد تطبيق مراسلة إلى نظام مبيعات
            متكامل يعمل طوال اليوم بدون أن ترد بنفسك.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className={`group relative bg-white border ${f.border} rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 card-shadow overflow-hidden`}
              >
                {/* Subtle bg circle */}
                <div className={`absolute -bottom-6 -left-6 w-24 h-24 ${f.bg} rounded-full opacity-60 group-hover:scale-150 transition-transform duration-500`} />

                <div className="relative z-10">
                  {f.tag && (
                    <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full mb-3 ${f.tag === "جديد" ? "bg-blue-50 text-blue-600 border border-blue-200" : "bg-green-50 text-green-700 border border-green-200"}`}>
                      {f.tag}
                    </span>
                  )}
                  <div className={`w-12 h-12 ${f.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-5 h-5 ${f.color}`} />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
