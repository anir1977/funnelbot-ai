"use client";

import { useState } from "react";
import {
  Plus, Search, Filter, Package, AlertCircle, X, Loader2, Trash2, Tag,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  category: string | null;
  sizes: string[] | null;
  colors: string[] | null;
  image_url: string | null;
  active: boolean;
  created_at: string;
};

type FormData = {
  name: string;
  description: string;
  price: string;
  stock: string;
  category: string;
  sizes: string;
  colors: string;
  image_url: string;
};

const emptyForm: FormData = {
  name: "", description: "", price: "", stock: "0",
  category: "", sizes: "", colors: "", image_url: "",
};

const categoryStyle: Record<string, string> = {
  "عطور":     "bg-amber-50 text-amber-700 border-amber-200",
  "ملابس":    "bg-blue-50 text-blue-700 border-blue-200",
  "مكملات":   "bg-emerald-50 text-emerald-700 border-emerald-200",
  "كوزميتيك": "bg-pink-50 text-pink-700 border-pink-200",
};

function productStatus(p: Product) {
  if (!p.active) return { label: "متوقف",       cls: "bg-gray-100 text-gray-500" };
  if (p.stock === 0) return { label: "نفد المخزون", cls: "bg-red-100 text-red-600" };
  return { label: "نشط", cls: "bg-green-100 text-green-700" };
}

const inputCls = "w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366] transition-all";

export default function ProductsClient({
  storeId,
  initialProducts,
}: {
  storeId: string;
  initialProducts: Product[];
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch]     = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm]         = useState<FormData>(emptyForm);
  const [saving, setSaving]     = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = products.filter(p =>
    p.name.includes(search) || (p.category ?? "").includes(search)
  );

  const field = (key: keyof FormData) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value })),
  });

  const openModal = () => { setForm(emptyForm); setFormError(null); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setFormError(null); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSaving(true);

    const supabase = createClient();
    const { data, error } = await supabase
      .from("products")
      .insert({
        store_id:    storeId,
        name:        form.name.trim(),
        description: form.description.trim() || null,
        price:       parseFloat(form.price),
        stock:       parseInt(form.stock, 10),
        category:    form.category.trim() || null,
        sizes:       form.sizes.trim() ? form.sizes.split(",").map(s => s.trim()).filter(Boolean) : null,
        colors:      form.colors.trim() ? form.colors.split(",").map(c => c.trim()).filter(Boolean) : null,
        image_url:   form.image_url.trim() || null,
        active:      true,
      })
      .select("id, name, description, price, stock, category, sizes, colors, image_url, active, created_at")
      .single();

    setSaving(false);

    if (error) {
      console.error("[products] insert error:", error);
      setFormError(`خطأ في الحفظ: ${error.message}`);
      return;
    }

    setProducts(prev => [data, ...prev]);
    closeModal();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;
    setDeletingId(id);

    const supabase = createClient();
    const { error } = await supabase.from("products").delete().eq("id", id);

    setDeletingId(null);
    if (error) {
      console.error("[products] delete error:", error);
      alert(`فشل الحذف: ${error.message}`);
      return;
    }
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-gray-900">المنتجات</h2>
          <p className="text-sm text-gray-500">{products.length} منتج مسجّل</p>
        </div>
        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1eb85a] text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-md shadow-green-200 hover:-translate-y-0.5 transition-all duration-200 w-fit"
        >
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
        {filtered.map(p => {
          const { label, cls } = productStatus(p);
          const isDeleting = deletingId === p.id;
          return (
            <div key={p.id} className={`bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group ${isDeleting ? "opacity-50 pointer-events-none" : ""}`}>

              {/* Image / placeholder */}
              <div className="h-36 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden">
                {p.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                ) : (
                  <Package className="w-12 h-12 text-gray-300" />
                )}
                <div className="absolute top-3 left-3">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${cls}`}>{label}</span>
                </div>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/80 hover:bg-red-50 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                  title="حذف المنتج"
                >
                  {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-bold text-gray-900 text-sm leading-tight">{p.name}</h4>
                  {p.category && (
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${categoryStyle[p.category] ?? "bg-gray-50 text-gray-500 border-gray-200"}`}>
                      {p.category}
                    </span>
                  )}
                </div>

                {p.description && (
                  <p className="text-xs text-gray-400 mb-2 line-clamp-1">{p.description}</p>
                )}

                <p className="text-xl font-black text-[#25D366] mb-3">
                  {p.price} <span className="text-sm font-semibold">درهم</span>
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Package className="w-3.5 h-3.5" />
                    {p.stock === 0
                      ? <span className="text-red-500 font-semibold flex items-center gap-1"><AlertCircle className="w-3 h-3" />نفد</span>
                      : <span>{p.stock} في المخزون</span>
                    }
                  </div>
                </div>

                {p.sizes && p.sizes.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {p.sizes.map(s => (
                      <span key={s} className="text-[10px] bg-gray-100 text-gray-600 font-semibold px-2 py-0.5 rounded-lg">{s}</span>
                    ))}
                  </div>
                )}

                {p.colors && p.colors.length > 0 && (
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
          );
        })}

        {/* Add product card */}
        <button
          onClick={openModal}
          className="bg-white rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#25D366]/50 hover:bg-green-50/30 flex flex-col items-center justify-center gap-3 p-8 text-gray-400 hover:text-[#25D366] transition-all duration-200 min-h-[280px]"
        >
          <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
            <Plus className="w-6 h-6" />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold">إضافة منتج جديد</p>
            <p className="text-xs mt-0.5 text-gray-400">سيتعلمه البوت تلقائياً</p>
          </div>
        </button>
      </div>

      {/* Empty state */}
      {products.length === 0 && (
        <div className="text-center py-16">
          <Tag className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-semibold mb-1">لا توجد منتجات بعد</p>
          <p className="text-gray-400 text-sm">أضف أول منتج وسيبدأ البوت في بيعه تلقائياً</p>
        </div>
      )}

      {/* ── Create Product Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />

          {/* Dialog */}
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-3xl z-10">
              <div>
                <h3 className="font-black text-gray-900">إضافة منتج جديد</h3>
                <p className="text-xs text-gray-400 mt-0.5">سيتعلمه البوت ويرد عليه تلقائياً</p>
              </div>
              <button onClick={closeModal} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              {formError && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <p className="text-sm text-red-600">{formError}</p>
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">اسم المنتج <span className="text-red-500">*</span></label>
                <input type="text" placeholder="بلو دي شانيل 100ml" className={inputCls} required {...field("name")} />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">الوصف</label>
                <textarea
                  placeholder="وصف مختصر للمنتج..."
                  rows={2}
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  className={`${inputCls} resize-none`}
                />
              </div>

              {/* Price + Stock */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">السعر (درهم) <span className="text-red-500">*</span></label>
                  <input type="number" min="0" step="0.01" placeholder="640" className={inputCls} required dir="ltr" {...field("price")} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">المخزون</label>
                  <input type="number" min="0" step="1" placeholder="10" className={inputCls} dir="ltr" {...field("stock")} />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">الفئة</label>
                <input type="text" placeholder="مثال: عطور، ملابس، مكملات" className={inputCls} {...field("category")} />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">رابط الصورة</label>
                <input type="url" placeholder="https://..." className={inputCls} dir="ltr" {...field("image_url")} />
              </div>

              {/* Sizes */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">المقاسات</label>
                <input type="text" placeholder="S, M, L, XL  (مفصولة بفواصل)" className={inputCls} {...field("sizes")} />
                <p className="text-[10px] text-gray-400 mt-1">اتركه فارغاً إذا لم يكن للمنتج مقاسات</p>
              </div>

              {/* Colors */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">الألوان</label>
                <input type="text" placeholder="أحمر, أسود, أبيض  (مفصولة بفواصل)" className={inputCls} {...field("colors")} />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-3 rounded-xl bg-[#25D366] hover:bg-[#1eb85a] disabled:opacity-60 text-white text-sm font-bold transition-all flex items-center justify-center gap-2"
                >
                  {saving ? <><Loader2 className="w-4 h-4 animate-spin" />جاري الحفظ...</> : "حفظ المنتج"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
