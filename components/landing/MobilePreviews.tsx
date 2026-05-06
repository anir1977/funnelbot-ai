"use client";

import { motion } from "framer-motion";
import { MessageCircle, BarChart3, Users, CheckCircle, TrendingUp } from "lucide-react";

const phones = [
  {
    label: "محادثة ذكية",
    desc: "بوت يرد كالإنسان",
    color: "from-green-400 to-emerald-600",
    tiltClass: "-rotate-6 lg:-rotate-3",
    zIndex: "z-10",
    content: "chat",
  },
  {
    label: "لوحة التحكم",
    desc: "إحصائيات فورية",
    color: "from-[#25D366] to-[#128C7E]",
    tiltClass: "rotate-0 scale-105",
    zIndex: "z-20",
    content: "dashboard",
  },
  {
    label: "إدارة العملاء",
    desc: "تتبع كل عميل",
    color: "from-teal-400 to-cyan-600",
    tiltClass: "rotate-6 lg:rotate-3",
    zIndex: "z-10",
    content: "contacts",
  },
];

function PhoneScreen({ content }: { content: string }) {
  if (content === "chat") {
    return (
      <div className="flex flex-col h-full bg-[#ECE5DD]" dir="ltr">
        <div className="bg-[#075E54] text-white px-3 pt-7 pb-2 flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-green-300 flex items-center justify-center text-sm">🤖</div>
          <div>
            <p className="text-xs font-semibold">FunnelBot</p>
            <p className="text-[9px] opacity-70">متاح الآن ●</p>
          </div>
        </div>
        <div className="flex-1 p-2 flex flex-col gap-1.5 overflow-hidden">
          {[
            { s: "bot", t: "أهلاً! كيف يمكنني مساعدتك؟ 👋" },
            { s: "user", t: "أريد الاستفسار عن الأسعار" },
            { s: "bot", t: "بكل سرور! 🎯\nلدينا باقات من 99 ر.س" },
            { s: "user", t: "ممتاز، سأشترك الآن" },
            { s: "bot", t: "رائع! 🎉 سأحولك الآن..." },
          ].map((m, i) => (
            <div key={i} className={`flex ${m.s === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] px-2 py-1.5 rounded-xl text-[9px] shadow-sm ${
                  m.s === "user" ? "bg-[#DCF8C6] rounded-tr-sm" : "bg-white rounded-tl-sm"
                }`}
                dir="rtl"
              >
                <p className="whitespace-pre-line">{m.t}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-[#F0F0F0] px-2 py-1.5 flex gap-1.5" dir="ltr">
          <div className="flex-1 bg-white rounded-full px-2 py-1 text-[9px] text-gray-300">رسالة...</div>
          <div className="w-6 h-6 bg-[#25D366] rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
          </div>
        </div>
      </div>
    );
  }

  if (content === "dashboard") {
    return (
      <div className="flex flex-col h-full bg-gray-50 p-2.5" dir="rtl">
        <div className="bg-[#1a1f2e] rounded-xl p-2 mb-2 flex items-center gap-1.5">
          <div className="w-5 h-5 bg-[#25D366] rounded flex items-center justify-center">
            <MessageCircle className="w-2.5 h-2.5 text-white fill-white" />
          </div>
          <span className="text-white text-[9px] font-bold">FunnelBot</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 mb-2">
          {[
            { l: "رسائل", v: "1,247", c: "text-green-600" },
            { l: "عملاء جدد", v: "84", c: "text-blue-600" },
            { l: "تحويل", v: "32%", c: "text-purple-600" },
            { l: "رد", v: "<1ث", c: "text-orange-600" },
          ].map((m) => (
            <div key={m.l} className="bg-white rounded-lg p-1.5 border border-gray-100">
              <p className="text-gray-400 text-[8px]">{m.l}</p>
              <p className={`font-black text-xs ${m.c}`}>{m.v}</p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl p-2 flex-1 border border-gray-100">
          <p className="text-[8px] text-gray-500 mb-1.5 font-semibold">نشاط الأسبوع</p>
          <div className="flex items-end gap-0.5 h-12" dir="ltr">
            {[30, 55, 40, 70, 50, 85, 65].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-gradient-to-t from-[#25D366] to-[#4ade80] rounded-t-sm"
                style={{ height: `${h}%` }}
                initial={{ scaleY: 0, originY: 1 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + i * 0.06 }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-0.5" dir="ltr">
            {["أ", "ث", "ر", "خ", "ج", "س", "ح"].map((d) => (
              <span key={d} className="text-[7px] text-gray-300 flex-1 text-center">{d}</span>
            ))}
          </div>
        </div>
        <div className="mt-2 bg-green-50 rounded-xl p-2 flex items-center gap-1.5 border border-green-100">
          <TrendingUp className="w-3 h-3 text-green-600" />
          <p className="text-[9px] text-green-700 font-semibold">+34% مقارنة بالأسبوع الماضي</p>
        </div>
      </div>
    );
  }

  // contacts
  return (
    <div className="flex flex-col h-full bg-white" dir="rtl">
      <div className="bg-[#075E54] text-white px-3 pt-7 pb-2">
        <p className="text-xs font-bold">العملاء المحتملون</p>
        <p className="text-[9px] opacity-70">84 عميل جديد هذا الشهر</p>
      </div>
      <div className="flex-1 overflow-hidden divide-y divide-gray-50">
        {[
          { n: "محمد العمري", s: "محوّل ✅", c: "text-green-600", bg: "from-green-400 to-emerald-600" },
          { n: "سارة القحطاني", s: "نشط 💬", c: "text-blue-600", bg: "from-blue-400 to-blue-600" },
          { n: "أحمد البلوشي", s: "مهتم 🔍", c: "text-yellow-600", bg: "from-yellow-400 to-orange-500" },
          { n: "فاطمة الزهراني", s: "محوّل ✅", c: "text-green-600", bg: "from-green-400 to-teal-600" },
          { n: "خالد المنصور", s: "نشط 💬", c: "text-blue-600", bg: "from-purple-400 to-purple-600" },
        ].map((c) => (
          <div key={c.n} className="flex items-center gap-2 px-3 py-2">
            <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${c.bg} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
              {c.n[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-semibold text-gray-800 truncate">{c.n}</p>
              <p className={`text-[8px] ${c.c} font-medium`}>{c.s}</p>
            </div>
            <CheckCircle className="w-3 h-3 text-gray-200" />
          </div>
        ))}
      </div>
      <div className="p-2 bg-gray-50 border-t border-gray-100">
        <div className="bg-[#25D366] rounded-lg p-2 text-center">
          <p className="text-white text-[9px] font-bold">+ إضافة عميل جديد</p>
        </div>
      </div>
    </div>
  );
}

export default function MobilePreviews() {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-4"
          >
            <Users className="w-3.5 h-3.5" />
            تجربة سلسة على الجوال
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4"
          >
            أدِر أعمالك من{" "}
            <span className="text-[#25D366]">أي مكان</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-xl mx-auto"
          >
            تطبيق متجاوب بالكامل يعمل على جميع الأجهزة دون أي تثبيت
          </motion.p>
        </div>

        {/* Phones */}
        <div className="flex items-center justify-center gap-4 lg:gap-8">
          {phones.map((phone, i) => (
            <motion.div
              key={phone.label}
              initial={{ opacity: 0, y: 40 + i * 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={`relative ${phone.tiltClass} ${phone.zIndex} transition-transform hover:scale-105 hover:rotate-0 duration-300`}
            >
              {/* Label above */}
              <div className="text-center mb-3">
                <span className={`inline-block bg-gradient-to-r ${phone.color} text-white text-xs font-bold px-3 py-1 rounded-full shadow-md`}>
                  {phone.label}
                </span>
                <p className="text-xs text-gray-400 mt-1">{phone.desc}</p>
              </div>

              {/* Phone */}
              <div className="w-[130px] sm:w-[150px] lg:w-[180px]">
                <div className="bg-gray-900 rounded-[28px] p-1.5 shadow-xl ring-1 ring-gray-700">
                  <div className="absolute top-[28px] left-1/2 -translate-x-1/2 w-14 h-3.5 bg-gray-900 rounded-b-xl z-10" />
                  <div className="bg-white rounded-[22px] overflow-hidden h-[280px] sm:h-[320px] lg:h-[380px]">
                    <PhoneScreen content={phone.content} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-14">
          {[
            "واجهة عربية بالكامل",
            "بدون تثبيت",
            "يعمل على iOS و Android",
            "تحديثات تلقائية",
            "دعم فوري",
          ].map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-gray-600 text-sm font-medium px-4 py-2 rounded-full"
            >
              <CheckCircle className="w-3.5 h-3.5 text-[#25D366]" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
