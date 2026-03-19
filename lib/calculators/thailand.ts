import type { CalculatorParams, TaxResult } from '../types';

// Thailand personal income tax brackets (annual taxable income after deductions)
const TAX_BRACKETS = [
  { min: 0, max: 150000, base: 0, rate: 0 },
  { min: 150000, max: 300000, base: 0, rate: 0.05 },
  { min: 300000, max: 500000, base: 7500, rate: 0.10 },
  { min: 500000, max: 750000, base: 27500, rate: 0.15 },
  { min: 750000, max: 1000000, base: 65000, rate: 0.20 },
  { min: 1000000, max: 2000000, base: 115000, rate: 0.25 },
  { min: 2000000, max: 5000000, base: 365000, rate: 0.30 },
  { min: 5000000, max: Infinity, base: 1265000, rate: 0.35 },
];

function computeProgressiveTax(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;
  for (const bracket of TAX_BRACKETS) {
    if (taxableIncome <= bracket.max) {
      return bracket.base + (taxableIncome - bracket.min) * bracket.rate;
    }
  }
  return 0;
}

export function calculate(params: CalculatorParams): TaxResult {
  const { grossSalary, period, isExpat, dependents = 0 } = params;
  const grossMonthly = period === 'monthly' ? grossSalary : grossSalary / 12;
  const grossAnnual = grossMonthly * 12;

  // SSF: 5% employee, salary cap THB 15,000/month → max THB 750/month
  const ssfMonthly = Math.min(grossMonthly, 15000) * 0.05;
  const ssfAnnual = ssfMonthly * 12;

  let incomeTax: number;
  let contributions: TaxResult['contributions'];

  if (isExpat) {
    // Non-residents: progressive rates on Thailand-sourced income, no SSF, no standard deductions
    incomeTax = computeProgressiveTax(grossAnnual);
    contributions = [];
  } else {
    // Standard deduction: 50% of income, max THB 100,000
    const standardDeduction = Math.min(grossAnnual * 0.5, 100000);
    // Personal allowance
    const personalAllowance = 60000;
    // Child allowance: ฿30,000/year per dependent
    const childAllowance = dependents * 30000;
    const taxableIncome = Math.max(0, grossAnnual - ssfAnnual - standardDeduction - personalAllowance - childAllowance);
    incomeTax = computeProgressiveTax(taxableIncome);
    contributions = [
      { label: 'Social Security (SSF)', amount: ssfAnnual, color: '#c97c4a' },
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
    currency: 'THB',
    currencySymbol: '฿',
  };
}
