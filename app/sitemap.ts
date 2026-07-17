import type { MetadataRoute } from 'next';
import { COUNTRIES } from '@/lib/countries';
import { ARTICLES, LEGACY_BLOG_SLUGS } from '@/lib/articles';
import { CANONICAL_PAIR_SLUGS } from '@/lib/comparisons';
import { BASE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

// Hand-maintained: bump when the corresponding content is meaningfully updated,
// so lastModified reflects real changes instead of the build date.
const CALCULATORS_UPDATED = new Date('2026-07-17'); // landing page + 2026 rates
const RESOURCES_UPDATED = new Date('2026-06-01');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: CALCULATORS_UPDATED,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    ...COUNTRIES.map((country) => ({
      url: `${BASE_URL}/${country.slug}`,
      lastModified: CALCULATORS_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    {
      url: `${BASE_URL}/resources`,
      lastModified: RESOURCES_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/resources/guides`,
      lastModified: RESOURCES_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/compare`,
      lastModified: CALCULATORS_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    ...CANONICAL_PAIR_SLUGS.map((pair) => ({
      url: `${BASE_URL}/compare/${pair}`,
      lastModified: CALCULATORS_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...ARTICLES.map((article) => ({
      url: `${BASE_URL}/resources/guides/${article.slug}`,
      lastModified: new Date(article.publishDate),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
    {
      url: `${BASE_URL}/resources/visas`,
      lastModified: RESOURCES_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    ...COUNTRIES.map((country) => ({
      url: `${BASE_URL}/resources/visas/${country.slug}`,
      lastModified: RESOURCES_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    {
      url: `${BASE_URL}/resources/cost-of-living`,
      lastModified: RESOURCES_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/resources/banking`,
      lastModified: RESOURCES_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/resources/health-insurance`,
      lastModified: RESOURCES_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/resources/relocation`,
      lastModified: RESOURCES_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    ...COUNTRIES.map((country) => ({
      url: `${BASE_URL}/resources/relocation/${country.slug}`,
      lastModified: RESOURCES_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    {
      url: `${BASE_URL}/resources/digital-nomad`,
      lastModified: RESOURCES_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    // Keep old /blog routes for SEO continuity
    {
      url: `${BASE_URL}/blog`,
      lastModified: RESOURCES_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    ...LEGACY_BLOG_SLUGS.map((slug) => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: RESOURCES_UPDATED,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
  ];
}
