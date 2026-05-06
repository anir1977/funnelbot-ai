"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, MessageCircle, Package, ShoppingBag, Truck,
  HelpCircle, Settings, Store, BookOpen, Bell, ChevronDown,
  Menu, X, Wifi, LogOut, ArrowLeft,
} from "lucide-react";

const nav = [
  { href: "/dashboard",          icon: LayoutDashboard, label: "الرئيسية",         badge: null },
  { href: "/dashboard/store",    icon: Store,            label: "إعدادات المتجر",   badge: null },
  { href: "/dashboard/products", icon: Package,          label: "المنتجات",         badge: null },
  { href: "/dashboard/orders",   icon: ShoppingBag,      label: "الطلبات",          badge: "12" },
  { href: "/dashboard/delivery", icon: Truck,            label: "التوصيل",          badge: null },
  { href: "/dashboard/faq",      icon: HelpCircle,       label: "الأسئلة الشائعة",  badge: null },
  { href: "/dashboard/settings", icon: Settings,         label: "الإعدادات",        badge: null },
];

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-[#25D366] rounded-xl flex items-center justify-center shrink-0">
              <BookOpen className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-white font-black text-sm leading-none">
                Funnels<span className="text-[#25D366]">Library</span>
              </p>
              <p className="text-gray-500 text-[10px] mt-0.5">لوحة التحكم</p>
            </div>
          </Link>
          {onClose && (
            <button onClick={onClose} className="lg:hidden p-1 text-gray-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Store picker */}
      <div className="px-3 py-2.5 border-b border-white/10">
        <button className="w-full flex items-center gap-2.5 bg-white/5 hover:bg-white/10 rounded-xl px-3 py-2.5 transition-colors text-right">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
            ع
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold truncate">عطور الريم</p>
            <p className="text-gray-400 text-[10px]">باقة Pro · نشط</p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                active
                  ? "bg-[#25D366]/20 text-[#25D366]"
                  : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 transition-colors ${active ? "text-[#25D366]" : "group-hover:text-gray-200"}`} />
              <span className="text-sm font-medium flex-1">{item.label}</span>
              {item.badge && (
                <span className="bg-[#25D366] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bot status */}
      <div className="px-3 pb-2">
        <div className="flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/20 rounded-xl px-3 py-2.5">
          <Wifi className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
          <div className="flex-1">
            <p className="text-[10px] text-[#25D366] font-bold">البوت نشط</p>
            <p className="text-[9px] text-gray-500">يرد تلقائياً • 24/7</p>
          </div>
          <div className="w-2 h-2 bg-[#25D366] rounded-full animate-pulse shrink-0" />
        </div>
      </div>

      {/* User */}
      <div className="p-3 border-t border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
            م
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold truncate">محمد قاسمي</p>
            <p className="text-gray-500 text-[10px]">مدير المتجر</p>
          </div>
          <Link href="/" title="العودة للموقع" className="p-1.5 text-gray-500 hover:text-gray-300 transition-colors rounded-lg hover:bg-white/5">
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
          <button className="p-1.5 text-gray-500 hover:text-gray-300 transition-colors rounded-lg hover:bg-white/5">
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Shell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const pageTitle = () => {
    if (pathname === "/dashboard")           return { title: "الرئيسية", sub: "نظرة عامة على متجرك" };
    if (pathname.startsWith("/dashboard/store"))    return { title: "إعدادات المتجر", sub: "بيانات متجرك الأساسية" };
    if (pathname.startsWith("/dashboard/products")) return { title: "المنتجات", sub: "إدارة كتالوج منتجاتك" };
    if (pathname.startsWith("/dashboard/orders"))   return { title: "الطلبات", sub: "متابعة وإدارة الطلبات" };
    if (pathname.startsWith("/dashboard/delivery")) return { title: "التوصيل", sub: "أسعار ومناطق التوصيل" };
    if (pathname.startsWith("/dashboard/faq"))      return { title: "الأسئلة الشائعة", sub: "الردود التلقائية على الأسئلة المتكررة" };
    if (pathname.startsWith("/dashboard/settings")) return { title: "الإعدادات", sub: "ضبط إعدادات البوت والتكاملات" };
    return { title: "FunnelsLibrary", sub: "" };
  };

  const { title, sub } = pageTitle();

  return (
    <div className="min-h-screen bg-[#f8f9fc]">

      {/* Desktop sidebar — fixed on right */}
      <aside className="hidden lg:flex flex-col fixed top-0 right-0 bottom-0 w-64 bg-[#1a1f2e] z-30">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`lg:hidden fixed top-0 right-0 bottom-0 w-64 bg-[#1a1f2e] z-50 transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <SidebarContent onClose={() => setOpen(false)} />
      </aside>

      {/* Main content area */}
      <div className="lg:mr-64 flex flex-col min-h-screen">

        {/* Topbar */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 lg:px-6 h-16 flex items-center gap-3">
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="القائمة"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-bold text-gray-900 leading-none">{title}</h1>
            {sub && <p className="text-[11px] text-gray-400 mt-0.5 truncate">{sub}</p>}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              البوت نشط
            </div>
            <button className="relative w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-sm font-bold cursor-pointer">
              م
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
