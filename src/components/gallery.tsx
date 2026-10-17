"use client";

import Image from "next/image";
import { AnimatePresence, LazyMotion, MotionConfig, type PanInfo } from "motion/react";
import * as m from "motion/react-m";
import { useCallback, useEffect, useRef, useState } from "react";
import { GALLERY, GALLERY_FILTERS, type GalleryCategory } from "@/lib/gallery";
import { ArrowIcon, CloseIcon } from "./icons";

const loadFeatures = () => import("@/lib/motion-features").then((m) => m.default);
const EASE = [0.22, 1, 0.36, 1] as const;

/** "Tout" view: round-robin across categories so the first rows show variety, not five similar rooftops. */
function interleave(list: typeof GALLERY) {
  const groups = new Map<string, typeof GALLERY>();
  for (const g of list) groups.set(g.cat, [...(groups.get(g.cat) ?? []), g]);
  const out: typeof GALLERY = [];
  for (let i = 0; out.length < list.length; i++) {
    for (const group of groups.values()) {
      const item = group[i];
      if (item) out.push(item);
    }
  }
  return out;
}
const INTERLEAVED = interleave(GALLERY);
const INITIAL_VISIBLE = 8;

export function Gallery() {
  const [filter, setFilter] = useState<"all" | GalleryCategory>("all");
  const [open, setOpen] = useState<number | null>(null);
  const [dir, setDir] = useState<1 | -1>(1);
  const [closing, setClosing] = useState(false);
  // Layout animations are only worth their measuring cost once the visitor starts filtering.
  const [filtered, setFiltered] = useState(false);
  // Only the first rows are mounted at load; the rest follow right after, so ~30 thumbnails never
  // compete with fonts and the hero for bandwidth during the initial render (mobile LCP).
  const [revealAll, setRevealAll] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const items = filter === "all" ? INTERLEAVED : GALLERY.filter((g) => g.cat === filter);

  const requestClose = useCallback(() => setClosing(true), []);

  useEffect(() => {
    const id = window.setTimeout(() => setRevealAll(true), 1500);
    return () => window.clearTimeout(id);
  }, []);
  const visible = revealAll || filtered ? items : items.slice(0, INITIAL_VISIBLE);

  useEffect(() => {
    const d = dialogRef.current;
    if (d && open !== null && !d.open) d.showModal();
  }, [open]);

  const step = useCallback(
    (d: 1 | -1) => {
      setDir(d);
      setOpen((i) => (i === null ? i : (i + d + items.length) % items.length));
    },
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

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -70 || info.velocity.x < -500) step(1);
    else if (info.offset.x > 70 || info.velocity.x > 500) step(-1);
  };

  const current = open !== null ? items[open] : null;

  return (
    <LazyMotion features={loadFeatures}>
      <MotionConfig reducedMotion="user">
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
                className={`relative isolate min-h-11 rounded-full border-2 px-5 text-[15px] font-semibold ${
                  active ? "border-night text-white" : "border-night/25 text-night hover:border-night"
                }`}
              >
                {active && (
                  <m.span
                    layoutId="gallery-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-night"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
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
            {visible.map((g, i) => {
              const portrait = g.src.height > g.src.width;
              return (
                <m.li
                  key={g.src.src}
                  layout={filtered}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className={portrait ? "row-span-3" : "row-span-2"}
                >
                  <button
                    type="button"
                    aria-label={`Agrandir : ${g.alt}`}
                    onClick={(e) => {
                      lastFocus.current = e.currentTarget;
                      setClosing(false);
                      setOpen(i);
                    }}
                    className="img-zoom group relative block size-full overflow-hidden rounded-card bg-night-2"
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
                    {/* hover veil + zoom hint, opacity only */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 flex items-end justify-end bg-linear-to-t from-night/70 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                    >
                      <span className="glass glass-blur flex size-9 items-center justify-center rounded-full text-white">
                        <ArrowIcon width={16} height={16} className="-rotate-45" />
                      </span>
                    </span>
                  </button>
                </m.li>
              );
            })}
          </AnimatePresence>
        </ul>

        <dialog
          ref={dialogRef}
          aria-label="Photo agrandie"
          onCancel={(e) => {
            e.preventDefault();
            requestClose();
          }}
          onClose={() => {
            setOpen(null);
            setClosing(false);
            lastFocus.current?.focus();
          }}
          className="on-dark fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden bg-transparent p-0 text-white backdrop:bg-transparent"
        >
          {current && (
            <m.div
              className="relative flex h-full flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: closing ? 0 : 1 }}
              transition={{ duration: 0.3, ease: EASE }}
              onAnimationComplete={() => {
                if (closing) dialogRef.current?.close();
              }}
            >
              <div aria-hidden="true" className="glass-blur absolute inset-0 bg-night/85" onClick={requestClose} />
              <div className="relative z-10 flex items-center justify-between gap-4 p-4 md:px-8">
                <p className="font-mono text-xs tracking-widest uppercase">
                  {(open ?? 0) + 1} / {items.length}
                </p>
                <button
                  type="button"
                  onClick={requestClose}
                  aria-label="Fermer"
                  className="glass flex size-12 items-center justify-center rounded-full hover:bg-white/10"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="relative z-10 min-h-0 flex-1">
                <AnimatePresence mode="wait" initial={false} custom={dir}>
                  <m.div
                    key={current.src.src}
                    custom={dir}
                    className="absolute inset-0 cursor-grab active:cursor-grabbing"
                    variants={{
                      enter: (d: number) => ({ opacity: 0, x: d * 48 }),
                      center: { opacity: 1, x: 0 },
                      exit: (d: number) => ({ opacity: 0, x: d * -48 }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.32, ease: EASE }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={onDragEnd}
                  >
                    <Image
                      src={current.src}
                      alt={current.alt}
                      fill
                      sizes="100vw"
                      quality={75}
                      draggable={false}
                      className="object-contain px-2 md:px-24"
                    />
                  </m.div>
                </AnimatePresence>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Photo précédente"
                  className="glass glass-blur absolute top-1/2 left-2 z-20 flex size-12 -translate-y-1/2 rotate-180 items-center justify-center rounded-full hover:bg-white/10 md:left-6"
                >
                  <ArrowIcon />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Photo suivante"
                  className="glass glass-blur absolute top-1/2 right-2 z-20 flex size-12 -translate-y-1/2 items-center justify-center rounded-full hover:bg-white/10 md:right-6"
                >
                  <ArrowIcon />
                </button>
              </div>
              <p className="relative z-10 p-4 text-center text-sm text-on-night md:pb-6">{current.alt}</p>
            </m.div>
          )}
        </dialog>
      </MotionConfig>
    </LazyMotion>
  );
}
