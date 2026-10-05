import Link from "next/link";
import { NAV, SITE } from "@/lib/content";
import { FacebookIcon, PhoneIcon, WhatsAppIcon } from "./icons";

export function Footer() {
  return (
    <footer className="on-dark bg-night text-on-night">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/lockup-dark.svg" alt="Digital Power" width={141} height={60} className="h-[60px] w-auto" />
          <p className="mt-5 text-[15px] leading-relaxed">
            Installation solaire photovoltaïque pour les maisons et les entreprises en Tunisie : étude, fourniture,
            pose et raccordement.
          </p>
        </div>

        <div>
          <h2 className="t-label text-sun-400">Navigation</h2>
          <ul className="mt-4 space-y-1">
            {NAV.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-block py-1.5 transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/mentions-legales" className="inline-block py-1.5 transition-colors hover:text-white">
                Mentions légales
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="t-label text-sun-400">Contact</h2>
          <ul className="mt-4 space-y-1">
            <li>
              <a href={SITE.phone.href} className="inline-flex items-center gap-2 py-1.5 hover:text-white">
                <PhoneIcon width={18} height={18} /> {SITE.phone.display}
              </a>
            </li>
            <li>
              <a
                href={SITE.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-1.5 hover:text-white"
              >
                <WhatsAppIcon width={18} height={18} /> WhatsApp {SITE.whatsapp.display}
              </a>
            </li>
            <li>
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-1.5 hover:text-white"
              >
                <FacebookIcon width={18} height={18} /> Facebook
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="t-label text-sun-400">Nos agences</h2>
          <ul className="mt-4 space-y-1">
            {SITE.agencies.map((a) => (
              <li key={a} className="py-1.5">
                {a}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-on-night-muted">{SITE.hours}</p>
        </div>
      </div>

      <div className="border-t border-night-2">
        <div className="container-x flex flex-col gap-2 pt-6 pb-24 text-sm text-on-night-muted sm:flex-row md:pb-6 sm:justify-between">
          <p>© {new Date().getFullYear()} Digital Power. Tous droits réservés.</p>
          <p className="font-mono text-xs uppercase tracking-widest">Énergie propre, ingénierie sérieuse</p>
        </div>
      </div>
    </footer>
  );
}
