import type { CalculatorParams, TaxResult } from '../types';

// YA 2026 resident income tax brackets (annual, SGD). Top rate 24% above $1,000,000.
// Source: IRAS individual income tax rates for resident taxpayers.
const TAX_BRACKETS = [
  { min: 0, max: 20000, base: 0, rate: 0.0 },
  { min: 20000, max: 30000, base: 0, rate: 0.02 },
  { min: 30000, max: 40000, base: 200, rate: 0.035 },
  { min: 40000, max: 80000, base: 550, rate: 0.07 },
  { min: 80000, max: 120000, base: 3350, rate: 0.115 },
  { min: 120000, max: 160000, base: 7950, rate: 0.15 },
  { min: 160000, max: 200000, base: 13950, rate: 0.18 },
  { min: 200000, max: 240000, base: 21150, rate: 0.19 },
  { min: 240000, max: 280000, base: 28750, rate: 0.195 },
  { min: 280000, max: 320000, base: 36550, rate: 0.20 },
  { min: 320000, max: 500000, base: 44550, rate: 0.22 },
  { min: 500000, max: 1000000, base: 84150, rate: 0.23 },
  { min: 1000000, max: Infinity, base: 199150, rate: 0.24 },
];

// CPF Ordinary Wage ceiling, S$/month, from 1 January 2026.
const CPF_OW_CEILING = 8000;
// Employee share of CPF for members aged 55 and below.
const CPF_EMPLOYEE_RATE = 0.20;

// Non-resident employment income: the higher of a flat 15% or the resident rates.
const NON_RESIDENT_FLAT_RATE = 0.15;

// Total personal reliefs a resident may claim are capped at S$80,000 per YA.
const RELIEF_CAP = 80000;

function computeProgressiveTax(annualIncome: number): number {
  for (const bracket of TAX_BRACKETS) {
    if (annualIncome <= bracket.max) {
      return bracket.base + (annualIncome - bracket.min) * bracket.rate;
    }
  }
  return 0;
}

export function calculate(params: CalculatorParams): TaxResult {
  const { grossSalary, period, isExpat, dependents = 0, maritalStatus = 'single' } = params;
  const grossMonthly = period === 'monthly' ? grossSalary : grossSalary / 12;
  const grossAnnual = grossMonthly * 12;

  let incomeTax: number;
  let contributions: TaxResult['contributions'];

  if (isExpat) {
    // Non-residents (under 183 days): employment income is taxed at the higher of a
    // flat 15% or the resident progressive rates. No CPF — it is confined to
    // Singapore Citizens and Permanent Residents — and no personal reliefs.
    incomeTax = Math.max(
      grossAnnual * NON_RESIDENT_FLAT_RATE,
      computeProgressiveTax(grossAnnual),
    );
    contributions = [];
  } else {
    // CPF applies to Citizens and PRs only, on Ordinary Wages up to the monthly ceiling.
    const cpfBase = Math.min(grossMonthly, CPF_OW_CEILING);
    const cpfAnnual = cpfBase * CPF_EMPLOYEE_RATE * 12;

    // Reliefs. Employee CPF contributions are deductible, plus earned income relief
    // and the family reliefs, all subject to the S$80,000 aggregate cap.
    const earnedIncomeRelief = 1000;
    const spouseRelief = maritalStatus === 'married' ? 2000 : 0;
    const childRelief = dependents * 4000;
    const totalRelief = Math.min(
      cpfAnnual + earnedIncomeRelief + spouseRelief + childRelief,
      RELIEF_CAP,
    );

    const taxableIncome = Math.max(0, grossAnnual - totalRelief);
    incomeTax = computeProgressiveTax(taxableIncome);

    contributions = [{ label: 'CPF', amount: cpfAnnual, color: '#c97c4a' }];
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
    currency: 'SGD',
    currencySymbol: 'S$',
  };
}
