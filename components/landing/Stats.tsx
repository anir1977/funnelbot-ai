"use client";

import { motion } from "framer-motion";

const stats = [
  {
    value: "+1,200",
    label: "متجر مغربي نشط",
    sub: "من كازا لأكادير",
    gradient: "from-[#25D366] to-emerald-400",
    bg: "bg-gradient-to-br from-green-50 to-emerald-50",
    border: "border-green-100",
    dot: "bg-green-500",
  },
  {
    value: "24/7",
    label: "رد تلقائي بلا توقف",
    sub: "حتى الساعة 3 صباحاً",
    gradient: "from-blue-500 to-indigo-400",
    bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
    border: "border-blue-100",
    dot: "bg-blue-500",
  },
  {
    value: "3x",
    label: "زيادة الطلبات",
    sub: "في أول شهر",
    gradient: "from-purple-500 to-violet-400",
    bg: "bg-gradient-to-br from-purple-50 to-violet-50",
    border: "border-purple-100",
    dot: "bg-purple-500",
  },
  {
    value: "98%",
    label: "رضا الزبناء",
    sub: "معدل تقييم 4.9/5",
    gradient: "from-amber-500 to-orange-400",
    bg: "bg-gradient-to-br from-amber-50 to-orange-50",
    border: "border-amber-100",
    dot: "bg-amber-500",
  },
];

export default function Stats() {
  return (
    <section className="py-14 border-y border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative ${s.bg} border ${s.border} rounded-2xl p-5 overflow-hidden group hover:-translate-y-0.5 transition-transform duration-300`}
            >
              {/* Subtle glow */}
              <div className={`absolute -bottom-6 -right-6 w-20 h-20 ${s.dot} opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity`} />

              <div className="flex items-center gap-2 mb-3">
                <div className={`w-2 h-2 rounded-full ${s.dot}`} />
                <span className="text-xs text-gray-500 font-medium">{s.sub}</span>
              </div>

              <p className={`text-3xl lg:text-4xl font-black bg-gradient-to-r ${s.gradient} bg-clip-text text-transparent mb-1`}>
                {s.value}
              </p>
              <p className="text-sm text-gray-600 font-semibold">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
