"use client";

import { motion } from "framer-motion";
import { BarChart3, MessageCircle, ShoppingBag, TrendingUp, Zap, ArrowUpRight } from "lucide-react";

const kpis = [
  {
    label: "محادثات",
    value: "1,847",
    icon: MessageCircle,
    color: "#3B82F6",
    change: "+22%",
    showArrow: true,
  },
  {
    label: "الطلبات",
    value: "423",
    icon: ShoppingBag,
    color: "#10B981",
    change: "+38%",
    showArrow: true,
  },
  {
    label: "الإيرادات",
    value: "127K",
    icon: TrendingUp,
    color: "#8B5CF6",
    change: "+31%",
    showArrow: true,
  },
  {
    label: "معدل الرد",
    value: "96%",
    icon: Zap,
    color: "#F59E0B",
    change: "يومياً",
    showArrow: false,
  },
];

const bars = [44, 62, 53, 78, 67, 91, 75, 102, 84, 118, 96, 131];
const months = ["ي", "ف", "م", "أ", "م", "ي", "ي", "أ", "س", "أ", "ن", "د"];
const maxBar = 131;

const conversations = [
  {
    name: "محمد الكرومي",
    msg: "بغيت نأكد طلب — بلوزة حمراء L",
    grad: "from-emerald-400 to-teal-500",
    t: "الآن",
    isNew: true,
  },
  {
    name: "فاطمة بن علي",
    msg: "شحال التوصيل لمراكش؟",
    grad: "from-pink-400 to-rose-500",
    t: "2 دق",
    isNew: true,
  },
  {
    name: "سلمى المنصوري",
    msg: "واش COD متاح في أكادير؟",
    grad: "from-blue-400 to-indigo-500",
    t: "8 دق",
    isNew: false,
  },
  {
    name: "يوسف الإدريسي",
    msg: "عطيني المقاسات المتوفرة",
    grad: "from-amber-400 to-orange-500",
    t: "21 دق",
    isNew: false,
  },
];

export default function Dashboard() {
  return (
    <section className="py-24 lg:py-32 bg-[#0E1010] relative overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Top radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 700,
          height: 400,
          background:
            "radial-gradient(ellipse, rgba(16,185,129,0.09) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-[#10B981] text-[13px] font-semibold tracking-wide uppercase mb-4">
            <BarChart3 className="w-4 h-4" />
            لوحة التحكم
          </span>
          <h2
            className="text-4xl lg:text-5xl font-black text-[#EDEDEA] mb-4"
            style={{ letterSpacing: "-0.035em" }}
          >
            رؤية كاملة، تحكم كامل
          </h2>
          <p className="text-[#9B9B97] text-[15px] lg:text-base max-w-xl mx-auto leading-relaxed">
            كل ما يخص متجرك في مكان واحد — طلبات، محادثات، مبيعات، في لحظتها.
          </p>
        </motion.div>

        {/* MacBook Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative mx-auto max-w-5xl"
        >
          {/* Screen frame */}
          <div className="rounded-t-2xl bg-[#2C2C2E] p-3 pb-0 shadow-2xl">
            {/* Camera dot */}
            <div className="w-1.5 h-1.5 bg-[#3A3A3C] rounded-full mx-auto mb-2" />

            {/* Inner screen area */}
            <div className="rounded-t-xl overflow-hidden">
              {/* Browser chrome */}
              <div className="bg-[#1A1A1C] flex items-center gap-3 px-4 py-3 border-b border-white/[0.05]">
                {/* Traffic lights */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
                </div>
                {/* URL bar */}
                <div className="flex-1 flex justify-center">
                  <div className="bg-white/[0.06] rounded-md px-4 py-1.5 font-inter text-[11px] text-[#9B9B97] w-64 text-center">
                    app.funnelslibrary.com/dashboard
                  </div>
                </div>
                {/* LIVE badge */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
                  </span>
                  <span className="font-inter text-[10px] text-[#10B981] font-semibold">
                    LIVE
                  </span>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="bg-[#0E1117] p-4 space-y-3">
                {/* KPI row */}
                <div className="grid grid-cols-4 gap-3">
                  {kpis.map((kpi, i) => {
                    const Icon = kpi.icon;
                    return (
                      <div
                        key={i}
                        className="bg-[#181A1B] border border-white/[0.05] rounded-xl p-4"
                      >
                        {/* Icon */}
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                          style={{ background: `${kpi.color}1A` }}
                        >
                          <Icon className="w-4 h-4" style={{ color: kpi.color }} />
                        </div>
                        {/* Value */}
                        <div
                          className="font-inter font-black text-[22px] text-[#EDEDEA] leading-none mb-1"
                          style={{ letterSpacing: "-0.03em" }}
                        >
                          {kpi.value}
                        </div>
                        {/* Label */}
                        <div className="text-[11px] text-[#9B9B97] mb-2">{kpi.label}</div>
                        {/* Change badge */}
                        <div
                          className="inline-flex items-center gap-0.5 text-[10px] font-semibold font-inter px-1.5 py-0.5 rounded-md"
                          style={{ background: "#10B9811A", color: "#10B981" }}
                        >
                          {kpi.showArrow && <ArrowUpRight className="w-2.5 h-2.5" />}
                          {kpi.change}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Chart + Conversations */}
                <div className="grid grid-cols-3 gap-3">
                  {/* Chart — col-span-2 */}
                  <div className="col-span-2 bg-[#181A1B] border border-white/[0.05] rounded-xl p-4">
                    {/* Chart header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-[13px] font-semibold text-[#EDEDEA]">
                        الإيرادات الشهرية
                      </div>
                      <div
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: "#10B9811A", color: "#10B981" }}
                      >
                        +31% هذا الشهر
                      </div>
                    </div>
                    {/* Bars */}
                    <div className="h-20 flex items-end gap-1">
                      {bars.map((val, i) => {
                        const isLast = i === bars.length - 1;
                        const isSecondLast = i === bars.length - 2;
                        const barColor = isLast
                          ? "#10B981"
                          : isSecondLast
                          ? "rgba(16,185,129,0.35)"
                          : "rgba(16,185,129,0.15)";
                        const pct = (val / maxBar) * 100;
                        return (
                          <motion.div
                            key={i}
                            className="flex-1 rounded-sm"
                            style={{
                              height: `${pct}%`,
                              background: barColor,
                              transformOrigin: "bottom",
                            }}
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.5,
                              delay: i * 0.04,
                              ease: "easeOut",
                            }}
                          />
                        );
                      })}
                    </div>
                    {/* Month labels */}
                    <div className="flex gap-1 mt-1.5">
                      {months.map((m, i) => {
                        const isLast = i === months.length - 1;
                        return (
                          <div
                            key={i}
                            className="flex-1 text-center font-inter"
                            style={{
                              fontSize: 9,
                              color: isLast ? "#10B981" : "#9B9B97",
                              fontWeight: isLast ? 700 : 400,
                            }}
                          >
                            {m}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Conversations — col-span-1 */}
                  <div className="col-span-1 bg-[#181A1B] border border-white/[0.05] rounded-xl overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between px-3 py-2.5 border-b border-white/[0.05]">
                      <div className="text-[12px] font-semibold text-[#EDEDEA]">
                        المحادثات
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-400" />
                        </span>
                        <span
                          className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                          style={{
                            background: "rgba(59,130,246,0.15)",
                            color: "#3B82F6",
                          }}
                        >
                          2 جديدة
                        </span>
                      </div>
                    </div>
                    {/* Items */}
                    <div className="divide-y divide-white/[0.04]">
                      {conversations.map((c, i) => (
                        <div key={i} className="flex items-center gap-2.5 px-3 py-2">
                          {/* Avatar */}
                          <div
                            className={`w-7 h-7 rounded-full bg-gradient-to-br ${c.grad} flex items-center justify-center shrink-0`}
                          >
                            <span className="text-white text-[11px] font-bold font-inter">
                              {c.name[0]}
                            </span>
                          </div>
                          {/* Text */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-[11px] font-semibold text-[#EDEDEA] truncate">
                                {c.name}
                              </span>
                              <span className="text-[9px] text-[#525252] font-inter shrink-0">
                                {c.t}
                              </span>
                            </div>
                            <div className="text-[10px] text-[#9B9B97] truncate">{c.msg}</div>
                          </div>
                          {/* New dot */}
                          {c.isNew && (
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Base */}
          <div className="h-5 bg-gradient-to-b from-[#303030] to-[#282828] rounded-b-2xl relative">
            {/* Notch */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-[#242424] rounded-t-sm" />
          </div>
          {/* Stand */}
          <div
            className="h-2 bg-[#242424] mx-auto rounded-b-lg"
            style={{ maxWidth: "40%" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
