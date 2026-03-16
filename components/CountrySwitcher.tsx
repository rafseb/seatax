'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { COUNTRIES } from '@/lib/countries';

export default function CountrySwitcher() {
  const pathname = usePathname();
  const currentSlug = pathname.replace('/', '');

  return (
    <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
      {COUNTRIES.map((country) => {
        const isActive = currentSlug === country.slug;
        return (
          <Link
            key={country.slug}
            href={`/${country.slug}`}
            aria-current={isActive ? 'page' : undefined}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isActive
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
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
