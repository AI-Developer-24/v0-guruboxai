import type { Metadata } from 'next'
import { RouteScaffoldPage } from '@/components/marketing/route-scaffold-page'
import { buildMarketingMetadata } from '@/lib/seo/metadata'
import { getSeoLocaleOrFallback, getSeoLocaleOrThrow } from '@/lib/seo/locales'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return buildMarketingMetadata(
    getSeoLocaleOrFallback(locale),
    'examples-ai-tools-for-freelancers'
  )
}

export default async function FreelancersExamplePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const activeLocale = getSeoLocaleOrThrow(locale)

  return (
    <RouteScaffoldPage
      locale={activeLocale}
      pageKey="examples-ai-tools-for-freelancers"
    />
  )
}
