'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignupPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login');
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <p className="text-sm text-muted-foreground">
        StreamFi Ventures is a private fund. Investor accounts are created by admin.
        Redirecting to login...
      </p>
    </div>
  );
}
