# CLAUDE.md — SEA Tax Calculator

## Project Overview

SEA Tax Calculator is a **fully static** Next.js 16 web app (no backend, no API routes, no database) that calculates net take-home salary after income tax and mandatory contributions for five Southeast Asian countries.

- **Live URL:** https://rafseb.github.io/seatax/
- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS v4 · Recharts

## Development Commands

```bash
npm run dev     # Start dev server on http://localhost:3000
npm run build   # Static export to /out (required before deploy)
npm run lint    # Run ESLint checks
npm run start   # Run production server locally (after build)
```

## Architecture

### Static Export Constraints

- `next.config.ts` sets `output: 'export'` and `basePath: '/seatax'`
- **No server-side code**: no `getServerSideProps`, no API routes, no server actions
- All rendering happens client-side or at build time
- External data: only the exchange rate API (`open.er-api.com`) is fetched client-side
- Build output goes to `/out/` — this is what GitHub Pages serves

### Directory Structure

```
app/
  [country]/page.tsx    # Dynamic country route; renders TaxCalculator
  blog/[slug]/page.tsx  # Legacy expat guide URLs (kept live for SEO; canonical is /resources/guides/)
  resources/
    page.tsx                      # Resource hub landing page
    guides/page.tsx               # Expat guide index (canonical destination)
    guides/[slug]/page.tsx        # Individual expat guide articles
    visas/page.tsx                # Visa hub (country cards)
    visas/[country]/page.tsx      # Per-country visa table (filterable)
    cost-of-living/page.tsx       # Side-by-side cost comparison table
    banking/page.tsx              # Banking & money guide
    relocation/page.tsx           # Relocation hub (country cards)
    relocation/[country]/page.tsx # Per-country relocation checklist
    health-insurance/page.tsx     # Health insurance guide (stub)
    digital-nomad/page.tsx        # Digital nomad hub (stub)
  layout.tsx            # Root layout — header (CountrySwitcher + Resources nav link), footer
  page.tsx              # Redirects to /philippines
  robots.ts             # robots.txt (metadata export)
  sitemap.ts            # sitemap.xml (metadata export)
  globals.css           # Tailwind CSS v4 global imports

components/
  TaxCalculator.tsx     # ORCHESTRATOR — owns all state, calls calculators
  SalaryForm.tsx        # Input: salary slider, monthly/annual toggle, expat toggle, currency selector
  ResultsPanel.tsx      # Output: breakdown table (gross, tax, contributions, net)
  BreakdownChart.tsx    # Donut chart showing tax vs contributions vs net (Recharts)
  ComparisonView.tsx    # Side-by-side comparison of all five countries at current salary
  CountrySwitcher.tsx   # Header navigation between countries
  TaxInfo.tsx           # Collapsible panel: tax brackets, rates, sources, expat rules
  ArticleBody.tsx       # 'use client' island — renders article sections with live inline currency conversion
  VisaTable.tsx         # 'use client' — filterable visa table (pill filters by category)
  CostComparisonTable.tsx  # 'use client' — country-as-columns cost table with group filters
  AdSenseLoader.tsx     # Google AdSense script loader
  ConsentBanner.tsx     # Cookie/consent banner

lib/
  types.ts              # All TypeScript interfaces (see below)
  countries.ts          # Country metadata (slug, currency, salary defaults/ranges)
  useExchangeRates.ts   # React hook — fetches USD base rates from open.er-api.com
  calculators/
    index.ts            # Routes calculate(country, params) to correct module
    philippines.ts      # TRAIN Law: 6 income brackets, SSS/PhilHealth/Pag-IBIG
    thailand.ts         # PIT: 8 brackets, SSF, standard 50% deduction (max ฿100k)
    vietnam.ts          # PIT: 7 monthly brackets, SI/HI/UI insurance
    indonesia.ts        # PPh 21: 5 brackets, PTKP threshold, BPJS contributions
    malaysia.ts         # PCB: 13 brackets, EPF/SOCSO/EIS contributions (YA 2024)
  resources/
    types.ts            # VisaEntry, VisaCategory, CountryCostData, CostCategory types
    visaData.ts         # VISA_DATA array + getVisaData(slug) lookup
    costData.ts         # COST_DATA array (USD amounts) + getCostData(slug) lookup

.github/workflows/deploy.yml  # CI/CD: push to main → npm ci → build → GitHub Pages
```

### Key TypeScript Types (`lib/types.ts`)

```typescript
interface ContributionItem { label: string; amount: number; color: string; }

interface TaxResult {
  grossAnnual: number; grossMonthly: number;
  netAnnual: number;   netMonthly: number;
  incomeTax: number;
  contributions: ContributionItem[];   // e.g. SSS, PhilHealth, Pag-IBIG
  totalDeductions: number;
  effectiveRate: number;               // percentage
  currency: string;                    // e.g. "PHP"
  currencySymbol: string;              // e.g. "₱"
}

interface CalculatorParams {
  grossSalary: number;   // in local currency, always monthly
  period: 'monthly' | 'annual';
  isExpat: boolean;
  dependents?: number;               // qualifying dependents (0–10); used by PH calculator
  maritalStatus?: 'single' | 'married';
}

interface Country {
  slug: string; name: string; flag: string;
  currency: string; currencySymbol: string;
  defaultSalary: number; salaryStep: number;
  salaryMin: number; salaryMax: number;
}
```

### Data Flow

1. User navigates to `/philippines` (or any country slug)
2. `app/[country]/page.tsx` passes the slug to `<TaxCalculator country="philippines" />`
3. `TaxCalculator` owns state: `{ grossSalary, period, isExpat, inputCurrency, dependents, maritalStatus }`
4. On any state change, it calls `calculate(country, params)` from `lib/calculators/index.ts`
5. `calculate()` delegates to the country-specific module and returns `TaxResult`
6. Results flow down as props to `ResultsPanel` and `BreakdownChart`
7. `useExchangeRates` hook provides exchange rates for currency conversion in `SalaryForm`

## Code Conventions

### TypeScript

- Strict mode is on — avoid `any`, use proper interfaces
- Path alias `@/` maps to repo root (e.g., `@/lib/types`, `@/components/SalaryForm`)
- All files are `.tsx` (components) or `.ts` (utilities/hooks)

### Naming

- Components: PascalCase files and function names (`TaxCalculator`, `SalaryForm`)
- Utilities/hooks: camelCase (`useExchangeRates`, `calculate`)
- Country slugs: lowercase (`philippines`, `thailand`, `vietnam`, `indonesia`)

### Styling

- Tailwind CSS v4 utility classes only — no custom CSS files except `globals.css`
- No `tailwind.config.js` — using framework defaults
- Dark mode: not implemented

### Calculator Modules Pattern

Each `lib/calculators/<country>.ts` exports a default function:

```typescript
export default function calculateCountry(params: CalculatorParams): TaxResult { ... }
```

- Receives `grossSalary` as the local currency amount (monthly)
- Returns a complete `TaxResult` — never returns `null`
- Expat flat rate shortcut: if `isExpat`, apply flat rate (PH: 25%, others: 20%)
- All bracket thresholds in **annual** amounts; convert monthly input at the start

## Non-Obvious Patterns

### URL state persistence
All calculator state is serialised into URL query params on every change (`salary`, `period`, `isExpat`, `currency`, `dependents`, `maritalStatus`). This powers the Share button (copies current URL) and allows deep-linking to a specific scenario. State is read from the URL on first mount in `TaxCalculator.tsx` via `parseUrlParams()`.

### Salary slider for foreign currencies
`SalaryForm.tsx` converts the local `salaryMin/Max` to the selected foreign currency using `exchangeRates.getRate` to compute `sliderMin/Max`. Falls back to `{ min: 500, max: 30000, step: 100 }` while rates load.

### Resource hub & expat guides
Expat guides live under `app/resources/guides/[slug]/` (canonical). The legacy `/blog/[slug]/` routes are kept live for SEO continuity but point to the same article data via `lib/articles/`. All article content is hardcoded TypeScript — no CMS. When adding a new country, add a guide page under `app/resources/guides/` and register it in `app/sitemap.ts`.

### Resource data files
Visa and cost-of-living data live in `lib/resources/visaData.ts` and `lib/resources/costData.ts` as typed arrays. To add or update data, edit the relevant array — no schema migration needed. Types are in `lib/resources/types.ts`.

### ArticleBody client island
`ArticleBody.tsx` is a `'use client'` component that renders article sections and provides a USD/EUR/GBP toggle with live inline currency conversion. It reads `localCurrency` / `localSymbol` props and uses `useExchangeRates()`. Pass empty strings for non-country articles (e.g. banking guide) to disable conversion.

## How to Add a New Country

1. **Add country metadata** in `lib/countries.ts`:
   ```typescript
   { slug: 'malaysia', name: 'Malaysia', flag: '🇲🇾', currency: 'MYR',
     currencySymbol: 'RM', defaultSalary: 8000, salaryStep: 500,
     salaryMin: 1000, salaryMax: 100000 }
   ```

2. **Create calculator** at `lib/calculators/malaysia.ts`:
   - Implement progressive tax brackets
   - Add mandatory contribution items
   - Handle `isExpat` case

3. **Register in router** `lib/calculators/index.ts`:
   ```typescript
   import malaysia from './malaysia';
   // add to switch/map: case 'malaysia': return malaysia(params);
   ```

4. **Add TaxInfo content** in `components/TaxInfo.tsx`:
   - Add brackets table, contribution rates, official sources, expat rules

5. **Create expat guide** at `app/resources/guides/[new-slug]/` (copy an existing one as a template). Register the slug in `lib/articles/index.ts` and `app/sitemap.ts`.

6. **Add visa data** in `lib/resources/visaData.ts` — add a new `CountryVisaData` entry to `VISA_DATA`.

7. **Add cost data** in `lib/resources/costData.ts` — add a new `CountryCostData` entry to `COST_DATA`.

8. **Update sitemap** `app/sitemap.ts` — add any new static routes.

9. **Verify:** `npm run build` must succeed with no TypeScript or lint errors.

## How to Update Tax Rates

All tax data is hardcoded in `lib/calculators/<country>.ts`. To update:

1. Find the relevant bracket array or constant in the file
2. Update the values with the new rates/thresholds
3. Update the corresponding display in `components/TaxInfo.tsx` (brackets table)
4. Update the year reference in comments and in the TaxInfo component
5. Run `npm run build` to confirm no errors

## Testing

There is **no automated test framework** in this project. Verify changes by:

1. `npm run lint` — must pass with zero errors
2. `npm run build` — must succeed (TypeScript type checking runs here)
3. `npm run dev` — manually test the calculator in the browser:
   - Test boundary values (salary at min, max, bracket thresholds)
   - Test monthly vs annual toggle
   - Test resident vs expat toggle
   - Test currency conversion (USD, EUR, GBP)
   - Test all five country pages

## Deployment

**Automatic:** Push to `main` triggers `.github/workflows/deploy.yml`:
1. `npm ci` — install exact locked dependencies
2. `npm run build` — static export to `/out`
3. Deploy `/out` to GitHub Pages

**Manual test build:**
```bash
npm run build
# Inspect /out directory for generated files
```

Never merge to `main` if `npm run build` fails.

## Critical Rules for AI Assistants

1. **No server-side code** — this is a static export. Never add `getServerSideProps`, API routes, server actions, or any Node.js-only code.
2. **No new dependencies without reason** — the bundle is intentionally small. Adding libraries needs clear justification.
3. **Tax data accuracy** — calculator logic in `lib/calculators/` must precisely follow official government rules. Cite sources when updating.
4. **TypeScript strict** — all types must be explicit. Never use `as any` or `// @ts-ignore`.
5. **Build must pass** — `npm run build` is the final gate. All changes must result in a clean build.
6. **Base path awareness** — internal links must use Next.js `<Link>` (not `<a>`). The base path `/seatax` is set in `next.config.ts` and applied automatically by the framework.
7. **No test framework** — do not add Jest/Vitest unless explicitly requested.
