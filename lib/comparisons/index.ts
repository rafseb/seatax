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
      "Indonesia and Malaysia are two of Southeast Asia’s most popular expat bases, and the choice between them often comes down to tax treatment, cost of living, and how easy it is to get a long-stay visa. Whether you’re weighing Malaysia vs Indonesia for a job offer or a remote-work move, this page compares income tax, take-home pay, monthly costs, and visa routes side by side for 2026.",
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
      "Indonesia and the Philippines both draw expats with low costs and large English- or service-friendly cities, but their tax systems differ sharply. Whether you’re comparing the Philippines vs Indonesia for an employer relocation or a remote move, this page lines up income tax, net pay, living costs, and visas for 2026.",
    faqs: [
      {
        q: 'Which has lower income tax, Indonesia or the Philippines?',
        a: "The Philippines (TRAIN Law) is tax-free up to ₱250,000/year and then runs 15%–35%; Indonesia (PPh 21) starts at 5% above the Rp54,000,000 PTKP and runs to 35%. At lower-to-mid salaries the Philippines’ large zero-rate band is often favourable — confirm at your salary with the calculator above.",
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
      "Indonesia and Thailand are perennial favourites for expats and nomads in the region. Whether you’re weighing Thailand vs Indonesia for tax efficiency or lifestyle, this page compares income tax, take-home pay, monthly costs, and visa options side by side for 2026.",
    faqs: [
      {
        q: 'Which has lower income tax, Indonesia or Thailand?',
        a: "Thailand’s effective tax-free threshold is high once the 50% standard deduction (max ฿100,000) and ฿60,000 allowance are applied — many earning under ~฿310,000/year pay no tax. Indonesia starts at 5% above the Rp54,000,000 PTKP. Both cap at 35%; compare at your salary using the calculator above.",
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
        a: 'Indonesia offers the E33G digital-nomad visa, while Thailand offers a dedicated long-stay visa for remote workers. Both have dedicated routes — see the visa snapshot below for stay length and income requirements.',
      },
    ],
  },
  'indonesia-vs-vietnam': {
    intro:
      "Indonesia and Vietnam are fast-growing bases for expats and remote workers. Whether you’re comparing Vietnam vs Indonesia for a posting or a nomad stint, this page sets income tax, net pay, living costs, and visa routes side by side for 2026.",
    faqs: [
      {
        q: 'Which has lower income tax, Indonesia or Vietnam?',
        a: "Vietnam taxes residents on monthly progressive brackets (5%–35%) after a ₫11,000,000 personal deduction; Indonesia uses annual brackets (5%–35%) above the Rp54,000,000 PTKP. Vietnam’s combined 10.5% employee insurance also reduces take-home. Compare at your salary with the calculator above.",
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
      "Malaysia and the Philippines both offer English-friendly environments and established expat communities. Whether you’re weighing the Philippines vs Malaysia for an employer move or remote work, this page compares income tax, net pay, monthly costs, and visa options for 2026.",
    faqs: [
      {
        q: 'Which has lower income tax, Malaysia or the Philippines?',
        a: "The Philippines is tax-free to ₱250,000/year then 15%–35%; Malaysia is tax-free to RM5,000 then 1%–30% with RM9,000 personal relief plus EPF relief. Malaysia’s lower entry brackets often favour mid earners, but it depends on your salary — check with the calculator above.",
      },
      {
        q: 'Is the Philippines or Malaysia cheaper to live in?',
        a: 'Malaysia (Kuala Lumpur) and the Philippines (Manila) are close on the monthly basket; Malaysia often offers better value housing and transport for the price. See the cost-of-living table below.',
      },
      {
        q: 'What are the mandatory contributions in each country?',
        a: "Malaysia deducts EPF (11%, no salary ceiling, partly tax-deductible), SOCSO (0.5%) and EIS (0.2%). The Philippines deducts SSS (5%), PhilHealth (2.5%) and Pag-IBIG (2%). Malaysia’s EPF is fully refundable when you leave permanently.",
      },
      {
        q: 'Is Malaysia or the Philippines better for digital nomads?',
        a: 'Malaysia offers the DE Rantau Nomad Pass for remote workers; the Philippines mainly relies on tourist-visa extensions. The visa snapshot and verdict strip below show the current options.',
      },
    ],
  },
  'malaysia-vs-thailand': {
    intro:
      "Malaysia and Thailand are top-tier expat hubs with strong infrastructure and international communities. Whether you’re comparing Thailand vs Malaysia for tax, lifestyle, or visa access, this page lines up income tax, take-home pay, costs, and visas for 2026.",
    faqs: [
      {
        q: 'Which has lower income tax, Malaysia or Thailand?',
        a: "Thailand’s 50% standard deduction (max ฿100,000) plus ฿60,000 allowance create a high effective tax-free threshold; Malaysia offers RM9,000 personal relief plus EPF relief and tops out at 30% versus Thailand’s 35%. The lower-earning country at your salary is best confirmed with the calculator above.",
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
        a: "Both have dedicated routes: Malaysia’s DE Rantau Nomad Pass and Thailand’s long-stay remote-worker visa. The visa snapshot below compares stay length and income requirements.",
      },
    ],
  },
  'malaysia-vs-vietnam': {
    intro:
      "Malaysia and Vietnam appeal to different expat priorities — polished infrastructure versus low cost and fast growth. Whether you’re weighing Vietnam vs Malaysia for a job or remote work, this page compares income tax, net pay, living costs, and visa routes for 2026.",
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
      "The Philippines and Thailand are two of the most searched-for expat destinations in Southeast Asia. Whether you’re comparing Thailand vs the Philippines for tax efficiency, cost of living, or visa access, this page sets income tax, take-home pay, costs, and visas side by side for 2026.",
    faqs: [
      {
        q: 'Which has lower income tax, the Philippines or Thailand?',
        a: "The Philippines is tax-free to ₱250,000/year; Thailand’s 50% deduction (max ฿100,000) plus ฿60,000 allowance push its effective tax-free threshold to roughly ฿310,000/year. Both top out at 35%. The better option depends on your salary — use the calculator above.",
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
        a: 'Thailand offers a dedicated long-stay visa for remote workers; the Philippines mostly relies on tourist-visa extensions. The visa snapshot and verdict strip below show the difference.',
      },
    ],
  },
  'philippines-vs-vietnam': {
    intro:
      "The Philippines and Vietnam both combine low costs with growing economies, but their tax and contribution systems are very different. Whether you’re weighing Vietnam vs the Philippines for an employer move or remote work, this page compares income tax, net pay, costs, and visas for 2026.",
    faqs: [
      {
        q: 'Which has lower income tax, the Philippines or Vietnam?',
        a: "The Philippines is tax-free to ₱250,000/year then 15%–35%; Vietnam applies monthly brackets (5%–35%) after a ₫11,000,000 deduction plus 10.5% insurance. The Philippines’ zero-rate band often helps lower earners — confirm at your salary with the calculator above.",
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
      "Thailand and Vietnam are neighbouring heavyweights for expats and digital nomads, with very different tax structures. Whether you’re comparing Vietnam vs Thailand for tax, cost of living, or visas, this page lines up income tax, take-home pay, costs, and visa routes for 2026.",
    faqs: [
      {
        q: 'Which has lower income tax, Thailand or Vietnam?',
        a: "Thailand’s deductions create a high effective tax-free threshold (~฿310,000/year), while Vietnam taxes monthly from 5% after a ₫11,000,000 deduction and adds 10.5% insurance. Thailand is often lighter at lower incomes; compare at your salary with the calculator above.",
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
        a: 'Thailand offers a dedicated long-stay remote-worker visa; Vietnam currently relies on business/tourist e-visas. The verdict strip and visa snapshot below summarise the difference.',
      },
    ],
  },
  'indonesia-vs-singapore': {
    intro:
      "Indonesia and Singapore sit at opposite ends of almost every axis: Indonesia taxes residents on worldwide income and is one of the cheapest places to live in the region, while Singapore is territorial, charges no capital gains tax, and is by far the most expensive. Whether you’re weighing Singapore vs Indonesia for a job offer or a regional base, this page lines up income tax, take-home pay, living costs, and visa routes for 2026.",
    faqs: [
      {
        q: 'Which has lower income tax, Indonesia or Singapore?',
        a: 'Singapore, at almost every income level. Its resident brackets start at 0% on the first S$20,000 and top out at 24%, while Indonesia’s PPh 21 brackets reach 35%. The gap widens further once contributions are counted: Indonesian employees pay BPJS, whereas CPF applies only to Singapore Citizens and PRs, so a foreigner on an Employment Pass pays nothing. Use the calculator above to see the difference at your salary.',
      },
      {
        q: 'Does either country tax foreign income?',
        a: 'Indonesia does — residents are taxed on worldwide income with no remittance basis. Singapore generally does not: it is territorial, so foreign-source income received by an individual is normally untaxed, and there is no capital gains tax. For anyone with income outside the country this is the single biggest difference between them.',
      },
      {
        q: 'How are non-resident expats taxed in each country?',
        a: 'Indonesia applies a flat 20% to non-residents (present under 183 days) with no PTKP. Singapore taxes non-resident employment income at the higher of a flat 15% or the resident rates, with no reliefs. Both switch you to resident treatment once you cross the day threshold.',
      },
      {
        q: 'Is Indonesia or Singapore better for digital nomads?',
        a: 'Indonesia, comfortably. It offers the Second Home Visa (E33G) as a long-stay route and Bali has the deepest nomad ecosystem in the region. Singapore has no digital nomad visa and no sign of introducing one — every mainstream work pass requires an employer to sponsor you, and housing costs several times the Indonesian equivalent.',
      },
    ],
  },
  'malaysia-vs-singapore': {
    intro:
      "Malaysia and Singapore are the region’s two most administratively straightforward destinations, and the choice usually comes down to cost against salary. Both bundle work authorisation and residence into a single pass, and both treat foreign-source income favourably — but Singapore pays far more and charges far more to live there. This page compares income tax, take-home pay, monthly costs, and visa routes for 2026.",
    faqs: [
      {
        q: 'Which has lower income tax, Malaysia or Singapore?',
        a: 'Singapore in most cases: its resident brackets top out at 24% against Malaysia’s 30%, and it reaches 7% only above S$40,000. Malaysia offsets some of this with generous personal reliefs, and Malaysian employees pay 11% to EPF while foreigners in Singapore pay no CPF at all. The crossover depends on your salary — model both above.',
      },
      {
        q: 'Do Malaysia and Singapore both exempt foreign income?',
        a: 'Effectively yes, by different mechanisms. Singapore is territorial by design: foreign-source income received by an individual is generally untaxed and there is no capital gains tax. Malaysia exempts foreign-source income for resident individuals under an exemption order legislated into the 2030s — an extended concession rather than a permanent structural feature. In both, "source" turns on where the work is actually performed.',
      },
      {
        q: 'How are non-resident expats taxed in each country?',
        a: 'Malaysia applies a flat 30% with no reliefs to non-residents (under 182 days) — the harshest non-resident treatment in the region. Singapore charges the higher of a flat 15% or the resident rates on employment income (under 183 days). Establishing residency is worth a great deal in both, and Malaysia additionally has linking rules that can qualify a shorter period.',
      },
      {
        q: 'Is Malaysia or Singapore better for remote workers?',
        a: 'Malaysia, clearly. The DE Rantau Digital Nomad Pass is purpose-built for remote workers with foreign clients and is the cleanest legal route in Southeast Asia. Singapore has no equivalent and is tightening work passes toward higher-earning, employer-sponsored talent. Kuala Lumpur also costs a fraction of Singapore for comparable connectivity.',
      },
    ],
  },
  'philippines-vs-singapore': {
    intro:
      "The Philippines and Singapore are both unusually easy for English speakers, and both spare foreign residents from worldwide taxation — but they differ enormously on rates, contributions, and cost. Whether you’re comparing Singapore vs the Philippines for an employer relocation or a regional move, this page lines up income tax, net pay, living costs, and visas for 2026.",
    faqs: [
      {
        q: 'Which has lower income tax, the Philippines or Singapore?',
        a: 'Singapore at most income levels. Philippine TRAIN Law brackets reach 35% and jump to 15% immediately above the ₱250,000 exempt band, while Singapore stays at 0% to S$20,000 and tops out at 24%. Filipino employees also pay SSS, PhilHealth and Pag-IBIG, whereas foreigners in Singapore pay no CPF. Compare at your own salary above.',
      },
      {
        q: 'Do either tax foreign income for foreign residents?',
        a: 'Neither, broadly. The Philippines taxes resident aliens on Philippine-source income only — worldwide taxation applies to Filipino citizens, not foreign residents. Singapore is territorial, so foreign-source income received by an individual is generally untaxed, and it has no capital gains tax. This makes both unusually friendly to people earning abroad.',
      },
      {
        q: 'How are non-resident expats taxed in each country?',
        a: 'The Philippines applies a flat 25% to non-residents not engaged in trade or business. Singapore charges the higher of a flat 15% or the resident rates on employment income for non-residents (under 183 days), with no reliefs.',
      },
      {
        q: 'Which is better for long stays and remote work?',
        a: 'The Philippines for flexibility and cost: tourist visas extend in increments to roughly two years, which is why long-stay remote workers favour it, though it confers no work rights. Singapore has no digital nomad visa, requires employer sponsorship for every mainstream pass, and costs several times more to live in — but pays correspondingly higher salaries.',
      },
    ],
  },
  'singapore-vs-thailand': {
    intro:
      "Singapore and Thailand attract very different people: Singapore for employer-sponsored professional roles with high pay and high costs, Thailand for lifestyle, affordability, and the region’s most developed expat infrastructure. Their tax systems differ just as sharply, especially on foreign income. This page compares income tax, take-home pay, living costs, and visa routes for 2026.",
    faqs: [
      {
        q: 'Which has lower income tax, Singapore or Thailand?',
        a: 'Singapore, in most situations. Its resident brackets top out at 24% against Thailand’s 35%, and foreigners in Singapore pay no CPF while Thai employees contribute to the Social Security Fund. Thailand does offer a 50% standard deduction (capped at ฿100,000) plus a ฿60,000 personal allowance, which helps at lower incomes. Model both at your salary above.',
      },
      {
        q: 'How do they treat foreign income differently?',
        a: 'This is the decisive difference. Singapore is territorial — foreign-source income received by an individual is generally untaxed, with no capital gains tax. Thailand taxes foreign income when it is remitted into the country by a tax resident, and since the 2024 change in Revenue Department practice it is assessable in the year of remittance regardless of when it was earned. Thai rules here have been revised more than once, so verify current guidance.',
      },
      {
        q: 'How are non-resident expats taxed in each country?',
        a: 'Thailand applies the ordinary progressive rates to non-residents but strips the deductions — unusual in the region, where flat rates are the norm. Singapore charges the higher of a flat 15% or the resident rates, with no reliefs. Thailand’s threshold is 180 days; Singapore’s is 183.',
      },
      {
        q: 'Is Singapore or Thailand better for digital nomads?',
        a: 'Thailand, by a wide margin. It has the region’s most developed nomad infrastructure, and the LTR Work-from-Thailand Professional visa offers a formal route for higher-earning remote employees. Singapore has no digital nomad visa, requires employer sponsorship, and costs several times more — though it remains an excellent short-stay hub with unmatched flight connections.',
      },
    ],
  },
  'singapore-vs-vietnam': {
    intro:
      "Singapore and Vietnam represent the two extremes of the region: Vietnam is among the cheapest places to live and taxes residents on worldwide income, while Singapore is the most expensive and taxes territorially with no capital gains tax. Whether you’re weighing Vietnam vs Singapore for a role or a base, this page compares income tax, take-home pay, living costs, and visas for 2026.",
    faqs: [
      {
        q: 'Which has lower income tax, Singapore or Vietnam?',
        a: 'Singapore, and usually by a wide margin. Vietnam’s PIT brackets reach 35% and Vietnamese employees also pay social, health and unemployment insurance, while Singapore tops out at 24% and foreigners on work passes pay no CPF at all. Vietnam’s ₫15,500,000 monthly personal deduction narrows the gap at lower incomes. Compare at your salary above.',
      },
      {
        q: 'Does either country tax worldwide income?',
        a: 'Vietnam does — residents are taxed on worldwide income with no remittance basis and no territorial exemption, so foreign client income paid into a foreign account is still in scope. Singapore does not: foreign-source income received by an individual is generally untaxed. For anyone earning abroad this is the most consequential difference between them.',
      },
      {
        q: 'How are non-resident expats taxed in each country?',
        a: 'Vietnam applies a flat 20% on Vietnam-source income to non-residents. Singapore charges the higher of a flat 15% or the resident rates on employment income. Note Vietnam’s residency test also runs across any 12 consecutive months from arrival, not just the calendar year, so it catches people who never spend 183 days in a single year.',
      },
      {
        q: 'Is Singapore or Vietnam better for digital nomads?',
        a: 'Vietnam on cost and practicality — Da Nang and Ho Chi Minh City offer fast, cheap internet and a very low cost base, and the 90-day multiple-entry e-visa is easy to obtain, though no formal nomad visa exists and worldwide taxation applies once you become resident. Singapore has no nomad route at all and is priced for employed professionals.',
      },
    ],
  },
};

export function getComparison(slug: string): ComparisonContent | undefined {
  return COMPARISONS[slug];
}
