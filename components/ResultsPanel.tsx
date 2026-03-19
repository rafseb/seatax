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

  // Proportions for colored bar
  const gross = result.grossAnnual;
  const taxPct = gross > 0 ? (result.incomeTax / gross) * 100 : 0;
  const contribPct = gross > 0 ? (result.contributions.reduce((s, c) => s + c.amount, 0) / gross) * 100 : 0;
  const netPct = Math.max(0, 100 - taxPct - contribPct);

  return (
    <div
      className="p-6 space-y-5"
      style={{ background: 'var(--forest-800)', border: '1px solid var(--forest-700)', borderRadius: '4px' }}
    >
      {/* Net salary headline */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[3px]" style={{ color: 'var(--gold-500)' }}>
            Net Salary
          </p>
          <p className="mt-2 leading-none" style={{ fontSize: '48px', fontWeight: 900, color: 'var(--cream)', letterSpacing: '-2px' }}>
            <span style={{ fontSize: '24px', fontWeight: 400, color: 'var(--gold-500)', verticalAlign: 'top', lineHeight: '1.2' }}>
              {currencySymbol}
            </span>
            {fmt(period === 'annual' ? result.netAnnual : result.netAnnual / 12, '', currency)}
            <span className="text-base font-normal ml-2" style={{ color: 'var(--forest-400)', letterSpacing: '0' }}>{periodLabel}</span>
          </p>
          {/* Effective rate badge */}
          <span
            className="inline-block mt-2 px-2 py-1 text-[10px] font-bold tracking-wide rounded-[2px]"
            style={{ background: 'var(--forest-700)', color: 'var(--gold-400)' }}
          >
            {result.effectiveRate.toFixed(1)}% effective rate
          </span>
        </div>
        <button
          onClick={() => window.print()}
          className="print:hidden shrink-0 px-2 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors rounded-sm"
          style={{ background: 'var(--forest-700)', color: 'var(--forest-300)', borderRadius: '3px' }}
        >
          Print
        </button>
      </div>

      {/* Proportional color bar */}
      <div className="flex h-1.5 rounded-full overflow-hidden gap-[2px]">
        <div style={{ width: `${netPct}%`, background: 'var(--forest-400)' }} />
        <div style={{ width: `${taxPct}%`, background: 'var(--accent)' }} />
        <div style={{ width: `${contribPct}%`, background: 'var(--gold-500)' }} />
      </div>

      <hr style={{ borderColor: 'var(--forest-700)' }} />

      {/* Breakdown table */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span style={{ color: 'var(--forest-300)' }}>Gross Salary</span>
          <span className="font-medium" style={{ color: 'var(--cream)' }}>{display(result.grossAnnual)}</span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span style={{ color: 'var(--forest-300)' }}>Income Tax</span>
          <span className="font-medium" style={{ color: 'var(--accent)' }}>− {display(result.incomeTax)}</span>
        </div>

        {result.contributions.map((c) => (
          <div key={c.label} className="flex justify-between items-center text-sm">
            <span className="flex items-center gap-2" style={{ color: 'var(--forest-300)' }}>
              <span
                className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: c.color }}
              />
              {c.label}
            </span>
            <span className="font-medium" style={{ color: 'var(--forest-200)' }}>− {display(c.amount)}</span>
          </div>
        ))}

        <hr style={{ borderColor: 'var(--forest-700)', margin: '4px 0' }} />

        <div className="flex justify-between items-center text-sm font-semibold">
          <span style={{ color: 'var(--cream)' }}>Net Salary</span>
          <span style={{ color: 'var(--gold-400)' }}>{display(result.netAnnual)}</span>
        </div>
      </div>

      {/* Secondary period display */}
      <div
        className="p-3 flex justify-between items-center"
        style={{ background: 'var(--forest-900)', border: '1px solid var(--forest-700)', borderRadius: '3px' }}
      >
        <span className="text-xs" style={{ color: 'var(--forest-400)' }}>
          {period === 'monthly' ? 'Annual equivalent' : 'Monthly equivalent'}
        </span>
        <span className="text-sm font-semibold" style={{ color: 'var(--cream)' }}>
          {period === 'monthly'
            ? fmt(result.netAnnual, currencySymbol, currency)
            : fmt(result.netAnnual / 12, currencySymbol, currency)}
        </span>
      </div>
    </div>
  );
}
