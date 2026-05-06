"use client";

import { useState } from "react";
import { Plus, Search, Filter, MoreVertical, Package, Tag, AlertCircle } from "lucide-react";

const initialProducts = [
  {
    id: 1,
    emoji: "🌸",
    name: "بلو دي شانيل 100ml",
    category: "عطور",
    price: 640,
    stock: 12,
    sizes: [],
    colors: [],
    status: "نشط",
    sold: 38,
  },
  {
    id: 2,
    emoji: "🌷",
    name: "لالابيل الوردي 50ml",
    category: "عطور",
    price: 280,
    stock: 8,
    sizes: [],
    colors: [],
    status: "نشط",
    sold: 22,
  },
  {
    id: 3,
    emoji: "👗",
    name: "قفطان كازاوي",
    category: "ملابس",
    price: 320,
    stock: 5,
    sizes: ["S", "M", "L", "XL"],
    colors: ["أزرق", "بيج", "أخضر"],
    status: "نشط",
    sold: 17,
  },
  {
    id: 4,
    emoji: "💪",
    name: "واي بروتين شوكولاتة 1kg",
    category: "مكملات",
    price: 280,
    stock: 3,
    sizes: [],
    colors: ["شوكولاتة", "فانيليا", "فراولة"],
    status: "نشط",
    sold: 29,
  },
  {
    id: 5,
    emoji: "👕",
    name: "تيشيرت كلاسيك أسود",
    category: "ملابس",
    price: 149,
    stock: 0,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["أسود", "أبيض"],
    status: "نفد المخزون",
    sold: 54,
  },
  {
    id: 6,
    emoji: "🧴",
    name: "كريم ترطيب ليلي",
    category: "كوزميتيك",
    price: 120,
    stock: 18,
    sizes: [],
    colors: [],
    status: "نشط",
    sold: 41,
  },
];

const statusStyle: Record<string, string> = {
  "نشط":            "bg-green-100 text-green-700",
  "نفد المخزون":    "bg-red-100 text-red-600",
  "متوقف":          "bg-gray-100 text-gray-500",
};

const categoryStyle: Record<string, string> = {
  "عطور":    "bg-amber-50 text-amber-700 border-amber-200",
  "ملابس":   "bg-blue-50 text-blue-700 border-blue-200",
  "مكملات":  "bg-emerald-50 text-emerald-700 border-emerald-200",
  "كوزميتيك":"bg-pink-50 text-pink-700 border-pink-200",
};

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const products = initialProducts.filter(p =>
    p.name.includes(search) || p.category.includes(search)
  );

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-gray-900">المنتجات</h2>
          <p className="text-sm text-gray-500">{initialProducts.length} منتج مسجّل</p>
        </div>
        <button className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1eb85a] text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-md shadow-green-200 hover:-translate-y-0.5 transition-all duration-200 w-fit">
          <Plus className="w-4 h-4" />
          إضافة منتج
        </button>
      </div>

      {/* Search + filter bar */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن منتج..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl pr-9 pl-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366] shadow-sm transition-all"
          />
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-600 font-medium hover:bg-gray-50 shadow-sm transition-colors shrink-0">
          <Filter className="w-4 h-4" />
          <span className="hidden sm:inline">تصفية</span>
        </button>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group">

            {/* Image placeholder */}
            <div className="h-36 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative">
              <span className="text-5xl">{p.emoji}</span>
              <div className="absolute top-3 left-3">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${statusStyle[p.status]}`}>
                  {p.status}
                </span>
              </div>
              <button className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/80 hover:bg-white text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                <MoreVertical className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-bold text-gray-900 text-sm leading-tight">{p.name}</h4>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${categoryStyle[p.category] ?? "bg-gray-50 text-gray-500 border-gray-200"}`}>
                  {p.category}
                </span>
              </div>

              <p className="text-xl font-black text-[#25D366] mb-3">{p.price} <span className="text-sm font-semibold">درهم</span></p>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <Package className="w-3.5 h-3.5" />
                  <span>{p.stock === 0 ? <span className="text-red-500 font-semibold flex items-center gap-1"><AlertCircle className="w-3 h-3" />نفد</span> : `${p.stock} في المخزون`}</span>
                </div>
                <span className="text-gray-400">{p.sold} مباع</span>
              </div>

              {/* Sizes */}
              {p.sizes.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {p.sizes.map(s => (
                    <span key={s} className="text-[10px] bg-gray-100 text-gray-600 font-semibold px-2 py-0.5 rounded-lg">{s}</span>
                  ))}
                </div>
              )}

              {/* Colors */}
              {p.colors.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {p.colors.map(c => (
                    <span key={c} className="text-[10px] bg-gray-50 border border-gray-200 text-gray-500 px-2 py-0.5 rounded-lg">{c}</span>
                  ))}
                </div>
              )}

              <div className="flex gap-2 mt-3 pt-3 border-t border-gray-50">
                <button className="flex-1 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 py-2 rounded-xl transition-colors">تعديل</button>
                <button className="flex-1 text-xs font-semibold text-[#25D366] hover:text-white hover:bg-[#25D366] border border-[#25D366]/30 py-2 rounded-xl transition-all">نشر للبوت</button>
              </div>
            </div>
          </div>
        ))}

        {/* Add product card */}
        <button className="bg-white rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#25D366]/50 hover:bg-green-50/30 flex flex-col items-center justify-center gap-3 p-8 text-gray-400 hover:text-[#25D366] transition-all duration-200 min-h-[280px]">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
            <Plus className="w-6 h-6" />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold">إضافة منتج جديد</p>
            <p className="text-xs mt-0.5 text-gray-400">سيتعلمه البوت تلقائياً</p>
          </div>
        </button>
      </div>
    </div>
  );
}
