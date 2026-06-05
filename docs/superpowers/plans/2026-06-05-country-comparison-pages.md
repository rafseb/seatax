# Country-vs-Country Comparison Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new `/compare` section with 10 canonical country-pair pages that compare income tax, net pay, cost of living, and visa options for Southeast Asian countries, to capture "X vs Y" search traffic.

**Architecture:** A dynamic static route `app/compare/[pair]/page.tsx` generates exactly 10 alphabetically-ordered pairs (`dynamicParams = false`). Each page is a server component that reuses existing data (`COUNTRIES`, `COST_DATA`, `VISA_DATA`) and renders an interactive client island (`CompareView`) for the salary-driven tax comparison. Authored intro/FAQ text and deterministic verdict logic live in a new `lib/comparisons/` module.

**Tech Stack:** Next.js 16 (App Router, static export), React 19, TypeScript 5 (strict), Tailwind CSS v4, Jungle Modernism CSS-token styling.

---

## ⚠️ Testing note (read first)

This project has **no automated test framework** and CLAUDE.md rule #7 forbids adding one ("do not add Jest/Vitest unless explicitly requested"). The user's CLAUDE.md takes priority over the writing-plans skill's default TDD steps.

**Therefore, every task's verification is:**
1. `npm run lint` — must report zero errors/warnings.
2. `npm run build` — must succeed (this runs full TypeScript type-checking and the static export).
3. Manual browser checks in `npm run dev` (Task 6 only).

Do **not** add test files or a test runner.

---

## File structure

| File | Responsibility | Action |
|------|----------------|--------|
| `lib/comparisons/index.ts` | Canonical pair list, slug parse/validate, authored intro+FAQ per pair, deterministic cost-basket & nomad-visa verdict helpers | Create |
| `lib/formatCurrency.ts` | Shared local-currency formatter (extracted from `ComparisonView`) | Create |
| `components/CompareView.tsx` | `'use client'` island: salary controls + verdict strip + two-country tax table | Create |
| `components/ComparisonView.tsx` | Use the extracted formatter (DRY) | Modify |
| `app/compare/[pair]/page.tsx` | Comparison page: metadata, JSON-LD, layout sections | Create |
| `app/compare/page.tsx` | Hub page: grid of 10 pair cards | Create |
| `app/sitemap.ts` | Add hub + 10 pair URLs | Modify |
| `app/layout.tsx` | Add "Compare" nav link | Modify |
| `app/[country]/page.tsx` | Add cross-link CTA to comparisons | Modify |

---

## Task 1: Comparison data module

**Files:**
- Create: `lib/comparisons/index.ts`

This module is the single source of truth for: the 10 canonical pairs, slug parsing/validation, authored content (intro + FAQ per pair), and the deterministic verdict helpers (cheaper cost of living, easier nomad visa).

- [ ] **Step 1: Create `lib/comparisons/index.ts` with the full content below**

```typescript
import { COUNTRIES } from '@/lib/countries';
import { getCostData } from '@/lib/resources/costData';
import { getVisaData } from '@/lib/resources/visaData';
import type { CostCategory } from '@/lib/resources/types';

export interface ComparisonFaq {
  q: string;
  a: string;
}

export interface ComparisonContent {
  intro: string;
  faqs: ComparisonFaq[];
}

/**
 * All 10 canonical country pairs in alphabetical (slug-sorted) order.
 * Reverse orderings are never generated — see app/compare/[pair]/page.tsx.
 */
export const CANONICAL_PAIRS: [string, string][] = (() => {
  const slugs = COUNTRIES.map((c) => c.slug).sort();
  const pairs: [string, string][] = [];
  for (let i = 0; i < slugs.length; i++) {
    for (let j = i + 1; j < slugs.length; j++) {
      pairs.push([slugs[i], slugs[j]]);
    }
  }
  return pairs;
})();

/** Build the canonical pair slug from two already-sorted country slugs. */
export function pairSlug(a: string, b: string): string {
  return `${a}-vs-${b}`;
}

/** All canonical pair slugs, e.g. "indonesia-vs-malaysia". */
export const CANONICAL_PAIR_SLUGS: string[] = CANONICAL_PAIRS.map(([a, b]) => pairSlug(a, b));

const VALID_SLUGS = new Set(COUNTRIES.map((c) => c.slug));

/**
 * Parse a "<a>-vs-<b>" param. Returns the [a, b] tuple only if:
 *  - it splits into exactly two parts on "-vs-"
 *  - both are valid country slugs
 *  - a !== b
 *  - a < b (canonical alphabetical order)
 * Otherwise returns null (caller should notFound()).
 */
export function parsePair(slug: string): [string, string] | null {
  const parts = slug.split('-vs-');
  if (parts.length !== 2) return null;
  const [a, b] = parts;
  if (!VALID_SLUGS.has(a) || !VALID_SLUGS.has(b)) return null;
  if (a === b) return null;
  if (a >= b) return null;
  return [a, b];
}

// --- Deterministic verdict: cost of living ----------------------------------

/** A fixed monthly basket used to compute a comparable cost-of-living total (USD). */
const BASKET: { category: CostCategory; qty: number }[] = [
  { category: 'housing-mid', qty: 1 },
  { category: 'meal-mid', qty: 20 },
  { category: 'meal-cheap', qty: 20 },
  { category: 'internet-monthly', qty: 1 },
  { category: 'transport-monthly', qty: 1 },
  { category: 'coworking-monthly', qty: 1 },
];

/** Total monthly basket cost in USD for a country, or 0 if data missing. */
export function monthlyBasketUSD(slug: string): number {
  const data = getCostData(slug);
  if (!data) return 0;
  return BASKET.reduce((sum, item) => {
    const point = data.costs.find((c) => c.category === item.category);
    return sum + (point ? point.usd * item.qty : 0);
  }, 0);
}

/**
 * The cheaper country slug, or null if the gap is less than 5% (treated as a tie) or data missing.
 */
export function cheaperCountry(a: string, b: string): string | null {
  const ca = monthlyBasketUSD(a);
  const cb = monthlyBasketUSD(b);
  if (ca === 0 || cb === 0) return null;
  const diff = Math.abs(ca - cb) / Math.min(ca, cb);
  if (diff < 0.05) return null;
  return ca < cb ? a : b;
}

// --- Deterministic verdict: nomad visa --------------------------------------

/**
 * True if the country has a *formal* digital-nomad visa. Entries categorised as
 * digital-nomad but flagged in their name as an informal workaround (e.g.
 * Vietnam's "E-Visa Workaround (no formal visa exists)") do not count — they
 * would otherwise produce a misleading "easier nomad visa" verdict and
 * contradict the authored FAQ copy.
 */
export function hasNomadVisa(slug: string): boolean {
  const data = getVisaData(slug);
  return (
    !!data &&
    data.visas.some(
      (v) => v.category === 'digital-nomad' && !/no formal visa|workaround/i.test(v.name),
    )
  );
}

/**
 * The country with an easier nomad path (has a dedicated nomad visa, other doesn't),
 * or null if both have one or neither does.
 */
export function easierNomadCountry(a: string, b: string): string | null {
  const na = hasNomadVisa(a);
  const nb = hasNomadVisa(b);
  if (na === nb) return null;
  return na ? a : b;
}

// --- Authored content -------------------------------------------------------

export const COMPARISONS: Record<string, ComparisonContent> = {
  'indonesia-vs-malaysia': {
    intro:
      'Indonesia and Malaysia are two of Southeast Asia’s most popular expat bases, and the choice between them often comes down to tax treatment, cost of living, and how easy it is to get a long-stay visa. Whether you’re weighing Malaysia vs Indonesia for a job offer or a remote-work move, this page compares income tax, take-home pay, monthly costs, and visa routes side by side for 2025.',
    faqs: [
      {
        q: 'Which has lower income tax, Indonesia or Malaysia?',
        a: 'Both use progressive brackets topping out at 35% (Indonesia, PPh 21) and 30% (Malaysia, YA 2024). Indonesia gives a flat PTKP allowance of Rp54,000,000/year, while Malaysia front-loads relief (RM9,000 personal + up to RM4,000 EPF). Use the calculator above to see which is lower at your specific salary — the answer flips depending on income level.',
      },
      {
        q: 'Is Malaysia or Indonesia cheaper to live in?',
        a: 'On the monthly basket above (housing, food, internet, transport, co-working) the two are close, with Indonesia (Jakarta) typically edging out Malaysia (Kuala Lumpur) on rent and food. See the cost-of-living table for the current breakdown.',
      },
      {
        q: 'How are non-resident expats taxed in each country?',
        a: 'Indonesia applies a flat 20% withholding tax to non-residents (present under 183 days) with no PTKP. Malaysia applies a flat 30% to non-residents (present under 182 days) with no reliefs. Both switch you to resident progressive rates once you cross the day threshold.',
      },
      {
        q: 'Is Indonesia or Malaysia better for digital nomads?',
        a: 'Indonesia offers the E33G remote-worker (digital nomad) visa for foreign-sourced income, while Malaysia offers the DE Rantau Nomad Pass. The visa snapshot below shows the current options; the verdict strip flags which has the more established dedicated nomad route.',
      },
    ],
  },
  'indonesia-vs-philippines': {
    intro:
      'Indonesia and the Philippines both draw expats with low costs and large English- or service-friendly cities, but their tax systems differ sharply. Whether you’re comparing the Philippines vs Indonesia for an employer relocation or a remote move, this page lines up income tax, net pay, living costs, and visas for 2025.',
    faqs: [
      {
        q: 'Which has lower income tax, Indonesia or the Philippines?',
        a: 'The Philippines (TRAIN Law) is tax-free up to ₱250,000/year and then runs 15%–35%; Indonesia (PPh 21) starts at 5% above the Rp54,000,000 PTKP and runs to 35%. At lower-to-mid salaries the Philippines’ large zero-rate band is often favourable — confirm at your salary with the calculator above.',
      },
      {
        q: 'Is the Philippines or Indonesia cheaper to live in?',
        a: 'Indonesia (Jakarta) and the Philippines (Manila) are broadly similar; Indonesia tends to be slightly cheaper on rent and local meals. The cost-of-living table below shows the current monthly basket for both.',
      },
      {
        q: 'What are the mandatory contributions in each country?',
        a: 'The Philippines deducts SSS (5%), PhilHealth (2.5% employee share) and Pag-IBIG (2%, capped ₱200/mo). Indonesia deducts BPJS Kesehatan (1%), JHT (2%) and JP (1%). These are taken before income tax and are reflected in the net-pay figures above.',
      },
      {
        q: 'Is Indonesia or the Philippines better for digital nomads?',
        a: 'Indonesia has the dedicated E33G digital-nomad visa for foreign-sourced income; the Philippines relies on tourist-visa extensions for most remote workers. See the visa snapshot and verdict strip below.',
      },
    ],
  },
  'indonesia-vs-thailand': {
    intro:
      'Indonesia and Thailand are perennial favourites for expats and nomads in the region. Whether you’re weighing Thailand vs Indonesia for tax efficiency or lifestyle, this page compares income tax, take-home pay, monthly costs, and visa options side by side for 2025.',
    faqs: [
      {
        q: 'Which has lower income tax, Indonesia or Thailand?',
        a: 'Thailand’s effective tax-free threshold is high once the 50% standard deduction (max ฿100,000) and ฿60,000 allowance are applied — many earning under ~฿310,000/year pay no tax. Indonesia starts at 5% above the Rp54,000,000 PTKP. Both cap at 35%; compare at your salary using the calculator above.',
      },
      {
        q: 'Is Thailand or Indonesia cheaper to live in?',
        a: 'Indonesia (Jakarta) is generally a touch cheaper than Thailand (Bangkok) on the monthly basket, especially housing, though Bangkok offers stronger transport infrastructure. The cost-of-living table shows the current figures.',
      },
      {
        q: 'Do I pay tax on foreign income in either country?',
        a: 'Since January 2024 Thailand may tax foreign income remitted to Thailand by tax residents (180+ days). Indonesia taxes residents on worldwide income but guidance on foreign-sourced remote income remains limited. Seek professional advice if you spend more than half the year in either.',
      },
      {
        q: 'Is Indonesia or Thailand better for digital nomads?',
        a: 'Indonesia offers the E33G digital-nomad visa, while Thailand offers the Destination Thailand Visa (DTV) for remote workers. Both have dedicated routes — see the visa snapshot below for stay length and income requirements.',
      },
    ],
  },
  'indonesia-vs-vietnam': {
    intro:
      'Indonesia and Vietnam are fast-growing bases for expats and remote workers. Whether you’re comparing Vietnam vs Indonesia for a posting or a nomad stint, this page sets income tax, net pay, living costs, and visa routes side by side for 2025.',
    faqs: [
      {
        q: 'Which has lower income tax, Indonesia or Vietnam?',
        a: 'Vietnam taxes residents on monthly progressive brackets (5%–35%) after a ₫11,000,000 personal deduction; Indonesia uses annual brackets (5%–35%) above the Rp54,000,000 PTKP. Vietnam’s combined 10.5% employee insurance also reduces take-home. Compare at your salary with the calculator above.',
      },
      {
        q: 'Is Vietnam or Indonesia cheaper to live in?',
        a: 'Vietnam (Ho Chi Minh City) is typically the cheapest of the SEA hubs on the monthly basket, often undercutting Indonesia (Jakarta) on rent, food and co-working. The cost-of-living table shows the current breakdown.',
      },
      {
        q: 'How are non-resident expats taxed in each country?',
        a: 'Both apply a flat 20% to non-residents on locally-sourced income with no deductions. You become a resident at 183 days in Vietnam, or 183 days (or intent to reside) in Indonesia, switching to the progressive system.',
      },
      {
        q: 'Is Indonesia or Vietnam better for digital nomads?',
        a: 'Indonesia has the dedicated E33G digital-nomad visa; Vietnam currently relies on business/tourist visas and e-visas for most remote workers. The verdict strip and visa snapshot below summarise the difference.',
      },
    ],
  },
  'malaysia-vs-philippines': {
    intro:
      'Malaysia and the Philippines both offer English-friendly environments and established expat communities. Whether you’re weighing the Philippines vs Malaysia for an employer move or remote work, this page compares income tax, net pay, monthly costs, and visa options for 2025.',
    faqs: [
      {
        q: 'Which has lower income tax, Malaysia or the Philippines?',
        a: 'The Philippines is tax-free to ₱250,000/year then 15%–35%; Malaysia is tax-free to RM5,000 then 1%–30% with RM9,000 personal relief plus EPF relief. Malaysia’s lower entry brackets often favour mid earners, but it depends on your salary — check with the calculator above.',
      },
      {
        q: 'Is the Philippines or Malaysia cheaper to live in?',
        a: 'Malaysia (Kuala Lumpur) and the Philippines (Manila) are close on the monthly basket; Malaysia often offers better value housing and transport for the price. See the cost-of-living table below.',
      },
      {
        q: 'What are the mandatory contributions in each country?',
        a: 'Malaysia deducts EPF (11%, no salary ceiling, partly tax-deductible), SOCSO (0.5%) and EIS (0.2%). The Philippines deducts SSS (5%), PhilHealth (2.5%) and Pag-IBIG (2%). Malaysia’s EPF is fully refundable when you leave permanently.',
      },
      {
        q: 'Is Malaysia or the Philippines better for digital nomads?',
        a: 'Malaysia offers the DE Rantau Nomad Pass for remote workers; the Philippines mainly relies on tourist-visa extensions. The visa snapshot and verdict strip below show the current options.',
      },
    ],
  },
  'malaysia-vs-thailand': {
    intro:
      'Malaysia and Thailand are top-tier expat hubs with strong infrastructure and international communities. Whether you’re comparing Thailand vs Malaysia for tax, lifestyle, or visa access, this page lines up income tax, take-home pay, costs, and visas for 2025.',
    faqs: [
      {
        q: 'Which has lower income tax, Malaysia or Thailand?',
        a: 'Thailand’s 50% standard deduction (max ฿100,000) plus ฿60,000 allowance create a high effective tax-free threshold; Malaysia offers RM9,000 personal relief plus EPF relief and tops out at 30% versus Thailand’s 35%. The lower-earning country at your salary is best confirmed with the calculator above.',
      },
      {
        q: 'Is Thailand or Malaysia cheaper to live in?',
        a: 'The two are closely matched on the monthly basket; Thailand (Bangkok) can be cheaper on food while Malaysia (Kuala Lumpur) often wins on housing value. The cost-of-living table shows the current numbers.',
      },
      {
        q: 'How does foreign income and residency work in each?',
        a: 'Thailand may tax foreign income remitted by residents (180+ days) since 2024. Malaysia generally exempts foreign-sourced income for individuals and taxes residents (182+ days) on Malaysian-source income at progressive rates. Non-residents pay flat rates (Thailand: progressive without deductions; Malaysia: 30%).',
      },
      {
        q: 'Is Malaysia or Thailand better for digital nomads?',
        a: 'Both have dedicated routes: Malaysia’s DE Rantau Nomad Pass and Thailand’s Destination Thailand Visa (DTV). The visa snapshot below compares stay length and income requirements.',
      },
    ],
  },
  'malaysia-vs-vietnam': {
    intro:
      'Malaysia and Vietnam appeal to different expat priorities — polished infrastructure versus low cost and fast growth. Whether you’re weighing Vietnam vs Malaysia for a job or remote work, this page compares income tax, net pay, living costs, and visa routes for 2025.',
    faqs: [
      {
        q: 'Which has lower income tax, Malaysia or Vietnam?',
        a: 'Malaysia runs 0%–30% with generous reliefs (RM9,000 + EPF); Vietnam runs 5%–35% on monthly brackets after a ₫11,000,000 deduction, plus 10.5% mandatory insurance. Malaysia is often lighter on total deductions for higher earners — confirm at your salary with the calculator above.',
      },
      {
        q: 'Is Vietnam or Malaysia cheaper to live in?',
        a: 'Vietnam (Ho Chi Minh City) is usually the cheaper of the two on the monthly basket, particularly food and co-working, while Malaysia (Kuala Lumpur) offers more mid-to-upmarket housing. See the cost-of-living table below.',
      },
      {
        q: 'What are the mandatory contributions in each country?',
        a: 'Vietnam deducts social (8%), health (1.5%) and unemployment (1%) insurance — 10.5% total, capped at ₫36,000,000/mo. Malaysia deducts EPF (11%), SOCSO (0.5%) and EIS (0.2%). Both reduce take-home pay shown above.',
      },
      {
        q: 'Is Malaysia or Vietnam better for digital nomads?',
        a: 'Malaysia offers the DE Rantau Nomad Pass; Vietnam currently lacks a dedicated nomad visa and relies on business/tourist e-visas. The verdict strip and visa snapshot below summarise the gap.',
      },
    ],
  },
  'philippines-vs-thailand': {
    intro:
      'The Philippines and Thailand are two of the most searched-for expat destinations in Southeast Asia. Whether you’re comparing Thailand vs the Philippines for tax efficiency, cost of living, or visa access, this page sets income tax, take-home pay, costs, and visas side by side for 2025.',
    faqs: [
      {
        q: 'Which has lower income tax, the Philippines or Thailand?',
        a: 'The Philippines is tax-free to ₱250,000/year; Thailand’s 50% deduction (max ฿100,000) plus ฿60,000 allowance push its effective tax-free threshold to roughly ฿310,000/year. Both top out at 35%. The better option depends on your salary — use the calculator above.',
      },
      {
        q: 'Is Thailand or the Philippines cheaper to live in?',
        a: 'Thailand (Bangkok) and the Philippines (Manila) are comparable; Thailand generally offers stronger transport and slightly higher mid-range dining costs. The cost-of-living table shows the current monthly basket.',
      },
      {
        q: 'How are non-residents and foreign income treated?',
        a: 'The Philippines taxes short-stay non-residents at a flat 25% on local income. Thailand taxes non-residents at progressive rates without deductions, and since 2024 may tax foreign income remitted by residents (180+ days). Seek advice if you split the year.',
      },
      {
        q: 'Is the Philippines or Thailand better for digital nomads?',
        a: 'Thailand offers the Destination Thailand Visa (DTV) for remote workers; the Philippines mostly relies on tourist-visa extensions. The visa snapshot and verdict strip below show the difference.',
      },
    ],
  },
  'philippines-vs-vietnam': {
    intro:
      'The Philippines and Vietnam both combine low costs with growing economies, but their tax and contribution systems are very different. Whether you’re weighing Vietnam vs the Philippines for an employer move or remote work, this page compares income tax, net pay, costs, and visas for 2025.',
    faqs: [
      {
        q: 'Which has lower income tax, the Philippines or Vietnam?',
        a: 'The Philippines is tax-free to ₱250,000/year then 15%–35%; Vietnam applies monthly brackets (5%–35%) after a ₫11,000,000 deduction plus 10.5% insurance. The Philippines’ zero-rate band often helps lower earners — confirm at your salary with the calculator above.',
      },
      {
        q: 'Is Vietnam or the Philippines cheaper to live in?',
        a: 'Vietnam (Ho Chi Minh City) is typically cheaper than the Philippines (Manila) on the monthly basket, especially food and co-working space. The cost-of-living table below has the current breakdown.',
      },
      {
        q: 'What are the mandatory contributions in each country?',
        a: 'Vietnam deducts 10.5% (social 8%, health 1.5%, unemployment 1%), capped at ₫36,000,000/mo. The Philippines deducts SSS (5%), PhilHealth (2.5%) and Pag-IBIG (2%). Both are taken before income tax.',
      },
      {
        q: 'Is the Philippines or Vietnam better for digital nomads?',
        a: 'Neither has a long-established dedicated nomad visa; both rely largely on tourist or business entry for remote workers. The visa snapshot below shows the practical options for each.',
      },
    ],
  },
  'thailand-vs-vietnam': {
    intro:
      'Thailand and Vietnam are neighbouring heavyweights for expats and digital nomads, with very different tax structures. Whether you’re comparing Vietnam vs Thailand for tax, cost of living, or visas, this page lines up income tax, take-home pay, costs, and visa routes for 2025.',
    faqs: [
      {
        q: 'Which has lower income tax, Thailand or Vietnam?',
        a: 'Thailand’s deductions create a high effective tax-free threshold (~฿310,000/year), while Vietnam taxes monthly from 5% after a ₫11,000,000 deduction and adds 10.5% insurance. Thailand is often lighter at lower incomes; compare at your salary with the calculator above.',
      },
      {
        q: 'Is Vietnam or Thailand cheaper to live in?',
        a: 'Vietnam (Ho Chi Minh City) is usually cheaper than Thailand (Bangkok) on the monthly basket, particularly housing and co-working, though Bangkok has more extensive transport. The cost-of-living table shows current figures.',
      },
      {
        q: 'How is foreign income and residency handled in each?',
        a: 'Thailand may tax foreign income remitted by residents (180+ days) since 2024; Vietnam taxes residents (183+ days) on worldwide income. Non-residents pay progressive-without-deductions in Thailand and a flat 20% in Vietnam.',
      },
      {
        q: 'Is Thailand or Vietnam better for digital nomads?',
        a: 'Thailand offers the dedicated Destination Thailand Visa (DTV); Vietnam currently relies on business/tourist e-visas. The verdict strip and visa snapshot below summarise the difference.',
      },
    ],
  },
};

export function getComparison(slug: string): ComparisonContent | undefined {
  return COMPARISONS[slug];
}
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: zero errors.

- [ ] **Step 3: Type-check via build**

Run: `npm run build`
Expected: build succeeds (the new file type-checks even though nothing imports it yet).

- [ ] **Step 4: Commit**

```bash
git add lib/comparisons/index.ts
git commit -m "feat: add comparison data module (pairs, verdicts, authored content)"
```

---

## Task 2: Shared currency formatter + CompareView client island

**Files:**
- Create: `lib/formatCurrency.ts`
- Modify: `components/ComparisonView.tsx` (use the extracted formatter)
- Create: `components/CompareView.tsx`

- [ ] **Step 1: Create `lib/formatCurrency.ts`**

```typescript
/** Format a local-currency amount with its symbol and no decimal places. */
export function formatLocalAmount(amount: number, currency: string, symbol: string): string {
  const absAmount = Math.abs(amount);
  if (currency === 'VND' || currency === 'IDR') {
    return `${symbol}${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(absAmount)}`;
  }
  return `${symbol}${new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(absAmount)}`;
}
```

- [ ] **Step 2: Refactor `components/ComparisonView.tsx` to use it (DRY)**

Replace the local `fmtLocal` function definition (lines 15–21) with an import. Change the top imports block so it adds:

```typescript
import { formatLocalAmount } from '@/lib/formatCurrency';
```

Delete this block:

```typescript
function fmtLocal(amount: number, currency: string, symbol: string): string {
  const absAmount = Math.abs(amount);
  if (currency === 'VND' || currency === 'IDR') {
    return `${symbol}${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(absAmount)}`;
  }
  return `${symbol}${new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(absAmount)}`;
}
```

Then replace the four `fmtLocal(` call sites inside the component (the `displayGross` / `displayTax` / `displayContrib` / `displayNet` assignments) with `formatLocalAmount(`.

- [ ] **Step 3: Create `components/CompareView.tsx`**

```typescript
'use client';

import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import type { Country } from '@/lib/types';
import { calculate } from '@/lib/calculators';
import { useExchangeRates } from '@/lib/useExchangeRates';
import { formatLocalAmount } from '@/lib/formatCurrency';

interface Props {
  a: Country;
  b: Country;
  costWinnerSlug: string | null;
  nomadWinnerSlug: string | null;
}

const cardStyle = {
  background: 'var(--forest-800)',
  border: '1px solid var(--forest-700)',
  borderRadius: '4px',
};

const DEFAULT_GROSS_USD = 2000;

export default function CompareView({ a, b, costWinnerSlug, nomadWinnerSlug }: Props) {
  const exchangeRates = useExchangeRates();
  const [grossUSD, setGrossUSD] = useState(DEFAULT_GROSS_USD);
  const [period, setPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [isExpat, setIsExpat] = useState(false);

  const rows = useMemo(() => {
    if (exchangeRates.loading || grossUSD <= 0) return null;
    const build = (country: Country) => {
      const rate = exchangeRates.getRate('USD', country.currency);
      if (rate === null) return null;
      const localGross = grossUSD * rate;
      const result = calculate(country.slug, { grossSalary: localGross, period, isExpat });
      if (!result) return null;
      const toUSD = exchangeRates.getRate(country.currency, 'USD');
      if (toUSD === null) return null;
      const netLocal = period === 'monthly' ? result.netMonthly : result.netAnnual;
      const netUSD = netLocal * toUSD;
      return { country, result, netUSD };
    };
    const ra = build(a);
    const rb = build(b);
    if (!ra || !rb) return null;
    return { ra, rb };
  }, [a, b, grossUSD, period, isExpat, exchangeRates]);

  const taxWinner = useMemo(() => {
    if (!rows) return null;
    const ea = rows.ra.result.effectiveRate;
    const eb = rows.rb.result.effectiveRate;
    if (ea < eb) return a.slug;
    if (eb < ea) return b.slug;
    return null;
  }, [rows, a.slug, b.slug]);

  const netWinner = useMemo(() => {
    if (!rows) return null;
    if (rows.ra.netUSD > rows.rb.netUSD) return a.slug;
    if (rows.rb.netUSD > rows.ra.netUSD) return b.slug;
    return null;
  }, [rows, a.slug, b.slug]);

  const nameFor = (slug: string | null): string => {
    if (slug === a.slug) return `${a.flag} ${a.name}`;
    if (slug === b.slug) return `${b.flag} ${b.name}`;
    return 'Too close to call';
  };

  const periodLabel = period === 'monthly' ? '/mo' : '/yr';

  const toggleBtn = (active: boolean): CSSProperties => ({
    padding: '4px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 600,
    background: active ? 'var(--gold-500)' : 'transparent',
    color: active ? 'var(--forest-950)' : 'var(--forest-300)',
    border: `1px solid ${active ? 'var(--gold-500)' : 'var(--forest-700)'}`,
  });

  const verdicts = [
    { label: 'Lower income tax', slug: taxWinner },
    { label: 'Higher net pay', slug: netWinner },
    { label: 'Cheaper to live', slug: costWinnerSlug },
    { label: 'Easier nomad visa', slug: nomadWinnerSlug },
  ];

  return (
    <div className="space-y-6">
      {/* Verdict strip */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        {verdicts.map((v) => (
          <div key={v.label} className="p-3" style={cardStyle}>
            <p className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: 'var(--gold-500)' }}>
              {v.label}
            </p>
            <p className="mt-1 text-sm font-semibold" style={{ color: 'var(--cream)' }}>
              {nameFor(v.slug)}
            </p>
          </div>
        ))}
      </div>

      {/* Controls + table */}
      <div className="p-6 space-y-4" style={cardStyle}>
        <div className="flex flex-wrap items-end gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: 'var(--forest-400)' }}>
              Gross salary (USD)
            </span>
            <input
              type="number"
              min={0}
              step={100}
              value={grossUSD}
              onChange={(e) => setGrossUSD(Math.max(0, Number(e.target.value)))}
              className="w-32 px-2 py-1 text-sm rounded"
              style={{ background: 'var(--forest-900)', color: 'var(--cream)', border: '1px solid var(--forest-700)' }}
            />
          </label>
          <div className="flex gap-2">
            <button type="button" aria-pressed={period === 'monthly'} onClick={() => setPeriod('monthly')} style={toggleBtn(period === 'monthly')}>
              Monthly
            </button>
            <button type="button" aria-pressed={period === 'annual'} onClick={() => setPeriod('annual')} style={toggleBtn(period === 'annual')}>
              Annual
            </button>
          </div>
          <div className="flex gap-2">
            <button type="button" aria-pressed={!isExpat} onClick={() => setIsExpat(false)} style={toggleBtn(!isExpat)}>
              Resident
            </button>
            <button type="button" aria-pressed={isExpat} onClick={() => setIsExpat(true)} style={toggleBtn(isExpat)}>
              Expat
            </button>
          </div>
        </div>

        {exchangeRates.loading ? (
          <p className="text-sm text-center" style={{ color: 'var(--forest-400)' }}>Loading exchange rates…</p>
        ) : grossUSD <= 0 ? (
          <p className="text-sm text-center" style={{ color: 'var(--forest-400)' }}>Enter a salary above to compare.</p>
        ) : !rows ? (
          <p className="text-sm text-center" style={{ color: 'var(--forest-400)' }}>Exchange rates unavailable. Cannot show comparison.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider" style={{ borderBottom: '1px solid var(--forest-700)', color: 'var(--forest-400)' }}>
                  <th className="text-left py-2 pr-3 font-medium">Country</th>
                  <th className="text-right py-2 px-3 font-medium">Gross</th>
                  <th className="text-right py-2 px-3 font-medium">Tax</th>
                  <th className="text-right py-2 px-3 font-medium">Contributions</th>
                  <th className="text-right py-2 px-3 font-medium">Net {periodLabel}</th>
                  <th className="text-right py-2 pl-3 font-medium">Eff. Rate</th>
                </tr>
              </thead>
              <tbody>
                {[rows.ra, rows.rb].map(({ country, result }) => {
                  const contribTotal = result.contributions.reduce((s, c) => s + c.amount, 0);
                  const displayGross = formatLocalAmount(period === 'monthly' ? result.grossMonthly : result.grossAnnual, result.currency, result.currencySymbol);
                  const displayTax = formatLocalAmount(period === 'monthly' ? result.incomeTax / 12 : result.incomeTax, result.currency, result.currencySymbol);
                  const displayContrib = formatLocalAmount(period === 'monthly' ? contribTotal / 12 : contribTotal, result.currency, result.currencySymbol);
                  const displayNet = formatLocalAmount(period === 'monthly' ? result.netMonthly : result.netAnnual, result.currency, result.currencySymbol);
                  return (
                    <tr key={country.slug} style={{ borderBottom: '1px solid var(--forest-700)' }}>
                      <td className="py-2.5 pr-3">
                        <span className="flex items-center gap-1.5">
                          <span className="text-base">{country.flag}</span>
                          <span className="font-medium" style={{ color: 'var(--cream)' }}>{country.name}</span>
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right" style={{ color: 'var(--forest-300)' }}>{displayGross}</td>
                      <td className="py-2.5 px-3 text-right" style={{ color: 'var(--accent)' }}>−{displayTax}</td>
                      <td className="py-2.5 px-3 text-right" style={{ color: 'var(--forest-300)' }}>−{displayContrib}</td>
                      <td className="py-2.5 px-3 text-right font-semibold" style={{ color: 'var(--cream)' }}>{displayNet}</td>
                      <td className="py-2.5 pl-3 text-right" style={{ color: 'var(--forest-400)' }}>{result.effectiveRate.toFixed(1)}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <p className="text-xs" style={{ color: 'var(--forest-400)' }}>
          Figures converted from USD at live rates. Actual take-home pay depends on additional local factors.
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: zero errors.

- [ ] **Step 5: Build**

Run: `npm run build`
Expected: build succeeds; `ComparisonView` still works with the extracted formatter.

- [ ] **Step 6: Commit**

```bash
git add lib/formatCurrency.ts components/ComparisonView.tsx components/CompareView.tsx
git commit -m "feat: add CompareView island and shared currency formatter"
```

---

## Task 3: Comparison page route

**Files:**
- Create: `app/compare/[pair]/page.tsx`

This server component ties everything together: static params, metadata, JSON-LD, and the seven layout sections from the spec.

- [ ] **Step 1: Create `app/compare/[pair]/page.tsx`**

```typescript
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getCountry } from '@/lib/countries';
import { getCostData } from '@/lib/resources/costData';
import { getVisaData } from '@/lib/resources/visaData';
import type { CostCategory } from '@/lib/resources/types';
import {
  CANONICAL_PAIR_SLUGS,
  parsePair,
  getComparison,
  cheaperCountry,
  easierNomadCountry,
  monthlyBasketUSD,
} from '@/lib/comparisons';
import CompareView from '@/components/CompareView';

const BASE_URL = 'https://rafseb.github.io/seatax';

interface Props {
  params: Promise<{ pair: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return CANONICAL_PAIR_SLUGS.map((pair) => ({ pair }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pair } = await params;
  const parsed = parsePair(pair);
  if (!parsed) return {};
  const [aSlug, bSlug] = parsed;
  const a = getCountry(aSlug);
  const b = getCountry(bSlug);
  if (!a || !b) return {};
  const title = `${a.name} vs ${b.name}: Income Tax & Cost of Living Compared (2025)`;
  const description = `Compare ${a.name} and ${b.name} for expats and remote workers: income tax, take-home pay, monthly cost of living, and visa options side by side (2025).`;
  return {
    title,
    description,
    openGraph: { title, description, url: `/seatax/compare/${pair}` },
    twitter: { card: 'summary', title, description },
    alternates: { canonical: `${BASE_URL}/compare/${pair}` },
  };
}

// Fixed display order for the cost-of-living table.
const COST_ROWS: { category: CostCategory; label: string }[] = [
  { category: 'housing-mid', label: 'Mid-range 1BR apartment' },
  { category: 'meal-cheap', label: 'Cheap local meal' },
  { category: 'meal-mid', label: 'Mid-range restaurant meal' },
  { category: 'internet-monthly', label: 'Home broadband' },
  { category: 'transport-monthly', label: 'Monthly transport' },
  { category: 'coworking-monthly', label: 'Co-working hot desk' },
];

function costFor(slug: string, category: CostCategory): number | null {
  const data = getCostData(slug);
  if (!data) return null;
  const point = data.costs.find((c) => c.category === category);
  return point ? point.usd : null;
}

export default async function ComparePage({ params }: Props) {
  const { pair } = await params;
  const parsed = parsePair(pair);
  if (!parsed) notFound();
  const [aSlug, bSlug] = parsed;
  const a = getCountry(aSlug);
  const b = getCountry(bSlug);
  const content = getComparison(pair);
  if (!a || !b || !content) notFound();

  const costWinnerSlug = cheaperCountry(aSlug, bSlug);
  const nomadWinnerSlug = easierNomadCountry(aSlug, bSlug);
  const basketA = Math.round(monthlyBasketUSD(aSlug));
  const basketB = Math.round(monthlyBasketUSD(bSlug));

  const visaA = (getVisaData(aSlug)?.visas ?? []).filter(
    (v) => v.category === 'employment' || v.category === 'digital-nomad',
  );
  const visaB = (getVisaData(bSlug)?.visas ?? []).filter(
    (v) => v.category === 'employment' || v.category === 'digital-nomad',
  );

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Compare', item: `${BASE_URL}/compare` },
      { '@type': 'ListItem', position: 3, name: `${a.name} vs ${b.name}`, item: `${BASE_URL}/compare/${pair}` },
    ],
  };
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map(({ q, a: ans }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: ans },
    })),
  };

  // Other pairs that involve either country, for cross-linking.
  const relatedPairs = CANONICAL_PAIR_SLUGS.filter((p) => p !== pair && (p.includes(aSlug) || p.includes(bSlug)));

  return (
    <div className="max-w-3xl mx-auto">
      {[breadcrumbLd, faqLd].map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      {/* Hero */}
      <div className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-[3px] mb-2" style={{ color: 'var(--gold-500)' }}>
          Country Comparison
        </p>
        <h1 className="text-2xl font-bold mb-3" style={{ color: 'var(--cream)' }}>
          {a.flag} {a.name} vs {b.flag} {b.name}: Income Tax &amp; Cost of Living (2025)
        </h1>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--forest-300)' }}>{content.intro}</p>
      </div>

      {/* Verdict strip + interactive tax table */}
      <CompareView a={a} b={b} costWinnerSlug={costWinnerSlug} nomadWinnerSlug={nomadWinnerSlug} />

      {/* Cost of living */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--cream)' }}>Cost of Living (monthly, USD)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider" style={{ borderBottom: '1px solid var(--forest-700)', color: 'var(--forest-400)' }}>
                <th className="text-left py-2 pr-3 font-medium">Item</th>
                <th className="text-right py-2 px-3 font-medium">{a.flag} {a.name}</th>
                <th className="text-right py-2 pl-3 font-medium">{b.flag} {b.name}</th>
              </tr>
            </thead>
            <tbody>
              {COST_ROWS.map((row) => {
                const va = costFor(aSlug, row.category);
                const vb = costFor(bSlug, row.category);
                const aCheaper = va !== null && vb !== null && va < vb;
                const bCheaper = va !== null && vb !== null && vb < va;
                return (
                  <tr key={row.category} style={{ borderBottom: '1px solid var(--forest-700)' }}>
                    <td className="py-2.5 pr-3" style={{ color: 'var(--forest-200)' }}>{row.label}</td>
                    <td className="py-2.5 px-3 text-right font-medium" style={{ color: aCheaper ? 'var(--gold-400)' : 'var(--forest-300)' }}>
                      {va === null ? '—' : `$${va}`}
                    </td>
                    <td className="py-2.5 pl-3 text-right font-medium" style={{ color: bCheaper ? 'var(--gold-400)' : 'var(--forest-300)' }}>
                      {vb === null ? '—' : `$${vb}`}
                    </td>
                  </tr>
                );
              })}
              <tr style={{ borderTop: '2px solid var(--forest-700)' }}>
                <td className="py-2.5 pr-3 font-semibold" style={{ color: 'var(--cream)' }}>Basket total</td>
                <td className="py-2.5 px-3 text-right font-semibold" style={{ color: basketA <= basketB ? 'var(--gold-400)' : 'var(--cream)' }}>${basketA}</td>
                <td className="py-2.5 pl-3 text-right font-semibold" style={{ color: basketB <= basketA ? 'var(--gold-400)' : 'var(--cream)' }}>${basketB}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs mt-2" style={{ color: 'var(--forest-400)' }}>
          Basket = mid-range housing + 40 meals + internet + transport + co-working. See the full{' '}
          <Link href="/resources/cost-of-living" className="nav-link underline">cost-of-living comparison</Link>.
        </p>
      </section>

      {/* Visa snapshot */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--cream)' }}>Visa &amp; Residency Snapshot</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[{ c: a, slug: aSlug, visas: visaA }, { c: b, slug: bSlug, visas: visaB }].map(({ c, slug, visas }) => (
            <div key={slug} className="p-4" style={{ background: 'var(--forest-800)', border: '1px solid var(--forest-700)', borderRadius: '4px' }}>
              <h3 className="text-base font-semibold mb-3" style={{ color: 'var(--cream)' }}>{c.flag} {c.name}</h3>
              <ul className="space-y-2">
                {visas.length === 0 ? (
                  <li className="text-sm" style={{ color: 'var(--forest-400)' }}>No work/nomad visa data available.</li>
                ) : (
                  visas.map((v) => (
                    <li key={v.name} className="text-sm" style={{ color: 'var(--forest-200)' }}>
                      <span className="font-medium" style={{ color: 'var(--cream)' }}>{v.name}</span> — {v.maxStay}
                      {v.minIncome ? ` · min income ${v.minIncome}` : ''}
                    </li>
                  ))
                )}
              </ul>
              <Link href={`/resources/visas/${slug}`} className="nav-link mt-3 inline-block text-sm font-medium">
                All {c.name} visas →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--cream)' }}>Frequently Asked Questions</h2>
        <div className="space-y-2">
          {content.faqs.map(({ q, a: ans }) => (
            <details key={q} className="group rounded-lg" style={{ background: 'var(--forest-800)', border: '1px solid var(--forest-700)' }}>
              <summary className="flex cursor-pointer items-start justify-between gap-4 px-4 py-3 text-sm font-medium list-none" style={{ color: 'var(--cream)' }}>
                <span>{q}</span>
                <span className="mt-0.5 shrink-0 group-open:rotate-180 transition-transform" style={{ color: 'var(--forest-400)' }}>▾</span>
              </summary>
              <div className="px-4 pb-4 pt-1 text-sm leading-relaxed" style={{ color: 'var(--forest-200)', borderTop: '1px solid var(--forest-700)' }}>{ans}</div>
            </details>
          ))}
        </div>
      </section>

      {/* Cross-links */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--cream)' }}>Keep Comparing</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {relatedPairs.map((p) => {
            const [x, y] = p.split('-vs-');
            const cx = getCountry(x);
            const cy = getCountry(y);
            return (
              <Link key={p} href={`/compare/${p}`} className="px-3 py-1.5 text-sm rounded-[4px]" style={{ background: 'var(--forest-800)', border: '1px solid var(--forest-700)', color: 'var(--forest-200)' }}>
                {cx?.flag} {cx?.name} vs {cy?.flag} {cy?.name}
              </Link>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href={`/${aSlug}`} className="nav-link font-medium">{a.name} tax calculator →</Link>
          <Link href={`/${bSlug}`} className="nav-link font-medium">{b.name} tax calculator →</Link>
          <Link href="/compare" className="nav-link font-medium">All comparisons →</Link>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: zero errors.

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: build succeeds and generates 10 pages under `out/compare/*-vs-*/`. Confirm with:

Run: `ls out/compare`
Expected: 10 pair directories (e.g. `indonesia-vs-malaysia`, …) — no reverse-order directories.

- [ ] **Step 4: Commit**

```bash
git add app/compare/[pair]/page.tsx
git commit -m "feat: add country-pair comparison page route"
```

---

## Task 4: Compare hub page

**Files:**
- Create: `app/compare/page.tsx`

- [ ] **Step 1: Create `app/compare/page.tsx`**

```typescript
import type { Metadata } from 'next';
import Link from 'next/link';
import { getCountry } from '@/lib/countries';
import { CANONICAL_PAIRS, pairSlug } from '@/lib/comparisons';

export const metadata: Metadata = {
  title: 'Compare Southeast Asia: Tax & Cost of Living by Country',
  description:
    'Side-by-side comparisons of income tax, take-home pay, cost of living, and visas for every pair of Southeast Asian countries — Philippines, Thailand, Vietnam, Indonesia, and Malaysia.',
  alternates: { canonical: 'https://rafseb.github.io/seatax/compare' },
};

const cardStyle = {
  background: 'var(--forest-800)',
  border: '1px solid var(--forest-700)',
  borderRadius: '4px',
};

export default function CompareHubPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[3px] mb-2" style={{ color: 'var(--gold-500)' }}>
          Country Comparison
        </p>
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--cream)' }}>Compare Southeast Asian Countries</h1>
        <p className="leading-relaxed" style={{ color: 'var(--forest-300)' }}>
          Pick a pair to compare income tax, take-home pay, monthly cost of living, and visa options side by side.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {CANONICAL_PAIRS.map(([aSlug, bSlug]) => {
          const a = getCountry(aSlug);
          const b = getCountry(bSlug);
          if (!a || !b) return null;
          return (
            <Link key={pairSlug(aSlug, bSlug)} href={`/compare/${pairSlug(aSlug, bSlug)}`} className="block p-5 transition-all" style={cardStyle}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{a.flag}</span>
                <span className="text-sm font-medium" style={{ color: 'var(--forest-400)' }}>vs</span>
                <span className="text-2xl">{b.flag}</span>
              </div>
              <h2 className="text-base font-semibold leading-snug" style={{ color: 'var(--cream)' }}>
                {a.name} vs {b.name}
              </h2>
              <span className="mt-2 inline-block text-sm font-medium" style={{ color: 'var(--gold-500)' }}>Compare →</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: zero errors.

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: build succeeds; `out/compare/index.html` exists.

- [ ] **Step 4: Commit**

```bash
git add app/compare/page.tsx
git commit -m "feat: add compare hub page"
```

---

## Task 5: Sitemap, nav, and country-page cross-link

**Files:**
- Modify: `app/sitemap.ts`
- Modify: `app/layout.tsx`
- Modify: `app/[country]/page.tsx`

- [ ] **Step 1: Add compare routes to `app/sitemap.ts`**

Add this import near the top, after the existing imports:

```typescript
import { CANONICAL_PAIR_SLUGS } from '@/lib/comparisons';
```

Then, inside the returned array, insert the following block immediately **after** the `resources/guides` entry object (the one with `priority: 0.8` and url ending `/resources/guides`) and before the `...ARTICLES.map(...)` spread:

```typescript
    {
      url: 'https://rafseb.github.io/seatax/compare',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    ...CANONICAL_PAIR_SLUGS.map((pair) => ({
      url: `https://rafseb.github.io/seatax/compare/${pair}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
```

- [ ] **Step 2: Add the "Compare" nav link in `app/layout.tsx`**

Replace this block (around lines 73–75):

```typescript
            <Link href="/resources" className="nav-link text-sm whitespace-nowrap">
              Resources
            </Link>
```

with:

```typescript
            <Link href="/compare" className="nav-link text-sm whitespace-nowrap">
              Compare
            </Link>
            <Link href="/resources" className="nav-link text-sm whitespace-nowrap">
              Resources
            </Link>
```

- [ ] **Step 3: Add a comparison CTA on the country page in `app/[country]/page.tsx`**

Replace this block (the guide cross-link `<div>`, around lines 353–360):

```typescript
            <div className="mt-6">
              <Link
                href={`/resources/guides/${guide.articleSlug}`}
                className="nav-link text-sm font-medium hover:underline"
              >
                Read our complete expat &amp; remote work guide for {country.name} →
              </Link>
            </div>
```

with:

```typescript
            <div className="mt-6 space-y-2">
              <Link
                href={`/resources/guides/${guide.articleSlug}`}
                className="nav-link text-sm font-medium hover:underline block"
              >
                Read our complete expat &amp; remote work guide for {country.name} →
              </Link>
              <Link
                href="/compare"
                className="nav-link text-sm font-medium hover:underline block"
              >
                Compare {country.name} with another country →
              </Link>
            </div>
```

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: zero errors.

- [ ] **Step 5: Build**

Run: `npm run build`
Expected: build succeeds. Confirm the sitemap includes the new URLs:

Run: `grep -o "/compare" out/sitemap.xml | wc -l`
Expected: 11 (1 hub + 10 pairs).

- [ ] **Step 6: Commit**

```bash
git add app/sitemap.ts app/layout.tsx app/[country]/page.tsx
git commit -m "feat: wire comparison pages into sitemap, nav, and country pages"
```

---

## Task 6: Manual verification

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`
Then open `http://localhost:3000/compare`.

- [ ] **Step 2: Hub page**

Confirm: 10 pair cards render, each links to `/compare/<a>-vs-<b>`.

- [ ] **Step 3: A comparison page (`/compare/philippines-vs-thailand`)**

Confirm:
- Hero shows both flags + intro.
- Verdict strip shows four badges (Lower income tax / Higher net pay / Cheaper to live / Easier nomad visa), each naming a country or "Too close to call".
- Changing the USD salary, and toggling Monthly/Annual and Resident/Expat, updates both rows and the tax/net badges.
- The "Lower income tax" badge matches whichever row shows the lower effective rate; "Higher net pay" matches the higher net.
- Cost-of-living table renders with a highlighted cheaper column per row and a basket total.
- Visa snapshot lists employment/nomad visas per country with working "All X visas →" links.
- FAQ accordion expands/collapses.
- Cross-links navigate to related pairs and the two country calculators.

- [ ] **Step 4: 404 behaviour**

Open `http://localhost:3000/compare/thailand-vs-philippines` (reverse order) and `http://localhost:3000/compare/philippines-vs-mars`.
Confirm: both render the Next.js 404 page (not a broken comparison).

- [ ] **Step 5: Final commit (if any docs/notes changed)**

No code changes expected here. If everything passes, the feature is complete.

---

## Self-review notes

- **Spec coverage:** routing (Task 3), hub (Task 4), computed-vs-authored split (Task 1), all 7 layout sections (Task 3), SEO metadata + BreadcrumbList + FAQPage JSON-LD (Task 3), sitemap + nav + country CTA internal linking (Task 5), verification (Task 6). All spec sections map to a task.
- **No new dependencies.** Reuses `calculate`, `useExchangeRates`, `COST_DATA`, `VISA_DATA`.
- **Type consistency:** `parsePair`, `pairSlug`, `CANONICAL_PAIR_SLUGS`, `CANONICAL_PAIRS`, `getComparison`, `cheaperCountry`, `easierNomadCountry`, `monthlyBasketUSD`, `hasNomadVisa` are defined in Task 1 and consumed with matching signatures in Tasks 3–5. `formatLocalAmount` defined in Task 2, used in Tasks 2. `CompareView` prop shape (`a`, `b`, `costWinnerSlug`, `nomadWinnerSlug`) matches its usage in Task 3.
