"use client";

import { motion } from "framer-motion";
import { Check, ArrowLeft, Zap, Star, Building2 } from "lucide-react";
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
    trial: "14 يوم مجاناً — بدون بيانات بنكية.",
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
    trial: "14 يوم مجاناً — بدون بيانات بنكية.",
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
    trial: "14 يوم مجاناً — بدون بيانات بنكية.",
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
    <section id="pricing" className="py-28 lg:py-36 bg-[#121414] relative overflow-hidden" dir="rtl">
      {/* Subtle top separator */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)" }} />

      {/* Center ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 700,
          height: 500,
          left: "50%",
          top: "30%",
          background: "radial-gradient(ellipse, rgba(16,185,129,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#10B981] font-semibold font-inter mb-5">
            الأسعار
          </p>
          <h2
            className="font-black text-[#EDEDEA] mb-5"
            style={{ fontSize: "clamp(32px, 5vw, 56px)", letterSpacing: "-0.038em", lineHeight: 1.06 }}
          >
            خطط شفافة بدون مفاجآت
          </h2>
          <p className="text-[#9B9B97] text-[16px] max-w-md mx-auto leading-relaxed">
            ابدأ مجاناً 14 يوم — بدون بيانات بنكية. ألغِ في أي وقت.
          </p>
        </motion.div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5 items-center">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            const isPro = plan.popular;

            return (
              /* Entrance animation wrapper */
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
              {/* Hover interaction wrapper */}
              <motion.div
                whileHover={
                  isPro
                    ? {
                        y: -6,
                        boxShadow:
                          "0 0 0 1.5px #10B981, 0 12px 50px rgba(16,185,129,0.32), 0 30px 80px rgba(0,0,0,0.5), 0 0 80px rgba(16,185,129,0.1)",
                      }
                    : {
                        y: -4,
                        boxShadow: `0 0 0 1px rgba(255,255,255,0.14), 0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${plan.color}0A`,
                      }
                }
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="relative rounded-2xl overflow-hidden h-full"
                style={
                  isPro
                    ? {
                        background: "#181A1B",
                        transform: "scale(1.04)",
                        boxShadow: "0 0 0 1.5px #10B981, 0 8px 40px rgba(16,185,129,0.22), 0 24px 60px rgba(0,0,0,0.4)",
                      }
                    : {
                        background: "#181A1B",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }
                }
              >
                {/* Pro — emerald accent line at top */}
                {isPro && (
                  <>
                    <div
                      className="h-[2px] w-full"
                      style={{ background: "linear-gradient(to right, rgba(16,185,129,0.4), #10B981, rgba(16,185,129,0.4))" }}
                    />
                    {/* Popular badge */}
                    <div className="flex justify-center -mt-px">
                      <div
                        className="text-white text-[10px] font-black px-4 py-[4px] rounded-b-lg font-inter"
                        style={{ background: "#10B981", letterSpacing: "0.04em" }}
                      >
                        MOST POPULAR
                      </div>
                    </div>
                  </>
                )}

                {/* Pro — subtle background glow overlay */}
                {isPro && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(16,185,129,0.06) 0%, transparent 100%)",
                    }}
                  />
                )}

                <div className={`p-6 lg:p-7 ${isPro ? "pt-5" : ""} relative`}>
                  {/* Plan icon + name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{
                        background: `${plan.color}14`,
                        border: `1px solid ${plan.color}25`,
                      }}
                    >
                      <Icon className="w-4 h-4" style={{ color: plan.color }} />
                    </div>
                    <span className="font-inter font-black text-[#EDEDEA] text-[17px] tracking-tight">
                      {plan.name}
                    </span>
                  </div>

                  <p className="text-[12.5px] text-[#9B9B97] mb-6 leading-relaxed">{plan.desc}</p>

                  {/* Price */}
                  <div className="mb-1 flex items-baseline gap-1">
                    <span
                      className="font-inter font-black text-[#EDEDEA] leading-none"
                      style={{ fontSize: 52, letterSpacing: "-0.04em" }}
                    >
                      {plan.price}
                    </span>
                    <span className="text-[13px] text-[#525252] mb-1">{plan.period}</span>
                  </div>
                  <p className="text-[11.5px] text-[#525252] mb-6 mt-1">{plan.trial}</p>

                  {/* CTA Button */}
                  {isPro ? (
                    <Link
                      href="/signup"
                      className="group relative w-full flex items-center justify-center gap-2 text-white font-black text-[14px] px-6 py-3.5 rounded-xl overflow-hidden mb-7 transition-all duration-200"
                      style={{
                        background: "#10B981",
                        boxShadow: "0 4px 20px rgba(16,185,129,0.32), 0 1px 0 rgba(255,255,255,0.1) inset",
                      }}
                    >
                      <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-550 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent pointer-events-none" />
                      <span className="relative z-10">{plan.cta}</span>
                      <ArrowLeft className="w-4 h-4 relative z-10 transition-transform duration-200 group-hover:-translate-x-0.5" />
                    </Link>
                  ) : (
                    <Link
                      href="/signup"
                      className="group w-full flex items-center justify-center gap-2 text-[#9B9B97] hover:text-[#EDEDEA] font-bold text-[14px] px-6 py-3.5 rounded-xl border border-white/[0.09] hover:border-white/[0.18] hover:bg-white/[0.04] transition-all duration-200 mb-7"
                    >
                      <span>{plan.cta}</span>
                      <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
                    </Link>
                  )}

                  {/* Divider */}
                  <div className="border-t border-white/[0.06] mb-5" />

                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((feat, j) => (
                      <li key={j} className="flex items-center gap-3">
                        {feat.included ? (
                          <div
                            className="w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0"
                            style={{
                              background: `${plan.color}14`,
                              border: `1px solid ${plan.color}28`,
                            }}
                          >
                            <Check className="w-[9px] h-[9px]" style={{ color: plan.color }} strokeWidth={3} />
                          </div>
                        ) : (
                          <div
                            className="w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0"
                            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                          >
                            <div className="w-2 h-px bg-white/20 rounded-full" />
                          </div>
                        )}
                        <span
                          className="text-[13px] leading-snug"
                          style={{
                            color: feat.included ? "#EDEDEA" : "rgba(255,255,255,0.22)",
                          }}
                        >
                          {feat.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
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
          className="text-center text-[13px] text-[#525252] mt-12"
        >
          جميع الباقات تتضمن: دعم واتساب، إعداد مجاني، وتحديثات مستمرة. لا عقود — ألغِ في أي وقت.
        </motion.p>
      </div>
    </section>
  );
}
