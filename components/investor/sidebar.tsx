'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  PieChart,
  ShoppingBag,
  FolderOpen,
  Share2,
  FileSpreadsheet,
  Wallet,
  LogOut,
} from 'lucide-react';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { logoutUser } from '@/lib/auth';

export function InvestorSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { icon: PieChart, label: 'Portfolio', href: '/investor/dashboard' },
    { icon: ShoppingBag, label: 'Open Deals', href: '/investor/deals' },
    { icon: FolderOpen, label: 'My Documents', href: '/investor/documents' },
    { icon: Share2, label: 'Distributions', href: '/investor/distributions' },
    { icon: FileSpreadsheet, label: 'Tax Documents', href: '/investor/tax-documents' },
    { icon: Wallet, label: 'Account / Wallet', href: '/investor/wallet' },
  ];

  const handleLogout = async () => {
    await logoutUser();
    router.push('/login');
  };

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-border bg-sidebar">
      <div className="border-b border-border px-6 py-5">
        <Link href="/investor/dashboard" className="group flex items-center gap-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">SF</span>
          </div>
          <span className="font-semibold text-foreground">StreamFi Ventures</span>
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
