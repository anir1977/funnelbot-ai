"use client";

import { motion } from "framer-motion";
import { Star, TrendingUp } from "lucide-react";

const testimonials = [
  {
    name: "فاطمة بنعلي",
    role: "متجر كوزميتيك",
    location: "الدار البيضاء",
    avatar: "ف",
    gradient: "from-pink-400 to-rose-500",
    text: "كنت نرد على كل رسالة بيدي — الثمن، التوصيل، التأكيد. كنت ما نقدرش نتابع كل شيء. دابا البوت كيتكلف بكلشي وأنا فقط كنقبض وكنشحن. مبيعاتي تضاعفات في شهر واحد.",
    rating: 5,
    metric: "+2x الطلبات",
    metricDetail: "في شهر واحد",
    store: "متجر لونا كوزميتيك",
  },
  {
    name: "يوسف الإدريسي",
    role: "متجر ملابس رجالية",
    location: "الرباط",
    avatar: "ي",
    gradient: "from-blue-400 to-blue-600",
    text: "زبناء بزاف كانوا يسألوني على المقاسات والألوان ف 11 الليل وأنا نايم. البوت كيجاوب عليهم كلهم في ثوانٍ. دابا ما كنخسرش ولا طلب واحد بسبب التأخر في الرد.",
    rating: 5,
    metric: "صفر طلب ضائع",
    metricDetail: "حتى ف 3 الصبح",
    store: "ستايل للملابس الرجالية",
  },
  {
    name: "سلمى التازي",
    role: "بائعة عطور",
    location: "مراكش",
    avatar: "س",
    gradient: "from-amber-400 to-orange-500",
    text: "الإعداد ما خد منّي حتى نص ساعة. أضفت منتجاتي وأسعار التوصيل لكل مدينة. دابا البوت كيجاوب على الثمن والتوصيل والتأكيد — كأنه موظف حقيقي.",
    rating: 5,
    metric: "إعداد في 30 دقيقة",
    metricDetail: "بدون خبرة تقنية",
    store: "عطور الريم",
  },
  {
    name: "نور الهدى المنصوري",
    role: "مكملات رياضية",
    location: "أكادير",
    avatar: "ن",
    gradient: "from-emerald-400 to-green-600",
    text: "عندي متجر مكملات غذائية — الزبناء كيسألوا على الجرعات والمكونات وأنا ما كنتش نقدر نرد على الكل. البوت عارف كل منتجاتي ويرد بالتفصيل. نسبة التحويل طلعت 40%!",
    rating: 5,
    metric: "40% معدل تحويل",
    metricDetail: "من محادثة لطلب",
    store: "فيت ستور أكادير",
  },
  {
    name: "حسن بوعزة",
    role: "إلكترونيات",
    location: "فاس",
    avatar: "ح",
    gradient: "from-teal-400 to-cyan-600",
    text: "كنت نخاف أن البوت ما يفهمش الدارجة بشكل صحيح. لكن جربته وكان مفاجأة — كيجاوب كأنه إنسان حقيقي. حتى الزبناء قلوا لي 'فريقك مؤدب بزاف!'",
    rating: 5,
    metric: "95% رسائل تلقائية",
    metricDetail: "بدون تدخل بشري",
    store: "تك شوب فاس",
  },
  {
    name: "خديجة الغازي",
    role: "ملابس نسائية",
    location: "طنجة",
    avatar: "خ",
    gradient: "from-violet-400 to-purple-600",
    text: "شهر واحد مع FunnelsLibrary وبلغت رقم قياسي في المبيعات. البوت كيرسل تذكير للزبناء اللي ما كملوش طلبهم — واسترجعت 35% منهم. هذا الشيء ما كنت نعرفو أصلاً.",
    rating: 5,
    metric: "+120% المبيعات",
    metricDetail: "الشهر الأول",
    store: "خديجة ستايل طنجة",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm font-semibold px-4 py-2 rounded-full mb-4"
          >
            <Star className="w-3.5 h-3.5 fill-yellow-500" />
            شهادات أصحاب المتاجر
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4"
          >
            +1,200 متجر مغربي{" "}
            <span className="text-[#25D366]">يثق بنا</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-xl mx-auto"
          >
            نتائج حقيقية من أصحاب متاجر حقيقيين — ملابس، عطور، مكملات، إلكترونيات
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white border border-gray-100 rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 to-emerald-50/0 group-hover:from-green-50/60 group-hover:to-emerald-50/40 transition-all duration-500 rounded-3xl" />

              <div className="relative z-10">
                <div className="flex gap-0.5 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-5">
                  "{t.text}"
                </p>

                {/* Metric badge */}
                <div className="flex items-center gap-2 mb-5 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <TrendingUp className="w-4 h-4 text-[#25D366] shrink-0" />
                  <div>
                    <p className="text-sm font-black text-gray-900">{t.metric}</p>
                    <p className="text-[11px] text-gray-400">{t.metricDetail}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.store} · {t.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm"
        >
          {[
            { val: "4.9/5",   lbl: "متوسط التقييم", sub: "من 1,200+ تقييم" },
            { val: "+1,200",  lbl: "متجر نشط",       sub: "من 12 مدينة مغربية" },
            { val: "98%",     lbl: "معدل الرضا",      sub: "خلال 30 يوم" },
            { val: "14 يوم",  lbl: "تجربة مجانية",    sub: "بدون بيانات بنكية" },
          ].map((s) => (
            <div key={s.lbl} className="text-center">
              <p className="text-2xl lg:text-3xl font-black text-gray-900">{s.val}</p>
              <p className="text-sm font-semibold text-gray-700 mt-0.5">{s.lbl}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
