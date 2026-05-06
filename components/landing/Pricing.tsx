"use client";

import { motion } from "framer-motion";
import { CheckCircle, X, Zap, Star, Building2 } from "lucide-react";
import { WA_URL } from "@/lib/whatsapp";

const plans = [
  {
    name: "Starter",
    nameAr: "المبتدئ",
    icon: Zap,
    price: "99",
    period: "درهم / شهر",
    description: "مثالي للمتاجر الناشئة",
    features: [
      { text: "رقم واتساب واحد",            included: true  },
      { text: "حتى 1,000 رسالة شهرياً",    included: true  },
      { text: "رد تلقائي بالذكاء الاصطناعي",included: true  },
      { text: "قالب متجر واحد",             included: true  },
      { text: "تقارير أساسية",              included: true  },
      { text: "3 أرقام واتساب",             included: false },
      { text: "تكامل إنستغرام وفيسبوك",     included: false },
      { text: "مدير حساب مخصص",            included: false },
    ],
    cta: "ابدأ مجاناً",
    popular: false,
    border: "border-gray-200",
    ctaClass: "bg-gray-900 hover:bg-gray-700 text-white",
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
  },
  {
    name: "Pro",
    nameAr: "الاحترافي",
    icon: Star,
    price: "199",
    period: "درهم / شهر",
    description: "الأنسب لأصحاب المتاجر النشطة",
    features: [
      { text: "3 أرقام واتساب",             included: true },
      { text: "حتى 5,000 رسالة شهرياً",    included: true },
      { text: "رد تلقائي بالذكاء الاصطناعي",included: true },
      { text: "قوالب متجر غير محدودة",       included: true },
      { text: "تقارير متقدمة وإحصائيات",    included: true },
      { text: "تكامل إنستغرام وفيسبوك",     included: true },
      { text: "دعم واتساب 24/7",            included: true },
      { text: "مدير حساب مخصص",            included: false },
    ],
    cta: "ابدأ مجاناً",
    popular: true,
    border: "border-[#25D366]",
    ctaClass: "bg-[#25D366] hover:bg-[#1eb85a] text-white shadow-lg shadow-green-200",
    iconBg: "bg-green-100",
    iconColor: "text-[#25D366]",
  },
  {
    name: "Business",
    nameAr: "المؤسسي",
    icon: Building2,
    price: "399",
    period: "درهم / شهر",
    description: "للمتاجر الكبيرة وفِرق المبيعات",
    features: [
      { text: "أرقام واتساب غير محدودة",    included: true },
      { text: "رسائل غير محدودة",           included: true },
      { text: "رد تلقائي بالذكاء الاصطناعي",included: true },
      { text: "قوالب متجر غير محدودة",       included: true },
      { text: "تقارير متقدمة وإحصائيات",    included: true },
      { text: "تكامل إنستغرام وفيسبوك",     included: true },
      { text: "دعم VIP على مدار الساعة",    included: true },
      { text: "مدير حساب مخصص",            included: true },
    ],
    cta: "تواصل معنا",
    popular: false,
    border: "border-gray-200",
    ctaClass: "bg-gray-900 hover:bg-gray-700 text-white",
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-4"
          >
            <Star className="w-3.5 h-3.5" />
            الأسعار والباقات
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4"
          >
            باقات تناسب{" "}
            <span className="text-[#25D366]">كل متجر</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-xl mx-auto"
          >
            14 يوم تجربة مجانية بدون بيانات بنكية. يمكنك الترقية أو الإلغاء في أي وقت.
          </motion.p>
        </div>

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
                className={`relative bg-white rounded-3xl border-2 ${plan.border} p-7 ${
                  plan.popular ? "shadow-2xl shadow-green-100 md:-mt-5 md:mb-5" : "card-shadow"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="bg-[#25D366] text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-md">
                      ⭐ الأكثر شعبية
                    </span>
                  </div>
                )}

                <div className="mb-5">
                  <div className={`inline-flex w-11 h-11 ${plan.iconBg} rounded-xl items-center justify-center mb-3`}>
                    <Icon className={`w-5 h-5 ${plan.iconColor}`} />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-xl font-black text-gray-900">{plan.nameAr}</h3>
                    <span className="text-xs font-mono text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded">{plan.name}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-0.5">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-black text-gray-900">{plan.price}</span>
                    <span className="text-gray-400 text-sm">{plan.period}</span>
                  </div>
                </div>

                <a href={WA_URL} target="_blank" rel="noopener noreferrer" className={`block w-full text-center font-bold py-3.5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 mb-6 ${plan.ctaClass}`}>
                  {plan.cta}
                </a>

                <ul className="space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-2.5">
                      {f.included
                        ? <CheckCircle className="w-4 h-4 text-[#25D366] mt-0.5 shrink-0" />
                        : <X className="w-4 h-4 text-gray-300 mt-0.5 shrink-0" />}
                      <span className={`text-sm ${f.included ? "text-gray-700" : "text-gray-300"}`}>{f.text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
          className="text-center text-gray-400 text-sm mt-8"
        >
          جميع الباقات تشمل دعماً فنياً · شهادة SSL · نسخ احتياطية يومية · أسعار بالدرهم المغربي
        </motion.p>
      </div>
    </section>
  );
}
