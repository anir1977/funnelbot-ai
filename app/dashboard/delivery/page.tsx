"use client";

import { useState } from "react";
import { MapPin, Plus, Pencil, Trash2, Truck, Clock, CheckCircle2, ToggleLeft, ToggleRight } from "lucide-react";

const initialCities = [
  { id: 1, city: "الدار البيضاء", price: 20,  time: "24 ساعة",       cod: true,  active: true },
  { id: 2, city: "الرباط",        price: 30,  time: "24–48 ساعة",    cod: true,  active: true },
  { id: 3, city: "مراكش",         price: 25,  time: "48 ساعة",       cod: true,  active: true },
  { id: 4, city: "أكادير",        price: 35,  time: "48–72 ساعة",   cod: true,  active: true },
  { id: 5, city: "فاس",           price: 25,  time: "48 ساعة",       cod: true,  active: true },
  { id: 6, city: "طنجة",          price: 25,  time: "48 ساعة",       cod: true,  active: true },
  { id: 7, city: "مكناس",         price: 25,  time: "48 ساعة",       cod: false, active: true },
  { id: 8, city: "وجدة",          price: 35,  time: "72 ساعة",       cod: true,  active: false },
];

export default function DeliveryPage() {
  const [cities, setCities] = useState(initialCities);
  const [globalCOD, setGlobalCOD] = useState(true);

  const toggleCOD = (id: number) =>
    setCities(cs => cs.map(c => c.id === id ? { ...c, cod: !c.cod } : c));
  const toggleActive = (id: number) =>
    setCities(cs => cs.map(c => c.id === id ? { ...c, active: !c.active } : c));

  const activeCities = cities.filter(c => c.active);
  const avgPrice = activeCities.length
    ? Math.round(activeCities.reduce((s, c) => s + c.price, 0) / activeCities.length)
    : 0;

  return (
    <div className="space-y-5 max-w-4xl">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-gray-900">إعدادات التوصيل</h2>
          <p className="text-sm text-gray-500">{activeCities.length} مدينة نشطة · متوسط السعر {avgPrice} درهم</p>
        </div>
        <button className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1eb85a] text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-md shadow-green-200 hover:-translate-y-0.5 transition-all w-fit">
          <Plus className="w-4 h-4" />
          إضافة مدينة
        </button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: MapPin,       label: "مدن التوصيل",  value: `${activeCities.length}`,       color: "from-blue-500 to-indigo-600",   bg: "from-blue-50 to-indigo-50",   border: "border-blue-100" },
          { icon: Truck,        label: "متوسط السعر",  value: `${avgPrice} درهم`,              color: "from-[#25D366] to-emerald-600", bg: "from-green-50 to-emerald-50", border: "border-green-100" },
          { icon: CheckCircle2, label: "دعم COD",      value: `${cities.filter(c => c.cod && c.active).length} مدينة`, color: "from-purple-500 to-violet-600", bg: "from-purple-50 to-violet-50", border: "border-purple-100" },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={`bg-gradient-to-br ${s.bg} border ${s.border} rounded-2xl p-4`}>
              <div className={`w-9 h-9 bg-gradient-to-br ${s.color} rounded-xl flex items-center justify-center mb-2 shadow-sm`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <p className="text-lg font-black text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Global COD toggle */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">الدفع عند الاستلام (COD)</p>
              <p className="text-xs text-gray-500 mt-0.5">تفعيل لجميع المدن دفعة واحدة</p>
            </div>
          </div>
          <button onClick={() => setGlobalCOD(!globalCOD)} className="shrink-0">
            {globalCOD
              ? <ToggleRight className="w-8 h-8 text-[#25D366]" />
              : <ToggleLeft className="w-8 h-8 text-gray-300" />
            }
          </button>
        </div>
      </div>

      {/* Cities table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 text-sm">أسعار التوصيل حسب المدينة</h3>
          <span className="text-xs text-gray-400">{cities.length} مدينة مُعدَّة</span>
        </div>

        {/* Desktop header */}
        <div className="hidden sm:grid grid-cols-12 gap-2 px-5 py-2.5 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wide">
          <div className="col-span-3">المدينة</div>
          <div className="col-span-2 text-center">سعر التوصيل</div>
          <div className="col-span-3 text-center">مدة التوصيل</div>
          <div className="col-span-2 text-center">COD</div>
          <div className="col-span-2 text-center">الحالة</div>
        </div>

        <div className="divide-y divide-gray-50">
          {cities.map((c) => (
            <div key={c.id} className={`px-5 py-3.5 transition-colors hover:bg-gray-50/60 ${!c.active ? "opacity-50" : ""}`}>
              {/* Desktop */}
              <div className="hidden sm:grid grid-cols-12 gap-2 items-center">
                <div className="col-span-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="text-sm font-semibold text-gray-900">{c.city}</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="inline-flex items-center justify-center bg-gray-100 rounded-xl px-3 py-1 text-sm font-black text-gray-900">{c.price} د</span>
                </div>
                <div className="col-span-3 text-center flex items-center justify-center gap-1.5 text-xs text-gray-500">
                  <Clock className="w-3.5 h-3.5" />
                  {c.time}
                </div>
                <div className="col-span-2 flex justify-center">
                  <button onClick={() => toggleCOD(c.id)}>
                    {c.cod
                      ? <ToggleRight className="w-7 h-7 text-[#25D366]" />
                      : <ToggleLeft className="w-7 h-7 text-gray-300" />
                    }
                  </button>
                </div>
                <div className="col-span-2 flex items-center justify-center gap-2">
                  <button onClick={() => toggleActive(c.id)} className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-colors ${c.active ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
                    {c.active ? "نشط" : "متوقف"}
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-blue-500 rounded-lg hover:bg-blue-50 transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Mobile */}
              <div className="sm:hidden flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">{c.city}</p>
                    <p className="text-xs text-gray-500">{c.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-gray-900">{c.price} د</span>
                  {c.cod && <span className="text-[9px] bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded-full">COD</span>}
                  <button onClick={() => toggleActive(c.id)} className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {c.active ? "نشط" : "متوقف"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-bold text-gray-900 text-sm mb-3">ملاحظات التوصيل</h3>
        <textarea
          rows={3}
          defaultValue="يتم التوصيل عبر شركات Amana وYalidin. في حالة التأخر يتواصل المندوب مع الزبون مباشرة. جميع الطلبات مؤمّنة."
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366] transition-all resize-none leading-relaxed"
        />
        <p className="text-xs text-gray-400 mt-1.5">يستخدم البوت هذه الملاحظة عند الحاجة للإجابة على أسئلة التوصيل.</p>
      </div>
    </div>
  );
}
