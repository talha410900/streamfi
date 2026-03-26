import { cn } from '@/lib/utils';

/** Compact spacing for admin dashboard (matches investor dashboard density). */
export const adminDensity = {
  page: 'flex flex-col gap-5',
  pageTight: 'flex flex-col gap-4',
  grid: 'grid gap-3 sm:gap-4',
  gridLoose: 'grid gap-4 lg:gap-5',
  card: 'gap-4 py-4 shadow-none',
  cardHeader: 'border-border px-4 pb-3 pt-0 [.border-b]:pb-3',
  cardContent: 'px-4',
  cardContentSection: 'px-4 pt-3',
  tableCell: 'px-3 py-2.5',
  tableHead: 'px-3 py-2',
} as const;

export function adminCardClass(...extra: (string | undefined)[]) {
  return cn('border-border', adminDensity.card, ...extra);
}
