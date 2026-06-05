# Country-vs-Country Comparison Pages — Design Spec

**Date:** 2026-06-05
**Status:** Approved — ready for implementation planning
**Author:** Raf (brainstormed with Claude)

## Goal

Grow organic search traffic by adding a new section of **country-vs-country
comparison pages** targeting high-intent "should I move to X or Y?" queries
(e.g. "Philippines vs Thailand tax", "Vietnam vs Malaysia for expats"). The site
already has the calculator engine, cost/visa data, and SEO patterns needed —
these pages are assembled almost entirely from existing data.

## Scope decisions (locked)

| Decision | Choice |
|----------|--------|
| Goal | More search traffic via new indexable pages |
| Page type | Country-vs-country comparison |
| Page depth | "Full relocation showdown" — tax + net pay + cost of living + visa + verdict + FAQ |
| URL strategy | **One canonical page per pair** — 10 alphabetically-ordered pairs, no reverse URLs |
| Verdict generation | Mostly **computed** from data; thin **authored** layer (intro + FAQ per pair) |

Out of scope: salary-specific landing pages, persona pages, topic/concept pages,
new countries, redesign of existing pages.

## URL structure & routing

New dynamic route: `app/compare/[pair]/page.tsx`

- `generateStaticParams()` produces exactly **10 alphabetically-ordered pairs**
  computed from `COUNTRIES`:
  - `indonesia-vs-malaysia`
  - `indonesia-vs-philippines`
  - `indonesia-vs-thailand`
  - `indonesia-vs-vietnam`
  - `malaysia-vs-philippines`
  - `malaysia-vs-thailand`
  - `malaysia-vs-vietnam`
  - `philippines-vs-thailand`
  - `philippines-vs-vietnam`
  - `thailand-vs-vietnam`
- `dynamicParams = false` — any other slug (including reverse orderings like
  `thailand-vs-philippines`) returns 404 and is never generated.
- Slug parser splits the param on `-vs-`, validates **both** slugs against
  `COUNTRIES`; invalid or non-canonical order → `notFound()`.
- Index/hub page `app/compare/page.tsx` — a grid of 10 pair cards. Provides a
  crawlable entry point and internal-linking home for the section.

### Why one canonical page per pair

Static export on GitHub Pages has **no server-side redirects**, so a single
canonical URL per pair is the clean way to avoid duplicate content. The page
presents both countries symmetrically, so word order is cosmetic to the reader.
Reverse-order search phrasing ("Malaysia vs Indonesia") is captured through
on-page copy (intro sentence + an FAQ entry) rather than a second URL.

## Computed vs. authored content

To keep 10 pages accurate and low-maintenance:

**Computed at runtime (client), reusing `calculate()` + `useExchangeRates`:**
- Tax / net-pay head-to-head at the selected salary
- Effective rates, gross/tax/contributions/net per country
- Cost-of-living table from `COST_DATA` + a derived cost total and "cheaper by ~X%"

**Computed deterministically (so they never drift from the numbers):**
- Verdict badges: lower income tax, cheaper cost of living, higher net pay,
  easier nomad visa — each names the winning country with flag.

**Authored once per pair (10 short entries in `lib/comparisons/`):**
- A 2–3 sentence intro (seeds reverse phrasing + human nuance)
- ~4 FAQ Q&As (one of which uses the reverse country order in its question)

Rejected alternative: fully hand-authored prose verdicts per pair — richer but
10× the writing and prone to drifting from the live computed numbers.

## Page layout ("full relocation showdown")

Top to bottom, using Jungle Modernism CSS tokens (`style={{ ... }}` with custom
properties, per the design system — no generic Tailwind color classes):

1. **Hero** — `H1` "{A} vs {B}: Income Tax & Cost of Living Compared (2025)",
   two flag chips, authored 2–3 sentence intro.
2. **Verdict strip** — row of computed badge cards: *Lower income tax · Cheaper
   cost of living · Higher net pay · Easier nomad visa*. Each names the winning
   country with flag. Scannable, screenshot-friendly.
3. **Tax & net-pay head-to-head** — interactive two-country comparison
   (salary input + monthly/annual + resident/expat toggles, USD-normalized).
   Shows gross, tax, contributions, net, effective rate for both. The functional
   core of the page.
4. **Cost of living** — two-column table from `COST_DATA`
   (housing / meals / internet / transport / coworking) with a derived total and
   a "cheaper by ~X%" line.
5. **Visa & residency snapshot** — most relevant entries from `VISA_DATA` per
   country (employment + digital-nomad rows), each linking to the full
   `/resources/visas/{country}` page.
6. **FAQ** — ~4 authored Q&As per pair, rendered with the same `<details>`
   accordion used on country pages, wired to `FAQPage` JSON-LD.
7. **Cross-links** — "Compare other countries" (other pairs) + links to each
   country's calculator and relocation checklist.

## SEO

- **`generateMetadata`** per pair: title, description, canonical
  (`https://rafseb.github.io/seatax/compare/{pair}`, fully-qualified to match the
  existing country-page pattern), OpenGraph, Twitter.
- **Structured data** (also closes an existing gap): emit JSON-LD
  `BreadcrumbList` (Home › Compare › {A} vs {B}) and `FAQPage`, via
  `<script type="application/ld+json">` exactly like `app/[country]/page.tsx`.
- **Sitemap** (`app/sitemap.ts`): add the `/compare` hub (priority 0.8) and all
  10 pair URLs (priority 0.7).
- **Internal linking:**
  - Add a "Compare" link to the Resources nav in `app/layout.tsx`.
  - Add a CTA on each country calculator page
    ("Compare {country} with another country →") in `app/[country]/page.tsx`.

## New files & touch-points

```
app/compare/page.tsx            # NEW — hub: grid of 10 pair cards + metadata
app/compare/[pair]/page.tsx     # NEW — comparison page (metadata + JSON-LD + layout)
components/CompareView.tsx       # NEW — 'use client' two-country interactive tax table
                                 #       (extract shared logic from ComparisonView.tsx)
lib/comparisons/index.ts         # NEW — COMPARISONS data (intro + FAQ per pair),
                                 #       canonical pair ordering, slug parse/validate helpers
app/sitemap.ts                   # EDIT — + hub + 10 pair URLs
app/layout.tsx                   # EDIT — + "Compare" nav link
app/[country]/page.tsx           # EDIT — + cross-link CTA to comparisons
```

**No new dependencies.** All client interactivity reuses `useExchangeRates` and
`calculate`. `CompareView` shares the formatting/best-pick logic currently in
`ComparisonView`; extract the common helpers rather than duplicating them.

## Constraints (from CLAUDE.md)

- Static export only — no `getServerSideProps`, API routes, or server actions.
- TypeScript strict — explicit types, no `as any` / `@ts-ignore`.
- Internal links use Next.js `<Link>` (base path `/seatax` applied automatically).
- Jungle Modernism tokens for all styling.

## Verification

1. `npm run lint` — zero errors.
2. `npm run build` — succeeds; static export generates all 10 pair pages + hub.
3. `npm run dev` — manual spot-check:
   - Toggles (monthly/annual, resident/expat) update both countries.
   - Currency conversion works.
   - Verdict badges match the table numbers.
   - An invalid or reverse-order slug 404s.
