"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, MailCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Logo from "@/components/agency/Logo";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [checkInbox, setCheckInbox] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    setBusy(true);
    setError(null);

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });

    if (error) {
      setError(error.message);
      setBusy(false);
      return;
    }

    // With email confirmation switched on, signUp returns no session and the
    // account stays unusable until the link is opened.
    if (!data.session) {
      setCheckInbox(true);
      setBusy(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  const field =
    "w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-[14.5px] text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all";

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <div className="px-6 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-[13.5px] font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au site
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-5 pb-20">
        <div className="w-full max-w-sm">
          <div className="flex justify-center mb-8">
            <Logo markClassName="w-10 h-10" />
          </div>

          {checkInbox ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center">
              <div className="w-12 h-12 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center mx-auto mb-5">
                <MailCheck className="w-5 h-5 text-green-600" />
              </div>
              <h1 className="text-[20px] font-black text-slate-900 tracking-tight mb-2">
                Vérifiez votre boîte mail
              </h1>
              <p className="text-slate-500 text-[14px] leading-relaxed">
                Nous avons envoyé un lien de confirmation à{" "}
                <span className="font-semibold text-slate-700">{email}</span>.
                Ouvrez-le pour activer votre compte.
              </p>
            </div>
          ) : (
            <>
              <div className="bg-white border border-slate-200 rounded-3xl p-8">
                <h1 className="text-[22px] font-black text-slate-900 tracking-tight mb-1.5">
                  Créer un compte
                </h1>
                <p className="text-slate-500 text-[14px] mb-7">
                  L'accès à l'espace agence, réservé à votre équipe.
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

                  <div>
                    <label className="block text-[12.5px] font-semibold text-slate-700 mb-1.5">
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                      autoComplete="new-password"
                      placeholder="8 caractères minimum"
                      className={field}
                    />
                  </div>

                  {error && (
                    <p className="bg-red-50 border border-red-200 text-red-700 text-[13.5px] rounded-xl px-4 py-3">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={busy}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-[15px] py-3.5 rounded-xl transition-colors"
                  >
                    {busy ? "Création…" : "Créer mon compte"}
                  </button>
                </form>
              </div>

              <p className="text-center text-slate-500 text-[13.5px] mt-6">
                Vous avez déjà un compte ?{" "}
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Se connecter
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
