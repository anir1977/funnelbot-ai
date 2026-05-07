"use client";

import Link from "next/link";
import {
  ArrowUpRight, ArrowDownRight, MessageCircle, ShoppingBag,
  Clock, TrendingUp, RefreshCw, CheckCircle2, Truck, XCircle,
  FileSpreadsheet, Zap, MoreHorizontal, Eye, AlertCircle,
} from "lucide-react";

/* ─────────── data ─────────── */

const metrics = [
  {
    label: "المحادثات",
    value: "1,247",
    change: "+18%",
    up: true,
    sub: "هذا الشهر",
    icon: MessageCircle,
    accent: "#3B82F6",
    light: "#EFF6FF",
    spark: [30, 45, 38, 52, 48, 61, 55, 70, 63, 78, 72, 88],
  },
  {
    label: "طلبات مؤكدة",
    value: "284",
    change: "+34%",
    up: true,
    sub: "هذا الشهر",
    icon: CheckCircle2,
    accent: "#25D366",
    light: "#F0FDF4",
    spark: [20, 28, 22, 35, 30, 40, 38, 50, 44, 58, 52, 65],
  },
  {
    label: "طلبات معلقة",
    value: "38",
    change: "-12%",
    up: false,
    sub: "تحتاج متابعة",
    icon: Clock,
    accent: "#F59E0B",
    light: "#FFFBEB",
    spark: [55, 48, 52, 45, 50, 42, 48, 40, 44, 38, 42, 36],
  },
  {
    label: "الإيرادات",
    value: "84,650",
    change: "+29%",
    up: true,
    sub: "درهم هذا الشهر",
    icon: TrendingUp,
    accent: "#8B5CF6",
    light: "#F5F3FF",
    spark: [35, 42, 38, 50, 45, 58, 52, 65, 60, 75, 68, 84],
  },
];

const conversations = [
  { id: 1, name: "محمد قاسمي",    phone: "0661234567", msg: "بغيت نأكد الطلب — بلو دي شانيل 100ml", time: "الآن",  unread: 2, status: "new"     },
  { id: 2, name: "فاطمة بنعلي",   phone: "0677345678", msg: "شحال التوصيل لكازا؟",                   time: "5 دق",  unread: 0, status: "replied" },
  { id: 3, name: "سلمى المنصوري", phone: "0652345678", msg: "واش الدفع عند الاستلام متاح؟",          time: "12 دق", unread: 1, status: "new"     },
  { id: 4, name: "يوسف الإدريسي", phone: "0661987654", msg: "عطيني المقاسات المتوفرة للقفطان",       time: "28 دق", unread: 0, status: "replied" },
  { id: 5, name: "خديجة الغازي",  phone: "0672456789", msg: "✅ شكراً — الطلب وصلني بخير",          time: "1 س",   unread: 0, status: "done"    },
];

const recentOrders = [
  { id: "#2847", name: "محمد قاسمي",    product: "بلو دي شانيل 100ml",  city: "الرباط",  total: "670",  status: "جديد",       sc: "blue"   },
  { id: "#2846", name: "فاطمة بنعلي",   product: "قفطان كازاوي L",       city: "كازا",    total: "340",  status: "مؤكد",       sc: "green"  },
  { id: "#2845", name: "سلمى المنصوري", product: "واي بروتين شوكولاتة",  city: "أكادير",  total: "315",  status: "تم الإرسال", sc: "purple" },
  { id: "#2844", name: "يوسف الإدريسي", product: "لالابيل الوردي 50ml",  city: "الرباط",  total: "310",  status: "مؤكد",       sc: "green"  },
  { id: "#2843", name: "خديجة الغازي",  product: "كريم ترطيب ليلي",     city: "طنجة",    total: "145",  status: "ملغي",       sc: "red"    },
];

const barData   = [42, 58, 51, 74, 63, 88, 72, 95, 80, 107, 91, 124];
const months    = ["ي","ف","م","أ","م","ي","ي","أ","س","أ","ن","د"];
const maxBar    = Math.max(...barData);

const statusBadge: Record<string, string> = {
  blue:   "bg-blue-50   text-blue-600   ring-1 ring-blue-200",
  green:  "bg-green-50  text-green-700  ring-1 ring-green-200",
  purple: "bg-purple-50 text-purple-600 ring-1 ring-purple-200",
  red:    "bg-red-50    text-red-600    ring-1 ring-red-200",
};

const avatarColors = [
  "from-emerald-400 to-teal-500",
  "from-pink-400 to-rose-500",
  "from-blue-400 to-indigo-500",
  "from-amber-400 to-orange-500",
  "from-violet-400 to-purple-500",
];

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80, h = 28, step = w / (data.length - 1);
  const pts = data.map((v, i) => `${i * step},${h - ((v - min) / range) * h}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─────────── component ─────────── */

export default function DashboardPage() {
  return (
    <div className="space-y-6 max-w-[1400px]">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">لوحة التحكم</h2>
          <p className="text-sm text-gray-400 mt-0.5">الأربعاء، 7 ماي 2026 · متجر عطور الريم</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            البوت نشط — يرد تلقائياً
          </div>
          <button className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-500 text-xs font-medium px-3 py-1.5 rounded-full hover:border-gray-300 hover:text-gray-700 transition-colors shadow-sm">
            <RefreshCw className="w-3 h-3" />
            تحديث
          </button>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: m.light }}
                >
                  <Icon className="w-5 h-5" style={{ color: m.accent }} />
                </div>
                <div
                  className={`flex items-center gap-0.5 text-xs font-bold px-2 py-1 rounded-full ${
                    m.up
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-500"
                  }`}
                >
                  {m.up ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {m.change}
                </div>
              </div>

              <p className="text-2xl font-black text-gray-900 leading-none tracking-tight">
                {m.value}
              </p>
              <p className="text-xs text-gray-400 mt-1.5">{m.label}</p>

              <div className="mt-4 opacity-70 group-hover:opacity-100 transition-opacity">
                <Sparkline data={m.spark} color={m.accent} />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Conversations — 1 col */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <h3 className="font-bold text-gray-900 text-sm">المحادثات الأخيرة</h3>
            </div>
            <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">3 جديدة</span>
          </div>

          <div className="flex-1 divide-y divide-gray-50/70">
            {conversations.map((c, i) => (
              <div
                key={c.id}
                className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50/70 transition-colors cursor-pointer group"
              >
                <div className="relative shrink-0">
                  <div
                    className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {c.name[0]}
                  </div>
                  {c.status === "new" && (
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-blue-500 border-2 border-white rounded-full" />
                  )}
                  {c.status === "replied" && (
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#25D366] border-2 border-white rounded-full" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold text-gray-900 truncate">{c.name}</p>
                    <span className="text-[10px] text-gray-400 shrink-0">{c.time}</span>
                  </div>
                  <p className="text-[11px] text-gray-400 truncate mt-0.5">{c.msg}</p>
                </div>

                {c.unread > 0 && (
                  <span className="w-5 h-5 bg-[#25D366] text-white text-[9px] font-black rounded-full flex items-center justify-center shrink-0">
                    {c.unread}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="px-5 py-3 border-t border-gray-50">
            <Link
              href="/dashboard/conversations"
              className="flex items-center gap-1.5 text-xs text-[#25D366] font-semibold hover:underline"
            >
              <Eye className="w-3.5 h-3.5" />
              عرض جميع المحادثات
            </Link>
          </div>
        </div>

        {/* Orders + Chart — 2 cols */}
        <div className="lg:col-span-2 flex flex-col gap-5">

          {/* Revenue chart */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-gray-900 text-sm">الإيرادات الشهرية</h3>
                <p className="text-xs text-gray-400 mt-0.5">2026 — بالدرهم</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">إجمالي</span>
                <span className="text-sm font-black text-gray-900">84,650 د</span>
                <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full">+29%</span>
              </div>
            </div>
            <div className="flex items-end gap-1.5 h-20" dir="ltr">
              {barData.map((h, i) => {
                const pct = (h / maxBar) * 100;
                const isLast = i === barData.length - 1;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 group/bar">
                    <div
                      className={`w-full rounded-t-md transition-all duration-500 relative ${
                        isLast
                          ? "bg-[#25D366] shadow-sm shadow-green-200"
                          : "bg-gray-100 group-hover/bar:bg-[#25D366]/40"
                      }`}
                      style={{ height: `${pct}%` }}
                    >
                      {isLast && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap">
                          {h}K
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-1.5 mt-2" dir="ltr">
              {months.map((m, i) => (
                <div
                  key={i}
                  className={`flex-1 text-center text-[9px] font-medium ${
                    i === months.length - 1 ? "text-[#25D366]" : "text-gray-300"
                  }`}
                >
                  {m}
                </div>
              ))}
            </div>
          </div>

          {/* Orders table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col flex-1">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#25D366]" />
                <h3 className="font-bold text-gray-900 text-sm">آخر الطلبات</h3>
              </div>
              <Link href="/dashboard/orders" className="text-xs text-[#25D366] font-semibold hover:underline flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                عرض الكل
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="px-5 py-2.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">رقم</th>
                    <th className="px-3 py-2.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">العميل</th>
                    <th className="hidden md:table-cell px-3 py-2.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">المدينة</th>
                    <th className="px-3 py-2.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">المبلغ</th>
                    <th className="px-5 py-2.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50/70">
                  {recentOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-gray-50/50 transition-colors group/row">
                      <td className="px-5 py-3">
                        <span className="text-[11px] text-gray-400 font-mono">FL{o.id}</span>
                      </td>
                      <td className="px-3 py-3">
                        <div>
                          <p className="text-xs font-semibold text-gray-900">{o.name}</p>
                          <p className="text-[10px] text-gray-400 truncate max-w-[130px]">{o.product}</p>
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-3 py-3">
                        <span className="text-xs text-gray-500">{o.city}</span>
                      </td>
                      <td className="px-3 py-3">
                        <span className="text-xs font-black text-gray-900">{o.total} د</span>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${statusBadge[o.sc]}`}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom row ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {/* Bot activity */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#25D366]/10 rounded-xl flex items-center justify-center">
                <Zap className="w-4 h-4 text-[#25D366]" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">نشاط البوت</p>
                <p className="text-[10px] text-gray-400">اليوم</p>
              </div>
            </div>
            <button className="p-1 text-gray-300 hover:text-gray-500 transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {[
              { label: "رسائل مُعالجة",  value: "143", pct: 100, color: "#25D366"  },
              { label: "أسئلة مُجابة",   value: "89",  pct: 82,  color: "#8B5CF6"  },
              { label: "طلبات مؤكدة",    value: "28",  pct: 65,  color: "#3B82F6"  },
              { label: "تحويل للمشرف",   value: "6",   pct: 15,  color: "#F59E0B"  },
            ].map((row) => (
              <div key={row.label}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-gray-500">{row.label}</span>
                  <span className="text-xs font-black text-gray-900">{row.value}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${row.pct}%`, backgroundColor: row.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
            <span>معدل الاستجابة التلقائية</span>
            <span className="font-black text-[#25D366] text-sm">96%</span>
          </div>
        </div>

        {/* Google Sheets */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                <FileSpreadsheet className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Google Sheets</p>
                <p className="text-[10px] text-gray-400">مزامنة الطلبات</p>
              </div>
            </div>
            <span className="flex items-center gap-1 bg-green-50 border border-green-200 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              نشط
            </span>
          </div>

          <div className="bg-gray-50 rounded-xl divide-y divide-gray-100">
            {[
              { k: "آخر مزامنة",    v: "منذ 5 دقائق" },
              { k: "إجمالي الصفوف", v: "284 طلب"      },
              { k: "جدول البيانات", v: "طلبات-عطور-2026", accent: true },
            ].map(({ k, v, accent }) => (
              <div key={k} className="flex justify-between items-center px-3 py-2.5">
                <span className="text-xs text-gray-500">{k}</span>
                <span className={`text-xs font-semibold truncate max-w-[130px] ${accent ? "text-[#25D366]" : "text-gray-800"}`}>
                  {v}
                </span>
              </div>
            ))}
          </div>

          <button className="mt-3 w-full flex items-center justify-center gap-2 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl py-2.5 transition-colors">
            <RefreshCw className="w-3.5 h-3.5" />
            مزامنة الآن
          </button>
        </div>

        {/* Follow-up tasks */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 bg-amber-50 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">يحتاج متابعة</p>
              <p className="text-[10px] text-gray-400">4 عناصر</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {[
              { icon: ShoppingBag,   color: "#3B82F6", bg: "#EFF6FF", label: "38 طلب جديد لم يُؤكد",       cta: "مراجعة", href: "/dashboard/orders"        },
              { icon: Truck,         color: "#8B5CF6", bg: "#F5F3FF", label: "12 طلب قيد التوصيل",          cta: "متابعة", href: "/dashboard/orders"        },
              { icon: XCircle,       color: "#EF4444", bg: "#FEF2F2", label: "3 طلبات مُلغاة اليوم",        cta: "عرض",    href: "/dashboard/orders"        },
              { icon: MessageCircle, color: "#25D366", bg: "#F0FDF4", label: "6 محادثات تحتاج ردًا يدوياً", cta: "فتح",    href: "/dashboard/conversations" },
            ].map((t, i) => {
              const Icon = t.icon;
              return (
                <Link
                  key={i}
                  href={t.href}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/70 hover:bg-gray-100 transition-colors cursor-pointer group"
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: t.bg }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: t.color }} />
                  </div>
                  <p className="text-xs text-gray-700 font-medium flex-1 leading-snug">{t.label}</p>
                  <span className="text-[10px] font-bold shrink-0 group-hover:underline" style={{ color: t.color }}>
                    {t.cta}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
