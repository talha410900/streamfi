'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { User, Briefcase, TrendingUp, DollarSign } from 'lucide-react';

interface QuestionnaireFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export function QuestionnaireForm({ onSubmit, isLoading = false }: QuestionnaireFormProps) {
  const [formData, setFormData] = useState({
    accreditation_status: '',
    investment_experience: '',
    risk_tolerance: '',
    annual_income: '',
    understand_risks: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.accreditation_status) {
      alert('Please select accreditation status');
      return;
    }
    if (!formData.understand_risks) {
      alert('You must acknowledge the risks');
      return;
    }
    onSubmit(formData);
  };

  return (
    <Card className="max-w-2xl mx-auto border border-border/50">
      <CardHeader>
        <CardTitle>Investment Questionnaire</CardTitle>
        <CardDescription>Help us understand your investment profile and experience</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <FieldGroup>
            <FieldLabel className="flex items-center gap-2">
              <User className="size-4 text-muted-foreground" />
              Accreditation Status
            </FieldLabel>
            <div className="flex flex-col gap-3">
              {[
                {
                  value: 'accredited',
                  label: 'Accredited Investor',
                  desc: 'Net worth exceeds $1M or annual income exceeds $200K',
                },
                { value: 'non_accredited', label: 'Non-Accredited Investor', desc: 'Standard investor' },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-start gap-3 cursor-pointer p-4 border border-border/50 rounded-lg transition-colors ${
                    formData.accreditation_status === opt.value
                      ? 'bg-primary/5 border-primary/30'
                      : 'hover:bg-card'
                  }`}
                >
                  <input
                    type="radio"
                    name="accreditation"
                    value={opt.value}
                    checked={formData.accreditation_status === opt.value}
                    onChange={(e) => setFormData({ ...formData, accreditation_status: e.target.value })}
                    disabled={isLoading}
                    className="mt-0.5"
                  />
                  <div>
                    <p className="font-semibold text-sm">{opt.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </FieldGroup>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldGroup>
              <FieldLabel className="flex items-center gap-2">
                <Briefcase className="size-4 text-muted-foreground" />
                Investment Experience
              </FieldLabel>
              <Select
                value={formData.investment_experience}
                onValueChange={(value) => setFormData({ ...formData, investment_experience: value })}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                  <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                  <SelectItem value="advanced">Advanced (5+ years)</SelectItem>
                </SelectContent>
              </Select>
            </FieldGroup>

            <FieldGroup>
              <FieldLabel className="flex items-center gap-2">
                <TrendingUp className="size-4 text-muted-foreground" />
                Risk Tolerance
              </FieldLabel>
              <Select
                value={formData.risk_tolerance}
                onValueChange={(value) => setFormData({ ...formData, risk_tolerance: value })}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select risk tolerance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (Capital preservation)</SelectItem>
                  <SelectItem value="medium">Medium (Balanced growth)</SelectItem>
                  <SelectItem value="high">High (Growth priority)</SelectItem>
                </SelectContent>
              </Select>
            </FieldGroup>
          </div>

          <FieldGroup>
            <FieldLabel className="flex items-center gap-2">
              <DollarSign className="size-4 text-muted-foreground" />
              Annual Income Range
            </FieldLabel>
            <Select
              value={formData.annual_income}
              onValueChange={(value) => setFormData({ ...formData, annual_income: value })}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="50k">$50,000 - $100,000</SelectItem>
                <SelectItem value="100k">$100,000 - $250,000</SelectItem>
                <SelectItem value="250k">$250,000 - $500,000</SelectItem>
                <SelectItem value="500k">$500,000+</SelectItem>
              </SelectContent>
            </Select>
          </FieldGroup>

          <Separator />

          <FieldGroup>
            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox
                checked={formData.understand_risks}
                onCheckedChange={(checked) => setFormData({ ...formData, understand_risks: checked as boolean })}
                disabled={isLoading}
              />
              <span className="text-sm text-muted-foreground">
                I understand that streaming entertainment investments are illiquid and carry substantial risk of loss. I have
                reviewed the offering materials and acknowledge the risks involved.
              </span>
            </label>
          </FieldGroup>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Submitting...' : 'Continue to Documents'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
