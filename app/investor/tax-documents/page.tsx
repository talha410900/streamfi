'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CurrencyDisplay } from '@/components/shared/currency-display';
import { DateDisplay } from '@/components/shared/date-display';
import { DashboardPageHeader } from '@/components/shared/dashboard-page-header';
import { cn } from '@/lib/utils';
import {
  investorDensity,
  investorCardClass,
} from '@/components/investor/investor-density';
import {
  Download, FileSpreadsheet, AlertCircle, Calendar, DollarSign, FileText,
} from 'lucide-react';

const k1Documents = [
  { id: 1, deal: 'Midnight Heist', year: '2025', status: 'available', uploadedDate: '2026-02-15', size: '245 KB' },
  { id: 2, deal: 'Last Dance', year: '2025', status: 'available', uploadedDate: '2026-02-20', size: '238 KB' },
];

const taxYearSummaries = [
  {
    year: '2026',
    ytd: true,
    totalDistributions: 10200,
    distributionCount: 5,
    deals: [
      { name: 'Midnight Heist', amount: 6200, count: 3 },
      { name: 'Last Dance', amount: 4000, count: 2 },
    ],
  },
  {
    year: '2025',
    ytd: false,
    totalDistributions: 0,
    distributionCount: 0,
    deals: [],
  },
];

export default function InvestorTaxDocumentsPage() {
  return (
    <div className={investorDensity.page}>
      <DashboardPageHeader
        title="Tax Documents"
        description="K-1 statements and tax year summaries for your investments."
      />

      {/* Tax Season Alert */}
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-950/30">
        <div className="flex gap-3">
          <AlertCircle className="size-5 shrink-0 text-yellow-600 dark:text-yellow-500" />
          <div>
            <p className="font-medium text-yellow-900 dark:text-yellow-300">Tax Season Reminder</p>
            <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-400">
              K-1 statements for tax year 2025 are now available for download. Please consult your
              tax advisor for proper reporting of investment income and distributions.
            </p>
          </div>
        </div>
      </div>

      {/* K-1 Documents */}
      <Card className={investorCardClass()}>
        <CardHeader className={investorDensity.cardHeader}>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileSpreadsheet className="size-4" />
                K-1 Statements
              </CardTitle>
              <CardDescription>Schedule K-1 documents for tax filing</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download data-icon="inline-start" />
              Download All
            </Button>
          </div>
        </CardHeader>
        <CardContent className={investorDensity.cardContentSection}>
          <div className="flex flex-col gap-2">
            {k1Documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between rounded-lg border border-border bg-card p-3 transition-colors hover:bg-muted sm:p-3.5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                    <FileText className="size-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      K-1 Statement {doc.year} — {doc.deal}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {doc.size} · Available since <DateDisplay date={doc.uploadedDate} />
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="default">Available</Badge>
                  <Button variant="outline" size="sm">
                    <Download data-icon="inline-start" />
                    Download
                  </Button>
                </div>
              </div>
            ))}

            {k1Documents.length === 0 && (
              <div className="py-8 text-center text-muted-foreground">
                <FileSpreadsheet className="mx-auto mb-2 size-10 opacity-50" />
                <p>No K-1 statements available yet</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tax Year Summaries */}
      <Card className={investorCardClass()}>
        <CardHeader className={investorDensity.cardHeader}>
          <CardTitle className="flex items-center gap-2 text-base">
            <Calendar className="size-4" />
            Tax Year Summaries
          </CardTitle>
          <CardDescription>Distribution totals by tax year for reporting</CardDescription>
        </CardHeader>
        <CardContent className={investorDensity.cardContentSection}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {taxYearSummaries.map((summary) => (
              <div
                key={summary.year}
                className="rounded-lg border border-border bg-card p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold">{summary.year}</p>
                    {summary.ytd && (
                      <Badge variant="secondary" className="text-[10px]">YTD</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="size-4" />
                    <span className="text-xl font-bold tabular-nums text-foreground">
                      <CurrencyDisplay amount={summary.totalDistributions} />
                    </span>
                  </div>
                </div>

                <p className="mb-2 text-xs text-muted-foreground">
                  {summary.distributionCount} distributions across {summary.deals.length} deals
                </p>

                {summary.deals.length > 0 ? (
                  <div className="flex flex-col gap-1.5">
                    {summary.deals.map((deal) => (
                      <div
                        key={deal.name}
                        className="flex items-center justify-between rounded-md bg-muted/30 px-3 py-2"
                      >
                        <span className="text-sm">{deal.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium tabular-nums">
                            <CurrencyDisplay amount={deal.amount} />
                          </span>
                          <Badge variant="outline" className="text-[10px]">{deal.count}x</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No distributions this year</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Important Notes */}
      <Card className={investorCardClass()}>
        <CardHeader className={investorDensity.cardHeader}>
          <CardTitle className="text-base">Important Tax Information</CardTitle>
        </CardHeader>
        <CardContent className={investorDensity.cardContentSection}>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">1</span>
              <p>K-1 statements report your share of income, deductions, and credits from StreamFi Ventures investments.</p>
            </div>
            <div className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">2</span>
              <p>These documents are typically available by March 15th following the tax year end.</p>
            </div>
            <div className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">3</span>
              <p>Consult a qualified tax professional for guidance on reporting investment income and distributions.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
