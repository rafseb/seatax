'use client';

import { useState, useMemo } from 'react';
import type { Country } from '@/lib/types';
import { calculate } from '@/lib/calculators';
import { useExchangeRates, type InputCurrencyCode } from '@/lib/useExchangeRates';
import SalaryForm from './SalaryForm';
import ResultsPanel from './ResultsPanel';
import BreakdownChart from './BreakdownChart';
import TaxInfo from './TaxInfo';

interface Props {
  country: Country;
}

export default function TaxCalculator({ country }: Props) {
  const [grossSalary, setGrossSalary] = useState(country.defaultSalary);
  const [period, setPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [isExpat, setIsExpat] = useState(false);
  const [inputCurrency, setInputCurrency] = useState<InputCurrencyCode>('local');
  const exchangeRates = useExchangeRates();

  function handleInputCurrencyChange(next: InputCurrencyCode) {
    // Reset salary to a sensible default for the new currency
    if (next === 'local') {
      setGrossSalary(country.defaultSalary);
    } else if (inputCurrency === 'local') {
      setGrossSalary(3000); // sensible monthly USD/EUR/GBP default
    }
    setInputCurrency(next);
  }

  // Convert input salary to local currency before calculating
  const localSalary = useMemo(() => {
    if (inputCurrency === 'local') return grossSalary;
    const rate = exchangeRates.getRate(inputCurrency, country.currency);
    if (rate === null) return 0;
    return grossSalary * rate;
  }, [grossSalary, inputCurrency, country.currency, exchangeRates]);

  const result = useMemo(
    () => calculate(country.slug, { grossSalary: localSalary, period, isExpat }),
    [country.slug, localSalary, period, isExpat]
  );

  if (!result) return null;

  return (
    <div className="space-y-6">
      {/* Country hero */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {country.flag} {country.name} Income Tax Calculator
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Calculate your net salary after tax and mandatory contributions for {country.name}. Tax year 2024/2025.
        </p>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <SalaryForm
          country={country}
          grossSalary={grossSalary}
          period={period}
          isExpat={isExpat}
          inputCurrency={inputCurrency}
          exchangeRates={exchangeRates}
          onSalaryChange={setGrossSalary}
          onPeriodChange={setPeriod}
          onExpatChange={setIsExpat}
          onInputCurrencyChange={handleInputCurrencyChange}
        />
        <ResultsPanel result={result} period={period} />
      </div>

      {/* Chart */}
      <BreakdownChart result={result} />

      {/* Tax info / bracket reference */}
      <TaxInfo country={country.slug} />
    </div>
  );
}
