import type { Metadata } from "next";
import { LinkButton } from "@/components/button";
import { Gallery } from "@/components/gallery";
import { ArrowIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Nos réalisations solaires",
  description:
    "Toitures, pergolas bifaciales, structures et onduleurs : découvrez des installations photovoltaïques réalisées par Digital Power en Tunisie.",
  alternates: { canonical: "/realisations" },
};

export default function RealisationsPage() {
  return (
    <>
      <PageHero
        label="Nos réalisations"
        title="Des installations qui parlent d’elles-mêmes"
        lead="Toitures, pergolas, structures et onduleurs : un aperçu de nos chantiers, du montage au raccordement."
      />
      <section aria-label="Galerie" className="container-x py-14 md:py-20">
        <Gallery />
      </section>
      <section className="on-dark bg-night text-white">
        <div className="container-x flex flex-col items-start gap-6 py-16 md:py-20">
          <h2 className="t-h1 max-w-2xl">Votre toit pourrait être le prochain.</h2>
          <LinkButton href="/contact#devis" variant="gold">
            Demander un devis gratuit <ArrowIcon width={18} height={18} />
          </LinkButton>
        </div>
      </section>
    </>
  );
}
