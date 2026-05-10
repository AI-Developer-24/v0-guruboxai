import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  SEO_LOCALE_COOKIE_NAME,
  isCrawlerUserAgent,
  resolvePreferredSeoLocale,
} from '@/lib/seo/locales'

export default async function Home() {
  const cookieStore = await cookies()
  const headerStore = await headers()
  const savedPreference = cookieStore.get(SEO_LOCALE_COOKIE_NAME)?.value ?? null
  const userAgent = headerStore.get('user-agent')
  const acceptLanguage = headerStore.get('accept-language')
  const targetLocale = isCrawlerUserAgent(userAgent)
    ? 'en'
    : resolvePreferredSeoLocale({
        savedPreference,
        acceptLanguage,
        fallback: 'en',
      })

  redirect(`/${targetLocale}`)
}
