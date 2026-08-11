"use client";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white font-black text-[13px]">F</span>
              </div>
              <span className="font-black text-white text-[16px]">FunnelsLibrary</span>
            </div>
            <p className="text-[13.5px] leading-relaxed text-slate-400 max-w-xs">
              Agence web spécialisée dans la création de sites professionnels pour les entreprises au Maroc.
            </p>
            <a
              href="https://wa.me/212708025467"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 bg-green-500 hover:bg-green-600 text-white font-bold text-[13px] px-4 py-2.5 rounded-lg transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
              WhatsApp
            </a>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-white text-[14px] mb-5">Navigation</h4>
            <ul className="space-y-3 text-[13.5px]">
              {[
                { label: "Réalisations", href: "#demos" },
                { label: "Services", href: "#services" },
                { label: "Tarifs", href: "#tarifs" },
                { label: "FAQ", href: "#faq" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white text-[14px] mb-5">Contact</h4>
            <ul className="space-y-3 text-[13.5px]">
              <li>
                <a
                  href="https://wa.me/212708025467"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  +212 708 025 467
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@funnelslibrary.com"
                  className="hover:text-white transition-colors duration-200"
                >
                  contact@funnelslibrary.com
                </a>
              </li>
              <li className="text-slate-500">Maroc · Disponible dans tout le Maroc</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-slate-500">
            © {new Date().getFullYear()} FunnelsLibrary. Tous droits réservés.
          </p>
          <p className="text-[13px] text-slate-600">
            Fait avec soin au Maroc 🇲🇦
          </p>
        </div>
      </div>
    </footer>
  );
}
