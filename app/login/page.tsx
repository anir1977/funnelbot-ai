"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Eye, EyeOff, Loader2, Star, CheckCircle, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

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

const miniChats = [
  { side: "user", text: "شحال ثمن بلو دي شانيل؟" },
  { side: "bot",  text: "100ml — 640 درهم 🌸\nالتوصيل للرباط 30 د" },
  { side: "user", text: "بغيت واحد — الدفع عند الاستلام؟" },
  { side: "bot",  text: "✅ COD متاح! عطيني اسمك وعنوانك" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError]       = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(
        authError.message === "Invalid login credentials"
          ? "البريد الإلكتروني أو كلمة المرور غير صحيحة"
          : "حدث خطأ، حاول مجدداً"
      );
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  const handleGoogle = async () => {
    setError(null);
    setGoogleLoading(true);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=/dashboard` },
    });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* ── Form pane ── */}
      <div className="flex-1 lg:max-w-[480px] flex flex-col items-center justify-center p-6 lg:p-12 bg-white relative z-10">
        <div className="w-full max-w-sm">

          <Link href="/" className="flex items-center gap-2.5 mb-8 group">
            <div className="w-9 h-9 bg-[#25D366] rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <BookOpen className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-black text-xl text-gray-900">
              Funnels<span className="text-[#25D366]">Library</span>
            </span>
          </Link>

          <h1 className="text-2xl font-black text-gray-900 mb-1">أهلاً بعودتك 👋</h1>
          <p className="text-gray-500 text-sm mb-7">سجّل دخولك لإدارة متجرك</p>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">البريد الإلكتروني</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={inputCls}
                dir="ltr"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">كلمة المرور</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={`${inputCls} pl-10`}
                  dir="ltr"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div
                  onClick={() => setRemember(v => !v)}
                  className={`w-4 h-4 rounded flex items-center justify-center border-2 transition-all cursor-pointer ${remember ? "bg-[#25D366] border-[#25D366]" : "border-gray-300 group-hover:border-[#25D366]/50"}`}
                >
                  {remember && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
                <span className="text-xs text-gray-600 select-none">تذكرني</span>
              </label>
              <Link href="/forgot-password" className="text-xs text-[#25D366] font-semibold hover:underline">
                نسيت كلمة المرور؟
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1eb85a] disabled:opacity-70 text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-green-200 hover:-translate-y-0.5 active:translate-y-0 disabled:translate-y-0"
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> جاري الدخول...</> : "تسجيل الدخول"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">أو</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition-all duration-200 text-sm disabled:opacity-60"
          >
            {googleLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <GoogleIcon />}
            المتابعة عبر Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            ما عندكش حساب؟{" "}
            <Link href="/signup" className="text-[#25D366] font-bold hover:underline">
              سجّل الآن مجاناً
            </Link>
          </p>
        </div>
      </div>

      {/* ── Illustration pane ── */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden flex-col items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#064e3b] to-[#025c3b]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-[#25D366]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-md mx-auto w-full">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-5">
              <span className="w-2 h-2 bg-[#25D366] rounded-full animate-pulse" />
              <span className="text-green-200 text-xs font-semibold">+1,200 متجر مغربي نشط</span>
            </div>
            <h2 className="text-3xl font-black text-white leading-tight mb-3">
              بيع أكثر بدون ما
              <br />
              <span className="text-[#25D366]">تفيق كل رسالة</span>
            </h2>
            <p className="text-green-200 text-sm leading-relaxed">
              البوت يرد على زبنائك 24/7، يأخذ الطلبات بالدفع عند الاستلام، ويرسلها إليك جاهزة للشحن.
            </p>
          </div>

          <div className="relative mx-auto w-52">
            <div className="absolute -right-14 top-8 bg-white rounded-2xl shadow-2xl px-3 py-2.5 z-20">
              <p className="text-[10px] text-gray-400">طلبات اليوم</p>
              <p className="text-sm font-black text-gray-900">28 طلب ✅</p>
            </div>
            <div className="absolute -left-14 bottom-12 bg-white rounded-2xl shadow-2xl px-3 py-2.5 z-20">
              <p className="text-[10px] text-gray-400">مبيعات</p>
              <p className="text-sm font-black text-gray-900">6,840 د 💰</p>
            </div>
            <div className="bg-gray-900 rounded-[32px] p-[7px] shadow-2xl ring-1 ring-gray-700/50">
              <div className="bg-[#ECE5DD] rounded-[26px] overflow-hidden h-[260px] flex flex-col" dir="ltr">
                <div className="bg-[#075E54] text-white px-3 pt-6 pb-2.5 flex items-center gap-2 shrink-0">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center text-[10px] font-bold">ع</div>
                  <div>
                    <p className="text-[10px] font-bold">عطور الريم</p>
                    <p className="text-[8px] opacity-70 flex items-center gap-0.5">
                      <span className="w-1 h-1 bg-green-400 rounded-full inline-block" />يرد تلقائياً
                    </p>
                  </div>
                </div>
                <div className="flex-1 px-2.5 py-2 flex flex-col gap-1.5">
                  {miniChats.map((m, i) => (
                    <div key={i} className={`flex ${m.side === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[82%] px-2.5 py-1.5 rounded-xl text-[9px] shadow-sm leading-relaxed whitespace-pre-line ${m.side === "user" ? "bg-[#DCF8C6] rounded-tr-sm" : "bg-white rounded-tl-sm"}`}
                        dir="rtl"
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-[#F0F0F0] px-2 py-1.5 flex gap-1.5 shrink-0">
                  <div className="flex-1 bg-white rounded-full px-2.5 py-1 text-[8px] text-gray-300" dir="rtl">رسالة...</div>
                  <div className="w-5 h-5 bg-[#25D366] rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 fill-white" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/15">
            <div className="flex gap-0.5 mb-2">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}
            </div>
            <p className="text-green-100 text-xs leading-relaxed italic">
              "البوت كيبيع بدلي حتى فالليل! مبيعاتي تضاعفات في شهر واحد."
            </p>
            <div className="flex items-center gap-2 mt-2.5">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-[9px] font-bold">ف</div>
              <p className="text-green-300 text-[10px] font-semibold">فاطمة، متجر كوزميتيك · الدار البيضاء</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
