"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Zap, RefreshCw, MapPin, HelpCircle, Heart } from "lucide-react";
import { WA_URL } from "@/lib/whatsapp";

const cases = [
  {
    icon: CheckCircle2,
    title: "تأكيد الطلب بالدفع عند الاستلام",
    description: "البوت يجمع الاسم والعنوان والهاتف ويؤكد الطلب COD — بدون ما تتدخل في أي خطوة.",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
    tag: "COD",
    tagBg: "bg-green-600",
    visual: (
      <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-gray-700">طلب #FL-2847</span>
          <span className="text-[9px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">✅ مؤكد</span>
        </div>
        <div className="space-y-1">
          {[
            ["المنتج", "بلو دي شانيل 100ml"],
            ["الثمن", "640 + 30 توصيل"],
            ["المدينة", "الرباط — أكدال"],
            ["الدفع", "عند الاستلام COD"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between text-[9px]">
              <span className="text-gray-400">{k}</span>
              <span className="font-semibold text-gray-700">{v}</span>
            </div>
          ))}
        </div>
        <div className="bg-green-50 rounded-lg px-2 py-1.5 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[9px] text-green-700 font-semibold">جاهز للشحن</span>
        </div>
      </div>
    ),
  },
  {
    icon: Zap,
    title: "رد تلقائي 24/7 بالدارجة",
    description: "أسئلة الثمن، المقاسات، التوصيل — يرد عليها البوت في ثوانٍ حتى الساعة 3 صباحاً.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    tag: "24/7",
    tagBg: "bg-blue-600",
    visual: (
      <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-2.5">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[9px] font-semibold text-gray-600">متصل — 3:47 صباحاً</span>
        </div>
        <div className="space-y-1.5" dir="rtl">
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg rounded-tl-sm px-2.5 py-1.5 text-[9px] text-gray-800 max-w-[85%]">
              شحال ثمن الكريم؟
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-[#DCF8C6] rounded-lg rounded-tr-sm px-2.5 py-1.5 text-[9px] text-gray-800 max-w-[85%]">
              كريم الترطيب 120 درهم 🌸<br />التوصيل لجميع المدن ✅
            </div>
          </div>
        </div>
        <p className="text-[8px] text-gray-400 mt-2 text-center">رد خلال ثانيتين ⚡</p>
      </div>
    ),
  },
  {
    icon: RefreshCw,
    title: "استرجاع السلة المتروكة",
    description: "زبون تفرج على المنتج ولم يكمل — البوت يرسل له رسالة تذكير ذكية تلقائياً.",
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
    tag: "+23% مبيعات",
    tagBg: "bg-orange-600",
    visual: (
      <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
        <p className="text-[9px] text-gray-400 mb-2">رسالة تذكير تلقائية ⏰</p>
        <div className="bg-orange-50 border border-orange-100 rounded-lg p-2">
          <p className="text-[9px] text-gray-800 leading-relaxed" dir="rtl">
            مرحباً سلمى! 👋<br />
            لقيت أنك تفرجتي على سيروم C<br />
            باقي 5 فقط في المخزون 🔥<br />
            <span className="font-bold text-orange-600">كود LUNA10 — خصم 10%!</span>
          </p>
        </div>
        <p className="text-[8px] text-green-600 font-semibold mt-2">معدل الاسترجاع: 34%</p>
      </div>
    ),
  },
  {
    icon: MapPin,
    title: "تتبع الطلب والتوصيل",
    description: "الزبون يسأل 'وين طلبيتي؟' — البوت يعطيه تحديثاً فورياً على حالة طلبه.",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
    tag: "تتبع مباشر",
    tagBg: "bg-purple-600",
    visual: (
      <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
        <p className="text-[9px] font-bold text-gray-700 mb-2">تتبع الطلب #FL-2847</p>
        <div className="space-y-1.5">
          {[
            { label: "تأكيد الطلب", done: true, time: "10:24" },
            { label: "قيد التجهيز", done: true, time: "11:30" },
            { label: "مع المندوب", done: true, time: "14:00" },
            { label: "تم التسليم", done: false, time: "~16:00" },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full flex items-center justify-center shrink-0 ${step.done ? "bg-green-500" : "bg-gray-200"}`}>
                {step.done && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
              </div>
              <span className={`text-[9px] flex-1 ${step.done ? "text-gray-700 font-semibold" : "text-gray-400"}`}>{step.label}</span>
              <span className="text-[8px] text-gray-400">{step.time}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: HelpCircle,
    title: "أتمتة الأسئلة الشائعة",
    description: "نفس الأسئلة كل يوم؟ الثمن، المقاسات، المخزون — خليهم للبوت ووفر وقتك.",
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-200",
    tag: "95% أتمتة",
    tagBg: "bg-teal-600",
    visual: (
      <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 space-y-1.5">
        {[
          { q: "شحال ثمن الجلابة؟", a: "من 299 إلى 450 درهم حسب النوع" },
          { q: "واش التوصيل لمراكش؟", a: "إيه 25 د — يوصل في 48 ساعة ✅" },
          { q: "الدفع عند الاستلام؟", a: "نعم COD متاح لجميع المدن 🇲🇦" },
        ].map((faq, i) => (
          <div key={i} className="bg-gray-50 rounded-lg p-1.5">
            <p className="text-[8px] text-gray-500" dir="rtl">❓ {faq.q}</p>
            <p className="text-[8px] text-green-700 font-medium mt-0.5" dir="rtl">🤖 {faq.a}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: Heart,
    title: "متابعة ما بعد البيع",
    description: "رسائل شكر تلقائية، طلب تقييم، وعروض ولاء — تُرسل تلقائياً بعد كل تسليم.",
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
    tag: "رضا الزبناء",
    tagBg: "bg-rose-600",
    visual: (
      <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
        <p className="text-[9px] text-gray-400 mb-2">بعد التسليم — تلقائي 🎁</p>
        <div className="bg-rose-50 border border-rose-100 rounded-lg p-2">
          <p className="text-[9px] text-gray-800 leading-relaxed" dir="rtl">
            مرحباً فاطمة! 🌸<br />
            شكراً على طلبك — وصلك بخير؟<br />
            عندنا <span className="font-bold text-rose-600">خصم 15%</span> لطلبك الجاي 🎉
          </p>
        </div>
        <div className="flex gap-2 mt-2">
          <span className="text-[8px] bg-green-50 text-green-700 font-bold px-2 py-0.5 rounded-full">👍 ممتازة</span>
          <span className="text-[8px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">مشكلة؟</span>
        </div>
      </div>
    ),
  },
];

export default function UseCases() {
  return (
    <section id="use-cases" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-4"
          >
            ⚡ حالات الاستخدام
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4"
          >
            ما يفعله البوت{" "}
            <span className="text-[#25D366]">بدلاً عنك</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            من أول رسالة يرسلها الزبون حتى تأكيد التسليم — البوت يتكلف بكل شيء.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`group relative bg-white border ${c.border} rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
              >
                {/* bg glow */}
                <div className={`absolute -bottom-8 -left-8 w-28 h-28 ${c.bg} rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500`} />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 ${c.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-5 h-5 ${c.color}`} />
                    </div>
                    <span className={`${c.tagBg} text-white text-[10px] font-bold px-2.5 py-1 rounded-full`}>
                      {c.tag}
                    </span>
                  </div>

                  <h3 className="font-bold text-gray-900 text-sm mb-1.5">{c.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4">{c.description}</p>

                  {/* Mini visual */}
                  <div className="rounded-xl overflow-hidden">
                    {c.visual}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1eb85a] text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-green-200 hover:-translate-y-0.5"
          >
            جرّب كل هذا مجاناً 14 يوم
          </a>
        </motion.div>
      </div>
    </section>
  );
}
