'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TokenIssuanceModal } from '@/components/admin/token-issuance-modal';
import { CurrencyDisplay } from '@/components/shared/currency-display';
import { Plus, Coins } from 'lucide-react';
import { DashboardPageHeader } from '@/components/shared/dashboard-page-header';
import { cn } from '@/lib/utils';
import { adminDensity, adminCardClass } from '@/components/admin/admin-density';

export default function AdminTokensPage() {
  const [deals] = useState([
    {
      id: 1,
      title: 'Midnight Heist',
      total_tokens: 50000,
      issued_tokens: 25000,
      unit_price: 10,
    },
    {
      id: 2,
      title: 'Last Dance',
      total_tokens: 20000,
      issued_tokens: 20000,
      unit_price: 50,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(deals[0]);

  const handleIssueTokens = (data: any) => {
    console.log('[v0] Tokens issued:', data);
    setShowModal(false);
  };

  const handleOpenModal = (deal: any) => {
    setSelectedDeal(deal);
    setShowModal(true);
  };

  const totalIssued = deals.reduce((sum, d) => sum + d.issued_tokens, 0);
  const totalSupply = deals.reduce((sum, d) => sum + d.total_tokens, 0);

  return (
    <div className={adminDensity.page}>
      <DashboardPageHeader
        title="Tokens"
        description="Supply, issuance, and linkage to funded subscriptions."
      />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
        <Card className={adminCardClass()}>
          <CardHeader className={cn('flex flex-row items-center justify-between pb-2', adminDensity.cardHeader)}>
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Supply</CardTitle>
            <Coins className="size-4 text-primary" />
          </CardHeader>
          <CardContent className={adminDensity.cardContent}>
            <p className="text-2xl font-bold tracking-tight">{totalSupply.toLocaleString()}</p>
            <p className="mt-1 text-xs text-muted-foreground">tokens across all deals</p>
          </CardContent>
        </Card>
        <Card className={adminCardClass()}>
          <CardHeader className={cn('flex flex-row items-center justify-between pb-2', adminDensity.cardHeader)}>
            <CardTitle className="text-sm font-medium text-muted-foreground">Issued Tokens</CardTitle>
            <Coins className="size-4 text-primary" />
          </CardHeader>
          <CardContent className={adminDensity.cardContent}>
            <p className="text-2xl font-bold tracking-tight">{totalIssued.toLocaleString()}</p>
            <p className="mt-1 text-xs text-muted-foreground">tokens distributed</p>
          </CardContent>
        </Card>
        <Card className={adminCardClass()}>
          <CardHeader className={cn('flex flex-row items-center justify-between pb-2', adminDensity.cardHeader)}>
            <CardTitle className="text-sm font-medium text-muted-foreground">Available</CardTitle>
            <Coins className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className={adminDensity.cardContent}>
            <p className="text-2xl font-bold tracking-tight">
              {(totalSupply - totalIssued).toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">tokens remaining</p>
          </CardContent>
        </Card>
      </div>

      <Card className={adminCardClass()}>
        <CardHeader className={adminDensity.cardHeader}>
          <CardTitle>Token Issuance Tracker</CardTitle>
          <CardDescription>Manage token distribution per deal</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Deal</th>
                  <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Unit Price</th>
                  <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Total Tokens</th>
                  <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Issued</th>
                  <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Remaining</th>
                  <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Progress</th>
                  <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {deals.map((deal) => {
                  const remaining = deal.total_tokens - deal.issued_tokens;
                  const progress = (deal.issued_tokens / deal.total_tokens) * 100;
                  return (
                    <tr key={deal.id} className="border-b border-border/50 transition-colors hover:bg-card">
                      <td className={cn('font-semibold', adminDensity.tableCell)}>{deal.title}</td>
                      <td className={adminDensity.tableCell}>
                        <CurrencyDisplay amount={deal.unit_price} />
                      </td>
                      <td className={adminDensity.tableCell}>{deal.total_tokens.toLocaleString()}</td>
                      <td className={cn('font-semibold', adminDensity.tableCell)}>
                        {deal.issued_tokens.toLocaleString()}
                      </td>
                      <td className={cn('text-muted-foreground', adminDensity.tableCell)}>
                        {remaining.toLocaleString()}
                      </td>
                      <td className={adminDensity.tableCell}>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-20 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-2 rounded-full bg-primary transition-all"
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                          </div>
                          <span className="min-w-max text-xs font-medium text-muted-foreground">
                            {Math.round(progress)}%
                          </span>
                        </div>
                      </td>
                      <td className={adminDensity.tableCell}>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenModal(deal)}
                          disabled={remaining === 0}
                        >
                          <Plus className="mr-1 size-3" />
                          Issue
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {showModal && (
        <TokenIssuanceModal
          dealId={selectedDeal.id}
          dealTitle={selectedDeal.title}
          totalTokens={selectedDeal.total_tokens - selectedDeal.issued_tokens}
          onSubmit={handleIssueTokens}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
