# SEA Tax Calculator

A net salary calculator for Southeast Asian countries. Enter your gross salary and instantly see income tax, mandatory contributions, and take-home pay — with a visual breakdown.

**Live demo:** _coming soon_

## Countries Supported

| Country | Currency | Tax System |
|---------|----------|------------|
| Philippines | PHP (₱) | TRAIN Law (RA 10963) + SSS/PhilHealth/Pag-IBIG |
| Thailand | THB (฿) | Progressive PIT + SSF |
| Vietnam | VND (₫) | Progressive PIT + SI/HI/UI |
| Indonesia | IDR (Rp) | PPh 21 + BPJS |

## Features

- Monthly or annual salary input
- Multi-currency input — enter in USD, EUR, or GBP and convert to local currency using live exchange rates
- Resident and expat/non-resident modes with different tax treatments
- Visual donut chart breakdown of take-home vs. deductions
- Expandable tax rate reference panel per country

## Tax Data (2024/2025)

### Philippines
- Income tax: TRAIN Law brackets (0%–35%)
- SSS: 5% employee, capped at Php 35,000/month MSC (2025)
- PhilHealth: 2.5% employee, min Php 500, max Php 2,500/month
- Pag-IBIG: 2% employee, max Php 200/month
- Expats: flat 25% on gross Philippine-sourced income

### Thailand
- Income tax: progressive brackets (0%–35%) on taxable income after deductions
- Social Security (SSF): 5% employee, capped at Php 750/month (Php 15,000 salary cap)
- Deductions: 50% standard deduction (max Php 100,000) + Php 60,000 personal allowance
- Expats: same progressive rates, no SSF/deductions

### Vietnam
- Income tax: monthly progressive brackets (5%–35%) after deductions
- Social Insurance (SI): 8%, capped at VND 36,000,000/month
- Health Insurance (HI): 1.5%, capped at VND 36,000,000/month
- Unemployment Insurance (UI): 1%, capped at VND 36,000,000/month
- Personal deduction: VND 11,000,000/month
- Expats: flat 20% on Vietnam-sourced income

### Indonesia
- Income tax: PPh 21 brackets (5%–35%) on annual taxable income
- PTKP (non-taxable threshold): Rp 54,000,000/year (single)
- BPJS Kesehatan: 1%, capped at Rp 12,000,000/month
- BPJS JHT (Old-Age): 2%, no cap
- BPJS JP (Pension): 1%, capped at Rp 10,547,400/month (2025)
- Expats: flat 20% withholding, no BPJS/PTKP

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Recharts](https://recharts.org) — pie/donut chart
- [Exchange Rate API](https://www.exchangerate-api.com) — live currency conversion

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Disclaimer

This tool is for illustrative purposes only. Tax rules are complex and change frequently. Always consult a qualified tax professional before making financial decisions. Rates reflect 2024/2025 regulations to the best of our knowledge.
