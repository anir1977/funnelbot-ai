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

function formatPhone(phone: string) {
  if (!phone) return "غير محدد";
  return `+${phone.replace(/\D/g, "")}`;
}

function Panel({
  title,
  icon: Icon,
  children,
  action,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-gray-600" />
          <h3 className="text-sm font-bold text-gray-950">{title}</h3>
        </div>
        {action}
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}

function StatTile({
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
    <Link href={href} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:bg-gray-50">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-gray-500">{label}</p>
          <p className="mt-2 text-2xl font-extrabold text-gray-950">{value}</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
          <Icon className="h-4 w-4 text-gray-700" />
        </div>
      </div>
    </Link>
  );
}

function ReadinessRow({ label, ok, href }: { label: string; ok: boolean; href: string }) {
  return (
    <Link href={href} className="flex items-center justify-between gap-3 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5 hover:bg-gray-100">
      <span className="text-sm font-semibold text-gray-800">{label}</span>
      {ok ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <AlertCircle className="h-4 w-4 text-amber-500" />}
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
    <div className="max-w-6xl space-y-5">
      <header className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-extrabold text-gray-950">الإعدادات</h2>
              <span className={`rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${
                active ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-gray-100 text-gray-600 ring-gray-200"
              }`}>
                {active ? "البوت نشط" : "البوت متوقف"}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500">حالة الاتصال، جاهزية البوت، ومؤشرات التشغيل الحقيقية.</p>
          </div>

          <button
            onClick={toggleBot}
            disabled={saving}
            className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition ${
              active ? "border border-gray-200 bg-white text-gray-800 hover:bg-gray-50" : "bg-gray-950 text-white hover:bg-gray-800"
            } disabled:opacity-60`}
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Power className="h-4 w-4" />}
            {active ? "إيقاف البوت" : "تشغيل البوت"}
          </button>
        </div>
      </header>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile icon={Package} label="منتجات نشطة" value={`${stats.activeProducts}`} href="/dashboard/products" />
        <StatTile icon={Truck} label="مدن التوصيل" value={`${stats.deliveryZones}`} href="/dashboard/delivery" />
        <StatTile icon={HelpCircle} label="أسئلة جاهزة" value={`${stats.activeFaqs}`} href="/dashboard/faq" />
        <StatTile icon={MessageCircle} label="محادثات اليوم" value={`${stats.conversationsToday}`} href="/dashboard/conversations" />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <main className="space-y-5 xl:col-span-8">
          <Panel
            title="اتصال واتساب"
            icon={Wifi}
            action={<Link href="/dashboard/store" className="text-xs font-bold text-gray-600 hover:text-gray-950">تعديل</Link>}
          >
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                <p className="text-xs font-semibold text-gray-500">رقم واتساب</p>
                <p className="mt-2 text-sm font-extrabold text-gray-950" dir="ltr">{formatPhone(store.whatsapp_number)}</p>
              </div>
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                <p className="text-xs font-semibold text-gray-500">نوع الربط</p>
                <p className="mt-2 text-sm font-extrabold text-gray-950">Evolution API / VPS</p>
              </div>
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                <p className="text-xs font-semibold text-gray-500">آخر تعديل</p>
                <p className="mt-2 text-sm font-extrabold text-gray-950">{new Date(store.updated_at).toLocaleDateString("ar-MA")}</p>
              </div>
            </div>
          </Panel>

          <Panel
            title="إعدادات الرد"
            icon={Settings}
            action={<Link href="/dashboard/store" className="text-xs font-bold text-gray-600 hover:text-gray-950">تعديل الأسلوب</Link>}
          >
            <div className="space-y-3">
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                <p className="text-xs font-semibold text-gray-500">أسلوب البوت</p>
                <p className="mt-2 text-sm font-extrabold text-gray-950">{toneLabels[store.bot_tone] ?? store.bot_tone}</p>
              </div>
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                <p className="text-xs font-semibold text-gray-500">رسالة الترحيب</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-gray-900">
                  {store.welcome_message || "لا توجد رسالة مخصصة. البوت يستعمل ترحيب عام."}
                </p>
              </div>
            </div>
          </Panel>

          <Panel title="نظرة تشغيلية" icon={Bot}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                <ShoppingBag className="mb-3 h-4 w-4 text-gray-500" />
                <p className="text-xl font-extrabold text-gray-950">{stats.ordersThisMonth}</p>
                <p className="mt-1 text-xs text-gray-500">طلبات هذا الشهر</p>
              </div>
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                <MessageCircle className="mb-3 h-4 w-4 text-gray-500" />
                <p className="text-xl font-extrabold text-gray-950">{stats.totalConversations}</p>
                <p className="mt-1 text-xs text-gray-500">إجمالي المحادثات</p>
              </div>
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                <AlertCircle className="mb-3 h-4 w-4 text-gray-500" />
                <p className="text-xl font-extrabold text-gray-950">{stats.unreadConversations}</p>
                <p className="mt-1 text-xs text-gray-500">تحتاج متابعة</p>
              </div>
            </div>
          </Panel>
        </main>

        <aside className="space-y-5 xl:col-span-4">
          <Panel title="جاهزية البوت" icon={ShieldCheck}>
            <div className="space-y-2">
              {readyItems.map((item) => <ReadinessRow key={item.label} {...item} />)}
            </div>
          </Panel>

          <section className="rounded-xl border border-gray-900 bg-gray-950 p-4 text-white shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                <Phone className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-extrabold">الربط الحقيقي مع Evolution</p>
                <p className="mt-1 text-xs leading-5 text-gray-400">
                  المرحلة الجاية: نجيب status ديال WhatsApp من VPS ونبيّنو هنا مباشرة.
                </p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
