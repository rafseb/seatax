---
name: add-country
description: Add a new Southeast Asian country to the SEA Tax Calculator following the standard 6-step process across all required files
---

Guide adding a new country to the SEA Tax Calculator. Ask for the country name if not provided.

**All six steps are required. Do not skip any.**

1. **`lib/countries.ts`** — add country metadata object:
   ```typescript
   { slug: '{slug}', name: '{Name}', flag: '{flag emoji}',
     currency: '{CODE}', currencySymbol: '{symbol}',
     defaultSalary: {n}, salaryStep: {n}, salaryMin: {n}, salaryMax: {n} }
   ```
   Choose `salaryMin/Max/defaultSalary` to reflect a realistic local salary range.

2. **`lib/calculators/{slug}.ts`** — create the calculator module:
   - Export a default function matching the `CalculatorParams → TaxResult` signature
   - Implement progressive income tax brackets (annual thresholds)
   - Add mandatory contribution items (social security, health, etc.) as `ContributionItem[]`
   - Handle `isExpat` with a flat rate (20% unless the country specifies otherwise)
   - Handle `dependents` and `maritalStatus` if they affect local tax (e.g. dependent allowances)
   - All bracket thresholds in **annual** amounts; convert monthly `grossSalary` at the start

3. **`lib/calculators/index.ts`** — register in the router:
   ```typescript
   import {slug} from './{slug}';
   // add: case '{slug}': return {slug}(params);
   ```

4. **`components/TaxInfo.tsx`** — add information panel:
   - Income tax brackets table with rates and thresholds
   - Mandatory contribution rates and caps
   - Link to official government tax authority source
   - Expat/non-resident rules

5. **`app/blog/[slug]/page.tsx`** — create expat guide page:
   - Follow the structure of an existing guide (e.g. `app/blog/working-in-the-philippines-as-an-expat/`)
   - Cover: tax overview, mandatory contributions, expat rules, practical tips

6. **`app/sitemap.ts`** — register the new country and blog slugs so they appear in the sitemap.

**After all edits:**
- Run `npm run lint` — must pass with zero errors
- Run `npm run build` — must succeed with no TypeScript errors
- Confirm the new country page loads at `/seatax/{slug}` in `npm run dev`
