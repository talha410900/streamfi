import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function InvestorSettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your investor preferences</p>
      </div>

      <Card className="border border-border/50">
        <CardHeader>
          <CardTitle>Investor Settings</CardTitle>
          <CardDescription>Customize your account preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Settings interface coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
