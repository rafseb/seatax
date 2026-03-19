import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ARTICLES, getArticle } from '@/lib/articles';
import { COUNTRIES } from '@/lib/countries';
import ArticleBody from '@/components/ArticleBody';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `https://rafseb.github.io/seatax/resources/guides/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.publishDate,
    },
  };
}

export default async function ResourceGuideArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const country = COUNTRIES.find((c) => c.slug === article.country);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.publishDate,
    author: { '@type': 'Organization', name: 'SEA Tax Calculator' },
    publisher: { '@type': 'Organization', name: 'SEA Tax Calculator' },
    url: `https://rafseb.github.io/seatax/resources/guides/${article.slug}`,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <div className="max-w-3xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {article.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="mb-2">
        <Link href="/resources/guides" className="text-sm nav-link">
          ← All guides
        </Link>
      </div>

      <header className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{country?.flag}</span>
          <span className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: 'var(--forest-400)' }}>
            {country?.name}
          </span>
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--cream)' }}>{article.title}</h1>
        <p className="text-sm" style={{ color: 'var(--forest-400)' }}>
          Published{' '}
          {new Date(article.publishDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </header>

      <ArticleBody
        sections={article.sections}
        localCurrency={country?.currency ?? ''}
        localSymbol={country?.currencySymbol ?? ''}
      />

      {article.faqs.length > 0 && (
        <section className="mt-10 pt-8" style={{ borderTop: '1px solid var(--forest-700)' }}>
          <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--cream)' }}>Frequently Asked Questions</h2>
          <div className="space-y-3">
            {article.faqs.map(({ q, a }) => (
              <details
                key={q}
                className="group"
                style={{ border: '1px solid var(--forest-700)', borderRadius: '4px' }}
              >
                <summary
                  className="flex cursor-pointer items-start justify-between gap-4 px-4 py-3 text-sm font-medium list-none"
                  style={{ color: 'var(--cream)' }}
                >
                  <span>{q}</span>
                  <span className="mt-0.5 shrink-0 group-open:rotate-180 transition-transform" style={{ color: 'var(--gold-500)' }}>
                    ▾
                  </span>
                </summary>
                <div className="px-4 pb-4 pt-1 text-sm leading-relaxed" style={{ color: 'var(--forest-200)' }}>{a}</div>
              </details>
            ))}
          </div>
        </section>
      )}

      <div
        className="mt-10 p-5"
        style={{ background: 'var(--forest-700)', border: '1px solid var(--forest-600)', borderRadius: '4px' }}
      >
        <p className="text-sm font-semibold mb-2" style={{ color: 'var(--cream)' }}>
          Calculate your net take-home pay in {country?.name}
        </p>
        <p className="text-sm mb-4" style={{ color: 'var(--forest-300)' }}>
          Use our free tax calculator to see your exact take-home pay after income tax and
          mandatory contributions, with support for both resident and expat rates.
        </p>
        <Link
          href={`/${article.country}`}
          className="inline-block text-sm font-semibold px-4 py-2 rounded-sm transition-colors"
          style={{ background: 'var(--gold-500)', color: 'var(--forest-900)' }}
        >
          Open {country?.name} tax calculator →
        </Link>
      </div>
    </div>
  );
}
