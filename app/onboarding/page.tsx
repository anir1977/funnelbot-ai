"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen, ShoppingBag, Shirt, Dumbbell, Sparkles, Coffee,
  CheckCircle, Loader2, ChevronLeft, Zap, MessageCircle, BarChart3, AlertCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { seedDefaultFaqs } from "@/lib/default-faqs";

const bizTypes = [
  { id: "parfum",      icon: Sparkles,    label: "عطور وكوزميتيك",    desc: "بارفان، كريمات، مكياج",     gradient: "from-pink-500 to-rose-500"    },
  { id: "clothes",     icon: Shirt,       label: "ملابس وأزياء",       desc: "رجالي، نسائي، أطفال",        gradient: "from-blue-500 to-indigo-500"  },
  { id: "supplements", icon: Dumbbell,    label: "مكملات غذائية",      desc: "بروتين، فيتامينات، رياضة",   gradient: "from-orange-500 to-amber-500" },
  { id: "food",        icon: Coffee,      label: "مأكولات ومشروبات",   desc: "حلويات، قهوة، مخبزة",        gradient: "from-emerald-500 to-teal-500" },
  { id: "general",     icon: ShoppingBag, label: "متجر عام",           desc: "منتجات متنوعة",              gradient: "from-violet-500 to-purple-500" },
];

const tones = [
  { id: "friendly", label: "ودّي وحيوي",     desc: "يحكي بالدارجة بشكل طبيعي ومريح", emoji: "😊" },
  { id: "pro",      label: "احترافي",         desc: "لغة رسمية تليق بالمتاجر الراقية", emoji: "💼" },
  { id: "funny",    label: "مرح وطريف",       desc: "مع إيموجي وأسلوب طريف",           emoji: "😄" },
  { id: "brief",    label: "مختصر ومباشر",    desc: "ردود قصيرة وسريعة ودقيقة",        emoji: "⚡" },
];

const moroccanCities = [
  "الدار البيضاء","الرباط","مراكش","فاس","طنجة","أكادير","مكناس","وجدة","تطوان","سلا",
];

const steps = ["نوع متجرك", "معلومات المتجر", "شخصية البوت", "كل شيء جاهز"];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep]           = useState(0);
  const [bizType, setBizType]     = useState("");
  const [city, setCity]           = useState("");
  const [tone, setTone]           = useState("");
  const [storeName, setStoreName] = useState("");
  const [waNumber, setWaNumber]   = useState("");
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);

  const activateBot = async () => {
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data: storeData, error: dbError } = await supabase
      .from("stores")
      .insert({
        user_id:         user.id,
        name:            storeName,
        business_type:   bizType,
        city,
        whatsapp_number: `212${waNumber}`,
        bot_tone:        tone,
      })
      .select("id")
      .single();

    if (dbError) {
      setError("حدث خطأ في حفظ معلومات المتجر. حاول مجدداً.");
      setLoading(false);
      return;
    }

    // Seed default FAQs — errors are caught inside and never block onboarding
    if (storeData?.id) {
      await seedDefaultFaqs(supabase, storeData.id);
    }

    setLoading(false);
    setStep(3);
  };

  const goNext = () => {
    if (step === 2) {
      activateBot();
    } else {
      setStep(s => s + 1);
    }
  };

  const canNext =
    (step === 0 && !!bizType) ||
    (step === 1 && !!storeName && !!city && !!waNumber) ||
    (step === 2 && !!tone) ||
    step === 3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/20 flex flex-col items-center justify-center p-6">

      <Link href="/" className="flex items-center gap-2.5 mb-8 group">
        <div className="w-9 h-9 bg-[#25D366] rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
          <BookOpen className="w-4 h-4 text-white" strokeWidth={2.5} />
        </div>
        <span className="font-black text-xl text-gray-900">
          Funnels<span className="text-[#25D366]">Library</span>
        </span>
      </Link>

      {/* Progress bar */}
      {step < 3 && (
        <div className="w-full max-w-lg mb-6">
          <div className="flex items-center justify-between mb-3">
            {steps.slice(0, 3).map((s, i) => (
              <div key={s} className="flex items-center gap-1.5">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${i < step ? "bg-[#25D366] text-white" : i === step ? "bg-[#25D366] text-white ring-4 ring-[#25D366]/20" : "bg-gray-200 text-gray-400"}`}>
                  {i < step ? <CheckCircle className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <span className={`text-xs font-semibold hidden sm:block ${i === step ? "text-gray-900" : "text-gray-400"}`}>{s}</span>
                {i < 2 && <div className="w-10 sm:w-16 h-px bg-gray-200 mx-1" />}
              </div>
            ))}
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#25D366] to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="w-full max-w-lg">

        {/* ── Step 0: Business type ── */}
        {step === 0 && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/60 p-8">
            <h1 className="text-xl font-black text-gray-900 mb-1">ما نوع متجرك؟</h1>
            <p className="text-gray-500 text-sm mb-6">سنضبط البوت حسب مجال متجرك</p>
            <div className="grid grid-cols-1 gap-3">
              {bizTypes.map(b => {
                const Icon = b.icon;
                const active = bizType === b.id;
                return (
                  <button
                    key={b.id}
                    onClick={() => setBizType(b.id)}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-right transition-all ${active ? "border-[#25D366] bg-green-50/50" : "border-gray-100 hover:border-gray-200 bg-white"}`}
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${b.gradient} flex items-center justify-center shrink-0 shadow-sm`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 text-right">
                      <p className={`text-sm font-bold ${active ? "text-[#25D366]" : "text-gray-900"}`}>{b.label}</p>
                      <p className="text-xs text-gray-400">{b.desc}</p>
                    </div>
                    {active && <CheckCircle className="w-5 h-5 text-[#25D366] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Step 1: Store info ── */}
        {step === 1 && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/60 p-8">
            <h1 className="text-xl font-black text-gray-900 mb-1">معلومات متجرك</h1>
            <p className="text-gray-500 text-sm mb-6">سيستخدم البوت هذه المعلومات في ردوده</p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">اسم المتجر</label>
                <input
                  type="text"
                  placeholder="عطور الريم"
                  value={storeName}
                  onChange={e => setStoreName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366] transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">المدينة الرئيسية</label>
                <select
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366] transition-all appearance-none"
                >
                  <option value="">اختر مدينتك</option>
                  {moroccanCities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">رقم واتساب التجاري</label>
                <div className="flex gap-2">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-500 font-mono shrink-0 flex items-center">+212</div>
                  <input
                    type="tel"
                    placeholder="6XXXXXXXX"
                    value={waNumber}
                    onChange={e => setWaNumber(e.target.value)}
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366] transition-all font-mono"
                    dir="ltr"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1.5">هذا هو الرقم الذي سيرد عليه البوت</p>
              </div>
            </div>
          </div>
        )}

        {/* ── Step 2: AI tone ── */}
        {step === 2 && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/60 p-8">
            <h1 className="text-xl font-black text-gray-900 mb-1">شخصية البوت</h1>
            <p className="text-gray-500 text-sm mb-6">كيفاش تحب البوت يتكلم مع زبنائك؟</p>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              {tones.map(t => {
                const active = tone === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTone(t.id)}
                    className={`p-4 rounded-2xl border-2 text-right transition-all ${active ? "border-[#25D366] bg-green-50/50" : "border-gray-100 hover:border-gray-200 bg-white"}`}
                  >
                    <div className="text-2xl mb-2">{t.emoji}</div>
                    <p className={`text-sm font-bold mb-0.5 ${active ? "text-[#25D366]" : "text-gray-900"}`}>{t.label}</p>
                    <p className="text-[11px] text-gray-400 leading-snug">{t.desc}</p>
                    {active && (
                      <div className="mt-2 flex justify-end">
                        <CheckCircle className="w-4 h-4 text-[#25D366]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Step 3: Success ── */}
        {step === 3 && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/60 p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#25D366] to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-green-200">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-black text-gray-900 mb-2">متجرك جاهز! 🎉</h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              البوت ديالك جاهز باش يبدأ يرد على زبنائك ويأخذ الطلبات تلقائياً بالدارجة.
            </p>
            <div className="grid grid-cols-3 gap-3 mb-7">
              {[
                { icon: MessageCircle, label: "ردود تلقائية",  color: "text-[#25D366]",  bg: "bg-green-50"  },
                { icon: Zap,           label: "COD مفعّل",     color: "text-blue-600",   bg: "bg-blue-50"   },
                { icon: BarChart3,     label: "تتبع المبيعات", color: "text-purple-600", bg: "bg-purple-50" },
              ].map(f => {
                const Icon = f.icon;
                return (
                  <div key={f.label} className={`${f.bg} rounded-2xl p-3 flex flex-col items-center gap-1.5`}>
                    <Icon className={`w-5 h-5 ${f.color}`} />
                    <p className="text-xs font-semibold text-gray-700 text-center">{f.label}</p>
                  </div>
                );
              })}
            </div>
            <Link
              href="/dashboard"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1eb85a] text-white font-bold py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-green-200 mb-3"
            >
              فتح لوحة التحكم
              <ChevronLeft className="w-4 h-4" />
            </Link>
            <p className="text-xs text-gray-400">يمكنك تعديل إعدادات البوت في أي وقت</p>
          </div>
        )}

        {/* ── Navigation ── */}
        {step < 3 && (
          <div className="flex items-center justify-between mt-5">
            {step > 0 ? (
              <button
                onClick={() => { setStep(s => s - 1); setError(null); }}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-white border border-transparent hover:border-gray-200 transition-all"
              >
                <ChevronLeft className="w-4 h-4 rotate-180" />
                السابق
              </button>
            ) : <div />}

            <button
              onClick={goNext}
              disabled={!canNext || loading}
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1eb85a] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-6 py-2.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-md shadow-green-200 disabled:translate-y-0"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> جاري الإعداد...</>
              ) : step === 2 ? (
                <>تفعيل البوت <Zap className="w-4 h-4" /></>
              ) : (
                <>التالي <ChevronLeft className="w-4 h-4" /></>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
