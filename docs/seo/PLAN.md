# SEO Content & Architecture Plan

**Created:** 2026-08-07
**Goal:** Rank for three keyword clusters — *tax calculator*, *digital nomad*, *working in southeast asia*.

## Standing constraints

1. **Head terms are not winnable from `rafseb.github.io/seatax`.** Every page targets a
   *modified* term ("thailand tax calculator 2026", "digital nomad visa indonesia").
   Custom-domain migration is the prerequisite for bare head terms.
2. **No URL migrations.** The 2026-07-17 SEO overhaul is live and legacy `/blog/*` routes
   are retained for continuity. Only add; never move.
3. **No invented search metrics.** Decisions are justified by search intent, content gaps,
   and site structure — never by fabricated volume or difficulty numbers.
4. **Static export only.** No server code; all schema is inlined JSON-LD at build time.

## Pillar map

### Pillar 1 — Tax Calculator (transactional)

| URL | Primary keyword | Status |
|---|---|---|
| `/` | southeast asia tax calculator | EXISTS |
| `/{country}` ×5 | "thailand tax calculator 2026" | EXISTS |
| `/compare`, `/compare/{pair}` | "thailand vs vietnam tax" | EXISTS |
| freelancer guides ×4 | "freelance tax vietnam" | **NEW** (TH only today) |
| annual filing guides ×4 | "philippines tax filing deadline" | **NEW** (TH only today) |
| `/singapore` | "singapore tax calculator" | **DONE** (added 2026-08-07) |

### Pillar 2 — Digital Nomad (informational)

| URL | Primary keyword | Status |
|---|---|---|
| `/resources/digital-nomad` | digital nomad southeast asia | **ENHANCE → hub** (no JSON-LD today) |
| `/resources/digital-nomad/tax-residency` | digital nomad tax residency southeast asia | **NEW — top priority** |
| `/resources/digital-nomad/internet-and-coworking` | best internet for remote work bali | **NEW** |
| `/resources/visas/{country}` ×5 | "digital nomad visa thailand" | EXISTS |
| `/resources/guides/living-in-{city}` ×6 | "living in chiang mai as a digital nomad" | EXISTS |
| `/resources/cost-of-living` | cost of living southeast asia comparison | EXISTS |

### Pillar 3 — Working in Southeast Asia (informational / commercial)

| URL | Primary keyword | Status |
|---|---|---|
| `/resources/working-in-southeast-asia` | **working in southeast asia** | **NEW — pillar, biggest gap** |
| `/resources/guides/working-in-{c}-as-an-expat` ×5 | "working in thailand as a foreigner" | EXISTS |
| `.../work-permits` | work permit thailand requirements | **NEW** |
| `.../employer-of-record` | employer of record southeast asia | **NEW** (commercial) |
| `.../getting-paid-abroad` | getting paid in usd while living in thailand | **NEW** |
| `/resources/relocation/{country}` ×5 | "moving to vietnam checklist" | EXISTS |

## Cross-cutting rules

Every page carries three link types:

1. **Up** to its pillar hub (breadcrumb via `breadcrumbList()` in `lib/seo.ts`).
2. **Across** to a sibling page.
3. **Down to the calculator** with semantic anchor text — never "click here".
   Use *"see your take-home pay in Thailand"*, *"compare Vietnam and Indonesia net salary"*.

**Unique asset:** the calculator serialises full state to URL params. Articles link to
*pre-configured scenarios* (`/thailand?salary=…&isExpat=true&currency=USD`) so every claim
resolves to a live computed result. No competitor can do this.

**Schema:** reuse existing patterns — `SoftwareApplication` + `FAQPage` on calculators,
`Article` + `FAQPage` on guides, `breadcrumbList()` everywhere. New hubs get
`CollectionPage` + `ItemList`. Relocation checklists should upgrade to `HowTo`.

## Build order

1. `/resources/working-in-southeast-asia` pillar — closes the pillar-3 gap.
2. `/resources/digital-nomad/tax-residency` — highest info-gain, uniquely ours.
3. Digital-nomad hub restructure + JSON-LD.
4. Freelancer + filing guides for the four non-Thailand countries.
5. Singapore country add — **done**.
6. EOR, getting-paid-abroad, work-permits, internet-and-coworking — **done**.

All six items shipped on 2026-08-07. See [PROGRESS.md](./PROGRESS.md).

## Next up (not yet started)

1. **Source-verify the new content.** The 12 new pages and 9 new guides were written from
   model knowledge, not checked against live official sources. Volatile figures carry
   verify-before-acting language, but a pass against IRAS / LHDN / BIR / DJP / GDT / the Thai
   Revenue Department is worth doing before this content ranks and starts being relied on.
2. **Custom domain migration** — the prerequisite for competing on head terms.
3. **Singapore cluster depth** — a freelancer playbook and an annual filing guide, matching
   the other five countries.
4. **Calculator UX** — result above the fold on mobile, sticky net-pay bar, and a
   cost-of-living CTA under the result to close the calculator→content loop.

## Definition of done per page

- `npm run lint` clean, `npm run build` succeeds.
- Registered in `app/sitemap.ts`.
- Breadcrumb JSON-LD + page-type JSON-LD present.
- At least one semantic anchor into a calculator and one into a sibling.
- Linked *from* at least one existing page (no orphans).
