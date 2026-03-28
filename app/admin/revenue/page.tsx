'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import { CurrencyDisplay } from '@/components/shared/currency-display';
import { DateDisplay } from '@/components/shared/date-display';
import { DashboardPageHeader } from '@/components/shared/dashboard-page-header';
import { adminDensity, adminCardClass } from '@/components/admin/admin-density';
import { cn } from '@/lib/utils';
import {
  DollarSign, ArrowUpRight, TrendingUp, Calculator,
  ArrowDownRight, Minus, Plus, Download,
} from 'lucide-react';

const FEE_STRUCTURE = {
  platform_fee: 10,
  management_fee: 5,
  performance_fee: 0,
};

const mockDeals = [
  { id: 1, title: 'Midnight Heist', revenueShare: 15 },
  { id: 2, title: 'Last Dance', revenueShare: 12 },
];

const mockRevenues = [
  { id: 1, deal_id: 1, deal_title: 'Midnight Heist', grossAmount: 50000, date: '2026-03-20', source: 'Lookhu Q1 Streaming', status: 'processed' },
  { id: 2, deal_id: 2, deal_title: 'Last Dance', grossAmount: 35000, date: '2026-03-15', source: 'Lookhu Q1 Streaming', status: 'processed' },
  { id: 3, deal_id: 1, deal_title: 'Midnight Heist', grossAmount: 25000, date: '2026-02-28', source: 'Lookhu Licensing', status: 'processed' },
  { id: 4, deal_id: 2, deal_title: 'Last Dance', grossAmount: 18000, date: '2026-02-15', source: 'Lookhu Ad Revenue', status: 'pending' },
];

export default function AdminRevenuePage() {
  const [revenues, setRevenues] = useState(mockRevenues);
  const [isLoading, setIsLoading] = useState(false);

  const [newRevenue, setNewRevenue] = useState({
    deal_id: '',
    grossAmount: '',
    source: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [calcDealId, setCalcDealId] = useState('');
  const [calcAmount, setCalcAmount] = useState('');

  const totalGross = revenues.reduce((sum, r) => sum + r.grossAmount, 0);
  const totalFees = totalGross * ((FEE_STRUCTURE.platform_fee + FEE_STRUCTURE.management_fee) / 100);
  const totalNet = totalGross - totalFees;

  const perDealRevenue = mockDeals.map((deal) => {
    const dealRevs = revenues.filter((r) => r.deal_id === deal.id);
    const gross = dealRevs.reduce((sum, r) => sum + r.grossAmount, 0);
    const fees = gross * ((FEE_STRUCTURE.platform_fee + FEE_STRUCTURE.management_fee) / 100);
    return {
      ...deal,
      gross,
      fees,
      net: gross - fees,
      investorShare: (gross - fees) * (deal.revenueShare / 100),
      count: dealRevs.length,
    };
  });

  const calcDeal = mockDeals.find((d) => d.id.toString() === calcDealId);
  const calcGross = parseFloat(calcAmount) || 0;
  const calcPlatformFee = calcGross * (FEE_STRUCTURE.platform_fee / 100);
  const calcMgmtFee = calcGross * (FEE_STRUCTURE.management_fee / 100);
  const calcPerfFee = calcGross * (FEE_STRUCTURE.performance_fee / 100);
  const calcNet = calcGross - calcPlatformFee - calcMgmtFee - calcPerfFee;
  const calcInvestorShare = calcDeal ? calcNet * (calcDeal.revenueShare / 100) : 0;

  const handleLogRevenue = async () => {
    if (!newRevenue.deal_id || !newRevenue.grossAmount) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const deal = mockDeals.find((d) => d.id.toString() === newRevenue.deal_id);
    const entry = {
      id: revenues.length + 1,
      deal_id: parseInt(newRevenue.deal_id),
      deal_title: deal?.title || '',
      grossAmount: parseFloat(newRevenue.grossAmount),
      date: newRevenue.date,
      source: newRevenue.source,
      status: 'pending' as const,
    };
    setRevenues([entry, ...revenues]);
    setNewRevenue({ deal_id: '', grossAmount: '', source: '', date: new Date().toISOString().split('T')[0] });
    setIsLoading(false);
  };

  return (
    <div className={adminDensity.page}>
      <DashboardPageHeader
        title="Revenue"
        description="Log Lookhu inflows, model fees, and track net distributable amounts."
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
        <Card className={adminCardClass()}>
          <CardContent className={cn('flex flex-col gap-1.5 pt-4', adminDensity.cardContent)}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <ArrowUpRight className="size-4 shrink-0" />
              <span className="text-xs font-medium uppercase tracking-wide">Gross Revenue</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums">
              <CurrencyDisplay amount={totalGross} />
            </p>
            <p className="text-xs text-muted-foreground">{revenues.length} events from Lookhu</p>
          </CardContent>
        </Card>
        <Card className={adminCardClass()}>
          <CardContent className={cn('flex flex-col gap-1.5 pt-4', adminDensity.cardContent)}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <ArrowDownRight className="size-4 shrink-0" />
              <span className="text-xs font-medium uppercase tracking-wide">Total Fees</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums text-destructive">
              -<CurrencyDisplay amount={totalFees} />
            </p>
            <p className="text-xs text-muted-foreground">
              Platform {FEE_STRUCTURE.platform_fee}% + Mgmt {FEE_STRUCTURE.management_fee}%
            </p>
          </CardContent>
        </Card>
        <Card className={adminCardClass('border-primary/20 bg-primary/5')}>
          <CardContent className={cn('flex flex-col gap-1.5 pt-4', adminDensity.cardContent)}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="size-4 shrink-0" />
              <span className="text-xs font-medium uppercase tracking-wide">Net Distributable</span>
            </div>
            <p className="text-2xl font-bold tabular-nums text-chart-1">
              <CurrencyDisplay amount={totalNet} />
            </p>
            <p className="text-xs text-muted-foreground">Available for investor distributions</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="log" className="w-full">
        <TabsList>
          <TabsTrigger value="log">Log Revenue</TabsTrigger>
          <TabsTrigger value="calculator">Fee Calculator</TabsTrigger>
          <TabsTrigger value="deals">Per-Deal Breakdown</TabsTrigger>
          <TabsTrigger value="history">Revenue History</TabsTrigger>
        </TabsList>

        {/* Log Revenue */}
        <TabsContent value="log" className="mt-3">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
            <Card className={adminCardClass()}>
              <CardHeader className={adminDensity.cardHeader}>
                <CardTitle className="text-base">Log Incoming Revenue</CardTitle>
                <CardDescription>Record a new revenue event from Lookhu</CardDescription>
              </CardHeader>
              <CardContent className={cn('flex flex-col gap-4', adminDensity.cardContent)}>
                <FieldGroup>
                  <FieldLabel>Deal / Show</FieldLabel>
                  <Select value={newRevenue.deal_id} onValueChange={(v) => setNewRevenue({ ...newRevenue, deal_id: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select deal" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockDeals.map((d) => (
                        <SelectItem key={d.id} value={d.id.toString()}>{d.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel>Gross Revenue Amount</FieldLabel>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      type="number"
                      value={newRevenue.grossAmount}
                      onChange={(e) => setNewRevenue({ ...newRevenue, grossAmount: e.target.value })}
                      placeholder="0.00"
                      className="pl-9"
                    />
                  </div>
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel>Revenue Source</FieldLabel>
                  <Input
                    value={newRevenue.source}
                    onChange={(e) => setNewRevenue({ ...newRevenue, source: e.target.value })}
                    placeholder="e.g., Lookhu Q1 Streaming"
                  />
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel>Date</FieldLabel>
                  <Input
                    type="date"
                    value={newRevenue.date}
                    onChange={(e) => setNewRevenue({ ...newRevenue, date: e.target.value })}
                  />
                </FieldGroup>
                <Button onClick={handleLogRevenue} disabled={isLoading || !newRevenue.deal_id || !newRevenue.grossAmount}>
                  <Plus data-icon="inline-start" />
                  {isLoading ? 'Logging...' : 'Log Revenue'}
                </Button>
              </CardContent>
            </Card>

            <Card className={adminCardClass()}>
              <CardHeader className={adminDensity.cardHeader}>
                <CardTitle className="text-base">Recent Revenue Events</CardTitle>
                <CardDescription>Latest incoming payments from Lookhu</CardDescription>
              </CardHeader>
              <CardContent className={adminDensity.cardContent}>
                <div className="flex flex-col gap-2">
                  {revenues.slice(0, 5).map((rev) => (
                    <div key={rev.id} className="flex items-center justify-between rounded-lg border border-border/50 px-3 py-2.5">
                      <div>
                        <p className="text-sm font-medium">{rev.deal_title}</p>
                        <p className="text-xs text-muted-foreground">{rev.source} · <DateDisplay date={rev.date} /></p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold tabular-nums text-chart-1">
                          +<CurrencyDisplay amount={rev.grossAmount} />
                        </p>
                        <Badge variant={rev.status === 'processed' ? 'default' : 'secondary'} className="text-[10px]">
                          {rev.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Fee Calculator */}
        <TabsContent value="calculator" className="mt-3">
          <Card className={adminCardClass()}>
            <CardHeader className={adminDensity.cardHeader}>
              <CardTitle className="flex items-center gap-2 text-base">
                <Calculator className="size-4" />
                Fee & Distribution Calculator
              </CardTitle>
              <CardDescription>Model fee deductions and investor payable amounts</CardDescription>
            </CardHeader>
            <CardContent className={cn('flex flex-col gap-4', adminDensity.cardContent)}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FieldGroup>
                  <FieldLabel>Deal</FieldLabel>
                  <Select value={calcDealId} onValueChange={setCalcDealId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select deal" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockDeals.map((d) => (
                        <SelectItem key={d.id} value={d.id.toString()}>{d.title} ({d.revenueShare}% share)</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel>Gross Revenue Input</FieldLabel>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      type="number"
                      value={calcAmount}
                      onChange={(e) => setCalcAmount(e.target.value)}
                      placeholder="Enter gross revenue"
                      className="pl-9"
                    />
                  </div>
                </FieldGroup>
              </div>

              {calcGross > 0 && (
                <div className="rounded-lg border border-border bg-card p-4">
                  <p className="mb-3 text-sm font-semibold">Fee Waterfall</p>
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center justify-between py-1.5">
                      <span>Gross Revenue</span>
                      <span className="font-semibold tabular-nums"><CurrencyDisplay amount={calcGross} /></span>
                    </div>
                    <div className="flex items-center justify-between border-t border-border/50 py-1.5 text-destructive">
                      <span className="flex items-center gap-1">
                        <Minus className="size-3" />
                        Platform Fee ({FEE_STRUCTURE.platform_fee}%)
                      </span>
                      <span className="tabular-nums">-<CurrencyDisplay amount={calcPlatformFee} /></span>
                    </div>
                    <div className="flex items-center justify-between border-t border-border/50 py-1.5 text-destructive">
                      <span className="flex items-center gap-1">
                        <Minus className="size-3" />
                        Management Fee ({FEE_STRUCTURE.management_fee}%)
                      </span>
                      <span className="tabular-nums">-<CurrencyDisplay amount={calcMgmtFee} /></span>
                    </div>
                    {FEE_STRUCTURE.performance_fee > 0 && (
                      <div className="flex items-center justify-between border-t border-border/50 py-1.5 text-destructive">
                        <span className="flex items-center gap-1">
                          <Minus className="size-3" />
                          Performance Fee ({FEE_STRUCTURE.performance_fee}%)
                        </span>
                        <span className="tabular-nums">-<CurrencyDisplay amount={calcPerfFee} /></span>
                      </div>
                    )}
                    <div className="flex items-center justify-between border-t-2 border-border py-2">
                      <span className="font-semibold">Net Revenue</span>
                      <span className="font-bold tabular-nums"><CurrencyDisplay amount={calcNet} /></span>
                    </div>
                    {calcDeal && (
                      <div className="mt-2 rounded-lg border border-primary/20 bg-primary/5 p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Investor Share ({calcDeal.revenueShare}%)</span>
                          <span className="text-lg font-bold text-chart-1">
                            <CurrencyDisplay amount={calcInvestorShare} />
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Per-Deal Breakdown */}
        <TabsContent value="deals" className="mt-3">
          <Card className={adminCardClass()}>
            <CardHeader className={adminDensity.cardHeader}>
              <CardTitle className="text-base">Revenue by Deal</CardTitle>
              <CardDescription>Breakdown of all revenue and fees per show</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Deal</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Gross Revenue</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Fees</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Net Revenue</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Investor Share</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Events</th>
                    </tr>
                  </thead>
                  <tbody>
                    {perDealRevenue.map((deal) => (
                      <tr key={deal.id} className="border-b border-border/50 hover:bg-card">
                        <td className={cn('font-medium', adminDensity.tableCell)}>
                          {deal.title}
                          <Badge variant="outline" className="ml-2 text-[10px]">{deal.revenueShare}%</Badge>
                        </td>
                        <td className={cn('tabular-nums', adminDensity.tableCell)}>
                          <CurrencyDisplay amount={deal.gross} />
                        </td>
                        <td className={cn('tabular-nums text-destructive', adminDensity.tableCell)}>
                          -<CurrencyDisplay amount={deal.fees} />
                        </td>
                        <td className={cn('tabular-nums font-medium', adminDensity.tableCell)}>
                          <CurrencyDisplay amount={deal.net} />
                        </td>
                        <td className={cn('tabular-nums font-semibold text-chart-1', adminDensity.tableCell)}>
                          <CurrencyDisplay amount={deal.investorShare} />
                        </td>
                        <td className={adminDensity.tableCell}>
                          <Badge variant="secondary">{deal.count}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Revenue History */}
        <TabsContent value="history" className="mt-3">
          <Card className={adminCardClass()}>
            <CardHeader className={cn('flex flex-row items-center justify-between', adminDensity.cardHeader)}>
              <div>
                <CardTitle className="text-base">Revenue History</CardTitle>
                <CardDescription>All revenue events from Lookhu</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download data-icon="inline-start" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Deal</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Source</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Gross Amount</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Status</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {revenues.map((rev) => (
                      <tr key={rev.id} className="border-b border-border/50 hover:bg-card">
                        <td className={cn('font-medium', adminDensity.tableCell)}>{rev.deal_title}</td>
                        <td className={cn('text-muted-foreground', adminDensity.tableCell)}>{rev.source}</td>
                        <td className={cn('tabular-nums font-semibold text-chart-1', adminDensity.tableCell)}>
                          +<CurrencyDisplay amount={rev.grossAmount} />
                        </td>
                        <td className={adminDensity.tableCell}>
                          <Badge variant={rev.status === 'processed' ? 'default' : 'secondary'}>
                            {rev.status}
                          </Badge>
                        </td>
                        <td className={cn('text-muted-foreground', adminDensity.tableCell)}>
                          <DateDisplay date={rev.date} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
