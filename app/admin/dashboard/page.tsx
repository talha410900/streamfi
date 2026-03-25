import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AdminStats } from '@/components/admin/admin-stats';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage deals, investors, and platform operations</p>
      </div>

      <AdminStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-border/50">
          <CardHeader className="border-b border-border/50">
            <CardTitle className="text-lg font-semibold">Recent Deals</CardTitle>
            <CardDescription>Latest investment opportunities</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-3">
              <div className="pb-3 border-b border-border/30">
                <p className="font-semibold text-sm text-foreground">Midnight Heist</p>
                <p className="text-xs text-muted-foreground mt-1">Raise: $500K · Status: Open</p>
              </div>
              <div className="pb-3 border-b border-border/30">
                <p className="font-semibold text-sm text-foreground">Last Dance</p>
                <p className="text-xs text-muted-foreground mt-1">Raise: $1M · Status: Funded</p>
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">Mystery Box</p>
                <p className="text-xs text-muted-foreground mt-1">Raise: $750K · Status: Draft</p>
              </div>
            </div>
            <Link href="/admin/deals" className="block mt-4">
              <Button variant="outline" className="w-full">
                View All Deals
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border border-border/50">
          <CardHeader className="border-b border-border/50">
            <CardTitle className="text-lg font-semibold">Pending Approvals</CardTitle>
            <CardDescription>Investors awaiting review</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-3">
              <div className="pb-3 border-b border-border/30">
                <p className="font-semibold text-sm text-foreground">john.investor@email.com</p>
                <p className="text-xs text-muted-foreground mt-1">Awaiting KYC Review</p>
              </div>
              <div className="pb-3 border-b border-border/30">
                <p className="font-semibold text-sm text-foreground">jane.smith@email.com</p>
                <p className="text-xs text-muted-foreground mt-1">Document Signature Pending</p>
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">robert.jones@email.com</p>
                <p className="text-xs text-muted-foreground mt-1">Questionnaire Incomplete</p>
              </div>
            </div>
            <Link href="/admin/investors" className="block mt-4">
              <Button variant="outline" className="w-full">
                Review Investors
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
