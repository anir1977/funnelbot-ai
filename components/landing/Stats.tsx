"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  { value: 1200,  suffix: "+",    label: "متجر مغربي نشط",        sub: "من كازا لأكادير لفاس"  },
  { value: 500,   suffix: "K+",   label: "رسالة مُعالجة شهرياً",  sub: "بدون تدخل بشري"       },
  { value: 96,    suffix: "%",    label: "معدل استجابة تلقائية",  sub: "البوت يرد خلال ثوان"  },
  { value: 14,    suffix: " يوم", label: "تجربة مجانية كاملة",    sub: "بدون بطاقة بنكية"    },
];

const logos = [
  "عطور الريم", "مود كازا", "فيتنس ماروك",
  "تيندرنس بيوتي", "إيلين فاشن", "ذا سبورت زون",
  "بيوتي هاوس", "فلورا ماروك", "سمارت ستايل",
];

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const count = useMotionValue(0);

  useEffect(() => {
    const unsub = count.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v).toLocaleString("en-US") + suffix;
    });
    const ctrl = animate(count, to, { duration: 1.8, ease: "easeOut" });
    return () => { ctrl.stop(); unsub(); };
  }, [to, suffix, count]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function Stats() {
  return (
    <section className="py-20 lg:py-24 bg-white border-y border-gray-100/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 mb-16">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-center group"
            >
              <p className="text-[36px] sm:text-[42px] lg:text-[48px] font-black text-gray-900 font-inter leading-none mb-2 tabular-nums">
                <CountUp to={s.value} suffix={s.suffix} />
              </p>
              <p className="text-[13px] font-bold text-gray-800 mb-1">{s.label}</p>
              <p className="text-[12px] text-gray-400">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 pt-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center mb-7"
          >
            يثق بنا أكثر من 1,200 متجر مغربي
          </motion.p>

          {/* Marquee */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="flex gap-12 w-max"
            >
              {[...logos, ...logos].map((logo, i) => (
                <span
                  key={i}
                  className="text-[13px] font-bold text-gray-300 whitespace-nowrap select-none"
                >
                  {logo}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
