"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NAV, SITE } from "@/lib/content";
import { buttonClass } from "./button";
import { CloseIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from "./icons";

export function Header() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="on-dark sticky top-0 z-40 bg-night text-white">
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <Link href="/" aria-label="Digital Power — accueil" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/lockup-dark.svg" alt="Digital Power" width={113} height={48} className="h-12 w-auto" />
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-8 lg:flex">
          {NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="py-2 text-[15px] font-medium text-on-night transition-colors hover:text-sun-400"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={SITE.phone.href}
            className="flex items-center gap-2 px-2 py-2 font-mono text-[15px] font-medium text-white transition-colors hover:text-sun-400"
          >
            <PhoneIcon width={18} height={18} />
            {SITE.phone.display}
          </a>
          <Link href="/contact#devis" className={buttonClass("gold", "!min-h-11 !px-5 !py-2.5")}>
            Devis gratuit
          </Link>
        </div>

        <button
          ref={btnRef}
          type="button"
          className="-mr-2 flex size-12 items-center justify-center rounded-full text-white lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <CloseIcon width={26} height={26} /> : <MenuIcon width={26} height={26} />}
        </button>
      </div>

      {open && (
        <div id="menu-mobile" className="border-t border-night-line bg-night lg:hidden">
          <nav aria-label="Navigation mobile" className="container-x flex flex-col py-4">
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-night-2 py-4 font-display text-2xl font-semibold uppercase"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-6 flex flex-col gap-3">
              <Link href="/contact#devis" onClick={() => setOpen(false)} className={buttonClass("gold")}>
                Demander un devis gratuit
              </Link>
              <a href={SITE.phone.href} className={buttonClass("outline-light")}>
                <PhoneIcon /> {SITE.phone.display}
              </a>
              <a
                href={SITE.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass("outline-light")}
              >
                <WhatsAppIcon /> WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
