"use client";

import { buttonClass, LinkButton } from "@/components/button";
import { PhoneIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { SITE } from "@/lib/content";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <PageHero
      label="Erreur"
      title="Un problème est survenu"
      lead="Désolé, cette page n’a pas pu s’afficher. Réessayez, ou contactez-nous directement."
    >
      <button type="button" onClick={reset} className={buttonClass("gold")}>
        Réessayer
      </button>
      <LinkButton href={SITE.phone.href} variant="outline-light">
        <PhoneIcon /> {SITE.phone.display}
      </LinkButton>
    </PageHero>
  );
}
