export type CountrySlug = 'philippines' | 'thailand' | 'vietnam' | 'indonesia' | 'malaysia';

export type VisaCategory =
  | 'tourist'
  | 'employment'
  | 'retirement'
  | 'digital-nomad'
  | 'investor'
  | 'student'
  | 'dependent';

export interface VisaEntry {
  name: string;
  category: VisaCategory;
  maxStay: string;
  renewable: boolean;
  workPermitted: boolean;
  minIncome?: string;
  fee?: string;
  notes: string;
  officialUrl: string;
}

export interface CountryVisaData {
  country: CountrySlug;
  lastReviewed: string;
  visas: VisaEntry[];
}

export type CostCategory =
  | 'housing-budget'
  | 'housing-mid'
  | 'housing-expat'
  | 'meal-cheap'
  | 'meal-mid'
  | 'internet-monthly'
  | 'gym-monthly'
  | 'transport-monthly'
  | 'coworking-monthly';

export interface CostDataPoint {
  category: CostCategory;
  label: string;
  usd: number;
}

export interface CountryCostData {
  country: CountrySlug;
  city: string;
  lastReviewed: string;
  costs: CostDataPoint[];
  notes: string;
}
