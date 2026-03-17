'use client';

import React, { useState, useMemo } from 'react';
import type { CountryCostData, CostCategory } from '@/lib/resources/types';
import type { Country } from '@/lib/types';

interface Props {
  data: CountryCostData[];
  countries: Country[];
}

interface Group {
  label: string;
  test: (c: CostCategory) => boolean;
}

const GROUPS: Group[] = [
  { label: 'All', test: () => true },
  { label: 'Housing', test: (c) => c.startsWith('housing-') },
  { label: 'Food', test: (c) => c.startsWith('meal-') },
  { label: 'Getting Around', test: (c) => c === 'transport-monthly' },
  {
    label: 'Work & Lifestyle',
    test: (c) => (['internet-monthly', 'gym-monthly', 'coworking-monthly'] as CostCategory[]).includes(c),
  },
];

function formatUsd(amount: number): string {
  if (amount >= 100) {
    return '$' + new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(amount);
  }
  return '$' + amount;
}

export default function CostComparisonTable({ data, countries }: Props) {
  const [activeGroup, setActiveGroup] = useState<string>('All');

  const allRows = data[0]?.costs ?? [];
  const activeGroupDef = GROUPS.find((g) => g.label === activeGroup) ?? GROUPS[0];
  const visibleRows = allRows.filter((row) => activeGroupDef.test(row.category));

  const lookup = useMemo(() => {
    const map = new Map<string, Map<CostCategory, number>>();
    for (const countryData of data) {
      const inner = new Map<CostCategory, number>();
      for (const point of countryData.costs) {
        inner.set(point.category, point.usd);
      }
      map.set(countryData.country, inner);
    }
    return map;
  }, [data]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-5">
        {GROUPS.map((group) => (
          <button
            key={group.label}
            onClick={() => setActiveGroup(group.label)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
              activeGroup === group.label
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {group.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="sticky left-0 bg-white z-10 text-left py-2 pr-4 text-xs font-medium text-gray-500 min-w-[140px]">
                Category
              </th>
              {countries.map((country) => {
                const countryData = data.find((d) => d.country === country.slug);
                return (
                  <th
                    key={country.slug}
                    className="text-right py-2 px-3 text-xs font-medium text-gray-700 whitespace-nowrap min-w-[100px]"
                  >
                    <span className="block text-base leading-none mb-0.5">{country.flag}</span>
                    <span className="block">{country.name}</span>
                    {countryData && (
                      <span className="block text-gray-400 font-normal">{countryData.city}</span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => (
              <tr key={row.category} className="group border-b border-gray-100 even:bg-gray-50">
                <td className="sticky left-0 bg-white group-even:bg-gray-50 z-10 py-2.5 pr-4 text-xs text-gray-600 leading-snug">
                  {row.label}
                </td>
                {countries.map((country) => {
                  const amount = lookup.get(country.slug)?.get(row.category);
                  return (
                    <td
                      key={country.slug}
                      className="text-right py-2.5 px-3 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {amount !== undefined ? formatUsd(amount) : '—'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid sm:grid-cols-2 gap-2 mt-4">
        {data.map((countryData) => {
          const country = countries.find((c) => c.slug === countryData.country);
          if (!country) return null;
          return (
            <p key={countryData.country} className="text-xs text-gray-400 italic leading-relaxed">
              <span className="not-italic font-medium text-gray-500">
                {country.flag} {country.name}:
              </span>{' '}
              {countryData.notes}
            </p>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-gray-400">
        All figures are approximate USD equivalents based on mid-2025 exchange rates. Costs vary
        significantly by neighbourhood and lifestyle.
      </p>
    </div>
  );
}
