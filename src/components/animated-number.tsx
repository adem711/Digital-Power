"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Counts up when scrolled into view and tweens smoothly whenever `value` changes.
 * Reduced motion: the final value is shown immediately. Server HTML already contains the final value.
 */
export function AnimatedNumber({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useRef(0);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fmt = (n: number) =>
      n.toLocaleString("fr-FR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    if (reduce) {
      el.textContent = fmt(value);
      shown.current = value;
      return;
    }
    if (!inView) {
      el.textContent = fmt(0);
      return;
    }
    const controls = animate(shown.current, value, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        shown.current = v;
        el.textContent = fmt(v);
      },
    });
    return () => controls.stop();
  }, [value, decimals, inView, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString("fr-FR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
    </span>
  );
}
