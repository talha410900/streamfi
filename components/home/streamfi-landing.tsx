'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Clapperboard,
  Eye,
  FileCheck,
  Film,
  Landmark,
  Link2,
  Network,
  PieChart,
  Radio,
  Scale,
  Shield,
  Sparkles,
  UserCheck,
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
import { NumberTicker } from '@/components/ui/number-ticker';
import { BRAND_NAME } from '@/lib/constants';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { cn } from '@/lib/utils';

/** Brand accent for border beams — emerald → teal */
const BEAM_FROM = '#16a34a';
const BEAM_TO = '#14b8a6';

const MARQUEE_ITEMS = [
  'StreamScore valuation',
  'Solana token units',
  'Lookhu production',
  'Lookhu.tv · Prime · Tubi',
  'Revenue participation',
  'K-1 & tax packs',
  'KYC & accreditation',
  'Deal-by-deal raises',
  'Wallet-verified mint',
  'Distribution ledger',
];

const LIVE_FEED = [
  {
    title: 'StreamScore imported',
    detail: 'Admin posted valuation & raise target for new show deal',
    time: '4m ago',
    swatch: 'bg-primary',
  },
  {
    title: 'Funds confirmed',
    detail: 'Wire matched — token mint queued for your wallet',
    time: '22m ago',
    swatch: 'bg-foreground',
  },
  {
    title: 'Tokens issued',
    detail: 'Solana units delivered — revenue % now on-chain',
    time: '1h ago',
    swatch: 'bg-primary',
  },
  {
    title: 'Revenue from Lookhu',
    detail: 'Inbound show revenue received — distribution run scheduled',
    time: '3h ago',
    swatch: 'bg-zinc-400 dark:bg-zinc-500',
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
    q: 'What am I investing in?',
    a: 'Qualified investors subscribe into individual show deals before streaming. Each deal is a discrete raise with its own terms, documents, and Solana-based tokens tied to revenue participation in that project—not a generic fund.',
  },
  {
    q: `How do StreamScore and ${BRAND_NAME} work together?`,
    a: `StreamScore is a third-party AI-powered media valuation input. ${BRAND_NAME} imports that analysis, then sets final deal economics, raise target, investor revenue share, and tokenized unit structure for the show.`,
  },
  {
    q: 'When do I receive tokens?',
    a: `After your subscription is approved, documents are complete, and ${BRAND_NAME} confirms funds received, the platform transfers tokenized units to your linked Solana wallet per the deal’s unit structure.`,
  },
  {
    q: 'How does money flow back to investors?',
    a: `Lookhu produces and distributes the show, then sends revenue to ${BRAND_NAME}. ${BRAND_NAME} calculates distributions from token holdings and unit ownership, executes payouts, and keeps an auditable ledger.`,
  },
  {
    q: 'Where do I see K-1s and signed documents?',
    a: 'Subscription agreements, KYC confirmations, K-1s, and valuation materials live in your investor documents area—mirrored for admin compliance.',
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

/** Layered background “artifacts” for the hero — grids, dots, rings, floating frames */
function HeroBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <GridPattern
        width={64}
        height={64}
        className="absolute -left-24 top-0 h-[140%] w-[120%] fill-transparent stroke-border/40 opacity-35 md:opacity-45"
      />
      <DotPattern
        width={22}
        height={22}
        cx={1}
        cy={1}
        cr={1}
        glow={false}
        className="absolute inset-0 text-zinc-400/50 dark:text-zinc-600/35"
      />
      <div className="absolute -right-32 top-1/4 size-[28rem] rounded-full border border-primary/15" />
      <div className="absolute -left-16 bottom-0 size-72 rounded-full border border-border/60 bg-muted/20" />
      <div className="absolute right-[12%] top-12 size-3 rounded-full bg-primary/40 shadow-[0_0_0_6px_rgba(22,163,74,0.08)]" />
      <div className="absolute bottom-24 left-[8%] size-2 rounded-full bg-foreground/25" />
      <div className="absolute right-[20%] bottom-32 h-px w-32 rotate-[-18deg] bg-border/80" />
      <div className="absolute left-[15%] top-1/3 h-16 w-16 rotate-12 rounded-lg border border-dashed border-primary/25" />
      <div className="absolute right-[8%] top-[40%] size-12 rotate-6 rounded-md border border-border/70 bg-card/40 shadow-sm" />
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

function ActivityCard({
  title,
  detail,
  time,
  swatch,
}: (typeof LIVE_FEED)[number]) {
  return (
    <figure
      className={cn(
        'relative w-full max-w-88 cursor-default overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm',
        'transition-transform duration-200 hover:scale-[1.005]'
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn('mt-0.5 size-2.5 shrink-0 rounded-sm', swatch)}
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <figcaption className="flex flex-wrap items-baseline gap-x-2 text-sm font-medium tracking-tight text-foreground">
            <span>{title}</span>
            <span className="text-xs font-normal text-muted-foreground">
              {time}
            </span>
          </figcaption>
          <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
        </div>
      </div>
    </figure>
  );
}

const feedContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const feedItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

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
              <>
                <Button variant="ghost" asChild size="sm" className="rounded-md">
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button asChild size="sm" className="rounded-md">
                  <Link href="/signup">Get started</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>

      <main>
        <section
          id="platform"
          className="relative z-10 overflow-hidden border-b border-border/50"
        >
          <HeroBackdrop />
          <div className="relative z-10 mx-auto max-w-6xl px-4 pb-14 pt-10 sm:px-6 sm:pt-14">
            <FrameCorners className="opacity-70" />
            <div className="relative z-1 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-10">
            <div className="lg:col-span-7">
              <BlurFade delay={0.05} inView>
                <p className="text-sm font-medium tracking-wide text-primary">
                  Before the premiere — after the wire.
                </p>
              </BlurFade>
              <BlurFade delay={0.08} inView>
                <h1 className="mt-2 text-balance text-2xl font-semibold tracking-tight sm:text-3xl lg:text-[1.85rem] lg:leading-snug">
                  Fund shows before they stream. One deal per show—Solana units,
                  Lookhu production, revenue back to you.
                </h1>
              </BlurFade>
              <BlurFade delay={0.1} inView>
                <p className="mt-2 inline-flex items-center gap-2 rounded-full border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                  <BadgeCheck className="size-3.5 text-primary" aria-hidden />
                  Qualified investors · Accredited access
                </p>
              </BlurFade>
              <BlurFade delay={0.12} inView>
                <p className="mt-4 max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                  Subscribe per show, clear KYC and docs, fund {BRAND_NAME}, receive
                  tokenized revenue participation on Solana. Lookhu produces;
                  cash flows from distribution → {BRAND_NAME} → holders—with K-1–ready
                  records.
                </p>
              </BlurFade>
              <BlurFade delay={0.14} inView>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button asChild size="lg" className="rounded-md px-5">
                    <Link href="/signup">
                      Start onboarding
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    size="lg"
                    className="rounded-md border-border bg-card px-5 shadow-sm"
                  >
                    <Link href="/login">Sign in</Link>
                  </Button>
                </div>
              </BlurFade>

              <BlurFade delay={0.16} inView className="mt-10">
                <div className="grid max-w-lg grid-cols-3 gap-5 border-t border-border pt-8">
                  <div>
                    <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      <span className="text-primary">$</span>
                      <NumberTicker
                        value={48}
                        className="font-semibold text-foreground!"
                      />
                      <span className="text-muted-foreground">M+</span>
                    </p>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                      Capital coordinated
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      <NumberTicker
                        value={120}
                        className="font-semibold text-foreground!"
                      />
                      <span className="text-muted-foreground">+</span>
                    </p>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                      Show deals
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      <NumberTicker
                        value={24}
                        className="font-semibold text-foreground!"
                      />
                      <span className="text-muted-foreground">/7</span>
                    </p>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                      Ledger
                    </p>
                  </div>
                </div>
              </BlurFade>
            </div>

            <div className="relative z-1 lg:col-span-5">
              <BeamCard className="shadow-md" duration={9}>
                <div className="border-b border-border bg-muted/40 px-4 py-3">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Live surface
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    What is moving on the platform
                  </p>
                </div>
                <div className="p-3 sm:p-4">
                  <motion.div
                    className="flex flex-col gap-2.5"
                    variants={feedContainer}
                    initial="hidden"
                    animate="show"
                  >
                    {LIVE_FEED.map((item) => (
                      <motion.div key={item.title} variants={feedItem}>
                        <ActivityCard {...item} />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </BeamCard>
              <div
                className="pointer-events-none absolute -right-4 -top-4 hidden size-20 rounded-2xl border-2 border-dashed border-primary/40 md:block"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-2 -left-2 hidden size-14 rounded-lg border border-border bg-card shadow-sm md:block"
                aria-hidden
              />
            </div>
          </div>
          </div>
        </section>

        <section
          id="ticker"
          className="relative z-10 border-y border-border bg-muted/30 py-3.5"
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
                  href="/signup"
                  cta="Start investor profile"
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
                <Wallet className="mx-auto size-10 text-primary" aria-hidden />
                <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Open your investor workspace
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                  Onboard, subscribe show-by-show, connect your Solana wallet, and
                  follow distributions and tax documents in one place.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Button asChild size="lg" className="rounded-md px-8">
                    <Link href="/signup">Get started</Link>
                  </Button>
                  <Button variant="outline" asChild size="lg" className="rounded-md">
                    <Link href="/login">Sign in</Link>
                  </Button>
                </div>
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
              Sign in
            </Link>
            <Link href="/signup" className="hover:text-foreground">
              Sign up
            </Link>
            <a href="#faq" className="hover:text-foreground">
              FAQ
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
