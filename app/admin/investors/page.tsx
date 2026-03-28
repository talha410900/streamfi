'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Modal } from '@/components/shared/modal';
import { CurrencyDisplay } from '@/components/shared/currency-display';
import { DateDisplay } from '@/components/shared/date-display';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import {
  Search, Users, DollarSign, Wallet, Coins,
  Mail, Phone, Building, Eye, CheckCircle, XCircle, Clock,
  UserPlus, Copy, AlertCircle, ArrowRight, Send,
  ShieldCheck, FileText, CircleDollarSign, KeyRound,
} from 'lucide-react';
import { DashboardPageHeader } from '@/components/shared/dashboard-page-header';
import { cn } from '@/lib/utils';
import { adminDensity, adminCardClass } from '@/components/admin/admin-density';
import { type OnboardingStep, ONBOARDING_STEPS } from '@/lib/auth';

type InvestorOnboardingStep = OnboardingStep;

interface MockInvestor {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  wallet_address: string;
  onboarding_step: InvestorOnboardingStep;
  kyc_status: 'not_started' | 'pending' | 'verified' | 'rejected';
  accreditation_status: 'not_submitted' | 'pending' | 'verified' | 'rejected';
  questionnaire_status: 'not_started' | 'incomplete' | 'complete';
  document_status: 'not_started' | 'pending' | 'signed';
  funding_status: 'not_started' | 'pending' | 'confirmed';
  token_status: 'not_started' | 'pending' | 'issued';
  total_invested: number;
  deals: {
    deal_id: number;
    deal_name: string;
    amount: number;
    units: number;
    tokens_issued: boolean;
    distributions: number;
  }[];
  documents: {
    type: string;
    status: string;
    date: string;
  }[];
  total_distributions: number;
  created_at: string;
  created_by: string;
  temp_password: boolean;
  last_login: string | null;
}

const STEP_ICONS: Record<string, typeof CheckCircle> = {
  account_created: UserPlus,
  kyc: ShieldCheck,
  questionnaire: FileText,
  documents: FileText,
  funding: CircleDollarSign,
  token_issuance: Coins,
};

const mockInvestors: MockInvestor[] = [
  {
    id: 1,
    name: 'John Investor',
    email: 'john.investor@email.com',
    phone: '+1 (555) 123-4567',
    company: 'Investment Holdings LLC',
    wallet_address: '9B5X7kKQz1j4mL2pN8r5sT6vX9y2w4z6B1c3d5f7h9',
    onboarding_step: 'completed',
    kyc_status: 'verified',
    accreditation_status: 'verified',
    questionnaire_status: 'complete',
    document_status: 'signed',
    funding_status: 'confirmed',
    token_status: 'issued',
    total_invested: 175000,
    deals: [
      { deal_id: 1, deal_name: 'Midnight Heist', amount: 100000, units: 10000, tokens_issued: true, distributions: 2500 },
      { deal_id: 2, deal_name: 'Last Dance', amount: 75000, units: 1500, tokens_issued: true, distributions: 1200 },
    ],
    documents: [
      { type: 'Subscription Agreement', status: 'signed', date: '2026-02-15' },
      { type: 'KYC Documents', status: 'verified', date: '2026-02-10' },
      { type: 'Accreditation', status: 'verified', date: '2026-02-10' },
      { type: 'Questionnaire', status: 'complete', date: '2026-02-12' },
    ],
    total_distributions: 3700,
    created_at: '2026-02-01',
    created_by: 'Admin User',
    temp_password: false,
    last_login: '2026-03-27',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    phone: '+1 (555) 234-5678',
    company: 'Smith Capital',
    wallet_address: '',
    onboarding_step: 'documents',
    kyc_status: 'verified',
    accreditation_status: 'verified',
    questionnaire_status: 'complete',
    document_status: 'pending',
    funding_status: 'not_started',
    token_status: 'not_started',
    total_invested: 0,
    deals: [],
    documents: [
      { type: 'KYC Documents', status: 'verified', date: '2026-03-05' },
      { type: 'Accreditation', status: 'verified', date: '2026-03-05' },
      { type: 'Questionnaire', status: 'complete', date: '2026-03-08' },
    ],
    total_distributions: 0,
    created_at: '2026-03-01',
    created_by: 'Admin User',
    temp_password: false,
    last_login: '2026-03-25',
  },
  {
    id: 3,
    name: 'Robert Jones',
    email: 'robert.jones@email.com',
    phone: '+1 (555) 345-6789',
    company: 'Jones Family Trust',
    wallet_address: '',
    onboarding_step: 'questionnaire',
    kyc_status: 'verified',
    accreditation_status: 'verified',
    questionnaire_status: 'incomplete',
    document_status: 'not_started',
    funding_status: 'not_started',
    token_status: 'not_started',
    total_invested: 0,
    deals: [],
    documents: [
      { type: 'KYC Documents', status: 'verified', date: '2026-03-10' },
      { type: 'Accreditation', status: 'verified', date: '2026-03-10' },
    ],
    total_distributions: 0,
    created_at: '2026-03-05',
    created_by: 'Admin User',
    temp_password: false,
    last_login: '2026-03-22',
  },
  {
    id: 4,
    name: 'Sarah Williams',
    email: 'sarah.williams@email.com',
    phone: '+1 (555) 456-7890',
    company: 'Williams Ventures',
    wallet_address: '',
    onboarding_step: 'kyc',
    kyc_status: 'pending',
    accreditation_status: 'not_submitted',
    questionnaire_status: 'not_started',
    document_status: 'not_started',
    funding_status: 'not_started',
    token_status: 'not_started',
    total_invested: 0,
    deals: [],
    documents: [],
    total_distributions: 0,
    created_at: '2026-03-20',
    created_by: 'Admin User',
    temp_password: true,
    last_login: null,
  },
  {
    id: 5,
    name: 'Mike Chen',
    email: 'mike.chen@email.com',
    phone: '+1 (555) 567-8901',
    company: 'Chen Investments',
    wallet_address: '',
    onboarding_step: 'account_created',
    kyc_status: 'not_started',
    accreditation_status: 'not_submitted',
    questionnaire_status: 'not_started',
    document_status: 'not_started',
    funding_status: 'not_started',
    token_status: 'not_started',
    total_invested: 0,
    deals: [],
    documents: [],
    total_distributions: 0,
    created_at: '2026-03-26',
    created_by: 'Admin User',
    temp_password: true,
    last_login: null,
  },
];

function getStepIndex(step: InvestorOnboardingStep): number {
  if (step === 'completed') return ONBOARDING_STEPS.length;
  return ONBOARDING_STEPS.findIndex((s) => s.key === step);
}

function getOnboardingPercentage(step: InvestorOnboardingStep): number {
  if (step === 'completed') return 100;
  const idx = getStepIndex(step);
  return Math.round((idx / ONBOARDING_STEPS.length) * 100);
}

function getOnboardingStatusLabel(step: InvestorOnboardingStep): string {
  if (step === 'completed') return 'Completed';
  const current = ONBOARDING_STEPS.find((s) => s.key === step);
  return current ? `At: ${current.label}` : 'Unknown';
}

function getOnboardingBadgeVariant(step: InvestorOnboardingStep): 'default' | 'secondary' | 'outline' {
  if (step === 'completed') return 'default';
  if (step === 'account_created') return 'outline';
  return 'secondary';
}

export default function AdminInvestorsPage() {
  const [investors, setInvestors] = useState(mockInvestors);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInvestor, setSelectedInvestor] = useState<MockInvestor | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({ name: '', email: '', company: '', phone: '' });
  const [createLoading, setCreateLoading] = useState(false);
  const [createSuccess, setCreateSuccess] = useState<{ email: string; password: string } | null>(null);
  const [createError, setCreateError] = useState('');
  const [copiedPassword, setCopiedPassword] = useState(false);

  const filteredInvestors = investors.filter((inv) => {
    const matchesSearch =
      inv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.company.toLowerCase().includes(searchQuery.toLowerCase());
    if (statusFilter === 'all') return matchesSearch;
    if (statusFilter === 'completed') return matchesSearch && inv.onboarding_step === 'completed';
    if (statusFilter === 'in_progress')
      return matchesSearch && inv.onboarding_step !== 'completed' && inv.onboarding_step !== 'account_created';
    if (statusFilter === 'not_started') return matchesSearch && inv.onboarding_step === 'account_created';
    return matchesSearch;
  });

  const totalInvested = investors.reduce((sum, inv) => sum + inv.total_invested, 0);
  const completedCount = investors.filter((inv) => inv.onboarding_step === 'completed').length;
  const inProgressCount = investors.filter(
    (inv) => inv.onboarding_step !== 'completed' && inv.onboarding_step !== 'account_created',
  ).length;
  const notStartedCount = investors.filter((inv) => inv.onboarding_step === 'account_created').length;

  function generateTempPassword() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let pw = '';
    for (let i = 0; i < 12; i++) pw += chars[Math.floor(Math.random() * chars.length)];
    return pw;
  }

  async function handleCreateInvestor(e: React.FormEvent) {
    e.preventDefault();
    setCreateError('');
    setCreateLoading(true);

    if (!createForm.name.trim() || !createForm.email.trim()) {
      setCreateError('Name and email are required');
      setCreateLoading(false);
      return;
    }

    if (investors.some((inv) => inv.email === createForm.email.trim())) {
      setCreateError('An investor with this email already exists');
      setCreateLoading(false);
      return;
    }

    await new Promise((r) => setTimeout(r, 800));

    const tempPassword = generateTempPassword();
    const newInvestor: MockInvestor = {
      id: Date.now(),
      name: createForm.name.trim(),
      email: createForm.email.trim(),
      phone: createForm.phone.trim(),
      company: createForm.company.trim(),
      wallet_address: '',
      onboarding_step: 'account_created',
      kyc_status: 'not_started',
      accreditation_status: 'not_submitted',
      questionnaire_status: 'not_started',
      document_status: 'not_started',
      funding_status: 'not_started',
      token_status: 'not_started',
      total_invested: 0,
      deals: [],
      documents: [],
      total_distributions: 0,
      created_at: new Date().toISOString().split('T')[0],
      created_by: 'Admin User',
      temp_password: true,
      last_login: null,
    };

    setInvestors((prev) => [newInvestor, ...prev]);
    setCreateSuccess({ email: createForm.email.trim(), password: tempPassword });
    setCreateLoading(false);
  }

  function resetCreateModal() {
    setShowCreateModal(false);
    setCreateForm({ name: '', email: '', company: '', phone: '' });
    setCreateSuccess(null);
    setCreateError('');
    setCopiedPassword(false);
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    setCopiedPassword(true);
    setTimeout(() => setCopiedPassword(false), 2000);
  }

  return (
    <div className={adminDensity.page}>
      <DashboardPageHeader
        title="Investors"
        description="Create accounts, track onboarding progress, and manage investor profiles."
        actions={
          <Button onClick={() => setShowCreateModal(true)} className="gap-2">
            <UserPlus className="size-4" />
            Create Investor Account
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        <Card className={adminCardClass()}>
          <CardContent className={cn('flex flex-col gap-2 pt-4', adminDensity.cardContent)}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="size-4 shrink-0" />
              <span className="text-xs font-medium uppercase tracking-wide">Total</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums">{investors.length}</p>
          </CardContent>
        </Card>
        <Card className={adminCardClass()}>
          <CardContent className={cn('flex flex-col gap-2 pt-4', adminDensity.cardContent)}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle className="size-4 shrink-0" />
              <span className="text-xs font-medium uppercase tracking-wide">Onboarded</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums">{completedCount}</p>
          </CardContent>
        </Card>
        <Card className={adminCardClass()}>
          <CardContent className={cn('flex flex-col gap-2 pt-4', adminDensity.cardContent)}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="size-4 shrink-0" />
              <span className="text-xs font-medium uppercase tracking-wide">In Progress</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums">{inProgressCount}</p>
          </CardContent>
        </Card>
        <Card className={adminCardClass()}>
          <CardContent className={cn('flex flex-col gap-2 pt-4', adminDensity.cardContent)}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="size-4 shrink-0" />
              <span className="text-xs font-medium uppercase tracking-wide">Invested</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums">
              <CurrencyDisplay amount={totalInvested} />
            </p>
          </CardContent>
        </Card>
      </div>

      {notStartedCount > 0 && (
        <Alert>
          <AlertCircle className="size-4" />
          <AlertDescription>
            <strong>{notStartedCount}</strong> investor{notStartedCount > 1 ? 's have' : ' has'} not
            started onboarding yet. They may need a reminder to log in with their temporary credentials.
          </AlertDescription>
        </Alert>
      )}

      <Card className={adminCardClass()}>
        <CardContent className={cn('py-3', adminDensity.cardContent)}>
          <div className="flex gap-3">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-50">
                <SelectValue placeholder="Filter by onboarding" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Investors</SelectItem>
                <SelectItem value="completed">Onboarding Complete</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="not_started">Not Started</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className={adminCardClass()}>
        <CardHeader className={adminDensity.cardHeader}>
          <CardTitle className="text-base">All Investors</CardTitle>
          <CardDescription>{filteredInvestors.length} investors found</CardDescription>
        </CardHeader>
        <CardContent className={adminDensity.cardContentSection}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Investor</th>
                  <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Onboarding</th>
                  <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Progress</th>
                  <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Invested</th>
                  <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Deals</th>
                  <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Created</th>
                  <th className={cn('text-left font-semibold', adminDensity.tableHead)}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvestors.map((investor) => {
                  const pct = getOnboardingPercentage(investor.onboarding_step);
                  const stepIdx = getStepIndex(investor.onboarding_step);
                  const total = ONBOARDING_STEPS.length;
                  return (
                    <tr key={investor.id} className="border-b border-border/50 hover:bg-card">
                      <td className={adminDensity.tableCell}>
                        <div className="flex items-center gap-3">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                            {investor.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </div>
                          <div>
                            <p className="font-semibold">{investor.name}</p>
                            <p className="text-xs text-muted-foreground">{investor.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className={adminDensity.tableCell}>
                        <Badge variant={getOnboardingBadgeVariant(investor.onboarding_step)}>
                          {investor.onboarding_step === 'completed'
                            ? 'Complete'
                            : investor.onboarding_step === 'account_created'
                              ? 'Not Started'
                              : getOnboardingStatusLabel(investor.onboarding_step)}
                        </Badge>
                      </td>
                      <td className={adminDensity.tableCell}>
                        <div className="flex items-center gap-2">
                          <Progress value={pct} className="h-1.5 w-20" />
                          <span className="text-xs tabular-nums text-muted-foreground">
                            {investor.onboarding_step === 'completed' ? total : stepIdx}/{total}
                          </span>
                        </div>
                      </td>
                      <td className={adminDensity.tableCell}>
                        <CurrencyDisplay amount={investor.total_invested} />
                      </td>
                      <td className={adminDensity.tableCell}>{investor.deals.length}</td>
                      <td className={adminDensity.tableCell}>
                        <DateDisplay date={investor.created_at} />
                      </td>
                      <td className={adminDensity.tableCell}>
                        <Button variant="outline" size="sm" onClick={() => setSelectedInvestor(investor)}>
                          <Eye className="size-3 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  );
                })}
                {filteredInvestors.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-muted-foreground">
                      No investors match your search or filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* ── Create Investor Account Modal ── */}
      <Modal
        isOpen={showCreateModal}
        onClose={resetCreateModal}
        title="Create Investor Account"
        subtitle="Admin-initiated account for private fund. A temporary password will be generated."
        size="md"
      >
        {createSuccess ? (
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3 rounded-lg bg-chart-1/10 p-4">
              <CheckCircle className="size-6 text-chart-1 shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Account Created Successfully</p>
                <p className="text-sm text-muted-foreground">
                  Send the credentials below to the investor so they can log in and complete onboarding.
                </p>
              </div>
            </div>

            <Card className="border-border">
              <CardContent className="pt-4 flex flex-col gap-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Email</p>
                  <p className="text-sm font-medium">{createSuccess.email}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Temporary Password</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 rounded-lg bg-muted px-3 py-2 font-mono text-sm">
                      {createSuccess.password}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(createSuccess.password)}
                      className="gap-1.5"
                    >
                      <Copy className="size-3.5" />
                      {copiedPassword ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-3">
                  <p className="text-xs text-muted-foreground">
                    The investor will be prompted to change their password on first login.
                    They must complete the full 6-step onboarding process: KYC, Questionnaire,
                    Document Signing, Funding Confirmation, and Token Issuance.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={resetCreateModal}>
                Close
              </Button>
              <Button
                onClick={() => {
                  const body = `Your StreamFi Ventures investor account has been created.\n\nLogin: ${createSuccess.email}\nTemporary Password: ${createSuccess.password}\n\nPlease log in at the portal to complete your onboarding.`;
                  copyToClipboard(body);
                }}
                className="gap-2"
              >
                <Send className="size-4" />
                Copy Invite Message
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleCreateInvestor} className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <FieldGroup className="col-span-2">
                <FieldLabel>Full Name *</FieldLabel>
                <Input
                  placeholder="e.g. John Smith"
                  value={createForm.name}
                  onChange={(e) => setCreateForm((p) => ({ ...p, name: e.target.value }))}
                  disabled={createLoading}
                />
              </FieldGroup>
              <FieldGroup className="col-span-2">
                <FieldLabel>Email Address *</FieldLabel>
                <Input
                  type="email"
                  placeholder="john@company.com"
                  value={createForm.email}
                  onChange={(e) => setCreateForm((p) => ({ ...p, email: e.target.value }))}
                  disabled={createLoading}
                />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Company / Entity</FieldLabel>
                <Input
                  placeholder="e.g. Smith Capital"
                  value={createForm.company}
                  onChange={(e) => setCreateForm((p) => ({ ...p, company: e.target.value }))}
                  disabled={createLoading}
                />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Phone</FieldLabel>
                <Input
                  placeholder="+1 (555) 000-0000"
                  value={createForm.phone}
                  onChange={(e) => setCreateForm((p) => ({ ...p, phone: e.target.value }))}
                  disabled={createLoading}
                />
              </FieldGroup>
            </div>

            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <p className="text-xs font-medium text-muted-foreground mb-1">What happens next?</p>
              <ol className="text-xs text-muted-foreground flex flex-col gap-1 list-decimal list-inside">
                <li>A temporary password is auto-generated</li>
                <li>You share credentials with the investor</li>
                <li>Investor logs in and completes 6-step onboarding</li>
                <li>You track their progress from this page</li>
              </ol>
            </div>

            {createError && (
              <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <AlertDescription>{createError}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-3 justify-end">
              <Button type="button" variant="outline" onClick={resetCreateModal} disabled={createLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={createLoading} className="gap-2">
                {createLoading ? (
                  'Creating...'
                ) : (
                  <>
                    <UserPlus className="size-4" />
                    Create Account
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* ── Investor Detail Modal with 6-Step Onboarding Tracker ── */}
      <Modal
        isOpen={!!selectedInvestor}
        onClose={() => setSelectedInvestor(null)}
        title={selectedInvestor?.name || 'Investor Details'}
        subtitle="Account details and onboarding progress"
        size="lg"
      >
        {selectedInvestor && (
          <InvestorDetailView
            investor={selectedInvestor}
            onClose={() => setSelectedInvestor(null)}
          />
        )}
      </Modal>
    </div>
  );
}

function InvestorDetailView({
  investor,
  onClose,
}: {
  investor: MockInvestor;
  onClose: () => void;
}) {
  const stepIdx = getStepIndex(investor.onboarding_step);
  const isComplete = investor.onboarding_step === 'completed';
  const pct = getOnboardingPercentage(investor.onboarding_step);

  return (
    <Tabs defaultValue="onboarding" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="onboarding" className="text-xs">
          Onboarding
        </TabsTrigger>
        <TabsTrigger value="profile" className="text-xs">
          Profile
        </TabsTrigger>
        <TabsTrigger value="investments" className="text-xs">
          Investments
        </TabsTrigger>
        <TabsTrigger value="documents" className="text-xs">
          Documents
        </TabsTrigger>
      </TabsList>

      {/* ── Onboarding Progress Tab ── */}
      <TabsContent value="onboarding" className="mt-4">
        <div className="flex flex-col gap-5">
          {/* Progress header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">
                {isComplete ? 'Onboarding Complete' : 'Onboarding In Progress'}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isComplete
                  ? 'All 6 steps completed. Investor is fully onboarded.'
                  : `Step ${stepIdx} of ${ONBOARDING_STEPS.length} completed`}
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold tabular-nums">{pct}%</span>
            </div>
          </div>

          <Progress value={pct} className="h-2" />

          {/* 6-Step Timeline */}
          <div className="flex flex-col gap-0">
            {ONBOARDING_STEPS.map((step, i) => {
              const isDone = isComplete || i < stepIdx;
              const isCurrent = !isComplete && i === stepIdx;
              const isPending = !isComplete && i > stepIdx;
              const StepIcon = STEP_ICONS[step.key] || CheckCircle;

              let statusColor = 'text-muted-foreground bg-muted';
              let lineColor = 'bg-border';
              if (isDone) {
                statusColor = 'text-chart-1 bg-chart-1/10';
                lineColor = 'bg-chart-1';
              } else if (isCurrent) {
                statusColor = 'text-primary bg-primary/10';
              }

              return (
                <div key={step.key} className="flex gap-4">
                  {/* Connector line + icon */}
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        'flex size-9 shrink-0 items-center justify-center rounded-full transition-colors',
                        statusColor,
                      )}
                    >
                      {isDone ? (
                        <CheckCircle className="size-4" />
                      ) : isCurrent ? (
                        <StepIcon className="size-4 animate-pulse" />
                      ) : (
                        <StepIcon className="size-4" />
                      )}
                    </div>
                    {i < ONBOARDING_STEPS.length - 1 && (
                      <div className={cn('w-0.5 flex-1 min-h-6', lineColor)} />
                    )}
                  </div>

                  {/* Step content */}
                  <div className={cn('pb-5', i === ONBOARDING_STEPS.length - 1 && 'pb-0')}>
                    <div className="flex items-center gap-2">
                      <p
                        className={cn(
                          'text-sm font-medium',
                          isDone
                            ? 'text-foreground'
                            : isCurrent
                              ? 'text-foreground'
                              : 'text-muted-foreground',
                        )}
                      >
                        {step.label}
                      </p>
                      {isDone && (
                        <Badge variant="default" className="text-[10px] px-1.5 py-0">
                          Done
                        </Badge>
                      )}
                      {isCurrent && (
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                          Current Step
                        </Badge>
                      )}
                      {isPending && (
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                          Pending
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>

                    {isCurrent && (
                      <div className="mt-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2">
                        <p className="text-xs text-primary font-medium">
                          Waiting for investor to complete this step
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Admin actions */}
          {!isComplete && (
            <div className="flex flex-col gap-3 border-t border-border pt-4">
              <p className="text-xs font-medium text-muted-foreground">Admin Actions</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Send className="size-3.5" />
                  Send Reminder
                </Button>
                {investor.temp_password && (
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <KeyRound className="size-3.5" />
                    Reset Password
                  </Button>
                )}
                <Button variant="outline" size="sm" className="gap-1.5">
                  <ArrowRight className="size-3.5" />
                  Advance Step
                </Button>
              </div>
            </div>
          )}

          {/* Account metadata */}
          <div className="rounded-lg border border-border bg-muted/30 p-3 flex flex-col gap-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Account Created</span>
              <span className="font-medium">
                <DateDisplay date={investor.created_at} />
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Created By</span>
              <span className="font-medium">{investor.created_by}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Last Login</span>
              <span className="font-medium">
                {investor.last_login ? <DateDisplay date={investor.last_login} /> : 'Never'}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Temp Password Active</span>
              <span className="font-medium">{investor.temp_password ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>
      </TabsContent>

      {/* ── Profile Tab ── */}
      <TabsContent value="profile" className="mt-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <Mail className="size-4 text-muted-foreground" />
            <span className="text-sm">{investor.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="size-4 text-muted-foreground" />
            <span className="text-sm">{investor.phone || '—'}</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <Building className="size-4 text-muted-foreground" />
            <span className="text-sm">{investor.company || '—'}</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <Wallet className="size-4 text-muted-foreground" />
            {investor.wallet_address ? (
              <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                {investor.wallet_address}
              </code>
            ) : (
              <span className="text-xs text-muted-foreground">No wallet connected</span>
            )}
          </div>
        </div>
        <div className="mt-3 border-t border-border pt-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Registered</p>
              <p className="text-sm font-medium">
                <DateDisplay date={investor.created_at} />
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Distributions</p>
              <p className="text-sm font-medium">
                <CurrencyDisplay amount={investor.total_distributions} />
              </p>
            </div>
          </div>
        </div>
      </TabsContent>

      {/* ── Investments Tab ── */}
      <TabsContent value="investments" className="mt-4">
        {investor.deals.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <p>No investments yet</p>
            {!isComplete && (
              <p className="text-xs mt-1">Investor needs to complete onboarding first</p>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {investor.deals.map((deal, idx) => (
              <div key={idx} className="p-3 bg-card rounded-lg border border-border/50">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium">{deal.deal_name}</p>
                  <CurrencyDisplay amount={deal.amount} />
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                  <div>Units: {deal.units.toLocaleString()}</div>
                  <div>Tokens: {deal.tokens_issued ? 'Issued' : 'Pending'}</div>
                  <div>
                    Distributions: <CurrencyDisplay amount={deal.distributions} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </TabsContent>

      {/* ── Documents Tab ── */}
      <TabsContent value="documents" className="mt-4">
        {investor.documents.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <p>No documents on file</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {investor.documents.map((doc, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-card rounded-lg">
                <div>
                  <p className="text-sm font-medium">{doc.type}</p>
                  <p className="text-xs text-muted-foreground">
                    {doc.date !== '-' ? <DateDisplay date={doc.date} /> : 'Not submitted'}
                  </p>
                </div>
                <Badge
                  variant={
                    doc.status === 'signed' || doc.status === 'verified' || doc.status === 'complete'
                      ? 'default'
                      : 'secondary'
                  }
                >
                  {doc.status}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
