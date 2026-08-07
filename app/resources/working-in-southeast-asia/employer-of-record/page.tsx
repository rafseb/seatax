import Link from 'next/link';
import { BASE_URL, breadcrumbList, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Employer of Record in Southeast Asia: EOR vs Entity vs Contractor (2026)',
  description:
    'How an Employer of Record works in Thailand, Vietnam, Indonesia, Malaysia, Singapore and the Philippines — what it costs, when it beats setting up a local entity, the misclassification risk of using contractors, and what an EOR cannot do.',
  path: '/resources/working-in-southeast-asia/employer-of-record',
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

const COMPARISON: string[][] = [
  [
    'Contractor',
    'Days',
    'Lowest — invoice only',
    'None',
    'High: misclassification, no work permit route',
    'Short projects, genuine freelancers',
  ],
  [
    'Employer of Record',
    '2–6 weeks',
    'Per-employee monthly fee + payroll',
    'EOR sponsors',
    'Low: EOR carries compliance',
    '1–20 people, market testing, speed',
  ],
  [
    'Local entity',
    '2–6 months',
    'Incorporation + ongoing accounting, audit, filings',
    'You sponsor',
    'Yours entirely',
    'Long-term presence, scale, local revenue',
  ],
];

const COUNTRY_NOTES: { flag: string; country: string; slug: string; note: string }[] = [
  {
    flag: '🇹🇭',
    country: 'Thailand',
    slug: 'thailand',
    note:
      'Work permits are tied to the sponsoring company and Thai entities commonly face a Thai-employee ratio per foreign work permit, plus registered capital requirements. That ratio is the single biggest reason small foreign employers use an EOR rather than incorporating.',
  },
  {
    flag: '🇻🇳',
    country: 'Vietnam',
    slug: 'vietnam',
    note:
      'A work permit is employer-specific and the Temporary Residence Card depends on it, so the sponsoring arrangement determines your employee’s residence status. Changing employer means a new permit, not a transfer — worth knowing before moving someone off an EOR onto your own entity.',
  },
  {
    flag: '🇮🇩',
    country: 'Indonesia',
    slug: 'indonesia',
    note:
      'The most restrictive of the six for direct foreign hiring: work authorisation is position-specific, sector and quota limits apply, and a foreign-worker levy is payable. Sponsorship is genuinely required — there is no self-sponsored route for an ordinary foreign employee.',
  },
  {
    flag: '🇲🇾',
    country: 'Malaysia',
    slug: 'malaysia',
    note:
      'The most predictable process in the region. Work authorisation and residence are bundled into a single Employment Pass issued in categories by salary band, mostly routed through the Expatriate Services Division. Document-driven rather than discretionary.',
  },
  {
    flag: '🇵🇭',
    country: 'Philippines',
    slug: 'philippines',
    note:
      'Employment runs on a 9(g) visa plus an Alien Employment Permit from the Department of Labor, both employer-sponsored. English-language contracting infrastructure is mature, which is why the Philippines has the deepest genuine-contractor market of the six.',
  },
  {
    flag: '🇸🇬',
    country: 'Singapore',
    slug: 'singapore',
    note:
      'The employer-side cost profile is unlike anywhere else here: CPF applies only to Citizens and PRs, so hiring a foreigner on an Employment Pass carries no employer contributions at all, while hiring a local adds a 17% employer CPF share. That inverts the usual EOR cost comparison. The constraint is COMPASS, which scores the sponsoring entity’s workforce diversity and local hiring record — so a brand-new EOR-held headcount is assessed partly on the EOR’s own profile.',
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: 'What is an Employer of Record?',
    a: 'A third-party company that legally employs your worker in their country on your behalf. The EOR holds the employment contract, runs local payroll, withholds income tax, pays statutory contributions and — where applicable — sponsors the work permit. You direct the work day to day; the EOR carries the legal employer obligations.',
  },
  {
    q: 'How much does an EOR cost in Southeast Asia?',
    a: 'Providers typically charge either a flat monthly fee per employee or a percentage of payroll, on top of the gross salary and the employer-side statutory contributions. The fee is not the whole cost — employer contributions differ substantially by country and are frequently omitted from quotes, so always compare on total cost of employment rather than on the platform fee.',
  },
  {
    q: 'Is it cheaper to use contractors instead of an EOR?',
    a: 'Cheaper up front, and the exposure sits with you. If the working relationship has the substance of employment — set hours, exclusive engagement, integration into your team, your equipment, your direction — labour authorities across the region can reclassify it, with back-dated contributions, penalties and severance entitlements attached. Contractors are appropriate for genuinely independent, project-based work.',
  },
  {
    q: 'Can an EOR get a work permit for a foreign employee?',
    a: 'Usually yes, since the EOR is a local registered entity and can sponsor. But it is country-specific and constrained: quotas, sector restrictions, salary floors and local-to-foreign employee ratios all still apply to the EOR as they would to any employer. Confirm the specific nationality and role before committing to a hire.',
  },
  {
    q: 'When should I set up my own entity instead of using an EOR?',
    a: 'When headcount makes the per-employee fee exceed entity running costs, when you need to invoice local customers or hold local contracts, when you want to own the employment relationship and IP chain directly, or when you are committing to the market long term. Many companies use an EOR to enter and incorporate once the team stabilises.',
  },
];

export default function EmployerOfRecordPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Employer of Record in Southeast Asia: EOR vs Entity vs Contractor',
    description:
      'How an Employer of Record works across Southeast Asia, what it costs, and when it beats a local entity or contractor arrangement.',
    datePublished: '2026-08-07',
    author: { '@type': 'Organization', name: 'SEA Tax Calculator' },
    publisher: { '@type': 'Organization', name: 'SEA Tax Calculator' },
    url: `${BASE_URL}/resources/working-in-southeast-asia/employer-of-record`,
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
    { name: 'Employer of Record', path: '/resources/working-in-southeast-asia/employer-of-record' },
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
        Hiring &amp; Structures · 2026
      </p>
      <h1 className="text-2xl font-bold mb-3" style={headingStyle}>
        Employer of Record in Southeast Asia
      </h1>

      <p className="leading-relaxed mb-8" style={bodyStyle}>
        You want to hire one person in Bangkok or Ho Chi Minh City. You do not want to incorporate,
        open a local bank account, appoint a resident director and commit to statutory audits for
        a single employee. That gap is what an Employer of Record fills — and understanding what it
        does and does not cover is what keeps the arrangement from becoming a liability.
      </p>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3" style={headingStyle}>What an EOR actually does</h2>
        <p className="leading-relaxed mb-4" style={bodyStyle}>
          An EOR is a local registered company that becomes the{' '}
          <strong style={strong}>legal employer</strong> of your worker while you retain day-to-day
          direction of the work. Concretely, the EOR:
        </p>
        <ul className="list-disc list-outside ml-5 space-y-2 leading-relaxed mb-4" style={bodyStyle}>
          <li>Holds a compliant local employment contract in the local language where required</li>
          <li>Runs payroll and withholds income tax at source</li>
          <li>Registers and remits employer and employee statutory contributions</li>
          <li>Administers statutory leave, severance and termination rules</li>
          <li>Sponsors a work permit where the employee is a foreign national</li>
        </ul>
        <p className="leading-relaxed" style={bodyStyle}>
          What it does <strong style={strong}>not</strong> do: it cannot let you invoice local
          customers, hold local contracts or licences, or own local IP. It is a hiring solution,
          not a market-entry entity.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3" style={headingStyle}>
          Contractor vs EOR vs entity
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--forest-700)' }}>
                <th className="py-2 pr-4 font-semibold" style={headingStyle}>Route</th>
                <th className="py-2 pr-4 font-semibold" style={headingStyle}>Time to hire</th>
                <th className="py-2 pr-4 font-semibold" style={headingStyle}>Cost shape</th>
                <th className="py-2 pr-4 font-semibold" style={headingStyle}>Work permit</th>
                <th className="py-2 pr-4 font-semibold" style={headingStyle}>Compliance risk</th>
                <th className="py-2 font-semibold" style={headingStyle}>Best for</th>
              </tr>
            </thead>
            <tbody style={bodyStyle}>
              {COMPARISON.map((row) => (
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
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3" style={headingStyle}>
          The misclassification trap
        </h2>
        <p className="leading-relaxed mb-4" style={bodyStyle}>
          The most common mistake is paying a full-time team member as a contractor because it is
          administratively easy. Labour authorities across the region assess the{' '}
          <strong style={strong}>substance</strong> of the relationship, not the label on the
          invoice.
        </p>
        <div className="p-5 mb-4" style={{ ...cardStyle, borderLeft: '3px solid var(--gold-500)' }}>
          <p className="text-sm leading-relaxed mb-2" style={bodyStyle}>
            <strong style={strong}>Signals that a &ldquo;contractor&rdquo; is really an employee:</strong>
          </p>
          <ul className="list-disc list-outside ml-5 space-y-1 text-sm leading-relaxed" style={bodyStyle}>
            <li>Fixed hours, or an expectation of availability during your business day</li>
            <li>Exclusive or near-exclusive engagement with you</li>
            <li>Your equipment, your systems, your email domain</li>
            <li>Integration into a reporting line and a team structure</li>
            <li>Direction of <em>how</em> the work is done, not just what is delivered</li>
            <li>An indefinite engagement with no defined deliverable</li>
          </ul>
        </div>
        <p className="leading-relaxed" style={bodyStyle}>
          Reclassification typically brings back-dated contributions, penalties and interest,
          statutory severance entitlements, and — for a foreign worker — the discovery that they
          have been working without authorisation. The exposure lands on the engaging company, and
          it compounds with time rather than lapsing.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3" style={headingStyle}>
          What the total cost really is
        </h2>
        <p className="leading-relaxed mb-4" style={bodyStyle}>
          EOR quotes usually lead with a per-employee monthly fee. That fee is the smallest of the
          three numbers you should be comparing:
        </p>
        <ol className="list-decimal list-outside ml-5 space-y-2 leading-relaxed mb-4" style={bodyStyle}>
          <li><strong style={strong}>Gross salary</strong> — what the employee is contracted for.</li>
          <li>
            <strong style={strong}>Employer-side statutory contributions</strong> — social security,
            health, pension and unemployment schemes, which vary substantially between the five
            countries and are frequently excluded from headline quotes.
          </li>
          <li><strong style={strong}>The EOR fee</strong> — flat monthly, or a percentage of payroll.</li>
        </ol>
        <div className="p-5" style={cardStyle}>
          <p className="text-[10px] font-bold uppercase tracking-[2px] mb-2" style={labelStyle}>
            Model the employee side first
          </p>
          <p className="text-sm leading-relaxed" style={bodyStyle}>
            Before negotiating a package, check what a given gross salary actually leaves your hire
            in each country — the employee-side contribution and tax load differs enough to change
            what counts as a competitive offer.{' '}
            <Link href="/compare" className="nav-link">
              Compare net take-home across all six countries
            </Link>{' '}
            at the salary you have in mind, or open the{' '}
            <Link href="/thailand" className="nav-link">Thailand</Link>,{' '}
            <Link href="/vietnam" className="nav-link">Vietnam</Link> or{' '}
            <Link href="/malaysia" className="nav-link">Malaysia</Link> calculators directly.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3" style={headingStyle}>
          Country-specific constraints
        </h2>
        <div className="space-y-4">
          {COUNTRY_NOTES.map((entry) => (
            <div key={entry.slug} className="p-5" style={cardStyle}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{entry.flag}</span>
                <Link href={`/${entry.slug}`} className="font-semibold nav-link">
                  {entry.country}
                </Link>
              </div>
              <p className="text-sm leading-relaxed" style={bodyStyle}>{entry.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3" style={headingStyle}>Questions to ask a provider</h2>
        <ul className="list-disc list-outside ml-5 space-y-2 leading-relaxed" style={bodyStyle}>
          <li>Do you own a local entity in this country, or subcontract to a partner? Ask which, by name.</li>
          <li>Is the quoted fee inclusive of employer statutory contributions, or on top?</li>
          <li>Can you sponsor a work permit for this nationality and this role, given current quotas?</li>
          <li>Who carries the liability if the arrangement is challenged as misclassification?</li>
          <li>What are the termination mechanics and notice costs under local law?</li>
          <li>How does IP assignment flow from the employee, through you, to us?</li>
          <li>What is the exit path if we later incorporate and want to transfer the employee?</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3" style={headingStyle}>Related</h2>
        <p className="leading-relaxed" style={bodyStyle}>
          <Link href="/resources/working-in-southeast-asia/work-permits" className="nav-link">
            Work permit requirements by country
          </Link>{' '}
          ·{' '}
          <Link href="/resources/working-in-southeast-asia/getting-paid-abroad" className="nav-link">
            getting paid from abroad
          </Link>{' '}
          ·{' '}
          <Link href="/resources/digital-nomad/tax-residency" className="nav-link">
            tax residency rules
          </Link>{' '}
          ·{' '}
          <Link href="/resources/visas" className="nav-link">visa options by country</Link>
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
