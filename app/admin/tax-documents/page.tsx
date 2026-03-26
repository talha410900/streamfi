'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatusBadge } from '@/components/shared/status-badge';
import { Upload, Download } from 'lucide-react';
import { DashboardPageHeader } from '@/components/shared/dashboard-page-header';
import { cn } from '@/lib/utils';
import { adminDensity, adminCardClass } from '@/components/admin/admin-density';

const tableDense = {
  head: 'px-3 py-1.5 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground',
  cell: 'px-3 py-2',
} as const;

export default function AdminTaxDocumentsPage() {
  const [k1Documents] = useState([
    { id: 1, investor_name: 'John Investor', deal: 'Midnight Heist', year: '2025', status: 'sent' },
    { id: 2, investor_name: 'Jane Smith', deal: 'Last Dance', year: '2025', status: 'pending' },
  ]);

  const deals = [
    { id: '1', title: 'Midnight Heist' },
    { id: '2', title: 'Last Dance' },
  ];

  const [uploadData, setUploadData] = useState({
    deal_id: '',
    year: new Date().getFullYear().toString(),
    file: null as File | null,
  });

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
    setUploadData({
      deal_id: '',
      year: new Date().getFullYear().toString(),
      file: null as File | null,
    });
  };

  return (
    <div className={adminDensity.pageTight}>
      <DashboardPageHeader
        title="Tax documents"
        description="Upload and track K-1 delivery to investors by deal and tax year."
      />

      <Card className={adminCardClass('gap-3 py-3')}>
        <CardHeader className={cn('gap-1 border-b border-border pb-3', adminDensity.cardHeader)}>
          <CardTitle className="text-base font-semibold">Upload K-1 documents</CardTitle>
          <CardDescription className="text-xs leading-snug">
            Generate and distribute tax documents to investors
          </CardDescription>
        </CardHeader>
        <CardContent className={cn(adminDensity.cardContent, 'pt-3')}>
          <form onSubmit={handleUpload} className="flex max-w-2xl flex-col gap-2.5">
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
              <FieldGroup className="gap-1.5">
                <FieldLabel className="text-xs font-medium text-muted-foreground">Deal</FieldLabel>
                <Select
                  value={uploadData.deal_id}
                  onValueChange={(value) => setUploadData({ ...uploadData, deal_id: value })}
                >
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Select deal" />
                  </SelectTrigger>
                  <SelectContent>
                    {deals.map((deal) => (
                      <SelectItem key={deal.id} value={deal.id}>
                        {deal.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FieldGroup>

              <FieldGroup className="gap-1.5">
                <FieldLabel className="text-xs font-medium text-muted-foreground">Tax year</FieldLabel>
                <Input
                  type="number"
                  value={uploadData.year}
                  onChange={(e) => setUploadData({ ...uploadData, year: e.target.value })}
                  placeholder="2025"
                  className="h-9 text-sm"
                />
              </FieldGroup>
            </div>

            <FieldGroup className="gap-1.5">
              <FieldLabel className="text-xs font-medium text-muted-foreground">K-1 document (PDF)</FieldLabel>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-input"
                />
                <label
                  htmlFor="file-input"
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-border/80 bg-muted/25 px-3 py-2.5 transition-colors hover:bg-muted/45"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
                    <Upload className="size-3.5 text-muted-foreground" />
                  </span>
                  <span className="min-w-0 flex-1 text-left">
                    <span className="block text-sm font-medium leading-tight">Drop PDF or click to browse</span>
                    <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                      {uploadData.file ? uploadData.file.name : 'PDF only'}
                    </span>
                  </span>
                </label>
              </div>
            </FieldGroup>

            <Button type="submit" className="h-9 w-full max-w-2xl text-sm sm:w-auto sm:min-w-50">
              <Upload className="mr-2 size-3.5" />
              Upload K-1 documents
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className={adminCardClass('gap-3 py-3')}>
        <CardHeader className={cn('gap-1 border-b border-border pb-3', adminDensity.cardHeader)}>
          <CardTitle className="text-base font-semibold">Issued K-1 documents</CardTitle>
          <CardDescription className="text-xs leading-snug">
            All tax documents distributed to investors
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/30">
                <tr>
                  <th className={tableDense.head}>Investor</th>
                  <th className={tableDense.head}>Deal</th>
                  <th className={tableDense.head}>Year</th>
                  <th className={tableDense.head}>Status</th>
                  <th className={cn(tableDense.head, 'text-right')}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {k1Documents.map((doc) => (
                  <tr
                    key={doc.id}
                    className="border-b border-border/50 transition-colors last:border-b-0 hover:bg-muted/30"
                  >
                    <td className={cn('font-medium', tableDense.cell)}>{doc.investor_name}</td>
                    <td className={tableDense.cell}>{doc.deal}</td>
                    <td className={cn('tabular-nums text-muted-foreground', tableDense.cell)}>{doc.year}</td>
                    <td className={tableDense.cell}>
                      <StatusBadge
                        status={doc.status === 'sent' ? 'approved' : 'pending'}
                        label={doc.status === 'sent' ? 'Sent' : 'Pending'}
                      />
                    </td>
                    <td className={cn('text-right', tableDense.cell)}>
                      <Button variant="outline" size="sm" className="h-7 gap-1 px-2 text-xs">
                        <Download className="size-3" />
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
