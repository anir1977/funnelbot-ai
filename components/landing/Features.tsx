"use client";

import { motion } from "framer-motion";
import { MessageCircle, Bot, ShoppingBag, Truck, BarChart3, Globe2, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: Bot,
    color: "#25D366",
    bg: "#f0fdf4",
    title: "ذكاء اصطناعي يفهم الدارجة",
    desc: "البوت يفهم الدارجة المغربية والعربية الفصحى، يرد بشكل طبيعي كأنه إنسان — بدون أخطاء ولا ردود جاهزة مملة.",
    badge: "GPT-4 Powered",
  },
  {
    icon: ShoppingBag,
    color: "#3B82F6",
    bg: "#eff6ff",
    title: "تأكيد طلبات COD تلقائياً",
    desc: "البوت يجمع اسم الزبون، عنوانه، ورقم هاتفه، ويؤكد الطلب مباشرة في واتساب — من دون ما تكون موجود.",
    badge: "COD Ready",
  },
  {
    icon: MessageCircle,
    color: "#8B5CF6",
    bg: "#f5f3ff",
    title: "رد على كل الأسئلة فوراً",
    desc: "من أسعار المنتجات لأوقات التوصيل — البوت يرد على كل أسئلة الزبناء خلال ثوان، حتى وأنت نايم.",
    badge: "24/7",
  },
  {
    icon: Truck,
    color: "#F59E0B",
    bg: "#fffbeb",
    title: "إدارة التوصيل والمدن",
    desc: "حدد أسعار التوصيل لكل مدينة، والبوت يحسبها تلقائياً ويخبر الزبون بالمبلغ الإجمالي.",
    badge: "جميع المدن",
  },
  {
    icon: BarChart3,
    color: "#EC4899",
    bg: "#fdf2f8",
    title: "تحليلات ومبيعات مباشرة",
    desc: "تابع المبيعات، المحادثات، والطلبات في لحظتها. لوحة تحكم واضحة تعطيك صورة كاملة عن متجرك.",
    badge: "Real-time",
  },
  {
    icon: Globe2,
    color: "#14B8A6",
    bg: "#f0fdfa",
    title: "عربي، دارجة، وفرنسية قريباً",
    desc: "البوت يتواصل مع الزبناء بلغتهم — الدارجة المغربية أو العربية الفصحى. دعم الفرنسية قريباً.",
    badge: "متعدد اللغات",
  },
  {
    icon: Zap,
    color: "#F97316",
    bg: "#fff7ed",
    title: "إعداد في 5 دقائق",
    desc: "لا تحتاج خبرة تقنية. ادخل معلومات متجرك، أضف المنتجات، واربط رقم واتساب — وابدأ تبيع.",
    badge: "No Code",
  },
  {
    icon: Shield,
    color: "#6366F1",
    bg: "#eef2ff",
    title: "أمان وخصوصية تامة",
    desc: "بيانات متجرك وزبناؤك محمية بتشفير متقدم. نحن لا نشارك أي معلومات مع طرف ثالث.",
    badge: "SSL / GDPR",
  },
];

const sectionFade = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Features() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          variants={sectionFade} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs font-bold text-gray-600 mb-5 shadow-sm">
            <Zap className="w-3.5 h-3.5 text-[#25D366]" />
            المميزات
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-5 leading-tight tracking-tight">
            كل ما تحتاجه لتنمية
            <br />
            <span className="text-[#25D366]">متجرك على واتساب</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            FunnelsLibrary مو مجرد بوت — هو مساعد ذكي يبيع، يتابع، ويخدم الزبناء نيابة عنك.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 shadow-card hover:shadow-card-lg transition-all duration-300 hover:-translate-y-1 cursor-default"
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: f.bg }}
                >
                  <Icon className="w-5 h-5" style={{ color: f.color }} />
                </div>

                {/* Badge */}
                <span
                  className="absolute top-4 left-4 text-[10px] font-black px-2 py-0.5 rounded-full font-inter"
                  style={{ backgroundColor: f.bg, color: f.color }}
                >
                  {f.badge}
                </span>

                <h3 className="text-[15px] font-bold text-gray-900 mb-2 leading-snug">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${f.color}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
