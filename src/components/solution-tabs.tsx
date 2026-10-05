"use client";

import Image, { type StaticImageData } from "next/image";
import { LazyMotion, m } from "motion/react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { LinkButton } from "./button";
import { ArrowIcon, CheckIcon } from "./icons";

const loadFeatures = () => import("@/lib/motion-features").then((m) => m.default);

export type SolutionBlock = {
  id: string;
  tag: string;
  title: string;
  text: string;
  img: StaticImageData;
  alt: string;
  features: { title: string; detail: string }[];
};

export function SolutionTabs({ blocks }: { blocks: SolutionBlock[] }) {
  const [active, setActive] = useState(blocks[0].id);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  // Deep links: /solutions#commercial opens that tab.
  useEffect(() => {
    const sync = () => {
      const id = window.location.hash.slice(1);
      if (blocks.some((b) => b.id === id)) setActive(id);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [blocks]);

  const onKey = (e: KeyboardEvent, i: number) => {
    const n = blocks.length;
    const next = e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowLeft" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(blocks[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <LazyMotion features={loadFeatures}>
      <div
        role="tablist"
        aria-label="Nos solutions"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
      >
        {blocks.map((b, i) => {
          const on = b.id === active;
          return (
            <button
              key={b.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`tab-${b.id}`}
              aria-selected={on}
              aria-controls={`panel-${b.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(b.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={`relative isolate min-h-12 shrink-0 rounded-full border-2 px-6 text-base font-semibold whitespace-nowrap ${
                on ? "border-night text-white" : "border-night/25 text-night hover:border-night"
              }`}
            >
              {on && (
                <m.span
                  layoutId="solution-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-night"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              {b.tag}
            </button>
          );
        })}
      </div>

      <div className="mt-10 md:mt-14">
        {blocks.map((b, i) => (
          <div
            key={b.id}
            role="tabpanel"
            id={`panel-${b.id}`}
            aria-labelledby={`tab-${b.id}`}
            hidden={b.id !== active}
            className="panel-in grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
          >
            <div className="img-zoom relative aspect-[4/3] overflow-hidden rounded-card">
              <Image
                src={b.img}
                alt={b.alt}
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                quality={75}
                placeholder="blur"
                {...(i === 0 ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="t-h2">{b.title}</h2>
              <p className="t-lead text-text-soft">{b.text}</p>
              <div className="divide-y divide-line border-y border-line">
                {b.features.map((f) => (
                  <details key={f.title} className="group">
                    <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 py-3 font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-ok-bg text-ok-text">
                        <CheckIcon width={14} height={14} />
                      </span>
                      <span className="flex-1">{f.title}</span>
                      <span
                        aria-hidden="true"
                        className="relative size-5 shrink-0 before:absolute before:top-1/2 before:left-0 before:h-0.5 before:w-full before:-translate-y-1/2 before:bg-blue-600 after:absolute after:top-0 after:left-1/2 after:h-full after:w-0.5 after:-translate-x-1/2 after:bg-blue-600 after:transition-transform group-open:after:scale-y-0"
                      />
                    </summary>
                    <p className="pr-8 pb-4 pl-9 text-text-soft">{f.detail}</p>
                  </details>
                ))}
              </div>
              <div>
                <LinkButton href="/contact#devis" variant="primary">
                  Demander un devis <ArrowIcon width={18} height={18} />
                </LinkButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </LazyMotion>
  );
}
