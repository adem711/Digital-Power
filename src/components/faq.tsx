import { FAQ } from "@/lib/content";

export function Faq() {
  return (
    <div className="divide-y divide-line border-y border-line">
      {FAQ.map((f) => (
        <details key={f.q} className="group py-1">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-3 font-display text-xl font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
            {f.q}
            <span
              aria-hidden="true"
              className="relative size-6 shrink-0 before:absolute before:top-1/2 before:left-0 before:h-0.5 before:w-full before:-translate-y-1/2 before:bg-blue-600 after:absolute after:top-0 after:left-1/2 after:h-full after:w-0.5 after:-translate-x-1/2 after:bg-blue-600 after:transition-transform group-open:after:scale-y-0"
            />
          </summary>
          <p className="max-w-2xl pb-5 text-text-soft">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
