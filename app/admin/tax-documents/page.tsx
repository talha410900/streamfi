'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatusBadge } from '@/components/shared/status-badge';
import { DateDisplay } from '@/components/shared/date-display';
import {
  Upload, Download, Send, FileSpreadsheet, Users,
  CheckCircle, Clock, AlertCircle,
} from 'lucide-react';
import { DashboardPageHeader } from '@/components/shared/dashboard-page-header';
import { cn } from '@/lib/utils';
import { adminDensity, adminCardClass } from '@/components/admin/admin-density';

const k1Documents = [
  { id: 1, investor_name: 'John Investor', email: 'john@example.com', deal: 'Midnight Heist', year: '2025', status: 'sent', sentDate: '2026-02-15' },
  { id: 2, investor_name: 'Jane Smith', email: 'jane@example.com', deal: 'Midnight Heist', year: '2025', status: 'sent', sentDate: '2026-02-15' },
  { id: 3, investor_name: 'Robert Jones', email: 'robert@example.com', deal: 'Midnight Heist', year: '2025', status: 'pending', sentDate: '' },
  { id: 4, investor_name: 'John Investor', email: 'john@example.com', deal: 'Last Dance', year: '2025', status: 'sent', sentDate: '2026-02-20' },
  { id: 5, investor_name: 'Jane Smith', email: 'jane@example.com', deal: 'Last Dance', year: '2025', status: 'pending', sentDate: '' },
  { id: 6, investor_name: 'Sarah Williams', email: 'sarah@example.com', deal: 'Last Dance', year: '2025', status: 'draft', sentDate: '' },
];

const deals = [
  { id: '1', title: 'Midnight Heist' },
  { id: '2', title: 'Last Dance' },
];

const investors = [
  { id: '1', name: 'John Investor', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  { id: '3', name: 'Robert Jones', email: 'robert@example.com' },
  { id: '4', name: 'Sarah Williams', email: 'sarah@example.com' },
];

export default function AdminTaxDocumentsPage() {
  const [selectedDocs, setSelectedDocs] = useState<number[]>([]);

  const [uploadData, setUploadData] = useState({
    deal_id: '',
    investor_id: '',
    year: new Date().getFullYear().toString(),
    file: null as File | null,
  });

  const sentCount = k1Documents.filter((d) => d.status === 'sent').length;
  const pendingCount = k1Documents.filter((d) => d.status === 'pending').length;
  const draftCount = k1Documents.filter((d) => d.status === 'draft').length;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadData({ ...uploadData, file: e.target.files?.[0] || null });
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadData.deal_id || !uploadData.file) {
      alert('Please select a deal and file');
      return;
    }
    console.log('[v0] K-1 uploaded:', uploadData);
    alert('K-1 document uploaded successfully');
  };

  const toggleDoc = (id: number) => {
    setSelectedDocs((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    if (selectedDocs.length === k1Documents.length) {
      setSelectedDocs([]);
    } else {
      setSelectedDocs(k1Documents.map((d) => d.id));
    }
  };

  return (
    <div className={adminDensity.page}>
      <DashboardPageHeader
        title="Tax Docs"
        description="Generate, upload, and track K-1 delivery to investors by deal and tax year."
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4 md:gap-4">
        <Card className={adminCardClass()}>
          <CardContent className={cn('flex flex-col gap-1.5 pt-4', adminDensity.cardContent)}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <FileSpreadsheet className="size-4 shrink-0" />
              <span className="text-xs font-medium uppercase tracking-wide">Total K-1s</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums">{k1Documents.length}</p>
          </CardContent>
        </Card>
        <Card className={adminCardClass()}>
          <CardContent className={cn('flex flex-col gap-1.5 pt-4', adminDensity.cardContent)}>
            <div className="flex items-center gap-2 text-chart-1">
              <CheckCircle className="size-4 shrink-0" />
              <span className="text-xs font-medium uppercase tracking-wide">Sent</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums">{sentCount}</p>
          </CardContent>
        </Card>
        <Card className={adminCardClass()}>
          <CardContent className={cn('flex flex-col gap-1.5 pt-4', adminDensity.cardContent)}>
            <div className="flex items-center gap-2 text-chart-3">
              <Clock className="size-4 shrink-0" />
              <span className="text-xs font-medium uppercase tracking-wide">Pending</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums">{pendingCount}</p>
          </CardContent>
        </Card>
        <Card className={adminCardClass()}>
          <CardContent className={cn('flex flex-col gap-1.5 pt-4', adminDensity.cardContent)}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <AlertCircle className="size-4 shrink-0" />
              <span className="text-xs font-medium uppercase tracking-wide">Draft</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums">{draftCount}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="documents" className="w-full">
        <TabsList>
          <TabsTrigger value="documents">K-1 Documents</TabsTrigger>
          <TabsTrigger value="upload">Upload / Generate</TabsTrigger>
          <TabsTrigger value="batch">Batch Operations</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="mt-3">
          <Card className={adminCardClass()}>
            <CardHeader className={cn('flex flex-row items-center justify-between', adminDensity.cardHeader)}>
              <div>
                <CardTitle className="text-base">Issued K-1 Documents</CardTitle>
                <CardDescription>All tax documents across deals and investors</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download data-icon="inline-start" />
                Export
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border bg-muted/30">
                    <tr>
                      <th className={cn('w-10 text-center', adminDensity.tableHead)}>
                        <input
                          type="checkbox"
                          checked={selectedDocs.length === k1Documents.length}
                          onChange={toggleAll}
                          className="size-3.5 rounded"
                        />
                      </th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Investor</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Deal</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Year</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Status</th>
                      <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Sent</th>
                      <th className={cn('text-right font-semibold', adminDensity.tableHead)}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {k1Documents.map((doc) => (
                      <tr key={doc.id} className="border-b border-border/50 hover:bg-muted/30">
                        <td className={cn('text-center', adminDensity.tableCell)}>
                          <input
                            type="checkbox"
                            checked={selectedDocs.includes(doc.id)}
                            onChange={() => toggleDoc(doc.id)}
                            className="size-3.5 rounded"
                          />
                        </td>
                        <td className={adminDensity.tableCell}>
                          <div>
                            <p className="font-medium">{doc.investor_name}</p>
                            <p className="text-xs text-muted-foreground">{doc.email}</p>
                          </div>
                        </td>
                        <td className={adminDensity.tableCell}>{doc.deal}</td>
                        <td className={cn('tabular-nums text-muted-foreground', adminDensity.tableCell)}>{doc.year}</td>
                        <td className={adminDensity.tableCell}>
                          <StatusBadge
                            status={doc.status === 'sent' ? 'approved' : doc.status === 'pending' ? 'pending' : 'draft'}
                            label={doc.status === 'sent' ? 'Sent' : doc.status === 'pending' ? 'Pending' : 'Draft'}
                          />
                        </td>
                        <td className={cn('text-muted-foreground', adminDensity.tableCell)}>
                          {doc.sentDate ? <DateDisplay date={doc.sentDate} /> : '-'}
                        </td>
                        <td className={cn('text-right', adminDensity.tableCell)}>
                          <div className="flex justify-end gap-1">
                            <Button variant="outline" size="sm" className="h-7 text-xs">
                              <Download className="size-3" />
                            </Button>
                            {doc.status !== 'sent' && (
                              <Button size="sm" className="h-7 text-xs">
                                <Send className="size-3" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="mt-3">
          <Card className={adminCardClass()}>
            <CardHeader className={adminDensity.cardHeader}>
              <CardTitle className="text-base">Upload K-1 Document</CardTitle>
              <CardDescription>Generate and distribute tax documents to individual investors</CardDescription>
            </CardHeader>
            <CardContent className={cn('flex flex-col gap-4', adminDensity.cardContent)}>
              <form onSubmit={handleUpload} className="flex max-w-2xl flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <FieldGroup>
                    <FieldLabel>Deal</FieldLabel>
                    <Select
                      value={uploadData.deal_id}
                      onValueChange={(value) => setUploadData({ ...uploadData, deal_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select deal" />
                      </SelectTrigger>
                      <SelectContent>
                        {deals.map((deal) => (
                          <SelectItem key={deal.id} value={deal.id}>{deal.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FieldGroup>
                  <FieldGroup>
                    <FieldLabel>Investor</FieldLabel>
                    <Select
                      value={uploadData.investor_id}
                      onValueChange={(value) => setUploadData({ ...uploadData, investor_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select investor" />
                      </SelectTrigger>
                      <SelectContent>
                        {investors.map((inv) => (
                          <SelectItem key={inv.id} value={inv.id}>{inv.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FieldGroup>
                  <FieldGroup>
                    <FieldLabel>Tax Year</FieldLabel>
                    <Input
                      type="number"
                      value={uploadData.year}
                      onChange={(e) => setUploadData({ ...uploadData, year: e.target.value })}
                      placeholder="2025"
                    />
                  </FieldGroup>
                </div>

                <FieldGroup>
                  <FieldLabel>K-1 Document (PDF)</FieldLabel>
                  <div className="relative">
                    <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" id="k1-file" />
                    <label
                      htmlFor="k1-file"
                      className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-border/80 bg-muted/25 px-4 py-3 transition-colors hover:bg-muted/45"
                    >
                      <Upload className="size-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">
                          {uploadData.file ? uploadData.file.name : 'Drop PDF or click to browse'}
                        </p>
                        <p className="text-xs text-muted-foreground">PDF only</p>
                      </div>
                    </label>
                  </div>
                </FieldGroup>

                <Button type="submit">
                  <Upload data-icon="inline-start" />
                  Upload K-1
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="batch" className="mt-3">
          <Card className={adminCardClass()}>
            <CardHeader className={adminDensity.cardHeader}>
              <CardTitle className="text-base">Batch Operations</CardTitle>
              <CardDescription>Send or generate K-1 documents in bulk</CardDescription>
            </CardHeader>
            <CardContent className={cn('flex flex-col gap-4', adminDensity.cardContent)}>
              {selectedDocs.length > 0 ? (
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <p className="mb-3 text-sm font-semibold">{selectedDocs.length} document(s) selected</p>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm">
                      <Send data-icon="inline-start" />
                      Send to Investors
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download data-icon="inline-start" />
                      Download All
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setSelectedDocs([])}>
                      Clear Selection
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-border bg-muted/30 p-6 text-center">
                  <Users className="mx-auto mb-2 size-8 text-muted-foreground opacity-50" />
                  <p className="text-sm text-muted-foreground">
                    Select documents from the K-1 Documents tab to perform batch operations
                  </p>
                </div>
              )}

              <div className="rounded-lg border border-border p-4">
                <p className="mb-3 text-sm font-semibold">Bulk Generation</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <FieldGroup>
                    <FieldLabel>Deal</FieldLabel>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select deal" />
                      </SelectTrigger>
                      <SelectContent>
                        {deals.map((d) => (
                          <SelectItem key={d.id} value={d.id}>{d.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FieldGroup>
                  <FieldGroup>
                    <FieldLabel>Tax Year</FieldLabel>
                    <Input type="number" placeholder="2025" defaultValue="2025" />
                  </FieldGroup>
                </div>
                <Button variant="outline" className="mt-3">
                  <FileSpreadsheet data-icon="inline-start" />
                  Generate K-1s for All Investors
                </Button>
                <p className="mt-2 text-xs text-muted-foreground">
                  This will create draft K-1 documents for all investors in the selected deal.
                  Review and send individually or use batch send.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
