'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TokenIssuanceModal } from '@/components/admin/token-issuance-modal';
import { CurrencyDisplay } from '@/components/shared/currency-display';
import { Plus, Coins } from 'lucide-react';

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
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Token Issuance</h1>
        <p className="text-muted-foreground mt-1">Manage token allocation and distribution across deals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Supply</CardTitle>
            <Coins className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tracking-tight">{totalSupply.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">tokens across all deals</p>
          </CardContent>
        </Card>
        <Card className="border border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Issued Tokens</CardTitle>
            <Coins className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tracking-tight">{totalIssued.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">tokens distributed</p>
          </CardContent>
        </Card>
        <Card className="border border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Available</CardTitle>
            <Coins className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tracking-tight">{(totalSupply - totalIssued).toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">tokens remaining</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-border/50">
        <CardHeader>
          <CardTitle>Token Issuance Tracker</CardTitle>
          <CardDescription>Manage token distribution per deal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold">Deal</th>
                  <th className="text-left py-3 px-4 font-semibold">Unit Price</th>
                  <th className="text-left py-3 px-4 font-semibold">Total Tokens</th>
                  <th className="text-left py-3 px-4 font-semibold">Issued</th>
                  <th className="text-left py-3 px-4 font-semibold">Remaining</th>
                  <th className="text-left py-3 px-4 font-semibold">Progress</th>
                  <th className="text-left py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {deals.map((deal) => {
                  const remaining = deal.total_tokens - deal.issued_tokens;
                  const progress = (deal.issued_tokens / deal.total_tokens) * 100;
                  return (
                    <tr key={deal.id} className="border-b border-border/50 hover:bg-card transition-colors">
                      <td className="py-4 px-4 font-semibold">{deal.title}</td>
                      <td className="py-4 px-4">
                        <CurrencyDisplay amount={deal.unit_price} />
                      </td>
                      <td className="py-4 px-4">{deal.total_tokens.toLocaleString()}</td>
                      <td className="py-4 px-4 font-semibold">{deal.issued_tokens.toLocaleString()}</td>
                      <td className="py-4 px-4 text-muted-foreground">{remaining.toLocaleString()}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-muted rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-muted-foreground min-w-max">{Math.round(progress)}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenModal(deal)}
                          disabled={remaining === 0}
                        >
                          <Plus className="size-3 mr-1" />
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
