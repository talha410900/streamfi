'use client';

import { Check } from 'lucide-react';

interface Step {
  label: string;
  completed?: boolean;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* Steps row */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={index} className="flex items-center flex-1">
              {/* Step Circle */}
              <div
                className={`
                  relative z-10 flex items-center justify-center size-10 rounded-full font-semibold text-sm transition-colors
                  ${isCompleted ? 'bg-primary text-primary-foreground' : ''}
                  ${isCurrent ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
                  ${!isCompleted && !isCurrent ? 'bg-muted/50 text-muted-foreground' : ''}
                `}
              >
                {isCompleted ? <Check className="size-5" /> : index + 1}
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 transition-colors ${
                    isCompleted ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Labels row */}
      <div className="flex justify-between mt-3">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={index} className="flex-1 text-center first:text-left last:text-right">
              <p className={`text-xs font-medium transition-colors ${
                isCurrent || isCompleted ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
