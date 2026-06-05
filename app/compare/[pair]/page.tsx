import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getCountry } from '@/lib/countries';
import { getCostData } from '@/lib/resources/costData';
import { getVisaData } from '@/lib/resources/visaData';
import type { CostCategory } from '@/lib/resources/types';
import {
  CANONICAL_PAIR_SLUGS,
  parsePair,
  getComparison,
  cheaperCountry,
  easierNomadCountry,
  monthlyBasketUSD,
} from '@/lib/comparisons';
import CompareView from '@/components/CompareView';

const BASE_URL = 'https://rafseb.github.io/seatax';

interface Props {
  params: Promise<{ pair: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return CANONICAL_PAIR_SLUGS.map((pair) => ({ pair }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pair } = await params;
  const parsed = parsePair(pair);
  if (!parsed) return {};
  const [aSlug, bSlug] = parsed;
  const a = getCountry(aSlug);
  const b = getCountry(bSlug);
  if (!a || !b) return {};
  const title = `${a.name} vs ${b.name}: Income Tax & Cost of Living Compared (2025)`;
  const description = `Compare ${a.name} and ${b.name} for expats and remote workers: income tax, take-home pay, monthly cost of living, and visa options side by side (2025).`;
  return {
    title,
    description,
    openGraph: { title, description, url: `/seatax/compare/${pair}` },
    twitter: { card: 'summary', title, description },
    alternates: { canonical: `${BASE_URL}/compare/${pair}` },
  };
}

// Fixed display order for the cost-of-living table.
const COST_ROWS: { category: CostCategory; label: string }[] = [
  { category: 'housing-mid', label: 'Mid-range 1BR apartment' },
  { category: 'meal-cheap', label: 'Cheap local meal' },
  { category: 'meal-mid', label: 'Mid-range restaurant meal' },
  { category: 'internet-monthly', label: 'Home broadband' },
  { category: 'transport-monthly', label: 'Monthly transport' },
  { category: 'coworking-monthly', label: 'Co-working hot desk' },
];

function costFor(slug: string, category: CostCategory): number | null {
  const data = getCostData(slug);
  if (!data) return null;
  const point = data.costs.find((c) => c.category === category);
  return point ? point.usd : null;
}

export default async function ComparePage({ params }: Props) {
  const { pair } = await params;
  const parsed = parsePair(pair);
  if (!parsed) notFound();
  const [aSlug, bSlug] = parsed;
  const a = getCountry(aSlug);
  const b = getCountry(bSlug);
  const content = getComparison(pair);
  if (!a || !b || !content) notFound();

  const costWinnerSlug = cheaperCountry(aSlug, bSlug);
  const nomadWinnerSlug = easierNomadCountry(aSlug, bSlug);
  const basketA = Math.round(monthlyBasketUSD(aSlug));
  const basketB = Math.round(monthlyBasketUSD(bSlug));

  const visaA = (getVisaData(aSlug)?.visas ?? []).filter(
    (v) => v.category === 'employment' || v.category === 'digital-nomad',
  );
  const visaB = (getVisaData(bSlug)?.visas ?? []).filter(
    (v) => v.category === 'employment' || v.category === 'digital-nomad',
  );

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Compare', item: `${BASE_URL}/compare` },
      { '@type': 'ListItem', position: 3, name: `${a.name} vs ${b.name}`, item: `${BASE_URL}/compare/${pair}` },
    ],
  };
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map(({ q, a: ans }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: ans },
    })),
  };

  // Other pairs that involve either country, for cross-linking.
  const relatedPairs = CANONICAL_PAIR_SLUGS.filter((p) => p !== pair && (p.includes(aSlug) || p.includes(bSlug)));

  return (
    <div className="max-w-3xl mx-auto">
      {[breadcrumbLd, faqLd].map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      {/* Hero */}
      <div className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-[3px] mb-2" style={{ color: 'var(--gold-500)' }}>
          Country Comparison
        </p>
        <h1 className="text-2xl font-bold mb-3" style={{ color: 'var(--cream)' }}>
          {a.flag} {a.name} vs {b.flag} {b.name}: Income Tax &amp; Cost of Living (2025)
        </h1>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--forest-300)' }}>{content.intro}</p>
      </div>

      {/* Verdict strip + interactive tax table */}
      <CompareView a={a} b={b} costWinnerSlug={costWinnerSlug} nomadWinnerSlug={nomadWinnerSlug} />

      {/* Cost of living */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--cream)' }}>Cost of Living (monthly, USD)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider" style={{ borderBottom: '1px solid var(--forest-700)', color: 'var(--forest-400)' }}>
                <th className="text-left py-2 pr-3 font-medium">Item</th>
                <th className="text-right py-2 px-3 font-medium">{a.flag} {a.name}</th>
                <th className="text-right py-2 pl-3 font-medium">{b.flag} {b.name}</th>
              </tr>
            </thead>
            <tbody>
              {COST_ROWS.map((row) => {
                const va = costFor(aSlug, row.category);
                const vb = costFor(bSlug, row.category);
                const aCheaper = va !== null && vb !== null && va < vb;
                const bCheaper = va !== null && vb !== null && vb < va;
                return (
                  <tr key={row.category} style={{ borderBottom: '1px solid var(--forest-700)' }}>
                    <td className="py-2.5 pr-3" style={{ color: 'var(--forest-200)' }}>{row.label}</td>
                    <td className="py-2.5 px-3 text-right font-medium" style={{ color: aCheaper ? 'var(--gold-400)' : 'var(--forest-300)' }}>
                      {va === null ? '—' : `$${va}`}
                    </td>
                    <td className="py-2.5 pl-3 text-right font-medium" style={{ color: bCheaper ? 'var(--gold-400)' : 'var(--forest-300)' }}>
                      {vb === null ? '—' : `$${vb}`}
                    </td>
                  </tr>
                );
              })}
              <tr style={{ borderTop: '2px solid var(--forest-700)' }}>
                <td className="py-2.5 pr-3 font-semibold" style={{ color: 'var(--cream)' }}>Basket total</td>
                <td className="py-2.5 px-3 text-right font-semibold" style={{ color: basketA <= basketB ? 'var(--gold-400)' : 'var(--cream)' }}>${basketA}</td>
                <td className="py-2.5 pl-3 text-right font-semibold" style={{ color: basketB <= basketA ? 'var(--gold-400)' : 'var(--cream)' }}>${basketB}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs mt-2" style={{ color: 'var(--forest-400)' }}>
          Basket = mid-range housing + 40 meals + internet + transport + co-working. See the full{' '}
          <Link href="/resources/cost-of-living" className="nav-link underline">cost-of-living comparison</Link>.
        </p>
      </section>

      {/* Visa snapshot */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--cream)' }}>Visa &amp; Residency Snapshot</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[{ c: a, slug: aSlug, visas: visaA }, { c: b, slug: bSlug, visas: visaB }].map(({ c, slug, visas }) => (
            <div key={slug} className="p-4" style={{ background: 'var(--forest-800)', border: '1px solid var(--forest-700)', borderRadius: '4px' }}>
              <h3 className="text-base font-semibold mb-3" style={{ color: 'var(--cream)' }}>{c.flag} {c.name}</h3>
              <ul className="space-y-2">
                {visas.length === 0 ? (
                  <li className="text-sm" style={{ color: 'var(--forest-400)' }}>No work/nomad visa data available.</li>
                ) : (
                  visas.map((v) => (
                    <li key={v.name} className="text-sm" style={{ color: 'var(--forest-200)' }}>
                      <span className="font-medium" style={{ color: 'var(--cream)' }}>{v.name}</span> — {v.maxStay}
                      {v.minIncome ? ` · min income ${v.minIncome}` : ''}
                    </li>
                  ))
                )}
              </ul>
              <Link href={`/resources/visas/${slug}`} className="nav-link mt-3 inline-block text-sm font-medium">
                All {c.name} visas →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--cream)' }}>Frequently Asked Questions</h2>
        <div className="space-y-2">
          {content.faqs.map(({ q, a: ans }) => (
            <details key={q} className="group rounded-lg" style={{ background: 'var(--forest-800)', border: '1px solid var(--forest-700)' }}>
              <summary className="flex cursor-pointer items-start justify-between gap-4 px-4 py-3 text-sm font-medium list-none" style={{ color: 'var(--cream)' }}>
                <span>{q}</span>
                <span className="mt-0.5 shrink-0 group-open:rotate-180 transition-transform" style={{ color: 'var(--forest-400)' }}>▾</span>
              </summary>
              <div className="px-4 pb-4 pt-1 text-sm leading-relaxed" style={{ color: 'var(--forest-200)', borderTop: '1px solid var(--forest-700)' }}>{ans}</div>
            </details>
          ))}
        </div>
      </section>

      {/* Cross-links */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--cream)' }}>Keep Comparing</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {relatedPairs.map((p) => {
            const [x, y] = p.split('-vs-');
            const cx = getCountry(x);
            const cy = getCountry(y);
            return (
              <Link key={p} href={`/compare/${p}`} className="px-3 py-1.5 text-sm rounded-[4px]" style={{ background: 'var(--forest-800)', border: '1px solid var(--forest-700)', color: 'var(--forest-200)' }}>
                {cx?.flag} {cx?.name} vs {cy?.flag} {cy?.name}
              </Link>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href={`/${aSlug}`} className="nav-link font-medium">{a.name} tax calculator →</Link>
          <Link href={`/${bSlug}`} className="nav-link font-medium">{b.name} tax calculator →</Link>
          <Link href="/compare" className="nav-link font-medium">All comparisons →</Link>
        </div>
      </section>
    </div>
  );
}
