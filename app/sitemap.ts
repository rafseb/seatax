import type { MetadataRoute } from 'next';
import { COUNTRIES } from '@/lib/countries';

export default function sitemap(): MetadataRoute.Sitemap {
  return COUNTRIES.map((country) => ({
    url: `https://rafseb.github.io/seatax/${country.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));
}
