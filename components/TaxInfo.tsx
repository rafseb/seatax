'use client';

import { useState } from 'react';

interface Bracket {
  income: string;
  rate: string;
}

interface InfoConfig {
  brackets: Bracket[];
  contributions: { label: string; rate: string; note?: string }[];
  expatNote: string;
}

const TAX_INFO: Record<string, InfoConfig> = {
  philippines: {
    brackets: [
      { income: '0 – ₱250,000', rate: '0%' },
      { income: '₱250,001 – ₱400,000', rate: '15%' },
      { income: '₱400,001 – ₱800,000', rate: '20%' },
      { income: '₱800,001 – ₱2,000,000', rate: '25%' },
      { income: '₱2,000,001 – ₱8,000,000', rate: '30%' },
      { income: '₱8,000,001+', rate: '35%' },
    ],
    contributions: [
      { label: 'SSS', rate: '5%', note: 'Capped at ₱35,000 monthly salary (2025)' },
      { label: 'PhilHealth', rate: '2.5%', note: 'Min ₱500, max ₱2,500/month' },
      { label: 'Pag-IBIG', rate: '2%', note: 'Max ₱200/month' },
    ],
    expatNote: 'Non-residents are taxed at a flat 25% on gross Philippine-sourced compensation. Mandatory contributions (SSS, PhilHealth, Pag-IBIG) generally do not apply.',
  },
  thailand: {
    brackets: [
      { income: '0 – ฿150,000', rate: '0%' },
      { income: '฿150,001 – ฿300,000', rate: '5%' },
      { income: '฿300,001 – ฿500,000', rate: '10%' },
      { income: '฿500,001 – ฿750,000', rate: '15%' },
      { income: '฿750,001 – ฿1,000,000', rate: '20%' },
      { income: '฿1,000,001 – ฿2,000,000', rate: '25%' },
      { income: '฿2,000,001 – ฿5,000,000', rate: '30%' },
      { income: '฿5,000,001+', rate: '35%' },
    ],
    contributions: [
      { label: 'Social Security (SSF)', rate: '5%', note: 'Capped at ฿750/month (salary cap ฿15,000)' },
    ],
    expatNote: 'Non-residents are taxed at the same progressive rates on Thailand-sourced income. Social Security contributions generally do not apply to non-residents. Standard deductions and personal allowances are also excluded.',
  },
  vietnam: {
    brackets: [
      { income: '0 – ₫5,000,000/mo', rate: '5%' },
      { income: '₫5,000,001 – ₫10,000,000/mo', rate: '10%' },
      { income: '₫10,000,001 – ₫18,000,000/mo', rate: '15%' },
      { income: '₫18,000,001 – ₫32,000,000/mo', rate: '20%' },
      { income: '₫32,000,001 – ₫52,000,000/mo', rate: '25%' },
      { income: '₫52,000,001 – ₫80,000,000/mo', rate: '30%' },
      { income: '₫80,000,001+/mo', rate: '35%' },
    ],
    contributions: [
      { label: 'Social Insurance (SI)', rate: '8%', note: 'Capped at ₫36,000,000/month' },
      { label: 'Health Insurance (HI)', rate: '1.5%', note: 'Capped at ₫36,000,000/month' },
      { label: 'Unemployment Insurance (UI)', rate: '1%', note: 'Capped at ₫36,000,000/month' },
    ],
    expatNote: 'Non-residents are taxed at a flat 20% on Vietnam-sourced income. Social insurance and health insurance contributions generally do not apply to non-resident foreigners.',
  },
  indonesia: {
    brackets: [
      { income: '0 – Rp60,000,000', rate: '5%' },
      { income: 'Rp60,000,001 – Rp250,000,000', rate: '15%' },
      { income: 'Rp250,000,001 – Rp500,000,000', rate: '25%' },
      { income: 'Rp500,000,001 – Rp5,000,000,000', rate: '30%' },
      { income: 'Rp5,000,000,001+', rate: '35%' },
    ],
    contributions: [
      { label: 'BPJS Kesehatan', rate: '1%', note: 'Capped at Rp12,000,000/month salary' },
      { label: 'BPJS JHT (Old-Age)', rate: '2%', note: 'Employee share' },
      { label: 'BPJS JP (Pension)', rate: '1%', note: 'Capped at Rp10,547,400/month salary (2025)' },
    ],
    expatNote: 'Non-residents are subject to a flat 20% withholding tax on Indonesia-sourced income. BPJS contributions generally do not apply. PTKP (non-taxable threshold of Rp54,000,000/year) is excluded for non-residents.',
  },
};

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
        </div>
      )}
    </div>
  );
}
