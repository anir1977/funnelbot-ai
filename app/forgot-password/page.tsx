"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Mail, Loader2, CheckCircle, ArrowRight } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail]     = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30 flex flex-col items-center justify-center p-6">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 mb-10 group">
        <div className="w-9 h-9 bg-[#25D366] rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
          <BookOpen className="w-4 h-4 text-white" strokeWidth={2.5} />
        </div>
        <span className="font-black text-xl text-gray-900">
          Funnels<span className="text-[#25D366]">Library</span>
        </span>
      </Link>

      <div className="w-full max-w-sm bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/60 p-8">
        {sent ? (
          /* Success state */
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-8 h-8 text-[#25D366]" />
            </div>
            <h1 className="text-xl font-black text-gray-900 mb-2">تم الإرسال!</h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-2">
              راسلنا رابط إعادة تعيين كلمة المرور إلى:
            </p>
            <p className="text-[#25D366] font-bold text-sm mb-6 font-mono" dir="ltr">{email}</p>
            <p className="text-xs text-gray-400 mb-6">
              تحقق من مجلد البريد غير المرغوب إذا لم يصلك الإيميل.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => { setSent(false); setEmail(""); }}
                className="w-full bg-[#25D366] hover:bg-[#1eb85a] text-white font-bold py-3 rounded-xl transition-all hover:-translate-y-0.5 shadow-md shadow-green-200"
              >
                إرسال مجدداً
              </button>
              <Link
                href="/login"
                className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 font-semibold text-sm py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                العودة لتسجيل الدخول
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* Email form */
          <>
            <div className="w-12 h-12 bg-[#25D366]/10 rounded-2xl flex items-center justify-center mb-5">
              <Mail className="w-6 h-6 text-[#25D366]" />
            </div>
            <h1 className="text-xl font-black text-gray-900 mb-1">نسيت كلمة المرور؟</h1>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              أدخل بريدك الإلكتروني وغادي نرسلك رابط لإعادة التعيين.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">البريد الإلكتروني</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366] transition-all"
                  dir="ltr"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1eb85a] disabled:opacity-70 text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-green-200 hover:-translate-y-0.5 active:translate-y-0 disabled:translate-y-0"
              >
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> جاري الإرسال...</> : "إرسال رابط إعادة التعيين"}
              </button>
            </form>

            <Link
              href="/login"
              className="flex items-center justify-center gap-2 text-gray-500 hover:text-gray-800 text-sm font-medium mt-5 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              العودة لتسجيل الدخول
            </Link>
          </>
        )}
      </div>

      <p className="text-xs text-gray-400 mt-6">
        ما عندكش حساب؟{" "}
        <Link href="/signup" className="text-[#25D366] font-semibold hover:underline">
          سجّل مجاناً
        </Link>
      </p>
    </div>
  );
}
