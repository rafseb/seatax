import { getCountry } from '@/lib/countries';
import { CANONICAL_PAIR_SLUGS, parsePair } from '@/lib/comparisons';
import { ogCard, accentFor, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const dynamic = 'force-static';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Country comparison for expats';

export function generateStaticParams() {
  return CANONICAL_PAIR_SLUGS.map((pair) => ({ pair }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ pair: string }>;
}) {
  const { pair } = await params;
  const parsed = parsePair(pair);
  const a = parsed ? getCountry(parsed[0]) : undefined;
  const b = parsed ? getCountry(parsed[1]) : undefined;
  return ogCard({
    tag: 'Head-to-Head · 2026',
    title:
      a && b
        ? `${a.name} vs ${b.name}: Tax & Cost of Living`
        : 'Compare Southeast Asian Countries',
    subtitle: 'Income tax · take-home pay · cost of living · visas',
    accent: accentFor(a?.slug),
  });
}
