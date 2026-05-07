"use client";

import { useState } from "react";
import {
  MapPin, Plus, Pencil, Trash2, Truck, Clock, CheckCircle2,
  ToggleLeft, ToggleRight, X, Loader2, AlertCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

// ── Types ────────────────────────────────────────────────────────────────────

type Zone = {
  id: string;
  city: string;
  price: number;
  delivery_time: string;
  cod_enabled: boolean;
  active: boolean;
  created_at: string;
};

type ZoneForm = {
  city: string;
  price: string;
  delivery_time: string;
  cod_enabled: boolean;
  active: boolean;
};

const emptyForm: ZoneForm = {
  city: "",
  price: "",
  delivery_time: "",
  cod_enabled: true,
  active: true,
};

const inputCls =
  "w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366] transition-all";

// ── Zone modal (create + edit) ────────────────────────────────────────────────

function ZoneModal({
  mode,
  initial,
  storeId,
  onClose,
  onSaved,
}: {
  mode: "create" | "edit";
  initial: ZoneForm & { id?: string };
  storeId: string;
  onClose: () => void;
  onSaved: (zone: Zone) => void;
}) {
  const [form, setForm] = useState<ZoneForm>({
    city:          initial.city,
    price:         initial.price,
    delivery_time: initial.delivery_time,
    cod_enabled:   initial.cod_enabled,
    active:        initial.active,
  });
  const [saving, setSaving] = useState(false);
  const [error,  setError]  = useState("");

  const set = (k: keyof ZoneForm, v: string | boolean) =>
    setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    const supabase = createClient();
    const payload = {
      city:          form.city.trim(),
      price:         parseFloat(form.price),
      delivery_time: form.delivery_time.trim(),
      cod_enabled:   form.cod_enabled,
      active:        form.active,
    };

    let data: Zone | null = null;
    let err: { message: string; details?: string } | null = null;

    if (mode === "create") {
      const res = await supabase
        .from("delivery_zones")
        .insert({ store_id: storeId, ...payload })
        .select("id, city, price, delivery_time, cod_enabled, active, created_at")
        .single();
      data = res.data as Zone;
      err  = res.error;
    } else {
      const res = await supabase
        .from("delivery_zones")
        .update(payload)
        .eq("id", initial.id!)
        .select("id, city, price, delivery_time, cod_enabled, active, created_at")
        .single();
      data = res.data as Zone;
      err  = res.error;
    }

    setSaving(false);

    if (err) {
      console.error("[delivery] save error:", err);
      const isDuplicate = err.message?.includes("unique") || err.details?.includes("already exists");
      setError(isDuplicate ? "هذه المدينة موجودة بالفعل في قائمة التوصيل" : `خطأ في الحفظ: ${err.message}`);
      return;
    }

    if (data) onSaved(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="text-base font-black text-gray-900">
            {mode === "create" ? "إضافة مدينة توصيل" : "تعديل منطقة التوصيل"}
          </h3>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* City */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              المدينة <span className="text-red-500">*</span>
            </label>
            <input
              required
              value={form.city}
              onChange={e => set("city", e.target.value)}
              placeholder="مثال: الدار البيضاء، مراكش، طنجة"
              className={inputCls}
            />
          </div>

          {/* Price + Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                سعر التوصيل (درهم) <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="number"
                min="0"
                step="0.01"
                dir="ltr"
                value={form.price}
                onChange={e => set("price", e.target.value)}
                placeholder="25"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                مدة التوصيل <span className="text-red-500">*</span>
              </label>
              <input
                required
                value={form.delivery_time}
                onChange={e => set("delivery_time", e.target.value)}
                placeholder="مثال: 24 ساعة"
                className={inputCls}
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={() => set("cod_enabled", !form.cod_enabled)}
              className="w-full flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-semibold text-gray-700">الدفع عند الاستلام (COD)</span>
              </div>
              {form.cod_enabled
                ? <ToggleRight className="w-7 h-7 text-[#25D366]" />
                : <ToggleLeft  className="w-7 h-7 text-gray-300" />
              }
            </button>

            <button
              type="button"
              onClick={() => set("active", !form.active)}
              className="w-full flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-semibold text-gray-700">منطقة نشطة</span>
              </div>
              {form.active
                ? <ToggleRight className="w-7 h-7 text-[#25D366]" />
                : <ToggleLeft  className="w-7 h-7 text-gray-300" />
              }
            </button>
          </div>

          {/* Actions */}
          <div className="flex gap-2.5 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm py-2.5 rounded-xl transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-[#25D366] hover:bg-[#1fb954] disabled:opacity-60 text-white font-bold text-sm py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {saving
                ? <><Loader2 className="w-4 h-4 animate-spin" />جاري الحفظ...</>
                : mode === "create" ? "إضافة المدينة" : "حفظ التعديلات"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function DeliveryClient({
  storeId,
  initialZones,
}: {
  storeId: string;
  initialZones: Zone[];
}) {
  const [zones,      setZones]      = useState<Zone[]>(initialZones);
  const [globalCOD,  setGlobalCOD]  = useState(true);
  const [modal,      setModal]      = useState<{ mode: "create" | "edit"; zone?: Zone } | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const activeCities = zones.filter(z => z.active);
  const avgPrice = activeCities.length
    ? Math.round(activeCities.reduce((s, z) => s + z.price, 0) / activeCities.length)
    : 0;

  // ── Toggle field (cod_enabled / active) ───────────────────────

  const toggleField = async (id: string, field: "cod_enabled" | "active", current: boolean) => {
    setTogglingId(id);
    // Optimistic
    setZones(zs => zs.map(z => z.id === id ? { ...z, [field]: !current } : z));

    const supabase = createClient();
    const { error } = await supabase
      .from("delivery_zones")
      .update({ [field]: !current })
      .eq("id", id);

    setTogglingId(null);

    if (error) {
      console.error(`[delivery] toggle ${field} error:`, error);
      // Revert
      setZones(zs => zs.map(z => z.id === id ? { ...z, [field]: current } : z));
    }
  };

  // ── Delete ─────────────────────────────────────────────────────

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف منطقة التوصيل هذه؟")) return;
    setDeletingId(id);

    const supabase = createClient();
    const { error } = await supabase
      .from("delivery_zones")
      .delete()
      .eq("id", id);

    setDeletingId(null);

    if (error) {
      console.error("[delivery] delete error:", error);
      alert(`فشل الحذف: ${error.message}`);
      return;
    }
    setZones(zs => zs.filter(z => z.id !== id));
  };

  // ── Modal callbacks ────────────────────────────────────────────

  const handleSaved = (zone: Zone) => {
    if (modal?.mode === "create") {
      setZones(zs => [...zs, zone].sort((a, b) => a.city.localeCompare(b.city, "ar")));
    } else {
      setZones(zs => zs.map(z => z.id === zone.id ? zone : z));
    }
  };

  return (
    <div className="space-y-5 max-w-4xl">

      {/* Zone modal */}
      {modal && (
        <ZoneModal
          mode={modal.mode}
          storeId={storeId}
          initial={
            modal.zone
              ? {
                  id:            modal.zone.id,
                  city:          modal.zone.city,
                  price:         String(modal.zone.price),
                  delivery_time: modal.zone.delivery_time,
                  cod_enabled:   modal.zone.cod_enabled,
                  active:        modal.zone.active,
                }
              : { ...emptyForm }
          }
          onClose={() => setModal(null)}
          onSaved={zone => { handleSaved(zone); setModal(null); }}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-gray-900">إعدادات التوصيل</h2>
          <p className="text-sm text-gray-500">
            {activeCities.length} مدينة نشطة · متوسط السعر {avgPrice} درهم
          </p>
        </div>
        <button
          onClick={() => setModal({ mode: "create" })}
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1eb85a] text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-md shadow-green-200 hover:-translate-y-0.5 transition-all w-fit"
        >
          <Plus className="w-4 h-4" />
          إضافة مدينة
        </button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: MapPin,       label: "مدن التوصيل",  value: `${activeCities.length}`,                                          color: "from-blue-500 to-indigo-600",   bg: "from-blue-50 to-indigo-50",   border: "border-blue-100"   },
          { icon: Truck,        label: "متوسط السعر",  value: `${avgPrice} درهم`,                                                color: "from-[#25D366] to-emerald-600", bg: "from-green-50 to-emerald-50", border: "border-green-100"  },
          { icon: CheckCircle2, label: "دعم COD",      value: `${zones.filter(z => z.cod_enabled && z.active).length} مدينة`,    color: "from-purple-500 to-violet-600", bg: "from-purple-50 to-violet-50", border: "border-purple-100" },
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
          <button onClick={() => setGlobalCOD(v => !v)} className="shrink-0">
            {globalCOD
              ? <ToggleRight className="w-8 h-8 text-[#25D366]" />
              : <ToggleLeft  className="w-8 h-8 text-gray-300" />
            }
          </button>
        </div>
      </div>

      {/* Cities table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 text-sm">أسعار التوصيل حسب المدينة</h3>
          <span className="text-xs text-gray-400">{zones.length} مدينة مُعدَّة</span>
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
          {zones.map(z => {
            const isDeleting  = deletingId === z.id;
            const isToggling  = togglingId === z.id;
            return (
              <div
                key={z.id}
                className={`px-5 py-3.5 transition-colors hover:bg-gray-50/60 ${!z.active ? "opacity-50" : ""} ${isDeleting ? "opacity-30 pointer-events-none" : ""}`}
              >
                {/* Desktop */}
                <div className="hidden sm:grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="text-sm font-semibold text-gray-900">{z.city}</span>
                  </div>

                  <div className="col-span-2 text-center">
                    <span className="inline-flex items-center justify-center bg-gray-100 rounded-xl px-3 py-1 text-sm font-black text-gray-900">
                      {z.price} د
                    </span>
                  </div>

                  <div className="col-span-3 text-center flex items-center justify-center gap-1.5 text-xs text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    {z.delivery_time}
                  </div>

                  <div className="col-span-2 flex justify-center">
                    <button
                      onClick={() => toggleField(z.id, "cod_enabled", z.cod_enabled)}
                      disabled={isToggling}
                      className="disabled:opacity-50"
                    >
                      {z.cod_enabled
                        ? <ToggleRight className="w-7 h-7 text-[#25D366]" />
                        : <ToggleLeft  className="w-7 h-7 text-gray-300" />
                      }
                    </button>
                  </div>

                  <div className="col-span-2 flex items-center justify-center gap-2">
                    <button
                      onClick={() => toggleField(z.id, "active", z.active)}
                      disabled={isToggling}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-colors disabled:opacity-50 ${z.active ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                    >
                      {z.active ? "نشط" : "متوقف"}
                    </button>
                    <button
                      onClick={() => setModal({ mode: "edit", zone: z })}
                      className="p-1.5 text-gray-400 hover:text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(z.id)}
                      disabled={isDeleting}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-40"
                    >
                      {isDeleting
                        ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        : <Trash2  className="w-3.5 h-3.5" />
                      }
                    </button>
                  </div>
                </div>

                {/* Mobile */}
                <div className="sm:hidden flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">{z.city}</p>
                      <p className="text-xs text-gray-500">{z.delivery_time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-gray-900">{z.price} د</span>
                    {z.cod_enabled && (
                      <span className="text-[9px] bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded-full">COD</span>
                    )}
                    <button
                      onClick={() => toggleField(z.id, "active", z.active)}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${z.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                    >
                      {z.active ? "نشط" : "متوقف"}
                    </button>
                    <button
                      onClick={() => setModal({ mode: "edit", zone: z })}
                      className="p-1.5 text-gray-400 hover:text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(z.id)}
                      disabled={isDeleting}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-40"
                    >
                      {isDeleting
                        ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        : <Trash2  className="w-3.5 h-3.5" />
                      }
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {zones.length === 0 && (
          <div className="py-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-500 font-semibold mb-1">لا توجد مناطق توصيل بعد</p>
            <p className="text-gray-400 text-sm mb-4">أضف مدناً وسيستخدمها البوت تلقائياً للرد على أسئلة التوصيل</p>
            <button
              onClick={() => setModal({ mode: "create" })}
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1eb85a] text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-md shadow-green-200 transition-all"
            >
              <Plus className="w-4 h-4" />
              إضافة أول مدينة
            </button>
          </div>
        )}
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
