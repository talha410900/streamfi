'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Modal } from '@/components/shared/modal';
import { DateDisplay } from '@/components/shared/date-display';
import {
  Upload, Download, FileText, FileCheck, FileWarning, Search,
  FileSignature, FileChartLine, Film, Receipt, Users, TrendingUp,
} from 'lucide-react';
import { DashboardPageHeader } from '@/components/shared/dashboard-page-header';
import { cn } from '@/lib/utils';
import { adminDensity, adminCardClass } from '@/components/admin/admin-density';

const DOCUMENT_TYPES = [
  { value: 'subscription_agreement', label: 'Subscription Agreement', icon: FileSignature },
  { value: 'questionnaire', label: 'Investor Questionnaire', icon: FileCheck },
  { value: 'kyc', label: 'KYC Documents', icon: FileWarning },
  { value: 'valuation', label: 'Valuation Report', icon: FileChartLine },
  { value: 'show_document', label: 'Show Documents', icon: Film },
  { value: 'k1', label: 'K-1 Statement', icon: Receipt },
];

const mockDocuments = [
  { id: 1, name: 'Subscription Agreement - John Investor.pdf', type: 'subscription_agreement', deal: 'Midnight Heist', investor: 'John Investor', size: '156 KB', uploaded_at: '2026-03-20', status: 'signed' },
  { id: 2, name: 'Subscription Agreement - Jane Smith.pdf', type: 'subscription_agreement', deal: 'Midnight Heist', investor: 'Jane Smith', size: '162 KB', uploaded_at: '2026-03-19', status: 'pending_signature' },
  { id: 3, name: 'KYC Documents - John Investor.zip', type: 'kyc', deal: '-', investor: 'John Investor', size: '2.4 MB', uploaded_at: '2026-03-18', status: 'verified' },
  { id: 4, name: 'Investor Questionnaire - Robert Jones.pdf', type: 'questionnaire', deal: '-', investor: 'Robert Jones', size: '89 KB', uploaded_at: '2026-03-17', status: 'pending_review' },
  { id: 5, name: 'Midnight Heist Valuation Report Q1 2026.pdf', type: 'valuation', deal: 'Midnight Heist', investor: '-', size: '1.8 MB', uploaded_at: '2026-03-15', status: 'active' },
  { id: 6, name: 'K-1 Statement 2025 - John Investor.pdf', type: 'k1', deal: 'Last Dance', investor: 'John Investor', size: '245 KB', uploaded_at: '2026-02-28', status: 'sent' },
  { id: 7, name: 'Show Script - Last Dance v2.pdf', type: 'show_document', deal: 'Last Dance', investor: '-', size: '4.2 MB', uploaded_at: '2026-02-15', status: 'active' },
  { id: 8, name: 'Subscription Agreement - Sarah Williams.pdf', type: 'subscription_agreement', deal: 'Last Dance', investor: 'Sarah Williams', size: '158 KB', uploaded_at: '2026-02-10', status: 'signed' },
  { id: 9, name: 'KYC Documents - Jane Smith.zip', type: 'kyc', deal: '-', investor: 'Jane Smith', size: '1.9 MB', uploaded_at: '2026-01-20', status: 'verified' },
];

const mockDeals = [
  { id: 1, title: 'Midnight Heist' },
  { id: 2, title: 'Last Dance' },
];

const mockInvestors = [
  { id: 1, name: 'John Investor' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Robert Jones' },
  { id: 4, name: 'Sarah Williams' },
];

function getStatusBadge(status: string) {
  const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'outline' | 'destructive' }> = {
    signed: { label: 'Signed', variant: 'default' },
    pending_signature: { label: 'Pending Signature', variant: 'secondary' },
    verified: { label: 'Verified', variant: 'default' },
    pending_review: { label: 'Pending Review', variant: 'secondary' },
    active: { label: 'Active', variant: 'default' },
    sent: { label: 'Sent', variant: 'default' },
  };
  const config = statusConfig[status] || { label: status, variant: 'outline' as const };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

function getTypeIcon(type: string) {
  const docType = DOCUMENT_TYPES.find((t) => t.value === type);
  if (docType) {
    const Icon = docType.icon;
    return <Icon className="size-5 text-muted-foreground" />;
  }
  return <FileText className="size-5 text-muted-foreground" />;
}

export default function AdminDocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dealFilter, setDealFilter] = useState('all');
  const [investorFilter, setInvestorFilter] = useState('all');
  const [isUploading, setIsUploading] = useState(false);

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    const matchesDeal = dealFilter === 'all' || doc.deal === dealFilter;
    const matchesInvestor = investorFilter === 'all' || doc.investor === investorFilter;
    return matchesSearch && matchesType && matchesDeal && matchesInvestor;
  });

  const investorDocs = mockInvestors.map((inv) => ({
    ...inv,
    documents: mockDocuments.filter((d) => d.investor === inv.name),
    docCount: mockDocuments.filter((d) => d.investor === inv.name).length,
  }));

  const dealDocs = mockDeals.map((deal) => ({
    ...deal,
    documents: mockDocuments.filter((d) => d.deal === deal.title),
    docCount: mockDocuments.filter((d) => d.deal === deal.title).length,
  }));

  return (
    <div className={adminDensity.page}>
      <DashboardPageHeader
        title="Documents"
        description="Central library for subscriptions, KYC, valuations, show files, and K-1s."
        actions={
          <Button onClick={() => setIsUploading(true)}>
            <Upload data-icon="inline-start" />
            Upload
          </Button>
        }
      />

      {/* Filters */}
      <Card className={adminCardClass()}>
        <CardContent className={cn('pt-3', adminDensity.cardContent)}>
          <div className="flex flex-wrap gap-3">
            <div className="min-w-[200px] flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Document Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {DOCUMENT_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={dealFilter} onValueChange={setDealFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Deal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Deals</SelectItem>
                {mockDeals.map((deal) => (
                  <SelectItem key={deal.id} value={deal.title}>{deal.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={investorFilter} onValueChange={setInvestorFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Investor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Investors</SelectItem>
                {mockInvestors.map((inv) => (
                  <SelectItem key={inv.id} value={inv.name}>{inv.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="by-investor">By Investor</TabsTrigger>
          <TabsTrigger value="by-deal">By Deal</TabsTrigger>
          <TabsTrigger value="pending">Pending Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-3">
          <Card className={adminCardClass()}>
            <CardHeader className={adminDensity.cardHeader}>
              <CardTitle className="text-base">All Documents</CardTitle>
              <CardDescription>{filteredDocuments.length} documents found</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Document</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Type</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Deal</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Investor</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Status</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Uploaded</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocuments.map((doc) => (
                      <tr key={doc.id} className="border-b border-border/50 hover:bg-card">
                        <td className={adminDensity.tableCell}>
                          <div className="flex items-center gap-2">
                            {getTypeIcon(doc.type)}
                            <div>
                              <p className="max-w-[250px] truncate font-medium">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">{doc.size}</p>
                            </div>
                          </div>
                        </td>
                        <td className={cn('text-muted-foreground', adminDensity.tableCell)}>
                          {DOCUMENT_TYPES.find((t) => t.value === doc.type)?.label || doc.type}
                        </td>
                        <td className={adminDensity.tableCell}>{doc.deal}</td>
                        <td className={adminDensity.tableCell}>{doc.investor}</td>
                        <td className={adminDensity.tableCell}>{getStatusBadge(doc.status)}</td>
                        <td className={cn('text-muted-foreground', adminDensity.tableCell)}>
                          <DateDisplay date={doc.uploaded_at} />
                        </td>
                        <td className={adminDensity.tableCell}>
                          <Button variant="ghost" size="sm">
                            <Download className="size-4" />
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

        {/* By Investor */}
        <TabsContent value="by-investor" className="mt-3">
          <div className="flex flex-col gap-4">
            {investorDocs.map((inv) => (
              <Card key={inv.id} className={adminCardClass()}>
                <CardHeader className={cn('flex flex-row items-center justify-between', adminDensity.cardHeader)}>
                  <div className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-full bg-muted">
                      <Users className="size-4 text-muted-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{inv.name}</CardTitle>
                      <CardDescription>{inv.docCount} documents on file</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">{inv.docCount}</Badge>
                </CardHeader>
                <CardContent className={adminDensity.cardContent}>
                  {inv.documents.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No documents</p>
                  ) : (
                    <div className="flex flex-col gap-1.5">
                      {inv.documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between rounded-md bg-card p-2.5">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(doc.type)}
                            <div>
                              <p className="text-sm font-medium">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {doc.size} · {doc.deal !== '-' ? doc.deal : 'General'} · <DateDisplay date={doc.uploaded_at} />
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(doc.status)}
                            <Button variant="ghost" size="sm" className="size-8 p-0">
                              <Download className="size-3.5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* By Deal */}
        <TabsContent value="by-deal" className="mt-3">
          <div className="flex flex-col gap-4">
            {dealDocs.map((deal) => (
              <Card key={deal.id} className={adminCardClass()}>
                <CardHeader className={cn('flex flex-row items-center justify-between', adminDensity.cardHeader)}>
                  <div className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-full bg-muted">
                      <TrendingUp className="size-4 text-muted-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{deal.title}</CardTitle>
                      <CardDescription>{deal.docCount} documents</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">{deal.docCount}</Badge>
                </CardHeader>
                <CardContent className={adminDensity.cardContent}>
                  {deal.documents.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No documents</p>
                  ) : (
                    <div className="flex flex-col gap-1.5">
                      {deal.documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between rounded-md bg-card p-2.5">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(doc.type)}
                            <div>
                              <p className="text-sm font-medium">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {doc.size} · {doc.investor !== '-' ? doc.investor : 'Deal-level'} · <DateDisplay date={doc.uploaded_at} />
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(doc.status)}
                            <Button variant="ghost" size="sm" className="size-8 p-0">
                              <Download className="size-3.5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Pending Actions */}
        <TabsContent value="pending" className="mt-3">
          <Card className={adminCardClass()}>
            <CardHeader className={adminDensity.cardHeader}>
              <CardTitle className="text-base">Documents Requiring Action</CardTitle>
              <CardDescription>Documents pending signature, review, or verification</CardDescription>
            </CardHeader>
            <CardContent className={adminDensity.cardContent}>
              {mockDocuments.filter((d) => d.status.includes('pending')).length === 0 ? (
                <div className="py-6 text-center text-muted-foreground">
                  <FileCheck className="mx-auto mb-2 size-10 opacity-50" />
                  <p>All documents are up to date</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {mockDocuments
                    .filter((d) => d.status.includes('pending'))
                    .map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(doc.type)}
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {doc.investor !== '-' && `Investor: ${doc.investor} · `}
                              Status: {doc.status.replace('_', ' ')}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Review</Button>
                          <Button variant="ghost" size="sm">
                            <Download className="size-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Upload Modal */}
      <Modal
        isOpen={isUploading}
        onClose={() => setIsUploading(false)}
        title="Upload Document"
        subtitle="Add a new document to the system"
        size="md"
      >
        <div className="flex flex-col gap-3">
          <div className="rounded-lg border-2 border-dashed border-border p-5 text-center">
            <Upload className="mx-auto mb-2 size-7 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Drag and drop a file here, or click to browse</p>
            <Input type="file" className="mt-3" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium">Document Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {DOCUMENT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Associated Deal</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select deal (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {mockDeals.map((deal) => (
                    <SelectItem key={deal.id} value={deal.title}>{deal.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <label className="mb-1 block text-sm font-medium">Associated Investor</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select investor (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {mockInvestors.map((inv) => (
                    <SelectItem key={inv.id} value={inv.name}>{inv.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button onClick={() => setIsUploading(false)}>Upload</Button>
            <Button variant="outline" onClick={() => setIsUploading(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
