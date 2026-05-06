"use client";

import { useState } from "react";
import { Plus, Search, ToggleLeft, ToggleRight, Pencil, Trash2, MessageCircle, ChevronDown } from "lucide-react";

const initialFaqs = [
  {
    id: 1,
    question: "شحال ثمن التوصيل؟",
    answer: "ثمن التوصيل يختلف حسب المدينة: كازا 20 درهم، الرباط 30 درهم، مراكش وفاس وطنجة 25 درهم، أكادير 35 درهم. جميع الطلبات بالدفع عند الاستلام.",
    active: true,
    hits: 142,
    category: "توصيل",
  },
  {
    id: 2,
    question: "واش الدفع عند الاستلام (COD) متاح؟",
    answer: "نعم! جميع طلباتنا بالدفع عند الاستلام. ما كاينش دفع مسبق. تأكد طلبك وادفع للمندوب عند الاستلام.",
    active: true,
    hits: 118,
    category: "الدفع",
  },
  {
    id: 3,
    question: "كيفاش نعرف وصل طلبي أو لا؟",
    answer: "بعد تأكيد طلبك، غادي يتواصل معك مندوب التوصيل قبل الوصول. يمكنك كذلك مراسلتنا في أي وقت لمعرفة حالة طلبك.",
    active: true,
    hits: 87,
    category: "متابعة الطلب",
  },
  {
    id: 4,
    question: "واش يمكنني نبدل المقاس أو اللون؟",
    answer: "نعم، يمكنك التعديل خلال 24 ساعة من تأكيد الطلب. بعد الشحن ما يمكنش التعديل. راسلنا مباشرة للتعديل.",
    active: true,
    hits: 64,
    category: "الطلبات",
  },
  {
    id: 5,
    question: "شحال الوقت باش يوصل الطلب؟",
    answer: "من 24 ساعة للمدن الكبرى (كازا والرباط) إلى 72 ساعة للمدن البعيدة. تتلقى اتصالاً قبل التوصيل.",
    active: true,
    hits: 93,
    category: "توصيل",
  },
  {
    id: 6,
    question: "واش العطور أصيلة 100%؟",
    answer: "نعم، جميع عطورنا أصيلة 100% ومستوردة مباشرة من الموزعين المعتمدين. ضمان الأصالة مع كل طلب.",
    active: true,
    hits: 78,
    category: "المنتجات",
  },
  {
    id: 7,
    question: "واش يمكنني نرجع المنتج؟",
    answer: "نعم خلال 48 ساعة من الاستلام إذا كان المنتج معيباً أو مختلفاً عن الطلب. التوصيل الراجع مجاني في هذه الحالات.",
    active: false,
    hits: 31,
    category: "الإرجاع",
  },
];

const categoryColors: Record<string, string> = {
  "توصيل":       "bg-blue-50 text-blue-700 border-blue-200",
  "الدفع":       "bg-green-50 text-green-700 border-green-200",
  "متابعة الطلب":"bg-purple-50 text-purple-700 border-purple-200",
  "الطلبات":     "bg-amber-50 text-amber-700 border-amber-200",
  "المنتجات":    "bg-rose-50 text-rose-700 border-rose-200",
  "الإرجاع":     "bg-gray-50 text-gray-600 border-gray-200",
};

export default function FAQPage() {
  const [faqs, setFaqs]       = useState(initialFaqs);
  const [search, setSearch]   = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggle = (id: number) =>
    setFaqs(fs => fs.map(f => f.id === id ? { ...f, active: !f.active } : f));

  const filtered = faqs.filter(f =>
    f.question.includes(search) || f.answer.includes(search) || f.category.includes(search)
  );

  const totalHits = faqs.reduce((s, f) => s + f.hits, 0);

  return (
    <div className="space-y-5 max-w-3xl">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-gray-900">الأسئلة الشائعة</h2>
          <p className="text-sm text-gray-500">{faqs.filter(f => f.active).length} سؤال نشط · {totalHits.toLocaleString()} رد تلقائي</p>
        </div>
        <button className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1eb85a] text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-md shadow-green-200 hover:-translate-y-0.5 transition-all w-fit">
          <Plus className="w-4 h-4" />
          إضافة سؤال
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "أسئلة نشطة",       value: faqs.filter(f => f.active).length,  color: "text-green-600",  bg: "bg-green-50",  border: "border-green-100" },
          { label: "ردود تلقائية",      value: totalHits,                           color: "text-blue-600",   bg: "bg-blue-50",   border: "border-blue-100"  },
          { label: "توفير وقت (ساعات)", value: Math.round(totalHits * 2 / 60),     color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
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
        {filtered.map(f => (
          <div key={f.id} className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${f.active ? "border-gray-100" : "border-gray-100 opacity-60"}`}>
            <div className="px-5 py-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#25D366]/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <button
                      onClick={() => setExpanded(expanded === f.id ? null : f.id)}
                      className="text-sm font-bold text-gray-900 text-right hover:text-[#25D366] transition-colors flex items-center gap-1"
                    >
                      {f.question}
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform shrink-0 ${expanded === f.id ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${categoryColors[f.category] ?? "bg-gray-50 text-gray-500 border-gray-200"}`}>
                      {f.category}
                    </span>
                    <span className="text-[10px] text-gray-400">{f.hits} رد تلقائي</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button onClick={() => toggle(f.id)} title={f.active ? "تعطيل" : "تفعيل"}>
                    {f.active
                      ? <ToggleRight className="w-6 h-6 text-[#25D366]" />
                      : <ToggleLeft className="w-6 h-6 text-gray-300" />
                    }
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-blue-500 rounded-lg hover:bg-blue-50 transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Expanded answer */}
              {expanded === f.id && (
                <div className="mt-3 mr-11 bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <p className="text-sm text-gray-700 leading-relaxed">{f.answer}</p>
                  <div className="mt-3 flex gap-2">
                    <button className="text-xs font-semibold text-[#25D366] bg-green-50 border border-green-200 px-3 py-1.5 rounded-lg hover:bg-green-100 transition-colors">
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
        ))}
      </div>

      {/* Add custom FAQ */}
      <button className="w-full flex flex-col items-center gap-2 bg-white border-2 border-dashed border-gray-200 hover:border-[#25D366]/50 rounded-2xl p-6 text-gray-400 hover:text-[#25D366] transition-all duration-200">
        <Plus className="w-6 h-6" />
        <p className="text-sm font-semibold">إضافة سؤال وجواب جديد</p>
        <p className="text-xs">يرد البوت عليه تلقائياً لكل الزبناء</p>
      </button>
    </div>
  );
}
