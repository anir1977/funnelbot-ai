"use client";

import { motion } from "framer-motion";
import { Users, Clock, TrendingUp, Star } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "+500",
    label: "عميل نشط",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Clock,
    value: "24/7",
    label: "متاح دائماً",
    color: "text-[#25D366]",
    bg: "bg-green-50",
  },
  {
    icon: TrendingUp,
    value: "10x",
    label: "زيادة المبيعات",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Star,
    value: "98%",
    label: "رضا العملاء",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
];

export default function Stats() {
  return (
    <section className="py-14 border-y border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className={`w-12 h-12 ${s.bg} rounded-2xl flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <div>
                  <p className={`text-3xl lg:text-4xl font-black ${s.color}`}>{s.value}</p>
                  <p className="text-sm text-gray-500 mt-1 font-medium">{s.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
