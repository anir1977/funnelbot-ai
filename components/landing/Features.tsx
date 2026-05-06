"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Zap,
  BarChart3,
  ShoppingBag,
  MessageSquare,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "ردود ذكية بالذكاء الاصطناعي",
    description:
      "بوتنا يفهم السياق ويرد بشكل طبيعي على جميع استفسارات عملائك باللغة العربية",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-100",
  },
  {
    icon: Zap,
    title: "رد فوري 24 ساعة",
    description:
      "لا تفقد أي عميل محتمل بسبب التأخر في الرد. بوتنا يرد في أقل من ثانية",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: Users,
    title: "إدارة العملاء المحتملين",
    description:
      "تتبع كل محادثة وعميل محتمل من لوحة تحكم شاملة وسهلة الاستخدام",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-100",
  },
  {
    icon: BarChart3,
    title: "تقارير وإحصائيات متقدمة",
    description:
      "احصل على تقارير مفصلة عن أداء البوت، معدلات التحويل، وسلوك العملاء",
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
  {
    icon: ShoppingBag,
    title: "تكامل مع المتاجر الإلكترونية",
    description:
      "اربط بوتك بمتجرك وأتمتة عمليات الاستفسار عن المنتجات والطلبات",
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-100",
  },
  {
    icon: MessageSquare,
    title: "قوالب رسائل جاهزة",
    description:
      "استخدم قوالبنا الجاهزة لتسريع إعداد بوتك وبدء استقبال العملاء فوراً",
    color: "text-pink-600",
    bg: "bg-pink-50",
    border: "border-pink-100",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Features() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-4"
          >
            <Bot className="w-3.5 h-3.5" />
            لماذا FunnelBot؟
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4"
          >
            كل ما تحتاجه لتحويل{" "}
            <span className="text-[#25D366]">واتساب</span>
            <br className="hidden sm:block" />
            إلى محرك مبيعات
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-2xl mx-auto"
          >
            منصة متكاملة تجمع بين قوة الذكاء الاصطناعي وبساطة الاستخدام لتنمية
            أعمالك بشكل لم تتخيله من قبل
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
                className={`group relative bg-white border ${f.border} rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 card-shadow`}
              >
                <div className={`w-12 h-12 ${f.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>

                {/* Hover accent */}
                <div className={`absolute bottom-0 right-0 w-1 h-0 ${f.bg.replace("50", "400")} rounded-full group-hover:h-full transition-all duration-300 rounded-r-2xl opacity-30`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
