"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const stores = [
  {
    name: "ملابس كلاسيك 👗",
    type: "ملابس",
    city: "الدار البيضاء",
    tilt: "-rotate-6 lg:-rotate-3",
    zIndex: "z-10",
    gradient: "from-[#25D366] to-[#128C7E]",
    headerGradient: "from-emerald-400 to-teal-600",
    headerInitial: "م",
    conversation: [
      { s: "user", t: "السلام، واش عندكم جلابة كازاوية بالبيج؟ شحال ثمنها؟" },
      { s: "bot",  t: "وعليكم السلام! 👗\nالجلابة الكازاوية بيج:\n• M — 320 درهم\n• L — 320 درهم\n• XL — 340 درهم\nالتوصيل لكازا 20 درهم 🚚\nالدفع عند الاستلام ✅" },
      { s: "user", t: "L من فضلك" },
      { s: "bot",  t: "ممتاز! 🎉 عطيني:\n• الاسم والعنوان\n• رقم الهاتف\nجاي ليك في 48 ساعة!" },
    ],
  },
  {
    name: "عطور الريم 🌸",
    type: "عطور",
    city: "الرباط",
    tilt: "rotate-0 scale-105",
    zIndex: "z-20",
    gradient: "from-amber-400 to-orange-500",
    headerGradient: "from-amber-300 to-amber-500",
    headerInitial: "ع",
    conversation: [
      { s: "user", t: "السلام، واش عندكم بلو دي شانيل 100ml أصلي؟" },
      { s: "bot",  t: "وعليكم السلام! 🌸\nبلو دي شانيل أصلي 100%:\n100ml — 640 درهم\nالتوصيل للرباط 30 درهم\nالدفع عند الاستلام ✅\nتبغي تكد؟" },
      { s: "user", t: "إيه — أنا فحي أكدال" },
      { s: "bot",  t: "✅ #FL-2847 تسجّل!\nالإجمالي: 670 درهم COD\nعطيني اسمك ورقم هاتفك 📝" },
    ],
  },
  {
    name: "فيت ستور 💪",
    type: "مكملات",
    city: "أكادير",
    tilt: "rotate-6 lg:rotate-3",
    zIndex: "z-10",
    gradient: "from-blue-500 to-indigo-600",
    headerGradient: "from-blue-400 to-indigo-600",
    headerInitial: "ف",
    conversation: [
      { s: "user", t: "السلام، واش عندكم ويي بروتين؟ شحال 1kg؟" },
      { s: "bot",  t: "أهلاً! 💪\nWhey Protein 1kg:\n🍫 شوكولاتة — 280 درهم\n🍦 فانيليا — 280 درهم\n🍓 فراولة — 280 درهم\nالتوصيل لأكادير 35 درهم\nالدفع عند الاستلام ✅" },
      { s: "user", t: "بغيت شوكولاتة" },
      { s: "bot",  t: "اختيار ممتاز! 🎉\n315 درهم (الدفع عند الاستلام)\nعطيني اسمك وعنوانك 📦" },
    ],
  },
];

function PhoneChat({ store }: { store: typeof stores[0] }) {
  return (
    <div className="flex flex-col h-full bg-[#ECE5DD]" dir="ltr">
      <div className="bg-[#075E54] text-white px-3 pt-7 pb-2.5 flex items-center gap-2 shrink-0">
        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${store.headerGradient} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
          {store.headerInitial}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold leading-tight truncate">{store.name}</p>
          <p className="text-[8px] opacity-70 flex items-center gap-1">
            <span className="inline-block w-1 h-1 bg-green-400 rounded-full" />يرد تلقائياً دائماً
          </p>
        </div>
      </div>

      <div className="flex justify-center pt-2">
        <span className="bg-black/10 text-gray-600 text-[8px] px-2 py-0.5 rounded-full">اليوم</span>
      </div>

      <div className="flex-1 overflow-hidden px-2 py-1.5 flex flex-col gap-1.5">
        {store.conversation.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.25 }}
            className={`flex ${msg.s === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[84%] px-2.5 py-1.5 rounded-2xl text-[9px] shadow-sm leading-relaxed ${
                msg.s === "user" ? "bg-[#DCF8C6] rounded-tr-sm" : "bg-white rounded-tl-sm"
              }`}
              dir="rtl"
            >
              <p className="whitespace-pre-line text-gray-800">{msg.t}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-[#F0F0F0] px-2 py-1.5 flex gap-1.5 shrink-0">
        <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-[8px] text-gray-300" dir="rtl">رسالة...</div>
        <div className="w-6 h-6 bg-[#25D366] rounded-full flex items-center justify-center shrink-0">
          <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
        </div>
      </div>
    </div>
  );
}

export default function MobilePreviews() {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-4"
          >
            🛍️ أمثلة حقيقية من المغرب
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4"
          >
            يتكيّف مع{" "}
            <span className="text-[#25D366]">كل نوع متجر</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-xl mx-auto"
          >
            ملابس، عطور، مكملات، إلكترونيات — البوت يتعلم أسلوب متجرك ويرد
            كأنه أحد فريقك.
          </motion.p>
        </div>

        {/* Phones */}
        <div className="flex items-end justify-center gap-3 lg:gap-6">
          {stores.map((store, i) => (
            <motion.div
              key={store.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`relative ${store.tilt} ${store.zIndex} hover:rotate-0 hover:scale-105 transition-all duration-400`}
            >
              {/* City + type badge */}
              <div className="text-center mb-3 space-y-1">
                <span className={`inline-block bg-gradient-to-r ${store.gradient} text-white text-[10px] font-bold px-3 py-1 rounded-full shadow`}>
                  {store.type}
                </span>
                <p className="text-[9px] text-gray-400 font-medium">{store.city}</p>
              </div>

              <div className="w-[120px] sm:w-[140px] lg:w-[165px]">
                <div className="bg-gray-900 rounded-[26px] p-[7px] shadow-xl ring-1 ring-gray-700/60 relative">
                  <div className="absolute top-[7px] left-1/2 -translate-x-1/2 w-12 h-3 bg-gray-900 rounded-b-xl z-10" />
                  <div className="bg-white rounded-[20px] overflow-hidden h-[260px] sm:h-[300px] lg:h-[360px]">
                    <PhoneChat store={store} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Also available label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mt-10"
        >
          <p className="w-full text-center text-sm text-gray-400 mb-2">يشتغل كذلك مع:</p>
          {["إلكترونيات", "حلويات وكيك", "زيت أركان وصابون بلدي", "أثاث ومفروشات", "ألعاب أطفال", "حقائب وأحذية"].map((tag) => (
            <span key={tag} className="bg-gray-50 border border-gray-200 text-gray-500 text-xs font-medium px-3 py-1.5 rounded-full">
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Checklist */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {["يفهم الدارجة والعربية", "COD مدعوم بالكامل", "يعمل 24/7 بدون توقف", "قوالب جاهزة لكل متجر", "إعداد في 10 دقائق"].map((tag) => (
            <span key={tag} className="flex items-center gap-1.5 bg-green-50 border border-green-100 text-green-700 text-sm font-medium px-4 py-2 rounded-full">
              <CheckCircle className="w-3.5 h-3.5 text-[#25D366]" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
