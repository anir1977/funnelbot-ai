"use client";

import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="py-20 lg:py-28 bg-blue-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <p className="text-blue-200 text-[12px] font-semibold uppercase tracking-widest mb-5">
            Prêt à vous lancer ?
          </p>
          <h2
            className="font-black text-white mb-6 leading-tight"
            style={{ fontSize: "clamp(28px, 5vw, 52px)", letterSpacing: "-0.03em" }}
          >
            Votre site web professionnel
            <br />
            en 7 jours.
          </h2>
          <p className="text-blue-100 text-[17px] leading-relaxed max-w-xl mx-auto mb-10">
            Envoyez-nous un message sur WhatsApp. Nous vous proposons le modèle adapté à
            votre métier et un devis clair — sans engagement, et sans rien à payer avant
            d'avoir validé votre design.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://wa.me/212708025467?text=Bonjour%2C%20je%20veux%20cr%C3%A9er%20mon%20site%20web%20professionnel."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-blue-600 hover:bg-blue-50 font-bold text-[16px] px-8 py-4 rounded-xl transition-all duration-200 shadow-xl shadow-blue-900/20"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-green-500 shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
              Démarrer mon projet maintenant
            </a>
            <a
              href="#tarifs"
              className="text-blue-100 hover:text-white font-semibold text-[15px] underline underline-offset-4 transition-colors"
            >
              Voir les tarifs
            </a>
          </div>

          <p className="text-blue-200/70 text-[13px] mt-8">
            Réponse garantie dans les 2 heures · Devis gratuit · Sans engagement
          </p>
        </motion.div>
      </div>
    </section>
  );
}
