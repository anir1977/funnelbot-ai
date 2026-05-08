"use client";

import { motion } from "framer-motion";
import { BarChart3, MessageCircle, ShoppingBag, TrendingUp, Zap, ArrowUpRight } from "lucide-react";

const bars = [44, 62, 53, 78, 67, 91, 75, 102, 84, 118, 96, 131];
const maxBar = Math.max(...bars);
const months = ["ي", "ف", "م", "أ", "م", "ي", "ي", "أ", "س", "أ", "ن", "د"];

const kpis = [
  { label: "المحادثات",  value: "1,847", icon: MessageCircle, color: "#3B82F6", change: "+22%",  up: true },
  { label: "الطلبات",   value: "423",   icon: ShoppingBag,   color: "#25D366", change: "+38%",  up: true },
  { label: "الإيرادات", value: "127K",  icon: TrendingUp,    color: "#8B5CF6", change: "+31%",  up: true },
  { label: "معدل الرد", value: "96%",   icon: Zap,           color: "#F59E0B", change: "يومياً", up: true },
];

const conversations = [
  { name: "محمد الكرومي",  msg: "بغيت نأكد طلب — بلوزة حمراء L",  grad: "from-emerald-400 to-teal-500",   t: "الآن",  dot: "#25D366", new: true  },
  { name: "فاطمة بن علي", msg: "شحال التوصيل لمراكش؟",              grad: "from-pink-400 to-rose-500",      t: "2 دق",  dot: "#3B82F6", new: true  },
  { name: "سلمى المنصوري",msg: "واش COD متاح في أكادير؟",           grad: "from-blue-400 to-indigo-500",    t: "8 دق",  dot: "#25D366", new: false },
  { name: "يوسف الإدريسي", msg: "عطيني المقاسات المتوفرة",           grad: "from-amber-400 to-orange-500",   t: "21 دق", dot: "#6B7280", new: false },
];

export default function Dashboard() {
  return (
    <section className="py-20 lg:py-28 bg-[#0A0D14] relative overflow-hidden">
      {/* Grid bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M0 0h1v40H0zm40 0v1H0V0z'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />
      {/* Glow orb */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[360px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top, rgba(37,211,102,0.09) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-full px-4 py-1.5 text-xs font-bold text-gray-400 mb-5">
            <BarChart3 className="w-3.5 h-3.5 text-[#25D366]" />
            لوحة التحكم
            <span className="flex items-center gap-1.5 bg-[#25D366]/15 border border-[#25D366]/25 text-[#25D366] text-[9px] font-black px-2 py-0.5 rounded-full mr-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
              LIVE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight" style={{ letterSpacing: "-0.025em" }}>
            كل شيء في مكان واحد
          </h2>
          <p className="text-white/38 text-[16px] max-w-xl mx-auto leading-relaxed">
            لوحة تحكم احترافية تعطيك رؤية كاملة على مبيعاتك، محادثاتك، وطلباتك — في لحظتها.
          </p>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0 -z-10 rounded-3xl scale-[0.92] blur-3xl"
            style={{ background: "radial-gradient(ellipse, rgba(37,211,102,0.12) 0%, transparent 70%)" }}
          />

          <div
            className="relative bg-[#0E1117] rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 32px 80px rgba(0,0,0,0.7)" }}
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-3 px-5 py-3.5 bg-[#161B27] border-b border-white/[0.05]">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <span className="w-3 h-3 rounded-full bg-[#28CA41]" />
              </div>
              <div className="flex-1 mx-3 bg-white/[0.04] rounded-md px-4 py-1.5 text-[11px] text-gray-500 font-inter text-center border border-white/[0.04]">
                app.funnelslibrary.com/dashboard
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                <span className="text-[10px] text-[#25D366] font-inter font-medium">Live</span>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-5 space-y-4">

              {/* KPIs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {kpis.map(({ label, value, icon: Icon, color, change }, idx) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.07, duration: 0.5 }}
                    className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-4 hover:bg-white/[0.05] transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${color}18`, border: `1px solid ${color}22` }}
                      >
                        <Icon className="w-4 h-4" style={{ color }} />
                      </div>
                      <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-400 font-inter">
                        <ArrowUpRight className="w-3 h-3" />
                        {change}
                      </span>
                    </div>
                    <p className="text-[24px] font-black text-white font-inter leading-none">{value}</p>
                    <p className="text-[11px] text-white/35 mt-1.5">{label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Chart + Conversations */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

                {/* Bar Chart */}
                <div className="lg:col-span-2 bg-white/[0.03] border border-white/[0.05] rounded-xl p-5">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h4 className="text-[13px] font-bold text-white">الإيرادات الشهرية</h4>
                      <p className="text-[10px] text-white/30 mt-0.5 font-inter">2025 · بالدرهم المغربي</p>
                    </div>
                    <span className="text-[11px] text-[#25D366] font-bold bg-[#25D366]/10 border border-[#25D366]/20 px-2.5 py-1 rounded-lg font-inter">
                      +31% هذا الشهر
                    </span>
                  </div>
                  <div className="flex items-end gap-1.5 h-24 mb-2" dir="ltr">
                    {bars.map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.04 + 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                          originY: 1,
                          height: `${(h / maxBar) * 100}%`,
                          backgroundColor:
                            i === bars.length - 1
                              ? "#25D366"
                              : i === bars.length - 2
                              ? "rgba(37,211,102,0.35)"
                              : "rgba(37,211,102,0.15)",
                          borderRadius: "3px 3px 2px 2px",
                        }}
                        className="flex-1 cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    ))}
                  </div>
                  <div className="flex gap-1.5" dir="ltr">
                    {months.map((m, i) => (
                      <div
                        key={i}
                        className={`flex-1 text-center text-[9px] font-inter ${
                          i === months.length - 1
                            ? "text-[#25D366] font-bold"
                            : i === months.length - 2
                            ? "text-white/40"
                            : "text-white/20"
                        }`}
                      >
                        {m}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conversations */}
                <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.04]">
                    <span className="text-[12px] font-bold text-white">المحادثات</span>
                    <motion.span
                      animate={{ opacity: [1, 0.6, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-[9px] bg-blue-500 text-white px-2 py-0.5 rounded-full font-bold"
                    >
                      2 جديدة
                    </motion.span>
                  </div>
                  <div className="divide-y divide-white/[0.03]">
                    {conversations.map((c) => (
                      <div
                        key={c.name}
                        className="flex items-center gap-2.5 px-3.5 py-2.5 hover:bg-white/[0.03] transition-colors duration-150 cursor-pointer"
                      >
                        <div className="relative shrink-0">
                          <div
                            className={`w-7 h-7 rounded-full bg-gradient-to-br ${c.grad} flex items-center justify-center text-white text-[10px] font-bold`}
                          >
                            {c.name[0]}
                          </div>
                          <span
                            className="absolute -bottom-px -right-px w-2 h-2 rounded-full border-[1.5px] border-[#0E1117]"
                            style={{ backgroundColor: c.dot }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p className="text-[11px] font-semibold text-gray-200 truncate">{c.name}</p>
                            {c.new && (
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                            )}
                          </div>
                          <p className="text-[10px] text-white/30 truncate mt-0.5">{c.msg}</p>
                        </div>
                        <span className="text-[9px] text-white/25 shrink-0 font-inter">{c.t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
