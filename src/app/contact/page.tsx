import type { Metadata } from "next";
import Image from "next/image";
import { LinkButton } from "@/components/button";
import { FacebookIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { QuoteForm } from "@/components/quote-form";
import { SITE } from "@/lib/content";

import van from "@/assets/photos/v09-22-company-van-graphic-closeup.jpg";

export const metadata: Metadata = {
  title: "Contact et devis gratuit",
  description:
    "Demandez un devis solaire gratuit à Digital Power : téléphone, WhatsApp ou formulaire. Agences à Sfax, Tunis, Sousse et Mahrès.",
  alternates: { canonical: "/contact" },
};

const rowCls = "flex items-center gap-4 rounded-card border border-night-line p-4 hover:bg-night-2";

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Parlons de votre toit"
        lead="Appelez-nous, écrivez-nous sur WhatsApp ou laissez-nous votre demande : nous vous répondons avec une première estimation."
      >
        <LinkButton href={SITE.phone.href} variant="gold">
          <PhoneIcon /> {SITE.phone.display}
        </LinkButton>
        <LinkButton href={SITE.whatsapp.href} variant="outline-light">
          <WhatsAppIcon /> WhatsApp
        </LinkButton>
      </PageHero>

      <div className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
        <section id="devis" aria-labelledby="devis-t" className="flex flex-col gap-8">
          <div>
            <p className="t-label text-blue-600">Devis gratuit</p>
            <h2 id="devis-t" className="t-h1 mt-2">
              Demandez votre devis
            </h2>
          </div>
          <div className="rounded-card border border-line bg-white p-6 md:p-8">
            <QuoteForm />
          </div>
        </section>

        <aside aria-label="Coordonnées" className="flex flex-col gap-6">
          <div className="on-dark flex flex-col gap-4 rounded-card bg-night p-7 text-white">
            <p className="t-label text-sun-400">Nous joindre directement</p>
            <a href={SITE.phone.href} className={rowCls}>
              <span className="flex size-11 items-center justify-center rounded-full bg-sun-400 text-night">
                <PhoneIcon />
              </span>
              <span>
                <span className="block text-sm text-on-night-muted">Téléphone</span>
                <span className="font-mono text-lg font-medium">{SITE.phone.display}</span>
              </span>
            </a>
            <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" className={rowCls}>
              <span className="flex size-11 items-center justify-center rounded-full bg-blue-600 text-white">
                <WhatsAppIcon />
              </span>
              <span>
                <span className="block text-sm text-on-night-muted">WhatsApp</span>
                <span className="font-mono text-lg font-medium">{SITE.whatsapp.display}</span>
              </span>
            </a>
            <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" className={rowCls}>
              <span className="flex size-11 items-center justify-center rounded-full bg-night-2 text-white">
                <FacebookIcon />
              </span>
              <span>
                <span className="block text-sm text-on-night-muted">Facebook</span>
                <span className="font-medium">digital.power.tn</span>
              </span>
            </a>
          </div>

          <div className="rounded-card border border-line bg-white p-7">
            <p className="t-label text-blue-600">Nos agences</p>
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {SITE.agencies.map((a) => (
                <li key={a} className="flex items-center gap-2.5 font-display text-xl font-bold">
                  <PinIcon width={18} height={18} className="text-sun-900" />
                  {a}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted">{SITE.hours}</p>
          </div>

          <div className="img-zoom relative hidden aspect-[4/3] overflow-hidden rounded-card lg:block">
            <Image
              src={van}
              alt="Détail de la camionnette Digital Power avec ses visuels"
              fill
              sizes="420px"
              quality={75}
              placeholder="blur"
              className="object-cover"
            />
          </div>
        </aside>
      </div>
    </>
  );
}
