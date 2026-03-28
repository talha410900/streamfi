'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { DollarSign, CreditCard, Building2, ArrowRight } from 'lucide-react';

interface FundingConfirmationFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

const PAYMENT_METHODS = [
  { value: 'wire_transfer', label: 'Wire Transfer', icon: Building2 },
  { value: 'ach', label: 'ACH Transfer', icon: CreditCard },
];

export function FundingConfirmationForm({ onSubmit, isLoading }: FundingConfirmationFormProps) {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !paymentMethod) {
      alert('Please fill in all required fields');
      return;
    }
    onSubmit({ amount: parseFloat(amount), paymentMethod, confirmed });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="size-5" />
            Funding Confirmation
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <FieldGroup>
            <FieldLabel>Investment Amount</FieldLabel>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="50,000"
                className="pl-9 text-lg"
                min={10000}
                disabled={isLoading}
              />
            </div>
            <p className="text-xs text-muted-foreground">Minimum investment: $10,000</p>
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>Payment Method</FieldLabel>
            <Select value={paymentMethod} onValueChange={setPaymentMethod} disabled={isLoading}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                {PAYMENT_METHODS.map((method) => (
                  <SelectItem key={method.value} value={method.value}>
                    {method.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldGroup>

          {paymentMethod === 'wire_transfer' && (
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <p className="mb-2 text-sm font-semibold">Wire Transfer Instructions</p>
              <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Bank</span>
                  <span className="font-medium text-foreground">First National Bank</span>
                </div>
                <div className="flex justify-between">
                  <span>Routing #</span>
                  <span className="font-mono text-foreground">021000021</span>
                </div>
                <div className="flex justify-between">
                  <span>Account #</span>
                  <span className="font-mono text-foreground">****7834</span>
                </div>
                <div className="flex justify-between">
                  <span>Beneficiary</span>
                  <span className="font-medium text-foreground">StreamFi Ventures LLC</span>
                </div>
              </div>
            </div>
          )}

          {amount && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Investment Amount</span>
                <span className="text-lg font-bold">${parseFloat(amount).toLocaleString()}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>Estimated units at $10/unit</span>
                <Badge variant="secondary">{Math.floor(parseFloat(amount) / 10).toLocaleString()} units</Badge>
              </div>
            </div>
          )}

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-1 size-4 rounded border-border"
              disabled={isLoading}
            />
            <span className="text-sm text-muted-foreground">
              I confirm that I have reviewed the investment terms, understand the risks involved,
              and authorize this funding transaction through StreamFi Ventures.
            </span>
          </label>

          <Button type="submit" disabled={isLoading || !confirmed || !amount || !paymentMethod} className="w-full">
            {isLoading ? 'Processing...' : 'Confirm Funding'}
            <ArrowRight data-icon="inline-end" />
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
