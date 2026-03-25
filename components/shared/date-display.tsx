'use client';

import { formatDate, formatShortDate } from '@/lib/formatting';

interface DateDisplayProps {
  date: Date | string | null | undefined;
  short?: boolean;
  className?: string;
}

export function DateDisplay({ date, short = false, className = '' }: DateDisplayProps) {
  const formatted = short ? formatShortDate(date) : formatDate(date);

  return <span className={className}>{formatted}</span>;
}
