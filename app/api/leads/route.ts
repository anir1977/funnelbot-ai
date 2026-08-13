import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/** Mirrors the CHECK constraint on public.leads. */
const LIMITS = {
  nom: 120,
  telephone: 40,
  activite: 120,
  budget: 120,
  message: 2000,
} as const;

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) || null : null;

/**
 * Records an enquiry from the public contact form.
 *
 * Inserts run as the anon role, which RLS permits to write and never to read,
 * so one prospect can't retrieve another's details. The form treats a failure
 * here as non-fatal and still opens WhatsApp — losing the record is bad, losing
 * the conversation would be worse.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const lead = {
    nom: clean(body.nom, LIMITS.nom),
    telephone: clean(body.telephone, LIMITS.telephone),
    activite: clean(body.activite, LIMITS.activite),
    budget: clean(body.budget, LIMITS.budget),
    message: clean(body.message, LIMITS.message),
    source: "formulaire",
  };

  // A name or a phone number is the minimum that makes a record worth keeping.
  if (!lead.nom && !lead.telephone) {
    return NextResponse.json(
      { error: "Renseignez au moins un nom ou un téléphone." },
      { status: 422 }
    );
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("leads").insert(lead);

    if (error) {
      console.error("[leads] insert failed:", error.message);
      return NextResponse.json({ error: "Enregistrement impossible." }, { status: 500 });
    }
  } catch (cause) {
    console.error("[leads] supabase unreachable:", cause);
    return NextResponse.json({ error: "Service indisponible." }, { status: 503 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
