"use client";

import { useEffect } from "react";

/**
 * Writes the pointer position (-0.5…0.5) to --px / --py on the hero element. CSS does the rest
 * (transform-only `translate` with a transition). Skipped for touch devices and reduced motion,
 * and attached only once the browser is idle so it never competes with first paint.
 */
export function PointerParallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    if (!hero) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        hero.style.setProperty("--px", String(e.clientX / window.innerWidth - 0.5));
        hero.style.setProperty("--py", String(e.clientY / window.innerHeight - 0.5));
      });
    };

    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 600));
    const handle = idle(() => window.addEventListener("pointermove", onMove, { passive: true }));
    return () => {
      if (window.cancelIdleCallback && typeof handle === "number") window.cancelIdleCallback(handle);
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
