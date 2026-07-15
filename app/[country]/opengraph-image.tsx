import { COUNTRIES, getCountry } from '@/lib/countries';
import { ogCard, accentFor, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const dynamic = 'force-static';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Income tax calculator';

export function generateStaticParams() {
  return COUNTRIES.map((c) => ({ country: c.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country: slug } = await params;
  const country = getCountry(slug);
  const name = country?.name ?? 'Southeast Asia';
  return ogCard({
    tag: `${name} · 2025`,
    title: `${name} Income Tax Calculator`,
    subtitle: 'Net take-home pay after tax & mandatory contributions',
    accent: accentFor(slug),
  });
}
