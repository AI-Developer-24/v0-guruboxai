import type { MarketingPageContent } from '@/lib/marketing-content'
import {
  DEFAULT_OG_IMAGE_PATH,
  SITE_NAME,
  getMarketingPagePath,
  getSiteUrl,
  type MarketingPageKey,
} from '@/lib/seo/metadata'
import { getHtmlLang, type SeoLocale } from '@/lib/seo/locales'

type StructuredDataNode = Record<string, unknown>

const SCHEMA_CONTEXT = 'https://schema.org'

function getAbsoluteUrl(path: string): string {
  return new URL(path, getSiteUrl()).toString()
}

function buildBreadcrumbList(
  locale: SeoLocale,
  pageKey: MarketingPageKey,
  title: string
): StructuredDataNode {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: SITE_NAME,
        item: getAbsoluteUrl(getMarketingPagePath('home', locale)),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: title,
        item: getAbsoluteUrl(getMarketingPagePath(pageKey, locale)),
      },
    ],
  }
}

function buildFaqPage(
  faqItems: Array<{ question: string; answer: string }>
): StructuredDataNode {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function buildMarketingStructuredData(
  locale: SeoLocale,
  pageKey: MarketingPageKey,
  content: MarketingPageContent
): StructuredDataNode[] {
  const pageUrl = getAbsoluteUrl(getMarketingPagePath(pageKey, locale))
  const inLanguage = getHtmlLang(locale)

  if (content.templateKind === 'home') {
    return [
      {
        '@context': SCHEMA_CONTEXT,
        '@type': 'Organization',
        name: SITE_NAME,
        url: getSiteUrl().origin,
        logo: getAbsoluteUrl(DEFAULT_OG_IMAGE_PATH),
      },
      {
        '@context': SCHEMA_CONTEXT,
        '@type': 'WebSite',
        name: SITE_NAME,
        url: pageUrl,
        inLanguage,
        description: content.props.description,
      },
    ]
  }

  if (content.templateKind === 'core') {
    return [
      buildBreadcrumbList(locale, pageKey, content.props.title),
      {
        '@context': SCHEMA_CONTEXT,
        '@type': 'SoftwareApplication',
        name: `${SITE_NAME}: ${content.props.title}`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: pageUrl,
        inLanguage,
        description: content.props.description,
        featureList: content.props.diagnosticColumns.map((column) => column.title),
      },
      {
        ...buildFaqPage(content.props.faqItems),
      },
    ]
  }

  return [
    buildBreadcrumbList(locale, pageKey, content.props.title),
    buildFaqPage(content.props.faqItems),
  ]
}
