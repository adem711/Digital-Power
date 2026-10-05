# Digital Power — website

## What this is
Digital Power is a Tunisian solar (photovoltaic) installation company: survey, design, supply, installation and connection of rooftop systems. It is a service business: we go to the customer, and it has **agencies (offices) in Sfax, Tunis, Sousse and Mahrès**. The site is for **homeowners and small businesses in Tunisia** and its job is to get them to **call, WhatsApp or request a quote**. Visiting an agency is secondary; the main message is that we come to you. Site language: **French only** (lang="fr"). The shopfront and van are bilingual FR/AR, so Arabic/RTL may come later; don't hard-code anything that would block it.

## Status
- [x] Workspace explored, questions answered, plan approved
- [x] Built: scaffold, shell, Accueil, Solutions, Réalisations (filter + lightbox), Offres & garantie, Contact (quote form), Mentions légales, SEO files (`sitemap.ts`, `robots.ts`, `public/llms.txt`, JSON-LD, OG image)
- [ ] Owner review of all pages → replace demo content → push to GitHub → import in Vercel → set env vars + domain
- Repo: https://github.com/adem711/Digital-Power.git (local git, `origin` set; **nothing pushed yet**; `gh` CLI is not installed, plain git is).
- Next 16 note: `AGENTS.md` (from the scaffold) says to read `node_modules/next/dist/docs/` before writing Next code. `priority` → `fetchPriority="high"`/`loading="eager"`; middleware is now `proxy`; `images.qualities` is an allowlist; `LayoutProps` is a generated global type (run a build/dev once for tsc to see it).
- Lighthouse (production build, local; PSI will differ a little): desktop 99–100 everywhere, mobile 90–96, A11y/Best Practices/SEO/Agentic 100. Mobile LCP (~3.2–3.6 s *simulated*, FCP ~0.9 s) is the one weak metric: on text-only pages it is the font swap, on Accueil the hero image. Tried and **rejected**: `preload: false` on fonts (FCP 1.5 s, CLS 0.03), dropping the hero blur placeholder (no change).
- Test tooling: Python Playwright + its Chromium; Lighthouse via `npx lighthouse` with `CHROME_PATH` set to Playwright's chrome.exe. On Windows stop servers by port with PowerShell (`Get-NetTCPConnection`); `pkill` does not work. Run the prod server with `npm run start -- -p 3100`.

## Stack and commands
Next.js (App Router) + TypeScript + Tailwind CSS v4 + Motion (`motion/react`). Deployed on **Vercel from GitHub** (auto-deploy `main`, preview per branch).
```
npm run dev        # local dev
npm run build      # production build (must pass before any commit)
npm run lint
npx tsc --noEmit   # typecheck
```
Quality gate: **90+ on Performance, Accessibility, Best Practices and SEO for mobile and desktop** in PageSpeed Insights, and all applicable Agentic Browsing checks passing. Verify with Lighthouse on a production build, not `dev`.
Node 24, npm 11. The folder lives in OneDrive: exclude `node_modules` and `.next` from sync if it gets slow.

## Folder structure
```
CLAUDE.md
Brand Info/                      SOURCE assets, read-only, NOT deployed (gitignored)
  Digital Power Brand Guidelines.html   bundled page; real content is the decoded template (colors/type/components below)
  Digital Power Logo Kit/{SVG,PNG}/     logos + favicons, README.txt
  Photos/digital-power-video-NN/        174 stills, digital-power-vNN-NN-description.jpg
  Photos/Screenshot ... .png            Facebook "Détails/Coordonnées" panel (contact source)
  Videos/                               11 original 720p mp4s (hash names)
src/app, src/components, src/lib        (to create) app code
src/assets/photos                       curated copies of approved photos only, renamed by use
public/brand                            optimised logos (SVG with C2PA <metadata> stripped), favicons
```
Never reference `Brand Info/` from code. Copy what's needed into `src/assets` / `public/brand`.

## Business facts (real, confirmed)
- Primary phone: **94 240 336** (`+21694240336`). Shopfront also shows 94 46 03 36 (unconfirmed, don't publish).
- WhatsApp: **+216 22 363 037** (`https://wa.me/21622363037`)
- Facebook: https://www.facebook.com/digital.power.tn
- **Agencies in Sfax, Tunis, Sousse, Mahrès** (confirmed by the owner). Facebook hints at neighbourhoods: Sfax Taniour, Tunis Soukra; Sousse and Mahrès unknown. **Street addresses unknown: show the city only, no street, no map** until provided. **Opening hours are DEMO** (Lun–Sam 08:30–17:30, Dim fermé), shown with a `// DEMO` marker in code.
- Do not put demo hours or any address in structured data (JSON-LD); add them only once confirmed.
- Seen in real materials but **terms unconfirmed**: "30 ans de garantie", "7 ans sans avance", packs 2 / 3 / 3.5 kW.
- Equipment brands used: Huawei, Sungrow, Longi, Tongwei, Deye, Sofar, Must, Geya (protection boxes). Show as plain text only, no third-party logos.
- No testimonials, no statistics. **Never invent them.**

## Demo content register
Anything not confirmed above is placeholder: mark it in code with `// DEMO` and list it here so it can be replaced before launch. Offer terms (30-year warranty, 7-year payment, pack prices) may appear only visibly flagged as demo until confirmed. Currently: quote-recipient email (`devis@example.com`, set via `QUOTE_TO_EMAIL`); opening hours (`SITE.hours`, Lun–sam 8 h 30–17 h 30); Offres page figures (30 ans, 7 ans, packs 2·3·3,5 kW) with a visible banner + `DemoBadge`s in `src/app/offres/page.tsx` and `OFFERS` in `content.ts`; Mentions légales identity fields (`DemoBadge`, raison sociale, matricule fiscal, siège); FAQ answers in `content.ts` (generic, review them); the 'Commercial' solution uses a residential-looking photo. Agency street addresses: none shown.

## Brand rules (strict)
**Colors** (define once as Tailwind `@theme` tokens; no off-palette hex):
Night `#0F1B2D` · Night 2 `#1C2A40` · Power Blue `#1D5FD1` (700 `#1748A0`, 400 `#6E9CEB`, 200 `#C3D6F8`, 50 `#EAF1FD`, 900 `#0F2E66`) · Sun Orange `#F08A00` (700 `#C46A00`, 900 `#7A4100`) · Sun Gold `#F2C200` (200 `#FCE38A`, 50 `#FFF6D9`) · White `#fff` · Paper `#F6F4EF` · Line `#DDD8CC` · Muted `#6B6658` · text on light `#14181F`. Status: producing `#1F9D6B`, low `#E0A100`, fault `#D2402F`.
- Proportion: Night ~45%, white/paper ~30%, blue ~13%, sun ~12%.
- Night = primary surface and text on light. Blue = actions, links, tech accents. Orange = key CTA/energy highlight. Gold = accents on dark.
- Orange→gold gradient (`linear-gradient(90deg,#F08A00,#F2C200)`) only on the sun mark and **one hero moment per page**.
- **Never white text on orange or gold: use Night.** Orange/gold are fills, not text colors on white (fails contrast).
- Page background Paper `#F6F4EF`; dark sections Night.

**Fonts** (via `next/font`, `display: swap`, latin subset, only used weights): Barlow Semi Condensed 600/700 (headings, caps for display) · Barlow 400/500/600 (body, UI, forms) · IBM Plex Mono 400/500 (labels, specs, units, data).
Scale: Display clamp(44,6vw,80)/.95 caps · H1 clamp(36,4.5vw,56)/1 · H2 40/1.05 · H3 28/1.15 (600) · Lead 20/1.5 · Body 16/1.55 · Label mono 12 caps, tracking .12em, Power Blue · Data 48/1 700 tabular-nums with a mono unit.

**Shape/space:** 4px base spacing. Radius 4 (inputs, chips), 8 (cards), full (buttons). Buttons are pills: primary Orange fill + Night text (hover Orange 700 + white); secondary Blue fill + white; outline 2px Night; on dark: Gold fill + Night text, outline white. Chips: mono 11 caps on blue-50 / sun-50 / paper.

**Logo** (`Brand Info/Digital Power Logo Kit`): lockup-light on light surfaces, lockup-dark on dark; emblem (text inside sun) for large marks; bare power-button symbol/favicon for small sizes (header ≥ lockup, favicon = `favicon.svg` + 32px + `apple-touch-icon`). Don't recolor, stretch or place on busy photos. The logo kit has no clear-space/min-size rule: keep clear space ≥ the sun-disk radius. **Never use the old green/teal shopfront logo or "D.POWER SOLAR"; the name is "Digital Power".**

**Tone of voice** (not in the guideline, agreed default): warm, direct, concrete, short sentences, French with **vous**, no jargon (explain kWc, onduleur, STEG simply). Sample brand lines from the guideline: "Clean energy, engineered.", "Your roof is a power plant." (translate, don't copy literally). The guideline's euro prices, Croatian phone and `digitalpower.energy` are placeholders. Use **TND**.

## Photos
Library: 174 stills from 11 Facebook videos. Source details in the table.
| Video | Quality / use |
|---|---|
| 07 (best), 01, 03 | Wide hero banners (1920×860 / 1920×860 / 1694×828) |
| 08, 09 | **Portrait** 1080×1920 / 720×1280: mobile/vertical crops only |
| 05, 06 | 848×478: **thumbnails only** |
| 02, 04 | Soft: gallery size only. 04 = shopfront/showroom/brochures; 02 = delivery, crane, drone install |
| 10 | Mixed phone shots (Sofar inverters), small |
| 11 | 720×427, small |

**Do NOT use without asking:** v01-11, v07-13, v09-16, v09-17 (client QR/serial readable) · v02-07, v02-08, v03-21 (crane company name/phone/plate) · v01-08 (other people's cars) · v11-03, v11-04 (may not be our job).
**Recognisable faces: decided, none for now (backs, hands, tools only).** Seen in v02-01/02/04/06, v03-01/02/03, v05-02/05/06/07, v06-04/06 (thumbnail judgement). Default to back-of-vest, hands and tools shots (e.g. v03-06, v05-09, v05-13, v03-04 and v05-04 drilling close-ups) until the owner approves specific files.
Our own van is fine: v09-18…v09-22 (phone shown is ours). Video 04 (shopfront, showroom, brochures) is usable now that agencies are confirmed, but it shows the **old green/teal logo and "Power Solar" styling**, so use it sparingly (agencies section only, never hero) and never beside the new logo as if it were current. Unknown which agency it is: don't caption it with a city.
Hero shortlist: v07-02, v07-03, v07-05, v01-06, v01-07, v03-15 (sunset), v03-11/12.
Pipeline: `next/image`, AVIF/WebP, explicit `width`/`height` or `fill`+`sizes`, hero/LCP image: `loading="eager"` + `fetchPriority="high"` (the Next 16 docs recommend these over `preload`, and Lighthouse's LCP-discovery audit passes with them); everything else lazy; `images.qualities` is an allowlist in `next.config.ts` (currently 60, 75), descriptive French `alt`. Don't upscale small sources.

## Conventions
- Server Components by default; `"use client"` only for interactive/animated islands, kept small. Import Motion via `LazyMotion` + `m` components with `domAnimation`.
- **Animation rules:** animate only `transform`/`opacity`; prefer CSS scroll-driven animations (`animation-timeline: view()`) with a graceful fallback; **the LCP element is never hidden or delayed at load**; everything honours `prefers-reduced-motion`; one signature motion per section, no gratuitous looping. Signature ideas: slowly rotating sun rays, count-up figures (real numbers only), process timeline that draws on scroll.
- No layout shift: reserve image/font space; no content injected above existing content.
- Accessibility = also the Agentic Browsing score: semantic HTML (`button`, `a`, landmarks), every input has a `<label for>`, icon-only buttons have `aria-label`, valid `autocomplete`, visible focus ring, 44px touch targets, skip link, contrast AA.
- SEO: per-page `metadata`, canonical, Open Graph, `app/sitemap.ts`, `robots`, JSON-LD `ProfessionalService` (name, telephone, `areaServed`, sameAs Facebook; no street `address`, no `openingHours` until confirmed). Add **`/llms.txt`** (H1, ≥1 markdown link, ≥50 chars).
- Quote form: route handler/server action, server-side validation, honeypot, Resend email (env vars only, never committed; `.env.example` documents them), clear success/error states. Always next to click-to-call and WhatsApp buttons (sticky on mobile).
- Analytics: Vercel Analytics or Cloudflare-style cookieless only: no cookie banner.
- Copy lives in `src/lib/content.ts` (French); no copy hard-coded in layout components.
- Commits small and descriptive; run `npm run build` + lint + typecheck first. Update this file whenever a decision changes.
- Scroll reveals: `.reveal` (CSS scroll-driven); its opacity must finish early in the keyframes so audits never catch text at partial contrast. Hero text uses `.rise` (transform only). Don't animate the LCP text's opacity.
- Quote form: server action in `src/app/contact/actions.ts` + `src/components/quote-form.tsx` (`useActionState`). React 19 resets the form after each action, so `<select>`s are keyed on the submitted value to keep their selection. Without `RESEND_API_KEY` it logs in dev and shows a "call us" message in production. Env vars: see `.env.example`.
- Gallery (`src/components/gallery.tsx`, data in `src/lib/gallery.ts`): 44 photos, native `<dialog>` lightbox, Motion layout animation only after the first filter click, first 4 thumbnails eager, no blur placeholders (payload).

