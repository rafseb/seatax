'use client';

import type { Country } from '@/lib/types';
import { INPUT_CURRENCIES, type InputCurrencyCode, type ExchangeRates } from '@/lib/useExchangeRates';

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
};

interface Props {
  country: Country;
  grossSalary: number;
  period: 'monthly' | 'annual';
  isExpat: boolean;
  inputCurrency: InputCurrencyCode;
  exchangeRates: ExchangeRates;
  lastUpdated: Date | null;
  dependents: number;
  maritalStatus: 'single' | 'married';
  onSalaryChange: (v: number) => void;
  onPeriodChange: (v: 'monthly' | 'annual') => void;
  onExpatChange: (v: boolean) => void;
  onInputCurrencyChange: (v: InputCurrencyCode) => void;
  onDependentsChange: (v: number) => void;
  onMaritalStatusChange: (v: 'single' | 'married') => void;
}

function formatRatesAge(lastUpdated: Date | null): string | null {
  if (!lastUpdated) return null;
  const diffMs = Date.now() - lastUpdated.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) {
    return `Rates updated ${diffMins} min ago`;
  }
  const diffHours = Math.floor(diffMins / 60);
  return `Rates updated ${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
}

const labelClass = 'block text-[10px] font-bold uppercase tracking-[2px] mb-1.5';
const inputStyle = {
  background: 'var(--forest-900)',
  border: '1px solid var(--forest-600)',
  color: 'var(--cream)',
  borderRadius: '3px',
};
const toggleContainerStyle = {
  background: 'var(--forest-900)',
  border: '1px solid var(--forest-600)',
  borderRadius: '3px',
  padding: '3px',
};

export default function SalaryForm({
  country,
  grossSalary,
  period,
  isExpat,
  inputCurrency,
  exchangeRates,
  lastUpdated,
  dependents,
  maritalStatus,
  onSalaryChange,
  onPeriodChange,
  onExpatChange,
  onInputCurrencyChange,
  onDependentsChange,
  onMaritalStatusChange,
}: Props) {
  const isLocal = inputCurrency === 'local';
  const displaySymbol = isLocal ? country.currencySymbol : (CURRENCY_SYMBOLS[inputCurrency] ?? inputCurrency);

  const roundToStep = (value: number, step: number) => Math.round(value / step) * step;

  const toForeign = (localAmount: number): number => {
    const rate = exchangeRates.getRate(country.currency, inputCurrency);
    return rate !== null ? localAmount * rate : 0;
  };

  const sliderMin = isLocal
    ? country.salaryMin
    : (() => { const v = roundToStep(toForeign(country.salaryMin), 100); return v > 0 ? Math.max(100, v) : 500; })();
  const sliderMax = isLocal
    ? country.salaryMax
    : (() => { const v = roundToStep(toForeign(country.salaryMax), 1000); return v > 0 ? Math.max(1000, v) : 30000; })();
  const sliderStep = isLocal ? country.salaryStep : 100;

  let salaryWarning: string | null = null;
  if (isLocal) {
    if (grossSalary < country.salaryMin) {
      salaryWarning = `Minimum salary is ${country.currencySymbol}${country.salaryMin.toLocaleString()}`;
    } else if (grossSalary > country.salaryMax) {
      salaryWarning = `Maximum salary is ${country.currencySymbol}${country.salaryMax.toLocaleString()}`;
    }
  }

  let rateLabel: string | null = null;
  if (!isLocal) {
    if (exchangeRates.loading) {
      rateLabel = 'Fetching live rate…';
    } else if (exchangeRates.error) {
      rateLabel = 'Rate unavailable (using fallback)';
    } else {
      const rate = exchangeRates.getRate(inputCurrency, country.currency);
      if (rate !== null) {
        const fmtRate = rate >= 1000
          ? new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(rate)
          : new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(rate);
        rateLabel = `1 ${inputCurrency} = ${country.currencySymbol}${fmtRate}`;
      }
    }
  }

  const ratesAgeLabel = !isLocal ? formatRatesAge(lastUpdated) : null;

  return (
    <div
      className="p-6 space-y-6"
      style={{ background: 'var(--forest-800)', border: '1px solid var(--forest-700)', borderRadius: '4px' }}
    >
      <h2
        className="text-[10px] font-bold uppercase tracking-[3px]"
        style={{ color: 'var(--gold-500)' }}
      >
        Your Salary
      </h2>

      {/* Salary input + currency selector */}
      <div>
        <label className={labelClass} style={{ color: 'var(--forest-300)' }}>
          Gross Salary
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 font-semibold text-sm"
              style={{ color: 'var(--gold-500)' }}
            >
              {displaySymbol}
            </span>
            <input
              type="number"
              value={grossSalary}
              min={0}
              step={isLocal ? country.salaryStep : 100}
              onChange={(e) => onSalaryChange(Number(e.target.value))}
              className="w-full pl-8 pr-4 py-2.5 text-lg font-semibold focus:outline-none focus:ring-1"
              style={{ ...inputStyle, '--tw-ring-color': 'var(--gold-500)' } as React.CSSProperties}
            />
          </div>
          <select
            value={inputCurrency}
            onChange={(e) => onInputCurrencyChange(e.target.value as InputCurrencyCode)}
            className="px-3 py-2.5 text-sm focus:outline-none focus:ring-1 cursor-pointer"
            style={inputStyle}
          >
            {INPUT_CURRENCIES.map((c) => (
              <option key={c.code} value={c.code} style={{ background: 'var(--forest-900)' }}>
                {c.code === 'local' ? country.currency : c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Slider */}
        <input
          type="range"
          min={sliderMin}
          max={sliderMax}
          step={sliderStep}
          value={Math.min(Math.max(grossSalary, sliderMin), sliderMax)}
          onChange={(e) => onSalaryChange(Number(e.target.value))}
          className="w-full mt-2 h-1 rounded-full cursor-pointer"
          style={{ accentColor: 'var(--gold-500)' }}
        />

        {salaryWarning && (
          <p className="text-xs mt-1.5" style={{ color: 'var(--gold-400)' }}>{salaryWarning}</p>
        )}
        {rateLabel && (
          <p className="text-xs mt-1.5" style={{ color: exchangeRates.error ? 'var(--gold-400)' : 'var(--forest-400)' }}>
            {rateLabel}
          </p>
        )}
        {ratesAgeLabel && (
          <p className="text-xs mt-0.5" style={{ color: 'var(--forest-400)' }}>{ratesAgeLabel}</p>
        )}
      </div>

      {/* Period toggle */}
      <div>
        <label className={labelClass} style={{ color: 'var(--forest-300)' }}>
          Period
        </label>
        <div className="flex gap-1" style={toggleContainerStyle}>
          {(['monthly', 'annual'] as const).map((p) => (
            <button
              key={p}
              onClick={() => onPeriodChange(p)}
              className="flex-1 py-2 text-xs font-semibold uppercase tracking-wide transition-all rounded-[2px]"
              style={{
                background: period === p ? 'var(--forest-700)' : 'transparent',
                color: period === p ? 'var(--cream)' : 'var(--forest-400)',
              }}
            >
              {p === 'monthly' ? 'Monthly' : 'Annual'}
            </button>
          ))}
        </div>
      </div>

      {/* Marital status toggle */}
      <div>
        <label className={labelClass} style={{ color: 'var(--forest-300)' }}>
          Marital Status
        </label>
        <div className="flex gap-1" style={toggleContainerStyle}>
          {(['single', 'married'] as const).map((s) => (
            <button
              key={s}
              onClick={() => onMaritalStatusChange(s)}
              className="flex-1 py-2 text-xs font-semibold uppercase tracking-wide transition-all rounded-[2px]"
              style={{
                background: maritalStatus === s ? 'var(--forest-700)' : 'transparent',
                color: maritalStatus === s ? 'var(--cream)' : 'var(--forest-400)',
              }}
            >
              {s === 'single' ? 'Single' : 'Married'}
            </button>
          ))}
        </div>
      </div>

      {/* Dependents input */}
      <div>
        <label className={labelClass} style={{ color: 'var(--forest-300)' }}>
          Dependents
        </label>
        <input
          type="number"
          min={0}
          max={10}
          value={dependents}
          onChange={(e) => {
            const val = Math.min(10, Math.max(0, Number(e.target.value)));
            onDependentsChange(val);
          }}
          className="w-24 px-3 py-2.5 text-sm focus:outline-none focus:ring-1"
          style={inputStyle}
        />
        <p className="text-xs mt-1" style={{ color: 'var(--forest-400)' }}>
          Number of qualifying dependents (0–10)
        </p>
      </div>

      {/* Expat toggle */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--cream)' }}>Expat / Non-resident</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--forest-300)' }}>
            Apply foreigner tax rates
          </p>
        </div>
        <button
          role="switch"
          aria-checked={isExpat}
          onClick={() => onExpatChange(!isExpat)}
          className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
          style={{ background: isExpat ? 'var(--accent)' : 'var(--forest-600)' }}
        >
          <span
            className="inline-block h-4 w-4 transform rounded-full shadow-sm transition-transform"
            style={{
              background: 'var(--cream)',
              transform: isExpat ? 'translateX(1.5rem)' : 'translateX(0.25rem)',
            }}
          />
        </button>
      </div>

      {isExpat && (
        <div
          className="p-3 rounded-[3px] border-l-2"
          style={{
            background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
            border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)',
            borderLeftColor: 'var(--accent)',
          }}
        >
          <p className="text-xs leading-relaxed" style={{ color: 'var(--forest-200)' }}>
            <strong style={{ color: 'var(--cream)' }}>Expat mode:</strong> Applies non-resident tax rates. Mandatory contributions (social security, health insurance) are excluded as these typically do not apply to non-resident foreigners.
          </p>
        </div>
      )}
    </div>
  );
}
