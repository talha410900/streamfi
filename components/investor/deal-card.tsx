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
      className="group block rounded-lg border border-border bg-card p-4 shadow-none transition-colors hover:border-muted-foreground/25"
    >
      <div className="mb-2 flex items-start justify-between gap-2.5">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold transition-colors group-hover:text-foreground">
            {deal.showName}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">{deal.genre}</p>
        </div>
        <StatusBadge status={deal.dealStatus} />
      </div>

      <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{deal.logline}</p>

      <ProgressBar value={deal.amountRaised} max={deal.raiseTarget} />

      <div className="mt-3 grid grid-cols-3 gap-2 border-t border-border py-2.5 text-center sm:gap-3">
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

      <div className="flex items-center justify-between border-t border-border pt-3 text-xs">
        <span className="text-muted-foreground">{formatUSD(deal.pricePerUnit)} / unit</span>
        <span className="flex items-center gap-1 font-medium text-muted-foreground transition-all group-hover:gap-2 group-hover:text-foreground">
          View deal <ArrowRight className="size-3" />
        </span>
      </div>
    </Link>
  );
}