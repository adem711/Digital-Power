import type { CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { LinkButton } from "@/components/button";
import { HeroFX } from "@/components/hero-fx";
import { ArrowIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/icons";
import { SectionHead } from "@/components/section-head";
import { SunMark } from "@/components/sun-mark";
import { BRANDS, SITE, SOLUTIONS, SPEC_CHIPS, STEPS } from "@/lib/content";

import heroPhoto from "@/assets/photos/v07-03-aerial-array-over-terrace.jpg";
import residentiel from "@/assets/photos/v01-06-rooftop-array-house.jpg";
import commercial from "@/assets/photos/v07-05-aerial-array-wide.jpg";
import stockage from "@/assets/photos/v07-12-sungrow-inverters-cabinet.jpg";
import stepSurvey from "@/assets/photos/v07-06-aerial-array-top-down.jpg";
import stepStructure from "@/assets/photos/v01-01-panels-underside-structure.jpg";
import stepInverter from "@/assets/photos/v09-15-sungrow-inverter-protection-boxes.jpg";
import van from "@/assets/photos/v09-21-company-van-door-logo.jpg";
import projPergola from "@/assets/photos/v09-01-pergola-array-side-view.jpg";
import projRoof from "@/assets/photos/v08-06-array-rooftop-edge.jpg";
import projBifacial from "@/assets/photos/v09-12-bifacial-underside-sky.jpg";
import projFinished from "@/assets/photos/v08-01-finished-array-front.jpg";

const SOLUTION_PHOTOS = {
  residentiel: { img: residentiel, alt: "Panneaux solaires posés sur la toiture d’une maison, avec la ville en arrière-plan" },
  commercial: { img: commercial, alt: "Vue aérienne d’une grande installation de panneaux solaires sur une terrasse" },
  stockage: { img: stockage, alt: "Deux onduleurs Sungrow fixés au mur dans un coffret technique" },
} satisfies Record<(typeof SOLUTIONS)[number]["slug"], { img: StaticImageData; alt: string }>;

const PROJECTS = [
  { img: projPergola, alt: "Pergola solaire sur une terrasse carrelée sous un ciel bleu", label: "Pergola solaire" },
  { img: projRoof, alt: "Panneaux solaires en bord de toiture, avec les toits de la ville au fond", label: "Toiture" },
  { img: projBifacial, alt: "Panneaux bifaciaux vus de dessous sous un ciel dégagé", label: "Panneaux bifaciaux" },
  { img: projFinished, alt: "Installation terminée, rangées de panneaux sous un ciel bleu", label: "Installation terminée" },
];

export default function Home() {
  return (
    <>
      {/* 1 — Hero */}
      <section data-hero className="on-dark relative isolate overflow-hidden bg-night text-white">
        <Image
          src={heroPhoto}
          alt="Vue aérienne d’une installation de panneaux solaires sur un toit-terrasse"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          quality={75}
          placeholder="blur"
          className="-z-30 object-cover object-[72%_50%]"
        />
        <div className="absolute inset-0 -z-20 bg-night/60 md:bg-linear-to-r md:from-night/95 md:via-night/50 md:to-night/0" />
        <div className="absolute inset-x-0 bottom-0 -z-20 h-1/4 bg-linear-to-t from-night/90 to-transparent" />
        <HeroFX />
        {/* The one gradient moment of this page: the sun mark */}
        <SunMark
          id="hero-sun"
          spin
          className="pointer-events-none absolute -top-24 -right-28 -z-10 w-[250px] sm:w-[400px] lg:top-1/2 lg:-right-56 lg:w-[640px] lg:-translate-y-1/2"
        />

        <div className="container-x flex min-h-[calc(100svh-72px)] flex-col justify-end pt-32 pb-12 md:pb-16 lg:min-h-[min(780px,calc(100svh-72px))]">
          <p className="rise t-label mb-6 flex items-center gap-3 text-sun-400" style={{ "--i": 0 } as CSSProperties}>
            <span aria-hidden="true" className="pulse-ring relative size-2.5 rounded-full bg-sun-400 text-sun-400" />
            Installation solaire · de l’étude au raccordement
          </p>
          <h1 className="rise t-display max-w-4xl" style={{ "--i": 1 } as CSSProperties}>
            Votre toit est <br className="hidden sm:block" />
            une <span className="text-sun-400">centrale.</span>
          </h1>
          <p className="rise t-lead mt-6 max-w-xl text-on-night" style={{ "--i": 2 } as CSSProperties}>
            Nous étudions, fournissons, posons et raccordons votre installation photovoltaïque. Vous produisez votre
            électricité, vous réduisez votre facture.
          </p>
          <div className="rise mt-9 flex flex-wrap gap-3" style={{ "--i": 3 } as CSSProperties}>
            <LinkButton href="/contact#devis" variant="gold">
              Demander un devis gratuit <ArrowIcon width={18} height={18} />
            </LinkButton>
            <LinkButton href="/offres#estimateur" variant="outline-light">
              Estimer ma puissance
            </LinkButton>
          </div>

          <ul
            aria-label="Ce que nous installons"
            className="rise mt-10 flex flex-wrap gap-3"
            style={{ "--i": 4 } as CSSProperties}
          >
            {SPEC_CHIPS.map((c, i) => (
              <li
                key={c.label}
                className="float-y glass card-lift on-dark flex items-center gap-3 rounded-full py-2.5 pr-5 pl-3"
                style={{ "--i": i } as CSSProperties}
              >
                <span className="flex size-8 items-center justify-center rounded-full bg-sun-400/15 text-sun-400">
                  <span className="size-2 rounded-full bg-sun-400 shadow-[0_0_10px_2px_rgb(242_194_0/0.7)]" />
                </span>
                <span className="leading-tight">
                  <span className="block font-mono text-[10px] tracking-[0.14em] text-on-night-muted uppercase">
                    {c.label}
                  </span>
                  <span className="block text-sm font-semibold">{c.value}</span>
                </span>
              </li>
            ))}
          </ul>

          <p
            className="rise t-label mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-on-night-muted"
            style={{ "--i": 5 } as CSSProperties}
          >
            <PinIcon width={16} height={16} className="text-sun-400" />
            {SITE.agencies.join(" · ")}
          </p>
        </div>
      </section>

      {/* 2 — Equipment strip */}
      <section aria-label="Marques de matériel" className="border-b border-line bg-white">
        <div className="container-x flex flex-col gap-4 py-7 md:flex-row md:items-center md:gap-10">
          <p className="t-label shrink-0 text-muted">Matériel de marques reconnues</p>
          <ul className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-sm font-medium uppercase tracking-[0.14em] text-night">
            {BRANDS.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3 — Solutions */}
      <section aria-labelledby="solutions" className="container-x flex flex-col gap-10 py-20 md:py-28">
        <SectionHead n="01" title="Solutions" id="solutions" />
        <div className="grid gap-6 md:grid-cols-3">
          {SOLUTIONS.map((s) => (
            <article
              key={s.slug}
              className="reveal card-lift flex flex-col overflow-hidden rounded-card border border-line bg-white"
            >
              <div className="img-zoom relative aspect-[4/3] overflow-hidden">
                <Image
                  src={SOLUTION_PHOTOS[s.slug].img}
                  alt={SOLUTION_PHOTOS[s.slug].alt}
                  fill
                  sizes="(min-width: 768px) 400px, 100vw"
                  quality={75}
                  placeholder="blur"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <span className="w-fit rounded-input bg-blue-50 px-2.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-wider text-blue-700">
                  {s.tag}
                </span>
                <h3 className="t-h3">{s.title}</h3>
                <p className="text-text-soft">{s.text}</p>
                <Link
                  href={`/solutions#${s.slug}`}
                  className="mt-auto inline-flex items-center gap-2 pt-3 font-semibold text-blue-600 hover:text-night"
                >
                  En savoir plus <ArrowIcon width={18} height={18} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4 — Process */}
      <section aria-labelledby="methode" className="on-dark bg-night text-white">
        <div className="container-x grid gap-14 py-20 md:py-28 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="flex flex-col gap-10">
            <SectionHead n="02" title="Notre méthode" dark id="methode" />
            <h3 className="reveal t-h1 max-w-lg">
              Du premier appel au <span className="text-sun-400">premier kilowattheure.</span>
            </h3>
            <p className="reveal t-lead max-w-md text-on-night">
              Cinq étapes simples. Un seul interlocuteur du début à la fin.
            </p>
            <div className="relative mt-4 hidden h-[420px] lg:block">
              <div className="parallax-slow absolute top-0 left-0 w-[62%] overflow-hidden rounded-card shadow-2xl">
                <Image
                  src={stepSurvey}
                  alt="Vue du dessus d’une installation de panneaux solaires sur un toit-terrasse"
                  sizes="340px"
                  quality={75}
                  placeholder="blur"
                  className="aspect-[4/3] object-cover"
                />
              </div>
              <div className="parallax-slow absolute right-0 bottom-0 w-[52%] overflow-hidden rounded-card shadow-2xl ring-4 ring-night">
                <Image
                  src={stepStructure}
                  alt="Dessous de panneaux solaires fixés sur leur structure métallique"
                  sizes="300px"
                  quality={75}
                  placeholder="blur"
                  className="aspect-[4/3] object-cover"
                />
              </div>
              <div className="absolute bottom-[-30px] left-[8%] w-[34%] overflow-hidden rounded-card shadow-2xl ring-4 ring-night">
                <Image
                  src={stepInverter}
                  alt="Onduleur Sungrow et coffrets de protection installés au mur"
                  sizes="200px"
                  quality={75}
                  placeholder="blur"
                  className="aspect-square object-cover"
                />
              </div>
            </div>
          </div>

          <ol className="relative flex flex-col gap-10">
            <span aria-hidden="true" className="absolute top-2 bottom-2 left-[19px] w-px bg-night-line" />
            <span aria-hidden="true" className="draw-line absolute top-2 bottom-2 left-[19px] w-px bg-sun-400" />
            {STEPS.map((s, i) => (
              <li key={s.title} className="reveal relative flex gap-5">
                <span className="relative z-10 mt-5 flex size-10 shrink-0 items-center justify-center rounded-full border border-sun-400 bg-night font-mono text-sm font-medium text-sun-400">
                  {i + 1}
                </span>
                <div className="glass card-lift on-dark flex-1 rounded-card p-5 md:p-6">
                  <h4 className="t-h3 text-white">{s.title}</h4>
                  <p className="mt-2 max-w-md text-on-night">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 — We come to you / agencies */}
      <section aria-labelledby="proximite" className="container-x flex flex-col gap-10 py-20 md:py-28">
        <SectionHead n="03" title="Près de chez vous" id="proximite" />
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="reveal img-zoom relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-card lg:max-w-none">
            <Image
              src={van}
              alt="Camionnette Digital Power, portière avec le logo et le numéro de téléphone"
              fill
              sizes="(min-width: 1024px) 460px, 90vw"
              quality={75}
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-8">
            <h3 className="reveal t-h1">Nous venons chez vous.</h3>
            <p className="reveal t-lead max-w-xl text-text-soft">
              Pas besoin de vous déplacer : notre équipe se rend sur place pour la visite technique, puis pour
              l’installation. Quatre agences pour rester proches de nos clients.
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {SITE.agencies.map((a) => (
                <li
                  key={a}
                  className="reveal card-lift flex items-center gap-4 rounded-card border border-line bg-white p-5"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sun-50 text-sun-900">
                    <PinIcon />
                  </span>
                  <div>
                    <p className="font-display text-2xl leading-none font-bold">{a}</p>
                    <p className="t-label mt-1.5 text-muted">Agence</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted">{SITE.hours}</p>
            <div className="flex flex-wrap gap-3">
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

      {/* 6 — Projects teaser */}
      <section aria-labelledby="realisations" className="bg-white">
        <div className="container-x flex flex-col gap-10 py-20 md:py-28">
          <SectionHead n="04" title="Nos installations" id="realisations" />
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {PROJECTS.map((p) => (
              <li key={p.label} className="reveal img-zoom relative aspect-[3/4] overflow-hidden rounded-card">
                <Image
                  src={p.img}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 768px) 300px, 50vw"
                  quality={75}
                  placeholder="blur"
                  className="object-cover"
                />
                <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-night/85 to-transparent p-4 pt-12 font-mono text-[11px] font-medium uppercase tracking-wider text-white">
                  {p.label}
                </span>
              </li>
            ))}
          </ul>
          <div>
            <LinkButton href="/realisations" variant="outline">
              Toutes nos réalisations <ArrowIcon width={18} height={18} />
            </LinkButton>
          </div>
        </div>
      </section>

      {/* 7 — Closing CTA */}
      <section aria-labelledby="devis" className="on-dark relative isolate overflow-hidden bg-night text-white">
        <div aria-hidden="true" className="grid-bg absolute inset-0 -z-10 opacity-60" />
        <div
          aria-hidden="true"
          className="orb breathe absolute top-1/2 -right-32 -z-10 size-[560px] -translate-y-1/2 lg:size-[820px]"
        />
        <div className="container-x flex flex-col items-start gap-8 py-20 md:py-28">
          <p className="t-label text-sun-400">Devis gratuit · sans engagement</p>
          <h2 id="devis" className="reveal t-display max-w-3xl">
            Parlons de votre toit.
          </h2>
          <p className="reveal t-lead max-w-xl text-on-night">
            Dites-nous où vous habitez et combien vous payez d’électricité. Nous vous répondons avec une première
            estimation.
          </p>
          <div className="reveal flex flex-wrap gap-3">
            <LinkButton href="/contact#devis" variant="gold">
              Demander un devis gratuit <ArrowIcon width={18} height={18} />
            </LinkButton>
            <LinkButton href={SITE.whatsapp.href} variant="outline-light">
              <WhatsAppIcon /> Écrire sur WhatsApp
            </LinkButton>
            <LinkButton href="/offres#estimateur" variant="outline-light">
              Estimer ma puissance
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
