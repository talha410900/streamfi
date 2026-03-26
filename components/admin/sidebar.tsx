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
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-border bg-sidebar">
      <div className="border-b border-border px-6 py-5">
        <Link href="/admin/dashboard" className="group flex items-center gap-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary">
            <span className="text-xs font-bold text-primary-foreground">SF</span>
          </div>
          <span className="text-sm font-semibold text-foreground">
            StreamFi Ventures
          </span>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center gap-3 rounded-lg px-4 py-2.5 transition-all ${
                  isActive
                    ? 'bg-primary font-medium text-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-muted'
                }`}
              >
                <Icon className="size-4 shrink-0" />
                <span className="text-sm">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-2 border-t border-border p-3">
        <ThemeToggle />
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-sidebar-foreground transition-colors hover:bg-muted"
        >
          <LogOut className="size-4 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
