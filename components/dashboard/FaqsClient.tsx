"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Loader2,
  MessageCircle,
  Pencil,
  Plus,
  Search,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Trash2,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { insertMissingDefaultFaqs } from "@/lib/default-faqs";

type Faq = {
  id: string;
  store_id: string;
  question: string;
  answer: string;
  hit_count: number;
  active: boolean;
  created_at: string;
};

type FaqForm = {
  question: string;
  answer: string;
  active: boolean;
};

const emptyForm: FaqForm = { question: "", answer: "", active: true };
const textareaCls = "w-full resize-none rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-950 outline-none transition focus:border-gray-400 focus:ring-4 focus:ring-gray-100";

function FaqModal({
  mode,
  initial,
  storeId,
  onClose,
  onSaved,
}: {
  mode: "create" | "edit";
  initial: FaqForm & { id?: string };
  storeId: string;
  onClose: () => void;
  onSaved: (faq: Faq) => void;
}) {
  const [form, setForm] = useState<FaqForm>({
    question: initial.question,
    answer: initial.answer,
    active: initial.active,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof FaqForm, value: string | boolean) =>
    setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.question.trim()) { setError("السؤال مطلوب."); return; }
    if (!form.answer.trim()) { setError("الجواب مطلوب."); return; }

    setError("");
    setSaving(true);

    const payload = {
      question: form.question.trim(),
      answer: form.answer.trim(),
      active: form.active,
    };

    const supabase = createClient();
    const query = mode === "create"
      ? supabase.from("faqs").insert({ store_id: storeId, ...payload })
      : supabase.from("faqs").update(payload).eq("id", initial.id!);

    const { data, error: saveError } = await query
      .select("id, store_id, question, answer, hit_count, active, created_at")
      .single();

    setSaving(false);

    if (saveError) {
      setError(`خطأ في الحفظ: ${saveError.message}`);
      return;
    }

    if (data) onSaved(data as Faq);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white p-5">
          <div>
            <h3 className="text-base font-extrabold text-gray-950">{mode === "create" ? "إضافة سؤال" : "تعديل السؤال"}</h3>
            <p className="mt-1 text-xs text-gray-500">البوت يستعمل الجواب مباشرة مع الزبناء.</p>
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
            <label className="mb-1.5 block text-xs font-bold text-gray-700">السؤال</label>
            <textarea required rows={2} value={form.question} onChange={(event) => set("question", event.target.value)} placeholder="مثال: شحال ثمن التوصيل؟" className={textareaCls} />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold text-gray-700">الجواب</label>
            <textarea required rows={4} value={form.answer} onChange={(event) => set("answer", event.target.value)} placeholder="اكتب الجواب اللي غادي يرسل البوت..." className={textareaCls} />
          </div>

          <button type="button" onClick={() => set("active", !form.active)} className="flex w-full items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-3 hover:bg-gray-100">
            <span className="flex items-center gap-2 text-sm font-bold text-gray-800">
              <MessageCircle className="h-4 w-4 text-gray-500" />
              تفعيل الرد التلقائي
            </span>
            {form.active ? <ToggleRight className="h-7 w-7 text-emerald-600" /> : <ToggleLeft className="h-7 w-7 text-gray-300" />}
          </button>

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

export default function FaqsClient({
  storeId,
  initialFaqs,
}: {
  storeId: string;
  initialFaqs: Faq[];
}) {
  const [faqs, setFaqs] = useState<Faq[]>(initialFaqs);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [modal, setModal] = useState<{ mode: "create" | "edit"; faq?: Faq } | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const filtered = useMemo(() => (
    faqs.filter((faq) => !search || faq.question.includes(search) || faq.answer.includes(search))
  ), [faqs, search]);

  const totalHits = faqs.reduce((sum, faq) => sum + (faq.hit_count ?? 0), 0);
  const activeCount = faqs.filter((faq) => faq.active).length;

  const toggleActive = async (id: string, current: boolean) => {
    setTogglingId(id);
    setFaqs((currentFaqs) => currentFaqs.map((faq) => faq.id === id ? { ...faq, active: !current } : faq));

    const supabase = createClient();
    const { error } = await supabase.from("faqs").update({ active: !current }).eq("id", id);

    setTogglingId(null);
    if (error) setFaqs((currentFaqs) => currentFaqs.map((faq) => faq.id === id ? { ...faq, active: current } : faq));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("واش متأكد بغيتي تحذف هاد السؤال؟")) return;
    setDeletingId(id);

    const supabase = createClient();
    const { error } = await supabase.from("faqs").delete().eq("id", id);

    setDeletingId(null);
    if (error) {
      alert(`فشل الحذف: ${error.message}`);
      return;
    }
    setFaqs((currentFaqs) => currentFaqs.filter((faq) => faq.id !== id));
    if (expanded === id) setExpanded(null);
  };

  const handleSeedDefaults = async () => {
    setSeeding(true);
    setNotice(null);
    try {
      const supabase = createClient();
      const inserted = await insertMissingDefaultFaqs(supabase, storeId);
      if (inserted.length === 0) {
        setNotice({ type: "success", text: "الأسئلة الافتراضية موجودة من قبل." });
      } else {
        setFaqs((currentFaqs) => [...inserted as Faq[], ...currentFaqs]);
        setNotice({ type: "success", text: `تزادو ${inserted.length} أسئلة افتراضية.` });
      }
    } catch (error) {
      console.error("[faqs] seed defaults error:", error);
      setNotice({ type: "error", text: "وقع خطأ فإضافة الأسئلة الافتراضية." });
    } finally {
      setSeeding(false);
    }
  };

  const handleSaved = (faq: Faq) => {
    if (modal?.mode === "create") {
      setFaqs((currentFaqs) => [faq, ...currentFaqs]);
    } else {
      setFaqs((currentFaqs) => currentFaqs.map((current) => current.id === faq.id ? faq : current));
    }
  };

  return (
    <div className="max-w-6xl space-y-5">
      {modal && (
        <FaqModal
          mode={modal.mode}
          storeId={storeId}
          initial={modal.faq ? {
            id: modal.faq.id,
            question: modal.faq.question,
            answer: modal.faq.answer,
            active: modal.faq.active,
          } : { ...emptyForm }}
          onClose={() => setModal(null)}
          onSaved={(faq) => { handleSaved(faq); setModal(null); }}
        />
      )}

      <header className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-gray-950">الأسئلة الشائعة</h2>
            <p className="mt-2 text-sm text-gray-500">أجوبة جاهزة كتعاون البوت يرد بسرعة على الأسئلة المتكررة.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={handleSeedDefaults} disabled={seeding} className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-50">
              {seeding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4 text-amber-500" />}
              أسئلة افتراضية
            </button>
            <button onClick={() => setModal({ mode: "create" })} className="inline-flex items-center gap-2 rounded-lg bg-gray-950 px-4 py-2.5 text-sm font-bold text-white hover:bg-gray-800">
              <Plus className="h-4 w-4" />
              إضافة سؤال
            </button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            ["أسئلة نشطة", activeCount],
            ["ردود تلقائية", totalHits.toLocaleString()],
            ["توفير تقديري", `${Math.round(totalHits * 2)} د`],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-3">
              <p className="text-xs font-semibold text-gray-500">{label}</p>
              <p className="mt-2 text-xl font-extrabold text-gray-950">{value}</p>
            </div>
          ))}
        </div>
      </header>

      {notice && (
        <div className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm font-semibold ${notice.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700"}`}>
          <span className="flex items-center gap-2">
            {notice.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            {notice.text}
          </span>
          <button onClick={() => setNotice(null)} className="opacity-60 hover:opacity-100"><X className="h-4 w-4" /></button>
        </div>
      )}

      <div className="relative">
        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="ابحث في الأسئلة..." className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-4 pr-9 text-sm shadow-sm outline-none focus:border-gray-400 focus:ring-4 focus:ring-gray-100" />
      </div>

      <div className="space-y-3">
        {filtered.map((faq) => {
          const isExpanded = expanded === faq.id;
          const deleting = deletingId === faq.id;
          const toggling = togglingId === faq.id;

          return (
            <div key={faq.id} className={`overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm ${!faq.active ? "opacity-60" : ""} ${deleting ? "pointer-events-none opacity-30" : ""}`}>
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
                    <MessageCircle className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <button onClick={() => setExpanded(isExpanded ? null : faq.id)} className="flex w-full items-center gap-2 text-right">
                      <span className="flex-1 text-sm font-bold text-gray-950">{faq.question}</span>
                      <ChevronDown className={`h-4 w-4 shrink-0 text-gray-400 transition ${isExpanded ? "rotate-180" : ""}`} />
                    </button>
                    <div className="mt-1 flex flex-wrap gap-2 text-[10px] font-semibold text-gray-500">
                      <span>{faq.hit_count?.toLocaleString() ?? 0} رد تلقائي</span>
                      <span>{faq.active ? "نشط" : "متوقف"}</span>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <button disabled={toggling} onClick={() => toggleActive(faq.id, faq.active)} title={faq.active ? "تعطيل" : "تفعيل"}>
                      {faq.active ? <ToggleRight className="h-6 w-6 text-emerald-600" /> : <ToggleLeft className="h-6 w-6 text-gray-300" />}
                    </button>
                    <button onClick={() => setModal({ mode: "edit", faq })} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"><Pencil className="h-3.5 w-3.5" /></button>
                    <button disabled={deleting} onClick={() => handleDelete(faq.id)} className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600">
                      {deleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-3 rounded-lg border border-gray-100 bg-gray-50 p-3">
                    <p className="text-sm leading-7 text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <MessageCircle className="mx-auto mb-3 h-9 w-9 text-gray-300" />
          <p className="text-sm font-semibold text-gray-500">{faqs.length === 0 ? "لا توجد أسئلة بعد" : "لا توجد نتائج"}</p>
          <p className="mt-1 text-xs text-gray-400">زيد الأسئلة باش البوت يرد بطريقة ثابتة وواضحة.</p>
        </div>
      )}
    </div>
  );
}
