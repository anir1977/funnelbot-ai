"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    q: "واش البوت كيفهم الدارجة المغربية؟",
    a: "نعم! FunnelsLibrary مدرَّب خصيصاً على الدارجة المغربية واللغة العربية. البوت يفهم أسئلة مثل 'شحال الثمن؟' و'واش التوصيل لكازا؟' ويرد بشكل طبيعي يناسب زبنائك.",
  },
  {
    q: "كيفاش يتوصل البوت مع رقم واتساب متجري؟",
    a: "تربط حسابك عبر WhatsApp Business API في خطوات بسيطة — بدون برمجة. بعد الربط، البوت يبدأ يرد تلقائياً على رسائل زبنائك في أقل من 5 دقائق.",
  },
  {
    q: "واش البوت يقدر يأخذ معلومات الطلب (الاسم، العنوان، الهاتف)؟",
    a: "نعم. البوت يجمع اسم الزبون، عنوانه الكامل، ورقم هاتفه، ثم يرسل لك الطلب مباشرة. أنت فقط تشحن — والبوت يتكلف بالباقي.",
  },
  {
    q: "شحال تاخد الخدمة باش تبدا تخدم؟",
    a: "أغلب أصحاب المتاجر يشغّلون بوتهم في نفس اليوم. الإعداد بسيط: تربط الرقم، تضيف منتجاتك وأسعارك، وتختار قالب متجرك — وتبدا.",
  },
  {
    q: "واش في تجربة مجانية؟",
    a: "نعم! 14 يوم تجربة مجانية كاملة بدون بيانات بنكية. ستجرب جميع مزايا الباقة الاحترافية وترى النتائج بنفسك قبل أي التزام.",
  },
  {
    q: "واش يمكنني نستخدم البوت على إنستغرام وفيسبوك؟",
    a: "نعم في باقة Pro وBusiness. البوت يغطي واتساب، DM إنستغرام، وفيسبوك ماسنجر من لوحة تحكم واحدة — مثالي إذا كنت تبيع عبر عدة قنوات.",
  },
  {
    q: "ماذا يحدث إذا أراد الزبون التحدث مع إنسان حقيقي؟",
    a: "البوت يحول المحادثة إليك تلقائياً عند الطلب، أو عند الحالات المعقدة. أنت تتحكم دائماً في متى تتدخل وتتى تترك البوت يتولى الأمر.",
  },
  {
    q: "واش يمكنني نلغي الاشتراك في أي وقت؟",
    a: "نعم، إلغاء الاشتراك حر وبدون رسوم إضافية. لا يوجد عقود ولا التزامات. إذا لم تكن راضياً، نسترد لك رسوم الشهر الأول بدون أسئلة.",
  },
];

function FAQItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ delay: i * 0.07, duration: 0.45 }}
      className="border border-gray-200 rounded-2xl overflow-hidden bg-white"
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-right hover:bg-gray-50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-bold text-gray-900 text-sm sm:text-base flex-1">{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}
          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${open ? "bg-[#25D366] text-white" : "bg-gray-100 text-gray-500"}`}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-4"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            الأسئلة الشائعة
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4"
          >
            عندك{" "}
            <span className="text-[#25D366]">سؤال؟</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg"
          >
            إجابات على أكثر الأسئلة التي يسألها أصحاب المتاجر. لم تجد ما تبحث عنه؟{" "}
            <Link href="/contact" className="text-[#25D366] font-semibold hover:underline">راسلنا مباشرة</Link>
          </motion.p>
        </div>

        <div className="space-y-3">
          {faqs.map((item, i) => (
            <FAQItem key={item.q} q={item.q} a={item.a} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
