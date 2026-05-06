import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FunnelBot AI — حوّل واتساب إلى آلة مبيعات 24/7",
  description:
    "بوت واتساب الذكي الذي يرد على عملائك، يولد عملاء محتملين، ويحول المحادثات إلى مبيعات — تلقائياً",
  keywords: ["واتساب بوت", "ذكاء اصطناعي", "تسويق", "مبيعات", "FunnelBot"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="font-sans antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
