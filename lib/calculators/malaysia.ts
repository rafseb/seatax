import type { CalculatorParams, TaxResult } from '../types';

// YA 2024 income tax brackets (annual, MYR)
const TAX_BRACKETS = [
  { min: 0, max: 5000, base: 0, rate: 0.0 },
  { min: 5000, max: 20000, base: 0, rate: 0.01 },
  { min: 20000, max: 35000, base: 150, rate: 0.03 },
  { min: 35000, max: 50000, base: 600, rate: 0.08 },
  { min: 50000, max: 70000, base: 1800, rate: 0.13 },
  { min: 70000, max: 100000, base: 4400, rate: 0.21 },
  { min: 100000, max: 400000, base: 10700, rate: 0.24 },
  { min: 400000, max: 600000, base: 82700, rate: 0.245 },
  { min: 600000, max: 2000000, base: 131700, rate: 0.25 },
  { min: 2000000, max: Infinity, base: 481700, rate: 0.30 },
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
  const { grossSalary, period, isExpat, dependents = 0, maritalStatus = 'single' } = params;
  const grossMonthly = period === 'monthly' ? grossSalary : grossSalary / 12;
  const grossAnnual = grossMonthly * 12;

  let incomeTax: number;
  let contributions: TaxResult['contributions'];

  if (isExpat) {
    // Non-residents: flat 30% on gross income, no contributions, no reliefs
    incomeTax = grossAnnual * 0.30;
    contributions = [];
  } else {
    // EPF: 11% employee contribution, no salary ceiling
    const epfMonthly = grossMonthly * 0.11;
    const epfAnnual = epfMonthly * 12;

    // SOCSO: 0.5% employee, salary capped at RM5,000/month
    const socsoBase = Math.min(grossMonthly, 5000);
    const socsoMonthly = socsoBase * 0.005;
    const socsoAnnual = socsoMonthly * 12;

    // EIS: 0.2% employee, salary capped at RM5,000/month
    const eisBase = Math.min(grossMonthly, 5000);
    const eisMonthly = eisBase * 0.002;
    const eisAnnual = eisMonthly * 12;

    // Tax reliefs
    const personalRelief = 9000;
    const epfRelief = Math.min(epfAnnual, 4000);
    const spouseRelief = maritalStatus === 'married' ? 4000 : 0;
    const childRelief = dependents * 2000;
    const totalRelief = personalRelief + epfRelief + spouseRelief + childRelief;

    const taxableIncome = Math.max(0, grossAnnual - totalRelief);
    incomeTax = computeProgressiveTax(taxableIncome);

    contributions = [
      { label: 'EPF', amount: epfAnnual, color: '#c9a84c' },
      { label: 'SOCSO', amount: socsoAnnual, color: '#d4b86a' },
      { label: 'EIS', amount: eisAnnual, color: '#e0cc96' },
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
    currency: 'MYR',
    currencySymbol: 'RM',
  };
}
