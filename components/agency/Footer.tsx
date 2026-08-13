"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import Logo from "./Logo";

const columns = [
  {
    title: "Services",
    links: [
      { label: "Création de site vitrine", href: "#services" },
      { label: "Site restaurant & café", href: "#demos" },
      { label: "Site immobilier", href: "#demos" },
      { label: "Boutique en ligne", href: "#demos" },
      { label: "Référencement SEO", href: "#services" },
    ],
  },
  {
    title: "Villes",
    links: [
      { label: "Agence web Casablanca", href: "#villes" },
      { label: "Agence web Marrakech", href: "#villes" },
      { label: "Agence web Rabat", href: "#villes" },
      { label: "Agence web Tanger", href: "#villes" },
      { label: "Agence web Agadir", href: "#villes" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "Réalisations", href: "#demos" },
      { label: "Notre processus", href: "#process" },
      { label: "Tarifs", href: "#tarifs" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo variant="light" className="mb-4" />
            <p className="text-[13.5px] leading-relaxed text-slate-400 max-w-sm mb-6">
              Agence web marocaine spécialisée dans la création de sites professionnels
              pour restaurants, commerces, salons, agences immobilières et PME. Design
              premium, livraison rapide, accompagnement humain.
            </p>

            <div className="space-y-2.5 mb-6">
              <a
                href="tel:+212708025467"
                className="flex items-center gap-2.5 text-[13.5px] hover:text-white transition-colors duration-200"
              >
                <Phone className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                +212 708 025 467
              </a>
              <a
                href="mailto:contact@funnelslibrary.com"
                className="flex items-center gap-2.5 text-[13.5px] hover:text-white transition-colors duration-200"
              >
                <Mail className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                contact@funnelslibrary.com
              </a>
              <div className="flex items-center gap-2.5 text-[13.5px]">
                <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                Disponible dans tout le Maroc
              </div>
            </div>

            <a
              href="https://wa.me/212708025467?text=Bonjour%2C%20je%20veux%20cr%C3%A9er%20mon%20site%20web."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold text-[13.5px] px-5 py-3 rounded-xl transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
              Nous contacter
            </a>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-bold text-white text-[14px] mb-5">{col.title}</h4>
              <ul className="space-y-3 text-[13px]">
                {col.links.map((l) => (
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
          ))}
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12.5px] text-slate-500">
            © {new Date().getFullYear()} FunnelsLibrary. Tous droits réservés.
          </p>

          <div className="flex items-center gap-5 text-[12.5px]">
            <a href="/mentions-legales" className="text-slate-500 hover:text-white transition-colors">
              Mentions légales
            </a>
            <a href="/confidentialite" className="text-slate-500 hover:text-white transition-colors">
              Confidentialité
            </a>
            <span className="text-slate-600 hidden sm:inline">Fait au Maroc 🇲🇦</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
