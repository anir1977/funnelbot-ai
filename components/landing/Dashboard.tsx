"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  MessageCircle,
  Users,
  TrendingUp,
  Settings,
  Bell,
  BarChart3,
  ArrowUpRight,
  CheckCircle2,
  Clock,
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "الرئيسية", active: true },
  { icon: MessageCircle, label: "المحادثات", badge: "12" },
  { icon: Users, label: "العملاء" },
  { icon: BarChart3, label: "التقارير" },
  { icon: Settings, label: "الإعدادات" },
];

const metricCards = [
  { label: "رسائل اليوم", value: "1,247", change: "+18%", up: true, color: "text-green-600", bg: "bg-green-50" },
  { label: "عملاء جدد", value: "84", change: "+34%", up: true, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "معدل التحويل", value: "32%", change: "+5%", up: true, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "متوسط الرد", value: "< 1ث", change: "24/7", up: true, color: "text-orange-600", bg: "bg-orange-50" },
];

const recentConversations = [
  { name: "محمد العمري", msg: "شكراً جزيلاً، سأكمل الطلب الآن", time: "منذ 2د", status: "converted" },
  { name: "سارة القحطاني", msg: "ما هي طرق الدفع المتاحة؟", time: "منذ 5د", status: "active" },
  { name: "أحمد البلوشي", msg: "هل يوجد خصم للشراء السنوي؟", time: "منذ 8د", status: "active" },
  { name: "فاطمة الزهراني", msg: "تم إتمام الاشتراك بنجاح ✅", time: "منذ 15د", status: "converted" },
];

const barHeights = [40, 60, 45, 75, 55, 85, 70, 90, 65, 80, 95, 78];
const months = ["ي", "ف", "م", "أ", "م", "ي", "ي", "أ", "س", "أ", "ن", "د"];

export default function Dashboard() {
  return (
    <section id="dashboard" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-4"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            لوحة التحكم
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4"
          >
            كل شيء تحت{" "}
            <span className="text-[#25D366]">سيطرتك</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-xl mx-auto"
          >
            لوحة تحكم شاملة تمنحك رؤية كاملة على أداء بوتك وعملائك في الوقت الفعلي
          </motion.p>
        </div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200"
          style={{ maxHeight: 600 }}
        >
          <div className="flex h-full" dir="rtl">
            {/* Sidebar */}
            <div className="w-16 lg:w-56 bg-[#1a1f2e] flex flex-col shrink-0">
              {/* Logo */}
              <div className="p-4 lg:p-5 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-[#25D366] rounded-lg flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4 text-white fill-white" />
                  </div>
                  <span className="text-white font-bold text-sm hidden lg:block">FunnelBot</span>
                </div>
              </div>

              {/* Nav */}
              <nav className="flex-1 p-2 lg:p-3 space-y-1">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className={`flex items-center gap-3 px-2 lg:px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                        item.active
                          ? "bg-[#25D366]/20 text-[#25D366]"
                          : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="text-xs font-medium hidden lg:block">{item.label}</span>
                      {item.badge && (
                        <span className="hidden lg:flex ms-auto bg-[#25D366] text-white text-[9px] font-bold w-4 h-4 rounded-full items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* User */}
              <div className="p-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    م
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-white text-xs font-medium">محمد</p>
                    <p className="text-gray-400 text-[10px]">احترافي</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main */}
            <div className="flex-1 overflow-hidden bg-gray-50">
              {/* Top bar */}
              <div className="bg-white border-b border-gray-100 px-4 lg:px-6 py-3 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-gray-900 text-sm lg:text-base">لوحة التحكم</h2>
                  <p className="text-gray-400 text-xs">مرحباً، محمد 👋</p>
                </div>
                <div className="flex items-center gap-2 lg:gap-3">
                  <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    البوت نشط
                  </div>
                  <button className="relative w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-200">
                    <Bell className="w-4 h-4" />
                    <span className="absolute -top-0.5 -left-0.5 w-2 h-2 bg-red-500 rounded-full" />
                  </button>
                </div>
              </div>

              <div className="p-4 lg:p-6 overflow-auto">
                {/* Metric cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                  {metricCards.map((m) => (
                    <div key={m.label} className="bg-white rounded-2xl p-3 lg:p-4 border border-gray-100 card-shadow">
                      <p className="text-gray-400 text-[10px] lg:text-xs mb-1">{m.label}</p>
                      <p className={`text-lg lg:text-2xl font-black ${m.color}`}>{m.value}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <ArrowUpRight className="w-3 h-3 text-green-500" />
                        <span className="text-[10px] text-green-600 font-semibold">{m.change}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                  {/* Chart */}
                  <div className="lg:col-span-3 bg-white rounded-2xl p-4 border border-gray-100 card-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-800 text-sm">الرسائل الشهرية</h3>
                      <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full">
                        +23% هذا الشهر
                      </span>
                    </div>
                    <div className="flex items-end gap-1 h-24" dir="ltr">
                      {barHeights.map((h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-[#25D366] to-[#4ade80] rounded-t-sm opacity-80 hover:opacity-100 transition-opacity"
                          style={{ height: `${h}%` }}
                          initial={{ scaleY: 0, originY: 1 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + i * 0.04, duration: 0.4 }}
                        />
                      ))}
                    </div>
                    <div className="flex gap-1 mt-1" dir="ltr">
                      {months.map((m, i) => (
                        <div key={i} className="flex-1 text-center text-[9px] text-gray-400">
                          {m}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent conversations */}
                  <div className="lg:col-span-2 bg-white rounded-2xl p-4 border border-gray-100 card-shadow">
                    <h3 className="font-bold text-gray-800 text-sm mb-3">آخر المحادثات</h3>
                    <div className="space-y-3">
                      {recentConversations.map((c) => (
                        <div key={c.name} className="flex items-start gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                            {c.name[0]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-semibold text-gray-800 truncate">{c.name}</p>
                              <div className="flex items-center gap-1">
                                {c.status === "converted" ? (
                                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                                ) : (
                                  <Clock className="w-3 h-3 text-blue-400" />
                                )}
                              </div>
                            </div>
                            <p className="text-[10px] text-gray-400 truncate">{c.msg}</p>
                          </div>
                        </div>
                      ))}
                    </div>
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
