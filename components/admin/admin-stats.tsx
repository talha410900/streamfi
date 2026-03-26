'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CurrencyDisplay } from '@/components/shared/currency-display';
import { TrendingUp, Users, DollarSign, Coins, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { adminDensity, adminCardClass } from '@/components/admin/admin-density';

interface StatCardProps {
  title: string;
  value: string | number | React.ReactNode;
  icon: React.ReactNode;
  trend?: string;
}

function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <Card className={adminCardClass()}>
      <CardHeader className="flex flex-row items-center justify-between border-0 px-4 pb-2 pt-0">
        <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent className={cn('flex flex-col gap-1 pt-0', adminDensity.cardContent)}>
        <p className="text-2xl font-semibold tracking-tight tabular-nums">{value}</p>
        {trend ? (
          <p className="flex items-center gap-1 text-xs text-chart-1">
            <ArrowUpRight className="size-3 shrink-0" />
            {trend}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}

export function AdminStats() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
      <StatCard
        title="Active Deals"
        value="3"
        icon={<TrendingUp className="size-4" />}
        trend="1 new this week"
      />
      <StatCard
        title="Total Investors"
        value="24"
        icon={<Users className="size-4" />}
        trend="3 this month"
      />
      <StatCard
        title="Capital Raised"
        value={<CurrencyDisplay amount={2500000} />}
        icon={<DollarSign className="size-4" />}
      />
      <StatCard
        title="Tokens Issued"
        value="150,000"
        icon={<Coins className="size-4" />}
      />
    </div>
  );
}
