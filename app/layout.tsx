import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FunnelsLibrary — بوت واتساب ذكي لمتجرك المغربي",
  description:
    "منصة تساعد أصحاب المتاجر في المغرب على الرد على الزبناء، عرض الأسعار، تأكيد الطلبات، والتوصيل — تلقائياً واحترافياً.",
  keywords: ["واتساب بوت", "متجر إلكتروني", "المغرب", "FunnelsLibrary", "الدفع عند الاستلام"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-sans antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
