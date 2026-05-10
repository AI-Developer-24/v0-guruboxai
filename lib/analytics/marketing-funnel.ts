'use client'

import { track } from '@vercel/analytics'
import { getMarketingPagePath, type MarketingPageKey } from '@/lib/seo/metadata'
import type { SeoLocale } from '@/lib/seo/locales'

const MARKETING_ATTRIBUTION_KEY = 'badgersignal_marketing_attribution'
const MARKETING_ATTRIBUTION_MAX_AGE_MS = 1000 * 60 * 60 * 4

type MarketingPageGroup =
  | 'home'
  | 'core'
  | 'guide'
  | 'comparison'
  | 'use_case'
  | 'example'

type MarketingAttribution = {
  pageKey: MarketingPageKey
  pageGroup: MarketingPageGroup
  locale: SeoLocale
  path: string
  placement: string
  destinationHref: string
  timestamp: number
}

type SharedMarketingEventContext = {
  pageKey: MarketingPageKey
  locale: SeoLocale
}

type SharedAttributionPayload = {
  marketingSourcePageKey?: string
  marketingSourcePageGroup?: string
  marketingSourceLocale?: string
  marketingSourcePath?: string
  marketingSourcePlacement?: string
  marketingSourceAgeSeconds?: number
}

function safeTrack(eventName: string, properties: Record<string, string | number | boolean>) {
  try {
    track(eventName, properties)
  } catch {
    // Ignore analytics errors so product flows never depend on measurement.
  }
}

export function getMarketingPageGroup(pageKey: MarketingPageKey): MarketingPageGroup {
  if (pageKey === 'home') return 'home'
  if (pageKey.startsWith('guides-')) return 'guide'
  if (pageKey.startsWith('comparisons-')) return 'comparison'
  if (pageKey.startsWith('use-cases-')) return 'use_case'
  if (pageKey.startsWith('examples-')) return 'example'

  return 'core'
}

function isBrowser() {
  return typeof window !== 'undefined'
}

function storeMarketingAttribution(attribution: MarketingAttribution) {
  if (!isBrowser()) return

  window.sessionStorage.setItem(MARKETING_ATTRIBUTION_KEY, JSON.stringify(attribution))
}

export function clearMarketingAttribution() {
  if (!isBrowser()) return
  window.sessionStorage.removeItem(MARKETING_ATTRIBUTION_KEY)
}

function readMarketingAttribution(): MarketingAttribution | null {
  if (!isBrowser()) return null

  const raw = window.sessionStorage.getItem(MARKETING_ATTRIBUTION_KEY)
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw) as MarketingAttribution
    if (!parsed?.timestamp) {
      clearMarketingAttribution()
      return null
    }

    if (Date.now() - parsed.timestamp > MARKETING_ATTRIBUTION_MAX_AGE_MS) {
      clearMarketingAttribution()
      return null
    }

    return parsed
  } catch {
    clearMarketingAttribution()
    return null
  }
}

function getAttributionPayload(): SharedAttributionPayload {
  const attribution = readMarketingAttribution()
  if (!attribution) return {}

  return {
    marketingSourcePageKey: attribution.pageKey,
    marketingSourcePageGroup: attribution.pageGroup,
    marketingSourceLocale: attribution.locale,
    marketingSourcePath: attribution.path,
    marketingSourcePlacement: attribution.placement,
    marketingSourceAgeSeconds: Math.max(
      0,
      Math.round((Date.now() - attribution.timestamp) / 1000)
    ),
  }
}

export function trackMarketingCtaClick(
  context: SharedMarketingEventContext & {
    placement: string
    actionLabel: string
    destinationHref: string
    actionKind: 'primary' | 'secondary'
  }
) {
  const pageGroup = getMarketingPageGroup(context.pageKey)

  safeTrack('marketing_cta_click', {
    sourcePageKey: context.pageKey,
    sourcePageGroup: pageGroup,
    sourceLocale: context.locale,
    placement: context.placement,
    actionKind: context.actionKind,
    actionLabel: context.actionLabel,
    destinationHref: context.destinationHref,
  })

  if (context.destinationHref.startsWith('/tools/product-insight')) {
    storeMarketingAttribution({
      pageKey: context.pageKey,
      pageGroup,
      locale: context.locale,
      path: getMarketingPagePath(context.pageKey, context.locale),
      placement: context.placement,
      destinationHref: context.destinationHref,
      timestamp: Date.now(),
    })
  }
}

export function trackMarketingRelatedLinkClick(
  context: SharedMarketingEventContext & {
    linkTitle: string
    actionLabel: string
    destinationHref: string
    placement?: string
  }
) {
  safeTrack('marketing_related_link_click', {
    sourcePageKey: context.pageKey,
    sourcePageGroup: getMarketingPageGroup(context.pageKey),
    sourceLocale: context.locale,
    placement: context.placement ?? 'related_section',
    linkTitle: context.linkTitle,
    actionLabel: context.actionLabel,
    destinationHref: context.destinationHref,
  })
}

export function trackMarketingLocaleSwitch(
  context: SharedMarketingEventContext & {
    fromLocale: SeoLocale
    toLocale: SeoLocale
    destinationHref: string
    placement: string
  }
) {
  safeTrack('marketing_locale_switch_click', {
    sourcePageKey: context.pageKey,
    sourcePageGroup: getMarketingPageGroup(context.pageKey),
    sourceLocale: context.locale,
    fromLocale: context.fromLocale,
    toLocale: context.toLocale,
    destinationHref: context.destinationHref,
    placement: context.placement,
  })
}

export function trackMarketingLoginOpen(
  context: SharedMarketingEventContext & {
    placement: string
    path: string
  }
) {
  safeTrack('marketing_login_open', {
    sourcePageKey: context.pageKey,
    sourcePageGroup: getMarketingPageGroup(context.pageKey),
    sourceLocale: context.locale,
    placement: context.placement,
    sourcePath: context.path,
  })
}

export function trackAuthGoogleSignInClick(context: {
  surface: string
  currentPath: string
  locale?: string
  sourcePageKey?: string
}) {
  safeTrack('auth_google_sign_in_click', {
    surface: context.surface,
    currentPath: context.currentPath,
    locale: context.locale ?? 'unknown',
    sourcePageKey: context.sourcePageKey ?? 'none',
    ...getAttributionPayload(),
  })
}

function getInputLengthBucket(inputLength: number) {
  if (inputLength < 50) return 'short'
  if (inputLength < 150) return 'medium'
  return 'long'
}

export function trackProductAnalysisSubmit(context: {
  currentPath: string
  locale?: string
  inputLength: number
  authState: 'logged_in' | 'requires_login'
}) {
  safeTrack('product_analysis_submit', {
    currentPath: context.currentPath,
    locale: context.locale ?? 'unknown',
    inputLengthBucket: getInputLengthBucket(context.inputLength),
    authState: context.authState,
    ...getAttributionPayload(),
  })
}

export function trackProductAnalysisStarted(context: {
  currentPath: string
  locale?: string
  inputLength: number
}) {
  safeTrack('product_analysis_started', {
    currentPath: context.currentPath,
    locale: context.locale ?? 'unknown',
    inputLengthBucket: getInputLengthBucket(context.inputLength),
    ...getAttributionPayload(),
  })
}

export function trackProductLoginOpen(context: {
  currentPath: string
  locale?: string
  surface: string
}) {
  safeTrack('product_login_open', {
    currentPath: context.currentPath,
    locale: context.locale ?? 'unknown',
    surface: context.surface,
    ...getAttributionPayload(),
  })
}
