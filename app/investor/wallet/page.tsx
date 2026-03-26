'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Modal } from '@/components/shared/modal';
import { CurrencyDisplay } from '@/components/shared/currency-display';
import { DateDisplay } from '@/components/shared/date-display';
import {
  Wallet,
  Copy,
  ExternalLink,
  Link2,
  Coins,
  CheckCircle,
  AlertCircle,
  Shield,
  QrCode,
} from 'lucide-react';
import { DashboardPageHeader } from '@/components/shared/dashboard-page-header';
import { cn } from '@/lib/utils';
import {
  investorDensity,
  investorCardClass,
} from '@/components/investor/investor-density';

const walletData = {
  address: '9B5X7kKQz1j4mL2pN8r5sT6vX9y2w4z6B1c3d5f7h9jK3mN5',
  network: 'Solana',
  connected: true,
  connectedAt: '2026-02-01',
};

const tokenHoldings = [
  { id: 1, deal: 'Midnight Heist', symbol: 'MHT', tokens: 5000, value: 50000, unitPrice: 10 },
  { id: 2, deal: 'Last Dance', symbol: 'LD', tokens: 1500, value: 75000, unitPrice: 50 },
];

const transactionHistory = [
  { id: 1, type: 'received', token: 'MHT', amount: 5000, from: 'StreamFi Ventures Treasury', date: '2026-01-15', tx: '5Kp9QmNvR2tX8wZ5yB3cF6dG...' },
  { id: 2, type: 'received', token: 'LD', amount: 1500, from: 'StreamFi Ventures Treasury', date: '2025-11-20', tx: '7Bt8RpLxM2nQ5vX9zA1cE4fG...' },
  { id: 3, type: 'distribution', token: 'SOL', amount: 0.25, from: 'Midnight Heist Distribution', date: '2026-03-20', tx: '3Df8GhJkLmN6pQ2rS5tV8wX...' },
];

function txTypeLabel(type: string) {
  if (type === 'distribution') return 'Distribution';
  return 'Received';
}

export default function InvestorWalletPage() {
  const [copied, setCopied] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(walletData.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 8)}...${addr.slice(-8)}`;
  };

  const totalTokenValue = tokenHoldings.reduce((sum, t) => sum + t.value, 0);

  return (
    <div className={investorDensity.page}>
      <DashboardPageHeader
        title="Wallet"
        description="Solana address, token balances, and on-chain activity tied to your account."
      />

      <Card className={investorCardClass()}>
        <CardHeader
          className={cn(
            'flex flex-row flex-wrap items-start justify-between gap-3',
            investorDensity.cardHeader,
          )}
        >
          <div className="flex flex-col gap-0.5">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Wallet className="size-4 text-muted-foreground" />
              Solana wallet
            </CardTitle>
            <CardDescription>Receive SPL units and distribution proceeds</CardDescription>
          </div>
          <Badge variant="default" className="shrink-0">
            Connected
          </Badge>
        </CardHeader>
        <CardContent className={investorDensity.cardContentSection}>
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col gap-2 rounded-lg border border-border/80 bg-muted/30 p-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="mb-0.5 text-xs text-muted-foreground">Wallet address</p>
                <code className="block truncate text-sm font-mono">{truncateAddress(walletData.address)}</code>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy} className="h-8">
                  {copied ? <CheckCircle className="size-3.5 text-chart-1" /> : <Copy className="size-3.5" />}
                  <span className="ml-1.5 hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
                </Button>
                <Button variant="outline" size="sm" className="h-8 px-2.5" asChild>
                  <a
                    href={`https://explorer.solana.com/address/${walletData.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View on explorer"
                  >
                    <ExternalLink className="size-3.5" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Network</p>
                <p className="text-sm font-semibold">{walletData.network}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Connected since</p>
                <p className="text-sm font-semibold">
                  <DateDisplay date={walletData.connectedAt} />
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 border-t border-border/60 pt-2.5">
              <Button variant="outline" size="sm" onClick={() => setShowConnectModal(true)}>
                <Link2 className="mr-1.5 size-3.5" />
                Change wallet
              </Button>
              <Button variant="outline" size="sm">
                <QrCode className="mr-1.5 size-3.5" />
                Show QR
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
        <Card className={investorCardClass()}>
          <CardContent className={cn('flex flex-col gap-2 pt-4', investorDensity.cardContent)}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Coins className="size-4 shrink-0" />
              <span className="text-xs font-medium uppercase tracking-wide">Total token value</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums">
              <CurrencyDisplay amount={totalTokenValue} />
            </p>
            <p className="text-xs text-muted-foreground">Across positions</p>
          </CardContent>
        </Card>
        <Card className={investorCardClass()}>
          <CardContent className={cn('flex flex-col gap-2 pt-4', investorDensity.cardContent)}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Wallet className="size-4 shrink-0" />
              <span className="text-xs font-medium uppercase tracking-wide">Token types</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums">{tokenHoldings.length}</p>
            <p className="text-xs text-muted-foreground">SPL positions</p>
          </CardContent>
        </Card>
        <Card className={investorCardClass()}>
          <CardContent className={cn('flex flex-col gap-2 pt-4', investorDensity.cardContent)}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="size-4 shrink-0" />
              <span className="text-xs font-medium uppercase tracking-wide">Security</span>
            </div>
            <p className="text-2xl font-semibold text-chart-1">Verified</p>
            <p className="text-xs text-muted-foreground">Wallet linked</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="holdings" className="w-full">
        <TabsList className="h-9">
          <TabsTrigger value="holdings" className="text-xs sm:text-sm">
            Token holdings
          </TabsTrigger>
          <TabsTrigger value="transactions" className="text-xs sm:text-sm">
            Transaction history
          </TabsTrigger>
        </TabsList>

        <TabsContent value="holdings" className="mt-3">
          <Card className={investorCardClass()}>
            <CardHeader className={investorDensity.cardHeader}>
              <CardTitle className="text-base">Your tokens</CardTitle>
              <CardDescription>Investment tokens in your wallet</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      <th className={cn('text-left font-semibold', investorDensity.tableHead)}>Deal</th>
                      <th className={cn('text-left font-semibold', investorDensity.tableHead)}>Symbol</th>
                      <th className={cn('text-left font-semibold', investorDensity.tableHead)}>Tokens</th>
                      <th className={cn('text-left font-semibold', investorDensity.tableHead)}>Unit price</th>
                      <th className={cn('text-left font-semibold', investorDensity.tableHead)}>Value</th>
                      <th className={cn('text-right font-semibold', investorDensity.tableHead)}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokenHoldings.map((token) => (
                      <tr key={token.id} className="border-b border-border/50 transition-colors hover:bg-muted/40">
                        <td className={cn('font-semibold', investorDensity.tableCell)}>{token.deal}</td>
                        <td className={investorDensity.tableCell}>
                          <Badge variant="outline" className="font-mono text-xs">
                            {token.symbol}
                          </Badge>
                        </td>
                        <td className={cn('tabular-nums', investorDensity.tableCell)}>
                          {token.tokens.toLocaleString()}
                        </td>
                        <td className={cn('tabular-nums', investorDensity.tableCell)}>
                          <CurrencyDisplay amount={token.unitPrice} />
                        </td>
                        <td className={cn('font-semibold tabular-nums', investorDensity.tableCell)}>
                          <CurrencyDisplay amount={token.value} />
                        </td>
                        <td className={cn('text-right', investorDensity.tableCell)}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                            <a
                              href={`https://explorer.solana.com/address/${walletData.address}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="size-3.5" />
                            </a>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="mt-3">
          <Card className={investorCardClass()}>
            <CardHeader className={investorDensity.cardHeader}>
              <CardTitle className="text-base">Transaction history</CardTitle>
              <CardDescription>Token activity for this wallet</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      <th className={cn('text-left font-semibold', investorDensity.tableHead)}>Type</th>
                      <th className={cn('text-left font-semibold', investorDensity.tableHead)}>Token</th>
                      <th className={cn('text-left font-semibold', investorDensity.tableHead)}>Amount</th>
                      <th className={cn('text-left font-semibold', investorDensity.tableHead)}>From</th>
                      <th className={cn('text-left font-semibold', investorDensity.tableHead)}>Date</th>
                      <th className={cn('text-left font-semibold', investorDensity.tableHead)}>TX</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionHistory.map((tx) => (
                      <tr key={tx.id} className="border-b border-border/50 transition-colors hover:bg-muted/40">
                        <td className={investorDensity.tableCell}>
                          <Badge variant={tx.type === 'distribution' ? 'default' : 'secondary'} className="text-xs">
                            {txTypeLabel(tx.type)}
                          </Badge>
                        </td>
                        <td className={investorDensity.tableCell}>
                          <Badge variant="outline" className="font-mono text-xs">
                            {tx.token}
                          </Badge>
                        </td>
                        <td className={cn('font-semibold tabular-nums text-chart-1', investorDensity.tableCell)}>
                          +{tx.amount.toLocaleString()} {tx.token}
                        </td>
                        <td className={cn('max-w-50 truncate text-muted-foreground', investorDensity.tableCell)}>
                          {tx.from}
                        </td>
                        <td className={investorDensity.tableCell}>
                          <DateDisplay date={tx.date} />
                        </td>
                        <td className={investorDensity.tableCell}>
                          <code className="rounded bg-muted px-1.5 py-0.5 text-[11px] leading-tight">
                            {tx.tx.slice(0, 18)}…
                          </code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Modal
        isOpen={showConnectModal}
        onClose={() => setShowConnectModal(false)}
        title="Connect wallet"
        subtitle="Link a Solana wallet to receive tokens"
        size="md"
      >
        <div className="flex flex-col gap-3">
          <div className="rounded-lg border border-yellow-200/80 bg-yellow-50 p-3 dark:border-yellow-900 dark:bg-yellow-950/30">
            <div className="flex gap-2">
              <AlertCircle className="size-4 shrink-0 text-yellow-600 dark:text-yellow-500" />
              <div>
                <p className="text-sm font-medium text-yellow-900 dark:text-yellow-200">Before you switch</p>
                <p className="mt-1 text-xs leading-relaxed text-yellow-800/90 dark:text-yellow-400/95">
                  Changing wallets disconnects the current one. Confirm you control the new address.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button className="h-10 justify-start gap-3 px-3" variant="outline" type="button">
              <img src="https://phantom.app/img/phantom-logo.svg" alt="" className="size-5" />
              <span className="text-sm font-medium">Phantom</span>
            </Button>
            <Button className="h-10 justify-start gap-3 px-3" variant="outline" type="button">
              <img src="https://solana.com/img/solana-logo.svg" alt="" className="size-5" />
              <span className="text-sm font-medium">Solflare</span>
            </Button>
            <Button className="h-10 justify-start gap-3 px-3" variant="outline" type="button">
              <QrCode className="size-5 text-muted-foreground" />
              <span className="text-sm font-medium">Enter address manually</span>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
