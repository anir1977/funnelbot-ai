"use client";

import { motion } from "framer-motion";
import { CheckCircle, X, Zap, Star, Building2, ArrowLeft } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    nameAr: "المبتدئ",
    icon: Zap,
    price: "99",
    period: "درهم / شهر",
    description: "مثالي للمتاجر الناشئة",
    color: "#64748B",
    features: [
      { text: "رقم واتساب واحد",               ok: true  },
      { text: "حتى 1,000 رسالة شهرياً",        ok: true  },
      { text: "رد تلقائي بالذكاء الاصطناعي",   ok: true  },
      { text: "إدارة الطلبات COD",              ok: true  },
      { text: "تقارير أساسية",                 ok: true  },
      { text: "3 أرقام واتساب",               ok: false },
      { text: "تكامل إنستغرام وفيسبوك",        ok: false },
      { text: "مدير حساب مخصص",               ok: false },
    ],
    cta: "ابدأ مجاناً",
    ctaHref: "/signup",
    popular: false,
  },
  {
    name: "Pro",
    nameAr: "الاحترافي",
    icon: Star,
    price: "199",
    period: "درهم / شهر",
    description: "الأنسب لأصحاب المتاجر النشطة",
    color: "#25D366",
    features: [
      { text: "3 أرقام واتساب",               ok: true },
      { text: "حتى 5,000 رسالة شهرياً",       ok: true },
      { text: "رد تلقائي بالذكاء الاصطناعي",  ok: true },
      { text: "إدارة الطلبات COD",             ok: true },
      { text: "تقارير متقدمة وإحصائيات",      ok: true },
      { text: "تكامل إنستغرام وفيسبوك",       ok: true },
      { text: "دعم واتساب أولوية",             ok: true },
      { text: "مدير حساب مخصص",              ok: false },
    ],
    cta: "ابدأ مجاناً",
    ctaHref: "/signup",
    popular: true,
  },
  {
    name: "Business",
    nameAr: "المؤسسي",
    icon: Building2,
    price: "399",
    period: "درهم / شهر",
    description: "للمتاجر الكبيرة وفِرق المبيعات",
    color: "#8B5CF6",
    features: [
      { text: "أرقام واتساب غير محدودة",       ok: true },
      { text: "رسائل غير محدودة",              ok: true },
      { text: "رد تلقائي بالذكاء الاصطناعي",  ok: true },
      { text: "إدارة الطلبات COD",             ok: true },
      { text: "تقارير متقدمة وإحصائيات",      ok: true },
      { text: "تكامل إنستغرام وفيسبوك",       ok: true },
      { text: "دعم VIP على مدار الساعة",      ok: true },
      { text: "مدير حساب مخصص",              ok: true },
    ],
    cta: "تواصل معنا",
    ctaHref: "/contact",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs font-bold text-gray-600 mb-5 shadow-sm">
            <Star className="w-3.5 h-3.5 text-[#25D366]" fill="#25D366" />
            الأسعار
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            سعر يناسب كل متجر
          </h2>
          <p className="text-lg text-gray-500 max-w-lg mx-auto">
            ابدأ مجاناً لمدة 14 يوم — بدون بيانات بنكية.
            <br className="hidden sm:block" />
            ألغِ في أي وقت.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                className={`relative rounded-2xl border transition-all duration-300 ${
                  plan.popular
                    ? "bg-white border-[#25D366]/40 shadow-[0_0_0_1px_rgba(37,211,102,0.15),0_8px_40px_rgba(37,211,102,0.12)] scale-[1.02]"
                    : "bg-white border-gray-200 shadow-card hover:shadow-card-lg hover:-translate-y-1"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 inset-x-0 flex justify-center">
                    <span className="bg-[#25D366] text-white text-[11px] font-black px-4 py-1 rounded-full shadow-glow">
                      الأكثر شعبية ⭐
                    </span>
                  </div>
                )}

                <div className="p-7">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${plan.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: plan.color }} />
                    </div>
                    <div>
                      <p className="text-[13px] font-black text-gray-900 font-inter">{plan.name}</p>
                      <p className="text-[11px] text-gray-400">{plan.description}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-5xl font-black text-gray-900 font-inter">{plan.price}</span>
                      <span className="text-gray-400 text-sm">{plan.period}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href={plan.ctaHref}
                    className={`block w-full text-center font-bold py-3 rounded-xl text-sm transition-all duration-200 mb-7 ${
                      plan.popular
                        ? "bg-[#25D366] hover:bg-[#1ebe5d] text-white shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5"
                        : "bg-gray-900 hover:bg-gray-700 text-white"
                    }`}
                  >
                    {plan.cta}
                    <ArrowLeft className="inline-block w-3.5 h-3.5 mr-1.5" />
                  </Link>

                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((f) => (
                      <li key={f.text} className="flex items-center gap-2.5">
                        {f.ok ? (
                          <CheckCircle className="w-4 h-4 shrink-0" style={{ color: plan.color }} />
                        ) : (
                          <X className="w-4 h-4 text-gray-200 shrink-0" />
                        )}
                        <span className={`text-sm ${f.ok ? "text-gray-700" : "text-gray-300"}`}>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-400 mt-10"
        >
          جميع الباقات تتضمن: دعم واتساب، إعداد مجاني، وتحديثات مستمرة.
          <br className="hidden sm:block" />
          لا عقود طويلة — ألغِ في أي وقت.
        </motion.p>
      </div>
    </section>
  );
}
