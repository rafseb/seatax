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

export default function RelocationPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4">
        <Link href="/resources" className="text-sm text-blue-600 hover:underline">
          ← Resources
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-3">Relocation Checklists</h1>
      <p className="text-gray-600 leading-relaxed mb-8">
        Step-by-step overviews of the key tasks when relocating to each Southeast Asian country as
        an expat or digital nomad.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {COUNTRIES.map((country) => (
          <Link
            key={country.slug}
            href={`/resources/relocation/${country.slug}`}
            className="block bg-white border border-gray-200 rounded-lg p-5 hover:border-blue-400 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{country.flag}</span>
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                {country.name}
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Visa, banking, tax registration, health insurance, SIM card, and more.
            </p>
            <span className="mt-3 inline-block text-sm font-medium text-blue-600">
              View checklist →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
