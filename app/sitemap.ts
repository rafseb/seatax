import type { MetadataRoute } from 'next';
import { COUNTRIES } from '@/lib/countries';

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
  ];
}
