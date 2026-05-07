import type { SupabaseClient } from "@supabase/supabase-js";

export const DEFAULT_FAQS = [
  {
    question: "هل يوجد الدفع عند الاستلام؟",
    answer:   "نعم، الدفع عند الاستلام متوفر حسب المدينة.",
  },
  {
    question: "كم مدة التوصيل؟",
    answer:   "مدة التوصيل تختلف حسب المدينة ويتم تأكيدها بعد الطلب.",
  },
  {
    question: "هل يوجد استبدال أو إرجاع؟",
    answer:   "يمكن التواصل معنا بخصوص الاستبدال أو الإرجاع حسب حالة الطلب.",
  },
  {
    question: "كيف يمكنني تأكيد طلبي؟",
    answer:   "بعد إرسال الطلب سيتم التواصل معك لتأكيده قبل الشحن.",
  },
  {
    question: "هل التوصيل متوفر لجميع المدن؟",
    answer:   "التوصيل متوفر لمعظم المدن المغربية.",
  },
] as const;

/**
 * Seeds default FAQ templates for a newly created store.
 * Skips silently if FAQs already exist (prevents duplicate insertion on retry).
 * Never throws — errors are logged but do not bubble up to block onboarding.
 */
export async function seedDefaultFaqs(
  supabase: SupabaseClient,
  storeId: string,
): Promise<void> {
  try {
    // Guard: skip if the store already has FAQs
    const { count, error: countError } = await supabase
      .from("faqs")
      .select("id", { count: "exact", head: true })
      .eq("store_id", storeId);

    if (countError) {
      console.error("[faqs] seed — count check error:", countError);
      return;
    }

    if (count && count > 0) {
      console.log(`[faqs] seed skipped — store ${storeId} already has ${count} FAQs`);
      return;
    }

    // Bulk insert all templates in one round-trip
    const rows = DEFAULT_FAQS.map(faq => ({
      store_id:  storeId,
      question:  faq.question,
      answer:    faq.answer,
      hit_count: 0,
      active:    true,
    }));

    const { error: insertError } = await supabase.from("faqs").insert(rows);

    if (insertError) {
      console.error("[faqs] seed — insert error:", insertError);
      return;
    }

    console.log(`[faqs] seed — inserted ${rows.length} default FAQs for store ${storeId}`);
  } catch (err) {
    console.error("[faqs] seed — unexpected error:", err);
  }
}
