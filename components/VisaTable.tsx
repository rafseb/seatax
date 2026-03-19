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
          className="px-3 py-1 rounded-[2px] text-xs font-semibold uppercase tracking-wide transition-colors cursor-pointer"
          style={{
            background: filterCategory === 'all' ? 'var(--gold-500)' : 'var(--forest-700)',
            color: filterCategory === 'all' ? 'var(--forest-900)' : 'var(--forest-300)',
          }}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className="px-3 py-1 rounded-[2px] text-xs font-semibold uppercase tracking-wide transition-colors cursor-pointer"
            style={{
              background: filterCategory === cat ? 'var(--gold-500)' : 'var(--forest-700)',
              color: filterCategory === cat ? 'var(--forest-900)' : 'var(--forest-300)',
            }}
          >
            {capitalise(cat)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm py-4" style={{ color: 'var(--forest-400)' }}>No visa types match the selected filter.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr
                className="text-[10px] font-medium uppercase tracking-wider"
                style={{ background: 'var(--forest-900)', color: 'var(--forest-400)' }}
              >
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
                <tr key={i} style={{ borderBottom: '1px solid var(--forest-700)' }}>
                  <td className="px-3 py-3 align-top">
                    <span className="font-medium" style={{ color: 'var(--cream)' }}>{visa.name}</span>
                    {visa.fee && (
                      <span className="block text-xs mt-0.5" style={{ color: 'var(--forest-400)' }}>{visa.fee}</span>
                    )}
                  </td>
                  <td className="px-3 py-3 align-top" style={{ color: 'var(--forest-400)' }}>{capitalise(visa.category)}</td>
                  <td className="px-3 py-3 align-top" style={{ color: 'var(--forest-300)' }}>{visa.maxStay}</td>
                  <td className="px-3 py-3 align-top">
                    {visa.workPermitted ? (
                      <span className="font-medium" style={{ color: 'var(--forest-300)' }}>✓</span>
                    ) : (
                      <span className="font-medium" style={{ color: 'var(--forest-600)' }}>✗</span>
                    )}
                  </td>
                  <td className="px-3 py-3 align-top">
                    {visa.renewable ? (
                      <span className="font-medium" style={{ color: 'var(--forest-300)' }}>✓</span>
                    ) : (
                      <span className="font-medium" style={{ color: 'var(--forest-600)' }}>✗</span>
                    )}
                  </td>
                  <td className="px-3 py-3 align-top" style={{ color: 'var(--forest-300)' }}>{visa.minIncome ?? '—'}</td>
                  <td className="px-3 py-3 align-top max-w-xs" style={{ color: 'var(--forest-400)' }}>
                    <span className="line-clamp-2">{visa.notes}</span>
                  </td>
                  <td className="px-3 py-3 align-top">
                    <a
                      href={visa.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nav-link whitespace-nowrap"
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

      <p className="mt-4 text-xs" style={{ color: 'var(--forest-400)' }}>
        Visa rules change frequently. Always verify current requirements at the official immigration authority before making travel or relocation decisions.
      </p>
    </div>
  );
}
