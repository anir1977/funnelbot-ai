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
        className="py-24 lg:py-32 bg-[#0E1010] relative overflow-hidden"
        dir="rtl"
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: 800,
            height: 500,
            background:
              "radial-gradient(ellipse, rgba(16,185,129,0.1) 0%, transparent 60%)",
          }}
        />

        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-[#10B981] text-[13px] font-semibold tracking-wide uppercase mb-5">
              ابدأ الآن
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-4xl lg:text-5xl xl:text-6xl font-black text-[#EDEDEA] mb-6"
            style={{ letterSpacing: "-0.04em" }}
          >
            بيع تلقائياً على واتساب
          </motion.h2>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#9B9B97] text-[15px] lg:text-base leading-relaxed mb-10"
          >
            انضم لأكثر من 1,200 متجر مغربي. 14 يوم مجاناً — بدون بيانات بنكية.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
          >
            {/* Primary CTA */}
            <Link
              href="/signup"
              className="group relative flex items-center gap-2 bg-[#10B981] hover:bg-emerald-400 text-white font-black text-[16px] px-10 py-5 rounded-2xl transition-all duration-200 overflow-hidden"
              style={{ boxShadow: "0 4px 24px rgba(16,185,129,0.4)" }}
            >
              {/* Shimmer */}
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <span>ابدأ مجاناً 14 يوم</span>
              <ArrowLeft className="w-5 h-5" />
            </Link>

            {/* Ghost CTA */}
            <Link
              href="/contact"
              className="flex items-center gap-2 border border-white/[0.1] text-[#9B9B97] hover:text-[#EDEDEA] hover:border-white/[0.2] font-semibold text-[15px] px-8 py-5 rounded-2xl transition-all duration-200"
            >
              تواصل مع الفريق
            </Link>
          </motion.div>

          {/* Trust items */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            {trustItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-2">
                  <Icon
                    className="w-3.5 h-3.5"
                    style={{ color: "rgba(16,185,129,0.5)" }}
                  />
                  <span className="text-[12px] text-[#525252]">{item.label}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="bg-[#0C0E0E] text-[#525252] border-t border-white/[0.05]"
        dir="rtl"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-8">
            {/* Brand column — col-span-2 */}
            <div className="lg:col-span-2 space-y-5">
              {/* Logo */}
              <Link href="/" className="inline-flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#10B981]/15 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-[#10B981]" />
                </div>
                <span className="font-inter font-black text-[17px]">
                  <span className="text-[#EDEDEA]">Funnels</span>
                  <span className="text-[#10B981]">Library</span>
                </span>
              </Link>

              {/* Tagline */}
              <p className="text-[13px] text-[#525252] leading-relaxed max-w-xs">
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
                      className="w-8 h-8 bg-white/[0.04] hover:bg-[#10B981]/15 hover:text-[#10B981] rounded-lg flex items-center justify-center transition-all duration-200 text-[#525252]"
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
                <h4 className="text-[12px] font-semibold text-[#9B9B97] uppercase tracking-wide">
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
            <div className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="hover:text-[#525252] transition-colors"
              >
                سياسة الخصوصية
              </Link>
              <Link
                href="/terms"
                className="hover:text-[#525252] transition-colors"
              >
                شروط الاستخدام
              </Link>
            </div>
            <span>© 2025 FunnelsLibrary. جميع الحقوق محفوظة.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
