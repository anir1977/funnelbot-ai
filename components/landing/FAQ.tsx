"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    q: "واش FunnelsLibrary يشتغل مع واتساب العادي أو بزنس؟",
    a: "FunnelsLibrary كيشتغل مع واتساب بيزنس. الإعداد سهل — كتسكان رمز QR من هاتفك وتبدأ تلقائياً في ثوان. ما تحتاجش رقم واتساب جديد.",
  },
  {
    q: "كيفاش البوت كيفهم الدارجة المغربية؟",
    a: "البوت مبني على تقنية GPT-4 مع تدريب خاص على الدارجة المغربية وأنماط التجارة الإلكترونية في المغرب. كيفهم الاختصارات، المصطلحات، وأسلوب الزبناء المغاربة.",
  },
  {
    q: "واش ممكن يتعرف البوت على منتجاتي بشكل صحيح؟",
    a: "نعم. أنت تضيف منتجاتك، أسعارها، وتفاصيلها من لوحة التحكم. البوت يستعمل هاد المعلومات للرد على الزبناء بدقة. كتقدر تحدث الكتالوج في أي وقت.",
  },
  {
    q: "واش البوت كيقدر يأكد الطلبات COD تلقائياً؟",
    a: "نعم، هاد واحدة من أهم ميزاته. البوت كيسأل الزبون على الاسم، العنوان، ورقم الهاتف، كيحسب التوصيل حسب المدينة، وكيأكد الطلب — كل شيء تلقائياً بدون ما تكون موجود.",
  },
  {
    q: "واش ممكن أتابع المحادثات يدوياً إذا احتجت؟",
    a: "طبعاً. من لوحة التحكم كتقدر تشوف كل المحادثات، وإذا الزبون خصه مساعدة خاصة كتقدر توريه للرد اليدوي وتدخل في المحادثة مباشرة.",
  },
  {
    q: "كيفاش كتجرب مجاناً؟",
    a: "كتضغط على 'جرّب مجاناً'، تسجل حساب بإيميلك، وتبدأ الإعداد. ما كنحتاجوش بطاقة بنكية أو أي معلومات مالية. 14 يوم كاملة مجاناً بكل ميزات باقة Pro.",
  },
  {
    q: "واش في دعم بالعربية أو الدارجة؟",
    a: "نعم! فريق الدعم ديالنا كيرد بالدارجة المغربية والعربية الفصحى على واتساب — لأن إحنا أيضاً مغاربة ونفهم احتياجاتك.",
  },
  {
    q: "واش ممكن نلغي في أي وقت؟",
    a: "نعم، بدون أي التزام. كتقدر تلغي اشتراكك في أي وقت من لوحة الإعدادات. ما كاينش عقود ولا رسوم إلغاء.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#FAFAFA]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs font-bold text-gray-600 mb-5 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-[#25D366]" />
            الأسئلة الشائعة
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 tracking-tight">
            عندك سؤال؟
            <br />
            <span className="text-[#25D366]">جاوبناك هنا</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                open === i ? "border-[#25D366]/30 shadow-[0_0_0_1px_rgba(37,211,102,0.1),0_4px_20px_rgba(37,211,102,0.06)]" : "border-gray-100 shadow-card"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-right"
              >
                <span className={`font-semibold text-[15px] leading-snug text-right transition-colors ${open === i ? "text-[#25D366]" : "text-gray-900"}`}>
                  {faq.q}
                </span>
                <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${open === i ? "bg-[#25D366] text-white rotate-0" : "bg-gray-100 text-gray-500"}`}>
                  {open === i ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-[14px] text-gray-500 leading-relaxed border-t border-gray-50 pt-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-400 mt-10"
        >
          عندك سؤال آخر؟{" "}
          <Link href="/contact" className="text-[#25D366] font-semibold hover:underline">
            راسلنا مباشرة
          </Link>
        </motion.p>
      </div>
    </section>
  );
}
