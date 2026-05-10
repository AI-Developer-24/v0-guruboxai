import { notFound } from 'next/navigation'
import {
  isMarketingPagePublishedForLocale,
  type MarketingPageKey,
} from '@/lib/seo/metadata'
import { getSeoLocaleOrThrow, type SeoLocale } from '@/lib/seo/locales'

export function getPublishedMarketingPageLocaleOrThrow(
  localeValue: string,
  pageKey: MarketingPageKey
): SeoLocale {
  const locale = getSeoLocaleOrThrow(localeValue)

  if (!isMarketingPagePublishedForLocale(pageKey, locale)) {
    notFound()
  }

  return locale
}
