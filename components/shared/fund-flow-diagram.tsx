'use client';

import { ArrowRight, Building2, Coins, Users } from 'lucide-react';

interface FundFlowDiagramProps {
  direction: 'investment' | 'revenue';
  amount?: number;
}

export function FundFlowDiagram({ direction, amount }: FundFlowDiagramProps) {
  const nodes =
    direction === 'investment'
      ? [
          { label: 'Investor', sublabel: 'You', icon: Users, color: 'bg-chart-2/10 text-chart-2' },
          { label: 'StreamFi', sublabel: 'Escrow', icon: Building2, color: 'bg-primary/10 text-primary' },
          { label: 'Lookhu', sublabel: 'Production', icon: Coins, color: 'bg-chart-3/10 text-chart-3' },
        ]
      : [
          { label: 'Lookhu', sublabel: 'Revenue', icon: Coins, color: 'bg-chart-3/10 text-chart-3' },
          { label: 'StreamFi', sublabel: 'Fee Deduction', icon: Building2, color: 'bg-primary/10 text-primary' },
          { label: 'Investor', sublabel: 'Distribution', icon: Users, color: 'bg-chart-2/10 text-chart-2' },
        ];

  return (
    <div className="flex items-center justify-between gap-1 rounded-lg border border-border bg-card p-4">
      {nodes.map((node, idx) => {
        const Icon = node.icon;
        return (
          <div key={node.label + idx} className="flex items-center gap-1">
            <div className="flex flex-col items-center gap-1.5">
              <div className={`flex size-10 items-center justify-center rounded-full ${node.color}`}>
                <Icon className="size-4" />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold">{node.label}</p>
                <p className="text-[10px] text-muted-foreground">{node.sublabel}</p>
              </div>
            </div>
            {idx < nodes.length - 1 && (
              <div className="mx-2 flex flex-col items-center">
                <ArrowRight className="size-4 text-muted-foreground" />
                {amount && idx === 0 && (
                  <p className="mt-0.5 text-[10px] font-medium tabular-nums text-muted-foreground">
                    ${amount.toLocaleString()}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
