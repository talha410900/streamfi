'use client';

import { useAuth } from '@/lib/hooks/use-auth';
import { InvestorSidebar } from '@/components/investor/sidebar';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function InvestorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isInvestor } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user || !isInvestor) {
        router.push('/login');
      }
    }
  }, [user, loading, isInvestor, router]);

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!user || !isInvestor) {
    return null;
  }

  return (
    <div className="flex h-screen">
      <InvestorSidebar />
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="mx-auto w-full max-w-[1600px] px-4 py-4 sm:px-5 sm:py-5">
          {children}
        </div>
      </main>
    </div>
  );
}
