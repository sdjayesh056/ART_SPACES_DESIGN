# ArtSpaces Design

Marketing website for **ArtSpaces Design**, a luxury interior and architectural
design studio in Mumbai. It is a lead-generation funnel, not a product: organic
search → portfolio, stats and testimonials → free-consultation enquiry →
booking. Four verticals are sold: Residential, Commercial, Hospitality, Retail.

> The repo began as an art-sharing marketplace and was pivoted. If you find
> anything describing artists, collecting or sharing artwork, it is leftover
> scaffold — not the product.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in to actually deliver leads
npm run dev
```

With no keys set, the lead form still works end to end in development:
submissions print to the terminal. In production an unconfigured environment is
a hard failure — see below.

If a style change appears to do nothing, delete `.next` and restart.
`next build` and `next dev` share that directory and a stale CSS chunk can
survive between them.

## Verify before every commit

```bash
npm run lint && npx tsc --noEmit && npm run build
```

Next 16 does not lint during build, so a green build is not a green repo. CI
runs all three on every push.

## Architecture

```
src/
├── app/                    routes; (marketing) group owns the site chrome
├── actions/lead.ts         'use server' — submitLead, subscribeNewsletter
├── data/                   ALL content. No "use client", no JSX.
├── types/                  shared shapes
├── lib/                    env, lead-delivery, rate-limit, motion, accents
└── components/
    ├── ui/                 Section, Container, SectionHeading, Reveal, …
    ├── forms/              LeadCaptureForm, NewsletterForm
    └── home/               home page sections
```

### Rules that are not obvious

**There is no `tailwind.config` and there will not be one.** Tailwind v4 is
configured entirely through the `@theme` block in `src/app/globals.css`. A class
that is neither a v4 default nor declared there emits **zero CSS and fails
silently** — that has already shipped four times. Add the token first.

**Content lives in `src/data/*.ts`**, never inline in a component. Those modules
carry no `"use client"` and no JSX so Server Components can import them.

**One source of truth per fact.** The information architecture lives only in
`src/data/navigation.ts` and drives the navbar, mega menu, mobile drawer, footer
and sitemap. Never declare a list that has to agree with another list — derive
it.

**New components are Server Components by default.** Wrap anything that needs a
scroll reveal in `<Reveal>`; add `"use client"` only to leaves that genuinely
need hooks, handlers or browser APIs.

**Hover may enhance, never gate.** No content and no call to action behind
`:hover` — those rules are never emitted on a touchscreen.

**Colour comes from tokens.** No raw hex in components, no off-brand palette
families. ESLint enforces both. Brand is forest green `#14532d` with gold
`#e29d08`; gold on green needs `accent-on-brand` to pass AA.

**Never link to a route that does not exist yet.**

**Leads must reach a human.** `src/lib/lead-delivery.ts` throws in production
when no channel is configured, so an undelivered enquiry is never reported to
the visitor as sent. Do not weaken that.

House style: 4-space indent under `src/components` and friends, 2-space under
`src/app` (see `.editorconfig`); named exports for components; `@/` for
cross-directory imports.

## Outstanding — needs the client

These are flagged in code; `grep -rn "isPlaceholder: true\|INVENTED\|UNVERIFIED\|PLACEHOLDER" src/data/`.

| What | Where | Why it blocks |
| --- | --- | --- |
| Real project photography | `src/data/projects.ts` | Eight projects share two stock PNGs |
| Consented testimonials | `src/data/testimonials.ts` | All six are fabricated — a legal risk |
| Real NAP and socials | `src/data/studio.ts` | `+91 98765 43210` is a dummy number; all socials are `#` |
| Confirmed headline figures | `src/data/company-stats.ts` | Invented, and "12 countries" contradicts the India positioning |
| Brand voice decision | Services and Portfolio copy | Sci-fi register does not match a luxury studio |
| Privacy and Terms text | `/privacy`, `/terms` | The form disclaimer promises them |

## Also outstanding

- `public/` is ~11 MB of raw PNG. Logos should be SVG, photography ~1024w WebP.
- SEO: `sitemap.ts`, `robots.ts`, `opengraph-image`, icons, manifest, JSON-LD.
- `slate-*` utilities should migrate to the semantic `ink`/`surface`/`line` tokens.
- `body { overflow-x: hidden }` in `globals.css` masks overflow rather than
  fixing it, and breaks `position: sticky` in descendants.
