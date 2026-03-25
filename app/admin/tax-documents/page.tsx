'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatusBadge } from '@/components/shared/status-badge';
import { Upload, Download, FileText } from 'lucide-react';

export default function AdminTaxDocumentsPage() {
  const [k1Documents, setK1Documents] = useState([
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
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tax Documents</h1>
        <p className="text-muted-foreground mt-1">Manage K-1 and tax documentation for investors</p>
      </div>

      <Card className="border border-border/50">
        <CardHeader>
          <CardTitle>Upload K-1 Documents</CardTitle>
          <CardDescription>Generate and distribute tax documents to investors</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
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
                      <SelectItem key={deal.id} value={deal.id}>
                        {deal.title}
                      </SelectItem>
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
              <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center cursor-pointer hover:bg-card transition-colors">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-input"
                />
                <label htmlFor="file-input" className="cursor-pointer">
                  <div className="size-10 rounded-lg bg-muted flex items-center justify-center mx-auto mb-3">
                    <Upload className="size-5 text-muted-foreground" />
                  </div>
                  <p className="font-semibold text-sm">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {uploadData.file ? uploadData.file.name : 'PDF files only'}
                  </p>
                </label>
              </div>
            </FieldGroup>

            <Button type="submit" className="w-full">
              <Upload className="size-4 mr-2" />
              Upload K-1 Documents
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border border-border/50">
        <CardHeader>
          <CardTitle>Issued K-1 Documents</CardTitle>
          <CardDescription>All tax documents distributed to investors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold">Investor</th>
                  <th className="text-left py-3 px-4 font-semibold">Deal</th>
                  <th className="text-left py-3 px-4 font-semibold">Year</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {k1Documents.map((doc) => (
                  <tr key={doc.id} className="border-b border-border/50 hover:bg-card transition-colors">
                    <td className="py-4 px-4 font-semibold">{doc.investor_name}</td>
                    <td className="py-4 px-4">{doc.deal}</td>
                    <td className="py-4 px-4">{doc.year}</td>
                    <td className="py-4 px-4">
                      <StatusBadge status={doc.status === 'sent' ? 'approved' : 'pending'} label={doc.status === 'sent' ? 'Sent' : 'Pending'} />
                    </td>
                    <td className="py-4 px-4">
                      <Button variant="outline" size="sm">
                        <Download className="size-3 mr-1" />
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
