"use client";

import { motion } from "framer-motion";
import { Globe, MapPin, MessageSquare, Phone, Image, ShoppingBag, Server, Mail } from "lucide-react";

const services = [
  { icon: Globe, title: "Site vitrine", desc: "Présentez votre entreprise avec style" },
  { icon: ShoppingBag, title: "Menu / Catalogue", desc: "Affichez vos produits et services en ligne" },
  { icon: MessageSquare, title: "Réservation WhatsApp", desc: "Bouton de réservation directe sur WhatsApp" },
  { icon: MapPin, title: "Google Maps", desc: "Localisation intégrée pour être trouvé facilement" },
  { icon: Image, title: "Galerie photos", desc: "Mettez en valeur votre travail avec des visuels" },
  { icon: Phone, title: "Formulaire de contact", desc: "Recevez les demandes directement par email" },
  { icon: Globe, title: "Domaine personnalisé", desc: "Votre propre adresse web (ex: monrestaurant.ma)" },
  { icon: Server, title: "Hébergement inclus", desc: "Votre site hébergé et sécurisé, sans souci" },
];

export default function Services() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-blue-600 text-[12px] font-semibold uppercase tracking-widest mb-4">
            Ce qu'on inclut
          </p>
          <h2
            className="font-black text-slate-900 mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-0.03em" }}
          >
            Tout est inclus dans votre site
          </h2>
          <p className="text-slate-500 text-[16px] max-w-md mx-auto">
            Pas de surprise. Chaque fonctionnalité utile pour votre entreprise est déjà prévue.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="bg-white border border-slate-100 rounded-2xl p-5 hover:border-blue-100 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300">
                  <Icon className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-slate-900 text-[14px] mb-1">{s.title}</h3>
                <p className="text-slate-500 text-[12.5px] leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
