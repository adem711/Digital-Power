import type { CSSProperties, ReactNode } from "react";

/** Compact dark page header used by inner pages. */
export function PageHero({
  label,
  title,
  lead,
  children,
}: {
  label: string;
  title: string;
  lead: string;
  children?: ReactNode;
}) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-night text-white">
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="orb breathe pointer-events-none absolute top-1/2 -right-40 -z-10 size-[460px] -translate-y-1/2 md:size-[700px]"
      />
      <div className="container-x relative py-16 md:py-24">
        <p className="t-label text-sun-400">{label}</p>
        <h1 className="rise t-display mt-4 max-w-3xl !text-[clamp(2.25rem,5vw,4rem)]" style={{ "--i": 1 } as CSSProperties}>
          {title}
        </h1>
        <p className="t-lead mt-5 max-w-2xl text-on-night">
          {lead}
        </p>
        {children ? (
          <div className="rise mt-8 flex flex-wrap gap-3" style={{ "--i": 3 } as CSSProperties}>
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
