'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { KYCForm } from '@/components/investor/kyc-form';
import { QuestionnaireForm } from '@/components/investor/questionnaire-form';
import { DocumentSignatureForm } from '@/components/investor/document-signature-form';
import { FundingConfirmationForm } from '@/components/investor/funding-confirmation-form';
import { TokenIssuanceForm } from '@/components/investor/token-issuance-form';
import { Badge } from '@/components/ui/badge';
import { Check, UserPlus, ShieldCheck, ClipboardList, FileSignature, DollarSign, Coins } from 'lucide-react';

const STEPS = [
  { label: 'Account', icon: UserPlus, description: 'Account setup by administrator' },
  { label: 'KYC', icon: ShieldCheck, description: 'Identity verification' },
  { label: 'Questionnaire', icon: ClipboardList, description: 'Investor suitability' },
  { label: 'Documents', icon: FileSignature, description: 'Sign subscription docs' },
  { label: 'Funding', icon: DollarSign, description: 'Confirm your investment' },
  { label: 'Tokens', icon: Coins, description: 'Receive your tokens' },
];

export default function InvestorOnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleKYCSubmit = async (data: any) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('[v0] KYC submitted:', data);
    setIsLoading(false);
    setCurrentStep(2);
  };

  const handleQuestionnaireSubmit = async (data: any) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('[v0] Questionnaire submitted:', data);
    setIsLoading(false);
    setCurrentStep(3);
  };

  const handleDocumentsSubmit = async (data: any) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('[v0] Documents submitted:', data);
    setIsLoading(false);
    setCurrentStep(4);
  };

  const handleFundingSubmit = async (data: any) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('[v0] Funding confirmed:', data);
    setIsLoading(false);
    setCurrentStep(5);
  };

  const handleTokenSubmit = async (data: any) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('[v0] Token issuance complete:', data);
    setIsLoading(false);
    router.push('/investor/dashboard');
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left: Vertical Step Indicator */}
      <div className="hidden w-80 shrink-0 border-r border-border bg-sidebar p-6 lg:flex lg:flex-col">
        <div className="mb-8">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-xs font-bold text-primary-foreground">SF</span>
            </div>
            <span className="font-semibold text-foreground">StreamFi Ventures</span>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isPending = index > currentStep;

            return (
              <div key={step.label} className="flex items-start gap-3 py-2.5">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                      isCompleted
                        ? 'bg-primary text-primary-foreground'
                        : isCurrent
                          ? 'border-2 border-primary bg-primary/10 text-primary'
                          : 'border border-border bg-muted/50 text-muted-foreground'
                    }`}
                  >
                    {isCompleted ? <Check className="size-4" /> : <Icon className="size-4" />}
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className={`mt-1 h-8 w-px ${isCompleted ? 'bg-primary' : 'bg-border'}`} />
                  )}
                </div>
                <div className="pt-1.5">
                  <p className={`text-sm font-medium ${isCurrent ? 'text-foreground' : isPending ? 'text-muted-foreground' : 'text-foreground'}`}>
                    {step.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                  {isCompleted && (
                    <Badge variant="secondary" className="mt-1 text-[10px]">Complete</Badge>
                  )}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-border pt-4">
          <p className="text-xs text-muted-foreground">
            Need help? Contact <span className="text-primary">support@streamfi.com</span>
          </p>
        </div>
      </div>

      {/* Right: Form Content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile step indicator */}
        <div className="border-b border-border px-4 py-3 lg:hidden">
          <div className="flex items-center gap-2">
            {STEPS.map((step, index) => (
              <div
                key={step.label}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
          <p className="mt-2 text-sm font-medium">
            Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].label}
          </p>
        </div>

        <div className="flex flex-1 flex-col items-center overflow-y-auto px-4 py-8 sm:px-6 sm:py-10">
          <div className="w-full max-w-2xl">
            <div className="mb-6 sm:mb-8">
              <h1 className="mb-1 text-xl font-semibold tracking-tight sm:text-2xl">
                {STEPS[currentStep].description}
              </h1>
              <p className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {STEPS.length}
              </p>
            </div>

            {currentStep === 0 && (
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-6 text-center">
                <Check className="mx-auto mb-3 size-10 text-chart-1" />
                <h2 className="text-lg font-semibold">Welcome to StreamFi Ventures</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your investor account has been created by the fund administrator.
                  Complete the steps below to finish onboarding and gain full access.
                </p>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Continue to KYC
                </button>
              </div>
            )}
            {currentStep === 1 && <KYCForm onSubmit={handleKYCSubmit} isLoading={isLoading} />}
            {currentStep === 2 && (
              <QuestionnaireForm onSubmit={handleQuestionnaireSubmit} isLoading={isLoading} />
            )}
            {currentStep === 3 && (
              <DocumentSignatureForm onSubmit={handleDocumentsSubmit} isLoading={isLoading} />
            )}
            {currentStep === 4 && (
              <FundingConfirmationForm onSubmit={handleFundingSubmit} isLoading={isLoading} />
            )}
            {currentStep === 5 && (
              <TokenIssuanceForm onSubmit={handleTokenSubmit} isLoading={isLoading} />
            )}

            {currentStep > 1 && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  disabled={isLoading}
                  className="text-sm text-primary hover:underline"
                >
                  ← Go back
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
