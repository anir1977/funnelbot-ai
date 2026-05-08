"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    store: "عطور الريم — الدار البيضاء",
    avatar: "أ",
    name: "أمينة الحسناوي",
    role: "صاحبة متجر عطور",
    color: "from-pink-400 to-rose-500",
    metrics: "+60% مبيعات في أول شهر",
    metricsColor: "#25D366",
    chat: [
      { from: "bot",  text: "أهلاً! كيف نقدر نساعدك؟ 🌹" },
      { from: "user", text: "واش عندكم عطر بلو دي شانيل أصلي؟" },
      { from: "bot",  text: "آه عندنا! 100مل بـ 890 درهم، مع تغليف هدية مجاني 🎁" },
      { from: "user", text: "ممتاز! بغيت نأكد الطلب للرباط" },
      { from: "bot",  text: "✅ طلبك تأكد! التوصيل غداً خلال 24 ساعة" },
    ],
    quote: "قبل كنت نقضي 4 ساعات في اليوم على واتساب. دابا البوت كيجاوب على كل شيء والمبيعات زادت 60%!",
  },
  {
    store: "مود كازا — الرباط",
    avatar: "ي",
    name: "يوسف الإدريسي",
    role: "بائع ملابس أونلاين",
    color: "from-blue-400 to-indigo-500",
    metrics: "85% نسبة تأكيد الطلبات",
    metricsColor: "#3B82F6",
    chat: [
      { from: "user", text: "سلام، عندكم جاكيت جلد أصلي؟" },
      { from: "bot",  text: "سلام! آه عندنا جاكيت جلد طبيعي — M وL وXL 🧥 السعر 750 درهم" },
      { from: "user", text: "بغيت L، والتوصيل لكازا؟" },
      { from: "bot",  text: "التوصيل 30 درهم، المجموع 780 درهم. واش تأكد؟" },
      { from: "user", text: "مؤكد! اسمي يوسف، عنواني حي المعاريف" },
      { from: "bot",  text: "✅ شكراً يوسف! طلبك رقم #MC-1183 تأكد 🎉" },
    ],
    quote: "الزبناء ما كيعرفوش واش هم كيحضوا مع بوت أو إنسان. ونسبة تأكيد الطلبات وصلات 85%!",
  },
  {
    store: "فيتنس ماروك — فاس",
    avatar: "س",
    name: "سارة بنعلي",
    role: "إدارة متجر رياضة",
    color: "from-emerald-400 to-teal-500",
    metrics: "إعداد في أقل من 10 دقائق",
    metricsColor: "#8B5CF6",
    chat: [
      { from: "user", text: "صباح الخير، شحال سعر الكرسي الرياضي؟" },
      { from: "bot",  text: "صباح النور! الكرسي المريح بـ 1,250 درهم 💪 مع ضمان سنة" },
      { from: "user", text: "ممتاز! واش التوصيل لفاس مجاني؟" },
      { from: "bot",  text: "التوصيل 50 درهم لفاس. المجموع 1,300 درهم. نأكد؟" },
      { from: "user", text: "آه بالله، اسمي سارة والعنوان حي سيدي بومدين" },
      { from: "bot",  text: "✅ طلبك #FM-0447 تأكد! التوصيل خلال 48 ساعة 🚚" },
    ],
    quote: "الإعداد ما أخذش حتى 10 دقائق. الدعم رد علي بالدارجة وحل كل مشكلاتي. الآن البوت يشتغل بدالي وأنا مرتاحة.",
  },
];

function PhoneChat({ chat }: { chat: typeof testimonials[0]["chat"] }) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: "#0B141A" }}
    >
      {/* Mini WA header */}
      <div className="bg-[#1F2C33] px-3 py-2 flex items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#25D366] to-emerald-700 flex items-center justify-center text-white text-[8px] font-black shrink-0">
          F
        </div>
        <div>
          <p className="text-[10px] font-semibold text-white leading-none">FunnelsLibrary Bot</p>
          <p className="text-[8px] text-[#25D366]">يرد تلقائياً</p>
        </div>
      </div>

      {/* Messages */}
      <div
        dir="ltr"
        className="px-2.5 py-2 space-y-1.5"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Ccircle cx='1' cy='1' r='0.8' fill='%23ffffff' fill-opacity='0.01'/%3E%3C/svg%3E\")",
        }}
      >
        {chat.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.3 }}
            className={`flex ${msg.from === "bot" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[88%] px-2.5 py-1.5 text-[10px] leading-relaxed ${
                msg.from === "bot"
                  ? "bg-[#005C4B] text-white rounded-2xl rounded-br-sm"
                  : "bg-[#202C33] text-gray-300 rounded-2xl rounded-bl-sm"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 text-xs font-bold text-gray-600 mb-5">
            <Star className="w-3.5 h-3.5 text-[#25D366]" fill="#25D366" />
            آراء العملاء
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight"
            style={{ letterSpacing: "-0.025em" }}
          >
            أصحاب متاجر حقيقيون
            <br />
            <span className="text-[#25D366]">نتائج حقيقية</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4.5 h-4.5 text-amber-400" fill="#FBBF24" />
              ))}
            </div>
            <span className="text-[13px] text-gray-500 font-medium">
              4.9 من 5 · بناءً على +1,200 تقييم
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col rounded-2xl border border-gray-100 overflow-hidden shadow-card hover:shadow-card-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Store header */}
              <div className="bg-[#075E54] px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                    {t.avatar}
                  </div>
                  <p className="text-[11px] font-semibold text-white/90 leading-none">{t.store}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                  <span className="text-[9px] text-[#25D366]">نشط</span>
                </div>
              </div>

              {/* Chat preview */}
              <div className="p-3 bg-gray-50">
                <PhoneChat chat={t.chat} />
              </div>

              {/* Testimonial body */}
              <div className="p-5 flex flex-col flex-1 bg-white">
                {/* Stars */}
                <div className="flex mb-3">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} className="w-3.5 h-3.5 text-amber-400" fill="#FBBF24" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[13.5px] text-gray-600 leading-relaxed flex-1 mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Metric */}
                <div
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-lg mb-4 w-fit"
                  style={{ background: `${t.metricsColor}12`, color: t.metricsColor }}
                >
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                  {t.metrics}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-[12px] font-bold shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-gray-900 leading-none">{t.name}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
