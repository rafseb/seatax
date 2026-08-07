# SEA Tax Calculator

A net salary calculator and expat resource hub for Southeast Asia. Enter your gross salary and instantly see income tax, mandatory contributions, and take-home pay — with a visual breakdown, live currency conversion, and side-by-side country comparison.

**Live:** https://rafseb.github.io/seatax/

Fully static Next.js 16 app — no backend, no database, no API routes. Deployed to GitHub Pages on push to `main`.

## Countries Supported

| Country | Currency | Tax System |
|---------|----------|------------|
| Philippines | PHP (₱) | TRAIN Law (RA 10963) + SSS / PhilHealth / Pag-IBIG |
| Thailand | THB (฿) | Progressive PIT + SSF |
| Vietnam | VND (₫) | Progressive PIT + SI / HI / UI |
| Indonesia | IDR (Rp) | PPh 21 + BPJS |
| Malaysia | MYR (RM) | Progressive PCB + EPF / SOCSO / EIS |
| Singapore | SGD (S$) | Progressive resident rates + CPF (Citizens/PRs only) |

## Features

- Monthly or annual salary input
- Multi-currency input — enter in USD, EUR or GBP and convert to local currency at live rates
- Resident and expat/non-resident modes with the correct treatment per country
- Dependants and marital status where they affect local reliefs
- Visual donut chart breakdown of take-home vs deductions
- Expandable tax rate reference panel per country, with links to official sources
- Side-by-side comparison of any two countries (`/compare/{a}-vs-{b}`) plus an all-country view
- Full URL state persistence — every scenario is a shareable deep link

## Resource Hub

Beyond the calculators, the site publishes a structured content library at `/resources`:

| Section | Route | What it covers |
|---|---|---|
| Working in Southeast Asia | `/resources/working-in-southeast-asia` | Pillar guide: visa vs work permit, the four legal ways to get paid, remote work status by country |
| — Work permits | `.../work-permits` | Per-country documents, timelines, quotas, renewal lead times |
| — Employer of Record | `.../employer-of-record` | EOR vs entity vs contractor, misclassification risk, total cost of employment |
| — Getting paid from abroad | `.../getting-paid-abroad` | FX spreads, when remittance triggers tax, transfer routes, documentation |
| Digital Nomad hub | `/resources/digital-nomad` | Visa options, connectivity and cost by country |
| — Tax residency | `.../tax-residency` | Day-count tests, worldwide vs territorial vs remittance taxation |
| — Internet & coworking | `.../internet-and-coworking` | City-by-city connectivity, SIMs, power reliability, coworking |
| Guides | `/resources/guides` | 22 long-form articles (see below) |
| Visas | `/resources/visas/{country}` | Filterable visa tables per country |
| Cost of living | `/resources/cost-of-living` | Country-as-columns comparison in USD |
| Relocation | `/resources/relocation/{country}` | Step-by-step checklists per country |
| Banking · Health insurance | `/resources/banking`, `/resources/health-insurance` | Account opening, coverage requirements |

**Guide library (22 articles):** a country tax guide, a freelancer/self-employed playbook and an annual filing & visa renewal guide for each of the five original countries, plus a Singapore tax guide and six city guides (Bangkok, Chiang Mai, Bali, Ho Chi Minh City, Kuala Lumpur, Metro Manila).

Legacy `/blog/{slug}` URLs are retained for the five original guides for SEO continuity, canonicalised to `/resources/guides/`.

## Tax Data (2026)

### Philippines
- Income tax: TRAIN Law brackets (0%–35%)
- SSS: 5% employee, capped at ₱35,000/month MSC
- PhilHealth: 2.5% employee, min ₱500, max ₱2,500/month
- Pag-IBIG: 2% employee, max ₱200/month
- Non-residents: flat 25% on gross Philippine-sourced income

### Thailand
- Income tax: progressive brackets (0%–35%) on taxable income after deductions
- Social Security (SSF): 5% employee, capped at ฿750/month
- Deductions: 50% standard deduction (max ฿100,000) + ฿60,000 personal allowance
- Non-residents: same progressive rates, no SSF and no deductions

### Vietnam
- Income tax: monthly progressive brackets after deductions (amended PIT law, five brackets)
- Social Insurance 8% · Health Insurance 1.5% · Unemployment Insurance 1%
- Personal deduction: ₫15,500,000/month
- Non-residents: flat 20% on Vietnam-sourced income

### Indonesia
- Income tax: PPh 21 brackets (5%–35%) on annual taxable income
- PTKP non-taxable threshold applied before brackets
- BPJS Kesehatan 1% · BPJS JHT 2% · BPJS JP 1% (each with its own ceiling)
- Non-residents: flat 20% withholding, no BPJS and no PTKP

### Malaysia
- Income tax: YA 2026 progressive brackets (0%–30%)
- EPF: 11% employee, no ceiling
- SOCSO 0.5% · EIS 0.2%, both capped at RM6,000/month
- Reliefs: personal RM9,000, EPF up to RM4,000, plus spouse and child reliefs
- Non-residents: flat 30%, no reliefs

### Singapore
- Income tax: resident progressive brackets, 0% on the first S$20,000 rising to 24% above S$1,000,000
- CPF: 20% employee share (age 55 and below) on Ordinary Wages up to the S$8,000/month ceiling (from 1 Jan 2026)
- **CPF applies to Citizens and PRs only** — foreigners on work passes contribute nothing
- Reliefs: earned income, spouse and child, capped at S$80,000 in aggregate
- Non-residents: the higher of a flat 15% or the resident rates, with no reliefs
- Territorial system: foreign-source income generally untaxed; no capital gains tax

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router, static export)
- React 19 · TypeScript 5 (strict)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Recharts](https://recharts.org) — donut chart
- [Exchange Rate API](https://www.exchangerate-api.com) — live currency conversion

## Local Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # ESLint — must pass clean
npm run build    # static export to /out — the deploy gate
```

There is no automated test framework. `npm run lint` and `npm run build` (which runs TypeScript checking) are the gates, followed by manual browser verification. See `CLAUDE.md` for the full contributor guide and `docs/seo/` for the content and SEO roadmap.

## Disclaimer

This tool is for illustrative purposes only. Tax rules are complex and change frequently, and the figures here have not been individually verified against live official sources. Always consult a qualified tax professional before making financial decisions. Rates reflect 2026 regulations to the best of our knowledge.
