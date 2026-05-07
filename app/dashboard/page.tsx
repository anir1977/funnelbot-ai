import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  HelpCircle,
  MessageCircle,
  Package,
  RefreshCw,
  ShoppingBag,
  TrendingUp,
  Truck,
  Zap,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

type Store = {
  id: string;
  name: string;
  active: boolean;
  bot_tone: string;
};

type Profile = {
  full_name: string | null;
};

type Product = {
  id: string;
  name: string;
  price: number | string;
  stock: number;
  active: boolean;
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

const statusConfig: Record<Order["status"], { label: string; cls: string }> = {
  new: { label: "جديد", cls: "bg-blue-100 text-blue-700" },
  confirmed: { label: "مؤكد", cls: "bg-green-100 text-green-700" },
  shipped: { label: "تم الإرسال", cls: "bg-purple-100 text-purple-700" },
  cancelled: { label: "ملغي", cls: "bg-red-100 text-red-600" },
};

const avatarColors = [
  "bg-emerald-600",
  "bg-slate-700",
  "bg-blue-700",
  "bg-stone-700",
  "bg-zinc-700",
  "bg-teal-700",
];

function money(value: number | string | null | undefined) {
  const n = Number(value ?? 0);
  return `${new Intl.NumberFormat("fr-MA", { maximumFractionDigits: 0 }).format(n)} د`;
}

function shortId(id: string) {
  return `#FL-${id.slice(-5).toUpperCase()}`;
}

function firstName(profile: Profile | null, fallback = "صاحب المتجر") {
  return profile?.full_name?.trim()?.split(/\s+/)[0] || fallback;
}

function productName(order: Order) {
  return order.product_snapshot?.name || "طلب واتساب";
}

function formatRelative(iso: string | null | undefined) {
  if (!iso) return "—";
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.max(0, Math.floor(diff / 60000));
  if (minutes < 1) return "الآن";
  if (minutes < 60) return `${minutes} دق`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} س`;
  const days = Math.floor(hours / 24);
  return `${days} يوم`;
}

function monthStartIso() {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1).toISOString();
}

function MiniMetric({
  label,
  value,
  sub,
  icon: Icon,
  tone,
  muted = false,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  tone: "blue" | "green" | "amber" | "slate";
  muted?: boolean;
}) {
  const styles = {
    blue: {
      border: "border-blue-100",
      icon: "bg-blue-600",
      accent: "text-blue-600 bg-blue-50",
    },
    green: {
      border: "border-green-100",
      icon: "bg-emerald-600",
      accent: "text-emerald-700 bg-emerald-50",
    },
    amber: {
      border: "border-amber-100",
      icon: "bg-amber-500",
      accent: "text-amber-700 bg-amber-50",
    },
    slate: {
      border: "border-slate-200",
      icon: "bg-slate-800",
      accent: "text-slate-600 bg-slate-100",
    },
  }[tone];

  return (
    <div className={`bg-white border ${muted ? "border-gray-100" : styles.border} rounded-xl p-4 shadow-sm`}>
      <div className="flex items-start justify-between gap-3">
        <div className={`w-9 h-9 ${styles.icon} rounded-lg flex items-center justify-center shadow-sm`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${styles.accent}`}>
          حقيقي
        </span>
      </div>
      <div className="mt-5">
        <p className={`text-2xl font-extrabold leading-none ${muted ? "text-gray-400" : "text-gray-950"}`}>{value}</p>
        <p className="text-xs font-semibold text-gray-700 mt-2">{label}</p>
        <div className="flex items-center gap-1.5 mt-2 text-[11px] text-gray-500">
          <Activity className="w-3.5 h-3.5 text-gray-400" />
          <span>{sub}</span>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ text, href, action }: { text: string; href: string; action: string }) {
  return (
    <div className="px-4 py-8 text-center">
      <p className="text-sm text-gray-500 mb-3">{text}</p>
      <Link href={href} className="inline-flex items-center justify-center text-xs font-bold text-[#25D366] hover:underline">
        {action}
      </Link>
    </div>
  );
}

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: profile }, { data: stores }] = await Promise.all([
    supabase.from("profiles").select("full_name").eq("id", user.id).single(),
    supabase
      .from("stores")
      .select("id, name, active, bot_tone")
      .eq("user_id", user.id)
      .order("created_at")
      .limit(1),
  ]);

  const store = (stores?.[0] ?? null) as Store | null;
  if (!store) redirect("/onboarding");

  const start = monthStartIso();

  const [
    { count: conversationCount },
    { count: unreadConversationCount },
    { count: productCount },
    { count: activeFaqCount },
    { count: deliveryZoneCount },
    { data: monthOrders },
    { data: recentOrders },
    { data: recentConversations },
  ] = await Promise.all([
    supabase
      .from("conversations")
      .select("id", { count: "exact", head: true })
      .eq("store_id", store.id),
    supabase
      .from("conversations")
      .select("id", { count: "exact", head: true })
      .eq("store_id", store.id)
      .gt("unread_count", 0),
    supabase
      .from("products")
      .select("id", { count: "exact", head: true })
      .eq("store_id", store.id)
      .eq("active", true),
    supabase
      .from("faqs")
      .select("id", { count: "exact", head: true })
      .eq("store_id", store.id)
      .eq("active", true),
    supabase
      .from("delivery_zones")
      .select("id", { count: "exact", head: true })
      .eq("store_id", store.id)
      .eq("active", true),
    supabase
      .from("orders")
      .select("id, total, status, created_at")
      .eq("store_id", store.id)
      .gte("created_at", start),
    supabase
      .from("orders")
      .select("id, customer_name, customer_phone, customer_city, product_snapshot, quantity, total, status, created_at")
      .eq("store_id", store.id)
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("conversations")
      .select("id, customer_phone, customer_name, last_message_at, unread_count, status, created_at")
      .eq("store_id", store.id)
      .order("last_message_at", { ascending: false, nullsFirst: false })
      .limit(6),
  ]);

  const conversations = (recentConversations ?? []) as Conversation[];
  const orders = (recentOrders ?? []) as Order[];
  const orderRows = (monthOrders ?? []) as Pick<Order, "id" | "total" | "status" | "created_at">[];
  const conversationIds = conversations.map((c) => c.id);

  const { data: latestMessages } = conversationIds.length
    ? await supabase
      .from("messages")
      .select("conversation_id, body, role, created_at")
      .in("conversation_id", conversationIds)
      .order("created_at", { ascending: false })
      .limit(30)
    : { data: [] };

  const messagesByConversation = ((latestMessages ?? []) as Message[]).reduce<Record<string, Message>>((acc, message) => {
    if (!acc[message.conversation_id]) acc[message.conversation_id] = message;
    return acc;
  }, {});

  const confirmedOrders = orderRows.filter((o) => o.status === "confirmed" || o.status === "shipped").length;
  const pendingOrders = orderRows.filter((o) => o.status === "new").length;
  const revenue = orderRows
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, order) => sum + Number(order.total ?? 0), 0);
  const hasOrdersThisMonth = orderRows.length > 0;

  const readiness = [
    { label: "منتج نشط", ok: (productCount ?? 0) > 0, href: "/dashboard/products" },
    { label: "منطقة توصيل", ok: (deliveryZoneCount ?? 0) > 0, href: "/dashboard/delivery" },
    { label: "أسئلة جاهزة", ok: (activeFaqCount ?? 0) > 0, href: "/dashboard/faq" },
    { label: "البوت شغال", ok: store.active, href: "/dashboard/settings" },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-gray-950">مرحباً {firstName(profile)}</h2>
          <p className="text-sm text-gray-500 mt-1">
            {store.name} · نظرة مباشرة على بيانات متجرك الحقيقية
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-500 shadow-sm">
          <RefreshCw className="w-3.5 h-3.5 text-[#25D366]" />
          آخر تحديث الآن
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MiniMetric
          label="إجمالي المحادثات"
          value={`${conversationCount ?? 0}`}
          sub={(conversationCount ?? 0) > 0 ? `${unreadConversationCount ?? 0} تحتاج متابعة` : "مازال ما كايناش محادثات"}
          icon={MessageCircle}
          tone="blue"
          muted={(conversationCount ?? 0) === 0}
        />
        <MiniMetric
          label="طلبات مؤكدة"
          value={`${confirmedOrders}`}
          sub={hasOrdersThisMonth ? "هذا الشهر" : "مازال ما كايناش طلبات"}
          icon={CheckCircle2}
          tone="green"
          muted={confirmedOrders === 0}
        />
        <MiniMetric
          label="طلبات معلقة"
          value={`${pendingOrders}`}
          sub={pendingOrders > 0 ? "تحتاج تأكيد" : "لا توجد طلبات تنتظر التأكيد"}
          icon={Clock}
          tone="amber"
          muted={pendingOrders === 0}
        />
        <MiniMetric
          label="الإيرادات التقديرية"
          value={revenue > 0 ? money(revenue) : "—"}
          sub={revenue > 0 ? "من الطلبات غير الملغاة" : "تظهر بعد أول طلب مؤكد"}
          icon={TrendingUp}
          tone="slate"
          muted={revenue === 0}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <h3 className="font-bold text-gray-900 text-sm">آخر المحادثات</h3>
            </div>
            <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded-full">
              {unreadConversationCount ?? 0} غير مقروءة
            </span>
          </div>
          <div className="divide-y divide-gray-50">
            {conversations.length === 0 ? (
              <EmptyState
                text="مازال ما كايناش محادثات من واتساب."
                href="/dashboard/conversations"
                action="فتح صندوق المحادثات"
              />
            ) : conversations.map((conversation, i) => {
              const last = messagesByConversation[conversation.id];
              const name = conversation.customer_name || conversation.customer_phone;
              return (
                <Link
                  key={conversation.id}
                  href="/dashboard/conversations"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="relative shrink-0">
                    <div className={`w-9 h-9 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold`}>
                      {name[0]}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5">
                      <span className={`w-2 h-2 rounded-full block ${conversation.status === "open" ? "bg-[#25D366]" : "bg-gray-300"}`} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-gray-900 truncate">{name}</p>
                      <span className="text-[10px] text-gray-400 shrink-0 mr-2">
                        {formatRelative(conversation.last_message_at || conversation.created_at)}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 truncate mt-0.5">
                      {last?.body || "محادثة جديدة"}
                    </p>
                  </div>
                  {conversation.unread_count > 0 && (
                    <span className="min-w-[18px] h-[18px] bg-[#25D366] text-white text-[9px] font-bold rounded-full flex items-center justify-center shrink-0">
                      {conversation.unread_count}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
          <div className="px-4 py-3 border-t border-gray-50">
            <Link href="/dashboard/conversations" className="text-xs text-[#25D366] font-semibold hover:underline">
              عرض كل المحادثات
            </Link>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900 text-sm">جاهزية البوت</h3>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${store.active ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"}`}>
                {store.active ? "نشط" : "متوقف"}
              </span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {readiness.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 rounded-xl px-3 py-3 transition-colors"
                >
                  {item.ok
                    ? <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                    : <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                  }
                  <span className="text-xs font-semibold text-gray-700">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#25D366]" />
                <h3 className="font-bold text-gray-900 text-sm">آخر الطلبات</h3>
              </div>
              <Link href="/dashboard/orders" className="text-xs text-[#25D366] font-semibold hover:underline">
                عرض الكل
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {orders.length === 0 ? (
                <EmptyState
                  text="مازال ما تسجل حتى طلب."
                  href="/dashboard/orders"
                  action="فتح صفحة الطلبات"
                />
              ) : orders.map((order) => {
                const status = statusConfig[order.status];
                return (
                  <Link
                    key={order.id}
                    href="/dashboard/orders"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-[10px] text-gray-400 font-mono shrink-0">{shortId(order.id)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-900 truncate">{order.customer_name}</p>
                      <p className="text-[11px] text-gray-400 truncate">
                        {productName(order)} · {order.customer_city}
                      </p>
                    </div>
                    <p className="text-xs font-black text-gray-800 shrink-0">{money(order.total)}</p>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${status.cls}`}>
                      {status.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/dashboard/products" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:-translate-y-0.5 hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
              <Package className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">المنتجات</p>
              <p className="text-xs text-gray-400">كتالوج البوت</p>
            </div>
          </div>
          <p className="text-2xl font-black text-gray-900">{productCount ?? 0}</p>
          <p className="text-xs text-gray-500 mt-1">منتج نشط يستعمله البوت في الردود.</p>
        </Link>

        <Link href="/dashboard/delivery" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:-translate-y-0.5 hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">التوصيل</p>
              <p className="text-xs text-gray-400">المدن والأسعار</p>
            </div>
          </div>
          <p className="text-2xl font-black text-gray-900">{deliveryZoneCount ?? 0}</p>
          <p className="text-xs text-gray-500 mt-1">منطقة توصيل نشطة للبوت.</p>
        </Link>

        <Link href="/dashboard/faq" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:-translate-y-0.5 hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">الأسئلة الشائعة</p>
              <p className="text-xs text-gray-400">ردود جاهزة</p>
            </div>
          </div>
          <p className="text-2xl font-black text-gray-900">{activeFaqCount ?? 0}</p>
          <p className="text-xs text-gray-500 mt-1">جواب نشط يمكن للبوت استعماله.</p>
        </Link>
      </div>

      <div className="bg-[#1a1f2e] rounded-2xl p-4 border border-gray-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#25D366]/15 rounded-xl flex items-center justify-center">
            <Zap className="w-5 h-5 text-[#25D366]" />
          </div>
          <div>
            <p className="text-sm font-black">الخطوة التالية</p>
            <p className="text-xs text-gray-400 mt-0.5">
              زيد المنتجات والمناطق باش FunnelBot يعطي أجوبة أدق ويحول الرسائل لطلبات.
            </p>
          </div>
        </div>
        <Link
          href="/dashboard/products"
          className="bg-[#25D366] hover:bg-[#1eb85a] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors text-center"
        >
          إضافة منتج
        </Link>
      </div>
    </div>
  );
}
