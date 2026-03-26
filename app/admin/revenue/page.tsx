'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RevenueLogForm } from '@/components/admin/revenue-log-form';
import { CurrencyDisplay } from '@/components/shared/currency-display';
import { DateDisplay } from '@/components/shared/date-display';
import { ArrowUpRight } from 'lucide-react';
import { DashboardPageHeader } from '@/components/shared/dashboard-page-header';
import { adminDensity, adminCardClass } from '@/components/admin/admin-density';

export default function AdminRevenuePage() {
  const deals = [
    { id: 1, title: 'Midnight Heist' },
    { id: 2, title: 'Last Dance' },
  ];

  const [revenues, setRevenues] = useState([
    {
      id: 1,
      deal_id: 1,
      deal_title: 'Midnight Heist',
      amount: 5000,
      date: '2026-03-20',
      description: 'Licensing revenue',
    },
    {
      id: 2,
      deal_id: 2,
      deal_title: 'Last Dance',
      amount: 3500,
      date: '2026-03-15',
      description: 'Streaming platform payout',
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const handleLogRevenue = async (data: any) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newRevenue = {
      id: revenues.length + 1,
      deal_id: data.deal_id,
      deal_title: deals.find((d) => d.id === data.deal_id)?.title || '',
      amount: data.amount,
      date: data.date,
      description: data.description,
    };
    setRevenues([newRevenue, ...revenues]);
    console.log('[v0] Revenue logged:', data);
    setIsLoading(false);
  };

  const totalRevenue = revenues.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className={adminDensity.page}>
      <DashboardPageHeader
        title="Revenue"
        description="Log Lookhu inflows and keep an auditable trail before distributions."
      />

      <Card className={adminCardClass()}>
        <CardHeader className={adminDensity.cardHeader}>
          <CardTitle>Total Revenue</CardTitle>
          <CardDescription>Cumulative revenue from all deals</CardDescription>
        </CardHeader>
        <CardContent className={adminDensity.cardContentSection}>
          <p className="text-3xl font-bold tracking-tight sm:text-4xl">
            <CurrencyDisplay amount={totalRevenue} />
          </p>
          <p className="mt-1.5 text-sm text-muted-foreground">
            from {revenues.length} revenue events
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
        <RevenueLogForm deals={deals} onSubmit={handleLogRevenue} isLoading={isLoading} />

        <Card className={adminCardClass()}>
          <CardHeader className={adminDensity.cardHeader}>
            <CardTitle>Recent Revenue</CardTitle>
            <CardDescription>Latest incoming payments</CardDescription>
          </CardHeader>
          <CardContent className={adminDensity.cardContent}>
            <div className="flex flex-col gap-2">
              {revenues.slice(0, 5).map((revenue) => (
                <div key={revenue.id} className="border-b border-border/50 pb-2.5 last:border-b-0 last:pb-0">
                  <div className="mb-1 flex items-start justify-between">
                    <p className="font-semibold">{revenue.deal_title}</p>
                    <p className="flex items-center gap-1 font-semibold text-chart-1">
                      <ArrowUpRight className="size-3 shrink-0" />
                      <CurrencyDisplay amount={revenue.amount} />
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">{revenue.description}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    <DateDisplay date={revenue.date} />
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
