'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  Coins,
  DollarSign,
  Share2,
  FileText,
  Settings,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { logoutUser } from '@/lib/auth';

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: TrendingUp, label: 'Deals', href: '/admin/deals' },
    { icon: Users, label: 'Investors', href: '/admin/investors' },
    { icon: Coins, label: 'Tokens', href: '/admin/tokens' },
    { icon: DollarSign, label: 'Revenue', href: '/admin/revenue' },
    { icon: Share2, label: 'Distributions', href: '/admin/distributions' },
    { icon: FileText, label: 'Documents', href: '/admin/documents' },
    { icon: FileText, label: 'Tax Documents', href: '/admin/tax-documents' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  const handleLogout = async () => {
    await logoutUser();
    router.push('/login');
  };

  return (
    <aside className="w-64 bg-sidebar border-r border-border h-screen flex flex-col">
      {/* Header */}
      <div className="border-b border-border px-6 py-5">
        <Link href="/admin/dashboard" className="flex items-center gap-2.5 group">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-primary-foreground font-bold text-xs">SF</span>
          </div>
          <span className="font-semibold text-sm text-foreground">StreamFi</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 flex flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'text-sidebar-foreground hover:bg-muted'
                }`}
              >
                <Icon className="size-4 flex-shrink-0" />
                <span className="text-sm">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-3 flex flex-col gap-2">
        <ThemeToggle />
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sidebar-foreground hover:bg-muted transition-colors text-sm"
        >
          <LogOut className="size-4 flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
