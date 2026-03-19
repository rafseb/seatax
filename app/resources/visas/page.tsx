import type { Metadata } from 'next';
import Link from 'next/link';
import { COUNTRIES } from '@/lib/countries';
import { VISA_DATA } from '@/lib/resources/visaData';

export const metadata: Metadata = {
  title: 'Visa Options in Southeast Asia — Expat Guide',
  description:
    'Explore visa types for tourists, remote workers, retirees, and professionals across Southeast Asia. Filter by category to find the right visa for your situation.',
  alternates: {
    canonical: 'https://rafseb.github.io/seatax/resources/visas',
  },
};

const cardStyle = {
  background: 'var(--forest-800)',
  border: '1px solid var(--forest-700)',
  borderRadius: '4px',
};

export default function VisasHubPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4">
        <Link href="/resources" className="text-sm nav-link">
          ← Resources
        </Link>
      </div>

      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[3px] mb-2" style={{ color: 'var(--gold-500)' }}>
          Visas
        </p>
        <h1 className="text-2xl font-bold mb-3" style={{ color: 'var(--cream)' }}>Visa Options in Southeast Asia</h1>
        <p className="leading-relaxed" style={{ color: 'var(--forest-300)' }}>
          Explore visa types for tourists, remote workers, retirees, and professionals. Select a
          country to see the full list with filtering by visa category.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COUNTRIES.map((country) => {
          const data = VISA_DATA.find((d) => d.country === country.slug);
          const count = data ? data.visas.length : 0;
          return (
            <Link
              key={country.slug}
              href={`/resources/visas/${country.slug}`}
              className="block p-5 transition-all"
              style={cardStyle}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{country.flag}</span>
                <span className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: 'var(--forest-400)' }}>
                  {country.name}
                </span>
              </div>
              <p className="text-sm mb-3" style={{ color: 'var(--forest-300)' }}>
                {count} visa type{count !== 1 ? 's' : ''}
              </p>
              <span className="text-sm font-medium" style={{ color: 'var(--gold-500)' }}>View visa options →</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
