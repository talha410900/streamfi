'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { DateDisplay } from '@/components/shared/date-display';
import {
  Download, FileText, FileCheck, FileSignature, Receipt,
  FileSearch, Search, Filter, ExternalLink, AlertCircle
} from 'lucide-react';

const documents = {
  signed: [
    { id: 1, name: 'Subscription Agreement - Midnight Heist', type: 'agreement', deal: 'Midnight Heist', date: '2026-01-15', size: '156 KB', status: 'signed' },
    { id: 2, name: 'Subscription Agreement - Last Dance', type: 'agreement', deal: 'Last Dance', date: '2025-11-20', size: '162 KB', status: 'signed' },
  ],
  questionnaires: [
    { id: 3, name: 'Investor Questionnaire', type: 'questionnaire', deal: '-', date: '2026-01-10', size: '89 KB', status: 'complete' },
  ],
  kyc: [
    { id: 4, name: 'KYC Verification Documents', type: 'kyc', deal: '-', date: '2026-01-08', size: '2.4 MB', status: 'verified' },
    { id: 5, name: 'Accreditation Certificate', type: 'accreditation', deal: '-', date: '2026-01-08', size: '456 KB', status: 'verified' },
  ],
  tax: [
    { id: 6, name: 'K-1 Statement 2025 - Midnight Heist', type: 'k1', deal: 'Midnight Heist', date: '2026-02-15', size: '245 KB', status: 'available' },
    { id: 7, name: 'K-1 Statement 2025 - Last Dance', type: 'k1', deal: 'Last Dance', date: '2026-02-20', size: '238 KB', status: 'available' },
  ],
  valuations: [
    { id: 8, name: 'Midnight Heist Valuation Report', type: 'valuation', deal: 'Midnight Heist', date: '2026-01-12', size: '1.8 MB', status: 'available' },
    { id: 9, name: 'Last Dance Valuation Report', type: 'valuation', deal: 'Last Dance', date: '2025-11-15', size: '2.1 MB', status: 'available' },
  ],
};

const allDocuments = [
  ...documents.signed,
  ...documents.questionnaires,
  ...documents.kyc,
  ...documents.tax,
  ...documents.valuations,
];

function getTypeIcon(type: string) {
  switch (type) {
    case 'agreement': return <FileSignature className="size-5 text-muted-foreground" />;
    case 'questionnaire': return <FileCheck className="size-5 text-muted-foreground" />;
    case 'kyc': return <FileCheck className="size-5 text-muted-foreground" />;
    case 'accreditation': return <FileCheck className="size-5 text-muted-foreground" />;
    case 'k1': return <Receipt className="size-5 text-muted-foreground" />;
    case 'valuation': return <FileSearch className="size-5 text-muted-foreground" />;
    default: return <FileText className="size-5 text-muted-foreground" />;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'signed':
    case 'complete':
    case 'verified':
      return <Badge className="bg-green-600">Complete</Badge>;
    case 'available':
      return <Badge variant="secondary">Available</Badge>;
    case 'pending':
      return <Badge variant="outline">Pending</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export default function InvestorDocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredDocuments = allDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
        <p className="text-muted-foreground mt-1">Access your signed documents, KYC files, and tax statements</p>
      </div>

      {/* Search */}
      <Card className="border border-border">
        <CardContent className="pt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Documents by Category */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="agreements">Agreements</TabsTrigger>
          <TabsTrigger value="kyc">KYC & Verification</TabsTrigger>
          <TabsTrigger value="tax">Tax Documents</TabsTrigger>
          <TabsTrigger value="valuations">Valuations</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-base">All Documents</CardTitle>
              <CardDescription>{filteredDocuments.length} documents on file</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {filteredDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 bg-card rounded-lg hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-background flex items-center justify-center">
                        {getTypeIcon(doc.type)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.size} · <DateDisplay date={doc.date} />
                          {doc.deal !== '-' && ` · ${doc.deal}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(doc.status)}
                      <Button variant="outline" size="sm">
                        <Download className="size-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agreements" className="mt-6">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-base">Subscription Agreements</CardTitle>
              <CardDescription>Your signed investment agreements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {documents.signed.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 bg-card rounded-lg">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(doc.type)}
                      <div>
                        <p className="font-medium text-sm">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.size} · <DateDisplay date={doc.date} /></p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(doc.status)}
                      <Button variant="outline" size="sm">
                        <Download className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kyc" className="mt-6">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-base">KYC & Verification</CardTitle>
              <CardDescription>Identity and accreditation documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {[...documents.kyc, ...documents.questionnaires].map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 bg-card rounded-lg">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(doc.type)}
                      <div>
                        <p className="font-medium text-sm">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.size} · <DateDisplay date={doc.date} /></p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(doc.status)}
                      <Button variant="outline" size="sm">
                        <Download className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tax" className="mt-6">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-base">Tax Documents</CardTitle>
              <CardDescription>K-1 statements for tax filing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200 dark:border-yellow-900 mb-4">
                <div className="flex gap-2">
                  <AlertCircle className="size-5 text-yellow-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-yellow-900 dark:text-yellow-300">Tax Season Reminder</p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                      K-1 statements for tax year 2025 are now available. Please consult your tax advisor for proper reporting.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {documents.tax.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 bg-card rounded-lg">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(doc.type)}
                      <div>
                        <p className="font-medium text-sm">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.size} · <DateDisplay date={doc.date} /></p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(doc.status)}
                      <Button variant="outline" size="sm">
                        <Download className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="valuations" className="mt-6">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-base">Valuation Reports</CardTitle>
              <CardDescription>Deal valuation materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {documents.valuations.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 bg-card rounded-lg">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(doc.type)}
                      <div>
                        <p className="font-medium text-sm">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.size} · <DateDisplay date={doc.date} /></p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(doc.status)}
                      <Button variant="outline" size="sm">
                        <Download className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}