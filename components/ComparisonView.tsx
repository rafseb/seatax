'use client';

import { useMemo } from 'react';
import { COUNTRIES } from '@/lib/countries';
import { calculate } from '@/lib/calculators';
import type { ExchangeRates } from '@/lib/useExchangeRates';

interface Props {
  grossUSD: number;
  period: 'monthly' | 'annual';
  isExpat: boolean;
  exchangeRates: ExchangeRates;
}

function fmtLocal(amount: number, currency: string, symbol: string): string {
  const absAmount = Math.abs(amount);
  if (currency === 'VND' || currency === 'IDR') {
    return `${symbol}${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(absAmount)}`;
  }
  return `${symbol}${new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(absAmount)}`;
}

export default function ComparisonView({ grossUSD, period, isExpat, exchangeRates }: Props) {
  const rows = useMemo(() => {
    if (exchangeRates.loading || grossUSD <= 0) return [];

    return COUNTRIES.map((country) => {
      const rate = exchangeRates.getRate('USD', country.currency);
      if (rate === null) return null;
      const localGross = grossUSD * rate;
      const result = calculate(country.slug, { grossSalary: localGross, period, isExpat });
      if (!result) return null;
      return { country, result };
    }).filter((r): r is NonNullable<typeof r> => r !== null);
  }, [grossUSD, period, isExpat, exchangeRates]);

  // Find country with highest net (in USD terms)
  const bestSlug = useMemo(() => {
    if (rows.length === 0) return null;
    let best = rows[0];
    for (const row of rows) {
      const rowRate = exchangeRates.getRate(row.country.currency, 'USD');
      const bestRate = exchangeRates.getRate(best.country.currency, 'USD');
      if (rowRate !== null && bestRate !== null) {
        if (row.result.netAnnual * rowRate > best.result.netAnnual * bestRate) {
          best = row;
        }
      }
    }
    return best.country.slug;
  }, [rows, exchangeRates]);

  if (exchangeRates.loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <p className="text-sm text-gray-400 text-center">Loading exchange rates for comparison…</p>
      </div>
    );
  }

  if (grossUSD <= 0 || rows.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <p className="text-sm text-gray-400 text-center">Exchange rates unavailable. Cannot show comparison.</p>
      </div>
    );
  }

  const periodLabel = period === 'monthly' ? '/mo' : '/yr';

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Country Comparison</h2>
        <p className="text-xs text-gray-400 mt-0.5">
          All figures converted from USD at live rates. Based on ${Math.round(grossUSD).toLocaleString()} USD {periodLabel}.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-400 uppercase tracking-wide border-b border-gray-100">
              <th className="text-left py-2 pr-3 font-medium">Country</th>
              <th className="text-right py-2 px-3 font-medium">Gross</th>
              <th className="text-right py-2 px-3 font-medium">Tax</th>
              <th className="text-right py-2 px-3 font-medium">Contributions</th>
              <th className="text-right py-2 px-3 font-medium">Net</th>
              <th className="text-right py-2 pl-3 font-medium">Eff. Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {rows.map(({ country, result }) => {
              const isBest = country.slug === bestSlug;
              const contribTotal = result.contributions.reduce((s, c) => s + c.amount, 0);
              const displayGross = fmtLocal(period === 'monthly' ? result.grossMonthly : result.grossAnnual, result.currency, result.currencySymbol);
              const displayTax = fmtLocal(period === 'monthly' ? result.incomeTax / 12 : result.incomeTax, result.currency, result.currencySymbol);
              const displayContrib = fmtLocal(period === 'monthly' ? contribTotal / 12 : contribTotal, result.currency, result.currencySymbol);
              const displayNet = fmtLocal(period === 'monthly' ? result.netMonthly : result.netAnnual, result.currency, result.currencySymbol);
              return (
                <tr key={country.slug} className={`hover:bg-gray-50 ${isBest ? 'bg-green-50' : ''}`}>
                  <td className="py-2.5 pr-3">
                    <span className="flex items-center gap-1.5">
                      <span className="text-base">{country.flag}</span>
                      <span className="font-medium text-gray-900">{country.name}</span>
                      {isBest && (
                        <span className="inline-block px-1.5 py-0.5 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                          Best
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right text-gray-600">{displayGross}</td>
                  <td className="py-2.5 px-3 text-right text-red-600">−{displayTax}</td>
                  <td className="py-2.5 px-3 text-right text-gray-600">−{displayContrib}</td>
                  <td className={`py-2.5 px-3 text-right font-semibold ${isBest ? 'text-green-700' : 'text-gray-900'}`}>
                    {displayNet}
                  </td>
                  <td className="py-2.5 pl-3 text-right text-gray-500">{result.effectiveRate.toFixed(1)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400">
        Note: All figures converted from USD at live rates. Actual take-home pay depends on additional local factors.
      </p>
    </div>
  );
}
