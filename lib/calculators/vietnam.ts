import type { CalculatorParams, TaxResult } from '../types';

// Vietnam PIT brackets (monthly taxable income after personal deduction)
const TAX_BRACKETS = [
  { min: 0, max: 5000000, base: 0, rate: 0.05 },
  { min: 5000000, max: 10000000, base: 250000, rate: 0.10 },
  { min: 10000000, max: 18000000, base: 750000, rate: 0.15 },
  { min: 18000000, max: 32000000, base: 1950000, rate: 0.20 },
  { min: 32000000, max: 52000000, base: 4750000, rate: 0.25 },
  { min: 52000000, max: 80000000, base: 9750000, rate: 0.30 },
  { min: 80000000, max: Infinity, base: 18150000, rate: 0.35 },
];

function computeProgressiveTax(monthlyTaxable: number): number {
  if (monthlyTaxable <= 0) return 0;
  for (const bracket of TAX_BRACKETS) {
    if (monthlyTaxable <= bracket.max) {
      return bracket.base + (monthlyTaxable - bracket.min) * bracket.rate;
    }
  }
  return 0;
}

export function calculate(params: CalculatorParams): TaxResult {
  const { grossSalary, period, isExpat, dependents = 0 } = params;
  const grossMonthly = period === 'monthly' ? grossSalary : grossSalary / 12;
  const grossAnnual = grossMonthly * 12;

  // Social Insurance: 8% employee, salary cap VND 36,000,000/month
  const siBase = Math.min(grossMonthly, 36000000);
  const siMonthly = siBase * 0.08;
  const siAnnual = siMonthly * 12;

  // Health Insurance: 1.5% employee, salary cap VND 36,000,000/month
  const hiMonthly = siBase * 0.015;
  const hiAnnual = hiMonthly * 12;

  // Unemployment Insurance: 1% employee, salary cap VND 36,000,000/month
  const uiMonthly = siBase * 0.01;
  const uiAnnual = uiMonthly * 12;

  let incomeTax: number;
  let contributions: TaxResult['contributions'];

  if (isExpat) {
    // Non-residents: flat 20% on Vietnam-sourced income, no social contributions
    incomeTax = grossAnnual * 0.20;
    contributions = [];
  } else {
    // Personal deduction: VND 11,000,000/month
    const personalDeduction = 11000000;
    // Dependent deduction: ₫4,400,000/month per dependent
    const dependentDeduction = dependents * 4400000;
    const monthlyTaxable = Math.max(0, grossMonthly - siMonthly - hiMonthly - uiMonthly - personalDeduction - dependentDeduction);
    const monthlyTax = computeProgressiveTax(monthlyTaxable);
    incomeTax = monthlyTax * 12;
    contributions = [
      { label: 'Social Insurance (SI)', amount: siAnnual, color: '#c9a84c' },
      { label: 'Health Insurance (HI)', amount: hiAnnual, color: '#d4b86a' },
      { label: 'Unemployment Insurance (UI)', amount: uiAnnual, color: '#e0cc96' },
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
    currency: 'VND',
    currencySymbol: '₫',
  };
}
