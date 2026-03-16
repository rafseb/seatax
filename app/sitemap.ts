import type { MetadataRoute } from 'next';
import { COUNTRIES } from '@/lib/countries';
import { ARTICLES } from '@/lib/articles';

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
      url: 'https://rafseb.github.io/seatax/blog',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    ...ARTICLES.map((article) => ({
      url: `https://rafseb.github.io/seatax/blog/${article.slug}`,
      lastModified: new Date(article.publishDate),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ];
}
