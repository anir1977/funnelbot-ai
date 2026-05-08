"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap, ChevronDown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "المميزات",        href: "/#features"     },
  { label: "كيف يعمل",       href: "/#how-it-works"  },
  { label: "الأسعار",        href: "/#pricing"       },
  { label: "آراء العملاء",   href: "/#testimonials"  },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [lang,        setLang]        = useState<"ar" | "fr">("ar");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[68px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-8 h-8 bg-[#25D366] rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-glow transition-shadow duration-300">
              <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[15px] font-black tracking-tight text-gray-900 font-inter">
              Funnels<span className="text-[#25D366]">Library</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3.5 py-2 text-[13.5px] font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all duration-150"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Language switcher */}
            <button
              onClick={() => setLang(lang === "ar" ? "fr" : "ar")}
              className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-all border border-gray-200 hover:border-gray-300"
            >
              <span className="font-inter">{lang === "ar" ? "FR" : "AR"}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            <Link
              href="/login"
              className="text-[13.5px] font-semibold text-gray-700 hover:text-gray-900 px-3.5 py-2 rounded-lg hover:bg-gray-50 transition-all"
            >
              تسجيل الدخول
            </Link>

            <Link
              href="/signup"
              className="bg-[#25D366] hover:bg-[#1ebe5d] text-white text-[13.5px] font-bold px-4 py-2 rounded-xl transition-all duration-200 shadow-sm hover:shadow-glow hover:-translate-y-px"
            >
              جرّب مجاناً
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="القائمة"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t border-gray-100 bg-white/98 backdrop-blur-xl"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-0.5">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 hover:text-[#25D366] rounded-xl transition-colors text-sm"
                >
                  {l.label}
                </a>
              ))}
              <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 py-3 rounded-xl transition-colors"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center bg-[#25D366] text-white font-bold py-3 rounded-xl text-sm"
                >
                  جرّب مجاناً — 14 يوم
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
