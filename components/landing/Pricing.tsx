"use client";

import { motion } from "framer-motion";
import { CheckCircle, X, Zap, Star, Building2 } from "lucide-react";

const plans = [
  {
    name: "الأساسية",
    icon: Zap,
    price: "99",
    period: "ر.س / شهر",
    description: "مثالية للأعمال الناشئة",
    features: [
      { text: "حتى 1,000 رسالة شهرياً", included: true },
      { text: "رد تلقائي بالذكاء الاصطناعي", included: true },
      { text: "تقارير أساسية", included: true },
      { text: "رقم واتساب واحد", included: true },
      { text: "دعم عبر البريد الإلكتروني", included: true },
      { text: "تكامل مع المتاجر", included: false },
      { text: "مدير حساب مخصص", included: false },
    ],
    cta: "ابدأ مجاناً",
    popular: false,
    accent: "border-gray-200",
    ctaClass: "bg-gray-900 hover:bg-gray-800 text-white",
  },
  {
    name: "الاحترافية",
    icon: Star,
    price: "299",
    period: "ر.س / شهر",
    description: "الأكثر شعبية للأعمال المتنامية",
    features: [
      { text: "حتى 10,000 رسالة شهرياً", included: true },
      { text: "رد تلقائي بالذكاء الاصطناعي", included: true },
      { text: "تقارير وإحصائيات متقدمة", included: true },
      { text: "3 أرقام واتساب", included: true },
      { text: "دعم عبر واتساب 24/7", included: true },
      { text: "تكامل مع المتاجر الإلكترونية", included: true },
      { text: "مدير حساب مخصص", included: false },
    ],
    cta: "ابدأ مجاناً",
    popular: true,
    accent: "border-[#25D366]",
    ctaClass: "bg-[#25D366] hover:bg-[#1eb85a] text-white shadow-lg shadow-green-200",
  },
  {
    name: "المؤسسية",
    icon: Building2,
    price: "599",
    period: "ر.س / شهر",
    description: "للمؤسسات والأعمال الكبيرة",
    features: [
      { text: "رسائل غير محدودة", included: true },
      { text: "رد تلقائي بالذكاء الاصطناعي", included: true },
      { text: "تقارير وإحصائيات متقدمة", included: true },
      { text: "أرقام واتساب غير محدودة", included: true },
      { text: "دعم VIP على مدار الساعة", included: true },
      { text: "تكامل كامل مع API", included: true },
      { text: "مدير حساب مخصص", included: true },
    ],
    cta: "تواصل معنا",
    popular: false,
    accent: "border-gray-200",
    ctaClass: "bg-gray-900 hover:bg-gray-800 text-white",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-4"
          >
            <Star className="w-3.5 h-3.5" />
            الأسعار والباقات
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4"
          >
            اختر الباقة{" "}
            <span className="text-[#25D366]">المناسبة</span>{" "}
            لأعمالك
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-xl mx-auto"
          >
            14 يوم تجربة مجانية بدون بيانات بنكية. يمكنك الترقية أو الإلغاء في أي وقت.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.55 }}
                className={`relative bg-white rounded-3xl border-2 ${plan.accent} p-7 ${
                  plan.popular ? "shadow-2xl shadow-green-100 md:-mt-4 md:mb-4" : "card-shadow"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-[#25D366] text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-md whitespace-nowrap">
                      ⭐ الأكثر شعبية
                    </span>
                  </div>
                )}

                {/* Plan header */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <div className={`inline-flex w-10 h-10 ${plan.popular ? "bg-green-100" : "bg-gray-100"} rounded-xl items-center justify-center mb-3`}>
                      <Icon className={`w-5 h-5 ${plan.popular ? "text-[#25D366]" : "text-gray-600"}`} />
                    </div>
                    <h3 className="text-xl font-black text-gray-900">{plan.name}</h3>
                    <p className="text-sm text-gray-400 mt-0.5">{plan.description}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-gray-900">{plan.price}</span>
                    <span className="text-gray-400 text-sm">{plan.period}</span>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="#"
                  className={`block w-full text-center font-bold py-3.5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 mb-6 ${plan.ctaClass}`}
                >
                  {plan.cta}
                </a>

                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-2.5">
                      {f.included ? (
                        <CheckCircle className="w-4 h-4 text-[#25D366] mt-0.5 shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-gray-300 mt-0.5 shrink-0" />
                      )}
                      <span
                        className={`text-sm ${f.included ? "text-gray-700" : "text-gray-300"}`}
                      >
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-400 text-sm mt-8"
        >
          جميع الباقات تشمل دعماً فنياً + شهادة SSL + نسخ احتياطية يومية
        </motion.p>
      </div>
    </section>
  );
}
