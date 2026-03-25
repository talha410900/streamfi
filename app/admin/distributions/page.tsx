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
  DollarSign, Send, Calculator, FileText, CheckCircle, Clock, AlertCircle,
  TrendingUp, Percent, Users, ArrowUpRight, Download
} from 'lucide-react';

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
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Distributions</h1>
          <p className="text-muted-foreground mt-1">Calculate and manage investor payouts</p>
        </div>
        <Button onClick={() => setIsCalculating(true)}>
          <Calculator className="size-4 mr-2" />
          Calculate Distribution
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <CheckCircle className="size-4" />
              <span className="text-xs font-medium">Total Distributed</span>
            </div>
            <p className="text-2xl font-bold"><CurrencyDisplay amount={totalDistributed} /></p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Clock className="size-4" />
              <span className="text-xs font-medium">Pending</span>
            </div>
            <p className="text-2xl font-bold"><CurrencyDisplay amount={totalPending} /></p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <TrendingUp className="size-4" />
              <span className="text-xs font-medium">Distribution Events</span>
            </div>
            <p className="text-2xl font-bold">{distributions.length}</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Users className="size-4" />
              <span className="text-xs font-medium">Investors Paid</span>
            </div>
            <p className="text-2xl font-bold">{totalInvestors}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="distributions" className="w-full">
        <TabsList>
          <TabsTrigger value="distributions">Distribution Events</TabsTrigger>
          <TabsTrigger value="ledger">Payout Ledger</TabsTrigger>
          <TabsTrigger value="fee-structure">Fee Structure</TabsTrigger>
        </TabsList>

        <TabsContent value="distributions" className="mt-6">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-base">Distribution History</CardTitle>
              <CardDescription>All revenue distribution events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold">Deal</th>
                      <th className="text-left py-3 px-4 font-semibold">Revenue</th>
                      <th className="text-left py-3 px-4 font-semibold">Fees</th>
                      <th className="text-left py-3 px-4 font-semibold">Investor Share</th>
                      <th className="text-left py-3 px-4 font-semibold">Per Unit</th>
                      <th className="text-left py-3 px-4 font-semibold">Progress</th>
                      <th className="text-left py-3 px-4 font-semibold">Date</th>
                      <th className="text-left py-3 px-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {distributions.map((dist) => {
                      const progress = (dist.investors_paid / dist.investors_total) * 100;
                      return (
                        <tr key={dist.id} className="border-b border-border/50 hover:bg-card">
                          <td className="py-4 px-4 font-medium">{dist.deal_title}</td>
                          <td className="py-4 px-4"><CurrencyDisplay amount={dist.revenue_amount} /></td>
                          <td className="py-4 px-4 text-muted-foreground">
                            <CurrencyDisplay amount={dist.platform_fee + dist.management_fee} />
                          </td>
                          <td className="py-4 px-4 font-semibold text-green-600 dark:text-green-400">
                            <CurrencyDisplay amount={dist.total_distribution} />
                          </td>
                          <td className="py-4 px-4"><CurrencyDisplay amount={dist.per_unit} /></td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <Progress value={progress} className="w-16 h-1.5" />
                              <span className="text-xs">{dist.investors_paid}/{dist.investors_total}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-muted-foreground">
                            <DateDisplay date={dist.date} />
                          </td>
                          <td className="py-4 px-4">
                            {dist.status === 'pending' ? (
                              <Button size="sm">
                                <Send className="size-3 mr-1" />
                                Send
                              </Button>
                            ) : (
                              <Badge className="bg-green-600">Completed</Badge>
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

        <TabsContent value="ledger" className="mt-6">
          <Card className="border border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Payout Ledger</CardTitle>
                <CardDescription>Individual investor payouts</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="size-4 mr-2" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold">Investor</th>
                      <th className="text-left py-3 px-4 font-semibold">Deal</th>
                      <th className="text-left py-3 px-4 font-semibold">Units</th>
                      <th className="text-left py-3 px-4 font-semibold">Per Unit</th>
                      <th className="text-left py-3 px-4 font-semibold">Amount</th>
                      <th className="text-left py-3 px-4 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 font-semibold">Date</th>
                      <th className="text-left py-3 px-4 font-semibold">TX Hash</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPayoutLedger.map((payout) => (
                      <tr key={payout.id} className="border-b border-border/50 hover:bg-card">
                        <td className="py-4 px-4 font-medium">{payout.investor}</td>
                        <td className="py-4 px-4">{payout.deal}</td>
                        <td className="py-4 px-4">{payout.units.toLocaleString()}</td>
                        <td className="py-4 px-4"><CurrencyDisplay amount={payout.per_unit} /></td>
                        <td className="py-4 px-4 font-semibold">
                          <CurrencyDisplay amount={payout.amount} />
                        </td>
                        <td className="py-4 px-4">
                          <Badge className="bg-green-600">Paid</Badge>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground">
                          <DateDisplay date={payout.date} />
                        </td>
                        <td className="py-4 px-4">
                          <code className="text-xs bg-muted px-2 py-1 rounded">{payout.tx_hash}</code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fee-structure" className="mt-6">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-base">Fee Structure</CardTitle>
              <CardDescription>Current fee configuration for distributions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-card rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Platform Fee</span>
                    <Badge>{FEE_STRUCTURE.platform_fee}%</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Deducted from gross revenue before distribution</p>
                </div>
                <div className="p-4 bg-card rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Management Fee</span>
                    <Badge>{FEE_STRUCTURE.management_fee}%</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Ongoing management and administration</p>
                </div>
                <div className="p-4 bg-card rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
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
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
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
            <div className="p-4 bg-card rounded-lg border border-border text-sm">
              <div className="grid grid-cols-3 gap-4">
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
            <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-900">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <ArrowUpRight className="size-4 text-green-600" />
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
                  <p className="text-xl font-bold text-green-600"><CurrencyDisplay amount={calculations.investorShare} /></p>
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