"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "أمينة الحسناوي",
    role: "صاحبة متجر عطور",
    city: "الدار البيضاء",
    avatar: "أ",
    color: "from-pink-400 to-rose-500",
    stars: 5,
    text: "قبل FunnelsLibrary كنت نقضي 4 ساعات في اليوم على واتساب. دابا البوت كيجاوب على كل الأسئلة وكيأكد الطلبات — أنا مجرد كنتابع الإحصائيات. المبيعات زادت 60% في أول شهر!",
    metrics: "+60% مبيعات",
  },
  {
    name: "يوسف الإدريسي",
    role: "بائع ملابس أونلاين",
    city: "الرباط",
    avatar: "ي",
    color: "from-blue-400 to-indigo-500",
    stars: 5,
    text: "الشيء اللي عجبني بزاف هو أن البوت كيفهم الدارجة المغربية بشكل طبيعي. الزبناء ما كيعرفوش واش هم كيحضوا مع بوت أو إنسان. ونسبة تأكيد الطلبات وصلات 85%!",
    metrics: "85% نسبة التأكيد",
  },
  {
    name: "سارة بنعلي",
    role: "إدارة متجر رياضة",
    city: "فاس",
    avatar: "س",
    color: "from-emerald-400 to-teal-500",
    stars: 5,
    text: "كنت خايفة تكون الأداة صعبة — لكن الإعداد ما أخذش حتى 10 دقائق. الدعم رد علي بالدارجة وحل كل مشكلاتي. الآن البوت يشتغل بدالي وأنا مرتاحة.",
    metrics: "10 دقائق إعداد",
  },
  {
    name: "خالد المنصوري",
    role: "بائع إلكترونيات",
    city: "أكادير",
    avatar: "خ",
    color: "from-amber-400 to-orange-500",
    stars: 5,
    text: "كانت عندي مشكلة مع فقدان الزبناء لأنني ما نقدرش نرد بسرعة. دابا البوت كيرد في ثوان — حتى في الليل. الزبناء راضين وما عادش كانفقد الطلبات.",
    metrics: "صفر طلبات ضائعة",
  },
  {
    name: "مريم زغيبي",
    role: "بائعة مستحضرات تجميل",
    city: "مراكش",
    avatar: "م",
    color: "from-violet-400 to-purple-500",
    stars: 5,
    text: "التقارير اللي كتعطيني إياها FunnelsLibrary واضحة ومفيدة. نشوف وين الزبناء كيوقفوا وعلاش ما كيكملوش الطلب. زدت تحسين المنتجات بناءً على البيانات وزادت مبيعاتي.",
    metrics: "+40% معدل التحويل",
  },
  {
    name: "عمر بوزيان",
    role: "بائع قهوة مختصة",
    city: "طنجة",
    avatar: "ع",
    color: "from-cyan-400 to-sky-500",
    stars: 5,
    text: "الأسعار معقولة مقارنة بما كنت ندفع لموظف يرد على واتساب. دابا البوت كيشتغل 24/7 بسعر ثابت، وجودة الرد أحسن بكثير من قبل.",
    metrics: "توفير 70% تكاليف",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 text-xs font-bold text-gray-600 mb-5">
            <Star className="w-3.5 h-3.5 text-[#25D366]" fill="#25D366" />
            آراء العملاء
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            أصحاب متاجر حقيقيون
            <br />
            <span className="text-[#25D366]">نتائج حقيقية</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400" fill="#FBBF24" />
              ))}
            </div>
            <span className="text-sm text-gray-600 font-semibold">
              4.9 من 5 · بناءً على +1,200 تقييم
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-card hover:shadow-card-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Quote icon */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex">
                  {[...Array(t.stars)].map((_, si) => (
                    <Star key={si} className="w-3.5 h-3.5 text-amber-400" fill="#FBBF24" />
                  ))}
                </div>
                <Quote className="w-5 h-5 text-gray-100" />
              </div>

              {/* Text */}
              <p className="text-[14px] text-gray-600 leading-relaxed mb-5 flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Metric badge */}
              <div className="bg-[#25D366]/8 text-[#25D366] text-[11px] font-black px-3 py-1.5 rounded-lg mb-5 inline-block w-fit">
                {t.metrics}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 leading-none">{t.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{t.role} · {t.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
