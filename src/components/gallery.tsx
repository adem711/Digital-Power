"use client";

import Image from "next/image";
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { GALLERY, GALLERY_FILTERS, type GalleryCategory } from "@/lib/gallery";
import { ArrowIcon, CloseIcon } from "./icons";

export function Gallery() {
  const [filter, setFilter] = useState<"all" | GalleryCategory>("all");
  const [open, setOpen] = useState<number | null>(null);
  // Layout animations are only worth their measuring cost once the visitor starts filtering.
  const [filtered, setFiltered] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const items = GALLERY.filter((g) => filter === "all" || g.cat === filter);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
  }, [open]);

  const step = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, step]);

  const current = open !== null ? items[open] : null;

  return (
    <LazyMotion features={domAnimation}>
      <div role="group" aria-label="Filtrer les réalisations" className="flex flex-wrap gap-2">
        {GALLERY_FILTERS.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setFiltered(true);
                setFilter(f.id);
              }}
              className={`min-h-11 rounded-full px-5 text-[15px] font-semibold transition-colors ${
                active ? "bg-night text-white" : "border-2 border-night text-night hover:bg-night hover:text-white"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>
      <p className="mt-4 font-mono text-xs tracking-widest text-muted uppercase" aria-live="polite">
        {items.length} photos
      </p>

      <ul className="mt-6 grid auto-rows-[120px] grid-cols-2 gap-3 md:auto-rows-[150px] md:grid-cols-3 md:gap-5">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((g, i) => {
            const portrait = g.src.height > g.src.width;
            return (
              <m.li
                key={g.src.src}
                layout={filtered}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={portrait ? "row-span-3" : "row-span-2"}
              >
                <button
                  type="button"
                  aria-label={`Agrandir : ${g.alt}`}
                  onClick={(e) => {
                    lastFocus.current = e.currentTarget;
                    setOpen(i);
                  }}
                  className="img-zoom relative block size-full overflow-hidden rounded-card bg-night-2"
                >
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes="(min-width: 768px) 380px, 50vw"
                    quality={60}
                    loading={i < 4 ? "eager" : "lazy"}
                    className="object-cover"
                  />
                </button>
              </m.li>
            );
          })}
        </AnimatePresence>
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Photo agrandie"
        onClose={() => {
          setOpen(null);
          lastFocus.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        className="on-dark fixed inset-0 m-auto h-dvh max-h-none w-screen max-w-none bg-night/95 p-0 text-white backdrop:bg-night"
      >
        {current && (
          <div className="relative flex h-full flex-col">
            <div className="flex items-center justify-between gap-4 p-4 md:px-8">
              <p className="font-mono text-xs tracking-widest uppercase">
                {(open ?? 0) + 1} / {items.length}
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Fermer"
                className="flex size-12 items-center justify-center rounded-full border border-night-line hover:bg-night-2"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="relative flex-1">
              <Image
                key={current.src.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                quality={75}
                placeholder="blur"
                className="object-contain px-2 md:px-20"
              />
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Photo précédente"
                className="absolute top-1/2 left-2 flex size-12 -translate-y-1/2 rotate-180 items-center justify-center rounded-full bg-night/80 hover:bg-night-2 md:left-6"
              >
                <ArrowIcon />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Photo suivante"
                className="absolute top-1/2 right-2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-night/80 hover:bg-night-2 md:right-6"
              >
                <ArrowIcon />
              </button>
            </div>
            <p className="p-4 text-center text-sm text-on-night md:pb-6">{current.alt}</p>
          </div>
        )}
      </dialog>
    </LazyMotion>
  );
}
