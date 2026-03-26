import type { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type StatMetricProps = {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
  hint?: ReactNode;
  className?: string;
};

/**
 * Minimal KPI tile for admin and investor dashboards (shadcn Card).
 */
export function StatMetric({ label, value, icon, hint, className }: StatMetricProps) {
  return (
    <Card
      className={cn(
        'border-border/80 shadow-none transition-colors hover:border-border',
        className,
      )}
    >
      <CardContent className="flex flex-col gap-3 pt-5">
        <div className="flex items-start justify-between gap-3">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </span>
          {icon ? (
            <span className="text-muted-foreground [&_svg]:size-4">{icon}</span>
          ) : null}
        </div>
        <p className="text-2xl font-semibold tracking-tight tabular-nums text-foreground">
          {value}
        </p>
        {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      </CardContent>
    </Card>
  );
}
