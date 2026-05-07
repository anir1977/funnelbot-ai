"use client";

import { useState } from "react";
import {
  Search, Download, CheckCircle, XCircle, Truck, Clock,
  ChevronDown, ShoppingBag, Loader2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

// ── Types ────────────────────────────────────────────────────────────────────

type OrderStatus = "new" | "confirmed" | "shipped" | "cancelled";

type Order = {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_city: string;
  product_snapshot: { name?: string; price?: number };
  quantity: number;
  unit_price: number;
  delivery_fee: number;
  total: number;
  status: OrderStatus;
  notes: string | null;
  created_at: string;
};

// ── Config ───────────────────────────────────────────────────────────────────

const STATUS_CFG: Record<OrderStatus, { label: string; color: string; bg: string; Icon: React.ElementType }> = {
  new:       { label: "جديد",        color: "text-blue-700",   bg: "bg-blue-100",   Icon: Clock      },
  confirmed: { label: "مؤكد",        color: "text-green-700",  bg: "bg-green-100",  Icon: CheckCircle },
  shipped:   { label: "تم الإرسال",  color: "text-purple-700", bg: "bg-purple-100", Icon: Truck       },
  cancelled: { label: "ملغي",        color: "text-red-600",    bg: "bg-red-100",    Icon: XCircle     },
};

const STATUS_KEYS = Object.keys(STATUS_CFG) as OrderStatus[];

const AVATAR_COLORS = [
  "from-green-400 to-emerald-600", "from-pink-400 to-rose-500",
  "from-blue-400 to-indigo-500",   "from-amber-400 to-orange-500",
  "from-violet-400 to-purple-500", "from-teal-400 to-cyan-500",
  "from-red-400 to-rose-500",      "from-cyan-400 to-blue-500",
  "from-lime-400 to-green-500",    "from-fuchsia-400 to-purple-500",
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function shortId(id: string) {
  return `#FL-${id.slice(-5).toUpperCase()}`;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("ar-MA", { day: "numeric", month: "short", year: "numeric" });
}

function productName(snapshot: Order["product_snapshot"]) {
  return snapshot?.name ?? "—";
}

// ── Skeleton row ─────────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <div className="hidden md:grid grid-cols-12 gap-3 px-5 py-4 animate-pulse">
      <div className="col-span-3 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />
        <div className="space-y-1.5 flex-1">
          <div className="h-2.5 bg-gray-200 rounded w-3/4" />
          <div className="h-2 bg-gray-100 rounded w-1/2" />
        </div>
      </div>
      <div className="col-span-3 space-y-1.5 flex flex-col justify-center">
        <div className="h-2.5 bg-gray-200 rounded w-4/5" />
        <div className="h-2 bg-gray-100 rounded w-1/3" />
      </div>
      <div className="col-span-2 flex items-center"><div className="h-2.5 bg-gray-200 rounded w-2/3" /></div>
      <div className="col-span-1 flex items-center justify-center"><div className="h-2.5 bg-gray-200 rounded w-10" /></div>
      <div className="col-span-1 flex items-center justify-center"><div className="h-2.5 bg-gray-200 rounded w-12" /></div>
      <div className="col-span-2 flex items-center justify-center"><div className="h-6 bg-gray-200 rounded-full w-24" /></div>
    </div>
  );
}

function MobileSkeletonRow() {
  return (
    <div className="md:hidden flex items-center gap-3 px-4 py-3.5 animate-pulse">
      <div className="w-9 h-9 rounded-full bg-gray-200 shrink-0" />
      <div className="flex-1 space-y-1.5">
        <div className="h-2.5 bg-gray-200 rounded w-1/2" />
        <div className="h-2 bg-gray-100 rounded w-3/4" />
      </div>
      <div className="h-5 bg-gray-200 rounded-full w-16" />
    </div>
  );
}

// ── Status select dropdown ────────────────────────────────────────────────────

function StatusSelect({
  orderId, current, onUpdate,
}: {
  orderId: string;
  current: OrderStatus;
  onUpdate: (id: string, status: OrderStatus) => Promise<void>;
}) {
  const [updating, setUpdating] = useState(false);
  const cfg = STATUS_CFG[current];

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value as OrderStatus;
    if (next === current) return;
    setUpdating(true);
    await onUpdate(orderId, next);
    setUpdating(false);
  };

  return (
    <div className="relative flex items-center">
      {updating && <Loader2 className="w-3 h-3 animate-spin text-gray-400 absolute -right-4" />}
      <select
        value={current}
        onChange={handleChange}
        disabled={updating}
        className={`appearance-none text-[10px] font-bold pl-6 pr-2.5 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 transition-all disabled:opacity-50 ${cfg.bg} ${cfg.color}`}
      >
        {STATUS_KEYS.map(k => (
          <option key={k} value={k}>{STATUS_CFG[k].label}</option>
        ))}
      </select>
      <cfg.Icon className={`w-3 h-3 absolute left-2 pointer-events-none ${cfg.color}`} />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function OrdersClient({
  storeId,
  initialOrders,
}: {
  storeId: string;
  initialOrders: Order[];
}) {
  const [orders, setOrders]     = useState<Order[]>(initialOrders);
  const [search, setSearch]     = useState("");
  const [activeTab, setTab]     = useState<"all" | OrderStatus>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  // ── Filtering ──────────────────────────────────────────────────────────────

  const filtered = orders.filter(o => {
    const matchTab    = activeTab === "all" || o.status === activeTab;
    const q           = search.toLowerCase();
    const matchSearch = !q
      || o.customer_name.includes(search)
      || o.customer_phone.includes(search)
      || productName(o.product_snapshot).includes(search)
      || shortId(o.id).toLowerCase().includes(q);
    return matchTab && matchSearch;
  });

  const counts = {
    all:       orders.length,
    new:       orders.filter(o => o.status === "new").length,
    confirmed: orders.filter(o => o.status === "confirmed").length,
    shipped:   orders.filter(o => o.status === "shipped").length,
    cancelled: orders.filter(o => o.status === "cancelled").length,
  };

  // ── Status update (optimistic) ─────────────────────────────────────────────

  const updateStatus = async (id: string, status: OrderStatus) => {
    const prev = orders.find(o => o.id === id)?.status;
    // Optimistic
    setOrders(os => os.map(o => o.id === id ? { ...o, status } : o));

    const supabase = createClient();
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("[orders] update error:", error);
      // Revert
      if (prev) setOrders(os => os.map(o => o.id === id ? { ...o, status: prev } : o));
    }
  };

  // ── Tabs config ────────────────────────────────────────────────────────────

  const tabs: { key: "all" | OrderStatus; label: string }[] = [
    { key: "all",       label: "الكل"        },
    { key: "new",       label: "جديد"        },
    { key: "confirmed", label: "مؤكد"        },
    { key: "shipped",   label: "تم الإرسال"  },
    { key: "cancelled", label: "ملغي"        },
  ];

  const totalRevenue = filtered.reduce((s, o) => s + (o.total ?? 0), 0);

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-gray-900">الطلبات</h2>
          <p className="text-sm text-gray-500">{orders.length} طلب إجمالاً</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-gray-50 shadow-sm transition-colors w-fit">
          <Download className="w-4 h-4" />
          تصدير Excel
        </button>
      </div>

      {/* Status tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
              activeTab === key
                ? "bg-[#25D366] text-white shadow-md shadow-green-200"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {label}
            <span className={`rounded-full text-[9px] font-black px-1.5 py-0.5 ${activeTab === key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
              {counts[key]}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="ابحث بالاسم، الهاتف، أو رقم الطلب..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl pr-9 pl-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366] shadow-sm transition-all"
        />
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Desktop header */}
        <div className="hidden md:grid grid-cols-12 gap-3 px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wide">
          <div className="col-span-3">الزبون</div>
          <div className="col-span-3">المنتج</div>
          <div className="col-span-2">المدينة</div>
          <div className="col-span-1 text-center">توصيل</div>
          <div className="col-span-1 text-center">الإجمالي</div>
          <div className="col-span-2 text-center">الحالة</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-50">
          {filtered.map((o, i) => {
            const cfg    = STATUS_CFG[o.status];
            const isOpen = expanded === o.id;
            const avatar = AVATAR_COLORS[i % AVATAR_COLORS.length];

            return (
              <div key={o.id}>
                {/* Desktop row */}
                <div className="hidden md:grid grid-cols-12 gap-3 px-5 py-3.5 hover:bg-gray-50/80 transition-colors items-center">
                  <div className="col-span-3 flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${avatar} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                      {o.customer_name[0]}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-900 truncate">{o.customer_name}</p>
                      <p className="text-[10px] text-gray-400 font-mono" dir="ltr">{o.customer_phone}</p>
                    </div>
                  </div>

                  <div className="col-span-3">
                    <p className="text-xs text-gray-800 font-medium truncate">{productName(o.product_snapshot)}</p>
                    <p className="text-[10px] text-gray-400 font-mono">{shortId(o.id)}</p>
                  </div>

                  <div className="col-span-2 text-xs text-gray-600">{o.customer_city}</div>

                  <div className="col-span-1 text-center text-xs text-gray-500">
                    {o.delivery_fee} د
                  </div>

                  <div className="col-span-1 text-center text-xs font-black text-gray-900">
                    {(o.total ?? (o.unit_price * o.quantity + o.delivery_fee)).toLocaleString()} د
                  </div>

                  <div className="col-span-2 flex items-center justify-center">
                    <StatusSelect orderId={o.id} current={o.status} onUpdate={updateStatus} />
                  </div>
                </div>

                {/* Mobile row */}
                <div className="md:hidden">
                  <button
                    onClick={() => setExpanded(isOpen ? null : o.id)}
                    className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors text-right"
                  >
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatar} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                      {o.customer_name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-bold text-gray-900 truncate">{o.customer_name}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${cfg.bg} ${cfg.color}`}>
                          {cfg.label}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5 truncate">
                        {productName(o.product_snapshot)} · {o.customer_city}
                      </p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 bg-gray-50/50 space-y-2">
                      {[
                        ["رقم الطلب",  shortId(o.id)],
                        ["الهاتف",     o.customer_phone],
                        ["المدينة",    o.customer_city],
                        ["توصيل",      `${o.delivery_fee} درهم`],
                        ["الإجمالي",   `${(o.total ?? o.unit_price * o.quantity + o.delivery_fee).toLocaleString()} درهم`],
                        ["التاريخ",    formatDate(o.created_at)],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between text-xs">
                          <span className="text-gray-500">{k}</span>
                          <span className="font-semibold text-gray-800" dir={k === "الهاتف" ? "ltr" : undefined}>{v}</span>
                        </div>
                      ))}
                      {/* Status update on mobile */}
                      <div className="flex justify-between text-xs items-center pt-1">
                        <span className="text-gray-500">تغيير الحالة</span>
                        <StatusSelect orderId={o.id} current={o.status} onUpdate={updateStatus} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && orders.length > 0 && (
          <div className="py-16 text-center text-gray-400">
            <Search className="w-8 h-8 mx-auto mb-3 opacity-40" />
            <p className="text-sm font-medium">لا توجد طلبات تطابق البحث</p>
          </div>
        )}

        {orders.length === 0 && (
          <div className="py-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-500 font-semibold mb-1">لا توجد طلبات بعد</p>
            <p className="text-gray-400 text-sm">ستظهر هنا طلبات زبنائك بمجرد بدء البوت بالعمل</p>
          </div>
        )}

        {/* Footer */}
        {filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
            <span>{filtered.length} نتيجة</span>
            <span>إجمالي المبيعات: {totalRevenue.toLocaleString()} درهم</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Loading skeleton export (used if needed by Suspense) ─────────────────────

export function OrdersSkeleton() {
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div className="space-y-1.5">
          <div className="h-5 bg-gray-200 rounded w-24 animate-pulse" />
          <div className="h-3 bg-gray-100 rounded w-32 animate-pulse" />
        </div>
      </div>
      <div className="flex gap-1.5">
        {[1,2,3,4,5].map(i => <div key={i} className="h-8 bg-gray-200 rounded-xl w-20 animate-pulse" />)}
      </div>
      <div className="h-10 bg-gray-200 rounded-xl animate-pulse" />
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="h-10 bg-gray-50 border-b border-gray-100" />
        {[1,2,3,4,5].map(i => (
          <div key={i} className="border-b border-gray-50 last:border-0">
            <SkeletonRow />
            <MobileSkeletonRow />
          </div>
        ))}
      </div>
    </div>
  );
}
