"use client";

import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Star, CheckCircle, Sparkles, Phone } from "lucide-react";
import { WA_URL } from "@/lib/whatsapp";

const chatMessages = [
  { id: 1, sender: "user",  text: "السلام، شحال ثمن السيروم؟ واش التوصيل لكازا؟", time: "10:24" },
  {
    id: 2,
    sender: "bot",
    text: "مرحبا بك في متجر لونا كوسميتيك 🌿\n\nسيروم فيتامين C متوفر بثمن 149 درهم.\nالتوصيل لكازا 25 درهم والدفع عند الاستلام 🚚\n\nبغيتي نأكد لك الطلب؟",
    time: "10:24",
  },
  { id: 3, sender: "user", text: "إيه، تأكدي لي واحد", time: "10:25" },
  {
    id: 4,
    sender: "bot",
    text: "تمام! 🎉 عطيني عافاك:\n• الاسم الكامل\n• العنوان بالتفصيل\n• رقم الهاتف",
    time: "10:25",
  },
  { id: 5, sender: "user", text: "فاطمة الزهراني، حي السلام كازا، 0661234567", time: "10:26" },
  {
    id: 6,
    sender: "bot",
    text: "✅ تسجّل الطلب بنجاح!\nغادي يوصلك خلال 24-48 ساعة.\nشكراً على ثقتك في متجر لونا 💚",
    time: "10:26",
  },
];

const floatingCards = [
  {
    icon: "📦",
    label: "طلب جديد",
    value: "كل 3 دقائق",
    bg: "bg-white",
    pos: "-top-6 -right-2 lg:-right-10",
    delay: 0,
    duration: 3.2,
  },
  {
    icon: "💰",
    label: "مبيعات اليوم",
    value: "4,350 درهم",
    bg: "bg-white",
    pos: "-bottom-4 -left-2 lg:-left-10",
    delay: 0.8,
    duration: 4,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-20 pb-16 lg:pt-28 lg:pb-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50/70 via-white to-white -z-10" />
      <div className="absolute -top-32 -right-32 w-[520px] h-[520px] bg-green-100/50 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 -left-40 w-[420px] h-[420px] bg-emerald-50/80 rounded-full blur-3xl -z-10" />

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

          {/* ── Text Content ── */}
          <div className="flex-1 text-center lg:text-right order-2 lg:order-1">

            {/* Badge */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={0}
              className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" />
              مخصص لأصحاب المتاجر في المغرب
              <span className="flex h-2 w-2 relative ms-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp} initial="hidden" animate="show" custom={1}
              className="text-4xl sm:text-5xl lg:text-[3.4rem] font-black text-gray-900 leading-[1.15] mb-5"
            >
              حوّل واتساب متجرك{" "}
              <br className="hidden sm:block" />
              إلى{" "}
              <span className="relative inline-block">
                <span className="text-[#25D366]">مساعد مبيعات</span>
                <svg className="absolute -bottom-1 right-0 w-full" height="5" viewBox="0 0 300 5" fill="none" preserveAspectRatio="none">
                  <path d="M2 3.5 Q75 1 150 3.5 Q225 6 298 3.5" stroke="#25D366" strokeWidth="3" strokeLinecap="round" fill="none" />
                </svg>
              </span>{" "}
              ذكي
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp} initial="hidden" animate="show" custom={2}
              className="text-lg sm:text-xl text-gray-500 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              منصة تساعد أصحاب المتاجر الإلكترونية في المغرب على الرد على الزبناء،
              عرض الأسعار، تأكيد الطلبات، ومعلومات التوصيل —{" "}
              <strong className="text-gray-700 font-semibold">
                بشكل تلقائي واحترافي.
              </strong>
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={3}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10"
            >
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 bg-[#25D366] hover:bg-[#1eb85a] text-white font-bold px-7 py-4 rounded-2xl text-base transition-all duration-200 shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-300 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
              >
                جرّب العرض التوضيحي
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </a>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-white text-gray-700 font-semibold px-6 py-4 rounded-2xl text-base border border-gray-200 hover:border-[#25D366] hover:text-[#25D366] transition-all duration-200 w-full sm:w-auto justify-center"
              >
                <Phone className="w-4 h-4" />
                تواصل معنا
              </a>
            </motion.div>

            {/* Trust row */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={4}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-5 text-sm text-gray-500"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2 rtl:space-x-reverse">
                  {["ف", "ي", "س", "م", "ن"].map((c, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-[11px] font-bold">
                      {c}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-start">
                  <div className="flex">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <span>+1,200 متجر مغربي</span>
                </div>
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>14 يوم مجاناً</span>
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>بدون إلتزام</span>
              </div>
            </motion.div>
          </div>

          {/* ── Phone Mockup ── */}
          <motion.div
            className="flex-1 relative flex justify-center order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Floating cards */}
            {floatingCards.map((card) => (
              <motion.div
                key={card.label}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: card.duration, repeat: Infinity, ease: "easeInOut", delay: card.delay }}
                className={`absolute ${card.pos} z-20 ${card.bg} glass rounded-2xl shadow-xl px-4 py-3`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{card.icon}</span>
                  <div>
                    <p className="text-[11px] text-gray-400">{card.label}</p>
                    <p className="font-bold text-gray-800 text-sm">{card.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Status chip */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute top-1/2 -translate-y-1/2 -left-2 lg:-left-12 z-20 bg-[#25D366] rounded-2xl shadow-lg px-3 py-2"
            >
              <div className="flex items-center gap-1.5 text-white">
                <CheckCircle className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold whitespace-nowrap">طلب مؤكد ✓</span>
              </div>
            </motion.div>

            {/* Phone frame */}
            <div className="relative w-[272px] sm:w-[292px]">
              <div className="absolute inset-0 bg-[#25D366]/15 blur-3xl rounded-full scale-75" />

              <div className="relative bg-gray-900 rounded-[44px] p-[10px] shadow-2xl ring-1 ring-gray-700/60">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-gray-900 rounded-b-3xl z-10" />

                {/* Screen */}
                <div className="bg-[#ECE5DD] rounded-[36px] overflow-hidden h-[590px] flex flex-col" dir="ltr">

                  {/* WA Header */}
                  <div className="bg-[#075E54] text-white pt-8 pb-3 px-4 flex items-center gap-3 shrink-0">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-300 to-emerald-500 flex items-center justify-center text-base font-bold">ل</div>
                    <div className="flex-1">
                      <p className="font-bold text-sm">متجر لونا كوسميتيك</p>
                      <p className="text-xs opacity-75 flex items-center gap-1">
                        <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full" />
                        يرد تلقائياً دائماً
                      </p>
                    </div>
                    <MessageCircle className="w-5 h-5 opacity-60" />
                  </div>

                  {/* Date badge */}
                  <div className="flex justify-center pt-3 pb-1">
                    <span className="bg-black/10 text-gray-600 text-[9px] px-3 py-0.5 rounded-full">اليوم</span>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-hidden px-2.5 pb-2 flex flex-col gap-1.5">
                    {chatMessages.map((msg, i) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, scale: 0.9, y: 6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.8 + i * 0.38, duration: 0.3 }}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] px-3 py-2 rounded-2xl text-[10.5px] shadow-sm leading-relaxed ${
                            msg.sender === "user"
                              ? "bg-[#DCF8C6] rounded-tr-sm"
                              : "bg-white rounded-tl-sm"
                          }`}
                          dir="rtl"
                        >
                          <p className="whitespace-pre-line text-gray-800">{msg.text}</p>
                          <p className="text-gray-400 text-[9px] mt-0.5 text-left">{msg.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Input bar */}
                  <div className="bg-[#F0F0F0] px-2.5 py-2 flex items-center gap-2 shrink-0">
                    <div className="flex-1 bg-white rounded-full px-4 py-2 text-[10px] text-gray-400" dir="rtl">
                      اكتب رسالة...
                    </div>
                    <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Store label */}
              <div className="text-center mt-4">
                <span className="inline-flex items-center gap-1.5 bg-green-50 border border-green-100 text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full">
                  🌿 متجر لونا كوسميتيك — مثال حقيقي
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
