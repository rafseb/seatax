import type { Metadata } from 'next';

export const BASE_URL = 'https://rafseb.github.io/seatax';

/**
 * Standard page metadata: title/description plus canonical, Open Graph,
 * and Twitter card blocks. `path` is the route path starting with '/'
 * (e.g. '/resources/visas'); '' means the site root.
 */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const { title, description, path } = opts;
  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}${path}` },
    openGraph: {
      title,
      description,
      url: path || '/',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

/**
 * BreadcrumbList JSON-LD. Items are (name, path) pairs in order,
 * excluding Home which is always prepended.
 */
export function breadcrumbList(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.name,
        item: `${BASE_URL}${item.path}`,
      })),
    ],
  };
}
