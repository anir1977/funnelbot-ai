"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Zap, Mail, Instagram, Facebook, Twitter, Shield, Globe2 } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  المنتج: [
    { label: "المميزات",        href: "/#features"    },
    { label: "كيف يعمل",       href: "/#how-it-works" },
    { label: "الأسعار",        href: "/#pricing"      },
    { label: "التحديثات",      href: "#"              },
  ],
  الشركة: [
    { label: "من نحن",          href: "/about"   },
    { label: "المدونة",         href: "#"        },
    { label: "الشراكات",        href: "#"        },
    { label: "اتصل بنا",        href: "/contact" },
  ],
  الدعم: [
    { label: "مركز المساعدة",   href: "#"         },
    { label: "دليل الإعداد",    href: "#"         },
    { label: "سياسة الخصوصية", href: "/privacy"  },
    { label: "الشروط والأحكام", href: "/terms"    },
  ],
};

export default function CTAFooter() {
  return (
    <>
      {/* ── CTA Section ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-[#0E1117] rounded-3xl p-10 lg:p-16 text-center overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-grid-dark opacity-100 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#25D366]/20 blur-[80px] pointer-events-none rounded-full" />
            <div className="absolute -bottom-10 -right-10 w-[300px] h-[300px] bg-blue-500/10 blur-[80px] pointer-events-none rounded-full" />

            {/* Floating dots */}
            {["top-6 right-12", "top-12 left-20", "bottom-8 right-24", "bottom-16 left-10"].map((pos, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -10, 0], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.7 }}
                className={`absolute ${pos} w-2 h-2 bg-[#25D366]/50 rounded-full`}
              />
            ))}

            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <div className="w-14 h-14 bg-[#25D366]/15 border border-[#25D366]/25 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Zap className="w-7 h-7 text-[#25D366]" />
                </div>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight tracking-tight">
                ابدأ تبيع تلقائياً
                <br />
                <span className="text-[#25D366]">على واتساب اليوم</span>
              </h2>

              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                انضم لأكثر من 1,200 متجر مغربي يستخدمون FunnelsLibrary.
                <br />
                14 يوم مجاناً — بدون بيانات بنكية.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
                <Link
                  href="/signup"
                  className="group flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black px-8 py-4 rounded-xl text-base transition-all duration-200 shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5 w-full sm:w-auto justify-center"
                >
                  جرّب مجاناً 14 يوم
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 border border-white/10 text-gray-300 hover:text-white hover:border-white/20 font-semibold px-7 py-4 rounded-xl text-base hover:bg-white/5 transition-all duration-150 w-full sm:w-auto justify-center"
                >
                  تواصل مع الفريق
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
                {[
                  { icon: Shield, text: "بدون بيانات بنكية" },
                  { icon: Zap,    text: "إعداد في 5 دقائق" },
                  { icon: Globe2, text: "دعم بالدارجة" },
                ].map(({ icon: Icon, text }) => (
                  <span key={text} className="flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-[#25D366]" />
                    {text}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#0A0D14] text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-10">

            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
                <div className="w-8 h-8 bg-[#25D366] rounded-lg flex items-center justify-center shadow-glow">
                  <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-[15px] font-black text-white font-inter">
                  Funnels<span className="text-[#25D366]">Library</span>
                </span>
              </Link>
              <p className="text-sm leading-relaxed mb-6 max-w-xs">
                منصة بوت واتساب الذكي للمتاجر الإلكترونية في المغرب.
                ابيع أكثر، اشتغل أقل.
              </p>
              <div className="flex gap-2.5">
                {[
                  { Icon: Instagram, label: "إنستغرام" },
                  { Icon: Facebook,  label: "فيسبوك"  },
                  { Icon: Twitter,   label: "تويتر"   },
                  { Icon: Mail,      label: "البريد"  },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-8 h-8 bg-white/[0.05] hover:bg-[#25D366] rounded-lg flex items-center justify-center transition-colors group"
                  >
                    <Icon className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">{title}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p>© 2025 FunnelsLibrary. جميع الحقوق محفوظة.</p>
            <div className="flex items-center gap-5">
              <Link href="/privacy" className="hover:text-white transition-colors">سياسة الخصوصية</Link>
              <Link href="/terms"   className="hover:text-white transition-colors">الشروط والأحكام</Link>
              <a href="mailto:hello@funnelslibrary.com" className="hover:text-white transition-colors flex items-center gap-1">
                <Mail className="w-3 h-3" />
                hello@funnelslibrary.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
