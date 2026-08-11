"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Combien de temps faut-il pour créer mon site web ?",
    a: "La plupart des sites sont livrés en 5 à 7 jours ouvrables selon le plan choisi. Une fois que vous nous envoyez vos informations (logo, photos, textes), nous démarrons immédiatement. Vous recevez un lien de prévisualisation avant la mise en ligne.",
  },
  {
    q: "Est-ce que je dois avoir des compétences techniques ?",
    a: "Absolument pas. Nous gérons tout de A à Z — du design au développement jusqu'à la mise en ligne. Vous n'avez qu'à nous fournir votre contenu (photos, textes, logo) et nous faisons le reste.",
  },
  {
    q: "Mon site sera-t-il visible sur Google ?",
    a: "Oui. Nous configurons les bases du référencement (SEO) pour que votre site soit indexé par Google. Pour les plans Professionnel et Premium, nous incluons une optimisation SEO de base qui améliore votre visibilité dans les résultats de recherche locaux.",
  },
  {
    q: "Est-ce que le site fonctionnera sur téléphone ?",
    a: "Oui, tous nos sites sont 100% responsive — ils s'adaptent parfaitement aux téléphones, tablettes et ordinateurs. C'est une priorité absolue car plus de 80% des visiteurs au Maroc naviguent depuis leur smartphone.",
  },
  {
    q: "Que se passe-t-il après la livraison du site ?",
    a: "Votre site est mis en ligne et vous avez accès à un lien de prévisualisation pour valider avant publication. Si vous souhaitez des modifications, nous les faisons selon les révisions incluses dans votre plan. Pour la maintenance et les mises à jour futures, nous proposons des forfaits mensuels adaptés.",
  },
  {
    q: "Puis-je modifier mon site moi-même après la livraison ?",
    a: "Nous vous fournissons un guide simple pour les modifications de base (textes, photos). Pour les changements plus importants (nouvelles pages, fonctionnalités), notre équipe reste disponible via WhatsApp pour vous accompagner rapidement.",
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="border border-slate-200 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-slate-50 transition-colors duration-200"
      >
        <span className="font-semibold text-slate-900 text-[15px] leading-snug">{faq.q}</span>
        <span className="shrink-0 w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">
          {open ? (
            <Minus className="w-3.5 h-3.5 text-slate-600" />
          ) : (
            <Plus className="w-3.5 h-3.5 text-slate-600" />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pt-1 bg-white">
              <p className="text-slate-500 text-[14.5px] leading-relaxed">{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-blue-600 text-[12px] font-semibold uppercase tracking-widest mb-4">
            Questions fréquentes
          </p>
          <h2
            className="font-black text-slate-900 mb-4"
            style={{ fontSize: "clamp(26px, 4vw, 42px)", letterSpacing: "-0.03em" }}
          >
            Tout ce que vous voulez savoir
          </h2>
          <p className="text-slate-500 text-[16px]">
            Des questions ? Nous avons les réponses.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.q} faq={faq} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <p className="text-slate-500 text-[14px] mb-4">
            Vous n'avez pas trouvé votre réponse ?
          </p>
          <a
            href="https://wa.me/212600000000?text=Bonjour%2C%20j%27ai%20une%20question%20sur%20vos%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[14px] px-6 py-3.5 rounded-xl transition-all duration-200"
          >
            Posez-nous directement sur WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
