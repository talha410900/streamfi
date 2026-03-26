'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import { loginUser, setCurrentUser } from '@/lib/auth';
import { validateLoginForm } from '@/lib/validation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Mail, Lock, ArrowRight, Film } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate form
    const errors = validateLoginForm(email, password);
    if (errors.length > 0) {
      setError(errors[0].message);
      setLoading(false);
      return;
    }

    try {
      const result = await loginUser(email, password);
      if (result.success && result.user) {
        setCurrentUser(result.user);
        // Redirect based on role
        if (result.user.role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/investor/dashboard');
        }
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
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
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back</h1>
        <p className="text-muted-foreground">Sign in to access your investment portfolio</p>
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
          <div className="flex items-center justify-between">
            <FieldLabel>Password</FieldLabel>
            <Link href="#" className="text-xs text-primary hover:text-primary/80 transition-colors font-medium">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="pl-11 h-12"
            />
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
          {loading ? 'Signing in...' : 'Sign In'}
          {!loading && <ArrowRight className="size-4 ml-2" />}
        </Button>
      </form>

      <Separator />

      {/* Demo Credentials */}
      <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col gap-3">
        <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Demo Credentials</p>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center justify-between gap-2 p-3 bg-background rounded-lg border border-border/50">
            <div>
              <p className="font-medium text-foreground">Admin</p>
              <p className="text-muted-foreground text-xs">admin@streamfi.com</p>
            </div>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">Any password</span>
          </div>
          <div className="flex items-center justify-between gap-2 p-3 bg-background rounded-lg border border-border/50">
            <div>
              <p className="font-medium text-foreground">Investor</p>
              <p className="text-muted-foreground text-xs">investor@streamfi.com</p>
            </div>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">Any password</span>
          </div>
        </div>
      </div>

      {/* Signup Link */}
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-primary font-semibold hover:text-primary/80 transition-colors">
          Create account
        </Link>
      </p>
    </div>
  );
}
