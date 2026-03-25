'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Modal } from '@/components/shared/modal';
import { CurrencyDisplay } from '@/components/shared/currency-display';
import { DateDisplay } from '@/components/shared/date-display';
import { StatusBadge } from '@/components/shared/status-badge';
import {
  Search, Filter, Users, DollarSign, FileCheck, Wallet, Coins,
  Mail, Phone, Building, Eye, Download, Send, CheckCircle, XCircle, Clock
} from 'lucide-react';

const mockInvestors = [
  {
    id: 1,
    name: 'John Investor',
    email: 'john.investor@email.com',
    phone: '+1 (555) 123-4567',
    company: 'Investment Holdings LLC',
    wallet_address: '9B5X7kKQz1j4mL2pN8r5sT6vX9y2w4z6B1c3d5f7h9',
    status: 'approved',
    kyc_status: 'verified',
    accreditation_status: 'verified',
    questionnaire_status: 'complete',
    total_invested: 175000,
    deals: [
      { deal_id: 1, deal_name: 'Midnight Heist', amount: 100000, units: 10000, tokens_issued: true, distributions: 2500 },
      { deal_id: 2, deal_name: 'Last Dance', amount: 75000, units: 1500, tokens_issued: true, distributions: 1200 },
    ],
    documents: [
      { type: 'Subscription Agreement', status: 'signed', date: '2026-02-15' },
      { type: 'KYC Documents', status: 'verified', date: '2026-02-10' },
      { type: 'Accreditation', status: 'verified', date: '2026-02-10' },
      { type: 'Questionnaire', status: 'complete', date: '2026-02-12' },
    ],
    tokens_issued: true,
    total_distributions: 3700,
    created_at: '2026-02-01',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    phone: '+1 (555) 234-5678',
    company: 'Smith Capital',
    wallet_address: '7Kp9QmNvR2tX8wZ5yB3cF6dG1hJ4kL0aE9iM7nO2pS5',
    status: 'documents',
    kyc_status: 'pending',
    accreditation_status: 'pending',
    questionnaire_status: 'incomplete',
    total_invested: 0,
    deals: [],
    documents: [
      { type: 'KYC Documents', status: 'pending', date: '-' },
      { type: 'Accreditation', status: 'pending', date: '-' },
    ],
    tokens_issued: false,
    total_distributions: 0,
    created_at: '2026-03-01',
  },
  {
    id: 3,
    name: 'Robert Jones',
    email: 'robert.jones@email.com',
    phone: '+1 (555) 345-6789',
    company: 'Jones Family Trust',
    wallet_address: '3Df8GhJkL2mN5pQ7rT9vW1xY4zA6bC8dE0fH2iK4lM6',
    status: 'questionnaire',
    kyc_status: 'verified',
    accreditation_status: 'verified',
    questionnaire_status: 'incomplete',
    total_invested: 0,
    deals: [],
    documents: [
      { type: 'KYC Documents', status: 'verified', date: '2026-03-10' },
      { type: 'Accreditation', status: 'verified', date: '2026-03-10' },
      { type: 'Questionnaire', status: 'incomplete', date: '-' },
    ],
    tokens_issued: false,
    total_distributions: 0,
    created_at: '2026-03-05',
  },
  {
    id: 4,
    name: 'Sarah Williams',
    email: 'sarah.williams@email.com',
    phone: '+1 (555) 456-7890',
    company: 'Williams Ventures',
    wallet_address: '5Gh7JkLmN9pQ2rS4tV6wX8yZ0aB3cD5eF7gH9iJ1kL3',
    status: 'kyc',
    kyc_status: 'pending',
    accreditation_status: 'not_submitted',
    questionnaire_status: 'not_started',
    total_invested: 0,
    deals: [],
    documents: [],
    tokens_issued: false,
    total_distributions: 0,
    created_at: '2026-03-20',
  },
];

function getStatusProgress(investor: typeof mockInvestors[0]) {
  const steps = [
    { key: 'kyc', label: 'KYC', complete: investor.kyc_status === 'verified' },
    { key: 'accreditation', label: 'Accreditation', complete: investor.accreditation_status === 'verified' },
    { key: 'questionnaire', label: 'Questionnaire', complete: investor.questionnaire_status === 'complete' },
    { key: 'documents', label: 'Documents', complete: investor.documents.some(d => d.type === 'Subscription Agreement' && d.status === 'signed') },
  ];
  const completedSteps = steps.filter(s => s.complete).length;
  return { steps, completedSteps, percentage: (completedSteps / steps.length) * 100 };
}

export default function AdminInvestorsPage() {
  const [investors] = useState(mockInvestors);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInvestor, setSelectedInvestor] = useState<typeof mockInvestors[0] | null>(null);

  const filteredInvestors = investors.filter(inv => {
    const matchesSearch = inv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalInvested = investors.reduce((sum, inv) => sum + inv.total_invested, 0);
  const activeInvestors = investors.filter(inv => inv.status === 'approved').length;
  const pendingInvestors = investors.filter(inv => inv.status !== 'approved').length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Investor Management</h1>
        <p className="text-muted-foreground mt-1">Manage investor profiles, KYC, and investments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Users className="size-4" />
              <span className="text-xs font-medium">Total Investors</span>
            </div>
            <p className="text-2xl font-bold">{investors.length}</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <CheckCircle className="size-4" />
              <span className="text-xs font-medium">Active</span>
            </div>
            <p className="text-2xl font-bold">{activeInvestors}</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Clock className="size-4" />
              <span className="text-xs font-medium">Pending</span>
            </div>
            <p className="text-2xl font-bold">{pendingInvestors}</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <DollarSign className="size-4" />
              <span className="text-xs font-medium">Total Invested</span>
            </div>
            <p className="text-2xl font-bold"><CurrencyDisplay amount={totalInvested} /></p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border border-border">
        <CardContent className="pt-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search investors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="kyc">KYC Pending</SelectItem>
                <SelectItem value="questionnaire">Questionnaire</SelectItem>
                <SelectItem value="documents">Documents</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Investors Table */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-base">All Investors</CardTitle>
          <CardDescription>{filteredInvestors.length} investors found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold">Investor</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Onboarding Progress</th>
                  <th className="text-left py-3 px-4 font-semibold">Total Invested</th>
                  <th className="text-left py-3 px-4 font-semibold">Deals</th>
                  <th className="text-left py-3 px-4 font-semibold">Tokens</th>
                  <th className="text-left py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvestors.map((investor) => {
                  const progress = getStatusProgress(investor);
                  return (
                    <tr key={investor.id} className="border-b border-border/50 hover:bg-card">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-semibold">{investor.name}</p>
                          <p className="text-xs text-muted-foreground">{investor.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <StatusBadge status={investor.status as any} />
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Progress value={progress.percentage} className="w-16 h-1.5" />
                          <span className="text-xs text-muted-foreground">{progress.completedSteps}/4</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <CurrencyDisplay amount={investor.total_invested} />
                      </td>
                      <td className="py-4 px-4">{investor.deals.length}</td>
                      <td className="py-4 px-4">
                        {investor.tokens_issued ? (
                          <Badge className="bg-green-600">Issued</Badge>
                        ) : (
                          <Badge variant="outline">Pending</Badge>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <Button variant="outline" size="sm" onClick={() => setSelectedInvestor(investor)}>
                          <Eye className="size-3 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Investor Detail Modal */}
      <Modal
        isOpen={!!selectedInvestor}
        onClose={() => setSelectedInvestor(null)}
        title={selectedInvestor?.name || 'Investor Details'}
        subtitle="Complete investor profile and activity"
        size="lg"
      >
        {selectedInvestor && (
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile" className="text-xs">Profile</TabsTrigger>
              <TabsTrigger value="onboarding" className="text-xs">Onboarding</TabsTrigger>
              <TabsTrigger value="investments" className="text-xs">Investments</TabsTrigger>
              <TabsTrigger value="documents" className="text-xs">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="size-4 text-muted-foreground" />
                  <span className="text-sm">{selectedInvestor.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="size-4 text-muted-foreground" />
                  <span className="text-sm">{selectedInvestor.phone}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <Building className="size-4 text-muted-foreground" />
                  <span className="text-sm">{selectedInvestor.company}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <Wallet className="size-4 text-muted-foreground" />
                  <code className="text-xs bg-muted px-2 py-1 rounded font-mono">{selectedInvestor.wallet_address}</code>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Registered</p>
                    <p className="text-sm font-medium"><DateDisplay date={selectedInvestor.created_at} /></p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Distributions</p>
                    <p className="text-sm font-medium"><CurrencyDisplay amount={selectedInvestor.total_distributions} /></p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="onboarding" className="mt-4">
              <div className="flex flex-col gap-3">
                {getStatusProgress(selectedInvestor).steps.map((step) => (
                  <div key={step.key} className="flex items-center justify-between p-3 bg-card rounded-lg">
                    <div className="flex items-center gap-3">
                      {step.complete ? (
                        <CheckCircle className="size-5 text-green-600" />
                      ) : (
                        <Clock className="size-5 text-muted-foreground" />
                      )}
                      <span className="text-sm font-medium">{step.label}</span>
                    </div>
                    <Badge variant={step.complete ? 'default' : 'secondary'}>
                      {step.complete ? 'Complete' : 'Pending'}
                    </Badge>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="investments" className="mt-4">
              {selectedInvestor.deals.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  <p>No investments yet</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {selectedInvestor.deals.map((deal, idx) => (
                    <div key={idx} className="p-3 bg-card rounded-lg border border-border">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-medium">{deal.deal_name}</p>
                        <CurrencyDisplay amount={deal.amount} />
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                        <div>Units: {deal.units.toLocaleString()}</div>
                        <div>Tokens: {deal.tokens_issued ? 'Issued' : 'Pending'}</div>
                        <div>Distributions: <CurrencyDisplay amount={deal.distributions} /></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="documents" className="mt-4">
              {selectedInvestor.documents.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  <p>No documents on file</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {selectedInvestor.documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-card rounded-lg">
                      <div>
                        <p className="text-sm font-medium">{doc.type}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.date !== '-' ? <DateDisplay date={doc.date} /> : 'Not submitted'}
                        </p>
                      </div>
                      <Badge variant={doc.status === 'signed' || doc.status === 'verified' || doc.status === 'complete' ? 'default' : 'secondary'}>
                        {doc.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </Modal>
    </div>
  );
}