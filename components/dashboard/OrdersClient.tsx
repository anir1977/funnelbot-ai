"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle,
  ChevronDown,
  Clock,
  Download,
  Loader2,
  Plus,
  Search,
  ShoppingBag,
  Truck,
  X,
  XCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type OrderStatus = "new" | "confirmed" | "shipped" | "cancelled";
type Product = { id: string; name: string; price: number };

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

const statusConfig: Record<OrderStatus, { label: string; cls: string; icon: React.ElementType }> = {
  new: { label: "جديد", cls: "bg-blue-50 text-blue-700 ring-blue-200", icon: Clock },
  confirmed: { label: "مؤكد", cls: "bg-emerald-50 text-emerald-700 ring-emerald-200", icon: CheckCircle },
  shipped: { label: "تم الإرسال", cls: "bg-violet-50 text-violet-700 ring-violet-200", icon: Truck },
  cancelled: { label: "ملغي", cls: "bg-red-50 text-red-700 ring-red-200", icon: XCircle },
};

const statusKeys = Object.keys(statusConfig) as OrderStatus[];

function shortId(id: string) {
  return `#FL-${id.slice(-5).toUpperCase()}`;
}

function productName(snapshot: Order["product_snapshot"]) {
  return snapshot?.name ?? "طلب واتساب";
}

function money(value: number | null | undefined) {
  return `${Number(value ?? 0).toLocaleString("fr-MA")} د`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ar-MA", { day: "numeric", month: "short" });
}

function CreateOrderModal({
  storeId,
  products,
  onClose,
  onCreated,
}: {
  storeId: string;
  products: Product[];
  onClose: () => void;
  onCreated: (order: Order) => void;
}) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const [productId, setProductId] = useState(products[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [deliveryFee, setDeliveryFee] = useState(30);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const selectedProduct = products.find((product) => product.id === productId);
  const unitPrice = selectedProduct?.price ?? 0;
  const total = quantity * unitPrice + deliveryFee;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedProduct) return;

    setError("");
    setSaving(true);

    const supabase = createClient();
    const { data, error: insertError } = await supabase
      .from("orders")
      .insert({
        store_id: storeId,
        customer_name: customerName.trim(),
        customer_phone: customerPhone.trim(),
        customer_city: customerCity.trim(),
        product_snapshot: { name: selectedProduct.name, price: selectedProduct.price },
        quantity,
        unit_price: unitPrice,
        delivery_fee: deliveryFee,
        status: "new",
      })
      .select("id, customer_name, customer_phone, customer_city, product_snapshot, quantity, unit_price, delivery_fee, total, status, notes, created_at")
      .single();

    setSaving(false);

    if (insertError) {
      setError("ما قدرناش نحفظو الطلب. عاود جرّب.");
      return;
    }

    if (data) onCreated(data as Order);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 p-5">
          <div>
            <h3 className="text-base font-extrabold text-gray-950">إنشاء طلب جديد</h3>
            <p className="mt-1 text-xs text-gray-500">استعملها للطلبات اليدوية أو الاختبار الداخلي.</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          {error && <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">{error}</p>}

          <div>
            <label className="mb-1.5 block text-xs font-bold text-gray-700">اسم الزبون</label>
            <input required value={customerName} onChange={(event) => setCustomerName(event.target.value)} className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-gray-400 focus:ring-4 focus:ring-gray-100" placeholder="مثال: محمد الأمين" />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold text-gray-700">رقم الهاتف</label>
            <input required dir="ltr" value={customerPhone} onChange={(event) => setCustomerPhone(event.target.value)} className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-gray-400 focus:ring-4 focus:ring-gray-100" placeholder="+212 6XX XXX XXX" />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold text-gray-700">المدينة</label>
            <input required value={customerCity} onChange={(event) => setCustomerCity(event.target.value)} className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-gray-400 focus:ring-4 focus:ring-gray-100" placeholder="مثال: الدار البيضاء" />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold text-gray-700">المنتج</label>
            {products.length === 0 ? (
              <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">خاصك تزيد منتج نشط قبل إنشاء الطلب.</p>
            ) : (
              <select required value={productId} onChange={(event) => setProductId(event.target.value)} className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-gray-400 focus:ring-4 focus:ring-gray-100">
                {products.map((product) => (
                  <option key={product.id} value={product.id}>{product.name} - {money(product.price)}</option>
                ))}
              </select>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-gray-700">الكمية</label>
              <input type="number" min={1} value={quantity} onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))} className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-gray-400 focus:ring-4 focus:ring-gray-100" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-gray-700">التوصيل</label>
              <input type="number" min={0} value={deliveryFee} onChange={(event) => setDeliveryFee(Math.max(0, Number(event.target.value) || 0))} className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-gray-400 focus:ring-4 focus:ring-gray-100" />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-3">
            <span className="text-xs font-semibold text-gray-500">الإجمالي المتوقع</span>
            <span className="text-base font-extrabold text-gray-950">{money(total)}</span>
          </div>

          <div className="flex gap-2 pt-1">
            <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50">إلغاء</button>
            <button type="submit" disabled={saving || products.length === 0} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-950 py-2.5 text-sm font-bold text-white hover:bg-gray-800 disabled:opacity-50">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              {saving ? "كيحفظ..." : "حفظ الطلب"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function StatusSelect({
  orderId,
  current,
  onUpdate,
}: {
  orderId: string;
  current: OrderStatus;
  onUpdate: (id: string, status: OrderStatus) => Promise<void>;
}) {
  const [updating, setUpdating] = useState(false);
  const status = statusConfig[current];

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const next = event.target.value as OrderStatus;
    if (next === current) return;
    setUpdating(true);
    await onUpdate(orderId, next);
    setUpdating(false);
  };

  return (
    <div className="relative inline-flex items-center">
      {updating && <Loader2 className="absolute -right-4 h-3 w-3 animate-spin text-gray-400" />}
      <select value={current} onChange={handleChange} disabled={updating} className={`appearance-none rounded-full px-2.5 py-1 pl-7 text-[10px] font-bold ring-1 outline-none ${status.cls}`}>
        {statusKeys.map((key) => <option key={key} value={key}>{statusConfig[key].label}</option>)}
      </select>
      <status.icon className="pointer-events-none absolute left-2 h-3 w-3" />
    </div>
  );
}

export default function OrdersClient({
  storeId,
  initialOrders,
  initialProducts,
}: {
  storeId: string;
  initialOrders: Order[];
  initialProducts: Product[];
}) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | OrderStatus>("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return orders.filter((order) => {
      const matchTab = activeTab === "all" || order.status === activeTab;
      const matchSearch = !q
        || order.customer_name.toLowerCase().includes(q)
        || order.customer_phone.includes(search)
        || productName(order.product_snapshot).toLowerCase().includes(q)
        || shortId(order.id).toLowerCase().includes(q);
      return matchTab && matchSearch;
    });
  }, [orders, search, activeTab]);

  const counts = {
    all: orders.length,
    new: orders.filter((order) => order.status === "new").length,
    confirmed: orders.filter((order) => order.status === "confirmed").length,
    shipped: orders.filter((order) => order.status === "shipped").length,
    cancelled: orders.filter((order) => order.status === "cancelled").length,
  };

  const totalRevenue = filtered.reduce((sum, order) => sum + Number(order.total ?? 0), 0);

  const updateStatus = async (id: string, status: OrderStatus) => {
    const previous = orders.find((order) => order.id === id)?.status;
    setOrders((current) => current.map((order) => order.id === id ? { ...order, status } : order));

    const supabase = createClient();
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);

    if (error && previous) {
      setOrders((current) => current.map((order) => order.id === id ? { ...order, status: previous } : order));
    }
  };

  const tabs: { key: "all" | OrderStatus; label: string }[] = [
    { key: "all", label: "الكل" },
    { key: "new", label: "جديد" },
    { key: "confirmed", label: "مؤكد" },
    { key: "shipped", label: "تم الإرسال" },
    { key: "cancelled", label: "ملغي" },
  ];

  return (
    <div className="space-y-5">
      {showCreate && (
        <CreateOrderModal
          storeId={storeId}
          products={initialProducts}
          onClose={() => setShowCreate(false)}
          onCreated={(order) => setOrders((current) => [order, ...current])}
        />
      )}

      <header className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-gray-950">الطلبات</h2>
            <p className="mt-2 text-sm text-gray-500">متابعة الطلبات اللي دخلات من البوت أو اللي زدتيها يدوياً.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setShowCreate(true)} className="inline-flex items-center gap-2 rounded-lg bg-gray-950 px-4 py-2.5 text-sm font-bold text-white hover:bg-gray-800">
              <Plus className="h-4 w-4" />
              إنشاء طلب
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50">
              <Download className="h-4 w-4" />
              تصدير
            </button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-4">
          {[
            ["كل الطلبات", counts.all],
            ["جديدة", counts.new],
            ["مؤكدة", counts.confirmed],
            ["المبيعات", money(totalRevenue)],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-3">
              <p className="text-xs font-semibold text-gray-500">{label}</p>
              <p className="mt-2 text-xl font-extrabold text-gray-950">{value}</p>
            </div>
          ))}
        </div>
      </header>

      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {tabs.map(({ key, label }) => (
          <button key={key} onClick={() => setActiveTab(key)} className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-bold transition ${activeTab === key ? "bg-gray-950 text-white" : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"}`}>
            {label}
            <span className={`rounded-full px-1.5 py-0.5 text-[9px] ${activeTab === key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>{counts[key]}</span>
          </button>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input value={search} onChange={(event) => setSearch(event.target.value)} className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-4 pr-9 text-sm shadow-sm outline-none focus:border-gray-400 focus:ring-4 focus:ring-gray-100" placeholder="ابحث بالاسم، الهاتف، أو رقم الطلب..." />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="hidden grid-cols-12 gap-3 border-b border-gray-100 bg-gray-50 px-5 py-3 text-xs font-bold text-gray-500 md:grid">
          <div className="col-span-3">الزبون</div>
          <div className="col-span-3">المنتج</div>
          <div className="col-span-2">المدينة</div>
          <div className="col-span-1 text-center">توصيل</div>
          <div className="col-span-1 text-center">الإجمالي</div>
          <div className="col-span-2 text-center">الحالة</div>
        </div>

        <div className="divide-y divide-gray-100">
          {filtered.map((order) => {
            const status = statusConfig[order.status];
            const open = expanded === order.id;
            return (
              <div key={order.id}>
                <div className="hidden grid-cols-12 items-center gap-3 px-5 py-3.5 transition hover:bg-gray-50 md:grid">
                  <div className="col-span-3 min-w-0">
                    <p className="truncate text-xs font-bold text-gray-950">{order.customer_name}</p>
                    <p className="mt-0.5 text-[10px] text-gray-400" dir="ltr">{order.customer_phone}</p>
                  </div>
                  <div className="col-span-3 min-w-0">
                    <p className="truncate text-xs font-semibold text-gray-800">{productName(order.product_snapshot)}</p>
                    <p className="mt-0.5 font-mono text-[10px] text-gray-400">{shortId(order.id)}</p>
                  </div>
                  <div className="col-span-2 text-xs text-gray-600">{order.customer_city}</div>
                  <div className="col-span-1 text-center text-xs text-gray-500">{money(order.delivery_fee)}</div>
                  <div className="col-span-1 text-center text-xs font-extrabold text-gray-950">{money(order.total ?? order.unit_price * order.quantity + order.delivery_fee)}</div>
                  <div className="col-span-2 flex justify-center"><StatusSelect orderId={order.id} current={order.status} onUpdate={updateStatus} /></div>
                </div>

                <div className="md:hidden">
                  <button onClick={() => setExpanded(open ? null : order.id)} className="flex w-full items-center gap-3 px-4 py-3.5 text-right hover:bg-gray-50">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-950 text-xs font-bold text-white">{order.customer_name[0]}</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-xs font-bold text-gray-950">{order.customer_name}</p>
                        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ring-1 ${status.cls}`}>{status.label}</span>
                      </div>
                      <p className="mt-0.5 truncate text-[11px] text-gray-500">{productName(order.product_snapshot)} · {order.customer_city}</p>
                    </div>
                    <ChevronDown className={`h-4 w-4 shrink-0 text-gray-400 transition ${open ? "rotate-180" : ""}`} />
                  </button>

                  {open && (
                    <div className="space-y-2 bg-gray-50/70 px-4 pb-4 text-xs">
                      {[
                        ["رقم الطلب", shortId(order.id)],
                        ["الهاتف", order.customer_phone],
                        ["المدينة", order.customer_city],
                        ["توصيل", money(order.delivery_fee)],
                        ["الإجمالي", money(order.total)],
                        ["التاريخ", formatDate(order.created_at)],
                      ].map(([label, value]) => (
                        <div key={label} className="flex justify-between gap-3">
                          <span className="text-gray-500">{label}</span>
                          <span className="font-semibold text-gray-800" dir={label === "الهاتف" ? "ltr" : undefined}>{value}</span>
                        </div>
                      ))}
                      <div className="flex items-center justify-between gap-3 pt-1">
                        <span className="text-gray-500">الحالة</span>
                        <StatusSelect orderId={order.id} current={order.status} onUpdate={updateStatus} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <ShoppingBag className="mx-auto mb-3 h-9 w-9 text-gray-300" />
            <p className="text-sm font-semibold text-gray-500">{orders.length === 0 ? "لا توجد طلبات بعد" : "لا توجد طلبات تطابق البحث"}</p>
            <p className="mt-1 text-xs text-gray-400">الطلبات الحقيقية غادي تبان هنا ملي البوت يبدا يخدم.</p>
          </div>
        )}

        {filtered.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3 text-xs text-gray-500">
            <span>{filtered.length} نتيجة</span>
            <span>إجمالي المبيعات: {money(totalRevenue)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
