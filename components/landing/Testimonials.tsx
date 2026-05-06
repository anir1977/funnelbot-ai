"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "محمد العمري",
    role: "صاحب متجر إلكتروني",
    location: "الرياض",
    avatar: "م",
    gradient: "from-green-400 to-emerald-600",
    text: "FunnelBot غيّر طريقة عملي كلياً! كنت أضيع ساعات في الرد على استفسارات العملاء، الآن البوت يتولى كل شيء وأنا أركز على تنمية أعمالي فقط.",
    rating: 5,
    stat: "+45% مبيعات",
  },
  {
    name: "سارة القحطاني",
    role: "مديرة تسويق رقمي",
    location: "جدة",
    avatar: "س",
    gradient: "from-blue-400 to-blue-600",
    text: "ما توقعت أن يكون التأثير بهذا الحجم! في الشهر الأول ارتفعت تحويلاتنا بشكل لافت والعملاء سعداء جداً من سرعة الرد وجودة الخدمة.",
    rating: 5,
    stat: "+60% تحويلات",
  },
  {
    name: "أحمد البلوشي",
    role: "مستشار أعمال",
    location: "دبي",
    avatar: "أ",
    gradient: "from-purple-400 to-purple-600",
    text: "أنصح كل صاحب عمل باستخدام FunnelBot. الإعداد سهل للغاية والنتائج مذهلة. عملاؤنا يحبون سرعة الردود والمساعدة الفورية في أي وقت.",
    rating: 5,
    stat: "3x عملاء جدد",
  },
  {
    name: "فاطمة الزهراني",
    role: "صاحبة مشروع عبايات",
    location: "مكة المكرمة",
    avatar: "ف",
    gradient: "from-pink-400 to-rose-500",
    text: "من أفضل الاستثمارات في مشروعي! البوت يرد على عملائي 24 ساعة وأنا نايمة. الأرقام تتكلم: مبيعاتي تضاعفت خلال شهرين فقط.",
    rating: 5,
    stat: "2x الإيرادات",
  },
  {
    name: "خالد المنصور",
    role: "مدير مبيعات",
    location: "الدمام",
    avatar: "خ",
    gradient: "from-teal-400 to-cyan-600",
    text: "الدعم الفني ممتاز والمنصة سهلة الاستخدام. ما احتجت أي خبرة تقنية للإعداد. شغّلت البوت في نفس اليوم وبدأت أرى النتائج فوراً.",
    rating: 5,
    stat: "+80% توفير وقت",
  },
  {
    name: "نورة العتيبي",
    role: "رائدة أعمال",
    location: "الكويت",
    avatar: "ن",
    gradient: "from-orange-400 to-amber-500",
    text: "FunnelBot هو السر وراء نمو مشروعي السريع. الردود الذكية والطبيعية تجعل العملاء يحسون أنهم يتحدثون مع إنسان حقيقي وليس بوت.",
    rating: 5,
    stat: "+120% نمو",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm font-semibold px-4 py-2 rounded-full mb-4"
          >
            <Star className="w-3.5 h-3.5 fill-yellow-500" />
            آراء عملائنا
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4"
          >
            +500 عميل{" "}
            <span className="text-[#25D366]">يثق بنا</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-xl mx-auto"
          >
            اقرأ ما يقوله أصحاب الأعمال الناجحين عن تجربتهم مع FunnelBot
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white border border-gray-100 rounded-3xl p-6 card-shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-gray-100 absolute top-5 left-5" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 text-sm leading-relaxed mb-5 relative z-10">
                "{t.text}"
              </p>

              {/* Stat pill */}
              <div className="inline-block bg-green-50 border border-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                📈 {t.stat}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">
                    {t.role} · {t.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rating summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-12 p-6 bg-gray-50 rounded-2xl"
        >
          <div className="text-center">
            <p className="text-4xl font-black text-gray-900">4.9</p>
            <div className="flex justify-center gap-1 my-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-xs text-gray-400">متوسط التقييم</p>
          </div>
          <div className="h-12 w-px bg-gray-200" />
          <div className="text-center">
            <p className="text-4xl font-black text-gray-900">+500</p>
            <p className="text-xs text-gray-400 mt-1">عميل نشط</p>
          </div>
          <div className="h-12 w-px bg-gray-200" />
          <div className="text-center">
            <p className="text-4xl font-black text-gray-900">98%</p>
            <p className="text-xs text-gray-400 mt-1">معدل الرضا</p>
          </div>
          <div className="h-12 w-px bg-gray-200" />
          <div className="text-center">
            <p className="text-4xl font-black text-gray-900">14</p>
            <p className="text-xs text-gray-400 mt-1">يوم تجربة مجانية</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
