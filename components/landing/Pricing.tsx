"use client";

import { motion } from "framer-motion";
import { Check, X, ArrowLeft, Zap, Star, Building2 } from "lucide-react";
import Link from "next/link";

type Plan = {
  id: string;
  name: string;
  desc: string;
  price: string;
  period: string;
  color: string;
  popular: boolean;
  icon: React.ElementType;
  trial: string;
  cta: string;
  features: { text: string; included: boolean }[];
};

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    desc: "مثالي للمتاجر الصغيرة التي تبدأ رحلتها.",
    price: "99",
    period: "درهم/شهر",
    color: "#64748B",
    popular: false,
    icon: Zap,
    trial: "جرّب 14 يوم مجاناً — بدون بيانات بنكية.",
    cta: "ابدأ مجاناً",
    features: [
      { text: "500 محادثة/شهر", included: true },
      { text: "ربط واتساب بيزنس", included: true },
      { text: "ردود تلقائية ذكية", included: true },
      { text: "تأكيد الطلبات COD", included: true },
      { text: "لوحة تحكم أساسية", included: true },
      { text: "تقارير وتحليلات متقدمة", included: false },
      { text: "تعدد المتاجر", included: false },
      { text: "دعم أولوي", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    desc: "الأنسب للمتاجر النشطة التي تريد النمو.",
    price: "199",
    period: "درهم/شهر",
    color: "#10B981",
    popular: true,
    icon: Star,
    trial: "جرّب 14 يوم مجاناً — بدون بيانات بنكية.",
    cta: "ابدأ مجاناً",
    features: [
      { text: "2,000 محادثة/شهر", included: true },
      { text: "ربط واتساب بيزنس", included: true },
      { text: "ردود تلقائية ذكية", included: true },
      { text: "تأكيد الطلبات COD", included: true },
      { text: "لوحة تحكم متقدمة", included: true },
      { text: "تقارير وتحليلات متقدمة", included: true },
      { text: "تعدد المتاجر", included: false },
      { text: "دعم أولوي", included: true },
    ],
  },
  {
    id: "business",
    name: "Business",
    desc: "للمتاجر الكبيرة والعلامات التجارية المتعددة.",
    price: "399",
    period: "درهم/شهر",
    color: "#8B5CF6",
    popular: false,
    icon: Building2,
    trial: "جرّب 14 يوم مجاناً — بدون بيانات بنكية.",
    cta: "ابدأ مجاناً",
    features: [
      { text: "محادثات غير محدودة", included: true },
      { text: "ربط واتساب بيزنس", included: true },
      { text: "ردود تلقائية ذكية", included: true },
      { text: "تأكيد الطلبات COD", included: true },
      { text: "لوحة تحكم متقدمة", included: true },
      { text: "تقارير وتحليلات متقدمة", included: true },
      { text: "تعدد المتاجر", included: true },
      { text: "دعم أولوي 24/7", included: true },
    ],
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="py-24 lg:py-32 bg-[#121414]"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-[#10B981] text-[13px] font-semibold tracking-wide uppercase mb-4">
            الأسعار
          </span>
          <h2
            className="text-4xl lg:text-5xl font-black text-[#EDEDEA] mb-4"
            style={{ letterSpacing: "-0.035em" }}
          >
            خطط شفافة بدون مفاجآت
          </h2>
          <p className="text-[#9B9B97] text-[15px] max-w-md mx-auto leading-relaxed">
            ابدأ مجاناً 14 يوم — بدون بيانات بنكية. ألغِ في أي وقت.
          </p>
        </motion.div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-center">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative bg-[#181A1B] rounded-2xl overflow-hidden ${
                  plan.popular
                    ? "scale-[1.03] lg:scale-[1.04]"
                    : "border border-white/[0.06] hover:-translate-y-1 hover:border-white/[0.12] transition-all duration-300"
                }`}
                style={
                  plan.popular
                    ? {
                        boxShadow:
                          "0 0 0 1.5px #10B981, 0 8px 40px rgba(16,185,129,0.2), 0 24px 60px rgba(0,0,0,0.3)",
                      }
                    : {}
                }
              >
                {/* Pro top accent line */}
                {plan.popular && (
                  <>
                    <div className="h-0.5 w-full bg-gradient-to-r from-emerald-600 via-[#10B981] to-emerald-600" />
                    <div className="flex justify-center">
                      <div className="bg-[#10B981] text-white text-[11px] font-black px-4 py-1 rounded-b-xl">
                        الأكثر شعبية
                      </div>
                    </div>
                  </>
                )}

                <div className="p-6 lg:p-7">
                  {/* Plan icon + name */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: `${plan.color}18` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: plan.color }} />
                    </div>
                    <span className="font-inter font-black text-[#EDEDEA] text-[17px]">
                      {plan.name}
                    </span>
                  </div>
                  {/* Description */}
                  <p className="text-[11px] text-[#9B9B97] mb-5 leading-relaxed">
                    {plan.desc}
                  </p>

                  {/* Price */}
                  <div className="mb-1">
                    <span
                      className="font-inter font-black text-[#EDEDEA]"
                      style={{
                        fontSize: 54,
                        letterSpacing: "-0.04em",
                        lineHeight: 1,
                      }}
                    >
                      {plan.price}
                    </span>
                    <span className="text-[13px] text-[#9B9B97] mr-1">{plan.period}</span>
                  </div>
                  {/* Trial note */}
                  <p className="text-[11px] text-[#525252] mb-5 mt-1.5">{plan.trial}</p>

                  {/* CTA Button */}
                  {plan.popular ? (
                    <Link
                      href="/signup"
                      className="group relative w-full flex items-center justify-center gap-2 bg-[#10B981] hover:bg-emerald-400 text-white font-black text-[14px] px-6 py-3 rounded-xl transition-all duration-200 overflow-hidden mb-6"
                      style={{
                        boxShadow: "0 4px 20px rgba(16,185,129,0.35)",
                      }}
                    >
                      {/* Shimmer */}
                      <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      <span>{plan.cta}</span>
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                  ) : (
                    <Link
                      href="/signup"
                      className="w-full flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] text-[#EDEDEA] font-black text-[14px] px-6 py-3 rounded-xl border border-white/[0.1] transition-all duration-200 mb-6"
                    >
                      <span>{plan.cta}</span>
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                  )}

                  {/* Divider */}
                  <div className="border-t border-white/[0.06] mb-5" />

                  {/* Features */}
                  <ul className="space-y-2.5">
                    {plan.features.map((feat, j) => (
                      <li key={j} className="flex items-center gap-3">
                        {feat.included ? (
                          <div
                            className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                            style={{
                              background: `${plan.color}18`,
                              border: `1px solid ${plan.color}35`,
                            }}
                          >
                            <Check
                              className="w-2.5 h-2.5"
                              style={{ color: plan.color }}
                              strokeWidth={2.5}
                            />
                          </div>
                        ) : (
                          <div
                            className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                            style={{
                              background: "rgba(255,255,255,0.04)",
                              border: "1px solid rgba(255,255,255,0.08)",
                            }}
                          >
                            <X
                              className="w-2.5 h-2.5 text-white/20"
                              strokeWidth={2.5}
                            />
                          </div>
                        )}
                        <span
                          className={`text-[13px] leading-snug ${
                            feat.included
                              ? "text-[#EDEDEA]"
                              : "text-[#525252] line-through"
                          }`}
                        >
                          {feat.text}
                        </span>
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
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-[13px] text-[#525252] mt-10"
        >
          جميع الباقات تتضمن: دعم واتساب، إعداد مجاني، وتحديثات مستمرة. لا عقود — ألغِ في أي وقت.
        </motion.p>
      </div>
    </section>
  );
}
