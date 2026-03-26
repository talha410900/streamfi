import { cn } from '@/lib/utils';

/** Compact spacing tokens for investor dashboard (tighter than default shadcn Card py-6 / gap-6). */
export const investorDensity = {
  page: 'flex flex-col gap-5',
  pageTight: 'flex flex-col gap-4',
  grid: 'grid gap-3 sm:gap-4',
  gridLoose: 'grid gap-4 lg:gap-5',
  /** Overrides Card default gap-6 py-6 */
  card: 'gap-4 py-4 shadow-none',
  cardHeader: 'border-border px-4 pb-3 pt-0 [.border-b]:pb-3',
  cardContent: 'px-4',
  cardContentSection: 'px-4 pt-3',
  tableCell: 'px-3 py-2.5',
  tableHead: 'px-3 py-2',
} as const;

export function investorCardClass(extra?: string) {
  return cn('border-border', investorDensity.card, extra);
}
