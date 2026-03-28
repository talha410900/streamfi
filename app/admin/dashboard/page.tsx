'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from '@/components/ui/item';
import { DashboardPageHeader } from '@/components/shared/dashboard-page-header';
import { ComplianceStatusCard } from '@/components/shared/compliance-status-card';
import { CurrencyDisplay } from '@/components/shared/currency-display';
import { DateDisplay } from '@/components/shared/date-display';
import { adminDensity, adminCardClass } from '@/components/admin/admin-density';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  TrendingUp, Users, DollarSign, Coins, ArrowUpRight,
  ShieldCheck, ClipboardList, Plus, Eye, Send,
  Activity, FileText, AlertCircle, UserPlus, FileSignature,
} from 'lucide-react';

const stats = [
  { title: 'Active Deals', value: '3', icon: TrendingUp, trend: '1 new this week' },
  { title: 'Total Investors', value: '24', icon: Users, trend: '3 this month' },
  { title: 'Capital Raised', value: 2500000, isCurrency: true, icon: DollarSign },
  { title: 'Tokens Issued', value: '150,000', icon: Coins },
  { title: 'Pending KYC', value: '4', icon: ShieldCheck, trend: '2 urgent' },
  { title: 'Pending Distributions', value: '1', icon: Send },
];

const complianceQueue = [
  {
    name: 'John Investor',
    email: 'john@example.com',
    step: 'KYC Review',
    icon: ShieldCheck,
    date: '2026-03-25',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    step: 'Subscription Signature',
    icon: FileSignature,
    date: '2026-03-24',
  },
  {
    name: 'Robert Jones',
    email: 'robert@example.com',
    step: 'Questionnaire Incomplete',
    icon: ClipboardList,
    date: '2026-03-23',
  },
  {
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    step: 'Funding Confirmation',
    icon: DollarSign,
    date: '2026-03-22',
  },
];

const recentActivity = [
  { id: 1, type: 'deal', message: 'Mystery Box deal moved to "Open"', date: '2026-03-27' },
  { id: 2, type: 'investor', message: 'Investor account created for mike.chen@email.com', date: '2026-03-26' },
  { id: 3, type: 'distribution', message: 'Midnight Heist Q1 distribution processed ($6,375)', date: '2026-03-25' },
  { id: 4, type: 'compliance', message: 'KYC approved for Sarah Williams', date: '2026-03-24' },
  { id: 5, type: 'deal', message: 'Last Dance reached full funding', date: '2026-03-22' },
];

const activityIcons: Record<string, React.ElementType> = {
  deal: TrendingUp,
  investor: UserPlus,
  distribution: DollarSign,
  compliance: ShieldCheck,
};

const recentDeals = [
  { name: 'Midnight Heist', status: 'open', raised: 320000, target: 500000 },
  { name: 'Last Dance', status: 'funded', raised: 1000000, target: 1000000 },
  { name: 'Mystery Box', status: 'draft', raised: 0, target: 750000 },
];

const revenueData = [
  { month: 'Jan', amount: 12000 },
  { month: 'Feb', amount: 18500 },
  { month: 'Mar', amount: 8500 },
];

export default function AdminDashboardPage() {
  const totalRevenue = revenueData.reduce((s, r) => s + r.amount, 0);
  const maxRevenue = Math.max(...revenueData.map((r) => r.amount));

  return (
    <div className={adminDensity.page}>
      <DashboardPageHeader
        title="Dashboard"
        description="Deals, capital, compliance, and distributions at a glance."
        actions={
          <div className="flex gap-2">
            <Link href="/admin/deals">
              <Button>
                <Plus data-icon="inline-start" />
                Create Deal
              </Button>
            </Link>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className={adminCardClass()}>
              <CardContent className={cn('flex flex-col gap-1.5 pt-4', adminDensity.cardContent)}>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon className="size-4 shrink-0" />
                  <span className="text-[10px] font-medium uppercase tracking-wide">{stat.title}</span>
                </div>
                <p className="text-xl font-semibold tabular-nums">
                  {stat.isCurrency ? <CurrencyDisplay amount={stat.value as number} /> : stat.value}
                </p>
                {stat.trend && (
                  <p className="flex items-center gap-1 text-[11px] text-chart-1">
                    <ArrowUpRight className="size-3 shrink-0" />
                    {stat.trend}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
        {/* Compliance Queue */}
        <Card className={adminCardClass()}>
          <CardHeader className={cn('border-b border-border pb-3', adminDensity.cardHeader)}>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Compliance Queue</CardTitle>
                <CardDescription>{complianceQueue.length} investors need attention</CardDescription>
              </div>
              <Badge variant="secondary">{complianceQueue.length}</Badge>
            </div>
          </CardHeader>
          <CardContent className={cn('pt-3', adminDensity.cardContent)}>
            <div className="flex flex-col gap-2">
              {complianceQueue.map((item) => {
                const StepIcon = item.icon;
                return (
                  <div key={item.email} className="flex items-center justify-between rounded-lg border border-border/50 bg-card p-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-8 items-center justify-center rounded-full bg-muted">
                        <StepIcon className="size-3.5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.step}</p>
                      </div>
                    </div>
                    <Link href="/admin/investors">
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        <Eye className="size-3" />
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>
            <Link href="/admin/investors" className="mt-3 block">
              <Button variant="outline" className="w-full">Open Investors</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Revenue Overview */}
        <Card className={adminCardClass()}>
          <CardHeader className={cn('border-b border-border pb-3', adminDensity.cardHeader)}>
            <CardTitle className="text-base font-semibold">Revenue (YTD)</CardTitle>
            <CardDescription>
              <CurrencyDisplay amount={totalRevenue} /> total from Lookhu
            </CardDescription>
          </CardHeader>
          <CardContent className={cn('pt-3', adminDensity.cardContent)}>
            <div className="flex flex-col gap-3">
              {revenueData.map((item) => (
                <div key={item.month} className="flex items-center gap-3">
                  <span className="w-8 text-xs font-medium text-muted-foreground">{item.month}</span>
                  <div className="flex-1">
                    <div
                      className="h-6 rounded-md bg-primary/15"
                      style={{ width: `${(item.amount / maxRevenue) * 100}%` }}
                    >
                      <div
                        className="h-full rounded-md bg-primary transition-all"
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                  <span className="w-16 text-right text-xs font-medium tabular-nums">
                    <CurrencyDisplay amount={item.amount} />
                  </span>
                </div>
              ))}
            </div>
            <Link href="/admin/revenue" className="mt-4 block">
              <Button variant="outline" className="w-full">View Revenue</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className={adminCardClass()}>
          <CardHeader className={cn('border-b border-border pb-3', adminDensity.cardHeader)}>
            <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
            <CardDescription>Latest platform events</CardDescription>
          </CardHeader>
          <CardContent className={cn('pt-3', adminDensity.cardContent)}>
            <div className="flex flex-col gap-2.5">
              {recentActivity.map((item) => {
                const Icon = activityIcons[item.type] || Activity;
                return (
                  <div key={item.id} className="flex gap-2.5">
                    <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-muted">
                      <Icon className="size-3 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm leading-snug">{item.message}</p>
                      <p className="text-xs text-muted-foreground">
                        <DateDisplay date={item.date} />
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deals Overview */}
      <Card className={adminCardClass()}>
        <CardHeader className={cn('border-b border-border pb-3', adminDensity.cardHeader)}>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Active Deals</CardTitle>
              <CardDescription>Current show offerings and fundraising status</CardDescription>
            </div>
            <Link href="/admin/deals">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Show</th>
                  <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Status</th>
                  <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Progress</th>
                  <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Raised</th>
                  <th className={cn('text-right font-semibold', adminDensity.tableHead)}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentDeals.map((deal) => {
                  const pct = deal.target > 0 ? (deal.raised / deal.target) * 100 : 0;
                  return (
                    <tr key={deal.name} className="border-b border-border/50 hover:bg-card">
                      <td className={cn('font-medium', adminDensity.tableCell)}>{deal.name}</td>
                      <td className={adminDensity.tableCell}>
                        <Badge variant={deal.status === 'funded' ? 'default' : deal.status === 'open' ? 'secondary' : 'outline'}>
                          {deal.status}
                        </Badge>
                      </td>
                      <td className={adminDensity.tableCell}>
                        <div className="flex items-center gap-2">
                          <Progress value={Math.min(pct, 100)} className="h-1.5 w-20" />
                          <span className="text-xs text-muted-foreground">{Math.round(pct)}%</span>
                        </div>
                      </td>
                      <td className={adminDensity.tableCell}>
                        <CurrencyDisplay amount={deal.raised} />
                      </td>
                      <td className={cn('text-right', adminDensity.tableCell)}>
                        <Link href="/admin/deals">
                          <Button variant="ghost" size="sm" className="h-7">
                            <Eye className="size-3" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className={adminCardClass()}>
        <CardHeader className={cn('pb-3', adminDensity.cardHeader)}>
          <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className={adminDensity.cardContent}>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Link href="/admin/deals">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-4">
                <Plus className="size-5" />
                <span className="text-xs">Create Deal</span>
              </Button>
            </Link>
            <Link href="/admin/investors">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-4">
                <ShieldCheck className="size-5" />
                <span className="text-xs">Review KYC</span>
              </Button>
            </Link>
            <Link href="/admin/distributions">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-4">
                <Send className="size-5" />
                <span className="text-xs">Process Distribution</span>
              </Button>
            </Link>
            <Link href="/admin/revenue">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-4">
                <DollarSign className="size-5" />
                <span className="text-xs">Log Revenue</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
