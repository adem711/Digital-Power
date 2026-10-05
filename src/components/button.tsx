import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "blue" | "outline" | "gold" | "outline-light";

/**
 * Hover = a fill layer and a glow layer fade in (opacity), the pill lifts (transform).
 * Text colour switches instantly: only transform and opacity are ever animated.
 */
const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-sun-600 text-night hover:text-white [--btn-hover:var(--color-sun-700)] [--btn-glow:rgb(240_138_0/0.55)]",
  blue: "bg-blue-600 text-white [--btn-hover:var(--color-blue-700)] [--btn-glow:rgb(29_95_209/0.55)]",
  outline:
    "border-2 border-night text-night hover:text-white [--btn-hover:var(--color-night)] [--btn-glow:rgb(15_27_45/0.35)]",
  gold: "bg-sun-400 text-night [--btn-hover:var(--color-sun-600)] [--btn-glow:rgb(242_194_0/0.6)]",
  "outline-light":
    "border-2 border-white text-white hover:text-night [--btn-hover:#fff] [--btn-glow:rgb(255_255_255/0.4)]",
};

const BASE =
  "btn inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 font-sans text-base font-semibold leading-none whitespace-nowrap";

export function buttonClass(variant: Variant = "primary", extra = "") {
  return `${BASE} ${VARIANTS[variant]} ${extra}`.trim();
}

type Props = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

/** Pill link-button. Internal routes use next/link; tel:/https: use a plain anchor. */
export function LinkButton({ variant = "primary", className = "", href, children, ...rest }: Props) {
  const cls = buttonClass(variant, className);
  const h = String(href);
  if (h.startsWith("/") || h.startsWith("#")) {
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  const external = h.startsWith("http");
  return (
    <a href={h} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
}
