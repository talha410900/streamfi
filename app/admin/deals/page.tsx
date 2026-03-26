'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/shared/modal';
import { CurrencyDisplay } from '@/components/shared/currency-display';
import { DateDisplay } from '@/components/shared/date-display';
import { StatusBadge } from '@/components/shared/status-badge';
import { DealFormEnhanced } from '@/components/admin/deal-form-enhanced';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Plus, Eye, Edit, Archive, TrendingUp, DollarSign, Users } from 'lucide-react';
import { DashboardPageHeader } from '@/components/shared/dashboard-page-header';
import { cn } from '@/lib/utils';
import { adminDensity, adminCardClass } from '@/components/admin/admin-density';

const initialDeals = [
  {
    id: 1,
    title: 'Midnight Heist',
    description: 'An action-packed thriller',
    genre: 'Action',
    status: 'open',
    raise_target: 500000,
    raised: 320000,
    investors: 12,
    valuation: 5000000,
    token_symbol: 'MHT',
    total_units: 50000,
    issued_units: 32000,
    funding_start_date: '2026-02-01',
    funding_end_date: '2026-04-30',
    production_status: 'pre_production',
  },
  {
    id: 2,
    title: 'Last Dance',
    description: 'A compelling drama',
    genre: 'Drama',
    status: 'funded',
    raise_target: 1000000,
    raised: 1000000,
    investors: 18,
    valuation: 8000000,
    token_symbol: 'LD',
    total_units: 20000,
    issued_units: 20000,
    funding_start_date: '2026-01-15',
    funding_end_date: '2026-03-15',
    production_status: 'production',
  },
  {
    id: 3,
    title: 'Mystery Box',
    description: 'A suspenseful thriller',
    genre: 'Thriller',
    status: 'draft',
    raise_target: 750000,
    raised: 0,
    investors: 0,
    valuation: 6000000,
    token_symbol: 'MBX',
    total_units: 75000,
    issued_units: 0,
    funding_start_date: '',
    funding_end_date: '',
    production_status: 'development',
  },
];

export default function AdminDealsPage() {
  const router = useRouter();
  const [deals, setDeals] = useState(initialDeals);
  const [isCreating, setIsCreating] = useState(false);
  const [editingDeal, setEditingDeal] = useState<any>(null);
  const [archivingDeal, setArchivingDeal] = useState<any>(null);

  const handleCreateDeal = (formData: any) => {
    const newDeal = {
      id: deals.length + 1,
      ...formData,
      raised: 0,
      investors: 0,
      issued_units: 0,
    };
    setDeals([...deals, newDeal]);
    setIsCreating(false);
  };

  const handleEditDeal = (updatedDeal: any) => {
    setDeals(deals.map((d) => (d.id === editingDeal.id ? { ...editingDeal, ...updatedDeal } : d)));
    setEditingDeal(null);
  };

  const handleArchiveDeal = () => {
    setDeals(deals.map((d) => (d.id === archivingDeal.id ? { ...d, status: 'archived' } : d)));
    setArchivingDeal(null);
  };

  const totalRaised = deals.reduce((sum, d) => sum + d.raised, 0);
  const totalInvestors = deals.reduce((sum, d) => sum + d.investors, 0);
  const activeDeals = deals.filter(d => d.status === 'open' || d.status === 'funded').length;

  return (
    <div className={adminDensity.page}>
      <DashboardPageHeader
        title="Deals"
        description="Create offerings, track raises, and manage production status."
        actions={
          <Button onClick={() => setIsCreating(true)}>
            <Plus data-icon="inline-start" />
            Create deal
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-4 md:gap-4">
        <Card className={adminCardClass()}>
          <CardContent
            className={cn('flex flex-col gap-2 pt-4', adminDensity.cardContent)}
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="size-4 shrink-0" />
              <span className="text-xs font-medium uppercase tracking-wide">Total raised</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums">
              <CurrencyDisplay amount={totalRaised} />
            </p>
          </CardContent>
        </Card>
        <Card className={adminCardClass()}>
          <CardContent
            className={cn('flex flex-col gap-2 pt-4', adminDensity.cardContent)}
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="size-4 shrink-0" />
              <span className="text-xs font-medium uppercase tracking-wide">Investors</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums">{totalInvestors}</p>
          </CardContent>
        </Card>
        <Card className={adminCardClass()}>
          <CardContent
            className={cn('flex flex-col gap-2 pt-4', adminDensity.cardContent)}
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="size-4 shrink-0" />
              <span className="text-xs font-medium uppercase tracking-wide">Active</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums">{activeDeals}</p>
          </CardContent>
        </Card>
        <Card className={adminCardClass()}>
          <CardContent
            className={cn('flex flex-col gap-2 pt-4', adminDensity.cardContent)}
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="size-4 shrink-0" />
              <span className="text-xs font-medium uppercase tracking-wide">All deals</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums">{deals.length}</p>
          </CardContent>
        </Card>
      </div>

      <Card className={adminCardClass()}>
        <CardHeader className={adminDensity.cardHeader}>
          <CardTitle className="text-base">All Deals</CardTitle>
          <CardDescription>{deals.length} deals in the system</CardDescription>
        </CardHeader>
        <CardContent className={adminDensity.cardContentSection}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  <th className={cn('text-left font-semibold', adminDensity.tableHead)}>
                    Deal
                  </th>
                  <th className={cn('text-left font-semibold', adminDensity.tableHead)}>
                    Token
                  </th>
                  <th className={cn('text-left font-semibold', adminDensity.tableHead)}>
                    Status
                  </th>
                  <th className={cn('text-left font-semibold', adminDensity.tableHead)}>
                    Progress
                  </th>
                  <th className={cn('text-left font-semibold', adminDensity.tableHead)}>
                    Raised
                  </th>
                  <th className={cn('text-left font-semibold', adminDensity.tableHead)}>
                    Investors
                  </th>
                  <th className={cn('text-left font-semibold', adminDensity.tableHead)}>
                    Production
                  </th>
                  <th className={cn('text-left font-semibold', adminDensity.tableHead)}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {deals.map((deal) => {
                  const progress = (deal.raised / deal.raise_target) * 100;
                  return (
                    <tr key={deal.id} className="border-b border-border/50 hover:bg-card">
                      <td className={adminDensity.tableCell}>
                        <div>
                          <p className="font-semibold">{deal.title}</p>
                          <p className="text-xs text-muted-foreground">{deal.genre}</p>
                        </div>
                      </td>
                      <td className={adminDensity.tableCell}>
                        <Badge variant="outline">{deal.token_symbol}</Badge>
                      </td>
                      <td className={adminDensity.tableCell}>
                        <StatusBadge status={deal.status as any} />
                      </td>
                      <td className={adminDensity.tableCell}>
                        <div className="flex items-center gap-2">
                          <Progress value={Math.min(progress, 100)} className="h-1.5 w-20" />
                          <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
                        </div>
                      </td>
                      <td className={adminDensity.tableCell}>
                        <div>
                          <p className="font-medium"><CurrencyDisplay amount={deal.raised} /></p>
                          <p className="text-xs text-muted-foreground">of <CurrencyDisplay amount={deal.raise_target} /></p>
                        </div>
                      </td>
                      <td className={adminDensity.tableCell}>{deal.investors}</td>
                      <td className={adminDensity.tableCell}>
                        <Badge variant="secondary">{deal.production_status.replace('_', ' ')}</Badge>
                      </td>
                      <td className={adminDensity.tableCell}>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" onClick={() => router.push(`/admin/deals/${deal.id}`)}>
                            <Eye className="size-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setEditingDeal(deal)}>
                            <Edit className="size-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setArchivingDeal(deal)}>
                            <Archive className="size-4" />
                          </Button>
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

      {/* Create Modal */}
      <Modal
        isOpen={isCreating}
        onClose={() => setIsCreating(false)}
        title="Create New Deal"
        subtitle="Set up a new investment opportunity"
        size="lg"
      >
        <DealFormEnhanced
          onSubmit={handleCreateDeal}
          onCancel={() => setIsCreating(false)}
        />
      </Modal>

      {/* Edit Modal */}
      {editingDeal && (
        <Modal
          isOpen={!!editingDeal}
          onClose={() => setEditingDeal(null)}
          title="Edit Deal"
          subtitle={editingDeal.title}
          size="lg"
        >
          <DealFormEnhanced
            initialData={editingDeal}
            onSubmit={handleEditDeal}
            onCancel={() => setEditingDeal(null)}
          />
        </Modal>
      )}

      {/* Archive Modal */}
      {archivingDeal && (
        <Modal
          isOpen={!!archivingDeal}
          onClose={() => setArchivingDeal(null)}
          title="Archive Deal"
          subtitle="This will close the deal and prevent further investments"
          size="sm"
        >
          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to archive "{archivingDeal.title}"? This action cannot be undone easily.
            </p>
            <div className="flex gap-3">
              <Button variant="destructive" onClick={handleArchiveDeal}>Archive Deal</Button>
              <Button variant="outline" onClick={() => setArchivingDeal(null)}>Cancel</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}