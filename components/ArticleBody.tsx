'use client';

import React, { useState } from 'react';
import { useExchangeRates } from '@/lib/useExchangeRates';
import type { ArticleSection } from '@/lib/articles/types';

interface Props {
  sections: ArticleSection[];
  localCurrency: string;
  localSymbol: string;
}

type ViewCurrency = 'USD' | 'EUR' | 'GBP';

const VIEW_CURRENCY_SYMBOLS: Record<ViewCurrency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
};

function buildCurrencyRegex(symbol: string): RegExp {
  if (symbol.length > 1) {
    const escaped = symbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`${escaped}[\\d,]+(?:\\.\\d+)?`, 'g');
  }
  const escaped = symbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`${escaped}[\\d,]+(?:\\.\\d+)?`, 'g');
}

function parseAmount(raw: string, symbol: string): number {
  return parseFloat(raw.replace(symbol, '').replace(/,/g, ''));
}

function formatConverted(amount: number): string {
  if (amount >= 100) {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(amount);
  }
  return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
}

interface RenderParagraphProps {
  text: string;
  localCurrency: string;
  localSymbol: string;
  viewCurrency: ViewCurrency;
  getRate: (from: string, to: string) => number | null;
  loading: boolean;
}

function renderParagraph({
  text,
  localCurrency,
  localSymbol,
  viewCurrency,
  getRate,
  loading,
}: RenderParagraphProps): React.ReactNode {
  if (!localSymbol) return text;

  const regex = buildCurrencyRegex(localSymbol);
  const parts: (string | React.ReactElement)[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  regex.lastIndex = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const raw = match[0];
    const localAmount = parseAmount(raw, localSymbol);
    const rate = getRate(localCurrency, viewCurrency);

    let suffix: React.ReactElement | null = null;
    if (!loading && rate !== null) {
      const converted = localAmount * rate;
      const symbol = VIEW_CURRENCY_SYMBOLS[viewCurrency];
      suffix = (
        <span key={match.index} className="text-xs ml-0.5" style={{ color: 'var(--gold-400)' }}>
          ≈ {symbol}{formatConverted(converted)}
        </span>
      );
    } else if (loading) {
      suffix = (
        <span key={match.index} className="text-xs ml-0.5" style={{ color: 'var(--forest-400)' }}>
          …
        </span>
      );
    }

    parts.push(
      <span key={`amount-${match.index}`}>
        {raw}
        {suffix}
      </span>
    );

    lastIndex = match.index + raw.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export default function ArticleBody({ sections, localCurrency, localSymbol }: Props) {
  const [viewCurrency, setViewCurrency] = useState<ViewCurrency>('USD');
  const { getRate, loading } = useExchangeRates();

  return (
    <div>
      {localSymbol && (
        <div className="flex items-center gap-2 mb-6 text-sm" style={{ color: 'var(--forest-400)' }}>
          <span>Show amounts in:</span>
          {(['USD', 'EUR', 'GBP'] as ViewCurrency[]).map((c) => (
            <button
              key={c}
              onClick={() => setViewCurrency(c)}
              className="px-2 py-0.5 rounded-[2px] text-xs font-semibold uppercase tracking-wide transition-colors"
              style={{
                background: viewCurrency === c ? 'var(--gold-500)' : 'var(--forest-700)',
                color: viewCurrency === c ? 'var(--forest-900)' : 'var(--forest-300)',
              }}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-8">
        {sections.map((section) => (
          <section key={section.heading} className="mb-8">
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--cream)' }}>{section.heading}</h2>
            {section.body.split('\n\n').map((paragraph, i) => (
              <p key={i} className="leading-relaxed mb-3" style={{ color: 'var(--forest-200)', fontSize: '13px' }}>
                {renderParagraph({
                  text: paragraph,
                  localCurrency,
                  localSymbol,
                  viewCurrency,
                  getRate,
                  loading,
                })}
              </p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
