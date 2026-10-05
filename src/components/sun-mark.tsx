/**
 * The Digital Power sun mark, ported from the brand guideline's own drawing code
 * (rays + gradient disc + power symbol with pixel trail). The rays can rotate slowly.
 */
const PX: [number, number, number][] = [
  [-1.17, -0.55, 0.21], [-1.22, -0.18, 0.23], [-1.17, 0.18, 0.21], [-1.08, 0.5, 0.18],
  [-1.48, -0.42, 0.15], [-1.52, -0.02, 0.17], [-1.46, 0.34, 0.14], [-1.78, -0.22, 0.11],
  [-1.82, 0.14, 0.1], [-1.72, 0.5, 0.09], [-2.02, -0.04, 0.07], [-1.98, -0.52, 0.07],
];

const f = (n: number) => n.toFixed(2);

function rayPaths() {
  const out: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a = (i * 36 * Math.PI) / 180;
    const c = Math.cos(a);
    const n = Math.sin(a);
    const p = (x: number, y: number) => `${f(256 + x * c - y * n)} ${f(256 + x * n + y * c)}`;
    out.push(
      `M${p(-13, -150)} L${p(-3.6, -234)} Q${p(0, -243)} ${p(3.6, -234)} L${p(13, -150)} Q${p(0, -147)} ${p(-13, -150)}Z`,
    );
  }
  return out.join("");
}

const RAYS = rayPaths();

function PowerSymbol({ cx, cy, r, sw, color }: { cx: number; cy: number; r: number; sw: number; color: string }) {
  const t = (40 * Math.PI) / 180;
  const sx = cx + r * Math.sin(t);
  const sy = cy - r * Math.cos(t);
  const ex = cx - r * Math.sin(t);
  return (
    <>
      <path
        d={`M${f(sx)} ${f(sy)} A${r} ${r} 0 1 1 ${f(ex)} ${f(sy)}`}
        fill="none"
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
      />
      <line
        x1={cx}
        y1={f(cy - r - sw * 0.9)}
        x2={cx}
        y2={f(cy - r * 0.12)}
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
      />
      {PX.map(([dx, dy, z], i) => {
        const w = z * r;
        const op = dx < -1.6 ? 0.6 : dx < -1.3 ? 0.8 : 1;
        return (
          <rect
            key={i}
            x={f(cx + dx * r - w / 2)}
            y={f(cy + dy * r - w / 2)}
            width={f(w)}
            height={f(w)}
            fill={color}
            opacity={op}
          />
        );
      })}
    </>
  );
}

export function SunMark({
  id,
  className,
  spin = false,
}: {
  id: string;
  className?: string;
  spin?: boolean;
}) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id} x1="40" y1="0" x2="472" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F08A00" />
          <stop offset="1" stopColor="#F2C200" />
        </linearGradient>
      </defs>
      <g fill={`url(#${id})`}>
        <path className={spin ? "spin-slow" : undefined} d={RAYS} />
        <circle cx="256" cy="256" r="128" />
      </g>
      <PowerSymbol cx={256} cy={266} r={56} sw={20} color="#1D5FD1" />
    </svg>
  );
}
