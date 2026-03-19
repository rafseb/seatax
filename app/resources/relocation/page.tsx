import type { Metadata } from 'next';
import Link from 'next/link';
import { COUNTRIES } from '@/lib/countries';

export const metadata: Metadata = {
  title: 'Relocation Checklists for Southeast Asia — Country Guides',
  description:
    'Step-by-step relocation checklists for expats moving to the Philippines, Thailand, Vietnam, Indonesia, and Malaysia.',
  alternates: {
    canonical: 'https://rafseb.github.io/seatax/resources/relocation',
  },
};

const cardStyle = {
  background: 'var(--forest-800)',
  border: '1px solid var(--forest-700)',
  borderRadius: '4px',
};

export default function RelocationPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4">
        <Link href="/resources" className="text-sm nav-link">
          ← Resources
        </Link>
      </div>

      <p className="text-[10px] font-bold uppercase tracking-[3px] mb-2" style={{ color: 'var(--gold-500)' }}>
        Relocation
      </p>
      <h1 className="text-2xl font-bold mb-3" style={{ color: 'var(--cream)' }}>Relocation Checklists</h1>
      <p className="leading-relaxed mb-8" style={{ color: 'var(--forest-300)' }}>
        Step-by-step overviews of the key tasks when relocating to each Southeast Asian country as
        an expat or digital nomad.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {COUNTRIES.map((country) => (
          <Link
            key={country.slug}
            href={`/resources/relocation/${country.slug}`}
            className="block p-5 transition-all"
            style={cardStyle}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{country.flag}</span>
              <span className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: 'var(--forest-400)' }}>
                {country.name}
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--forest-300)' }}>
              Visa, banking, tax registration, health insurance, SIM card, and more.
            </p>
            <span className="mt-3 inline-block text-sm font-medium" style={{ color: 'var(--gold-500)' }}>
              View checklist →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
