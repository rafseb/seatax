import type { CalculatorParams, TaxResult } from '../types';

// TRAIN Law tax brackets (annual)
const TAX_BRACKETS = [
  { min: 0, max: 250000, base: 0, rate: 0 },
  { min: 250000, max: 400000, base: 0, rate: 0.15 },
  { min: 400000, max: 800000, base: 22500, rate: 0.20 },
  { min: 800000, max: 2000000, base: 102500, rate: 0.25 },
  { min: 2000000, max: 8000000, base: 402500, rate: 0.30 },
  { min: 8000000, max: Infinity, base: 2202500, rate: 0.35 },
];

function computeProgressiveTax(annualIncome: number): number {
  for (const bracket of TAX_BRACKETS) {
    if (annualIncome <= bracket.max) {
      return bracket.base + (annualIncome - bracket.min) * bracket.rate;
    }
  }
  return 0;
}

export function calculate(params: CalculatorParams): TaxResult {
  const { grossSalary, period, isExpat } = params;
  const grossMonthly = period === 'monthly' ? grossSalary : grossSalary / 12;
  const grossAnnual = grossMonthly * 12;

  // SSS: 5% employee, monthly salary capped at PHP 35,000 (2025 rate per RA 11199)
  const sssBase = Math.min(grossMonthly, 35000);
  const sssMonthly = sssBase * 0.05;
  const sssAnnual = sssMonthly * 12;

  // PhilHealth: 2.5% employee, salary cap PHP 100,000/mo, floor PHP 500, ceiling PHP 2,500
  const philhealthMonthly = Math.min(Math.max(grossMonthly * 0.025, 500), 2500);
  const philhealthAnnual = philhealthMonthly * 12;

  // Pag-IBIG: 2% employee, salary cap PHP 10,000, max PHP 200/month
  const pagibigMonthly = Math.min(Math.min(grossMonthly, 10000) * 0.02, 200);
  const pagibigAnnual = pagibigMonthly * 12;

  let incomeTax: number;
  let contributions: TaxResult['contributions'];

  if (isExpat) {
    // Non-residents: flat 25% on gross compensation, no mandatory contributions
    incomeTax = grossAnnual * 0.25;
    contributions = [];
  } else {
    incomeTax = computeProgressiveTax(grossAnnual);
    contributions = [
      { label: 'SSS', amount: sssAnnual, color: '#3b82f6' },
      { label: 'PhilHealth', amount: philhealthAnnual, color: '#8b5cf6' },
      { label: 'Pag-IBIG', amount: pagibigAnnual, color: '#f59e0b' },
    ];
  }

  const totalContributions = contributions.reduce((sum, c) => sum + c.amount, 0);
  const totalDeductions = incomeTax + totalContributions;
  const netAnnual = grossAnnual - totalDeductions;
  const netMonthly = netAnnual / 12;
  const effectiveRate = grossAnnual > 0 ? (totalDeductions / grossAnnual) * 100 : 0;

  return {
    grossAnnual,
    grossMonthly,
    netAnnual,
    netMonthly,
    incomeTax,
    contributions,
    totalDeductions,
    effectiveRate,
    currency: 'PHP',
    currencySymbol: '₱',
  };
}
