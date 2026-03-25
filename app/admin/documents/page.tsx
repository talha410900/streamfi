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
  Upload, Download, FileText, FileCheck, FileWarning, Search, Filter,
  FileSignature, FileSearch, FileChartLine, Film, Receipt
} from 'lucide-react';

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
];

const mockDeals = [
  { id: 1, title: 'Midnight Heist' },
  { id: 2, title: 'Last Dance' },
];

const mockInvestors = [
  { id: 1, name: 'John Investor' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Robert Jones' },
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
  const config = statusConfig[status] || { label: status, variant: 'outline' };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

function getTypeIcon(type: string) {
  const docType = DOCUMENT_TYPES.find(t => t.value === type);
  if (docType) {
    const Icon = docType.icon;
    return <Icon className="size-5 text-muted-foreground" />;
  }
  return <FileText className="size-5 text-muted-foreground" />;
}

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState(mockDocuments);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dealFilter, setDealFilter] = useState('all');
  const [investorFilter, setInvestorFilter] = useState('all');
  const [isUploading, setIsUploading] = useState(false);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    const matchesDeal = dealFilter === 'all' || doc.deal === dealFilter;
    const matchesInvestor = investorFilter === 'all' || doc.investor === investorFilter;
    return matchesSearch && matchesType && matchesDeal && matchesInvestor;
  });

  const handleUpload = (data: any) => {
    console.log('Upload document:', data);
    setIsUploading(false);
  };

  const groupedByType = DOCUMENT_TYPES.map(type => ({
    type,
    documents: documents.filter(d => d.type === type.value),
  })).filter(g => g.documents.length > 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Document Management</h1>
          <p className="text-muted-foreground mt-1">Upload and manage investor and deal documents</p>
        </div>
        <Button onClick={() => setIsUploading(true)}>
          <Upload className="size-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Filters */}
      <Card className="border border-border">
        <CardContent className="pt-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
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
                {DOCUMENT_TYPES.map(type => (
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
                {mockDeals.map(deal => (
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
                {mockInvestors.map(investor => (
                  <SelectItem key={investor.id} value={investor.name}>{investor.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="by-type">By Type</TabsTrigger>
          <TabsTrigger value="pending">Pending Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-base">All Documents</CardTitle>
              <CardDescription>{filteredDocuments.length} documents found</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold">Document</th>
                      <th className="text-left py-3 px-4 font-semibold">Type</th>
                      <th className="text-left py-3 px-4 font-semibold">Deal</th>
                      <th className="text-left py-3 px-4 font-semibold">Investor</th>
                      <th className="text-left py-3 px-4 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 font-semibold">Uploaded</th>
                      <th className="text-left py-3 px-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocuments.map((doc) => (
                      <tr key={doc.id} className="border-b border-border/50 hover:bg-card">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            {getTypeIcon(doc.type)}
                            <div>
                              <p className="font-medium truncate max-w-[250px]">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">{doc.size}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground">
                          {DOCUMENT_TYPES.find(t => t.value === doc.type)?.label || doc.type}
                        </td>
                        <td className="py-4 px-4">{doc.deal}</td>
                        <td className="py-4 px-4">{doc.investor}</td>
                        <td className="py-4 px-4">{getStatusBadge(doc.status)}</td>
                        <td className="py-4 px-4 text-muted-foreground">
                          <DateDisplay date={doc.uploaded_at} />
                        </td>
                        <td className="py-4 px-4">
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

        <TabsContent value="by-type" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DOCUMENT_TYPES.map((type) => {
              const docs = documents.filter(d => d.type === type.value);
              const Icon = type.icon;
              return (
                <Card key={type.value} className="border border-border">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Icon className="size-4" />
                      {type.label}
                    </CardTitle>
                    <Badge variant="secondary">{docs.length}</Badge>
                  </CardHeader>
                  <CardContent>
                    {docs.length === 0 ? (
                      <p className="text-xs text-muted-foreground">No documents</p>
                    ) : (
                      <div className="flex flex-col gap-2">
                        {docs.slice(0, 3).map(doc => (
                          <div key={doc.id} className="flex items-center justify-between p-2 bg-card rounded text-xs">
                            <span className="truncate max-w-[150px]">{doc.name}</span>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Download className="size-3" />
                            </Button>
                          </div>
                        ))}
                        {docs.length > 3 && (
                          <p className="text-xs text-muted-foreground">+{docs.length - 3} more</p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-base">Documents Requiring Action</CardTitle>
              <CardDescription>Documents pending signature, review, or verification</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredDocuments.filter(d => d.status.includes('pending')).length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileCheck className="size-12 mx-auto mb-2 opacity-50" />
                  <p>All documents are up to date</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {filteredDocuments
                    .filter(d => d.status.includes('pending'))
                    .map(doc => (
                      <div key={doc.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                        <div className="flex items-center gap-3">
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
        <div className="flex flex-col gap-4">
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Upload className="size-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Drag and drop a file here, or click to browse</p>
            <Input type="file" className="mt-4" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Document Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {DOCUMENT_TYPES.map(type => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Associated Deal</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select deal (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {mockDeals.map(deal => (
                    <SelectItem key={deal.id} value={deal.title}>{deal.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium mb-1 block">Associated Investor</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select investor (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {mockInvestors.map(investor => (
                    <SelectItem key={investor.id} value={investor.name}>{investor.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button onClick={handleUpload}>Upload</Button>
            <Button variant="outline" onClick={() => setIsUploading(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}