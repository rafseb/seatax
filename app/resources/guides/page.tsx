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

const cardStyle = {
  background: 'var(--forest-800)',
  border: '1px solid var(--forest-700)',
  borderRadius: '4px',
};

export default function GuidesPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4">
        <Link href="/resources" className="text-sm nav-link">
          ← Resources
        </Link>
      </div>

      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[3px] mb-2" style={{ color: 'var(--gold-500)' }}>
          Guides
        </p>
        <h1 className="text-2xl font-bold mb-3" style={{ color: 'var(--cream)' }}>
          Expat &amp; Remote Work Tax Guides
        </h1>
        <p className="leading-relaxed" style={{ color: 'var(--forest-300)' }}>
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
              className="block p-5 transition-all"
              style={cardStyle}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{country?.flag}</span>
                <span className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: 'var(--forest-400)' }}>
                  {country?.name}
                </span>
              </div>
              <h2 className="text-base font-semibold mb-2 leading-snug" style={{ color: 'var(--cream)' }}>
                {article.title}
              </h2>
              <p className="text-sm leading-relaxed line-clamp-3" style={{ color: 'var(--forest-300)' }}>
                {article.description}
              </p>
              <span className="mt-3 inline-block text-sm font-medium" style={{ color: 'var(--gold-500)' }}>
                Read guide →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
