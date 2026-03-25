'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RevenueLogForm } from '@/components/admin/revenue-log-form';
import { CurrencyDisplay } from '@/components/shared/currency-display';
import { DateDisplay } from '@/components/shared/date-display';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

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
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Revenue Management</h1>
        <p className="text-muted-foreground mt-1">Log revenue and manage distributions</p>
      </div>

      <Card className="border border-border/50">
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
          <CardDescription>Cumulative revenue from all deals</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold tracking-tight">
            <CurrencyDisplay amount={totalRevenue} />
          </p>
          <p className="text-sm text-muted-foreground mt-2">from {revenues.length} revenue events</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueLogForm deals={deals} onSubmit={handleLogRevenue} isLoading={isLoading} />

        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle>Recent Revenue</CardTitle>
            <CardDescription>Latest incoming payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {revenues.slice(0, 5).map((revenue) => (
                <div key={revenue.id} className="pb-3 border-b border-border/50 last:border-b-0">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-semibold">{revenue.deal_title}</p>
                    <p className="font-semibold text-green-600 dark:text-green-400 flex items-center gap-1">
                      <ArrowUpRight className="size-3" />
                      <CurrencyDisplay amount={revenue.amount} />
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">{revenue.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
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
