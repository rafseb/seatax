import type { Metadata } from 'next';
import Link from 'next/link';
import { ARTICLES } from '@/lib/articles';
import { COUNTRIES } from '@/lib/countries';

export const metadata: Metadata = {
  title: 'SEA Tax Guides — Expat & Remote Work Guides',
  description:
    'Expert guides for expats and remote workers on income tax, social contributions, visa requirements, and cost of living in the Philippines, Thailand, Vietnam, Indonesia, and Malaysia.',
  alternates: {
    canonical: 'https://rafseb.github.io/seatax/resources/guides',
  },
};

export default function GuidesPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4">
        <Link href="/resources" className="text-sm text-blue-600 hover:underline">
          ← Resources
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Expat &amp; Remote Work Tax Guides
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Practical guides covering income tax rules, mandatory contributions, visa requirements,
          and cost of living for expats and digital nomads in Southeast Asia.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {ARTICLES.map((article) => {
          const country = COUNTRIES.find((c) => c.slug === article.country);
          return (
            <Link
              key={article.slug}
              href={`/resources/guides/${article.slug}`}
              className="block bg-white border border-gray-200 rounded-lg p-5 hover:border-blue-400 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{country?.flag}</span>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {country?.name}
                </span>
              </div>
              <h2 className="text-base font-semibold text-gray-900 mb-2 leading-snug">
                {article.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                {article.description}
              </p>
              <span className="mt-3 inline-block text-sm font-medium text-blue-600">
                Read guide →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
