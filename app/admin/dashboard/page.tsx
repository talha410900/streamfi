import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AdminStats } from '@/components/admin/admin-stats';
import { Button } from '@/components/ui/button';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from '@/components/ui/item';
import { DashboardPageHeader } from '@/components/shared/dashboard-page-header';
import { adminDensity, adminCardClass } from '@/components/admin/admin-density';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const recentDeals = [
  { name: 'Midnight Heist', detail: 'Raise $500K · Open' },
  { name: 'Last Dance', detail: 'Raise $1M · Funded' },
  { name: 'Mystery Box', detail: 'Raise $750K · Draft' },
];

const pendingInvestors = [
  { name: 'john.investor@email.com', detail: 'KYC review' },
  { name: 'jane.smith@email.com', detail: 'Subscription signature' },
  { name: 'robert.jones@email.com', detail: 'Questionnaire incomplete' },
];

export default function AdminDashboardPage() {
  return (
    <div className={adminDensity.page}>
      <DashboardPageHeader
        title="Overview"
        description="Deals, capital, compliance, and distributions in one place."
      />

      <AdminStats />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
        <Card className={adminCardClass()}>
          <CardHeader className={cn('pb-3', adminDensity.cardHeader)}>
            <CardTitle className="text-base font-semibold">Recent deals</CardTitle>
            <CardDescription>Latest show offerings on the platform</CardDescription>
          </CardHeader>
          <CardContent className={cn('pt-0', adminDensity.cardContent)}>
            <ItemGroup className="gap-0">
              {recentDeals.map((row, i) => (
                <div key={row.name}>
                  {i > 0 ? <ItemSeparator /> : null}
                  <Item variant="outline" size="sm" className="border-0 shadow-none">
                    <ItemContent>
                      <ItemTitle>{row.name}</ItemTitle>
                      <ItemDescription>{row.detail}</ItemDescription>
                    </ItemContent>
                  </Item>
                </div>
              ))}
            </ItemGroup>
            <Link href="/admin/deals" className="mt-3 block">
              <Button variant="outline" className="w-full">
                View all deals
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className={adminCardClass()}>
          <CardHeader className={cn('pb-3', adminDensity.cardHeader)}>
            <CardTitle className="text-base font-semibold">Queue</CardTitle>
            <CardDescription>Investors needing attention</CardDescription>
          </CardHeader>
          <CardContent className={cn('pt-0', adminDensity.cardContent)}>
            <ItemGroup className="gap-0">
              {pendingInvestors.map((row, i) => (
                <div key={row.name}>
                  {i > 0 ? <ItemSeparator /> : null}
                  <Item variant="outline" size="sm" className="border-0 shadow-none">
                    <ItemContent>
                      <ItemTitle className="font-normal">{row.name}</ItemTitle>
                      <ItemDescription>{row.detail}</ItemDescription>
                    </ItemContent>
                  </Item>
                </div>
              ))}
            </ItemGroup>
            <Link href="/admin/investors" className="mt-3 block">
              <Button variant="outline" className="w-full">
                Open investors
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
