'use client';

import { ReactNode } from 'react';
import { Empty } from '@/components/ui/empty';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <Empty
      icon={icon}
      title={title}
      description={description}
      actions={action}
    />
  );
}
