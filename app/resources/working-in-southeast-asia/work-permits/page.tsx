import Link from 'next/link';
import { BASE_URL, breadcrumbList, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Work Permit Requirements in Southeast Asia by Country (2026)',
  description:
    'What it takes to get a work permit in Thailand, Vietnam, Indonesia, Malaysia, Singapore and the Philippines — sponsoring documents, timelines, quotas and ratios, renewal lead times, and what happens when you change employer.',
  path: '/resources/working-in-southeast-asia/work-permits',
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

interface PermitCountry {
  flag: string;
  country: string;
  slug: string;
  documents: string;
  permitAndVisa: string;
  constraints: string;
  renewal: string;
}

const PERMITS: PermitCountry[] = [
  {
    flag: '🇹🇭',
    country: 'Thailand',
    slug: 'thailand',
    permitAndVisa:
      'Two separate documents: a Non-Immigrant B visa from immigration, and a work permit from the Department of Employment. You need both, obtained in that order.',
    constraints:
      'The sponsoring Thai company generally faces registered capital requirements and a ratio of Thai employees per foreign work permit. This ratio, not the paperwork, is what stops small foreign employers hiring directly.',
    documents:
      'Degree certificates and transcripts, professional references, passport, medical certificate, company registration documents, financial statements and tax filings from the sponsor.',
    renewal:
      'Tied to the employment and typically renewed annually alongside the visa extension. The 90-day reporting obligation runs separately and independently of the permit.',
  },
  {
    flag: '🇻🇳',
    country: 'Vietnam',
    slug: 'vietnam',
    permitAndVisa:
      'Work permit from the labour authority, then a Temporary Residence Card issued on its strength. The TRC is what makes settled life practical; when the permit lapses, its basis lapses with it.',
    constraints:
      'The permit is tied to a specific employer, position and work location. Employers must justify the foreign hire, and roles generally need to meet experience or qualification criteria.',
    documents:
      'Criminal record check (both home country and Vietnam where applicable), health certificate from an approved facility, degree certificates, experience confirmation letters — all legalised and translated.',
    renewal:
      'Permits typically run up to two years with renewal available. Supporting documents have their own validity windows, so a criminal record check obtained too early expires mid-process and one obtained too late delays everything.',
  },
  {
    flag: '🇮🇩',
    country: 'Indonesia',
    slug: 'indonesia',
    permitAndVisa:
      'Work authorisation obtained by the employer through the Ministry of Manpower (RPTKA/IMTA), then a KITAS limited-stay permit from Imigrasi issued on its strength.',
    constraints:
      'The most restrictive of the six. Authorisation is position-specific, sector and quota limits apply, a foreign-worker levy is payable, and certain roles are closed to foreigners entirely. There is no self-sponsored route.',
    documents:
      'Employer sponsorship documents, degree certificates, experience letters, position justification, passport validity well beyond the intended stay.',
    renewal:
      'KITAS typically runs six or twelve months. Start at least 60 days out — multiple agencies in sequence, driven by your sponsor. After qualifying continuous residence, KITAP conversion cuts the renewal burden substantially.',
  },
  {
    flag: '🇲🇾',
    country: 'Malaysia',
    slug: 'malaysia',
    permitAndVisa:
      'Bundled. A single Employment Pass covers both work authorisation and residence — one of only two countries here that does not split them, Singapore being the other.',
    constraints:
      'Issued in categories by salary band, with duration and dependant rights differing by category. Most professional applications route through the Expatriate Services Division. Process is document-driven rather than discretionary.',
    documents:
      'Degree certificates, employment contract meeting the salary threshold for the category, company registration and ESD registration, passport.',
    renewal:
      'Employer-driven; start at least 90 days before expiry. Higher categories are generally smoother. The DE Rantau pass is a separate route for remote workers with foreign clients.',
  },
  {
    flag: '🇵🇭',
    country: 'Philippines',
    slug: 'philippines',
    permitAndVisa:
      'An Alien Employment Permit from the Department of Labor and Employment, plus a 9(g) pre-arranged employment visa from the Bureau of Immigration. Both employer-sponsored.',
    constraints:
      'The employer must generally demonstrate that no qualified Filipino is available for the position. Certain professions are reserved for Filipino citizens under constitutional and statutory restrictions.',
    documents:
      'Employment contract, AEP application with employer support, degree and professional credentials, passport, and an ACR I-Card once issued.',
    renewal:
      '9(g) visas typically run one to three years. Run the DOLE and BI processes in parallel rather than sequentially — running them in series is the usual cause of overruns. The annual report to BI is a separate obligation every January–February.',
  },
  {
    flag: '🇸🇬',
    country: 'Singapore',
    slug: 'singapore',
    permitAndVisa:
      'Bundled, like Malaysia. A single pass — Employment Pass, S Pass or ONE Pass — covers both work authorisation and residence. There is no self-sponsored route: an employer must apply before you arrive.',
    constraints:
      'The Employment Pass is assessed under the points-based COMPASS framework, which scores your salary against sector benchmarks *and* your employer’s workforce diversity and local hiring record — so your application depends partly on the company, not just on you. Qualifying salaries rise with age and are higher in financial services. S Pass adds a company quota and a monthly levy.',
    documents:
      'Degree certificates, employment contract meeting the category threshold, employer’s company registration and COMPASS declarations, passport.',
    renewal:
      'Employer-driven; start well before expiry. The ONE Pass (5 years) is not tied to one employer and permits concurrent roles; the Personalised Employment Pass is employer-independent but non-renewable. Before leaving, your employer must file Form IR21 for tax clearance and will withhold your final pay until IRAS issues it.',
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: 'Do I need a work permit to work remotely in Southeast Asia for a foreign employer?',
    a: 'Most work-permit regimes in the region were written to regulate working for a local employer, so a remote worker with only foreign clients often falls outside them in practice — but that is not the same as permission. Malaysia (DE Rantau) and Thailand (LTR Work-from-Thailand Professional) are the two countries with a formal remote-work route. Elsewhere, remote work on a tourist entry is common and legally unsettled.',
  },
  {
    q: 'How long does a work permit take in Southeast Asia?',
    a: 'Plan on one to three months from a standing start for employer-sponsored routes, with Malaysia at the faster and more predictable end and Indonesia at the slower. Most of that time is document preparation — legalisation, translation, criminal record checks and health certificates — rather than agency processing.',
  },
  {
    q: 'Can I transfer my work permit to a new employer?',
    a: 'Generally no. Across Thailand, Vietnam, Indonesia and the Philippines, permits are tied to a specific employer and often a specific position and location, so changing jobs means a new permit rather than a transfer. Build the lead time into any job move — the gap between leaving one employer and having a new permit issued is a genuine status gap.',
  },
  {
    q: 'Which Southeast Asian country is easiest to get a work permit in?',
    a: 'Malaysia and Singapore are the most predictable — both bundle work authorisation and residence into a single pass, issue in defined categories by salary band, and run document-driven rather than discretionary processes. Malaysia has the lower bar; Singapore is more selective because COMPASS scores your employer as well as you. Indonesia is the most restrictive, with position-specific authorisation, sector and quota limits, and a foreign-worker levy.',
  },
  {
    q: 'Does a work permit make me a tax resident?',
    a: 'No — they are decided separately by different authorities. Tax residency turns on a day-count test of 180 to 183 days, not on your permit. You can hold a valid work permit without being a tax resident, and you can become a tax resident with no permit at all.',
  },
];

export default function WorkPermitsPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Work Permit Requirements in Southeast Asia by Country',
    description:
      'Sponsoring documents, timelines, quotas and renewal lead times for work permits across Southeast Asia.',
    datePublished: '2026-08-07',
    author: { '@type': 'Organization', name: 'SEA Tax Calculator' },
    publisher: { '@type': 'Organization', name: 'SEA Tax Calculator' },
    url: `${BASE_URL}/resources/working-in-southeast-asia/work-permits`,
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
    { name: 'Work Permits', path: '/resources/working-in-southeast-asia/work-permits' },
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
        Work Permits · 2026
      </p>
      <h1 className="text-2xl font-bold mb-3" style={headingStyle}>
        Work Permit Requirements in Southeast Asia
      </h1>

      <p className="leading-relaxed mb-4" style={bodyStyle}>
        Four of the six countries here treat your <strong style={strong}>visa</strong> and your{' '}
        <strong style={strong}>right to work</strong> as separate documents from separate
        agencies. Malaysia is the exception. Everything below follows from that split.
      </p>
      <p className="leading-relaxed mb-8" style={bodyStyle}>
        The other structural fact: with narrow exceptions, permits are{' '}
        <strong style={strong}>employer-sponsored</strong>. You cannot apply for one yourself, and
        changing jobs means a new permit rather than a transfer.
      </p>

      <section className="mb-10">
        <div className="space-y-6">
          {PERMITS.map((entry) => (
            <div key={entry.slug} className="p-5" style={cardStyle}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{entry.flag}</span>
                <h2 className="text-lg font-bold" style={headingStyle}>{entry.country}</h2>
              </div>
              <dl className="space-y-3 text-sm leading-relaxed" style={bodyStyle}>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-[2px] mb-1" style={labelStyle}>
                    Structure
                  </dt>
                  <dd>{entry.permitAndVisa}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-[2px] mb-1" style={labelStyle}>
                    Constraints
                  </dt>
                  <dd>{entry.constraints}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-[2px] mb-1" style={labelStyle}>
                    Typical documents
                  </dt>
                  <dd>{entry.documents}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-[2px] mb-1" style={labelStyle}>
                    Renewal
                  </dt>
                  <dd>{entry.renewal}</dd>
                </div>
              </dl>
              <p className="mt-4 text-sm">
                <Link href={`/resources/visas/${entry.slug}`} className="nav-link">
                  All {entry.country} visa categories →
                </Link>
                {'  ·  '}
                <Link href={`/${entry.slug}`} className="nav-link">
                  {entry.country} take-home pay calculator →
                </Link>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3" style={headingStyle}>
          What actually causes delays
        </h2>
        <p className="leading-relaxed mb-4" style={bodyStyle}>
          Almost never the agency. Nearly always the documents:
        </p>
        <ul className="list-disc list-outside ml-5 space-y-2 leading-relaxed" style={bodyStyle}>
          <li>
            <strong style={strong}>Legalisation and apostille.</strong> Degree certificates and
            criminal record checks usually need authentication in the issuing country before they
            are accepted. This is done from abroad and is slow — start it before you start
            anything else.
          </li>
          <li>
            <strong style={strong}>Validity windows.</strong> Criminal record checks and health
            certificates expire. Obtain them too early and they lapse mid-process; too late and
            everything else waits on them. Sequence them deliberately.
          </li>
          <li>
            <strong style={strong}>Certified translation.</strong> Documents generally need
            translation by an approved translator, not any translator.
          </li>
          <li>
            <strong style={strong}>Sponsor-side paperwork.</strong> Company registration, tax
            filings and financial statements sit with your employer, whose urgency is not yours.
          </li>
          <li>
            <strong style={strong}>Sequential processing.</strong> Where two agencies are involved
            — DOLE and BI in the Philippines, labour and immigration in Vietnam — running them in
            series rather than parallel adds weeks.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3" style={headingStyle}>
          If you have no sponsoring employer
        </h2>
        <p className="leading-relaxed mb-4" style={bodyStyle}>
          Three realistic routes exist, and it is worth being honest that none is frictionless:
        </p>
        <ul className="list-disc list-outside ml-5 space-y-2 leading-relaxed" style={bodyStyle}>
          <li>
            <strong style={strong}>An Employer of Record</strong> sponsors the permit as the legal
            employer while you work for the company that actually engaged you —{' '}
            <Link href="/resources/working-in-southeast-asia/employer-of-record" className="nav-link">
              how EOR arrangements work
            </Link>
            .
          </li>
          <li>
            <strong style={strong}>Your own local company</strong> sponsors you, at the cost of
            local capital requirements, employee ratios, accounting and audit.
          </li>
          <li>
            <strong style={strong}>A dedicated remote-work visa</strong> — Malaysia&apos;s DE Rantau
            or Thailand&apos;s LTR — where you qualify. These are the only routes in the region that
            sanction remote work without a local sponsor.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3" style={headingStyle}>Related</h2>
        <p className="leading-relaxed" style={bodyStyle}>
          <Link href="/resources/visas" className="nav-link">Visa options by country</Link>{' '}
          ·{' '}
          <Link href="/resources/digital-nomad/tax-residency" className="nav-link">
            tax residency rules
          </Link>{' '}
          ·{' '}
          <Link href="/resources/relocation" className="nav-link">relocation checklists</Link>{' '}
          ·{' '}
          <Link href="/compare" className="nav-link">compare net salary across countries</Link>
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
