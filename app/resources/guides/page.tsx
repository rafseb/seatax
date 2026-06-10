import type { Metadata } from 'next';
import Link from 'next/link';
import { ARTICLES } from '@/lib/articles';
import type { Article, ArticleCategory } from '@/lib/articles/types';
import { COUNTRIES } from '@/lib/countries';

export const metadata: Metadata = {
  title: 'SEA Tax Guides — Expat & Remote Work Guides',
  description:
    'Expert guides for expats and remote workers on income tax, social contributions, visa requirements, city living, and cost of living in the Philippines, Thailand, Vietnam, Indonesia, and Malaysia.',
  alternates: {
    canonical: 'https://rafseb.github.io/seatax/resources/guides',
  },
};

const cardStyle = {
  background: 'var(--forest-800)',
  border: '1px solid var(--forest-700)',
  borderRadius: '4px',
};

// Category display order and labels for the grouped index.
const CATEGORY_ORDER: { key: ArticleCategory; label: string; blurb: string }[] = [
  { key: 'tax-guide', label: 'Tax Guides', blurb: 'Income tax, contributions, and residency rules by country.' },
  { key: 'city-guide', label: 'City Guides', blurb: 'Cost of living, neighbourhoods, and lifestyle in the region’s top expat cities.' },
  { key: 'freelancer', label: 'Freelancer & Self-Employed', blurb: 'Tax and visa playbooks for independent and remote workers.' },
  { key: 'compliance', label: 'Annual Compliance', blurb: 'Yearly filing, visa renewals, and staying compliant.' },
];

const CATEGORY_TAG: Record<ArticleCategory, string> = {
  'tax-guide': 'Tax Guide',
  'city-guide': 'City Guide',
  freelancer: 'Freelancer',
  compliance: 'Compliance',
};

function articleCategory(article: Article): ArticleCategory {
  return article.category ?? 'tax-guide';
}

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
          Expat &amp; Remote Work Guides
        </h1>
        <p className="leading-relaxed" style={{ color: 'var(--forest-300)' }}>
          Practical guides covering income tax rules, mandatory contributions, visa requirements,
          city living, and cost of living for expats and digital nomads in Southeast Asia.
        </p>
      </div>

      <div className="space-y-12">
        {CATEGORY_ORDER.map(({ key, label, blurb }) => {
          const articles = ARTICLES.filter((a) => articleCategory(a) === key);
          if (articles.length === 0) return null;

          return (
            <section key={key}>
              <div className="mb-4">
                <p className="text-[10px] font-bold uppercase tracking-[3px] mb-1" style={{ color: 'var(--gold-500)' }}>
                  {label}
                </p>
                <p className="text-sm" style={{ color: 'var(--forest-400)' }}>
                  {blurb}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {articles.map((article) => {
                  const country = COUNTRIES.find((c) => c.slug === article.country);
                  return (
                    <Link
                      key={article.slug}
                      href={`/resources/guides/${article.slug}`}
                      className="block p-5 transition-all"
                      style={cardStyle}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{country?.flag}</span>
                          <span className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: 'var(--forest-400)' }}>
                            {country?.name}
                          </span>
                        </div>
                        <span
                          className="text-[9px] font-bold uppercase tracking-[1.5px] px-2 py-0.5 rounded-[2px]"
                          style={{ background: 'var(--forest-700)', color: 'var(--gold-400)' }}
                        >
                          {CATEGORY_TAG[articleCategory(article)]}
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
            </section>
          );
        })}
      </div>
    </div>
  );
}
