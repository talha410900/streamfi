'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Modal } from '@/components/shared/modal';
import { CurrencyDisplay } from '@/components/shared/currency-display';
import { DateDisplay } from '@/components/shared/date-display';
import { StatusBadge } from '@/components/shared/status-badge';
import { DealFormEnhanced } from '@/components/admin/deal-form-enhanced';
import {
  ArrowLeft, Edit, Archive, DollarSign, Users, TrendingUp, Coins,
  Calendar, FileText, Building, Settings, Eye, Upload, Download, Send
} from 'lucide-react';

const dealData = {
  id: 1,
  title: 'Midnight Heist',
  description: 'An action-packed thriller following a team of elite thieves who discover their latest heist has unintended consequences that could change their lives forever.',
  genre: 'Action',
  status: 'open',
  // Valuation
  streamscore_valuation: 4500000,
  streamfi_valuation: 5000000,
  // Fundraising
  raise_target: 500000,
  raised_amount: 320000,
  committed_amount: 380000,
  revenue_share_percentage: 15,
  min_investment: 10000,
  // Token
  token_name: 'Midnight Heist Token',
  token_symbol: 'MHT',
  total_units: 50000,
  issued_units: 32000,
  unit_price: 10,
  // Status & Dates
  funding_start_date: '2026-02-01',
  funding_end_date: '2026-04-30',
  production_status: 'pre_production',
  distribution_status: 'pending',
  investor_count: 12,
  created_at: '2026-01-15',
};

const investors = [
  { id: 1, name: 'John Investor', email: 'john@example.com', amount: 100000, units: 10000, tokens_issued: true, status: 'funded' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', amount: 75000, units: 7500, tokens_issued: true, status: 'funded' },
  { id: 3, name: 'Robert Jones', email: 'robert@example.com', amount: 50000, units: 5000, tokens_issued: false, status: 'committed' },
  { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', amount: 50000, units: 5000, tokens_issued: true, status: 'funded' },
  { id: 5, name: 'Mike Chen', email: 'mike@example.com', amount: 45000, units: 4500, tokens_issued: true, status: 'funded' },
];

const documents = [
  { id: 1, name: 'Investment Memorandum', type: 'memorandum', size: '2.4 MB', uploaded_at: '2026-01-15' },
  { id: 2, name: 'Valuation Report', type: 'valuation', size: '1.8 MB', uploaded_at: '2026-01-15' },
  { id: 3, name: 'Subscription Agreement Template', type: 'agreement', size: '156 KB', uploaded_at: '2026-01-16' },
];

const distributions = [
  { id: 1, date: '2026-03-20', amount: 5000, per_unit: 0.156, investors_paid: 12, status: 'completed' },
];

const productionStatusLabels: Record<string, string> = {
  development: 'Development',
  pre_production: 'Pre-Production',
  production: 'In Production',
  post_production: 'Post-Production',
  completed: 'Completed',
  released: 'Released',
};

export default function DealDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);

  const deal = dealData; // Would fetch from API using params.id
  const raisedPercentage = (deal.raised_amount / deal.raise_target) * 100;
  const tokenPercentage = (deal.issued_units / deal.total_units) * 100;

  const handleEditSubmit = (data: any) => {
    console.log('Update deal:', data);
    setIsEditing(false);
  };

  const handleArchive = () => {
    console.log('Archive deal:', deal.id);
    setIsArchiving(false);
    router.push('/admin/deals');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/admin/deals')}>
            <ArrowLeft className="size-4" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">{deal.title}</h1>
              <StatusBadge status={deal.status as any} />
            </div>
            <p className="text-muted-foreground mt-1">{deal.genre} · {productionStatusLabels[deal.production_status]}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            <Edit className="size-4 mr-2" />
            Edit Deal
          </Button>
          <Button variant="outline" onClick={() => setIsArchiving(true)}>
            <Archive className="size-4 mr-2" />
            Archive
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <DollarSign className="size-4" />
              <span className="text-xs font-medium">Raised</span>
            </div>
            <p className="text-xl font-bold">
              <CurrencyDisplay amount={deal.raised_amount} />
            </p>
            <p className="text-xs text-muted-foreground mt-1">of <CurrencyDisplay amount={deal.raise_target} /> target</p>
            <Progress value={Math.min(raisedPercentage, 100)} className="mt-2 h-1.5" />
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Users className="size-4" />
              <span className="text-xs font-medium">Investors</span>
            </div>
            <p className="text-xl font-bold">{deal.investor_count}</p>
            <p className="text-xs text-muted-foreground mt-1">participating</p>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Coins className="size-4" />
              <span className="text-xs font-medium">Tokens Issued</span>
            </div>
            <p className="text-xl font-bold">{deal.issued_units.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">of {deal.total_units.toLocaleString()} total</p>
            <Progress value={Math.min(tokenPercentage, 100)} className="mt-2 h-1.5" />
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <TrendingUp className="size-4" />
              <span className="text-xs font-medium">Valuation</span>
            </div>
            <p className="text-xl font-bold">
              <CurrencyDisplay amount={deal.streamfi_valuation} />
            </p>
            <p className="text-xs text-muted-foreground mt-1">{deal.revenue_share_percentage}% investor share</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="fundraising">Fundraising</TabsTrigger>
          <TabsTrigger value="investors">Investors</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="distributions">Distributions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-base">Deal Details</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Description</p>
                  <p className="text-sm">{deal.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Token</p>
                    <p className="text-sm font-medium">{deal.token_name} ({deal.token_symbol})</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Unit Price</p>
                    <p className="text-sm font-medium"><CurrencyDisplay amount={deal.unit_price} /></p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Min Investment</p>
                    <p className="text-sm font-medium"><CurrencyDisplay amount={deal.min_investment} /></p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Revenue Share</p>
                    <p className="text-sm font-medium">{deal.revenue_share_percentage}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-base">Valuation & Timeline</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">StreamScore Valuation</p>
                    <p className="text-sm font-medium"><CurrencyDisplay amount={deal.streamscore_valuation} /></p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Final Valuation</p>
                    <p className="text-sm font-medium"><CurrencyDisplay amount={deal.streamfi_valuation} /></p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Funding Period</p>
                    <p className="text-sm font-medium">
                      <DateDisplay date={deal.funding_start_date} /> - <DateDisplay date={deal.funding_end_date} />
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Created</p>
                    <p className="text-sm font-medium"><DateDisplay date={deal.created_at} /></p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Production Status</p>
                  <Badge variant="secondary">{productionStatusLabels[deal.production_status]}</Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Distribution Status</p>
                  <Badge variant="outline">{deal.distribution_status}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fundraising" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="border border-border lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Fundraising Progress</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Raised vs Target</span>
                    <span className="text-sm text-muted-foreground">{raisedPercentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={Math.min(raisedPercentage, 100)} className="h-3" />
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span><CurrencyDisplay amount={deal.raised_amount} /> funded</span>
                    <span><CurrencyDisplay amount={deal.raise_target} /> target</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 bg-card rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">Committed Capital</p>
                    <p className="text-lg font-bold"><CurrencyDisplay amount={deal.committed_amount} /></p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Funded Capital</p>
                    <p className="text-lg font-bold"><CurrencyDisplay amount={deal.raised_amount} /></p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Remaining Allocation</p>
                    <p className="text-lg font-bold"><CurrencyDisplay amount={deal.raise_target - deal.raised_amount} /></p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Investor Count</p>
                    <p className="text-lg font-bold">{deal.investor_count}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-base">Token Status</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Tokens Issued</span>
                    <span className="text-sm text-muted-foreground">{tokenPercentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={Math.min(tokenPercentage, 100)} className="h-3" />
                </div>
                <div className="text-sm">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Total Supply</span>
                    <span className="font-medium">{deal.total_units.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Issued</span>
                    <span className="font-medium">{deal.issued_units.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Available</span>
                    <span className="font-medium">{(deal.total_units - deal.issued_units).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="investors" className="mt-6">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-base">Investor Participation</CardTitle>
              <CardDescription>{investors.length} investors in this deal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold">Investor</th>
                      <th className="text-left py-3 px-4 font-semibold">Email</th>
                      <th className="text-left py-3 px-4 font-semibold">Amount</th>
                      <th className="text-left py-3 px-4 font-semibold">Units</th>
                      <th className="text-left py-3 px-4 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 font-semibold">Tokens Issued</th>
                      <th className="text-left py-3 px-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {investors.map((investor) => (
                      <tr key={investor.id} className="border-b border-border/50 hover:bg-card">
                        <td className="py-4 px-4 font-medium">{investor.name}</td>
                        <td className="py-4 px-4 text-muted-foreground">{investor.email}</td>
                        <td className="py-4 px-4"><CurrencyDisplay amount={investor.amount} /></td>
                        <td className="py-4 px-4">{investor.units.toLocaleString()}</td>
                        <td className="py-4 px-4">
                          <Badge variant={investor.status === 'funded' ? 'default' : 'secondary'}>
                            {investor.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          {investor.tokens_issued ? (
                            <Badge className="bg-green-600">Issued</Badge>
                          ) : (
                            <Badge variant="outline">Pending</Badge>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <Button variant="ghost" size="sm">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <Card className="border border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Deal Documents</CardTitle>
                <CardDescription>Upload and manage deal-related files</CardDescription>
              </div>
              <Button size="sm">
                <Upload className="size-4 mr-2" />
                Upload
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <FileText className="size-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.size} · Uploaded <DateDisplay date={doc.uploaded_at} /></p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distributions" className="mt-6">
          <Card className="border border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Distribution History</CardTitle>
                <CardDescription>Revenue distributions to investors</CardDescription>
              </div>
              <Button size="sm">
                <Send className="size-4 mr-2" />
                New Distribution
              </Button>
            </CardHeader>
            <CardContent>
              {distributions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No distributions yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-border">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold">Date</th>
                        <th className="text-left py-3 px-4 font-semibold">Total Amount</th>
                        <th className="text-left py-3 px-4 font-semibold">Per Unit</th>
                        <th className="text-left py-3 px-4 font-semibold">Investors Paid</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {distributions.map((dist) => (
                        <tr key={dist.id} className="border-b border-border/50">
                          <td className="py-4 px-4"><DateDisplay date={dist.date} /></td>
                          <td className="py-4 px-4 font-medium"><CurrencyDisplay amount={dist.amount} /></td>
                          <td className="py-4 px-4"><CurrencyDisplay amount={dist.per_unit} /></td>
                          <td className="py-4 px-4">{dist.investors_paid}</td>
                          <td className="py-4 px-4">
                            <Badge className="bg-green-600">Completed</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title="Edit Deal"
        subtitle={deal.title}
        size="lg"
      >
        <DealFormEnhanced
          initialData={deal}
          onSubmit={handleEditSubmit}
          onCancel={() => setIsEditing(false)}
        />
      </Modal>

      {/* Archive Modal */}
      <Modal
        isOpen={isArchiving}
        onClose={() => setIsArchiving(false)}
        title="Archive Deal"
        subtitle="This will close the deal and prevent further investments"
        size="sm"
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to archive "{deal.title}"? This action cannot be undone easily.
          </p>
          <div className="flex gap-3">
            <Button variant="destructive" onClick={handleArchive}>Archive Deal</Button>
            <Button variant="outline" onClick={() => setIsArchiving(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}