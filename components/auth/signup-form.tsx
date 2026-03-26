'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import { signupUser, setCurrentUser, UserRole } from '@/lib/auth';
import { validateSignupForm } from '@/lib/validation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Mail, Lock, ArrowRight, Film, User, Shield } from 'lucide-react';

export function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('investor');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate form
    const errors = validateSignupForm(email, password, confirmPassword);
    if (errors.length > 0) {
      setError(errors[0].message);
      setLoading(false);
      return;
    }

    try {
      const result = await signupUser(email, password, role);
      if (result.success && result.user) {
        setCurrentUser(result.user);
        // Redirect based on role
        if (result.user.role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/investor/onboarding');
        }
      } else {
        setError(result.error || 'Signup failed');
      }
    } catch (err) {
      setError('An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 mb-4 lg:hidden">
          <div className="size-10 bg-primary rounded-xl flex items-center justify-center">
            <Film className="size-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">
            StreamFi Ventures
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Create Account</h1>
        <p className="text-muted-foreground">
          Join StreamFi Ventures and start investing in premium content
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <FieldGroup>
          <FieldLabel>Email Address</FieldLabel>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="pl-11 h-12"
            />
          </div>
        </FieldGroup>

        <FieldGroup>
          <FieldLabel>Password</FieldLabel>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Create a secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="pl-11 h-12"
            />
          </div>
          <p className="text-xs text-muted-foreground">At least 8 characters recommended</p>
        </FieldGroup>

        <FieldGroup>
          <FieldLabel>Confirm Password</FieldLabel>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              className="pl-11 h-12"
            />
          </div>
        </FieldGroup>

        <Separator />

        {/* Account Type Selection */}
        <FieldGroup>
          <FieldLabel>Account Type</FieldLabel>
          <div className="flex flex-col gap-3">
            {[
              { value: 'investor' as UserRole, label: 'Investor', description: 'Browse and invest in deals', icon: User },
              { value: 'admin' as UserRole, label: 'Admin', description: 'Manage deals and investors', icon: Shield },
            ].map((option) => (
              <label
                key={option.value}
                className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                  role === option.value
                    ? 'border-primary bg-primary/5'
                    : 'border-border/50 hover:border-border bg-background'
                }`}
              >
                <div className={`size-5 rounded-full border-2 flex items-center justify-center transition-all mt-0.5 ${
                  role === option.value
                    ? 'border-primary bg-primary'
                    : 'border-muted-foreground'
                }`}>
                  {role === option.value && (
                    <div className="size-2 bg-white rounded-full" />
                  )}
                </div>
                <div className="flex items-center gap-3 flex-1">
                  <div className={`size-10 rounded-lg flex items-center justify-center ${
                    role === option.value ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    <option.icon className={`size-5 ${
                      role === option.value ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{option.label}</p>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="role"
                  value={option.value}
                  checked={role === option.value}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  disabled={loading}
                  className="hidden"
                />
              </label>
            ))}
          </div>
        </FieldGroup>

        {/* Error Message */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="size-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 text-base font-semibold"
        >
          {loading ? 'Creating account...' : 'Create Account'}
          {!loading && <ArrowRight className="size-4 ml-2" />}
        </Button>
      </form>

      {/* Login Link */}
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="text-primary font-semibold hover:text-primary/80 transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
}
