'use client';

import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showLabel = true,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="flex flex-col gap-1.5">
      <Progress value={percentage} className="h-2" />
      {showLabel && (
        <p className="text-xs text-muted-foreground">
          {label || `${Math.round(percentage)}%`}
        </p>
      )}
    </div>
  );
}
