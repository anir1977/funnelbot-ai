"use client";

import { useState } from "react";
import { Search, Download, Eye, CheckCircle, XCircle, Truck, Clock, ChevronDown } from "lucide-react";

const allOrders = [
  { id: "#FL-2847", name: "محمد قاسمي",    phone: "0661234567", product: "بلو دي شانيل 100ml",  city: "الرباط",          delivery: 30,  total: 670,  status: "جديد",        date: "اليوم 14:32" },
  { id: "#FL-2846", name: "فاطمة بنعلي",   phone: "0677345678", product: "قفطان كازاوي L",       city: "الدار البيضاء",   delivery: 20,  total: 340,  status: "مؤكد",        date: "اليوم 12:10" },
  { id: "#FL-2845", name: "سلمى المنصوري", phone: "0652345678", product: "واي بروتين شوكولاتة",  city: "أكادير",           delivery: 35,  total: 315,  status: "تم الإرسال",  date: "أمس 18:45" },
  { id: "#FL-2844", name: "يوسف الإدريسي", phone: "0661987654", product: "لالابيل الوردي 50ml",  city: "الرباط",           delivery: 30,  total: 310,  status: "مؤكد",        date: "أمس 15:20" },
  { id: "#FL-2843", name: "خديجة الغازي",  phone: "0672456789", product: "كريم ترطيب ليلي",     city: "طنجة",             delivery: 25,  total: 145,  status: "ملغي",        date: "أمس 09:05" },
  { id: "#FL-2842", name: "نور الهدى",      phone: "0661876543", product: "تيشيرت كلاسيك M",     city: "مراكش",            delivery: 25,  total: 174,  status: "تم الإرسال",  date: "2 ماي" },
  { id: "#FL-2841", name: "حسن بوعزة",     phone: "0652654321", product: "بلو دي شانيل 50ml",   city: "فاس",              delivery: 25,  total: 445,  status: "مؤكد",        date: "2 ماي" },
  { id: "#FL-2840", name: "أمينة الكتاني", phone: "0677876543", product: "قفطان كازاوي XL",     city: "الدار البيضاء",   delivery: 20,  total: 340,  status: "جديد",        date: "1 ماي" },
  { id: "#FL-2839", name: "كريم الحسني",   phone: "0661543210", product: "واي بروتين فانيليا",  city: "الرباط",           delivery: 30,  total: 310,  status: "تم الإرسال",  date: "1 ماي" },
  { id: "#FL-2838", name: "منى الوردي",    phone: "0677654321", product: "كريم ترطيب ليلي",     city: "أكادير",           delivery: 35,  total: 155,  status: "ملغي",        date: "30 أبريل" },
];

const statusConfig: Record<string, { color: string; bg: string; icon: React.ReactNode }> = {
  "جديد":        { color: "text-blue-700",   bg: "bg-blue-100",   icon: <Clock className="w-3 h-3" /> },
  "مؤكد":        { color: "text-green-700",  bg: "bg-green-100",  icon: <CheckCircle className="w-3 h-3" /> },
  "تم الإرسال":  { color: "text-purple-700", bg: "bg-purple-100", icon: <Truck className="w-3 h-3" /> },
  "ملغي":        { color: "text-red-600",    bg: "bg-red-100",    icon: <XCircle className="w-3 h-3" /> },
};

const tabs = ["الكل", "جديد", "مؤكد", "تم الإرسال", "ملغي"];

const avatarColors = [
  "from-green-400 to-emerald-600",
  "from-pink-400 to-rose-500",
  "from-blue-400 to-indigo-500",
  "from-amber-400 to-orange-500",
  "from-violet-400 to-purple-500",
  "from-teal-400 to-cyan-500",
  "from-red-400 to-rose-500",
  "from-cyan-400 to-blue-500",
  "from-lime-400 to-green-500",
  "from-fuchsia-400 to-purple-500",
];

export default function OrdersPage() {
  const [search, setSearch]     = useState("");
  const [activeTab, setTab]     = useState("الكل");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = allOrders.filter(o => {
    const matchTab    = activeTab === "الكل" || o.status === activeTab;
    const matchSearch = o.name.includes(search) || o.id.includes(search) || o.product.includes(search);
    return matchTab && matchSearch;
  });

  const counts = tabs.reduce<Record<string, number>>((acc, t) => {
    acc[t] = t === "الكل" ? allOrders.length : allOrders.filter(o => o.status === t).length;
    return acc;
  }, {});

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-gray-900">الطلبات</h2>
          <p className="text-sm text-gray-500">{allOrders.length} طلب إجمالاً</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-gray-50 shadow-sm transition-colors w-fit">
          <Download className="w-4 h-4" />
          تصدير Excel
        </button>
      </div>

      {/* Status tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setTab(tab)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
              activeTab === tab
                ? "bg-[#25D366] text-white shadow-md shadow-green-200"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {tab}
            <span className={`rounded-full text-[9px] font-black px-1.5 py-0.5 ${activeTab === tab ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
              {counts[tab]}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="ابحث بالاسم، رقم الطلب، أو المنتج..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl pr-9 pl-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366] shadow-sm transition-all"
        />
      </div>

      {/* Orders table card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Desktop table header */}
        <div className="hidden md:grid grid-cols-12 gap-3 px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wide">
          <div className="col-span-3">الزبون</div>
          <div className="col-span-3">المنتج</div>
          <div className="col-span-2">المدينة</div>
          <div className="col-span-1 text-center">توصيل</div>
          <div className="col-span-1 text-center">الإجمالي</div>
          <div className="col-span-2 text-center">الحالة</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-50">
          {filtered.map((o, i) => {
            const sc = statusConfig[o.status];
            const isOpen = expanded === o.id;
            return (
              <div key={o.id}>
                {/* Desktop row */}
                <div className="hidden md:grid grid-cols-12 gap-3 px-5 py-3.5 hover:bg-gray-50/80 transition-colors items-center">
                  <div className="col-span-3 flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                      {o.name[0]}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-900 truncate">{o.name}</p>
                      <p className="text-[10px] text-gray-400 font-mono">{o.phone}</p>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <p className="text-xs text-gray-800 font-medium truncate">{o.product}</p>
                    <p className="text-[10px] text-gray-400 font-mono">{o.id}</p>
                  </div>
                  <div className="col-span-2 text-xs text-gray-600">{o.city}</div>
                  <div className="col-span-1 text-center text-xs text-gray-500">{o.delivery} د</div>
                  <div className="col-span-1 text-center text-xs font-black text-gray-900">{o.total} د</div>
                  <div className="col-span-2 flex items-center justify-center gap-1.5">
                    <span className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full ${sc.bg} ${sc.color}`}>
                      {sc.icon}{o.status}
                    </span>
                    <button className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Mobile row */}
                <div className="md:hidden">
                  <button
                    onClick={() => setExpanded(isOpen ? null : o.id)}
                    className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors"
                  >
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                      {o.name[0]}
                    </div>
                    <div className="flex-1 min-w-0 text-right">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-gray-900">{o.name}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${sc.bg} ${sc.color}`}>{o.status}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5 truncate">{o.product} · {o.city}</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 bg-gray-50/50 space-y-1.5">
                      {[
                        ["رقم الطلب", o.id],
                        ["الهاتف", o.phone],
                        ["توصيل", `${o.delivery} درهم`],
                        ["الإجمالي", `${o.total} درهم`],
                        ["التاريخ", o.date],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between text-xs">
                          <span className="text-gray-500">{k}</span>
                          <span className="font-semibold text-gray-800">{v}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-gray-400">
            <p className="text-sm font-medium">لا توجد طلبات تطابق البحث</p>
          </div>
        )}

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
          <span>{filtered.length} نتيجة</span>
          <span>إجمالي المبيعات: {filtered.reduce((s, o) => s + o.total, 0).toLocaleString()} درهم</span>
        </div>
      </div>
    </div>
  );
}
