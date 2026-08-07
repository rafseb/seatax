import Link from 'next/link';
import { ARTICLES } from '@/lib/articles';
import { COUNTRIES } from '@/lib/countries';
import { BASE_URL, breadcrumbList, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Working in Southeast Asia: Visas, Work Permits & Tax (2026)',
  description:
    'How foreigners legally work in Southeast Asia — work permits vs visas, the four ways to get paid, remote work on a tourist visa, and when you become a local taxpayer. Country guides for Thailand, Vietnam, Indonesia, Malaysia, Singapore and the Philippines.',
  path: '/resources/working-in-southeast-asia',
});

const bodyStyle = { color: 'var(--forest-300)' };
const headingStyle = { color: 'var(--cream)' };
const strong = { color: 'var(--cream)' };

const cardStyle = {
  background: 'var(--forest-800)',
  border: '1px solid var(--forest-700)',
  borderRadius: '4px',
};

const labelStyle = {
  color: 'var(--gold-500)',
};

/** The country-level "working in X" guides, in site order. */
const WORK_GUIDE_SLUGS = [
  'working-in-thailand-as-an-expat',
  'working-in-vietnam-as-an-expat',
  'working-in-indonesia-as-an-expat',
  'working-in-malaysia-as-an-expat',
  'working-in-singapore-as-an-expat',
  'working-in-the-philippines-as-an-expat',
];

const WORK_GUIDES = WORK_GUIDE_SLUGS.map((slug) => {
  const article = ARTICLES.find((a) => a.slug === slug);
  const country = COUNTRIES.find((c) => c.slug === article?.country);
  return { article, country, slug };
}).filter((entry) => entry.article && entry.country);

/** Column headers + rows for the "four ways to earn" table. */
const EARNING_MODELS: string[][] = [
  [
    'Local employment',
    'Yes — employer-sponsored',
    'Local rates, withheld at source',
    'Employer pays; you contribute',
    '1–3 months',
  ],
  [
    'Employer of Record (EOR)',
    'Yes — EOR sponsors it',
    'Local rates, withheld at source',
    'Handled by the EOR',
    '2–6 weeks',
  ],
  [
    'Foreign contractor (paid abroad)',
    'Usually none available',
    'Depends on residency + remittance',
    'None — you self-fund',
    'Immediate',
  ],
  [
    'Own local company',
    'Yes — your company sponsors it',
    'Corporate + personal, both local',
    'You register and pay both sides',
    '2–6 months',
  ],
];

/** Per-country reality check on remote work while on a tourist entry. */
const REMOTE_ON_TOURIST: { country: string; flag: string; status: string; detail: string }[] = [
  {
    country: 'Malaysia',
    flag: '🇲🇾',
    status: 'Formal route exists',
    detail:
      'The DE Rantau Digital Nomad Pass is purpose-built for remote workers with foreign clients — the cleanest legal path in the region.',
  },
  {
    country: 'Thailand',
    flag: '🇹🇭',
    status: 'Formal route at high income',
    detail:
      'The LTR Work-from-Thailand Professional visa covers remote employees of foreign companies but sets a high income bar. Below that, most nomads use tourist entries — tolerated in practice, not authorised in writing.',
  },
  {
    country: 'Indonesia',
    flag: '🇮🇩',
    status: 'Long-stay route, not a work route',
    detail:
      'The Second Home Visa (E33G) grants residence, not work rights, and requires substantial funds. The B211A social visa is the common short-stay workaround.',
  },
  {
    country: 'Vietnam',
    flag: '🇻🇳',
    status: 'No formal route',
    detail:
      'No digital nomad visa exists. Remote workers use the 90-day e-visa and renew. Working for a Vietnamese entity without a work permit is clearly prohibited; foreign-sourced remote work sits in a grey zone.',
  },
  {
    country: 'Philippines',
    flag: '🇵🇭',
    status: 'No formal route',
    detail:
      'No digital nomad visa. Tourist visas extend in increments up to roughly two years, which is why long-stay remote workers favour it — but it confers no work rights.',
  },
  {
    country: 'Singapore',
    flag: '🇸🇬',
    status: 'No route, and none coming',
    detail:
      'No digital nomad visa, and policy is moving the opposite way — tightening work passes toward higher-earning, employer-sponsored talent. Short-term visit passes confer no work rights, and the cost of living makes it an unusual base regardless. The upside for those who do get sponsored: territorial taxation, no capital gains tax, and no CPF for foreigners.',
  },
];

/** Child pages in this pillar cluster. */
const CHILD_PAGES: { icon: string; title: string; description: string; href: string }[] = [
  {
    icon: '📄',
    title: 'Work Permit Requirements by Country',
    description:
      'Sponsoring documents, timelines, quotas and ratios, renewal lead times, and what changing employer really costs you.',
    href: '/resources/working-in-southeast-asia/work-permits',
  },
  {
    icon: '🏢',
    title: 'Employer of Record',
    description:
      'EOR vs local entity vs contractor — total cost of employment, the misclassification trap, and what an EOR cannot do.',
    href: '/resources/working-in-southeast-asia/employer-of-record',
  },
  {
    icon: '💸',
    title: 'Getting Paid From Abroad',
    description:
      'FX spreads, when remittance triggers tax, transfer routes compared, and the paper trail your bank will eventually ask for.',
    href: '/resources/working-in-southeast-asia/getting-paid-abroad',
  },
  {
    icon: '🧾',
    title: 'Tax Residency for Nomads',
    description:
      'The day-count tests, worldwide vs territorial vs remittance taxation, and whether residency is cheaper at your income.',
    href: '/resources/digital-nomad/tax-residency',
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: 'Do I need a work permit to work remotely in Southeast Asia?',
    a: 'If your employer or clients are all outside the country and you are paid abroad, most Southeast Asian work-permit regimes were not written with you in mind — they regulate working for a local employer. That is not the same as explicit permission. Malaysia (DE Rantau) and Thailand (LTR Work-from-Thailand Professional) are the two countries with a formal remote-work visa. Everywhere else, remote work on a tourist entry is common but legally unsettled.',
  },
  {
    q: 'What is the difference between a visa and a work permit?',
    a: 'A visa controls entry and how long you may stay. A work permit controls what you may do while there. In Thailand, Vietnam, Indonesia and the Philippines these are separate documents issued by different agencies, and you generally need both to hold a local job. Malaysia bundles them into a single Employment Pass.',
  },
  {
    q: 'When do I become a tax resident in Southeast Asia?',
    a: 'Every country in the region uses a day-count test, generally 180 or 183 days of physical presence in a tax year. Crossing it usually switches you from a flat non-resident withholding rate to progressive resident rates with deductions and allowances — which can raise or lower your bill depending on income level. Each of our calculators has an expat toggle that applies the non-resident rules.',
  },
  {
    q: 'Can I be paid in USD while living in Southeast Asia?',
    a: 'Yes, and most remote workers are. What matters for tax is your residency status and, in some countries, whether and when you remit the money locally. Currency also affects your real purchasing power — every calculator on this site accepts USD, EUR or GBP input and converts at live rates.',
  },
  {
    q: 'Which Southeast Asian country is easiest for foreigners to work in?',
    a: 'Malaysia and Singapore have the most predictable, document-driven processes. Thailand and Vietnam are workable but paperwork-heavy and depend on employer sponsorship. Indonesia is the most restrictive for direct employment, with sector and quota limits on foreign hires.',
  },
];

export default function WorkingInSoutheastAsiaPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Working in Southeast Asia',
    description:
      'Work permits, visas, employment structures and tax obligations for foreigners working in Southeast Asia.',
    url: `${BASE_URL}/resources/working-in-southeast-asia`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: WORK_GUIDES.map((entry, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: entry.article!.title,
        url: `${BASE_URL}/resources/guides/${entry.slug}`,
      })),
    },
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
  ]);

  return (
    <div className="max-w-3xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
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
        <Link href="/resources" className="text-sm nav-link">
          ← Resources
        </Link>
      </div>

      <p className="text-[10px] font-bold uppercase tracking-[3px] mb-2" style={labelStyle}>
        Pillar Guide · 2026
      </p>
      <h1 className="text-2xl font-bold mb-3" style={headingStyle}>
        Working in Southeast Asia: Visas, Work Permits &amp; Tax
      </h1>

      <p className="leading-relaxed mb-4" style={bodyStyle}>
        Southeast Asia is easy to <em>live</em> in and surprisingly bureaucratic to{' '}
        <em>work</em> in. The region&apos;s immigration systems were built to regulate foreigners
        taking local jobs, not foreigners sitting in a café earning from Berlin or San Francisco —
        which is why the rules feel ambiguous the moment you stop being a tourist and start being
        a remote worker.
      </p>
      <p className="leading-relaxed mb-8" style={bodyStyle}>
        This page maps the whole picture: the visa/work-permit split, the four legal ways to get
        paid, where remote work actually stands country by country, and the day-count that turns
        you into a local taxpayer. Then it hands off to the country-specific guides and to the{' '}
        <Link href="/" className="nav-link">take-home pay calculators</Link>.
      </p>

      <section className="mb-10">
        <h2 className="text-[10px] font-bold uppercase tracking-[3px] mb-4" style={labelStyle}>
          In This Guide
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {CHILD_PAGES.map((page) => (
            <Link key={page.href} href={page.href} className="block p-5 transition-all" style={cardStyle}>
              <span className="text-2xl">{page.icon}</span>
              <h3 className="text-base font-semibold mt-2 mb-2 leading-snug" style={headingStyle}>
                {page.title}
              </h3>
              <p className="text-sm leading-relaxed" style={bodyStyle}>{page.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3" style={headingStyle}>
          The distinction everyone gets wrong: visa ≠ work permit
        </h2>
        <p className="leading-relaxed mb-4" style={bodyStyle}>
          In most of the region these are <strong style={strong}>two separate documents from two
          separate agencies</strong>, and holding one does not imply the other.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 mb-4">
          <div className="p-5" style={cardStyle}>
            <p className="text-[10px] font-bold uppercase tracking-[2px] mb-2" style={labelStyle}>
              Visa / Pass
            </p>
            <p className="text-sm leading-relaxed" style={bodyStyle}>
              Issued by immigration. Governs <strong style={strong}>entry and length of stay</strong>.
              Says nothing about whether you may earn money.
            </p>
          </div>
          <div className="p-5" style={cardStyle}>
            <p className="text-[10px] font-bold uppercase tracking-[2px] mb-2" style={labelStyle}>
              Work Permit
            </p>
            <p className="text-sm leading-relaxed" style={bodyStyle}>
              Issued by the labour ministry, usually{' '}
              <strong style={strong}>tied to one named employer and job title</strong>. Change
              employer and it typically must be reissued.
            </p>
          </div>
        </div>
        <p className="leading-relaxed" style={bodyStyle}>
          <strong style={strong}>The exception:</strong> Malaysia bundles both into a single
          Employment Pass. Thailand, Vietnam, Indonesia and the Philippines keep them separate —
          in Thailand you need a Non-Immigrant B visa <em>and</em> a work permit; in Vietnam a work
          permit <em>and</em> a Temporary Residence Card. Full document lists per country are in
          the <Link href="/resources/visas" className="nav-link">visa guide by country</Link>.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3" style={headingStyle}>
          Four ways to legally earn money here
        </h2>
        <p className="leading-relaxed mb-4" style={bodyStyle}>
          Almost every arrangement reduces to one of these. Your choice determines your tax
          exposure far more than which country you pick.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--forest-700)' }}>
                <th className="py-2 pr-4 font-semibold" style={headingStyle}>Structure</th>
                <th className="py-2 pr-4 font-semibold" style={headingStyle}>Work permit?</th>
                <th className="py-2 pr-4 font-semibold" style={headingStyle}>Income tax</th>
                <th className="py-2 pr-4 font-semibold" style={headingStyle}>Social contributions</th>
                <th className="py-2 font-semibold" style={headingStyle}>Typical setup</th>
              </tr>
            </thead>
            <tbody style={bodyStyle}>
              {EARNING_MODELS.map((row) => (
                <tr key={row[0]} style={{ borderBottom: '1px solid var(--forest-700)' }}>
                  <td className="py-2 pr-4 font-medium" style={strong}>{row[0]}</td>
                  {row.slice(1).map((cell, i) => (
                    <td key={i} className="py-2 pr-4">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 leading-relaxed" style={bodyStyle}>
          The gap most people miss: under local employment or an EOR, your employer&apos;s social
          contributions are <em>real money</em> that never appears on your payslip, while your own
          contributions come straight out of gross pay. That is exactly what our calculators
          itemise — see the{' '}
          <Link href="/thailand" className="nav-link">Thailand take-home breakdown</Link> or{' '}
          <Link href="/vietnam" className="nav-link">Vietnam net salary calculator</Link> for the
          split between income tax and mandatory contributions.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3" style={headingStyle}>
          Can you legally work remotely on a tourist visa?
        </h2>
        <p className="leading-relaxed mb-4" style={bodyStyle}>
          The honest answer for most of the region is <strong style={strong}>&ldquo;not
          explicitly, but it is widely tolerated&rdquo;</strong> — and tolerance is not a legal
          status. Here is where each country actually stands.
        </p>
        <div className="space-y-4">
          {REMOTE_ON_TOURIST.map((entry) => (
            <div key={entry.country} className="p-5" style={cardStyle}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{entry.flag}</span>
                <span className="font-semibold" style={strong}>{entry.country}</span>
                <span
                  className="ml-auto text-[10px] font-bold uppercase tracking-wide rounded-[2px] px-2 py-0.5"
                  style={{ background: 'var(--forest-700)', color: 'var(--gold-500)' }}
                >
                  {entry.status}
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={bodyStyle}>{entry.detail}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 leading-relaxed" style={bodyStyle}>
          Compare every option side by side in the{' '}
          <Link href="/resources/visas" className="nav-link">
            Southeast Asia visa comparison
          </Link>
          , or read the{' '}
          <Link href="/resources/digital-nomad" className="nav-link">
            digital nomad guide to Southeast Asia
          </Link>{' '}
          for the lifestyle side — internet, coworking and cost.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3" style={headingStyle}>
          When you become a local taxpayer
        </h2>
        <p className="leading-relaxed mb-4" style={bodyStyle}>
          Immigration status and tax status are decided separately. You can be perfectly legal on
          a visa and still owe income tax — or be on a tourist entry and cross a residency
          threshold without realising it. Every country in the region uses a{' '}
          <strong style={strong}>day-count test of 180 or 183 days</strong> of physical presence
          in a tax year.
        </p>
        <p className="leading-relaxed mb-4" style={bodyStyle}>
          Crossing it flips you from a flat non-resident withholding rate to progressive resident
          rates with deductions and allowances. Counter-intuitively, becoming a{' '}
          <em>resident</em> often <em>lowers</em> your bill at modest incomes, because
          non-resident flat rates apply from the first unit of income with no allowances.
        </p>
        <div className="p-5 mb-4" style={cardStyle}>
          <p className="text-[10px] font-bold uppercase tracking-[2px] mb-2" style={labelStyle}>
            Test it against your own number
          </p>
          <p className="text-sm leading-relaxed" style={bodyStyle}>
            Open any calculator, enter your salary, and toggle expat/non-resident mode on and off.
            The effective-rate line shows you exactly where the crossover sits for your income —{' '}
            <Link href="/compare" className="nav-link">
              compare all six countries at your salary
            </Link>
            .
          </p>
        </div>
        <p className="leading-relaxed" style={bodyStyle}>
          Non-resident treatment varies more than people expect: the Philippines applies 25%,
          Vietnam and Indonesia 20%, Malaysia 30%, while Thailand applies the ordinary progressive
          rates but strips the deductions. Each country page documents its own rule under{' '}
          <strong style={strong}>Tax Info → Expat rules</strong>.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-[10px] font-bold uppercase tracking-[3px] mb-4" style={labelStyle}>
          Country Guides
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {WORK_GUIDES.map(({ article, country, slug }) => (
            <Link
              key={slug}
              href={`/resources/guides/${slug}`}
              className="block p-5 transition-all"
              style={cardStyle}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{country!.flag}</span>
                <span
                  className="text-[10px] font-bold uppercase tracking-[2px]"
                  style={{ color: 'var(--forest-400)' }}
                >
                  {country!.name}
                </span>
              </div>
              <h3 className="text-base font-semibold mb-2 leading-snug" style={headingStyle}>
                {article!.title}
              </h3>
              <p className="text-sm leading-relaxed line-clamp-3" style={bodyStyle}>
                {article!.description}
              </p>
              <span className="mt-3 inline-block text-sm font-medium" style={labelStyle}>
                Read guide →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3" style={headingStyle}>
          Before you move
        </h2>
        <ul className="list-disc list-outside ml-5 space-y-2 leading-relaxed" style={bodyStyle}>
          <li>
            <strong style={strong}>Model the money first.</strong>{' '}
            <Link href="/compare" className="nav-link">Compare net take-home across all six countries</Link>{' '}
            at the salary you actually expect — headline tax rates mislead badly once
            contributions and allowances are included.
          </li>
          <li>
            <strong style={strong}>Check the real cost base.</strong> The{' '}
            <Link href="/resources/cost-of-living" className="nav-link">cost of living comparison</Link>{' '}
            puts monthly essentials side by side in USD.
          </li>
          <li>
            <strong style={strong}>Sort banking early.</strong> Most countries require a visa or
            work permit before opening a local account — see the{' '}
            <Link href="/resources/banking" className="nav-link">banking guide for foreigners</Link>.
          </li>
          <li>
            <strong style={strong}>Budget for health cover.</strong> Some work passes require
            proof of insurance; see the{' '}
            <Link href="/resources/health-insurance" className="nav-link">health insurance requirements by country</Link>.
          </li>
          <li>
            <strong style={strong}>Work the checklist.</strong> The{' '}
            <Link href="/resources/relocation" className="nav-link">country relocation checklists</Link>{' '}
            sequence visa, housing, SIM, banking and tax registration in the right order.
          </li>
        </ul>
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
