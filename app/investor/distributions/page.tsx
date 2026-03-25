'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CurrencyDisplay } from '@/components/shared/currency-display';
import { DateDisplay } from '@/components/shared/date-display';
import {
  Download, ArrowUpRight, TrendingUp, DollarSign, Calendar,
  Coins, Filter, ExternalLink, Wallet, FileText
} from 'lucide-react';

const distributions = [
  { id: 1, deal: 'Midnight Heist', type: 'Revenue Distribution', amount: 2500, perUnit: 0.05, units: 50000, date: '2026-03-20', status: 'received', txHash: '5Kp9QmNvR2tX8wZ5yB3cF6dG...' },
  { id: 2, deal: 'Last Dance', type: 'Revenue Distribution', amount: 1800, perUnit: 0.012, units: 150000, date: '2026-03-15', status: 'received', txHash: '7Bt8RpLxM2nQ5vX9zA1cE4fG...' },
  { id: 3, deal: 'Midnight Heist', type: 'Revenue Distribution', amount: 1950, perUnit: 0.039, units: 50000, date: '2026-02-28', status: 'received', txHash: '3Df8GhJkLmN6pQ2rS5tV8wX...' },
  { id: 4, deal: 'Last Dance', type: 'Revenue Distribution', amount: 2200, perUnit: 0.0147, units: 150000, date: '2026-02-15', status: 'received', txHash: '9Mn5OpQrS7tU1vW3xY5zA7bC...' },
  { id: 5, deal: 'Midnight Heist', type: 'Revenue Distribution', amount: 1750, perUnit: 0.035, units: 50000, date: '2026-01-20', status: 'received', txHash: '2Tu6VwXyZ8aB0cD2eF4gH6iJ...' },
];

const investments = [
  { id: 1, deal: 'Midnight Heist', tokens: 5000, revenueShare: 15, totalInvested: 50000 },
  { id: 2, deal: 'Last Dance', tokens: 1500, revenueShare: 12, totalInvested: 75000 },
];

const totalReceived = distributions.reduce((sum, d) => sum + d.amount, 0);
const totalDistributions = distributions.length;

export default function InvestorDistributionsPage() {
  const [dealFilter, setDealFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('2026');

  const filteredDistributions = distributions.filter(d => {
    const matchesDeal = dealFilter === 'all' || d.deal === dealFilter;
    const matchesYear = d.date.startsWith(yearFilter);
    return matchesDeal && matchesYear;
  });

  const dealStats = investments.map(inv => ({
    ...inv,
    totalDistributions: distributions.filter(d => d.deal === inv.deal).reduce((sum, d) => sum + d.amount, 0),
    distributionCount: distributions.filter(d => d.deal === inv.deal).length,
  }));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Distributions</h1>
        <p className="text-muted-foreground mt-1">Track your revenue distributions and earnings from investments</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border border-primary/20 bg-primary/5">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-primary mb-2">
              <DollarSign className="size-4" />
              <span className="text-sm font-medium">Total Received</span>
            </div>
            <p className="text-2xl font-bold"><CurrencyDisplay amount={totalReceived} /></p>
            <p className="text-xs text-muted-foreground mt-1">Lifetime earnings</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <TrendingUp className="size-4" />
              <span className="text-sm font-medium">Distributions</span>
            </div>
            <p className="text-2xl font-bold">{totalDistributions}</p>
            <p className="text-xs text-muted-foreground mt-1">Total payments</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Coins className="size-4" />
              <span className="text-sm font-medium">Active Deals</span>
            </div>
            <p className="text-2xl font-bold">{investments.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Generating revenue</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Wallet className="size-4" />
              <span className="text-sm font-medium">Avg Per Distribution</span>
            </div>
            <p className="text-2xl font-bold">
              <CurrencyDisplay amount={totalReceived / totalDistributions} />
            </p>
          </CardContent>
        </Card>
      </div>

      {/* By Deal Summary */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-base">Distributions by Deal</CardTitle>
          <CardDescription>Breakdown of earnings per investment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dealStats.map((stat) => (
              <div key={stat.id} className="p-4 bg-card rounded-lg border border-border">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold">{stat.deal}</p>
                  <Badge variant="outline">{stat.revenueShare}% Rev Share</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Received</p>
                    <p className="font-semibold text-green-600">
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
                    <p className="font-semibold text-green-600">
                      {((stat.totalDistributions / stat.totalInvested) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Distribution History */}
      <Card className="border border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">Distribution History</CardTitle>
            <CardDescription>All payments received to your wallet</CardDescription>
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
              <Download className="size-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold">Deal</th>
                  <th className="text-left py-3 px-4 font-semibold">Type</th>
                  <th className="text-left py-3 px-4 font-semibold">Per Unit</th>
                  <th className="text-left py-3 px-4 font-semibold">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Date</th>
                  <th className="text-left py-3 px-4 font-semibold">TX</th>
                </tr>
              </thead>
              <tbody>
                {filteredDistributions.map((dist) => (
                  <tr key={dist.id} className="border-b border-border/50 hover:bg-card transition-colors">
                    <td className="py-4 px-4 font-semibold">{dist.deal}</td>
                    <td className="py-4 px-4 text-muted-foreground">{dist.type}</td>
                    <td className="py-4 px-4"><CurrencyDisplay amount={dist.perUnit} /></td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-green-600 dark:text-green-400 flex items-center gap-1">
                        <ArrowUpRight className="size-3" />
                        +<CurrencyDisplay amount={dist.amount} />
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="bg-green-600">Received</Badge>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">
                      <DateDisplay date={dist.date} />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-muted px-2 py-1 rounded truncate max-w-[100px]">
                          {dist.txHash}
                        </code>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <ExternalLink className="size-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Tax Summary */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-base">Tax Year Summary</CardTitle>
          <CardDescription>Distribution totals for tax reporting</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-card rounded-lg border border-border">
              <p className="text-xs text-muted-foreground mb-1">Tax Year 2026 (YTD)</p>
              <p className="text-xl font-bold">
                <CurrencyDisplay amount={distributions.filter(d => d.date.startsWith('2026')).reduce((sum, d) => sum + d.amount, 0)} />
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {distributions.filter(d => d.date.startsWith('2026')).length} distributions
              </p>
            </div>
            <div className="p-4 bg-card rounded-lg border border-border">
              <p className="text-xs text-muted-foreground mb-1">Tax Year 2025</p>
              <p className="text-xl font-bold">
                <CurrencyDisplay amount={distributions.filter(d => d.date.startsWith('2025')).reduce((sum, d) => sum + d.amount, 0)} />
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {distributions.filter(d => d.date.startsWith('2025')).length} distributions
              </p>
            </div>
            <div className="p-4 bg-card rounded-lg border border-border flex items-center justify-center">
              <Button variant="outline" asChild>
                <a href="/investor/documents">
                  <FileText className="size-4 mr-2" />
                  View K-1 Statements
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}