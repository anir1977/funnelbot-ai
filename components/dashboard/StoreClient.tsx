"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Loader2,
  MapPin,
  MessageSquare,
  Phone,
  Power,
  Store,
  Tag,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type BusinessType = "parfum" | "clothes" | "supplements" | "food" | "general";
type BotTone = "friendly" | "pro" | "funny" | "brief";

type StoreRow = {
  id: string;
  name: string;
  business_type: BusinessType;
  city: string;
  whatsapp_number: string;
  bot_tone: BotTone;
  welcome_message: string | null;
  active: boolean;
  updated_at: string;
};

type StoreForm = {
  name: string;
  business_type: BusinessType;
  city: string;
  whatsapp_number: string;
  bot_tone: BotTone;
  welcome_message: string;
  active: boolean;
};

const businessTypes: { id: BusinessType; label: string; desc: string }[] = [
  { id: "parfum", label: "عطور وكوزميتيك", desc: "بارفان، كريمات، مكياج" },
  { id: "clothes", label: "ملابس وأزياء", desc: "رجالي، نسائي، أطفال" },
  { id: "supplements", label: "مكملات غذائية", desc: "بروتين، فيتامينات، رياضة" },
  { id: "food", label: "مأكولات ومشروبات", desc: "حلويات، قهوة، مخبزة" },
  { id: "general", label: "متجر عام", desc: "منتجات متنوعة" },
];

const tones: { id: BotTone; label: string; desc: string }[] = [
  { id: "friendly", label: "ودّي وطبيعي", desc: "دارجة مغربية مريحة وقريبة" },
  { id: "pro", label: "احترافي", desc: "منظم ورسمي بلا إطالة" },
  { id: "funny", label: "مرح وخفيف", desc: "أسلوب دافئ مع لمسة لطيفة" },
  { id: "brief", label: "مختصر ومباشر", desc: "أجوبة قصيرة وسريعة" },
];

const moroccanCities = [
  "الدار البيضاء",
  "الرباط",
  "مراكش",
  "فاس",
  "طنجة",
  "أكادير",
  "مكناس",
  "وجدة",
  "تطوان",
  "سلا",
  "القنيطرة",
  "الجديدة",
  "آسفي",
  "الناظور",
];

const inputCls = "w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366] transition-all";

function toForm(store: StoreRow): StoreForm {
  return {
    name: store.name ?? "",
    business_type: store.business_type ?? "general",
    city: store.city ?? "",
    whatsapp_number: store.whatsapp_number ?? "",
    bot_tone: store.bot_tone ?? "friendly",
    welcome_message: store.welcome_message ?? "",
    active: Boolean(store.active),
  };
}

function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("2120")) return `212${digits.slice(4)}`;
  if (digits.startsWith("0")) return `212${digits.slice(1)}`;
  if (digits.startsWith("212")) return digits;
  return `212${digits}`;
}

function displayPhone(value: string) {
  if (!value) return "غير محدد";
  const digits = normalizePhone(value);
  return `+${digits}`;
}

function businessLabel(id: BusinessType) {
  return businessTypes.find((t) => t.id === id)?.label ?? "متجر عام";
}

function initials(name: string) {
  return name.trim().slice(0, 1).toUpperCase() || "F";
}

function isDirty(a: StoreForm, b: StoreForm) {
  return JSON.stringify(a) !== JSON.stringify(b);
}

export default function StoreClient({ initialStore }: { initialStore: StoreRow }) {
  const router = useRouter();
  const initialForm = useMemo(() => toForm(initialStore), [initialStore]);
  const [form, setForm] = useState<StoreForm>(initialForm);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dirty = isDirty(form, initialForm);

  const setField = <K extends keyof StoreForm>(key: K, value: StoreForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setSaved(false);
    setError(null);
  };

  const handleSave = async () => {
    const name = form.name.trim();
    const city = form.city.trim();
    const phone = normalizePhone(form.whatsapp_number);

    if (!name || !city || phone.length < 11) {
      setError("كمّل اسم المتجر، المدينة، ورقم واتساب صحيح.");
      return;
    }

    setSaving(true);
    setSaved(false);
    setError(null);

    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("stores")
      .update({
        name,
        business_type: form.business_type,
        city,
        whatsapp_number: phone,
        bot_tone: form.bot_tone,
        welcome_message: form.welcome_message.trim() || null,
        active: form.active,
      })
      .eq("id", initialStore.id);

    setSaving(false);

    if (updateError) {
      setError("ما قدرناش نحفظو التغييرات. عاود جرّب من بعد لحظة.");
      return;
    }

    setForm((current) => ({ ...current, name, city, whatsapp_number: phone }));
    setSaved(true);
    router.refresh();
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-gray-950">إعدادات المتجر</h2>
          <p className="text-sm text-gray-500 mt-1">هذه البيانات يستعملها البوت في الردود وتأكيد الطلبات.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || !dirty}
          className={`inline-flex items-center justify-center gap-2 font-bold text-sm px-5 py-2.5 rounded-xl transition-all ${
            saved
              ? "bg-green-50 text-green-700 border border-green-200"
              : dirty
                ? "bg-[#25D366] hover:bg-[#1eb85a] text-white shadow-sm"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          {saved && <CheckCircle2 className="w-4 h-4" />}
          {saving ? "كيحفظ..." : saved ? "تم الحفظ" : "حفظ التغييرات"}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:sticky lg:top-20 lg:self-start">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-2xl font-black shadow-sm">
              {initials(form.name)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-extrabold text-gray-950 truncate">{form.name || "متجرك"}</p>
              <p className="text-xs text-gray-500 mt-1">{businessLabel(form.business_type)} · {form.city || "مدينة غير محددة"}</p>
            </div>
          </div>

          <div className="mt-5 space-y-2 rounded-xl bg-gray-50 p-3">
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="text-gray-500">واتساب</span>
              <span className="font-semibold text-gray-900" dir="ltr">{displayPhone(form.whatsapp_number)}</span>
            </div>
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="text-gray-500">حالة البوت</span>
              <span className={`font-bold ${form.active ? "text-green-700" : "text-gray-500"}`}>
                {form.active ? "نشط" : "متوقف"}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="text-gray-500">آخر تحديث</span>
              <span className="font-semibold text-gray-900">{new Date(initialStore.updated_at).toLocaleDateString("ar-MA")}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-5">
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h3 className="font-bold text-gray-900 text-sm border-b border-gray-50 pb-3">معلومات أساسية</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  <span className="flex items-center gap-1.5"><Store className="w-3.5 h-3.5 text-gray-400" /> اسم المتجر</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  className={inputCls}
                  placeholder="مثال: ben daoud"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5 text-gray-400" /> نوع النشاط</span>
                </label>
                <div className="relative">
                  <select
                    value={form.business_type}
                    onChange={(e) => setField("business_type", e.target.value as BusinessType)}
                    className={`${inputCls} appearance-none`}
                  >
                    {businessTypes.map((type) => (
                      <option key={type.id} value={type.id}>{type.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-gray-400" /> المدينة الرئيسية</span>
                </label>
                <div className="relative">
                  <select
                    value={form.city}
                    onChange={(e) => setField("city", e.target.value)}
                    className={`${inputCls} appearance-none`}
                  >
                    <option value="" disabled>اختار المدينة</option>
                    {moroccanCities.map((city) => <option key={city} value={city}>{city}</option>)}
                    {!moroccanCities.includes(form.city) && form.city && <option value={form.city}>{form.city}</option>}
                  </select>
                  <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-gray-400" /> رقم واتساب بيزنس</span>
                </label>
                <input
                  type="tel"
                  dir="ltr"
                  value={form.whatsapp_number}
                  onChange={(e) => setField("whatsapp_number", e.target.value)}
                  onBlur={(e) => setField("whatsapp_number", normalizePhone(e.target.value))}
                  className={`${inputCls} font-mono text-left`}
                  placeholder="212661234567"
                />
                <p className="text-[11px] text-gray-400 mt-1.5">خليه بصيغة المغرب: 212XXXXXXXXX بلا +.</p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between gap-3 border-b border-gray-50 pb-3">
              <h3 className="font-bold text-gray-900 text-sm">البوت والردود</h3>
              <button
                type="button"
                onClick={() => setField("active", !form.active)}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold transition-colors ${
                  form.active
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-gray-200 bg-gray-50 text-gray-500"
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                {form.active ? "البوت نشط" : "البوت متوقف"}
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                <span className="flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5 text-gray-400" /> أسلوب الرد</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tones.map((tone) => {
                  const selected = form.bot_tone === tone.id;
                  return (
                    <button
                      type="button"
                      key={tone.id}
                      onClick={() => setField("bot_tone", tone.id)}
                      className={`text-right rounded-xl border p-3 transition-all ${
                        selected ? "border-[#25D366] bg-green-50" : "border-gray-200 bg-white hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-bold text-gray-900">{tone.label}</span>
                        <span className={`w-4 h-4 rounded-full border-2 ${selected ? "border-[#25D366] bg-[#25D366]" : "border-gray-300"}`} />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{tone.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">رسالة الترحيب</label>
              <textarea
                rows={3}
                value={form.welcome_message}
                onChange={(e) => setField("welcome_message", e.target.value)}
                className={`${inputCls} resize-none leading-relaxed`}
                placeholder="مثال: سلام ومرحبا بك، كيفاش نقدر نعاونك اليوم؟"
              />
              <p className="text-xs text-gray-400 mt-1.5">إلا خليتيها خاوية، البوت غادي يستعمل ترحيب عام ومختصر.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
