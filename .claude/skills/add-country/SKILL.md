---
name: add-country
description: Add a new Southeast Asian country to the SEA Tax Calculator following the standard 13-step process across all required files
---

Guide adding a new country to the SEA Tax Calculator. Ask for the country name if not provided.

**The authoritative checklist is the "How to Add a New Country" section in `CLAUDE.md` at the
repo root. Read it before starting and follow it step by step — it is kept in sync with the
codebase and this file is not.**

All thirteen steps are required. Do not skip any. Two of them are easy to miss and both break
the build rather than degrading quietly:

- **`CountrySlug` union in `lib/resources/types.ts`** — omit it and the visa/cost data entries
  fail type-checking.
- **The `SEO`, `FAQ` and `GUIDE` maps in `app/[country]/page.tsx`** — omit any one and the
  static export fails at prerender with an opaque `Cannot read properties of undefined
  (reading 'title')`, not at type-check.

## Quick reference

| # | File | What to add |
|---|------|-------------|
| 1 | `lib/countries.ts` | Country metadata object (slug, flag, currency, salary range, taxYear) |
| 2 | `lib/calculators/<slug>.ts` | `export function calculate(params): TaxResult` — named export, annual bracket thresholds |
| 3 | `lib/calculators/index.ts` | Import + entry in the `calculators` map |
| 4 | `lib/taxData/index.ts` | Brackets table, contribution rates, `expatNote`, official sources |
| 5 | `app/[country]/page.tsx` | `SEO`, `FAQ` **and** `GUIDE` entries keyed by slug |
| 6 | `app/globals.css` | `[data-country="<slug>"]` accent **and** the print-media selector list |
| 7 | `lib/resources/types.ts` | Extend the `CountrySlug` union |
| 8 | `lib/resources/visaData.ts` | New `CountryVisaData` entry |
| 9 | `lib/resources/costData.ts` | New `CountryCostData` entry |
| 10 | `app/resources/relocation/[country]/page.tsx` | New `CHECKLISTS` entry |
| 11 | `lib/articles/<slug>-expat-guide.ts` + `lib/articles/index.ts` | Guide article, registered in `ARTICLES`. **Do not** touch `LEGACY_BLOG_SLUGS` — it is frozen at the original five. |
| 12 | `app/sitemap.ts` | Only genuinely new static routes; country/guide/visa/relocation/compare entries derive from `COUNTRIES` and `ARTICLES` automatically |
| 13 | — | Verify (below) |

## Verify

```bash
npm run lint     # zero errors
npm run build    # must succeed — TypeScript checking and static export both run here
```

Then confirm the new country page, its compare pairs, and its resource pages render.

## Finally: sweep the prose

`lint` and `build` **cannot** catch copy that counts or enumerates the countries, and this is
the step most likely to ship a factually wrong homepage. Sweep and fix:

```bash
grep -rn "five countr\|all five\|of the five\|5 SEA\|Indonesia and Malaysia\|Indonesia, and Malaysia" \
  app components lib --include='*.tsx' --include='*.ts'
```

Check in particular: `app/page.tsx` (title, description, `COUNTRY_BLURBS`, and the FAQ answers
that feed `FAQPage` JSON-LD), `app/layout.tsx` metadata, and every `pageMetadata` description
under `app/resources/`. Also add the new country to the per-country arrays on the resource
pages — the tax-residency day-count table, work-permits, getting-paid-abroad, employer-of-record
and the digital-nomad hub — or those pages silently omit it.
