'use client';

import { useState, useMemo, useEffect } from 'react';
import type { Country } from '@/lib/types';
import { calculate } from '@/lib/calculators';
import { useExchangeRates, type InputCurrencyCode } from '@/lib/useExchangeRates';
import SalaryForm from './SalaryForm';
import ResultsPanel from './ResultsPanel';
import BreakdownChart from './BreakdownChart';
import TaxInfo from './TaxInfo';
import ComparisonView from './ComparisonView';

interface Props {
  country: Country;
}

interface UrlParams {
  salary: number | null;
  period: 'monthly' | 'annual' | null;
  isExpat: boolean | null;
  inputCurrency: InputCurrencyCode | null;
  dependents: number | null;
  maritalStatus: 'single' | 'married' | null;
}

function readUrlParams(): UrlParams {
  if (typeof window === 'undefined') {
    return { salary: null, period: null, isExpat: null, inputCurrency: null, dependents: null, maritalStatus: null };
  }
  const params = new URLSearchParams(window.location.search);
  const salaryRaw = params.get('salary');
  const p = params.get('period');
  const expat = params.get('expat');
  const currency = params.get('currency');
  const deps = params.get('dependents');
  const marital = params.get('maritalStatus');

  return {
    salary: salaryRaw !== null && !isNaN(Number(salaryRaw)) ? Number(salaryRaw) : null,
    period: p === 'monthly' || p === 'annual' ? p : null,
    isExpat: expat === 'true' ? true : expat === 'false' ? false : null,
    inputCurrency: currency === 'local' || currency === 'USD' || currency === 'EUR' || currency === 'GBP'
      ? (currency as InputCurrencyCode)
      : null,
    dependents: deps !== null && !isNaN(Number(deps)) ? Math.min(10, Math.max(0, Number(deps))) : null,
    maritalStatus: marital === 'single' || marital === 'married' ? marital : null,
  };
}

export default function TaxCalculator({ country }: Props) {
  const urlParams = useMemo(() => readUrlParams(), []);

  const [grossSalary, setGrossSalary] = useState(urlParams.salary ?? country.defaultSalary);
  const [period, setPeriod] = useState<'monthly' | 'annual'>(urlParams.period ?? 'monthly');
  const [isExpat, setIsExpat] = useState(urlParams.isExpat ?? false);
  const [inputCurrency, setInputCurrency] = useState<InputCurrencyCode>(urlParams.inputCurrency ?? 'local');
  const [dependents, setDependents] = useState(urlParams.dependents ?? 0);
  const [maritalStatus, setMaritalStatus] = useState<'single' | 'married'>(urlParams.maritalStatus ?? 'single');
  const [showComparison, setShowComparison] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const exchangeRates = useExchangeRates();

  // Set per-country accent via data-country attribute on <html>
  useEffect(() => {
    document.documentElement.dataset.country = country.slug;
    return () => {
      delete document.documentElement.dataset.country;
    };
  }, [country.slug]);

  // Update URL on state changes
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('salary', String(grossSalary));
    params.set('period', period);
    params.set('expat', String(isExpat));
    params.set('currency', inputCurrency);
    params.set('dependents', String(dependents));
    params.set('maritalStatus', maritalStatus);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, '', newUrl);
  }, [grossSalary, period, isExpat, inputCurrency, dependents, maritalStatus]);

  function handleInputCurrencyChange(next: InputCurrencyCode) {
    if (next === 'local') {
      setGrossSalary(country.defaultSalary);
    } else if (inputCurrency === 'local') {
      setGrossSalary(3000);
    }
    setInputCurrency(next);
  }

  function handleShare() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }).catch(() => {
      // Fallback: no-op if clipboard fails
    });
  }

  // Convert input salary to local currency before calculating
  const localSalary = useMemo(() => {
    if (inputCurrency === 'local') return grossSalary;
    const rate = exchangeRates.getRate(inputCurrency, country.currency);
    if (rate === null) return 0;
    return grossSalary * rate;
  }, [grossSalary, inputCurrency, country.currency, exchangeRates]);

  const result = useMemo(
    () => calculate(country.slug, { grossSalary: localSalary, period, isExpat, dependents, maritalStatus }),
    [country.slug, localSalary, period, isExpat, dependents, maritalStatus]
  );

  // Compute gross in USD for comparison view
  const grossUSD = useMemo(() => {
    if (inputCurrency === 'USD') return grossSalary;
    if (inputCurrency === 'local') {
      const rate = exchangeRates.getRate(country.currency, 'USD');
      return rate !== null ? localSalary * rate : 0;
    }
    const rate = exchangeRates.getRate(inputCurrency, 'USD');
    return rate !== null ? grossSalary * rate : 0;
  }, [grossSalary, inputCurrency, country.currency, localSalary, exchangeRates]);

  if (!result) return null;

  return (
    <div className="space-y-6">
      {/* Country hero */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--cream)' }}>
            {country.flag} {country.name} Income Tax Calculator
          </h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--forest-300)' }}>
            Calculate your net salary after tax and mandatory contributions for {country.name}. Tax year {country.taxYear}.
          </p>
        </div>
        <button
          onClick={handleShare}
          className="shrink-0 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors rounded-sm border"
          style={{
            background: 'var(--forest-700)',
            color: 'var(--cream)',
            borderColor: 'var(--forest-600)',
          }}
        >
          {shareCopied ? 'Copied!' : 'Share'}
        </button>
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
          lastUpdated={exchangeRates.lastUpdated}
          dependents={dependents}
          maritalStatus={maritalStatus}
          onSalaryChange={setGrossSalary}
          onPeriodChange={setPeriod}
          onExpatChange={setIsExpat}
          onInputCurrencyChange={handleInputCurrencyChange}
          onDependentsChange={setDependents}
          onMaritalStatusChange={setMaritalStatus}
        />
        <ResultsPanel result={result} period={period} />
      </div>

      {/* Chart */}
      <BreakdownChart result={result} />

      {/* Compare all countries button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowComparison((v) => !v)}
          className="px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors rounded-sm border"
          style={{
            background: showComparison ? 'var(--forest-700)' : 'transparent',
            color: showComparison ? 'var(--cream)' : 'var(--forest-300)',
            borderColor: 'var(--forest-600)',
          }}
        >
          {showComparison ? 'Hide comparison' : 'Compare all countries'}
        </button>
      </div>

      {/* Comparison view */}
      {showComparison && (
        <ComparisonView
          grossUSD={grossUSD}
          period={period}
          isExpat={isExpat}
          exchangeRates={exchangeRates}
        />
      )}

      {/* Tax info / bracket reference */}
      <TaxInfo country={country.slug} />
    </div>
  );
}
