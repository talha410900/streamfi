/** Design-time types and fixtures for investor deal surfaces */

export type DealStatus = 'open' | 'funded' | 'draft' | 'closed';

export type Deal = {
  id: string;
  showName: string;
  genre: string;
  logline: string;
  dealStatus: DealStatus;
  amountRaised: number;
  raiseTarget: number;
  investorCount: number;
  revenueSharePercent: number;
  pricePerUnit: number;
};

export function formatUSD(amount: number, compact = false): string {
  if (compact && amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (compact && amount >= 1_000) {
    return `$${(amount / 1_000).toFixed(0)}K`;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Sample deals aligned with `/investor/deals/[id]` mock keys */
export const investorOpenDeals: Deal[] = [
  {
    id: '1',
    showName: 'Midnight Heist',
    genre: 'Action',
    logline:
      'An action-packed thriller following a team of elite thieves who discover their latest heist has unintended consequences.',
    dealStatus: 'open',
    amountRaised: 320_000,
    raiseTarget: 500_000,
    investorCount: 12,
    revenueSharePercent: 15,
    pricePerUnit: 10,
  },
  {
    id: '2',
    showName: 'Neon Horizons',
    genre: 'Sci-Fi',
    logline:
      'A sci-fi thriller following a rogue AI developer who discovers her creation has evolved beyond her control.',
    dealStatus: 'open',
    amountRaised: 2_340_000,
    raiseTarget: 3_000_000,
    investorCount: 47,
    revenueSharePercent: 20,
    pricePerUnit: 100,
  },
  {
    id: '4',
    showName: 'Crimson Table',
    genre: 'Reality',
    logline:
      'A culinary competition series where top chefs battle using mystery ingredients from around the world.',
    dealStatus: 'open',
    amountRaised: 675_000,
    raiseTarget: 1_500_000,
    investorCount: 22,
    revenueSharePercent: 30,
    pricePerUnit: 100,
  },
];
