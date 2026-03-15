'use client';

import { useState, useEffect } from 'react';

export interface ExchangeRates {
  rates: Record<string, number>;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  // Returns how many units of `to` equal 1 unit of `from`
  // e.g. getRate('USD', 'PHP') = 56.23
  getRate: (from: string, to: string) => number | null;
}

const CACHE_KEY = 'sea-tax-rates';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

// Fallback rates relative to USD (approximate as of 2025)
const FALLBACK_RATES: Record<string, number> = {
  USD: 1,
  PHP: 56.5,
  THB: 35.1,
  VND: 25400,
  IDR: 16350,
  EUR: 0.92,
  GBP: 0.79,
};

interface CacheEntry {
  rates: Record<string, number>;
  timestamp: number;
}

function loadCache(): CacheEntry | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry;
    if (typeof entry.timestamp !== 'number' || typeof entry.rates !== 'object') return null;
    return entry;
  } catch {
    return null;
  }
}

function saveCache(rates: Record<string, number>): void {
  try {
    const entry: CacheEntry = { rates, timestamp: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // localStorage may be unavailable (SSR, private browsing quota exceeded)
  }
}

export function useExchangeRates(): ExchangeRates {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    // Check cache first
    const cached = loadCache();
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      setRates(cached.rates);
      setLastUpdated(new Date(cached.timestamp));
      setLoading(false);
      return;
    }

    // Fetch fresh rates
    fetch('https://open.er-api.com/v6/latest/USD')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch exchange rates');
        return res.json();
      })
      .then((data: unknown) => {
        if (
          data !== null &&
          typeof data === 'object' &&
          'result' in data &&
          data.result === 'success' &&
          'rates' in data &&
          typeof data.rates === 'object' &&
          data.rates !== null
        ) {
          const fetchedRates = data.rates as Record<string, number>;
          setRates(fetchedRates);
          setLastUpdated(new Date());
          saveCache(fetchedRates);
        } else {
          throw new Error('Invalid response from exchange rate API');
        }
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        // Use fallback rates so the app remains functional
        setRates(FALLBACK_RATES);
        setLastUpdated(null);
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

  return { rates, loading, error, lastUpdated, getRate };
}

export const INPUT_CURRENCIES = [
  { code: 'local', label: 'Local', symbol: '' },
  { code: 'USD', label: 'USD', symbol: '$' },
  { code: 'EUR', label: 'EUR', symbol: '€' },
  { code: 'GBP', label: 'GBP', symbol: '£' },
] as const;

export type InputCurrencyCode = 'local' | 'USD' | 'EUR' | 'GBP';
