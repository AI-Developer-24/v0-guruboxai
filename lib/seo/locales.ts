import { notFound } from 'next/navigation'

export const ALL_SEO_LOCALES = ['en', 'zh', 'de', 'fr', 'it', 'es', 'pt'] as const
export const SEO_LOCALE_COOKIE_NAME = 'badgersignal_locale'

export type SeoLocale = (typeof ALL_SEO_LOCALES)[number]

export function isSeoLocale(value: string): value is SeoLocale {
  return ALL_SEO_LOCALES.includes(value as SeoLocale)
}

export function getSeoLocaleOrThrow(value: string): SeoLocale {
  if (!isSeoLocale(value)) {
    notFound()
  }

  return value
}

export function getSeoLocaleOrFallback(
  value: string,
  fallback: SeoLocale = 'en'
): SeoLocale {
  return isSeoLocale(value) ? value : fallback
}

function resolveLocaleToken(token: string): SeoLocale | null {
  const normalized = token.trim().toLowerCase()

  if (!normalized) {
    return null
  }

  const baseLocale = normalized.split('-')[0]
  return isSeoLocale(baseLocale) ? baseLocale : null
}

export function getSeoLocaleFromAcceptLanguage(
  acceptLanguageHeader: string | null | undefined
): SeoLocale | null {
  if (!acceptLanguageHeader) {
    return null
  }

  const candidates = acceptLanguageHeader
    .split(',')
    .map((entry) => {
      const [token, qValue] = entry.trim().split(';q=')
      const quality = qValue ? Number.parseFloat(qValue) : 1

      return {
        locale: resolveLocaleToken(token),
        quality: Number.isFinite(quality) ? quality : 0,
      }
    })
    .filter((candidate): candidate is { locale: SeoLocale; quality: number } => !!candidate.locale)
    .sort((left, right) => right.quality - left.quality)

  return candidates[0]?.locale ?? null
}

export function resolvePreferredSeoLocale({
  savedPreference,
  acceptLanguage,
  fallback = 'en',
}: {
  savedPreference?: string | null
  acceptLanguage?: string | null
  fallback?: SeoLocale
}): SeoLocale {
  if (savedPreference && isSeoLocale(savedPreference)) {
    return savedPreference
  }

  return getSeoLocaleFromAcceptLanguage(acceptLanguage) ?? fallback
}

export function isCrawlerUserAgent(userAgent: string | null | undefined): boolean {
  if (!userAgent) {
    return false
  }

  return /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|linkedinbot|slackbot|whatsapp|discordbot|google-inspectiontool/i.test(
    userAgent
  )
}

export function getHtmlLang(locale: SeoLocale): string {
  switch (locale) {
    case 'zh':
      return 'zh-Hans'
    case 'de':
      return 'de'
    case 'fr':
      return 'fr'
    case 'it':
      return 'it'
    case 'es':
      return 'es'
    case 'pt':
      return 'pt'
    case 'en':
    default:
      return 'en'
  }
}

export function getOpenGraphLocale(locale: SeoLocale): string {
  switch (locale) {
    case 'zh':
      return 'zh_CN'
    case 'de':
      return 'de_DE'
    case 'fr':
      return 'fr_FR'
    case 'it':
      return 'it_IT'
    case 'es':
      return 'es_ES'
    case 'pt':
      return 'pt_PT'
    case 'en':
    default:
      return 'en_US'
  }
}
