import type { Metadata } from 'next';
import Link from 'next/link';
import { getCountry } from '@/lib/countries';
import { CANONICAL_PAIRS, pairSlug } from '@/lib/comparisons';

export const metadata: Metadata = {
  title: 'Compare Southeast Asia: Tax & Cost of Living by Country',
  description:
    'Side-by-side comparisons of income tax, take-home pay, cost of living, and visas for every pair of Southeast Asian countries — Philippines, Thailand, Vietnam, Indonesia, and Malaysia.',
  alternates: { canonical: 'https://rafseb.github.io/seatax/compare' },
};

const cardStyle = {
  background: 'var(--forest-800)',
  border: '1px solid var(--forest-700)',
  borderRadius: '4px',
};

export default function CompareHubPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[3px] mb-2" style={{ color: 'var(--gold-500)' }}>
          Country Comparison
        </p>
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--cream)' }}>Compare Southeast Asian Countries</h1>
        <p className="leading-relaxed" style={{ color: 'var(--forest-300)' }}>
          Pick a pair to compare income tax, take-home pay, monthly cost of living, and visa options side by side.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {CANONICAL_PAIRS.map(([aSlug, bSlug]) => {
          const a = getCountry(aSlug);
          const b = getCountry(bSlug);
          if (!a || !b) return null;
          return (
            <Link key={pairSlug(aSlug, bSlug)} href={`/compare/${pairSlug(aSlug, bSlug)}`} className="block p-5 transition-all" style={cardStyle}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{a.flag}</span>
                <span className="text-sm font-medium" style={{ color: 'var(--forest-400)' }}>vs</span>
                <span className="text-2xl">{b.flag}</span>
              </div>
              <h2 className="text-base font-semibold leading-snug" style={{ color: 'var(--cream)' }}>
                {a.name} vs {b.name}
              </h2>
              <span className="mt-2 inline-block text-sm font-medium" style={{ color: 'var(--gold-500)' }}>Compare →</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
