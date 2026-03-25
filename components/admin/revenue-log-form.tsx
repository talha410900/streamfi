'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface RevenueLogFormProps {
  deals: Array<{ id: number; title: string }>;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export function RevenueLogForm({ deals, onSubmit, isLoading = false }: RevenueLogFormProps) {
  const [formData, setFormData] = useState({
    deal_id: deals[0]?.id.toString() || '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.deal_id || formData.amount === 0) {
      alert('Please fill in all required fields');
      return;
    }
    onSubmit({
      deal_id: parseInt(formData.deal_id),
      amount: formData.amount,
      date: formData.date,
      description: formData.description,
    });
    setFormData({
      deal_id: deals[0]?.id.toString() || '',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      description: '',
    });
  };

  return (
    <Card className="border border-border/50">
      <CardHeader>
        <CardTitle>Log Revenue</CardTitle>
        <CardDescription>Record incoming revenue from deals</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <FieldGroup>
              <FieldLabel>Deal</FieldLabel>
              <Select
                value={formData.deal_id}
                onValueChange={(value) => setFormData({ ...formData, deal_id: value })}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select deal" />
                </SelectTrigger>
                <SelectContent>
                  {deals.map((deal) => (
                    <SelectItem key={deal.id} value={deal.id.toString()}>
                      {deal.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldGroup>

            <FieldGroup>
              <FieldLabel>Date</FieldLabel>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                disabled={isLoading}
              />
            </FieldGroup>
          </div>

          <FieldGroup>
            <FieldLabel>Revenue Amount ($)</FieldLabel>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground">$</span>
              <Input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
                disabled={isLoading}
                className="pl-8"
              />
            </div>
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>Description (Optional)</FieldLabel>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="E.g., Licensing payment from streaming platform"
              disabled={isLoading}
              className="min-h-20"
            />
          </FieldGroup>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Logging...' : 'Log Revenue'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
