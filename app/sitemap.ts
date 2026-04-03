import type { MetadataRoute } from 'next'
import { ALL_SEO_LOCALES } from '@/lib/seo/locales'
import {
  getMarketingPagePath,
  getSiteUrl,
  MARKETING_PAGE_KEYS,
  type MarketingPageKey,
} from '@/lib/seo/metadata'

function getPagePriority(pageKey: MarketingPageKey): number {
  if (pageKey === 'home') {
    return 1
  }

  if (pageKey.startsWith('examples-')) {
    return 0.7
  }

  return 0.9
}

function getPageChangeFrequency(
  pageKey: MarketingPageKey
): MetadataRoute.Sitemap[number]['changeFrequency'] {
  return pageKey === 'home' ? 'weekly' : 'monthly'
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl()
  const lastModified = new Date()

  return MARKETING_PAGE_KEYS.flatMap((pageKey) => {
    const languages = Object.fromEntries(
      ALL_SEO_LOCALES.map((locale) => [
        locale,
        new URL(getMarketingPagePath(pageKey, locale), siteUrl).toString(),
      ])
    )

    return ALL_SEO_LOCALES.map((locale) => ({
      url: new URL(getMarketingPagePath(pageKey, locale), siteUrl).toString(),
      lastModified,
      changeFrequency: getPageChangeFrequency(pageKey),
      priority: getPagePriority(pageKey),
      alternates: {
        languages,
      },
    }))
  })
}
