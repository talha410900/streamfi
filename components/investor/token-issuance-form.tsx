'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import { Badge } from '@/components/ui/badge';
import { Coins, Wallet, CheckCircle, ExternalLink, Copy, ArrowRight } from 'lucide-react';

interface TokenIssuanceFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export function TokenIssuanceForm({ onSubmit, isLoading }: TokenIssuanceFormProps) {
  const [walletAddress, setWalletAddress] = useState('');
  const [walletConnected, setWalletConnected] = useState(false);
  const [copied, setCopied] = useState(false);

  const mockTokenDetails = {
    symbol: 'MHT',
    name: 'Midnight Heist Token',
    amount: 5000,
    deal: 'Midnight Heist',
    network: 'Solana',
  };

  const handleConnectWallet = () => {
    setWalletAddress('9B5X7kKQz1j4mL2pN8r5sT6vX9y2w4z6B1c3d5f7h9jK3mN5');
    setWalletConnected(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletConnected) {
      alert('Please connect your wallet first');
      return;
    }
    onSubmit({ walletAddress, tokenSymbol: mockTokenDetails.symbol });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Coins className="size-5" />
            Token Issuance
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <p className="mb-3 text-sm font-semibold">Your Token Allocation</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Token</p>
                <p className="font-semibold">{mockTokenDetails.name}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Symbol</p>
                <Badge variant="outline" className="font-mono">{mockTokenDetails.symbol}</Badge>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Units</p>
                <p className="text-lg font-bold">{mockTokenDetails.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Network</p>
                <p className="font-semibold">{mockTokenDetails.network}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <FieldLabel>Solana Wallet</FieldLabel>
            {!walletConnected ? (
              <div className="flex flex-col gap-2">
                <Button type="button" variant="outline" onClick={handleConnectWallet} className="w-full gap-2">
                  <Wallet className="size-4" />
                  Connect Phantom Wallet
                </Button>
                <p className="text-center text-xs text-muted-foreground">or</p>
                <FieldGroup>
                  <Input
                    placeholder="Enter Solana wallet address manually"
                    value={walletAddress}
                    onChange={(e) => {
                      setWalletAddress(e.target.value);
                      setWalletConnected(e.target.value.length > 20);
                    }}
                    disabled={isLoading}
                  />
                </FieldGroup>
              </div>
            ) : (
              <div className="rounded-lg border border-border bg-muted/30 p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-chart-1" />
                    <span className="text-sm font-medium">Wallet Connected</span>
                  </div>
                  <div className="flex gap-1">
                    <Button type="button" variant="ghost" size="sm" onClick={handleCopy} className="h-7 px-2">
                      {copied ? <CheckCircle className="size-3 text-chart-1" /> : <Copy className="size-3" />}
                    </Button>
                    <Button type="button" variant="ghost" size="sm" className="h-7 px-2" asChild>
                      <a href={`https://explorer.solana.com/address/${walletAddress}`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="size-3" />
                      </a>
                    </Button>
                  </div>
                </div>
                <code className="mt-1 block truncate text-xs text-muted-foreground">{walletAddress}</code>
              </div>
            )}
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <p className="mb-2 text-sm font-semibold">What happens next?</p>
            <ol className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">1</span>
                Your funding is verified by StreamFi
              </li>
              <li className="flex items-start gap-2">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">2</span>
                SPL tokens are minted on Solana
              </li>
              <li className="flex items-start gap-2">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">3</span>
                Tokens are transferred to your connected wallet
              </li>
              <li className="flex items-start gap-2">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">4</span>
                Revenue distributions are sent directly to your wallet
              </li>
            </ol>
          </div>

          <Button type="submit" disabled={isLoading || !walletConnected} className="w-full">
            {isLoading ? 'Finalizing...' : 'Complete Onboarding'}
            <ArrowRight data-icon="inline-end" />
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
