'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, DollarSign, Percent, Calendar, Coins, Film, TrendingUp, FileText } from 'lucide-react';

interface DealFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  isLoading?: boolean;
  onCancel?: () => void;
}

const PRODUCTION_STATUSES = [
  { value: 'development', label: 'Development' },
  { value: 'pre_production', label: 'Pre-Production' },
  { value: 'production', label: 'In Production' },
  { value: 'post_production', label: 'Post-Production' },
  { value: 'completed', label: 'Completed' },
  { value: 'released', label: 'Released' },
];

const DISTRIBUTION_STATUSES = [
  { value: 'pending', label: 'Pending' },
  { value: 'calculating', label: 'Calculating' },
  { value: 'ready', label: 'Ready for Distribution' },
  { value: 'distributed', label: 'Distributed' },
];

const DEAL_STATUSES = [
  { value: 'draft', label: 'Draft' },
  { value: 'pending_review', label: 'Pending Review' },
  { value: 'open', label: 'Open for Investment' },
  { value: 'funded', label: 'Fully Funded' },
  { value: 'closed', label: 'Closed' },
  { value: 'archived', label: 'Archived' },
];

const GENRES = [
  'Action', 'Comedy', 'Drama', 'Documentary', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Animation', 'Family'
];

export function DealFormEnhanced({ onSubmit, initialData, isLoading = false, onCancel }: DealFormProps) {
  const [formData, setFormData] = useState(
    initialData || {
      // Basic Info
      title: '',
      description: '',
      genre: '',
      // Valuation
      streamscore_valuation: 0,
      streamfi_valuation: 0,
      // Fundraising
      raise_target: 0,
      revenue_share_percentage: 0,
      min_investment: 10000,
      // Token Details
      token_name: '',
      token_symbol: '',
      total_units: 0,
      unit_price: 0,
      // Status & Dates
      status: 'draft',
      funding_start_date: '',
      funding_end_date: '',
      production_status: 'development',
      distribution_status: 'pending',
    }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.genre) newErrors.genre = 'Genre is required';
    if (formData.raise_target <= 0) newErrors.raise_target = 'Raise target must be greater than 0';
    if (formData.streamfi_valuation <= 0) newErrors.streamfi_valuation = 'Valuation is required';
    if (formData.revenue_share_percentage <= 0 || formData.revenue_share_percentage > 100) {
      newErrors.revenue_share_percentage = 'Revenue share must be between 1-100%';
    }
    if (!formData.token_name.trim()) newErrors.token_name = 'Token name is required';
    if (!formData.token_symbol.trim()) newErrors.token_symbol = 'Token symbol is required';
    if (formData.total_units <= 0) newErrors.total_units = 'Total units must be greater than 0';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic" className="text-xs">Basic Info</TabsTrigger>
          <TabsTrigger value="valuation" className="text-xs">Valuation</TabsTrigger>
          <TabsTrigger value="token" className="text-xs">Token Setup</TabsTrigger>
          <TabsTrigger value="status" className="text-xs">Status & Dates</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="mt-6">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Film className="size-4" />
                Show Information
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <FieldGroup>
                <FieldLabel>Show Name</FieldLabel>
                <Input
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="e.g., Midnight Heist"
                  disabled={isLoading}
                />
                {errors.title && (
                  <p className="text-xs text-destructive mt-1">{errors.title}</p>
                )}
              </FieldGroup>

              <FieldGroup>
                <FieldLabel>Show Description</FieldLabel>
                <Textarea
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Describe the show and investment opportunity..."
                  disabled={isLoading}
                  className="min-h-24"
                />
                {errors.description && (
                  <p className="text-xs text-destructive mt-1">{errors.description}</p>
                )}
              </FieldGroup>

              <FieldGroup>
                <FieldLabel>Genre</FieldLabel>
                <Select
                  value={formData.genre}
                  onValueChange={(value) => updateField('genre', value)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {GENRES.map((g) => (
                      <SelectItem key={g} value={g.toLowerCase()}>{g}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.genre && (
                  <p className="text-xs text-destructive mt-1">{errors.genre}</p>
                )}
              </FieldGroup>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="valuation" className="mt-6">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="size-4" />
                Valuation & Fundraising
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="rounded-lg border border-border bg-muted/30 p-3 mb-4">
                <p className="text-xs font-medium text-muted-foreground mb-1">Deal Structure</p>
                <p className="text-xs text-muted-foreground">
                  One deal = one show. Each deal has its own token/unit structure representing
                  ownership in the revenue participation for that show.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FieldGroup>
                  <FieldLabel className="flex items-center gap-1.5">
                    StreamScore Valuation
                    <span className="inline-flex items-center justify-center rounded-full bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground" title="Imported from StreamScore analytics platform. This is the algorithmic valuation estimate based on market data, comparable shows, and audience potential.">
                      ?
                    </span>
                  </FieldLabel>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      type="number"
                      value={formData.streamscore_valuation}
                      onChange={(e) => updateField('streamscore_valuation', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                      disabled={isLoading}
                      className="pl-9"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Imported from StreamScore analytics</p>
                </FieldGroup>

                <FieldGroup>
                  <FieldLabel>Final StreamFi Ventures valuation</FieldLabel>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      type="number"
                      value={formData.streamfi_valuation}
                      onChange={(e) => updateField('streamfi_valuation', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                      disabled={isLoading}
                      className="pl-9"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Final published valuation</p>
                  {errors.streamfi_valuation && (
                    <p className="text-xs text-destructive">{errors.streamfi_valuation}</p>
                  )}
                </FieldGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FieldGroup>
                  <FieldLabel>Raise Target</FieldLabel>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      type="number"
                      value={formData.raise_target}
                      onChange={(e) => updateField('raise_target', parseFloat(e.target.value) || 0)}
                      placeholder="500000"
                      disabled={isLoading}
                      className="pl-9"
                    />
                  </div>
                  {errors.raise_target && (
                    <p className="text-xs text-destructive">{errors.raise_target}</p>
                  )}
                </FieldGroup>

                <FieldGroup>
                  <FieldLabel>Minimum Investment</FieldLabel>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      type="number"
                      value={formData.min_investment}
                      onChange={(e) => updateField('min_investment', parseFloat(e.target.value) || 0)}
                      placeholder="10000"
                      disabled={isLoading}
                      className="pl-9"
                    />
                  </div>
                </FieldGroup>
              </div>

              <FieldGroup>
                <FieldLabel>Revenue Share Percentage (Investors)</FieldLabel>
                <div className="relative">
                  <Input
                    type="number"
                    value={formData.revenue_share_percentage}
                    onChange={(e) => updateField('revenue_share_percentage', parseFloat(e.target.value) || 0)}
                    placeholder="15"
                    disabled={isLoading}
                    className="pr-9"
                  />
                  <Percent className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">Percentage of revenue allocated to investors</p>
                {errors.revenue_share_percentage && (
                  <p className="text-xs text-destructive">{errors.revenue_share_percentage}</p>
                )}
              </FieldGroup>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="token" className="mt-6">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Coins className="size-4" />
                Token Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <FieldGroup>
                  <FieldLabel>Token Name</FieldLabel>
                  <Input
                    value={formData.token_name}
                    onChange={(e) => updateField('token_name', e.target.value)}
                    placeholder="e.g., Midnight Heist Token"
                    disabled={isLoading}
                  />
                  {errors.token_name && (
                    <p className="text-xs text-destructive">{errors.token_name}</p>
                  )}
                </FieldGroup>

                <FieldGroup>
                  <FieldLabel>Token Symbol</FieldLabel>
                  <Input
                    value={formData.token_symbol}
                    onChange={(e) => updateField('token_symbol', e.target.value.toUpperCase())}
                    placeholder="e.g., MHT"
                    disabled={isLoading}
                    maxLength={6}
                  />
                  {errors.token_symbol && (
                    <p className="text-xs text-destructive">{errors.token_symbol}</p>
                  )}
                </FieldGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FieldGroup>
                  <FieldLabel>Total Units / Token Supply</FieldLabel>
                  <Input
                    type="number"
                    value={formData.total_units}
                    onChange={(e) => updateField('total_units', parseInt(e.target.value) || 0)}
                    placeholder="50000"
                    disabled={isLoading}
                  />
                  {errors.total_units && (
                    <p className="text-xs text-destructive">{errors.total_units}</p>
                  )}
                </FieldGroup>

                <FieldGroup>
                  <FieldLabel>Unit Price</FieldLabel>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      type="number"
                      value={formData.unit_price}
                      onChange={(e) => updateField('unit_price', parseFloat(e.target.value) || 0)}
                      placeholder="10"
                      disabled={isLoading}
                      className="pl-9"
                    />
                  </div>
                </FieldGroup>
              </div>

              {formData.total_units > 0 && formData.unit_price > 0 && (
                <div className="bg-card rounded-lg p-4 border border-border">
                  <p className="text-sm text-muted-foreground">Total Raise Value</p>
                  <p className="text-xl font-bold">
                    ${(formData.total_units * formData.unit_price).toLocaleString()}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status" className="mt-6">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="size-4" />
                Status & Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <FieldGroup>
                  <FieldLabel>Deal Status</FieldLabel>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => updateField('status', value)}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEAL_STATUSES.map((s) => (
                        <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldGroup>

                <FieldGroup>
                  <FieldLabel>Production Status</FieldLabel>
                  <Select
                    value={formData.production_status}
                    onValueChange={(value) => updateField('production_status', value)}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRODUCTION_STATUSES.map((s) => (
                        <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldGroup>
              </div>

              <FieldGroup>
                <FieldLabel>Distribution Status</FieldLabel>
                <Select
                  value={formData.distribution_status}
                  onValueChange={(value) => updateField('distribution_status', value)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {DISTRIBUTION_STATUSES.map((s) => (
                      <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FieldGroup>

              <div className="grid grid-cols-2 gap-4">
                <FieldGroup>
                  <FieldLabel>Funding Start Date</FieldLabel>
                  <div className="relative">
                    <Input
                      type="date"
                      value={formData.funding_start_date}
                      onChange={(e) => updateField('funding_start_date', e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </FieldGroup>

                <FieldGroup>
                  <FieldLabel>Funding End Date</FieldLabel>
                  <div className="relative">
                    <Input
                      type="date"
                      value={formData.funding_end_date}
                      onChange={(e) => updateField('funding_end_date', e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </FieldGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {Object.keys(errors).length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertDescription>
            Please fix the errors above before submitting.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex gap-3 pt-4 border-t border-border">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : initialData ? 'Update Deal' : 'Create Deal'}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}