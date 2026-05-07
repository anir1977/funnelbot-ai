"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, MessageCircle, Package, ShoppingBag, Truck,
  HelpCircle, Settings, Store, BookOpen, Bell, ChevronDown,
  Menu, X, Wifi, LogOut, ArrowLeft, ChevronRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Profile  = { full_name: string | null; email: string; plan: string } | null;
type StoreData = { id: string; name: string; active: boolean; bot_tone: string } | null;

const nav = [
  { href: "/dashboard",               icon: LayoutDashboard, label: "الرئيسية"        },
  { href: "/dashboard/store",         icon: Store,           label: "إعدادات المتجر"  },
  { href: "/dashboard/products",      icon: Package,         label: "المنتجات"        },
  { href: "/dashboard/orders",        icon: ShoppingBag,     label: "الطلبات"         },
  { href: "/dashboard/conversations", icon: MessageCircle,   label: "المحادثات"       },
  { href: "/dashboard/delivery",      icon: Truck,           label: "التوصيل"         },
  { href: "/dashboard/faq",           icon: HelpCircle,      label: "الأسئلة الشائعة" },
  { href: "/dashboard/settings",      icon: Settings,        label: "الإعدادات"       },
];

const planLabel: Record<string, string> = {
  trial:   "تجريبي",
  starter: "Starter",
  pro:     "Pro",
  agency:  "Agency",
};

const planColors: Record<string, string> = {
  trial:   "bg-gray-500/20 text-gray-400",
  starter: "bg-blue-500/20 text-blue-400",
  pro:     "bg-[#25D366]/20 text-[#25D366]",
  agency:  "bg-purple-500/20 text-purple-400",
};

function initial(name: string | null | undefined): string {
  return name?.trim()?.[0]?.toUpperCase() ?? "م";
}

function SidebarContent({
  profile, store, onClose,
}: {
  profile: Profile;
  store: StoreData;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const router   = useRouter();

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const storeInitial   = initial(store?.name);
  const profileInitial = initial(profile?.full_name);
  const planKey        = profile?.plan ?? "trial";
  const planText       = planLabel[planKey] ?? "تجريبي";
  const planColor      = planColors[planKey] ?? planColors.trial;

  return (
    <div className="flex flex-col h-full">

      {/* ── Logo ── */}
      <div className="px-4 py-4 border-b border-white/[0.06]">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-[#25D366] rounded-xl flex items-center justify-center shadow-lg shadow-[#25D366]/30 shrink-0">
              <BookOpen className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-white font-black text-sm leading-none tracking-tight">
                Funnels<span className="text-[#25D366]">Library</span>
              </p>
              <p className="text-gray-500 text-[10px] mt-0.5 font-medium">لوحة التحكم</p>
            </div>
          </Link>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-gray-600 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* ── Store Picker ── */}
      <div className="px-3 py-3 border-b border-white/[0.06]">
        <button className="w-full flex items-center gap-2.5 bg-white/[0.05] hover:bg-white/[0.08] rounded-xl px-3 py-2.5 transition-colors text-right group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-md shadow-orange-500/20">
            {storeInitial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold truncate leading-none">{store?.name ?? "—"}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${planColor}`}>
                {planText}
              </span>
              <span className={`text-[9px] ${store?.active ? "text-[#25D366]" : "text-gray-500"}`}>
                {store?.active ? "● نشط" : "○ متوقف"}
              </span>
            </div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-gray-500 shrink-0 group-hover:text-gray-400 transition-colors" />
        </button>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {nav.map((item) => {
          const Icon   = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group relative ${
                active
                  ? "bg-[#25D366]/15 text-white"
                  : "text-gray-500 hover:bg-white/[0.05] hover:text-gray-300"
              }`}
            >
              {active && (
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#25D366] rounded-l-full" />
              )}
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  active ? "text-[#25D366]" : "group-hover:text-gray-300"
                }`}
              />
              <span className={`text-sm flex-1 ${active ? "font-semibold text-white" : "font-medium"}`}>
                {item.label}
              </span>
              {active && <ChevronRight className="w-3 h-3 text-[#25D366]/60 shrink-0" />}
            </Link>
          );
        })}
      </nav>

      {/* ── Bot Status ── */}
      <div className="px-3 pb-2">
        <div className="flex items-center gap-2.5 bg-[#25D366]/10 border border-[#25D366]/15 rounded-xl px-3 py-2.5">
          <div className="relative shrink-0">
            <Wifi className="w-4 h-4 text-[#25D366]" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#25D366] rounded-full animate-pulse" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-[#25D366] font-bold leading-none">البوت نشط</p>
            <p className="text-[9px] text-gray-500 mt-0.5">يرد تلقائياً · 24/7</p>
          </div>
          <div className="text-left">
            <p className="text-[10px] text-[#25D366] font-black">96%</p>
            <p className="text-[8px] text-gray-600">استجابة</p>
          </div>
        </div>
      </div>

      {/* ── User ── */}
      <div className="p-3 border-t border-white/[0.06]">
        <div className="flex items-center gap-2.5 px-1">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-md shadow-emerald-500/20">
            {profileInitial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold truncate leading-none">
              {profile?.full_name ?? profile?.email ?? "—"}
            </p>
            <p className="text-gray-500 text-[10px] mt-0.5">مدير المتجر</p>
          </div>
          <div className="flex items-center gap-0.5">
            <Link
              href="/"
              title="العودة للموقع"
              className="p-1.5 text-gray-600 hover:text-gray-300 transition-colors rounded-lg hover:bg-white/[0.06]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={handleSignOut}
              title="تسجيل الخروج"
              className="p-1.5 text-gray-600 hover:text-red-400 transition-colors rounded-lg hover:bg-white/[0.06]"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Shell({
  children, profile, store,
}: {
  children: React.ReactNode;
  profile: Profile;
  store: StoreData;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const pageTitle = (): { title: string; sub: string } => {
    if (pathname === "/dashboard")                       return { title: "الرئيسية",          sub: "نظرة عامة على متجرك"                   };
    if (pathname.startsWith("/dashboard/store"))         return { title: "إعدادات المتجر",    sub: "بيانات متجرك الأساسية"                 };
    if (pathname.startsWith("/dashboard/products"))      return { title: "المنتجات",          sub: "إدارة كتالوج منتجاتك"                  };
    if (pathname.startsWith("/dashboard/orders"))        return { title: "الطلبات",           sub: "متابعة وإدارة الطلبات"                  };
    if (pathname.startsWith("/dashboard/conversations")) return { title: "المحادثات",         sub: "صندوق الرسائل مع الزبناء"              };
    if (pathname.startsWith("/dashboard/delivery"))      return { title: "التوصيل",           sub: "أسعار ومناطق التوصيل"                  };
    if (pathname.startsWith("/dashboard/faq"))           return { title: "الأسئلة الشائعة",  sub: "الردود التلقائية على الأسئلة المتكررة" };
    if (pathname.startsWith("/dashboard/settings"))      return { title: "الإعدادات",        sub: "ضبط إعدادات البوت والتكاملات"          };
    return { title: "FunnelsLibrary", sub: "" };
  };

  const { title, sub } = pageTitle();
  const profileInitial  = initial(profile?.full_name);

  return (
    <div className="min-h-screen bg-[#F4F6F9]">

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed top-0 right-0 bottom-0 w-[240px] bg-[#161B27] z-30 border-l border-white/[0.04]">
        <SidebarContent profile={profile} store={store} />
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
        className={`lg:hidden fixed top-0 right-0 bottom-0 w-[240px] bg-[#161B27] z-50 transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <SidebarContent profile={profile} store={store} onClose={() => setOpen(false)} />
      </aside>

      {/* Main */}
      <div className="lg:mr-[240px] flex flex-col min-h-screen">

        {/* Topbar */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 lg:px-6 h-[60px] flex items-center gap-3 shadow-sm">
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="القائمة"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <h1 className="text-sm font-bold text-gray-900 leading-none">{title}</h1>
              {sub && (
                <>
                  <span className="text-gray-200 text-xs hidden sm:inline">/</span>
                  <p className="text-[11px] text-gray-400 truncate hidden sm:block">{sub}</p>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold px-2.5 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              البوت نشط
            </div>
            <button className="relative w-9 h-9 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-sm font-bold cursor-pointer shadow-md shadow-emerald-200">
              {profileInitial}
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
