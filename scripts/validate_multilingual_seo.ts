import { metadata as accountMetadata } from '../app/account/layout'
import { metadata as analysisMetadata } from '../app/analysis/layout'
import { metadata as authMetadata } from '../app/auth/layout'
import { metadata as privacyMetadata } from '../app/privacy/layout'
import { metadata as reportMetadata } from '../app/report/layout'
import { metadata as termsMetadata } from '../app/terms/layout'
import { metadata as productInsightMetadata } from '../app/tools/product-insight/layout'
import { getMarketingPageContent } from '../lib/marketing-content'
import {
  MARKETING_PAGE_KEYS,
  buildMarketingMetadata,
  getMarketingPageLocales,
  getMarketingPagePath,
  getSiteUrl,
} from '../lib/seo/metadata'
import { ALL_SEO_LOCALES, type SeoLocale } from '../lib/seo/locales'
import { buildMarketingStructuredData } from '../lib/seo/structured-data'

type CheckResult = {
  label: string
  ok: boolean
  detail: string
}

type NoIndexTarget = {
  label: string
  metadata: {
    robots?: {
      index?: boolean
      googleBot?: {
        index?: boolean
      }
    }
  }
}

const siteUrl = getSiteUrl().toString().replace(/\/$/, '')
const nonLocalizedHrefAllowList = ['/tools/product-insight']
const noIndexTargets: NoIndexTarget[] = [
  { label: 'account', metadata: accountMetadata },
  { label: 'analysis', metadata: analysisMetadata },
  { label: 'auth', metadata: authMetadata },
  { label: 'privacy', metadata: privacyMetadata },
  { label: 'report', metadata: reportMetadata },
  { label: 'terms', metadata: termsMetadata },
  { label: 'product-insight', metadata: productInsightMetadata },
]

function getTitleLengthRange(locale: SeoLocale): { min: number; max: number } {
  if (locale === 'zh') {
    return { min: 16, max: 40 }
  }

  return { min: 30, max: 80 }
}

function getDescriptionLengthRange(locale: SeoLocale): { min: number; max: number } {
  if (locale === 'zh') {
    return { min: 36, max: 120 }
  }

  return { min: 70, max: 220 }
}

function collectHrefs(value: unknown, results: string[] = []): string[] {
  if (Array.isArray(value)) {
    value.forEach((item) => collectHrefs(item, results))
    return results
  }

  if (value && typeof value === 'object') {
    for (const [key, entryValue] of Object.entries(value as Record<string, unknown>)) {
      if (key === 'href' && typeof entryValue === 'string') {
        results.push(entryValue)
        continue
      }

      collectHrefs(entryValue, results)
    }
  }

  return results
}

function hasLocalizedInternalLinks(locale: SeoLocale, hrefs: string[]): boolean {
  return hrefs.every((href) => {
    if (nonLocalizedHrefAllowList.includes(href)) {
      return true
    }

    return href.startsWith(`/${locale}`)
  })
}

function getRepresentativeLocalizedFields(locale: SeoLocale, pageKey: (typeof MARKETING_PAGE_KEYS)[number]): string[] {
  const content = getMarketingPageContent(locale, pageKey)
  const english = getMarketingPageContent('en', pageKey)

  if (content.templateKind === 'home' && english.templateKind === 'home') {
    return [content.props.supportTitle, content.props.detailTitle, content.props.closing.title]
  }

  if (content.templateKind === 'core' && english.templateKind === 'core') {
    return [content.props.supportTitle, content.props.detailTitle, content.props.faqTitle, content.props.closing.title]
  }

  if (content.templateKind === 'example' && english.templateKind === 'example') {
    return [content.props.supportTitle, content.props.opportunityTitle, content.props.detailTitle, content.props.closing.title]
  }

  return []
}

function isMeaningfullyLocalized(locale: SeoLocale, pageKey: (typeof MARKETING_PAGE_KEYS)[number]): boolean {
  if (locale === 'en') {
    return true
  }

  const content = getMarketingPageContent(locale, pageKey)
  const english = getMarketingPageContent('en', pageKey)
  const localeFields = getRepresentativeLocalizedFields(locale, pageKey)

  if (localeFields.some((value) => !value || !value.trim())) {
    return false
  }

  if (content.templateKind === 'home' && english.templateKind === 'home') {
    return content.props.supportTitle !== english.props.supportTitle
  }

  if (content.templateKind === 'core' && english.templateKind === 'core') {
    return content.props.supportTitle !== english.props.supportTitle
  }

  if (content.templateKind === 'example' && english.templateKind === 'example') {
    return content.props.supportTitle !== english.props.supportTitle
  }

  return false
}

function hasExpectedSectionShape(locale: SeoLocale, pageKey: (typeof MARKETING_PAGE_KEYS)[number]): boolean {
  const content = getMarketingPageContent(locale, pageKey)

  if (content.templateKind === 'home') {
    return (
      content.props.supportColumns.length >= 5 &&
      content.props.workflowSteps.length === 4 &&
      content.props.signals.length === 3
    )
  }

  if (content.templateKind === 'core') {
    return (
      content.props.diagnosticColumns.length === 3 &&
      content.props.faqItems.length >= 2 &&
      content.props.relatedColumns.length >= 3
    )
  }

  return (
    content.props.supportSnapshots.length === 3 &&
    content.props.opportunityItems.length === 3 &&
    content.props.relatedColumns.length >= 3
  )
}

function validatePage(locale: SeoLocale, pageKey: (typeof MARKETING_PAGE_KEYS)[number]): CheckResult[] {
  const metadata = buildMarketingMetadata(locale, pageKey)
  const expectedPath = `${siteUrl}${getMarketingPagePath(pageKey, locale)}`
  const expectedXDefaultPath = `${siteUrl}${getMarketingPagePath(pageKey, 'en')}`
  const expectedLocaleCodes = [...getMarketingPageLocales(pageKey), 'x-default']
  const alternates = metadata.alternates?.languages ?? {}
  const content = getMarketingPageContent(locale, pageKey)
  const hrefs = collectHrefs(content)
  const alternateKeys = Object.keys(alternates).sort()
  const structuredData = buildMarketingStructuredData(locale, pageKey, content)
  const structuredDataTypes = structuredData.map((entry) => String(entry['@type']))
  const expectedStructuredDataTypes =
    content.templateKind === 'home'
      ? ['Organization', 'WebSite']
      : content.templateKind === 'core'
        ? ['BreadcrumbList', 'SoftwareApplication', 'FAQPage']
        : ['BreadcrumbList', 'FAQPage']
  const ogImage = metadata.openGraph?.images?.[0]
  const ogImageUrl =
    typeof ogImage === 'string'
      ? ogImage
      : ogImage instanceof URL
        ? ogImage.toString()
        : ogImage?.url instanceof URL
          ? ogImage.url.toString()
          : typeof ogImage?.url === 'string'
            ? ogImage.url
            : null
  const twitterImage = metadata.twitter?.images?.[0]
  const twitterImageUrl =
    typeof twitterImage === 'string'
      ? twitterImage
      : twitterImage instanceof URL
        ? twitterImage.toString()
        : null
  const title = typeof metadata.title === 'string' ? metadata.title : ''
  const description = metadata.description ?? ''
  const titleLengthRange = getTitleLengthRange(locale)
  const descriptionLengthRange = getDescriptionLengthRange(locale)

  return [
    {
      label: `${locale}:${pageKey}:canonical`,
      ok: metadata.alternates?.canonical === expectedPath,
      detail: `expected ${expectedPath}, got ${String(metadata.alternates?.canonical)}`,
    },
    {
      label: `${locale}:${pageKey}:hreflang`,
      ok:
        expectedLocaleCodes.every((code) => code in alternates) &&
        alternateKeys.length === expectedLocaleCodes.length,
      detail: `expected alternates ${expectedLocaleCodes.join(', ')}, got ${alternateKeys.join(', ')}`,
    },
    {
      label: `${locale}:${pageKey}:x-default`,
      ok: alternates['x-default'] === expectedXDefaultPath,
      detail: `expected x-default ${expectedXDefaultPath}, got ${String(alternates['x-default'])}`,
    },
    {
      label: `${locale}:${pageKey}:localized-links`,
      ok: hasLocalizedInternalLinks(locale, hrefs),
      detail: `found hrefs: ${hrefs.join(', ')}`,
    },
    {
      label: `${locale}:${pageKey}:content-shape`,
      ok: hasExpectedSectionShape(locale, pageKey),
      detail: `template ${content.templateKind} has expected structure`,
    },
    {
      label: `${locale}:${pageKey}:localized-copy`,
      ok: isMeaningfullyLocalized(locale, pageKey),
      detail: 'representative localized fields differ from English fallback',
    },
    {
      label: `${locale}:${pageKey}:title-length`,
      ok: title.length >= titleLengthRange.min && title.length <= titleLengthRange.max,
      detail: `title length ${title.length} (expected ${titleLengthRange.min}-${titleLengthRange.max}): ${title}`,
    },
    {
      label: `${locale}:${pageKey}:description-length`,
      ok:
        description.length >= descriptionLengthRange.min &&
        description.length <= descriptionLengthRange.max,
      detail: `description length ${description.length} (expected ${descriptionLengthRange.min}-${descriptionLengthRange.max}): ${description}`,
    },
    {
      label: `${locale}:${pageKey}:og-image`,
      ok: !!ogImageUrl && ogImageUrl.startsWith('http'),
      detail: `open graph image: ${String(ogImageUrl)}`,
    },
    {
      label: `${locale}:${pageKey}:twitter-image`,
      ok: !!twitterImageUrl && twitterImageUrl.startsWith('http'),
      detail: `twitter image: ${String(twitterImageUrl)}`,
    },
    {
      label: `${locale}:${pageKey}:structured-data`,
      ok:
        expectedStructuredDataTypes.every((type) => structuredDataTypes.includes(type)) &&
        structuredDataTypes.length === expectedStructuredDataTypes.length,
      detail: `expected schema types ${expectedStructuredDataTypes.join(', ')}, got ${structuredDataTypes.join(', ')}`,
    },
  ]
}

function validateNoIndexTargets(target: NoIndexTarget): CheckResult[] {
  const index = target.metadata.robots?.index
  const googleBotIndex = target.metadata.robots?.googleBot?.index

  return [
    {
      label: `noindex:${target.label}:robots`,
      ok: index === false,
      detail: `robots.index is ${String(index)}`,
    },
    {
      label: `noindex:${target.label}:googlebot`,
      ok: googleBotIndex === false,
      detail: `robots.googleBot.index is ${String(googleBotIndex)}`,
    },
  ]
}

const results: CheckResult[] = []

for (const locale of ALL_SEO_LOCALES) {
  for (const pageKey of MARKETING_PAGE_KEYS.filter((activePageKey) =>
    getMarketingPageLocales(activePageKey).includes(locale)
  )) {
    results.push(...validatePage(locale, pageKey))
  }
}

for (const target of noIndexTargets) {
  results.push(...validateNoIndexTargets(target))
}

const failed = results.filter((result) => !result.ok)

if (failed.length > 0) {
  console.error(`Multilingual SEO validation failed: ${failed.length} checks failed.`)
  for (const failure of failed) {
    console.error(`- ${failure.label}: ${failure.detail}`)
  }
  process.exit(1)
}

const publishedPageCount = MARKETING_PAGE_KEYS.reduce(
  (total, pageKey) => total + getMarketingPageLocales(pageKey).length,
  0
)

console.log(
  `Multilingual SEO validation passed: ${results.length} checks across ${publishedPageCount} published locale-page combinations and ${MARKETING_PAGE_KEYS.length} page groups.`
)
