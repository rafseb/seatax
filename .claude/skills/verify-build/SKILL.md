---
name: verify-build
description: Run the full pre-push verification checklist for SEA Tax Calculator — lint, build, automated route and calculator checks, then guided browser tests
---

Run the full verification sequence before pushing to main.

## 1. Automated gates

1. `npm run lint` — must exit with zero errors. Report any failures.
2. `npm run build` — must succeed with no TypeScript errors. Report any failures.

## 2. Automated checks the gates do not cover

Lint and build pass on several classes of real breakage. Run these too.

**Silently 404ing compare pages.** Compare-pair slugs generate from `COUNTRIES`, but
`COMPARISONS` in `lib/comparisons/index.ts` is hand-written. A missing entry exports a 404
page to a live, sitemap-listed URL without any error:

```bash
grep -L "vs" out/compare/*/index.html   # any hit is a missing COMPARISONS entry
```

**Any page that exported as not-found:**

```bash
grep -rl "<title>SEA Tax Calculator — " out --include=index.html
# expect only out/404/ and out/_not-found/
```

**Export shape** — confirm the counts match expectations after any content change:

```bash
grep -c '<url>' out/sitemap.xml            # sitemap entries
ls -d out/compare/*/ | wc -l               # N*(N-1)/2 for N countries
ls -d out/resources/guides/*/ | wc -l      # one per ARTICLES entry
ls out/blog/*/index.html | wc -l           # must stay 5 — LEGACY_BLOG_SLUGS is frozen
```

**Calculator arithmetic.** Transpile and assert directly rather than eyeballing the UI:

```bash
npx tsc lib/calculators/*.ts --outDir /tmp/chk --module commonjs --target es2020 --skipLibCheck
```

Then for each country × {min, mid, max salary} × {resident, non-resident}, assert: net is
positive and ≤ gross; `netMonthly * 12 === netAnnual`; `totalDeductions` equals income tax
plus the contribution line items; the monthly and annual period toggles agree; net rises with
gross; non-resident mode returns no contributions; and an unknown slug returns `null`. Add
hand-computed expected values for any country with non-standard rules (e.g. Singapore's
CPF ceiling and its "higher of 15% or resident rates" non-resident treatment).

**Route sweep** — start `npm run dev` and check every route returns 200. Note the dev server
serves **without** the `/seatax` basePath (`next.config.ts` applies it only in production).

## 3. Manual browser checks

Prompt the user to verify in the browser and confirm each item:

- [ ] Salary at minimum, maximum, and a mid-range value — results update correctly
- [ ] Monthly ↔ annual toggle — gross/net figures scale correctly
- [ ] Resident ↔ expat toggle — tax changes
- [ ] Switch input currency to USD, EUR, GBP — slider appears and dragging updates results
- [ ] Switch back to local currency — original slider range restored
- [ ] Donut chart renders and segments match the results table
- [ ] Share button copies a URL that restores the same scenario when reopened
- [ ] All six country pages load and calculate (Philippines, Thailand, Vietnam, Indonesia,
      Malaysia, Singapore), each showing its own accent colour

## 4. Sign-off

Ask the user to confirm the browser checks. Only declare the build verified once every
automated and manual step passes.
