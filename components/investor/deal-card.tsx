'use client';

import Link from 'next/link';
import { type Deal, formatUSD } from '@/lib/mock-data';
import { StatusBadge } from '@/components/shared/status-badge';
import { ProgressBar } from '@/components/shared/progress-bar';
import { Film, Users, Coins, ArrowRight } from 'lucide-react';

export function DealCard({ deal }: { deal: Deal }) {
  return (
    <Link
      href={`/investor/deals/${deal.id}`}
      className="group block rounded-lg border border-border/50 bg-card p-5 transition-all hover:border-primary/30"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-lg truncate group-hover:text-primary transition-colors">
            {deal.showName}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">{deal.genre}</p>
        </div>
        <StatusBadge status={deal.dealStatus} />
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{deal.logline}</p>

      <ProgressBar value={deal.amountRaised} max={deal.raiseTarget} />

      <div className="grid grid-cols-3 gap-3 text-center mt-4 py-3 border-t border-border/50">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <Film className="size-3" /> Target
          </div>
          <p className="text-sm font-semibold">{formatUSD(deal.raiseTarget)}</p>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <Coins className="size-3" /> Rev Share
          </div>
          <p className="text-sm font-semibold">{deal.revenueSharePercent}%</p>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <Users className="size-3" /> Investors
          </div>
          <p className="text-sm font-semibold">{deal.investorCount}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs pt-3 border-t border-border/50">
        <span className="text-muted-foreground">{formatUSD(deal.pricePerUnit)} / unit</span>
        <span className="text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
          View Deal <ArrowRight className="size-3" />
        </span>
      </div>
    </Link>
  );
}