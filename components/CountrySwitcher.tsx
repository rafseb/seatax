'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { COUNTRIES } from '@/lib/countries';

export default function CountrySwitcher() {
  const pathname = usePathname();
  const currentSlug = pathname.replace('/', '');

  return (
    <div className="flex border-b-0" style={{ borderColor: 'var(--forest-700)' }}>
      {COUNTRIES.map((country) => {
        const isActive = currentSlug === country.slug;
        return (
          <Link
            key={country.slug}
            href={`/${country.slug}`}
            aria-current={isActive ? 'page' : undefined}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap"
            style={{
              borderColor: isActive ? 'var(--accent)' : 'transparent',
              color: isActive ? 'var(--cream)' : 'var(--forest-400)',
            }}
          >
            <span className="text-base">{country.flag}</span>
            <span className="hidden sm:inline">{country.name}</span>
            <span className="sm:hidden">{country.currency}</span>
          </Link>
        );
      })}
    </div>
  );
}
