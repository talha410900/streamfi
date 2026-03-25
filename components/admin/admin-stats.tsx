'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CurrencyDisplay } from '@/components/shared/currency-display';
import { TrendingUp, Users, DollarSign, Coins, ArrowUpRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number | React.ReactNode;
  icon: React.ReactNode;
  trend?: string;
}

function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <Card className="border border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="text-primary">{icon}</div>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <p className="text-2xl font-bold tracking-tight">{value}</p>
        {trend && (
          <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
            <ArrowUpRight className="size-3" />
            {trend}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function AdminStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
