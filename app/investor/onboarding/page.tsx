'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { KYCForm } from '@/components/investor/kyc-form';
import { QuestionnaireForm } from '@/components/investor/questionnaire-form';
import { DocumentSignatureForm } from '@/components/investor/document-signature-form';
import { StepIndicator } from '@/components/shared/step-indicator';

export default function InvestorOnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    { label: 'KYC' },
    { label: 'Questionnaire' },
    { label: 'Documents' },
  ];

  const handleKYCSubmit = async (data: any) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('[v0] KYC submitted:', data);
    setIsLoading(false);
    setCurrentStep(1);
  };

  const handleQuestionnaireSubmit = async (data: any) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('[v0] Questionnaire submitted:', data);
    setIsLoading(false);
    setCurrentStep(2);
  };

  const handleDocumentsSubmit = async (data: any) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('[v0] Documents submitted:', data);
    setIsLoading(false);
    // Redirect to dashboard after completion
    router.push('/investor/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-3xl">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Complete Your Profile</h1>
            <p className="text-muted-foreground">
              Let's get you set up to start investing in streaming entertainment
            </p>
          </div>

          <div className="mb-12">
            <StepIndicator steps={steps} currentStep={currentStep} />
          </div>

          {currentStep === 0 && <KYCForm onSubmit={handleKYCSubmit} isLoading={isLoading} />}
          {currentStep === 1 && (
            <QuestionnaireForm onSubmit={handleQuestionnaireSubmit} isLoading={isLoading} />
          )}
          {currentStep === 2 && (
            <DocumentSignatureForm onSubmit={handleDocumentsSubmit} isLoading={isLoading} />
          )}

          {currentStep > 0 && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={isLoading}
                className="text-primary hover:underline text-sm"
              >
                ← Go back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
