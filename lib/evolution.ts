type EvolutionMethod = "GET" | "POST" | "PUT" | "DELETE";

export type EvolutionSession = {
  instanceName: string;
  state: string;
  qrCode?: string | null;
  pairingCode?: string | null;
  raw?: unknown;
};

function baseUrl() {
  const url = process.env.EVOLUTION_API_URL;
  if (!url) throw new Error("Missing EVOLUTION_API_URL.");
  return url.replace(/\/+$/, "");
}

function apiKey() {
  const key = process.env.EVOLUTION_API_KEY;
  if (!key) throw new Error("Missing EVOLUTION_API_KEY.");
  return key;
}

function publicBaseUrl() {
  return (process.env.NEXT_PUBLIC_APP_URL || process.env.APP_BASE_URL || "").replace(/\/+$/, "");
}

export function instanceNameForStore(storeId: string) {
  const clean = storeId.replace(/-/g, "");
  return `fl_${clean.slice(0, 18)}`;
}

export function qrImageUrl(qrCode?: string | null) {
  if (!qrCode) return null;
  if (qrCode.startsWith("data:image")) return qrCode;
  if (/^https?:\/\//.test(qrCode)) return qrCode;
  return `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(qrCode)}`;
}

async function evolutionFetch<T>(path: string, method: EvolutionMethod = "GET", body?: unknown): Promise<T> {
  const response = await fetch(`${baseUrl()}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      apikey: apiKey(),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = typeof data?.message === "string"
      ? data.message
      : Array.isArray(data?.response?.message)
        ? data.response.message.join(", ")
        : `Evolution API error ${response.status}`;
    throw new Error(message);
  }

  return data as T;
}

function extractQr(payload: unknown) {
  const data = payload as Record<string, any>;
  return data?.qrcode?.base64 || data?.qrcode?.code || data?.base64 || data?.qr || data?.code || null;
}

export async function createEvolutionInstance(storeId: string, phone: string) {
  const instanceName = instanceNameForStore(storeId);
  const webhookUrl = publicBaseUrl() ? `${publicBaseUrl()}/api/evolution/webhook` : undefined;

  const payload = {
    instanceName,
    integration: "WHATSAPP-BAILEYS",
    qrcode: true,
    number: phone,
    rejectCall: true,
    msgCall: "هاد الرقم كيتعامل غير بالرسائل. شكراً لتفهمك.",
    groupsIgnore: true,
    alwaysOnline: true,
    readMessages: true,
    readStatus: false,
    syncFullHistory: false,
    webhook: webhookUrl ? {
      url: webhookUrl,
      byEvents: false,
      base64: false,
      headers: {
        authorization: process.env.EVOLUTION_WEBHOOK_SECRET || "",
        "Content-Type": "application/json",
      },
      events: ["QRCODE_UPDATED", "CONNECTION_UPDATE", "MESSAGES_UPSERT", "SEND_MESSAGE"],
    } : undefined,
  };

  try {
    await evolutionFetch("/instance/create", "POST", payload);
  } catch (error) {
    const message = error instanceof Error ? error.message.toLowerCase() : "";
    if (!message.includes("already") && !message.includes("exist") && !message.includes("409")) {
      throw error;
    }
  }

  return connectEvolutionInstance(instanceName, phone);
}

export async function connectEvolutionInstance(instanceName: string, phone?: string): Promise<EvolutionSession> {
  const query = phone ? `?number=${encodeURIComponent(phone)}` : "";
  const data = await evolutionFetch<Record<string, any>>(`/instance/connect/${instanceName}${query}`);
  return {
    instanceName,
    state: "connecting",
    qrCode: extractQr(data),
    pairingCode: data?.pairingCode ?? null,
    raw: data,
  };
}

export async function getEvolutionState(instanceName: string): Promise<EvolutionSession> {
  const data = await evolutionFetch<Record<string, any>>(`/instance/connectionState/${instanceName}`);
  return {
    instanceName,
    state: data?.instance?.state ?? data?.state ?? "unknown",
    raw: data,
  };
}

export async function logoutEvolutionInstance(instanceName: string) {
  return evolutionFetch(`/instance/logout/${instanceName}`, "DELETE");
}

export async function deleteEvolutionInstance(instanceName: string) {
  return evolutionFetch(`/instance/delete/${instanceName}`, "DELETE");
}

export async function sendEvolutionText(instanceName: string, number: string, text: string) {
  return evolutionFetch(`/message/sendText/${instanceName}`, "POST", {
    number,
    text,
    delay: 900,
    linkPreview: false,
  });
}
