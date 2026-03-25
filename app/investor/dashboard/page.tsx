'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CurrencyDisplay } from '@/components/shared/currency-display';
import { DateDisplay } from '@/components/shared/date-display';
import {
  TrendingUp, DollarSign, Wallet, ArrowRight, Coins, Percent,
  Film, ArrowUpRight, FileText, Bell, ExternalLink
} from 'lucide-react';
import Link from 'next/link';

function StatCard({ title, value, icon, description, trend }: {
  title: string;
  value: string | React.ReactNode;
  icon: React.ReactNode;
  description?: string;
  trend?: { value: number; label: string };
}) {
  return (
    <Card className="border border-border">
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          <div className="text-primary">{icon}</div>
        </div>
        <p className="text-2xl font-bold tracking-tight">{value}</p>
        {trend && (
          <div className="flex items-center gap-1 mt-1">
            <ArrowUpRight className="size-3 text-green-600" />
            <span className="text-xs text-green-600">+{trend.value}%</span>
            <span className="text-xs text-muted-foreground">{trend.label}</span>
          </div>
        )}
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
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
  revenueShare: {
    midnightHeist: 15,
    lastDance: 12,
  },
};

const investments = [
  {
    id: 1,
    deal: 'Midnight Heist',
    amount: 50000,
    tokens: 5000,
    tokenSymbol: 'MHT',
    revenueShare: 15,
    valuation: 5000000,
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
    valuation: 8000000,
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
  { id: 1, type: 'distribution', title: 'Midnight Heist Q1 Distribution', date: '2026-04-01' },
  { id: 2, type: 'milestone', title: 'Last Dance - Production Wrap', date: '2026-04-15' },
  { id: 3, type: 'deadline', title: 'K-1 Tax Document Available', date: '2026-03-31' },
];

export default function InvestorDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portfolio Dashboard</h1>
          <p className="text-muted-foreground mt-1">Track your investments, tokens, and distributions</p>
        </div>
        <Button variant="outline" size="sm">
          <Bell className="size-4 mr-2" />
          Notifications
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Portfolio Value"
          value={<CurrencyDisplay amount={portfolioData.totalValue} />}
          icon={<DollarSign className="size-4" />}
          trend={{ value: 8.5, label: 'from distributions' }}
        />
        <StatCard
          title="Total Invested"
          value={<CurrencyDisplay amount={portfolioData.totalInvested} />}
          icon={<TrendingUp className="size-4" />}
          description={`${portfolioData.activeDeals} active deals`}
        />
        <StatCard
          title="Token Holdings"
          value={portfolioData.totalTokens.toLocaleString()}
          icon={<Coins className="size-4" />}
          description="Across all investments"
        />
        <StatCard
          title="Total Distributions"
          value={<CurrencyDisplay amount={portfolioData.totalDistributions} />}
          icon={<ArrowUpRight className="size-4" />}
          description="Lifetime earnings"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="investments" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="investments">My Investments</TabsTrigger>
              <TabsTrigger value="tokens">Token Holdings</TabsTrigger>
            </TabsList>

            <TabsContent value="investments" className="mt-4">
              <Card className="border border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Active Investments</CardTitle>
                    <CardDescription>Your positions in streaming content</CardDescription>
                  </div>
                  <Link href="/investor/investments">
                    <Button variant="outline" size="sm">View All</Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    {investments.map((inv) => (
                      <div key={inv.id} className="p-4 bg-card rounded-lg border border-border">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-semibold">{inv.deal}</p>
                            <p className="text-xs text-muted-foreground">
                              Invested <DateDisplay date={inv.investedDate} />
                            </p>
                          </div>
                          <Badge variant={inv.progress === 100 ? 'default' : 'secondary'}>
                            {inv.progress === 100 ? 'Funded' : 'Active'}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-xs text-muted-foreground">Amount</p>
                            <p className="font-semibold"><CurrencyDisplay amount={inv.amount} /></p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Tokens</p>
                            <p className="font-semibold">{inv.tokens.toLocaleString()} {inv.tokenSymbol}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Revenue Share</p>
                            <p className="font-semibold">{inv.revenueShare}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Distributions</p>
                            <p className="font-semibold text-green-600"><CurrencyDisplay amount={inv.distributions} /></p>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Film className="size-3" />
                            <span>Production: {inv.productionStatus.replace('_', ' ')}</span>
                          </div>
                          <Link href={`/investor/investments/${inv.id}`}>
                            <Button variant="ghost" size="sm" className="h-7 text-xs">
                              View Details <ArrowRight className="size-3 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tokens" className="mt-4">
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="text-base">Token Holdings by Deal</CardTitle>
                  <CardDescription>Your digital tokens representing investment units</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    {investments.map((inv) => (
                      <div key={inv.id} className="flex items-center justify-between p-3 bg-card rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Coins className="size-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold">{inv.tokenSymbol}</p>
                            <p className="text-xs text-muted-foreground">{inv.deal}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{inv.tokens.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">tokens</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Recent Distributions */}
          <Card className="border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Recent Distributions</CardTitle>
              <Link href="/investor/distributions">
                <Button variant="ghost" size="sm" className="h-7 text-xs">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {recentDistributions.map((dist) => (
                  <div key={dist.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div>
                      <p className="text-sm font-medium">{dist.deal}</p>
                      <p className="text-xs text-muted-foreground"><DateDisplay date={dist.date} /></p>
                    </div>
                    <p className="font-semibold text-green-600">+<CurrencyDisplay amount={dist.amount} /></p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-base">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-start gap-3">
                    <div className={`size-2 rounded-full mt-1.5 ${
                      event.type === 'distribution' ? 'bg-green-500' :
                      event.type === 'milestone' ? 'bg-blue-500' : 'bg-orange-500'
                    }`} />
                    <div>
                      <p className="text-sm font-medium">{event.title}</p>
                      <p className="text-xs text-muted-foreground"><DateDisplay date={event.date} /></p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Link href="/investor/deals">
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="size-4 mr-2" />
                  Browse New Deals
                </Button>
              </Link>
              <Link href="/investor/documents">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="size-4 mr-2" />
                  View Documents
                </Button>
              </Link>
              <Link href="/investor/wallet">
                <Button variant="outline" className="w-full justify-start">
                  <Wallet className="size-4 mr-2" />
                  Manage Wallet
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}