import Navbar from "@/components/landing/Navbar";
import CTAFooter from "@/components/landing/CTAFooter";

export const metadata = { title: "الشروط والأحكام — FunnelsLibrary" };

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-0">
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-black text-gray-900 mb-3">الشروط والأحكام</h1>
            <p className="text-gray-500 text-sm mb-10">آخر تحديث: يناير 2025</p>

            <div className="prose prose-gray max-w-none space-y-10 text-gray-700 leading-relaxed">
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">1. القبول</h2>
                <p>
                  باستخدامك لمنصة FunnelsLibrary، فأنت توافق على الالتزام بهذه الشروط. إذا كنت لا
                  توافق على أي بند، يُرجى عدم استخدام الخدمة.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">2. الخدمة</h2>
                <p>
                  نقدم منصة بوت واتساب للمتاجر الإلكترونية. نحتفظ بالحق في تعديل أو إيقاف أي جزء
                  من الخدمة مع إشعار مسبق.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">3. الاشتراك والدفع</h2>
                <p>
                  الاشتراكات شهرية ويمكن إلغاؤها في أي وقت. لا يوجد استرداد للأشهر المدفوعة. تُحدَّث
                  الأسعار مع إشعار مسبق بـ 30 يوماً.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">4. الاستخدام المقبول</h2>
                <p>
                  يُحظر استخدام المنصة لإرسال رسائل عشوائية (Spam)، محتوى مسيء، أو أي نشاط مخالف
                  لشروط واتساب أو القانون المغربي.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">5. الملكية الفكرية</h2>
                <p>
                  جميع حقوق المنصة وتصميمها محفوظة لـ FunnelsLibrary. يحتفظ المستخدم بملكية بياناته
                  ومحتوى متجره بالكامل.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">6. تحديد المسؤولية</h2>
                <p>
                  FunnelsLibrary غير مسؤولة عن الخسائر الناتجة عن انقطاع الخدمة أو تغييرات في سياسات
                  واتساب خارجة عن إرادتنا.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">7. التواصل</h2>
                <p>
                  لأي استفسار قانوني:{" "}
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
