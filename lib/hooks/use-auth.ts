'use client';

import { useEffect, useState } from 'react';
import { User, getCurrentUser, isAdmin, isInvestor, isOnboardingComplete } from '../auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  return {
    user,
    loading,
    isAdmin: isAdmin(user),
    isInvestor: isInvestor(user),
    isOnboarded: isOnboardingComplete(user),
  };
}
