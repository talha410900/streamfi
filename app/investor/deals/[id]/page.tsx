'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CurrencyDisplay } from '@/components/shared/currency-display';
import { DateDisplay } from '@/components/shared/date-display';
import { StatusBadge } from '@/components/shared/status-badge';
import { Modal } from '@/components/shared/modal';
import { InvestmentFlowModal } from '@/components/investor/investment-flow-modal';
import {
  ArrowLeft, FileText, Download, Target, Percent, Users, Calendar,
  Film, DollarSign, TrendingUp, AlertCircle, CheckCircle, Clock,
  ExternalLink, Coins
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  investorDensity,
  investorCardClass,
} from '@/components/investor/investor-density';

const mockDeals: Record<string, any> = {
  '1': {
    id: '1',
    title: 'Midnight Heist',
    genre: 'Action',
    description: 'A high-octane heist thriller set in the heart of New York City. Follow a team of elite thieves as they attempt the most audacious robbery in history, only to discover that the real prize holds consequences far beyond money.',
    status: 'open',
    raiseTarget: 500000,
    raised: 320000,
    investors: 12,
    valuation: 5000000,
    minInvestment: 10000,
    unitPrice: 10,
    tokenSymbol: 'MHT',
    totalUnits: 50000,
    revenueShare: 15,
    // Dates
    fundingStartDate: '2026-02-01',
    fundingEndDate: '2026-04-30',
    // Production
    productionStatus: 'pre_production',
    releaseStatus: 'in_production',
    distributionStatus: 'pending',
    // Documents
    documents: [
      { id: 1, name: 'Investment Memorandum', size: '2.4 MB', type: 'memorandum' },
      { id: 2, name: 'Financial Projections', size: '1.1 MB', type: 'financial' },
      { id: 3, name: 'Producer Background', size: '856 KB', type: 'background' },
      { id: 4, name: 'Script Treatment', size: '1.8 MB', type: 'creative' },
    ],
    // Updates
    updates: [
      { id: 1, title: 'Casting Announcement', date: '2026-03-15', content: 'We are excited to announce the lead cast for Midnight Heist...' },
      { id: 2, title: 'Location Secured', date: '2026-03-01', content: 'Principal photography locations have been confirmed in NYC...' },
    ],
  },
  '2': {
    id: '2',
    title: 'Neon Horizons',
    genre: 'Sci-Fi',
    description: 'A sci-fi thriller following a rogue AI developer who discovers her creation has evolved beyond her control.',
    status: 'open',
    raiseTarget: 3000000,
    raised: 2340000,
    investors: 47,
    valuation: 12000000,
    minInvestment: 25000,
    unitPrice: 100,
    tokenSymbol: 'NH',
    totalUnits: 30000,
    revenueShare: 20,
    fundingStartDate: '2026-01-15',
    fundingEndDate: '2026-05-30',
    productionStatus: 'development',
    releaseStatus: 'pre_production',
    distributionStatus: 'pending',
    documents: [
      { id: 1, name: 'Investment Memorandum', size: '3.2 MB', type: 'memorandum' },
      { id: 2, name: 'Script Excerpt', size: '856 KB', type: 'creative' },
    ],
    updates: [
      { id: 1, title: 'Development Update', date: '2026-03-10', content: 'Script revisions complete, moving to casting phase...' },
    ],
  },
  '3': {
    id: '3',
    title: 'Last Dance',
    genre: 'Drama',
    description: 'An intimate drama exploring the final years of a legendary ballet company and its dancers.',
    status: 'funded',
    raiseTarget: 1000000,
    raised: 1000000,
    investors: 18,
    valuation: 8000000,
    minInvestment: 25000,
    unitPrice: 50,
    tokenSymbol: 'LD',
    totalUnits: 20000,
    revenueShare: 12,
    fundingStartDate: '2025-10-01',
    fundingEndDate: '2026-03-15',
    productionStatus: 'production',
    releaseStatus: 'in_production',
    distributionStatus: 'active',
    documents: [
      { id: 1, name: 'Investment Memorandum', size: '2.8 MB', type: 'memorandum' },
      { id: 2, name: 'Director\'s Vision', size: '1.5 MB', type: 'creative' },
    ],
    updates: [
      { id: 1, title: 'Production Update', date: '2026-03-20', content: 'Filming is 60% complete with excellent progress...' },
      { id: 2, title: 'Behind the Scenes', date: '2026-03-05', content: 'Exclusive BTS photos from the set...' },
    ],
  },
};

const productionStages = [
  { key: 'development', label: 'Development' },
  { key: 'pre_production', label: 'Pre-Production' },
  { key: 'production', label: 'Production' },
  { key: 'post_production', label: 'Post-Production' },
  { key: 'completed', label: 'Completed' },
  { key: 'released', label: 'Released' },
];

export default function DealDetailPage() {
  const params = useParams();
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [investmentComplete, setInvestmentComplete] = useState(false);

  const deal = mockDeals[params.id as string];

  if (!deal) {
    return (
      <div className="flex flex-col gap-4">
        <Link href="/investor/deals">
          <Button variant="outline">
            <ArrowLeft className="size-4 mr-2" />
            Back to Deals
          </Button>
        </Link>
        <Card className={investorCardClass()}>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">Deal not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = (deal.raised / deal.raiseTarget) * 100;
  const daysLeft = Math.ceil((new Date(deal.fundingEndDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const productionIndex = productionStages.findIndex(s => s.key === deal.productionStatus);
  const isOpen = deal.status === 'open';

  const handleInvestmentSubmit = (amount: number) => {
    setInvestmentComplete(true);
    setShowInvestmentModal(false);
  };

  return (
    <div className={investorDensity.pageTight}>
      {/* Back Button */}
      <Link href="/investor/deals">
        <Button variant="outline">
          <ArrowLeft className="size-4 mr-2" />
          Back to Deals
        </Button>
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{deal.title}</h1>
            <StatusBadge status={deal.status} />
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline">{deal.genre}</Badge>
            <span className="text-sm text-muted-foreground">{productionStages[productionIndex]?.label}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Token</p>
          <Badge className="text-base">{deal.tokenSymbol}</Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
        {/* Left Column */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          {/* Description */}
          <Card className={investorCardClass()}>
            <CardHeader className={investorDensity.cardHeader}>
              <CardTitle className="text-base">About This Deal</CardTitle>
            </CardHeader>
            <CardContent className={investorDensity.cardContentSection}>
              <p className="text-muted-foreground leading-relaxed">{deal.description}</p>
            </CardContent>
          </Card>

          {/* Funding Progress */}
          <Card className={investorCardClass()}>
            <CardHeader className={investorDensity.cardHeader}>
              <CardTitle className="text-base">Funding Progress</CardTitle>
            </CardHeader>
            <CardContent
              className={cn(
                'flex flex-col gap-3',
                investorDensity.cardContentSection,
              )}
            >
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-2xl font-bold">{Math.round(progress)}%</span>
                  <span className="text-sm text-muted-foreground">
                    <CurrencyDisplay amount={deal.raised} /> of <CurrencyDisplay amount={deal.raiseTarget} />
                  </span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>

              <div className="grid grid-cols-3 gap-3 border-t border-border pt-3 sm:gap-4 sm:pt-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Valuation</p>
                  <p className="font-semibold"><CurrencyDisplay amount={deal.valuation} compact /></p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Investors</p>
                  <p className="font-semibold">{deal.investors}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Days Left</p>
                  <p className="font-semibold">{isOpen && daysLeft > 0 ? daysLeft : '-'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Show Progress */}
          <Card className={investorCardClass()}>
            <CardHeader className={investorDensity.cardHeader}>
              <CardTitle className="text-base">Show Progress</CardTitle>
              <CardDescription>Track production and distribution status</CardDescription>
            </CardHeader>
            <CardContent
              className={cn('flex flex-col gap-4', investorDensity.cardContentSection)}
            >
              {/* Production Timeline */}
              <div>
                <p className="text-sm font-medium mb-3">Production Status</p>
                <div className="flex items-center gap-1 mb-2">
                  {productionStages.map((stage, idx) => (
                    <div key={stage.key} className="flex-1 flex items-center">
                      <div
                        className={`w-full h-2 rounded-full ${
                          idx <= productionIndex ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  {productionStages.map((stage, idx) => (
                    <span key={stage.key} className={idx === productionIndex ? 'text-primary font-medium' : ''}>
                      {stage.label.split(' ')[0]}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-card p-2.5 sm:p-3">
                  <p className="text-xs text-muted-foreground mb-1">Release Status</p>
                  <p className="font-medium capitalize">{deal.releaseStatus.replace('_', ' ')}</p>
                </div>
                <div className="rounded-lg bg-card p-2.5 sm:p-3">
                  <p className="text-xs text-muted-foreground mb-1">Distribution Status</p>
                  <p className="font-medium capitalize">{deal.distributionStatus}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card className={investorCardClass()}>
            <CardHeader className={investorDensity.cardHeader}>
              <CardTitle className="text-base">Latest Updates</CardTitle>
              <CardDescription>News from the production team</CardDescription>
            </CardHeader>
            <CardContent className={investorDensity.cardContentSection}>
              <div className="flex flex-col gap-3">
                {deal.updates.map((update: any) => (
                  <div key={update.id} className="flex gap-2.5 border-b border-border/50 pb-3 last:border-0 last:pb-0">
                    <div className="size-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <AlertCircle className="size-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{update.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{update.content}</p>
                      <p className="text-xs text-muted-foreground mt-2"><DateDisplay date={update.date} /></p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card className={investorCardClass()}>
            <CardHeader className={investorDensity.cardHeader}>
              <CardTitle className="text-base">Deal Documents</CardTitle>
              <CardDescription>Review investment materials</CardDescription>
            </CardHeader>
            <CardContent className={investorDensity.cardContentSection}>
              <div className="flex flex-col gap-1.5">
                {deal.documents.map((doc: any) => (
                  <div key={doc.id} className="flex items-center justify-between rounded-lg bg-card p-2.5 transition-colors hover:bg-muted sm:p-3">
                    <div className="flex items-center gap-3">
                      <FileText className="size-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Investment Card */}
        <div className="flex flex-col gap-4">
          <Card className={cn(investorCardClass(), 'sticky top-4')}>
            <CardHeader className={investorDensity.cardHeader}>
              <CardTitle>Investment Summary</CardTitle>
            </CardHeader>
            <CardContent
              className={cn('flex flex-col gap-3', investorDensity.cardContentSection)}
            >
              {investmentComplete ? (
                <div className="rounded-lg bg-green-50 p-3 text-center dark:bg-green-950/30 sm:p-3.5">
                  <CheckCircle className="mx-auto mb-2 size-8 text-chart-1" />
                  <p className="font-semibold text-green-900 dark:text-green-300 mb-2">Investment Submitted!</p>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    You'll receive wire instructions shortly. Once funds are received, tokens will be issued to your wallet.
                  </p>
                </div>
              ) : (
                <>
                  {/* Key Investment Info */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Unit Price</span>
                      <span className="font-semibold"><CurrencyDisplay amount={deal.unitPrice} /></span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Revenue Share</span>
                      <span className="font-semibold">{deal.revenueShare}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Min Investment</span>
                      <span className="font-semibold"><CurrencyDisplay amount={deal.minInvestment} /></span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Units</span>
                      <span className="font-semibold">{deal.totalUnits.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Funding Period</span>
                    </div>
                    <p className="text-sm">
                      <DateDisplay date={deal.fundingStartDate} /> - <DateDisplay date={deal.fundingEndDate} />
                    </p>
                  </div>

                  <Button
                    onClick={() => setShowInvestmentModal(true)}
                    className="w-full mt-2"
                    disabled={!isOpen}
                  >
                    {isOpen ? 'Invest Now' : 'Deal Closed'}
                  </Button>

                  {!isOpen && (
                    <p className="text-xs text-muted-foreground text-center">
                      This deal is no longer accepting investments
                    </p>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className={investorCardClass()}>
            <CardHeader className={investorDensity.cardHeader}>
              <CardTitle className="text-base">Key Metrics</CardTitle>
            </CardHeader>
            <CardContent className={investorDensity.cardContentSection}>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-center gap-2">
                  <Target className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Target</p>
                    <p className="text-sm font-semibold"><CurrencyDisplay amount={deal.raiseTarget} compact /></p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Percent className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Rev Share</p>
                    <p className="text-sm font-semibold">{deal.revenueShare}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Investors</p>
                    <p className="text-sm font-semibold">{deal.investors}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Coins className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Token</p>
                    <p className="text-sm font-semibold">{deal.tokenSymbol}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Investment Modal */}
      {showInvestmentModal && (
        <InvestmentFlowModal
          dealId={deal.id}
          dealTitle={deal.title}
          minInvestment={deal.minInvestment}
          unitPrice={deal.unitPrice}
          onSubmit={handleInvestmentSubmit}
          onClose={() => setShowInvestmentModal(false)}
        />
      )}
    </div>
  );
}