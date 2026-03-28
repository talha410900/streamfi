'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function InvestorSettingsRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/investor/wallet');
  }, [router]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <p className="text-sm text-muted-foreground">Redirecting to Account / Wallet...</p>
    </div>
  );
}
