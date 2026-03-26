'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Modal } from '@/components/shared/modal';
import { CurrencyDisplay } from '@/components/shared/currency-display';
import { DateDisplay } from '@/components/shared/date-display';
import {
  DollarSign, Send, Calculator, CheckCircle, Clock,
  TrendingUp, Users, ArrowUpRight, Download
} from 'lucide-react';
import { DashboardPageHeader } from '@/components/shared/dashboard-page-header';
import { cn } from '@/lib/utils';
import { adminDensity, adminCardClass } from '@/components/admin/admin-density';

const mockDeals = [
  { id: 1, title: 'Midnight Heist', total_invested: 320000, investor_count: 12, revenue_share: 15, units_issued: 32000 },
  { id: 2, title: 'Last Dance', total_invested: 1000000, investor_count: 18, revenue_share: 12, units_issued: 20000 },
];

const mockDistributions = [
  {
    id: 1,
    deal_id: 1,
    deal_title: 'Midnight Heist',
    revenue_amount: 50000,
    platform_fee: 5000,
    management_fee: 2500,
    investor_share: 6375,
    total_distribution: 6375,
    per_unit: 0.199,
    status: 'completed',
    date: '2026-03-20',
    investors_paid: 12,
    investors_total: 12,
  },
  {
    id: 2,
    deal_id: 2,
    deal_title: 'Last Dance',
    revenue_amount: 35000,
    platform_fee: 3500,
    management_fee: 1750,
    investor_share: 3570,
    total_distribution: 3570,
    per_unit: 0.178,
    status: 'completed',
    date: '2026-03-15',
    investors_paid: 18,
    investors_total: 18,
  },
  {
    id: 3,
    deal_id: 1,
    deal_title: 'Midnight Heist',
    revenue_amount: 25000,
    platform_fee: 2500,
    management_fee: 1250,
    investor_share: 3187.5,
    total_distribution: 3187.5,
    per_unit: 0.099,
    status: 'pending',
    date: '2026-03-25',
    investors_paid: 0,
    investors_total: 12,
  },
];

const mockPayoutLedger = [
  { id: 1, investor: 'John Investor', deal: 'Midnight Heist', units: 10000, per_unit: 0.199, amount: 1990, status: 'paid', date: '2026-03-20', tx_hash: '5Kp9QmNv...' },
  { id: 2, investor: 'Jane Smith', deal: 'Midnight Heist', units: 7500, per_unit: 0.199, amount: 1492.5, status: 'paid', date: '2026-03-20', tx_hash: '7Bt8RpLx...' },
  { id: 3, investor: 'Robert Jones', deal: 'Midnight Heist', units: 5000, per_unit: 0.199, amount: 995, status: 'paid', date: '2026-03-20', tx_hash: '3Df8GhJk...' },
  { id: 4, investor: 'John Investor', deal: 'Last Dance', units: 1500, per_unit: 0.178, amount: 267, status: 'paid', date: '2026-03-15', tx_hash: '9Mn5OpQr...' },
  { id: 5, investor: 'Jane Smith', deal: 'Last Dance', units: 2000, per_unit: 0.178, amount: 356, status: 'paid', date: '2026-03-15', tx_hash: '2Tu6VwXy...' },
];

const FEE_STRUCTURE = {
  platform_fee: 10, // 10%
  management_fee: 5, // 5%
  performance_fee: 0, // 0% (can vary)
};

export default function AdminDistributionsPage() {
  const [distributions, setDistributions] = useState(mockDistributions);
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<typeof mockDeals[0] | null>(null);
  const [revenueInput, setRevenueInput] = useState('');
  const [calculations, setCalculations] = useState<any>(null);

  const totalDistributed = distributions
    .filter(d => d.status === 'completed')
    .reduce((sum, d) => sum + d.total_distribution, 0);
  const totalPending = distributions
    .filter(d => d.status === 'pending')
    .reduce((sum, d) => sum + d.total_distribution, 0);
  const totalInvestors = distributions.reduce((sum, d) => sum + d.investors_paid, 0);

  const calculateDistribution = () => {
    if (!selectedDeal || !revenueInput) return;

    const revenue = parseFloat(revenueInput);
    const platformFee = revenue * (FEE_STRUCTURE.platform_fee / 100);
    const managementFee = revenue * (FEE_STRUCTURE.management_fee / 100);
    const netRevenue = revenue - platformFee - managementFee;
    const investorShare = netRevenue * (selectedDeal.revenue_share / 100);
    const perUnit = investorShare / selectedDeal.units_issued;

    setCalculations({
      revenue,
      platformFee,
      managementFee,
      netRevenue,
      investorShare,
      perUnit,
      unitsIssued: selectedDeal.units_issued,
      investorCount: selectedDeal.investor_count,
    });
  };

  const handleCreateDistribution = () => {
    if (!calculations || !selectedDeal) return;

    const newDistribution = {
      id: distributions.length + 1,
      deal_id: selectedDeal.id,
      deal_title: selectedDeal.title,
      revenue_amount: calculations.revenue,
      platform_fee: calculations.platformFee,
      management_fee: calculations.managementFee,
      investor_share: calculations.investorShare,
      total_distribution: calculations.investorShare,
      per_unit: calculations.perUnit,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      investors_paid: 0,
      investors_total: selectedDeal.investor_count,
    };

    setDistributions([newDistribution, ...distributions]);
    setIsCalculating(false);
    setCalculations(null);
    setRevenueInput('');
    setSelectedDeal(null);
  };

  return (
    <div className={adminDensity.page}>
      <DashboardPageHeader
        title="Distributions"
        description="Model fees, allocate investor pools, and track payout status."
        actions={
          <Button onClick={() => setIsCalculating(true)}>
            <Calculator data-icon="inline-start" />
            Calculate distribution
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-4 md:gap-4">
        <Card className={adminCardClass()}>
          <CardContent className={cn('flex flex-col gap-1.5 pt-4', adminDensity.cardContent)}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle className="size-4 shrink-0" />
              <span className="text-xs font-medium uppercase tracking-wide">Distributed</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums">
              <CurrencyDisplay amount={totalDistributed} />
            </p>
          </CardContent>
        </Card>
        <Card className={adminCardClass()}>
          <CardContent className={cn('flex flex-col gap-1.5 pt-4', adminDensity.cardContent)}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="size-4 shrink-0" />
              <span className="text-xs font-medium uppercase tracking-wide">Pending</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums">
              <CurrencyDisplay amount={totalPending} />
            </p>
          </CardContent>
        </Card>
        <Card className={adminCardClass()}>
          <CardContent className={cn('flex flex-col gap-1.5 pt-4', adminDensity.cardContent)}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="size-4 shrink-0" />
              <span className="text-xs font-medium uppercase tracking-wide">Events</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums">{distributions.length}</p>
          </CardContent>
        </Card>
        <Card className={adminCardClass()}>
          <CardContent className={cn('flex flex-col gap-1.5 pt-4', adminDensity.cardContent)}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="size-4 shrink-0" />
              <span className="text-xs font-medium uppercase tracking-wide">Paid seats</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums">{totalInvestors}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="distributions" className="w-full">
        <TabsList>
          <TabsTrigger value="distributions">Distribution Events</TabsTrigger>
          <TabsTrigger value="ledger">Payout Ledger</TabsTrigger>
          <TabsTrigger value="fee-structure">Fee Structure</TabsTrigger>
        </TabsList>

        <TabsContent value="distributions" className="mt-3">
          <Card className={adminCardClass()}>
            <CardHeader className={adminDensity.cardHeader}>
              <CardTitle className="text-base">Distribution History</CardTitle>
              <CardDescription>All revenue distribution events</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Deal</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Revenue</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Fees</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Investor Share</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Per Unit</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Progress</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Date</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {distributions.map((dist) => {
                      const progress = (dist.investors_paid / dist.investors_total) * 100;
                      return (
                        <tr key={dist.id} className="border-b border-border/50 hover:bg-card">
                          <td className={cn('font-medium', adminDensity.tableCell)}>{dist.deal_title}</td>
                          <td className={adminDensity.tableCell}><CurrencyDisplay amount={dist.revenue_amount} /></td>
                          <td className={cn('text-muted-foreground', adminDensity.tableCell)}>
                            <CurrencyDisplay amount={dist.platform_fee + dist.management_fee} />
                          </td>
                          <td className={cn('font-semibold text-chart-1', adminDensity.tableCell)}>
                            <CurrencyDisplay amount={dist.total_distribution} />
                          </td>
                          <td className={adminDensity.tableCell}><CurrencyDisplay amount={dist.per_unit} /></td>
                          <td className={adminDensity.tableCell}>
                            <div className="flex items-center gap-2">
                              <Progress value={progress} className="h-1.5 w-16" />
                              <span className="text-xs">{dist.investors_paid}/{dist.investors_total}</span>
                            </div>
                          </td>
                          <td className={cn('text-muted-foreground', adminDensity.tableCell)}>
                            <DateDisplay date={dist.date} />
                          </td>
                          <td className={adminDensity.tableCell}>
                            {dist.status === 'pending' ? (
                              <Button size="sm">
                                <Send className="size-3 mr-1" />
                                Send
                              </Button>
                            ) : (
                              <Badge variant="default">Completed</Badge>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ledger" className="mt-3">
          <Card className={adminCardClass()}>
            <CardHeader className={cn('flex flex-row items-center justify-between', adminDensity.cardHeader)}>
              <div>
                <CardTitle className="text-base">Payout Ledger</CardTitle>
                <CardDescription>Individual investor payouts</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 size-4" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Investor</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Deal</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Units</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Per Unit</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Amount</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Status</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Date</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>TX Hash</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPayoutLedger.map((payout) => (
                      <tr key={payout.id} className="border-b border-border/50 hover:bg-card">
                        <td className={cn('font-medium', adminDensity.tableCell)}>{payout.investor}</td>
                        <td className={adminDensity.tableCell}>{payout.deal}</td>
                        <td className={adminDensity.tableCell}>{payout.units.toLocaleString()}</td>
                        <td className={adminDensity.tableCell}><CurrencyDisplay amount={payout.per_unit} /></td>
                        <td className={cn('font-semibold', adminDensity.tableCell)}>
                          <CurrencyDisplay amount={payout.amount} />
                        </td>
                        <td className={adminDensity.tableCell}>
                          <Badge variant="default">Paid</Badge>
                        </td>
                        <td className={cn('text-muted-foreground', adminDensity.tableCell)}>
                          <DateDisplay date={payout.date} />
                        </td>
                        <td className={adminDensity.tableCell}>
                          <code className="rounded bg-muted px-2 py-1 text-xs">{payout.tx_hash}</code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fee-structure" className="mt-3">
          <Card className={adminCardClass()}>
            <CardHeader className={adminDensity.cardHeader}>
              <CardTitle className="text-base">Fee Structure</CardTitle>
              <CardDescription>Current fee configuration for distributions</CardDescription>
            </CardHeader>
            <CardContent className={adminDensity.cardContent}>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
                <div className="rounded-lg border border-border bg-card p-3">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-sm font-medium">Platform Fee</span>
                    <Badge>{FEE_STRUCTURE.platform_fee}%</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Deducted from gross revenue before distribution</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-3">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-sm font-medium">Management Fee</span>
                    <Badge>{FEE_STRUCTURE.management_fee}%</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Ongoing management and administration</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-3">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-sm font-medium">Performance Fee</span>
                    <Badge>{FEE_STRUCTURE.performance_fee}%</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Performance-based incentive fee</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Calculate Distribution Modal */}
      <Modal
        isOpen={isCalculating}
        onClose={() => {
          setIsCalculating(false);
          setCalculations(null);
          setRevenueInput('');
          setSelectedDeal(null);
        }}
        title="Calculate Distribution"
        subtitle="Input revenue and calculate investor payouts"
        size="lg"
      >
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium mb-2 block">Select Deal</label>
              <Select value={selectedDeal?.id.toString()} onValueChange={(v) => setSelectedDeal(mockDeals.find(d => d.id.toString() === v) || null)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a deal" />
                </SelectTrigger>
                <SelectContent>
                  {mockDeals.map(deal => (
                    <SelectItem key={deal.id} value={deal.id.toString()}>{deal.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Revenue Amount</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  type="number"
                  value={revenueInput}
                  onChange={(e) => setRevenueInput(e.target.value)}
                  placeholder="0.00"
                  className="pl-9"
                />
              </div>
            </div>
          </div>

          {selectedDeal && (
            <div className="rounded-lg border border-border bg-card p-3 text-sm">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-muted-foreground">Investor Share</p>
                  <p className="font-semibold">{selectedDeal.revenue_share}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Units Issued</p>
                  <p className="font-semibold">{selectedDeal.units_issued.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Investors</p>
                  <p className="font-semibold">{selectedDeal.investor_count}</p>
                </div>
              </div>
            </div>
          )}

          <Button onClick={calculateDistribution} disabled={!selectedDeal || !revenueInput}>
            <Calculator className="size-4 mr-2" />
            Calculate
          </Button>

          {calculations && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-900 dark:bg-green-950/30">
              <h4 className="mb-2 flex items-center gap-2 font-semibold">
                <ArrowUpRight className="size-4 text-chart-1" />
                Distribution Calculation
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Gross Revenue</p>
                  <p className="font-semibold"><CurrencyDisplay amount={calculations.revenue} /></p>
                </div>
                <div>
                  <p className="text-muted-foreground">Platform Fee (10%)</p>
                  <p className="font-semibold text-red-600">-<CurrencyDisplay amount={calculations.platformFee} /></p>
                </div>
                <div>
                  <p className="text-muted-foreground">Management Fee (5%)</p>
                  <p className="font-semibold text-red-600">-<CurrencyDisplay amount={calculations.managementFee} /></p>
                </div>
                <div>
                  <p className="text-muted-foreground">Net Revenue</p>
                  <p className="font-semibold"><CurrencyDisplay amount={calculations.netRevenue} /></p>
                </div>
                <div className="col-span-2 pt-2 border-t border-border">
                  <p className="text-muted-foreground">Investor Distribution</p>
                  <p className="text-xl font-semibold text-chart-1"><CurrencyDisplay amount={calculations.investorShare} /></p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <CurrencyDisplay amount={calculations.perUnit} /> per unit × {calculations.unitsIssued.toLocaleString()} units
                  </p>
                </div>
              </div>
            </div>
          )}

          {calculations && (
            <div className="flex gap-3">
              <Button onClick={handleCreateDistribution}>
                <Send className="size-4 mr-2" />
                Create Distribution
              </Button>
              <Button variant="outline" onClick={() => setCalculations(null)}>
                Reset
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}