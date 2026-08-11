/**
 * Demo site catalogue.
 *
 * Each entry drives a complete, browsable demo site under /demo/<slug>.
 * Photos are stored as Unsplash ids and expanded by `photo()` so the same
 * source can be requested at whatever width a given section needs.
 */

export const photo = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export type DemoItem = {
  name: string;
  desc: string;
  price: string;
  /** index into the demo's `photos` array */
  img: number;
};

export type Demo = {
  slug: string;
  /** must match a category label used by the Portfolio filter */
  category: string;
  brand: string;
  city: string;
  tagline: string;
  accent: string;
  layout: "center" | "split";
  nav: string[];
  photos: string[];
  hero: { title: string; sub: string; cta1: string; cta2: string };
  facts: { label: string; value: string }[];
  offering: { label: string; title: string; sub: string; items: DemoItem[] };
  about: { title: string; text: string; points: string[] };
  reviews: { name: string; text: string }[];
  contact: { address: string; hours: string; phone: string };
};

export const demos: Demo[] = [
  /* ─────────────  Restaurant  ───────────── */
  {
    slug: "restaurant",
    category: "Restaurant",
    brand: "La Perle de Marrakech",
    city: "Marrakech",
    tagline: "Restaurant gastronomique",
    accent: "#D97706",
    layout: "center",
    nav: ["Menu", "Notre histoire", "Galerie", "Réserver"],
    photos: [
      "1414235077428-338989a2e8c0",
      "1517248135467-4c7edcad34c4",
      "1546069901-ba9599a7e63c",
      "1555939594-58d7cb561ad1",
      "1544025162-d76694265947",
    ],
    hero: {
      title: "Une expérience culinaire inoubliable",
      sub: "Cuisine marocaine raffinée au cœur de la médina. Produits frais du marché, recettes transmises de génération en génération.",
      cta1: "Réserver une table",
      cta2: "Découvrir le menu",
    },
    facts: [
      { label: "Ouvert", value: "12h – 23h, tous les jours" },
      { label: "Adresse", value: "Rue Riad Zitoun, Médina" },
      { label: "Réservation", value: "Recommandée le week-end" },
    ],
    offering: {
      label: "Notre carte",
      title: "Nos spécialités",
      sub: "Une sélection de plats signature préparés chaque jour avec des produits du souk.",
      items: [
        { name: "Tajine Royal à l'agneau", desc: "Agneau confit, pruneaux, amandes torréfiées et miel de thym.", price: "120 MAD", img: 3 },
        { name: "Pastilla au pigeon", desc: "Feuilleté croustillant, cannelle et sucre glace. Notre classique.", price: "95 MAD", img: 2 },
        { name: "Couscous Maison du vendredi", desc: "Sept légumes, viande tendre et semoule roulée à la main.", price: "85 MAD", img: 4 },
        { name: "Méchoui d'épaule", desc: "Épaule d'agneau rôtie lentement, cumin et sel de mer.", price: "150 MAD", img: 4 },
        { name: "Salades marocaines", desc: "Assortiment de neuf salades fraîches de saison.", price: "60 MAD", img: 2 },
        { name: "Thé à la menthe & pâtisseries", desc: "Thé versé à l'ancienne et assortiment de cornes de gazelle.", price: "45 MAD", img: 1 },
      ],
    },
    about: {
      title: "Trois générations de cuisine familiale",
      text: "Ouvert en 1987 par la famille Benjelloun, La Perle perpétue une cuisine marocaine authentique dans un riad du XVIIIᵉ siècle. Chaque plat suit les recettes de notre grand-mère, avec des produits sélectionnés chaque matin au marché.",
      points: [
        "Produits frais achetés quotidiennement au souk",
        "Terrasse sur le toit avec vue sur la Koutoubia",
        "Salon privatif pour vos événements jusqu'à 40 personnes",
      ],
    },
    reviews: [
      { name: "Sofia M.", text: "Le meilleur tajine que j'ai mangé à Marrakech. Le cadre est magnifique et le service impeccable." },
      { name: "Karim B.", text: "Nous y allons en famille depuis des années. La qualité n'a jamais baissé. La pastilla est un must." },
      { name: "Élodie R.", text: "Terrasse superbe au coucher du soleil. Réservez, c'est toujours complet le week-end." },
    ],
    contact: {
      address: "12 Rue Riad Zitoun Lakdim, Médina, Marrakech",
      hours: "Tous les jours · 12h00 – 23h00",
      phone: "+212 5 24 00 00 00",
    },
  },

  /* ─────────────  Café  ───────────── */
  {
    slug: "cafe",
    category: "Café",
    brand: "Café Atlas",
    city: "Casablanca",
    tagline: "Café de spécialité & pâtisseries",
    accent: "#B45309",
    layout: "split",
    nav: ["Notre carte", "Pâtisseries", "L'endroit", "Contact"],
    photos: [
      "1501339847302-ac426a4a7cbb",
      "1554118811-1e0d58224f24",
      "1495474472287-4d71bcdd2085",
      "1509042239860-f550ce710b93",
      "1486427944299-d1955d23e34d",
      "1447933601403-0c6688de566e",
    ],
    hero: {
      title: "Le goût authentique du Maroc",
      sub: "Café torréfié sur place, pâtisseries faites maison chaque matin. Un endroit calme pour travailler ou retrouver ses amis.",
      cta1: "Commander à emporter",
      cta2: "Voir la carte",
    },
    facts: [
      { label: "Ouvert", value: "7h – 22h, 7j/7" },
      { label: "Wi-Fi", value: "Gratuit et illimité" },
      { label: "À emporter", value: "Commande par WhatsApp" },
    ],
    offering: {
      label: "Notre carte",
      title: "Cafés & douceurs",
      sub: "Grains sélectionnés en Éthiopie et au Brésil, torréfiés chaque semaine dans notre atelier.",
      items: [
        { name: "Espresso Atlas", desc: "Notre mélange signature, notes de cacao et noisette.", price: "18 MAD", img: 2 },
        { name: "Cappuccino", desc: "Mousse de lait onctueuse, latte art à la demande.", price: "25 MAD", img: 3 },
        { name: "Café latte glacé", desc: "Servi sur glace, idéal pour les après-midis d'été.", price: "28 MAD", img: 5 },
        { name: "Croissant au beurre", desc: "Pur beurre, feuilleté maison sorti du four à 7h.", price: "15 MAD", img: 4 },
        { name: "Thé à la menthe", desc: "Menthe fraîche de Meknès, servi en théière traditionnelle.", price: "12 MAD", img: 0 },
        { name: "Cheesecake du jour", desc: "Préparé chaque matin, parfum différent chaque semaine.", price: "35 MAD", img: 1 },
      ],
    },
    about: {
      title: "Un café de quartier, pensé pour rester",
      text: "Café Atlas est né de l'envie d'offrir à Casablanca un vrai café de spécialité. Nous torréfions nos grains sur place et travaillons avec des producteurs que nous connaissons personnellement. Prises électriques à chaque table et Wi-Fi rapide.",
      points: [
        "Torréfaction artisanale sur place chaque semaine",
        "Espace de travail calme avec prises et Wi-Fi rapide",
        "Pâtisseries préparées chaque matin par notre chef",
      ],
    },
    reviews: [
      { name: "Youssef A.", text: "Mon bureau du matin. Le café est excellent et le personnel connaît ma commande par cœur." },
      { name: "Nadia L.", text: "Les croissants sont les meilleurs du quartier. Ambiance calme, parfaite pour travailler." },
      { name: "Omar T.", text: "Enfin un vrai café de spécialité à Casa. Le latte glacé est incroyable." },
    ],
    contact: {
      address: "45 Boulevard d'Anfa, Casablanca",
      hours: "Lundi – Dimanche · 7h00 – 22h00",
      phone: "+212 5 22 00 00 00",
    },
  },

  /* ─────────────  Beauté  ───────────── */
  {
    slug: "salon",
    category: "Beauté",
    brand: "Studio Rose",
    city: "Rabat",
    tagline: "Salon de beauté & bien-être",
    accent: "#E11D48",
    layout: "center",
    nav: ["Services", "Tarifs", "Galerie", "Rendez-vous"],
    photos: [
      "1560066984-138dadb4c035",
      "1519014816548-bf5fe059798b",
      "1522337360788-8b13dee7a37e",
      "1487412720507-e7ab37603c6f",
      "1595476108010-b4d1f102b1b1",
      "1570172619644-dfd03ed5d881",
    ],
    hero: {
      title: "Révélez votre plus belle version",
      sub: "Coiffure, soins du visage et onglerie dans un espace pensé pour votre confort. Équipe diplômée, produits professionnels.",
      cta1: "Prendre rendez-vous",
      cta2: "Voir les tarifs",
    },
    facts: [
      { label: "Ouvert", value: "Mar – Sam, 9h – 19h" },
      { label: "Rendez-vous", value: "En ligne ou par WhatsApp" },
      { label: "Équipe", value: "5 professionnelles diplômées" },
    ],
    offering: {
      label: "Nos prestations",
      title: "Services & tarifs",
      sub: "Des prestations sur mesure, adaptées à votre type de cheveux et de peau.",
      items: [
        { name: "Coupe & brushing", desc: "Diagnostic personnalisé, coupe et coiffage professionnel.", price: "150 MAD", img: 2 },
        { name: "Coloration complète", desc: "Produits sans ammoniaque, conseil couleur inclus.", price: "350 MAD", img: 3 },
        { name: "Manucure & vernis semi-permanent", desc: "Tenue jusqu'à trois semaines, large choix de teintes.", price: "80 MAD", img: 4 },
        { name: "Soin du visage hydratant", desc: "Nettoyage profond, gommage et masque adapté.", price: "200 MAD", img: 5 },
        { name: "Maquillage événement", desc: "Mariage, fiançailles ou soirée. Essai possible en amont.", price: "400 MAD", img: 1 },
        { name: "Forfait mariée", desc: "Coiffure, maquillage et soin. Journée complète avec retouches.", price: "1 200 MAD", img: 0 },
      ],
    },
    about: {
      title: "Un salon où l'on prend le temps",
      text: "Studio Rose accueille ses clientes depuis 2015 à Agdal. Nous limitons volontairement le nombre de rendez-vous par jour pour que chaque prestation se déroule sans précipitation. Nos produits sont sélectionnés pour respecter le cheveu et la peau.",
      points: [
        "Rendez-vous espacés pour un service sans précipitation",
        "Produits professionnels sans sulfates ni ammoniaque",
        "Diagnostic offert avant toute coloration",
      ],
    },
    reviews: [
      { name: "Imane K.", text: "Ma coloration n'a jamais été aussi réussie. On m'écoute vraiment avant de commencer." },
      { name: "Salma B.", text: "J'ai fait mon forfait mariée ici. Résultat parfait, et l'équipe est adorable." },
      { name: "Hind Z.", text: "Le salon est impeccable et on ne se sent jamais pressée. Je recommande les yeux fermés." },
    ],
    contact: {
      address: "8 Avenue Fal Ould Oumeir, Agdal, Rabat",
      hours: "Mardi – Samedi · 9h00 – 19h00",
      phone: "+212 5 37 00 00 00",
    },
  },

  /* ─────────────  Immobilier  ───────────── */
  {
    slug: "immobilier",
    category: "Immobilier",
    brand: "Horizon Immobilier",
    city: "Casablanca",
    tagline: "Agence immobilière",
    accent: "#2563EB",
    layout: "split",
    nav: ["Acheter", "Louer", "Estimation", "Contact"],
    photos: [
      "1512917774080-9991f1c4c750",
      "1600607687939-ce8a6c25118c",
      "1600596542815-ffad4c1539a9",
      "1600585154340-be6161a56a0c",
      "1568605114967-8130f3a36994",
      "1580587771525-78b9dba3b914",
    ],
    hero: {
      title: "Trouvez le bien de vos rêves",
      sub: "Plus de 200 biens sélectionnés à Casablanca et sa région. Accompagnement complet, de la visite à la signature.",
      cta1: "Voir les annonces",
      cta2: "Estimer mon bien",
    },
    facts: [
      { label: "Biens disponibles", value: "Plus de 200 annonces" },
      { label: "Estimation", value: "Gratuite sous 48h" },
      { label: "Expérience", value: "15 ans sur le marché" },
    ],
    offering: {
      label: "Nos annonces",
      title: "Biens à la une",
      sub: "Une sélection de biens vérifiés, visités et validés par nos conseillers.",
      items: [
        { name: "Villa avec piscine · Californie", desc: "420 m² · 5 chambres · jardin paysager et garage double.", price: "4 200 000 MAD", img: 3 },
        { name: "Appartement standing · Anfa", desc: "140 m² · 3 chambres · terrasse et vue dégagée.", price: "2 100 000 MAD", img: 1 },
        { name: "Duplex neuf · Ain Diab", desc: "185 m² · 4 chambres · à deux pas de la corniche.", price: "2 800 000 MAD", img: 2 },
        { name: "Riad rénové · Ancienne médina", desc: "260 m² · patio central · entièrement restauré.", price: "3 500 000 MAD", img: 4 },
        { name: "Plateau bureau · Maârif", desc: "220 m² · open space · immeuble avec ascenseur et parking.", price: "18 000 MAD / mois", img: 5 },
        { name: "Studio meublé · Gauthier", desc: "45 m² · entièrement équipé · idéal investissement locatif.", price: "6 500 MAD / mois", img: 0 },
      ],
    },
    about: {
      title: "Un accompagnement du premier appel à la signature",
      text: "Horizon Immobilier accompagne acheteurs, vendeurs et investisseurs à Casablanca depuis 2010. Chaque bien de notre catalogue est visité et vérifié par nos conseillers avant publication. Nous gérons également l'ensemble des démarches administratives.",
      points: [
        "Chaque bien visité et vérifié avant mise en ligne",
        "Estimation gratuite de votre bien sous 48 heures",
        "Accompagnement notarial et administratif inclus",
      ],
    },
    reviews: [
      { name: "Rachid E.", text: "Vendu en trois semaines au prix demandé. Équipe sérieuse et très réactive." },
      { name: "Leila M.", text: "Ils ont compris exactement ce que je cherchais. Aucune visite inutile, ça change tout." },
      { name: "Mehdi O.", text: "Accompagnement parfait pour mon premier achat. Toutes les démarches ont été gérées." },
    ],
    contact: {
      address: "112 Boulevard Zerktouni, Maârif, Casablanca",
      hours: "Lundi – Samedi · 9h00 – 18h30",
      phone: "+212 5 22 00 00 00",
    },
  },

  /* ─────────────  Boutique  ───────────── */
  {
    slug: "boutique",
    category: "Boutique",
    brand: "Boutique Nour",
    city: "Fès",
    tagline: "Mode & prêt-à-porter",
    accent: "#8B5CF6",
    layout: "center",
    nav: ["Catalogue", "Nouveautés", "Promotions", "Contact"],
    photos: [
      "1441984904996-e0b6ba687e04",
      "1483985988355-763728e1935b",
      "1445205170230-053b83016050",
      "1490481651871-ab68de25d43d",
      "1525507119028-ed4c629a60a3",
      "1567401893414-76b7b1e5a7a5",
    ],
    hero: {
      title: "La mode marocaine réinventée",
      sub: "Caftans contemporains, prêt-à-porter et accessoires. Pièces choisies une par une, en série limitée.",
      cta1: "Commander sur WhatsApp",
      cta2: "Voir le catalogue",
    },
    facts: [
      { label: "Livraison", value: "Partout au Maroc en 48h" },
      { label: "Paiement", value: "À la livraison accepté" },
      { label: "Échange", value: "Sous 7 jours" },
    ],
    offering: {
      label: "Notre sélection",
      title: "Collection de saison",
      sub: "Nouvelles pièces chaque semaine. Séries limitées, jamais de réassort.",
      items: [
        { name: "Caftan brodé main", desc: "Soie et fil d'or, broderie traditionnelle de Fès.", price: "1 400 MAD", img: 2 },
        { name: "Robe longue fluide", desc: "Coupe droite, tissu léger. Disponible en cinq teintes.", price: "450 MAD", img: 3 },
        { name: "Ensemble lin deux pièces", desc: "Lin lavé, confortable et respirant. Idéal été.", price: "620 MAD", img: 4 },
        { name: "Babouches cuir cousues main", desc: "Cuir véritable tanné à Fès, semelle souple.", price: "280 MAD", img: 5 },
        { name: "Sac à main artisanal", desc: "Cuir naturel, finitions à la main, doublure coton.", price: "390 MAD", img: 1 },
        { name: "Foulard soie imprimé", desc: "Motifs exclusifs dessinés dans notre atelier.", price: "180 MAD", img: 0 },
      ],
    },
    about: {
      title: "L'artisanat de Fès, au goût du jour",
      text: "Boutique Nour travaille avec une dizaine d'artisans de la médina de Fès pour créer des pièces qui allient savoir-faire traditionnel et coupes contemporaines. Chaque modèle est produit en petite quantité, ce qui garantit son exclusivité.",
      points: [
        "Pièces produites en séries limitées, jamais réassorties",
        "Collaboration directe avec les artisans de la médina",
        "Livraison partout au Maroc, paiement à la réception",
      ],
    },
    reviews: [
      { name: "Fatima Z.", text: "Mon caftan a fait sensation au mariage. La qualité de la broderie est exceptionnelle." },
      { name: "Amina R.", text: "Commande passée sur WhatsApp le lundi, reçue le mercredi à Marrakech. Parfait." },
      { name: "Khadija S.", text: "Des pièces qu'on ne trouve nulle part ailleurs. J'y reviens à chaque saison." },
    ],
    contact: {
      address: "23 Rue Talaa Kebira, Médina, Fès",
      hours: "Lundi – Samedi · 10h00 – 20h00",
      phone: "+212 5 35 00 00 00",
    },
  },

  /* ─────────────  Santé  ───────────── */
  {
    slug: "sante",
    category: "Santé",
    brand: "Cabinet Dentaire Sourire",
    city: "Rabat",
    tagline: "Cabinet dentaire",
    accent: "#0891B2",
    layout: "split",
    nav: ["Nos soins", "L'équipe", "Urgences", "Rendez-vous"],
    photos: [
      "1629909613654-28e377c37b09",
      "1588776814546-1ffcf47267a5",
      "1576091160399-112ba8d25d1d",
      "1631217868264-e5b90bb7e133",
      "1512678080530-7760d81faba6",
      "1519494026892-80bbd2d6fd0d",
    ],
    hero: {
      title: "Des soins dentaires en toute confiance",
      sub: "Équipement moderne, équipe à l'écoute et prise en charge des urgences. Nous expliquons chaque geste avant de le pratiquer.",
      cta1: "Prendre rendez-vous",
      cta2: "Voir nos soins",
    },
    facts: [
      { label: "Ouvert", value: "Lun – Sam, 8h30 – 19h" },
      { label: "Urgences", value: "Prise en charge le jour même" },
      { label: "Mutuelles", value: "CNSS et CNOPS acceptées" },
    ],
    offering: {
      label: "Nos prestations",
      title: "Soins proposés",
      sub: "Une prise en charge complète, du contrôle de routine aux traitements spécialisés.",
      items: [
        { name: "Consultation & bilan", desc: "Examen complet, radiographie et plan de traitement détaillé.", price: "300 MAD", img: 2 },
        { name: "Détartrage", desc: "Nettoyage profond et polissage. Recommandé deux fois par an.", price: "400 MAD", img: 1 },
        { name: "Soin de carie", desc: "Composite esthétique assorti à la teinte de votre dent.", price: "500 MAD", img: 4 },
        { name: "Blanchiment dentaire", desc: "Traitement au fauteuil, résultat visible en une séance.", price: "2 500 MAD", img: 3 },
        { name: "Orthodontie invisible", desc: "Gouttières transparentes, suivi mensuel personnalisé.", price: "Sur devis", img: 5 },
        { name: "Implant dentaire", desc: "Pose et couronne. Garantie et suivi post-opératoire inclus.", price: "Sur devis", img: 0 },
      ],
    },
    about: {
      title: "Une équipe qui prend le temps d'expliquer",
      text: "Le Dr. Alaoui et son équipe reçoivent à Hay Riad depuis 2012. Notre priorité est de rendre les soins dentaires sereins : nous expliquons chaque étape, présentons un devis clair avant tout traitement et adaptons notre approche aux patients anxieux.",
      points: [
        "Devis détaillé remis avant tout début de traitement",
        "Matériel stérilisé selon les protocoles hospitaliers",
        "Créneaux d'urgence réservés chaque jour",
      ],
    },
    reviews: [
      { name: "Hassan B.", text: "J'avais très peur du dentiste. Ici on m'a tout expliqué calmement. Plus aucune appréhension." },
      { name: "Meryem A.", text: "Urgence un samedi matin, prise en charge en une heure. Équipe vraiment professionnelle." },
      { name: "Anas L.", text: "Devis clair dès le départ, aucun frais surprise. Mon orthodontie s'est parfaitement passée." },
    ],
    contact: {
      address: "5 Avenue Annakhil, Hay Riad, Rabat",
      hours: "Lundi – Samedi · 8h30 – 19h00",
      phone: "+212 5 37 00 00 00",
    },
  },

  /* ─────────────  Automobile  ───────────── */
  {
    slug: "automobile",
    category: "Automobile",
    brand: "Auto Prestige",
    city: "Tanger",
    tagline: "Vente & entretien automobile",
    accent: "#DC2626",
    layout: "center",
    nav: ["Véhicules", "Services", "Devis", "Contact"],
    photos: [
      "1486262715619-67b85e0b08d3",
      "1494976388531-d1058494cdd8",
      "1492144534655-ae79c964c9d7",
      "1503376780353-7e6692767b70",
      "1552519507-da3b142c6e3d",
      "1583121274602-3e2820c69888",
    ],
    hero: {
      title: "Votre voiture entre de bonnes mains",
      sub: "Vente de véhicules d'occasion contrôlés et atelier d'entretien toutes marques. Devis gratuit et transparent.",
      cta1: "Demander un devis",
      cta2: "Voir les véhicules",
    },
    facts: [
      { label: "Ouvert", value: "Lun – Sam, 8h – 19h" },
      { label: "Garantie", value: "6 mois sur les véhicules" },
      { label: "Devis", value: "Gratuit sous 24h" },
    ],
    offering: {
      label: "Notre stock",
      title: "Véhicules & services",
      sub: "Chaque véhicule passe un contrôle en 80 points avant sa mise en vente.",
      items: [
        { name: "Dacia Duster 2021", desc: "Diesel · 68 000 km · première main · carnet complet.", price: "195 000 MAD", img: 1 },
        { name: "Volkswagen Golf 7", desc: "Essence · 92 000 km · boîte automatique · full options.", price: "175 000 MAD", img: 2 },
        { name: "Mercedes Classe C", desc: "Diesel · 120 000 km · intérieur cuir · entretien Mercedes.", price: "290 000 MAD", img: 3 },
        { name: "Vidange & révision", desc: "Huile, filtres et contrôle 30 points. Toutes marques.", price: "à partir de 600 MAD", img: 4 },
        { name: "Diagnostic électronique", desc: "Lecture des codes défaut et rapport détaillé remis.", price: "250 MAD", img: 5 },
        { name: "Climatisation", desc: "Recharge de gaz, contrôle d'étanchéité et désinfection.", price: "450 MAD", img: 0 },
      ],
    },
    about: {
      title: "Vingt ans de mécanique à Tanger",
      text: "Auto Prestige est un garage familial ouvert en 2004. Nous vendons uniquement des véhicules que nous avons nous-mêmes contrôlés et entretenus. Côté atelier, nous travaillons sur toutes les marques avec des pièces d'origine ou équivalentes homologuées.",
      points: [
        "Contrôle en 80 points sur chaque véhicule vendu",
        "Garantie moteur et boîte de 6 mois incluse",
        "Devis détaillé avant toute intervention, sans engagement",
      ],
    },
    reviews: [
      { name: "Abdel K.", text: "Acheté ma Duster ici l'an dernier. Aucun souci, et le suivi après-vente est réel." },
      { name: "Samir H.", text: "Devis annoncé, devis respecté. C'est rare. Je fais entretenir mes deux voitures ici." },
      { name: "Nabil F.", text: "Diagnostic honnête : ils m'ont dit que la réparation n'était pas urgente. Confiance totale." },
    ],
    contact: {
      address: "Zone industrielle Gzenaya, Route de Rabat, Tanger",
      hours: "Lundi – Samedi · 8h00 – 19h00",
      phone: "+212 5 39 00 00 00",
    },
  },

  /* ─────────────  Sport  ───────────── */
  {
    slug: "sport",
    category: "Sport",
    brand: "Fit Club Agadir",
    city: "Agadir",
    tagline: "Salle de sport & coaching",
    accent: "#16A34A",
    layout: "split",
    nav: ["Cours", "Abonnements", "Coachs", "Inscription"],
    photos: [
      "1534438327276-14e5300c3a48",
      "1517836357463-d25dfeac3438",
      "1571019613454-1cb2f99b2d8b",
      "1583454110551-21f2fa2afe61",
      "1594381898411-846e7d193883",
      "1540497077202-7c8a3999166f",
    ],
    hero: {
      title: "Votre meilleure forme commence ici",
      sub: "600 m² d'équipements neufs, cours collectifs tous les jours et coachs diplômés. Premier cours d'essai offert.",
      cta1: "Essai gratuit",
      cta2: "Voir les abonnements",
    },
    facts: [
      { label: "Ouvert", value: "6h – 23h, 7j/7" },
      { label: "Cours collectifs", value: "Plus de 25 par semaine" },
      { label: "Essai", value: "Première séance offerte" },
    ],
    offering: {
      label: "Nos formules",
      title: "Cours & abonnements",
      sub: "Des formules souples, sans engagement de longue durée.",
      items: [
        { name: "Abonnement mensuel", desc: "Accès libre à la salle et à tous les cours collectifs.", price: "350 MAD / mois", img: 1 },
        { name: "Abonnement annuel", desc: "Douze mois d'accès illimité, soit deux mois offerts.", price: "3 500 MAD / an", img: 0 },
        { name: "Coaching personnel", desc: "Programme sur mesure et suivi hebdomadaire individuel.", price: "250 MAD / séance", img: 2 },
        { name: "Cours de CrossFit", desc: "Séances collectives intensives, tous niveaux acceptés.", price: "Inclus", img: 3 },
        { name: "Yoga & Pilates", desc: "Cours doux le matin et en fin de journée.", price: "Inclus", img: 4 },
        { name: "Bilan physique complet", desc: "Mesures, test d'endurance et objectifs personnalisés.", price: "Offert", img: 5 },
      ],
    },
    about: {
      title: "Une salle où personne n'est laissé seul",
      text: "Fit Club a ouvert en 2019 avec une idée simple : accompagner réellement ses membres. Chaque nouvel inscrit bénéficie d'un bilan et d'un programme adapté. Nos coachs sont présents en salle toute la journée, pas seulement pendant les cours.",
      points: [
        "Bilan physique et programme offerts à l'inscription",
        "Coachs diplômés présents en salle toute la journée",
        "Équipements renouvelés tous les trois ans",
      ],
    },
    reviews: [
      { name: "Yassine M.", text: "Les coachs corrigent vraiment les postures. J'ai progressé plus en trois mois qu'en deux ans ailleurs." },
      { name: "Sara D.", text: "Ambiance bienveillante, aucun jugement. Les cours de yoga du matin sont parfaits." },
      { name: "Reda B.", text: "Ouvert à 6h, ce qui me permet de m'entraîner avant le travail. Matériel toujours impeccable." },
    ],
    contact: {
      address: "Avenue Hassan II, Secteur Talborjt, Agadir",
      hours: "Tous les jours · 6h00 – 23h00",
      phone: "+212 5 28 00 00 00",
    },
  },

  /* ─────────────  Hôtellerie  ───────────── */
  {
    slug: "hotel",
    category: "Hôtellerie",
    brand: "Riad Zitoun",
    city: "Marrakech",
    tagline: "Riad de charme",
    accent: "#B45309",
    layout: "center",
    nav: ["Chambres", "Services", "Galerie", "Réserver"],
    photos: [
      "1566073771259-6a8506099945",
      "1582719508461-905c673771fd",
      "1611892440504-42a792e24d32",
      "1590490360182-c33d57733427",
      "1571003123894-1f0594d2b5d9",
      "1445019980597-93fa8acb246c",
    ],
    hero: {
      title: "Le calme de la médina, à deux pas de tout",
      sub: "Huit chambres autour d'un patio centenaire. Petit-déjeuner marocain servi sur la terrasse, face à l'Atlas.",
      cta1: "Réserver une chambre",
      cta2: "Découvrir le riad",
    },
    facts: [
      { label: "Chambres", value: "8 chambres et suites" },
      { label: "Petit-déjeuner", value: "Inclus, servi en terrasse" },
      { label: "Transfert", value: "Aéroport sur demande" },
    ],
    offering: {
      label: "Nos chambres",
      title: "Chambres & suites",
      sub: "Chacune décorée différemment, avec des matériaux et savoir-faire locaux.",
      items: [
        { name: "Chambre Menthe", desc: "Lit double · salle de bain privative · vue sur le patio.", price: "650 MAD / nuit", img: 1 },
        { name: "Chambre Safran", desc: "Lit king size · petit salon · zellige traditionnel.", price: "850 MAD / nuit", img: 2 },
        { name: "Suite Atlas", desc: "45 m² · terrasse privée · baignoire en tadelakt.", price: "1 400 MAD / nuit", img: 3 },
        { name: "Suite familiale", desc: "Deux chambres communicantes · jusqu'à quatre personnes.", price: "1 600 MAD / nuit", img: 5 },
        { name: "Dîner marocain", desc: "Menu trois services préparé par notre cuisinière, sur réservation.", price: "250 MAD", img: 4 },
        { name: "Hammam traditionnel", desc: "Gommage au savon noir et massage à l'huile d'argan.", price: "350 MAD", img: 0 },
      ],
    },
    about: {
      title: "Une maison de famille ouverte aux voyageurs",
      text: "Riad Zitoun occupe une demeure du XIXᵉ siècle restaurée pendant deux ans avec des artisans de la médina : zellige, tadelakt et bois de cèdre. Huit chambres seulement, pour que chaque séjour reste personnel.",
      points: [
        "Restauration menée par des artisans de la médina",
        "Petit-déjeuner marocain servi sur la terrasse panoramique",
        "Cinq minutes à pied de la place Jemaa el-Fna",
      ],
    },
    reviews: [
      { name: "Claire D.", text: "Un havre de paix. On oublie complètement l'agitation de la médina une fois la porte franchie." },
      { name: "Thomas L.", text: "L'accueil est d'une gentillesse rare. Le petit-déjeuner sur la terrasse vaut le détour à lui seul." },
      { name: "Nawal S.", text: "La suite Atlas est magnifique. Décoration authentique sans être folklorique." },
    ],
    contact: {
      address: "34 Derb Sidi Bouloukat, Médina, Marrakech",
      hours: "Réception ouverte 24h/24",
      phone: "+212 5 24 00 00 00",
    },
  },

  /* ─────────────  Services  ───────────── */
  {
    slug: "services",
    category: "Services",
    brand: "Cabinet Alami & Associés",
    city: "Casablanca",
    tagline: "Avocats d'affaires",
    accent: "#1E40AF",
    layout: "split",
    nav: ["Expertises", "Le cabinet", "Équipe", "Contact"],
    photos: [
      "1450101499163-c8848c66ca85",
      "1521737604893-d14cc237f11d",
      "1600880292203-757bb62b4baf",
      "1454165804606-c3d57bc86b40",
      "1589829545856-d10d557cf95f",
      "1507003211169-0a1dd7228f2d",
    ],
    hero: {
      title: "Votre entreprise mérite un conseil solide",
      sub: "Droit des sociétés, droit du travail et contentieux commercial. Nous accompagnons les entreprises marocaines depuis 2008.",
      cta1: "Demander un rendez-vous",
      cta2: "Nos domaines",
    },
    facts: [
      { label: "Fondé en", value: "2008 à Casablanca" },
      { label: "Équipe", value: "6 avocats associés" },
      { label: "Premier échange", value: "Sans engagement" },
    ],
    offering: {
      label: "Nos expertises",
      title: "Domaines d'intervention",
      sub: "Un accompagnement continu ou ponctuel, selon les besoins de votre structure.",
      items: [
        { name: "Droit des sociétés", desc: "Création, statuts, pactes d'associés et opérations sur capital.", price: "Sur devis", img: 1 },
        { name: "Droit du travail", desc: "Contrats, licenciements, contentieux prud'homaux et audits.", price: "Sur devis", img: 2 },
        { name: "Contentieux commercial", desc: "Recouvrement, litiges contractuels et représentation.", price: "Sur devis", img: 3 },
        { name: "Droit fiscal", desc: "Optimisation, contrôle fiscal et accompagnement en cas de redressement.", price: "Sur devis", img: 4 },
        { name: "Contrats commerciaux", desc: "Rédaction, négociation et sécurisation de vos accords.", price: "Sur devis", img: 5 },
        { name: "Abonnement conseil", desc: "Assistance juridique continue, forfait mensuel pour PME.", price: "à partir de 5 000 MAD / mois", img: 0 },
      ],
    },
    about: {
      title: "Un conseil clair, sans jargon inutile",
      text: "Le cabinet accompagne des PME, des groupes familiaux et des investisseurs étrangers. Notre approche est simple : expliquer les enjeux dans un langage accessible, annoncer nos honoraires à l'avance et privilégier la solution négociée quand elle sert vos intérêts.",
      points: [
        "Honoraires annoncés et convenus avant toute intervention",
        "Interlocuteur associé dédié pour chaque dossier",
        "Cabinet francophone, arabophone et anglophone",
      ],
    },
    reviews: [
      { name: "Directeur général, PME industrielle", text: "Des conseils clairs et actionnables. Ils nous ont évité un contentieux coûteux en négociant en amont." },
      { name: "Fondatrice, société de services", text: "Accompagnement à la création puis à la levée de fonds. Toujours disponibles et pédagogues." },
      { name: "Responsable RH, groupe de distribution", text: "L'audit social nous a permis de régulariser notre situation avant tout contrôle. Très professionnel." },
    ],
    contact: {
      address: "56 Boulevard Abdelmoumen, Casablanca",
      hours: "Lundi – Vendredi · 9h00 – 18h00",
      phone: "+212 5 22 00 00 00",
    },
  },

  /* ─────────────  Pâtisserie & traiteur  ───────────── */
  {
    slug: "patisserie",
    category: "Pâtisserie",
    brand: "Pâtisserie Chahrazad",
    city: "Meknès",
    tagline: "Pâtisserie marocaine & traiteur",
    accent: "#EA580C",
    layout: "center",
    nav: ["Nos gâteaux", "Traiteur", "Commandes", "Contact"],
    photos: [
      "1486427944299-d1955d23e34d",
      "1517248135467-4c7edcad34c4",
      "1546069901-ba9599a7e63c",
      "1554118811-1e0d58224f24",
      "1555939594-58d7cb561ad1",
    ],
    hero: {
      title: "Les douceurs qui accompagnent vos fêtes",
      sub: "Pâtisserie marocaine traditionnelle et service traiteur pour mariages, fiançailles et baptêmes. Commandes sur mesure.",
      cta1: "Commander",
      cta2: "Voir nos gâteaux",
    },
    facts: [
      { label: "Ouvert", value: "Tous les jours, 8h – 21h" },
      { label: "Commandes", value: "48h à l'avance minimum" },
      { label: "Livraison", value: "Meknès et Fès" },
    ],
    offering: {
      label: "Notre carte",
      title: "Gâteaux & plateaux",
      sub: "Tout est préparé à la commande, avec des amandes et du miel achetés localement.",
      items: [
        { name: "Plateau de cornes de gazelle", desc: "Pâte fine, amande et fleur d'oranger. Environ 40 pièces.", price: "180 MAD / kg", img: 0 },
        { name: "Assortiment de fêtes", desc: "Six variétés : chebakia, briouates au miel, ghriba et plus.", price: "220 MAD / kg", img: 2 },
        { name: "Gâteau de mariage", desc: "Sur mesure, décor et parfums choisis avec vous.", price: "à partir de 900 MAD", img: 4 },
        { name: "Plateau salé traiteur", desc: "Briouates, mini pastillas et feuilletés. 50 pièces.", price: "450 MAD", img: 1 },
        { name: "Service traiteur complet", desc: "Buffet pour événements, service et vaisselle inclus.", price: "Sur devis", img: 3 },
        { name: "Coffret cadeau", desc: "Assortiment présenté dans un coffret artisanal.", price: "280 MAD", img: 2 },
      ],
    },
    about: {
      title: "La recette de Lalla Chahrazad, depuis 1994",
      text: "Notre pâtisserie est née dans la cuisine familiale de Lalla Chahrazad, qui préparait les gâteaux des mariages du quartier. Trente ans plus tard, nous travaillons toujours avec les mêmes recettes et la même exigence : amandes émondées à la main et miel de la région.",
      points: [
        "Amandes émondées à la main, jamais de poudre industrielle",
        "Commandes sur mesure pour mariages et grandes occasions",
        "Livraison possible à Meknès et Fès",
      ],
    },
    reviews: [
      { name: "Latifa B.", text: "Les gâteaux de mon mariage venaient d'ici. Tous les invités ont demandé l'adresse." },
      { name: "Rachida M.", text: "Les cornes de gazelle sont exactement comme celles de ma grand-mère. Rien à voir avec le commerce." },
      { name: "Hicham A.", text: "Service traiteur impeccable pour les fiançailles de ma sœur. Ponctuels et généreux." },
    ],
    contact: {
      address: "18 Avenue Hassan II, Hamria, Meknès",
      hours: "Tous les jours · 8h00 – 21h00",
      phone: "+212 5 35 00 00 00",
    },
  },

  /* ─────────────  Agence de voyage  ───────────── */
  {
    slug: "voyage",
    category: "Voyage",
    brand: "Atlas Évasion",
    city: "Marrakech",
    tagline: "Agence de voyage & excursions",
    accent: "#0D9488",
    layout: "split",
    nav: ["Circuits", "Excursions", "Sur mesure", "Réserver"],
    photos: [
      "1571003123894-1f0594d2b5d9",
      "1445019980597-93fa8acb246c",
      "1566073771259-6a8506099945",
      "1611892440504-42a792e24d32",
      "1582719508461-905c673771fd",
    ],
    hero: {
      title: "Le Maroc comme vous ne l'avez jamais vu",
      sub: "Circuits dans le désert, excursions dans l'Atlas et séjours sur mesure. Guides locaux francophones et véhicules climatisés.",
      cta1: "Réserver un circuit",
      cta2: "Voir les excursions",
    },
    facts: [
      { label: "Agréé", value: "Licence tourisme officielle" },
      { label: "Guides", value: "Francophones et anglophones" },
      { label: "Réservation", value: "Confirmation sous 24h" },
    ],
    offering: {
      label: "Nos formules",
      title: "Circuits & excursions",
      sub: "Départs garantis toute l'année, en petits groupes ou en privatif.",
      items: [
        { name: "Désert de Merzouga · 3 jours", desc: "Nuit sous tente berbère, dromadaires et lever de soleil sur les dunes.", price: "1 800 MAD / pers.", img: 0 },
        { name: "Vallée de l'Ourika · 1 jour", desc: "Cascades, villages berbères et déjeuner en bord de rivière.", price: "350 MAD / pers.", img: 2 },
        { name: "Essaouira · 1 jour", desc: "Médina classée, port de pêche et plage. Départ 8h.", price: "400 MAD / pers.", img: 1 },
        { name: "Grand tour du Sud · 7 jours", desc: "Aït Ben Haddou, Dadès, Merzouga et Todra. Hébergement inclus.", price: "5 900 MAD / pers.", img: 3 },
        { name: "Transfert aéroport", desc: "Véhicule privé climatisé, accueil avec pancarte.", price: "250 MAD", img: 4 },
        { name: "Circuit sur mesure", desc: "Nous construisons votre itinéraire selon vos dates et envies.", price: "Sur devis", img: 2 },
      ],
    },
    about: {
      title: "Des guides d'ici, pas des scripts touristiques",
      text: "Atlas Évasion est une agence marrakchie fondée par des guides du Sud. Nous connaissons les familles qui nous accueillent, les routes qui valent le détour et les heures où les sites sont calmes. Nos groupes ne dépassent jamais huit personnes.",
      points: [
        "Groupes limités à huit personnes maximum",
        "Guides originaires des régions visitées",
        "Véhicules récents et climatisés, chauffeurs expérimentés",
      ],
    },
    reviews: [
      { name: "Julien P.", text: "Trois jours dans le désert inoubliables. Notre guide connaissait chaque village par son nom." },
      { name: "Amal R.", text: "Organisation parfaite du transfert et du circuit. Aucun stress du début à la fin." },
      { name: "Marta G.", text: "Ils ont adapté tout l'itinéraire à nos dates. Très à l'écoute et prix honnête." },
    ],
    contact: {
      address: "27 Avenue Mohammed V, Guéliz, Marrakech",
      hours: "Lundi – Samedi · 8h30 – 19h00",
      phone: "+212 5 24 00 00 00",
    },
  },

  /* ─────────────  Auto-école  ───────────── */
  {
    slug: "auto-ecole",
    category: "Auto-école",
    brand: "Auto-École Najah",
    city: "Casablanca",
    tagline: "Auto-école agréée",
    accent: "#0F766E",
    layout: "split",
    nav: ["Formules", "Code en ligne", "Inscription", "Contact"],
    photos: [
      "1492144534655-ae79c964c9d7",
      "1494976388531-d1058494cdd8",
      "1552519507-da3b142c6e3d",
      "1583121274602-3e2820c69888",
      "1486262715619-67b85e0b08d3",
    ],
    hero: {
      title: "Votre permis, du premier cours à la réussite",
      sub: "Auto-école agréée avec un taux de réussite de 87 %. Cours de code en salle et en ligne, moniteurs patients et véhicules récents.",
      cta1: "M'inscrire",
      cta2: "Voir les formules",
    },
    facts: [
      { label: "Taux de réussite", value: "87 % à la première tentative" },
      { label: "Horaires", value: "Lun – Sam, 8h – 20h" },
      { label: "Paiement", value: "Échelonné sans frais" },
    ],
    offering: {
      label: "Nos formules",
      title: "Permis & forfaits",
      sub: "Des forfaits clairs, sans frais cachés. Le paiement peut être échelonné sur trois mois.",
      items: [
        { name: "Permis B — forfait complet", desc: "Code, 20 heures de conduite et présentation aux examens.", price: "3 200 MAD", img: 0 },
        { name: "Code de la route seul", desc: "Cours en salle illimités et accès à la plateforme en ligne.", price: "800 MAD", img: 1 },
        { name: "Heures de conduite supplémentaires", desc: "À l'unité, avec le moniteur de votre choix.", price: "120 MAD / heure", img: 2 },
        { name: "Conduite accompagnée", desc: "Formation initiale puis suivi avec un accompagnateur.", price: "2 800 MAD", img: 3 },
        { name: "Permis poids lourd (C)", desc: "Formation complète, véhicule et examens inclus.", price: "6 500 MAD", img: 4 },
        { name: "Stage de récupération", desc: "Remise à niveau pour conducteurs après suspension.", price: "1 200 MAD", img: 1 },
      ],
    },
    about: {
      title: "Vingt-cinq ans à former des conducteurs prudents",
      text: "Auto-École Najah forme des conducteurs à Casablanca depuis 1999. Nos moniteurs sont salariés, pas payés à l'heure, ce qui leur permet de prendre le temps nécessaire avec chaque élève. Nos voitures sont renouvelées tous les quatre ans.",
      points: [
        "Moniteurs salariés, jamais pressés par le compteur",
        "Plateforme de code accessible depuis votre téléphone",
        "Paiement échelonné sur trois mois, sans frais supplémentaires",
      ],
    },
    reviews: [
      { name: "Zineb H.", text: "J'étais terrifiée à l'idée de conduire. Mon moniteur a été d'une patience incroyable. Permis du premier coup." },
      { name: "Marouane S.", text: "Le code en ligne m'a permis de réviser au travail. Très pratique et bien fait." },
      { name: "Imad B.", text: "Prix annoncé, prix payé. Pas de mauvaise surprise comme dans d'autres auto-écoles." },
    ],
    contact: {
      address: "134 Boulevard Mohammed Zerktouni, Casablanca",
      hours: "Lundi – Samedi · 8h00 – 20h00",
      phone: "+212 5 22 00 00 00",
    },
  },

  /* ─────────────  Événementiel  ───────────── */
  {
    slug: "evenementiel",
    category: "Événementiel",
    brand: "Dar Salam Événements",
    city: "Marrakech",
    tagline: "Salle des fêtes & organisation",
    accent: "#A21CAF",
    layout: "center",
    nav: ["Nos espaces", "Formules", "Galerie", "Réserver"],
    photos: [
      "1611892440504-42a792e24d32",
      "1517248135467-4c7edcad34c4",
      "1566073771259-6a8506099945",
      "1414235077428-338989a2e8c0",
      "1590490360182-c33d57733427",
    ],
    hero: {
      title: "Le cadre qui rendra votre jour inoubliable",
      sub: "Salle de réception de 400 places, jardin andalou et service complet : décoration, traiteur, sonorisation et coordination.",
      cta1: "Réserver une date",
      cta2: "Voir nos formules",
    },
    facts: [
      { label: "Capacité", value: "Jusqu'à 400 invités" },
      { label: "Parking", value: "150 places gratuites" },
      { label: "Réservation", value: "Visite sur rendez-vous" },
    ],
    offering: {
      label: "Nos prestations",
      title: "Espaces & formules",
      sub: "De la location simple à la prise en charge complète de votre événement.",
      items: [
        { name: "Grande salle · 400 places", desc: "Salle climatisée, scène, éclairage scénique et sonorisation.", price: "à partir de 25 000 MAD", img: 0 },
        { name: "Salon Andalou · 120 places", desc: "Espace intimiste avec patio, idéal fiançailles et baptêmes.", price: "à partir de 12 000 MAD", img: 2 },
        { name: "Jardin extérieur", desc: "Réception en plein air, tentes caïdales et éclairage d'ambiance.", price: "à partir de 18 000 MAD", img: 4 },
        { name: "Formule mariage complète", desc: "Salle, traiteur, décoration, DJ et coordination le jour J.", price: "Sur devis", img: 1 },
        { name: "Service traiteur", desc: "Menus marocains ou internationaux, service à table ou buffet.", price: "à partir de 250 MAD / pers.", img: 3 },
        { name: "Décoration sur mesure", desc: "Scénographie, fleurs et mise en lumière selon votre thème.", price: "Sur devis", img: 0 },
      ],
    },
    about: {
      title: "Un seul interlocuteur, du premier appel au dernier invité",
      text: "Dar Salam accueille mariages, fiançailles et événements d'entreprise depuis 2011. Nous mettons à votre disposition une coordinatrice dédiée qui gère prestataires, timing et imprévus, pour que vous puissiez simplement profiter de votre journée.",
      points: [
        "Une coordinatrice dédiée présente le jour de l'événement",
        "Prestataires partenaires testés et sélectionnés par nos soins",
        "Visite des espaces possible sept jours sur sept, sur rendez-vous",
      ],
    },
    reviews: [
      { name: "Ghita & Younes", text: "Notre mariage s'est déroulé sans un seul accroc. La coordinatrice a tout géré, on n'a eu à penser à rien." },
      { name: "Nadia F.", text: "Le jardin de nuit est magnifique. Nos invités en parlent encore des mois après." },
      { name: "Karim T.", text: "Nous y avons organisé notre séminaire annuel. Logistique impeccable et équipe très réactive." },
    ],
    contact: {
      address: "Route de l'Ourika km 6, Marrakech",
      hours: "Tous les jours · 9h00 – 20h00, sur rendez-vous",
      phone: "+212 5 24 00 00 00",
    },
  },

  /* ─────────────  Formation  ───────────── */
  {
    slug: "formation",
    category: "Formation",
    brand: "Institut Horizon",
    city: "Rabat",
    tagline: "Centre de formation & langues",
    accent: "#4F46E5",
    layout: "split",
    nav: ["Formations", "Langues", "Tarifs", "Inscription"],
    photos: [
      "1521737604893-d14cc237f11d",
      "1454165804606-c3d57bc86b40",
      "1589829545856-d10d557cf95f",
      "1507003211169-0a1dd7228f2d",
      "1600880292203-757bb62b4baf",
    ],
    hero: {
      title: "Formez-vous à ce qui compte vraiment",
      sub: "Langues, bureautique et formations professionnelles certifiantes. Petits groupes, formateurs expérimentés, cours du soir disponibles.",
      cta1: "M'inscrire",
      cta2: "Voir les formations",
    },
    facts: [
      { label: "Groupes", value: "12 participants maximum" },
      { label: "Cours du soir", value: "18h – 21h en semaine" },
      { label: "Certification", value: "Attestation remise" },
    ],
    offering: {
      label: "Notre catalogue",
      title: "Formations proposées",
      sub: "Sessions permanentes, avec des entrées possibles chaque mois.",
      items: [
        { name: "Français — tous niveaux", desc: "Du débutant au perfectionnement. 3 mois, 2 séances par semaine.", price: "1 800 MAD", img: 0 },
        { name: "Anglais professionnel", desc: "Vocabulaire métier, réunions et rédaction d'e-mails.", price: "2 200 MAD", img: 2 },
        { name: "Bureautique — Pack Office", desc: "Word, Excel et PowerPoint. Niveau débutant à avancé.", price: "1 500 MAD", img: 1 },
        { name: "Comptabilité générale", desc: "Bases comptables et tenue de livres pour PME. 4 mois.", price: "3 400 MAD", img: 3 },
        { name: "Marketing digital", desc: "Réseaux sociaux, publicité en ligne et création de contenu.", price: "2 800 MAD", img: 4 },
        { name: "Formation en entreprise", desc: "Programmes sur mesure dispensés dans vos locaux.", price: "Sur devis", img: 0 },
      ],
    },
    about: {
      title: "Des cours pensés pour ceux qui travaillent",
      text: "Institut Horizon forme adultes et étudiants à Rabat depuis 2014. Nos sessions du soir et du week-end permettent de se former sans quitter son emploi. Les groupes sont volontairement réduits pour que chacun puisse pratiquer réellement.",
      points: [
        "Groupes limités à douze participants pour pratiquer vraiment",
        "Cours du soir et du samedi pour les actifs",
        "Test de niveau gratuit avant toute inscription",
      ],
    },
    reviews: [
      { name: "Soukaina E.", text: "J'ai repris l'anglais après dix ans. En six mois je gère mes réunions sans problème." },
      { name: "Adil M.", text: "Les cours du soir m'ont permis de me former sans toucher à mes horaires de travail." },
      { name: "Btissam L.", text: "Formation Excel très concrète, avec des exercices tirés de vrais cas d'entreprise." },
    ],
    contact: {
      address: "42 Avenue de France, Agdal, Rabat",
      hours: "Lundi – Samedi · 9h00 – 21h00",
      phone: "+212 5 37 00 00 00",
    },
  },

  /* ─────────────  Architecture & BTP  ───────────── */
  {
    slug: "architecture",
    category: "Architecture",
    brand: "Atelier Bennani Architectes",
    city: "Tanger",
    tagline: "Architecture & maîtrise d'œuvre",
    accent: "#334155",
    layout: "center",
    nav: ["Réalisations", "Nos services", "L'atelier", "Contact"],
    photos: [
      "1580587771525-78b9dba3b914",
      "1600585154340-be6161a56a0c",
      "1600607687939-ce8a6c25118c",
      "1568605114967-8130f3a36994",
      "1600596542815-ffad4c1539a9",
    ],
    hero: {
      title: "Concevoir des lieux faits pour durer",
      sub: "Architecture résidentielle et tertiaire à Tanger et dans le Nord. De l'esquisse au suivi de chantier, avec un interlocuteur unique.",
      cta1: "Discuter de mon projet",
      cta2: "Voir nos réalisations",
    },
    facts: [
      { label: "Fondé en", value: "2009 à Tanger" },
      { label: "Réalisations", value: "Plus de 60 projets livrés" },
      { label: "Premier rendez-vous", value: "Gratuit et sans engagement" },
    ],
    offering: {
      label: "Nos missions",
      title: "Services & réalisations",
      sub: "Missions complètes ou ponctuelles, selon l'avancement de votre projet.",
      items: [
        { name: "Villa contemporaine · Cap Spartel", desc: "380 m² · conception et suivi complet · livrée en 2023.", price: "Réalisation", img: 0 },
        { name: "Immeuble de bureaux · Malabata", desc: "1 200 m² · six niveaux · certification énergétique.", price: "Réalisation", img: 3 },
        { name: "Réhabilitation médina", desc: "Maison traditionnelle restaurée dans le respect du bâti.", price: "Réalisation", img: 4 },
        { name: "Conception architecturale", desc: "Esquisse, avant-projet et dossier de permis de construire.", price: "Sur devis", img: 1 },
        { name: "Suivi de chantier", desc: "Coordination des entreprises et contrôle de l'exécution.", price: "Sur devis", img: 2 },
        { name: "Aménagement intérieur", desc: "Plans, choix des matériaux et mobilier sur mesure.", price: "Sur devis", img: 2 },
      ],
    },
    about: {
      title: "Une architecture qui répond au climat et au lieu",
      text: "L'atelier a été fondé par Karim Bennani en 2009. Nous concevons en tenant compte de l'orientation, des vents du détroit et des matériaux disponibles localement — pour des bâtiments confortables sans dépendre entièrement de la climatisation.",
      points: [
        "Conception bioclimatique adaptée au climat du Nord",
        "Matériaux et artisans locaux privilégiés",
        "Un architecte associé suit votre projet du début à la livraison",
      ],
    },
    reviews: [
      { name: "Fouad A.", text: "Ils ont su transformer un terrain compliqué en une maison lumineuse. Le suivi de chantier a tout changé." },
      { name: "Sanaa B.", text: "Écoute réelle de nos besoins, pas un projet imposé. Budget respecté à quelques pour cent près." },
      { name: "Groupe immobilier régional", text: "Trois immeubles livrés avec eux. Sérieux, ponctuels et rigoureux sur la qualité d'exécution." },
    ],
    contact: {
      address: "9 Rue Ibn Batouta, Quartier Iberia, Tanger",
      hours: "Lundi – Vendredi · 9h00 – 18h00",
      phone: "+212 5 39 00 00 00",
    },
  },

  /* ─────────────  Pharmacie  ───────────── */
  {
    slug: "pharmacie",
    category: "Pharmacie",
    brand: "Pharmacie Al Amal",
    city: "Casablanca",
    tagline: "Pharmacie & parapharmacie",
    accent: "#059669",
    layout: "split",
    nav: ["Nos services", "Parapharmacie", "Garde", "Contact"],
    photos: [
      "1631217868264-e5b90bb7e133",
      "1512678080530-7760d81faba6",
      "1576091160399-112ba8d25d1d",
      "1519494026892-80bbd2d6fd0d",
      "1588776814546-1ffcf47267a5",
    ],
    hero: {
      title: "Votre santé, conseillée et accompagnée",
      sub: "Pharmacie de quartier ouverte sept jours sur sept, avec un large rayon parapharmacie et un pharmacien toujours disponible pour vous conseiller.",
      cta1: "Nous contacter",
      cta2: "Voir nos services",
    },
    facts: [
      { label: "Ouvert", value: "7j/7, 8h – 22h" },
      { label: "Garde", value: "Nuits selon le planning officiel" },
      { label: "Livraison", value: "À domicile dans le quartier" },
    ],
    offering: {
      label: "Nos services",
      title: "Ce que nous proposons",
      sub: "Au-delà de la délivrance d'ordonnances, un accompagnement au quotidien.",
      items: [
        { name: "Délivrance d'ordonnances", desc: "Toutes mutuelles acceptées, tiers payant CNSS et CNOPS.", price: "—", img: 0 },
        { name: "Conseil pharmaceutique", desc: "Un pharmacien disponible pour répondre à vos questions.", price: "Gratuit", img: 2 },
        { name: "Prise de tension", desc: "Contrôle gratuit sur place, sans rendez-vous.", price: "Gratuit", img: 1 },
        { name: "Test de glycémie", desc: "Résultat immédiat et conseils de suivi personnalisés.", price: "30 MAD", img: 4 },
        { name: "Parapharmacie & dermocosmétique", desc: "Marques dermatologiques, soins bébé et compléments.", price: "En rayon", img: 3 },
        { name: "Livraison à domicile", desc: "Pour les personnes âgées et à mobilité réduite du quartier.", price: "Gratuit", img: 0 },
      ],
    },
    about: {
      title: "Une pharmacie où l'on vous connaît",
      text: "La Pharmacie Al Amal sert le quartier depuis 1998. Notre équipe de trois pharmaciens prend le temps d'expliquer chaque traitement, de vérifier les interactions et d'assurer le suivi des patients chroniques du quartier.",
      points: [
        "Trois pharmaciens diplômés présents en alternance",
        "Suivi personnalisé des patients chroniques",
        "Livraison gratuite pour les personnes à mobilité réduite",
      ],
    },
    reviews: [
      { name: "Aïcha D.", text: "On m'explique toujours clairement mes traitements. Ils vérifient même les interactions avec mes autres médicaments." },
      { name: "Mustapha R.", text: "Ils livrent les médicaments de ma mère chaque mois. Un service qui compte beaucoup pour nous." },
      { name: "Salima K.", text: "Ouvert tard et le dimanche, avec toujours quelqu'un de compétent pour conseiller." },
    ],
    contact: {
      address: "78 Rue Ibnou Mounir, Maârif, Casablanca",
      hours: "Tous les jours · 8h00 – 22h00",
      phone: "+212 5 22 00 00 00",
    },
  },

  /* ─────────────  Barbier  ───────────── */
  {
    slug: "barbier",
    category: "Barbier",
    brand: "Barber House",
    city: "Tanger",
    tagline: "Salon de barbier",
    accent: "#0F172A",
    layout: "center",
    nav: ["Prestations", "Tarifs", "Galerie", "Réserver"],
    photos: [
      "1519014816548-bf5fe059798b",
      "1522337360788-8b13dee7a37e",
      "1487412720507-e7ab37603c6f",
      "1560066984-138dadb4c035",
      "1570172619644-dfd03ed5d881",
    ],
    hero: {
      title: "La coupe nette, le rasage classique",
      sub: "Barbier traditionnel à Tanger. Coupe à la tondeuse et aux ciseaux, rasage au coupe-chou et serviette chaude. Sans rendez-vous ou en réservation.",
      cta1: "Réserver un créneau",
      cta2: "Voir les tarifs",
    },
    facts: [
      { label: "Ouvert", value: "Mar – Dim, 10h – 21h" },
      { label: "Sans rendez-vous", value: "Accepté selon affluence" },
      { label: "Paiement", value: "Espèces et carte" },
    ],
    offering: {
      label: "Nos prestations",
      title: "Coupes & rasages",
      sub: "Chaque passage inclut le shampoing, la serviette chaude et le coiffage.",
      items: [
        { name: "Coupe homme", desc: "Tondeuse et ciseaux, dégradé au choix, shampoing inclus.", price: "70 MAD", img: 1 },
        { name: "Coupe + barbe", desc: "La formule complète, avec contour à la tondeuse.", price: "110 MAD", img: 2 },
        { name: "Rasage traditionnel", desc: "Coupe-chou, serviette chaude et baume apaisant.", price: "60 MAD", img: 0 },
        { name: "Taille de barbe", desc: "Mise en forme, contours nets et huile nourrissante.", price: "50 MAD", img: 3 },
        { name: "Coupe enfant", desc: "Moins de douze ans, dans le calme et sans précipitation.", price: "45 MAD", img: 4 },
        { name: "Forfait marié", desc: "Coupe, rasage et soin du visage la veille du grand jour.", price: "250 MAD", img: 1 },
      ],
    },
    about: {
      title: "Le métier de barbier, fait sérieusement",
      text: "Barber House a ouvert en 2018 avec l'idée de remettre le rasage traditionnel au goût du jour. Nos barbiers sont formés aux techniques classiques : coupe-chou, serviette chaude et finitions aux ciseaux. On prend le temps qu'il faut, jamais moins.",
      points: [
        "Rasage au coupe-chou et serviette chaude, comme autrefois",
        "Lames neuves et matériel stérilisé pour chaque client",
        "Trente minutes minimum par client, sans expédier",
      ],
    },
    reviews: [
      { name: "Anas B.", text: "Meilleur dégradé de Tanger. Ils écoutent vraiment ce qu'on demande avant de commencer." },
      { name: "Walid E.", text: "Le rasage au coupe-chou vaut à lui seul le déplacement. Ambiance top." },
      { name: "Reda M.", text: "J'y emmène mon fils depuis deux ans. Patients avec les enfants, c'est rare." },
    ],
    contact: {
      address: "14 Rue de Fès, Centre-ville, Tanger",
      hours: "Mardi – Dimanche · 10h00 – 21h00",
      phone: "+212 5 39 00 00 00",
    },
  },
];

export const getDemo = (slug: string) => demos.find((d) => d.slug === slug);

/** Portfolio category label → demo slug */
export const demoSlugForCategory = (cat: string) =>
  demos.find((d) => d.category === cat)?.slug;
