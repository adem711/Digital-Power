"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { NAV, SITE } from "@/lib/content";
import { buttonClass } from "./button";
import { MenuIcon, PhoneIcon } from "./icons";

// Code-split: the slide-over (and Motion) load only when the menu is first used.
const loadMenu = () => import("./mobile-menu");
const MobileMenu = dynamic(loadMenu);

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    btnRef.current?.focus();
  }, []);

  return (
    <header className="on-dark sticky top-0 z-40 text-white">
      {/* Two crossfading layers: solid Night at the top of the page, blurred glass once scrolled */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 bg-night transition-opacity duration-300 ${scrolled ? "opacity-0" : "opacity-100"}`}
      />
      <div
        aria-hidden="true"
        className={`glass-blur absolute inset-0 -z-10 border-b border-white/10 bg-night/92 transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0"}`}
      />

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
              aria-current={pathname === l.href ? "page" : undefined}
              className="link-u py-2 text-[15px] font-medium text-on-night hover:text-white aria-[current=page]:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={SITE.phone.href}
            className="flex items-center gap-2 px-2 py-2 font-mono text-[15px] font-medium text-white hover:text-sun-400"
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
          className="-mr-2 flex size-12 items-center justify-center rounded-full text-white hover:bg-white/10 lg:hidden"
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-label="Ouvrir le menu"
          onPointerEnter={() => loadMenu()}
          onFocus={() => loadMenu()}
          onClick={() => {
            setEverOpened(true);
            setOpen(true);
          }}
        >
          <MenuIcon width={26} height={26} />
        </button>
      </div>

      {everOpened && <MobileMenu open={open} onClose={close} pathname={pathname} />}
    </header>
  );
}
