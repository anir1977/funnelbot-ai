"use client";

import { useState } from "react";
import { Store, MapPin, Phone, FileText, Tag, Camera, CheckCircle2, ChevronDown } from "lucide-react";

const businessTypes = ["عطور وبرفان", "ملابس نسائية", "ملابس رجالية", "مكملات رياضية", "إلكترونيات", "كوزميتيك وتجميل", "حلويات وكيك", "أثاث ومفروشات", "إكسسوارات", "أخرى"];
const cities = ["الدار البيضاء", "الرباط", "مراكش", "فاس", "طنجة", "أكادير", "مكناس", "وجدة", "الجديدة", "تطوان"];

export default function StorePage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl space-y-5">

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-gray-900">إعدادات المتجر</h2>
          <p className="text-sm text-gray-500 mt-0.5">معلومات متجرك الأساسية التي يستخدمها البوت</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 font-bold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 ${
            saved
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-[#25D366] hover:bg-[#1eb85a] text-white shadow-md shadow-green-200 hover:-translate-y-0.5"
          }`}
        >
          {saved ? <><CheckCircle2 className="w-4 h-4" /> تم الحفظ</> : "حفظ التغييرات"}
        </button>
      </div>

      {/* Logo upload */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-bold text-gray-900 text-sm mb-4">شعار المتجر</h3>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-3xl font-black shadow-md">
            ع
          </div>
          <div>
            <button className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
              <Camera className="w-4 h-4" />
              تغيير الشعار
            </button>
            <p className="text-xs text-gray-400 mt-1.5">PNG أو JPG · الحجم الأقصى 2MB</p>
          </div>
        </div>
      </div>

      {/* Main info */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
        <h3 className="font-bold text-gray-900 text-sm border-b border-gray-50 pb-3">معلومات أساسية</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Store name */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              <span className="flex items-center gap-1.5"><Store className="w-3.5 h-3.5 text-gray-400" /> اسم المتجر</span>
            </label>
            <input
              type="text"
              defaultValue="عطور الريم"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366] transition-all"
            />
          </div>

          {/* Business type */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5 text-gray-400" /> نوع النشاط</span>
            </label>
            <div className="relative">
              <select
                defaultValue="عطور وبرفان"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366] transition-all"
              >
                {businessTypes.map(t => <option key={t}>{t}</option>)}
              </select>
              <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-gray-400" /> المدينة الرئيسية</span>
            </label>
            <div className="relative">
              <select
                defaultValue="الرباط"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366] transition-all"
              >
                {cities.map(c => <option key={c}>{c}</option>)}
              </select>
              <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-gray-400" /> رقم واتساب بيزنس</span>
            </label>
            <div className="flex gap-2">
              <span className="flex items-center bg-gray-100 border border-gray-200 rounded-xl px-3 text-sm text-gray-500 font-mono shrink-0">+212</span>
              <input
                type="tel"
                defaultValue="661234567"
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366] transition-all"
              />
            </div>
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              <p className="text-[11px] text-green-600 font-semibold">متصل ونشط</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-gray-400" /> وصف المتجر</span>
          </label>
          <textarea
            rows={4}
            defaultValue="متجر عطور الريم — عطور أصيلة وأرقى العلامات العالمية بأسعار منافسة. نوصل لجميع المدن المغربية مع الدفع عند الاستلام. خدمة 24/7 عبر واتساب."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366] transition-all resize-none leading-relaxed"
          />
          <p className="text-xs text-gray-400 mt-1">يستخدم البوت هذا الوصف للرد على أسئلة "من أنتم؟" وأسئلة التعريف.</p>
        </div>
      </div>

      {/* Bot personality */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
        <h3 className="font-bold text-gray-900 text-sm border-b border-gray-50 pb-3">شخصية البوت</h3>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">أسلوب الرد</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { val: "friendly",     label: "ودّي وطبيعي",     desc: "يرد بالدارجة بشكل طبيعي", selected: true },
              { val: "professional", label: "احترافي",          desc: "رسمي وإجرائي", selected: false },
              { val: "energetic",    label: "نشيط وحيوي",      desc: "يستخدم إيموجي ومحمّس", selected: false },
            ].map(opt => (
              <label key={opt.val} className={`flex flex-col gap-1 p-3 rounded-xl border-2 cursor-pointer transition-all ${opt.selected ? "border-[#25D366] bg-green-50" : "border-gray-200 hover:border-gray-300"}`}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-900">{opt.label}</span>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${opt.selected ? "border-[#25D366] bg-[#25D366]" : "border-gray-300"}`}>
                    {opt.selected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
                <p className="text-xs text-gray-500">{opt.desc}</p>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">رسالة الترحيب</label>
          <textarea
            rows={2}
            defaultValue="وعليكم السلام! 🌸 أهلاً بك في عطور الريم. كيف يمكنني مساعدتك اليوم؟"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366] transition-all resize-none"
          />
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-5">
        <h3 className="font-bold text-red-600 text-sm mb-3">منطقة الخطر</h3>
        <p className="text-xs text-gray-500 mb-3">حذف المتجر سيؤدي إلى حذف جميع البيانات بشكل نهائي ولا يمكن التراجع عنه.</p>
        <button className="text-xs font-semibold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-4 py-2 rounded-xl transition-colors">
          حذف المتجر
        </button>
      </div>
    </div>
  );
}
