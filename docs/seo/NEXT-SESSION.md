# Next Session — Backlog

Carried forward from the 2026-08-07 session. All six items in [PLAN.md](./PLAN.md)'s build
order are complete; see [PROGRESS.md](./PROGRESS.md) for what shipped and why.

**Branch:** `seo/pillars-and-singapore` — 4 commits, pushed, **not merged to `main`**.
Merging to `main` triggers `.github/workflows/deploy.yml` and publishes to GitHub Pages.

---

## P0 — Blocking the merge

### 1. Manual browser QA
The only verification step never completed. Everything else was checked programmatically.

Run `npm run dev` (serves at `http://localhost:3000` — **no `/seatax` prefix**, basePath is
production-only), then work the checklist in `.claude/skills/verify-build/SKILL.md`:

- Slider at min / max / mid on each country
- Monthly ↔ annual toggle
- Resident ↔ expat toggle
- Currency switch to USD / EUR / GBP and back — slider range restores
- Donut chart matches the results table
- Share button round-trips the scenario
- All six country pages, each with its own accent colour

**Prioritise `/singapore`** — its CPF-for-Citizens/PRs-only modelling is the one piece of
calculator logic that does not follow the existing pattern.

### 2. Merge and deploy
```bash
git checkout main && git merge seo/pillars-and-singapore && git push
```
Then confirm the Actions run goes green and spot-check the live URLs, especially the five new
`/compare/*-vs-singapore` pages.

---

## P1 — Accuracy follow-ups

### 3. Verify the procedural detail in the 9 new guides
The rates and thresholds are verified (see PROGRESS.md). **Not yet checked:** form numbers,
filing deadlines, registration steps, and visa document lists across the freelancer playbooks
and annual filing guides. These are the claims a reader is most likely to act on directly.

Highest-risk items to check first:
- Philippines: Form 1701Q / 1701A / 1701 usage and the quarterly deadlines; whether the
  annual registration fee still applies; the current percentage tax rate
- Vietnam: the employer vs self finalisation deadlines (stated as end of month 3 / month 4)
- Indonesia: EFIN in-person requirement; NPWP/NIK consolidation status
- Malaysia: service tax scope and the RM500,000 threshold by category; CP500 revision cut-off
- Thailand: PND.94 / PND.90 deadlines

### 4. Confirm the 2026 BPJS JP ceiling
Three figures circulate (10,977,600 / 11,074,800 / our 11,086,300 in
`lib/calculators/indonesia.ts`). Impact is under IDR 1,100/month. Confirm against the BPJS
Ketenagakerjaan circular and remove the caveat comment.

### 5. Nail down Vietnam's PIT effective date
Sources differ: the amended PIT Law is widely reported as in force 1 July 2026, with salary
and business-income provisions applying from 1 January 2026. The calculator uses the new
schedule for the whole 2026 tax year. Confirm this is right for employment income, and if the
answer is nuanced, say so in the Vietnam guide rather than leaving it implicit.

---

## P2 — Content depth

### 6. Complete the Singapore cluster
Every other country has three guides; Singapore has one. Add:
- `singapore-freelancer-self-employed-tax-playbook` — sole proprietorship vs Pte Ltd, the
  S$1M GST registration threshold, no CPF for foreigners, EntrePass constraints
- `singapore-annual-tax-filing-visa-renewal-guide` — AIS, no monthly withholding, the 15/18
  April deadline, IR21 tax clearance, EP renewal and COMPASS
- Optionally a `living-in-singapore-as-an-expat` city guide, to match the six existing ones

### 7. Da Nang city guide
`/resources/digital-nomad/internet-and-coworking` lists Da Nang as a major hub but there is no
guide to link to — currently the only row in that table without a "Full city guide" link.

### 8. Commercial-intent expansion
The EOR page is the only monetizable asset. Natural siblings: international health insurance
comparison, and a "paying international contractors" counterpart to getting-paid-abroad.

---

## P3 — Technical SEO and UX

### 9. Remaining schema work
- `CollectionPage` + `ItemList` on `/resources` and `/resources/guides` (the two hubs that
  still lack it — the nomad hub and the working-in pillar now have it)
- Upgrade `/resources/relocation/[country]` to `HowTo`
- Add `Organization` to `app/layout.tsx` alongside the existing `WebSite`

### 10. Calculator UX — the bounce-rate levers
From the original architecture review, none of it done yet:
- Result must render **before any scroll on mobile**; the form currently sits above the number
- Sticky net-pay bar on scroll
- "Copy result" alongside Share
- A CTA under the result closing the calculator → content loop:
  *"Can you live on this? → cost of living in Bangkok"*

### 11. Use the deep-link asset far more widely
`/resources/digital-nomad/tax-residency` links to pre-configured calculator scenarios
(`?salary=…&period=monthly&expat=true&currency=USD`). Nothing else does. This is the site's
one genuinely uncopyable feature — every guide making a numeric claim should resolve it to a
live computed result. `ArticleBody` sections are plain text today, so this needs either inline
link support or a small scenario-link component.

### 12. Model foreign tax residents in Singapore properly
`CalculatorParams` has only `isExpat`, so the Singapore calculator models residents as
Citizens/PRs paying CPF. A foreigner who is tax resident pays resident rates but **no CPF** —
currently handled with an explanatory note in `TaxInfo` and the guide telling the user to
disregard the CPF line. A third state (resident / foreign resident / non-resident) would model
this correctly. Check whether any other country needs the same distinction before changing the
shared type.

---

## P4 — Strategic

### 13. Custom domain migration
The prerequisite for competing on head terms — "tax calculator", "digital nomad" are not
winnable from a `github.io` subpath. Everything built so far targets modified terms
deliberately. Blocked on the domain purchase noted in memory.

### 14. Re-run the prose sweep whenever a country is added
`npm run lint` and `npm run build` both pass while copy that counts the countries goes stale.
The procedure is now 14 steps in CLAUDE.md with the sweep as the final step — follow it.
