import type { Metadata } from 'next';
import Link from 'next/link';
import { COUNTRIES } from '@/lib/countries';

const BASE_URL = 'https://rafseb.github.io/seatax';

const TITLE = 'Southeast Asia Tax Calculator 2026 — Take-Home Salary for Philippines, Thailand, Vietnam, Indonesia, Malaysia & Singapore';
const DESCRIPTION =
  'Free 2026 income tax calculator for Southeast Asia. See your net take-home salary after income tax and mandatory contributions in the Philippines, Thailand, Vietnam, Indonesia, Malaysia and Singapore — with expat rates, currency conversion, and side-by-side country comparison.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: `${BASE_URL}/`,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Southeast Asia Tax Calculator 2026',
    description: DESCRIPTION,
  },
};

const COUNTRY_BLURBS: Record<string, string> = {
  philippines: 'TRAIN Law brackets 0%–35%, SSS, PhilHealth & Pag-IBIG contributions.',
  thailand: 'PIT rates 0%–35% with the 50% standard deduction and Social Security Fund.',
  vietnam: '2026 PIT law: five monthly brackets 5%–35%, plus SI, HI & UI insurance.',
  indonesia: 'PPh 21 brackets 5%–35%, PTKP threshold and BPJS contributions.',
  malaysia: 'YA 2026 rates 0%–30% with EPF, SOCSO & EIS contributions.',
  singapore: 'Resident rates 0%–24%, territorial system, and no CPF for foreigners.',
};

const FAQ: { q: string; a: string }[] = [
  {
    q: 'Which Southeast Asian country has the lowest income tax?',
    a: 'It depends on your salary level and on what kind of income you have. At lower incomes the Philippines (tax-free up to ₱250,000/year), Malaysia (near-zero tax below RM35,000 chargeable income) and Singapore (0% on the first S$20,000) are very light. At higher incomes Singapore tops out at 24% and Malaysia at 30%, while the Philippines, Thailand and Vietnam reach 35%. Singapore and Malaysia also treat foreign-source income far more favourably, and Singapore has no capital gains tax. Use the compare tool to see all six countries side by side at your exact salary.',
  },
  {
    q: 'How is take-home salary calculated in this tool?',
    a: 'For each country we start from your gross salary, deduct the mandatory employee contributions (social security, health insurance, pension funds), apply the country’s official deductions and allowances, then apply the progressive income tax brackets. The result is your net monthly and annual take-home pay plus your effective tax rate.',
  },
  {
    q: 'Are the tax rates up to date for 2026?',
    a: 'Yes. All six calculators use 2026 rules: the Philippine TRAIN Law schedule, Thailand’s PIT rates with the ฿17,500 SSF ceiling, Vietnam’s amended five-bracket PIT law with the ₫15,500,000 personal deduction, Indonesia’s PPh 21 brackets, Malaysia’s YA 2026 rates, and Singapore’s YA 2026 resident brackets with the S$8,000/month CPF Ordinary Wage ceiling.',
  },
  {
    q: 'How are expats and foreigners taxed in Southeast Asia?',
    a: 'Every country distinguishes tax residents from non-residents, usually by a 180–183 day presence test. Non-residents typically pay a flat rate: 25% in the Philippines, 20% in Vietnam and Indonesia, and 30% in Malaysia. Thailand applies the same progressive rates without deductions, and Singapore charges the higher of a flat 15% or the resident rates. Singapore is also the one country where foreigners pay no mandatory contributions at all — CPF is confined to Citizens and Permanent Residents. Each calculator has an expat mode that applies the non-resident rules.',
  },
  {
    q: 'Can I see my salary in USD, EUR, or GBP?',
    a: 'Yes. Each calculator lets you enter your salary in USD, EUR, or GBP and converts it to local currency using live exchange rates, so remote workers paid in foreign currency can see their real local take-home pay.',
  },
];

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const cardStyle = {
  background: 'var(--forest-800)',
  border: '1px solid var(--forest-700)',
  borderRadius: '4px',
};

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      <div className="mb-10">
        <p className="text-[10px] font-bold uppercase tracking-[3px] mb-2" style={{ color: 'var(--gold-500)' }}>
          Free · No Sign-Up · 2026 Tax Rates
        </p>
        <h1 className="text-3xl font-bold mb-3 leading-tight" style={{ color: 'var(--cream)' }}>
          Southeast Asia Income Tax &amp; Take-Home Salary Calculator
        </h1>
        <p className="leading-relaxed max-w-2xl" style={{ color: 'var(--forest-300)' }}>
          Find out exactly what lands in your bank account after income tax and mandatory
          contributions in the Philippines, Thailand, Vietnam, Indonesia, Malaysia and Singapore.
          Built for locals, expats, and remote workers — with non-resident tax modes,
          live USD/EUR/GBP conversion, and side-by-side country comparison using official
          2026 tax rules.
        </p>
      </div>

      <section className="mb-10">
        <h2 className="text-[10px] font-bold uppercase tracking-[3px] mb-4" style={{ color: 'var(--gold-500)' }}>
          Pick Your Country
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {COUNTRIES.map((country) => (
            <Link
              key={country.slug}
              href={`/${country.slug}`}
              className="block p-5 transition-all"
              style={cardStyle}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{country.flag}</span>
                <span className="text-base font-semibold" style={{ color: 'var(--cream)' }}>
                  {country.name} Tax Calculator
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--forest-300)' }}>
                {COUNTRY_BLURBS[country.slug]}
              </p>
              <span className="mt-3 inline-block text-sm font-medium" style={{ color: 'var(--gold-500)' }}>
                Calculate take-home pay →
              </span>
            </Link>
          ))}
          <Link href="/compare" className="block p-5 transition-all" style={cardStyle}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">⚖️</span>
              <span className="text-base font-semibold" style={{ color: 'var(--cream)' }}>
                Compare Countries
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--forest-300)' }}>
              Same salary, six tax systems — see where your take-home pay goes furthest.
            </p>
            <span className="mt-3 inline-block text-sm font-medium" style={{ color: 'var(--gold-500)' }}>
              Compare side by side →
            </span>
          </Link>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-[10px] font-bold uppercase tracking-[3px] mb-4" style={{ color: 'var(--gold-500)' }}>
          How It Works
        </h2>
        <ol className="space-y-3 text-sm leading-relaxed" style={{ color: 'var(--forest-200)' }}>
          <li>
            <strong style={{ color: 'var(--cream)' }}>1. Enter your salary</strong> — monthly or annual,
            in local currency or USD/EUR/GBP.
          </li>
          <li>
            <strong style={{ color: 'var(--cream)' }}>2. Set your situation</strong> — resident or expat,
            marital status and dependents where they affect the calculation.
          </li>
          <li>
            <strong style={{ color: 'var(--cream)' }}>3. See the full breakdown</strong> — income tax,
            every mandatory contribution, effective tax rate, and your net take-home pay. Share any
            scenario with a single link.
          </li>
        </ol>
      </section>

      <section className="mb-10">
        <h2 className="text-[10px] font-bold uppercase tracking-[3px] mb-4" style={{ color: 'var(--gold-500)' }}>
          Moving to Southeast Asia?
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/resources" className="block p-5 transition-all" style={cardStyle}>
            <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--cream)' }}>
              🧭 Expat Resource Hub
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--forest-300)' }}>
              Visa options, cost of living, banking, health insurance, and relocation checklists
              for all six countries.
            </p>
          </Link>
          <Link href="/resources/guides" className="block p-5 transition-all" style={cardStyle}>
            <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--cream)' }}>
              📚 Country Tax Guides
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--forest-300)' }}>
              In-depth guides to working, paying tax, and living well as an expat or digital nomad
              in each country.
            </p>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--cream)' }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-2">
          {FAQ.map(({ q, a }) => (
            <details key={q} className="group rounded-lg" style={{ background: 'var(--forest-800)', border: '1px solid var(--forest-700)' }}>
              <summary className="flex cursor-pointer items-start justify-between gap-4 px-4 py-3 text-sm font-medium list-none" style={{ color: 'var(--cream)' }}>
                <span>{q}</span>
                <span className="mt-0.5 shrink-0 group-open:rotate-180 transition-transform" style={{ color: 'var(--forest-400)' }}>
                  ▾
                </span>
              </summary>
              <div className="px-4 pb-4 pt-1 text-sm leading-relaxed" style={{ color: 'var(--forest-200)', borderTop: '1px solid var(--forest-700)' }}>{a}</div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
