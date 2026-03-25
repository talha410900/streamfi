import { LoginForm } from '@/components/auth/login-form';
import { Film, TrendingUp, Shield, Users } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-card flex-col justify-between p-12 relative overflow-hidden border-r border-border/50">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 size-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 size-64 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/3 left-1/4 size-2 bg-primary/20 rounded-full" />
        <div className="absolute top-1/2 right-1/4 size-3 bg-primary/10 rounded-full" />
        <div className="absolute bottom-1/3 left-1/3 size-1.5 bg-primary/15 rounded-full" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                           linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="size-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Film className="size-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">StreamFi</span>
          </div>

          <div className="flex flex-col gap-6 max-w-lg">
            <h2 className="text-4xl font-bold text-foreground leading-tight">
              Invest in Premium Streaming Content
            </h2>
            <p className="text-muted-foreground text-lg">
              Join a growing community of investors discovering unique opportunities in the entertainment industry.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border/50 hover:border-border transition-colors">
            <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="size-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Curated Deal Opportunities</p>
              <p className="text-sm text-muted-foreground">Access exclusive entertainment investments</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border/50 hover:border-border transition-colors">
            <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Shield className="size-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Real-time Portfolio Tracking</p>
              <p className="text-sm text-muted-foreground">Monitor your investments 24/7</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border/50 hover:border-border transition-colors">
            <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="size-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Transparent Distribution Reports</p>
              <p className="text-sm text-muted-foreground">Clear insights into your returns</p>
            </div>
          </div>
        </div>

        {/* Decorative lines */}
        <div className="absolute bottom-20 right-20 w-32 h-px bg-border/50" />
        <div className="absolute bottom-24 right-16 w-20 h-px bg-border/30" />
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-12 py-12 bg-background">
        <LoginForm />
      </div>
    </div>
  );
}
