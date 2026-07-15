import type { CalculatorParams, TaxResult } from '../types';

// Vietnam PIT brackets (monthly taxable income after personal deduction)
// 5-bracket schedule under the amended PIT Law, effective for the 2026 tax year
const TAX_BRACKETS = [
  { min: 0, max: 10000000, base: 0, rate: 0.05 },
  { min: 10000000, max: 30000000, base: 500000, rate: 0.10 },
  { min: 30000000, max: 60000000, base: 2500000, rate: 0.20 },
  { min: 60000000, max: 100000000, base: 8500000, rate: 0.30 },
  { min: 100000000, max: Infinity, base: 20500000, rate: 0.35 },
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

  // Social Insurance: 8% employee, salary cap 20× reference salary of VND 2,530,000
  // = VND 50,600,000/month (Decree 161/2026/ND-CP, effective 1 July 2026)
  const siBase = Math.min(grossMonthly, 50600000);
  const siMonthly = siBase * 0.08;
  const siAnnual = siMonthly * 12;

  // Health Insurance: 1.5% employee, same cap as Social Insurance
  const hiMonthly = siBase * 0.015;
  const hiAnnual = hiMonthly * 12;

  // Unemployment Insurance: 1% employee, salary cap 20× Region I minimum wage of
  // VND 5,310,000 = VND 106,200,000/month (Decree 293/2025/ND-CP, from 1 Jan 2026)
  const uiBase = Math.min(grossMonthly, 106200000);
  const uiMonthly = uiBase * 0.01;
  const uiAnnual = uiMonthly * 12;

  let incomeTax: number;
  let contributions: TaxResult['contributions'];

  if (isExpat) {
    // Non-residents: flat 20% on Vietnam-sourced income, no social contributions
    incomeTax = grossAnnual * 0.20;
    contributions = [];
  } else {
    // Personal deduction: VND 15,500,000/month (2026 tax year)
    const personalDeduction = 15500000;
    // Dependent deduction: ₫6,200,000/month per dependent (2026 tax year)
    const dependentDeduction = dependents * 6200000;
    const monthlyTaxable = Math.max(0, grossMonthly - siMonthly - hiMonthly - uiMonthly - personalDeduction - dependentDeduction);
    const monthlyTax = computeProgressiveTax(monthlyTaxable);
    incomeTax = monthlyTax * 12;
    contributions = [
      { label: 'Social Insurance (SI)', amount: siAnnual, color: '#c97c4a' },
      { label: 'Health Insurance (HI)', amount: hiAnnual, color: '#b06038' },
      { label: 'Unemployment Insurance (UI)', amount: uiAnnual, color: '#8c4628' },
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
