"use client";

const items = [
  "Création de site web",
  "Référencement SEO",
  "Agence web Maroc",
  "Design sur mesure",
  "Sites e-commerce",
  "Hébergement inclus",
  "Livraison en 7 jours",
];

export default function Marquee({ dark = false }: { dark?: boolean }) {
  const row = [...items, ...items, ...items];

  return (
    <div
      className={`relative overflow-hidden py-6 border-y ${
        dark ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-100"
      }`}
    >
      <style>{`
        @keyframes fl-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        .fl-marquee-track {
          animation: fl-marquee 40s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .fl-marquee-track { animation: none; }
        }
      `}</style>

      {/* Fade edges */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r ${
          dark ? "from-slate-950" : "from-slate-50"
        } to-transparent`}
      />
      <div
        className={`absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l ${
          dark ? "from-slate-950" : "from-slate-50"
        } to-transparent`}
      />

      <div className="fl-marquee-track flex items-center gap-8 whitespace-nowrap w-max">
        {row.map((item, i) => (
          <div key={i} className="flex items-center gap-8 shrink-0">
            <span
              className={`font-black text-[22px] sm:text-[28px] ${
                dark ? "text-white" : "text-slate-900"
              }`}
              style={{ letterSpacing: "-0.03em" }}
            >
              {item}
            </span>
            <span className={`text-[20px] ${dark ? "text-blue-500" : "text-blue-600"}`}>✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
