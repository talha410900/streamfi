import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DashboardPageHeader } from '@/components/shared/dashboard-page-header';
import {
  investorDensity,
  investorCardClass,
} from '@/components/investor/investor-density';

export default function InvestorSettingsPage() {
  return (
    <div className={investorDensity.page}>
      <DashboardPageHeader
        title="Settings"
        description="Profile, notifications, and account preferences."
      />

      <Card className={investorCardClass()}>
        <CardHeader className={investorDensity.cardHeader}>
          <CardTitle className="text-base font-semibold">Investor settings</CardTitle>
          <CardDescription>Customize how you use the portal</CardDescription>
        </CardHeader>
        <CardContent className={investorDensity.cardContentSection}>
          <p className="text-sm text-muted-foreground">Settings interface coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
