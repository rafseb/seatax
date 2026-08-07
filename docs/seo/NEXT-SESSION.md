# Next Session — Backlog

Carried forward from the 2026-08-07 session. All six items in [PLAN.md](./PLAN.md)'s build
order are complete; see [PROGRESS.md](./PROGRESS.md) for what shipped and why.

**Status:** `seo/pillars-and-singapore` was fast-forward merged to `main` (`33b7d22 → fc64802`)
and deployed on 2026-08-07. Live export verified: 77 sitemap URLs, 15 compare pairs (all five
`*-vs-singapore` pages serving real content, not silent 404s), 22 guides, 5 frozen legacy blog
routes. Lint, build, route sweep and calculator assertions all passed.

**P0 is done.** P1 below is the active section.

> Note: a docs-only commit to `main` still triggers a full Pages redeploy of an identical site.
> That is harmless — don't work around it.

---

## P0.5 — Search Console (user action, blocks nothing else)

### 0. Submit the sitemap in Google Search Console
The site has been live since 2026-03-06 but there is no evidence it is being discovered.

**Finding:** crawlers read `robots.txt` from the **origin root only**. `https://rafseb.github.io/robots.txt`
returns **404** — there is no user-level Pages site, only the project site at `/seatax/`. The
generated `robots.txt` at `/seatax/robots.txt` (200, with the `Sitemap:` directive) is therefore
**never read by any crawler**. A 404 at the root means *allow all*, so this is a **sitemap
discovery gap, not a crawl block** — nothing is being blocked, but nothing is being advertised
either.

This cannot be fixed from this repo; it would need a separate `rafseb/rafseb.github.io` repo,
which is not worth it. Fix it in Search Console instead:

1. Add a **URL-prefix** property for `https://rafseb.github.io/seatax/`
2. Verify via the HTML-file method (drop the file in `public/`, redeploy) — the meta-tag method
   works too, via `app/layout.tsx`
3. Submit `https://rafseb.github.io/seatax/sitemap.xml` under Sitemaps
4. Use URL Inspection on `/` and `/singapore/` to request indexing directly

GSC is also the **only** ground truth on current index coverage — a `site:` query from a
scripted search tool is not real Google and proves nothing either way.

**Do not expect this to produce rankings for head terms** — see P4 item 13. Indexing and
ranking are separate problems; this fixes the first only.

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
