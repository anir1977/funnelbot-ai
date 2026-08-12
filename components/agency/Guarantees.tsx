"use client";

import { motion } from "framer-motion";
import { Eye, KeyRound, MessageCircle, BadgeCheck } from "lucide-react";

/**
 * Risk reversal, placed just before the pricing section.
 *
 * A new agency cannot lean on a client list, and inventing one is the fastest
 * way to lose a serious prospect. What it can do is remove the reasons someone
 * hesitates: paying into the void, losing control of their domain, being passed
 * around, and watching the price drift. Each promise below is one the agency
 * can keep on day one and the client can hold us to.
 */
const guarantees = [
  {
    icon: Eye,
    title: "Vous validez avant de payer",
    desc: "Nous concevons votre design en premier et vous l'envoyons. Vous ne réglez quoi que ce soit qu'une fois le résultat validé.",
    highlight: "0 DH à l'avance",
  },
  {
    icon: KeyRound,
    title: "Le site vous appartient",
    desc: "Le nom de domaine est enregistré à votre nom, pas au nôtre. Vous pouvez en demander le transfert à tout moment, sans frais et sans justification.",
    highlight: "Propriété totale",
  },
  {
    icon: MessageCircle,
    title: "Un seul interlocuteur",
    desc: "Vous échangez directement avec la personne qui construit votre site, sur WhatsApp. Pas de standard, pas de ticket, pas d'intermédiaire.",
    highlight: "Réponse en 2 h",
  },
  {
    icon: BadgeCheck,
    title: "Le prix ne bouge pas",
    desc: "Le montant annoncé dans le devis est le montant final. Aucun supplément ajouté en cours de route, aucune option facturée après coup.",
    highlight: "Devis ferme",
  },
];

export default function Guarantees() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-blue-600 text-[12px] font-semibold uppercase tracking-widest mb-4">
            Nos engagements
          </p>
          <h2
            className="font-black text-slate-900 mb-4"
            style={{ fontSize: "clamp(28px, 4.5vw, 46px)", letterSpacing: "-0.035em" }}
          >
            Aucun risque de votre côté
          </h2>
          <p className="text-slate-500 text-[16px] max-w-xl mx-auto">
            Confier son site à quelqu'un demande de la confiance. Voici ce sur quoi
            vous pouvez nous tenir, dès le premier message.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {guarantees.map((g, i) => {
            const Icon = g.icon;
            return (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-300 flex flex-col"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-white" />
                </div>

                <h3 className="font-bold text-slate-900 text-[16px] mb-2.5 leading-snug">
                  {g.title}
                </h3>
                <p className="text-slate-500 text-[13.5px] leading-relaxed mb-5 flex-1">
                  {g.desc}
                </p>

                <span className="inline-flex self-start items-center gap-1.5 bg-blue-50 border border-blue-100 text-blue-700 text-[11.5px] font-bold px-3 py-1.5 rounded-full">
                  {g.highlight}
                </span>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="text-slate-500 text-[14px] max-w-2xl mx-auto leading-relaxed">
            Ces engagements sont écrits noir sur blanc dans chaque devis que nous
            envoyons.{" "}
            <a
              href="https://wa.me/212708025467?text=Bonjour%2C%20je%20veux%20recevoir%20un%20devis%20pour%20mon%20site%20web."
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-semibold underline underline-offset-2"
            >
              Demandez le vôtre
            </a>{" "}
            et vérifiez par vous-même.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
