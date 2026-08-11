import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FunnelsLibrary — Agence Web au Maroc",
  description:
    "Nous créons des sites web modernes, rapides et professionnels pour les entreprises au Maroc. Restaurants, cafés, salons, immobilier et plus.",
  keywords: ["site web maroc", "agence web maroc", "création site web", "site restaurant maroc", "FunnelsLibrary"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
