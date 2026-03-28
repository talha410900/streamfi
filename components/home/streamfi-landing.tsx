'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ChartBar,
  Clapperboard,
  Eye,
  FileCheck,
  Film,
  Globe,
  Landmark,
  Link2,
  Lock,
  Network,
  PieChart,
  Radio,
  Scale,
  Shield,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  Wallet,
} from 'lucide-react';

import { useAuth } from '@/lib/hooks/use-auth';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { BlurFade } from '@/components/ui/blur-fade';
import { BorderBeam } from '@/components/ui/border-beam';
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid';
import { DotPattern } from '@/components/ui/dot-pattern';
import { GridPattern } from '@/components/ui/grid-pattern';
import { Marquee } from '@/components/ui/marquee';
import { BRAND_NAME } from '@/lib/constants';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { cn } from '@/lib/utils';

const HERO_PILLS = [
  'StreamScore valuation',
  'Solana on-chain settlement',
  'Lookhu production network',
  'Per-deal SPV structure',
  'Accredited investors only',
  'K-1 tax reporting',
  'AI-powered underwriting',
  'Wallet-verified distribution',
] as const;

/** Brand accent for border beams — emerald → teal */
const BEAM_FROM = '#16a34a';
const BEAM_TO = '#14b8a6';

const MARQUEE_ITEMS = [
  'Global streaming market',
  'OTT original production',
  'AI-powered valuation',
  'On-chain settlement',
  'Premium content demand',
  'Streaming-first distribution',
  'Institutional media capital',
  'Verified token issuance',
  'Lookhu content network',
  'Blockchain-native ledger',
];

const INDUSTRY_STATS = [
  {
    value: '$500B+',
    label: 'Global streaming market by 2027',
    source: 'Statista',
    Icon: Globe,
  },
  {
    value: '4.5B',
    label: 'Global OTT subscribers by 2026',
    source: 'Digital TV Research',
    Icon: Users,
  },
  {
    value: '38%',
    label: 'YoY growth in premium content spend',
    source: 'PwC Media Outlook',
    Icon: TrendingUp,
  },
  {
    value: '70%',
    label: 'Fortune 500 brands producing original video',
    source: 'Deloitte',
    Icon: ChartBar,
  },
] as const;

const TEAM_MEMBERS = [
  {
    name: 'Team Member',
    title: 'Founder & Managing Partner',
    bio: 'Background in media finance and venture capital. Led content investments across streaming and theatrical.',
  },
  {
    name: 'Team Member',
    title: 'Head of Deal Origination',
    bio: 'Former studio executive with experience sourcing and structuring independent film and series deals.',
  },
  {
    name: 'Team Member',
    title: 'Chief Technology Officer',
    bio: 'Built investor platforms and blockchain settlement infrastructure across fintech and media verticals.',
  },
  {
    name: 'Team Member',
    title: 'General Counsel',
    bio: 'Securities attorney specialising in private placement, Reg D offerings, and digital asset compliance.',
  },
] as const;

const FLOW_STEPS = [
  {
    step: '01',
    title: 'Show valuation (StreamScore)',
    body: `Each show is valued with StreamScore; ${BRAND_NAME} sets final valuation, raise size, revenue share to investors, and unit structure.`,
  },
  {
    step: '02',
    title: 'Deal creation',
    body: 'Admins publish the show deal—terms, docs, token supply, dates, and production status—in one record.',
  },
  {
    step: '03',
    title: 'Investor onboarding',
    body: 'Qualified investors complete KYC, questionnaires, and subscription docs; records sync to investor and admin views.',
  },
  {
    step: '04',
    title: 'Funding & confirmation',
    body: `You commit capital, ${BRAND_NAME} confirms funds, then tokenized units move to your verified Solana wallet.`,
  },
  {
    step: '05',
    title: 'Tokens = participation',
    body: 'Per-deal tokens represent units and revenue participation; holdings and % show in your portfolio and wallet.',
  },
  {
    step: '06',
    title: 'Production & distribution',
    body: 'Capital flows to Lookhu for production; shows can reach Lookhu.tv, Prime, Tubi, and more.',
  },
  {
    step: '07',
    title: 'Revenue & payouts',
    body: `Show revenue returns to ${BRAND_NAME}; payouts follow token ownership with full history in your dashboard.`,
  },
  {
    step: '08',
    title: 'Tax reporting',
    body: 'K-1 statements and supporting tax docs are stored for investors and admins—ready for year-end.',
  },
];

const WHY_PILLARS = [
  {
    Icon: Eye,
    title: 'Transparent economics',
    body: 'Every show is its own raise—valuation inputs, docs, and unit math are visible in the deal room before you subscribe.',
  },
  {
    Icon: Scale,
    title: 'Compliance by default',
    body: 'KYC, accreditation, and subscription records stay tied to the same deal and wallet—no shadow spreadsheets.',
  },
  {
    Icon: Link2,
    title: 'Chain-native settlement',
    body: 'Confirmed capital maps to Solana units you control; distributions and history reconcile to your dashboard.',
  },
  {
    Icon: FileCheck,
    title: 'Tax-ready artifacts',
    body: 'K-1s and signed materials live in one vault so LPs and finance teams aren’t chasing attachments at year-end.',
  },
] as const;

const ECOSYSTEM_LANES = [
  {
    name: 'StreamScore',
    role: 'Valuation input',
    body: `Third-party AI media analysis that ${BRAND_NAME} imports before final deal economics are locked.`,
  },
  {
    name: BRAND_NAME,
    role: 'Deal & ledger',
    body: 'The investor surface—raises, onboarding, wallet state, payouts, and compliance in one system.',
  },
  {
    name: 'Lookhu',
    role: 'Production & distribution',
    body: 'Capital funds production; titles ship to Lookhu.tv, Prime, Tubi, and partner windows.',
  },
  {
    name: 'Solana',
    role: 'Unit settlement',
    body: 'Tokenized participation units settle on-chain with verifiable supply and holder history.',
  },
] as const;

const FAQ_ITEMS = [
  {
    q: `What is ${BRAND_NAME}?`,
    a: `${BRAND_NAME} is a private investment vehicle that finances individual streaming show deals. Each deal is a discrete capital raise structured for qualified, accredited investors—not a pooled public fund. Participation is by invitation and subject to compliance review.`,
  },
  {
    q: 'How does StreamScore inform deal selection?',
    a: `StreamScore is a third-party AI-powered media valuation system. ${BRAND_NAME} imports that analysis as an input to its own underwriting process—setting final deal economics, raise size, investor revenue share, and tokenized unit structure before any capital commitment is made.`,
  },
  {
    q: 'How does the Lookhu production relationship work?',
    a: `Lookhu is the production and distribution partner. Committed capital is deployed into Lookhu-led productions, positioned for release across Lookhu.tv, Prime Video, Tubi, and other streaming windows. ${BRAND_NAME} maintains visibility into production spend and distribution milestones.`,
  },
  {
    q: 'How are distributions handled?',
    a: `Show revenue flows to ${BRAND_NAME}, which calculates allocations based on token unit ownership and agreed revenue share per deal. Payouts are processed to verified investor accounts with a full auditable ledger accessible inside the investor dashboard.`,
  },
  {
    q: 'What is the investor compliance process?',
    a: `Prospective investors complete identity verification (KYC), an accreditation questionnaire, and subscription documentation. All records are stored and mirrored to the admin compliance view. ${BRAND_NAME} does not accept unverified or unaccredited capital.`,
  },
];

/** Design-only corner brackets — “artifacts” as visual language, not a content theme */
function FrameCorners({ className }: { className?: string }) {
  return (
    <div
      className={cn('pointer-events-none absolute inset-0 z-0', className)}
      aria-hidden
    >
      <span className="absolute left-3 top-3 size-5 border-l-2 border-t-2 border-primary/50" />
      <span className="absolute right-3 top-3 size-5 border-r-2 border-t-2 border-primary/50" />
      <span className="absolute bottom-3 left-3 size-5 border-b-2 border-l-2 border-primary/30" />
      <span className="absolute bottom-3 right-3 size-5 border-b-2 border-r-2 border-primary/30" />
    </div>
  );
}

/** Animated hero backdrop — concentric rings, grid, particles */
function HeroBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* Fine grid */}
      <GridPattern
        width={48}
        height={48}
        className="absolute inset-0 h-full w-full fill-transparent stroke-border/30 opacity-50"
      />
      {/* Radial green glow centred */}
      <div className="absolute left-1/2 top-1/2 size-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,hsl(var(--primary)/0.16),transparent_80%)]" />
      {/* Concentric rings */}
      {([480, 640, 800, 960] as const).map((size, i) => (
        <motion.div
          key={size}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10"
          style={{ width: size, height: size }}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
      {/* Floating orb accents */}
      <motion.div
        className="absolute left-[9%] top-[24%] size-3 rounded-full bg-primary/50 shadow-[0_0_0_8px_hsl(var(--primary)/0.08)]"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[11%] top-[20%] size-2 rounded-full bg-primary/40"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />
      <motion.div
        className="absolute left-[20%] bottom-[22%] size-1.5 rounded-full bg-primary/35"
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      />
      <motion.div
        className="absolute right-[20%] bottom-[25%] size-2.5 rounded-full bg-primary/30"
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
      />
      {/* Rotating geometric accents */}
      <motion.div
        className="absolute left-[5%] top-[28%] h-14 w-14 rounded-lg border border-dashed border-primary/20"
        animate={{ rotate: [0, 8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[5%] bottom-[22%] h-10 w-10 rounded-md border border-border/50 bg-card/25 shadow-sm"
        animate={{ rotate: [0, -5, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
      />
      {/* Horizontal shimmer lines */}
      <div className="absolute left-1/2 top-0 h-px w-[700px] -translate-x-1/2 bg-linear-to-r from-transparent via-primary/18 to-transparent" />
      <div className="absolute bottom-0 left-1/2 h-px w-[500px] -translate-x-1/2 bg-linear-to-r from-transparent via-border/50 to-transparent" />
    </div>
  );
}
/** Animated SVG — capital flowing between hubs (no WebGL) */
function BentoCapitalRailsVisual() {
  const paths = [
    'M 52 200 Q 120 120 200 100 T 348 88',
    'M 200 100 Q 260 160 320 220',
    'M 88 260 Q 160 200 200 100',
    'M 320 220 Q 280 280 200 300',
  ];
  return (
    <div className="relative flex min-h-[220px] flex-1 items-center justify-center px-4 py-8">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_40%,hsl(var(--primary)/0.12),transparent_65%)]"
        aria-hidden
      />
      <svg
        viewBox="0 0 400 320"
        className="relative z-1 h-[min(260px,48vw)] w-full max-w-[340px] text-primary"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient id="bento-rail" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.45" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <g className="text-muted-foreground/25" stroke="currentColor" strokeWidth="0.5">
          {Array.from({ length: 7 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={48 + i * 40}
              x2="400"
              y2={48 + i * 40}
            />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={40 + i * 44}
              y1="24"
              x2={40 + i * 44}
              y2="296"
            />
          ))}
        </g>
        {paths.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            stroke="url(#bento-rail)"
            strokeWidth="1.75"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1.1, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
        {(
          [
            { cx: 52, cy: 200, label: 'NYC' },
            { cx: 200, cy: 100, label: BRAND_NAME, hub: true },
            { cx: 348, cy: 88, label: 'LA' },
            { cx: 320, cy: 220, label: 'Lookhu' },
            { cx: 88, cy: 260, label: 'LON' },
            { cx: 200, cy: 300, label: 'Wallet' },
          ] as const
        ).map((n, i) => (
          <g key={`${n.label}-${n.cx}`}>
            <motion.circle
              cx={n.cx}
              cy={n.cy}
              r={'hub' in n && n.hub ? 10 : 6}
              className={
                'hub' in n && n.hub
                  ? 'fill-primary text-primary'
                  : 'fill-background stroke-primary stroke-[1.5]'
              }
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', delay: 0.2 + i * 0.05, stiffness: 260, damping: 18 }}
            />
            {'hub' in n && n.hub ? (
              <>
                <text
                  x={n.cx}
                  y={n.cy - 22}
                  textAnchor="middle"
                  className="fill-muted-foreground font-mono text-[8px] uppercase"
                >
                  StreamFi
                </text>
                <text
                  x={n.cx}
                  y={n.cy - 10}
                  textAnchor="middle"
                  className="fill-muted-foreground font-mono text-[8px] uppercase"
                >
                  Ventures
                </text>
              </>
            ) : (
              <text
                x={n.cx}
                y={n.cy + 14}
                textAnchor="middle"
                className="fill-muted-foreground font-mono text-[9px] uppercase"
              >
                {n.label}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

function BentoCapitalRailsCard() {
  return (
    <div className="relative col-span-12 flex min-h-[380px] flex-col overflow-hidden rounded-2xl border border-border/90 bg-card shadow-md lg:col-span-5 lg:row-span-2 lg:min-h-[420px]">
      <BorderBeam
        size={90}
        duration={12}
        borderWidth={1.25}
        colorFrom={BEAM_FROM}
        colorTo={BEAM_TO}
        className="rounded-2xl"
      />
      <div className="relative flex flex-1 flex-col bg-linear-to-br from-primary/8 via-card to-muted/30">
        <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-border/80 bg-background/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground shadow-sm backdrop-blur-sm">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/40 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          Live rails
        </div>
        <BentoCapitalRailsVisual />
      </div>
      <div className="relative z-2 border-t border-border/80 bg-card/95 p-5 backdrop-blur-sm dark:bg-card/90">
        <h3 className="text-base font-semibold tracking-tight text-foreground">
          Capital & distribution graph
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          Follow how inbound investor capital, Lookhu production spend, and
          outbound distributions map to the same deal ledger—wallet-verified end
          to end.
        </p>
        <a
          href="#flow"
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/85"
        >
          Trace the full flow
          <ArrowRight className="size-3.5" />
        </a>
      </div>
    </div>
  );
}

function BentoValuationHero() {
  const pillars = [
    { title: 'StreamScore ingest', detail: 'Third-party AI valuation as input' },
    { title: 'Deal economics', detail: 'Final raise, rev share, unit math' },
    { title: 'Token structure', detail: 'Supply, symbol, Solana program' },
  ];
  return (
    <div className="relative col-span-12 overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-md lg:col-span-7 lg:row-span-2 lg:min-h-[420px]">
      <BorderBeam
        size={100}
        duration={11}
        borderWidth={1.25}
        colorFrom={BEAM_FROM}
        colorTo={BEAM_TO}
        className="rounded-2xl"
      />
      <div className="relative z-10 flex h-full min-h-[360px] flex-col p-6 sm:p-8 lg:min-h-[420px]">
        <div className="pointer-events-none absolute -right-16 -top-24 size-[28rem] rounded-full bg-primary/[0.07] blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute bottom-0 right-0 size-48 rounded-full border border-primary/10 bg-primary/[0.04]" aria-hidden />
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5" aria-hidden />
            Valuation engine
          </span>
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Spec → signed deal
          </span>
        </div>
        <h3 className="mt-5 max-w-xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          StreamScore in.{' '}
          <span className="text-primary">{BRAND_NAME} economics</span> out.
        </h3>
        <p className="mt-3 max-w-lg text-base leading-relaxed text-muted-foreground">
          Import AI-powered media valuation, then lock the numbers that matter:
          final deal value, raise target, investor revenue share, and per-show
          token unit structure—before a single subscription goes live.
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ delay: 0.08 * i, duration: 0.45 }}
              className="rounded-xl border border-border/80 bg-card/80 p-4 shadow-sm backdrop-blur-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                {String(i + 1).padStart(2, '0')}
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">{p.title}</p>
              <p className="mt-1 text-xs leading-snug text-muted-foreground">{p.detail}</p>
            </motion.li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-border/70 pt-6">
          <div className="flex flex-wrap gap-6 text-sm">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Deal model
              </p>
              <p className="mt-0.5 font-semibold text-foreground">Per-show SPV</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Chain
              </p>
              <p className="mt-0.5 font-semibold text-foreground">Solana units</p>
            </div>
          </div>
          <Link
            href="#flow"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            See the pipeline
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
      <DotPattern
        className="pointer-events-none absolute inset-0 z-0 text-primary/[0.08]"
        width={18}
        height={18}
        glow={false}
      />
    </div>
  );
}

function BeamCard({
  children,
  className,
  beamClassName,
  duration = 8,
}: {
  children: React.ReactNode;
  className?: string;
  beamClassName?: string;
  duration?: number;
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-border/80 bg-card',
        className
      )}
    >
      <BorderBeam
        size={120}
        duration={duration}
        borderWidth={1.5}
        colorFrom={BEAM_FROM}
        colorTo={BEAM_TO}
        className={beamClassName}
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}

function WhyStreamFiSection() {
  return (
    <section
      id="why-streamfi"
      className="relative z-10 border-t border-border bg-linear-to-b from-muted/25 via-background to-background py-20"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          glow={false}
          className="text-muted-foreground/50"
        />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <BlurFade inView>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Investor discipline
          </p>
          <h2 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Built for clarity at every step—not a black-box fund
          </h2>
          <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
            {BRAND_NAME} is designed around show-by-show raises, verifiable settlement,
            and documents you can actually find when auditors or LPs ask.
          </p>
        </BlurFade>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_PILLARS.map((item, i) => {
            const PillarIcon = item.Icon;
            return (
            <BlurFade key={item.title} inView delay={0.05 * i}>
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                className="relative h-full overflow-hidden rounded-2xl border border-border/90 bg-card p-6 shadow-sm"
              >
                <div className="mb-4 flex size-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <PillarIcon className="size-5" aria-hidden />
                </div>
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </motion.div>
            </BlurFade>
            );
          })}
        </div>
        <BlurFade inView delay={0.12} className="mt-10">
          <a
            href="#flow"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/85"
          >
            See how it runs end-to-end
            <ArrowRight className="size-3.5" />
          </a>
        </BlurFade>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section
      id="team"
      className="relative z-10 border-t border-border py-20"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-25">
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          glow={false}
          className="text-muted-foreground/60"
        />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <BlurFade inView>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Leadership
          </p>
          <h2 className="mt-2 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
            The team behind the fund
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Operators and advisors with deep experience in media finance, content
            production, and institutional capital markets.
          </p>
        </BlurFade>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM_MEMBERS.map((member, i) => (
            <BlurFade key={member.name + i} inView delay={0.06 * i}>
              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/90 bg-card p-6 shadow-sm">
                <div className="mb-5 flex size-14 items-center justify-center rounded-2xl border border-border bg-muted text-muted-foreground">
                  <Users className="size-6" aria-hidden />
                </div>
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {member.name}
                </h3>
                <p className="mt-0.5 text-sm font-medium text-primary">{member.title}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}

function EcosystemSection() {
  return (
    <section
      id="ecosystem"
      className="relative z-10 border-t border-border py-20"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.35]">
        <GridPattern
          width={48}
          height={48}
          className="fill-transparent stroke-border/70"
        />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <BlurFade inView>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Ecosystem
          </p>
          <h2 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Four rails. One investor thread.
          </h2>
          <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
            {BRAND_NAME} sits in the middle—ingesting valuation, funding production,
            and paying holders—while StreamScore, Lookhu, and Solana each do what
            they do best.
          </p>
        </BlurFade>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ECOSYSTEM_LANES.map((lane, i) => (
            <BlurFade key={lane.name} inView delay={0.06 * i}>
              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/95 p-6 shadow-sm backdrop-blur-sm">
                <span className="absolute right-3 top-3 font-mono text-[9px] text-muted-foreground/80">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-primary">
                  {lane.role}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
                  {lane.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {lane.body}
                </p>
                <div className="mt-4 h-px w-full bg-linear-to-r from-primary/30 via-transparent to-transparent" />
              </div>
            </BlurFade>
          ))}
        </div>

        <BlurFade inView delay={0.1} className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-dashed border-primary/25 bg-primary/[0.03] px-5 py-4 sm:px-6">
            <p className="max-w-2xl text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                One ledger across rails:
              </span>{' '}
              deal IDs, wallet addresses, and distribution events stay linked so
              your portfolio view matches reality.
            </p>
            <Link
              href="#modules"
              className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:text-primary/85"
            >
              Back to modules
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

export function StreamFiLanding() {
  const { user, loading } = useAuth();
  const dashboardHref =
    user?.role === 'admin' ? '/admin/dashboard' : '/investor/dashboard';

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="relative z-20 border-b border-border/80 bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold tracking-tight"
          >
            <span className="flex size-8 items-center justify-center rounded-md border border-border bg-card shadow-sm">
              <Landmark className="size-4 text-primary" aria-hidden />
            </span>
            {BRAND_NAME}
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2">
            <a
              href="#platform"
              className="hidden px-2 text-sm text-muted-foreground transition-colors hover:text-foreground lg:inline"
            >
              Platform
            </a>
            <a
              href="#flow"
              className="hidden px-2 text-sm text-muted-foreground transition-colors hover:text-foreground lg:inline"
            >
              Flow
            </a>
            <a
              href="#modules"
              className="hidden px-2 text-sm text-muted-foreground transition-colors hover:text-foreground lg:inline"
            >
              Modules
            </a>
            <a
              href="#why-streamfi"
              className="hidden px-2 text-sm text-muted-foreground transition-colors hover:text-foreground xl:inline"
            >
              Why
            </a>
            <a
              href="#team"
              className="hidden px-2 text-sm text-muted-foreground transition-colors hover:text-foreground xl:inline"
            >
              Team
            </a>
            <a
              href="#ecosystem"
              className="hidden px-2 text-sm text-muted-foreground transition-colors hover:text-foreground xl:inline"
            >
              Ecosystem
            </a>
            <a
              href="#faq"
              className="hidden px-2 text-sm text-muted-foreground transition-colors hover:text-foreground lg:inline"
            >
              FAQ
            </a>
            <span className="ml-1 flex items-center sm:ml-2">
              <ThemeToggle />
            </span>
            {!loading && user ? (
              <Button asChild size="sm" className="ml-1 rounded-md">
                <Link href={dashboardHref}>
                  Portfolio
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            ) : (
              <Button asChild size="sm" className="ml-1 rounded-md">
                <Link href="/login">Member sign in</Link>
              </Button>
            )}
          </nav>
        </div>
      </header>

      <main>
        <section
          id="platform"
          className="relative z-10 overflow-hidden border-b border-border/50 pb-0"
        >
          <HeroBackdrop />
          <div className="relative z-10 mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-16 pb-0">
            <FrameCorners className="opacity-60" />

            {/* Badge */}
            <div className="flex justify-center">
              <motion.span
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-3.5 py-1.5 text-[11px] font-medium tracking-wide text-primary shadow-sm"
              >
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/40 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                Private · Qualified investors only
              </motion.span>
            </div>

            {/* Headline */}
            <div className="mx-auto mt-8 max-w-2xl text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]"
              >
                Streaming capital,{' '}
                <span className="relative whitespace-nowrap text-primary">
                  structured privately
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto mt-5 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground sm:text-[17px]"
              >
                Show-by-show raises for qualified investors—AI-validated, Lookhu-produced,
                and settled on-chain. Access by invitation only.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="mt-9 flex flex-wrap items-center justify-center gap-3"
              >
                <Button asChild size="lg" className="rounded-full px-7 shadow-md">
                  <Link href="/login">
                    Member sign in
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <a
                  href="mailto:invest@streamfiventures.com"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-6 py-2.5 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur-sm transition-colors hover:text-foreground"
                >
                  Institutional inquiries
                </a>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="mt-3 text-[11px] text-muted-foreground/75"
              >
                Access by invitation · Accreditation required
              </motion.p>
            </div>

            {/* Scrolling pill strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative mt-14 -mx-4 sm:-mx-6 overflow-hidden"
            >
              <div className="absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-background to-transparent" />
              <div className="absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-background to-transparent" />
              <Marquee className="py-4 [--duration:35s] [--gap:1rem]">
                {HERO_PILLS.map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/80 px-4 py-2 text-[13px] font-medium text-muted-foreground shadow-sm backdrop-blur-sm"
                  >
                    <span className="size-1.5 rounded-full bg-primary/70" aria-hidden />
                    {label}
                  </span>
                ))}
              </Marquee>
            </motion.div>
          </div>
        </section>

        <section
          id="industry"
          className="relative z-10 border-b border-border bg-muted/20 py-14 sm:py-16"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <BlurFade inView>
              <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Market context
              </p>
              <h2 className="mt-2 text-center text-2xl font-semibold tracking-tight sm:text-3xl">
                Streaming is the defining media shift of the decade
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-center text-base text-muted-foreground">
                {BRAND_NAME} operates at the intersection of premium content production
                and structured private capital—in a sector that continues to expand at scale.
              </p>
            </BlurFade>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {INDUSTRY_STATS.map((stat, i) => {
                const StatIcon = stat.Icon;
                return (
                  <BlurFade key={stat.label} inView delay={0.06 * i}>
                    <motion.div
                      whileHover={{ y: -2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                      className="relative overflow-hidden rounded-2xl border border-border/90 bg-card p-6 shadow-sm"
                    >
                      <div className="mb-3 flex size-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                        <StatIcon className="size-5" aria-hidden />
                      </div>
                      <p className="text-3xl font-semibold tracking-tight text-foreground">
                        {stat.value}
                      </p>
                      <p className="mt-1.5 text-sm leading-snug text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
                        Source: {stat.source}
                      </p>
                    </motion.div>
                  </BlurFade>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="ticker"
          className="relative z-10 border-b border-border bg-muted/30 py-3.5"
        >
          <Marquee pauseOnHover className="[--duration:50s] [--gap:3rem] py-1">
            {MARQUEE_ITEMS.map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-muted-foreground"
              >
                <span className="size-1.5 rounded-full bg-primary" aria-hidden />
                {label}
              </span>
            ))}
          </Marquee>
        </section>

        <section id="modules" className="relative z-10 py-20">
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.28]">
            <GridPattern
              width={56}
              height={56}
              className="fill-transparent stroke-border/80"
            />
          </div>
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <BlurFade inView>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Platform surface
              </p>
              <h2 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
                A venture-grade stack for show-by-show raises—not a generic
                crowdfunding skin
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
                Every module below shares one ledger: valuation inputs, legal
                documents, wallet state, Lookhu production, and investor payouts.
                Pick any tile—then follow the same thread in your dashboard.
              </p>
            </BlurFade>

            <div className="relative mt-14">
              <FrameCorners className="-inset-2 opacity-50" />
              <BentoGrid>
                <BentoValuationHero />
                <BentoCapitalRailsCard />

                <BentoCard
                  name="Deal room & data room"
                  className="col-span-12 lg:col-span-4"
                  description="One canonical deal per show—term sheet, raise, token metadata, supply, key dates, production status, and signed docs in a single investor-facing room."
                  href="#flow"
                  cta="Explore deal structure"
                  Icon={Film}
                  background={
                    <>
                      <div className="absolute inset-0 bg-linear-to-br from-muted/60 to-muted/30" />
                      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/25 to-transparent" />
                      <Film className="absolute right-5 top-6 size-20 rotate-6 text-foreground/[0.06]" />
                    </>
                  }
                />
                <BentoCard
                  name="Trust & accreditation"
                  className="col-span-12 lg:col-span-4"
                  description="KYC, investor questionnaires, and subscription packets with mirrored status for admins—so compliance isn’t a side spreadsheet."
                  href="#faq"
                  cta="Compliance process"
                  Icon={UserCheck}
                  featured
                  background={
                    <>
                      <div className="absolute inset-0 bg-linear-to-t from-primary/[0.07] to-transparent" />
                      <Shield className="absolute bottom-8 right-8 size-20 text-primary/15" />
                    </>
                  }
                />
                <BentoCard
                  name="Funding → Solana mint"
                  className="col-span-12 lg:col-span-4"
                  description={`Wire in, ${BRAND_NAME} confirms, then tokenized units land in the wallet you verified—no mystery custodian in the middle.`}
                  href="#flow"
                  cta="How funding settles"
                  Icon={Wallet}
                  background={
                    <>
                      <div className="absolute inset-0 bg-primary/[0.05]" />
                      <DotPattern
                        className="absolute -right-8 -top-6 size-[130%] text-primary/12"
                        width={12}
                        height={12}
                        glow={false}
                      />
                      <Network className="absolute bottom-6 right-6 size-16 text-primary/14" />
                    </>
                  }
                />

                <BentoCard
                  name="Units = economic rights"
                  className="col-span-12 lg:col-span-4"
                  description="Per-deal tokens map to participation and revenue share; your portfolio reconciles chain holdings with off-chain legal records."
                  href="#flow"
                  cta="Unit economics"
                  Icon={Radio}
                  background={
                    <>
                      <div className="absolute inset-0 bg-muted/40" />
                      <GridPattern
                        width={24}
                        height={24}
                        className="absolute inset-0 opacity-40"
                      />
                      <div className="absolute left-5 top-5 h-12 w-px bg-primary/20" aria-hidden />
                      <div className="absolute left-5 top-5 h-px w-12 bg-primary/20" aria-hidden />
                    </>
                  }
                />
                <BentoCard
                  name="Lookhu production spine"
                  className="col-span-12 lg:col-span-4"
                  description="Capital flows into production and distribution—Lookhu.tv, Prime, Tubi—so investors see how spend ties to the titles they backed."
                  href="#flow"
                  cta="Production path"
                  Icon={Clapperboard}
                  background={
                    <>
                      <div className="absolute inset-0 bg-linear-to-t from-foreground/[0.04] to-transparent" />
                      <Clapperboard className="absolute bottom-8 left-8 size-28 text-foreground/[0.07]" />
                    </>
                  }
                />
                <BentoCard
                  name="Revenue waterfall"
                  className="col-span-12 lg:col-span-4"
                  description={`Show revenue hits ${BRAND_NAME}; smart contracts and internal rules allocate to token holders with a full distribution history.`}
                  href="#flow"
                  cta="Payout mechanics"
                  Icon={PieChart}
                  background={
                    <>
                      <div className="absolute inset-0 bg-muted/45" />
                      <div
                        className="absolute right-5 top-5 size-32 rounded-full opacity-25"
                        style={{
                          background:
                            'conic-gradient(from 200deg, hsl(var(--primary) / 0.5) 0 42%, hsl(var(--primary) / 0.1) 42% 70%, hsl(var(--muted-foreground) / 0.12) 70% 100%)',
                        }}
                        aria-hidden
                      />
                      <div className="absolute right-10 top-10 size-14 rounded-full border-2 border-dashed border-primary/20" aria-hidden />
                    </>
                  }
                />

                <div className="relative col-span-12 overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:flex lg:min-h-[200px]">
                  <BorderBeam
                    size={140}
                    duration={14}
                    borderWidth={1.25}
                    colorFrom={BEAM_FROM}
                    colorTo={BEAM_TO}
                    className="rounded-2xl"
                  />
                  <div className="relative flex flex-1 flex-col justify-center gap-4 p-6 sm:p-8 lg:max-w-[58%]">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        Compliance
                      </span>
                      <Landmark className="size-4 text-primary" aria-hidden />
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                      K-1 vault & tax narrative
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                      Year-end packs, K-1 storage, and investor-facing document
                      history—aligned with the MVP tax module so your CFO and LPs
                      aren’t hunting attachments in email threads.
                    </p>
                    <a
                      href="#faq"
                      className="inline-flex w-fit items-center gap-1 text-sm font-semibold text-primary hover:text-primary/85"
                    >
                      Read compliance FAQ
                      <ArrowRight className="size-3.5" />
                    </a>
                  </div>
                  <div className="relative flex min-h-[160px] flex-1 items-center justify-center border-t border-border/80 bg-linear-to-br from-muted/50 to-primary/[0.06] p-8 lg:border-t-0 lg:border-l">
                    <div className="grid max-w-sm grid-cols-2 gap-3 text-left">
                      {['K-1 PDF', 'Cap table', 'Sub docs', 'Audit trail'].map(
                        (label, i) => (
                          <motion.div
                            key={label}
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.06 * i }}
                            className="rounded-lg border border-border/90 bg-card/90 px-3 py-2.5 text-xs font-medium text-foreground shadow-sm"
                          >
                            <BadgeCheck className="mb-1 size-3.5 text-primary" aria-hidden />
                            {label}
                          </motion.div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </BentoGrid>
            </div>
          </div>
        </section>

        <WhyStreamFiSection />

        <TeamSection />

        <section
          id="flow"
          className="relative z-10 border-t border-border bg-muted/15 py-20"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <BlurFade inView>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Core business flow
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
                From StreamScore intake through Lookhu revenue and investor
                payouts—the path the platform is built to support end-to-end.
              </p>
            </BlurFade>
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {FLOW_STEPS.map((s, i) => (
                <BlurFade key={s.step} inView delay={0.04 * i}>
                  <div className="relative flex gap-4 overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <span className="font-mono text-sm font-semibold text-primary">
                      {s.step}
                    </span>
                    <div>
                      <h3 className="font-semibold tracking-tight">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {s.body}
                      </p>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        <EcosystemSection />

        <section id="faq" className="relative z-10 border-t border-border py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <BlurFade inView>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Investor questions
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                Grounded in how {BRAND_NAME}, Lookhu, StreamScore, and Solana fit
                together.
              </p>
            </BlurFade>
            <BlurFade inView delay={0.08} className="mt-8">
              <Accordion type="single" collapsible className="w-full">
                {FAQ_ITEMS.map((item, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-left text-base">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </BlurFade>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <BlurFade inView>
            <BeamCard className="shadow-lg" duration={10}>
              <div className="px-6 py-12 text-center sm:px-12">
                <span className="inline-flex items-center justify-center rounded-full border border-primary/20 bg-primary/10 p-3">
                  <Lock className="size-6 text-primary" aria-hidden />
                </span>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Existing member? Access your workspace.
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                  Your portfolio, deal documents, distributions, and tax records
                  are available inside the investor dashboard.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Button asChild size="lg" className="rounded-md px-8">
                    <Link href="/login">
                      Member sign in
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
                <p className="mt-5 text-sm text-muted-foreground">
                  Not yet a member?{' '}
                  <a
                    href="mailto:invest@streamfiventures.com"
                    className="font-medium text-primary underline-offset-2 hover:underline"
                  >
                    Contact us for institutional inquiries
                  </a>
                </p>
                <p className="mx-auto mt-6 max-w-lg text-xs text-muted-foreground">
                  Investing involves risk, including possible loss of principal.
                  Past performance does not guarantee future results. Streaming
                  deals are speculative; read each offering carefully.{' '}
                  {BRAND_NAME} does not provide legal or tax advice.
                </p>
              </div>
            </BeamCard>
          </BlurFade>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <p className="flex items-center gap-2">
            <Building2 className="size-4 shrink-0" aria-hidden />
            © {new Date().getFullYear()} {BRAND_NAME}
          </p>
          <div className="flex gap-6">
            <Link href="/login" className="hover:text-foreground">
              Member sign in
            </Link>
            <a href="#faq" className="hover:text-foreground">
              FAQ
            </a>
            <a
              href="mailto:invest@streamfiventures.com"
              className="hover:text-foreground"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
