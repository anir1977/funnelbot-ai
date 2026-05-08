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
  { id: "friendly", label: "ودّي وطبيعي", desc: "دارجة مغربية قريبة ومريحة" },
  { id: "pro", label: "احترافي", desc: "رسمي ومنظم بلا إطالة" },
  { id: "funny", label: "مرح وخفيف", desc: "لطيف ومناسب للعلامات المرحة" },
  { id: "brief", label: "مختصر ومباشر", desc: "أجوبة سريعة وواضحة" },
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

const fieldCls = "w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-950 outline-none transition focus:border-gray-400 focus:ring-4 focus:ring-gray-100";

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
  return `+${normalizePhone(value)}`;
}

function businessLabel(id: BusinessType) {
  return businessTypes.find((type) => type.id === id)?.label ?? "متجر عام";
}

function isDirty(a: StoreForm, b: StoreForm) {
  return JSON.stringify(a) !== JSON.stringify(b);
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-4 py-3">
        <h3 className="text-sm font-bold text-gray-950">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}

function FieldLabel({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-gray-700">
      <Icon className="h-3.5 w-3.5 text-gray-400" />
      {children}
    </label>
  );
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
    <div className="max-w-6xl space-y-5">
      <header className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-extrabold text-gray-950">إعدادات المتجر</h2>
              <span className={`rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${
                form.active ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-gray-100 text-gray-600 ring-gray-200"
              }`}>
                {form.active ? "البوت نشط" : "البوت متوقف"}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500">بيانات أساسية يستعملها FunnelBot في الردود وتأكيد الطلبات.</p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving || !dirty}
            className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition ${
              saved
                ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                : dirty
                  ? "bg-gray-950 text-white hover:bg-gray-800"
                  : "bg-gray-100 text-gray-400"
            } disabled:cursor-not-allowed`}
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            {saved && <CheckCircle2 className="h-4 w-4" />}
            {saving ? "كيحفظ..." : saved ? "تم الحفظ" : "حفظ التغييرات"}
          </button>
        </div>
      </header>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <aside className="xl:col-span-4">
          <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm xl:sticky xl:top-20">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-950 text-lg font-extrabold text-white">
                {(form.name.trim()[0] || "F").toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-extrabold text-gray-950">{form.name || "متجرك"}</p>
                <p className="mt-1 text-xs text-gray-500">{businessLabel(form.business_type)} · {form.city || "مدينة غير محددة"}</p>
              </div>
            </div>

            <div className="mt-4 divide-y divide-gray-100 rounded-lg border border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between gap-3 px-3 py-2.5 text-xs">
                <span className="text-gray-500">واتساب</span>
                <span className="font-semibold text-gray-950" dir="ltr">{displayPhone(form.whatsapp_number)}</span>
              </div>
              <div className="flex items-center justify-between gap-3 px-3 py-2.5 text-xs">
                <span className="text-gray-500">نوع النشاط</span>
                <span className="font-semibold text-gray-950">{businessLabel(form.business_type)}</span>
              </div>
              <div className="flex items-center justify-between gap-3 px-3 py-2.5 text-xs">
                <span className="text-gray-500">آخر تحديث</span>
                <span className="font-semibold text-gray-950">{new Date(initialStore.updated_at).toLocaleDateString("ar-MA")}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setField("active", !form.active)}
              className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-bold transition ${
                form.active
                  ? "border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
                  : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              }`}
            >
              <Power className="h-3.5 w-3.5" />
              {form.active ? "إيقاف البوت" : "تشغيل البوت"}
            </button>
          </section>
        </aside>

        <main className="space-y-5 xl:col-span-8">
          <Panel title="معلومات المتجر">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <FieldLabel icon={Store}>اسم المتجر</FieldLabel>
                <input className={fieldCls} value={form.name} onChange={(e) => setField("name", e.target.value)} placeholder="مثال: ben daoud" />
              </div>

              <div>
                <FieldLabel icon={Tag}>نوع النشاط</FieldLabel>
                <div className="relative">
                  <select className={`${fieldCls} appearance-none`} value={form.business_type} onChange={(e) => setField("business_type", e.target.value as BusinessType)}>
                    {businessTypes.map((type) => <option key={type.id} value={type.id}>{type.label}</option>)}
                  </select>
                  <ChevronDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <FieldLabel icon={MapPin}>المدينة الرئيسية</FieldLabel>
                <div className="relative">
                  <select className={`${fieldCls} appearance-none`} value={form.city} onChange={(e) => setField("city", e.target.value)}>
                    <option value="" disabled>اختار المدينة</option>
                    {moroccanCities.map((city) => <option key={city} value={city}>{city}</option>)}
                    {!moroccanCities.includes(form.city) && form.city && <option value={form.city}>{form.city}</option>}
                  </select>
                  <ChevronDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <FieldLabel icon={Phone}>رقم واتساب بيزنس</FieldLabel>
                <input
                  className={`${fieldCls} text-left font-mono`}
                  dir="ltr"
                  value={form.whatsapp_number}
                  onChange={(e) => setField("whatsapp_number", e.target.value)}
                  onBlur={(e) => setField("whatsapp_number", normalizePhone(e.target.value))}
                  placeholder="212661234567"
                  type="tel"
                />
                <p className="mt-1.5 text-xs text-gray-400">صيغة المغرب: 212XXXXXXXXX بلا +.</p>
              </div>
            </div>
          </Panel>

          <Panel title="سلوك البوت">
            <div className="space-y-4">
              <div>
                <FieldLabel icon={MessageSquare}>أسلوب الرد</FieldLabel>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {tones.map((tone) => {
                    const selected = form.bot_tone === tone.id;
                    return (
                      <button
                        type="button"
                        key={tone.id}
                        onClick={() => setField("bot_tone", tone.id)}
                        className={`rounded-lg border p-3 text-right transition ${
                          selected ? "border-gray-950 bg-gray-950 text-white" : "border-gray-200 bg-white hover:bg-gray-50"
                        }`}
                      >
                        <p className={`text-sm font-bold ${selected ? "text-white" : "text-gray-950"}`}>{tone.label}</p>
                        <p className={`mt-1 text-xs ${selected ? "text-gray-300" : "text-gray-500"}`}>{tone.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-gray-700">رسالة الترحيب</label>
                <textarea
                  rows={4}
                  value={form.welcome_message}
                  onChange={(e) => setField("welcome_message", e.target.value)}
                  className={`${fieldCls} resize-none leading-relaxed`}
                  placeholder="مثال: سلام ومرحبا بك، كيفاش نقدر نعاونك اليوم؟"
                />
                <p className="mt-1.5 text-xs text-gray-400">إلا خليتيها خاوية، البوت يستعمل ترحيب عام ومختصر.</p>
              </div>
            </div>
          </Panel>
        </main>
      </div>
    </div>
  );
}
