"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
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
    <section
      id="faq"
      className="py-24 lg:py-32 bg-[#121414]"
      dir="rtl"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-[#10B981] text-[13px] font-semibold tracking-wide uppercase mb-4">
            الأسئلة الشائعة
          </span>
          <h2
            className="text-4xl lg:text-5xl font-black text-[#EDEDEA] mb-4"
            style={{ letterSpacing: "-0.04em" }}
          >
            عندك سؤال؟
          </h2>
          <p className="text-[#9B9B97] text-[15px] leading-relaxed">
            راجع الأسئلة الأكثر شيوعاً. ما لقيتيش جوابك؟ راسلنا مباشرة.
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
              <div
                key={i}
                className="border-b border-white/[0.06] py-5"
              >
                <button
                  className="flex items-center justify-between w-full text-right gap-4 group"
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span
                    className={`text-[15px] font-semibold leading-snug transition-colors duration-200 ${
                      isOpen ? "text-[#10B981]" : "text-[#EDEDEA]"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span className="shrink-0">
                    {isOpen ? (
                      <Minus
                        className="w-5 h-5 transition-colors duration-200"
                        style={{ color: "#10B981" }}
                      />
                    ) : (
                      <Plus
                        className="w-5 h-5 transition-colors duration-200"
                        style={{ color: "#9B9B97" }}
                      />
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
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-[14px] text-[#9B9B97] leading-relaxed pt-3 pb-1">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-10"
        >
          <p className="text-[14px] text-[#9B9B97]">
            عندك سؤال آخر؟{" "}
            <Link
              href="/contact"
              className="text-[#10B981] font-semibold hover:underline transition-all"
            >
              راسلنا على واتساب
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
