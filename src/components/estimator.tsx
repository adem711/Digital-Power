"use client";

import Link from "next/link";
import { useId, useMemo, useState, type CSSProperties } from "react";
import { ESTIMATOR as E } from "@/lib/content";
import { AnimatedNumber } from "./animated-number";
import { buttonClass } from "./button";
import { DemoBadge } from "./demo-badge";
import { ArrowIcon } from "./icons";

function estimate(bill: number) {
  const annualKwh = (bill / E.tariff) * 12;
  const kwc = Math.max(1, Math.round(((annualKwh * E.coverage) / E.yieldPerKwc) * 2) / 2);
  const panels = Math.ceil((kwc * 1000) / E.panelWatt);
  const production = kwc * E.yieldPerKwc;
  return {
    kwc,
    panels,
    area: Math.round(panels * E.panelArea),
    production: Math.round(production / 10) * 10,
    savings: Math.round((Math.min(production, annualKwh) * E.tariff) / 10) * 10,
  };
}

const RESULTS = [
  { key: "kwc", label: "Puissance conseillée", unit: "kWc", decimals: 1 },
  { key: "panels", label: "Panneaux", unit: "unités", decimals: 0 },
  { key: "area", label: "Surface au toit", unit: "m²", decimals: 0 },
  { key: "production", label: "Production estimée", unit: "kWh / an", decimals: 0 },
] as const;

/** Interactive sizing estimate. Indicative only: assumptions come from ESTIMATOR (demo) and are disclosed. */
export function Estimator() {
  const [bill, setBill] = useState<number>(E.initial);
  const id = useId();
  const r = useMemo(() => estimate(bill), [bill]);
  const pct = ((bill - E.min) / (E.max - E.min)) * 100;

  return (
    <div className="on-dark glass relative overflow-hidden rounded-card p-6 text-white md:p-10">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className="flex flex-col gap-6">
          <DemoBadge>Estimation indicative · hypothèses à valider</DemoBadge>
          <label htmlFor={id} className="t-label text-on-night-muted">
            Votre facture d’électricité mensuelle
          </label>
          <p className="flex items-baseline gap-3">
            <span className="t-display !text-[clamp(3rem,7vw,4.5rem)] text-sun-400">
              <AnimatedNumber value={bill} />
            </span>
            <span className="font-mono text-base text-on-night">TND / mois</span>
          </p>
          <input
            id={id}
            type="range"
            className="range"
            min={E.min}
            max={E.max}
            step={E.step}
            value={bill}
            onChange={(e) => setBill(Number(e.target.value))}
            style={{ "--p": `${pct}%` } as CSSProperties}
            aria-valuetext={`${bill} dinars par mois`}
          />
          <div className="flex justify-between font-mono text-xs text-on-night-muted">
            <span>{E.min} TND</span>
            <span>{E.max} TND</span>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <dl className="grid grid-cols-2 gap-3">
            {RESULTS.map((x) => (
              <div key={x.key} className="rounded-card border border-white/10 bg-night/60 p-4 md:p-5">
                <dt className="t-label text-on-night-muted">{x.label}</dt>
                <dd className="mt-3 flex items-baseline gap-2">
                  <span className="t-data !text-[2.5rem]">
                    <AnimatedNumber value={r[x.key]} decimals={x.decimals} />
                  </span>
                  <span className="font-mono text-xs text-on-night">{x.unit}</span>
                </dd>
              </div>
            ))}
          </dl>
          <div className="rounded-card border border-sun-400/40 bg-sun-400/10 p-4 md:p-5">
            <p className="t-label text-sun-400">Économie annuelle estimée</p>
            <p className="mt-2 flex items-baseline gap-2">
              <span className="t-data text-sun-400">
                <AnimatedNumber value={r.savings} />
              </span>
              <span className="font-mono text-sm text-on-night">TND / an</span>
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href={`/contact?bill=${bill}#devis`} className={buttonClass("gold")}>
              Recevoir mon devis personnalisé <ArrowIcon width={18} height={18} />
            </Link>
          </div>
          <details className="text-sm text-on-night">
            <summary className="cursor-pointer py-2 font-semibold text-white">Hypothèses de calcul</summary>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-on-night-muted">
              <li>Tarif moyen de l’électricité : {E.tariff.toLocaleString("fr-FR")} TND/kWh</li>
              <li>Production : {E.yieldPerKwc.toLocaleString("fr-FR")} kWh par kWc et par an</li>
              <li>Installation dimensionnée pour couvrir environ {Math.round(E.coverage * 100)} % de la consommation</li>
              <li>
                Panneau de {E.panelWatt} W, environ {E.panelArea.toLocaleString("fr-FR")} m² chacun
              </li>
              <li>Estimation indicative : seule la visite technique fixe la puissance et le prix.</li>
            </ul>
          </details>
        </div>
      </div>
    </div>
  );
}
