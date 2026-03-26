'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CurrencyDisplay } from '@/components/shared/currency-display';
import { DateDisplay } from '@/components/shared/date-display';
import { DashboardPageHeader } from '@/components/shared/dashboard-page-header';
import {
  investorDensity,
  investorCardClass,
} from '@/components/investor/investor-density';
import {
  TrendingUp,
  DollarSign,
  Wallet,
  ArrowRight,
  Coins,
  ArrowUpRight,
  Film,
  FileText,
  Bell,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

function StatCard({
  title,
  value,
  icon,
  description,
  trend,
}: {
  title: string;
  value: string | React.ReactNode;
  icon: React.ReactNode;
  description?: string;
  trend?: { value: number; label: string };
}) {
  return (
    <Card className={investorCardClass()}>
      <CardContent
        className={cn(
          'flex flex-col gap-2 pt-4',
          investorDensity.cardContent,
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {title}
          </span>
          <div className="text-muted-foreground">{icon}</div>
        </div>
        <p className="text-2xl font-semibold tracking-tight tabular-nums">{value}</p>
        {trend ? (
          <div className="flex flex-wrap items-center gap-1 text-xs text-chart-1">
            <ArrowUpRight className="size-3 shrink-0" />
            <span>+{trend.value}%</span>
            <span className="text-muted-foreground">{trend.label}</span>
          </div>
        ) : null}
        {description ? <p className="text-xs text-muted-foreground">{description}</p> : null}
      </CardContent>
    </Card>
  );
}

const portfolioData = {
  totalValue: 125000,
  totalInvested: 125000,
  totalTokens: 45000,
  activeDeals: 2,
  totalDistributions: 4300,
};

const investments = [
  {
    id: 1,
    deal: 'Midnight Heist',
    amount: 50000,
    tokens: 5000,
    tokenSymbol: 'MHT',
    revenueShare: 15,
    productionStatus: 'pre_production',
    distributionStatus: 'pending',
    distributions: 2500,
    investedDate: '2026-01-15',
    progress: 64,
  },
  {
    id: 2,
    deal: 'Last Dance',
    amount: 75000,
    tokens: 1500,
    tokenSymbol: 'LD',
    revenueShare: 12,
    productionStatus: 'production',
    distributionStatus: 'active',
    distributions: 1800,
    investedDate: '2025-11-20',
    progress: 100,
  },
];

const recentDistributions = [
  { id: 1, deal: 'Midnight Heist', amount: 2500, date: '2026-03-20' },
  { id: 2, deal: 'Last Dance', amount: 1800, date: '2026-03-15' },
];

const upcomingEvents = [
  { id: 1, type: 'distribution' as const, title: 'Midnight Heist Q1 distribution', date: '2026-04-01' },
  { id: 2, type: 'milestone' as const, title: 'Last Dance — production wrap', date: '2026-04-15' },
  { id: 3, type: 'deadline' as const, title: 'K-1 available', date: '2026-03-31' },
];

const eventDot: Record<(typeof upcomingEvents)[number]['type'], string> = {
  distribution: 'bg-chart-1',
  milestone: 'bg-chart-2',
  deadline: 'bg-chart-3',
};

export default function InvestorDashboardPage() {
  return (
    <div className={investorDensity.page}>
      <DashboardPageHeader
        title="Portfolio"
        description="Investments, token positions, and cash distributions."
        actions={
          <Button variant="outline" size="sm">
            <Bell data-icon="inline-start" />
            Notifications
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
        <StatCard
          title="Portfolio value"
          value={<CurrencyDisplay amount={portfolioData.totalValue} />}
          icon={<DollarSign />}
          trend={{ value: 8.5, label: 'from distributions' }}
        />
        <StatCard
          title="Capital deployed"
          value={<CurrencyDisplay amount={portfolioData.totalInvested} />}
          icon={<TrendingUp />}
          description={`${portfolioData.activeDeals} active deals`}
        />
        <StatCard
          title="Token holdings"
          value={portfolioData.totalTokens.toLocaleString()}
          icon={<Coins />}
          description="Units across deals"
        />
        <StatCard
          title="Distributions"
          value={<CurrencyDisplay amount={portfolioData.totalDistributions} />}
          icon={<ArrowUpRight />}
          description="Lifetime paid"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
        <div className="lg:col-span-2">
          <Tabs defaultValue="investments" className="w-full">
            <TabsList className="grid h-9 w-full max-w-md grid-cols-2">
              <TabsTrigger value="investments">Investments</TabsTrigger>
              <TabsTrigger value="tokens">Tokens</TabsTrigger>
            </TabsList>

            <TabsContent value="investments" className="mt-3">
              <Card className={investorCardClass()}>
                <CardHeader
                  className={`flex flex-row flex-wrap items-start justify-between gap-3 border-b border-border ${investorDensity.cardHeader}`}
                >
                  <div className="flex flex-col gap-1">
                    <CardTitle className="text-base font-semibold">Positions</CardTitle>
                    <CardDescription>Revenue participation by show</CardDescription>
                  </div>
                  <Link href="/investor/investments">
                    <Button variant="outline" size="sm">
                      View all
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className={investorDensity.cardContentSection}>
                  <div className="flex flex-col gap-3">
                    {investments.map((inv) => (
                      <div
                        key={inv.id}
                        className="rounded-lg border border-border bg-card p-3 sm:p-3.5"
                      >
                        <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                          <div className="flex flex-col gap-0.5">
                            <p className="font-medium">{inv.deal}</p>
                            <p className="text-xs text-muted-foreground">
                              Invested <DateDisplay date={inv.investedDate} />
                            </p>
                          </div>
                          <Badge variant={inv.progress === 100 ? 'default' : 'secondary'}>
                            {inv.progress === 100 ? 'Funded' : 'Active'}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm sm:grid-cols-4 sm:gap-x-4">
                          <div className="flex flex-col gap-0.5">
                            <p className="text-xs text-muted-foreground">Invested</p>
                            <p className="font-medium tabular-nums">
                              <CurrencyDisplay amount={inv.amount} />
                            </p>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <p className="text-xs text-muted-foreground">Tokens</p>
                            <p className="font-medium tabular-nums">
                              {inv.tokens.toLocaleString()} {inv.tokenSymbol}
                            </p>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <p className="text-xs text-muted-foreground">Rev share</p>
                            <p className="font-medium tabular-nums">{inv.revenueShare}%</p>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <p className="text-xs text-muted-foreground">Paid</p>
                            <p className="font-medium tabular-nums text-chart-1">
                              <CurrencyDisplay amount={inv.distributions} />
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Film className="size-3 shrink-0" />
                            <span className="capitalize">
                              {inv.productionStatus.replace('_', ' ')}
                            </span>
                          </div>
                          <Link href="/investor/investments">
                            <Button variant="ghost" size="sm" className="h-8 text-xs">
                              Details
                              <ArrowRight data-icon="inline-end" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tokens" className="mt-3">
              <Card className={investorCardClass()}>
                <CardHeader
                  className={`border-b border-border ${investorDensity.cardHeader}`}
                >
                  <CardTitle className="text-base font-semibold">By deal</CardTitle>
                  <CardDescription>SPL tokens linked to your wallet</CardDescription>
                </CardHeader>
                <CardContent className={investorDensity.cardContentSection}>
                  <div className="flex flex-col gap-2">
                    {investments.map((inv) => (
                      <div
                        key={inv.id}
                        className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex size-9 items-center justify-center rounded-md bg-muted">
                            <Coins className="size-4 text-muted-foreground" />
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <p className="text-sm font-medium">{inv.tokenSymbol}</p>
                            <p className="text-xs text-muted-foreground">{inv.deal}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium tabular-nums">
                            {inv.tokens.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">units</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex flex-col gap-4">
          <Card className={investorCardClass()}>
            <CardHeader
              className={`flex flex-row items-center justify-between border-b border-border ${investorDensity.cardHeader}`}
            >
              <CardTitle className="text-base font-semibold">Recent distributions</CardTitle>
              <Link href="/investor/distributions">
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  All
                </Button>
              </Link>
            </CardHeader>
            <CardContent className={`${investorDensity.cardContent} pt-3`}>
              <div className="flex flex-col">
                {recentDistributions.map((dist, i) => (
                  <div
                    key={dist.id}
                    className={
                      i < recentDistributions.length - 1
                        ? 'flex items-center justify-between gap-2 border-b border-border py-2.5'
                        : 'flex items-center justify-between gap-2 py-2.5'
                    }
                  >
                    <div className="min-w-0 flex flex-col gap-0.5">
                      <p className="truncate text-sm font-medium">{dist.deal}</p>
                      <p className="text-xs text-muted-foreground">
                        <DateDisplay date={dist.date} />
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-medium tabular-nums text-chart-1">
                      +<CurrencyDisplay amount={dist.amount} />
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className={investorCardClass()}>
            <CardHeader
              className={`border-b border-border ${investorDensity.cardHeader}`}
            >
              <CardTitle className="text-base font-semibold">Calendar</CardTitle>
              <CardDescription>Upcoming milestones</CardDescription>
            </CardHeader>
            <CardContent className={`${investorDensity.cardContent} pt-3`}>
              <div className="flex flex-col gap-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex gap-2.5">
                    <div
                      className={`mt-1.5 size-2 shrink-0 rounded-full ${eventDot[event.type]}`}
                    />
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <p className="text-sm font-medium leading-snug">{event.title}</p>
                      <p className="text-xs text-muted-foreground">
                        <DateDisplay date={event.date} />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className={investorCardClass()}>
            <CardHeader
              className={`border-b border-border ${investorDensity.cardHeader}`}
            >
              <CardTitle className="text-base font-semibold">Shortcuts</CardTitle>
            </CardHeader>
            <CardContent className={`flex flex-col gap-1.5 ${investorDensity.cardContent} pt-3`}>
              <Link href="/investor/deals">
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp data-icon="inline-start" />
                  Open deals
                </Button>
              </Link>
              <Link href="/investor/documents">
                <Button variant="outline" className="w-full justify-start">
                  <FileText data-icon="inline-start" />
                  Documents
                </Button>
              </Link>
              <Link href="/investor/wallet">
                <Button variant="outline" className="w-full justify-start">
                  <Wallet data-icon="inline-start" />
                  Wallet
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
