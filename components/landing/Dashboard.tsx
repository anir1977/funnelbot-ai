"use client";

import { motion } from "framer-motion";
import { BarChart3, MessageCircle, ShoppingBag, TrendingUp, Zap, ArrowUpRight } from "lucide-react";

const bars = [42, 58, 51, 74, 63, 88, 72, 95, 80, 107, 91, 124];
const maxBar = Math.max(...bars);
const months = ["ي","ف","م","أ","م","ي","ي","أ","س","أ","ن","د"];

const kpis = [
  { label: "المحادثات",   value: "1,247", icon: MessageCircle, color: "#3B82F6", change: "+18%" },
  { label: "الطلبات",     value: "284",   icon: ShoppingBag,   color: "#25D366", change: "+34%" },
  { label: "الإيرادات",  value: "84K",   icon: TrendingUp,    color: "#8B5CF6", change: "+29%" },
  { label: "معدل الرد",  value: "96%",   icon: Zap,           color: "#F59E0B", change: "يومياً" },
];

export default function Dashboard() {
  return (
    <section className="py-20 lg:py-28 bg-[#0A0D14] relative overflow-hidden">
      {/* Grid bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-100"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='%23ffffff' fill-opacity='0.025'%3E%3Cpath d='M0 0h1v40H0zm40 0v1H0V0z'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#25D366]/10 blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-full px-4 py-1.5 text-xs font-bold text-gray-400 mb-5">
            <BarChart3 className="w-3.5 h-3.5 text-[#25D366]" />
            لوحة التحكم
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
            كل شيء في مكان واحد
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            لوحة تحكم احترافية تعطيك رؤية كاملة على مبيعاتك، محادثاتك، وطلباتك — في لحظتها.
          </p>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Glow */}
          <div className="absolute inset-0 bg-[#25D366]/10 blur-3xl rounded-3xl scale-95 pointer-events-none" />

          <div className="relative bg-[#0E1117] rounded-2xl border border-white/[0.06] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.7)]">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-5 py-3.5 bg-[#161B27] border-b border-white/[0.05]">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex-1 mx-4 bg-white/5 rounded-lg px-4 py-1.5 text-[11px] text-gray-500 font-inter text-center">
                app.funnelslibrary.com/dashboard
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5">
              {/* KPIs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {kpis.map(({ label, value, icon: Icon, color, change }) => (
                  <div key={label} className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                        <Icon className="w-4 h-4" style={{ color }} />
                      </div>
                      <span className="flex items-center gap-0.5 text-[10px] font-bold text-green-400 font-inter">
                        <ArrowUpRight className="w-3 h-3" />
                        {change}
                      </span>
                    </div>
                    <p className="text-2xl font-black text-white font-inter">{value}</p>
                    <p className="text-xs text-gray-500 mt-1">{label}</p>
                  </div>
                ))}
              </div>

              {/* Chart + Conversations */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Chart */}
                <div className="lg:col-span-2 bg-white/[0.03] border border-white/[0.05] rounded-xl p-5">
                  <div className="flex items-center justify-between mb-5">
                    <h4 className="text-sm font-bold text-white">الإيرادات الشهرية</h4>
                    <span className="text-[11px] text-[#25D366] font-bold bg-[#25D366]/10 px-2 py-0.5 rounded font-inter">+29% هذا الشهر</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-24 mb-2" dir="ltr">
                    {bars.map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-sm transition-all"
                        style={{
                          height: `${(h / maxBar) * 100}%`,
                          backgroundColor: i === bars.length - 1 ? "#25D366" : "rgba(37,211,102,0.15)",
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex gap-1.5" dir="ltr">
                    {months.map((m, i) => (
                      <div key={i} className={`flex-1 text-center text-[9px] font-inter ${i === months.length - 1 ? "text-[#25D366] font-bold" : "text-gray-600"}`}>{m}</div>
                    ))}
                  </div>
                </div>

                {/* Conversations */}
                <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.04]">
                    <span className="text-xs font-bold text-white">المحادثات</span>
                    <span className="text-[9px] bg-blue-500 text-white px-2 py-0.5 rounded-full font-bold">3 جديدة</span>
                  </div>
                  {[
                    { n: "محمد ق.", m: "بغيت نأكد الطلب",     c: "from-emerald-400 to-teal-500",  t: "الآن"  },
                    { n: "فاطمة ب.", m: "شحال التوصيل لكازا؟", c: "from-pink-400 to-rose-500",    t: "5 دق"  },
                    { n: "سلمى م.", m: "واش COD متاح؟",        c: "from-blue-400 to-indigo-500",  t: "12 دق" },
                    { n: "يوسف إ.", m: "عطيني المقاسات",       c: "from-amber-400 to-orange-500", t: "28 دق" },
                  ].map((c) => (
                    <div key={c.n} className="flex items-center gap-2.5 px-4 py-3 border-b border-white/[0.03] last:border-0">
                      <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${c.c} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                        {c.n[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-gray-300">{c.n}</p>
                        <p className="text-[10px] text-gray-600 truncate">{c.m}</p>
                      </div>
                      <span className="text-[9px] text-gray-600">{c.t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
