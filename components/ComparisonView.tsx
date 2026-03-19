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

const cardStyle = {
  background: 'var(--forest-800)',
  border: '1px solid var(--forest-700)',
  borderRadius: '4px',
};

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
      <div className="p-6" style={cardStyle}>
        <p className="text-sm text-center" style={{ color: 'var(--forest-400)' }}>Loading exchange rates for comparison…</p>
      </div>
    );
  }

  if (grossUSD <= 0 || rows.length === 0) {
    return (
      <div className="p-6" style={cardStyle}>
        <p className="text-sm text-center" style={{ color: 'var(--forest-400)' }}>Exchange rates unavailable. Cannot show comparison.</p>
      </div>
    );
  }

  const periodLabel = period === 'monthly' ? '/mo' : '/yr';

  return (
    <div className="p-6 space-y-4" style={cardStyle}>
      <div>
        <h2
          className="text-[10px] font-bold uppercase tracking-[3px]"
          style={{ color: 'var(--gold-500)' }}
        >
          Country Comparison
        </h2>
        <p className="text-xs mt-0.5" style={{ color: 'var(--forest-400)' }}>
          All figures converted from USD at live rates. Based on ${Math.round(grossUSD).toLocaleString()} USD {periodLabel}.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr
              className="text-[10px] uppercase tracking-wider"
              style={{ borderBottom: '1px solid var(--forest-700)', color: 'var(--forest-400)' }}
            >
              <th className="text-left py-2 pr-3 font-medium">Country</th>
              <th className="text-right py-2 px-3 font-medium">Gross</th>
              <th className="text-right py-2 px-3 font-medium">Tax</th>
              <th className="text-right py-2 px-3 font-medium">Contributions</th>
              <th className="text-right py-2 px-3 font-medium">Net</th>
              <th className="text-right py-2 pl-3 font-medium">Eff. Rate</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ country, result }) => {
              const isBest = country.slug === bestSlug;
              const contribTotal = result.contributions.reduce((s, c) => s + c.amount, 0);
              const displayGross = fmtLocal(period === 'monthly' ? result.grossMonthly : result.grossAnnual, result.currency, result.currencySymbol);
              const displayTax = fmtLocal(period === 'monthly' ? result.incomeTax / 12 : result.incomeTax, result.currency, result.currencySymbol);
              const displayContrib = fmtLocal(period === 'monthly' ? contribTotal / 12 : contribTotal, result.currency, result.currencySymbol);
              const displayNet = fmtLocal(period === 'monthly' ? result.netMonthly : result.netAnnual, result.currency, result.currencySymbol);
              return (
                <tr
                  key={country.slug}
                  style={{
                    borderBottom: '1px solid var(--forest-700)',
                    background: isBest ? 'var(--forest-700)' : 'transparent',
                  }}
                >
                  <td className="py-2.5 pr-3">
                    <span className="flex items-center gap-1.5">
                      <span className="text-base">{country.flag}</span>
                      <span className="font-medium" style={{ color: 'var(--cream)' }}>{country.name}</span>
                      {isBest && (
                        <span
                          className="inline-block px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded-[2px]"
                          style={{ background: 'color-mix(in srgb, var(--gold-500) 20%, transparent)', color: 'var(--gold-400)' }}
                        >
                          Best
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right" style={{ color: 'var(--forest-300)' }}>{displayGross}</td>
                  <td className="py-2.5 px-3 text-right" style={{ color: 'var(--accent)' }}>−{displayTax}</td>
                  <td className="py-2.5 px-3 text-right" style={{ color: 'var(--forest-300)' }}>−{displayContrib}</td>
                  <td className="py-2.5 px-3 text-right font-semibold" style={{ color: isBest ? 'var(--gold-400)' : 'var(--cream)' }}>
                    {displayNet}
                  </td>
                  <td className="py-2.5 pl-3 text-right" style={{ color: 'var(--forest-400)' }}>{result.effectiveRate.toFixed(1)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs" style={{ color: 'var(--forest-400)' }}>
        Note: All figures converted from USD at live rates. Actual take-home pay depends on additional local factors.
      </p>
    </div>
  );
}
