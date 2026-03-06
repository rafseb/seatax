'use client';

import type { TaxResult } from '@/lib/types';

interface Props {
  result: TaxResult;
  period: 'monthly' | 'annual';
}

function fmt(amount: number, symbol: string, currency: string): string {
  const absAmount = Math.abs(amount);
  let formatted: string;

  if (currency === 'VND' || currency === 'IDR') {
    formatted = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(absAmount);
  } else {
    formatted = new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(absAmount);
  }

  return `${symbol}${formatted}`;
}

export default function ResultsPanel({ result, period }: Props) {
  const { currencySymbol, currency } = result;
  const display = (annual: number) =>
    fmt(period === 'annual' ? annual : annual / 12, currencySymbol, currency);

  const periodLabel = period === 'monthly' ? '/ month' : '/ year';

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
      {/* Net salary headline */}
      <div>
        <p className="text-sm font-medium text-gray-500">Net Salary</p>
        <p className="text-4xl font-bold text-gray-900 mt-1">
          {display(result.netAnnual)}
          <span className="text-base font-normal text-gray-400 ml-2">{periodLabel}</span>
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Effective rate: {result.effectiveRate.toFixed(1)}%
        </p>
      </div>

      <hr className="border-gray-100" />

      {/* Breakdown table */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Gross Salary</span>
          <span className="font-medium text-gray-900">{display(result.grossAnnual)}</span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Income Tax</span>
          <span className="font-medium text-red-600">− {display(result.incomeTax)}</span>
        </div>

        {result.contributions.map((c) => (
          <div key={c.label} className="flex justify-between items-center text-sm">
            <span className="flex items-center gap-2 text-gray-600">
              <span
                className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: c.color }}
              />
              {c.label}
            </span>
            <span className="font-medium text-gray-700">− {display(c.amount)}</span>
          </div>
        ))}

        <hr className="border-gray-100 my-1" />

        <div className="flex justify-between items-center text-sm font-semibold">
          <span className="text-gray-900">Net Salary</span>
          <span className="text-green-600">{display(result.netAnnual)}</span>
        </div>
      </div>

      {/* Secondary period display */}
      <div className="bg-gray-50 rounded-xl p-3 flex justify-between items-center">
        <span className="text-xs text-gray-500">
          {period === 'monthly' ? 'Annual equivalent' : 'Monthly equivalent'}
        </span>
        <span className="text-sm font-semibold text-gray-700">
          {period === 'monthly'
            ? fmt(result.netAnnual, currencySymbol, currency)
            : fmt(result.netAnnual / 12, currencySymbol, currency)}
        </span>
      </div>
    </div>
  );
}
