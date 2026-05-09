"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "المميزات",  href: "/#features" },
  { label: "كيف يعمل", href: "/#how-it-works" },
  { label: "الأسعار",  href: "/#pricing" },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          "border-b border-white/[0.05]",
          scrolled
            ? "bg-[#121414]/95 backdrop-blur-2xl"
            : "bg-[#121414]/80 backdrop-blur-2xl",
        )}
        style={{ direction: "rtl" }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-[60px] flex items-center justify-between gap-6">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 flex-shrink-0 select-none"
            aria-label="FunnelsLibrary — الصفحة الرئيسية"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#10B981]/15">
              <Zap className="w-4 h-4 text-[#10B981]" fill="currentColor" strokeWidth={0} />
            </span>
            <span className="font-inter font-bold text-[15px] tracking-tight leading-none">
              <span className="text-[#EDEDEA]">Funnels</span>
              <span className="text-[#10B981]">Library</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-1 flex-1 justify-center"
            aria-label="التنقل الرئيسي"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-150",
                  "text-[#9B9B97] hover:text-[#EDEDEA] hover:bg-white/[0.04]",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <Link
              href="/login"
              className={cn(
                "px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-150",
                "text-[#9B9B97] hover:text-[#EDEDEA] hover:bg-white/[0.04]",
              )}
            >
              تسجيل الدخول
            </Link>
            <Link
              href="/signup"
              className={cn(
                "px-4 py-2 rounded-xl text-[13px] font-bold text-white transition-all duration-150",
                "bg-[#10B981] hover:bg-emerald-400 active:scale-[0.97]",
              )}
              style={{
                boxShadow:
                  "0 0 0 1px rgba(16,185,129,0.3), 0 4px 12px rgba(16,185,129,0.2)",
              }}
            >
              ابدأ مجاناً
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={cn(
              "md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors",
              "text-[#9B9B97] hover:text-[#EDEDEA] hover:bg-white/[0.06]",
            )}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed top-[60px] inset-x-0 z-40 bg-[#121414] border-t border-white/[0.06] md:hidden"
            style={{ direction: "rtl" }}
          >
            <nav className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-[14px] font-medium transition-colors",
                    "text-[#9B9B97] hover:text-[#EDEDEA] hover:bg-white/[0.04]",
                  )}
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-3 pt-3 border-t border-white/[0.06] flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-[14px] font-medium text-center transition-colors",
                    "text-[#9B9B97] hover:text-[#EDEDEA] hover:bg-white/[0.04]",
                  )}
                >
                  تسجيل الدخول
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-[14px] font-bold text-white text-center transition-all",
                    "bg-[#10B981] hover:bg-emerald-400",
                  )}
                  style={{
                    boxShadow:
                      "0 0 0 1px rgba(16,185,129,0.3), 0 4px 12px rgba(16,185,129,0.2)",
                  }}
                >
                  ابدأ مجاناً
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
