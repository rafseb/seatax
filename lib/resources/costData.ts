import type { CountryCostData, CostDataPoint } from './types';

const philippinesCosts: CostDataPoint[] = [
  { category: 'housing-budget',    label: 'Budget 1BR apartment',                        usd: 350  },
  { category: 'housing-mid',       label: 'Mid-range 1BR apartment',                     usd: 800  },
  { category: 'housing-expat',     label: 'Expat-grade 1BR apartment',                   usd: 1600 },
  { category: 'meal-cheap',        label: 'Cheap local meal (street food / carenderia)', usd: 3    },
  { category: 'meal-mid',          label: 'Mid-range restaurant meal (per person)',       usd: 15   },
  { category: 'internet-monthly',  label: 'Home broadband (50+ Mbps)',                   usd: 25   },
  { category: 'gym-monthly',       label: 'Gym membership',                              usd: 35   },
  { category: 'transport-monthly', label: 'Monthly public transport',                    usd: 45   },
  { category: 'coworking-monthly', label: 'Co-working hot desk',                         usd: 130  },
];

const thailandCosts: CostDataPoint[] = [
  { category: 'housing-budget',    label: 'Budget 1BR apartment',                        usd: 400  },
  { category: 'housing-mid',       label: 'Mid-range 1BR apartment',                     usd: 700  },
  { category: 'housing-expat',     label: 'Expat-grade 1BR apartment',                   usd: 1500 },
  { category: 'meal-cheap',        label: 'Cheap local meal (street food / hawker)',     usd: 3    },
  { category: 'meal-mid',          label: 'Mid-range restaurant meal (per person)',       usd: 18   },
  { category: 'internet-monthly',  label: 'Home broadband (50+ Mbps)',                   usd: 20   },
  { category: 'gym-monthly',       label: 'Gym membership',                              usd: 40   },
  { category: 'transport-monthly', label: 'Monthly public transport (MRT / BTS)',        usd: 55   },
  { category: 'coworking-monthly', label: 'Co-working hot desk',                         usd: 150  },
];

const vietnamCosts: CostDataPoint[] = [
  { category: 'housing-budget',    label: 'Budget 1BR apartment',                        usd: 350  },
  { category: 'housing-mid',       label: 'Mid-range 1BR apartment',                     usd: 600  },
  { category: 'housing-expat',     label: 'Expat-grade 1BR apartment',                   usd: 1100 },
  { category: 'meal-cheap',        label: 'Cheap local meal (street food / com tam)',    usd: 2    },
  { category: 'meal-mid',          label: 'Mid-range restaurant meal (per person)',       usd: 12   },
  { category: 'internet-monthly',  label: 'Home broadband (50+ Mbps)',                   usd: 15   },
  { category: 'gym-monthly',       label: 'Gym membership',                              usd: 30   },
  { category: 'transport-monthly', label: 'Monthly public transport',                    usd: 35   },
  { category: 'coworking-monthly', label: 'Co-working hot desk',                         usd: 100  },
];

const indonesiaCosts: CostDataPoint[] = [
  { category: 'housing-budget',    label: 'Budget 1BR apartment',                           usd: 300  },
  { category: 'housing-mid',       label: 'Mid-range 1BR apartment',                        usd: 550  },
  { category: 'housing-expat',     label: 'Expat-grade 1BR apartment',                      usd: 1200 },
  { category: 'meal-cheap',        label: 'Cheap local meal (warung / street food)',        usd: 2    },
  { category: 'meal-mid',          label: 'Mid-range restaurant meal (per person)',          usd: 10   },
  { category: 'internet-monthly',  label: 'Home broadband (50+ Mbps)',                      usd: 20   },
  { category: 'gym-monthly',       label: 'Gym membership',                                 usd: 40   },
  { category: 'transport-monthly', label: 'Monthly public transport (MRT / Transjakarta)',  usd: 50   },
  { category: 'coworking-monthly', label: 'Co-working hot desk',                            usd: 120  },
];

const malaysiaCosts: CostDataPoint[] = [
  { category: 'housing-budget',    label: 'Budget 1BR apartment',                           usd: 320  },
  { category: 'housing-mid',       label: 'Mid-range 1BR apartment',                        usd: 600  },
  { category: 'housing-expat',     label: 'Expat-grade 1BR apartment',                      usd: 1400 },
  { category: 'meal-cheap',        label: 'Cheap local meal (hawker centre / mamak)',       usd: 3    },
  { category: 'meal-mid',          label: 'Mid-range restaurant meal (per person)',          usd: 15   },
  { category: 'internet-monthly',  label: 'Home broadband (50+ Mbps)',                      usd: 20   },
  { category: 'gym-monthly',       label: 'Gym membership',                                 usd: 40   },
  { category: 'transport-monthly', label: 'Monthly public transport (LRT / MRT / bus)',     usd: 45   },
  { category: 'coworking-monthly', label: 'Co-working hot desk',                            usd: 130  },
];

export const COST_DATA: CountryCostData[] = [
  {
    country: 'philippines',
    city: 'Metro Manila (BGC / Makati)',
    lastReviewed: '2025-07-01',
    costs: philippinesCosts,
    notes:
      'Mid-range prices reflect Makati CBD; expat prices reflect BGC and Rockwell, which command a significant premium over local neighbourhoods in Quezon City and Pasig.',
  },
  {
    country: 'thailand',
    city: 'Bangkok',
    lastReviewed: '2025-07-01',
    costs: thailandCosts,
    notes:
      'Mid-range prices reflect the Sukhumvit and Silom corridors; expat prices reflect prime areas such as Thonglor, Ekkamai, and Sathorn.',
  },
  {
    country: 'vietnam',
    city: 'Ho Chi Minh City (Saigon)',
    lastReviewed: '2025-07-01',
    costs: vietnamCosts,
    notes:
      'Mid-range prices reflect Districts 2 and 7 (Thao Dien, Phu My Hung); expat prices reflect serviced apartments in District 1 and the Binh Thanh expat enclave.',
  },
  {
    country: 'indonesia',
    city: 'Jakarta',
    lastReviewed: '2025-07-01',
    costs: indonesiaCosts,
    notes:
      'Mid-range prices reflect South Jakarta (Kemang, Cilandak); expat prices reflect the SCBD, Sudirman, and Kuningan CBD corridor.',
  },
  {
    country: 'malaysia',
    city: 'Kuala Lumpur',
    lastReviewed: '2025-07-01',
    costs: malaysiaCosts,
    notes:
      "Mid-range prices reflect Mont Kiara and Chow Kit fringe areas; expat prices reflect the KLCC, Bangsar, and Damansara Heights corridor.",
  },
];

export function getCostData(slug: string): CountryCostData | undefined {
  return COST_DATA.find((d) => d.country === slug);
}
