export type IncomingWhatsAppMessage = {
  instanceName: string;
  customerPhone: string;
  customerName: string | null;
  text: string;
  messageId: string | null;
  timestamp: string;
  fromMe: boolean;
  isGroup: boolean;
};

function normalizePhone(raw: string) {
  return raw
    .replace(/@s\.whatsapp\.net|@c\.us|@g\.us/g, "")
    .replace(/:\d+$/, "")
    .replace(/\D/g, "");
}

function textFromMessage(message: any): string {
  if (!message) return "";
  return (
    message.conversation ||
    message.extendedTextMessage?.text ||
    message.imageMessage?.caption ||
    message.videoMessage?.caption ||
    message.buttonsResponseMessage?.selectedDisplayText ||
    message.listResponseMessage?.title ||
    message.templateButtonReplyMessage?.selectedDisplayText ||
    ""
  ).trim();
}

export function parseEvolutionWebhook(payload: any): IncomingWhatsAppMessage | null {
  const data = payload?.data ?? payload;
  const key = data?.key ?? payload?.key;
  const remoteJid = key?.remoteJid ?? data?.remoteJid ?? data?.numberId ?? "";
  const instanceName = payload?.instance ?? data?.instance ?? payload?.instanceName ?? data?.instanceName ?? "";
  const fromMe = Boolean(key?.fromMe ?? data?.fromMe);
  const isGroup = String(remoteJid).includes("@g.us");
  const text = textFromMessage(data?.message ?? payload?.message);
  const timestampValue = data?.messageTimestamp ?? payload?.messageTimestamp;
  const timestamp = timestampValue
    ? new Date(Number(timestampValue) * 1000).toISOString()
    : new Date().toISOString();

  if (!instanceName || !remoteJid || !text) return null;

  return {
    instanceName,
    customerPhone: normalizePhone(String(remoteJid)),
    customerName: data?.pushName ?? payload?.pushName ?? null,
    text,
    messageId: key?.id ?? data?.id ?? null,
    timestamp,
    fromMe,
    isGroup,
  };
}
