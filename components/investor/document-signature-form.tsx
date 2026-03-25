'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { FileText, Calendar } from 'lucide-react';

interface DocumentSignatureFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

const SUBSCRIPTION_AGREEMENT = `
STREAMING ENTERTAINMENT INVESTMENT AGREEMENT

This Investment Agreement ("Agreement") is entered into as of the date of acceptance below between StreamFi Ventures, LLC ("Company") and the undersigned investor ("Investor").

1. INVESTMENT TERMS
Investor agrees to invest in streaming entertainment productions as specified by the Company. The investment is made on a per-deal basis with terms outlined in individual offering materials.

2. RISK DISCLOSURE
Streaming entertainment investments are inherently risky and illiquid. Investor acknowledges:
- Investment may result in total loss of capital
- No guaranteed returns
- Illiquid securities with limited secondary market
- Subject to production delays and cancellations
- Dependent on show performance and viewership

3. ACCREDITATION
Investor confirms accredited investor status as defined by SEC regulations, OR acknowledges non-accredited status and limitation on investment amounts.

4. REPRESENTATIONS
Investor represents that:
- Has reviewed and understands all offering materials
- Has independent financial/legal advice if desired
- Makes investment based on own evaluation
- Can afford potential loss of entire investment
- Investment is suitable for investor's financial situation

5. GOVERNING LAW
This Agreement shall be governed by applicable federal securities laws and the laws of Delaware.

By electronic signature below, Investor acknowledges reading and agreeing to all terms.
`;

export function DocumentSignatureForm({ onSubmit, isLoading = false }: DocumentSignatureFormProps) {
  const [formData, setFormData] = useState({
    signature_name: '',
    signature_date: new Date().toISOString().split('T')[0],
    agree_to_terms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.signature_name) {
      alert('Please enter your name for signature');
      return;
    }
    if (!formData.agree_to_terms) {
      alert('You must agree to the terms to continue');
      return;
    }
    onSubmit(formData);
  };

  return (
    <Card className="max-w-2xl mx-auto border border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="size-5 text-muted-foreground" />
          Review & Sign Documents
        </CardTitle>
        <CardDescription>Please review the subscription agreement and confirm your electronic signature</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <FieldGroup>
            <FieldLabel>Subscription Agreement</FieldLabel>
            <ScrollArea className="w-full h-64 border border-border/50 rounded-lg">
              <div className="p-4 bg-muted/30">
                <pre className="text-xs whitespace-pre-wrap text-muted-foreground">{SUBSCRIPTION_AGREEMENT}</pre>
              </div>
            </ScrollArea>
          </FieldGroup>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldGroup>
              <FieldLabel>Signature (Type Your Full Name)</FieldLabel>
              <Input
                type="text"
                value={formData.signature_name}
                onChange={(e) => setFormData({ ...formData, signature_name: e.target.value })}
                placeholder="Your Full Legal Name"
                disabled={isLoading}
                className="text-lg font-medium"
              />
              <p className="text-xs text-muted-foreground">
                By entering your name, you are signing this document electronically.
              </p>
            </FieldGroup>

            <FieldGroup>
              <FieldLabel className="flex items-center gap-2">
                <Calendar className="size-4 text-muted-foreground" />
                Signature Date
              </FieldLabel>
              <Input
                type="date"
                value={formData.signature_date}
                onChange={(e) => setFormData({ ...formData, signature_date: e.target.value })}
                disabled={isLoading}
              />
            </FieldGroup>
          </div>

          <Separator />

          <FieldGroup>
            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox
                checked={formData.agree_to_terms}
                onCheckedChange={(checked) => setFormData({ ...formData, agree_to_terms: checked as boolean })}
                disabled={isLoading}
              />
              <span className="text-sm text-muted-foreground">
                I have read and agree to the Subscription Agreement and all terms outlined above. I acknowledge receiving a copy
                of the offering materials and understand the risks associated with this investment.
              </span>
            </label>
          </FieldGroup>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Submitting...' : 'Complete Onboarding'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
