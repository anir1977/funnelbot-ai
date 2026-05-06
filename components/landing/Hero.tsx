"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Play,
  Star,
  TrendingUp,
  MessageCircle,
  CheckCircle,
  Zap,
  Users,
} from "lucide-react";

const chatMessages = [
  { id: 1, sender: "user", text: "مرحباً، أريد معرفة أسعار منتجاتكم", time: "10:24" },
  {
    id: 2,
    sender: "bot",
    text: "أهلاً بك! 👋 أنا مساعدك الذكي من FunnelBot.\n\nيسعدني مساعدتك. ما الذي تبحث عنه تحديداً؟",
    time: "10:24",
  },
  { id: 3, sender: "user", text: "باقة الاحترافية كم سعرها؟", time: "10:25" },
  {
    id: 4,
    sender: "bot",
    text: "🎯 الباقة الاحترافية بـ 299 ر.س/شهر فقط!\n\n✅ 10,000 رسالة شهرياً\n✅ تكامل مع المتاجر\n✅ تقارير متقدمة\n✅ دعم واتساب 24/7\n\nهل تريد البدء الآن؟ 🚀",
    time: "10:25",
  },
  { id: 5, sender: "user", text: "نعم، كيف أبدأ؟", time: "10:26" },
  {
    id: 6,
    sender: "bot",
    text: "رائع! 🎉 سأحولك الآن لفريق المبيعات لإتمام تسجيلك في أقل من 5 دقائق.",
    time: "10:26",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
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
      {/* Background blobs */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50/60 via-white to-white -z-10" />
      <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-green-100/60 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 -left-32 w-[400px] h-[400px] bg-emerald-50/80 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/3 w-[600px] h-[300px] bg-green-50/70 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* ── Text Content ── */}
          <div className="flex-1 text-center lg:text-right order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-6"
            >
              <Zap className="w-3.5 h-3.5" />
              مدعوم بأحدث تقنيات الذكاء الاصطناعي
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.15] mb-5"
            >
              حوّل{" "}
              <span className="relative inline-block">
                <span className="text-[#25D366]">واتساب</span>
                <svg
                  className="absolute -bottom-1 right-0 w-full"
                  height="6"
                  viewBox="0 0 240 6"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 4 Q60 1 120 4 Q180 7 238 4"
                    stroke="#25D366"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>{" "}
              إلى آلة{" "}
              <br className="hidden sm:block" />
              مبيعات تعمل{" "}
              <span className="text-[#25D366]">24/7</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="text-lg sm:text-xl text-gray-500 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              بوت ذكي يرد على عملائك فوراً، يجيب على أسئلتهم، ويحول المحادثات
              إلى مبيعات حقيقية —{" "}
              <strong className="text-gray-700 font-semibold">
                تلقائياً ودون تدخل منك
              </strong>
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10"
            >
              <a
                href="#pricing"
                className="group flex items-center gap-2 bg-[#25D366] hover:bg-[#1eb85a] text-white font-bold px-7 py-4 rounded-2xl text-base transition-all duration-200 shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-300 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
              >
                ابدأ تجربتك المجانية
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </a>
              <button className="flex items-center gap-3 bg-white text-gray-700 font-semibold px-6 py-4 rounded-2xl text-base border border-gray-200 hover:border-[#25D366] hover:text-[#25D366] transition-all duration-200 w-full sm:w-auto justify-center">
                <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center shadow-md">
                  <Play className="w-3.5 h-3.5 text-white fill-white" />
                </div>
                شاهد العرض
              </button>
            </motion.div>

            {/* Trust row */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-5 text-sm text-gray-500"
            >
              {/* Avatars + stars */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2 rtl:space-x-reverse">
                  {["م", "س", "أ", "ف", "ع"].map((c, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-[11px] font-bold"
                    >
                      {c}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-start">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <span>+500 عميل راضٍ</span>
                </div>
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div>
                <strong className="text-gray-800 font-bold">14 يوم</strong> تجربة مجانية
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div>
                <strong className="text-gray-800 font-bold">بدون</strong> بيانات بنكية
              </div>
            </motion.div>
          </div>

          {/* ── Phone Mockup ── */}
          <motion.div
            className="flex-1 relative flex justify-center order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Floating card — top right */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-2 lg:-right-10 z-20 glass rounded-2xl shadow-xl px-4 py-3"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-400">معدل التحويل</p>
                  <p className="font-bold text-green-600 text-sm">+34% 📈</p>
                </div>
              </div>
            </motion.div>

            {/* Floating card — bottom left */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="absolute -bottom-4 -left-2 lg:-left-10 z-20 glass rounded-2xl shadow-xl px-4 py-3"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-400">رسائل اليوم</p>
                  <p className="font-bold text-gray-800 text-sm">1,247 رسالة</p>
                </div>
              </div>
            </motion.div>

            {/* Floating chip — mid left */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute top-1/2 -translate-y-1/2 -left-2 lg:-left-14 z-20 bg-[#25D366] rounded-2xl shadow-lg px-3 py-2"
            >
              <div className="flex items-center gap-1.5 text-white">
                <CheckCircle className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold whitespace-nowrap">رد تلقائي ✓</span>
              </div>
            </motion.div>

            {/* Phone frame */}
            <div className="relative w-[270px] sm:w-[290px]">
              {/* Glow */}
              <div className="absolute inset-0 bg-[#25D366]/20 blur-3xl rounded-full scale-75" />

              <div className="relative bg-gray-900 rounded-[44px] p-[10px] shadow-2xl ring-1 ring-gray-700">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-gray-900 rounded-b-3xl z-10" />

                {/* Screen */}
                <div
                  className="bg-[#ECE5DD] rounded-[36px] overflow-hidden h-[580px] flex flex-col"
                  dir="ltr"
                >
                  {/* WA Header */}
                  <div className="bg-[#075E54] text-white pt-8 pb-3 px-4 flex items-center gap-3 shrink-0">
                    <div className="w-9 h-9 rounded-full bg-green-300 flex items-center justify-center text-base">
                      🤖
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">FunnelBot AI</p>
                      <p className="text-xs opacity-70 flex items-center gap-1">
                        <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full" />
                        متاح الآن
                      </p>
                    </div>
                    <MessageCircle className="w-5 h-5 opacity-60" />
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-hidden p-3 flex flex-col gap-2">
                    {chatMessages.map((msg, i) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, scale: 0.9, y: 6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 1 + i * 0.35, duration: 0.3 }}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[78%] px-3 py-2 rounded-2xl text-[11px] shadow-sm ${
                            msg.sender === "user"
                              ? "bg-[#DCF8C6] rounded-tr-sm"
                              : "bg-white rounded-tl-sm"
                          }`}
                          dir="rtl"
                        >
                          <p className="whitespace-pre-line leading-relaxed text-gray-800">
                            {msg.text}
                          </p>
                          <p className="text-gray-400 text-[9px] mt-0.5 text-left">{msg.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Input bar */}
                  <div className="bg-[#F0F0F0] px-3 py-2 flex items-center gap-2 shrink-0">
                    <div
                      className="flex-1 bg-white rounded-full px-4 py-2 text-[11px] text-gray-400"
                      dir="rtl"
                    >
                      اكتب رسالة...
                    </div>
                    <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-white fill-white" viewBox="0 0 24 24">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
