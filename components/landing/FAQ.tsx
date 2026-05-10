"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowLeft } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "واش FunnelsLibrary يشتغل مع واتساب العادي أو بيزنس؟",
    answer:
      "FunnelsLibrary كيشتغل مع واتساب بيزنس API — وهو الإصدار الرسمي المخصص للمتاجر. كنعاونوك على الإعداد من البداية بدون تعقيد، وعادةً كيولو في أقل من 15 دقيقة.",
  },
  {
    question: "كيفاش البوت كيفهم الدارجة المغربية؟",
    answer:
      "بوتنا مدرّب على الدارجة المغربية بشكل خاص — بمختلف اللهجات الجهوية والخلط بين العربية والفرنسية. كيفهم السياق وكيرد بطريعة طبيعية كأنك كتخاطب بنادم حقيقي.",
  },
  {
    question: "واش ممكن يتعرف البوت على منتجاتي بشكل صحيح؟",
    answer:
      "إيه، كتضيف كاتالوغ منتجاتك مباشرة من لوحة التحكم — أسماء، أسعار، مقاسات، ألوان، والصور. البوت كيتعلم منهم ويقدر يجاوب على أسئلة الزبائن بدقة.",
  },
  {
    question: "واش البوت كيقدر يأكد الطلبات COD تلقائياً؟",
    answer:
      "هذا من أقوى مزايانا. البوت كيجمع معلومات الزبون — الاسم، العنوان، المنتج، المقاس — ويأكد الطلب تلقائياً في لوحة التحكم ديالك. يعني ولا طلب ضايع.",
  },
  {
    question: "واش ممكن أتابع المحادثات يدوياً إذا احتجت؟",
    answer:
      "طبعاً. عندك إمكانية التدخل في أي محادثة في أي وقت من لوحة التحكم. كتشوف كل المحادثات في الوقت الحقيقي، وكتقدر تستعمل وضع \"يدوي\" لمتابعة زبون معين بنفسك.",
  },
  {
    question: "كيفاش كتجرب مجاناً؟",
    answer:
      "سجل من الموقع بدون بيانات بنكية، وغادي تحصل على 14 يوم كاملة مع كل مزايا الباقة Pro. إذا بغيتي تكمل، تختار الباقة المناسبة. إذا لا، ما كاين غرامة.",
  },
  {
    question: "واش في دعم بالعربية أو الدارجة؟",
    answer:
      "إيه بالتأكيد. فريق الدعم ديالنا كيتواصل بالدارجة المغربية والعربية والفرنسية. كتقدر تراسلنا على واتساب مباشرة أو من داخل لوحة التحكم.",
  },
  {
    question: "واش ممكن نلغي في أي وقت؟",
    answer:
      "إيه، بدون شروط وبدون عقود. كتلغي من لوحة التحكم بضغطة واحدة. ما كاين ولا رسوم إضافية. بياناتك كتبقى محفوظة 30 يوم بعد الإلغاء.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28 lg:py-36 bg-[#121414] relative overflow-hidden" dir="rtl">
      {/* Separator */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)" }} />

      <div className="relative max-w-[640px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#10B981] font-semibold font-inter mb-5">
            الأسئلة الشائعة
          </p>
          <h2
            className="font-black text-[#EDEDEA] mb-5"
            style={{ fontSize: "clamp(32px, 5vw, 52px)", letterSpacing: "-0.038em", lineHeight: 1.06 }}
          >
            عندك سؤال؟
          </h2>
          <p className="text-[#9B9B97] text-[15.5px] leading-relaxed">
            راجع الأسئلة الأكثر شيوعاً. ما لقيتيش جوابك؟{" "}
            <Link href="/contact" className="text-[#10B981] hover:text-emerald-400 transition-colors">
              راسلنا مباشرة
            </Link>
          </p>
        </motion.div>

        {/* FAQ items */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.055, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Accent border for open item — appears on the right (start side in RTL) */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ scaleY: 0, opacity: 0 }}
                      animate={{ scaleY: 1, opacity: 1 }}
                      exit={{ scaleY: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="absolute right-0 top-0 bottom-0 w-[2px] rounded-full origin-top"
                      style={{ background: "#10B981" }}
                    />
                  )}
                </AnimatePresence>

                <div
                  className="border-b transition-colors duration-200"
                  style={{ borderColor: isOpen ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.055)" }}
                >
                  <button
                    className="flex items-center justify-between w-full text-right gap-5 py-6 pr-4 group"
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span
                      className="text-[15.5px] font-semibold leading-snug transition-colors duration-250"
                      style={{ color: isOpen ? "#EDEDEA" : "#BDBDB9" }}
                    >
                      {faq.question}
                    </span>

                    <span
                      className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-250"
                      style={{
                        background: isOpen ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.04)",
                        border: isOpen ? "1px solid rgba(16,185,129,0.22)" : "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      {isOpen ? (
                        <Minus className="w-3 h-3 text-[#10B981]" />
                      ) : (
                        <Plus className="w-3 h-3 text-[#525252] group-hover:text-[#9B9B97] transition-colors" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-[14.5px] text-[#9B9B97] leading-[1.75] pr-4 pb-6 pt-0.5 max-w-[560px]">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-14 flex flex-col items-center text-center gap-4"
        >
          <p className="text-[14px] text-[#525252]">
            سؤال آخر؟ كنجاوبوك مباشرة على واتساب
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#10B981] hover:text-emerald-400 transition-colors duration-150 border border-[#10B981]/20 hover:border-[#10B981]/35 rounded-xl px-5 py-2.5"
            style={{ background: "rgba(16,185,129,0.06)" }}
          >
            راسلنا الآن
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
