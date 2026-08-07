import Link from 'next/link';
import { BASE_URL, breadcrumbList, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Digital Nomad Tax Residency in Southeast Asia (2026 Guide)',
  description:
    'The day-count tests, territorial vs worldwide taxation, and remittance rules that decide where a digital nomad actually owes income tax in Thailand, Vietnam, Indonesia, Malaysia, Singapore and the Philippines — with live calculators for every scenario.',
  path: '/resources/digital-nomad/tax-residency',
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

interface ResidencyRow {
  flag: string;
  country: string;
  slug: string;
  test: string;
  scope: string;
  nonResidentRate: string;
}

const RESIDENCY: ResidencyRow[] = [
  {
    flag: '🇹🇭',
    country: 'Thailand',
    slug: 'thailand',
    test: '180 days in a calendar year',
    scope: 'Thai-source income always. Foreign income taxed when remitted into Thailand while you are a tax resident.',
    nonResidentRate: 'Progressive rates, deductions stripped',
  },
  {
    flag: '🇻🇳',
    country: 'Vietnam',
    slug: 'vietnam',
    test: '183 days in a calendar year, or in 12 consecutive months from arrival',
    scope: 'Residents taxed on worldwide income. Also caught by a permanent-residence / long-lease test even under 183 days.',
    nonResidentRate: '20% flat on Vietnam-source income',
  },
  {
    flag: '🇮🇩',
    country: 'Indonesia',
    slug: 'indonesia',
    test: '183 days in any 12-month period, or intent to reside',
    scope: 'Residents taxed on worldwide income. A limited regime lets certain new foreign skilled workers be taxed on Indonesian-source income only for their first four years.',
    nonResidentRate: '20% flat on Indonesian-source income',
  },
  {
    flag: '🇲🇾',
    country: 'Malaysia',
    slug: 'malaysia',
    test: '182 days in a calendar year (with linking rules across years)',
    scope: 'Effectively territorial for individuals — foreign-source income received in Malaysia is exempt under an exemption order currently legislated to run into the 2030s.',
    nonResidentRate: '30% flat, no personal reliefs',
  },
  {
    flag: '🇵🇭',
    country: 'Philippines',
    slug: 'philippines',
    test: 'Residency by intent and length of stay; 180 days aggregate triggers "engaged in trade or business" treatment',
    scope: 'Resident aliens are taxed only on Philippine-source income — worldwide taxation applies to Filipino citizens, not to foreign residents.',
    nonResidentRate: '25% flat for non-residents not engaged in trade or business',
  },
  {
    flag: '🇸🇬',
    country: 'Singapore',
    slug: 'singapore',
    test: '183 days in a calendar year, with concessions for employment straddling two years',
    scope: 'Territorial. Foreign-source income received by an individual is generally not taxed, and there is no capital gains tax and no inheritance tax. CPF applies only to Citizens and PRs, so foreigners on work passes pay no mandatory contributions at all.',
    nonResidentRate: 'Higher of 15% flat or the resident rates',
  },
];

const MYTHS: { myth: string; reality: string }[] = [
  {
    myth: '"If I stay under 183 days everywhere, I owe tax nowhere."',
    reality:
      'Day-counting only sheds residency; it does not create a tax-free status. Your home country usually keeps taxing you until you positively establish residency somewhere else, and many countries (UK, Australia, Canada, most of the EU) use ties-based tests where physical absence alone is not enough. "Nomad with no tax residency" is generally a bookkeeping gap, not a legal position.',
  },
  {
    myth: '"I am paid by a foreign company into a foreign bank, so local tax does not apply."',
    reality:
      'For a tax resident of Vietnam or Indonesia, worldwide income is in scope regardless of where the payer or the bank sits. Where the money lands affects Thailand (remittance) and Malaysia (exemption on foreign-source income) — not the general principle.',
  },
  {
    myth: '"A digital nomad visa means I do not pay local tax."',
    reality:
      'Immigration status and tax residency are decided by different authorities under different rules. Holding a DE Rantau pass or an LTR visa does not exempt you from the day-count test; a few programmes attach specific tax treatment, but that is a separate concession you must verify, not a default.',
  },
  {
    myth: '"A double tax treaty means I pick which country taxes me."',
    reality:
      'Treaties allocate taxing rights and relieve double taxation — they do not let you choose. Where both countries claim you as resident, the treaty tie-breaker runs a fixed sequence: permanent home available to you, then centre of vital interests, then habitual abode, then nationality.',
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: 'How many days before I become a tax resident in Southeast Asia?',
    a: 'Thailand uses 180 days in a calendar year, Malaysia 182 days, and Vietnam, Indonesia and Singapore 183 days — Vietnam and Indonesia measure across any 12 consecutive months, not just the calendar year, so a mid-year arrival can trigger residency in a year you spent under 183 days on paper. The Philippines works differently: residency turns on intent and length of stay, with a 180-day aggregate threshold changing how non-residents are taxed.',
  },
  {
    q: 'Which Southeast Asian country does not tax foreign income?',
    a: 'Singapore is genuinely territorial — foreign-source income received by an individual is generally not taxed, and there is no capital gains tax. Malaysia is close behind: foreign-source income received by residents is exempt under an exemption order legislated well into the 2030s. The Philippines taxes resident aliens on Philippine-source income only. Thailand taxes foreign income only when you remit it while resident. Vietnam and Indonesia tax residents on worldwide income.',
  },
  {
    q: 'Does Thailand tax money I bring in from abroad?',
    a: 'Since the 2024 change in Revenue Department practice, foreign-source income remitted into Thailand by a tax resident is assessable in the year of remittance, regardless of which year it was earned. The previous planning trick — earn this year, remit next year — no longer works. Timing your remittances against your residency years is now the relevant question, and rules in this area have been actively revised, so confirm current guidance before acting.',
  },
  {
    q: 'Is it better to be a tax resident or a non-resident?',
    a: 'It depends entirely on your income level. Non-resident treatment is a flat rate applied from the first unit of income with no allowances — 20% in Vietnam and Indonesia, 25% in the Philippines, 30% in Malaysia, and in Singapore the higher of 15% or the resident rates. Resident treatment gives you progressive brackets starting at 0% plus deductions. At modest incomes residency is usually cheaper; at high incomes the flat rate can win. Toggle expat mode in any calculator on this site to see your own crossover point.',
  },
  {
    q: 'Do I still owe tax in my home country?',
    a: 'Usually yes, until you properly cease residency there. US citizens are taxed on worldwide income regardless of where they live, with the Foreign Earned Income Exclusion and foreign tax credits as relief. Most other countries release you once you break residency, but the tests are ties-based — home, family, and economic connections — not simply day counts.',
  },
];

export default function TaxResidencyPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Digital Nomad Tax Residency in Southeast Asia',
    description:
      'Day-count tests, territorial vs worldwide taxation, and remittance rules across Thailand, Vietnam, Indonesia, Malaysia and the Philippines.',
    datePublished: '2026-08-07',
    author: { '@type': 'Organization', name: 'SEA Tax Calculator' },
    publisher: { '@type': 'Organization', name: 'SEA Tax Calculator' },
    url: `${BASE_URL}/resources/digital-nomad/tax-residency`,
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
    { name: 'Digital Nomad', path: '/resources/digital-nomad' },
    { name: 'Tax Residency', path: '/resources/digital-nomad/tax-residency' },
  ]);

  return (
    <div className="max-w-3xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mb-4">
        <Link href="/resources/digital-nomad" className="text-sm nav-link">
          ← Digital Nomad Hub
        </Link>
      </div>

      <p className="text-[10px] font-bold uppercase tracking-[3px] mb-2" style={labelStyle}>
        Tax Residency · 2026
      </p>
      <h1 className="text-2xl font-bold mb-3" style={headingStyle}>
        Digital Nomad Tax Residency in Southeast Asia
      </h1>

      <p className="leading-relaxed mb-4" style={bodyStyle}>
        Tax residency is the single question that decides your entire bill, and it has nothing to
        do with your visa. Two people on identical tourist entries, earning identical money from
        identical foreign clients, can owe wildly different amounts — because one of them crossed
        a day count and the other did not.
      </p>
      <p className="leading-relaxed mb-8" style={bodyStyle}>
        There are only three variables that matter:{' '}
        <strong style={strong}>(1)</strong> how many days you were physically present,{' '}
        <strong style={strong}>(2)</strong> whether the country taxes worldwide income or only
        local income, and <strong style={strong}>(3)</strong> if it taxes foreign income, whether
        it does so on receipt or on remittance. Everything else is detail.
      </p>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3" style={headingStyle}>
          The day-count tests, side by side
        </h2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--forest-700)' }}>
                <th className="py-2 pr-4 font-semibold" style={headingStyle}>Country</th>
                <th className="py-2 pr-4 font-semibold" style={headingStyle}>Residency test</th>
                <th className="py-2 font-semibold" style={headingStyle}>Non-resident rate</th>
              </tr>
            </thead>
            <tbody style={bodyStyle}>
              {RESIDENCY.map((row) => (
                <tr key={row.slug} style={{ borderBottom: '1px solid var(--forest-700)' }}>
                  <td className="py-3 pr-4 whitespace-nowrap">
                    <span className="mr-1">{row.flag}</span>
                    <Link href={`/${row.slug}`} className="nav-link font-medium">
                      {row.country}
                    </Link>
                  </td>
                  <td className="py-3 pr-4">{row.test}</td>
                  <td className="py-3">{row.nonResidentRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm leading-relaxed" style={bodyStyle}>
          <strong style={strong}>The trap:</strong> Vietnam and Indonesia measure across{' '}
          <em>any 12 consecutive months</em>, not the calendar year. Arrive in September, stay
          through the following June, and you can become a tax resident having never spent 183
          days in either calendar year.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3" style={headingStyle}>
          What each country actually taxes
        </h2>
        <p className="leading-relaxed mb-4" style={bodyStyle}>
          This is where the region diverges sharply, and where most generic nomad advice is
          wrong — the six countries here use four genuinely different systems.
        </p>
        <div className="space-y-4">
          {RESIDENCY.map((row) => (
            <div key={row.slug} className="p-5" style={cardStyle}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{row.flag}</span>
                <span className="font-semibold" style={strong}>{row.country}</span>
              </div>
              <p className="text-sm leading-relaxed mb-3" style={bodyStyle}>{row.scope}</p>
              <Link href={`/${row.slug}`} className="text-sm font-medium nav-link">
                See your take-home pay in {row.country} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3" style={headingStyle}>
          Resident or non-resident: which is cheaper?
        </h2>
        <p className="leading-relaxed mb-4" style={bodyStyle}>
          Most nomads assume avoiding residency saves money. Often it costs money. Non-resident
          treatment is a <strong style={strong}>flat rate from the first unit of income with no
          allowances</strong>; resident treatment gives you a 0% band and deductions. There is a
          crossover income above which the flat rate wins — and it is specific to your salary and
          country.
        </p>
        <div className="p-5 mb-4" style={cardStyle}>
          <p className="text-[10px] font-bold uppercase tracking-[2px] mb-3" style={labelStyle}>
            Run the comparison on your own number
          </p>
          <p className="text-sm leading-relaxed mb-3" style={bodyStyle}>
            These links open a calculator pre-set to $5,000/month in non-resident mode. Toggle
            expat mode off to see the resident equivalent, and change the salary to yours — the
            effective-rate line moves live.
          </p>
          <ul className="space-y-2 text-sm">
            {RESIDENCY.map((row) => (
              <li key={row.slug}>
                <Link
                  href={`/${row.slug}?salary=5000&period=monthly&expat=true&currency=USD`}
                  className="nav-link"
                >
                  {row.flag} {row.country} — non-resident on $5,000/month
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="leading-relaxed" style={bodyStyle}>
          To see all six at once, use the{' '}
          <Link href="/compare" className="nav-link">
            side-by-side Southeast Asia tax comparison
          </Link>
          .
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3" style={headingStyle}>
          Thailand&apos;s remittance rule — the region&apos;s biggest recent change
        </h2>
        <p className="leading-relaxed mb-4" style={bodyStyle}>
          Thailand taxes residents on foreign income only when it is{' '}
          <strong style={strong}>brought into the country</strong>. That made it the region&apos;s
          favourite base, because income earned in one year and remitted in a later year fell
          outside the net entirely.
        </p>
        <p className="leading-relaxed mb-4" style={bodyStyle}>
          That gap closed in 2024. Foreign-source income remitted by a Thai tax resident is now
          assessable in the year of remittance, whichever year it was earned. What still matters
          is <em>your residency status in the year you remit</em> — remitting during a year you
          are not Thai-resident is treated differently from remitting during one you are.
        </p>
        <div className="p-5" style={{ ...cardStyle, borderLeft: '3px solid var(--gold-500)' }}>
          <p className="text-sm leading-relaxed" style={bodyStyle}>
            <strong style={strong}>Verify before acting.</strong> Thai treatment of foreign income
            has been revised more than once since 2023 and further reform has been under
            discussion. Nothing on this page is tax advice — check current Revenue Department
            guidance or a Thai tax professional before structuring remittances. Our{' '}
            <Link href="/resources/guides/thailand-annual-tax-filing-visa-renewal-guide" className="nav-link">
              Thailand filing and renewal guide
            </Link>{' '}
            covers the practical deadlines.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3" style={headingStyle}>
          Four myths worth unlearning
        </h2>
        <div className="space-y-4">
          {MYTHS.map(({ myth, reality }) => (
            <div key={myth} className="p-5" style={cardStyle}>
              <p className="font-semibold mb-2" style={strong}>{myth}</p>
              <p className="text-sm leading-relaxed" style={bodyStyle}>{reality}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3" style={headingStyle}>
          A practical sequence
        </h2>
        <ol className="list-decimal list-outside ml-5 space-y-2 leading-relaxed" style={bodyStyle}>
          <li>
            <strong style={strong}>Count your days honestly</strong>, per country, against each
            country&apos;s own measurement window — calendar year for Thailand and Malaysia, rolling
            12 months for Vietnam and Indonesia.
          </li>
          <li>
            <strong style={strong}>Establish whether you have ceased home-country residency.</strong>{' '}
            This is the step most nomads skip, and it is the one that creates real liability.
          </li>
          <li>
            <strong style={strong}>Identify the taxing basis</strong> where you are staying:
            worldwide, territorial, or remittance.
          </li>
          <li>
            <strong style={strong}>Model both statuses at your income</strong> using the
            calculators above before assuming which one you want.
          </li>
          <li>
            <strong style={strong}>Check the treaty</strong> between your home country and your
            base if both could claim you, and read the tie-breaker order.
          </li>
          <li>
            <strong style={strong}>Register locally if you cross the threshold.</strong> The{' '}
            <Link href="/resources/relocation" className="nav-link">relocation checklists</Link>{' '}
            include tax registration steps per country.
          </li>
        </ol>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3" style={headingStyle}>Related</h2>
        <p className="leading-relaxed" style={bodyStyle}>
          <Link href="/resources/working-in-southeast-asia" className="nav-link">
            Working in Southeast Asia
          </Link>{' '}
          covers work permits and employment structures ·{' '}
          <Link href="/resources/visas" className="nav-link">
            visa options by country
          </Link>{' '}
          ·{' '}
          <Link href="/resources/guides/thailand-freelancer-self-employed-tax-playbook" className="nav-link">
            freelancer tax playbook for Thailand
          </Link>{' '}
          ·{' '}
          <Link href="/resources/banking" className="nav-link">
            banking and international transfers
          </Link>
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold mb-4" style={headingStyle}>
          Frequently asked questions
        </h2>
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
