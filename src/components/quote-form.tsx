"use client";

import { useActionState, useEffect, useRef, type ReactNode } from "react";
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
  "min-h-12 w-full rounded-input border border-line bg-white px-3.5 text-base text-ink placeholder:text-muted/70 focus:border-blue-600 aria-[invalid=true]:border-fault";

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

export function QuoteForm() {
  const [state, action, pending] = useActionState(sendQuote, initial);
  const summary = useRef<HTMLDivElement>(null);
  const v = state.values ?? {};
  const e = state.errors ?? {};

  useEffect(() => {
    if (state.status !== "idle") summary.current?.focus();
  }, [state]);

  if (state.status === "ok") {
    return (
      <div ref={summary} tabIndex={-1} role="status" className="flex flex-col gap-5 rounded-card bg-ok-bg p-8 outline-none">
        <span className="flex size-12 items-center justify-center rounded-full bg-ok text-white">
          <CheckIcon />
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
    <form action={action} noValidate className="flex flex-col gap-6" {...WEBMCP}>
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
            className={field}
          />
        </Field>
        <Field id="city" label="Ville" error={e.city} required>
          <select
            key={`city-${v.city ?? ""}`}
            id="city"
            name="city"
            autoComplete="address-level2"
            required
            defaultValue={v.city ?? ""}
            aria-invalid={!!e.city}
            aria-describedby={e.city ? "city-d" : undefined}
            className={field}
          >
            <option value="" disabled>
              Choisir…
            </option>
            {CITIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field id="type" label="Type de bien" error={e.type} required>
          <select
            key={`type-${v.type ?? ""}`}
            id="type"
            name="type"
            required
            defaultValue={v.type ?? ""}
            aria-invalid={!!e.type}
            aria-describedby={e.type ? "type-d" : undefined}
            className={field}
          >
            <option value="" disabled>
              Choisir…
            </option>
            {PROPERTY_TYPES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
      </div>

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
          defaultValue={v.bill}
          aria-invalid={!!e.bill}
          aria-describedby="bill-d"
          className={field}
        />
      </Field>

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
        <button type="submit" disabled={pending} className={buttonClass("primary", "disabled:opacity-60")}>
          {pending ? "Envoi en cours…" : "Envoyer ma demande"} <ArrowIcon width={18} height={18} />
        </button>
        <p className="text-sm text-muted">
          Gratuit et sans engagement. Nous utilisons vos données uniquement pour vous répondre.
        </p>
      </div>
    </form>
  );
}
