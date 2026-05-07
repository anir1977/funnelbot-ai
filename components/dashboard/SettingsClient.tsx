"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  Bot,
  CheckCircle2,
  HelpCircle,
  Loader2,
  MessageCircle,
  Package,
  Phone,
  Power,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Wifi,
  Zap,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Store = {
  id: string;
  name: string;
  whatsapp_number: string;
  active: boolean;
  bot_tone: string;
  welcome_message: string | null;
  updated_at: string;
};

type Stats = {
  activeProducts: number;
  deliveryZones: number;
  activeFaqs: number;
  totalConversations: number;
  unreadConversations: number;
  ordersThisMonth: number;
  conversationsToday: number;
};

const toneLabels: Record<string, string> = {
  friendly: "ودّي وطبيعي",
  pro: "احترافي",
  funny: "مرح وخفيف",
  brief: "مختصر ومباشر",
};

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${className}`}>
      {children}
    </section>
  );
}

function formatPhone(phone: string) {
  if (!phone) return "غير محدد";
  return `+${phone.replace(/\D/g, "")}`;
}

function StatusPill({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${
      ok ? "border-green-200 bg-green-50 text-green-700" : "border-amber-200 bg-amber-50 text-amber-700"
    }`}>
      {ok ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
      {label}
    </span>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <Link href={href} className="rounded-xl border border-gray-100 bg-gray-50/70 p-4 transition-colors hover:bg-gray-100">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-white border border-gray-100 flex items-center justify-center">
          <Icon className="w-4 h-4 text-gray-700" />
        </div>
        <div>
          <p className="text-lg font-extrabold text-gray-950 leading-none">{value}</p>
          <p className="text-xs text-gray-500 mt-1.5">{label}</p>
        </div>
      </div>
    </Link>
  );
}

export default function SettingsClient({ store, stats }: { store: Store; stats: Stats }) {
  const router = useRouter();
  const [active, setActive] = useState(store.active);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const readyItems = [
    { label: "منتجات يستعملها البوت", ok: stats.activeProducts > 0, href: "/dashboard/products" },
    { label: "مدن وأسعار التوصيل", ok: stats.deliveryZones > 0, href: "/dashboard/delivery" },
    { label: "أسئلة شائعة جاهزة", ok: stats.activeFaqs > 0, href: "/dashboard/faq" },
    { label: "رقم واتساب مسجل", ok: Boolean(store.whatsapp_number), href: "/dashboard/store" },
  ];

  const toggleBot = async () => {
    const next = !active;
    setActive(next);
    setSaving(true);
    setError(null);

    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("stores")
      .update({ active: next })
      .eq("id", store.id);

    setSaving(false);

    if (updateError) {
      setActive(!next);
      setError("ما قدرناش نبدلو حالة البوت. عاود جرّب.");
      return;
    }

    router.refresh();
  };

  return (
    <div className="space-y-5 max-w-4xl">
      <div>
        <h2 className="text-lg font-extrabold text-gray-950">الإعدادات</h2>
        <p className="text-sm text-gray-500 mt-1">حالة البوت، الاتصال، وجاهزية المتجر بدون أرقام تجريبية.</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <Card>
        <div className="p-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              active ? "bg-[#25D366]" : "bg-gray-200"
            }`}>
              <Bot className={`w-6 h-6 ${active ? "text-white" : "text-gray-500"}`} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-extrabold text-gray-950 text-sm">FunnelBot</h3>
                <StatusPill ok={active} label={active ? "نشط" : "متوقف"} />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {active ? "البوت مسموح له يجاوب على رسائل الزبناء." : "البوت متوقف من المنصة ولن يجاوب تلقائياً."}
              </p>
            </div>
          </div>

          <button
            onClick={toggleBot}
            disabled={saving}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors ${
              active ? "bg-gray-100 text-gray-700 hover:bg-gray-200" : "bg-[#25D366] text-white hover:bg-[#1eb85a]"
            } disabled:opacity-60`}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Power className="w-4 h-4" />}
            {active ? "إيقاف البوت" : "تشغيل البوت"}
          </button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-2">
            <Wifi className="w-4 h-4 text-[#25D366]" />
            <h3 className="font-bold text-gray-900 text-sm">اتصال واتساب</h3>
          </div>
          <div className="p-5 space-y-4">
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-gray-700" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-gray-950" dir="ltr">{formatPhone(store.whatsapp_number)}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{store.name}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between gap-3 py-2 border-b border-gray-50">
                <span className="text-gray-500">نوع الربط</span>
                <span className="font-semibold text-gray-900">Evolution API / VPS</span>
              </div>
              <div className="flex items-center justify-between gap-3 py-2 border-b border-gray-50">
                <span className="text-gray-500">حالة الرقم داخل المنصة</span>
                <span className="font-semibold text-gray-900">{store.whatsapp_number ? "مسجل" : "خاصو يتزاد"}</span>
              </div>
              <div className="flex items-center justify-between gap-3 py-2">
                <span className="text-gray-500">آخر تعديل</span>
                <span className="font-semibold text-gray-900">{new Date(store.updated_at).toLocaleDateString("ar-MA")}</span>
              </div>
            </div>

            <Link href="/dashboard/store" className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50">
              تعديل رقم واتساب
            </Link>
          </div>
        </Card>

        <Card>
          <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-2">
            <Settings className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-gray-900 text-sm">إعدادات الرد</h3>
          </div>
          <div className="p-5 space-y-4">
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <p className="text-xs text-gray-500">أسلوب البوت</p>
              <p className="text-sm font-extrabold text-gray-950 mt-1">{toneLabels[store.bot_tone] ?? store.bot_tone}</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <p className="text-xs text-gray-500">رسالة الترحيب</p>
              <p className="text-sm font-semibold text-gray-900 mt-1 leading-relaxed">
                {store.welcome_message || "لا توجد رسالة مخصصة. البوت يستعمل ترحيب عام."}
              </p>
            </div>
            <Link href="/dashboard/store" className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50">
              تعديل أسلوب الرد
            </Link>
          </div>
        </Card>
      </div>

      <Card>
        <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <h3 className="font-bold text-gray-900 text-sm">جاهزية البوت</h3>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {readyItems.map((item) => (
            <Link key={item.label} href={item.href} className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50/70 p-3 hover:bg-gray-100">
              <span className="text-sm font-semibold text-gray-800">{item.label}</span>
              {item.ok ? <CheckCircle2 className="w-4 h-4 text-[#25D366]" /> : <AlertCircle className="w-4 h-4 text-amber-500" />}
            </Link>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={Package} label="منتجات نشطة" value={`${stats.activeProducts}`} href="/dashboard/products" />
        <StatCard icon={Truck} label="مدن التوصيل" value={`${stats.deliveryZones}`} href="/dashboard/delivery" />
        <StatCard icon={HelpCircle} label="أسئلة جاهزة" value={`${stats.activeFaqs}`} href="/dashboard/faq" />
        <StatCard icon={MessageCircle} label="محادثات اليوم" value={`${stats.conversationsToday}`} href="/dashboard/conversations" />
      </div>

      <Card>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-[#25D366]" />
            <h3 className="font-bold text-gray-900 text-sm">نظرة تشغيلية</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl bg-gray-50 p-4">
              <ShoppingBag className="w-4 h-4 text-gray-500 mb-3" />
              <p className="text-lg font-extrabold text-gray-950">{stats.ordersThisMonth}</p>
              <p className="text-xs text-gray-500 mt-1">طلبات هذا الشهر</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <MessageCircle className="w-4 h-4 text-gray-500 mb-3" />
              <p className="text-lg font-extrabold text-gray-950">{stats.totalConversations}</p>
              <p className="text-xs text-gray-500 mt-1">إجمالي المحادثات</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <AlertCircle className="w-4 h-4 text-gray-500 mb-3" />
              <p className="text-lg font-extrabold text-gray-950">{stats.unreadConversations}</p>
              <p className="text-xs text-gray-500 mt-1">محادثات تحتاج متابعة</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
