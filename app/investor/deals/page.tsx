'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CurrencyDisplay } from '@/components/shared/currency-display';
import { StatusBadge } from '@/components/shared/status-badge';
import {
  Search, Target, Percent, Users, ArrowRight, Film,
  TrendingUp, Calendar, FileText, DollarSign
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  investorDensity,
  investorCardClass,
} from '@/components/investor/investor-density';

const allDeals = [
  {
    id: 1,
    title: 'Midnight Heist',
    genre: 'Action',
    status: 'open',
    description: 'An action-packed thriller following a team of elite thieves who discover their latest heist has unintended consequences.',
    raiseTarget: 500000,
    raised: 320000,
    investors: 12,
    valuation: 5000000,
    revenueShare: 15,
    unitPrice: 10,
    minInvestment: 10000,
    fundingStartDate: '2026-02-01',
    fundingEndDate: '2026-04-30',
    productionStatus: 'pre_production',
    documents: [
      { name: 'Investment Memorandum', size: '2.4 MB' },
      { name: 'Financial Projections', size: '1.1 MB' },
    ],
  },
  {
    id: 2,
    title: 'Neon Horizons',
    genre: 'Sci-Fi',
    status: 'open',
    description: 'A sci-fi thriller following a rogue AI developer who discovers her creation has evolved beyond her control.',
    raiseTarget: 3000000,
    raised: 2340000,
    investors: 47,
    valuation: 12000000,
    revenueShare: 20,
    unitPrice: 100,
    minInvestment: 25000,
    fundingStartDate: '2026-01-15',
    fundingEndDate: '2026-05-30',
    productionStatus: 'development',
    documents: [
      { name: 'Investment Memorandum', size: '3.2 MB' },
      { name: 'Script Excerpt', size: '856 KB' },
    ],
  },
  {
    id: 3,
    title: 'Last Dance',
    genre: 'Drama',
    status: 'funded',
    description: 'An intimate drama exploring the final years of a legendary ballet company and its dancers.',
    raiseTarget: 1000000,
    raised: 1000000,
    investors: 18,
    valuation: 8000000,
    revenueShare: 12,
    unitPrice: 50,
    minInvestment: 25000,
    fundingStartDate: '2025-10-01',
    fundingEndDate: '2026-03-15',
    productionStatus: 'production',
    documents: [
      { name: 'Investment Memorandum', size: '2.8 MB' },
      { name: 'Director\'s Vision', size: '1.5 MB' },
    ],
  },
  {
    id: 4,
    title: 'Crimson Table',
    genre: 'Reality',
    status: 'open',
    description: 'A culinary competition series where top chefs battle using mystery ingredients from around the world.',
    raiseTarget: 1500000,
    raised: 675000,
    investors: 22,
    valuation: 6000000,
    revenueShare: 30,
    unitPrice: 100,
    minInvestment: 10000,
    fundingStartDate: '2026-02-15',
    fundingEndDate: '2026-05-15',
    productionStatus: 'development',
    documents: [
      { name: 'Investment Memorandum', size: '2.1 MB' },
      { name: 'Format Overview', size: '456 KB' },
    ],
  },
];

const productionStatusLabels: Record<string, string> = {
  development: 'Development',
  pre_production: 'Pre-Production',
  production: 'In Production',
  post_production: 'Post-Production',
  completed: 'Completed',
  released: 'Released',
};

export default function InvestorDealsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredDeals = allDeals.filter(deal => {
    const matchesSearch = deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.genre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || deal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openDeals = allDeals.filter(d => d.status === 'open');

  return (
    <div className={investorDensity.pageTight}>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Deal marketplace</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Open show offerings — valuation, raise target, and revenue share in one view.
        </p>
      </div>

      {/* Featured Stats */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
        <Card className={investorCardClass()}>
          <CardContent
            className={cn('flex flex-col gap-2 pt-4', investorDensity.cardContent)}
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="size-4 shrink-0" />
              <span className="text-xs font-medium uppercase tracking-wide">Open deals</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums">{openDeals.length}</p>
            <p className="text-xs text-muted-foreground">Available to subscribe</p>
          </CardContent>
        </Card>
        <Card className={investorCardClass()}>
          <CardContent
            className={cn('flex flex-col gap-2 pt-4', investorDensity.cardContent)}
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="size-4 shrink-0" />
              <span className="text-xs font-medium uppercase tracking-wide">Capital seeking</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums">
              <CurrencyDisplay amount={openDeals.reduce((sum, d) => sum + d.raiseTarget, 0)} compact />
            </p>
          </CardContent>
        </Card>
        <Card className={investorCardClass()}>
          <CardContent
            className={cn('flex flex-col gap-2 pt-4', investorDensity.cardContent)}
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="size-4 shrink-0" />
              <span className="text-xs font-medium uppercase tracking-wide">Investor seats</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums">
              {allDeals.reduce((sum, d) => sum + d.investors, 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className={investorCardClass()}>
        <CardContent className={cn('py-3', investorDensity.cardContent)}>
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search deals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Deals</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="funded">Funded</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="progress">Most Funded</SelectItem>
                <SelectItem value="target">Highest Target</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
        {filteredDeals.map((deal) => {
          const progress = (deal.raised / deal.raiseTarget) * 100;
          const isOpen = deal.status === 'open';
          const daysLeft = Math.ceil((new Date(deal.fundingEndDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

          return (
            <Link key={deal.id} href={`/investor/deals/${deal.id}`}>
              <Card
                className={cn(
                  investorCardClass(),
                  'h-full cursor-pointer transition-colors hover:border-muted-foreground/30',
                )}
              >
                <CardHeader className={cn('pb-2', investorDensity.cardHeader)}>
                  <div className="flex items-start justify-between gap-2.5">
                    <div>
                      <CardTitle className="text-lg">{deal.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{deal.genre}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {productionStatusLabels[deal.productionStatus]}
                        </span>
                      </div>
                    </div>
                    <StatusBadge status={deal.status} />
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                    {deal.description}
                  </p>
                </CardHeader>

                <CardContent
                  className={cn('flex flex-col gap-3', investorDensity.cardContent)}
                >
                  {/* Progress */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{Math.round(progress)}% funded</span>
                      <span className="text-xs text-muted-foreground">
                        <CurrencyDisplay amount={deal.raised} /> of <CurrencyDisplay amount={deal.raiseTarget} />
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-2 text-sm sm:gap-3">
                    <div className="rounded-lg bg-muted/50 p-1.5 text-center sm:p-2">
                      <p className="text-xs text-muted-foreground">Valuation</p>
                      <p className="font-semibold"><CurrencyDisplay amount={deal.valuation} compact /></p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-1.5 text-center sm:p-2">
                      <p className="text-xs text-muted-foreground">Rev Share</p>
                      <p className="font-semibold">{deal.revenueShare}%</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-1.5 text-center sm:p-2">
                      <p className="text-xs text-muted-foreground">Investors</p>
                      <p className="font-semibold">{deal.investors}</p>
                    </div>
                  </div>

                  {/* Investment Info */}
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Min Investment</p>
                      <p className="font-semibold"><CurrencyDisplay amount={deal.minInvestment} /></p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Unit Price</p>
                      <p className="font-semibold"><CurrencyDisplay amount={deal.unitPrice} /></p>
                    </div>
                    {isOpen && daysLeft > 0 && (
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Days Left</p>
                        <p className="font-semibold">{daysLeft}</p>
                      </div>
                    )}
                  </div>

                  {/* Documents Preview */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <FileText className="size-3" />
                    <span>{deal.documents.length} documents available</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {filteredDeals.length === 0 && (
        <Card className={investorCardClass()}>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">No deals found matching your criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}