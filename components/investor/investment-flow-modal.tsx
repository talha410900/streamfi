'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import { CurrencyDisplay } from '@/components/shared/currency-display';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

interface InvestmentFlowModalProps {
  dealId: number;
  dealTitle: string;
  minInvestment: number;
  unitPrice: number;
  onSubmit: (amount: number) => void;
  onClose: () => void;
}

export function InvestmentFlowModal({
  dealId,
  dealTitle,
  minInvestment,
  unitPrice,
  onSubmit,
  onClose,
}: InvestmentFlowModalProps) {
  const [investmentAmount, setInvestmentAmount] = useState(minInvestment);
  const [isLoading, setIsLoading] = useState(false);

  const units = Math.floor(investmentAmount / unitPrice);
  const totalCost = units * unitPrice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (investmentAmount < minInvestment) {
      alert(`Minimum investment is ${minInvestment}`);
      return;
    }
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('[v0] Investment submitted:', { dealId, amount: investmentAmount, units });
    setIsLoading(false);
    onSubmit(investmentAmount);
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{dealTitle}</DialogTitle>
          <DialogDescription>Investment Details</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-6 py-4">
          <FieldGroup>
            <FieldLabel>Investment Amount</FieldLabel>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground">$</span>
              <Input
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(Math.max(minInvestment, parseFloat(e.target.value) || 0))}
                placeholder="0"
                disabled={isLoading}
                className="pl-8"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Minimum: <CurrencyDisplay amount={minInvestment} />
            </p>
          </FieldGroup>

          <div className="bg-card rounded-xl p-4 flex flex-col gap-3 text-sm border border-border">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Unit Price:</span>
              <span className="font-semibold">
                <CurrencyDisplay amount={unitPrice} />
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Units:</span>
              <span className="font-semibold">{units.toLocaleString()}</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between font-semibold">
              <span>Total:</span>
              <span>
                <CurrencyDisplay amount={totalCost} />
              </span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            After confirming, we'll provide wire instructions for your investment.
          </p>
        </form>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Continue to Payment'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
