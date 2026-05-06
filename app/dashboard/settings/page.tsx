"use client";

import { useState } from "react";
import {
  Wifi, FileSpreadsheet, Zap, MessageSquare, CheckCircle2,
  AlertCircle, RefreshCw, ExternalLink, ChevronRight, Shield,
  Bell, Smartphone, Moon, ToggleLeft, ToggleRight, Copy,
} from "lucide-react";

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle}>
      {on
        ? <ToggleRight className="w-8 h-8 text-[#25D366]" />
        : <ToggleLeft className="w-8 h-8 text-gray-300" />
      }
    </button>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const [notif, setNotif]     = useState(true);
  const [nightMode, setNight] = useState(false);
  const [autoReply, setAuto]  = useState(true);
  const [sheetsSync, setSync] = useState(true);
  const [copied, setCopied]   = useState(false);

  const copyToken = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5 max-w-3xl">

      {/* Header */}
      <div>
        <h2 className="text-lg font-black text-gray-900">الإعدادات</h2>
        <p className="text-sm text-gray-500 mt-0.5">ضبط تكاملات البوت وتفضيلات الحساب</p>
      </div>

      {/* WhatsApp connection */}
      <Card>
        <div className="px-5 py-4 border-b border-gray-50">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-[#25D366]" />
            <h3 className="font-bold text-gray-900 text-sm">اتصال واتساب بيزنس</h3>
          </div>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center shadow-md shrink-0">
              <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.117 1.532 5.847L0 24l6.335-1.524A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.88 0-3.636-.491-5.157-1.351l-.37-.217-3.763.906.944-3.668-.241-.386A9.948 9.948 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-bold text-gray-900 text-sm">+212 661 234 567</p>
                <span className="flex items-center gap-1 text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full border border-green-200">
                  <CheckCircle2 className="w-3 h-3" />متصل
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">WhatsApp Business API · عطور الريم</p>
            </div>
            <button className="text-xs font-semibold text-red-500 hover:text-red-700 bg-white hover:bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg transition-colors shrink-0">
              قطع الاتصال
            </button>
          </div>

          <div className="space-y-2">
            {[
              { label: "آخر رسالة مُستلمة", value: "منذ دقيقتين" },
              { label: "الرسائل المُرسلة اليوم", value: "143" },
              { label: "حالة API", value: "نشط — 99.9% uptime" },
            ].map(r => (
              <div key={r.label} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0 text-sm">
                <span className="text-gray-500">{r.label}</span>
                <span className="font-semibold text-gray-800">{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* AI assistant tone */}
      <Card>
        <div className="px-5 py-4 border-b border-gray-50">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-500" />
            <h3 className="font-bold text-gray-900 text-sm">أسلوب المساعد الذكي</h3>
          </div>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { val: "friendly",     label: "ودّي وطبيعي",   desc: "دارجة مغربية طبيعية",  sel: true  },
              { val: "professional", label: "احترافي",        desc: "رسمي وإجرائي",          sel: false },
              { val: "energetic",    label: "حيوي ومحمّس",   desc: "إيموجي ونشاط عالي",    sel: false },
            ].map(opt => (
              <label key={opt.val} className={`flex flex-col gap-1 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${opt.sel ? "border-[#25D366] bg-green-50" : "border-gray-200 hover:border-gray-300"}`}>
                <div className="flex justify-between">
                  <span className="text-sm font-bold text-gray-900">{opt.label}</span>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${opt.sel ? "border-[#25D366] bg-[#25D366]" : "border-gray-300"}`}>
                    {opt.sel && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                </div>
                <p className="text-xs text-gray-500">{opt.desc}</p>
              </label>
            ))}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">حد الرسائل اليومي</label>
            <div className="flex items-center gap-3">
              <input
                type="range" min="100" max="5000" defaultValue="1000"
                className="flex-1 accent-[#25D366]"
              />
              <span className="text-sm font-black text-gray-900 w-20 text-left">1,000 / يوم</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>100</span>
              <span className="text-[#25D366] font-semibold">باقتك الحالية: 5,000</span>
              <span>5,000</span>
            </div>
          </div>

          <div className="flex items-center justify-between py-2 border-t border-gray-50">
            <div>
              <p className="text-sm font-semibold text-gray-900">الرد التلقائي</p>
              <p className="text-xs text-gray-500">تفعيل أو تعطيل البوت بالكامل</p>
            </div>
            <Toggle on={autoReply} onToggle={() => setAuto(!autoReply)} />
          </div>
        </div>
      </Card>

      {/* Google Sheets */}
      <Card>
        <div className="px-5 py-4 border-b border-gray-50">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-green-600" />
            <h3 className="font-bold text-gray-900 text-sm">Google Sheets Integration</h3>
          </div>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900">مزامنة الطلبات تلقائياً</p>
              <p className="text-xs text-gray-500">كل طلب جديد يُضاف تلقائياً للجدول</p>
            </div>
            <Toggle on={sheetsSync} onToggle={() => setSync(!sheetsSync)} />
          </div>

          {sheetsSync && (
            <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-100">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">رابط Google Sheet</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    defaultValue="https://docs.google.com/spreadsheets/d/1BxiMV..."
                    className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366] font-mono"
                  />
                  <button className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">آخر مزامنة:</span>
                <span className="font-semibold text-green-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> منذ 5 دقائق</span>
              </div>
              <button className="flex items-center gap-1.5 text-xs font-semibold text-[#25D366] hover:underline">
                <RefreshCw className="w-3.5 h-3.5" />
                مزامنة الآن
              </button>
            </div>
          )}

          {/* Webhook token */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Webhook Token</label>
            <div className="flex gap-2">
              <input
                type="text"
                value="fl_wh_7k2mXp9Qa3nBvR8tLj5..."
                readOnly
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-500 font-mono"
              />
              <button onClick={copyToken} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${copied ? "bg-green-50 border-green-200 text-green-700" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                <Copy className="w-3.5 h-3.5" />
                {copied ? "تم!" : "نسخ"}
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Notifications & preferences */}
      <Card>
        <div className="px-5 py-4 border-b border-gray-50">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-500" />
            <h3 className="font-bold text-gray-900 text-sm">الإشعارات والتفضيلات</h3>
          </div>
        </div>
        <div className="divide-y divide-gray-50">
          {[
            { icon: Bell,       color: "text-amber-500",  bg: "bg-amber-50",  label: "إشعارات الطلبات الجديدة", sub: "عند كل طلب جديد",              on: notif,     toggle: () => setNotif(!notif) },
            { icon: Moon,       color: "text-purple-500", bg: "bg-purple-50", label: "وضع الليل للبوت",          sub: "وقف الردود من 00:00 إلى 07:00", on: nightMode,  toggle: () => setNight(!nightMode) },
            { icon: Smartphone, color: "text-blue-500",   bg: "bg-blue-50",   label: "إشعارات الموبايل",         sub: "عبر تطبيق FunnelsLibrary",      on: true,       toggle: () => {} },
            { icon: Shield,     color: "text-green-500",  bg: "bg-green-50",  label: "مصادقة ثنائية",            sub: "حماية إضافية للحساب",           on: false,      toggle: () => {} },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/50 transition-colors">
                <div className={`w-9 h-9 ${item.bg} rounded-xl flex items-center justify-center shrink-0`}>
                  <Icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.sub}</p>
                </div>
                <Toggle on={item.on} onToggle={item.toggle} />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Plan */}
      <Card>
        <div className="px-5 py-4 border-b border-gray-50">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#25D366]" />
            <h3 className="font-bold text-gray-900 text-sm">الباقة الحالية</h3>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#25D366] to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-black text-gray-900">باقة Pro</p>
                <p className="text-xs text-gray-500">199 درهم / شهر · تجدد 15 يونيو</p>
              </div>
            </div>
            <button className="flex items-center gap-1 text-xs font-semibold text-[#25D366] hover:underline">
              ترقية <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-2.5">
            {[
              { label: "الرسائل",      used: 1247, max: 5000, color: "bg-[#25D366]" },
              { label: "المنتجات",     used: 6,    max: 100,  color: "bg-blue-500" },
              { label: "أرقام واتساب", used: 1,    max: 3,    color: "bg-purple-500" },
            ].map(u => (
              <div key={u.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">{u.label}</span>
                  <span className="font-semibold text-gray-800">{u.used.toLocaleString()} / {u.max.toLocaleString()}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${u.color} rounded-full`} style={{ width: `${(u.used / u.max) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
