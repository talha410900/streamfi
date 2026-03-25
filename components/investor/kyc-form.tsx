'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { STATES } from '@/lib/constants';
import { validateKYCForm } from '@/lib/validation';
import { User, Calendar, MapPin, Building } from 'lucide-react';

interface KYCFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export function KYCForm({ onSubmit, isLoading = false }: KYCFormProps) {
  const [formData, setFormData] = useState({
    legal_name: '',
    date_of_birth: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateKYCForm(formData);
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
    <Card className="max-w-2xl mx-auto border border-border/50">
      <CardHeader>
        <CardTitle>Know Your Customer (KYC)</CardTitle>
        <CardDescription>We need to verify your identity to comply with regulations</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldGroup>
              <FieldLabel className="flex items-center gap-2">
                <User className="size-4 text-muted-foreground" />
                Legal Name
              </FieldLabel>
              <Input
                value={formData.legal_name}
                onChange={(e) => setFormData({ ...formData, legal_name: e.target.value })}
                placeholder="Full legal name"
                disabled={isLoading}
              />
              {errors.legal_name && (
                <p className="text-sm text-destructive">{errors.legal_name}</p>
              )}
            </FieldGroup>

            <FieldGroup>
              <FieldLabel className="flex items-center gap-2">
                <Calendar className="size-4 text-muted-foreground" />
                Date of Birth
              </FieldLabel>
              <Input
                type="date"
                value={formData.date_of_birth}
                onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                disabled={isLoading}
              />
              {errors.date_of_birth && (
                <p className="text-sm text-destructive">{errors.date_of_birth}</p>
              )}
            </FieldGroup>
          </div>

          <Separator />

          <FieldGroup>
            <FieldLabel className="flex items-center gap-2">
              <MapPin className="size-4 text-muted-foreground" />
              Street Address
            </FieldLabel>
            <Input
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="123 Main Street"
              disabled={isLoading}
            />
            {errors.address && (
              <p className="text-sm text-destructive">{errors.address}</p>
            )}
          </FieldGroup>

          <div className="grid grid-cols-3 gap-4">
            <FieldGroup>
              <FieldLabel className="flex items-center gap-2">
                <Building className="size-4 text-muted-foreground" />
                City
              </FieldLabel>
              <Input
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="New York"
                disabled={isLoading}
              />
              {errors.city && (
                <p className="text-sm text-destructive">{errors.city}</p>
              )}
            </FieldGroup>

            <FieldGroup>
              <FieldLabel>State</FieldLabel>
              <Select
                value={formData.state}
                onValueChange={(value) => setFormData({ ...formData, state: value })}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {STATES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.state && (
                <p className="text-sm text-destructive">{errors.state}</p>
              )}
            </FieldGroup>

            <FieldGroup>
              <FieldLabel>ZIP Code</FieldLabel>
              <Input
                value={formData.zip}
                onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                placeholder="10001"
                disabled={isLoading}
              />
              {errors.zip && (
                <p className="text-sm text-destructive">{errors.zip}</p>
              )}
            </FieldGroup>
          </div>

          <Separator />

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Submitting...' : 'Continue to Questionnaire'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
