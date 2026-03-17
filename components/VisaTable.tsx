'use client';

import React, { useState } from 'react';
import type { VisaEntry, VisaCategory } from '@/lib/resources/types';

interface Props {
  visas: VisaEntry[];
}

function capitalise(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ');
}

export default function VisaTable({ visas }: Props) {
  const [filterCategory, setFilterCategory] = useState<VisaCategory | 'all'>('all');

  const categories = Array.from(new Set(visas.map((v) => v.category)));
  const filtered = filterCategory === 'all' ? visas : visas.filter((v) => v.category === filterCategory);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilterCategory('all')}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
            filterCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
              filterCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {capitalise(cat)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-gray-500 py-4">No visa types match the selected filter.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wide">
                <th className="px-3 py-2 text-left">Visa Name</th>
                <th className="px-3 py-2 text-left">Category</th>
                <th className="px-3 py-2 text-left">Max Stay</th>
                <th className="px-3 py-2 text-left">Work</th>
                <th className="px-3 py-2 text-left">Renewable</th>
                <th className="px-3 py-2 text-left">Min Income</th>
                <th className="px-3 py-2 text-left">Notes</th>
                <th className="px-3 py-2 text-left">Official</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((visa, i) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="px-3 py-3 align-top">
                    <span className="font-medium text-gray-900">{visa.name}</span>
                    {visa.fee && (
                      <span className="block text-xs text-gray-400 mt-0.5">{visa.fee}</span>
                    )}
                  </td>
                  <td className="px-3 py-3 align-top text-gray-500">{capitalise(visa.category)}</td>
                  <td className="px-3 py-3 align-top text-gray-700">{visa.maxStay}</td>
                  <td className="px-3 py-3 align-top">
                    {visa.workPermitted ? (
                      <span className="text-green-600 font-medium">✓</span>
                    ) : (
                      <span className="text-red-500 font-medium">✗</span>
                    )}
                  </td>
                  <td className="px-3 py-3 align-top">
                    {visa.renewable ? (
                      <span className="text-green-600 font-medium">✓</span>
                    ) : (
                      <span className="text-gray-400 font-medium">✗</span>
                    )}
                  </td>
                  <td className="px-3 py-3 align-top text-gray-600">{visa.minIncome ?? '—'}</td>
                  <td className="px-3 py-3 align-top text-gray-500 max-w-xs">
                    <span className="line-clamp-2">{visa.notes}</span>
                  </td>
                  <td className="px-3 py-3 align-top">
                    <a
                      href={visa.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline whitespace-nowrap"
                    >
                      View →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-4 text-xs text-gray-400">
        Visa rules change frequently. Always verify current requirements at the official immigration authority before making travel or relocation decisions.
      </p>
    </div>
  );
}
