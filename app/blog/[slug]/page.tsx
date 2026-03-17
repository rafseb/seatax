import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ARTICLES, getArticle } from '@/lib/articles';
import { COUNTRIES } from '@/lib/countries';
import ArticleBody from '@/components/ArticleBody';

interface Props {
  params: Promise<{ slug: string }>;
}

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
      canonical: `https://rafseb.github.io/seatax/blog/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.publishDate,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
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
    url: `https://rafseb.github.io/seatax/blog/${article.slug}`,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mb-2">
        <Link href="/blog" className="text-sm text-blue-600 hover:underline">
          ← All guides
        </Link>
      </div>

      <header className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{country?.flag}</span>
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            {country?.name}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{article.title}</h1>
        <p className="text-sm text-gray-400">
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
        <section className="mt-10 border-t border-gray-200 pt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {article.faqs.map(({ q, a }) => (
              <details key={q} className="group border border-gray-200 rounded-lg">
                <summary className="flex cursor-pointer items-start justify-between gap-4 px-4 py-3 text-sm font-medium text-gray-900 list-none">
                  <span>{q}</span>
                  <span className="mt-0.5 shrink-0 text-gray-400 group-open:rotate-180 transition-transform">
                    ▾
                  </span>
                </summary>
                <div className="px-4 pb-4 pt-1 text-sm text-gray-600 leading-relaxed">{a}</div>
              </details>
            ))}
          </div>
        </section>
      )}

      <div className="mt-10 bg-blue-50 border border-blue-100 rounded-lg p-5">
        <p className="text-sm font-medium text-gray-900 mb-2">
          Calculate your net take-home pay in {country?.name}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Use our free tax calculator to see your exact take-home pay after income tax and
          mandatory contributions, with support for both resident and expat rates.
        </p>
        <Link
          href={`/${article.country}`}
          className="inline-block bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Open {country?.name} tax calculator →
        </Link>
      </div>
    </div>
  );
}
