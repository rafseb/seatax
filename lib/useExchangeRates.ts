'use client';

import { useState, useEffect } from 'react';

export interface ExchangeRates {
  rates: Record<string, number>; // all rates relative to USD
  loading: boolean;
  error: string | null;
  // Returns how many units of `to` equal 1 unit of `from`
  // e.g. getRate('USD', 'PHP') = 56.23
  getRate: (from: string, to: string) => number | null;
}

export function useExchangeRates(): ExchangeRates {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch exchange rates');
        return res.json();
      })
      .then((data) => {
        if (data.result === 'success') {
          setRates(data.rates);
        } else {
          throw new Error('Invalid response from exchange rate API');
        }
      })
      .catch((err) => {
        setError(err.message ?? 'Unknown error');
      })
      .finally(() => setLoading(false));
  }, []);

  // Cross-rate: 1 `from` = ? `to`
  // rates are all relative to USD, so:
  //   1 USD = rates['PHP'] PHP → 1 PHP = 1/rates['PHP'] USD
  //   1 EUR = rates['PHP']/rates['EUR'] PHP
  const getRate = (from: string, to: string): number | null => {
    if (from === to) return 1;
    if (!rates[from] || !rates[to]) return null;
    return rates[to] / rates[from];
  };

  return { rates, loading, error, getRate };
}

export const INPUT_CURRENCIES = [
  { code: 'local', label: 'Local', symbol: '' },
  { code: 'USD', label: 'USD', symbol: '$' },
  { code: 'EUR', label: 'EUR', symbol: '€' },
  { code: 'GBP', label: 'GBP', symbol: '£' },
] as const;

export type InputCurrencyCode = 'local' | 'USD' | 'EUR' | 'GBP';
