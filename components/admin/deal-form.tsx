'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { INVESTMENT_GENRES, DEAL_STATUS_OPTIONS } from '@/lib/constants';
import { validateDealForm } from '@/lib/validation';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface DealFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  isLoading?: boolean;
}

export function DealForm({ onSubmit, initialData, isLoading = false }: DealFormProps) {
  const [formData, setFormData] = useState(
    initialData || {
      title: '',
      description: '',
      genre: '',
      status: 'draft',
      raise_target: 0,
      valuation: 0,
      min_investment: 10000,
    },
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateDealForm(formData);
    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach((err) => {
        errorMap[err.field] = err.message;
      });
      setErrors(errorMap);
      return;
    }
    setErrors({});
    onSubmit(formData);
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle>{initialData ? 'Edit Deal' : 'Create New Deal'}</CardTitle>
        <CardDescription>Fill in the details for this investment opportunity</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <FieldGroup>
            <FieldLabel>Deal Title</FieldLabel>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Midnight Heist"
              disabled={isLoading}
            />
            {errors.title && (
              <Alert variant="destructive" className="mt-2 py-2">
                <AlertCircle className="size-4" />
                <AlertDescription>{errors.title}</AlertDescription>
              </Alert>
            )}
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>Description</FieldLabel>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the show and investment opportunity"
              disabled={isLoading}
              className="min-h-24"
            />
            {errors.description && (
              <Alert variant="destructive" className="mt-2 py-2">
                <AlertCircle className="size-4" />
                <AlertDescription>{errors.description}</AlertDescription>
              </Alert>
            )}
          </FieldGroup>

          <div className="grid grid-cols-2 gap-4">
            <FieldGroup>
              <FieldLabel>Genre</FieldLabel>
              <Select
                value={formData.genre}
                onValueChange={(value) => setFormData({ ...formData, genre: value })}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  {INVESTMENT_GENRES.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldGroup>

            <FieldGroup>
              <FieldLabel>Status</FieldLabel>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {DEAL_STATUS_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldGroup>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <FieldGroup>
              <FieldLabel>Raise Target ($)</FieldLabel>
              <Input
                type="number"
                value={formData.raise_target}
                onChange={(e) => setFormData({ ...formData, raise_target: parseFloat(e.target.value) })}
                placeholder="500000"
                disabled={isLoading}
              />
              {errors.raise_target && (
                <Alert variant="destructive" className="mt-2 py-2">
                  <AlertCircle className="size-4" />
                  <AlertDescription>{errors.raise_target}</AlertDescription>
                </Alert>
              )}
            </FieldGroup>

            <FieldGroup>
              <FieldLabel>Valuation ($)</FieldLabel>
              <Input
                type="number"
                value={formData.valuation}
                onChange={(e) => setFormData({ ...formData, valuation: parseFloat(e.target.value) })}
                placeholder="5000000"
                disabled={isLoading}
              />
              {errors.valuation && (
                <Alert variant="destructive" className="mt-2 py-2">
                  <AlertCircle className="size-4" />
                  <AlertDescription>{errors.valuation}</AlertDescription>
                </Alert>
              )}
            </FieldGroup>

            <FieldGroup>
              <FieldLabel>Min Investment ($)</FieldLabel>
              <Input
                type="number"
                value={formData.min_investment}
                onChange={(e) => setFormData({ ...formData, min_investment: parseFloat(e.target.value) })}
                placeholder="10000"
                disabled={isLoading}
              />
            </FieldGroup>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Deal'}
            </Button>
            <Button type="button" variant="outline" disabled={isLoading}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
