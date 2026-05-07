import Link from "next/link";
import { redirect } from "next/navigation";
import {
  AlertCircle, CheckCircle2, Clock, Eye,
  HelpCircle, MessageCircle, MoreHorizontal,
  Package, RefreshCw, ShoppingBag, TrendingUp, Truck, Zap,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

/* ── types ── */

type Store = {
  id: string;
  name: string;
  active: boolean;
  bot_tone: string;
};

type Profile = {
  full_name: string | null;
};

type Order = {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_city: string;
  product_snapshot: { name?: string; price?: number } | null;
  quantity: number;
  total: number | string | null;
  status: "new" | "confirmed" | "shipped" | "cancelled";
  created_at: string;
};

type Conversation = {
  id: string;
  customer_phone: string;
  customer_name: string | null;
  last_message_at: string | null;
  unread_count: number;
  status: "open" | "resolved";
  created_at: string;
};

type Message = {
  conversation_id: string;
  body: string;
  role: "user" | "bot" | "agent";
  created_at: string;
};

/* ── config ── */

const statusConfig: Record<Order["status"], { label: string; cls: string }> = {
  new:       { label: "جديد",       cls: "bg-blue-50   text-blue-600   ring-1 ring-blue-200"   },
  confirmed: { label: "مؤكد",       cls: "bg-green-50  text-green-700  ring-1 ring-green-200"  },
  shipped:   { label: "تم الإرسال", cls: "bg-purple-50 text-purple-600 ring-1 ring-purple-200" },
  cancelled: { label: "ملغي",       cls: "bg-red-50    text-red-600    ring-1 ring-red-200"    },
};

const avatarColors = [
  "from-emerald-400 to-teal-500",
  "from-pink-400    to-rose-500",
  "from-blue-400    to-indigo-500",
  "from-amber-400   to-orange-500",
  "from-violet-400  to-purple-500",
  "from-cyan-400    to-sky-500",
];

/* ── helpers ── */

function money(v: number | string | null | undefined) {
  const n = Number(v ?? 0);
  return `${new Intl.NumberFormat("fr-MA", { maximumFractionDigits: 0 }).format(n)} د`;
}

function shortId(id: string) {
  return `FL-${id.slice(-5).toUpperCase()}`;
}

function firstName(p: Profile | null, fallback = "صاحب المتجر") {
  return p?.full_name?.trim()?.split(/\s+/)[0] || fallback;
}

function productName(o: Order) {
  return o.product_snapshot?.name || "طلب واتساب";
}

function formatRelative(iso: string | null | undefined) {
  if (!iso) return "—";
  const mins = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 60000));
  if (mins < 1)  return "الآن";
  if (mins < 60) return `${mins} دق`;
  const h = Math.floor(mins / 60);
  if (h < 24) return `${h} س`;
  return `${Math.floor(h / 24)} يوم`;
}

function monthStartIso() {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1).toISOString();
}

/* ── subcomponents ── */

function KpiCard({
  label, value, sub, icon: Icon, accent, light, spark,
}: {
  label: string; value: string; sub: string;
  icon: React.ElementType; accent: string; light: string;
  spark: number[];
}) {
  const max = Math.max(...spark);
  const min = Math.min(...spark);
  const range = max - min || 1;
  const W = 80, H = 28, step = W / (spark.length - 1);
  const pts = spark.map((v, i) => `${i * step},${H - ((v - min) / range) * H}`).join(" ");

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: light }}>
          <Icon className="w-5 h-5" style={{ color: accent }} />
        </div>
        <p className="text-[10px] text-gray-400 leading-none text-left">{sub}</p>
      </div>
      <p className="text-2xl font-black text-gray-900 leading-none tracking-tight">{value}</p>
      <p className="text-xs text-gray-400 mt-1.5">{label}</p>
      <div className="mt-4 opacity-60 group-hover:opacity-100 transition-opacity">
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
          <polyline points={pts} fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

function EmptyState({ text, href, action }: { text: string; href: string; action: string }) {
  return (
    <div className="px-4 py-10 text-center">
      <p className="text-sm text-gray-400 mb-3">{text}</p>
      <Link href={href} className="inline-flex items-center gap-1.5 text-xs font-bold text-[#25D366] hover:underline">
        <Eye className="w-3.5 h-3.5" />
        {action}
      </Link>
    </div>
  );
}

/* ── page ── */

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: profile }, { data: stores }] = await Promise.all([
    supabase.from("profiles").select("full_name").eq("id", user.id).single(),
    supabase.from("stores").select("id, name, active, bot_tone").eq("user_id", user.id).order("created_at").limit(1),
  ]);

  const store = (stores?.[0] ?? null) as Store | null;
  if (!store) redirect("/onboarding");

  const start = monthStartIso();

  const [
    { count: conversationCount },
    { count: unreadCount },
    { count: productCount },
    { count: activeFaqCount },
    { count: deliveryZoneCount },
    { data: monthOrders },
    { data: recentOrders },
    { data: recentConversations },
  ] = await Promise.all([
    supabase.from("conversations").select("id", { count: "exact", head: true }).eq("store_id", store.id),
    supabase.from("conversations").select("id", { count: "exact", head: true }).eq("store_id", store.id).gt("unread_count", 0),
    supabase.from("products").select("id", { count: "exact", head: true }).eq("store_id", store.id).eq("active", true),
    supabase.from("faqs").select("id", { count: "exact", head: true }).eq("store_id", store.id).eq("active", true),
    supabase.from("delivery_zones").select("id", { count: "exact", head: true }).eq("store_id", store.id).eq("active", true),
    supabase.from("orders").select("id, total, status, created_at").eq("store_id", store.id).gte("created_at", start),
    supabase.from("orders")
      .select("id, customer_name, customer_phone, customer_city, product_snapshot, quantity, total, status, created_at")
      .eq("store_id", store.id).order("created_at", { ascending: false }).limit(5),
    supabase.from("conversations")
      .select("id, customer_phone, customer_name, last_message_at, unread_count, status, created_at")
      .eq("store_id", store.id).order("last_message_at", { ascending: false, nullsFirst: false }).limit(6),
  ]);

  const convos    = (recentConversations ?? []) as Conversation[];
  const orders    = (recentOrders ?? []) as Order[];
  const orderRows = (monthOrders ?? []) as Pick<Order, "id" | "total" | "status" | "created_at">[];
  const convIds   = convos.map((c) => c.id);

  const { data: latestMessages } = convIds.length
    ? await supabase.from("messages").select("conversation_id, body, role, created_at")
        .in("conversation_id", convIds).order("created_at", { ascending: false }).limit(30)
    : { data: [] };

  const msgByConv = ((latestMessages ?? []) as Message[]).reduce<Record<string, Message>>((acc, m) => {
    if (!acc[m.conversation_id]) acc[m.conversation_id] = m;
    return acc;
  }, {});

  const confirmedOrders = orderRows.filter((o) => o.status === "confirmed" || o.status === "shipped").length;
  const pendingOrders   = orderRows.filter((o) => o.status === "new").length;
  const revenue         = orderRows.filter((o) => o.status !== "cancelled").reduce((s, o) => s + Number(o.total ?? 0), 0);

  const readiness = [
    { label: "منتج نشط",    ok: (productCount     ?? 0) > 0, href: "/dashboard/products" },
    { label: "منطقة توصيل", ok: (deliveryZoneCount ?? 0) > 0, href: "/dashboard/delivery" },
    { label: "أسئلة جاهزة", ok: (activeFaqCount   ?? 0) > 0, href: "/dashboard/faq"      },
    { label: "البوت شغال",  ok: store.active,                 href: "/dashboard/settings" },
  ];

  const kpis = [
    {
      label: "المحادثات",    value: `${conversationCount ?? 0}`,
      sub: `${unreadCount ?? 0} غير مقروءة`,
      icon: MessageCircle, accent: "#3B82F6", light: "#EFF6FF",
      spark: [30, 45, 38, 52, 48, 61, 55, 70, 63, 78, 72, Math.max(1, conversationCount ?? 0)],
    },
    {
      label: "طلبات مؤكدة", value: `${confirmedOrders}`,
      sub: "هذا الشهر",
      icon: CheckCircle2, accent: "#25D366", light: "#F0FDF4",
      spark: [20, 28, 22, 35, 30, 40, 38, 50, 44, 58, 52, Math.max(1, confirmedOrders)],
    },
    {
      label: "طلبات معلقة", value: `${pendingOrders}`,
      sub: "تحتاج تأكيد",
      icon: Clock, accent: "#F59E0B", light: "#FFFBEB",
      spark: [55, 48, 52, 45, 50, 42, 48, 40, 44, 38, 42, Math.max(1, pendingOrders)],
    },
    {
      label: "الإيرادات",   value: money(revenue),
      sub: "من الطلبات غير الملغاة",
      icon: TrendingUp, accent: "#8B5CF6", light: "#F5F3FF",
      spark: [35, 42, 38, 50, 45, 58, 52, 65, 60, 75, 68, Math.max(1, revenue / 1000)],
    },
  ];

  return (
    <div className="space-y-6 max-w-[1400px]">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            مرحباً {firstName(profile as Profile)} 👋
          </h2>
          <p className="text-sm text-gray-400 mt-0.5">{store.name} · نظرة مباشرة على بيانات متجرك</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            {store.active ? "البوت نشط" : "البوت متوقف"}
          </div>
          <button className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-500 text-xs font-medium px-3 py-1.5 rounded-full hover:border-gray-300 transition-colors shadow-sm">
            <RefreshCw className="w-3 h-3" />
            تحديث
          </button>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((k) => <KpiCard key={k.label} {...k} />)}
      </div>

      {/* ── Readiness ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 text-sm">جاهزية البوت</h3>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${store.active ? "bg-green-50 text-green-700 ring-1 ring-green-200" : "bg-red-50 text-red-600 ring-1 ring-red-200"}`}>
            {store.active ? "نشط" : "متوقف"}
          </span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {readiness.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl px-4 py-3 transition-colors group"
            >
              {item.ok
                ? <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                : <AlertCircle  className="w-4 h-4 text-amber-500 shrink-0" />
              }
              <span className="text-xs font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Conversations */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <h3 className="font-bold text-gray-900 text-sm">المحادثات الأخيرة</h3>
            </div>
            {(unreadCount ?? 0) > 0 && (
              <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {unreadCount} جديدة
              </span>
            )}
          </div>

          <div className="flex-1 divide-y divide-gray-50/70">
            {convos.length === 0 ? (
              <EmptyState text="مازال ما كايناش محادثات من واتساب." href="/dashboard/conversations" action="فتح صندوق المحادثات" />
            ) : convos.map((c, i) => {
              const last = msgByConv[c.id];
              const name = c.customer_name || c.customer_phone;
              return (
                <Link
                  key={c.id}
                  href="/dashboard/conversations"
                  className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50/70 transition-colors group"
                >
                  <div className="relative shrink-0">
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold`}>
                      {name[0]}
                    </div>
                    <span className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 border-2 border-white rounded-full ${c.status === "open" ? "bg-[#25D366]" : "bg-gray-300"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-bold text-gray-900 truncate">{name}</p>
                      <span className="text-[10px] text-gray-400 shrink-0">
                        {formatRelative(c.last_message_at || c.created_at)}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 truncate mt-0.5">
                      {last?.body || "محادثة جديدة"}
                    </p>
                  </div>
                  {c.unread_count > 0 && (
                    <span className="w-5 h-5 bg-[#25D366] text-white text-[9px] font-black rounded-full flex items-center justify-center shrink-0">
                      {c.unread_count}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="px-5 py-3 border-t border-gray-50">
            <Link href="/dashboard/conversations" className="flex items-center gap-1.5 text-xs text-[#25D366] font-semibold hover:underline">
              <Eye className="w-3.5 h-3.5" />
              عرض جميع المحادثات
            </Link>
          </div>
        </div>

        {/* Orders — 2 cols */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#25D366]" />
              <h3 className="font-bold text-gray-900 text-sm">آخر الطلبات</h3>
            </div>
            <Link href="/dashboard/orders" className="flex items-center gap-1 text-xs text-[#25D366] font-semibold hover:underline">
              <Eye className="w-3.5 h-3.5" />
              عرض الكل
            </Link>
          </div>

          {orders.length === 0 ? (
            <EmptyState text="مازال ما تسجل حتى طلب." href="/dashboard/orders" action="فتح صفحة الطلبات" />
          ) : (
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-right">
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="px-5 py-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">رقم</th>
                    <th className="px-3 py-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">العميل</th>
                    <th className="hidden md:table-cell px-3 py-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">المدينة</th>
                    <th className="px-3 py-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">المبلغ</th>
                    <th className="px-5 py-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50/70">
                  {orders.map((o) => {
                    const st = statusConfig[o.status];
                    return (
                      <tr key={o.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-5 py-3.5">
                          <span className="text-[11px] text-gray-400 font-mono">{shortId(o.id)}</span>
                        </td>
                        <td className="px-3 py-3.5">
                          <p className="text-xs font-semibold text-gray-900 truncate max-w-[130px]">{o.customer_name}</p>
                          <p className="text-[10px] text-gray-400 truncate max-w-[130px]">{productName(o)}</p>
                        </td>
                        <td className="hidden md:table-cell px-3 py-3.5">
                          <span className="text-xs text-gray-500">{o.customer_city}</span>
                        </td>
                        <td className="px-3 py-3.5">
                          <span className="text-xs font-black text-gray-900">{money(o.total)}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${st.cls}`}>{st.label}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ── Bottom quick links ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { href: "/dashboard/products", icon: Package,   bg: "bg-green-50",  color: "text-green-600",  title: "المنتجات",       sub: "كتالوج البوت",      count: productCount,      unit: "منتج نشط"   },
          { href: "/dashboard/delivery", icon: Truck,     bg: "bg-blue-50",   color: "text-blue-600",   title: "التوصيل",        sub: "المدن والأسعار",    count: deliveryZoneCount, unit: "منطقة نشطة" },
          { href: "/dashboard/faq",      icon: HelpCircle,bg: "bg-purple-50", color: "text-purple-600", title: "الأسئلة الشائعة",sub: "ردود جاهزة للبوت", count: activeFaqCount,    unit: "جواب نشط"   },
        ].map(({ href, icon: Icon, bg, color, title, sub, count, unit }) => (
          <Link
            key={href}
            href={href}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:-translate-y-0.5 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <MoreHorizontal className="w-4 h-4 text-gray-300 group-hover:text-gray-400 transition-colors" />
            </div>
            <p className="text-2xl font-black text-gray-900 leading-none">{count ?? 0}</p>
            <p className="text-xs text-gray-400 mt-1">{unit}</p>
            <div className="mt-3 pt-3 border-t border-gray-50">
              <p className="text-xs font-semibold text-gray-700">{title}</p>
              <p className="text-[10px] text-gray-400">{sub}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Banner ── */}
      <div className="bg-[#161B27] rounded-2xl p-5 border border-white/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#25D366]/15 rounded-xl flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 text-[#25D366]" />
          </div>
          <div>
            <p className="text-sm font-black text-white">الخطوة التالية</p>
            <p className="text-xs text-gray-400 mt-0.5">
              زيد المنتجات والمناطق باش FunnelsLibrary يعطي أجوبة أدق ويحول الرسائل لطلبات.
            </p>
          </div>
        </div>
        <Link
          href="/dashboard/products"
          className="bg-[#25D366] hover:bg-[#1eb85a] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors text-center shrink-0"
        >
          إضافة منتج
        </Link>
      </div>
    </div>
  );
}
