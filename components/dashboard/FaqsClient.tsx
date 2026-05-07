"use client";

import { useState } from "react";
import {
  Plus, Search, ToggleLeft, ToggleRight, Pencil, Trash2,
  MessageCircle, ChevronDown, X, Loader2, AlertCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

// ── Types ─────────────────────────────────────────────────────────────────────

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

const textareaCls =
  "w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366] transition-all resize-none";

// ── FAQ Modal (create + edit) ─────────────────────────────────────────────────

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
  const [form,   setForm]   = useState<FaqForm>({
    question: initial.question,
    answer:   initial.answer,
    active:   initial.active,
  });
  const [saving, setSaving] = useState(false);
  const [error,  setError]  = useState("");

  const set = (k: keyof FaqForm, v: string | boolean) =>
    setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.question.trim()) { setError("السؤال مطلوب"); return; }
    if (!form.answer.trim())   { setError("الجواب مطلوب");  return; }
    setError("");
    setSaving(true);

    const supabase = createClient();
    const payload  = {
      question: form.question.trim(),
      answer:   form.answer.trim(),
      active:   form.active,
    };

    let data: Faq | null = null;
    let err: { message: string } | null = null;

    if (mode === "create") {
      const res = await supabase
        .from("faqs")
        .insert({ store_id: storeId, ...payload })
        .select("id, store_id, question, answer, hit_count, active, created_at")
        .single();
      data = res.data as Faq;
      err  = res.error;
    } else {
      const res = await supabase
        .from("faqs")
        .update(payload)
        .eq("id", initial.id!)
        .select("id, store_id, question, answer, hit_count, active, created_at")
        .single();
      data = res.data as Faq;
      err  = res.error;
    }

    setSaving(false);

    if (err) {
      console.error("[faqs] save error:", err);
      setError(`خطأ في الحفظ: ${err.message}`);
      return;
    }

    if (data) onSaved(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <div>
            <h3 className="text-base font-black text-gray-900">
              {mode === "create" ? "إضافة سؤال جديد" : "تعديل السؤال"}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">يرد البوت عليه تلقائياً</p>
          </div>
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

          {/* Question */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              السؤال <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={2}
              value={form.question}
              onChange={e => set("question", e.target.value)}
              placeholder="مثال: شحال ثمن التوصيل؟"
              className={textareaCls}
            />
          </div>

          {/* Answer */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              الجواب <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={form.answer}
              onChange={e => set("answer", e.target.value)}
              placeholder="اكتب الجواب الذي سيرسله البوت تلقائياً..."
              className={textareaCls}
            />
          </div>

          {/* Active toggle */}
          <button
            type="button"
            onClick={() => set("active", !form.active)}
            className="w-full flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <MessageCircle className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-semibold text-gray-700">تفعيل الرد التلقائي</span>
            </div>
            {form.active
              ? <ToggleRight className="w-7 h-7 text-[#25D366]" />
              : <ToggleLeft  className="w-7 h-7 text-gray-300" />
            }
          </button>

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
                : mode === "create" ? "إضافة السؤال" : "حفظ التعديلات"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function FaqsClient({
  storeId,
  initialFaqs,
}: {
  storeId: string;
  initialFaqs: Faq[];
}) {
  const [faqs,       setFaqs]      = useState<Faq[]>(initialFaqs);
  const [search,     setSearch]    = useState("");
  const [expanded,   setExpanded]  = useState<string | null>(null);
  const [modal,      setModal]     = useState<{ mode: "create" | "edit"; faq?: Faq } | null>(null);
  const [deletingId, setDeletingId]= useState<string | null>(null);
  const [togglingId, setTogglingId]= useState<string | null>(null);

  // ── Derived ──────────────────────────────────────────────────────────────

  const filtered = faqs.filter(f =>
    !search || f.question.includes(search) || f.answer.includes(search)
  );

  const totalHits   = faqs.reduce((s, f) => s + (f.hit_count ?? 0), 0);
  const activeCount = faqs.filter(f => f.active).length;

  // ── Toggle active ─────────────────────────────────────────────────────────

  const toggleActive = async (id: string, current: boolean) => {
    setTogglingId(id);
    setFaqs(fs => fs.map(f => f.id === id ? { ...f, active: !current } : f));

    const supabase = createClient();
    const { error } = await supabase
      .from("faqs")
      .update({ active: !current })
      .eq("id", id);

    setTogglingId(null);

    if (error) {
      console.error("[faqs] toggle error:", error);
      setFaqs(fs => fs.map(f => f.id === id ? { ...f, active: current } : f));
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا السؤال؟")) return;
    setDeletingId(id);

    const supabase = createClient();
    const { error } = await supabase.from("faqs").delete().eq("id", id);

    setDeletingId(null);

    if (error) {
      console.error("[faqs] delete error:", error);
      alert(`فشل الحذف: ${error.message}`);
      return;
    }
    setFaqs(fs => fs.filter(f => f.id !== id));
    if (expanded === id) setExpanded(null);
  };

  // ── Modal save callback ───────────────────────────────────────────────────

  const handleSaved = (faq: Faq) => {
    if (modal?.mode === "create") {
      setFaqs(fs => [faq, ...fs]);
    } else {
      setFaqs(fs => fs.map(f => f.id === faq.id ? faq : f));
    }
  };

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-5 max-w-3xl">

      {/* Modal */}
      {modal && (
        <FaqModal
          mode={modal.mode}
          storeId={storeId}
          initial={
            modal.faq
              ? { id: modal.faq.id, question: modal.faq.question, answer: modal.faq.answer, active: modal.faq.active }
              : { ...emptyForm }
          }
          onClose={() => setModal(null)}
          onSaved={faq => { handleSaved(faq); setModal(null); }}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-gray-900">الأسئلة الشائعة</h2>
          <p className="text-sm text-gray-500">
            {activeCount} سؤال نشط · {totalHits.toLocaleString()} رد تلقائي
          </p>
        </div>
        <button
          onClick={() => setModal({ mode: "create" })}
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1eb85a] text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-md shadow-green-200 hover:-translate-y-0.5 transition-all w-fit"
        >
          <Plus className="w-4 h-4" />
          إضافة سؤال
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "أسئلة نشطة",        value: activeCount,                         color: "text-green-600",  bg: "bg-green-50",  border: "border-green-100"  },
          { label: "ردود تلقائية",       value: totalHits,                           color: "text-blue-600",   bg: "bg-blue-50",   border: "border-blue-100"   },
          { label: "توفير وقت (دقيقة)", value: Math.round(totalHits * 2),           color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
        ].map(s => (
          <div key={s.label} className={`${s.bg} border ${s.border} rounded-2xl p-3 text-center`}>
            <p className={`text-2xl font-black ${s.color}`}>{s.value.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="ابحث في الأسئلة..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl pr-9 pl-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366] shadow-sm transition-all"
        />
      </div>

      {/* FAQ list */}
      <div className="space-y-3">
        {filtered.map(f => {
          const isDeleting = deletingId === f.id;
          const isToggling = togglingId === f.id;
          const isExpanded = expanded === f.id;

          return (
            <div
              key={f.id}
              className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${
                f.active ? "border-gray-100" : "border-gray-100 opacity-60"
              } ${isDeleting ? "opacity-30 pointer-events-none" : ""}`}
            >
              <div className="px-5 py-4">
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className="w-8 h-8 bg-[#25D366]/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <button
                      onClick={() => setExpanded(isExpanded ? null : f.id)}
                      className="text-sm font-bold text-gray-900 text-right hover:text-[#25D366] transition-colors flex items-center gap-1 mb-1 w-full"
                    >
                      <span className="flex-1 text-right">{f.question}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform shrink-0 ${isExpanded ? "rotate-180" : ""}`} />
                    </button>
                    {f.hit_count > 0 && (
                      <span className="text-[10px] text-gray-400">{f.hit_count.toLocaleString()} رد تلقائي</span>
                    )}
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => toggleActive(f.id, f.active)}
                      disabled={isToggling}
                      title={f.active ? "تعطيل" : "تفعيل"}
                      className="disabled:opacity-50"
                    >
                      {f.active
                        ? <ToggleRight className="w-6 h-6 text-[#25D366]" />
                        : <ToggleLeft  className="w-6 h-6 text-gray-300" />
                      }
                    </button>
                    <button
                      onClick={() => setModal({ mode: "edit", faq: f })}
                      className="p-1.5 text-gray-400 hover:text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(f.id)}
                      disabled={isDeleting}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-40"
                    >
                      {isDeleting
                        ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        : <Trash2   className="w-3.5 h-3.5" />
                      }
                    </button>
                  </div>
                </div>

                {/* Expanded answer */}
                {isExpanded && (
                  <div className="mt-3 mr-11 bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <p className="text-sm text-gray-700 leading-relaxed">{f.answer}</p>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => setModal({ mode: "edit", faq: f })}
                        className="text-xs font-semibold text-[#25D366] bg-green-50 border border-green-200 px-3 py-1.5 rounded-lg hover:bg-green-100 transition-colors"
                      >
                        تعديل الإجابة
                      </button>
                      <button className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors">
                        معاينة في البوت
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Search miss */}
        {search && filtered.length === 0 && (
          <div className="py-12 text-center text-gray-400">
            <Search className="w-8 h-8 mx-auto mb-3 opacity-40" />
            <p className="text-sm font-medium">لا توجد أسئلة تطابق البحث</p>
          </div>
        )}
      </div>

      {/* Empty state */}
      {faqs.length === 0 && (
        <div className="py-16 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-gray-300" />
          </div>
          <p className="text-gray-500 font-semibold mb-1">لا توجد أسئلة بعد</p>
          <p className="text-gray-400 text-sm mb-4">أضف أسئلة شائعة وسيرد عليها البوت تلقائياً</p>
          <button
            onClick={() => setModal({ mode: "create" })}
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1eb85a] text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-md shadow-green-200 transition-all"
          >
            <Plus className="w-4 h-4" />
            إضافة أول سؤال
          </button>
        </div>
      )}

      {/* Add card CTA (only shown when there are existing FAQs) */}
      {faqs.length > 0 && (
        <button
          onClick={() => setModal({ mode: "create" })}
          className="w-full flex flex-col items-center gap-2 bg-white border-2 border-dashed border-gray-200 hover:border-[#25D366]/50 rounded-2xl p-6 text-gray-400 hover:text-[#25D366] transition-all duration-200"
        >
          <Plus className="w-6 h-6" />
          <p className="text-sm font-semibold">إضافة سؤال وجواب جديد</p>
          <p className="text-xs">يرد البوت عليه تلقائياً لكل الزبناء</p>
        </button>
      )}
    </div>
  );
}
