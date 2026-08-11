"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Zap, Mail, Instagram, Facebook, Twitter, Shield, Globe2 } from "lucide-react";
import Link from "next/link";

const footerLinks = [
  {
    heading: "المنتج",
    links: [
      { label: "المزايا", href: "#features" },
      { label: "الأسعار", href: "#pricing" },
      { label: "كيف يشتغل", href: "#how-it-works" },
      { label: "لوحة التحكم", href: "#dashboard" },
    ],
  },
  {
    heading: "الشركة",
    links: [
      { label: "من نحن", href: "/about" },
      { label: "المدونة", href: "/blog" },
      { label: "الشركاء", href: "/partners" },
      { label: "وظائف", href: "/careers" },
    ],
  },
  {
    heading: "الدعم",
    links: [
      { label: "مركز المساعدة", href: "/help" },
      { label: "تواصل معنا", href: "/contact" },
      { label: "واتساب", href: "/whatsapp" },
      { label: "الحالة", href: "/status" },
    ],
  },
];

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:hello@funnelslibrary.com", label: "Email" },
];

const trustItems = [
  { icon: Shield, label: "بدون بيانات بنكية" },
  { icon: Zap, label: "إعداد في 5 دقائق" },
  { icon: Globe2, label: "دعم بالدارجة" },
];

export default function CTAFooter() {
  return (
    <>
      {/* CTA Section */}
      <section
        className="py-28 lg:py-36 bg-[#0E1010] relative overflow-hidden"
        dir="rtl"
      >
        {/* Separator top */}
        <div
          className="absolute top-0 inset-x-0 h-px pointer-events-none"
          style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)" }}
        />

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.025,
          }}
        />

        {/* Radial glow — two-layer depth */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: 900,
            height: 600,
            background: "radial-gradient(ellipse, rgba(16,185,129,0.12) 0%, rgba(16,185,129,0.04) 35%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: 400,
            height: 300,
            background: "radial-gradient(ellipse, rgba(16,185,129,0.09) 0%, transparent 70%)",
            filter: "blur(0px)",
          }}
        />

        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Label chip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <span
              className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.15em] uppercase font-inter px-3.5 py-1.5 rounded-full border"
              style={{
                color: "#10B981",
                borderColor: "rgba(16,185,129,0.2)",
                background: "rgba(16,185,129,0.06)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              ابدأ الآن — مجاناً
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="font-black text-[#EDEDEA] mb-5"
            style={{
              fontSize: "clamp(36px, 6vw, 64px)",
              letterSpacing: "-0.042em",
              lineHeight: 1.04,
            }}
          >
            بيع تلقائياً على واتساب
          </motion.h2>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#6B6B67] text-[15px] lg:text-[16px] leading-relaxed mb-10"
          >
            انضم لأكثر من 1,200 متجر مغربي. 14 يوم مجاناً — بدون بيانات بنكية.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.17, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
          >
            {/* Primary CTA */}
            <Link
              href="/signup"
              className="group relative flex items-center gap-2.5 text-white font-black text-[16px] px-10 py-4 rounded-xl overflow-hidden transition-all duration-200"
              style={{
                background: "#10B981",
                boxShadow: "0 4px 28px rgba(16,185,129,0.4), 0 1px 0 rgba(255,255,255,0.1) inset",
              }}
            >
              {/* shimmer */}
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-550 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent pointer-events-none" />
              <span className="relative z-10">ابدأ مجاناً 14 يوم</span>
              <ArrowLeft className="w-4.5 h-4.5 relative z-10 transition-transform duration-200 group-hover:-translate-x-0.5" />
            </Link>

            {/* Ghost CTA */}
            <Link
              href="/contact"
              className="flex items-center gap-2 border border-white/[0.09] hover:border-white/[0.18] hover:bg-white/[0.04] text-[#6B6B67] hover:text-[#EDEDEA] font-semibold text-[15px] px-8 py-4 rounded-xl transition-all duration-200"
            >
              تواصل مع الفريق
            </Link>
          </motion.div>

          {/* Trust items */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="flex flex-wrap items-center justify-center gap-5"
          >
            {trustItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.18)" }}
                  >
                    <Icon className="w-2.5 h-2.5 text-[#10B981]" />
                  </div>
                  <span className="text-[12px] text-[#525252]">{item.label}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="bg-[#0C0E0E] text-[#525252] border-t border-white/[0.04]"
        dir="rtl"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-8">
            {/* Brand column — col-span-2 */}
            <div className="lg:col-span-2 space-y-5">
              {/* Logo */}
              <Link href="/" className="inline-flex items-center gap-2.5 group">
                <div className="w-7 h-7 rounded-lg bg-[#10B981]/10 border border-[#10B981]/15 flex items-center justify-center group-hover:bg-[#10B981]/15 transition-colors duration-200">
                  <Zap className="w-3.5 h-3.5 text-[#10B981]" />
                </div>
                <span className="font-inter font-black text-[17px] tracking-tight">
                  <span className="text-[#9B9B97] group-hover:text-[#EDEDEA] transition-colors duration-200">Funnels</span>
                  <span className="text-[#10B981]">Library</span>
                </span>
              </Link>

              {/* Tagline */}
              <p className="text-[13px] text-[#525252] leading-relaxed max-w-[220px]">
                بوت واتساب الذكي للمتاجر المغربية.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-2">
                {socialLinks.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <Link
                      key={i}
                      href={s.href}
                      aria-label={s.label}
                      className="w-8 h-8 bg-white/[0.03] hover:bg-[#10B981]/10 border border-white/[0.06] hover:border-[#10B981]/20 rounded-lg flex items-center justify-center transition-all duration-200 text-[#525252] hover:text-[#10B981]"
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Link columns */}
            {footerLinks.map((col, i) => (
              <div key={i} className="space-y-4">
                <h4 className="text-[11px] font-semibold text-[#9B9B97] uppercase tracking-[0.12em] font-inter">
                  {col.heading}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <Link
                        href={link.href}
                        className="text-[13px] text-[#525252] hover:text-[#EDEDEA] transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/[0.04] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#3A3A3A]">
            <div className="flex items-center gap-5">
              <Link href="/privacy" className="hover:text-[#525252] transition-colors duration-150">
                سياسة الخصوصية
              </Link>
              <Link href="/terms" className="hover:text-[#525252] transition-colors duration-150">
                شروط الاستخدام
              </Link>
            </div>
            <span className="text-[#3A3A3A]">© 2025 FunnelsLibrary. جميع الحقوق محفوظة.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
