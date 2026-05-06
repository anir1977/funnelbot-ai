"use client";

import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Mail, Phone, Twitter, Instagram, Youtube } from "lucide-react";

const footerLinks = {
  المنتج: ["المميزات", "الأسعار", "التحديثات", "الخارطة الزمنية"],
  الشركة: ["من نحن", "المدونة", "الشراكات", "اتصل بنا"],
  الدعم: ["مركز المساعدة", "التوثيق", "سياسة الخصوصية", "الشروط والأحكام"],
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
            {/* Background decorations */}
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

            {/* Floating dots */}
            {[
              "top-6 right-12",
              "top-12 left-20",
              "bottom-8 right-24",
              "bottom-16 left-8",
            ].map((pos, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -8, 0], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
                className={`absolute ${pos} w-3 h-3 bg-white/40 rounded-full`}
              />
            ))}

            <div className="relative z-10">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-white fill-white" />
                </div>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
                ابدأ اليوم وحوّل
                <br />
                <span className="text-green-200">واتساب إلى آلة مبيعات</span>
              </h2>
              <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                انضم إلى أكثر من 500 صاحب عمل يحققون مبيعات أكثر باستخدام FunnelBot. 14 يوم مجاناً
                بدون بيانات بنكية.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#pricing"
                  className="group flex items-center gap-2 bg-white text-[#075E54] font-black px-8 py-4 rounded-2xl text-base hover:bg-green-50 transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 w-full sm:w-auto justify-center"
                >
                  ابدأ تجربتك المجانية
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 border-2 border-white/40 text-white font-semibold px-7 py-4 rounded-2xl text-base hover:bg-white/10 transition-all duration-200 w-full sm:w-auto justify-center"
                >
                  <Phone className="w-4 h-4" />
                  تحدث مع فريقنا
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center justify-center gap-5 mt-8 text-green-100 text-sm">
                <span className="flex items-center gap-1.5">✓ بدون بيانات بنكية</span>
                <span className="opacity-40">|</span>
                <span className="flex items-center gap-1.5">✓ إلغاء في أي وقت</span>
                <span className="opacity-40">|</span>
                <span className="flex items-center gap-1.5">✓ دعم فني 24/7</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1f2e] text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
          {/* Top row */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-10">
            {/* Brand */}
            <div className="lg:col-span-2">
              <a href="#" className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 bg-[#25D366] rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white fill-white" />
                </div>
                <span className="text-2xl font-black text-white">
                  Funnel<span className="text-[#25D366]">Bot</span>
                </span>
              </a>
              <p className="text-sm leading-relaxed mb-5 max-w-xs">
                منصة ذكاء اصطناعي متخصصة في تحويل واتساب إلى أداة مبيعات قوية للأعمال العربية.
              </p>
              {/* Social */}
              <div className="flex gap-3">
                {[Twitter, Instagram, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 bg-white/10 hover:bg-[#25D366] rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-4 h-4 text-gray-400 hover:text-white" />
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
                      <a
                        href="#"
                        className="text-sm hover:text-[#25D366] transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p>© 2025 FunnelBot AI. جميع الحقوق محفوظة.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-[#25D366] transition-colors">
                سياسة الخصوصية
              </a>
              <span className="opacity-30">|</span>
              <a href="#" className="hover:text-[#25D366] transition-colors">
                الشروط والأحكام
              </a>
              <span className="opacity-30">|</span>
              <a href="mailto:hello@funnelbot.ai" className="hover:text-[#25D366] transition-colors flex items-center gap-1">
                <Mail className="w-3 h-3" />
                hello@funnelbot.ai
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
