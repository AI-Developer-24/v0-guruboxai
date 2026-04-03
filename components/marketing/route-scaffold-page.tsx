import type { SeoLocale } from '@/lib/seo/locales'
import type { MarketingPageKey } from '@/lib/seo/metadata'
import {
  CoreLandingTemplate,
  HomepageTemplate,
  PublicExampleTemplate,
} from '@/components/marketing/marketing-page-templates'
import { getMarketingPageContent } from '@/lib/marketing-content'

interface RouteScaffoldPageProps {
  locale: SeoLocale
  pageKey: MarketingPageKey
}

export function RouteScaffoldPage({
  locale,
  pageKey,
}: RouteScaffoldPageProps) {
  const content = getMarketingPageContent(locale, pageKey)

  if (content.templateKind === 'home') {
    return <HomepageTemplate locale={locale} {...content.props} />
  }

  if (content.templateKind === 'core') {
    return <CoreLandingTemplate locale={locale} {...content.props} />
  }

  return <PublicExampleTemplate locale={locale} {...content.props} />
}
