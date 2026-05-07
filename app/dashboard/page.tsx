import Link from "next/link";
import { redirect } from "next/navigation";
import {
  AlertCircle,
  ArrowUpLeft,
  CheckCircle2,
  Clock3,
  HelpCircle,
  MessageCircle,
  Package,
  Plus,
  ShoppingBag,
  TrendingUp,
  Truck,
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
  new: { label: "جديد", cls: "bg-blue-50 text-blue-700 ring-blue-200" },
  confirmed: { label: "مؤكد", cls: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  shipped: { label: "تم الإرسال", cls: "bg-violet-50 text-violet-700 ring-violet-200" },
  cancelled: { label: "ملغي", cls: "bg-red-50 text-red-700 ring-red-200" },
};

const avatarColors = ["bg-slate-900", "bg-emerald-700", "bg-blue-700", "bg-zinc-700", "bg-stone-700"];

function money(value: number | string | null | undefined) {
  const n = Number(value ?? 0);
  return `${new Intl.NumberFormat("fr-MA", { maximumFractionDigits: 0 }).format(n)} د`;
}

function shortId(id: string) {
  return `#${id.slice(-6).toUpperCase()}`;
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
  return `${Math.floor(hours / 24)} يوم`;
}

function monthStartIso() {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1).toISOString();
}

function MetricCard({
  label,
  value,
  help,
  icon: Icon,
  muted = false,
}: {
  label: string;
  value: string;
  help: string;
  icon: React.ElementType;
  muted?: boolean;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-gray-500">{label}</p>
          <p className={`mt-3 text-2xl font-extrabold tracking-tight ${muted ? "text-gray-400" : "text-gray-950"}`}>
            {value}
          </p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
          <Icon className="h-4 w-4 text-gray-700" />
        </div>
      </div>
      <p className="mt-3 text-xs leading-5 text-gray-500">{help}</p>
    </div>
  );
}

function Panel({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-3">
        <h3 className="text-sm font-bold text-gray-950">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}

function EmptyState({ text, href, action }: { text: string; href: string; action: string }) {
  return (
    <div className="px-4 py-10 text-center">
      <p className="text-sm text-gray-500">{text}</p>
      <Link href={href} className="mt-3 inline-flex text-xs font-bold text-emerald-700 hover:text-emerald-800">
        {action}
      </Link>
    </div>
  );
}

function ReadinessItem({ label, ok, href }: { label: string; ok: boolean; href: string }) {
  return (
    <Link href={href} className="flex items-center justify-between gap-3 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5 hover:bg-gray-100">
      <span className="text-sm font-semibold text-gray-800">{label}</span>
      {ok ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <AlertCircle className="h-4 w-4 text-amber-500" />}
    </Link>
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
    supabase.from("conversations").select("id", { count: "exact", head: true }).eq("store_id", store.id),
    supabase.from("conversations").select("id", { count: "exact", head: true }).eq("store_id", store.id).gt("unread_count", 0),
    supabase.from("products").select("id", { count: "exact", head: true }).eq("store_id", store.id).eq("active", true),
    supabase.from("faqs").select("id", { count: "exact", head: true }).eq("store_id", store.id).eq("active", true),
    supabase.from("delivery_zones").select("id", { count: "exact", head: true }).eq("store_id", store.id).eq("active", true),
    supabase.from("orders").select("id, total, status, created_at").eq("store_id", store.id).gte("created_at", start),
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
      .limit(5),
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
      .limit(20)
    : { data: [] };

  const messagesByConversation = ((latestMessages ?? []) as Message[]).reduce<Record<string, Message>>((acc, message) => {
    if (!acc[message.conversation_id]) acc[message.conversation_id] = message;
    return acc;
  }, {});

  const confirmedOrders = orderRows.filter((o) => o.status === "confirmed" || o.status === "shipped").length;
  const pendingOrders = orderRows.filter((o) => o.status === "new").length;
  const revenue = orderRows.filter((o) => o.status !== "cancelled").reduce((sum, order) => sum + Number(order.total ?? 0), 0);
  const hasOrdersThisMonth = orderRows.length > 0;

  const readiness = [
    { label: "منتج نشط", ok: (productCount ?? 0) > 0, href: "/dashboard/products" },
    { label: "منطقة توصيل", ok: (deliveryZoneCount ?? 0) > 0, href: "/dashboard/delivery" },
    { label: "أسئلة جاهزة", ok: (activeFaqCount ?? 0) > 0, href: "/dashboard/faq" },
    { label: "البوت شغال", ok: store.active, href: "/dashboard/settings" },
  ];

  return (
    <div className="space-y-5">
      <header className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-gray-950">مرحباً {firstName(profile)}</h2>
              <span className={`rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${
                store.active ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-gray-100 text-gray-600 ring-gray-200"
              }`}>
                {store.active ? "البوت نشط" : "البوت متوقف"}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {store.name} · مؤشرات تشغيلية مبنية على بيانات Supabase الحالية
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link href="/dashboard/products" className="inline-flex items-center gap-2 rounded-lg bg-gray-950 px-3.5 py-2 text-xs font-bold text-white hover:bg-gray-800">
              <Plus className="h-3.5 w-3.5" />
              إضافة منتج
            </Link>
            <Link href="/dashboard/conversations" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-xs font-bold text-gray-800 hover:bg-gray-50">
              صندوق المحادثات
              <ArrowUpLeft className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="المحادثات"
          value={`${conversationCount ?? 0}`}
          help={(conversationCount ?? 0) > 0 ? `${unreadConversationCount ?? 0} محادثة تحتاج متابعة` : "مازال ما دخلات حتى محادثة"}
          icon={MessageCircle}
          muted={(conversationCount ?? 0) === 0}
        />
        <MetricCard
          label="طلبات مؤكدة"
          value={`${confirmedOrders}`}
          help={hasOrdersThisMonth ? "محسوبة من طلبات هذا الشهر" : "تظهر بعد أول طلب مؤكد"}
          icon={CheckCircle2}
          muted={confirmedOrders === 0}
        />
        <MetricCard
          label="طلبات معلقة"
          value={`${pendingOrders}`}
          help={pendingOrders > 0 ? "تحتاج تأكيد أو متابعة" : "لا توجد طلبات تنتظر التأكيد"}
          icon={Clock3}
          muted={pendingOrders === 0}
        />
        <MetricCard
          label="إيراد تقديري"
          value={revenue > 0 ? money(revenue) : "—"}
          help={revenue > 0 ? "من الطلبات غير الملغاة" : "لا توجد طلبات مالية بعد"}
          icon={TrendingUp}
          muted={revenue === 0}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <div className="space-y-5 xl:col-span-8">
          <Panel
            title="آخر الطلبات"
            action={<Link href="/dashboard/orders" className="text-xs font-bold text-gray-600 hover:text-gray-950">عرض الكل</Link>}
          >
            {orders.length === 0 ? (
              <EmptyState text="مازال ما تسجل حتى طلب." href="/dashboard/orders" action="فتح صفحة الطلبات" />
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100 text-sm">
                  <thead className="bg-gray-50 text-xs text-gray-500">
                    <tr>
                      <th className="px-4 py-3 text-right font-semibold">الطلب</th>
                      <th className="px-4 py-3 text-right font-semibold">الزبون</th>
                      <th className="px-4 py-3 text-right font-semibold">المنتج</th>
                      <th className="px-4 py-3 text-right font-semibold">المجموع</th>
                      <th className="px-4 py-3 text-right font-semibold">الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {orders.map((order) => {
                      const status = statusConfig[order.status];
                      return (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-gray-500">{shortId(order.id)}</td>
                          <td className="px-4 py-3">
                            <p className="font-bold text-gray-950">{order.customer_name}</p>
                            <p className="mt-0.5 text-xs text-gray-500">{order.customer_city || order.customer_phone}</p>
                          </td>
                          <td className="px-4 py-3 text-gray-700">{productName(order)}</td>
                          <td className="whitespace-nowrap px-4 py-3 font-bold text-gray-950">{money(order.total)}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-bold ring-1 ${status.cls}`}>
                              {status.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </Panel>

          <Panel
            title="آخر المحادثات"
            action={<Link href="/dashboard/conversations" className="text-xs font-bold text-gray-600 hover:text-gray-950">فتح الصندوق</Link>}
          >
            {conversations.length === 0 ? (
              <EmptyState text="مازال ما كايناش محادثات من واتساب." href="/dashboard/conversations" action="فتح صندوق المحادثات" />
            ) : (
              <div className="divide-y divide-gray-100">
                {conversations.map((conversation, i) => {
                  const last = messagesByConversation[conversation.id];
                  const name = conversation.customer_name || conversation.customer_phone;
                  return (
                    <Link key={conversation.id} href="/dashboard/conversations" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${avatarColors[i % avatarColors.length]}`}>
                        {name[0]}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="truncate text-sm font-bold text-gray-950">{name}</p>
                          <span className="shrink-0 text-xs text-gray-400">{formatRelative(conversation.last_message_at || conversation.created_at)}</span>
                        </div>
                        <p className="mt-0.5 truncate text-xs text-gray-500">{last?.body || "محادثة جديدة"}</p>
                      </div>
                      {conversation.unread_count > 0 && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1.5 text-[10px] font-bold text-white">
                          {conversation.unread_count}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </Panel>
        </div>

        <aside className="space-y-5 xl:col-span-4">
          <Panel title="جاهزية البوت">
            <div className="space-y-2 p-4">
              {readiness.map((item) => (
                <ReadinessItem key={item.label} {...item} />
              ))}
            </div>
          </Panel>

          <Panel title="مصادر معرفة البوت">
            <div className="grid grid-cols-1 gap-2 p-4">
              <Link href="/dashboard/products" className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-3 hover:bg-gray-100">
                <span className="flex items-center gap-2 text-sm font-semibold text-gray-800"><Package className="h-4 w-4 text-gray-500" /> المنتجات</span>
                <span className="font-bold text-gray-950">{productCount ?? 0}</span>
              </Link>
              <Link href="/dashboard/delivery" className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-3 hover:bg-gray-100">
                <span className="flex items-center gap-2 text-sm font-semibold text-gray-800"><Truck className="h-4 w-4 text-gray-500" /> التوصيل</span>
                <span className="font-bold text-gray-950">{deliveryZoneCount ?? 0}</span>
              </Link>
              <Link href="/dashboard/faq" className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-3 hover:bg-gray-100">
                <span className="flex items-center gap-2 text-sm font-semibold text-gray-800"><HelpCircle className="h-4 w-4 text-gray-500" /> الأسئلة</span>
                <span className="font-bold text-gray-950">{activeFaqCount ?? 0}</span>
              </Link>
            </div>
          </Panel>

          <div className="rounded-xl border border-gray-900 bg-gray-950 p-4 text-white shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                <ShoppingBag className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-extrabold">الخطوة التالية</p>
                <p className="mt-1 text-xs leading-5 text-gray-400">
                  زيد stock والمعلومات ديال المنتجات باش البوت يقدر يحول المحادثات لطلبات بثقة.
                </p>
              </div>
            </div>
            <Link href="/dashboard/products" className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-white px-3 py-2.5 text-xs font-bold text-gray-950 hover:bg-gray-100">
              تحديث المنتجات
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
