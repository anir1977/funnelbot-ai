import type { Metadata } from "next";
import { Playfair_Display, Oswald, Space_Grotesk } from "next/font/google";
import "./globals.css";

/* Display faces used by the demo templates to give each sector its own voice. */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  variable: "--font-serif",
  display: "swap",
});
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-condensed",
  display: "swap",
});
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.funnelslibrary.com"),
  title: "FunnelsLibrary — Agence Web au Maroc",
  description:
    "Nous créons des sites web modernes, rapides et professionnels pour les entreprises au Maroc. Restaurants, cafés, salons, immobilier et plus.",
  keywords: ["site web maroc", "agence web maroc", "création site web", "site restaurant maroc", "FunnelsLibrary"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: "https://www.funnelslibrary.com",
    siteName: "FunnelsLibrary",
    title: "FunnelsLibrary — Agence Web au Maroc",
    description:
      "Sites web professionnels pour les entreprises au Maroc. Livrés en 7 jours, 18 modèles par métier, devis gratuit.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FunnelsLibrary — Agence Web au Maroc",
    description:
      "Sites web professionnels pour les entreprises au Maroc. Livrés en 7 jours.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${oswald.variable} ${grotesk.variable}`}
    >
      <body className="font-sans antialiased bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
