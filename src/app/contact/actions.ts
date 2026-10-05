"use server";

import { CITIES, PROPERTY_TYPES, SITE } from "@/lib/content";

export type QuoteState = {
  status: "idle" | "ok" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "phone" | "city" | "type" | "bill" | "message", string>>;
  values?: Record<string, string>;
};

const text = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();

export async function sendQuote(_prev: QuoteState, fd: FormData): Promise<QuoteState> {
  // Honeypot: real visitors never fill this hidden field. Pretend success for bots.
  if (text(fd, "website")) return { status: "ok" };

  const values = {
    name: text(fd, "name"),
    phone: text(fd, "phone"),
    city: text(fd, "city"),
    type: text(fd, "type"),
    bill: text(fd, "bill"),
    message: text(fd, "message"),
  };
  const errors: NonNullable<QuoteState["errors"]> = {};

  if (values.name.length < 2 || values.name.length > 80) errors.name = "Indiquez votre nom.";
  const digits = values.phone.replace(/[\s.\-()]/g, "").replace(/^\+/, "");
  if (!/^(?:216)?[2-579]\d{7}$/.test(digits)) {
    errors.phone = "Indiquez un numéro tunisien valide, par exemple 94 240 336.";
  }
  if (!(CITIES as readonly string[]).includes(values.city)) errors.city = "Choisissez votre ville.";
  if (!(PROPERTY_TYPES as readonly string[]).includes(values.type)) errors.type = "Choisissez le type de bien.";
  if (values.bill) {
    const n = Number(values.bill.replace(",", "."));
    if (!Number.isFinite(n) || n < 0 || n > 100000) errors.bill = "Indiquez un montant en dinars, par exemple 120.";
  }
  if (values.message.length > 1000) errors.message = "Votre message est trop long (1000 caractères maximum).";

  if (Object.keys(errors).length) {
    return { status: "error", message: "Merci de corriger les champs signalés.", errors, values };
  }

  const body = [
    `Nom : ${values.name}`,
    `Téléphone : ${values.phone}`,
    `Ville : ${values.city}`,
    `Type de bien : ${values.type}`,
    `Facture STEG mensuelle : ${values.bill ? `${values.bill} TND` : "non précisée"}`,
    "",
    values.message || "(pas de message)",
  ].join("\n");

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[devis — RESEND_API_KEY manquante, e-mail non envoyé]\n" + body);
      return { status: "ok" };
    }
    return {
      status: "error",
      message: `L’envoi n’est pas disponible pour le moment. Appelez-nous au ${SITE.phone.display} ou écrivez-nous sur WhatsApp.`,
      values,
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.QUOTE_FROM_EMAIL ?? "Digital Power <onboarding@resend.dev>",
        to: [process.env.QUOTE_TO_EMAIL ?? SITE.demoEmail],
        subject: `Demande de devis — ${values.name} (${values.city})`,
        text: body,
      }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}`);
    return { status: "ok" };
  } catch (e) {
    console.error("[devis] envoi échoué", e);
    return {
      status: "error",
      message: `Votre demande n’a pas pu être envoyée. Réessayez, ou appelez-nous au ${SITE.phone.display}.`,
      values,
    };
  }
}
