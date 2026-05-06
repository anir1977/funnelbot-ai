"use client";

import { motion } from "framer-motion";
import { PlugZap, Sliders, TrendingUp, ArrowLeft } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: PlugZap,
    title: "ربط متجرك بدقيقتين",
    description:
      "وصّل رقم واتساب بيزنس الخاص بمتجرك بمنصة FunnelsLibrary — بدون كود ولا خبرة تقنية. الإعداد سريع وبسيط.",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
    visual: (
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-[#25D366] rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white fill-white" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.117 1.532 5.847L0 24l6.335-1.524A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.88 0-3.636-.491-5.157-1.351l-.37-.217-3.763.906.944-3.668-.241-.386A9.948 9.948 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900">واتساب بيزنس</p>
            <div className="flex items-center gap-1 mt-0.5">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-[10px] text-green-600 font-medium">متصل بنجاح</p>
            </div>
          </div>
        </div>
        <div className="space-y-1.5">
          {["إنستغرام DM", "فيسبوك ماسنجر"].map((ch) => (
            <div key={ch} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-1.5">
              <span className="text-[10px] text-gray-600 font-medium">{ch}</span>
              <span className="text-[9px] bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded-full">قريباً</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    number: "02",
    icon: Sliders,
    title: "خصّص بوتك لمتجرك",
    description:
      "أضف منتجاتك، أسعارك، مناطق التوصيل، وأسلوب الرد الخاص بمتجرك. البوت يتعلم ويرد كأنه موظف حقيقي.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    visual: (
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm space-y-2.5">
        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">إعدادات المتجر</p>
        {[
          { label: "اسم المتجر", val: "متجر لونا كوسميتيك 🌿" },
          { label: "سيروم فيتامين C", val: "149 درهم" },
          { label: "التوصيل — كازا", val: "25 درهم" },
          { label: "التوصيل — الرباط", val: "30 درهم" },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-1.5">
            <span className="text-[10px] text-gray-500">{row.label}</span>
            <span className="text-[10px] font-bold text-gray-800">{row.val}</span>
          </div>
        ))}
        <div className="bg-[#25D366]/10 rounded-lg px-3 py-2 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] text-green-700 font-semibold">البوت جاهز للرد</span>
        </div>
      </div>
    ),
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "استقبل الطلبات وراقب النتائج",
    description:
      "بوتك يرد على الزبناء، يأخذ الطلبات، ويرسلها إليك مباشرة. أنت فقط تتابع وتشحن — والمبيعات تتضاعف.",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
    visual: (
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-bold text-gray-700">طلبات اليوم</p>
          <span className="text-[10px] bg-green-50 text-green-600 font-bold px-2 py-0.5 rounded-full">+34%</span>
        </div>
        <div className="space-y-2">
          {[
            { name: "فاطمة ز.", product: "سيروم C", amount: "149", status: "جديد", color: "bg-green-100 text-green-700" },
            { name: "سلمى م.", product: "كريم ليلي", amount: "89",  status: "قيد التوصيل", color: "bg-blue-100 text-blue-700" },
            { name: "نور أ.",  product: "مجموعة X", amount: "299", status: "تم التسليم", color: "bg-gray-100 text-gray-600" },
          ].map((order) => (
            <div key={order.name} className="flex items-center gap-2 bg-gray-50 rounded-lg px-2.5 py-1.5">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-[8px] font-bold shrink-0">
                {order.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-semibold text-gray-800 truncate">{order.name} — {order.product}</p>
              </div>
              <span className="text-[9px] font-bold text-gray-700 shrink-0">{order.amount} د</span>
              <span className={`text-[8px] font-semibold px-1.5 py-0.5 rounded-full shrink-0 ${order.color}`}>{order.status}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-4"
          >
            🚀 كيف يعمل؟
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4"
          >
            ابدأ في{" "}
            <span className="text-[#25D366]">3 خطوات بسيطة</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-xl mx-auto"
          >
            لا تحتاج أي خبرة تقنية. أغلب أصحاب المتاجر يشغّلون بوتهم في نفس اليوم.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-16 right-[16%] left-[16%] h-px bg-gradient-to-l from-gray-200 via-[#25D366]/40 to-gray-200" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.18, duration: 0.55 }}
                className="relative"
              >
                {/* Step header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`relative w-14 h-14 ${step.bg} border-2 ${step.border} rounded-2xl flex items-center justify-center shrink-0 z-10 bg-white`}>
                    <Icon className={`w-6 h-6 ${step.color}`} />
                    <span className="absolute -top-2.5 -right-2.5 w-6 h-6 bg-[#25D366] rounded-full flex items-center justify-center text-white text-[10px] font-black">
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">الخطوة {step.number}</p>
                    <h3 className="font-black text-gray-900 text-base">{step.title}</h3>
                  </div>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-5">{step.description}</p>

                {/* Visual mockup */}
                <div className="rounded-2xl overflow-hidden">
                  {step.visual}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="text-center mt-14"
        >
          <a
            href="#pricing"
            className="group inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1eb85a] text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-green-200 hover:shadow-xl hover:-translate-y-0.5"
          >
            ابدأ الآن مجاناً
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </a>
          <p className="text-gray-400 text-sm mt-3">14 يوم تجربة مجانية — بدون بيانات بنكية</p>
        </motion.div>
      </div>
    </section>
  );
}
