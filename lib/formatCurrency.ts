/** Format a local-currency amount with its symbol and no decimal places. */
export function formatLocalAmount(amount: number, currency: string, symbol: string): string {
  const absAmount = Math.abs(amount);
  if (currency === 'VND' || currency === 'IDR') {
    return `${symbol}${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(absAmount)}`;
  }
  return `${symbol}${new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(absAmount)}`;
}
