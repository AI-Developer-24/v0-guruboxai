import type { Metadata } from 'next'
import { RouteScaffoldPage } from '@/components/marketing/route-scaffold-page'
import { buildMarketingMetadata } from '@/lib/seo/metadata'
import { getPublishedMarketingPageLocaleOrThrow } from '@/lib/seo/marketing-page-route'

const PAGE_KEY = 'comparisons-badgersignal-vs-manual-market-research' as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const activeLocale = getPublishedMarketingPageLocaleOrThrow(locale, PAGE_KEY)

  return buildMarketingMetadata(activeLocale, PAGE_KEY)
}

export default async function BadgerSignalVsManualMarketResearchPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const activeLocale = getPublishedMarketingPageLocaleOrThrow(locale, PAGE_KEY)

  return (
    <RouteScaffoldPage
      locale={activeLocale}
      pageKey={PAGE_KEY}
    />
  )
}
