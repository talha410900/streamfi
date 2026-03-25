'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DollarSign } from 'lucide-react';

interface TokenIssuanceModalProps {
  dealId: number;
  dealTitle: string;
  totalTokens: number;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

export function TokenIssuanceModal({
  dealId,
  dealTitle,
  totalTokens,
  onSubmit,
  onClose,
}: TokenIssuanceModalProps) {
  const [formData, setFormData] = useState({
    investor_id: '',
    tokens: 0,
    per_unit_price: 10,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.investor_id || formData.tokens === 0) {
      alert('Please fill in all fields');
      return;
    }
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('[v0] Token issuance:', formData);
    setIsLoading(false);
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md border border-border/50">
        <CardHeader>
          <CardTitle>Issue Tokens</CardTitle>
          <CardDescription>{dealTitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <FieldGroup>
              <FieldLabel>Investor ID</FieldLabel>
              <Input
                value={formData.investor_id}
                onChange={(e) => setFormData({ ...formData, investor_id: e.target.value })}
                placeholder="investor-123"
                disabled={isLoading}
              />
            </FieldGroup>

            <FieldGroup>
              <FieldLabel>Number of Tokens</FieldLabel>
              <Input
                type="number"
                value={formData.tokens}
                onChange={(e) => setFormData({ ...formData, tokens: parseInt(e.target.value) || 0 })}
                placeholder="1000"
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">Total available: {totalTokens.toLocaleString()}</p>
            </FieldGroup>

            <FieldGroup>
              <FieldLabel>Per Unit Price</FieldLabel>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground">$</span>
                <Input
                  type="number"
                  value={formData.per_unit_price}
                  onChange={(e) => setFormData({ ...formData, per_unit_price: parseFloat(e.target.value) })}
                  placeholder="10"
                  disabled={isLoading}
                  className="pl-8"
                />
              </div>
            </FieldGroup>

            <div className="bg-card p-4 rounded-lg border border-border/50">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Value</span>
                <span className="text-lg font-semibold flex items-center gap-1">
                  <DollarSign className="size-4 text-muted-foreground" />
                  {(formData.tokens * formData.per_unit_price).toLocaleString()}
                </span>
              </div>
            </div>

            <Separator />

            <div className="flex gap-3">
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Issue Tokens'}
              </Button>
              <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
