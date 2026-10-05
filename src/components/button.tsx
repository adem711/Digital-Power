import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "blue" | "outline" | "gold" | "outline-light";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-sun-600 text-night hover:bg-sun-700 hover:text-white",
  blue: "bg-blue-600 text-white hover:bg-blue-700",
  outline: "border-2 border-night text-night hover:bg-night hover:text-white",
  gold: "bg-sun-400 text-night hover:bg-sun-600",
  "outline-light": "border-2 border-white text-white hover:bg-white hover:text-night",
};

const BASE =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 font-sans text-base font-semibold leading-none whitespace-nowrap transition-colors duration-200 active:scale-[0.98]";

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
    <a
      href={h}
      className={cls}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
