import {
  MARKETING_PAGE_KEYS,
  getMarketingPageLocales,
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
  MARKETING_PAGE_KEYS.flatMap((pageKey) =>
    getMarketingPageLocales(pageKey).map((activeLocale) => [
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
    pageKey === 'examples-ai-tools-for-small-business' ||
    pageKey === 'examples-ai-tools-for-recruiters' ||
    pageKey === 'examples-ai-tools-for-agencies' ||
    pageKey === 'examples-ai-tools-for-ecommerce-operations' ||
    pageKey === 'examples-ai-tools-for-customer-support-operations'
  )
}
