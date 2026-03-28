'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Check, Clock, AlertCircle, ArrowRight, ShieldCheck, ClipboardList, FileSignature, DollarSign, Coins, UserPlus } from 'lucide-react';
import Link from 'next/link';

interface ComplianceStep {
  label: string;
  status: 'completed' | 'in_progress' | 'pending';
  icon: React.ElementType;
}

interface ComplianceStatusCardProps {
  variant: 'admin' | 'investor';
  investorName?: string;
  investorEmail?: string;
  steps?: ComplianceStep[];
  className?: string;
}

const DEFAULT_STEPS: ComplianceStep[] = [
  { label: 'Account Created', status: 'completed', icon: UserPlus },
  { label: 'KYC Verification', status: 'completed', icon: ShieldCheck },
  { label: 'Investor Questionnaire', status: 'completed', icon: ClipboardList },
  { label: 'Document Signing', status: 'in_progress', icon: FileSignature },
  { label: 'Funding Confirmation', status: 'pending', icon: DollarSign },
  { label: 'Token Issuance', status: 'pending', icon: Coins },
];

function StatusIcon({ status }: { status: ComplianceStep['status'] }) {
  if (status === 'completed') return <Check className="size-3.5 text-chart-1" />;
  if (status === 'in_progress') return <Clock className="size-3.5 text-chart-3" />;
  return <AlertCircle className="size-3.5 text-muted-foreground" />;
}

function StatusLabel({ status }: { status: ComplianceStep['status'] }) {
  if (status === 'completed') return <Badge variant="default" className="text-[10px]">Done</Badge>;
  if (status === 'in_progress') return <Badge variant="secondary" className="text-[10px]">In Progress</Badge>;
  return <Badge variant="outline" className="text-[10px]">Pending</Badge>;
}

export function ComplianceStatusCard({
  variant,
  investorName,
  investorEmail,
  steps = DEFAULT_STEPS,
  className,
}: ComplianceStatusCardProps) {
  const completedCount = steps.filter((s) => s.status === 'completed').length;
  const progressPercent = (completedCount / steps.length) * 100;
  const isComplete = completedCount === steps.length;

  return (
    <Card className={className}>
      <CardHeader className="px-4 pb-3 pt-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-base font-semibold">
              {variant === 'admin' ? 'Compliance Status' : 'Onboarding Progress'}
            </CardTitle>
            {variant === 'admin' && investorName && (
              <CardDescription>{investorName} · {investorEmail}</CardDescription>
            )}
            {variant === 'investor' && !isComplete && (
              <CardDescription>Complete all steps to start investing</CardDescription>
            )}
          </div>
          {isComplete ? (
            <Badge variant="default">Fully Compliant</Badge>
          ) : (
            <Badge variant="secondary">{completedCount}/{steps.length} Complete</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 px-4">
        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        <div className="flex flex-col gap-1">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.label}
                className="flex items-center justify-between rounded-md px-2 py-1.5"
              >
                <div className="flex items-center gap-2.5">
                  <StatusIcon status={step.status} />
                  <Icon className="size-3.5 text-muted-foreground" />
                  <span className={`text-sm ${step.status === 'pending' ? 'text-muted-foreground' : 'text-foreground'}`}>
                    {step.label}
                  </span>
                </div>
                <StatusLabel status={step.status} />
              </div>
            );
          })}
        </div>

        {variant === 'investor' && !isComplete && (
          <Link href="/investor/onboarding">
            <Button variant="outline" className="w-full">
              Continue Onboarding
              <ArrowRight data-icon="inline-end" />
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
