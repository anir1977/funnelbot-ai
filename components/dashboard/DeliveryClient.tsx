"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
  Pencil,
  Plus,
  ToggleLeft,
  ToggleRight,
  Trash2,
  Truck,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

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

const inputCls = "w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-950 outline-none transition focus:border-gray-400 focus:ring-4 focus:ring-gray-100";

function money(value: number) {
  return `${Number(value ?? 0).toLocaleString("fr-MA")} د`;
}

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
    city: initial.city,
    price: initial.price,
    delivery_time: initial.delivery_time,
    cod_enabled: initial.cod_enabled,
    active: initial.active,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof ZoneForm, value: string | boolean) =>
    setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      city: form.city.trim(),
      price: Number(form.price),
      delivery_time: form.delivery_time.trim(),
      cod_enabled: form.cod_enabled,
      active: form.active,
    };

    const supabase = createClient();
    const query = mode === "create"
      ? supabase.from("delivery_zones").insert({ store_id: storeId, ...payload })
      : supabase.from("delivery_zones").update(payload).eq("id", initial.id!);

    const { data, error: saveError } = await query
      .select("id, city, price, delivery_time, cod_enabled, active, created_at")
      .single();

    setSaving(false);

    if (saveError) {
      const duplicate = saveError.message?.includes("unique") || saveError.details?.includes("already exists");
      setError(duplicate ? "هاد المدينة موجودة من قبل." : `خطأ في الحفظ: ${saveError.message}`);
      return;
    }

    if (data) onSaved(data as Zone);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 p-5">
          <div>
            <h3 className="text-base font-extrabold text-gray-950">{mode === "create" ? "إضافة مدينة" : "تعديل المدينة"}</h3>
            <p className="mt-1 text-xs text-gray-500">البوت يستعمل هاد المعلومات فالردود ديال التوصيل.</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-xs font-bold text-gray-700">المدينة</label>
            <input required value={form.city} onChange={(event) => set("city", event.target.value)} placeholder="مثال: الدار البيضاء" className={inputCls} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-gray-700">سعر التوصيل</label>
              <input required type="number" min="0" step="0.01" dir="ltr" value={form.price} onChange={(event) => set("price", event.target.value)} placeholder="25" className={inputCls} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-gray-700">المدة</label>
              <input required value={form.delivery_time} onChange={(event) => set("delivery_time", event.target.value)} placeholder="24 ساعة" className={inputCls} />
            </div>
          </div>

          <div className="space-y-2">
            {([
              ["cod_enabled", "الدفع عند الاستلام", CheckCircle2],
              ["active", "مدينة نشطة", MapPin],
            ] as const).map(([key, label, Icon]) => {
              const formKey = key as "cod_enabled" | "active";
              return (
                <button key={key} type="button" onClick={() => set(formKey, !form[formKey])} className="flex w-full items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-3 hover:bg-gray-100">
                  <span className="flex items-center gap-2 text-sm font-bold text-gray-800">
                    <Icon className="h-4 w-4 text-gray-500" />
                    {label}
                  </span>
                  {form[formKey] ? <ToggleRight className="h-7 w-7 text-emerald-600" /> : <ToggleLeft className="h-7 w-7 text-gray-300" />}
                </button>
              );
            })}
          </div>

          <div className="flex gap-2 pt-1">
            <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50">إلغاء</button>
            <button type="submit" disabled={saving} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-950 py-2.5 text-sm font-bold text-white hover:bg-gray-800 disabled:opacity-50">
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {saving ? "كيحفظ..." : mode === "create" ? "إضافة" : "حفظ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function DeliveryClient({
  storeId,
  initialZones,
}: {
  storeId: string;
  initialZones: Zone[];
}) {
  const [zones, setZones] = useState<Zone[]>(initialZones);
  const [modal, setModal] = useState<{ mode: "create" | "edit"; zone?: Zone } | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const stats = useMemo(() => {
    const active = zones.filter((zone) => zone.active);
    const avg = active.length ? Math.round(active.reduce((sum, zone) => sum + Number(zone.price), 0) / active.length) : 0;
    const cod = active.filter((zone) => zone.cod_enabled).length;
    return { active: active.length, avg, cod };
  }, [zones]);

  const toggleField = async (id: string, field: "cod_enabled" | "active", current: boolean) => {
    setTogglingId(id);
    setZones((currentZones) => currentZones.map((zone) => zone.id === id ? { ...zone, [field]: !current } : zone));

    const supabase = createClient();
    const { error } = await supabase.from("delivery_zones").update({ [field]: !current }).eq("id", id);

    setTogglingId(null);
    if (error) {
      setZones((currentZones) => currentZones.map((zone) => zone.id === id ? { ...zone, [field]: current } : zone));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("واش متأكد بغيتي تحذف هاد المدينة؟")) return;
    setDeletingId(id);

    const supabase = createClient();
    const { error } = await supabase.from("delivery_zones").delete().eq("id", id);

    setDeletingId(null);
    if (error) {
      alert(`فشل الحذف: ${error.message}`);
      return;
    }
    setZones((currentZones) => currentZones.filter((zone) => zone.id !== id));
  };

  const handleSaved = (zone: Zone) => {
    if (modal?.mode === "create") {
      setZones((currentZones) => [...currentZones, zone].sort((a, b) => a.city.localeCompare(b.city, "ar")));
    } else {
      setZones((currentZones) => currentZones.map((current) => current.id === zone.id ? zone : current));
    }
  };

  return (
    <div className="max-w-6xl space-y-5">
      {modal && (
        <ZoneModal
          mode={modal.mode}
          storeId={storeId}
          initial={modal.zone ? {
            id: modal.zone.id,
            city: modal.zone.city,
            price: String(modal.zone.price),
            delivery_time: modal.zone.delivery_time,
            cod_enabled: modal.zone.cod_enabled,
            active: modal.zone.active,
          } : { ...emptyForm }}
          onClose={() => setModal(null)}
          onSaved={(zone) => { handleSaved(zone); setModal(null); }}
        />
      )}

      <header className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-gray-950">التوصيل</h2>
            <p className="mt-2 text-sm text-gray-500">المدن والأسعار اللي غادي يستعملها البوت ملي يسول الزبون على الشحن.</p>
          </div>
          <button onClick={() => setModal({ mode: "create" })} className="inline-flex items-center gap-2 rounded-lg bg-gray-950 px-4 py-2.5 text-sm font-bold text-white hover:bg-gray-800">
            <Plus className="h-4 w-4" />
            إضافة مدينة
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            ["مدن نشطة", stats.active],
            ["متوسط السعر", money(stats.avg)],
            ["الدفع عند الاستلام", `${stats.cod} مدينة`],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-3">
              <p className="text-xs font-semibold text-gray-500">{label}</p>
              <p className="mt-2 text-xl font-extrabold text-gray-950">{value}</p>
            </div>
          ))}
        </div>
      </header>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <h3 className="text-sm font-bold text-gray-950">أسعار التوصيل حسب المدينة</h3>
          <span className="text-xs font-semibold text-gray-500">{zones.length} مدينة</span>
        </div>

        <div className="hidden grid-cols-12 gap-3 border-b border-gray-100 bg-gray-50 px-5 py-3 text-xs font-bold text-gray-500 md:grid">
          <div className="col-span-3">المدينة</div>
          <div className="col-span-2 text-center">السعر</div>
          <div className="col-span-3 text-center">المدة</div>
          <div className="col-span-2 text-center">الدفع عند الاستلام</div>
          <div className="col-span-2 text-center">الحالة</div>
        </div>

        <div className="divide-y divide-gray-100">
          {zones.map((zone) => {
            const busy = togglingId === zone.id;
            const deleting = deletingId === zone.id;
            return (
              <div key={zone.id} className={`px-5 py-3.5 transition hover:bg-gray-50 ${!zone.active ? "opacity-60" : ""} ${deleting ? "pointer-events-none opacity-30" : ""}`}>
                <div className="hidden grid-cols-12 items-center gap-3 md:grid">
                  <div className="col-span-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-bold text-gray-950">{zone.city}</span>
                  </div>
                  <div className="col-span-2 text-center text-sm font-extrabold text-gray-950">{money(zone.price)}</div>
                  <div className="col-span-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-600">
                    <Clock className="h-3.5 w-3.5 text-gray-400" />
                    {zone.delivery_time}
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <button disabled={busy} onClick={() => toggleField(zone.id, "cod_enabled", zone.cod_enabled)}>
                      {zone.cod_enabled ? <ToggleRight className="h-7 w-7 text-emerald-600" /> : <ToggleLeft className="h-7 w-7 text-gray-300" />}
                    </button>
                  </div>
                  <div className="col-span-2 flex items-center justify-center gap-2">
                    <button disabled={busy} onClick={() => toggleField(zone.id, "active", zone.active)} className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${zone.active ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" : "bg-gray-100 text-gray-500"}`}>
                      {zone.active ? "نشط" : "متوقف"}
                    </button>
                    <button onClick={() => setModal({ mode: "edit", zone })} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button disabled={deleting} onClick={() => handleDelete(zone.id)} className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600">
                      {deleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 md:hidden">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-950">{zone.city}</p>
                    <p className="mt-0.5 text-xs text-gray-500">{zone.delivery_time} · {zone.cod_enabled ? "COD" : "بلا COD"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-gray-950">{money(zone.price)}</span>
                    <button onClick={() => toggleField(zone.id, "active", zone.active)} className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${zone.active ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>{zone.active ? "نشط" : "متوقف"}</button>
                    <button onClick={() => setModal({ mode: "edit", zone })} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100"><Pencil className="h-3.5 w-3.5" /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {zones.length === 0 && (
          <div className="py-16 text-center">
            <Truck className="mx-auto mb-3 h-9 w-9 text-gray-300" />
            <p className="text-sm font-semibold text-gray-500">لا توجد مدن توصيل بعد</p>
            <p className="mt-1 text-xs text-gray-400">زيد المدن باش البوت يجاوب بدقة على التوصيل.</p>
          </div>
        )}
      </div>
    </div>
  );
}
