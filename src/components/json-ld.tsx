import { SITE } from "@/lib/content";

/** Structured data. No street address or opening hours until the owner confirms them (see CLAUDE.md). */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    logo: `${SITE.url}/brand/emblem.svg`,
    image: `${SITE.url}/opengraph-image.jpg`,
    telephone: SITE.phone.e164,
    areaServed: SITE.agencies.map((name) => ({ "@type": "City", name })),
    sameAs: [SITE.facebook],
    knowsAbout: ["Installation solaire photovoltaïque", "Onduleurs", "Stockage d’énergie"],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
