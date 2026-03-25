// Auth utility functions for StreamFi
// Note: Since no integrations are enabled, using mock auth for demo purposes

export type UserRole = 'admin' | 'investor';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  onboarding_status: 'pending' | 'kyc' | 'questionnaire' | 'documents' | 'approved' | 'rejected';
}

// Mock user storage (in production, use Supabase)
const mockUsers: Record<string, User> = {
  'admin@streamfi.com': {
    id: 'admin-1',
    email: 'admin@streamfi.com',
    role: 'admin',
    onboarding_status: 'approved',
  },
  'investor@streamfi.com': {
    id: 'investor-1',
    email: 'investor@streamfi.com',
    role: 'investor',
    onboarding_status: 'pending',
  },
};

// Mock authentication (no real integration)
export async function loginUser(
  email: string,
  password: string,
): Promise<{ success: boolean; user?: User; error?: string }> {
  // In production, verify password with bcrypt and check against Supabase
  const user = mockUsers[email];
  if (user && password.length > 0) {
    return { success: true, user };
  }
  return { success: false, error: 'Invalid credentials' };
}

export async function signupUser(
  email: string,
  password: string,
  role: UserRole,
): Promise<{ success: boolean; user?: User; error?: string }> {
  // In production, hash password with bcrypt and create in Supabase
  if (mockUsers[email]) {
    return { success: false, error: 'Email already exists' };
  }
  
  const newUser: User = {
    id: `${role}-${Date.now()}`,
    email,
    role,
    onboarding_status: role === 'admin' ? 'approved' : 'pending',
  };
  
  mockUsers[email] = newUser;
  return { success: true, user: newUser };
}

export async function logoutUser(): Promise<void> {
  // Clear session
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
  return user?.onboarding_status === 'approved';
}
