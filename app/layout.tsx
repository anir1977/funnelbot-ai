import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

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
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
