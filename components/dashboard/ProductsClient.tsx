"use client";

import { useRef, useState } from "react";
import {
  Plus, Search, Filter, Package, AlertCircle, X, Loader2, Trash2, Tag,
  ImagePlus, CheckCircle2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  category: string | null;
  sizes: string[] | string | null;
  colors: string[] | string | null;
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
};

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

const emptyForm: FormData = {
  name: "", description: "", price: "", stock: "0",
  category: "", sizes: "", colors: "",
};

const categoryStyle: Record<string, string> = {
  "عطور":     "bg-amber-50 text-amber-700 border-amber-200",
  "ملابس":    "bg-blue-50 text-blue-700 border-blue-200",
  "مكملات":   "bg-emerald-50 text-emerald-700 border-emerald-200",
  "كوزميتيك": "bg-pink-50 text-pink-700 border-pink-200",
};

function productStatus(p: Product) {
  if (!p.active)     return { label: "متوقف",        cls: "bg-gray-100 text-gray-500"  };
  if (p.stock === 0) return { label: "نفد المخزون",  cls: "bg-red-100 text-red-600"    };
  return               { label: "نشط",               cls: "bg-green-100 text-green-700" };
}

const inputCls = "w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366] transition-all";

function listToItems(value: string[] | string | null) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function listToText(value: string[] | string | null) {
  return listToItems(value).join(", ");
}

export default function ProductsClient({
  storeId,
  initialProducts,
}: {
  storeId: string;
  initialProducts: Product[];
}) {
  const [products, setProducts]     = useState<Product[]>(initialProducts);
  const [search, setSearch]         = useState("");
  const [modalOpen, setModalOpen]   = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm]             = useState<FormData>(emptyForm);
  const [saving, setSaving]         = useState(false);
  const [formError, setFormError]   = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Image upload state
  const fileInputRef                      = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile]         = useState<File | null>(null);
  const [imagePreview, setImagePreview]   = useState<string | null>(null);
  const [uploading, setUploading]         = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const filtered = products.filter(p =>
    p.name.includes(search) || (p.category ?? "").includes(search)
  );
  const activeCount = products.filter((p) => p.active).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;
  const categoriesCount = new Set(products.map((p) => p.category).filter(Boolean)).size;

  const field = (key: keyof FormData) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value })),
  });

  const openModal = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setFormError(null);
    setImageFile(null);
    setImagePreview(null);
    setUploadProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description ?? "",
      price: String(product.price ?? ""),
      stock: String(product.stock ?? 0),
      category: product.category ?? "",
      sizes: listToText(product.sizes),
      colors: listToText(product.colors),
    });
    setFormError(null);
    setImageFile(null);
    setImagePreview(product.image_url);
    setUploadProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setModalOpen(true);
  };

  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>, product: Product) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      openEditModal(product);
    } catch (error) {
      console.error("[products] edit open error:", error);
      alert("تعذر فتح تعديل المنتج. عاود حمّل الصفحة وجرب مرة أخرى.");
    }
  };

  const closeModal = () => {
    if (saving || uploading) return;
    setModalOpen(false);
    setEditingProduct(null);
    setFormError(null);
    setImageFile(null);
    setImagePreview(null);
    setUploadProgress(0);
  };

  // ── Image selection & validation ─────────────────────────────
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setFormError("نوع الصورة غير مدعوم. استخدم JPG, PNG, WebP أو GIF");
      e.target.value = "";
      return;
    }
    if (file.size > MAX_BYTES) {
      setFormError("حجم الصورة يجب أن يكون أقل من 5MB");
      e.target.value = "";
      return;
    }

    setFormError(null);
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setUploadProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ── Upload to Supabase Storage ────────────────────────────────
  const uploadImage = async (supabase: ReturnType<typeof createClient>): Promise<string | null> => {
    if (!imageFile) return null;

    setUploading(true);
    setUploadProgress(0);

    // Animate progress bar: 0 → 85% while waiting for the upload
    const timer = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 85) { clearInterval(timer); return 85; }
        return prev + 5;
      });
    }, 120);

    const ext  = imageFile.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const path = `${storeId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(path, imageFile, { cacheControl: "3600", upsert: false });

    clearInterval(timer);

    if (uploadError) {
      console.error("[products] image upload error:", uploadError);
      setUploading(false);
      setUploadProgress(0);
      // Return null instead of throwing — insert will proceed without image
      return null;
    }

    setUploadProgress(100);

    const { data: { publicUrl } } = supabase.storage
      .from("product-images")
      .getPublicUrl(uploadData.path);

    setUploading(false);
    return publicUrl;
  };

  // ── Save product ──────────────────────────────────────────────
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSaving(true);

    const supabase = createClient();

    console.log("[products] handleSave — storeId:", storeId, "editing:", editingProduct?.id ?? null);

    let imageUrl: string | null = editingProduct?.image_url ?? null;
    let imageUploadFailed = false;

    if (imageFile) {
      imageUrl = await uploadImage(supabase);
      if (imageUrl === null) {
        imageUploadFailed = true;
        console.warn("[products] image upload failed, proceeding without image");
      }
    }

    const payload = {
      store_id:    storeId,
      name:        form.name.trim(),
      description: form.description.trim() || null,
      price:       parseFloat(form.price),
      stock:       parseInt(form.stock, 10),
      category:    form.category.trim() || null,
      sizes:       form.sizes.trim()   ? form.sizes.split(",").map(s => s.trim()).filter(Boolean)  : null,
      colors:      form.colors.trim()  ? form.colors.split(",").map(c => c.trim()).filter(Boolean) : null,
      image_url:   imageUrl,
      active:      true,
    };

    console.log("[products] saving payload:", payload);

    const query = editingProduct
      ? supabase
          .from("products")
          .update({
            name: payload.name,
            description: payload.description,
            price: payload.price,
            stock: payload.stock,
            category: payload.category,
            sizes: payload.sizes,
            colors: payload.colors,
            image_url: payload.image_url,
          })
          .eq("id", editingProduct.id)
          .eq("store_id", storeId)
      : supabase
          .from("products")
          .insert(payload);

    const { data, error } = await query
      .select("id, name, description, price, stock, category, sizes, colors, image_url, active, created_at")
      .single();

    console.log("[products] save response — data:", data, "error:", error);

    setSaving(false);

    if (error) {
      console.error("[products] save error (full):", JSON.stringify(error, null, 2));
      setFormError(`خطأ في الحفظ: ${error.message}${error.details ? ` — ${error.details}` : ""}${error.hint ? ` (${error.hint})` : ""}`);
      return;
    }

    if (!data) {
      console.error("[products] insert returned no data — possible RLS policy blocking SELECT");
      setFormError("تم الحفظ لكن تعذّر تحميل المنتج. تحقق من صلاحيات RLS أو أعد تحميل الصفحة.");
      return;
    }

    setProducts(prev => editingProduct
      ? prev.map((product) => product.id === data.id ? data : product)
      : [data, ...prev]
    );
    closeModal();

    if (imageUploadFailed) {
      console.warn("[products] product saved without image due to upload failure");
    }
  };

  // ── Delete ────────────────────────────────────────────────────
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

      <header className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-gray-950">المنتجات</h2>
            <p className="mt-2 text-sm text-gray-500">كتالوج المنتجات اللي كيعتمد عليه البوت فالردود وتأكيد الطلبات.</p>
          </div>
          <button
            onClick={openModal}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-gray-800"
          >
            <Plus className="h-4 w-4" />
            إضافة منتج
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            ["منتجات نشطة", activeCount],
            ["نفد المخزون", outOfStockCount],
            ["فئات", categoriesCount],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-3">
              <p className="text-xs font-semibold text-gray-500">{label}</p>
              <p className="mt-2 text-xl font-extrabold text-gray-950">{value}</p>
            </div>
          ))}
        </div>
      </header>

      {/* Search + filter */}
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
        <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-600 font-medium hover:bg-gray-50 shadow-sm transition-colors shrink-0">
          <Filter className="w-4 h-4" />
          <span className="hidden sm:inline">تصفية</span>
        </button>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(p => {
          const { label, cls } = productStatus(p);
          const isDeleting     = deletingId === p.id;
          const sizes          = listToItems(p.sizes);
          const colors         = listToItems(p.colors);
          return (
            <div
              key={p.id}
              className={`overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md group ${isDeleting ? "opacity-50 pointer-events-none" : ""}`}
            >
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

              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-bold text-gray-900 text-sm leading-tight">{p.name}</h4>
                  {p.category && (
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${categoryStyle[p.category] ?? "bg-gray-50 text-gray-500 border-gray-200"}`}>
                      {p.category}
                    </span>
                  )}
                </div>

                {p.description && <p className="text-xs text-gray-400 mb-2 line-clamp-1">{p.description}</p>}

                <p className="text-xl font-black text-[#25D366] mb-3">
                  {p.price} <span className="text-sm font-semibold">درهم</span>
                </p>

                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <Package className="w-3.5 h-3.5 ml-1" />
                  {p.stock === 0
                    ? <span className="text-red-500 font-semibold flex items-center gap-1"><AlertCircle className="w-3 h-3" />نفد</span>
                    : <span>{p.stock} في المخزون</span>
                  }
                </div>

                {sizes.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {sizes.map(s => <span key={s} className="text-[10px] bg-gray-100 text-gray-600 font-semibold px-2 py-0.5 rounded-lg">{s}</span>)}
                  </div>
                )}
                {colors.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {colors.map(c => <span key={c} className="text-[10px] bg-gray-50 border border-gray-200 text-gray-500 px-2 py-0.5 rounded-lg">{c}</span>)}
                  </div>
                )}

                <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={(event) => handleEditClick(event, p)}
                    className="flex-1 rounded-lg bg-gray-50 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-100"
                  >
                    تعديل
                  </button>
                  <button className="flex-1 rounded-lg border border-gray-200 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50">جاهز للبوت</button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Add card */}
        <button
          onClick={openModal}
          className="flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-200 bg-white p-8 text-gray-400 transition hover:border-gray-400 hover:bg-gray-50 hover:text-gray-700"
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
          <p className="text-gray-400 text-sm">أضف أول منتج باش البوت يقدر يجاوب عليه بثقة</p>
        </div>
      )}

      {/* ── Create / Edit Product Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />

          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-3xl z-10">
              <div>
                <h3 className="font-black text-gray-900">{editingProduct ? "تعديل المنتج" : "إضافة منتج جديد"}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{editingProduct ? "حدّث المعلومات التي سيستعملها البوت في الردود" : "سيتعلمه البوت ويرد عليه تلقائياً"}</p>
              </div>
              <button onClick={closeModal} disabled={saving || uploading} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 transition-colors disabled:opacity-40">
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

              {/* ── Image upload zone ── */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">صورة المنتج</label>

                {imagePreview ? (
                  /* Preview */
                  <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imagePreview} alt="معاينة" className="w-full h-44 object-cover" />

                    {/* Upload progress overlay */}
                    {uploading && (
                      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-3">
                        <Loader2 className="w-8 h-8 text-white animate-spin" />
                        <div className="w-48 bg-white/20 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-[#25D366] rounded-full transition-all duration-200"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                        <p className="text-white text-xs font-bold">{uploadProgress}%</p>
                      </div>
                    )}

                    {/* Done overlay */}
                    {!uploading && uploadProgress === 100 && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="bg-[#25D366] rounded-full p-2">
                          <CheckCircle2 className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    )}

                    {/* Remove button */}
                    {!uploading && uploadProgress < 100 && (
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 left-2 bg-white/90 hover:bg-white text-gray-600 hover:text-red-500 p-1.5 rounded-xl shadow transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* File info */}
                    {!uploading && (
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
                        <p className="text-white text-[10px] truncate">{imageFile?.name ?? (editingProduct?.image_url ? "الصورة الحالية" : "")}</p>
                        <p className="text-white/70 text-[9px]">{imageFile ? `${(imageFile.size / 1024).toFixed(0)} KB` : ""}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Drop zone */
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-gray-200 hover:border-[#25D366]/50 hover:bg-green-50/20 rounded-2xl py-8 flex flex-col items-center gap-2 text-gray-400 hover:text-[#25D366] transition-all"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
                      <ImagePlus className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold">اختر صورة أو اسحبها هنا</p>
                    <p className="text-xs text-gray-400">JPG, PNG, WebP — الحد الأقصى 5MB</p>
                  </button>
                )}

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={handleImageChange}
                />

                {/* Change image link after selection */}
                {imagePreview && !uploading && uploadProgress < 100 && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs text-[#25D366] font-semibold mt-1.5 hover:underline"
                  >
                    تغيير الصورة
                  </button>
                )}
              </div>

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
                  disabled={saving || uploading}
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="flex-1 py-3 rounded-xl bg-[#25D366] hover:bg-[#1eb85a] disabled:opacity-60 text-white text-sm font-bold transition-all flex items-center justify-center gap-2"
                >
                  {uploading
                    ? <><Loader2 className="w-4 h-4 animate-spin" />جاري الرفع... {uploadProgress}%</>
                    : saving
                    ? <><Loader2 className="w-4 h-4 animate-spin" />جاري الحفظ...</>
                    : editingProduct ? "حفظ التعديلات" : "حفظ المنتج"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
