"use client";

import { motion } from "framer-motion";
import { Wifi, ListPlus, Rocket, ArrowLeft, CheckCircle2 } from "lucide-react";
import { WA_URL } from "@/lib/whatsapp";

const steps = [
  {
    number: "01",
    icon: Wifi,
    title: "ربط رقم واتساب بيزنس",
    description:
      "وصّل رقم واتساب بيزنس الخاص بمتجرك في خطوات بسيطة — بدون كود ولا خبرة تقنية.",
    color: "text-green-600",
    iconGradient: "from-green-400 to-emerald-500",
    border: "border-green-200",
    bg: "bg-green-50",
    visual: (
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-[#25D366] rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-white fill-white" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.117 1.532 5.847L0 24l6.335-1.524A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.88 0-3.636-.491-5.157-1.351l-.37-.217-3.763.906.944-3.668-.241-.386A9.948 9.948 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-gray-900">واتساب بيزنس</p>
            <div className="flex items-center gap-1 mt-0.5">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-[10px] text-green-600 font-semibold">متصل بنجاح ✅</p>
            </div>
          </div>
        </div>
        <div className="space-y-1.5">
          {[
            { label: "+212 6XX XXX XXX", status: "نشط", color: "bg-green-50 text-green-700" },
            { label: "إنستغرام DM", status: "قريباً", color: "bg-blue-50 text-blue-600" },
            { label: "فيسبوك ماسنجر", status: "قريباً", color: "bg-blue-50 text-blue-600" },
          ].map((ch) => (
            <div key={ch.label} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-1.5">
              <span className="text-[10px] text-gray-600 font-medium">{ch.label}</span>
              <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${ch.color}`}>{ch.status}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    number: "02",
    icon: ListPlus,
    title: "أضف منتجاتك وأسعارك",
    description:
      "أضف منتجاتك، أسعارك، مناطق التوصيل — البوت يتعلم ويرد كأنه يعرف متجرك من زمان.",
    color: "text-blue-600",
    iconGradient: "from-blue-400 to-indigo-500",
    border: "border-blue-200",
    bg: "bg-blue-50",
    visual: (
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm space-y-2">
        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">إعدادات المتجر</p>
        {[
          { label: "اسم المتجر", val: "عطور الريم 🌸" },
          { label: "بلو دي شانيل 100ml", val: "640 درهم" },
          { label: "توصيل — كازا", val: "25 درهم" },
          { label: "توصيل — الرباط", val: "30 درهم" },
          { label: "توصيل — أكادير", val: "35 درهم" },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-1.5">
            <span className="text-[10px] text-gray-500">{row.label}</span>
            <span className="text-[10px] font-bold text-gray-800">{row.val}</span>
          </div>
        ))}
        <div className="bg-[#25D366]/10 rounded-lg px-3 py-2 flex items-center gap-2">
          <CheckCircle2 className="w-3 h-3 text-green-600" />
          <span className="text-[10px] text-green-700 font-semibold">البوت يتعلم منتجاتك</span>
        </div>
      </div>
    ),
  },
  {
    number: "03",
    icon: Rocket,
    title: "شغّل المساعد وابدأ البيع",
    description:
      "اضغط تشغيل — بوتك يبدأ يرد على الزبناء، يأخذ الطلبات ويرسلها إليك. أنت فقط تشحن.",
    color: "text-purple-600",
    iconGradient: "from-purple-400 to-violet-500",
    border: "border-purple-200",
    bg: "bg-purple-50",
    visual: (
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-bold text-gray-700">لوحة التحكم — اليوم</p>
          <span className="text-[9px] bg-green-50 text-green-600 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
            نشط
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 mb-2">
          {[
            { label: "طلبات اليوم", val: "28", color: "text-green-600" },
            { label: "مبيعات", val: "8,640 د", color: "text-blue-600" },
            { label: "محادثات", val: "143", color: "text-purple-600" },
            { label: "تحويل", val: "32%", color: "text-amber-600" },
          ].map((m) => (
            <div key={m.label} className="bg-gray-50 rounded-lg p-1.5 text-center">
              <p className={`text-sm font-black ${m.color}`}>{m.val}</p>
              <p className="text-[9px] text-gray-400">{m.label}</p>
            </div>
          ))}
        </div>
        <div className="space-y-1">
          {[
            { name: "محمد ق.", city: "الرباط", status: "جديد", color: "bg-green-100 text-green-700" },
            { name: "فاطمة ز.", city: "كازا", status: "مُشحون", color: "bg-blue-100 text-blue-700" },
          ].map((o) => (
            <div key={o.name} className="flex items-center justify-between bg-gray-50 rounded-lg px-2 py-1">
              <span className="text-[9px] font-semibold text-gray-700">{o.name} — {o.city}</span>
              <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${o.color}`}>{o.status}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-4"
          >
            🚀 الإعداد السريع
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4"
          >
            شغّل بوتك في{" "}
            <span className="text-[#25D366]">3 خطوات</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-xl mx-auto"
          >
            أغلب أصحاب المتاجر يشغّلون بوتهم في نفس اليوم. لا خبرة تقنية مطلوبة.
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
                <div className="flex items-center gap-4 mb-6">
                  <div className={`relative w-14 h-14 bg-gradient-to-br ${step.iconGradient} rounded-2xl flex items-center justify-center shrink-0 z-10 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                    <span className="absolute -top-2.5 -right-2.5 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center text-white text-[10px] font-black">
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">الخطوة {step.number}</p>
                    <h3 className="font-black text-gray-900 text-base">{step.title}</h3>
                  </div>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-5">{step.description}</p>

                <div className="rounded-2xl overflow-hidden">
                  {step.visual}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="text-center mt-14"
        >
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1eb85a] text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-green-200 hover:shadow-xl hover:-translate-y-0.5"
          >
            ابدأ الإعداد الآن — مجاناً
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </a>
          <p className="text-gray-400 text-sm mt-3">14 يوم تجربة مجانية — بدون بيانات بنكية</p>
        </motion.div>
      </div>
    </section>
  );
}
