"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, ShieldCheck, Zap, Star } from "lucide-react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] } }),
};

/* ── mini dashboard mockup shown in hero ── */
function DashboardMockup() {
  const bars = [38, 55, 42, 70, 58, 88, 63, 95, 74, 107, 84, 124];
  const max  = Math.max(...bars);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0E1117] shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
      {/* Browser bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#161B27] border-b border-white/[0.06]">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 mx-3 bg-white/5 rounded-md px-3 py-1 text-[10px] text-gray-500 font-inter text-center">
          app.funnelslibrary.com/dashboard
        </div>
      </div>

      {/* Dashboard content */}
      <div className="flex h-[340px] lg:h-[400px]">
        {/* Sidebar */}
        <div className="w-14 bg-[#0E1117] border-r border-white/[0.04] flex flex-col items-center py-4 gap-3">
          <div className="w-8 h-8 bg-[#25D366] rounded-lg flex items-center justify-center mb-2 shadow-glow">
            <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          {[
            "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
            "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4",
            "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
            "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
          ].map((d, i) => (
            <div key={i} className={`w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer transition-colors ${i === 0 ? "bg-[#25D366]/15" : "hover:bg-white/5"}`}>
              <svg className={`w-4 h-4 ${i === 0 ? "text-[#25D366]" : "text-gray-600"}`} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={d} />
              </svg>
            </div>
          ))}
        </div>

        {/* Main area */}
        <div className="flex-1 overflow-hidden p-4 space-y-3">
          {/* KPI row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "المحادثات", value: "1,247", color: "#3B82F6" },
              { label: "طلبات مؤكدة", value: "284",   color: "#25D366" },
              { label: "الإيرادات",   value: "84K د",  color: "#8B5CF6" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3">
                <p className="text-[9px] text-gray-500 mb-1">{label}</p>
                <p className="text-sm font-black font-inter" style={{ color }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[9px] text-gray-400">الإيرادات الشهرية</p>
              <span className="text-[8px] text-[#25D366] font-bold bg-[#25D366]/10 px-1.5 py-0.5 rounded">+29%</span>
            </div>
            <div className="flex items-end gap-1 h-14" dir="ltr">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm transition-all"
                  style={{
                    height: `${(h / max) * 100}%`,
                    backgroundColor: i === bars.length - 1 ? "#25D366" : "rgba(37,211,102,0.2)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Conversations list */}
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.04]">
              <p className="text-[9px] text-gray-400">آخر المحادثات</p>
              <span className="text-[8px] bg-blue-500 text-white px-1.5 py-0.5 rounded-full">3 جديدة</span>
            </div>
            {[
              { name: "محمد ق.",    msg: "بغيت نأكد الطلب — بلو دي شانيل", color: "from-emerald-400 to-teal-500",  dot: "#3B82F6" },
              { name: "فاطمة ب.",   msg: "شحال التوصيل لكازا؟",              color: "from-pink-400 to-rose-500",    dot: "#25D366" },
              { name: "سلمى م.",    msg: "واش الدفع عند الاستلام متاح؟",     color: "from-blue-400 to-indigo-500",  dot: "#3B82F6" },
            ].map((c) => (
              <div key={c.name} className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.03] last:border-0">
                <div className="relative shrink-0">
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-white text-[8px] font-bold`}>
                    {c.name[0]}
                  </div>
                  <span className="absolute -top-px -right-px w-2 h-2 rounded-full border border-[#0E1117]" style={{ backgroundColor: c.dot }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-semibold text-gray-300">{c.name}</p>
                  <p className="text-[8px] text-gray-600 truncate">{c.msg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-white/[0.06]" />
    </div>
  );
}

/* ── floating notification ── */
function FloatingCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute bg-white rounded-2xl shadow-card-lg border border-gray-100 p-3 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#FAFAFA] pt-20 pb-12">

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='%23000000' fill-opacity='0.025'%3E%3Cpath d='M0 0h1v40H0zm40 0v1H0V0z'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#25D366]/6 rounded-full blur-[120px] pointer-events-none -translate-y-1/4 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none translate-y-1/4 -translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: text */}
          <div className="text-center lg:text-right order-2 lg:order-1">

            {/* Badge */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={0}
              className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 mb-8 shadow-card"
            >
              <span className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-700">
                <Sparkles className="w-3.5 h-3.5 text-[#25D366]" />
                بوت واتساب بالذكاء الاصطناعي للمتاجر المغربية
              </span>
              <span className="bg-[#25D366] text-white text-[10px] font-black px-2 py-0.5 rounded-full">جديد</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp} initial="hidden" animate="show" custom={1}
              className="text-4xl sm:text-5xl lg:text-[58px] font-black leading-[1.1] tracking-tight text-gray-900 mb-6"
            >
              بيع أكثر على{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#25D366]">واتساب</span>
                <svg className="absolute -bottom-1 left-0 right-0 w-full" height="6" viewBox="0 0 100 6" preserveAspectRatio="none">
                  <path d="M0 5 Q50 0 100 5" stroke="#25D366" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.4" />
                </svg>
              </span>
              {" "}بدون ما تضيع الوقت
            </motion.h1>

            {/* Subhead */}
            <motion.p
              variants={fadeUp} initial="hidden" animate="show" custom={2}
              className="text-lg text-gray-500 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              بوت ذكي يرد على الزبناء، يعرض الأسعار، يأكد الطلبات COD، ويجمع المعلومات —{" "}
              <strong className="text-gray-700 font-semibold">24/7 بدون توقف</strong>.
            </motion.p>

            {/* CTA group */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={3}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-10"
            >
              <Link
                href="/signup"
                className="group flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-6 py-3.5 rounded-xl text-[15px] transition-all duration-200 shadow-[0_4px_24px_rgba(37,211,102,0.35)] hover:shadow-[0_8px_32px_rgba(37,211,102,0.45)] hover:-translate-y-0.5 w-full sm:w-auto justify-center"
              >
                ابدأ مجاناً 14 يوم
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </Link>
              <a
                href="/#how-it-works"
                className="flex items-center gap-2 text-[15px] font-semibold text-gray-600 hover:text-gray-900 px-5 py-3.5 rounded-xl border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 transition-all duration-150 w-full sm:w-auto justify-center shadow-sm"
              >
                شوف كيف يشتغل
              </a>
            </motion.div>

            {/* Trust row */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={4}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-5 text-sm text-gray-500"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#25D366]" />
                بدون بيانات بنكية
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#25D366]" />
                إعداد في 5 دقائق
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-[#25D366]" fill="#25D366" />
                <span>
                  <strong className="text-gray-900 font-semibold">4.9</strong>
                  {" "}من 1,200+ متجر
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right: mockup */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 lg:order-2"
          >
            {/* Glow behind mockup */}
            <div className="absolute inset-0 bg-[#25D366]/10 blur-3xl rounded-3xl scale-90 pointer-events-none" />

            <DashboardMockup />

            {/* Floating: order confirmed */}
            <FloatingCard className="-top-5 -right-4 lg:-right-10 flex items-center gap-3 pr-4">
              <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-lg">✅</span>
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-900 leading-none">طلب مؤكد COD</p>
                <p className="text-[10px] text-gray-500 mt-0.5">#FL-2847 · الرباط</p>
              </div>
            </FloatingCard>

            {/* Floating: revenue */}
            <FloatingCard className="-bottom-5 -left-4 lg:-left-10 flex items-center gap-3 pr-4">
              <div className="w-9 h-9 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-lg">💰</span>
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-900 leading-none">مبيعات اليوم</p>
                <p className="text-[10px] text-[#25D366] font-black mt-0.5">+6,840 درهم</p>
              </div>
            </FloatingCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
