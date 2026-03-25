import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function AdminSettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage admin preferences and system settings</p>
      </div>

      <Card className="border border-border/50">
        <CardHeader>
          <CardTitle>Admin Settings</CardTitle>
          <CardDescription>Configure your admin preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Settings interface coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
