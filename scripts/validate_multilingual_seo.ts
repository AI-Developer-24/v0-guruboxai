import { getMarketingPageContent } from '../lib/marketing-content'
import { MARKETING_PAGE_KEYS, buildMarketingMetadata, getMarketingPagePath, getSiteUrl } from '../lib/seo/metadata'
import { ALL_SEO_LOCALES, type SeoLocale } from '../lib/seo/locales'

type CheckResult = {
  label: string
  ok: boolean
  detail: string
}

const siteUrl = getSiteUrl().toString().replace(/\/$/, '')
const expectedLocaleCodes = [...ALL_SEO_LOCALES, 'x-default']
const nonLocalizedHrefAllowList = ['/tools/product-insight']

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
      content.props.relatedColumns.length === 3
    )
  }

  return (
    content.props.supportSnapshots.length === 3 &&
    content.props.opportunityItems.length === 3 &&
    content.props.relatedColumns.length === 3
  )
}

function validatePage(locale: SeoLocale, pageKey: (typeof MARKETING_PAGE_KEYS)[number]): CheckResult[] {
  const metadata = buildMarketingMetadata(locale, pageKey)
  const expectedPath = `${siteUrl}${getMarketingPagePath(pageKey, locale)}`
  const alternates = metadata.alternates?.languages ?? {}
  const hrefs = collectHrefs(getMarketingPageContent(locale, pageKey))
  const alternateKeys = Object.keys(alternates).sort()

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
      label: `${locale}:${pageKey}:localized-links`,
      ok: hasLocalizedInternalLinks(locale, hrefs),
      detail: `found hrefs: ${hrefs.join(', ')}`,
    },
    {
      label: `${locale}:${pageKey}:content-shape`,
      ok: hasExpectedSectionShape(locale, pageKey),
      detail: `template ${getMarketingPageContent(locale, pageKey).templateKind} has expected structure`,
    },
    {
      label: `${locale}:${pageKey}:localized-copy`,
      ok: isMeaningfullyLocalized(locale, pageKey),
      detail: 'representative localized fields differ from English fallback',
    },
  ]
}

const results: CheckResult[] = []

for (const locale of ALL_SEO_LOCALES) {
  for (const pageKey of MARKETING_PAGE_KEYS) {
    results.push(...validatePage(locale, pageKey))
  }
}

const failed = results.filter((result) => !result.ok)

if (failed.length > 0) {
  console.error(`Multilingual SEO validation failed: ${failed.length} checks failed.`)
  for (const failure of failed) {
    console.error(`- ${failure.label}: ${failure.detail}`)
  }
  process.exit(1)
}

console.log(`Multilingual SEO validation passed: ${results.length} checks across ${ALL_SEO_LOCALES.length} locales and ${MARKETING_PAGE_KEYS.length} page groups.`)
