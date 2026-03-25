'use client';

import { formatUSD, formatUSDCompact } from '@/lib/formatting';

interface CurrencyDisplayProps {
  amount: number | null | undefined;
  compact?: boolean;
  className?: string;
}

export function CurrencyDisplay({ amount, compact = false, className = '' }: CurrencyDisplayProps) {
  const formatted = compact ? formatUSDCompact(amount) : formatUSD(amount);

  return <span className={className}>{formatted}</span>;
}
