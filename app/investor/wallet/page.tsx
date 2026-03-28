'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import { Modal } from '@/components/shared/modal';
import { CurrencyDisplay } from '@/components/shared/currency-display';
import { DateDisplay } from '@/components/shared/date-display';
import {
  Wallet, Copy, ExternalLink, Link2, Coins, CheckCircle,
  AlertCircle, Shield, QrCode, User, Mail, Phone, MapPin,
  Bell, Lock, Settings,
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

const profileData = {
  name: 'John Investor',
  email: 'john.investor@email.com',
  phone: '+1 (555) 123-4567',
  address: '123 Main St, New York, NY 10001',
  accreditationStatus: 'verified',
  kycStatus: 'verified',
  joinDate: '2026-01-08',
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

export default function InvestorAccountWalletPage() {
  const [copied, setCopied] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(walletData.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const truncateAddress = (addr: string) => `${addr.slice(0, 8)}...${addr.slice(-8)}`;
  const totalTokenValue = tokenHoldings.reduce((sum, t) => sum + t.value, 0);

  return (
    <div className={investorDensity.page}>
      <DashboardPageHeader
        title="Account / Wallet"
        description="Profile, wallet connection, token balances, and account preferences."
      />

      <Tabs defaultValue="wallet" className="w-full">
        <TabsList>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        {/* Wallet Tab */}
        <TabsContent value="wallet" className="mt-3">
          <div className="flex flex-col gap-4">
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
                    Solana Wallet
                  </CardTitle>
                  <CardDescription>Receive SPL tokens and distribution proceeds</CardDescription>
                </div>
                <Badge variant="default" className="shrink-0">Connected</Badge>
              </CardHeader>
              <CardContent className={investorDensity.cardContentSection}>
                <div className="flex flex-col gap-2.5">
                  <div className="flex flex-col gap-2 rounded-lg border border-border/80 bg-muted/30 p-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="mb-0.5 text-xs text-muted-foreground">Wallet Address</p>
                      <code className="block truncate font-mono text-sm">{truncateAddress(walletData.address)}</code>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <Button variant="outline" size="sm" onClick={handleCopy} className="h-8">
                        {copied ? <CheckCircle className="size-3.5 text-chart-1" /> : <Copy className="size-3.5" />}
                        <span className="ml-1.5 hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 px-2.5" asChild>
                        <a href={`https://explorer.solana.com/address/${walletData.address}`} target="_blank" rel="noopener noreferrer">
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
                      <p className="text-xs text-muted-foreground">Connected Since</p>
                      <p className="text-sm font-semibold"><DateDisplay date={walletData.connectedAt} /></p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 border-t border-border/60 pt-2.5">
                    <Button variant="outline" size="sm" onClick={() => setShowConnectModal(true)}>
                      <Link2 className="mr-1.5 size-3.5" />
                      Change Wallet
                    </Button>
                    <Button variant="outline" size="sm">
                      <QrCode className="mr-1.5 size-3.5" />
                      Show QR
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Token Holdings */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
              <Card className={investorCardClass()}>
                <CardContent className={cn('flex flex-col gap-2 pt-4', investorDensity.cardContent)}>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Coins className="size-4 shrink-0" />
                    <span className="text-xs font-medium uppercase tracking-wide">Total Value</span>
                  </div>
                  <p className="text-2xl font-semibold tabular-nums"><CurrencyDisplay amount={totalTokenValue} /></p>
                </CardContent>
              </Card>
              <Card className={investorCardClass()}>
                <CardContent className={cn('flex flex-col gap-2 pt-4', investorDensity.cardContent)}>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Wallet className="size-4 shrink-0" />
                    <span className="text-xs font-medium uppercase tracking-wide">Token Types</span>
                  </div>
                  <p className="text-2xl font-semibold tabular-nums">{tokenHoldings.length}</p>
                </CardContent>
              </Card>
              <Card className={investorCardClass()}>
                <CardContent className={cn('flex flex-col gap-2 pt-4', investorDensity.cardContent)}>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Shield className="size-4 shrink-0" />
                    <span className="text-xs font-medium uppercase tracking-wide">Security</span>
                  </div>
                  <p className="text-2xl font-semibold text-chart-1">Verified</p>
                </CardContent>
              </Card>
            </div>

            {/* Holdings Table */}
            <Card className={investorCardClass()}>
              <CardHeader className={investorDensity.cardHeader}>
                <CardTitle className="text-base">Token Holdings</CardTitle>
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
                        <th className={cn('text-left font-semibold', investorDensity.tableHead)}>Unit Price</th>
                        <th className={cn('text-left font-semibold', investorDensity.tableHead)}>Value</th>
                        <th className={cn('text-right font-semibold', investorDensity.tableHead)}>Explorer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tokenHoldings.map((token) => (
                        <tr key={token.id} className="border-b border-border/50 hover:bg-muted/40">
                          <td className={cn('font-semibold', investorDensity.tableCell)}>{token.deal}</td>
                          <td className={investorDensity.tableCell}>
                            <Badge variant="outline" className="font-mono text-xs">{token.symbol}</Badge>
                          </td>
                          <td className={cn('tabular-nums', investorDensity.tableCell)}>{token.tokens.toLocaleString()}</td>
                          <td className={cn('tabular-nums', investorDensity.tableCell)}><CurrencyDisplay amount={token.unitPrice} /></td>
                          <td className={cn('font-semibold tabular-nums', investorDensity.tableCell)}><CurrencyDisplay amount={token.value} /></td>
                          <td className={cn('text-right', investorDensity.tableCell)}>
                            <Button variant="ghost" size="sm" className="size-8 p-0" asChild>
                              <a href={`https://explorer.solana.com/address/${walletData.address}`} target="_blank" rel="noopener noreferrer">
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

            {/* Transaction History */}
            <Card className={investorCardClass()}>
              <CardHeader className={investorDensity.cardHeader}>
                <CardTitle className="text-base">Transaction History</CardTitle>
                <CardDescription>On-chain activity for this wallet</CardDescription>
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
                        <tr key={tx.id} className="border-b border-border/50 hover:bg-muted/40">
                          <td className={investorDensity.tableCell}>
                            <Badge variant={tx.type === 'distribution' ? 'default' : 'secondary'} className="text-xs">
                              {tx.type === 'distribution' ? 'Distribution' : 'Received'}
                            </Badge>
                          </td>
                          <td className={investorDensity.tableCell}>
                            <Badge variant="outline" className="font-mono text-xs">{tx.token}</Badge>
                          </td>
                          <td className={cn('font-semibold tabular-nums text-chart-1', investorDensity.tableCell)}>
                            +{tx.amount.toLocaleString()} {tx.token}
                          </td>
                          <td className={cn('max-w-50 truncate text-muted-foreground', investorDensity.tableCell)}>{tx.from}</td>
                          <td className={investorDensity.tableCell}><DateDisplay date={tx.date} /></td>
                          <td className={investorDensity.tableCell}>
                            <code className="rounded bg-muted px-1.5 py-0.5 text-[11px]">{tx.tx.slice(0, 18)}...</code>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="mt-3">
          <Card className={investorCardClass()}>
            <CardHeader className={investorDensity.cardHeader}>
              <CardTitle className="text-base">Profile Information</CardTitle>
              <CardDescription>Your personal and verification details</CardDescription>
            </CardHeader>
            <CardContent className={cn('flex flex-col gap-4', investorDensity.cardContent)}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FieldGroup>
                  <FieldLabel className="flex items-center gap-2">
                    <User className="size-3.5" />
                    Full Name
                  </FieldLabel>
                  <Input defaultValue={profileData.name} />
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel className="flex items-center gap-2">
                    <Mail className="size-3.5" />
                    Email Address
                  </FieldLabel>
                  <Input defaultValue={profileData.email} type="email" />
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel className="flex items-center gap-2">
                    <Phone className="size-3.5" />
                    Phone Number
                  </FieldLabel>
                  <Input defaultValue={profileData.phone} />
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel className="flex items-center gap-2">
                    <MapPin className="size-3.5" />
                    Address
                  </FieldLabel>
                  <Input defaultValue={profileData.address} />
                </FieldGroup>
              </div>

              <div className="grid grid-cols-1 gap-3 rounded-lg border border-border bg-muted/30 p-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs text-muted-foreground">KYC Status</p>
                  <Badge variant="default" className="mt-1">Verified</Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Accreditation</p>
                  <Badge variant="default" className="mt-1">Verified</Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Member Since</p>
                  <p className="mt-1 text-sm font-medium"><DateDisplay date={profileData.joinDate} /></p>
                </div>
              </div>

              <Button className="w-fit">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="mt-3">
          <div className="flex flex-col gap-4">
            <Card className={investorCardClass()}>
              <CardHeader className={investorDensity.cardHeader}>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Lock className="size-4" />
                  Password
                </CardTitle>
              </CardHeader>
              <CardContent className={cn('flex flex-col gap-4', investorDensity.cardContent)}>
                <FieldGroup>
                  <FieldLabel>Current Password</FieldLabel>
                  <Input type="password" placeholder="Enter current password" />
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel>New Password</FieldLabel>
                  <Input type="password" placeholder="Enter new password" />
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel>Confirm New Password</FieldLabel>
                  <Input type="password" placeholder="Confirm new password" />
                </FieldGroup>
                <Button className="w-fit">Update Password</Button>
              </CardContent>
            </Card>

            <Card className={investorCardClass()}>
              <CardHeader className={investorDensity.cardHeader}>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Shield className="size-4" />
                  Two-Factor Authentication
                </CardTitle>
              </CardHeader>
              <CardContent className={investorDensity.cardContent}>
                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <p className="text-sm font-medium">2FA via Authenticator App</p>
                    <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="mt-3">
          <Card className={investorCardClass()}>
            <CardHeader className={investorDensity.cardHeader}>
              <CardTitle className="flex items-center gap-2 text-base">
                <Bell className="size-4" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className={investorDensity.cardContent}>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Distribution payments', desc: 'When revenue distributions are sent to your wallet' },
                  { label: 'Deal updates', desc: 'Production milestones and progress reports' },
                  { label: 'New deals', desc: 'When new investment opportunities are posted' },
                  { label: 'Tax documents', desc: 'When K-1 statements are available' },
                  { label: 'Account security', desc: 'Login attempts and security alerts' },
                ].map((pref) => (
                  <div key={pref.label} className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
                    <div>
                      <p className="text-sm font-medium">{pref.label}</p>
                      <p className="text-xs text-muted-foreground">{pref.desc}</p>
                    </div>
                    <input type="checkbox" defaultChecked className="size-4 rounded border-border" />
                  </div>
                ))}
              </div>
              <Button className="mt-4 w-fit">Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Connect Wallet Modal */}
      <Modal
        isOpen={showConnectModal}
        onClose={() => setShowConnectModal(false)}
        title="Connect Wallet"
        subtitle="Link a Solana wallet to receive tokens"
        size="md"
      >
        <div className="flex flex-col gap-3">
          <div className="rounded-lg border border-yellow-200/80 bg-yellow-50 p-3 dark:border-yellow-900 dark:bg-yellow-950/30">
            <div className="flex gap-2">
              <AlertCircle className="size-4 shrink-0 text-yellow-600 dark:text-yellow-500" />
              <div>
                <p className="text-sm font-medium text-yellow-900 dark:text-yellow-200">Before you switch</p>
                <p className="mt-1 text-xs text-yellow-800/90 dark:text-yellow-400/95">
                  Changing wallets disconnects the current one. Confirm you control the new address.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button className="h-10 justify-start gap-3 px-3" variant="outline" type="button">
              <Wallet className="size-5 text-muted-foreground" />
              <span className="text-sm font-medium">Phantom</span>
            </Button>
            <Button className="h-10 justify-start gap-3 px-3" variant="outline" type="button">
              <Wallet className="size-5 text-muted-foreground" />
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
