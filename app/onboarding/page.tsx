"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  Bot,
  Camera,
  Check,
  CheckCircle2,
  ChevronLeft,
  CircleDashed,
  Globe2,
  Languages,
  Loader2,
  MessageCircle,
  Package,
  Plus,
  QrCode,
  RefreshCw,
  Sparkles,
  Store,
  Trash2,
  Upload,
  Wallet,
  Wifi,
  Zap,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { seedDefaultFaqs } from "@/lib/default-faqs";
import { cn } from "@/lib/utils";

type BusinessType = "parfum" | "clothes" | "supplements" | "food" | "general";
type Language = "arabic" | "french";
type Tone = "friendly" | "pro" | "funny" | "brief";

type ProductDraft = {
  id: string;
  name: string;
  price: string;
  deliveryPrice: string;
  cities: string[];
  codEnabled: boolean;
};

const steps = [
  { id: 1, label: "Store", title: "معلومات المتجر", icon: Store },
  { id: 2, label: "WhatsApp", title: "ربط واتساب", icon: MessageCircle },
  { id: 3, label: "Products", title: "المنتجات", icon: Package },
  { id: 4, label: "AI", title: "إعدادات الذكاء", icon: Bot },
  { id: 5, label: "Ready", title: "جاهز", icon: CheckCircle2 },
];

const categories: { id: BusinessType; label: string; desc: string }[] = [
  { id: "parfum", label: "عطور وكوزميتيك", desc: "عطور، مكياج، كريمات" },
  { id: "clothes", label: "ملابس وأزياء", desc: "رجالي، نسائي، أطفال" },
  { id: "supplements", label: "مكملات غذائية", desc: "رياضة، صحة، فيتامينات" },
  { id: "food", label: "مأكولات ومشروبات", desc: "حلويات، قهوة، مطاعم" },
  { id: "general", label: "متجر عام", desc: "منتجات متنوعة" },
];

const tones: { id: Tone; label: string; desc: string }[] = [
  { id: "friendly", label: "ودّي وقريب", desc: "دارجة طبيعية وردود مريحة" },
  { id: "pro", label: "احترافي", desc: "أسلوب واضح وراقي للماركات" },
  { id: "funny", label: "خفيف ومرح", desc: "طاقة أكثر مع ردود لطيفة" },
  { id: "brief", label: "مختصر ومباشر", desc: "أجوبة سريعة بلا إطالة" },
];

const cityOptions = [
  "الدار البيضاء",
  "الرباط",
  "مراكش",
  "فاس",
  "طنجة",
  "أكادير",
  "مكناس",
  "وجدة",
  "تطوان",
  "سلا",
  "القنيطرة",
  "الجديدة",
];

const emptyProduct = (): ProductDraft => ({
  id: crypto.randomUUID(),
  name: "",
  price: "",
  deliveryPrice: "25",
  cities: ["الدار البيضاء"],
  codEnabled: true,
});

const ease = [0.22, 1, 0.36, 1] as const;

function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("212")) return digits;
  if (digits.startsWith("0")) return `212${digits.slice(1)}`;
  return `212${digits}`;
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-gray-500">{children}</label>;
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-2xl shadow-emerald-950/5 backdrop-blur-xl sm:p-7", className)}>
      {children}
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled,
  loading,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-3 text-sm font-black text-white shadow-lg shadow-green-200 transition hover:-translate-y-0.5 hover:bg-[#1eb85a] disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-[#25D366] focus:ring-4 focus:ring-[#25D366]/15",
        props.className,
      )}
    />
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold leading-7 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-[#25D366] focus:ring-4 focus:ring-[#25D366]/15",
        props.className,
      )}
    />
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [storeName, setStoreName] = useState("");
  const [category, setCategory] = useState<BusinessType>("general");
  const [language, setLanguage] = useState<Language>("arabic");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [whatsappStatus, setWhatsappStatus] = useState<"idle" | "pairing" | "connected">("idle");
  const [products, setProducts] = useState<ProductDraft[]>([emptyProduct()]);
  const [tone, setTone] = useState<Tone>("friendly");
  const [replyMode, setReplyMode] = useState<"darija" | "french" | "both">("darija");
  const [businessDescription, setBusinessDescription] = useState("");
  const [customInstructions, setCustomInstructions] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const progress = ((step - 1) / (steps.length - 1)) * 100;
  const validProducts = products.filter((product) => product.name.trim() && Number(product.price) > 0);

  const canContinue = useMemo(() => {
    if (step === 1) return Boolean(storeName.trim() && category && language);
    if (step === 2) return whatsappStatus === "connected" && normalizePhone(phone).length >= 12;
    if (step === 3) return validProducts.length > 0 && validProducts.every((product) => product.cities.length > 0);
    if (step === 4) return Boolean(tone && replyMode && businessDescription.trim());
    return true;
  }, [businessDescription, category, language, phone, replyMode, step, storeName, tone, validProducts, whatsappStatus]);

  const selectedCities = useMemo(() => {
    const cities = new Map<string, { price: number; cod: boolean }>();
    products.forEach((product) => {
      product.cities.forEach((city) => {
        const current = cities.get(city);
        cities.set(city, {
          price: Number(product.deliveryPrice || current?.price || 25),
          cod: Boolean(product.codEnabled || current?.cod),
        });
      });
    });
    return Array.from(cities.entries()).map(([city, config]) => ({ city, ...config }));
  }, [products]);

  const connectWhatsApp = () => {
    setWhatsappStatus("pairing");
    window.setTimeout(() => setWhatsappStatus("connected"), 1100);
  };

  const updateProduct = (id: string, patch: Partial<ProductDraft>) => {
    setProducts((current) => current.map((product) => product.id === id ? { ...product, ...patch } : product));
  };

  const toggleCity = (productId: string, city: string) => {
    setProducts((current) => current.map((product) => {
      if (product.id !== productId) return product;
      const exists = product.cities.includes(city);
      const cities = exists ? product.cities.filter((item) => item !== city) : [...product.cities, city];
      return { ...product, cities };
    }));
  };

  const saveOnboarding = async () => {
    setSaving(true);
    setError("");

    const supabase = createClient();
    const { data: auth } = await supabase.auth.getUser();

    if (!auth.user) {
      router.push("/login");
      return;
    }

    const aiSummary = [
      `Preferred language: ${language}`,
      `Reply mode: ${replyMode}`,
      `Business description: ${businessDescription.trim()}`,
      customInstructions.trim() ? `Custom instructions: ${customInstructions.trim()}` : "",
    ].filter(Boolean).join("\n");

    const primaryCity = selectedCities[0]?.city ?? "الدار البيضاء";
    const { data: store, error: storeError } = await supabase
      .from("stores")
      .insert({
        user_id: auth.user.id,
        name: storeName.trim(),
        business_type: category,
        city: primaryCity,
        whatsapp_number: normalizePhone(phone),
        bot_tone: tone,
        welcome_message: aiSummary,
        active: true,
      })
      .select("id")
      .single();

    if (storeError || !store?.id) {
      setSaving(false);
      setError(storeError?.message ?? "Could not create the store.");
      return;
    }

    const productRows = validProducts.map((product) => ({
      store_id: store.id,
      name: product.name.trim(),
      description: businessDescription.trim(),
      price: Number(product.price),
      stock: 20,
      category,
      active: true,
    }));

    if (productRows.length > 0) {
      const { error: productError } = await supabase.from("products").insert(productRows);
      if (productError) {
        setSaving(false);
        setError(productError.message);
        return;
      }
    }

    if (selectedCities.length > 0) {
      const deliveryRows = selectedCities.map((zone) => ({
        store_id: store.id,
        city: zone.city,
        price: zone.price,
        delivery_time: "24-48 ساعة",
        cod_enabled: zone.cod,
        active: true,
      }));
      const { error: deliveryError } = await supabase.from("delivery_zones").insert(deliveryRows);
      if (deliveryError) {
        setSaving(false);
        setError(deliveryError.message);
        return;
      }
    }

    await seedDefaultFaqs(supabase, store.id);
    setSaving(false);
    setStep(5);
  };

  const next = () => {
    if (step === 4) {
      saveOnboarding();
      return;
    }
    setStep((current) => Math.min(current + 1, 5));
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-green-50/70 via-white to-white px-4 py-6 text-gray-950 sm:px-6 lg:px-8" dir="rtl">
      <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-green-100/60 blur-3xl" />
      <div className="absolute -left-48 top-1/3 h-[420px] w-[420px] rounded-full bg-emerald-50 blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col">
        <header className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#25D366] shadow-md">
              <BookOpen className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-black tracking-tight">
              Funnels<span className="text-[#25D366]">Library</span>
            </span>
          </Link>
          <Link href="/dashboard" className="hidden items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm font-bold text-gray-600 shadow-sm backdrop-blur transition hover:text-[#25D366] sm:inline-flex">
            تخطي إلى لوحة التحكم
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </header>

        <section className="grid flex-1 items-center gap-8 py-8 lg:grid-cols-[0.74fr_1.26fr] lg:py-10">
          <aside className="order-2 lg:order-1">
            <Panel className="sticky top-8">
              <div className="mb-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-black text-green-700">
                  <Sparkles className="h-3.5 w-3.5" />
                  إعداد أول بوت واتساب
                </div>
                <h1 className="text-3xl font-black leading-tight sm:text-4xl">
                  خلّي متجرك يرد، يبيع، ويأكد الطلبات من واتساب.
                </h1>
                <p className="mt-4 text-sm font-medium leading-7 text-gray-500">
                  خمس خطوات قصيرة كتجهز المتجر، واتساب، المنتجات، وتعليمات الذكاء الاصطناعي باش FunnelsLibrary يحس كمنتج SaaS حقيقي.
                </p>
              </div>

              <div className="mb-7 h-2 overflow-hidden rounded-full bg-gray-100">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-l from-[#25D366] to-emerald-400"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.45, ease }}
                />
              </div>

              <div className="space-y-3">
                {steps.map((item) => {
                  const Icon = item.icon;
                  const active = step === item.id;
                  const done = step > item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => item.id < step && setStep(item.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-right transition",
                        active ? "border-[#25D366] bg-green-50 shadow-sm" : done ? "border-gray-100 bg-white hover:border-green-200" : "border-transparent bg-transparent opacity-55",
                      )}
                    >
                      <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", active || done ? "bg-[#25D366] text-white" : "bg-gray-100 text-gray-400")}>
                        {done ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={cn("text-sm font-black", active ? "text-gray-950" : "text-gray-600")}>{item.title}</p>
                        <p className="text-xs font-semibold text-gray-400">{item.label}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Panel>
          </aside>

          <div className="order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 18, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.985 }}
                transition={{ duration: 0.32, ease }}
              >
                {step === 1 && (
                  <Panel>
                    <div className="mb-7 flex items-start justify-between gap-5">
                      <div>
                        <p className="text-sm font-black text-[#25D366]">Step 1</p>
                        <h2 className="mt-2 text-2xl font-black">Store information</h2>
                        <p className="mt-2 text-sm font-medium text-gray-500">المعلومات الأساسية اللي غادي يستعملها البوت فكل محادثة.</p>
                      </div>
                      <div className="hidden h-14 w-14 items-center justify-center rounded-3xl bg-green-50 text-[#25D366] sm:flex">
                        <Store className="h-6 w-6" />
                      </div>
                    </div>

                    <div className="grid gap-5 lg:grid-cols-[1fr_220px]">
                      <div className="space-y-5">
                        <div>
                          <FieldLabel>Store name</FieldLabel>
                          <TextInput value={storeName} onChange={(event) => setStoreName(event.target.value)} placeholder="مثال: عطور الريم" />
                        </div>

                        <div>
                          <FieldLabel>Store category</FieldLabel>
                          <div className="grid gap-3 sm:grid-cols-2">
                            {categories.map((item) => (
                              <button
                                key={item.id}
                                onClick={() => setCategory(item.id)}
                                className={cn("rounded-2xl border p-4 text-right transition", category === item.id ? "border-[#25D366] bg-green-50" : "border-gray-200 bg-white hover:border-green-200")}
                              >
                                <p className="text-sm font-black">{item.label}</p>
                                <p className="mt-1 text-xs font-medium text-gray-500">{item.desc}</p>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <FieldLabel>Preferred language</FieldLabel>
                          <div className="grid gap-3 sm:grid-cols-2">
                            {[
                              { id: "arabic" as const, label: "Arabic / Darija", icon: Languages },
                              { id: "french" as const, label: "French", icon: Globe2 },
                            ].map((item) => {
                              const Icon = item.icon;
                              return (
                                <button
                                  key={item.id}
                                  onClick={() => setLanguage(item.id)}
                                  className={cn("flex items-center gap-3 rounded-2xl border px-4 py-3 text-right transition", language === item.id ? "border-[#25D366] bg-green-50" : "border-gray-200 bg-white hover:border-green-200")}
                                >
                                  <Icon className="h-4 w-4 text-[#25D366]" />
                                  <span className="text-sm font-black">{item.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div>
                        <FieldLabel>Logo upload</FieldLabel>
                        <label className="group flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-gray-300 bg-gray-50 text-center transition hover:border-[#25D366] hover:bg-green-50/50">
                          {logoPreview ? (
                            <img src={logoPreview} alt="Store logo preview" className="h-28 w-28 rounded-3xl object-cover shadow-lg" />
                          ) : (
                            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-gray-400 shadow-sm transition group-hover:text-[#25D366]">
                              <Upload className="h-8 w-8" />
                            </div>
                          )}
                          <p className="mt-4 text-sm font-black text-gray-800">Upload logo</p>
                          <p className="mt-1 px-6 text-xs font-medium text-gray-500">PNG or JPG. Ready for Supabase Storage.</p>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(event) => {
                              const file = event.target.files?.[0];
                              if (file) setLogoPreview(URL.createObjectURL(file));
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </Panel>
                )}

                {step === 2 && (
                  <Panel>
                    <div className="mb-7 flex items-start justify-between gap-5">
                      <div>
                        <p className="text-sm font-black text-[#25D366]">Step 2</p>
                        <h2 className="mt-2 text-2xl font-black">WhatsApp connection</h2>
                        <p className="mt-2 text-sm font-medium text-gray-500">واجهة ربط واتساب جاهزة باش تربطها من بعد مع Evolution API session.</p>
                      </div>
                      <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-black text-green-700">
                        <span className={cn("h-2 w-2 rounded-full", whatsappStatus === "connected" ? "bg-[#25D366]" : "bg-amber-400")} />
                        {whatsappStatus === "connected" ? "Connected" : "Waiting"}
                      </div>
                    </div>

                    <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
                      <div className="space-y-5">
                        <div>
                          <FieldLabel>Business WhatsApp number</FieldLabel>
                          <div className="flex gap-2" dir="ltr">
                            <span className="flex items-center rounded-2xl border border-gray-200 bg-white px-4 text-sm font-black text-gray-500">+212</span>
                            <TextInput value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="6XXXXXXXX" className="font-mono" />
                          </div>
                        </div>

                        <div className="rounded-[1.5rem] border border-gray-200 bg-gray-50 p-4">
                          <div className="mb-4 flex items-center justify-between">
                            <div>
                              <p className="text-sm font-black">Live session</p>
                              <p className="mt-1 text-xs font-medium text-gray-500">Session: funnelbot-{storeName || "store"}</p>
                            </div>
                            <Wifi className={cn("h-5 w-5", whatsappStatus === "connected" ? "text-[#25D366]" : "text-gray-400")} />
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-center">
                            {[
                              ["QR", whatsappStatus !== "idle"],
                              ["Socket", whatsappStatus === "connected"],
                              ["Bot", whatsappStatus === "connected"],
                            ].map(([label, ok]) => (
                              <div key={String(label)} className="rounded-2xl bg-white p-3">
                                {ok ? <CheckCircle2 className="mx-auto h-4 w-4 text-[#25D366]" /> : <CircleDashed className="mx-auto h-4 w-4 text-gray-300" />}
                                <p className="mt-1 text-[11px] font-black text-gray-600">{label}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <PrimaryButton onClick={connectWhatsApp} loading={whatsappStatus === "pairing"}>
                            {whatsappStatus === "connected" ? "Reconnect" : "Connect WhatsApp"}
                            <RefreshCw className="h-4 w-4" />
                          </PrimaryButton>
                          {whatsappStatus === "connected" && (
                            <button onClick={() => setWhatsappStatus("idle")} className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-black text-gray-600 transition hover:border-red-200 hover:text-red-600">
                              Reset
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="rounded-[2rem] bg-[#075E54] p-4 text-white shadow-2xl shadow-emerald-900/20">
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Camera className="h-4 w-4 opacity-80" />
                            <span className="text-xs font-bold opacity-80">Scan with WhatsApp</span>
                          </div>
                          <MessageCircle className="h-5 w-5 opacity-70" />
                        </div>
                        <div className="flex min-h-[310px] items-center justify-center rounded-[1.5rem] bg-[#ECE5DD] p-5">
                          <motion.div
                            animate={whatsappStatus === "pairing" ? { scale: [1, 1.035, 1] } : { scale: 1 }}
                            transition={{ duration: 1, repeat: whatsappStatus === "pairing" ? Infinity : 0 }}
                            className="relative flex h-56 w-56 items-center justify-center rounded-3xl bg-white text-gray-900 shadow-xl"
                          >
                            <QrCode className="h-36 w-36" />
                            {whatsappStatus === "connected" && (
                              <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-white/92">
                                <div className="text-center">
                                  <CheckCircle2 className="mx-auto h-14 w-14 text-[#25D366]" />
                                  <p className="mt-3 text-sm font-black text-gray-950">Session connected</p>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        </div>
                        <p className="mt-4 text-center text-xs font-semibold text-white/70">Real QR endpoint can plug into Evolution API without changing this UX.</p>
                      </div>
                    </div>
                  </Panel>
                )}

                {step === 3 && (
                  <Panel>
                    <div className="mb-7 flex items-start justify-between gap-5">
                      <div>
                        <p className="text-sm font-black text-[#25D366]">Step 3</p>
                        <h2 className="mt-2 text-2xl font-black">Products setup</h2>
                        <p className="mt-2 text-sm font-medium text-gray-500">زيد المنتجات والمدن باش البوت يعرف الثمن والتوصيل والدفع عند الاستلام.</p>
                      </div>
                      <button onClick={() => setProducts((current) => [...current, emptyProduct()])} className="inline-flex items-center gap-2 rounded-2xl bg-gray-950 px-4 py-3 text-sm font-black text-white transition hover:bg-gray-800">
                        <Plus className="h-4 w-4" />
                        Product
                      </button>
                    </div>

                    <div className="space-y-4">
                      {products.map((product, index) => (
                        <div key={product.id} className="rounded-[1.5rem] border border-gray-200 bg-white p-4">
                          <div className="mb-4 flex items-center justify-between">
                            <p className="text-sm font-black">Product {index + 1}</p>
                            {products.length > 1 && (
                              <button onClick={() => setProducts((current) => current.filter((item) => item.id !== product.id))} className="rounded-xl p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                          <div className="grid gap-4 md:grid-cols-3">
                            <div>
                              <FieldLabel>Name</FieldLabel>
                              <TextInput value={product.name} onChange={(event) => updateProduct(product.id, { name: event.target.value })} placeholder="Blue de Chanel" />
                            </div>
                            <div>
                              <FieldLabel>Product price</FieldLabel>
                              <TextInput type="number" min="0" dir="ltr" value={product.price} onChange={(event) => updateProduct(product.id, { price: event.target.value })} placeholder="349" />
                            </div>
                            <div>
                              <FieldLabel>Delivery price</FieldLabel>
                              <TextInput type="number" min="0" dir="ltr" value={product.deliveryPrice} onChange={(event) => updateProduct(product.id, { deliveryPrice: event.target.value })} placeholder="25" />
                            </div>
                          </div>

                          <div className="mt-4">
                            <FieldLabel>Supported cities</FieldLabel>
                            <div className="flex flex-wrap gap-2">
                              {cityOptions.map((city) => {
                                const active = product.cities.includes(city);
                                return (
                                  <button
                                    key={city}
                                    onClick={() => toggleCity(product.id, city)}
                                    className={cn("rounded-full border px-3 py-1.5 text-xs font-black transition", active ? "border-[#25D366] bg-green-50 text-green-700" : "border-gray-200 bg-white text-gray-500 hover:border-green-200")}
                                  >
                                    {city}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <button
                            onClick={() => updateProduct(product.id, { codEnabled: !product.codEnabled })}
                            className={cn("mt-4 flex w-full items-center justify-between rounded-2xl border px-4 py-3 transition", product.codEnabled ? "border-green-200 bg-green-50 text-green-800" : "border-gray-200 bg-gray-50 text-gray-500")}
                          >
                            <span className="flex items-center gap-2 text-sm font-black">
                              <Wallet className="h-4 w-4" />
                              Cash on delivery
                            </span>
                            <span className={cn("h-6 w-11 rounded-full p-1 transition", product.codEnabled ? "bg-[#25D366]" : "bg-gray-300")}>
                              <span className={cn("block h-4 w-4 rounded-full bg-white transition", product.codEnabled ? "translate-x-0" : "-translate-x-5")} />
                            </span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </Panel>
                )}

                {step === 4 && (
                  <Panel>
                    <div className="mb-7 flex items-start justify-between gap-5">
                      <div>
                        <p className="text-sm font-black text-[#25D366]">Step 4</p>
                        <h2 className="mt-2 text-2xl font-black">AI assistant configuration</h2>
                        <p className="mt-2 text-sm font-medium text-gray-500">هنا كنحدد كيفاش يجاوب البوت وبأي لغة وبأي قواعد.</p>
                      </div>
                      <div className="hidden h-14 w-14 items-center justify-center rounded-3xl bg-green-50 text-[#25D366] sm:flex">
                        <Bot className="h-6 w-6" />
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <FieldLabel>Tone of voice</FieldLabel>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {tones.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => setTone(item.id)}
                              className={cn("rounded-2xl border p-4 text-right transition", tone === item.id ? "border-[#25D366] bg-green-50" : "border-gray-200 bg-white hover:border-green-200")}
                            >
                              <p className="text-sm font-black">{item.label}</p>
                              <p className="mt-1 text-xs font-medium text-gray-500">{item.desc}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <FieldLabel>Reply language</FieldLabel>
                        <div className="grid gap-3 sm:grid-cols-3">
                          {[
                            ["darija", "Darija"],
                            ["french", "French"],
                            ["both", "Darija + French"],
                          ].map(([id, label]) => (
                            <button
                              key={id}
                              onClick={() => setReplyMode(id as "darija" | "french" | "both")}
                              className={cn("rounded-2xl border px-4 py-3 text-sm font-black transition", replyMode === id ? "border-[#25D366] bg-green-50 text-green-700" : "border-gray-200 bg-white text-gray-600 hover:border-green-200")}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <FieldLabel>Business description</FieldLabel>
                        <TextArea rows={4} value={businessDescription} onChange={(event) => setBusinessDescription(event.target.value)} placeholder="شنو كيباع؟ شنو كيميز البراند؟ شنو خاص البوت يعرف قبل ما يجاوب؟" />
                      </div>

                      <div>
                        <FieldLabel>Custom instructions</FieldLabel>
                        <TextArea rows={4} value={customInstructions} onChange={(event) => setCustomInstructions(event.target.value)} placeholder="مثال: أكد الطلب قبل الشحن، متعطيش تخفيض إلا كان مكتوب، سول على المدينة والكمية..." />
                      </div>
                    </div>
                  </Panel>
                )}

                {step === 5 && (
                  <Panel className="overflow-hidden text-center">
                    <motion.div
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.55, ease }}
                      className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#25D366] to-emerald-400 shadow-2xl shadow-green-200"
                    >
                      <motion.span
                        className="absolute inset-0 rounded-full border border-[#25D366]"
                        animate={{ scale: [1, 1.42], opacity: [0.45, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                      />
                      <CheckCircle2 className="h-14 w-14 text-white" />
                    </motion.div>
                    <p className="text-sm font-black text-[#25D366]">Setup complete</p>
                    <h2 className="mt-3 text-3xl font-black">Your WhatsApp bot is ready</h2>
                    <p className="mx-auto mt-4 max-w-xl text-sm font-medium leading-7 text-gray-500">
                      تم إنشاء المتجر، المنتجات، مناطق التوصيل، والأسئلة الافتراضية. دابا تقدر تدخل للوحة التحكم وتكمل الربط الحقيقي مع Evolution API.
                    </p>
                    <div className="mx-auto mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
                      {[
                        [BadgeCheck, "Store ready"],
                        [MessageCircle, "WhatsApp session"],
                        [Zap, "AI configured"],
                      ].map(([Icon, label]) => {
                        const ReadyIcon = Icon as typeof BadgeCheck;
                        return (
                          <div key={String(label)} className="rounded-2xl border border-green-100 bg-green-50 p-4">
                            <ReadyIcon className="mx-auto h-5 w-5 text-[#25D366]" />
                            <p className="mt-2 text-xs font-black text-gray-700">{String(label)}</p>
                          </div>
                        );
                      })}
                    </div>
                    <Link href="/dashboard" className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-gray-950 px-6 py-3 text-sm font-black text-white shadow-xl shadow-gray-200 transition hover:-translate-y-0.5 hover:bg-gray-800">
                      Open dashboard
                      <ChevronLeft className="h-4 w-4" />
                    </Link>
                  </Panel>
                )}
              </motion.div>
            </AnimatePresence>

            {error && step < 5 && (
              <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                {error}
              </div>
            )}

            {step < 5 && (
              <div className="mt-5 flex items-center justify-between gap-3">
                <button
                  onClick={() => setStep((current) => Math.max(1, current - 1))}
                  disabled={step === 1 || saving}
                  className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white/80 px-5 py-3 text-sm font-black text-gray-600 shadow-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                  Back
                </button>
                <PrimaryButton onClick={next} disabled={!canContinue} loading={saving}>
                  {step === 4 ? "Finish setup" : "Continue"}
                  {!saving && <ChevronLeft className="h-4 w-4" />}
                </PrimaryButton>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
