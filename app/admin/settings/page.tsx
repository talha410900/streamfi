import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DashboardPageHeader } from '@/components/shared/dashboard-page-header';
import { adminDensity, adminCardClass } from '@/components/admin/admin-density';

export default function AdminSettingsPage() {
  return (
    <div className={adminDensity.page}>
      <DashboardPageHeader
        title="Settings"
        description="Organization defaults, integrations, and admin preferences."
      />

      <Card className={adminCardClass()}>
        <CardHeader className={adminDensity.cardHeader}>
          <CardTitle className="text-base font-semibold">Admin settings</CardTitle>
          <CardDescription>Configure how the operations console behaves</CardDescription>
        </CardHeader>
        <CardContent className={adminDensity.cardContent}>
          <p className="text-sm text-muted-foreground">Settings interface coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
