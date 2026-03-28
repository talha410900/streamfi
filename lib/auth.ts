export type UserRole = 'admin' | 'investor';

export type OnboardingStep =
  | 'account_created'
  | 'kyc'
  | 'questionnaire'
  | 'documents'
  | 'funding'
  | 'token_issuance'
  | 'completed';

export const ONBOARDING_STEPS: { key: OnboardingStep; label: string; description: string }[] = [
  { key: 'account_created', label: 'Account Created', description: 'Admin created investor account' },
  { key: 'kyc', label: 'KYC Verification', description: 'Identity & accreditation check' },
  { key: 'questionnaire', label: 'Investor Questionnaire', description: 'Risk profile & suitability' },
  { key: 'documents', label: 'Document Signing', description: 'Subscription & operating agreements' },
  { key: 'funding', label: 'Funding Confirmation', description: 'Capital commitment & payment' },
  { key: 'token_issuance', label: 'Token Issuance', description: 'Solana token minted to wallet' },
];

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  onboarding_step: OnboardingStep;
  created_at: string;
  created_by?: string;
  temp_password?: boolean;
}

const mockUsers: Record<string, User> = {
  'admin@streamfi.com': {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@streamfi.com',
    role: 'admin',
    onboarding_step: 'completed',
    created_at: '2026-01-01',
  },
  'investor@streamfi.com': {
    id: 'investor-1',
    name: 'John Investor',
    email: 'investor@streamfi.com',
    role: 'investor',
    onboarding_step: 'kyc',
    created_at: '2026-02-01',
    created_by: 'admin-1',
    temp_password: false,
  },
};

export async function loginUser(
  email: string,
  password: string,
): Promise<{ success: boolean; user?: User; error?: string }> {
  const user = mockUsers[email];
  if (user && password.length > 0) {
    return { success: true, user };
  }
  return { success: false, error: 'Invalid credentials' };
}

export async function createInvestorAccount(
  name: string,
  email: string,
  tempPassword: string,
  createdBy: string,
): Promise<{ success: boolean; user?: User; error?: string }> {
  if (mockUsers[email]) {
    return { success: false, error: 'An account with this email already exists' };
  }

  const newUser: User = {
    id: `investor-${Date.now()}`,
    name,
    email,
    role: 'investor',
    onboarding_step: 'account_created',
    created_at: new Date().toISOString().split('T')[0],
    created_by: createdBy,
    temp_password: true,
  };

  mockUsers[email] = newUser;
  return { success: true, user: newUser };
}

export async function logoutUser(): Promise<void> {
  localStorage.removeItem('streamfi_user');
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  const userData = localStorage.getItem('streamfi_user');
  return userData ? JSON.parse(userData) : null;
}

export function setCurrentUser(user: User): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('streamfi_user', JSON.stringify(user));
}

export function isAdmin(user: User | null): boolean {
  return user?.role === 'admin';
}

export function isInvestor(user: User | null): boolean {
  return user?.role === 'investor';
}

export function isOnboardingComplete(user: User | null): boolean {
  return user?.onboarding_step === 'completed';
}

export function getOnboardingStepIndex(step: OnboardingStep): number {
  const idx = ONBOARDING_STEPS.findIndex((s) => s.key === step);
  return idx === -1 ? ONBOARDING_STEPS.length : idx;
}

export function getOnboardingProgress(step: OnboardingStep): {
  current: number;
  total: number;
  percentage: number;
} {
  if (step === 'completed') {
    return { current: ONBOARDING_STEPS.length, total: ONBOARDING_STEPS.length, percentage: 100 };
  }
  const current = getOnboardingStepIndex(step);
  return {
    current,
    total: ONBOARDING_STEPS.length,
    percentage: Math.round((current / ONBOARDING_STEPS.length) * 100),
  };
}
