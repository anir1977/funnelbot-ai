import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { demos, photo } from "@/lib/demos";

export const metadata: Metadata = {
  title: "Nos démos par secteur — FunnelsLibrary",
  description:
    "Parcourez des sites de démonstration complets pour restaurants, cafés, salons, agences immobilières, boutiques, cabinets et plus encore.",
};

export default function DemoIndex() {
  return (
    <main className="bg-white min-h-screen pb-28">
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-20 pb-14">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 text-[13px] font-semibold"
        >
          ← Retour à FunnelsLibrary
        </Link>

        <h1
          className="font-black text-slate-900 mt-6 mb-4 text-balance"
          style={{ fontSize: "clamp(30px, 5vw, 52px)", letterSpacing: "-0.035em" }}
        >
          Des sites de démonstration complets, par secteur
        </h1>
        <p className="text-slate-500 text-[17px] max-w-2xl leading-relaxed">
          Chaque démo est un site entier et navigable — pas une image. Ouvrez-en une,
          parcourez-la, puis dites-nous laquelle correspond à votre activité.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((d) => (
            <Link
              key={d.slug}
              href={`/demo/${d.slug}`}
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={photo(d.photos[0], 700)}
                  alt={d.brand}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div
                    className="text-[9.5px] font-bold uppercase tracking-[0.2em] mb-1"
                    style={{ color: d.accent }}
                  >
                    {d.category} · {d.city}
                  </div>
                  <div className="text-white font-black text-[16px] leading-tight">
                    {d.brand}
                  </div>
                </div>
              </div>

              <div className="p-5">
                <p className="text-slate-500 text-[13.5px] leading-relaxed mb-4 line-clamp-2">
                  {d.hero.sub}
                </p>
                <div
                  className="flex items-center gap-1.5 font-bold text-[13px] group-hover:gap-2.5 transition-all"
                  style={{ color: d.accent }}
                >
                  Ouvrir la démo
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
