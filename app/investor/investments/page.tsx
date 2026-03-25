'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CurrencyDisplay } from '@/components/shared/currency-display';
import { DateDisplay } from '@/components/shared/date-display';
import { Modal } from '@/components/shared/modal';
import {
  TrendingUp, DollarSign, Coins, Film, Calendar, Percent,
  ArrowRight, ExternalLink, FileText, AlertCircle
} from 'lucide-react';

const investments = [
  {
    id: 1,
    deal: 'Midnight Heist',
    dealId: '1',
    genre: 'Action',
    amount: 50000,
    tokens: 5000,
    tokenSymbol: 'MHT',
    unitPrice: 10,
    status: 'active',
    investedDate: '2026-01-15',
    // Investment details
    revenueShare: 15,
    valuation: 5000000,
    // Show progress
    fundingProgress: 64,
    fundingTarget: 500000,
    fundingRaised: 320000,
    productionStatus: 'pre_production',
    releaseStatus: 'in_production',
    distributionStatus: 'pending',
    // Distributions
    totalDistributions: 2500,
    pendingDistributions: 0,
    // Updates
    latestUpdate: {
      title: 'Casting Announced',
      date: '2026-03-15',
      content: 'Lead roles have been cast for the upcoming production...',
    },
  },
  {
    id: 2,
    deal: 'Last Dance',
    dealId: '3',
    genre: 'Drama',
    amount: 75000,
    tokens: 1500,
    tokenSymbol: 'LD',
    unitPrice: 50,
    status: 'active',
    investedDate: '2025-11-20',
    revenueShare: 12,
    valuation: 8000000,
    fundingProgress: 100,
    fundingTarget: 1000000,
    fundingRaised: 1000000,
    productionStatus: 'production',
    releaseStatus: 'in_production',
    distributionStatus: 'active',
    totalDistributions: 1800,
    pendingDistributions: 350,
    latestUpdate: {
      title: 'Production Update',
      date: '2026-03-20',
      content: 'Filming is 60% complete with excellent progress...',
    },
  },
];

const productionStatusLabels: Record<string, { label: string; color: string }> = {
  development: { label: 'Development', color: 'bg-gray-500' },
  pre_production: { label: 'Pre-Production', color: 'bg-blue-500' },
  production: { label: 'In Production', color: 'bg-yellow-500' },
  post_production: { label: 'Post-Production', color: 'bg-purple-500' },
  completed: { label: 'Completed', color: 'bg-green-500' },
  released: { label: 'Released', color: 'bg-primary' },
};

export default function InvestorInvestmentsPage() {
  const router = useRouter();
  const [selectedInvestment, setSelectedInvestment] = useState<typeof investments[0] | null>(null);

  const totalInvested = investments.reduce((sum, i) => sum + i.amount, 0);
  const totalTokens = investments.reduce((sum, i) => sum + i.tokens, 0);
  const totalDistributions = investments.reduce((sum, i) => sum + i.totalDistributions, 0);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Investments</h1>
        <p className="text-muted-foreground mt-1">Track your portfolio and show progress</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <DollarSign className="size-4" />
              <span className="text-sm font-medium">Total Invested</span>
            </div>
            <p className="text-2xl font-bold"><CurrencyDisplay amount={totalInvested} /></p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Coins className="size-4" />
              <span className="text-sm font-medium">Total Tokens</span>
            </div>
            <p className="text-2xl font-bold">{totalTokens.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <TrendingUp className="size-4" />
              <span className="text-sm font-medium">Distributions</span>
            </div>
            <p className="text-2xl font-bold text-green-600"><CurrencyDisplay amount={totalDistributions} /></p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Film className="size-4" />
              <span className="text-sm font-medium">Active Deals</span>
            </div>
            <p className="text-2xl font-bold">{investments.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Investment Cards */}
      <div className="flex flex-col gap-4">
        {investments.map((inv) => {
          const prodStatus = productionStatusLabels[inv.productionStatus];
          return (
            <Card key={inv.id} className="border border-border">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{inv.deal}</h3>
                        <Badge variant="outline">{inv.genre}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Invested <DateDisplay date={inv.investedDate} />
                      </p>
                    </div>
                    <Badge className="bg-green-600">Active</Badge>
                  </div>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 bg-card rounded-lg">
                    <div>
                      <p className="text-xs text-muted-foreground">Amount Invested</p>
                      <p className="font-semibold"><CurrencyDisplay amount={inv.amount} /></p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Tokens Owned</p>
                      <p className="font-semibold">{inv.tokens.toLocaleString()} {inv.tokenSymbol}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Revenue Share</p>
                      <p className="font-semibold">{inv.revenueShare}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Distributions</p>
                      <p className="font-semibold text-green-600"><CurrencyDisplay amount={inv.totalDistributions} /></p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Valuation</p>
                      <p className="font-semibold"><CurrencyDisplay amount={inv.valuation} compact /></p>
                    </div>
                  </div>

                  {/* Show Progress Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Funding Progress */}
                    <div>
                      <p className="text-sm font-medium mb-3">Funding Progress</p>
                      <Progress value={inv.fundingProgress} className="h-2 mb-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span><CurrencyDisplay amount={inv.fundingRaised} /> raised</span>
                        <span><CurrencyDisplay amount={inv.fundingTarget} /> target</span>
                      </div>
                    </div>

                    {/* Production Status */}
                    <div>
                      <p className="text-sm font-medium mb-3">Production Status</p>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`size-2 rounded-full ${prodStatus.color}`} />
                        <span className="text-sm">{prodStatus.label}</span>
                      </div>
                      <div className="flex gap-1">
                        {Object.keys(productionStatusLabels).map((status, idx) => (
                          <div
                            key={status}
                            className={`flex-1 h-1 rounded-full ${
                              idx <= Object.keys(productionStatusLabels).indexOf(inv.productionStatus)
                                ? 'bg-primary'
                                : 'bg-muted'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Distribution Status */}
                  <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                    <div className="flex items-center gap-3">
                      <DollarSign className="size-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Distribution Status</p>
                        <p className="text-xs text-muted-foreground capitalize">{inv.distributionStatus}</p>
                      </div>
                    </div>
                    {inv.pendingDistributions > 0 && (
                      <Badge className="bg-orange-500">
                        <CurrencyDisplay amount={inv.pendingDistributions} /> pending
                      </Badge>
                    )}
                  </div>

                  {/* Latest Update */}
                  {inv.latestUpdate && (
                    <div className="flex items-start gap-3 p-3 border border-border rounded-lg">
                      <AlertCircle className="size-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">{inv.latestUpdate.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{inv.latestUpdate.content}</p>
                        <p className="text-xs text-muted-foreground mt-1"><DateDisplay date={inv.latestUpdate.date} /></p>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <Button onClick={() => setSelectedInvestment(inv)}>
                      View Details
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={`/investor/deals/${inv.dealId}`}>
                        <ExternalLink className="size-4 mr-2" />
                        Deal Page
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/investor/documents">
                        <FileText className="size-4 mr-2" />
                        Documents
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedInvestment}
        onClose={() => setSelectedInvestment(null)}
        title={selectedInvestment?.deal || ''}
        subtitle="Investment details and progress"
        size="lg"
      >
        {selectedInvestment && (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="progress">Show Progress</TabsTrigger>
              <TabsTrigger value="distributions">Distributions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Investment Amount</p>
                  <p className="font-semibold"><CurrencyDisplay amount={selectedInvestment.amount} /></p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tokens Owned</p>
                  <p className="font-semibold">{selectedInvestment.tokens.toLocaleString()} {selectedInvestment.tokenSymbol}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Unit Price</p>
                  <p className="font-semibold"><CurrencyDisplay amount={selectedInvestment.unitPrice} /></p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Revenue Share</p>
                  <p className="font-semibold">{selectedInvestment.revenueShare}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Investment Date</p>
                  <p className="font-semibold"><DateDisplay date={selectedInvestment.investedDate} /></p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Deal Valuation</p>
                  <p className="font-semibold"><CurrencyDisplay amount={selectedInvestment.valuation} /></p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="progress" className="mt-4">
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-sm font-medium mb-2">Funding</p>
                  <Progress value={selectedInvestment.fundingProgress} className="h-2 mb-1" />
                  <p className="text-xs text-muted-foreground">{selectedInvestment.fundingProgress}% funded</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Production</p>
                  <p className="text-sm capitalize">{selectedInvestment.productionStatus.replace('_', ' ')}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Release Status</p>
                  <p className="text-sm capitalize">{selectedInvestment.releaseStatus.replace('_', ' ')}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="distributions" className="mt-4">
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-card rounded-lg">
                    <p className="text-xs text-muted-foreground">Total Received</p>
                    <p className="text-xl font-bold text-green-600">
                      <CurrencyDisplay amount={selectedInvestment.totalDistributions} />
                    </p>
                  </div>
                  <div className="p-4 bg-card rounded-lg">
                    <p className="text-xs text-muted-foreground">Pending</p>
                    <p className="text-xl font-bold">
                      <CurrencyDisplay amount={selectedInvestment.pendingDistributions} />
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Distribution Status</p>
                  <Badge variant={selectedInvestment.distributionStatus === 'active' ? 'default' : 'secondary'}>
                    {selectedInvestment.distributionStatus}
                  </Badge>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </Modal>
    </div>
  );
}