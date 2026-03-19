'use client';

import { useState } from 'react';
import { TAX_INFO } from '@/lib/taxData';

interface Props {
  country: string;
}

export default function TaxInfo({ country }: Props) {
  const [open, setOpen] = useState(false);
  const info = TAX_INFO[country];
  if (!info) return null;

  return (
    <div
      style={{ background: 'var(--forest-800)', border: '1px solid var(--forest-700)', borderRadius: '4px' }}
      className="overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors"
        style={{ color: 'var(--cream)' }}
        onMouseEnter={e => (e.currentTarget.style.background = 'var(--forest-700)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        <span className="font-semibold">Tax Rates &amp; Contributions</span>
        <span className="text-lg" style={{ color: 'var(--gold-500)' }}>{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div
          className="px-6 pb-6 space-y-5 pt-4"
          style={{ borderTop: '1px solid var(--forest-700)' }}
        >
          {/* Tax brackets */}
          <div>
            <h3
              className="text-[10px] font-bold uppercase tracking-[2px] mb-2"
              style={{ color: 'var(--gold-500)' }}
            >
              Income Tax Brackets (Annual)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr
                    className="text-[10px] uppercase tracking-wide"
                    style={{ background: 'var(--forest-900)', color: 'var(--forest-400)' }}
                  >
                    <th className="text-left py-2 px-3 font-medium">Income Range</th>
                    <th className="text-right py-2 px-3 font-medium">Tax Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {info.brackets.map((b, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--forest-700)' }}>
                      <td className="py-1.5 px-3" style={{ color: 'var(--forest-300)' }}>{b.income}</td>
                      <td className="py-1.5 px-3 text-right font-medium" style={{ color: 'var(--cream)' }}>{b.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Contributions */}
          <div>
            <h3
              className="text-[10px] font-bold uppercase tracking-[2px] mb-2"
              style={{ color: 'var(--gold-500)' }}
            >
              Mandatory Contributions (Employee)
            </h3>
            <div className="space-y-2">
              {info.contributions.map((c, i) => (
                <div key={i} className="flex justify-between items-start text-sm">
                  <div>
                    <span className="font-medium" style={{ color: 'var(--cream)' }}>{c.label}</span>
                    {c.note && <p className="text-xs mt-0.5" style={{ color: 'var(--forest-400)' }}>{c.note}</p>}
                  </div>
                  <span className="font-semibold ml-4 shrink-0" style={{ color: 'var(--gold-400)' }}>{c.rate}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Expat note */}
          <div
            className="p-3 rounded-sm"
            style={{ background: 'var(--forest-700)', border: '1px solid var(--forest-600)' }}
          >
            <p className="text-xs font-semibold mb-1" style={{ color: 'var(--gold-400)' }}>Expat / Non-resident Rules</p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--forest-200)' }}>{info.expatNote}</p>
          </div>

          {/* Sources */}
          <div>
            <h3
              className="text-[10px] font-bold uppercase tracking-[2px] mb-2"
              style={{ color: 'var(--gold-500)' }}
            >
              Sources
            </h3>
            <ul className="space-y-1">
              {info.sources.map((s, i) => (
                <li key={i}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs hover:underline"
                    style={{ color: 'var(--gold-500)' }}
                  >
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
