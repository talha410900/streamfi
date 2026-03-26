// Formatting utilities for StreamFi Ventures
// USD, dates, and other display formats

export function formatUSD(value: number | null | undefined): string {
  if (value === null || value === undefined) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatUSDCompact(value: number | null | undefined): string {
  if (value === null || value === undefined) return '$0';
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}K`;
  }
  return formatUSD(value);
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatShortDate(date: Date | string | null | undefined): string {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  });
}

export function formatPercent(value: number | null | undefined, decimals = 2): string {
  if (value === null || value === undefined) return '0%';
  return `${value.toFixed(decimals)}%`;
}

export function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined) return '0';
  return new Intl.NumberFormat('en-US').format(value);
}

export function formatStatus(status: string): string {
  return status
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getStatusColor(
  status:
    | 'pending'
    | 'active'
    | 'closed'
    | 'approved'
    | 'rejected'
    | 'kyc'
    | 'questionnaire'
    | 'documents',
): 'green' | 'yellow' | 'red' | 'blue' {
  switch (status) {
    case 'active':
    case 'approved':
      return 'green';
    case 'pending':
    case 'kyc':
    case 'questionnaire':
    case 'documents':
      return 'yellow';
    case 'closed':
    case 'rejected':
      return 'red';
    default:
      return 'blue';
  }
}
