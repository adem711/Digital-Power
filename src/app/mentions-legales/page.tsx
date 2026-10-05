import type { Metadata } from "next";
import { DemoBadge } from "@/components/demo-badge";
import { PageHero } from "@/components/page-hero";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: false },
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero
        label="Informations légales"
        title="Mentions légales"
        lead="Éditeur du site, hébergement et données personnelles."
      />
      <section className="container-x max-w-3xl py-16 md:py-24">
        {/* DEMO — legal identity fields to be completed by the owner */}
        <div className="flex flex-col gap-10 text-text-soft">
          <div className="flex flex-col gap-3">
            <DemoBadge>À compléter</DemoBadge>
            <h2 className="t-h2 text-ink">Éditeur</h2>
            <p>
              {SITE.name}, installation solaire photovoltaïque. Raison sociale, forme juridique, matricule fiscal et
              adresse du siège : à compléter.
            </p>
            <p>
              Téléphone : {SITE.phone.display} · WhatsApp : {SITE.whatsapp.display}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="t-h2 text-ink">Hébergement</h2>
            <p>Site hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.</p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="t-h2 text-ink">Données personnelles</h2>
            <p>
              Les informations saisies dans le formulaire de devis (nom, téléphone, ville, type de bien, facture,
              message) sont utilisées uniquement pour répondre à votre demande. Elles ne sont ni vendues ni cédées. Le
              site n’utilise pas de cookies de suivi publicitaire.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
