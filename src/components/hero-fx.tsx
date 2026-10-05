import { PointerParallax } from "./pointer-parallax";

/**
 * Decorative hero layers: an engineered grid and two glowing blue energy orbs that drift with the pointer.
 * Server-rendered markup; the drift is CSS (`translate` driven by --px/--py set by <PointerParallax/>).
 * Purely visual (aria-hidden), behind the text, so it can never delay or hide the LCP image or headline.
 */
export function HeroFX() {
  return (
    <>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-[15] overflow-hidden">
        <div className="grid-bg absolute inset-0" />
        <div className="absolute top-1/2 -right-40 size-[520px] -translate-y-1/2 sm:size-[720px] lg:-right-64 lg:size-[1000px]">
          <div className="orb breathe parallax-a size-full" />
        </div>
        <div className="absolute -bottom-40 -left-40 size-[420px] lg:size-[560px]">
          <div className="orb breathe parallax-b size-full" />
        </div>
      </div>
      <PointerParallax />
    </>
  );
}
