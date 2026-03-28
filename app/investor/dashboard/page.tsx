'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CurrencyDisplay } from '@/components/shared/currency-display';
import { DateDisplay } from '@/components/shared/date-display';
import { ComplianceStatusCard } from '@/components/shared/compliance-status-card';
import { DashboardPageHeader } from '@/components/shared/dashboard-page-header';
import { Modal } from '@/components/shared/modal';
import {
  investorDensity,
  investorCardClass,
} from '@/components/investor/investor-density';
import {
  TrendingUp, DollarSign, ArrowRight,
  Coins, ArrowUpRight, Film, FileText, Bell,
  PieChart, Calendar, Wallet, ClipboardCheck,
  CheckCircle, ShieldCheck, ClipboardList, FileSignature,
  User, MapPin, Building, Briefcase, ExternalLink,
  ArrowDownRight, CircleDot,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ONBOARDING_STEPS } from '@/lib/auth';

/* ── Mock Data ── */

const portfolioData = {
  totalValue: 129300,
  totalInvested: 125000,
  totalTokens: 6500,
  activeDeals: 2,
  totalDistributions: 4300,
  unrealizedGain: 4300,
};

const holdings = [
  {
    id: 1,
    deal: 'Midnight Heist',
    tokens: 5000,
    tokenSymbol: 'MHT',
    ownershipPercent: 10,
    investedAmount: 50000,
    currentValue: 52500,
    distributionsReceived: 2500,
    productionStatus: 'pre_production',
    statusColor: 'bg-amber-500',
  },
  {
    id: 2,
    deal: 'Last Dance',
    tokens: 1500,
    tokenSymbol: 'LD',
    ownershipPercent: 7.5,
    investedAmount: 75000,
    currentValue: 76800,
    distributionsReceived: 1800,
    productionStatus: 'production',
    statusColor: 'bg-chart-1',
  },
];

const distributionHistory = [
  { id: 1, deal: 'Midnight Heist', amount: 2500, date: '2026-03-20', type: 'Q1 Revenue Share' },
  { id: 2, deal: 'Last Dance', amount: 1800, date: '2026-03-15', type: 'Q1 Revenue Share' },
  { id: 3, deal: 'Midnight Heist', amount: 1950, date: '2026-02-28', type: 'Bonus Distribution' },
];

const dealProgressCards = [
  {
    id: 1,
    deal: 'Midnight Heist',
    status: 'pre_production',
    progress: 35,
    lastUpdate: 'Casting confirmed for lead roles',
    updateDate: '2026-03-15',
    nextMilestone: 'Location scouting begins',
    icon: Film,
  },
  {
    id: 2,
    deal: 'Last Dance',
    status: 'production',
    progress: 60,
    lastUpdate: 'Filming 60% complete with excellent progress',
    updateDate: '2026-03-20',
    nextMilestone: 'Post-production begins Apr 15',
    icon: Film,
  },
];

const upcomingEvents = [
  { id: 1, type: 'distribution' as const, title: 'Midnight Heist Q1 distribution', date: '2026-04-01', daysAway: 4 },
  { id: 2, type: 'milestone' as const, title: 'Last Dance — production wrap', date: '2026-04-15', daysAway: 18 },
  { id: 3, type: 'deadline' as const, title: 'K-1 available', date: '2026-03-31', daysAway: 3 },
];

const eventTypeStyles: Record<string, { dot: string; label: string }> = {
  distribution: { dot: 'bg-chart-1', label: 'Payout' },
  milestone: { dot: 'bg-chart-2', label: 'Milestone' },
  deadline: { dot: 'bg-chart-3', label: 'Deadline' },
};

/* ── Page ── */

export default function InvestorDashboardPage() {
  const onboardingComplete = true;
  const [showOnboarding, setShowOnboarding] = useState(false);

  const gainPercent = ((portfolioData.unrealizedGain / portfolioData.totalInvested) * 100).toFixed(1);

  return (
    <div className={investorDensity.page}>
      <DashboardPageHeader
        title="Portfolio"
        description="Your investment positions, distributions, and deal progress at a glance."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowOnboarding(true)}>
              <ClipboardCheck data-icon="inline-start" />
              View Onboarding
            </Button>
            <Button variant="outline" size="sm">
              <Bell data-icon="inline-start" />
              Notifications
            </Button>
          </div>
        }
      />

      {!onboardingComplete && (
        <ComplianceStatusCard
          variant="investor"
          className={investorCardClass('border-primary/20 bg-primary/5')}
        />
      )}

      {/* ── Row 1: Hero KPIs ── */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Portfolio Value — hero card */}
        <Card className={investorCardClass('sm:col-span-2 lg:col-span-1')}>
          <CardContent className={cn('flex flex-col gap-1.5 pt-4', investorDensity.cardContent)}>
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Portfolio Value
            </span>
            <p className="text-3xl font-bold tracking-tight tabular-nums">
              <CurrencyDisplay amount={portfolioData.totalValue} />
            </p>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="inline-flex items-center gap-0.5 rounded-full bg-chart-1/10 px-1.5 py-0.5 font-medium text-chart-1">
                <ArrowUpRight className="size-3" />
                +{gainPercent}%
              </span>
              <span className="text-muted-foreground">from distributions</span>
            </div>
          </CardContent>
        </Card>

        <Card className={investorCardClass()}>
          <CardContent className={cn('flex flex-col gap-1.5 pt-4', investorDensity.cardContent)}>
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Capital Deployed
            </span>
            <p className="text-2xl font-semibold tracking-tight tabular-nums">
              <CurrencyDisplay amount={portfolioData.totalInvested} />
            </p>
            <p className="text-xs text-muted-foreground">
              Across {portfolioData.activeDeals} active deals
            </p>
          </CardContent>
        </Card>

        <Card className={investorCardClass()}>
          <CardContent className={cn('flex flex-col gap-1.5 pt-4', investorDensity.cardContent)}>
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Token Holdings
            </span>
            <p className="text-2xl font-semibold tracking-tight tabular-nums">
              {portfolioData.totalTokens.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">
              Units across {portfolioData.activeDeals} shows
            </p>
          </CardContent>
        </Card>

        <Card className={investorCardClass()}>
          <CardContent className={cn('flex flex-col gap-1.5 pt-4', investorDensity.cardContent)}>
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Total Distributions
            </span>
            <p className="text-2xl font-semibold tracking-tight tabular-nums text-chart-1">
              +<CurrencyDisplay amount={portfolioData.totalDistributions} />
            </p>
            <p className="text-xs text-muted-foreground">Lifetime received</p>
          </CardContent>
        </Card>
      </div>

      {/* ── Row 2: Holdings + Upcoming ── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
        {/* Holdings — takes 2/3 */}
        <Card className={investorCardClass('lg:col-span-2')}>
          <CardHeader
            className={cn(
              'flex flex-row flex-wrap items-center justify-between gap-3 border-b border-border',
              investorDensity.cardHeader,
            )}
          >
            <div className="flex flex-col gap-0.5">
              <CardTitle className="text-base font-semibold">Holdings</CardTitle>
              <CardDescription>Revenue participation by show</CardDescription>
            </div>
            <Link href="/investor/deals">
              <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                All Deals <ArrowRight className="size-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col divide-y divide-border/50">
              {holdings.map((h) => (
                <div key={h.id} className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-muted/30">
                  {/* Status dot + Deal info */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={cn('size-2 shrink-0 rounded-full', h.statusColor)} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold truncate">{h.deal}</p>
                        <Badge variant="outline" className="font-mono text-[10px] shrink-0">
                          {h.tokenSymbol}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground capitalize">
                        {h.productionStatus.replace('_', ' ')} &middot; {h.ownershipPercent}% ownership
                      </p>
                    </div>
                  </div>

                  {/* Token count */}
                  <div className="hidden text-right sm:block">
                    <p className="text-sm font-semibold tabular-nums">{h.tokens.toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground">tokens</p>
                  </div>

                  {/* Invested */}
                  <div className="text-right">
                    <p className="text-sm font-semibold tabular-nums">
                      <CurrencyDisplay amount={h.investedAmount} />
                    </p>
                    <p className="text-[10px] text-muted-foreground">invested</p>
                  </div>

                  {/* Distributions */}
                  <div className="text-right">
                    <p className="text-sm font-semibold tabular-nums text-chart-1">
                      +<CurrencyDisplay amount={h.distributionsReceived} />
                    </p>
                    <p className="text-[10px] text-muted-foreground">earned</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming — takes 1/3 */}
        <Card className={investorCardClass()}>
          <CardHeader className={cn('border-b border-border', investorDensity.cardHeader)}>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Calendar className="size-4 text-muted-foreground" />
              Upcoming
            </CardTitle>
          </CardHeader>
          <CardContent className={cn('pt-3', investorDensity.cardContent)}>
            <div className="flex flex-col gap-3">
              {upcomingEvents.map((event) => {
                const style = eventTypeStyles[event.type];
                return (
                  <div key={event.id} className="flex items-start gap-3 rounded-lg border border-border/50 p-3 transition-colors hover:bg-muted/20">
                    <div className={cn('mt-0.5 size-2 shrink-0 rounded-full', style.dot)} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-snug">{event.title}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">
                          <DateDisplay date={event.date} />
                        </p>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                          {event.daysAway}d
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Row 3: Deal Progress + Distributions (equal halves) ── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
        {/* Deal Progress */}
        <Card className={investorCardClass()}>
          <CardHeader className={cn('border-b border-border', investorDensity.cardHeader)}>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <CardTitle className="text-base font-semibold">Deal Progress</CardTitle>
                <CardDescription>Production milestones &amp; updates</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className={cn('pt-3', investorDensity.cardContent)}>
            <div className="flex flex-col gap-4">
              {dealProgressCards.map((deal) => (
                <div key={deal.id} className="rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                        <Film className="size-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{deal.deal}</p>
                        <p className="text-[11px] text-muted-foreground capitalize">
                          {deal.status.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-bold tabular-nums text-primary">{deal.progress}%</span>
                  </div>
                  <Progress value={deal.progress} className="h-1.5 mb-3" />
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">{deal.lastUpdate}</p>
                      <p className="mt-1 text-[11px] text-muted-foreground flex items-center gap-1">
                        <CircleDot className="size-3 shrink-0 text-chart-2" />
                        Next: {deal.nextMilestone}
                      </p>
                    </div>
                    <p className="shrink-0 text-[10px] text-muted-foreground">
                      <DateDisplay date={deal.updateDate} />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Distribution History */}
        <Card className={investorCardClass()}>
          <CardHeader className={cn('border-b border-border', investorDensity.cardHeader)}>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <CardTitle className="text-base font-semibold">Recent Distributions</CardTitle>
                <CardDescription>Payouts to your wallet</CardDescription>
              </div>
              <Link href="/investor/distributions">
                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                  View All <ArrowRight className="size-3" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className={cn('pt-3', investorDensity.cardContent)}>
            <div className="flex flex-col gap-2">
              {distributionHistory.map((dist) => (
                <div
                  key={dist.id}
                  className="flex items-center gap-3 rounded-lg border border-border/50 px-3 py-2.5 transition-colors hover:bg-muted/20"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-chart-1/10">
                    <ArrowDownRight className="size-4 text-chart-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{dist.deal}</p>
                    <p className="text-xs text-muted-foreground">
                      {dist.type} &middot; <DateDisplay date={dist.date} />
                    </p>
                  </div>
                  <p className="text-sm font-bold tabular-nums text-chart-1 shrink-0">
                    +<CurrencyDisplay amount={dist.amount} />
                  </p>
                </div>
              ))}
            </div>

            {/* Cumulative summary */}
            <div className="mt-4 flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2.5">
              <span className="text-xs font-medium text-muted-foreground">Lifetime Total</span>
              <span className="text-sm font-bold tabular-nums">
                <CurrencyDisplay amount={portfolioData.totalDistributions} />
              </span>
            </div>
          </CardContent>
        </Card>
      </div>



      {/* ── Onboarding Review Modal ── */}
      <Modal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        title="Onboarding Status"
        subtitle="Review your completed onboarding steps and submitted information"
        size="lg"
      >
        <OnboardingReviewContent />
      </Modal>
    </div>
  );
}

/* ── Onboarding Modal Content ── */

const mockKYCData = {
  legal_name: 'John Investor',
  date_of_birth: '1985-06-15',
  address: '123 Park Avenue',
  city: 'New York',
  state: 'NY',
  zip: '10001',
  country: 'United States',
  submitted_at: '2026-02-10',
};

const mockQuestionnaireData = {
  accreditation_status: 'Accredited Investor',
  investment_experience: 'Advanced (5+ years)',
  risk_tolerance: 'High (Growth priority)',
  annual_income: '$500,000+',
  understand_risks: true,
  submitted_at: '2026-02-12',
};

const mockDocumentData = {
  signature_name: 'John Investor',
  signature_date: '2026-02-15',
  agree_to_terms: true,
  document_name: 'Subscription Agreement',
};

const mockFundingData = {
  amount: 50000,
  payment_method: 'Wire Transfer',
  confirmed_at: '2026-02-18',
  units: 5000,
};

const mockTokenData = {
  symbol: 'MHT',
  name: 'Midnight Heist Token',
  amount: 5000,
  network: 'Solana',
  wallet: '9B5X7kKQz1j4mL2pN8r5sT6vX9y2w4z6B1c3d5f7h9',
  issued_at: '2026-02-20',
};

const STEP_ICONS = [ShieldCheck, ClipboardList, FileSignature, DollarSign, Coins];

function OnboardingReviewContent() {
  const completedSteps = ONBOARDING_STEPS.length;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between rounded-lg border border-chart-1/20 bg-chart-1/5 p-4">
        <div className="flex items-center gap-3">
          <CheckCircle className="size-6 text-chart-1 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-foreground">Onboarding Complete</p>
            <p className="text-xs text-muted-foreground">
              All {completedSteps} steps completed successfully
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Progress value={100} className="h-2 w-24" />
          <span className="text-sm font-bold tabular-nums">100%</span>
        </div>
      </div>

      <Tabs defaultValue="kyc" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          {ONBOARDING_STEPS.slice(1).map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <TabsTrigger key={step.key} value={step.key} className="gap-1.5 text-xs">
                <Icon className="size-3.5 shrink-0 hidden sm:block" />
                <span className="truncate">{step.label.split(' ')[0]}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="kyc" className="mt-4">
          <Card className="border-border shadow-none">
            <CardHeader className="pb-3 pt-4 px-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <ShieldCheck className="size-4" />
                  KYC Verification
                </CardTitle>
                <Badge variant="default">Verified</Badge>
              </div>
              <CardDescription>Submitted on <DateDisplay date={mockKYCData.submitted_at} /></CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FieldDisplay icon={<User className="size-4" />} label="Legal Name" value={mockKYCData.legal_name} />
                <FieldDisplay icon={<Calendar className="size-4" />} label="Date of Birth" value={mockKYCData.date_of_birth} />
                <FieldDisplay icon={<MapPin className="size-4" />} label="Address" value={mockKYCData.address} className="sm:col-span-2" />
                <FieldDisplay icon={<Building className="size-4" />} label="City" value={mockKYCData.city} />
                <div className="grid grid-cols-2 gap-4">
                  <FieldDisplay label="State" value={mockKYCData.state} />
                  <FieldDisplay label="ZIP" value={mockKYCData.zip} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questionnaire" className="mt-4">
          <Card className="border-border shadow-none">
            <CardHeader className="pb-3 pt-4 px-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <ClipboardList className="size-4" />
                  Investor Questionnaire
                </CardTitle>
                <Badge variant="default">Complete</Badge>
              </div>
              <CardDescription>Submitted on <DateDisplay date={mockQuestionnaireData.submitted_at} /></CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FieldDisplay icon={<User className="size-4" />} label="Accreditation Status" value={mockQuestionnaireData.accreditation_status} className="sm:col-span-2" />
                <FieldDisplay icon={<Briefcase className="size-4" />} label="Investment Experience" value={mockQuestionnaireData.investment_experience} />
                <FieldDisplay icon={<TrendingUp className="size-4" />} label="Risk Tolerance" value={mockQuestionnaireData.risk_tolerance} />
                <FieldDisplay icon={<DollarSign className="size-4" />} label="Annual Income" value={mockQuestionnaireData.annual_income} className="sm:col-span-2" />
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-muted/30 px-3 py-2">
                <CheckCircle className="size-4 text-chart-1 shrink-0" />
                <span className="text-xs text-muted-foreground">Risk acknowledgment confirmed</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="mt-4">
          <Card className="border-border shadow-none">
            <CardHeader className="pb-3 pt-4 px-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <FileSignature className="size-4" />
                  Document Signing
                </CardTitle>
                <Badge variant="default">Signed</Badge>
              </div>
              <CardDescription>Signed on <DateDisplay date={mockDocumentData.signature_date} /></CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="rounded-lg border border-border bg-muted/30 p-4 mb-4">
                <div className="flex items-center gap-3">
                  <FileText className="size-5 text-muted-foreground shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{mockDocumentData.document_name}</p>
                    <p className="text-xs text-muted-foreground">Electronically signed by {mockDocumentData.signature_name}</p>
                  </div>
                  <Badge variant="default" className="text-[10px]">Signed</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FieldDisplay label="Signatory" value={mockDocumentData.signature_name} />
                <FieldDisplay label="Date Signed" value={mockDocumentData.signature_date} />
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-muted/30 px-3 py-2">
                <CheckCircle className="size-4 text-chart-1 shrink-0" />
                <span className="text-xs text-muted-foreground">All terms and conditions accepted</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funding" className="mt-4">
          <Card className="border-border shadow-none">
            <CardHeader className="pb-3 pt-4 px-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <DollarSign className="size-4" />
                  Funding Confirmation
                </CardTitle>
                <Badge variant="default">Confirmed</Badge>
              </div>
              <CardDescription>Confirmed on <DateDisplay date={mockFundingData.confirmed_at} /></CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Investment Amount</span>
                  <span className="text-xl font-bold tabular-nums">${mockFundingData.amount.toLocaleString()}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Units received at $10/unit</span>
                  <Badge variant="secondary">{mockFundingData.units.toLocaleString()} units</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FieldDisplay label="Payment Method" value={mockFundingData.payment_method} />
                <FieldDisplay label="Confirmation Date" value={mockFundingData.confirmed_at} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="token_issuance" className="mt-4">
          <Card className="border-border shadow-none">
            <CardHeader className="pb-3 pt-4 px-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Coins className="size-4" />
                  Token Issuance
                </CardTitle>
                <Badge variant="default">Issued</Badge>
              </div>
              <CardDescription>Issued on <DateDisplay date={mockTokenData.issued_at} /></CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 mb-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Token</p>
                    <p className="text-sm font-semibold">{mockTokenData.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Symbol</p>
                    <Badge variant="outline" className="font-mono">{mockTokenData.symbol}</Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Units</p>
                    <p className="text-lg font-bold tabular-nums">{mockTokenData.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Network</p>
                    <p className="text-sm font-semibold">{mockTokenData.network}</p>
                  </div>
                </div>
              </div>
              <FieldDisplay icon={<Wallet className="size-4" />} label="Connected Wallet" value={mockTokenData.wallet} mono />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between items-center pt-2 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Need to update your information? Contact your fund administrator.
        </p>
        <Link href="/investor/onboarding">
          <Button variant="outline" size="sm" className="gap-1.5">
            <ArrowRight className="size-3.5" />
            View Full Flow
          </Button>
        </Link>
      </div>
    </div>
  );
}

function FieldDisplay({
  icon,
  label,
  value,
  className,
  mono,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
  className?: string;
  mono?: boolean;
}) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <div className="flex items-center gap-1.5 text-muted-foreground">
        {icon}
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className={cn('text-sm font-medium text-foreground', mono && 'font-mono text-xs break-all')}>
        {value}
      </p>
    </div>
  );
}
