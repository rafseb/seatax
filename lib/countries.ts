import type { Country } from './types';

export const COUNTRIES: Country[] = [
  {
    slug: 'philippines',
    name: 'Philippines',
    flag: '🇵🇭',
    currency: 'PHP',
    currencySymbol: '₱',
    defaultSalary: 50000,
    salaryStep: 5000,
    salaryMin: 10000,
    salaryMax: 1000000,
    taxYear: '2025',
  },
  {
    slug: 'thailand',
    name: 'Thailand',
    flag: '🇹🇭',
    currency: 'THB',
    currencySymbol: '฿',
    defaultSalary: 50000,
    salaryStep: 5000,
    salaryMin: 15000,
    salaryMax: 2000000,
    taxYear: '2025',
  },
  {
    slug: 'vietnam',
    name: 'Vietnam',
    flag: '🇻🇳',
    currency: 'VND',
    currencySymbol: '₫',
    defaultSalary: 20000000,
    salaryStep: 1000000,
    salaryMin: 3000000,
    salaryMax: 200000000,
    taxYear: '2025',
  },
  {
    slug: 'indonesia',
    name: 'Indonesia',
    flag: '🇮🇩',
    currency: 'IDR',
    currencySymbol: 'Rp',
    defaultSalary: 10000000,
    salaryStep: 500000,
    salaryMin: 3000000,
    salaryMax: 500000000,
    taxYear: '2025',
  },
];

export function getCountry(slug: string): Country | undefined {
  return COUNTRIES.find((c) => c.slug === slug);
}
