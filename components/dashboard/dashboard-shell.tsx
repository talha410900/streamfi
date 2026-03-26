import { cn } from '@/lib/utils';

type DashboardShellProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Constrains main dashboard content to a readable width with consistent horizontal padding.
 */
export function DashboardShell({ children, className }: DashboardShellProps) {
  return (
    <div
      className={cn(
        'mx-auto flex w-full max-w-[1600px] flex-col gap-8 px-1 sm:px-0',
        className,
      )}
    >
      {children}
    </div>
  );
}
