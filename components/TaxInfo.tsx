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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900">Tax Rates &amp; Contributions</span>
        <span className="text-gray-400 text-lg">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className="px-6 pb-6 space-y-5 border-t border-gray-100 pt-4">
          {/* Tax brackets */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Income Tax Brackets (Annual)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-gray-400 uppercase tracking-wide">
                    <th className="text-left py-1 pr-4 font-medium">Income Range</th>
                    <th className="text-right py-1 font-medium">Tax Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {info.brackets.map((b, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="py-1.5 pr-4 text-gray-600">{b.income}</td>
                      <td className="py-1.5 text-right font-medium text-gray-900">{b.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Contributions */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Mandatory Contributions (Employee)</h3>
            <div className="space-y-2">
              {info.contributions.map((c, i) => (
                <div key={i} className="flex justify-between items-start text-sm">
                  <div>
                    <span className="text-gray-700 font-medium">{c.label}</span>
                    {c.note && <p className="text-xs text-gray-400 mt-0.5">{c.note}</p>}
                  </div>
                  <span className="font-semibold text-gray-900 ml-4 shrink-0">{c.rate}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Expat note */}
          <div className="bg-blue-50 rounded-xl p-3">
            <p className="text-xs font-semibold text-blue-800 mb-1">Expat / Non-resident Rules</p>
            <p className="text-xs text-blue-700 leading-relaxed">{info.expatNote}</p>
          </div>

          {/* Sources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Sources</h3>
            <ul className="space-y-1">
              {info.sources.map((s, i) => (
                <li key={i}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
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
