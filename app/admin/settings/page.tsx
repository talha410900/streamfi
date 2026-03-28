'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DashboardPageHeader } from '@/components/shared/dashboard-page-header';
import { cn } from '@/lib/utils';
import { adminDensity, adminCardClass } from '@/components/admin/admin-density';
import {
  Building2, Percent, Globe, Shield, Bell, Wallet, Key,
  Database, Users, Link2,
} from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className={adminDensity.page}>
      <DashboardPageHeader
        title="Settings"
        description="Organization defaults, integrations, fee structures, and admin preferences."
      />

      <Tabs defaultValue="organization" className="w-full">
        <TabsList>
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="fees">Fee Structure</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* Organization */}
        <TabsContent value="organization" className="mt-3">
          <Card className={adminCardClass()}>
            <CardHeader className={adminDensity.cardHeader}>
              <CardTitle className="flex items-center gap-2 text-base">
                <Building2 className="size-4" />
                Organization Details
              </CardTitle>
              <CardDescription>StreamFi Ventures entity and contact information</CardDescription>
            </CardHeader>
            <CardContent className={cn('flex flex-col gap-4', adminDensity.cardContent)}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FieldGroup>
                  <FieldLabel>Entity Name</FieldLabel>
                  <Input defaultValue="StreamFi Ventures LLC" />
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel>EIN / Tax ID</FieldLabel>
                  <Input defaultValue="XX-XXXXXXX" type="password" />
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel>Primary Contact Email</FieldLabel>
                  <Input defaultValue="admin@streamfi.com" type="email" />
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel>Support Email</FieldLabel>
                  <Input defaultValue="support@streamfi.com" type="email" />
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel>Business Address</FieldLabel>
                  <Input defaultValue="123 Financial District, New York, NY 10005" />
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel>Website</FieldLabel>
                  <Input defaultValue="https://streamfi.com" />
                </FieldGroup>
              </div>
              <Button className="w-fit">Save Organization Details</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fee Structure */}
        <TabsContent value="fees" className="mt-3">
          <Card className={adminCardClass()}>
            <CardHeader className={adminDensity.cardHeader}>
              <CardTitle className="flex items-center gap-2 text-base">
                <Percent className="size-4" />
                Fee Configuration
              </CardTitle>
              <CardDescription>Default fee percentages applied to revenue distributions</CardDescription>
            </CardHeader>
            <CardContent className={cn('flex flex-col gap-4', adminDensity.cardContent)}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <FieldGroup>
                  <FieldLabel>Platform Fee (%)</FieldLabel>
                  <Input type="number" defaultValue="10" min={0} max={100} />
                  <p className="text-xs text-muted-foreground">Deducted from gross revenue</p>
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel>Management Fee (%)</FieldLabel>
                  <Input type="number" defaultValue="5" min={0} max={100} />
                  <p className="text-xs text-muted-foreground">Ongoing administration fee</p>
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel>Performance Fee (%)</FieldLabel>
                  <Input type="number" defaultValue="0" min={0} max={100} />
                  <p className="text-xs text-muted-foreground">Performance-based incentive</p>
                </FieldGroup>
              </div>

              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="mb-2 text-sm font-semibold">Fee Waterfall Preview</p>
                <p className="text-xs text-muted-foreground">
                  Revenue from Lookhu → Platform Fee (10%) → Management Fee (5%) → Performance Fee (0%)
                  → Net Distributable → Investor Share (per deal %)
                </p>
              </div>

              <Button className="w-fit">Save Fee Configuration</Button>
            </CardContent>
          </Card>

          <Card className={cn('mt-4', adminCardClass())}>
            <CardHeader className={adminDensity.cardHeader}>
              <CardTitle className="text-base">Deal Defaults</CardTitle>
              <CardDescription>Default values when creating new deals</CardDescription>
            </CardHeader>
            <CardContent className={cn('flex flex-col gap-4', adminDensity.cardContent)}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <FieldGroup>
                  <FieldLabel>Default Minimum Investment</FieldLabel>
                  <Input type="number" defaultValue="10000" />
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel>Default Revenue Share (%)</FieldLabel>
                  <Input type="number" defaultValue="15" />
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel>Default Unit Price</FieldLabel>
                  <Input type="number" defaultValue="10" />
                </FieldGroup>
              </div>
              <Button className="w-fit">Save Defaults</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations" className="mt-3">
          <div className="flex flex-col gap-4">
            <Card className={adminCardClass()}>
              <CardHeader className={adminDensity.cardHeader}>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Wallet className="size-4" />
                  Solana Configuration
                </CardTitle>
                <CardDescription>Blockchain network and treasury wallet settings</CardDescription>
              </CardHeader>
              <CardContent className={cn('flex flex-col gap-4', adminDensity.cardContent)}>
                <FieldGroup>
                  <FieldLabel>Network</FieldLabel>
                  <Select defaultValue="mainnet">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mainnet">Mainnet</SelectItem>
                      <SelectItem value="devnet">Devnet</SelectItem>
                    </SelectContent>
                  </Select>
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel>Treasury Wallet Address</FieldLabel>
                  <Input defaultValue="StreamFiTreasury...xxxxx" className="font-mono" />
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel>RPC Endpoint</FieldLabel>
                  <Input defaultValue="https://api.mainnet-beta.solana.com" />
                </FieldGroup>
                <Button className="w-fit">Save Solana Settings</Button>
              </CardContent>
            </Card>

            <Card className={adminCardClass()}>
              <CardHeader className={adminDensity.cardHeader}>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Link2 className="size-4" />
                  External Services
                </CardTitle>
              </CardHeader>
              <CardContent className={adminDensity.cardContent}>
                <div className="flex flex-col gap-3">
                  {[
                    { name: 'Lookhu', status: 'connected', desc: 'Revenue data feed and show management' },
                    { name: 'StreamScore', status: 'connected', desc: 'Valuation analytics API' },
                    { name: 'Supabase', status: 'pending', desc: 'Database and authentication' },
                    { name: 'SendGrid', status: 'pending', desc: 'Email notifications and K-1 delivery' },
                  ].map((service) => (
                    <div key={service.name} className="flex items-center justify-between rounded-lg border border-border p-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{service.name}</p>
                          <Badge variant={service.status === 'connected' ? 'default' : 'secondary'}>
                            {service.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{service.desc}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        {service.status === 'connected' ? 'Configure' : 'Connect'}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="mt-3">
          <Card className={adminCardClass()}>
            <CardHeader className={adminDensity.cardHeader}>
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="size-4" />
                Admin Security
              </CardTitle>
            </CardHeader>
            <CardContent className={cn('flex flex-col gap-4', adminDensity.cardContent)}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FieldGroup>
                  <FieldLabel>Admin Email</FieldLabel>
                  <Input defaultValue="admin@streamfi.com" type="email" />
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel>Change Password</FieldLabel>
                  <Input type="password" placeholder="New password" />
                </FieldGroup>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <p className="text-sm font-medium">Two-Factor Authentication</p>
                    <p className="text-xs text-muted-foreground">Require 2FA for admin login</p>
                  </div>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <p className="text-sm font-medium">Session Timeout</p>
                    <p className="text-xs text-muted-foreground">Auto-logout after inactivity</p>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="w-fit">Save Security Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="mt-3">
          <Card className={adminCardClass()}>
            <CardHeader className={adminDensity.cardHeader}>
              <CardTitle className="flex items-center gap-2 text-base">
                <Bell className="size-4" />
                Admin Notifications
              </CardTitle>
              <CardDescription>Choose which events trigger admin alerts</CardDescription>
            </CardHeader>
            <CardContent className={adminDensity.cardContent}>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'New investor signup', desc: 'When a new investor creates an account' },
                  { label: 'KYC submission', desc: 'When an investor submits KYC documents' },
                  { label: 'Investment committed', desc: 'When funding is confirmed for a deal' },
                  { label: 'Revenue received', desc: 'When new revenue is logged from Lookhu' },
                  { label: 'Distribution completed', desc: 'When a distribution is fully processed' },
                  { label: 'Deal milestone', desc: 'Production status changes and deal updates' },
                ].map((pref) => (
                  <div key={pref.label} className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
                    <div>
                      <p className="text-sm font-medium">{pref.label}</p>
                      <p className="text-xs text-muted-foreground">{pref.desc}</p>
                    </div>
                    <input type="checkbox" defaultChecked className="size-4 rounded border-border" />
                  </div>
                ))}
              </div>
              <Button className="mt-4 w-fit">Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
