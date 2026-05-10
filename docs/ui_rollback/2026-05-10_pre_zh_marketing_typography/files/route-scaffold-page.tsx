import type { SeoLocale } from '@/lib/seo/locales'
import type { MarketingPageKey } from '@/lib/seo/metadata'
import {
  CoreLandingTemplate,
  HomepageTemplate,
  PublicExampleTemplate,
} from '@/components/marketing/marketing-page-templates'
import { getMarketingPageContent } from '@/lib/marketing-content'
import { buildMarketingStructuredData } from '@/lib/seo/structured-data'

interface RouteScaffoldPageProps {
  locale: SeoLocale
  pageKey: MarketingPageKey
}

export function RouteScaffoldPage({
  locale,
  pageKey,
}: RouteScaffoldPageProps) {
  const content = getMarketingPageContent(locale, pageKey)
  const structuredData = buildMarketingStructuredData(locale, pageKey, content)

  if (content.templateKind === 'home') {
    return (
      <>
        {structuredData.map((entry, index) => (
          <script
            key={`${pageKey}-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
          />
        ))}
        <HomepageTemplate locale={locale} pageKey={pageKey} {...content.props} />
      </>
    )
  }

  if (content.templateKind === 'core') {
    return (
      <>
        {structuredData.map((entry, index) => (
          <script
            key={`${pageKey}-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
          />
        ))}
        <CoreLandingTemplate locale={locale} pageKey={pageKey} {...content.props} />
      </>
    )
  }

  return (
    <>
      {structuredData.map((entry, index) => (
        <script
          key={`${pageKey}-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
      <PublicExampleTemplate locale={locale} pageKey={pageKey} {...content.props} />
    </>
  )
}
