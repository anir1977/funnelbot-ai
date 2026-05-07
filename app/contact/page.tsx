import Navbar from "@/components/landing/Navbar";
import CTAFooter from "@/components/landing/CTAFooter";
import { MessageCircle, Mail, Clock } from "lucide-react";
import { WA_URL } from "@/lib/whatsapp";

export const metadata = { title: "اتصل بنا — FunnelsLibrary" };

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-0 overflow-x-hidden">
        <section className="py-20 bg-gradient-to-b from-green-50 to-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              تواصل معنا
            </h1>
            <p className="text-lg text-gray-600">
              فريقنا متاح للمساعدة — اختر الطريقة الأنسب لك
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* WhatsApp */}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center bg-green-50 border-2 border-[#25D366] rounded-2xl p-8 hover:bg-green-100 transition-colors"
            >
              <div className="w-14 h-14 bg-[#25D366] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">واتساب</h3>
              <p className="text-gray-600 text-sm mb-3">الطريقة الأسرع — رد فوري</p>
              <span className="text-[#25D366] font-bold text-sm">+212 708 025 467</span>
            </a>

            {/* Email */}
            <a
              href="mailto:hello@funnelslibrary.com"
              className="group flex flex-col items-center text-center bg-gray-50 border-2 border-gray-200 rounded-2xl p-8 hover:border-[#25D366] transition-colors"
            >
              <div className="w-14 h-14 bg-gray-100 group-hover:bg-green-100 rounded-2xl flex items-center justify-center mb-4 transition-colors group-hover:scale-110">
                <Mail className="w-7 h-7 text-gray-600 group-hover:text-[#25D366]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">البريد الإلكتروني</h3>
              <p className="text-gray-600 text-sm mb-3">للاستفسارات التفصيلية</p>
              <span className="text-gray-700 font-bold text-sm">hello@funnelslibrary.com</span>
            </a>

            {/* Hours */}
            <div className="flex flex-col items-center text-center bg-gray-50 border-2 border-gray-200 rounded-2xl p-8">
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">أوقات الدعم</h3>
              <p className="text-gray-600 text-sm mb-3">دعم البوت متاح 24/7</p>
              <span className="text-gray-700 font-bold text-sm">الفريق: 9 ص — 9 م</span>
            </div>
          </div>
        </section>
      </main>
      <CTAFooter />
    </>
  );
}
