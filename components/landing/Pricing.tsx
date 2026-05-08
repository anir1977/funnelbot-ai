"use client";

import { motion } from "framer-motion";
import { Check, X, Zap, Star, Building2, ArrowLeft } from "lucide-react";
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
      { text: "3 أرقام واتساب",                ok: false },
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
      { text: "3 أرقام واتساب",                ok: true },
      { text: "حتى 5,000 رسالة شهرياً",        ok: true },
      { text: "رد تلقائي بالذكاء الاصطناعي",   ok: true },
      { text: "إدارة الطلبات COD",              ok: true },
      { text: "تقارير متقدمة وإحصائيات",       ok: true },
      { text: "تكامل إنستغرام وفيسبوك",        ok: true },
      { text: "دعم واتساب أولوية",              ok: true },
      { text: "مدير حساب مخصص",               ok: false },
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
      { text: "أرقام واتساب غير محدودة",        ok: true },
      { text: "رسائل غير محدودة",               ok: true },
      { text: "رد تلقائي بالذكاء الاصطناعي",   ok: true },
      { text: "إدارة الطلبات COD",              ok: true },
      { text: "تقارير متقدمة وإحصائيات",       ok: true },
      { text: "تكامل إنستغرام وفيسبوك",        ok: true },
      { text: "دعم VIP على مدار الساعة",       ok: true },
      { text: "مدير حساب مخصص",               ok: true },
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
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight"
            style={{ letterSpacing: "-0.025em" }}
          >
            سعر يناسب كل متجر
          </h2>
          <p className="text-[16px] text-gray-500 max-w-lg mx-auto leading-relaxed">
            ابدأ مجاناً لمدة 14 يوم — بدون بيانات بنكية. ألغِ في أي وقت.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-center">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                  plan.popular
                    ? "scale-[1.03] lg:scale-[1.04]"
                    : "hover:-translate-y-1 hover:shadow-xl"
                }`}
                style={
                  plan.popular
                    ? {
                        boxShadow:
                          "0 0 0 1.5px rgba(37,211,102,0.35), 0 8px 40px rgba(37,211,102,0.15), 0 24px 60px rgba(0,0,0,0.08)",
                      }
                    : {
                        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)",
                      }
                }
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#1ebe5d] via-[#25D366] to-[#1ebe5d]" />
                )}

                {/* Card background */}
                <div
                  className="absolute inset-0"
                  style={
                    plan.popular
                      ? { background: "linear-gradient(160deg, rgba(37,211,102,0.04) 0%, #ffffff 40%)" }
                      : { background: "#ffffff" }
                  }
                />

                {plan.popular && (
                  <div className="relative flex justify-center -mt-px">
                    <span
                      className="bg-[#25D366] text-white text-[11px] font-black px-4 py-1 rounded-b-lg"
                      style={{ boxShadow: "0 4px 12px rgba(37,211,102,0.3)" }}
                    >
                      الأكثر شعبية ⭐
                    </span>
                  </div>
                )}

                <div className={`relative p-6 lg:p-7 ${plan.popular ? "" : "border border-gray-100 rounded-2xl"}`}>
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${plan.color}15`, border: `1px solid ${plan.color}22` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: plan.color }} />
                    </div>
                    <div>
                      <p className="text-[13px] font-black text-gray-900 font-inter leading-none">{plan.name}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{plan.description}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-5">
                    <div className="flex items-baseline gap-1.5">
                      <span
                        className="text-[52px] font-black text-gray-900 font-inter leading-none tabular-nums"
                        style={{ letterSpacing: "-0.03em" }}
                      >
                        {plan.price}
                      </span>
                      <span className="text-gray-400 text-[13px]">{plan.period}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1.5">
                      14 يوم تجربة مجانية — بدون بيانات بنكية
                    </p>
                  </div>

                  {/* CTA */}
                  <Link
                    href={plan.ctaHref}
                    className={`group relative block w-full text-center font-bold py-3 rounded-xl text-[14px] transition-all duration-200 mb-6 overflow-hidden ${
                      plan.popular
                        ? "bg-[#25D366] hover:bg-[#22c55e] text-white"
                        : plan.color === "#8B5CF6"
                        ? "bg-gray-900 hover:bg-gray-700 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                    }`}
                    style={
                      plan.popular
                        ? { boxShadow: "0 4px 16px rgba(37,211,102,0.3), 0 1px 3px rgba(0,0,0,0.1)" }
                        : undefined
                    }
                  >
                    <span className="relative z-10 flex items-center justify-center gap-1.5">
                      {plan.cta}
                      <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                    </span>
                    {plan.popular && (
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/[0.14] to-transparent transition-transform duration-700" />
                    )}
                  </Link>

                  {/* Features */}
                  <ul className="space-y-2.5">
                    {plan.features.map((f, fi) => (
                      <motion.li
                        key={f.text}
                        initial={{ opacity: 0, x: 8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: fi * 0.04 + 0.15 }}
                        className="flex items-center gap-2.5"
                      >
                        {f.ok ? (
                          <div
                            className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `${plan.color}18` }}
                          >
                            <Check className="w-2.5 h-2.5" style={{ color: plan.color }} strokeWidth={2.5} />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                            <X className="w-2.5 h-2.5 text-gray-300" strokeWidth={2.5} />
                          </div>
                        )}
                        <span className={`text-[13px] leading-snug ${f.ok ? "text-gray-700" : "text-gray-300"}`}>
                          {f.text}
                        </span>
                      </motion.li>
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
          className="text-center text-[13px] text-gray-400 mt-10 leading-relaxed"
        >
          جميع الباقات تتضمن: دعم واتساب، إعداد مجاني، وتحديثات مستمرة.
          <br className="hidden sm:block" />
          لا عقود طويلة — ألغِ في أي وقت بنقرة واحدة.
        </motion.p>
      </div>
    </section>
  );
}
