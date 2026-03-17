import type { Metadata } from 'next';
import Link from 'next/link';
import { COUNTRIES } from '@/lib/countries';
import { VISA_DATA } from '@/lib/resources/visaData';

export const metadata: Metadata = {
  title: 'Visa Options in Southeast Asia — Expat Guide',
  description:
    'Explore visa types for tourists, remote workers, retirees, and professionals across Southeast Asia. Filter by category to find the right visa for your situation.',
  alternates: {
    canonical: 'https://rafseb.github.io/seatax/resources/visas',
  },
};

export default function VisasHubPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4">
        <Link href="/resources" className="text-sm text-blue-600 hover:underline">
          ← Resources
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Visa Options in Southeast Asia</h1>
        <p className="text-gray-600 leading-relaxed">
          Explore visa types for tourists, remote workers, retirees, and professionals. Select a
          country to see the full list with filtering by visa category.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COUNTRIES.map((country) => {
          const data = VISA_DATA.find((d) => d.country === country.slug);
          const count = data ? data.visas.length : 0;
          return (
            <Link
              key={country.slug}
              href={`/resources/visas/${country.slug}`}
              className="block bg-white border border-gray-200 rounded-lg p-5 hover:border-blue-400 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{country.flag}</span>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {country.name}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {count} visa type{count !== 1 ? 's' : ''}
              </p>
              <span className="text-sm font-medium text-blue-600">View visa options →</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
