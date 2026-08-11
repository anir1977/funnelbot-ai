import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LogoMark } from "@/components/agency/Logo";

/**
 * Wraps every demo site in a persistent agency bar, so a visitor always knows
 * this is a demonstration and can get back to FunnelsLibrary from anywhere.
 */
export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}

      <div className="fixed bottom-0 inset-x-0 z-50 bg-slate-950/95 backdrop-blur-md border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between gap-3 h-16">
            <Link href="/#demos" className="flex items-center gap-2.5 min-w-0">
              <ArrowLeft className="w-4 h-4 text-slate-400 shrink-0" />
              <LogoMark className="w-7 h-7 shrink-0" />
              <div className="min-w-0">
                <div className="text-white font-bold text-[12.5px] leading-tight truncate">
                  Démonstration FunnelsLibrary
                </div>
                <div className="text-slate-400 text-[11px] truncate hidden sm:block">
                  Ce site est un exemple — le vôtre sera personnalisé
                </div>
              </div>
            </Link>

            <a
              href="https://wa.me/212708025467?text=Bonjour%2C%20j%27ai%20vu%20vos%20d%C3%A9mos%20et%20je%20veux%20un%20site%20pour%20mon%20entreprise."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-bold text-[13px] px-5 py-2.5 rounded-full whitespace-nowrap transition-colors shrink-0"
            >
              Je veux ce site
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
