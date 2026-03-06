export interface ContributionItem {
  label: string;
  amount: number; // annual
  color: string;
}

export interface TaxResult {
  grossAnnual: number;
  grossMonthly: number;
  netAnnual: number;
  netMonthly: number;
  incomeTax: number; // annual
  contributions: ContributionItem[];
  totalDeductions: number; // annual
  effectiveRate: number; // percentage 0-100
  currency: string;
  currencySymbol: string;
}

export interface CalculatorParams {
  grossSalary: number;
  period: 'monthly' | 'annual';
  isExpat: boolean;
}

export interface Country {
  slug: string;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  defaultSalary: number; // monthly, in local currency
  salaryStep: number;
  salaryMin: number;
  salaryMax: number;
}
