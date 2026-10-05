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

export const CITIES = [...SITE.agencies, "Autre ville"] as const;
export const PROPERTY_TYPES = ["Maison / villa", "Commerce ou entreprise", "Autre"] as const;

export const EQUIPMENT = [
  { role: "Panneaux", note: "Modules monocristallins, y compris bifaciaux.", brands: ["Longi", "Tongwei"] },
  { role: "Onduleurs", note: "Réseau ou hybrides, selon votre besoin.", brands: ["Huawei", "Sungrow", "Deye", "Sofar", "Must"] },
  { role: "Protections", note: "Coffrets DC / AC, parafoudres, disjoncteurs.", brands: ["Geya"] },
] as const;

export const FAQ = [
  {
    q: "Quelle puissance faut-il pour ma maison ?",
    a: "Cela dépend de votre consommation et de la surface disponible. Lors de la visite, nous regardons votre facture et votre toiture, puis nous vous proposons une puissance adaptée, sans surdimensionner.",
  },
  {
    q: "Que se passe-t-il la nuit ou par temps couvert ?",
    a: "Votre installation produit le jour, et votre réseau d’électricité prend le relais le soir. Avec un onduleur hybride et une batterie, vous pouvez garder une partie de votre production pour la soirée.",
  },
  {
    q: "Les panneaux demandent-ils de l’entretien ?",
    a: "Très peu : un nettoyage régulier et un contrôle de l’installation suffisent. Nous proposons aussi un suivi et un entretien si vous préférez ne pas vous en occuper.",
  },
  {
    q: "Quelles démarches dois-je faire ?",
    a: "Nous vous expliquons lors de la visite les démarches qui s’appliquent à votre situation, et nous préparons avec vous les documents nécessaires.",
  },
  {
    q: "Combien de temps dure l’installation ?",
    a: "La durée dépend de la taille du projet. Elle est indiquée dans votre devis, avant que vous ne vous engagiez.",
  },
] as const;

// DEMO — offer terms are NOT confirmed by the owner. Shown with a visible badge until confirmed.
export const OFFERS = [
  {
    title: "Garantie longue durée",
    big: "30 ans",
    text: "Une garantie annoncée sur nos installations. Étendue, conditions et exclusions à confirmer avant publication.",
  },
  {
    title: "Paiement échelonné",
    big: "7 ans",
    text: "Possibilité de payer sur plusieurs années, sans avance. Organisme, taux et conditions à confirmer avant publication.",
  },
  {
    title: "Packs prêts à poser",
    big: "2 · 3 · 3,5 kW",
    text: "Des puissances courantes pour les foyers. Le pack définitif est choisi après étude de votre consommation et de votre toit.",
  },
] as const;

// DEMO — indicative assumptions behind the estimator. NOT confirmed by the owner: validate before launch
// (electricity tariff, solar yield, panel size). Shown to visitors in the "Hypothèses" disclosure.
export const ESTIMATOR = {
  tariff: 0.3, // TND per kWh, blended average
  yieldPerKwc: 1600, // kWh produced per kWc per year
  coverage: 0.8, // share of consumption the system is sized to cover
  panelWatt: 550,
  panelArea: 2.6, // m² per panel
  min: 30,
  max: 600,
  step: 10,
  initial: 120,
} as const;

export const SPEC_CHIPS = [
  { label: "Panneaux", value: "Monocristallins · bifaciaux" },
  { label: "Onduleurs", value: "Réseau · hybrides" },
  { label: "Après la pose", value: "Suivi de production" },
] as const;
