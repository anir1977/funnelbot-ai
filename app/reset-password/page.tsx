"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Logo from "@/components/agency/Logo";

/**
 * Reached only through the recovery link: /auth/callback exchanges the code for
 * a session first, so updateUser here acts on an already-authenticated user.
 */
export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (password !== confirm) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }

    setBusy(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(
        "Lien expiré ou déjà utilisé. Demandez-en un nouveau depuis la page de connexion."
      );
      setBusy(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  const field =
    "w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-[14.5px] text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all";

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-5 py-20">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Logo markClassName="w-10 h-10" />
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8">
          <h1 className="text-[22px] font-black text-slate-900 tracking-tight mb-1.5">
            Nouveau mot de passe
          </h1>
          <p className="text-slate-500 text-[14px] mb-7">
            Choisissez un mot de passe pour votre compte.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div>
              <label className="block text-[12.5px] font-semibold text-slate-700 mb-1.5">
                Confirmer
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                autoComplete="new-password"
                placeholder="Répétez le mot de passe"
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
              {busy ? "Enregistrement…" : "Enregistrer"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
