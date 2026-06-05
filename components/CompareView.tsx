'use client';

import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import type { Country } from '@/lib/types';
import { calculate } from '@/lib/calculators';
import { useExchangeRates } from '@/lib/useExchangeRates';
import { formatLocalAmount } from '@/lib/formatCurrency';

interface Props {
  a: Country;
  b: Country;
  costWinnerSlug: string | null;
  nomadWinnerSlug: string | null;
}

const cardStyle = {
  background: 'var(--forest-800)',
  border: '1px solid var(--forest-700)',
  borderRadius: '4px',
};

const DEFAULT_GROSS_USD = 2000;

export default function CompareView({ a, b, costWinnerSlug, nomadWinnerSlug }: Props) {
  const exchangeRates = useExchangeRates();
  const [grossUSD, setGrossUSD] = useState(DEFAULT_GROSS_USD);
  const [period, setPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [isExpat, setIsExpat] = useState(false);

  const rows = useMemo(() => {
    if (exchangeRates.loading || grossUSD <= 0) return null;
    const build = (country: Country) => {
      const rate = exchangeRates.getRate('USD', country.currency);
      if (rate === null) return null;
      const localGross = grossUSD * rate;
      const result = calculate(country.slug, { grossSalary: localGross, period, isExpat });
      if (!result) return null;
      const toUSD = exchangeRates.getRate(country.currency, 'USD');
      if (toUSD === null) return null;
      const netLocal = period === 'monthly' ? result.netMonthly : result.netAnnual;
      const netUSD = netLocal * toUSD;
      return { country, result, netUSD };
    };
    const ra = build(a);
    const rb = build(b);
    if (!ra || !rb) return null;
    return { ra, rb };
  }, [a, b, grossUSD, period, isExpat, exchangeRates]);

  const taxWinner = useMemo(() => {
    if (!rows) return null;
    const ea = rows.ra.result.effectiveRate;
    const eb = rows.rb.result.effectiveRate;
    if (ea < eb) return a.slug;
    if (eb < ea) return b.slug;
    return null;
  }, [rows, a.slug, b.slug]);

  const netWinner = useMemo(() => {
    if (!rows) return null;
    if (rows.ra.netUSD > rows.rb.netUSD) return a.slug;
    if (rows.rb.netUSD > rows.ra.netUSD) return b.slug;
    return null;
  }, [rows, a.slug, b.slug]);

  const nameFor = (slug: string | null): string => {
    if (slug === a.slug) return `${a.flag} ${a.name}`;
    if (slug === b.slug) return `${b.flag} ${b.name}`;
    return 'Too close to call';
  };

  const periodLabel = period === 'monthly' ? '/mo' : '/yr';

  const toggleBtn = (active: boolean): CSSProperties => ({
    padding: '4px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 600,
    background: active ? 'var(--gold-500)' : 'transparent',
    color: active ? 'var(--forest-950)' : 'var(--forest-300)',
    border: `1px solid ${active ? 'var(--gold-500)' : 'var(--forest-700)'}`,
  });

  const verdicts = [
    { label: 'Lower income tax', slug: taxWinner },
    { label: 'Higher net pay', slug: netWinner },
    { label: 'Cheaper to live', slug: costWinnerSlug },
    { label: 'Easier nomad visa', slug: nomadWinnerSlug },
  ];

  return (
    <div className="space-y-6">
      {/* Verdict strip */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        {verdicts.map((v) => (
          <div key={v.label} className="p-3" style={cardStyle}>
            <p className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: 'var(--gold-500)' }}>
              {v.label}
            </p>
            <p className="mt-1 text-sm font-semibold" style={{ color: 'var(--cream)' }}>
              {nameFor(v.slug)}
            </p>
          </div>
        ))}
      </div>

      {/* Controls + table */}
      <div className="p-6 space-y-4" style={cardStyle}>
        <div className="flex flex-wrap items-end gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: 'var(--forest-400)' }}>
              Gross salary (USD)
            </span>
            <input
              type="number"
              min={0}
              step={100}
              value={grossUSD}
              onChange={(e) => setGrossUSD(Math.max(0, Number(e.target.value)))}
              className="w-32 px-2 py-1 text-sm rounded"
              style={{ background: 'var(--forest-900)', color: 'var(--cream)', border: '1px solid var(--forest-700)' }}
            />
          </label>
          <div className="flex gap-2">
            <button type="button" aria-pressed={period === 'monthly'} onClick={() => setPeriod('monthly')} style={toggleBtn(period === 'monthly')}>
              Monthly
            </button>
            <button type="button" aria-pressed={period === 'annual'} onClick={() => setPeriod('annual')} style={toggleBtn(period === 'annual')}>
              Annual
            </button>
          </div>
          <div className="flex gap-2">
            <button type="button" aria-pressed={!isExpat} onClick={() => setIsExpat(false)} style={toggleBtn(!isExpat)}>
              Resident
            </button>
            <button type="button" aria-pressed={isExpat} onClick={() => setIsExpat(true)} style={toggleBtn(isExpat)}>
              Expat
            </button>
          </div>
        </div>

        {exchangeRates.loading ? (
          <p className="text-sm text-center" style={{ color: 'var(--forest-400)' }}>Loading exchange rates…</p>
        ) : grossUSD <= 0 ? (
          <p className="text-sm text-center" style={{ color: 'var(--forest-400)' }}>Enter a salary above to compare.</p>
        ) : !rows ? (
          <p className="text-sm text-center" style={{ color: 'var(--forest-400)' }}>Exchange rates unavailable. Cannot show comparison.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider" style={{ borderBottom: '1px solid var(--forest-700)', color: 'var(--forest-400)' }}>
                  <th className="text-left py-2 pr-3 font-medium">Country</th>
                  <th className="text-right py-2 px-3 font-medium">Gross</th>
                  <th className="text-right py-2 px-3 font-medium">Tax</th>
                  <th className="text-right py-2 px-3 font-medium">Contributions</th>
                  <th className="text-right py-2 px-3 font-medium">Net {periodLabel}</th>
                  <th className="text-right py-2 pl-3 font-medium">Eff. Rate</th>
                </tr>
              </thead>
              <tbody>
                {[rows.ra, rows.rb].map(({ country, result }) => {
                  const contribTotal = result.contributions.reduce((s, c) => s + c.amount, 0);
                  const displayGross = formatLocalAmount(period === 'monthly' ? result.grossMonthly : result.grossAnnual, result.currency, result.currencySymbol);
                  const displayTax = formatLocalAmount(period === 'monthly' ? result.incomeTax / 12 : result.incomeTax, result.currency, result.currencySymbol);
                  const displayContrib = formatLocalAmount(period === 'monthly' ? contribTotal / 12 : contribTotal, result.currency, result.currencySymbol);
                  const displayNet = formatLocalAmount(period === 'monthly' ? result.netMonthly : result.netAnnual, result.currency, result.currencySymbol);
                  return (
                    <tr key={country.slug} style={{ borderBottom: '1px solid var(--forest-700)' }}>
                      <td className="py-2.5 pr-3">
                        <span className="flex items-center gap-1.5">
                          <span className="text-base">{country.flag}</span>
                          <span className="font-medium" style={{ color: 'var(--cream)' }}>{country.name}</span>
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right" style={{ color: 'var(--forest-300)' }}>{displayGross}</td>
                      <td className="py-2.5 px-3 text-right" style={{ color: 'var(--accent)' }}>−{displayTax}</td>
                      <td className="py-2.5 px-3 text-right" style={{ color: 'var(--forest-300)' }}>−{displayContrib}</td>
                      <td className="py-2.5 px-3 text-right font-semibold" style={{ color: 'var(--cream)' }}>{displayNet}</td>
                      <td className="py-2.5 pl-3 text-right" style={{ color: 'var(--forest-400)' }}>{result.effectiveRate.toFixed(1)}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <p className="text-xs" style={{ color: 'var(--forest-400)' }}>
          Figures converted from USD at live rates. Actual take-home pay depends on additional local factors.
        </p>
      </div>
    </div>
  );
}
