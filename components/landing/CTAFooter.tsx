"use client";

import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Mail, Phone, Instagram, Facebook } from "lucide-react";
import { WA_URL } from "@/lib/whatsapp";

const footerLinks = {
  المنتج:   ["المميزات", "كيف يعمل", "الأسعار", "التحديثات"],
  الشركة:   ["من نحن", "المدونة", "الشراكات", "اتصل بنا"],
  الدعم:    ["مركز المساعدة", "دليل الإعداد", "سياسة الخصوصية", "الشروط والأحكام"],
};

export default function CTAFooter() {
  return (
    <>
      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative bg-gradient-to-br from-[#075E54] via-[#128C7E] to-[#25D366] rounded-[2rem] p-10 lg:p-16 text-center overflow-hidden"
          >
            {/* Blobs */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-2xl" />

            {/* Dots */}
            <div
              className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "22px 22px" }}
            />

            {/* Floating elements */}
            {["top-8 right-16", "top-16 left-24", "bottom-10 right-28", "bottom-20 left-10"].map((pos, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -8, 0], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.6 }}
                className={`absolute ${pos} w-3 h-3 bg-white/40 rounded-full`}
              />
            ))}

            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
                ابدأ اليوم وحوّل
                <br />
                <span className="text-green-200">واتساب متجرك إلى مساعد ذكي</span>
              </h2>
              <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                انضم إلى أكثر من 1,200 متجر مغربي يستخدمون FunnelsLibrary لزيادة مبيعاتهم
                وتوفير وقتهم. 14 يوم مجاناً بدون بيانات بنكية.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 bg-white text-[#075E54] font-black px-8 py-4 rounded-2xl text-base hover:bg-green-50 transition-all duration-200 shadow-xl hover:-translate-y-0.5 w-full sm:w-auto justify-center"
                >
                  جرّب مجاناً 14 يوم
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                </a>
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border-2 border-white/40 text-white font-semibold px-7 py-4 rounded-2xl text-base hover:bg-white/10 transition-all duration-200 w-full sm:w-auto justify-center"
                >
                  <Phone className="w-4 h-4" />
                  تواصل معنا
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-5 mt-8 text-green-100 text-sm">
                <span>✓ بدون بيانات بنكية</span>
                <span className="opacity-40">|</span>
                <span>✓ إلغاء في أي وقت</span>
                <span className="opacity-40">|</span>
                <span>✓ دعم بالدارجة والعربية</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1f2e] text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-10">

            {/* Brand */}
            <div className="lg:col-span-2">
              <a href="#" className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 bg-[#25D366] rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-black text-white">
                  Funnels<span className="text-[#25D366]">Library</span>
                </span>
              </a>
              <p className="text-sm leading-relaxed mb-5 max-w-xs">
                منصة بوت واتساب ذكي مخصصة للمتاجر الإلكترونية في المغرب. ابيع أكثر، اشتغل أقل.
              </p>
              {/* Social */}
              <div className="flex gap-3">
                {[
                  { Icon: Instagram, label: "إنستغرام" },
                  { Icon: Facebook,  label: "فيسبوك"  },
                  { Icon: Mail,      label: "البريد"  },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-9 h-9 bg-white/10 hover:bg-[#25D366] rounded-lg flex items-center justify-center transition-colors group"
                  >
                    <Icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-white font-bold text-sm mb-4">{title}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm hover:text-[#25D366] transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p>© 2025 FunnelsLibrary. جميع الحقوق محفوظة — funnelslibrary.com</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-[#25D366] transition-colors">سياسة الخصوصية</a>
              <span className="opacity-30">|</span>
              <a href="#" className="hover:text-[#25D366] transition-colors">الشروط والأحكام</a>
              <span className="opacity-30">|</span>
              <a href="mailto:hello@funnelslibrary.com" className="hover:text-[#25D366] transition-colors flex items-center gap-1">
                <Mail className="w-3 h-3" />
                hello@funnelslibrary.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
