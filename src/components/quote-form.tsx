"use client";

import { useActionState, useEffect, useRef, useState, type ReactNode } from "react";
import { sendQuote, type QuoteState } from "@/app/contact/actions";
import { CITIES, PROPERTY_TYPES, SITE } from "@/lib/content";
import { buttonClass } from "./button";
import { ArrowIcon, CheckIcon, PhoneIcon, WhatsAppIcon } from "./icons";

const initial: QuoteState = { status: "idle" };

// WebMCP (experimental): declares the form as a tool so AI agents can use it. Lighthouse "Agentic Browsing" checks it.
const WEBMCP = {
  toolname: "demander_devis_solaire",
  tooldescription:
    "Envoie une demande de devis gratuit à Digital Power (installation solaire en Tunisie). Champs : nom, téléphone, ville, type de bien, facture mensuelle en TND (facultatif), message (facultatif).",
} as Record<string, string>;

const field =
  "min-h-12 w-full rounded-input border border-line bg-white px-3.5 text-base text-ink placeholder:text-muted/70 focus:border-blue-600 focus:shadow-[0_0_0_4px_rgb(29_95_209/0.16)] aria-[invalid=true]:border-fault";

function Field({
  id,
  label,
  error,
  hint,
  children,
  required,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="t-label text-muted">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-d`} className="text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-d`} className="text-sm font-medium text-fault">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Radio group rendered as pills. Native radios underneath (keyboard + screen reader friendly). */
function PillGroup({
  name,
  legend,
  options,
  value,
  onChange,
  error,
  submitted,
  agentHint,
}: {
  name: string;
  agentHint: string;
  legend: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
  /** Last value the server received. Keying on it remounts the radios after React 19's post-action form reset. */
  submitted?: string;
}) {
  return (
    <fieldset
      key={`${name}-${submitted ?? ""}`}
      className="flex flex-col gap-3"
      aria-describedby={error ? `${name}-d` : undefined}
      {...({ toolparamdescription: agentHint } as Record<string, string>)}
    >
      <legend className="t-label mb-3 text-muted">
        {legend} <span aria-hidden="true">*</span>
      </legend>
      <div className="flex flex-wrap gap-2.5">
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={o}
              defaultChecked={value === o}
              onChange={() => onChange(o)}
              className="peer sr-only"
              {...({ toolparamdescription: agentHint, toolparamtitle: legend } as Record<string, string>)}
            />
            <span className="flex min-h-12 items-center rounded-full border-2 border-line bg-white px-5 text-[15px] font-semibold text-night transition-transform duration-200 peer-checked:scale-[1.03] peer-checked:border-night peer-checked:bg-night peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue-600 hover:border-night/50">
              {o}
            </span>
          </label>
        ))}
      </div>
      {error ? (
        <p id={`${name}-d`} className="text-sm font-medium text-fault">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

function Spinner() {
  return (
    <svg className="size-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function QuoteForm() {
  const [state, action, pending] = useActionState(sendQuote, initial);
  const v = state.values ?? {};
  const e = state.errors ?? {};

  const [chosen, setStep] = useState<1 | 2>(1);
  // A server-side error on step-1 fields always brings the visitor back to step 1.
  const step: 1 | 2 = e.city || e.type ? 1 : chosen;
  const [city, setCity] = useState(v.city ?? "");
  const [type, setType] = useState(v.type ?? "");
  const [stepErr, setStepErr] = useState<{ city?: string; type?: string }>({});
  const summary = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const billRef = useRef<HTMLInputElement>(null);

  // Estimator hand-off: /contact?bill=120#devis pre-fills the monthly bill (DOM write, no state).
  useEffect(() => {
    const b = new URLSearchParams(window.location.search).get("bill");
    const input = billRef.current;
    if (input && !input.value && b && /^\d{1,6}([.,]\d{1,2})?$/.test(b)) input.value = b;
  }, []);

  useEffect(() => {
    if (state.status !== "idle") summary.current?.focus();
  }, [state]);

  const goNext = () => {
    const errs = {
      city: city ? undefined : "Choisissez votre ville.",
      type: type ? undefined : "Choisissez le type de bien.",
    };
    setStepErr(errs);
    if (errs.city || errs.type) return;
    setStep(2);
    requestAnimationFrame(() => heading.current?.focus());
  };

  if (state.status === "ok") {
    return (
      <div ref={summary} tabIndex={-1} role="status" className="panel-in flex flex-col gap-5 rounded-card bg-ok-bg p-8 outline-none">
        <span className="flex size-14 items-center justify-center rounded-full bg-ok text-white">
          <CheckIcon width={26} height={26} />
        </span>
        <h3 className="t-h3 text-ok-text">Merci, votre demande est envoyée.</h3>
        <p className="text-ok-text">
          Nous vous rappelons rapidement. Pour aller plus vite, vous pouvez aussi nous joindre directement.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href={SITE.phone.href} className={buttonClass("primary")}>
            <PhoneIcon /> {SITE.phone.display}
          </a>
          <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" className={buttonClass("outline")}>
            <WhatsAppIcon /> WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="flex flex-col gap-8" {...WEBMCP}>
      {/* Without JavaScript both steps stay visible and the stepper is hidden */}
      <noscript>
        <style>{`[data-step="2"]{display:block!important}[data-stepper],[data-next]{display:none!important}`}</style>
      </noscript>

      <ol data-stepper className="flex items-center gap-4" aria-label="Étapes du formulaire">
        {[
          { n: 1, label: "Votre projet" },
          { n: 2, label: "Vos coordonnées" },
        ].map((s, i) => (
          <li key={s.n} className="flex flex-1 items-center gap-3" aria-current={step === s.n ? "step" : undefined}>
            <span
              className={`flex size-9 shrink-0 items-center justify-center rounded-full border-2 font-mono text-sm font-medium transition-transform duration-300 ${
                step >= s.n ? "scale-100 border-night bg-night text-white" : "scale-95 border-line text-muted"
              }`}
            >
              {step > s.n ? <CheckIcon width={16} height={16} /> : s.n}
            </span>
            <span className={`hidden text-sm font-semibold sm:block ${step >= s.n ? "text-night" : "text-muted"}`}>
              {s.label}
            </span>
            {i === 0 && (
              <span aria-hidden="true" className="relative ml-1 h-0.5 flex-1 overflow-hidden rounded bg-line">
                <span
                  className="absolute inset-0 origin-left bg-sun-600 transition-transform duration-500"
                  style={{ transform: `scaleX(${step === 2 ? 1 : 0})` }}
                />
              </span>
            )}
          </li>
        ))}
      </ol>

      {state.status === "error" ? (
        <div
          ref={summary}
          tabIndex={-1}
          role="alert"
          className="rounded-input border border-fault bg-white p-4 text-sm font-medium text-fault outline-none"
        >
          {state.message}
        </div>
      ) : null}

      {/* STEP 1 */}
      <div hidden={step !== 1} data-step="1" className="panel-in flex flex-col gap-8">
        <PillGroup
          name="city"
          legend="Ville"
          agentHint="Ville du projet : Sfax, Tunis, Sousse, Mahrès ou Autre ville."
          options={CITIES}
          value={city}
          onChange={setCity}
          error={e.city ?? stepErr.city}
          submitted={v.city}
        />
        <PillGroup
          name="type"
          legend="Type de bien"
          agentHint="Type de bien à équiper : Maison / villa, Commerce ou entreprise, ou Autre."
          options={PROPERTY_TYPES}
          value={type}
          onChange={setType}
          error={e.type ?? stepErr.type}
          submitted={v.type}
        />
        <Field
          id="bill"
          label="Facture d’électricité mensuelle (TND)"
          error={e.bill}
          hint="Facultatif, mais cela nous aide à dimensionner."
        >
          <input
            id="bill"
            name="bill"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            ref={billRef}
            defaultValue={v.bill}
            aria-invalid={!!e.bill}
            aria-describedby="bill-d"
            className={`${field} font-mono`}
          />
        </Field>
        <div data-next>
          <button type="button" onClick={goNext} className={buttonClass("primary")}>
            Continuer <ArrowIcon width={18} height={18} />
          </button>
        </div>
      </div>

      {/* STEP 2 */}
      <div hidden={step !== 2} data-step="2" className="panel-in flex flex-col gap-6">
        <h3 ref={heading} tabIndex={-1} className="t-h3 outline-none">
          Comment vous joindre ?
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          <Field id="name" label="Nom et prénom" error={e.name} required>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              defaultValue={v.name}
              aria-invalid={!!e.name}
              aria-describedby={e.name ? "name-d" : undefined}
              className={field}
            />
          </Field>
          <Field id="phone" label="Téléphone" error={e.phone} hint="Pour vous rappeler." required>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              defaultValue={v.phone}
              aria-invalid={!!e.phone}
              aria-describedby="phone-d"
              className={`${field} font-mono`}
            />
          </Field>
        </div>
        <Field id="message" label="Votre projet" error={e.message}>
          <textarea
            id="message"
            name="message"
            rows={4}
            defaultValue={v.message}
            aria-invalid={!!e.message}
            aria-describedby={e.message ? "message-d" : undefined}
            className={`${field} py-3`}
          />
        </Field>

        {/* Honeypot: hidden from people and assistive tech */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="website">Ne pas remplir</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button type="submit" disabled={pending} className={buttonClass("primary", "disabled:opacity-70")}>
            {pending ? (
              <>
                <Spinner /> Envoi en cours…
              </>
            ) : (
              <>
                Envoyer ma demande <ArrowIcon width={18} height={18} />
              </>
            )}
          </button>
          <button
            type="button"
            data-next
            onClick={() => setStep(1)}
            className="min-h-12 rounded-full px-4 text-[15px] font-semibold text-blue-600 hover:text-night"
          >
            ← Modifier mon projet
          </button>
        </div>
        <p className="text-sm text-muted">
          Gratuit et sans engagement. Nous utilisons vos données uniquement pour vous répondre.
        </p>
      </div>
    </form>
  );
}
