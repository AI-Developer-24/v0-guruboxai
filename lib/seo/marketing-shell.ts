import {
  MARKETING_PAGE_KEYS,
  getMarketingPagePath,
  type MarketingPageKey,
} from '@/lib/seo/metadata'
import { ALL_SEO_LOCALES, isSeoLocale, type SeoLocale } from '@/lib/seo/locales'

export type MarketingRouteState = {
  isMarketingRoute: boolean
  locale: SeoLocale
  pageKey: MarketingPageKey | null
}

export const SEO_LOCALE_LABELS: Record<SeoLocale, string> = {
  en: 'English',
  zh: '简体中文',
  de: 'Deutsch',
  fr: 'Français',
  it: 'Italiano',
  es: 'Español',
  pt: 'Português',
}

const MARKETING_ROUTE_MAP = new Map(
  ALL_SEO_LOCALES.flatMap((activeLocale) =>
    MARKETING_PAGE_KEYS.map((pageKey) => [
      getMarketingPagePath(pageKey, activeLocale),
      { locale: activeLocale, pageKey },
    ] as const)
  )
)

export function normalizePathname(pathname: string | null): string {
  if (!pathname) return '/'
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1)
  }

  return pathname
}

export function getMarketingRouteState(pathname: string | null): MarketingRouteState {
  const normalizedPathname = normalizePathname(pathname)
  const directMatch = MARKETING_ROUTE_MAP.get(normalizedPathname)

  if (directMatch) {
    return {
      isMarketingRoute: true,
      locale: directMatch.locale,
      pageKey: directMatch.pageKey,
    }
  }

  const segments = normalizedPathname.split('/').filter(Boolean)
  if (isSeoLocale(segments[0] ?? '')) {
    return { isMarketingRoute: false, locale: segments[0], pageKey: null }
  }

  return { isMarketingRoute: false, locale: 'en', pageKey: null }
}

export function isExampleMarketingPage(pageKey: MarketingPageKey | null) {
  return (
    pageKey === 'examples-ai-tools-for-freelancers' ||
    pageKey === 'examples-ai-tools-for-small-business'
  )
}
