"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "+1,200",  label: "متجر مغربي نشط",         sub: "من كازا لأكادير لفاس"  },
  { value: "+500K",   label: "رسالة مُعالجة شهرياً",   sub: "بدون تدخل بشري"       },
  { value: "96%",     label: "معدل استجابة تلقائية",   sub: "البوت يرد خلال ثوان"  },
  { value: "14 يوم",  label: "تجربة مجانية كاملة",     sub: "بدون بطاقة بنكية"    },
];

const logos = [
  "عطور الريم", "مود كازا", "فيتنس ماروك",
  "تيندرنس بيوتي", "إيلين فاشن", "ذا سبورت زون",
];

export default function Stats() {
  return (
    <section className="py-16 lg:py-20 bg-white border-y border-gray-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 mb-14">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="text-center"
            >
              <p className="text-3xl lg:text-[40px] font-black text-gray-900 font-inter leading-none mb-2">{s.value}</p>
              <p className="text-sm font-semibold text-gray-800">{s.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-10 text-center">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-6">
            يثق بنا أكثر من 1,200 متجر مغربي
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {logos.map((logo, i) => (
              <motion.span
                key={logo}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="text-sm font-bold text-gray-300 hover:text-gray-500 transition-colors select-none"
              >
                {logo}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
