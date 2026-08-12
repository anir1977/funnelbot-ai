"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Every action re-checks the session. Route protection already redirects
 * anonymous visitors, but a server action is its own POST endpoint and has to
 * stand on its own rather than trust that a page guard ran first.
 */
async function requireSession() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");
  return supabase;
}

const text = (form: FormData, key: string) => {
  const value = form.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : null;
};

const LEAD_STATUSES = ["nouveau", "contacte", "devis", "client", "perdu"];

export async function updateLeadStatus(formData: FormData) {
  const supabase = await requireSession();

  const id = text(formData, "id");
  const status = text(formData, "status");

  // The value arrives from a form the browser can tamper with, and the column
  // has a CHECK constraint — reject it here so the failure is ours, not a 500.
  if (!id || !status || !LEAD_STATUSES.includes(status)) return;

  await supabase.from("leads").update({ status }).eq("id", id);
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

export async function saveLeadNotes(formData: FormData) {
  const supabase = await requireSession();

  const id = text(formData, "id");
  if (!id) return;

  await supabase
    .from("leads")
    .update({ notes: text(formData, "notes") })
    .eq("id", id);

  revalidatePath("/admin/leads");
}

export async function createProject(formData: FormData) {
  const supabase = await requireSession();

  const businessName = text(formData, "business_name");
  if (!businessName) return;

  const rawAmount = text(formData, "amount_mad");
  const amount = rawAmount ? Number(rawAmount.replace(",", ".")) : null;

  await supabase.from("projects").insert({
    business_name: businessName,
    client_name: text(formData, "client_name"),
    sector: text(formData, "sector"),
    phone: text(formData, "phone"),
    email: text(formData, "email"),
    plan: text(formData, "plan"),
    amount_mad: amount !== null && Number.isFinite(amount) ? amount : null,
    site_url: text(formData, "site_url"),
    domain: text(formData, "domain"),
    domain_expires_on: text(formData, "domain_expires_on"),
    hosting_expires_on: text(formData, "hosting_expires_on"),
    status: text(formData, "status") ?? "en_cours",
    notes: text(formData, "notes"),
  });

  revalidatePath("/admin/projets");
  revalidatePath("/admin");
}

export async function updateProjectStatus(formData: FormData) {
  const supabase = await requireSession();

  const id = text(formData, "id");
  const status = text(formData, "status");
  const allowed = ["prospect", "en_cours", "livre", "maintenance", "archive"];

  if (!id || !status || !allowed.includes(status)) return;

  await supabase.from("projects").update({ status }).eq("id", id);
  revalidatePath("/admin/projets");
  revalidatePath("/admin");
}

export async function deleteProject(formData: FormData) {
  const supabase = await requireSession();

  const id = text(formData, "id");
  if (!id) return;

  await supabase.from("projects").delete().eq("id", id);
  revalidatePath("/admin/projets");
  revalidatePath("/admin");
}
