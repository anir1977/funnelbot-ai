import type { SupabaseClient } from "@supabase/supabase-js";

type Store = {
  id: string;
  name: string;
  bot_tone: string;
  welcome_message: string | null;
};

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number | string;
  stock: number;
  category: string | null;
};

type DeliveryZone = {
  city: string;
  price: number | string;
  delivery_time: string;
  cod_enabled: boolean;
};

type Faq = {
  id: string;
  question: string;
  answer: string;
  hit_count?: number | null;
};

type Message = {
  role: "user" | "bot" | "agent";
  body: string;
  created_at: string;
};

type ReplyContext = {
  store: Store;
  customerPhone: string;
  latestText: string;
  messages: Message[];
  products: Product[];
  deliveryZones: DeliveryZone[];
  faqs: Faq[];
};

function money(value: number | string | null | undefined) {
  return `${new Intl.NumberFormat("fr-MA", { maximumFractionDigits: 0 }).format(Number(value ?? 0))} درهم`;
}

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/\s+/g, " ")
    .trim();
}

function includesAny(text: string, words: string[]) {
  const normalized = normalizeText(text);
  return words.some((word) => normalized.includes(normalizeText(word)));
}

function tokens(text: string) {
  return normalizeText(text)
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1);
}

function findProduct(text: string, products: Product[]) {
  const normalized = normalizeText(text);
  const textTokens = new Set(tokens(text));

  const scored = products
    .map((product) => {
      const productName = normalizeText(product.name);
      const productTokens = tokens(product.name);
      const score = normalized.includes(productName)
        ? 100
        : productTokens.reduce((sum, token) => sum + (textTokens.has(token) ? 1 : 0), 0);
      return { product, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored[0]?.product ?? products[0] ?? null;
}

function findCity(text: string, zones: DeliveryZone[]) {
  const normalized = normalizeText(text);
  const aliases: Record<string, string[]> = {
    "الدار البيضاء": ["الدار البيضاء", "دار البيضاء", "كازا", "كازابلانكا", "casablanca", "casa"],
    "الرباط": ["الرباط", "rabat"],
    "مراكش": ["مراكش", "marrakech", "marrakesh"],
    "فاس": ["فاس", "fes", "fez"],
    "طنجة": ["طنجة", "tanger", "tangier"],
    "أكادير": ["اكادير", "agadir"],
    "سلا": ["سلا", "sale", "salé"],
  };

  return zones.find((zone) => {
    const names = [zone.city, ...(aliases[zone.city] ?? aliases[normalizeText(zone.city)] ?? [])];
    return names.some((name) => normalized.includes(normalizeText(name)));
  }) ?? null;
}

function cleanField(value: string) {
  return value
    .replace(/\s+/g, " ")
    .replace(/^(هو|هي|ديالي|:|-)+\s*/i, "")
    .replace(/[،,.;]+$/g, "")
    .trim();
}

function extractBetween(text: string, starts: string[], stops: string[]) {
  const startPattern = starts.map((item) => item.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const stopPattern = stops.map((item) => item.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const regex = new RegExp(`(?:${startPattern})\\s*[:：-]?\\s*(.+?)(?=\\s+(?:${stopPattern})\\s*[:：-]?|$)`, "i");
  const match = text.match(regex);
  return match?.[1] ? cleanField(match[1]) : "";
}

function extractName(text: string) {
  return extractBetween(text, ["سميتي", "اسمي", "الاسم", "smiya", "smiyti", "name", "nom"], ["المدينة", "المدينه", "العنوان", "الهاتف", "التلفون", "telephone", "tel", "رقم", "المنتج", "produit", "adresse", "address", "ville", "city", "phone"]);
}

function extractAddress(text: string) {
  return extractBetween(text, ["العنوان بالتفصيل", "العنوان", "adresse", "address"], ["الهاتف", "التلفون", "telephone", "tel", "رقم", "المنتج", "produit", "الكمية", "quantity"]);
}

function extractPhone(text: string, fallback: string) {
  const explicit = extractBetween(text, ["الهاتف", "التلفون", "رقم الهاتف", "phone", "tel", "telephone"], ["المنتج", "العنوان", "المدينة", "الكمية", "quantity"]);
  const source = explicit || text;
  const match = source.match(/(?:\+?212|0)?[ \-.]?[5-7](?:[ \-.]?\d){8}/);
  if (!match) return fallback;
  const digits = match[0].replace(/\D/g, "");
  if (digits.startsWith("212")) return digits;
  if (digits.startsWith("0")) return `212${digits.slice(1)}`;
  return `212${digits}`;
}

function extractQuantity(text: string) {
  const match = text.match(/(?:الكمية|quantity|qte)\s*[:：-]?\s*(\d+)/i);
  return Math.max(1, Number(match?.[1] ?? 1) || 1);
}

function orderIntent(text: string) {
  return includesAny(text, ["بغيت", "نطلب", "نخد", "نشري", "commande", "acheter", "buy", "confirm", "كنأكد", "أكد", "نعم", "المعلومات صحيحة", "الاسم", "smiya", "العنوان", "address", "الهاتف", "telephone"]);
}

function faqReply(text: string, faqs: Faq[]) {
  const normalized = text.toLowerCase();
  return faqs.find((faq) => {
    const questionWords = faq.question.toLowerCase().split(/\s+/).filter((word) => word.length > 2);
    return questionWords.some((word) => normalized.includes(word));
  });
}

async function createOrderIfReady(supabase: SupabaseClient, ctx: ReplyContext, product: Product, zone: DeliveryZone | null) {
  const fullText = ctx.messages.map((message) => message.body).join("\n") + "\n" + ctx.latestText;
  const name = extractName(fullText);
  const address = extractAddress(fullText);
  const city = findCity(fullText, ctx.deliveryZones);
  const confirmed = includesAny(ctx.latestText, ["نعم", "oui", "confirm", "كنأكد", "موافق", "ok"]);
  const phone = extractPhone(fullText, ctx.customerPhone);
  const quantity = extractQuantity(fullText);

  if (!name) return { created: false, missing: "name" as const };
  if (!city) return { created: false, missing: "city" as const };
  if (!address) return { created: false, missing: "address" as const };
  if (!confirmed) return { created: false, missing: "confirmation" as const };

  const delivery = zone ?? city;
  const { data: existing } = await supabase
    .from("orders")
    .select("id")
    .eq("store_id", ctx.store.id)
    .eq("customer_phone", phone)
    .eq("status", "new")
    .limit(1);

  if (existing?.length) return { created: false, missing: null };

  const { error } = await supabase.from("orders").insert({
    store_id: ctx.store.id,
    product_id: product.id,
    customer_name: name,
    customer_phone: phone,
    customer_city: delivery.city,
    product_snapshot: {
      name: product.name,
      price: Number(product.price),
      address,
    },
    quantity,
    unit_price: Number(product.price),
    delivery_fee: Number(delivery.price),
    status: "new",
    notes: `Created by WhatsApp bot. Address: ${address}`,
  });

  if (error) throw error;
  return { created: true, missing: null };
}

async function geminiReply(ctx: ReplyContext, fallback: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return fallback;

  const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";
  const products = ctx.products.map((product) => `${product.name}: ${money(product.price)} (${product.stock} stock)`).join("\n");
  const delivery = ctx.deliveryZones.map((zone) => `${zone.city}: ${money(zone.price)}, ${zone.delivery_time}, COD ${zone.cod_enabled ? "yes" : "no"}`).join("\n");
  const history = ctx.messages.slice(-8).map((message) => `${message.role}: ${message.body}`).join("\n");

  const prompt = `
You are FunnelsLibrary, a WhatsApp sales assistant for a Moroccan ecommerce store.
Store: ${ctx.store.name}
Tone: ${ctx.store.bot_tone}
Instructions:
${ctx.store.welcome_message || "Reply in Moroccan Darija by default. Be helpful, concise, and collect missing order details."}

Products:
${products || "No products configured."}

Delivery:
${delivery || "No delivery zones configured."}

Conversation:
${history}
customer: ${ctx.latestText}

Reply in Moroccan Darija unless the customer writes French. Do not invent prices or delivery cities.
`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.35, maxOutputTokens: 260 },
    }),
  });

  if (!response.ok) return fallback;
  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || fallback;
}

export async function buildBotReply(supabase: SupabaseClient, ctx: ReplyContext) {
  const text = ctx.latestText;
  const product = findProduct(text, ctx.products);
  const city = findCity(text, ctx.deliveryZones);
  const faq = faqReply(text, ctx.faqs);

  let fallback = "";
  let lockReply = false;

  if (orderIntent(text) && product) {
    lockReply = true;
    const order = await createOrderIfReady(supabase, ctx, product, city);
    if (order.created) {
      const delivery = city ?? ctx.deliveryZones[0];
      fallback = `تم تسجيل طلبك بنجاح ✅\n\nالمنتج: ${product.name}\nالثمن: ${money(product.price)}\nالتوصيل: ${delivery ? money(delivery.price) : "حسب المدينة"}\nالدفع عند الاستلام: نعم\n\nغادي يتواصل معك الفريق لتأكيد الشحن.`;
    } else if (order.missing === "name") {
      fallback = `أكيد، نقدر نوجد لك طلب ${product.name} ✅\nعطيني من فضلك الاسم الكامل ديالك.`;
    } else if (order.missing === "city") {
      fallback = `مزيان. فاش من مدينة بغيتي التوصيل؟\nالمدن المتوفرة: ${ctx.deliveryZones.map((zone) => zone.city).join("، ") || "زيد المدن من لوحة التحكم"}.`;
    } else if (order.missing === "address") {
      fallback = "باقي خاصني العنوان بالتفصيل باش نكمل الطلب.";
    } else if (order.missing === "confirmation") {
      const delivery = city ?? ctx.deliveryZones[0];
      const quantity = extractQuantity(ctx.messages.map((message) => message.body).join("\n") + "\n" + ctx.latestText);
      const total = Number(product.price) * quantity + Number(delivery?.price ?? 0);
      fallback = `واخا. هادي تفاصيل الطلب:\n\n${product.name}\nثمن المنتج: ${money(product.price)}\nالتوصيل: ${delivery ? `${delivery.city} - ${money(delivery.price)}` : "حسب المدينة"}\nالمجموع: ${money(total)}\n\nإلى كانت المعلومات صحيحة جاوبني ب "نعم" باش نأكد الطلب COD.`;
    } else {
      fallback = "كاين طلب مفتوح عندنا باسمك. غادي يتراجع من لوحة التحكم.";
    }
  } else if (product && includesAny(text, ["ثمن", "شحال", "price", "prix", "متوفر"])) {
    fallback = `${product.name} متوفر بثمن ${money(product.price)} ✅\n${product.description ? `${product.description}\n` : ""}بغيتي نأكد لك طلب بالدفع عند الاستلام؟`;
  } else if (city && includesAny(text, ["توصيل", "livraison", "delivery", "مدينة"])) {
    fallback = `التوصيل ل${city.city}: ${money(city.price)}، المدة ${city.delivery_time}.${city.cod_enabled ? "\nالدفع عند الاستلام متوفر ✅" : "\nCOD غير مفعل فهاد المدينة حالياً."}`;
  } else if (faq) {
    fallback = faq.answer;
    await supabase.from("faqs").update({ hit_count: Number(faq.hit_count ?? 0) + 1 }).eq("id", faq.id);
  } else if (ctx.products.length > 0) {
    fallback = `مرحبا بك في ${ctx.store.name} 💚\n\nنقدر نعاونك فالثمن، التوصيل، وتأكيد الطلب.\nالمنتجات المتوفرة دابا:\n${ctx.products.slice(0, 5).map((item) => `• ${item.name} - ${money(item.price)}`).join("\n")}\n\nشنو المنتج اللي مهتم به؟`;
  } else {
    fallback = `مرحبا بك في ${ctx.store.name} 💚\nالبوت جاهز، غير باقي خاص المتجر يزيد المنتجات من لوحة التحكم باش نعطيك تفاصيل دقيقة.`;
  }

  if (lockReply) return fallback;
  return geminiReply(ctx, fallback);
}
