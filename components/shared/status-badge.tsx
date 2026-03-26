'use client';

import { Badge } from '@/components/ui/badge';
import { getStatusColor } from '@/lib/formatting';

export type StatusBadgeStatus =
  | 'pending'
  | 'active'
  | 'closed'
  | 'approved'
  | 'rejected'
  | 'kyc'
  | 'questionnaire'
  | 'documents'
  | 'open'
  | 'funded'
  | 'draft';

interface StatusBadgeProps {
  status: StatusBadgeStatus;
  label?: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const displayLabel = label || status.charAt(0).toUpperCase() + status.slice(1);

  const variantMap: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    green: 'default',
    yellow: 'secondary',
    red: 'destructive',
    blue: 'outline',
  };

  const color = getStatusColor(status as any);
  const variant = variantMap[color] || 'secondary';

  return (
    <Badge variant={variant}>
      {displayLabel}
    </Badge>
  );
}
