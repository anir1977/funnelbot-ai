"use client";

import { useEffect, useRef, useState } from "react";
import {
  Search, Send, Plus, MessageCircle, Loader2,
  Bot, User, Headphones, ChevronRight, Clock,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

// ── Types ─────────────────────────────────────────────────────────────────────

type Conversation = {
  id: string;
  store_id: string;
  customer_phone: string;
  customer_name: string | null;
  last_message_at: string | null;
  unread_count: number;
  status: "open" | "resolved";
  created_at: string;
  updated_at: string;
};

type Message = {
  id: string;
  conversation_id: string;
  role: "user" | "bot" | "agent";
  body: string;
  read: boolean;
  created_at: string;
};

// ── Config ────────────────────────────────────────────────────────────────────

const ROLE_CFG: Record<
  Message["role"],
  { bubbleBg: string; bubbleText: string; align: "left" | "right"; Icon: React.ElementType }
> = {
  user:  { bubbleBg: "bg-white border border-gray-200",  bubbleText: "text-gray-800", align: "left",  Icon: User       },
  bot:   { bubbleBg: "bg-[#dcf8c6]",                     bubbleText: "text-gray-800", align: "right", Icon: Bot        },
  agent: { bubbleBg: "bg-blue-500",                      bubbleText: "text-white",    align: "right", Icon: Headphones },
};

const AVATAR_COLORS = [
  "from-green-400 to-emerald-600",  "from-pink-400 to-rose-500",
  "from-blue-400 to-indigo-500",    "from-amber-400 to-orange-500",
  "from-violet-400 to-purple-500",  "from-teal-400 to-cyan-500",
];

// ── Test conversation seed data ───────────────────────────────────────────────

const TEST_CONV_PAYLOAD = {
  customer_name:   "أيوب المعروف",
  customer_phone:  "+212612345678",
  status:          "open" as const,
  unread_count:    1,
};

const TEST_MESSAGES: { role: Message["role"]; body: string }[] = [
  { role: "user",  body: "السلام عليكم، بغيت نعرف شحال ثمن البارفان ديالكم" },
  { role: "bot",   body: "وعليكم السلام! عندنا بارفانات من 180 درهم لـ 450 درهم حسب الحجم. شنو بغيتي تشري؟" },
  { role: "user",  body: "باغي واحد 100ml، كيفاش الطلب؟" },
  { role: "bot",   body: "بساهل! عطيني اسمك والمدينة ديالك وغادي نكملو الطلب فالحال." },
  { role: "agent", body: "مرحباً، أنا هنا باش نساعدك. واش عندك أي سؤال آخر؟" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function relativeTime(iso: string | null): string {
  if (!iso) return "";
  const diff  = Date.now() - new Date(iso).getTime();
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days  = Math.floor(diff / 86_400_000);
  if (mins  < 1)  return "الآن";
  if (mins  < 60) return `${mins} د`;
  if (hours < 24) return `${hours} س`;
  if (days  < 7)  return `${days} يوم`;
  return new Date(iso).toLocaleDateString("ar-MA", { day: "numeric", month: "short" });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("ar-MA", { hour: "2-digit", minute: "2-digit" });
}

function avatarColor(id: string): string {
  return AVATAR_COLORS[id.charCodeAt(0) % AVATAR_COLORS.length];
}

function initial(name: string | null, phone: string): string {
  return name?.trim()[0]?.toUpperCase() ?? phone[1] ?? "؟";
}

// ── ConvItem ──────────────────────────────────────────────────────────────────

function ConvItem({
  conv, selected, onClick,
}: {
  conv: Conversation;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3.5 text-right transition-colors ${
        selected ? "bg-[#25D366]/10 border-r-2 border-[#25D366]" : "hover:bg-gray-50"
      }`}
    >
      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColor(conv.id)} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
        {initial(conv.customer_name, conv.customer_phone)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1 mb-0.5">
          <p className="text-sm font-bold text-gray-900 truncate">
            {conv.customer_name ?? conv.customer_phone}
          </p>
          <span className="text-[10px] text-gray-400 shrink-0">
            {relativeTime(conv.last_message_at ?? conv.updated_at)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-1">
          <p className="text-xs text-gray-500 truncate font-mono" dir="ltr">{conv.customer_phone}</p>
          {conv.unread_count > 0 && (
            <span className="bg-[#25D366] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shrink-0 min-w-[18px] text-center">
              {conv.unread_count}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

// ── MessageBubble ─────────────────────────────────────────────────────────────

function MessageBubble({ msg }: { msg: Message }) {
  const cfg     = ROLE_CFG[msg.role];
  const isRight = cfg.align === "right";

  return (
    <div className={`flex items-end gap-2 ${isRight ? "flex-row-reverse" : "flex-row"}`}>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mb-1 ${
        msg.role === "user"  ? "bg-gray-300"   :
        msg.role === "bot"   ? "bg-[#25D366]"  : "bg-blue-500"
      }`}>
        <cfg.Icon className="w-3 h-3 text-white" />
      </div>
      <div className={`max-w-[72%] px-3.5 py-2.5 rounded-2xl shadow-sm ${cfg.bubbleBg} ${
        isRight ? "rounded-br-sm" : "rounded-bl-sm"
      }`}>
        <p className={`text-sm leading-relaxed ${cfg.bubbleText}`}>{msg.body}</p>
        <p className={`text-[10px] mt-1 ${
          isRight ? "text-left" : "text-right"
        } ${msg.role === "agent" ? "text-blue-200" : "text-gray-400"}`} dir="ltr">
          {formatTime(msg.created_at)}
        </p>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ConversationsClient({
  storeId,
  initialConversations,
}: {
  storeId: string;
  initialConversations: Conversation[];
}) {
  const [conversations,  setConversations]  = useState<Conversation[]>(initialConversations);
  const [messagesCache,  setMessagesCache]  = useState<Record<string, Message[]>>({});
  const [selectedId,     setSelectedId]     = useState<string | null>(initialConversations[0]?.id ?? null);
  const [search,         setSearch]         = useState("");
  const [composer,       setComposer]       = useState("");
  const [loadingMsgs,    setLoadingMsgs]    = useState(false);
  const [sending,        setSending]        = useState(false);
  const [creatingTest,   setCreatingTest]   = useState(false);
  const [showThread,     setShowThread]     = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const composerRef    = useRef<HTMLTextAreaElement>(null);

  const selectedConv = conversations.find(c => c.id === selectedId) ?? null;
  const currentMsgs  = selectedId ? (messagesCache[selectedId] ?? []) : [];

  const filtered = conversations.filter(c => {
    const q = search.toLowerCase();
    return !q
      || (c.customer_name ?? "").toLowerCase().includes(q)
      || c.customer_phone.includes(search);
  });

  // ── Scroll to bottom on new messages ──────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMsgs.length]);

  // ── Load messages when conversation selected (cached after first load) ────
  useEffect(() => {
    if (!selectedId || messagesCache[selectedId] !== undefined) return;

    const load = async () => {
      setLoadingMsgs(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from("messages")
        .select("id, conversation_id, role, body, read, created_at")
        .eq("conversation_id", selectedId)
        .order("created_at", { ascending: true });

      setLoadingMsgs(false);
      if (error) {
        console.error("[conversations] load messages error:", error);
        return;
      }
      setMessagesCache(prev => ({ ...prev, [selectedId]: (data ?? []) as Message[] }));
    };
    load();
  }, [selectedId]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Select conversation ────────────────────────────────────────────────────
  const selectConv = (id: string) => {
    setSelectedId(id);
    setShowThread(true);
    setConversations(cs => cs.map(c => c.id === id ? { ...c, unread_count: 0 } : c));
  };

  // ── Send agent message ─────────────────────────────────────────────────────
  const handleSend = async () => {
    const body = composer.trim();
    if (!body || !selectedId || sending) return;

    setSending(true);
    setComposer("");

    const supabase = createClient();
    const tempId   = `temp-${Date.now()}`;

    // Optimistic insert
    const tempMsg: Message = {
      id: tempId, conversation_id: selectedId,
      role: "agent", body, read: true,
      created_at: new Date().toISOString(),
    };
    setMessagesCache(prev => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] ?? []), tempMsg],
    }));

    const { data, error } = await supabase
      .from("messages")
      .insert({ conversation_id: selectedId, role: "agent", body })
      .select("id, conversation_id, role, body, read, created_at")
      .single();

    if (error) {
      console.error("[conversations] send error:", error);
      setMessagesCache(prev => ({
        ...prev,
        [selectedId]: (prev[selectedId] ?? []).filter(m => m.id !== tempId),
      }));
      setComposer(body);
    } else {
      // Replace temp with persisted row
      setMessagesCache(prev => ({
        ...prev,
        [selectedId]: (prev[selectedId] ?? []).map(m => m.id === tempId ? (data as Message) : m),
      }));
      setConversations(cs => cs.map(c =>
        c.id === selectedId ? { ...c, updated_at: (data as Message).created_at } : c
      ));
    }

    setSending(false);
    composerRef.current?.focus();
  };

  // ── Create test conversation ───────────────────────────────────────────────
  const handleCreateTest = async () => {
    setCreatingTest(true);
    const supabase = createClient();

    const { data: conv, error: convErr } = await supabase
      .from("conversations")
      .insert({
        store_id:        storeId,
        ...TEST_CONV_PAYLOAD,
        last_message_at: new Date().toISOString(),
      })
      .select("id, store_id, customer_phone, customer_name, last_message_at, unread_count, status, created_at, updated_at")
      .single();

    if (convErr) {
      console.error("[conversations] create test error:", convErr);
      alert(`فشل إنشاء المحادثة: ${convErr.message}`);
      setCreatingTest(false);
      return;
    }

    const { data: msgs, error: msgsErr } = await supabase
      .from("messages")
      .insert(TEST_MESSAGES.map(m => ({ conversation_id: conv.id, ...m, read: m.role !== "agent" })))
      .select("id, conversation_id, role, body, read, created_at");

    if (msgsErr) console.error("[conversations] seed messages error:", msgsErr);

    setConversations(prev => [conv as Conversation, ...prev]);
    setMessagesCache(prev => ({ ...prev, [conv.id]: (msgs ?? []) as Message[] }));
    setSelectedId(conv.id);
    setShowThread(true);
    setCreatingTest(false);
  };

  // ──────────────────────────────────────────────────────────────────────────

  return (
    <div
      className="flex rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-white"
      style={{ height: "calc(100vh - 6.5rem)" }}
    >

      {/* ── LEFT: Conversation list ────────────────────────────────────────── */}
      <div className={`flex flex-col w-full sm:w-80 lg:w-96 border-l border-gray-100 bg-white shrink-0 ${showThread ? "hidden sm:flex" : "flex"}`}>

        {/* Header + search */}
        <div className="p-3 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-sm font-black text-gray-900 flex-1">المحادثات</h2>
            <span className="text-xs bg-gray-100 text-gray-500 font-bold px-2 py-0.5 rounded-full">
              {conversations.length}
            </span>
          </div>
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث باسم أو هاتف..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pr-9 pl-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366] transition-all"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
          {search && filtered.length === 0 && (
            <p className="text-xs text-gray-400 text-center py-10">لا توجد نتائج</p>
          )}
          {filtered.map(conv => (
            <ConvItem
              key={conv.id}
              conv={conv}
              selected={selectedId === conv.id}
              onClick={() => selectConv(conv.id)}
            />
          ))}

          {conversations.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-7 h-7 text-gray-300" />
              </div>
              <p className="text-gray-600 font-semibold text-sm mb-1">لا توجد محادثات بعد</p>
              <p className="text-xs text-gray-400 mb-5 leading-relaxed">
                ستظهر محادثات زبنائك هنا بعد تفعيل البوت
              </p>
              <button
                onClick={handleCreateTest}
                disabled={creatingTest}
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1fb954] disabled:opacity-60 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-green-200 transition-all"
              >
                {creatingTest ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                إنشاء محادثة تجريبية
              </button>
            </div>
          )}
        </div>

        {/* Add test button (when conversations exist) */}
        {conversations.length > 0 && (
          <div className="p-3 border-t border-gray-100 shrink-0">
            <button
              onClick={handleCreateTest}
              disabled={creatingTest}
              className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-gray-500 hover:text-[#25D366] bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-[#25D366]/30 py-2.5 rounded-xl transition-colors disabled:opacity-50"
            >
              {creatingTest ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
              إضافة محادثة تجريبية
            </button>
          </div>
        )}
      </div>

      {/* ── RIGHT: Thread panel ────────────────────────────────────────────── */}
      <div className={`flex-1 flex flex-col min-w-0 bg-[#f0f2f5] ${showThread ? "flex" : "hidden sm:flex"}`}>

        {!selectedConv ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-[#f0f2f5]">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <MessageCircle className="w-10 h-10 text-gray-300" />
            </div>
            <p className="text-gray-600 font-bold mb-1">اختر محادثة</p>
            <p className="text-sm text-gray-400">اضغط على أي محادثة لعرض الرسائل</p>
          </div>
        ) : (
          <>
            {/* Thread header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 bg-white shrink-0">
              <button
                onClick={() => setShowThread(false)}
                className="sm:hidden p-1.5 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColor(selectedConv.id)} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                {initial(selectedConv.customer_name, selectedConv.customer_phone)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {selectedConv.customer_name ?? selectedConv.customer_phone}
                </p>
                <p className="text-xs text-gray-400 font-mono truncate" dir="ltr">
                  {selectedConv.customer_phone}
                </p>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${
                selectedConv.status === "open"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-500"
              }`}>
                {selectedConv.status === "open" ? "مفتوح" : "مغلق"}
              </span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {loadingMsgs ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                </div>
              ) : currentMsgs.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
                  <Clock className="w-7 h-7 opacity-40" />
                  <p className="text-sm">لا توجد رسائل في هذه المحادثة</p>
                </div>
              ) : (
                currentMsgs.map(msg => <MessageBubble key={msg.id} msg={msg} />)
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Composer */}
            <div className="p-3 bg-white border-t border-gray-200 shrink-0">
              <div className="flex items-end gap-2">
                <textarea
                  ref={composerRef}
                  value={composer}
                  onChange={e => setComposer(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="اكتب رسالة كوكيل... (Enter للإرسال)"
                  rows={1}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366] transition-all resize-none"
                  style={{ maxHeight: "6rem" }}
                />
                <button
                  onClick={handleSend}
                  disabled={!composer.trim() || sending}
                  className="w-10 h-10 bg-[#25D366] hover:bg-[#1fb954] disabled:opacity-40 text-white rounded-xl flex items-center justify-center shrink-0 transition-colors"
                >
                  {sending
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : <Send    className="w-4 h-4" />
                  }
                </button>
              </div>
              <p className="text-[10px] text-gray-400 mt-1.5 mr-1">
                الرسائل المرسلة من هنا تظهر كـ &quot;وكيل&quot; في سجل المحادثة
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
