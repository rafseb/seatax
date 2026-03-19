import type { Metadata } from 'next';
import Link from 'next/link';
import { COST_DATA } from '@/lib/resources/costData';
import { COUNTRIES } from '@/lib/countries';
import CostComparisonTable from '@/components/CostComparisonTable';

export const metadata: Metadata = {
  title: 'Cost of Living in Southeast Asia — Expat Comparison 2025',
  description:
    'Side-by-side monthly cost estimates for expats and digital nomads across 5 SEA countries. Housing, food, transport, and lifestyle costs in USD.',
  alternates: {
    canonical: 'https://rafseb.github.io/seatax/resources/cost-of-living',
  },
};

export default function CostOfLivingPage() {
  const costCountries = COUNTRIES.filter((c) => COST_DATA.some((d) => d.country === c.slug));

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4">
        <Link href="/resources" className="text-sm nav-link">
          ← Resources
        </Link>
      </div>

      <p className="text-[10px] font-bold uppercase tracking-[3px] mb-2" style={{ color: 'var(--gold-500)' }}>
        Cost of Living
      </p>
      <h1 className="text-2xl font-bold mb-3" style={{ color: 'var(--cream)' }}>Cost of Living in Southeast Asia</h1>

      <p className="leading-relaxed mb-6" style={{ color: 'var(--forest-300)' }}>
        Side-by-side monthly cost estimates for expats and digital nomads across 5 SEA countries.
        All figures are in USD for easy comparison.
      </p>

      <CostComparisonTable data={COST_DATA} countries={costCountries} />

      <div
        className="mt-10 p-5"
        style={{ background: 'var(--forest-700)', border: '1px solid var(--forest-600)', borderRadius: '4px' }}
      >
        <p className="text-sm font-semibold mb-2" style={{ color: 'var(--cream)' }}>
          Compare tax take-home pay across all countries
        </p>
        <p className="text-sm mb-4" style={{ color: 'var(--forest-300)' }}>
          Understanding cost of living is only half the picture. Use our free tax calculator to see
          exactly how much you take home after income tax and mandatory contributions in each country.
        </p>
        <Link
          href="/philippines"
          className="inline-block text-sm font-semibold px-4 py-2 rounded-sm transition-colors"
          style={{ background: 'var(--gold-500)', color: 'var(--forest-900)' }}
        >
          Open the tax calculator →
        </Link>
      </div>
    </div>
  );
}
