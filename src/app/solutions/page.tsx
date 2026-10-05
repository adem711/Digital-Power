import type { Metadata } from "next";
import Image from "next/image";
import { LinkButton } from "@/components/button";
import { Faq } from "@/components/faq";
import { ArrowIcon, CheckIcon, WhatsAppIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { SectionHead } from "@/components/section-head";
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

const BLOCKS = [
  {
    id: "residentiel",
    tag: "Résidentiel",
    title: "Votre maison produit sa propre électricité",
    text: "Toiture plate, toit incliné, terrasse ou pergola : nous dimensionnons l’installation d’après votre consommation et la surface disponible, puis nous la posons proprement.",
    points: ["Visite technique et étude sur place", "Structure adaptée à votre toit", "Câblage protégé, coffrets de protection"],
    img: residentiel,
    alt: "Grande installation de panneaux solaires sur le toit d’une villa",
  },
  {
    id: "commercial",
    tag: "Commercial",
    title: "Moins de charges, plus de marge",
    text: "Commerces, ateliers, bureaux : l’électricité produite en journée réduit directement votre facture. Nous étudions votre profil de consommation avant de proposer une puissance.",
    points: ["Étude de votre consommation", "Installation sur toit-terrasse ou structure", "Un seul interlocuteur du devis à la mise en service"],
    img: commercial,
    alt: "Panneaux solaires inclinés sur un toit-terrasse",
  },
  {
    id: "stockage",
    tag: "Stockage & suivi",
    title: "Gardez votre énergie pour le soir",
    text: "Un onduleur hybride et une batterie permettent d’utiliser le soir une partie de ce que vous produisez le jour. Le suivi vous montre ce que fait votre installation.",
    points: ["Onduleurs hybrides et réseau", "Batteries selon votre besoin", "Suivi de la production"],
    img: stockage,
    alt: "Deux onduleurs Sofar installés au mur au-dessus de leurs coffrets de protection",
  },
  {
    id: "entretien",
    tag: "Entretien",
    title: "Une installation qui reste performante",
    text: "Nettoyage, contrôle des connexions et vérification de l’onduleur : nous restons disponibles après la pose pour que votre installation produise comme prévu.",
    points: ["Contrôle de l’installation", "Nettoyage des panneaux", "Intervention en cas de panne"],
    img: entretien,
    alt: "Gros plan sur des panneaux solaires posés sur un toit",
  },
] as const;

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

      <div className="container-x flex flex-col gap-20 py-20 md:gap-28 md:py-28">
        {BLOCKS.map((b, i) => (
          <section
            key={b.id}
            id={b.id}
            aria-labelledby={`${b.id}-t`}
            className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20"
          >
            <div className={`reveal img-zoom relative aspect-[4/3] overflow-hidden rounded-card ${i % 2 ? "lg:order-2" : ""}`}>
              <Image
                src={b.img}
                alt={b.alt}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                quality={75}
                placeholder="blur"
                {...(i === 0 ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-5">
              <span className="w-fit rounded-input bg-blue-50 px-2.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-wider text-blue-700">
                {b.tag}
              </span>
              <h2 id={`${b.id}-t`} className="reveal t-h2">
                {b.title}
              </h2>
              <p className="reveal t-lead text-text-soft">{b.text}</p>
              <ul className="reveal flex flex-col gap-3">
                {b.points.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-ok-bg text-ok-text">
                      <CheckIcon width={14} height={14} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

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
