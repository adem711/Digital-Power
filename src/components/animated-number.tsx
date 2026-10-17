"use client";

import { useEffect, useRef } from "react";

const fmt = (n: number, decimals: number) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Counts up when scrolled into view and tweens smoothly whenever `value` changes.
 * Dependency-free (IntersectionObserver + requestAnimationFrame) so it adds no animation library to the page.
 * Reduced motion: the final value is shown immediately. Server HTML already contains the final value.
 */
export function AnimatedNumber({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useRef(0);
  const visible = useRef(false);
  const raf = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tween = (to: number) => {
      cancelAnimationFrame(raf.current);
      if (reduce) {
        shown.current = to;
        el.textContent = fmt(to, decimals);
        return;
      }
      const from = shown.current;
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min((now - start) / 900, 1);
        shown.current = from + (to - from) * easeOutExpo(t);
        el.textContent = fmt(shown.current, decimals);
        if (t < 1) raf.current = requestAnimationFrame(step);
      };
      raf.current = requestAnimationFrame(step);
    };

    if (visible.current || reduce) {
      tween(value);
      return () => cancelAnimationFrame(raf.current);
    }

    // First paint of the number: hold at 0 until it scrolls into view, then count up.
    el.textContent = fmt(0, decimals);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        visible.current = true;
        io.disconnect();
        tween(value);
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [value, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {fmt(value, decimals)}
    </span>
  );
}
