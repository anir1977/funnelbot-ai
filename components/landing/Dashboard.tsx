"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard, MessageCircle, Users, BarChart3,
  Settings, Bell, ArrowUpRight, BookOpen, Package,
  CheckCircle2, Clock, Truck,
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "الرئيسية", active: true },
  { icon: MessageCircle,   label: "المحادثات", badge: "8" },
  { icon: Package,         label: "الطلبات",   badge: "12" },
  { icon: Users,           label: "الزبناء" },
  { icon: BarChart3,       label: "التقارير" },
  { icon: Settings,        label: "الإعدادات" },
];

const metrics = [
  { label: "طلبات اليوم",    value: "28",         change: "+12%", color: "text-green-600",  bg: "bg-green-50"  },
  { label: "مبيعات الشهر",   value: "18,450 د",   change: "+34%", color: "text-blue-600",   bg: "bg-blue-50"   },
  { label: "رسائل مُعالجة",  value: "1,247",      change: "+18%", color: "text-purple-600", bg: "bg-purple-50" },
  { label: "معدل التحويل",   value: "32%",         change: "+5%",  color: "text-amber-600",  bg: "bg-amber-50"  },
];

const products = [
  { emoji: "🧴", name: "سيروم فيتامين C",    price: "149 د", stock: 23, sold: 84 },
  { emoji: "💄", name: "أحمر شفاه ماتي فاخر", price: "89 د",  stock: 45, sold: 61 },
  { emoji: "🌸", name: "كريم ترطيب ليلي",    price: "120 د", stock: 18, sold: 49 },
];

const orders = [
  { id: "#1247", name: "فاطمة ز.", city: "كازا",    amount: "149", status: "جديد",          statusColor: "bg-green-100 text-green-700" },
  { id: "#1246", name: "سلمى م.", city: "الرباط",   amount: "89",  status: "قيد التوصيل",   statusColor: "bg-blue-100 text-blue-700"  },
  { id: "#1245", name: "نور أ.",  city: "مراكش",    amount: "299", status: "تم التسليم",    statusColor: "bg-gray-100 text-gray-600"  },
  { id: "#1244", name: "خديجة ب.", city: "أكادير",  amount: "149", status: "جديد",          statusColor: "bg-green-100 text-green-700"},
];

const barHeights = [30, 52, 38, 70, 48, 82, 65, 88, 60, 76, 92, 74];
const monthLabels = ["ي", "ف", "م", "أ", "م", "ي", "ي", "أ", "س", "أ", "ن", "د"];

export default function Dashboard() {
  return (
    <section id="dashboard" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-4"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            لوحة التحكم
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4"
          >
            متجرك بأكمله{" "}
            <span className="text-[#25D366]">في شاشة واحدة</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-xl mx-auto"
          >
            تابع طلباتك، منتجاتك، وزبنائك — كل شيء واضح وسهل في لوحة تحكم عربية بالكامل.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200"
          style={{ maxHeight: 640 }}
        >
          <div className="flex h-full" dir="rtl">

            {/* Sidebar */}
            <div className="w-14 lg:w-52 bg-[#1a1f2e] flex flex-col shrink-0">
              <div className="p-3 lg:p-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#25D366] rounded-lg flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-bold text-sm hidden lg:block">FunnelsLibrary</span>
                </div>
              </div>

              <nav className="flex-1 p-2 space-y-0.5">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className={`flex items-center gap-3 px-2 lg:px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                        item.active ? "bg-[#25D366]/20 text-[#25D366]" : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="text-xs font-medium hidden lg:block flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="hidden lg:flex bg-[#25D366] text-white text-[9px] font-bold w-4 h-4 rounded-full items-center justify-center shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  );
                })}
              </nav>

              <div className="p-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">ل</div>
                  <div className="hidden lg:block">
                    <p className="text-white text-xs font-medium">لونا كوسميتيك</p>
                    <p className="text-gray-400 text-[10px]">باقة Pro</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main */}
            <div className="flex-1 overflow-hidden bg-gray-50 flex flex-col">
              {/* Top bar */}
              <div className="bg-white border-b border-gray-100 px-4 lg:px-5 py-3 flex items-center justify-between shrink-0">
                <div>
                  <h2 className="font-bold text-gray-900 text-sm">الرئيسية</h2>
                  <p className="text-gray-400 text-xs">مرحباً 👋 — اليوم الأربعاء 6 ماي</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    البوت نشط
                  </div>
                  <button className="relative w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
                    <Bell className="w-4 h-4" />
                    <span className="absolute -top-0.5 -left-0.5 w-2 h-2 bg-red-500 rounded-full" />
                  </button>
                </div>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-auto p-3 lg:p-4 space-y-3">

                {/* Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3">
                  {metrics.map((m) => (
                    <div key={m.label} className="bg-white rounded-2xl p-3 border border-gray-100 card-shadow">
                      <p className="text-gray-400 text-[9px] lg:text-[10px] mb-1">{m.label}</p>
                      <p className={`text-base lg:text-xl font-black ${m.color}`}>{m.value}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <ArrowUpRight className="w-2.5 h-2.5 text-green-500" />
                        <span className="text-[9px] text-green-600 font-semibold">{m.change}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">

                  {/* Chart */}
                  <div className="lg:col-span-3 bg-white rounded-2xl p-4 border border-gray-100 card-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-gray-800 text-xs">المبيعات الشهرية (درهم)</h3>
                      <span className="text-[10px] text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full">+23% هذا الشهر</span>
                    </div>
                    <div className="flex items-end gap-1 h-20" dir="ltr">
                      {barHeights.map((h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-[#25D366] to-[#4ade80] rounded-t-sm"
                          style={{ height: `${h}%` }}
                          initial={{ scaleY: 0, originY: 1 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + i * 0.04 }}
                        />
                      ))}
                    </div>
                    <div className="flex gap-1 mt-1" dir="ltr">
                      {monthLabels.map((m, i) => (
                        <div key={i} className="flex-1 text-center text-[8px] text-gray-300">{m}</div>
                      ))}
                    </div>
                  </div>

                  {/* Product cards */}
                  <div className="lg:col-span-2 bg-white rounded-2xl p-3 border border-gray-100 card-shadow">
                    <h3 className="font-bold text-gray-800 text-xs mb-2">المنتجات الأكثر مبيعاً</h3>
                    <div className="space-y-2">
                      {products.map((p) => (
                        <div key={p.name} className="flex items-center gap-2 bg-gray-50 rounded-xl p-2">
                          <div className="w-9 h-9 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center text-lg shrink-0">
                            {p.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-bold text-gray-800 truncate">{p.name}</p>
                            <p className="text-[9px] text-gray-400">{p.stock} متبقي · {p.sold} مباع</p>
                          </div>
                          <span className="text-[10px] font-black text-[#25D366] shrink-0">{p.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent orders */}
                <div className="bg-white rounded-2xl p-3 border border-gray-100 card-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-800 text-xs">آخر الطلبات</h3>
                    <button className="text-[10px] text-[#25D366] font-semibold">عرض الكل</button>
                  </div>
                  <div className="space-y-1.5">
                    {orders.map((o) => (
                      <div key={o.id} className="flex items-center gap-2 py-1.5 border-b border-gray-50 last:border-0">
                        <span className="text-[9px] text-gray-400 font-mono shrink-0">{o.id}</span>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-[8px] font-bold shrink-0">
                          {o.name[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-semibold text-gray-800">{o.name}</p>
                          <p className="text-[9px] text-gray-400">{o.city}</p>
                        </div>
                        <span className="text-[10px] font-bold text-gray-700 shrink-0">{o.amount} د</span>
                        <span className={`text-[8px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${o.statusColor}`}>{o.status}</span>
                        {o.status === "جديد" ? <CheckCircle2 className="w-3 h-3 text-green-400 shrink-0" /> :
                         o.status === "قيد التوصيل" ? <Truck className="w-3 h-3 text-blue-400 shrink-0" /> :
                         <Clock className="w-3 h-3 text-gray-300 shrink-0" />}
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
