import Navbar from "@/components/landing/Navbar";
import CTAFooter from "@/components/landing/CTAFooter";

export const metadata = { title: "سياسة الخصوصية — FunnelsLibrary" };

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-0">
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-black text-gray-900 mb-3">سياسة الخصوصية</h1>
            <p className="text-gray-500 text-sm mb-10">آخر تحديث: يناير 2025</p>

            <div className="prose prose-gray max-w-none space-y-10 text-gray-700 leading-relaxed">
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">1. جمع البيانات</h2>
                <p>
                  نجمع البيانات الضرورية فقط لتشغيل خدمتنا: اسمك، بريدك الإلكتروني، ورقم واتساب
                  المتجر. لا نشارك بياناتك مع أطراف ثالثة بدون موافقتك الصريحة.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">2. استخدام البيانات</h2>
                <p>
                  نستخدم بياناتك حصراً لتقديم خدمة البوت، تحسين المنتج، وإرسال تحديثات مهمة.
                  لن نستخدمها للإعلانات أو أي غرض تجاري آخر.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">3. الأمان</h2>
                <p>
                  نستخدم بروتوكولات تشفير متقدمة (SSL/TLS) لحماية جميع البيانات في النقل والتخزين.
                  قاعدة البيانات محمية بمستويات متعددة من الأمان.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">4. حقوقك</h2>
                <p>
                  يحق لك في أي وقت: الاطلاع على بياناتك، تصحيحها، أو حذفها نهائياً. تواصل معنا عبر
                  البريد hello@funnelslibrary.com لممارسة هذه الحقوق.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">5. ملفات تعريف الارتباط</h2>
                <p>
                  نستخدم ملفات تعريف الارتباط (Cookies) الضرورية فقط لإبقائك مسجلاً الدخول وتحسين
                  تجربة الاستخدام. لا نستخدم ملفات التعريف الإعلانية.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">6. تواصل معنا</h2>
                <p>
                  لأي استفسار حول سياسة الخصوصية، راسلنا على{" "}
                  <a href="mailto:hello@funnelslibrary.com" className="text-[#25D366] hover:underline">
                    hello@funnelslibrary.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <CTAFooter />
    </>
  );
}
