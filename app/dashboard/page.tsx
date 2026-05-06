"use client";

import { ArrowUpRight, ArrowDownRight, MessageCircle, ShoppingBag, Clock, TrendingUp, RefreshCw, CheckCircle2, Truck, XCircle, FileSpreadsheet, Zap } from "lucide-react";

const metrics = [
  {
    label: "إجمالي المحادثات",
    value: "1,247",
    change: "+18%",
    up: true,
    sub: "هذا الشهر",
    icon: MessageCircle,
    gradient: "from-blue-500 to-indigo-600",
    bg: "from-blue-50 to-indigo-50",
    border: "border-blue-100",
  },
  {
    label: "طلبات مؤكدة",
    value: "284",
    change: "+34%",
    up: true,
    sub: "هذا الشهر",
    icon: CheckCircle2,
    gradient: "from-[#25D366] to-emerald-600",
    bg: "from-green-50 to-emerald-50",
    border: "border-green-100",
  },
  {
    label: "طلبات معلقة",
    value: "38",
    change: "-12%",
    up: false,
    sub: "تحتاج متابعة",
    icon: Clock,
    gradient: "from-amber-500 to-orange-500",
    bg: "from-amber-50 to-orange-50",
    border: "border-amber-100",
  },
  {
    label: "الإيرادات التقديرية",
    value: "84,650 د",
    change: "+29%",
    up: true,
    sub: "هذا الشهر",
    icon: TrendingUp,
    gradient: "from-purple-500 to-violet-600",
    bg: "from-purple-50 to-violet-50",
    border: "border-purple-100",
  },
];

const conversations = [
  { id: 1, name: "محمد قاسمي",      phone: "0661234567", msg: "بغيت نأكد الطلب — بلو دي شانيل 100ml",    time: "الآن",   unread: 2, status: "new" },
  { id: 2, name: "فاطمة بنعلي",     phone: "0677345678", msg: "شحال التوصيل لكازا؟",                         time: "5 دق",   unread: 0, status: "replied" },
  { id: 3, name: "سلمى المنصوري",   phone: "0652345678", msg: "واش الدفع عند الاستلام متاح؟",               time: "12 دق",  unread: 1, status: "new" },
  { id: 4, name: "يوسف الإدريسي",   phone: "0661987654", msg: "عطيني المقاسات المتوفرة للقفطان",            time: "28 دق",  unread: 0, status: "replied" },
  { id: 5, name: "خديجة الغازي",    phone: "0672456789", msg: "✅ شكراً — الطلب وصلني بخير",               time: "1 س",    unread: 0, status: "done" },
  { id: 6, name: "نور الهدى",        phone: "0661876543", msg: "واش عندكم بلو دي شانيل 50ml؟",            time: "2 س",    unread: 0, status: "replied" },
];

const recentOrders = [
  { id: "#FL-2847", name: "محمد قاسمي",    product: "بلو دي شانيل 100ml",  city: "الرباط",   total: "670 د",  status: "جديد",       statusColor: "bg-blue-100 text-blue-700" },
  { id: "#FL-2846", name: "فاطمة بنعلي",   product: "قفطان كازاوي L",       city: "كازا",     total: "340 د",  status: "مؤكد",       statusColor: "bg-green-100 text-green-700" },
  { id: "#FL-2845", name: "سلمى المنصوري", product: "واي بروتين شوكولاتة",  city: "أكادير",   total: "315 د",  status: "تم الإرسال", statusColor: "bg-purple-100 text-purple-700" },
  { id: "#FL-2844", name: "يوسف الإدريسي", product: "لالابيل الوردي 50ml",  city: "الرباط",   total: "310 د",  status: "مؤكد",       statusColor: "bg-green-100 text-green-700" },
  { id: "#FL-2843", name: "خديجة الغازي",  product: "كريم ترطيب ليلي",     city: "طنجة",     total: "145 د",  status: "ملغي",       statusColor: "bg-red-100 text-red-600" },
];

const barData = [42, 58, 51, 74, 63, 88, 72, 95, 80, 107, 91, 124];
const months  = ["ي","ف","م","أ","م","ي","ي","أ","س","أ","ن","د"];

const statusIcon = (s: string) => {
  if (s === "new")     return <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />;
  if (s === "replied") return <span className="w-2 h-2 rounded-full bg-[#25D366]" />;
  return <span className="w-2 h-2 rounded-full bg-gray-300" />;
};

const avatarColors = [
  "from-green-400 to-emerald-600",
  "from-pink-400 to-rose-500",
  "from-blue-400 to-indigo-500",
  "from-amber-400 to-orange-500",
  "from-violet-400 to-purple-500",
  "from-teal-400 to-cyan-500",
];

export default function DashboardPage() {
  return (
    <div className="space-y-5">

      {/* Welcome bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-gray-900">مرحباً محمد 👋</h2>
          <p className="text-sm text-gray-500 mt-0.5">الأربعاء، 6 ماي 2026 · عطور الريم</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-500 shadow-sm">
          <RefreshCw className="w-3.5 h-3.5 text-[#25D366]" />
          آخر تحديث منذ دقيقتين
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className={`bg-gradient-to-br ${m.bg} border ${m.border} rounded-2xl p-4 relative overflow-hidden`}>
              <div className={`absolute -bottom-5 -left-5 w-20 h-20 bg-gradient-to-br ${m.gradient} opacity-10 rounded-full blur-xl`} />
              <div className="relative z-10">
                <div className={`w-9 h-9 bg-gradient-to-br ${m.gradient} rounded-xl flex items-center justify-center mb-3 shadow-md`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <p className="text-2xl font-black text-gray-900 leading-none">{m.value}</p>
                <p className="text-xs text-gray-500 mt-1">{m.label}</p>
                <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${m.up ? "text-green-600" : "text-red-500"}`}>
                  {m.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  {m.change}
                  <span className="text-gray-400 font-normal">{m.sub}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two column: conversations + orders */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

        {/* Recent conversations */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <h3 className="font-bold text-gray-900 text-sm">آخر المحادثات</h3>
            </div>
            <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded-full">3 جديدة</span>
          </div>
          <div className="divide-y divide-gray-50">
            {conversations.map((c, i) => (
              <div key={c.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="relative shrink-0">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold`}>
                    {c.name[0]}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5">{statusIcon(c.status)}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-900 truncate">{c.name}</p>
                    <span className="text-[10px] text-gray-400 shrink-0 mr-2">{c.time}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 truncate mt-0.5">{c.msg}</p>
                </div>
                {c.unread > 0 && (
                  <span className="w-4.5 h-4.5 min-w-[18px] bg-[#25D366] text-white text-[9px] font-bold rounded-full flex items-center justify-center shrink-0">
                    {c.unread}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-gray-50">
            <button className="text-xs text-[#25D366] font-semibold hover:underline">عرض كل المحادثات</button>
          </div>
        </div>

        {/* Recent orders + chart */}
        <div className="lg:col-span-3 space-y-4">

          {/* Mini chart */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900 text-sm">المبيعات الشهرية</h3>
              <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full">+29% هذا الشهر</span>
            </div>
            <div className="flex items-end gap-1 h-16" dir="ltr">
              {barData.map((h, i) => {
                const pct = (h / Math.max(...barData)) * 100;
                return (
                  <div
                    key={i}
                    className={`flex-1 rounded-t-sm transition-all duration-300 ${i === barData.length - 1 ? "bg-[#25D366]" : "bg-[#25D366]/30"}`}
                    style={{ height: `${pct}%` }}
                  />
                );
              })}
            </div>
            <div className="flex gap-1 mt-1" dir="ltr">
              {months.map((m, i) => (
                <div key={i} className="flex-1 text-center text-[8px] text-gray-300">{m}</div>
              ))}
            </div>
          </div>

          {/* Orders table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#25D366]" />
                <h3 className="font-bold text-gray-900 text-sm">آخر الطلبات</h3>
              </div>
              <button className="text-xs text-[#25D366] font-semibold hover:underline">عرض الكل</button>
            </div>
            <div className="divide-y divide-gray-50">
              {recentOrders.map((o) => (
                <div key={o.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                  <span className="text-[10px] text-gray-400 font-mono shrink-0">{o.id}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-900 truncate">{o.name}</p>
                    <p className="text-[11px] text-gray-400 truncate">{o.product} · {o.city}</p>
                  </div>
                  <p className="text-xs font-black text-gray-800 shrink-0">{o.total}</p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${o.statusColor}`}>
                    {o.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row: Google Sheets + Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Google Sheets sync */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
              <FileSpreadsheet className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Google Sheets</p>
              <p className="text-xs text-gray-400">مزامنة الطلبات</p>
            </div>
            <div className="mr-auto flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              نشط
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">آخر مزامنة</span>
              <span className="font-semibold text-gray-800">منذ 5 دقائق</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">إجمالي الصفوف</span>
              <span className="font-semibold text-gray-800">284 طلب</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">جدول البيانات</span>
              <span className="font-semibold text-[#25D366] truncate max-w-[120px]">طلبات-عطور-الريم-2026</span>
            </div>
          </div>
          <button className="mt-3 w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-xl py-2 transition-colors">
            <RefreshCw className="w-3.5 h-3.5" />
            مزامنة الآن
          </button>
        </div>

        {/* Bot activity */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-[#25D366]" />
            <h3 className="font-bold text-gray-900 text-sm">نشاط البوت اليوم</h3>
          </div>
          <div className="space-y-2.5">
            {[
              { label: "رسائل مُعالجة",     value: "143",  pct: 100, color: "bg-[#25D366]" },
              { label: "طلبات مؤكدة",       value: "28",   pct: 65,  color: "bg-blue-500" },
              { label: "أسئلة مُجابة",      value: "89",   pct: 82,  color: "bg-purple-500" },
              { label: "تحويل للمشرف",      value: "6",    pct: 15,  color: "bg-amber-500" },
            ].map((row) => (
              <div key={row.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">{row.label}</span>
                  <span className="font-bold text-gray-900">{row.value}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${row.color} rounded-full`} style={{ width: `${row.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending tasks */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-amber-500" />
            <h3 className="font-bold text-gray-900 text-sm">يحتاج متابعة</h3>
          </div>
          <div className="space-y-2">
            {[
              { icon: ShoppingBag,  color: "text-blue-500",   bg: "bg-blue-50",  label: "38 طلب جديد لم يُؤكد",       cta: "مراجعة" },
              { icon: Truck,        color: "text-purple-500", bg: "bg-purple-50",label: "12 طلب قيد التوصيل",          cta: "متابعة" },
              { icon: XCircle,      color: "text-red-500",    bg: "bg-red-50",   label: "3 طلبات مُلغاة اليوم",        cta: "عرض" },
              { icon: MessageCircle,color: "text-[#25D366]",  bg: "bg-green-50", label: "6 محادثات تحتاج ردًا يدوياً", cta: "فتح" },
            ].map((t, i) => {
              const Icon = t.icon;
              return (
                <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className={`w-7 h-7 ${t.bg} rounded-lg flex items-center justify-center shrink-0`}>
                    <Icon className={`w-3.5 h-3.5 ${t.color}`} />
                  </div>
                  <p className="text-xs text-gray-700 font-medium flex-1">{t.label}</p>
                  <span className="text-[10px] text-[#25D366] font-bold shrink-0">{t.cta}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
