import type { MetadataRoute } from 'next';
import { COUNTRIES } from '@/lib/countries';
import { ARTICLES, LEGACY_BLOG_SLUGS } from '@/lib/articles';
import { CANONICAL_PAIR_SLUGS } from '@/lib/comparisons';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://rafseb.github.io/seatax/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    ...COUNTRIES.map((country) => ({
      url: `https://rafseb.github.io/seatax/${country.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    {
      url: 'https://rafseb.github.io/seatax/resources',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: 'https://rafseb.github.io/seatax/resources/guides',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://rafseb.github.io/seatax/compare',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    ...CANONICAL_PAIR_SLUGS.map((pair) => ({
      url: `https://rafseb.github.io/seatax/compare/${pair}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...ARTICLES.map((article) => ({
      url: `https://rafseb.github.io/seatax/resources/guides/${article.slug}`,
      lastModified: new Date(article.publishDate),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
    {
      url: 'https://rafseb.github.io/seatax/resources/visas',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    ...COUNTRIES.map((country) => ({
      url: `https://rafseb.github.io/seatax/resources/visas/${country.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    {
      url: 'https://rafseb.github.io/seatax/resources/cost-of-living',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://rafseb.github.io/seatax/resources/banking',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: 'https://rafseb.github.io/seatax/resources/health-insurance',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    ...COUNTRIES.map((country) => ({
      url: `https://rafseb.github.io/seatax/resources/relocation/${country.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    {
      url: 'https://rafseb.github.io/seatax/resources/digital-nomad',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    // Keep old /blog routes for SEO continuity
    {
      url: 'https://rafseb.github.io/seatax/blog',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    ...LEGACY_BLOG_SLUGS.map((slug) => ({
      url: `https://rafseb.github.io/seatax/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
  ];
}
