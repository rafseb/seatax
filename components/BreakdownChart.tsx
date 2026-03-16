'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { TaxResult } from '@/lib/types';

interface Props {
  result: TaxResult;
}

const TAKE_HOME_COLOR = '#22c55e';
const TAX_COLOR = '#ef4444';

interface TooltipPayloadItem {
  name: string;
  value: number;
  payload: { color: string };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  grossAnnual: number;
  fmt: (v: number) => string;
}

function CustomTooltip({ active, payload, grossAnnual, fmt }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const item = payload[0];
    const pct = ((item.value / grossAnnual) * 100).toFixed(1);
    return (
      <div className="bg-white border border-gray-100 shadow-lg rounded-xl px-3 py-2 text-sm">
        <p className="font-semibold text-gray-900">{item.name}</p>
        <p className="text-gray-600">{fmt(item.value)} <span className="text-gray-400">({pct}%)</span></p>
      </div>
    );
  }
  return null;
}

export default function BreakdownChart({ result }: Props) {
  const { currency, currencySymbol } = result;

  const fmt = (v: number) => {
    if (currency === 'VND' || currency === 'IDR') {
      return `${currencySymbol}${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Math.round(v / 1000))}K`;
    }
    return `${currencySymbol}${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Math.round(v))}`;
  };

  const data = [
    { name: 'Take-home', value: Math.round(result.netAnnual), color: TAKE_HOME_COLOR },
    { name: 'Income Tax', value: Math.round(result.incomeTax), color: TAX_COLOR },
    ...result.contributions.map((c) => ({
      name: c.label,
      value: Math.round(c.amount),
      color: c.color,
    })),
  ].filter((d) => d.value > 0);

  const grossAnnual = result.grossAnnual;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Salary Breakdown</h2>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip content={(props) => (
            <CustomTooltip
              active={props.active}
              payload={props.payload as TooltipPayloadItem[] | undefined}
              grossAnnual={grossAnnual}
              fmt={fmt}
            />
          )} />
          <Legend
            formatter={(value) => (
              <span className="text-sm text-gray-600">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
