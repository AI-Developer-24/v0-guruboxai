import type { ReactNode } from 'react'
import { ALL_SEO_LOCALES, getSeoLocaleOrThrow } from '@/lib/seo/locales'

export function generateStaticParams() {
  return ALL_SEO_LOCALES.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  getSeoLocaleOrThrow(locale)

  return children
}
