import type { Metadata } from "next";
import { LinkButton } from "@/components/button";
import { PageHero } from "@/components/page-hero";
import { PhoneIcon } from "@/components/icons";
import { SITE } from "@/lib/content";

export const metadata: Metadata = { title: "Page introuvable", robots: { index: false } };

export default function NotFound() {
  return (
    <PageHero
      label="Erreur 404"
      title="Cette page n’existe pas"
      lead="Le lien est peut-être incorrect ou la page a été déplacée. Revenez à l’accueil ou appelez-nous."
    >
      <LinkButton href="/" variant="gold">
        Retour à l’accueil
      </LinkButton>
      <LinkButton href={SITE.phone.href} variant="outline-light">
        <PhoneIcon /> {SITE.phone.display}
      </LinkButton>
    </PageHero>
  );
}
