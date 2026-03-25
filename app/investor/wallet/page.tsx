'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Modal } from '@/components/shared/modal';
import { CurrencyDisplay } from '@/components/shared/currency-display';
import { DateDisplay } from '@/components/shared/date-display';
import {
  Wallet, Copy, ExternalLink, Link2, Unlink, Coins, ArrowUpRight,
  CheckCircle, AlertCircle, Shield, QrCode, RefreshCw
} from 'lucide-react';

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
  { id: 1, type: 'received', token: 'MHT', amount: 5000, from: 'StreamFi Treasury', date: '2026-01-15', tx: '5Kp9QmNvR2tX8wZ5yB3cF6dG...' },
  { id: 2, type: 'received', token: 'LD', amount: 1500, from: 'StreamFi Treasury', date: '2025-11-20', tx: '7Bt8RpLxM2nQ5vX9zA1cE4fG...' },
  { id: 3, type: 'distribution', token: 'SOL', amount: 0.25, from: 'Midnight Heist Distribution', date: '2026-03-20', tx: '3Df8GhJkLmN6pQ2rS5tV8wX...' },
];

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
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>
        <p className="text-muted-foreground mt-1">Manage your Solana wallet and token holdings</p>
      </div>

      {/* Wallet Card */}
      <Card className="border border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <Wallet className="size-5" />
              Solana Wallet
            </CardTitle>
            <CardDescription>Your blockchain wallet for receiving tokens and distributions</CardDescription>
          </div>
          <Badge className="bg-green-600">Connected</Badge>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {/* Address */}
            <div className="flex items-center justify-between p-4 bg-card rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Wallet Address</p>
                <code className="text-sm font-mono">{truncateAddress(walletData.address)}</code>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  {copied ? <CheckCircle className="size-4 text-green-600" /> : <Copy className="size-4" />}
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={`https://explorer.solana.com/address/${walletData.address}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Network Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Network</p>
                <p className="font-semibold">{walletData.network}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Connected Since</p>
                <p className="font-semibold"><DateDisplay date={walletData.connectedAt} /></p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowConnectModal(true)}>
                <Link2 className="size-4 mr-2" />
                Change Wallet
              </Button>
              <Button variant="outline">
                <QrCode className="size-4 mr-2" />
                Show QR Code
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Token Holdings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Coins className="size-4" />
              <span className="text-sm font-medium">Total Token Value</span>
            </div>
            <p className="text-2xl font-bold"><CurrencyDisplay amount={totalTokenValue} /></p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Wallet className="size-4" />
              <span className="text-sm font-medium">Token Types</span>
            </div>
            <p className="text-2xl font-bold">{tokenHoldings.length}</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Shield className="size-4" />
              <span className="text-sm font-medium">Security Status</span>
            </div>
            <p className="text-2xl font-bold text-green-600">Verified</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="holdings" className="w-full">
        <TabsList>
          <TabsTrigger value="holdings">Token Holdings</TabsTrigger>
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
        </TabsList>

        <TabsContent value="holdings" className="mt-4">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-base">Your Tokens</CardTitle>
              <CardDescription>Investment tokens held in your wallet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold">Deal</th>
                      <th className="text-left py-3 px-4 font-semibold">Symbol</th>
                      <th className="text-left py-3 px-4 font-semibold">Tokens</th>
                      <th className="text-left py-3 px-4 font-semibold">Unit Price</th>
                      <th className="text-left py-3 px-4 font-semibold">Value</th>
                      <th className="text-left py-3 px-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokenHoldings.map((token) => (
                      <tr key={token.id} className="border-b border-border/50 hover:bg-card">
                        <td className="py-4 px-4 font-semibold">{token.deal}</td>
                        <td className="py-4 px-4">
                          <Badge variant="outline">{token.symbol}</Badge>
                        </td>
                        <td className="py-4 px-4">{token.tokens.toLocaleString()}</td>
                        <td className="py-4 px-4"><CurrencyDisplay amount={token.unitPrice} /></td>
                        <td className="py-4 px-4 font-semibold"><CurrencyDisplay amount={token.value} /></td>
                        <td className="py-4 px-4">
                          <Button variant="ghost" size="sm" asChild>
                            <a href={`https://explorer.solana.com/address/${walletData.address}`} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="size-4" />
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

        <TabsContent value="transactions" className="mt-4">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-base">Transaction History</CardTitle>
              <CardDescription>All token transactions for your wallet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold">Type</th>
                      <th className="text-left py-3 px-4 font-semibold">Token</th>
                      <th className="text-left py-3 px-4 font-semibold">Amount</th>
                      <th className="text-left py-3 px-4 font-semibold">From</th>
                      <th className="text-left py-3 px-4 font-semibold">Date</th>
                      <th className="text-left py-3 px-4 font-semibold">TX</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionHistory.map((tx) => (
                      <tr key={tx.id} className="border-b border-border/50 hover:bg-card">
                        <td className="py-4 px-4">
                          <Badge variant={tx.type === 'distribution' ? 'default' : 'secondary'}>
                            {tx.type}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline">{tx.token}</Badge>
                        </td>
                        <td className="py-4 px-4 font-semibold text-green-600">
                          +{tx.amount.toLocaleString()} {tx.token}
                        </td>
                        <td className="py-4 px-4 text-muted-foreground">{tx.from}</td>
                        <td className="py-4 px-4"><DateDisplay date={tx.date} /></td>
                        <td className="py-4 px-4">
                          <code className="text-xs bg-muted px-2 py-1 rounded">{tx.tx.slice(0, 20)}...</code>
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

      {/* Connect Wallet Modal */}
      <Modal
        isOpen={showConnectModal}
        onClose={() => setShowConnectModal(false)}
        title="Connect Wallet"
        subtitle="Link your Solana wallet to receive tokens"
        size="md"
      >
        <div className="flex flex-col gap-4">
          <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200 dark:border-yellow-900">
            <div className="flex gap-2">
              <AlertCircle className="size-5 text-yellow-600 flex-shrink-0" />
              <div>
                <p className="font-medium text-yellow-900 dark:text-yellow-300">Important</p>
                <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                  Changing your wallet will disconnect the current wallet. Make sure you have access to the new wallet before proceeding.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Button className="w-full justify-start h-14" variant="outline">
              <img src="https://phantom.app/img/phantom-logo.svg" alt="Phantom" className="size-6 mr-3" />
              Connect Phantom
            </Button>
            <Button className="w-full justify-start h-14" variant="outline">
              <img src="https://solana.com/img/solana-logo.svg" alt="Solflare" className="size-6 mr-3" />
              Connect Solflare
            </Button>
            <Button className="w-full justify-start h-14" variant="outline">
              <QrCode className="size-6 mr-3 text-muted-foreground" />
              Enter Address Manually
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}