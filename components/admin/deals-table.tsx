'use client';

import { CurrencyDisplay } from '@/components/shared/currency-display';
import { StatusBadge } from '@/components/shared/status-badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Edit2, Trash2 } from 'lucide-react';

interface Deal {
  id: number;
  title: string;
  status: string;
  genre?: string;
  raise_target: number;
  raised: number;
  investors: number;
  valuation?: number;
}

interface DealsTableProps {
  deals: Deal[];
  onEdit?: (deal: Deal) => void;
  onDelete?: (id: number) => void;
}

export function DealsTable({ deals, onEdit, onDelete }: DealsTableProps) {
  return (
    <Card className="border border-border/50">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="text-lg font-semibold">All Deals</CardTitle>
        <CardDescription>Manage investment opportunities</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="table-minimal w-full">
            <thead>
              <tr className="bg-muted/30">
                <th className="py-4 px-6">Deal</th>
                <th className="py-4 px-6">Genre</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Target</th>
                <th className="py-4 px-6">Raised</th>
                <th className="py-4 px-6">Progress</th>
                <th className="py-4 px-6">Investors</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {deals.map((deal) => {
                const progress = (deal.raised / deal.raise_target) * 100;
                return (
                  <tr key={deal.id} className="hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-6 font-semibold text-foreground">{deal.title}</td>
                    <td className="py-4 px-6 text-muted-foreground text-sm">{deal.genre || '-'}</td>
                    <td className="py-4 px-6">
                      <StatusBadge status={deal.status as any} />
                    </td>
                    <td className="py-4 px-6 text-foreground font-medium">
                      <CurrencyDisplay amount={deal.raise_target} />
                    </td>
                    <td className="py-4 px-6 text-foreground font-medium">
                      <CurrencyDisplay amount={deal.raised} />
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground min-w-max">
                          {Math.round(progress)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-foreground text-sm">{deal.investors}</td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => onEdit?.(deal)}
                          aria-label="Edit deal"
                          className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        >
                          <Edit2 className="size-4" />
                        </button>
                        <button
                          onClick={() => onDelete?.(deal.id)}
                          aria-label="Delete deal"
                          className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
