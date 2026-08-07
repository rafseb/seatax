import { LEGACY_BLOG_SLUGS, getArticle } from '@/lib/articles';
import { getCountry } from '@/lib/countries';
import { ogCard, accentFor, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const dynamic = 'force-static';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Expat guide';

const CATEGORY_TAGS: Record<string, string> = {
  'tax-guide': 'Expat Tax Guide',
  'city-guide': 'City Guide',
  freelancer: 'Freelancer Guide',
  compliance: 'Compliance Guide',
};

// Must mirror the page route, which only serves the five legacy slugs — otherwise
// we emit OG images for /blog URLs that have no page.
export function generateStaticParams() {
  return LEGACY_BLOG_SLUGS.map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  const countryName = article ? getCountry(article.country)?.name : undefined;
  const tag = article?.category ? CATEGORY_TAGS[article.category] : 'Expat Guide';
  return ogCard({
    tag: countryName ? `${tag} · ${countryName}` : tag,
    title: article?.title ?? 'SEA Tax Calculator — Expat Guides',
    subtitle: 'rafseb.github.io/seatax',
    accent: accentFor(article?.country),
  });
}
