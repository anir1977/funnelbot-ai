"use client";

import { motion } from "framer-motion";
import { MessageCircle, Bot, ShoppingBag, Truck, BarChart3, Globe2, Zap, Shield } from "lucide-react";

/* ── Bento card visual previews ── */

function ChatPreview() {
  return (
    <div dir="ltr" className="mt-4 space-y-2 pointer-events-none select-none">
      {[
        { from: "user", text: "بغيت نعرف السعر ديال الجاكيت" },
        { from: "bot",  text: "الجاكيت بـ 349 درهم 🧥" },
        { from: "user", text: "وشحال التوصيل لفاس؟" },
        { from: "bot",  text: "25 درهم — المجموع 374 ✅" },
      ].map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: m.from === "bot" ? 10 : -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 + 0.2 }}
          className={`flex ${m.from === "bot" ? "justify-end" : "justify-start"}`}
        >
          <span
            className={`text-[11px] px-2.5 py-1.5 rounded-xl leading-snug ${
              m.from === "bot"
                ? "bg-[#25D366]/20 text-[#25D366] rounded-tr-sm"
                : "bg-white/[0.06] text-white/60 rounded-tl-sm"
            }`}
          >
            {m.text}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function OrderFlow() {
  const steps = ["الاسم", "العنوان", "التأكيد"];
  return (
    <div className="mt-4 flex items-center gap-2 pointer-events-none select-none">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-1">
            <div className="w-7 h-7 rounded-full bg-[#3B82F6]/20 border border-[#3B82F6]/30 flex items-center justify-center">
              <span className="text-[9px] font-bold text-[#3B82F6] font-inter">{i + 1}</span>
            </div>
            <span className="text-[10px] text-white/40">{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div className="w-6 h-px bg-white/[0.1] mb-3 flex-shrink-0" />
          )}
        </div>
      ))}
      <div className="flex flex-col items-center gap-1 mr-1">
        <div className="w-7 h-7 rounded-full bg-[#25D366]/20 border border-[#25D366]/30 flex items-center justify-center">
          <svg className="w-3 h-3 text-[#25D366]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <span className="text-[10px] text-white/40">تأكيد</span>
      </div>
    </div>
  );
}

function MiniChart() {
  const bars = [38, 55, 42, 70, 58, 88, 63, 95, 74, 107, 84, 120];
  const max = Math.max(...bars);
  return (
    <div className="mt-4 pointer-events-none select-none">
      <div className="flex items-end gap-1 h-12" dir="ltr">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.4 }}
            style={{
              originY: 1,
              height: `${(h / max) * 100}%`,
              backgroundColor: i === bars.length - 1 ? "#EC4899" : "rgba(236,72,153,0.2)",
            }}
            className="flex-1 rounded-[2px]"
          />
        ))}
      </div>
      <div className="flex items-center justify-between mt-1.5">
        <span className="text-[9px] text-white/25 font-inter">يناير</span>
        <span className="text-[9px] text-[#EC4899] font-bold font-inter">+29% ↑</span>
        <span className="text-[9px] text-white/25 font-inter">ديسمبر</span>
      </div>
    </div>
  );
}

/* ── Feature card definitions ── */

const features = [
  {
    id: "ai",
    icon: Bot,
    color: "#25D366",
    badge: "GPT-4 Powered",
    title: "ذكاء اصطناعي يفهم الدارجة",
    desc: "البوت يفهم الدارجة المغربية والعربية ويرد كأنه إنسان — بدون أخطاء ولا ردود جاهزة.",
    wide: true,
    visual: <ChatPreview />,
  },
  {
    id: "cod",
    icon: ShoppingBag,
    color: "#3B82F6",
    badge: "COD Ready",
    title: "تأكيد طلبات COD تلقائياً",
    desc: "يجمع اسم الزبون، عنوانه، ورقم هاتفه ويؤكد الطلب مباشرة في واتساب.",
    wide: true,
    visual: <OrderFlow />,
  },
  {
    id: "247",
    icon: MessageCircle,
    color: "#8B5CF6",
    badge: "24/7",
    title: "رد فوري حتى وأنت نايم",
    desc: "البوت يرد على كل الأسئلة — من الأسعار لأوقات التوصيل — في أي وقت.",
    wide: false,
  },
  {
    id: "delivery",
    icon: Truck,
    color: "#F59E0B",
    badge: "جميع المدن",
    title: "إدارة التوصيل والمدن",
    desc: "حدد أسعار التوصيل لكل مدينة والبوت يحسبها تلقائياً.",
    wide: false,
  },
  {
    id: "analytics",
    icon: BarChart3,
    color: "#EC4899",
    badge: "Real-time",
    title: "تحليلات ومبيعات مباشرة",
    desc: "تابع المبيعات والطلبات في لحظتها من لوحة تحكم واضحة.",
    wide: true,
    visual: <MiniChart />,
  },
  {
    id: "nocode",
    icon: Zap,
    color: "#F97316",
    badge: "No Code",
    title: "إعداد في 5 دقائق",
    desc: "لا تحتاج خبرة تقنية. أضف المنتجات واربط واتساب وابدأ.",
    wide: false,
  },
  {
    id: "lang",
    icon: Globe2,
    color: "#14B8A6",
    badge: "متعدد اللغات",
    title: "عربي، دارجة، وفرنسية قريباً",
    desc: "البوت يتواصل بلغة الزبون — الدارجة أو العربية الفصحى.",
    wide: false,
  },
  {
    id: "security",
    icon: Shield,
    color: "#6366F1",
    badge: "SSL / GDPR",
    title: "أمان وخصوصية تامة",
    desc: "بيانات متجرك وزبناؤك محمية بتشفير متقدم ولا نشاركها مع طرف ثالث أبداً.",
    wide: true,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-[#0A0D14] relative overflow-hidden">

      {/* Noise */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='%23ffffff' fill-opacity='0.014'%3E%3Cpath d='M0 0h1v60H0zm60 0v1H0V0z'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top, rgba(37,211,102,0.08) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-full px-4 py-1.5 text-xs font-bold text-white/50 mb-5">
            <Zap className="w-3.5 h-3.5 text-[#25D366]" />
            المميزات
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
            كل ما تحتاجه لتنمية
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #25D366 0%, #86efac 50%, #25D366 100%)" }}
            >
              متجرك على واتساب
            </span>
          </h2>
          <p className="text-[16px] text-white/35 max-w-lg mx-auto leading-relaxed">
            FunnelsLibrary مو مجرد بوت — هو مساعد ذكي يبيع، يتابع، ويخدم الزبناء نيابة عنك.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative rounded-2xl border border-white/[0.06] p-5 overflow-hidden transition-all duration-300 hover:border-white/[0.12] cursor-default ${
                  f.wide ? "lg:col-span-2" : "lg:col-span-1"
                }`}
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at top right, ${f.color}08 0%, transparent 60%)` }}
                />

                {/* Top row: icon + badge */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${f.color}18`, border: `1px solid ${f.color}22` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: f.color }} />
                  </div>
                  <span
                    className="text-[10px] font-black px-2 py-0.5 rounded-full font-inter"
                    style={{ background: `${f.color}14`, color: f.color, border: `1px solid ${f.color}20` }}
                  >
                    {f.badge}
                  </span>
                </div>

                <h3 className="text-[15px] font-bold text-white mb-2 leading-snug">{f.title}</h3>
                <p className="text-[13px] text-white/35 leading-relaxed">{f.desc}</p>

                {f.visual && f.visual}

                {/* Bottom accent line on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${f.color}50, transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
