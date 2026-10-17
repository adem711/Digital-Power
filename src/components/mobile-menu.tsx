"use client";

import Link from "next/link";
import { AnimatePresence, LazyMotion, MotionConfig } from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useRef } from "react";
import { NAV, SITE } from "@/lib/content";
import { buttonClass } from "./button";
import { CloseIcon, PhoneIcon, WhatsAppIcon } from "./icons";

const loadFeatures = () => import("@/lib/motion-features").then((m) => m.default);

const EASE = [0.22, 1, 0.36, 1] as const;

const item = {
  hidden: { opacity: 0, x: 24 },
  show: (i: number) => ({ opacity: 1, x: 0, transition: { delay: 0.12 + i * 0.06, duration: 0.45, ease: EASE } }),
};

/** Slide-over navigation (mobile). Focus is trapped while open; Escape and the scrim close it. */
export default function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () =>
      Array.from(panel.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab") return;
      const f = focusables();
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">
        <AnimatePresence>
          {open && (
            <div className="on-dark fixed inset-0 z-50 lg:hidden">
              <m.div
                className="glass-blur absolute inset-0 bg-night/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={onClose}
                aria-hidden="true"
              />
              <m.div
                ref={panel}
                role="dialog"
                aria-modal="true"
                aria-label="Menu"
                className="glass absolute inset-y-0 right-0 flex w-[min(88vw,380px)] flex-col bg-night p-6 text-white"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <div className="flex items-center justify-between">
                  <p className="t-label text-sun-400">Menu</p>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Fermer le menu"
                    className="flex size-12 items-center justify-center rounded-full border border-white/15 hover:bg-white/10"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <nav aria-label="Navigation mobile" className="mt-8 flex flex-col">
                  {NAV.map((l, i) => (
                    <m.div key={l.href} custom={i} variants={item} initial="hidden" animate="show">
                      <Link
                        href={l.href}
                        onClick={onClose}
                        aria-current={pathname === l.href ? "page" : undefined}
                        className={`flex min-h-14 items-center justify-between border-b border-white/10 font-display text-3xl font-semibold uppercase ${
                          pathname === l.href ? "text-sun-400" : "text-white"
                        }`}
                      >
                        {l.label}
                      </Link>
                    </m.div>
                  ))}
                </nav>

                <m.div
                  className="mt-auto flex flex-col gap-3 pt-8"
                  custom={NAV.length}
                  variants={item}
                  initial="hidden"
                  animate="show"
                >
                  <Link href="/contact#devis" onClick={onClose} className={buttonClass("gold")}>
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
                </m.div>
              </m.div>
            </div>
          )}
        </AnimatePresence>
      </MotionConfig>
    </LazyMotion>
  );
}
