'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CurrencyDisplay } from '@/components/shared/currency-display';
import { DateDisplay } from '@/components/shared/date-display';
import { FundFlowDiagram } from '@/components/shared/fund-flow-diagram';
import {
  Download, ArrowUpRight, TrendingUp, DollarSign,
  Coins, Wallet, ExternalLink, FileText, Info,
} from 'lucide-react';
import { DashboardPageHeader } from '@/components/shared/dashboard-page-header';
import { cn } from '@/lib/utils';
import {
  investorDensity,
  investorCardClass,
} from '@/components/investor/investor-density';
import Link from 'next/link';

const distributions = [
  { id: 1, deal: 'Midnight Heist', grossRevenue: 50000, platformFee: 5000, mgmtFee: 2500, netRevenue: 42500, investorSharePercent: 15, amount: 2500, perUnit: 0.50, units: 5000, date: '2026-03-20', status: 'received', txHash: '5Kp9QmNvR2tX8wZ5yB3cF6dG7hJ8kL9mN0pQ1rS2tU3vW4x' },
  { id: 2, deal: 'Last Dance', grossRevenue: 35000, platformFee: 3500, mgmtFee: 1750, netRevenue: 29750, investorSharePercent: 12, amount: 1800, perUnit: 1.20, units: 1500, date: '2026-03-15', status: 'received', txHash: '7Bt8RpLxM2nQ5vX9zA1cE4fG5hJ6kL7mN8pQ9rS0tU1vW2x' },
  { id: 3, deal: 'Midnight Heist', grossRevenue: 25000, platformFee: 2500, mgmtFee: 1250, netRevenue: 21250, investorSharePercent: 15, amount: 1950, perUnit: 0.39, units: 5000, date: '2026-02-28', status: 'received', txHash: '3Df8GhJkLmN6pQ2rS5tV8wX9yZ0aB1cD2eF3gH4iJ5kL6m' },
  { id: 4, deal: 'Last Dance', grossRevenue: 18000, platformFee: 1800, mgmtFee: 900, netRevenue: 15300, investorSharePercent: 12, amount: 2200, perUnit: 1.47, units: 1500, date: '2026-02-15', status: 'received', txHash: '9Mn5OpQrS7tU1vW3xY5zA7bC8dE9fG0hI1jK2lM3nO4pQ5r' },
  { id: 5, deal: 'Midnight Heist', grossRevenue: 30000, platformFee: 3000, mgmtFee: 1500, netRevenue: 25500, investorSharePercent: 15, amount: 1750, perUnit: 0.35, units: 5000, date: '2026-01-20', status: 'received', txHash: '2Tu6VwXyZ8aB0cD2eF4gH6iJ8kL0mN2pQ4rS6tU8vW0xY2z' },
];

const investments = [
  { id: 1, deal: 'Midnight Heist', tokens: 5000, revenueShare: 15, totalInvested: 50000 },
  { id: 2, deal: 'Last Dance', tokens: 1500, revenueShare: 12, totalInvested: 75000 },
];

const totalReceived = distributions.reduce((sum, d) => sum + d.amount, 0);

export default function InvestorDistributionsPage() {
  const [dealFilter, setDealFilter] = useState('all');
  const [selectedDist, setSelectedDist] = useState<typeof distributions[0] | null>(null);

  const filteredDistributions = distributions.filter((d) => {
    return dealFilter === 'all' || d.deal === dealFilter;
  });

  const dealStats = investments.map((inv) => ({
    ...inv,
    totalDistributions: distributions.filter((d) => d.deal === inv.deal).reduce((sum, d) => sum + d.amount, 0),
    distributionCount: distributions.filter((d) => d.deal === inv.deal).length,
  }));

  return (
    <div className={investorDensity.page}>
      <DashboardPageHeader
        title="Distributions"
        description="Revenue paid to your wallet by deal, with full fee transparency."
      />

      {/* Revenue Flow */}
      <Card className={investorCardClass()}>
        <CardHeader className={investorDensity.cardHeader}>
          <CardTitle className="text-base">Revenue Flow</CardTitle>
          <CardDescription>How revenue reaches your wallet</CardDescription>
        </CardHeader>
        <CardContent className={investorDensity.cardContentSection}>
          <FundFlowDiagram direction="revenue" />
        </CardContent>
      </Card>

      {/* KPI Row */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4 md:gap-4">
        <Card className={investorCardClass()}>
          <CardContent className={cn('flex flex-col gap-2 pt-4', investorDensity.cardContent)}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="size-4 shrink-0" />
              <span className="text-xs font-medium uppercase tracking-wide">Total Received</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums text-chart-1">
              <CurrencyDisplay amount={totalReceived} />
            </p>
            <p className="text-xs text-muted-foreground">Lifetime net distributions</p>
          </CardContent>
        </Card>
        <Card className={investorCardClass()}>
          <CardContent className={cn('flex flex-col gap-2 pt-4', investorDensity.cardContent)}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="size-4 shrink-0" />
              <span className="text-xs font-medium uppercase tracking-wide">Payments</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums">{distributions.length}</p>
            <p className="text-xs text-muted-foreground">Total distributions</p>
          </CardContent>
        </Card>
        <Card className={investorCardClass()}>
          <CardContent className={cn('flex flex-col gap-2 pt-4', investorDensity.cardContent)}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Coins className="size-4 shrink-0" />
              <span className="text-xs font-medium uppercase tracking-wide">Active Deals</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums">{investments.length}</p>
            <p className="text-xs text-muted-foreground">Earning positions</p>
          </CardContent>
        </Card>
        <Card className={investorCardClass()}>
          <CardContent className={cn('flex flex-col gap-2 pt-4', investorDensity.cardContent)}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Wallet className="size-4 shrink-0" />
              <span className="text-xs font-medium uppercase tracking-wide">Avg Payment</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums">
              <CurrencyDisplay amount={totalReceived / distributions.length} />
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Per-Deal Stats */}
      <Card className={investorCardClass()}>
        <CardHeader className={investorDensity.cardHeader}>
          <CardTitle className="text-base">Distributions by Deal</CardTitle>
          <CardDescription>Breakdown of earnings per investment</CardDescription>
        </CardHeader>
        <CardContent className={investorDensity.cardContentSection}>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            {dealStats.map((stat) => (
              <div key={stat.id} className="rounded-lg border border-border bg-card p-3 sm:p-3.5">
                <div className="mb-2 flex items-center justify-between">
                  <p className="font-semibold">{stat.deal}</p>
                  <Badge variant="outline">{stat.revenueShare}% Rev Share</Badge>
                </div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm sm:gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Received</p>
                    <p className="font-semibold text-chart-1">
                      <CurrencyDisplay amount={stat.totalDistributions} />
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Distributions</p>
                    <p className="font-semibold">{stat.distributionCount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Tokens Held</p>
                    <p className="font-semibold">{stat.tokens.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">ROI</p>
                    <p className="font-semibold text-chart-1">
                      {((stat.totalDistributions / stat.totalInvested) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Distribution History with Fee Transparency */}
      <Card className={investorCardClass()}>
        <CardHeader
          className={cn(
            'flex flex-row flex-wrap items-center justify-between gap-3',
            investorDensity.cardHeader,
          )}
        >
          <div>
            <CardTitle className="text-base">Distribution History</CardTitle>
            <CardDescription>All payments with fee transparency</CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={dealFilter} onValueChange={setDealFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by deal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Deals</SelectItem>
                <SelectItem value="Midnight Heist">Midnight Heist</SelectItem>
                <SelectItem value="Last Dance">Last Dance</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download data-icon="inline-start" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent className={investorDensity.cardContentSection}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  <th className={cn('text-left font-semibold', investorDensity.tableHead)}>Deal</th>
                  <th className={cn('text-left font-semibold', investorDensity.tableHead)}>Gross</th>
                  <th className={cn('text-left font-semibold', investorDensity.tableHead)}>Fees</th>
                  <th className={cn('text-left font-semibold', investorDensity.tableHead)}>Your Payout</th>
                  <th className={cn('text-left font-semibold', investorDensity.tableHead)}>Per Unit</th>
                  <th className={cn('text-left font-semibold', investorDensity.tableHead)}>Date</th>
                  <th className={cn('text-left font-semibold', investorDensity.tableHead)}>TX</th>
                </tr>
              </thead>
              <tbody>
                {filteredDistributions.map((dist) => (
                  <tr
                    key={dist.id}
                    className="border-b border-border/50 transition-colors hover:bg-card cursor-pointer"
                    onClick={() => setSelectedDist(selectedDist?.id === dist.id ? null : dist)}
                  >
                    <td className={cn('font-semibold', investorDensity.tableCell)}>{dist.deal}</td>
                    <td className={cn('tabular-nums text-muted-foreground', investorDensity.tableCell)}>
                      <CurrencyDisplay amount={dist.grossRevenue} />
                    </td>
                    <td className={cn('tabular-nums text-muted-foreground', investorDensity.tableCell)}>
                      -<CurrencyDisplay amount={dist.platformFee + dist.mgmtFee} />
                    </td>
                    <td className={investorDensity.tableCell}>
                      <span className="flex items-center gap-1 font-semibold text-chart-1">
                        <ArrowUpRight className="size-3 shrink-0" />
                        +<CurrencyDisplay amount={dist.amount} />
                      </span>
                    </td>
                    <td className={cn('tabular-nums', investorDensity.tableCell)}>
                      <CurrencyDisplay amount={dist.perUnit} />
                    </td>
                    <td className={cn('text-muted-foreground', investorDensity.tableCell)}>
                      <DateDisplay date={dist.date} />
                    </td>
                    <td className={investorDensity.tableCell}>
                      <div className="flex items-center gap-1">
                        <code className="truncate max-w-[80px] rounded bg-muted px-1.5 py-0.5 text-[10px]">
                          {dist.txHash.slice(0, 12)}...
                        </code>
                        <Button variant="ghost" size="sm" className="size-6 p-0" asChild>
                          <a
                            href={`https://explorer.solana.com/tx/${dist.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="size-3" />
                          </a>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Fee Transparency Detail */}
          {selectedDist && (
            <div className="mt-3 rounded-lg border border-border bg-muted/30 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Info className="size-4 text-muted-foreground" />
                <p className="text-sm font-semibold">Fee Breakdown: {selectedDist.deal}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm md:grid-cols-5">
                <div>
                  <p className="text-xs text-muted-foreground">Gross Revenue</p>
                  <p className="font-medium tabular-nums"><CurrencyDisplay amount={selectedDist.grossRevenue} /></p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Platform Fee (10%)</p>
                  <p className="font-medium tabular-nums text-destructive">-<CurrencyDisplay amount={selectedDist.platformFee} /></p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Mgmt Fee (5%)</p>
                  <p className="font-medium tabular-nums text-destructive">-<CurrencyDisplay amount={selectedDist.mgmtFee} /></p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Net Revenue</p>
                  <p className="font-medium tabular-nums"><CurrencyDisplay amount={selectedDist.netRevenue} /></p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Your Share ({selectedDist.investorSharePercent}%)</p>
                  <p className="font-semibold tabular-nums text-chart-1"><CurrencyDisplay amount={selectedDist.amount} /></p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tax Year Summary */}
      <Card className={investorCardClass()}>
        <CardHeader className={investorDensity.cardHeader}>
          <CardTitle className="text-base">Tax Year Summary</CardTitle>
          <CardDescription>Distribution totals for tax reporting</CardDescription>
        </CardHeader>
        <CardContent className={investorDensity.cardContentSection}>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
            <div className="rounded-lg border border-border bg-card p-3 sm:p-3.5">
              <p className="mb-1 text-xs text-muted-foreground">Tax Year 2026 (YTD)</p>
              <p className="text-xl font-bold">
                <CurrencyDisplay
                  amount={distributions.filter((d) => d.date.startsWith('2026')).reduce((sum, d) => sum + d.amount, 0)}
                />
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {distributions.filter((d) => d.date.startsWith('2026')).length} distributions
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 sm:p-3.5">
              <p className="mb-1 text-xs text-muted-foreground">Tax Year 2025</p>
              <p className="text-xl font-bold">
                <CurrencyDisplay
                  amount={distributions.filter((d) => d.date.startsWith('2025')).reduce((sum, d) => sum + d.amount, 0)}
                />
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {distributions.filter((d) => d.date.startsWith('2025')).length} distributions
              </p>
            </div>
            <div className="flex items-center justify-center rounded-lg border border-border bg-card p-3 sm:p-3.5">
              <Link href="/investor/tax-documents">
                <Button variant="outline">
                  <FileText data-icon="inline-start" />
                  View K-1 Statements
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
