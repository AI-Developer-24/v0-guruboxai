import type { CSSProperties, ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, FileSearch, Layers3, ScanSearch, Sparkles } from 'lucide-react'
import type { MarketingPageKey } from '@/lib/seo/metadata'
import { type SeoLocale } from '@/lib/seo/locales'
import {
  TrackedMarketingActions,
  TrackedMarketingInlineLink,
} from '@/components/marketing/tracked-marketing-interactions'
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

type MarketingTone = 'default' | 'analysis' | 'report'
type MarketingSectionLayout = 'balanced' | 'offset'
type MarketingFeatureGridVariant = 'grid' | 'staggered' | 'editorial'
export type MarketingHeroVariant = 'home' | 'core' | 'example'
export type MarketingVisualHeaderVariant = 'headline' | 'compact' | 'report'
export type MarketingHeroBodySize = 'regular' | 'compact'

const DETAIL_SURFACE_CLASS =
  'relative overflow-hidden rounded-[1.25rem] border border-[var(--line-soft)] bg-[linear-gradient(180deg,oklch(1_0_0_/_0.82),var(--surface-tint))] shadow-[inset_0_1px_0_oklch(1_0_0_/_0.6)]'

function getToneClasses(tone: MarketingTone) {
  if (tone === 'analysis') {
    return {
      badge:
        'border-[var(--line-soft)] bg-[linear-gradient(135deg,var(--brand-blue-soft),oklch(1_0_0_/_0.88))] text-[var(--brand-blue)]',
      line: 'bg-[linear-gradient(90deg,var(--brand-blue),transparent)]',
      glow: 'bg-[var(--glow-blue)]',
      chip: 'border-[var(--line-soft)] bg-[linear-gradient(180deg,oklch(1_0_0_/_0.82),var(--brand-blue-soft))] text-[var(--brand-ink)]',
      fill: 'bg-[linear-gradient(90deg,var(--brand-blue),var(--brand-gold))]',
    }
  }

  if (tone === 'report') {
    return {
      badge:
        'border-[var(--line-soft)] bg-[linear-gradient(135deg,var(--brand-gold-soft),oklch(1_0_0_/_0.9))] text-[oklch(0.72_0.12_70)]',
      line: 'bg-[linear-gradient(90deg,var(--brand-gold),var(--brand-blue),transparent)]',
      glow: 'bg-[var(--glow-gold)]',
      chip: 'border-[var(--line-soft)] bg-[linear-gradient(180deg,oklch(1_0_0_/_0.86),var(--brand-gold-soft))] text-[var(--brand-ink)]',
      fill: 'bg-[linear-gradient(90deg,var(--brand-gold),var(--brand-blue))]',
    }
  }

  return {
    badge:
      'border-[var(--line-soft)] bg-[linear-gradient(135deg,var(--brand-gold-soft),var(--brand-blue-soft))] text-[var(--brand-ink)]',
    line: 'bg-[linear-gradient(90deg,var(--brand-gold),var(--brand-blue),transparent)]',
    glow: 'bg-[var(--glow-gold)]',
    chip: 'border-[var(--line-soft)] bg-[linear-gradient(180deg,oklch(1_0_0_/_0.84),var(--surface-tint))] text-[var(--brand-ink)]',
    fill: 'bg-[linear-gradient(90deg,var(--brand-gold),var(--brand-blue))]',
  }
}

function getLayerLabel(locale: SeoLocale, index: number) {
  return locale === 'zh' ? `层级 0${index + 1}` : `Layer 0${index + 1}`
}

function getFeatureGridContainerClass(variant: MarketingFeatureGridVariant) {
  if (variant === 'staggered') {
    return 'grid gap-4 border-t border-[var(--line-soft)] pt-8 lg:auto-rows-fr lg:grid-cols-6'
  }

  return 'grid gap-4 border-t border-[var(--line-soft)] pt-8 lg:grid-cols-3'
}

function getFeatureGridItemClass(
  variant: MarketingFeatureGridVariant,
  index: number,
  total: number
) {
  if (variant === 'staggered') {
    if (index === 0) {
      return 'lg:col-span-3 lg:row-span-2'
    }

    if (index === 1 || index === 2) {
      return 'lg:col-span-3'
    }

    return 'lg:col-span-2'
  }

  if (variant === 'editorial' && total > 2 && index === 0) {
    return 'lg:col-span-2'
  }

  return ''
}

function SurfacePanel({
  children,
  className,
}: Readonly<{
  children: ReactNode
  className?: string
}>) {
  return (
    <article
      className={cn(
        'marketing-panel transition-transform duration-300 hover:-translate-y-[2px]',
        className
      )}
    >
      <div className="relative z-10 h-full">{children}</div>
    </article>
  )
}

function MarketingVisualBadge({
  icon,
  tone = 'default',
}: Readonly<{
  icon: ReactNode
  tone?: MarketingTone
}>) {
  return (
    <div
      className={cn(
        'flex h-11 w-11 shrink-0 items-center justify-center rounded-[1.1rem] border',
        getToneClasses(tone).badge
      )}
    >
      {icon}
    </div>
  )
}

function MarketingVisualFrame({
  eyebrow,
  title,
  tone = 'default',
  icon,
  children,
  headerVariant = 'headline',
}: Readonly<{
  eyebrow: string
  title?: string
  tone?: MarketingTone
  icon: ReactNode
  children: ReactNode
  headerVariant?: MarketingVisualHeaderVariant
}>) {
  const toneClasses = getToneClasses(tone)
  const frameClass =
    headerVariant === 'headline'
      ? 'min-h-[24rem] p-5 sm:p-6 lg:p-7'
      : headerVariant === 'compact'
        ? 'min-h-[18.5rem] p-4 sm:p-5 lg:min-h-[19.5rem] lg:p-6'
        : 'min-h-[17.5rem] p-4 sm:p-5 lg:min-h-[18.5rem] lg:p-6'
  const summaryClass =
    headerVariant === 'compact'
      ? 'max-w-[16rem] text-[0.94rem] leading-6 font-medium text-[var(--brand-ink)]/78'
      : 'max-w-[15rem] text-[0.88rem] leading-6 font-medium text-[var(--brand-ink)]/68'

  return (
    <SurfacePanel className={frameClass}>
      <div
        className={cn(
          'absolute top-[-12%] right-[-8%] h-36 w-36 rounded-full opacity-75 blur-3xl',
          toneClasses.glow
        )}
      />
      <div
        className={cn(
          'relative z-10 flex h-full flex-col',
          headerVariant === 'headline' ? 'gap-6' : 'gap-4'
        )}
      >
        <div className="flex items-start justify-between gap-5">
          <div className={cn(headerVariant === 'headline' ? 'space-y-3' : 'space-y-2')}>
            <p className="marketing-kicker">{eyebrow}</p>
            {headerVariant === 'headline' && title ? (
              <h3 className="marketing-card-title marketing-hero-visual-title max-w-[15ch] text-[clamp(1.6rem,2.25vw,2.4rem)] leading-[0.98] font-[560] tracking-[-0.058em] text-balance text-[var(--brand-ink)]">
                {title}
              </h3>
            ) : title ? (
              <p className={cn('marketing-copy-compact', summaryClass)}>{title}</p>
            ) : null}
          </div>
          <MarketingVisualBadge tone={tone} icon={icon} />
        </div>
        {children}
      </div>
    </SurfacePanel>
  )
}

function renderOpportunityCard(
  item: MarketingOpportunity,
  labels: MarketingOpportunityLabels,
  featured: boolean
) {
  return (
    <SurfacePanel className={cn('p-5 sm:p-6', featured ? 'lg:p-8' : undefined)}>
      <div className="flex h-full flex-col gap-5">
        <div className="flex flex-col gap-4 border-b border-[var(--line-soft)] pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            {item.rank ? <p className="marketing-kicker">{item.rank}</p> : null}
            <h3
              className={cn(
                'marketing-card-title leading-[0.98] font-[560] tracking-[-0.05em] text-balance text-[var(--brand-ink)]',
                featured ? 'text-[1.65rem] sm:text-[2rem]' : 'text-[1.28rem] sm:text-[1.45rem]'
              )}
            >
              {item.title}
            </h3>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--line-soft)] bg-[linear-gradient(180deg,oklch(1_0_0_/_0.88),var(--surface-tint))] px-3.5 py-1.5 text-sm font-medium text-[var(--brand-ink)] shadow-[inset_0_1px_0_oklch(1_0_0_/_0.65)]">
            <span className="marketing-meta-label text-muted-foreground">{labels.score}</span>
            <span>{item.score}</span>
          </div>
        </div>
        <p
          className={cn(
            'marketing-copy-block text-muted-foreground',
            featured ? 'text-base leading-8' : 'text-sm leading-7 sm:text-base'
          )}
        >
          {item.description}
        </p>
        {item.audience || item.whyNow || item.nextMove ? (
          <dl className="grid gap-4 text-sm sm:grid-cols-3">
            {item.audience ? (
              <div className="space-y-1.5">
                <dt className="marketing-kicker marketing-meta-label text-[10px]">{labels.audience}</dt>
                <dd className="marketing-copy-block text-foreground/90 leading-7">{item.audience}</dd>
              </div>
            ) : null}
            {item.whyNow ? (
              <div className="space-y-1.5">
                <dt className="marketing-kicker marketing-meta-label text-[10px]">{labels.whyNow}</dt>
                <dd className="marketing-copy-block text-foreground/90 leading-7">{item.whyNow}</dd>
              </div>
            ) : null}
            {item.nextMove ? (
              <div className="space-y-1.5">
                <dt className="marketing-kicker marketing-meta-label text-[10px]">{labels.nextMove}</dt>
                <dd className="marketing-copy-block text-foreground/90 leading-7">{item.nextMove}</dd>
              </div>
            ) : null}
          </dl>
        ) : null}
        {item.highlights?.length ? (
          <div className="grid gap-3 border-t border-[var(--line-soft)] pt-4 sm:grid-cols-3">
            {item.highlights.map((highlight) => (
              <div key={highlight} className="marketing-copy-block text-foreground/90 flex gap-3 text-sm leading-7">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--brand-gold)]" />
                <p>{highlight}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </SurfacePanel>
  )
}

export function MarketingSurface({
  children,
  className,
}: Readonly<{
  children: ReactNode
  className?: string
}>) {
  return (
    <section className={cn('page-fade relative overflow-hidden', className)}>{children}</section>
  )
}

export function MarketingContainer({
  children,
  className,
}: Readonly<{
  children: ReactNode
  className?: string
}>) {
  return (
    <div className={cn('mx-auto w-full max-w-[78rem] px-5 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  )
}

export function MarketingActions({
  pageKey,
  locale,
  primaryAction,
  secondaryAction,
  placement,
}: Readonly<{
  pageKey: MarketingPageKey
  locale: SeoLocale
  primaryAction: MarketingAction
  secondaryAction?: MarketingAction
  placement: 'hero' | 'closing'
}>) {
  return (
    <TrackedMarketingActions
      pageKey={pageKey}
      locale={locale}
      primaryAction={primaryAction}
      secondaryAction={secondaryAction}
      placement={placement}
    />
  )
}

export function MarketingProofStrip({
  signals,
}: Readonly<{
  signals: MarketingSignal[]
}>) {
  return (
    <dl className="grid gap-3 sm:grid-cols-3">
      {signals.map((signal) => (
        <div key={signal.label} className="marketing-panel px-4 py-4 sm:px-5">
          <div className="relative z-10 space-y-3">
            <dt className="marketing-kicker text-[10px]">{signal.label}</dt>
            <dd className="text-[1.55rem] leading-none font-semibold tracking-[-0.07em] text-[var(--brand-ink)] sm:text-[1.75rem]">
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
    <div className="max-w-3xl space-y-4">
      <p className="marketing-kicker">{eyebrow}</p>
      <h2 className="marketing-heading">{title}</h2>
      <p className="marketing-body max-w-[38rem]">{description}</p>
    </div>
  )
}

export function MarketingNarrativeSection({
  eyebrow,
  title,
  description,
  aside,
  children,
  layoutVariant = 'balanced',
}: Readonly<{
  eyebrow: string
  title: string
  description: string
  aside: ReactNode
  children: ReactNode
  layoutVariant?: MarketingSectionLayout
}>) {
  const layoutClass =
    layoutVariant === 'offset'
      ? 'lg:grid-cols-[minmax(0,1.02fr)_minmax(300px,0.72fr)] lg:gap-12'
      : 'lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.82fr)] lg:gap-10'
  const asideClass =
    layoutVariant === 'offset'
      ? 'lg:max-w-[22rem] lg:justify-self-end lg:pt-8'
      : 'lg:max-w-[24rem] lg:justify-self-end lg:pt-3'

  return (
    <div className="space-y-10 sm:space-y-12">
      <div className={cn('grid gap-7 lg:items-start', layoutClass)}>
        <MarketingSectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className={asideClass}>{aside}</div>
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
  tone?: MarketingTone
}>) {
  const toneClasses = getToneClasses(tone)

  return (
    <div className="relative border-t border-[var(--line-soft)] pt-4">
      <p className="marketing-kicker">{eyebrow}</p>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div
            key={`${item.label}-${item.title}`}
            className="grid grid-cols-[2.65rem_minmax(0,1fr)] gap-4 rounded-[1.15rem] px-0 py-1 transition-transform duration-300 hover:translate-x-[2px]"
          >
            <div
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-[1rem] border text-[10px] font-semibold tracking-[0.16em]',
                'marketing-meta-label',
                toneClasses.badge
              )}
            >
              {item.label}
            </div>
            <div className="space-y-1.5">
              <p className="marketing-aside-title text-[0.98rem] leading-6 font-medium text-[var(--brand-ink)] sm:text-[1.04rem]">
                {item.title}
              </p>
              {item.meta ? (
                <p className="marketing-copy-compact text-muted-foreground text-[13px] leading-6">{item.meta}</p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <div className={cn('mt-5 h-px w-full', toneClasses.line)} />
    </div>
  )
}

export function MarketingBalancedFeatureGrid({
  pageKey,
  locale,
  items,
  icon,
  variant = 'grid',
  trackLinks = false,
}: Readonly<{
  pageKey: MarketingPageKey
  locale: SeoLocale
  items: MarketingColumn[]
  icon: ReactNode
  variant?: MarketingFeatureGridVariant
  trackLinks?: boolean
}>) {
  return (
    <div className={getFeatureGridContainerClass(variant)}>
      {items.map((item, index) => {
        const isStrong = variant === 'staggered' && index === 0

        return (
          <SurfacePanel
            key={item.title}
            className={cn(
              'p-5 sm:p-6',
              getFeatureGridItemClass(variant, index, items.length),
              isStrong ? 'lg:p-7' : undefined
            )}
          >
            <div className="flex h-full flex-col gap-5">
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    DETAIL_SURFACE_CLASS,
                    'flex shrink-0 items-center justify-center',
                    isStrong ? 'h-12 w-12 rounded-[1.1rem]' : 'h-10 w-10 rounded-[1rem]'
                  )}
                >
                  {icon}
                </div>
                <div className="space-y-3">
                  <h3
                    className={cn(
                      'marketing-card-title leading-[1.02] font-[560] tracking-[-0.04em] text-[var(--brand-ink)]',
                      isStrong
                        ? 'text-[1.35rem] sm:text-[1.55rem]'
                        : 'text-[1.08rem] sm:text-[1.14rem]'
                    )}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      'marketing-copy-block text-muted-foreground',
                      isStrong ? 'text-base leading-8' : 'text-sm leading-7 sm:text-base'
                    )}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
              {item.href && item.actionLabel ? (
                trackLinks ? (
                  <TrackedMarketingInlineLink
                    pageKey={pageKey}
                    locale={locale}
                    href={item.href}
                    label={item.actionLabel}
                    title={item.title}
                    className="marketing-inline-link inline-flex w-fit items-center gap-2 pt-1 text-sm font-medium text-[var(--brand-ink)]"
                  />
                ) : (
                  <Link
                    href={item.href}
                    className="marketing-inline-link inline-flex w-fit items-center gap-2 pt-1 text-sm font-medium text-[var(--brand-ink)]"
                  >
                    <span>{item.actionLabel}</span>
                    <ArrowRight className="size-4" />
                  </Link>
                )
              ) : null}
            </div>
          </SurfacePanel>
        )
      })}
    </div>
  )
}

export function MarketingBalancedProcessSteps({
  steps,
}: Readonly<{
  steps: MarketingStep[]
}>) {
  return (
    <div className="grid gap-4 border-t border-[var(--line-soft)] pt-8 lg:grid-cols-4">
      {steps.map((step, index) => (
        <SurfacePanel
          key={step.label}
          className={cn('p-5 sm:p-6', index % 2 === 1 ? 'lg:translate-y-8' : undefined)}
        >
          <div className="flex h-full flex-col gap-5">
            <div className="flex items-start justify-between gap-4">
              <p className="marketing-kicker">{step.label}</p>
              <span className="text-[3.4rem] leading-none font-semibold tracking-[-0.12em] text-[oklch(0.58_0.16_250_/_0.12)]">
                {`${index + 1}`.padStart(2, '0')}
              </span>
            </div>
            <h3 className="marketing-card-title text-[1.14rem] leading-[1.02] font-[560] tracking-[-0.045em] text-[var(--brand-ink)]">
              {step.title}
            </h3>
            <p className="marketing-copy-block text-muted-foreground text-sm leading-7 sm:text-base">
              {step.description}
            </p>
            <div
              className={cn(
                'mt-auto h-px w-20',
                index % 2 === 0
                  ? 'bg-[linear-gradient(90deg,var(--brand-gold),var(--brand-blue))]'
                  : 'bg-[linear-gradient(90deg,var(--brand-blue),var(--brand-gold))]'
              )}
            />
          </div>
        </SurfacePanel>
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
    <div className="grid gap-4 border-t border-[var(--line-soft)] pt-8 lg:grid-cols-2">
      {items.map((item) => (
        <SurfacePanel key={item.question} className="p-5 sm:p-6">
          <div className="flex h-full flex-col gap-4">
            <h3 className="marketing-card-title text-[1.1rem] leading-[1.04] font-[560] tracking-[-0.04em] text-[var(--brand-ink)]">
              {item.question}
            </h3>
            <p className="marketing-copy-block text-muted-foreground text-sm leading-7 sm:text-base">{item.answer}</p>
          </div>
        </SurfacePanel>
      ))}
    </div>
  )
}

export function MarketingHeroShell({
  pageKey,
  locale,
  sectionLabel,
  title,
  description,
  primaryAction,
  secondaryAction,
  signals,
  visual,
  variant = 'home',
  visualHeaderVariant = 'headline',
  showProofStrip = true,
  heroBodySize = 'regular',
  maxTitleMeasure,
}: Readonly<{
  pageKey: MarketingPageKey
  locale: SeoLocale
  sectionLabel: string
  title: string
  description: string
  primaryAction: MarketingAction
  secondaryAction?: MarketingAction
  signals: MarketingSignal[]
  visual: ReactNode
  variant?: MarketingHeroVariant
  visualHeaderVariant?: MarketingVisualHeaderVariant
  showProofStrip?: boolean
  heroBodySize?: MarketingHeroBodySize
  maxTitleMeasure?: string
}>) {
  const compactVisual = visualHeaderVariant !== 'headline'
  const outerSpacingClass =
    variant === 'home' ? 'py-6 sm:py-10 lg:py-14' : 'py-4 sm:py-8 lg:py-10'
  const stageSpacingClass =
    variant === 'home'
      ? 'px-5 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10'
      : 'px-5 py-5 sm:px-7 sm:py-7 lg:px-9 lg:py-8'
  const layoutClass =
    variant === 'home'
      ? 'lg:grid-cols-[minmax(0,1.02fr)_minmax(360px,0.98fr)] lg:gap-10'
      : variant === 'core'
        ? 'lg:grid-cols-[minmax(0,1.08fr)_minmax(300px,0.72fr)] lg:gap-8'
        : 'lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.72fr)] lg:gap-8'
  const contentSpacingClass =
    variant === 'home'
      ? 'space-y-7 lg:space-y-8'
      : compactVisual
        ? 'space-y-5 lg:space-y-6'
        : 'space-y-6 lg:space-y-7'
  const textWidthClass = variant === 'home' ? 'max-w-[40rem] space-y-5' : 'max-w-[42rem] space-y-4.5'
  const descriptionClass =
    heroBodySize === 'compact'
      ? 'max-w-[31rem] text-[0.98rem] leading-7'
      : 'max-w-[34rem]'
  const visualWrapperClass =
    variant === 'home'
      ? 'relative lg:pl-4'
      : variant === 'core'
        ? 'relative lg:max-w-[21.5rem] lg:justify-self-end'
        : 'relative lg:max-w-[24rem] lg:justify-self-end'
  const titleStyle: CSSProperties | undefined = maxTitleMeasure
    ? { maxWidth: maxTitleMeasure }
    : undefined

  return (
    <MarketingSurface className="border-b border-[var(--line-soft)]">
      <div className="absolute inset-x-0 top-0 h-[40rem] bg-[radial-gradient(circle_at_18%_16%,oklch(1_0_0_/_0.46),transparent_28%),radial-gradient(circle_at_86%_14%,var(--glow-gold),transparent_26%),radial-gradient(circle_at_20%_78%,var(--glow-blue),transparent_24%)]" />
      <MarketingContainer className={outerSpacingClass}>
        <div className={cn('marketing-stage', stageSpacingClass)}>
          <div className="absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--brand-gold),var(--brand-blue),transparent)]" />
          <div className={cn('relative z-10 grid gap-8 lg:items-start', layoutClass)}>
            <div className={contentSpacingClass}>
              <div className={textWidthClass}>
                <div className="inline-flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line-soft)] bg-[linear-gradient(135deg,var(--brand-gold-soft),oklch(1_0_0_/_0.9))] text-[var(--brand-gold)]">
                    <Sparkles className="size-3.5" />
                  </span>
                  <p className="marketing-kicker">{sectionLabel}</p>
                </div>
                <h1 style={titleStyle} className="marketing-display-xl marketing-hero-title max-w-[11.8ch]">
                  {title}
                </h1>
                <p className={cn('marketing-body', descriptionClass)}>{description}</p>
              </div>
              <MarketingActions
                pageKey={pageKey}
                locale={locale}
                primaryAction={primaryAction}
                secondaryAction={secondaryAction}
                placement="hero"
              />
            </div>
            <div className={visualWrapperClass}>
              {variant === 'home' ? (
                <>
                  <div className="absolute top-8 left-0 hidden h-[72%] w-px bg-[linear-gradient(180deg,transparent,var(--line-strong),transparent)] lg:block" />
                  <div className="relative lg:pl-8">{visual}</div>
                </>
              ) : (
                <div className="relative">{visual}</div>
              )}
            </div>
            {showProofStrip ? (
              <div className="max-w-[37rem] lg:col-span-2">
                <MarketingProofStrip signals={signals} />
              </div>
            ) : null}
          </div>
        </div>
      </MarketingContainer>
    </MarketingSurface>
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
    <MarketingVisualFrame
      tone="default"
      eyebrow={eyebrow}
      title={title}
      headerVariant="headline"
      icon={<Layers3 className="size-[1.05rem]" />}
    >
      <div className="grid gap-4 md:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
        <div className={cn(DETAIL_SURFACE_CLASS, 'p-4 sm:p-5')}>
          <div className="relative z-10">
            <p className="marketing-kicker marketing-meta-label text-[10px]">{getLayerLabel(locale, 0)}</p>
            <div className="mt-4 flex items-end gap-3">
              <span className="text-[4.4rem] leading-none font-semibold tracking-[-0.12em] text-[oklch(0.78_0.14_70_/_0.22)]">
                20+
              </span>
              <div className="space-y-2 pb-2">
                <div className="h-px w-16 bg-[linear-gradient(90deg,var(--brand-gold),transparent)]" />
                <p className="marketing-copy-compact text-foreground/80 max-w-[11rem] text-sm leading-6">{layers[0]}</p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {layers.slice(1).map((label, index) => (
                <div
                  key={label}
                  className="flex items-start gap-3 border-t border-[var(--line-soft)] pt-3"
                >
                  <span className="marketing-meta-label text-muted-foreground mt-0.5 text-[10px] font-semibold tracking-[0.18em]">
                    0{index + 2}
                  </span>
                  <p className="marketing-copy-compact text-foreground/90 text-sm leading-6">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-3">
          {layers.map((label, index) => (
            <div
              key={label}
              className={cn(
                DETAIL_SURFACE_CLASS,
                'p-4',
                index === 1
                  ? 'bg-[linear-gradient(180deg,oklch(1_0_0_/_0.82),var(--brand-blue-soft))]'
                  : undefined
              )}
            >
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="marketing-kicker marketing-meta-label text-[10px]">{getLayerLabel(locale, index)}</p>
                  <div className="h-px w-10 bg-[linear-gradient(90deg,var(--brand-gold),var(--brand-blue))]" />
                </div>
                <p className="marketing-visual-value text-[0.98rem] leading-6 font-medium text-[var(--brand-ink)] sm:text-[1.02rem]">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MarketingVisualFrame>
  )
}

export function MarketingDiagnosticVisual({
  eyebrow,
  rows,
}: Readonly<{
  eyebrow: string
  rows: MarketingVisualRow[]
}>) {
  return (
    <MarketingVisualFrame
      tone="analysis"
      eyebrow={eyebrow}
      headerVariant="compact"
      icon={<ScanSearch className="size-[1.05rem]" />}
    >
      <div className="grid gap-4">
        {rows.map((row, index) => (
          <div
            key={row.label}
            className={cn(
              DETAIL_SURFACE_CLASS,
              'p-4 sm:p-[1.125rem]',
              index === 1 ? 'bg-[linear-gradient(180deg,oklch(1_0_0_/_0.84),var(--brand-blue-soft))]' : undefined
            )}
          >
            <div className="relative z-10 flex items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="marketing-kicker marketing-meta-label text-[10px]">{row.label}</p>
                <div
                  className={cn(
                    'h-px w-14',
                    index % 2 === 0
                      ? 'bg-[linear-gradient(90deg,var(--brand-blue),transparent)]'
                      : 'bg-[linear-gradient(90deg,var(--brand-gold),transparent)]'
                  )}
                />
              </div>
              <p className="marketing-card-title marketing-visual-value text-[1.02rem] leading-6 font-semibold tracking-[-0.03em] text-[var(--brand-ink)]">
                {row.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </MarketingVisualFrame>
  )
}

export function MarketingExampleVisual({
  eyebrow,
  snapshots,
}: Readonly<{
  eyebrow: string
  snapshots: MarketingSnapshot[]
}>) {
  return (
    <MarketingVisualFrame
      tone="report"
      eyebrow={eyebrow}
      headerVariant="report"
      icon={<FileSearch className="size-[1.05rem]" />}
    >
      <div className="grid gap-3">
        {snapshots.slice(0, 3).map((snapshot, index) => (
          <div
            key={`${snapshot.label}-${snapshot.value}`}
            className={cn(
              DETAIL_SURFACE_CLASS,
              'p-4',
              index === 2 ? 'bg-[linear-gradient(180deg,oklch(1_0_0_/_0.86),var(--brand-gold-soft))]' : undefined
            )}
          >
            <div className="relative z-10 space-y-2.5">
              <p className="marketing-kicker marketing-meta-label text-[10px]">{snapshot.label}</p>
              <p className="marketing-card-title marketing-visual-value text-[1rem] leading-6 font-semibold tracking-[-0.03em] text-[var(--brand-ink)] sm:text-[1.06rem]">
                {snapshot.value}
              </p>
              {index < 2 ? (
                <div className="h-px w-14 bg-[linear-gradient(90deg,var(--brand-gold),var(--brand-blue))]" />
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </MarketingVisualFrame>
  )
}

export function MarketingFeatureGrid({
  items,
  icon,
}: Readonly<{
  items: MarketingColumn[]
  icon: ReactNode
}>) {
  return <MarketingBalancedFeatureGrid items={items} icon={icon} />
}

export function MarketingProcessSteps({
  steps,
}: Readonly<{
  steps: MarketingStep[]
}>) {
  return <MarketingBalancedProcessSteps steps={steps} />
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
    <div className="grid gap-4 border-t border-[var(--line-soft)] pt-8 lg:grid-cols-2">
      {columns.map((column, index) => (
        <SurfacePanel
          key={column.label}
          className={cn('p-5 sm:p-6', index === 0 ? 'lg:-translate-y-2' : 'lg:translate-y-4')}
        >
          <div className="flex h-full flex-col gap-5">
            <p className="marketing-kicker">{column.label}</p>
            <div className="space-y-3">
              {column.items.map((item) => (
                <div
                  key={item}
                  className="marketing-copy-block text-foreground/90 flex gap-3 border-t border-[var(--line-soft)] pt-3 text-sm leading-7 sm:text-base"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--brand-gold)]" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </SurfacePanel>
      ))}
    </div>
  )
}

export function MarketingInputOutputPreview(
  props: Readonly<{
    inputLabel: string
    inputExample: string[]
    outputLabel: string
    outputExample: string[]
  }>
) {
  return <MarketingExamplePreview {...props} />
}

export function MarketingOpportunityGrid({
  items,
  labels,
}: Readonly<{
  items: MarketingOpportunity[]
  labels: MarketingOpportunityLabels
}>) {
  const [featured, ...rest] = items

  return (
    <div className="space-y-4 border-t border-[var(--line-soft)] pt-8">
      {featured ? renderOpportunityCard(featured, labels, true) : null}
      {rest.length ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {rest.map((item) => (
            <div key={item.title}>{renderOpportunityCard(item, labels, false)}</div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export function MarketingSnapshotGrid({
  items,
}: Readonly<{
  items: MarketingSnapshot[]
}>) {
  return (
    <div className="grid gap-4 border-t border-[var(--line-soft)] pt-8 lg:grid-cols-3">
      {items.map((item, index) => (
        <SurfacePanel
          key={item.label}
          className={cn('p-5 sm:p-6', index === 0 ? 'lg:col-span-2 lg:min-h-[15rem]' : undefined)}
        >
          <div className="flex h-full flex-col gap-4">
            <p className="marketing-kicker">{item.label}</p>
            <p
              className={cn(
                'marketing-card-title leading-[0.98] font-[560] tracking-[-0.05em] text-[var(--brand-ink)]',
                index === 0 ? 'text-[1.8rem] sm:text-[2.2rem]' : 'text-[1.35rem] sm:text-[1.55rem]'
              )}
            >
              {item.value}
            </p>
            <p
              className={cn(
                'marketing-copy-block text-muted-foreground',
                index === 0 ? 'max-w-[28rem] text-base leading-8' : 'text-sm leading-7 sm:text-base'
              )}
            >
              {item.description}
            </p>
          </div>
        </SurfacePanel>
      ))}
    </div>
  )
}

export function MarketingFaqList({
  items,
}: Readonly<{
  items: MarketingFaqItem[]
}>) {
  return <MarketingBalancedFaqList items={items} />
}

export function MarketingCtaBanner({
  pageKey,
  locale,
  closing,
}: Readonly<{
  pageKey: MarketingPageKey
  locale: SeoLocale
  closing: MarketingClosing
}>) {
  return (
    <MarketingSurface className="border-t border-[var(--line-soft)] py-16 sm:py-20">
      <MarketingContainer>
        <div className="marketing-stage px-6 py-7 sm:px-8 sm:py-8 lg:px-10">
          <div className="absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--brand-gold),var(--brand-blue),transparent)]" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <MarketingSectionHeading
              eyebrow={closing.eyebrow}
              title={closing.title}
              description={closing.description}
            />
            <div className="space-y-4 lg:justify-self-end">
              <MarketingActions
                pageKey={pageKey}
                locale={locale}
                primaryAction={closing.primaryAction}
                secondaryAction={closing.secondaryAction}
                placement="closing"
              />
            </div>
          </div>
        </div>
      </MarketingContainer>
    </MarketingSurface>
  )
}
