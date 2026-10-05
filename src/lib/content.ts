/** All site copy and constants live here (French). Items marked DEMO are placeholders. */

export const SITE = {
  name: "Digital Power",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  tagline: "Installation solaire photovoltaïque",
  description:
    "Digital Power conçoit et installe des systèmes solaires photovoltaïques pour les maisons et les entreprises en Tunisie : étude, fourniture, pose et raccordement.",
  phone: { display: "94 240 336", href: "tel:+21694240336", e164: "+21694240336" },
  whatsapp: {
    display: "+216 22 363 037",
    href: "https://wa.me/21622363037",
    e164: "+21622363037",
  },
  facebook: "https://www.facebook.com/digital.power.tn",
  // DEMO — opening hours not provided by the owner
  hours: "Lundi – samedi, 8 h 30 – 17 h 30",
  agencies: ["Sfax", "Tunis", "Sousse", "Mahrès"],
  // DEMO — recipient set via QUOTE_TO_EMAIL env var
  demoEmail: "devis@example.com",
} as const;

export const NAV = [
  { href: "/solutions", label: "Solutions" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/offres", label: "Offres & garantie" },
  { href: "/contact", label: "Contact" },
] as const;

export const BRANDS = ["Huawei", "Sungrow", "Longi", "Tongwei", "Deye", "Sofar", "Must"] as const;

export const STEPS = [
  {
    title: "Visite & étude",
    text: "Nous venons chez vous : état de la toiture, ombrages, structure, tableau électrique. Vous repartez avec un dimensionnement adapté à votre facture.",
  },
  {
    title: "Devis clair",
    text: "Puissance, matériel, délais, prix : tout est écrit noir sur blanc, sans surprise ni ligne cachée.",
  },
  {
    title: "Livraison & levage",
    text: "Panneaux, structures et onduleur arrivent sur site. Grue et équipe s’occupent de monter le matériel sur le toit en sécurité.",
  },
  {
    title: "Pose",
    text: "Structure métallique fixée, panneaux alignés, câblage protégé. Un chantier propre, mené par nos équipes.",
  },
  {
    title: "Raccordement & mise en service",
    text: "Onduleur, coffrets de protection, essais de production. Votre installation est prête à produire dès le premier jour de soleil.",
  },
] as const;

export const SOLUTIONS = [
  {
    slug: "residentiel",
    tag: "Résidentiel",
    title: "Votre maison produit sa propre électricité",
    text: "Toiture, terrasse ou pergola : une installation dimensionnée pour votre consommation, posée proprement.",
  },
  {
    slug: "commercial",
    tag: "Commercial",
    title: "Moins de charges, plus de marge",
    text: "Commerces, ateliers, bureaux : réduisez durablement votre facture d’électricité en journée.",
  },
  {
    slug: "stockage",
    tag: "Stockage & suivi",
    title: "Gardez votre énergie pour le soir",
    text: "Onduleurs hybrides, batteries et suivi de production pour garder la main sur votre énergie.",
  },
] as const;
