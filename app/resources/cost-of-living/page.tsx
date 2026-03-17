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
        <Link href="/resources" className="text-sm text-blue-600 hover:underline">
          ← Resources
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-3">Cost of Living in Southeast Asia</h1>

      <p className="text-gray-700 leading-relaxed mb-6">
        Side-by-side monthly cost estimates for expats and digital nomads across 5 SEA countries.
        All figures are in USD for easy comparison.
      </p>

      <CostComparisonTable data={COST_DATA} countries={costCountries} />

      <div className="mt-10 bg-blue-50 border border-blue-100 rounded-lg p-5">
        <p className="text-sm font-medium text-gray-900 mb-2">
          Compare tax take-home pay across all countries
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Understanding cost of living is only half the picture. Use our free tax calculator to see
          exactly how much you take home after income tax and mandatory contributions in each country.
        </p>
        <Link
          href="/philippines"
          className="inline-block bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Open the tax calculator →
        </Link>
      </div>
    </div>
  );
}
