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
  onSalaryChange: (v: number) => void;
  onPeriodChange: (v: 'monthly' | 'annual') => void;
  onExpatChange: (v: boolean) => void;
  onInputCurrencyChange: (v: InputCurrencyCode) => void;
}

export default function SalaryForm({
  country,
  grossSalary,
  period,
  isExpat,
  inputCurrency,
  exchangeRates,
  onSalaryChange,
  onPeriodChange,
  onExpatChange,
  onInputCurrencyChange,
}: Props) {
  const isLocal = inputCurrency === 'local';
  const displaySymbol = isLocal ? country.currencySymbol : (CURRENCY_SYMBOLS[inputCurrency] ?? inputCurrency);

  // Rate indicator: "1 USD = ₱56.23"
  let rateLabel: string | null = null;
  if (!isLocal) {
    if (exchangeRates.loading) {
      rateLabel = 'Fetching live rate…';
    } else if (exchangeRates.error) {
      rateLabel = 'Rate unavailable';
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

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">Your Salary</h2>

      {/* Salary input + currency selector */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1.5">
          Gross Salary
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">
              {displaySymbol}
            </span>
            <input
              type="number"
              value={grossSalary}
              min={0}
              step={isLocal ? country.salaryStep : 100}
              onChange={(e) => onSalaryChange(Number(e.target.value))}
              className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={inputCurrency}
            onChange={(e) => onInputCurrencyChange(e.target.value as InputCurrencyCode)}
            className="px-3 py-2.5 border border-gray-200 rounded-xl text-gray-900 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
          >
            {INPUT_CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code === 'local' ? country.currency : c.label}
              </option>
            ))}
          </select>
        </div>
        {rateLabel && (
          <p className={`text-xs mt-1.5 ${exchangeRates.error ? 'text-red-500' : 'text-gray-400'}`}>
            {rateLabel}
          </p>
        )}
      </div>

      {/* Period toggle */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1.5">
          Period
        </label>
        <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
          {(['monthly', 'annual'] as const).map((p) => (
            <button
              key={p}
              onClick={() => onPeriodChange(p)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                period === p
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {p === 'monthly' ? 'Monthly' : 'Annual'}
            </button>
          ))}
        </div>
      </div>

      {/* Expat toggle */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-900">Expat / Non-resident</p>
          <p className="text-xs text-gray-500 mt-0.5">
            Apply foreigner tax rates
          </p>
        </div>
        <button
          role="switch"
          aria-checked={isExpat}
          onClick={() => onExpatChange(!isExpat)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isExpat ? 'bg-blue-600' : 'bg-gray-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
              isExpat ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {isExpat && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong>Expat mode:</strong> Applies non-resident tax rates. Mandatory contributions (social security, health insurance) are excluded as these typically do not apply to non-resident foreigners.
          </p>
        </div>
      )}
    </div>
  );
}
