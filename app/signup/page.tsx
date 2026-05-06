"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Eye, EyeOff, Loader2, CheckCircle, Star, TrendingUp } from "lucide-react";

const inputCls = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366] transition-all";

function GoogleIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

function PasswordStrength({ password }: { password: string }) {
  const score = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;

  const labels = ["ضعيفة", "مقبولة", "جيدة", "قوية"];
  const colors = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-[#25D366]"];

  if (!password) return null;
  return (
    <div className="mt-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= score ? colors[score - 1] : "bg-gray-200"}`} />
        ))}
      </div>
      <p className={`text-[10px] mt-1 font-semibold ${score <= 1 ? "text-red-500" : score === 2 ? "text-orange-500" : score === 3 ? "text-yellow-600" : "text-[#25D366]"}`}>
        قوة كلمة المرور: {labels[score - 1] ?? "ضعيفة جداً"}
      </p>
    </div>
  );
}

const miniStats = [
  { label: "متجر نشط", value: "+1,200", color: "text-[#25D366]" },
  { label: "طلب يومي", value: "8,400", color: "text-blue-400" },
  { label: "توفير في الوقت", value: "94%", color: "text-purple-400" },
];

export default function SignupPage() {
  const [showPw, setShowPw]   = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading]  = useState(false);
  const [agreed, setAgreed]    = useState(false);
  const [success, setSuccess]  = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* ── Form pane ── */}
      <div className="flex-1 lg:max-w-[500px] flex flex-col items-center justify-center p-6 lg:p-12 bg-white relative z-10">
        <div className="w-full max-w-sm">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 mb-7 group">
            <div className="w-9 h-9 bg-[#25D366] rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <BookOpen className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-black text-xl text-gray-900">
              Funnels<span className="text-[#25D366]">Library</span>
            </span>
          </Link>

          <h1 className="text-2xl font-black text-gray-900 mb-1">أنشئ حسابك مجاناً 🚀</h1>
          <p className="text-gray-500 text-sm mb-6">14 يوم تجريبي بدون بطاقة بنكية</p>

          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-[#25D366]" />
              </div>
              <p className="font-black text-gray-900 text-lg mb-1">تم إنشاء الحساب!</p>
              <p className="text-gray-500 text-sm mb-6">جارٍ توجيهك لإعداد متجرك...</p>
              <Link href="/onboarding" className="inline-flex bg-[#25D366] text-white font-bold px-6 py-3 rounded-xl hover:-translate-y-0.5 transition-all shadow-md shadow-green-200">
                إعداد المتجر
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">الاسم الكامل</label>
                  <input type="text" placeholder="محمد أمين" className={inputCls} required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">اسم المتجر</label>
                  <input type="text" placeholder="عطور الريم" className={inputCls} required />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">رقم واتساب</label>
                <div className="flex gap-2">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-500 font-mono shrink-0 flex items-center">
                    +212
                  </div>
                  <input type="tel" placeholder="6XXXXXXXX" className={`${inputCls} font-mono`} dir="ltr" required />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">البريد الإلكتروني</label>
                <input type="email" placeholder="you@example.com" className={inputCls} dir="ltr" required />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">كلمة المرور</label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    placeholder="8 أحرف على الأقل"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className={`${inputCls} pl-10`}
                    dir="ltr"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(v => !v)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <PasswordStrength password={password} />
              </div>

              {/* Terms */}
              <label className="flex items-start gap-2.5 cursor-pointer group">
                <div
                  onClick={() => setAgreed(v => !v)}
                  className={`w-4 h-4 rounded flex items-center justify-center border-2 transition-all cursor-pointer shrink-0 mt-0.5 ${agreed ? "bg-[#25D366] border-[#25D366]" : "border-gray-300 group-hover:border-[#25D366]/50"}`}
                >
                  {agreed && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
                <span className="text-xs text-gray-600 leading-relaxed select-none">
                  أوافق على{" "}
                  <Link href="#" className="text-[#25D366] font-semibold hover:underline">شروط الاستخدام</Link>
                  {" "}و{" "}
                  <Link href="#" className="text-[#25D366] font-semibold hover:underline">سياسة الخصوصية</Link>
                </span>
              </label>

              <button
                type="submit"
                disabled={loading || !agreed}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1eb85a] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-green-200 hover:-translate-y-0.5 active:translate-y-0 disabled:translate-y-0 mt-1"
              >
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> جاري الإنشاء...</> : "إنشاء الحساب مجاناً"}
              </button>
            </form>
          )}

          {!success && (
            <>
              <div className="my-5 flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400 font-medium">أو</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <button className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition-all duration-200 text-sm">
                <GoogleIcon />
                التسجيل عبر Google
              </button>

              <p className="text-center text-sm text-gray-500 mt-6">
                عندك حساب؟{" "}
                <Link href="/login" className="text-[#25D366] font-bold hover:underline">
                  سجّل دخولك
                </Link>
              </p>
            </>
          )}
        </div>
      </div>

      {/* ── Illustration pane ── */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden flex-col items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1a3a5c] to-[#0c2340]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-[#25D366]/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-md mx-auto w-full">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-5">
              <span className="w-2 h-2 bg-[#25D366] rounded-full animate-pulse" />
              <span className="text-blue-200 text-xs font-semibold">تجربة مجانية 14 يوم — بدون بطاقة بنكية</span>
            </div>
            <h2 className="text-3xl font-black text-white leading-tight mb-3">
              انطلق في دقائق
              <br />
              <span className="text-[#25D366]">وبيع تلقائياً</span>
            </h2>
            <p className="text-blue-200 text-sm leading-relaxed">
              سجّل، أضف منتجاتك، وفعّل البوت. البقية تتكفل بها الذكاء الاصطناعي.
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {miniStats.map(s => (
              <div key={s.label} className="bg-white/10 border border-white/15 rounded-2xl p-3 text-center">
                <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
                <p className="text-[10px] text-blue-300 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Steps */}
          <div className="space-y-3 mb-6">
            {[
              { n: "1", title: "أنشئ حسابك", desc: "في أقل من دقيقة" },
              { n: "2", title: "أضف منتجاتك", desc: "بالاسم والسعر والمخزون" },
              { n: "3", title: "البوت يبيع بدلك", desc: "24/7 بالدارجة" },
            ].map(s => (
              <div key={s.n} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <div className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center text-white text-xs font-black shrink-0">{s.n}</div>
                <div>
                  <p className="text-white text-sm font-bold">{s.title}</p>
                  <p className="text-blue-300 text-xs">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/15">
            <div className="flex gap-0.5 mb-2">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}
            </div>
            <p className="text-blue-100 text-xs leading-relaxed italic">
              "إعداد المتجر ما خدش معي غير 10 دقائق. من أول يوم بدأت ناخد طلبات!"
            </p>
            <div className="flex items-center justify-between mt-2.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-[9px] font-bold">ي</div>
                <p className="text-blue-300 text-[10px] font-semibold">يوسف، فيت ستور · الدار البيضاء</p>
              </div>
              <div className="flex items-center gap-1 bg-green-500/20 rounded-full px-2 py-0.5">
                <TrendingUp className="w-3 h-3 text-[#25D366]" />
                <span className="text-[10px] text-[#25D366] font-bold">+47% مبيعات</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
