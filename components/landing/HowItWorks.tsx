"use client";

import { motion } from "framer-motion";
import { Store, MessageCircle, BarChart3, ArrowLeft } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Store,
    color: "#25D366",
    bg: "#f0fdf4",
    title: "أضف متجرك",
    desc: "أدخل اسم متجرك، أضف منتجاتك بالأسعار، وحدد مناطق التوصيل. ما تحتاجش خبرة تقنية.",
    time: "دقيقتان",
    detail: [
      "أضف اسم المتجر واللوجو",
      "أضف المنتجات والأسعار",
      "حدد مناطق التوصيل والأسعار",
    ],
  },
  {
    num: "02",
    icon: MessageCircle,
    color: "#3B82F6",
    bg: "#eff6ff",
    title: "ربط واتساب",
    desc: "اسكان رمز QR من واتساب بيزنس — والبوت يبدأ يرد على الزبناء تلقائياً في ثوان.",
    time: "3 دقائق",
    detail: [
      "اسكان رمز QR",
      "البوت يرد تلقائياً",
      "يشتغل 24/7 بدون توقف",
    ],
  },
  {
    num: "03",
    icon: BarChart3,
    color: "#8B5CF6",
    bg: "#f5f3ff",
    title: "تابع وبيع أكثر",
    desc: "تابع المبيعات، راجع المحادثات، وشوف تقارير لحظية. البوت يبيع، أنت تكبّر.",
    time: "فوراً",
    detail: [
      "تقارير مبيعات مباشرة",
      "إدارة الطلبات COD",
      "محادثات ذكية مؤرشفة",
    ],
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 text-xs font-bold text-gray-600 mb-5">
            كيف يعمل
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-5 leading-tight tracking-tight">
            3 خطوات وبدأت تبيع
            <br />
            <span className="text-[#25D366]">تلقائياً على واتساب</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            الإعداد الكامل ما يأخذش من 10 دقائق — وبعدها البوت يشتغل بدلك.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-[52px] right-[calc(33%+2rem)] left-[calc(33%+2rem)] h-px bg-gradient-to-l from-gray-200 via-[#25D366]/20 to-gray-200 pointer-events-none" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.55 }}
                className="relative bg-white rounded-2xl border border-gray-100 p-7 shadow-card hover:shadow-card-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Step number */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: step.bg }}
                  >
                    <Icon className="w-6 h-6" style={{ color: step.color }} />
                  </div>
                  <span className="text-4xl font-black text-gray-100 font-inter select-none">{step.num}</span>
                </div>

                <div className="inline-flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-full px-2.5 py-1 text-[10px] font-bold text-gray-500 mb-3 font-inter">
                  ⏱ {step.time}
                </div>

                <h3 className="text-xl font-black text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 mb-5 leading-relaxed">{step.desc}</p>

                <ul className="space-y-2">
                  {step.detail.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: step.color }} />
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="/signup"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 shadow-glow hover:shadow-glow-lg hover:-translate-y-px"
          >
            ابدأ الآن — مجاناً 14 يوم
            <ArrowLeft className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
