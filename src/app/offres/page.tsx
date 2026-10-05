import type { Metadata } from "next";
import Image from "next/image";
import { LinkButton } from "@/components/button";
import { DemoBadge } from "@/components/demo-badge";
import { ArrowIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { SectionHead } from "@/components/section-head";
import { OFFERS, SITE, STEPS } from "@/lib/content";

import van from "@/assets/photos/v09-19-company-van-side-graphics.jpg";
import closeup from "@/assets/photos/v03-16-solar-array-closeup.jpg";

export const metadata: Metadata = {
  title: "Offres, garantie et paiement échelonné",
  description:
    "Garantie, paiement échelonné et packs solaires Digital Power : contactez-nous pour connaître les conditions applicables à votre projet.",
  alternates: { canonical: "/offres" },
};

export default function OffresPage() {
  return (
    <>
      <PageHero
        label="Offres & garantie"
        title="Un projet clair, des conditions écrites"
        lead="Garantie, paiement échelonné, packs : nous vous donnons les conditions exactes dans votre devis, avant tout engagement."
      >
        <LinkButton href="/contact#devis" variant="gold">
          Demander un devis gratuit <ArrowIcon width={18} height={18} />
        </LinkButton>
      </PageHero>

      {/* DEMO — remove this banner and the DemoBadges once the owner confirms the terms (see CLAUDE.md) */}
      <div className="border-b border-sun-200 bg-sun-50">
        <p className="container-x py-3 text-sm text-sun-900">
          <strong className="font-semibold">Contenu d’exemple :</strong> les chiffres ci-dessous reprennent des
          mentions vues sur nos supports, mais leurs conditions ne sont pas encore confirmées.
        </p>
      </div>

      <section aria-labelledby="offres" className="container-x flex flex-col gap-10 py-20 md:py-28">
        <SectionHead n="01" title="Nos engagements" id="offres" />
        <div className="grid gap-6 md:grid-cols-3">
          {OFFERS.map((o) => (
            <article
              key={o.title}
              className="reveal card-lift flex flex-col gap-4 rounded-card border border-line bg-white p-7"
            >
              <DemoBadge />
              <p className="t-label text-blue-600">{o.title}</p>
              <p className="t-data !text-[2.75rem]">{o.big}</p>
              <p className="text-text-soft">{o.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="paiement" className="bg-white">
        <div className="container-x grid items-center gap-12 py-20 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="reveal img-zoom relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-card lg:max-w-none">
            <Image
              src={van}
              alt="Côté de la camionnette Digital Power avec l’affiche de l’offre de paiement échelonné"
              fill
              sizes="(min-width: 1024px) 460px, 90vw"
              quality={75}
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-6">
            <h2 id="paiement" className="reveal t-h1">
              Payer votre installation sans vous étrangler.
            </h2>
            <p className="reveal t-lead max-w-xl text-text-soft">
              Nous vous proposons de répartir le coût de votre installation dans le temps. Appelez-nous : nous
              regardons ensemble la formule qui correspond à votre situation.
            </p>
            <div className="reveal flex flex-wrap gap-3">
              <LinkButton href={SITE.phone.href} variant="primary">
                <PhoneIcon /> Appeler le {SITE.phone.display}
              </LinkButton>
              <LinkButton href={SITE.whatsapp.href} variant="outline">
                <WhatsAppIcon /> WhatsApp
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="demarche" className="on-dark bg-night text-white">
        <div className="container-x grid gap-12 py-20 md:py-28 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="flex flex-col gap-8">
            <SectionHead n="02" title="Comment ça se passe" dark id="demarche" />
            <p className="reveal t-lead text-on-night">
              Cinq étapes, un seul interlocuteur. Aucune ligne cachée dans le devis.
            </p>
            <div className="reveal img-zoom relative hidden aspect-[16/9] overflow-hidden rounded-card lg:block">
              <Image
                src={closeup}
                alt="Gros plan sur un champ de panneaux solaires"
                fill
                sizes="520px"
                quality={75}
                placeholder="blur"
                className="object-cover"
              />
            </div>
          </div>
          <ol className="flex flex-col">
            {STEPS.map((s, i) => (
              <li key={s.title} className="reveal flex gap-5 border-b border-night-line py-6 first:pt-0 last:border-b-0">
                <span className="font-mono text-sm font-medium text-sun-400">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="t-h3">{s.title}</h3>
                  <p className="mt-2 max-w-lg text-on-night">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
