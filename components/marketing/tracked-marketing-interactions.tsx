'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { MarketingPageKey } from '@/lib/seo/metadata'
import type { SeoLocale } from '@/lib/seo/locales'
import {
  trackMarketingCtaClick,
  trackMarketingRelatedLinkClick,
} from '@/lib/analytics/marketing-funnel'

type SharedTrackingProps = {
  pageKey: MarketingPageKey
  locale: SeoLocale
}

export function TrackedMarketingActions({
  pageKey,
  locale,
  primaryAction,
  secondaryAction,
  placement,
}: SharedTrackingProps & {
  primaryAction: {
    label: string
    href: string
  }
  secondaryAction?: {
    label: string
    href: string
    variant?: 'default' | 'outline' | 'ghost'
  }
  placement: 'hero' | 'closing'
}) {
  return (
    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
      <Button
        asChild
        size="lg"
        className="group marketing-cta-primary text-background h-11 rounded-full px-6 text-sm transition-transform duration-300"
      >
        <Link
          href={primaryAction.href}
          onClick={() =>
            trackMarketingCtaClick({
              pageKey,
              locale,
              placement: `${placement}_primary`,
              actionLabel: primaryAction.label,
              destinationHref: primaryAction.href,
              actionKind: 'primary',
            })
          }
        >
          <span>{primaryAction.label}</span>
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </Button>
      {secondaryAction ? (
        <Button
          asChild
          variant={secondaryAction.variant ?? 'outline'}
          size="lg"
          className="group marketing-cta-secondary h-11 rounded-full px-6 text-sm transition-transform duration-300"
        >
          <Link
            href={secondaryAction.href}
            onClick={() =>
              trackMarketingCtaClick({
                pageKey,
                locale,
                placement: `${placement}_secondary`,
                actionLabel: secondaryAction.label,
                destinationHref: secondaryAction.href,
                actionKind: 'secondary',
              })
            }
          >
            <span>{secondaryAction.label}</span>
          </Link>
        </Button>
      ) : null}
    </div>
  )
}

export function TrackedMarketingInlineLink({
  pageKey,
  locale,
  href,
  label,
  className,
  title,
}: SharedTrackingProps & {
  href: string
  label: string
  title: string
  className: string
}) {
  return (
    <Link
      href={href}
      onClick={() =>
        trackMarketingRelatedLinkClick({
          pageKey,
          locale,
          linkTitle: title,
          actionLabel: label,
          destinationHref: href,
        })
      }
      className={className}
    >
      <span>{label}</span>
      <ArrowRight className="size-4" />
    </Link>
  )
}
