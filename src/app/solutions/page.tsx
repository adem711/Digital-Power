import type { Metadata } from "next";
import { LinkButton } from "@/components/button";
import { Faq } from "@/components/faq";
import { ArrowIcon, WhatsAppIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { SectionHead } from "@/components/section-head";
import { SolutionTabs, type SolutionBlock } from "@/components/solution-tabs";
import { EQUIPMENT, SITE } from "@/lib/content";

import residentiel from "@/assets/photos/v03-17-finished-array-villa.jpg";
import commercial from "@/assets/photos/v02-18-finished-array-wide.jpg";
import stockage from "@/assets/photos/v10-08-two-sofar-inverters-closeup.jpg";
import entretien from "@/assets/photos/v01-05-solar-array-closeup.jpg";

export const metadata: Metadata = {
  title: "Solutions solaires pour maisons et entreprises",
  description:
    "Installations photovoltaïques résidentielles et commerciales, onduleurs hybrides, stockage, suivi et entretien : les solutions Digital Power en Tunisie.",
  alternates: { canonical: "/solutions" },
};

const BLOCKS: SolutionBlock[] = [
  {
    id: "residentiel",
    tag: "Résidentiel",
    title: "Votre maison produit sa propre électricité",
    text: "Toiture plate, toit incliné, terrasse ou pergola : nous dimensionnons l’installation d’après votre consommation et la surface disponible, puis nous la posons proprement.",
    img: residentiel,
    alt: "Grande installation de panneaux solaires sur le toit d’une villa",
    features: [
      { title: "Visite technique et étude sur place", detail: "Nous regardons la toiture, les ombrages, la structure et votre tableau électrique avant de proposer quoi que ce soit." },
      { title: "Structure adaptée à votre toit", detail: "Toit-terrasse, toit incliné ou pergola : la structure métallique est choisie et fixée en fonction de votre bâtiment." },
      { title: "Câblage protégé, coffrets de protection", detail: "Câbles protégés, coffrets DC et AC, parafoudre et disjoncteurs pour une installation sûre." },
    ],
  },
  {
    id: "commercial",
    tag: "Commercial",
    title: "Moins de charges, plus de marge",
    text: "Commerces, ateliers, bureaux : l’électricité produite en journée réduit directement votre facture. Nous étudions votre profil de consommation avant de proposer une puissance.",
    img: commercial,
    alt: "Panneaux solaires inclinés sur un toit-terrasse",
    features: [
      { title: "Étude de votre consommation", detail: "Nous partons de vos factures pour dimensionner au plus juste, sans surinvestir." },
      { title: "Installation sur toit-terrasse ou structure", detail: "Rangées de panneaux inclinés sur structure métallique, positionnées pour limiter les ombres entre rangées." },
      { title: "Un seul interlocuteur", detail: "Du devis à la mise en service, la même équipe vous accompagne." },
    ],
  },
  {
    id: "stockage",
    tag: "Stockage & suivi",
    title: "Gardez votre énergie pour le soir",
    text: "Un onduleur hybride et une batterie permettent d’utiliser le soir une partie de ce que vous produisez le jour. Le suivi vous montre ce que fait votre installation.",
    img: stockage,
    alt: "Deux onduleurs Sofar installés au mur au-dessus de leurs coffrets de protection",
    features: [
      { title: "Onduleurs hybrides et réseau", detail: "Nous installons des onduleurs de marques reconnues, choisis selon que vous souhaitez ou non une batterie." },
      { title: "Batteries selon votre besoin", detail: "La capacité de stockage est choisie avec vous d’après vos habitudes de consommation du soir." },
      { title: "Suivi de la production", detail: "Vous voyez ce que produit votre installation et repérez rapidement un éventuel problème." },
    ],
  },
  {
    id: "entretien",
    tag: "Entretien",
    title: "Une installation qui reste performante",
    text: "Nettoyage, contrôle des connexions et vérification de l’onduleur : nous restons disponibles après la pose pour que votre installation produise comme prévu.",
    img: entretien,
    alt: "Gros plan sur des panneaux solaires posés sur un toit",
    features: [
      { title: "Contrôle de l’installation", detail: "Vérification des fixations, des connexions et des protections." },
      { title: "Nettoyage des panneaux", detail: "La poussière réduit la production : un nettoyage régulier maintient de bons rendements." },
      { title: "Intervention en cas de panne", detail: "Appelez-nous : nous diagnostiquons et intervenons sur votre installation." },
    ],
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        label="Nos solutions"
        title="Une installation pensée pour votre toit"
        lead="Maison ou entreprise, nous étudions, fournissons, posons et raccordons. Voici ce que nous pouvons faire pour vous."
      >
        <LinkButton href="/contact#devis" variant="gold">
          Demander un devis gratuit <ArrowIcon width={18} height={18} />
        </LinkButton>
        <LinkButton href={SITE.whatsapp.href} variant="outline-light">
          <WhatsAppIcon /> WhatsApp
        </LinkButton>
      </PageHero>

      <section aria-label="Nos solutions" className="container-x py-16 md:py-24">
        <SolutionTabs blocks={BLOCKS} />
      </section>

      <section aria-labelledby="materiel" className="on-dark bg-night text-white">
        <div className="container-x flex flex-col gap-10 py-20 md:py-28">
          <SectionHead n="01" title="Notre matériel" dark id="materiel" />
          <p className="reveal t-lead max-w-2xl text-on-night">
            Nous travaillons avec des fabricants reconnus et choisissons le matériel adapté à votre projet.
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {EQUIPMENT.map((e) => (
              <div key={e.role} className="reveal rounded-card border border-night-line bg-night-2 p-6">
                <p className="t-label text-sun-400">{e.role}</p>
                <p className="mt-3 text-on-night">{e.note}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {e.brands.map((b) => (
                    <li
                      key={b}
                      className="rounded-input border border-night-line px-3 py-2 font-mono text-xs font-medium uppercase tracking-widest"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="faq" className="container-x flex flex-col gap-10 py-20 md:py-28">
        <SectionHead n="02" title="Questions fréquentes" id="faq" />
        <Faq />
        <div className="flex flex-wrap items-center gap-4">
          <p className="text-text-soft">Une autre question ?</p>
          <LinkButton href={SITE.phone.href} variant="outline">
            Appelez le {SITE.phone.display}
          </LinkButton>
        </div>
      </section>
    </>
  );
}
