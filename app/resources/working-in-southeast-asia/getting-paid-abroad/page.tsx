import Link from 'next/link';
import { BASE_URL, breadcrumbList, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Getting Paid From Abroad While Living in Southeast Asia (2026)',
  description:
    'How to receive foreign income in Thailand, Vietnam, Indonesia, Malaysia, Singapore and the Philippines — the real cost of FX spreads, when remittance triggers tax, transfer routes compared, and the paper trail you need.',
  path: '/resources/working-in-southeast-asia/getting-paid-abroad',
});

const bodyStyle = { color: 'var(--forest-300)' };
const headingStyle = { color: 'var(--cream)' };
const strong = { color: 'var(--cream)' };
const labelStyle = { color: 'var(--gold-500)' };

const cardStyle = {
  background: 'var(--forest-800)',
  border: '1px solid var(--forest-700)',
  borderRadius: '4px',
};

const REMITTANCE: { flag: string; country: string; slug: string; rule: string }[] = [
  {
    flag: '🇹🇭',
    country: 'Thailand',
    slug: 'thailand',
    rule:
      'Remittance matters more than anywhere else in the region. Foreign income brought in by a Thai tax resident is assessable in the year of remittance, whatever year it was earned — the pre-2024 "earn now, remit next year" gap is closed. Your residency status in the year you remit is the live variable.',
  },
  {
    flag: '🇲🇾',
    country: 'Malaysia',
    slug: 'malaysia',
    rule:
      'Foreign-source income received by resident individuals is exempt under an order running to 31 December 2036, so remitting is not itself a taxable event. Two caveats: the income must already have been subject to tax of a similar character abroad — it is double-tax relief, not a route to paying tax nowhere — and source turns on where the work was performed, not where the money moved.',
  },
  {
    flag: '🇵🇭',
    country: 'Philippines',
    slug: 'philippines',
    rule:
      'Resident aliens are taxed on Philippine-source income only, so bringing in foreign earnings does not create income tax exposure. Large inbound transfers still attract bank compliance questions and reporting.',
  },
  {
    flag: '🇻🇳',
    country: 'Vietnam',
    slug: 'vietnam',
    rule:
      'Irrelevant to liability — residents are taxed on worldwide income regardless of whether it enters Vietnam. Keeping money offshore changes nothing about what is assessable. Vietnam has also tightened scrutiny of individuals receiving significant inbound foreign transfers.',
  },
  {
    flag: '🇮🇩',
    country: 'Indonesia',
    slug: 'indonesia',
    rule:
      'Also irrelevant to liability — residents are taxed on worldwide income. Separately, the annual SPT return requires disclosure of foreign assets including offshore bank balances, and Indonesia participates in automatic exchange of financial account information.',
  },
  {
    flag: '🇸🇬',
    country: 'Singapore',
    slug: 'singapore',
    rule:
      'Not a taxable event. Singapore is territorial — foreign-source income received by an individual is generally not taxed, and there is no capital gains tax. Moving money in is a banking question, not a tax one, and Singapore has no capital controls. Expect the usual source-of-funds checks on large transfers.',
  },
];

const ROUTES: string[][] = [
  [
    'Bank wire (SWIFT)',
    'Fixed sending fee, plus correspondent charges, plus a bank FX spread',
    '1–5 days',
    'Large sums, employer payroll, when a formal bank record is needed',
  ],
  [
    'Multi-currency fintech',
    'Small percentage fee on a mid-market rate',
    'Minutes to 2 days',
    'Freelancers and regular transfers; usually the cheapest all-in',
  ],
  [
    'Payment platforms',
    'Percentage of receipt, often plus a separate conversion margin',
    'Instant to days',
    'Client convenience, marketplace work — check the conversion margin, not just the headline fee',
  ],
  [
    'Local currency account abroad',
    'Whatever your provider charges to withdraw locally',
    'Varies',
    'Holding foreign currency and converting on your own timing',
  ],
];

const FAQ: { q: string; a: string }[] = [
  {
    q: 'Do I pay tax when I transfer money into Thailand?',
    a: 'A transfer of your own capital is not income. What is taxed is foreign-source income remitted into Thailand while you are a Thai tax resident — assessable in the year of remittance, regardless of which year it was earned, since the 2024 change in Revenue Department practice. This is the one country in the region where the timing and your residency status in the remittance year genuinely matter.',
  },
  {
    q: 'What is the cheapest way to get paid from abroad in Southeast Asia?',
    a: 'For regular freelance-scale amounts, multi-currency fintech providers offering a mid-market exchange rate with a small transparent fee are generally cheapest. Bank wires carry a fixed fee plus an FX spread that is often invisible in the quoted rate — compare the total local currency landed, not the advertised fee. Payment platforms frequently add a conversion margin on top of their headline percentage.',
  },
  {
    q: 'Does keeping money offshore avoid tax in Southeast Asia?',
    a: 'Only in Thailand, and only partially. Vietnam and Indonesia tax residents on worldwide income whether or not it enters the country, so offshore accounts change nothing about liability. Malaysia exempts foreign-source income for individuals regardless of where it sits. Indonesia additionally requires disclosure of foreign assets on the annual return.',
  },
  {
    q: 'Will my bank ask questions about large incoming transfers?',
    a: 'Yes, routinely. Banks across the region apply anti-money-laundering checks to inbound foreign transfers and will ask for the source of funds and supporting documentation. Consistent, well-documented client payments clear easily; irregular large sums with no paper trail cause holds. Keep contracts and invoices matched to each transfer.',
  },
  {
    q: 'Should I be paid in USD or local currency?',
    a: 'USD gives you the option to convert on your own timing and protects you if the local currency weakens; local currency removes conversion cost and FX uncertainty on your monthly spending. Most remote workers earning abroad take USD and convert in tranches. Every calculator on this site accepts USD, EUR or GBP input and converts at live rates so you can see the local reality of a foreign-currency package.',
  },
];

export default function GettingPaidAbroadPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Getting Paid From Abroad While Living in Southeast Asia',
    description:
      'Receiving foreign income in Southeast Asia — FX costs, remittance and tax, transfer routes, and documentation.',
    datePublished: '2026-08-07',
    author: { '@type': 'Organization', name: 'SEA Tax Calculator' },
    publisher: { '@type': 'Organization', name: 'SEA Tax Calculator' },
    url: `${BASE_URL}/resources/working-in-southeast-asia/getting-paid-abroad`,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  const breadcrumbLd = breadcrumbList([
    { name: 'Resources', path: '/resources' },
    { name: 'Working in Southeast Asia', path: '/resources/working-in-southeast-asia' },
    { name: 'Getting Paid From Abroad', path: '/resources/working-in-southeast-asia/getting-paid-abroad' },
  ]);

  return (
    <div className="max-w-3xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="mb-4">
        <Link href="/resources/working-in-southeast-asia" className="text-sm nav-link">
          ← Working in Southeast Asia
        </Link>
      </div>

      <p className="text-[10px] font-bold uppercase tracking-[3px] mb-2" style={labelStyle}>
        Money &amp; Transfers · 2026
      </p>
      <h1 className="text-2xl font-bold mb-3" style={headingStyle}>
        Getting Paid From Abroad While Living in Southeast Asia
      </h1>

      <p className="leading-relaxed mb-8" style={bodyStyle}>
        Two separate questions get tangled together constantly: <strong style={strong}>what does
        moving the money cost</strong>, and <strong style={strong}>does moving it create a tax
        event</strong>. They have different answers, and in five of the six countries here the
        second answer is simply &ldquo;no&rdquo;. Untangling them is worth real money.
      </p>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3" style={headingStyle}>
          Does bringing money in trigger tax?
        </h2>
        <p className="leading-relaxed mb-4" style={bodyStyle}>
          First, the distinction that resolves most confusion:{' '}
          <strong style={strong}>transferring your own existing capital is not income</strong>.
          Moving savings from a home-country account to a local one is not a taxable event
          anywhere in the region. What can matter is receiving <em>income</em> — and only one
          country makes the receipt itself the trigger.
        </p>
        <div className="space-y-4">
          {REMITTANCE.map((entry) => (
            <div key={entry.slug} className="p-5" style={cardStyle}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{entry.flag}</span>
                <Link href={`/${entry.slug}`} className="font-semibold nav-link">
                  {entry.country}
                </Link>
              </div>
              <p className="text-sm leading-relaxed" style={bodyStyle}>{entry.rule}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 leading-relaxed" style={bodyStyle}>
          All of this turns on being a tax resident in the first place — the day-count tests and
          what each country actually taxes are set out in the{' '}
          <Link href="/resources/digital-nomad/tax-residency" className="nav-link">
            tax residency guide for Southeast Asia
          </Link>
          .
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3" style={headingStyle}>
          The FX spread is the real cost
        </h2>
        <p className="leading-relaxed mb-4" style={bodyStyle}>
          Transfer fees are visible and small. The exchange rate margin is invisible and large.
          A bank quoting &ldquo;no transfer fee&rdquo; while applying a several-percent spread
          against the mid-market rate is more expensive than one charging a flat fee at a fair
          rate — and on a monthly salary, that difference compounds into a meaningful annual sum.
        </p>
        <div className="p-5 mb-4" style={{ ...cardStyle, borderLeft: '3px solid var(--gold-500)' }}>
          <p className="text-sm leading-relaxed" style={bodyStyle}>
            <strong style={strong}>The only comparison that matters:</strong> how much local
            currency actually lands in your account for a given amount sent. Ignore the advertised
            fee, ignore the advertised rate, and compare the landed number across two or three
            providers on the same day with the same amount.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--forest-700)' }}>
                <th className="py-2 pr-4 font-semibold" style={headingStyle}>Route</th>
                <th className="py-2 pr-4 font-semibold" style={headingStyle}>Cost shape</th>
                <th className="py-2 pr-4 font-semibold" style={headingStyle}>Speed</th>
                <th className="py-2 font-semibold" style={headingStyle}>Best for</th>
              </tr>
            </thead>
            <tbody style={bodyStyle}>
              {ROUTES.map((row) => (
                <tr key={row[0]} style={{ borderBottom: '1px solid var(--forest-700)' }}>
                  <td className="py-3 pr-4 font-medium" style={strong}>{row[0]}</td>
                  {row.slice(1).map((cell, i) => (
                    <td key={i} className="py-3 pr-4">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 leading-relaxed" style={bodyStyle}>
          Opening the local account that receives all this is its own project — requirements,
          document lists and which banks actually accept foreigners are covered in the{' '}
          <Link href="/resources/banking" className="nav-link">
            banking guide for expats in Southeast Asia
          </Link>
          .
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3" style={headingStyle}>
          Currency risk when your salary is foreign
        </h2>
        <p className="leading-relaxed mb-4" style={bodyStyle}>
          If you earn in USD and spend in baht, dong or ringgit, your effective pay changes every
          month without your employer touching it. A currency move of a few percent is
          indistinguishable from a pay cut, and it is entirely outside your control.
        </p>
        <ul className="list-disc list-outside ml-5 space-y-2 leading-relaxed mb-4" style={bodyStyle}>
          <li>
            <strong style={strong}>Convert in tranches</strong> rather than all at once — averaging
            beats guessing.
          </li>
          <li>
            <strong style={strong}>Hold a buffer in local currency</strong> covering a few months
            of fixed costs, so a bad week in the market is not a bad month in your life.
          </li>
          <li>
            <strong style={strong}>Negotiate the currency, not just the number.</strong> A package
            quoted in local currency transfers the risk to your employer.
          </li>
        </ul>
        <div className="p-5" style={cardStyle}>
          <p className="text-[10px] font-bold uppercase tracking-[2px] mb-2" style={labelStyle}>
            See a foreign-currency package in local terms
          </p>
          <p className="text-sm leading-relaxed" style={bodyStyle}>
            Every calculator on this site takes USD, EUR or GBP input and converts at live rates
            before applying local tax and contributions — so you can see what a dollar salary
            actually leaves you.{' '}
            <Link href="/thailand?salary=5000&period=monthly&currency=USD" className="nav-link">
              Try $5,000/month in Thailand
            </Link>
            , or{' '}
            <Link href="/compare" className="nav-link">
              compare the same package across all six countries
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3" style={headingStyle}>
          The paper trail you will eventually need
        </h2>
        <p className="leading-relaxed mb-4" style={bodyStyle}>
          Banks across the region apply source-of-funds checks to inbound foreign transfers, and
          the questions arrive at the least convenient moment — usually when you are trying to buy
          property, renew a permit, or move a large sum. Consistent documentation makes these
          conversations short.
        </p>
        <ul className="list-disc list-outside ml-5 space-y-2 leading-relaxed" style={bodyStyle}>
          <li>A signed contract or engagement letter for each client or employer</li>
          <li>An invoice matched to every inbound payment, with matching reference and amount</li>
          <li>Bank statements retained for the local record-keeping period — commonly five to seven years</li>
          <li>Evidence of tax paid abroad, if you may claim a foreign tax credit locally</li>
          <li>A note of the exchange rate applied, where you must report income in local currency</li>
        </ul>
        <p className="mt-4 leading-relaxed" style={bodyStyle}>
          If you are self-employed, the local registration and invoicing obligations sit on top of
          all this — the country freelancer playbooks in our{' '}
          <Link href="/resources/guides" className="nav-link">guide library</Link> cover
          registration, deemed rates and VAT thresholds per country.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3" style={headingStyle}>Related</h2>
        <p className="leading-relaxed" style={bodyStyle}>
          <Link href="/resources/digital-nomad/tax-residency" className="nav-link">
            Tax residency rules
          </Link>{' '}
          ·{' '}
          <Link href="/resources/banking" className="nav-link">banking and account opening</Link>{' '}
          ·{' '}
          <Link href="/resources/working-in-southeast-asia/employer-of-record" className="nav-link">
            employer of record
          </Link>{' '}
          ·{' '}
          <Link href="/resources/cost-of-living" className="nav-link">cost of living comparison</Link>
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold mb-4" style={headingStyle}>Frequently asked questions</h2>
        <div className="space-y-4">
          {FAQ.map(({ q, a }) => (
            <div key={q} className="p-5" style={cardStyle}>
              <h3 className="text-base font-semibold mb-2" style={headingStyle}>{q}</h3>
              <p className="text-sm leading-relaxed" style={bodyStyle}>{a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
