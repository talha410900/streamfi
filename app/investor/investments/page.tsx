'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { CurrencyDisplay } from '@/components/shared/currency-display';
import { DateDisplay } from '@/components/shared/date-display';
import { Modal } from '@/components/shared/modal';
import {
  TrendingUp,
  DollarSign,
  Coins,
  Film,
  ExternalLink,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  investorDensity,
  investorCardClass,
} from '@/components/investor/investor-density';

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
    revenueShare: 15,
    valuation: 5000000,
    fundingProgress: 64,
    fundingTarget: 500000,
    fundingRaised: 320000,
    productionStatus: 'pre_production',
    releaseStatus: 'in_production',
    distributionStatus: 'pending',
    totalDistributions: 2500,
    pendingDistributions: 0,
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

const productionStatusLabels: Record<string, { label: string; dotClass: string }> = {
  development: { label: 'Development', dotClass: 'bg-muted-foreground' },
  pre_production: { label: 'Pre-Production', dotClass: 'bg-chart-2' },
  production: { label: 'In Production', dotClass: 'bg-chart-3' },
  post_production: { label: 'Post-Production', dotClass: 'bg-chart-4' },
  completed: { label: 'Completed', dotClass: 'bg-primary' },
  released: { label: 'Released', dotClass: 'bg-primary' },
};

function StatInline({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-0.5 px-3 py-2 first:pl-0 last:pr-0 md:px-4">
      <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
        <span className="[&_svg]:size-3">{icon}</span>
        {label}
      </div>
      <div className="truncate text-base font-semibold tabular-nums">{children}</div>
    </div>
  );
}

export default function InvestorInvestmentsPage() {
  const [selectedInvestment, setSelectedInvestment] = useState<
    (typeof investments)[0] | null
  >(null);

  const totalInvested = investments.reduce((sum, i) => sum + i.amount, 0);
  const totalTokens = investments.reduce((sum, i) => sum + i.tokens, 0);
  const totalDistributions = investments.reduce((sum, i) => sum + i.totalDistributions, 0);

  return (
    <div className={investorDensity.page}>
      <div className="flex flex-col gap-0.5 border-b border-border/60 pb-2.5">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Investments
        </h1>
        <p className="text-xs text-muted-foreground">
          Capital deployed, tokens, distributions, and show milestones by deal.
        </p>
      </div>

      <Card className={cn(investorCardClass(), 'border-border/80')}>
        <CardContent className="flex flex-col divide-y divide-border/80 p-3 sm:flex-row sm:divide-x sm:divide-y-0 sm:items-stretch">
          <StatInline icon={<DollarSign />} label="Invested">
            <CurrencyDisplay amount={totalInvested} />
          </StatInline>
          <StatInline icon={<Coins />} label="Tokens">
            {totalTokens.toLocaleString()}
          </StatInline>
          <StatInline icon={<TrendingUp />} label="Distributions">
            <span className="text-chart-1">
              <CurrencyDisplay amount={totalDistributions} />
            </span>
          </StatInline>
          <StatInline icon={<Film />} label="Deals">
            {investments.length}
          </StatInline>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3">
        {investments.map((inv) => {
          const prodStatus = productionStatusLabels[inv.productionStatus];
          return (
            <Card key={inv.id} className={cn(investorCardClass(), 'border-border/80')}>
              <CardContent className="flex flex-col gap-2.5 p-3 sm:p-3.5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-base font-semibold leading-tight">{inv.deal}</h2>
                      <Badge variant="outline" className="text-[10px] font-normal">
                        {inv.genre}
                      </Badge>
                      <Badge variant="secondary" className="text-[10px] font-normal">
                        Active
                      </Badge>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Invested <DateDisplay date={inv.investedDate} />
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-y border-border/60 py-2.5 sm:grid-cols-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                      Amount
                    </p>
                    <p className="text-sm font-medium tabular-nums">
                      <CurrencyDisplay amount={inv.amount} />
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                      Tokens
                    </p>
                    <p className="text-sm font-medium tabular-nums">
                      {inv.tokens.toLocaleString()} {inv.tokenSymbol}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                      Rev share
                    </p>
                    <p className="text-sm font-medium">{inv.revenueShare}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                      Distributions
                    </p>
                    <p className="text-sm font-medium tabular-nums text-chart-1">
                      <CurrencyDisplay amount={inv.totalDistributions} />
                    </p>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                      Valuation
                    </p>
                    <p className="text-sm font-medium tabular-nums">
                      <CurrencyDisplay amount={inv.valuation} compact />
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                      Funding
                    </p>
                    <Progress value={inv.fundingProgress} className="h-1" />
                    <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
                      <span>
                        <CurrencyDisplay amount={inv.fundingRaised} /> raised
                      </span>
                      <span>
                        <CurrencyDisplay amount={inv.fundingTarget} /> target
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                      Production
                    </p>
                    <div className="flex items-center gap-2">
                      <div className={`size-1.5 shrink-0 rounded-full ${prodStatus.dotClass}`} />
                      <span className="text-sm">{prodStatus.label}</span>
                    </div>
                    <div className="mt-1.5 flex gap-0.5">
                      {Object.keys(productionStatusLabels).map((status, idx) => (
                        <div
                          key={status}
                          className={`h-0.5 flex-1 rounded-full ${
                            idx <=
                            Object.keys(productionStatusLabels).indexOf(inv.productionStatus)
                              ? 'bg-primary'
                              : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border/60 bg-muted/20 px-2.5 py-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="size-3.5 text-muted-foreground" />
                    <div>
                      <p className="text-xs font-medium">Distribution status</p>
                      <p className="text-[11px] capitalize text-muted-foreground">
                        {inv.distributionStatus.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                  {inv.pendingDistributions > 0 ? (
                    <Badge variant="outline" className="text-[10px] font-normal">
                      <CurrencyDisplay amount={inv.pendingDistributions} /> pending
                    </Badge>
                  ) : null}
                </div>

                {inv.latestUpdate ? (
                  <div className="flex gap-2 rounded-md border border-dashed border-border/80 px-2.5 py-2">
                    <AlertCircle className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium">{inv.latestUpdate.title}</p>
                      <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                        {inv.latestUpdate.content}
                      </p>
                      <p className="mt-1 text-[10px] text-muted-foreground">
                        <DateDisplay date={inv.latestUpdate.date} />
                      </p>
                    </div>
                  </div>
                ) : null}

                <div className="flex flex-wrap gap-2 border-t border-border/60 pt-3">
                  <Button size="sm" onClick={() => setSelectedInvestment(inv)}>
                    View details
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/investor/deals/${inv.dealId}`}>
                      <ExternalLink />
                      Deal page
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/investor/documents">
                      <FileText />
                      Documents
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Modal
        isOpen={!!selectedInvestment}
        onClose={() => setSelectedInvestment(null)}
        title={selectedInvestment?.deal || ''}
        subtitle="Investment details and progress"
        size="lg"
      >
        {selectedInvestment ? (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid h-8 w-full grid-cols-3">
              <TabsTrigger value="overview" className="text-xs">
                Overview
              </TabsTrigger>
              <TabsTrigger value="progress" className="text-xs">
                Show progress
              </TabsTrigger>
              <TabsTrigger value="distributions" className="text-xs">
                Distributions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-[10px] uppercase text-muted-foreground">Investment amount</p>
                  <p className="font-medium tabular-nums">
                    <CurrencyDisplay amount={selectedInvestment.amount} />
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-muted-foreground">Tokens owned</p>
                  <p className="font-medium tabular-nums">
                    {selectedInvestment.tokens.toLocaleString()}{' '}
                    {selectedInvestment.tokenSymbol}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-muted-foreground">Unit price</p>
                  <p className="font-medium tabular-nums">
                    <CurrencyDisplay amount={selectedInvestment.unitPrice} />
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-muted-foreground">Revenue share</p>
                  <p className="font-medium">{selectedInvestment.revenueShare}%</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-muted-foreground">Investment date</p>
                  <p className="font-medium">
                    <DateDisplay date={selectedInvestment.investedDate} />
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-muted-foreground">Deal valuation</p>
                  <p className="font-medium tabular-nums">
                    <CurrencyDisplay amount={selectedInvestment.valuation} />
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="progress" className="mt-3">
              <div className="flex flex-col gap-3">
                <div>
                  <p className="mb-1 text-[10px] font-medium uppercase text-muted-foreground">
                    Funding
                  </p>
                  <Progress value={selectedInvestment.fundingProgress} className="h-1" />
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {selectedInvestment.fundingProgress}% funded
                  </p>
                </div>
                <Separator />
                <div>
                  <p className="mb-0.5 text-[10px] font-medium uppercase text-muted-foreground">
                    Production
                  </p>
                  <p className="text-sm capitalize">
                    {selectedInvestment.productionStatus.replace('_', ' ')}
                  </p>
                </div>
                <div>
                  <p className="mb-0.5 text-[10px] font-medium uppercase text-muted-foreground">
                    Release status
                  </p>
                  <p className="text-sm capitalize">
                    {selectedInvestment.releaseStatus.replace('_', ' ')}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="distributions" className="mt-3">
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-md border border-border/60 bg-muted/20 px-3 py-2">
                    <p className="text-[10px] uppercase text-muted-foreground">Total received</p>
                    <p className="text-lg font-semibold tabular-nums text-chart-1">
                      <CurrencyDisplay amount={selectedInvestment.totalDistributions} />
                    </p>
                  </div>
                  <div className="rounded-md border border-border/60 bg-muted/20 px-3 py-2">
                    <p className="text-[10px] uppercase text-muted-foreground">Pending</p>
                    <p className="text-lg font-semibold tabular-nums">
                      <CurrencyDisplay amount={selectedInvestment.pendingDistributions} />
                    </p>
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-medium uppercase text-muted-foreground">
                    Distribution status
                  </p>
                  <Badge
                    variant={
                      selectedInvestment.distributionStatus === 'active'
                        ? 'default'
                        : 'secondary'
                    }
                    className="text-xs font-normal"
                  >
                    {selectedInvestment.distributionStatus}
                  </Badge>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        ) : null}
      </Modal>
    </div>
  );
}
