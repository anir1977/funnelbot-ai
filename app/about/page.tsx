import Navbar from "@/components/landing/Navbar";
import CTAFooter from "@/components/landing/CTAFooter";
import { BookOpen, Users, Target, Heart } from "lucide-react";

export const metadata = { title: "من نحن — FunnelsLibrary" };

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-0 overflow-x-hidden">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-b from-green-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 text-[#25D366] text-sm font-bold px-4 py-2 rounded-full mb-6">
              <BookOpen className="w-4 h-4" />
              قصتنا
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 leading-tight">
              بنينا FunnelsLibrary
              <br />
              <span className="text-[#25D366]">لأصحاب المتاجر المغاربة</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              رأينا كيف يضيع أصحاب المتاجر ساعات في الرد على نفس الأسئلة على واتساب.
              قررنا نحلوا هاد المشكلة بأداة ذكية مخصصة للسوق المغربي.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Target,
                  title: "مهمتنا",
                  text: "نمكّن كل صاحب متجر مغربي من بناء تجربة شراء احترافية على واتساب — بدون تعقيد تقني.",
                },
                {
                  icon: Users,
                  title: "فريقنا",
                  text: "فريق من المطورين والمسوّقين المغاربة الذين يفهمون السوق المحلي وتحدياته اليومية.",
                },
                {
                  icon: Heart,
                  title: "قيمنا",
                  text: "البساطة، الموثوقية، والدعم الفعلي. نحن معك من الإعداد حتى النمو.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="bg-gray-50 rounded-2xl p-8 text-center">
                  <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-7 h-7 text-[#25D366]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                  <p className="text-gray-600 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-[#1a1f2e]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "+1,200", label: "متجر نشط" },
                { value: "+500K", label: "رسالة شهرياً" },
                { value: "98%", label: "رضا العملاء" },
                { value: "24/7", label: "دعم متواصل" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-3xl font-black text-[#25D366] mb-1">{value}</p>
                  <p className="text-gray-400 text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <CTAFooter />
    </>
  );
}
