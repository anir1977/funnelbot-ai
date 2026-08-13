"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MailCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Logo from "@/components/agency/Logo";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);

    const supabase = createClient();
    await supabase.auth.resetPasswordForEmail(email, {
      // The callback exchanges the code, then forwards to /reset-password.
      redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
    });

    // Always report success. Telling the visitor whether an address exists
    // would let anyone probe for registered accounts.
    setSent(true);
    setBusy(false);
  }

  const field =
    "w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-[14.5px] text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all";

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <div className="px-6 py-6">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-[13.5px] font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à la connexion
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-5 pb-20">
        <div className="w-full max-w-sm">
          <div className="flex justify-center mb-8">
            <Logo markClassName="w-10 h-10" />
          </div>

          {sent ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center">
              <div className="w-12 h-12 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center mx-auto mb-5">
                <MailCheck className="w-5 h-5 text-green-600" />
              </div>
              <h1 className="text-[20px] font-black text-slate-900 tracking-tight mb-2">
                Vérifiez votre boîte mail
              </h1>
              <p className="text-slate-500 text-[14px] leading-relaxed">
                Si un compte existe pour{" "}
                <span className="font-semibold text-slate-700">{email}</span>, un
                lien de réinitialisation vient d'y être envoyé.
              </p>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-3xl p-8">
              <h1 className="text-[22px] font-black text-slate-900 tracking-tight mb-1.5">
                Mot de passe oublié
              </h1>
              <p className="text-slate-500 text-[14px] mb-7">
                Indiquez votre email, nous vous envoyons un lien pour en choisir un
                nouveau.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[12.5px] font-semibold text-slate-700 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="vous@funnelslibrary.com"
                    className={field}
                  />
                </div>

                <button
                  type="submit"
                  disabled={busy}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-[15px] py-3.5 rounded-xl transition-colors"
                >
                  {busy ? "Envoi…" : "Envoyer le lien"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
