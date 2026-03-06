import type { CalculatorParams, TaxResult } from '../types';
import { calculate as calculatePhilippines } from './philippines';
import { calculate as calculateThailand } from './thailand';
import { calculate as calculateVietnam } from './vietnam';
import { calculate as calculateIndonesia } from './indonesia';

const calculators: Record<string, (params: CalculatorParams) => TaxResult> = {
  philippines: calculatePhilippines,
  thailand: calculateThailand,
  vietnam: calculateVietnam,
  indonesia: calculateIndonesia,
};

export function calculate(country: string, params: CalculatorParams): TaxResult | null {
  const calc = calculators[country];
  if (!calc) return null;
  return calc(params);
}
