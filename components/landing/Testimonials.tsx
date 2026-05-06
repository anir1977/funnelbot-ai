"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "فاطمة بنعلي",
    role: "صاحبة متجر كوزميتيك",
    location: "الدار البيضاء",
    avatar: "ف",
    gradient: "from-pink-400 to-rose-500",
    text: "قبل FunnelsLibrary كنت نرد على كل واحد بيدي وكنت نتعبى. دابا البوت كيرد بدلي على الثمن والتوصيل والطلبات، وأنا فقط كنقبض وكنشحن. مبيعاتي تضاعفات في شهر!",
    rating: 5,
    stat: "2x الطلبات في شهر واحد",
    store: "متجر لونا كوزميتيك",
  },
  {
    name: "يوسف الإدريسي",
    role: "صاحب متجر ملابس",
    location: "الرباط",
    avatar: "ي",
    gradient: "from-blue-400 to-blue-600",
    text: "الزبناء كانوا يسألوني على المقاسات والألوان وأنا ما كنت نقدر نرد في الوقت. دابا البوت كيجاوب بلا ما نفيق ف 3 الصبح! خسارة ولا طلب واحد.",
    rating: 5,
    stat: "+65% طلبات ليلية",
    store: "متجر الأناقة للملابس",
  },
  {
    name: "سلمى التازي",
    role: "مديرة متجر إلكتروني",
    location: "مراكش",
    avatar: "س",
    gradient: "from-purple-400 to-purple-600",
    text: "الإعداد كان بسيط جداً ما خدت حتى نص ساعة. والدعم الفني كيجاوب بسرعة. دابا عندي 3 متاجر كلهم خداماً ببوت واحد.",
    rating: 5,
    stat: "3 متاجر — بوت واحد",
    store: "ترند أكسسوارز",
  },
  {
    name: "نور الهدى المنصوري",
    role: "رائدة أعمال",
    location: "فاس",
    avatar: "ن",
    gradient: "from-emerald-400 to-green-600",
    text: "أحسن استثمار دارتو في متجري. الزبناء راضيين على سرعة الرد، والمبيعات طلعت. كل صاحب متجر يبيع عبر واتساب خاصو يجرب.",
    rating: 5,
    stat: "+80% رضا الزبناء",
    store: "متجر نور للأناقة",
  },
  {
    name: "حسن بوعزة",
    role: "صاحب متجر إلكتروني",
    location: "أكادير",
    avatar: "ح",
    gradient: "from-teal-400 to-cyan-600",
    text: "ما كنت نصدقش أن البوت يفهم الدارجة المغربية هكذا! كيجاوب كأنه واحد من الفريق. الزبناء كيظنوا كيهضروا مع إنسان حقيقي.",
    rating: 5,
    stat: "95% رسائل مُعالجة تلقائياً",
    store: "ستايل كيوب",
  },
  {
    name: "خديجة الغازي",
    role: "بائعة إنستغرام وواتساب",
    location: "طنجة",
    avatar: "خ",
    gradient: "from-orange-400 to-amber-500",
    text: "كنت نضيع وقت كبير نرد على نفس الأسئلة. الثمن؟ التوصيل؟ المقاس؟ دابا البوت كيجاوب عليهم كلهم وأنا حرة. شهر واحد وبلغت رقم قياسي في المبيعات.",
    rating: 5,
    stat: "+120% مبيعات الشهر الأول",
    store: "خديجة ستايل",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm font-semibold px-4 py-2 rounded-full mb-4"
          >
            <Star className="w-3.5 h-3.5 fill-yellow-500" />
            آراء أصحاب المتاجر
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
            أصحاب متاجر حقيقيون من المغرب يشاركون تجربتهم مع FunnelsLibrary
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white border border-gray-100 rounded-3xl p-6 card-shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              <Quote className="w-8 h-8 text-gray-100 absolute top-5 left-5" />

              <div className="flex gap-0.5 mb-4">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-4 relative z-10">
                "{t.text}"
              </p>

              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block bg-green-50 border border-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                  📈 {t.stat}
                </span>
              </div>

              <div className="pt-4 border-t border-gray-50">
                <div className="flex items-center gap-3">
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

        {/* Summary bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 p-6 bg-gray-50 rounded-2xl"
        >
          {[
            { val: "4.9/5",  lbl: "متوسط التقييم" },
            { val: "+1,200", lbl: "متجر نشط" },
            { val: "98%",    lbl: "معدل الرضا" },
            { val: "14 يوم", lbl: "تجربة مجانية" },
          ].map((s) => (
            <div key={s.lbl} className="text-center">
              <p className="text-2xl lg:text-3xl font-black text-gray-900">{s.val}</p>
              <p className="text-xs text-gray-400 mt-1">{s.lbl}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
