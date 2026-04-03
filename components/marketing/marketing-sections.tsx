import type { ReactNode } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  FileSearch,
  Layers3,
  ScanSearch,
  Sparkles,
} from 'lucide-react'
import { type SeoLocale } from '@/lib/seo/locales'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type MarketingAction = {
  label: string
  href: string
  variant?: 'default' | 'outline' | 'ghost'
}

export type MarketingSignal = {
  value: string
  label: string
}

export type MarketingColumn = {
  title: string
  description: string
  href?: string
  actionLabel?: string
}

export type MarketingStep = {
  label: string
  title: string
  description: string
}

export type MarketingVisualRow = {
  label: string
  value: string
}

export type MarketingOpportunity = {
  title: string
  score: string
  description: string
  rank?: string
  audience?: string
  whyNow?: string
  nextMove?: string
  highlights?: string[]
}

export type MarketingOpportunityLabels = {
  score: string
  audience: string
  whyNow: string
  nextMove: string
}

export type MarketingFaqItem = {
  question: string
  answer: string
}

export type MarketingSnapshot = {
  label: string
  value: string
  description: string
}

export type MarketingClosing = {
  eyebrow: string
  title: string
  description: string
  primaryAction: MarketingAction
  secondaryAction?: MarketingAction
}

export type MarketingAsideItem = {
  label: string
  title: string
  meta?: string
}

export function MarketingSurface({
  children,
  className,
}: Readonly<{
  children: ReactNode
  className?: string
}>) {
  return <section className={cn('relative overflow-hidden page-fade', className)}>{children}</section>
}

export function MarketingContainer({
  children,
  className,
}: Readonly<{
  children: ReactNode
  className?: string
}>) {
  return <div className={cn('mx-auto w-full max-w-[74rem] px-4 sm:px-6', className)}>{children}</div>
}

export function MarketingActions({
  primaryAction,
  secondaryAction,
}: Readonly<{
  primaryAction: MarketingAction
  secondaryAction?: MarketingAction
}>) {
  return (
    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
      <Button asChild size="lg" className="btn-glow h-11 rounded-full px-6 text-sm">
        <Link href={primaryAction.href}>
          {primaryAction.label}
          <ArrowRight className="size-4" />
        </Link>
      </Button>
      {secondaryAction ? (
        <Button
          asChild
          variant={secondaryAction.variant ?? 'outline'}
          size="lg"
          className="h-11 rounded-full border-border/70 bg-white/55 px-6 text-sm shadow-sm backdrop-blur-sm"
        >
          <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
        </Button>
      ) : null}
    </div>
  )
}

export function MarketingProofStrip({
  signals,
}: Readonly<{
  signals: MarketingSignal[]
}>) {
  return (
    <dl className="grid gap-0 border-t border-border/40 pt-4 sm:grid-cols-3">
      {signals.map((signal, index) => (
        <div
          key={signal.label}
          className={cn(
            'px-0 py-3 sm:px-4',
            index > 0 ? 'sm:border-l sm:border-border/35' : undefined
          )}
        >
          <div className="space-y-1">
            <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              {signal.label}
            </dt>
            <dd className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              {signal.value}
            </dd>
          </div>
        </div>
      ))}
    </dl>
  )
}

export function MarketingSectionHeading({
  eyebrow,
  title,
  description,
}: Readonly<{
  eyebrow: string
  title: string
  description: string
}>) {
  return (
    <div className="max-w-2xl space-y-4">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      <p className="text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>
    </div>
  )
}

export function MarketingNarrativeSection({
  eyebrow,
  title,
  description,
  aside,
  children,
}: Readonly<{
  eyebrow: string
  title: string
  description: string
  aside: ReactNode
  children: ReactNode
}>) {
  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.8fr)] lg:items-start lg:gap-8">
        <div className="max-w-2xl">
          <MarketingSectionHeading eyebrow={eyebrow} title={title} description={description} />
        </div>
        <div className="lg:pt-1">{aside}</div>
      </div>
      {children}
    </div>
  )
}

export function MarketingSectionAside({
  eyebrow,
  items,
  tone = 'default',
}: Readonly<{
  eyebrow: string
  items: MarketingAsideItem[]
  tone?: 'default' | 'analysis' | 'report'
}>) {
  return (
    <div className="border-t border-border/35 pt-4 lg:min-h-[10.5rem]">
      <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        {eyebrow}
      </p>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <div
            key={`${item.label}-${item.title}`}
            className="grid grid-cols-[1.85rem_minmax(0,1fr)] items-start gap-3 border-b border-border/25 pb-3 last:border-b-0 last:pb-0"
          >
            <div
              className={cn(
                'mt-0.5 flex h-7 w-7 items-center justify-center text-[10px] font-semibold text-foreground',
                tone === 'report'
                  ? 'rounded-full border border-border/55 bg-white/70 shadow-sm'
                  : tone === 'analysis'
                    ? 'rounded-sm bg-[linear-gradient(135deg,oklch(0.58_0.16_250_/_0.16),oklch(0.78_0.14_70_/_0.16))]'
                    : 'rounded-full border border-border/45 bg-white/55'
              )}
            >
              {item.label}
            </div>
            <div className="space-y-1">
              <p className="max-w-[18rem] text-sm font-medium leading-6 text-foreground sm:text-[15px]">
                {item.title}
              </p>
              {item.meta ? (
                <p className="max-w-[19rem] text-[13px] leading-6 text-muted-foreground">
                  {item.meta}
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      {tone === 'analysis' ? (
        <div className="mt-4 h-px w-full bg-[linear-gradient(90deg,oklch(0.58_0.16_250),transparent_70%)]" />
      ) : null}
      {tone === 'report' ? (
        <div className="mt-4 h-px w-full bg-[linear-gradient(90deg,oklch(0.78_0.14_70),transparent_70%)]" />
      ) : null}
      {tone === 'default' ? (
        <div className="mt-4 h-px w-full bg-[linear-gradient(90deg,oklch(0.82_0.12_85_/_0.7),transparent_72%)]" />
      ) : null}
    </div>
  )
}

function MarketingSurfaceGridItem({
  children,
  className,
}: Readonly<{
  children: ReactNode
  className?: string
}>) {
  return (
    <div
      className={cn(
        'h-full rounded-[1.5rem] border border-border/35 bg-[linear-gradient(145deg,oklch(1_0_0_/_0.48),oklch(0.985_0.005_250_/_0.24))] px-5 py-5 shadow-[0_14px_40px_oklch(0.58_0.08_250_/_0.04)]',
        className
      )}
    >
      {children}
    </div>
  )
}

export function MarketingBalancedFeatureGrid({
  items,
  icon,
}: Readonly<{
  items: MarketingColumn[]
  icon: ReactNode
}>) {
  return (
    <div className="grid gap-6 border-t border-border/45 pt-8 lg:grid-cols-3">
      {items.map((item) => (
        <MarketingSurfaceGridItem key={item.title} className="space-y-4">
          <div className="flex items-center gap-3 text-foreground">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-white/55 shadow-sm backdrop-blur-sm">
              {icon}
            </div>
            <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
          </div>
          <p className="text-sm leading-7 text-muted-foreground sm:text-base">{item.description}</p>
          {item.href && item.actionLabel ? (
            <Link
              href={item.href}
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-opacity hover:opacity-75"
            >
              <span>{item.actionLabel}</span>
              <ArrowRight className="size-4" />
            </Link>
          ) : null}
        </MarketingSurfaceGridItem>
      ))}
    </div>
  )
}

export function MarketingBalancedProcessSteps({
  steps,
}: Readonly<{
  steps: MarketingStep[]
}>) {
  return (
    <div className="grid gap-6 border-t border-border/45 pt-8 lg:grid-cols-4">
      {steps.map((step) => (
        <MarketingSurfaceGridItem key={step.label} className="space-y-4">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">{step.label}</p>
          <h3 className="text-xl font-semibold tracking-tight text-foreground">{step.title}</h3>
          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            {step.description}
          </p>
        </MarketingSurfaceGridItem>
      ))}
    </div>
  )
}

export function MarketingBalancedFaqList({
  items,
}: Readonly<{
  items: MarketingFaqItem[]
}>) {
  return (
    <div className="grid gap-6 border-t border-border/45 pt-8 lg:grid-cols-2">
      {items.map((item) => (
        <MarketingSurfaceGridItem key={item.question} className="space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">{item.question}</h3>
          <p className="text-sm leading-7 text-muted-foreground sm:text-base">{item.answer}</p>
        </MarketingSurfaceGridItem>
      ))}
    </div>
  )
}

export function MarketingHeroShell({
  sectionLabel,
  title,
  titleClassName,
  description,
  primaryAction,
  secondaryAction,
  signals,
  visual,
}: Readonly<{
  sectionLabel: string
  title: string
  titleClassName?: string
  description: string
  primaryAction: MarketingAction
  secondaryAction?: MarketingAction
  signals: MarketingSignal[]
  visual: ReactNode
}>) {
  return (
    <MarketingSurface className="border-b border-border/45">
      <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_14%_18%,oklch(0.84_0.11_78_/_0.3),transparent_32%),radial-gradient(circle_at_84%_24%,oklch(0.64_0.14_248_/_0.18),transparent_28%),linear-gradient(180deg,oklch(1_0_0_/_0.12),transparent)]" />
      <MarketingContainer className="py-7 sm:py-9 lg:py-12">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/40 bg-[linear-gradient(145deg,oklch(1_0_0_/_0.64),oklch(0.985_0.005_250_/_0.42))] px-5 py-6 shadow-[0_24px_90px_oklch(0.58_0.08_250_/_0.06)] backdrop-blur-sm sm:px-7 sm:py-8 lg:px-8 lg:py-9">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,oklch(0.84_0.11_78_/_0.15),transparent_30%),radial-gradient(circle_at_82%_78%,oklch(0.64_0.14_248_/_0.12),transparent_32%)]" />
          <div className="relative space-y-8 sm:space-y-9">
            <div className="mx-auto flex max-w-[56rem] flex-col items-center text-center">
              <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-border/50 bg-white/72 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground shadow-sm">
                <Sparkles className="size-3.5 text-[oklch(0.78_0.14_70)]" />
                <span>{sectionLabel}</span>
              </div>
              <div className="mt-4 space-y-3">
                <h1
                  className={cn(
                    'mx-auto text-balance text-center font-medium leading-[0.9] tracking-[-0.08em] text-foreground',
                    'max-w-[272px] text-[clamp(1.8rem,7.4vw,2.45rem)] sm:max-w-[18ch] sm:text-[clamp(2.7rem,4.9vw,3.8rem)] lg:max-w-[23ch] lg:text-[clamp(2.95rem,3.2vw,4.1rem)]',
                    titleClassName
                  )}
                >
                  {title}
                </h1>
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(300px,0.88fr)] lg:items-start lg:gap-8">
              <div className="max-w-[37rem] space-y-6">
                <p className="max-w-[29rem] text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-8">
                  {description}
                </p>
                <div className="max-w-[31rem] space-y-5">
                  <MarketingActions primaryAction={primaryAction} secondaryAction={secondaryAction} />
                  <MarketingProofStrip signals={signals} />
                </div>
              </div>
              <div className="relative lg:border-l lg:border-border/35 lg:pl-8">{visual}</div>
            </div>
          </div>
        </div>
      </MarketingContainer>
    </MarketingSurface>
  )
}

function getVisualTitleClassName(title: string) {
  const titleLength = title.trim().length

  if (titleLength > 72) {
    return 'text-[1.18rem] leading-[1.16] sm:text-[1.34rem] lg:text-[1.42rem]'
  }

  if (titleLength > 56) {
    return 'text-[1.28rem] leading-[1.14] sm:text-[1.48rem] lg:text-[1.58rem]'
  }

  if (titleLength > 40) {
    return 'text-[1.38rem] leading-[1.12] sm:text-[1.58rem] lg:text-[1.74rem]'
  }

  return 'text-[1.48rem] leading-[1.08] sm:text-[1.72rem] lg:text-[1.9rem]'
}

function MarketingVisualBadge({
  icon,
  tone = 'default',
}: Readonly<{
  icon: ReactNode
  tone?: 'default' | 'analysis' | 'report'
}>) {
  const toneClassName =
    tone === 'analysis'
      ? 'bg-[linear-gradient(145deg,oklch(0.99_0.01_250_/_0.92),oklch(0.93_0.035_250_/_0.34))] text-[oklch(0.58_0.16_250)]'
      : tone === 'report'
        ? 'bg-[linear-gradient(145deg,oklch(1_0_0_/_0.9),oklch(0.95_0.03_85_/_0.3))] text-[oklch(0.76_0.13_78)]'
        : 'bg-[linear-gradient(145deg,oklch(1_0_0_/_0.92),oklch(0.96_0.028_82_/_0.28),oklch(0.95_0.02_250_/_0.18))] text-[oklch(0.64_0.1_48)]'

  return (
    <div
      className={cn(
        'flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-border/55 shadow-[0_10px_24px_oklch(0.58_0.08_250_/_0.08)] backdrop-blur-sm',
        toneClassName
      )}
    >
      {icon}
    </div>
  )
}

export function MarketingPosterVisual({
  locale,
  eyebrow,
  title,
  layers,
}: Readonly<{
  locale: SeoLocale
  eyebrow: string
  title: string
  layers: string[]
}>) {
  return (
    <div className="relative w-full max-w-[32rem]">
      <div className="absolute left-[6%] top-[8%] h-24 w-24 rounded-full bg-[oklch(0.82_0.12_82_/_0.24)] blur-3xl" />
      <div className="relative space-y-5 pt-2">
        <div className="space-y-3 border-b border-border/35 pb-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              {eyebrow}
            </p>
            <MarketingVisualBadge
              icon={<Layers3 className="size-[1.05rem]" />}
            />
          </div>
          <p
            className={cn(
              'max-w-[23rem] text-balance font-semibold tracking-[-0.045em] text-foreground',
              getVisualTitleClassName(title)
            )}
          >
            {title}
          </p>
        </div>
        <div className="grid gap-3">
          {layers.map((label, index) => (
            <div
              key={label}
              className="grid grid-cols-[2.35rem_1fr] gap-3 border-b border-border/30 pb-3.5"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-white/72 text-[11px] font-semibold text-foreground shadow-sm">
                0{index + 1}
              </div>
              <div className="space-y-1.5">
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {locale === 'zh' ? `层级 0${index + 1}` : `Layer 0${index + 1}`}
                </p>
                <p className="text-sm font-medium leading-6 text-foreground sm:text-base">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function MarketingDiagnosticVisual({
  eyebrow,
  title,
  rows,
}: Readonly<{
  eyebrow: string
  title: string
  rows: MarketingVisualRow[]
}>) {
  return (
    <div className="relative w-full max-w-[32rem]">
      <div className="absolute left-[4%] top-[10%] h-24 w-24 rounded-full bg-[oklch(0.58_0.16_250_/_0.16)] blur-3xl" />
      <div className="relative space-y-5 pt-2">
        <div className="space-y-3 border-b border-border/35 pb-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              {eyebrow}
            </p>
            <MarketingVisualBadge
              tone="analysis"
              icon={<ScanSearch className="size-[1.05rem]" />}
            />
          </div>
          <p
            className={cn(
              'max-w-[23rem] text-balance font-semibold tracking-[-0.045em] text-foreground',
              getVisualTitleClassName(title)
            )}
          >
            {title}
          </p>
        </div>
        <div className="grid gap-3">
          {rows.map((row, index) => (
            <div key={row.label} className="space-y-2 border-b border-border/30 pb-3.5">
              <div className="flex flex-col items-start gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {row.label}
                </p>
                <p className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                  {row.value}
                </p>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/55">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,oklch(0.58_0.16_250),oklch(0.78_0.14_70))]"
                  style={{ width: `${66 + index * 13}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function MarketingExampleVisual({
  eyebrow,
  title,
  steps,
}: Readonly<{
  eyebrow: string
  title: string
  steps: string[]
}>) {
  return (
    <div className="relative w-full max-w-[32rem]">
      <div className="absolute left-[5%] top-[10%] h-24 w-24 rounded-full bg-[oklch(1_0_0_/_0.22)] blur-2xl" />
      <div className="relative space-y-5 pt-2">
        <div className="space-y-3 border-b border-border/35 pb-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              {eyebrow}
            </p>
            <MarketingVisualBadge
              tone="report"
              icon={<FileSearch className="size-[1.05rem]" />}
            />
          </div>
          <p
            className={cn(
              'max-w-[23rem] text-balance font-semibold tracking-[-0.045em] text-foreground',
              getVisualTitleClassName(title)
            )}
          >
            {title}
          </p>
        </div>
        <div className="grid gap-3">
          {steps.map((label, index) => (
            <div key={label} className="grid grid-cols-[2.35rem_1fr] gap-3 border-b border-border/30 pb-3.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-white/72 text-[11px] font-semibold text-foreground shadow-sm">
                0{index + 1}
              </div>
              <div className="space-y-1.5">
                <div className="h-1.5 w-14 rounded-full bg-[linear-gradient(90deg,oklch(0.78_0.14_70),oklch(0.58_0.16_250))]" />
                <p className="text-sm font-medium leading-6 text-foreground sm:text-base">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function MarketingFeatureGrid({
  items,
  icon,
}: Readonly<{
  items: MarketingColumn[]
  icon: ReactNode
}>) {
  return (
    <div className="grid gap-8 border-t border-border/45 pt-8 lg:grid-cols-3">
      {items.map((item) => (
        <article key={item.title} className="space-y-4">
          <div className="flex items-center gap-3 text-foreground">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-white/55 shadow-sm backdrop-blur-sm">
              {icon}
            </div>
            <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
          </div>
          <p className="max-w-sm text-sm leading-7 text-muted-foreground sm:text-base">
            {item.description}
          </p>
          {item.href && item.actionLabel ? (
            <Link
              href={item.href}
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-opacity hover:opacity-75"
            >
              <span>{item.actionLabel}</span>
              <ArrowRight className="size-4" />
            </Link>
          ) : null}
        </article>
      ))}
    </div>
  )
}

export function MarketingProcessSteps({
  steps,
}: Readonly<{
  steps: MarketingStep[]
}>) {
  return (
    <div className="grid gap-8 border-t border-border/45 pt-8 lg:grid-cols-4">
      {steps.map((step) => (
        <article key={step.label} className="space-y-4">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
            {step.label}
          </p>
          <h3 className="text-xl font-semibold tracking-tight text-foreground">{step.title}</h3>
          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            {step.description}
          </p>
        </article>
      ))}
    </div>
  )
}

export function MarketingExamplePreview({
  inputLabel,
  inputExample,
  outputLabel,
  outputExample,
}: Readonly<{
  inputLabel: string
  inputExample: string[]
  outputLabel: string
  outputExample: string[]
}>) {
  const columns = [
    { label: inputLabel, items: inputExample },
    { label: outputLabel, items: outputExample },
  ]

  return (
    <div className="grid gap-8 border-t border-border/45 pt-8 lg:grid-cols-2">
      {columns.map((column) => (
        <div key={column.label} className="space-y-5">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
            {column.label}
          </p>
          <div className="space-y-3">
            {column.items.map((item) => (
              <div
                key={item}
                className="flex gap-3 border-b border-border/35 pb-3 text-sm leading-7 text-foreground/90 sm:text-base"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[oklch(0.78_0.14_70)]" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function MarketingInputOutputPreview(props: Readonly<{
  inputLabel: string
  inputExample: string[]
  outputLabel: string
  outputExample: string[]
}>) {
  return <MarketingExamplePreview {...props} />
}

export function MarketingOpportunityGrid({
  items,
  labels,
}: Readonly<{
  items: MarketingOpportunity[]
  labels: MarketingOpportunityLabels
}>) {
  return (
    <div className="space-y-5 border-t border-border/45 pt-8">
      {items.map((item) => (
        <article
          key={item.title}
          className="relative overflow-hidden rounded-[1.75rem] border border-border/45 bg-[linear-gradient(145deg,oklch(1_0_0_/_0.64),oklch(0.98_0.006_250_/_0.48))] px-5 py-5 shadow-[0_18px_60px_oklch(0.58_0.08_250_/_0.05)] backdrop-blur-sm sm:px-6 sm:py-6"
        >
          <div className="absolute right-0 top-0 h-28 w-28 translate-x-8 -translate-y-8 rounded-full bg-[oklch(0.82_0.12_85_/_0.16)] blur-3xl" />
          <div className="relative space-y-5">
            <div className="flex flex-col gap-4 border-b border-border/40 pb-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-3">
                {item.rank ? (
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    {item.rank}
                  </p>
                ) : null}
                <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
              </div>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border/60 bg-white/70 px-3 py-1.5 text-sm font-medium text-foreground shadow-sm">
                <span className="text-muted-foreground">{labels.score}</span>
                <span>{item.score}</span>
              </div>
            </div>
            <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
              {item.description}
            </p>
            {(item.audience || item.whyNow || item.nextMove) ? (
              <dl className="grid gap-4 text-sm sm:grid-cols-3">
                {item.audience ? (
                  <div className="space-y-1">
                    <dt className="text-[11px] font-medium tracking-[0.18em] text-muted-foreground">
                      {labels.audience}
                    </dt>
                    <dd className="leading-7 text-foreground/90">{item.audience}</dd>
                  </div>
                ) : null}
                {item.whyNow ? (
                  <div className="space-y-1">
                    <dt className="text-[11px] font-medium tracking-[0.18em] text-muted-foreground">
                      {labels.whyNow}
                    </dt>
                    <dd className="leading-7 text-foreground/90">{item.whyNow}</dd>
                  </div>
                ) : null}
                {item.nextMove ? (
                  <div className="space-y-1">
                    <dt className="text-[11px] font-medium tracking-[0.18em] text-muted-foreground">
                      {labels.nextMove}
                    </dt>
                    <dd className="leading-7 text-foreground/90">{item.nextMove}</dd>
                  </div>
                ) : null}
              </dl>
            ) : null}
            {item.highlights?.length ? (
              <div className="grid gap-3 border-t border-border/35 pt-4 sm:grid-cols-3">
                {item.highlights.map((highlight) => (
                  <div key={highlight} className="flex gap-3 text-sm leading-7 text-foreground/90">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[oklch(0.78_0.14_70)]" />
                    <p>{highlight}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  )
}

export function MarketingSnapshotGrid({
  items,
}: Readonly<{
  items: MarketingSnapshot[]
}>) {
  return (
    <div className="grid gap-5 border-t border-border/45 pt-8 lg:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.label}
          className="rounded-[1.5rem] border border-border/45 bg-[linear-gradient(145deg,oklch(1_0_0_/_0.58),oklch(0.98_0.006_250_/_0.42))] px-5 py-5 shadow-[0_14px_40px_oklch(0.58_0.08_250_/_0.04)] backdrop-blur-sm"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{item.label}</p>
          <p className="mt-3 text-xl font-semibold tracking-tight text-foreground">{item.value}</p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
        </article>
      ))}
    </div>
  )
}
export function MarketingFaqList({
  items,
}: Readonly<{
  items: MarketingFaqItem[]
}>) {
  return (
    <div className="grid gap-6 border-t border-border/45 pt-8 lg:grid-cols-2">
      {items.map((item) => (
        <article key={item.question} className="space-y-3 border-b border-border/35 pb-5">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            {item.question}
          </h3>
          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            {item.answer}
          </p>
        </article>
      ))}
    </div>
  )
}

export function MarketingCtaBanner({
  closing,
}: Readonly<{
  closing: MarketingClosing
}>) {
  return (
    <MarketingSurface className="border-t border-border/45 py-16 sm:py-20">
      <MarketingContainer>
        <div className="relative overflow-hidden rounded-[2rem] border border-border/45 bg-[linear-gradient(145deg,oklch(1_0_0_/_0.66),oklch(0.97_0.008_250_/_0.55))] px-6 py-8 shadow-[0_18px_70px_oklch(0.58_0.08_250_/_0.08)] backdrop-blur-sm sm:px-8 sm:py-10 lg:px-10">
          <div className="absolute right-0 top-0 h-40 w-40 translate-x-10 -translate-y-10 rounded-full bg-[oklch(0.82_0.12_85_/_0.22)] blur-3xl" />
          <div className="absolute bottom-0 left-0 h-44 w-44 -translate-x-10 translate-y-10 rounded-full bg-[oklch(0.58_0.16_250_/_0.18)] blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(280px,0.75fr)] lg:items-end">
            <MarketingSectionHeading
              eyebrow={closing.eyebrow}
              title={closing.title}
              description={closing.description}
            />
            <div className="space-y-4 lg:justify-self-end">
              <MarketingActions
                primaryAction={closing.primaryAction}
                secondaryAction={closing.secondaryAction}
              />
            </div>
          </div>
        </div>
      </MarketingContainer>
    </MarketingSurface>
  )
}
