import type { CalculatorParams, TaxResult } from '../types';

// Indonesia PPh 21 tax brackets (annual taxable income)
const TAX_BRACKETS = [
  { min: 0, max: 60000000, base: 0, rate: 0.05 },
  { min: 60000000, max: 250000000, base: 3000000, rate: 0.15 },
  { min: 250000000, max: 500000000, base: 31500000, rate: 0.25 },
  { min: 500000000, max: 5000000000, base: 94000000, rate: 0.30 },
  { min: 5000000000, max: Infinity, base: 1444000000, rate: 0.35 },
];

// PTKP (non-taxable income threshold) for single individual
const PTKP_ANNUAL = 54000000;

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
  const { grossSalary, period, isExpat, dependents = 0, maritalStatus = 'single' } = params;
  const grossMonthly = period === 'monthly' ? grossSalary : grossSalary / 12;
  const grossAnnual = grossMonthly * 12;

  // BPJS Kesehatan: 1% employee, salary cap IDR 12,000,000/month
  const bpjsKesehatanMonthly = Math.min(grossMonthly, 12000000) * 0.01;
  const bpjsKesehatanAnnual = bpjsKesehatanMonthly * 12;

  // BPJS Ketenagakerjaan JHT: 2% employee (no cap specified for employee portion)
  const jhtMonthly = grossMonthly * 0.02;
  const jhtAnnual = jhtMonthly * 12;

  // BPJS JP (Pension): 1% employee, salary cap IDR 10,547,400/month (2025)
  const pensionMonthly = Math.min(grossMonthly, 10547400) * 0.01;
  const pensionAnnual = pensionMonthly * 12;

  let incomeTax: number;
  let contributions: TaxResult['contributions'];

  if (isExpat) {
    // Non-residents: flat 20% withholding on Indonesia-sourced income, no BPJS
    incomeTax = grossAnnual * 0.20;
    contributions = [];
  } else {
    const totalContribAnnual = bpjsKesehatanAnnual + jhtAnnual + pensionAnnual;
    // PTKP adjustments: +Rp4,500,000 per dependent, +Rp4,500,000 if married
    const marriedAllowance = maritalStatus === 'married' ? 4500000 : 0;
    const dependentAllowance = dependents * 4500000;
    const effectivePTKP = PTKP_ANNUAL + marriedAllowance + dependentAllowance;
    // Taxable income = gross - PTKP - employee contributions (which are deductible)
    const taxableIncome = Math.max(0, grossAnnual - effectivePTKP - totalContribAnnual);
    incomeTax = computeProgressiveTax(taxableIncome);
    contributions = [
      { label: 'BPJS Kesehatan', amount: bpjsKesehatanAnnual, color: '#c97c4a' },
      { label: 'BPJS JHT (Old-Age)', amount: jhtAnnual, color: '#b06038' },
      { label: 'BPJS JP (Pension)', amount: pensionAnnual, color: '#8c4628' },
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
    currency: 'IDR',
    currencySymbol: 'Rp',
  };
}
