# SEO Build Progress

Tracks execution of [PLAN.md](./PLAN.md). Newest entries at the bottom.

## Status board

| # | Item | Status |
|---|---|---|
| 1 | `/resources/working-in-southeast-asia` pillar hub | ✅ Done |
| 2 | `/resources/digital-nomad/tax-residency` | ✅ Done |
| 3 | Digital-nomad hub restructure + JSON-LD | ✅ Done |
| 4 | Freelancer + filing guides ×4 countries | ✅ Done |
| 5 | Singapore country add | ✅ Done |
| 6 | EOR / getting-paid-abroad / work-permits / internet | ✅ Done |

## Log

### 2026-08-07 — Architecture map produced

Audited all 17 existing routes, sitemap, article set, and JSON-LD coverage. Findings:

- **No page targets the phrase "working in southeast asia".** Five country-level
  `working-in-{c}-as-an-expat` guides exist with nothing consolidating them. Biggest
  structural gap on the site.
- **`/resources/digital-nomad` has no JSON-LD at all** and is a single flat page rather
  than a hub.
- **No tax-residency content anywhere** — the highest-info-gain nomad topic, and the one
  where the calculators are a genuine differentiator.
- **Freelancer/self-employed and annual-filing content exists only for Thailand.**
- **Singapore** is in the target audience but absent from the site.

Plan written to `docs/seo/PLAN.md`. Build order agreed; execution started at item 1.

### 2026-08-07 — Items 1–3 shipped

**1. `/resources/working-in-southeast-asia`** — new pillar page. Covers the visa vs
work-permit split, a four-row table of legal earning structures (local employment / EOR /
foreign contractor / own company) with tax and permit consequences, a per-country reality
check on remote work under tourist entries, and the residency day-count handoff. Cards to
all five country work guides. Schema: `CollectionPage` + `ItemList` + `FAQPage` +
breadcrumb. Linked from the resources hub card grid and the footer so it is not orphaned.

**2. `/resources/digital-nomad/tax-residency`** — the cluster's flagship. Day-count table
(TH 180 / MY 182 / VN + ID 183 rolling / PH intent-based), what each country actually taxes
(worldwide vs territorial vs remittance), the 2024 Thailand remittance change with an
explicit verify-before-acting callout, four debunked myths, and a six-step practical
sequence. Deep-links into every calculator pre-set to `?salary=5000&period=monthly&expat=true&currency=USD`
so each claim resolves to a live computed result — the one thing competitors cannot copy.
Schema: `Article` + `FAQPage` + breadcrumb.

**3. `/resources/digital-nomad`** — restructured from a flat page into a hub. Added a
six-card "Start Here" grid, a city-guide index pointing at the six existing city articles,
four FAQs, and the JSON-LD it previously had none of (`CollectionPage` + `ItemList` +
`FAQPage` + breadcrumb). Existing per-country sections retained.

Sitemap updated with both new routes under a new `PILLARS_UPDATED` date constant.
`npm run lint` and `npm run build` both clean.

### 2026-08-07 — Item 4 shipped: 8 new country guides

Extended the two Thailand-only article patterns to the other four countries, taking the
guide library from 13 to 21 articles.

**Freelancer playbooks** (`{country}-freelancer-self-employed-tax-playbook`) — Philippines,
Vietnam, Indonesia, Malaysia. Each covers registration, the country's specific tax
mechanism, the VAT/turnover threshold, contributions without an employer, and the filing
cycle. The genuinely differentiating content per country:

- **Philippines** — the 8% flat-on-gross vs graduated-plus-OSD election, and the fact that
  resident aliens are taxed on Philippine-source income only.
- **Vietnam** — business income is taxed on a *deemed rate applied to revenue* (≈5% VAT +
  2% PIT for services), not on profit. Worldwide income for residents, with the rolling
  12-month residency limb.
- **Indonesia** — the three-way choice between the 0.5% final MSME rate, deemed-profit
  norms, and ordinary self-assessment, all under the IDR 4.8bn ceiling.
- **Malaysia** — the foreign-source income exemption, with an explicit warning that "source"
  turns on where work is performed, which is where confident internet advice outruns the law.

**Annual filing & renewal guides** (`{country}-annual-tax-filing-visa-renewal-guide`) —
same four countries. Each pairs the tax calendar with the immigration calendar. High-value
specifics: Philippine substituted filing + the BI Annual Report every January–February;
Vietnam's employer vs self finalisation split and first-year refund; Indonesia's EFIN
in-person requirement and foreign-asset disclosure on the SPT; Malaysia's Form BE (30 April)
vs Form B (30 June) split and the tax clearance that lets your employer withhold final pay.

Volatile figures are hedged with explicit verify-before-acting language throughout —
Vietnam's revenue exemption floor, Indonesia's post-2025 VAT rate, Malaysia's service tax
scope. Articles auto-register in the sitemap and the guide index via `ARTICLES`.

### 2026-08-07 — Item 6 shipped: four cluster pages

- **`/resources/working-in-southeast-asia/work-permits`** — per-country structure (permit vs
  visa), constraints, document lists, renewal lead times; a section on what actually causes
  delays (legalisation, validity windows, sequential agencies) and the three routes available
  with no sponsoring employer.
- **`/resources/working-in-southeast-asia/employer-of-record`** — commercial intent.
  Contractor/EOR/entity comparison table, the misclassification signal checklist, total cost
  of employment (gross + employer contributions + fee, not just the fee), per-country
  constraints, and seven questions to ask a provider.
- **`/resources/working-in-southeast-asia/getting-paid-abroad`** — separates "what does moving
  money cost" from "does moving it create a tax event", which is only true in Thailand.
  Transfer route comparison, FX spread as the real cost, currency risk on foreign-denominated
  packages, and the documentation banks eventually demand.
- **`/resources/digital-nomad/internet-and-coworking`** — seven-city connectivity table
  (fixed broadband / mobile / power / coworking), the six-step setup that survives an outage,
  and coworking selection criteria.

All four wired into their parent hubs (new "In This Guide" grid on the pillar, new card on
the nomad hub) and the sitemap — now 68 URLs. `npm run lint` and `npm run build` clean;
JSON-LD verified present in the built HTML for every new page.

### 2026-08-07 — Incidental fix: legacy `/blog` OG images

`app/blog/[slug]/opengraph-image.tsx` generated params from `ARTICLES` while the page route
correctly used `LEGACY_BLOG_SLUGS`. That produced OG images for `/blog` URLs with no page —
16 orphan images after the 8 new articles, a pre-existing mismatch this work amplified. The
image route now mirrors the page route. **No duplicate-content pages ever existed**: only
the five legacy slugs render HTML, each canonicalised to `/resources/guides/`.

**Verification caveat:** the tax facts across the 8 new guides and 4 new pages were written
from model knowledge, not checked against live official sources. Volatile figures carry
explicit verify-before-acting language. A source-check pass against LHDN / BIR / DJP / GDT /
Thai Revenue Department is worth doing before these rank and start being relied on.

### 2026-08-07 — Item 5 shipped: Singapore added as the sixth country

User approved the add. Full country cluster now live at `/singapore`.

**Calculator** (`lib/calculators/singapore.ts`) — YA 2026 resident brackets, thirteen bands
from 0% on the first S$20,000 to 24% above S$1,000,000. Two things make Singapore genuinely
different from the other five and both are modelled explicitly:

- **CPF applies only to Citizens and PRs.** Foreigners on work passes contribute nothing, so
  an Employment Pass holder's gross *is* their pre-tax income. This narrows Singapore's
  apparent tax disadvantage against its neighbours considerably. The calculator models the
  resident case as a Citizen/PR paying CPF (20% employee share, S$8,000/month Ordinary Wage
  ceiling from 1 Jan 2026); `TaxInfo` and the country guide state plainly that a *foreign*
  tax resident should read the tax line and disregard the CPF line.
- **Non-residents pay the higher of a flat 15% or the resident rates** — not a plain flat
  rate like the other five. Implemented as `Math.max()` of the two.

Reliefs: earned income, spouse and child, capped at the S$80,000 aggregate. Territorial
system, no capital gains tax — both surfaced in the guide and FAQs.

**Everything else in the cluster:** `lib/taxData` reference panel with IRAS and CPF Board
sources · `SEO`/`FAQ`/`GUIDE` maps in `app/[country]/page.tsx` · accent colour `#d6323c` in
`globals.css` (plus the print selector list) · 9 visa entries including an explicit
"no digital nomad visa" row explaining that policy is moving the *other* way · cost data
(most expensive base in the region, but hawker food and transport stay cheap) · 8-section
relocation checklist · the `working-in-singapore-as-an-expat` guide covering the 183-day
rule, why expats keep full gross pay, AIS filing with no monthly withholding, and IR21 exit
clearance.

Sitemap 68 → 77: the country page, 5 new compare pairs (10 → 15), the guide, visa and
relocation pages. `CountrySlug` union in `lib/resources/types.ts` extended.

**Two gaps in the `add-country` skill surfaced during this work** and are now documented in
CLAUDE.md's expanded 13-step list: the skill omits both the `CountrySlug` union (fails
type-check) and the three per-country content maps in `app/[country]/page.tsx` (fails at
prerender with an opaque `Cannot read properties of undefined`). The skill also still
references the retired `app/blog/[slug]/` guide structure.

### 2026-08-07 — Documentation refresh

- **README.md** rewritten. It was badly stale: no Malaysia, no live URL, "coming soon" demo
  link, and no mention of the resource hub at all. Now covers all six countries, the full
  resource-hub route table, the 22-article guide library, and the real dev/verification
  commands.
- **CLAUDE.md** updated: six countries throughout, the new pillar and nomad routes plus
  `/compare` added to the directory tree, `singapore.ts` in the calculator list, Malaysia's
  stale "13 brackets, YA 2024" corrected to "10 brackets, YA 2026", and the add-a-country
  procedure expanded from 10 steps to 13 with the two build-breaking touch-points called out
  up front.

### 2026-08-07 — Post-Singapore prose sweep (the fix lint and build cannot make)

Adding a country to `COUNTRIES` makes every calculator and resource route appear
automatically — and leaves every hand-written sentence that *counts* the countries silently
false. `npm run lint` and `npm run build` both passed while the homepage still said five.

Swept and corrected across ~20 files:

- **`app/page.tsx`** — the worst of it. Title and description named five countries; there was
  no `singapore` key in `COUNTRY_BLURBS`, so Singapore's card rendered with an empty blurb;
  and three FAQ answers made false claims ("all five calculators", a lowest-tax answer that
  ignored Singapore's territorial/no-CGT profile, a non-resident answer that omitted the
  15%-or-resident rule). Those FAQs feed the `FAQPage` JSON-LD, so the errors were in
  structured data on the highest-priority page.
- **`app/layout.tsx`** — metadata title and description were stale even before this work,
  still listing only four countries. Fixed, and Malaysia + Singapore added to `keywords`.
- **Metadata descriptions** across `/compare`, `/resources`, banking, guides,
  health-insurance, relocation, cost-of-living and the OG image.
- **Semantic claims, not just counts** — e.g. Malaysia was described as "the only country
  that does not split visa and work permit" (Singapore also bundles), and "most expensive of
  the five" for cost of living (Singapore is now far and away the most expensive).

Beyond the corrections, Singapore was added as a full row/section to the per-country arrays
on **tax-residency** (day-count table + scope card), **work-permits** (COMPASS, bundled pass,
IR21), **getting-paid-abroad** (territorial, not a taxable event), **employer-of-record**
(no employer CPF for foreigners inverts the usual EOR cost comparison), the
**working-in-SEA pillar** (remote-work status + guide card) and the **digital-nomad hub**
(country section + comparison row). Leaving it out of those tables would have been a visible
content gap on exactly the pages meant to be comprehensive.

`.claude/skills/add-country/SKILL.md` rewritten: it listed 6 steps, omitted both
build-breaking touch-points, and still referenced the retired `app/blog/[slug]/` guide
structure. It now points at CLAUDE.md as authoritative, carries a 13-row quick-reference
table, and ends with the prose-sweep grep — the step that caused this whole section.

### 2026-08-07 — Verification pass caught a silent 404 bug

Ran the `verify-build` sequence. Lint and build were clean, but a route sweep found all five
new Singapore compare pages returning 404 — **while lint, build and the sitemap all reported
success**.

Cause: `CANONICAL_PAIR_SLUGS` derives from `COUNTRIES`, so adding Singapore automatically
created five new `/compare/*` routes and listed them in `sitemap.xml`. But `COMPARISONS` in
`lib/comparisons/index.ts` is a **hand-written** map, so `getComparison()` returned undefined
for every Singapore pair, `notFound()` fired, and the export happily wrote a 404 page to five
live, sitemap-advertised URLs. Nothing in the toolchain flags this.

Fixed by writing the five missing entries (indonesia/malaysia/philippines/thailand/vietnam vs
Singapore), each with an intro and four FAQs built around the genuine contrasts —
territorial vs worldwide taxation, no CPF for foreigners, and the absence of any nomad route.

This is a **third** gap in the add-country procedure, and the worst of the three because it
fails silently rather than breaking the build. CLAUDE.md is now a 14-step list with it called
out up front, and both CLAUDE.md and the skill carry the detection command:

```bash
grep -L "vs" out/compare/*/index.html   # any hit is a missing COMPARISONS entry
```

**Verification evidence:**

- `npm run lint` — clean.
- `npm run build` — clean; 77 sitemap URLs, 15 compare pages, 22 guides.
- Numeric calculator harness across all six countries × {min, mid, max} × {resident,
  non-resident}: net positive and ≤ gross, monthly/annual toggle agreement, deduction totals
  reconciling against contribution line items, monotonicity in gross, no contributions in
  non-resident mode, unknown slug returning null. Plus hand-computed Singapore cases —
  resident tax on S$6,000/mo = S$1,712, CPF = S$14,400, non-resident = S$10,800 (the 15%
  floor binding over progressive), CPF ceiling capping at S$19,200 on S$20,000/mo, and the
  resident rates correctly overtaking the 15% floor at high income. All green.
- 30-route HTTP sweep against the dev server — all 200.
- Whole-export scan for pages that rendered as not-found — only the genuine `/404` and
  `/_not-found`.

Still outstanding: the manual in-browser interaction checks (slider drag, currency switching,
chart rendering) and the source-verification of tax figures.

**All six build-order items are complete.** Nothing is blocked.
