import { notFound } from 'next/navigation'

export const ALL_SEO_LOCALES = ['en', 'zh', 'de', 'fr', 'it', 'es', 'pt'] as const

export const ACTIVE_SEO_LOCALES = ['en', 'zh'] as const

export type SeoLocale = (typeof ALL_SEO_LOCALES)[number]
export type ActiveSeoLocale = (typeof ACTIVE_SEO_LOCALES)[number]

export function isSeoLocale(value: string): value is SeoLocale {
  return ALL_SEO_LOCALES.includes(value as SeoLocale)
}

export function isActiveSeoLocale(value: string): value is ActiveSeoLocale {
  return ACTIVE_SEO_LOCALES.includes(value as ActiveSeoLocale)
}

export function getActiveSeoLocaleOrThrow(value: string): ActiveSeoLocale {
  if (!isActiveSeoLocale(value)) {
    notFound()
  }

  return value
}

export function getSeoLocaleOrThrow(value: string): SeoLocale {
  if (!isSeoLocale(value)) {
    notFound()
  }

  return value
}

export function getActiveSeoLocaleOrFallback(
  value: string,
  fallback: ActiveSeoLocale = 'en'
): ActiveSeoLocale {
  return isActiveSeoLocale(value) ? value : fallback
}

export function getSeoLocaleOrFallback(
  value: string,
  fallback: SeoLocale = 'en'
): SeoLocale {
  return isSeoLocale(value) ? value : fallback
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
