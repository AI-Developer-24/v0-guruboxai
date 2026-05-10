import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import {
  SEO_LOCALE_COOKIE_NAME,
  getSeoLocaleOrFallback,
  isSeoLocale,
} from './lib/seo/locales'
import { logger } from './lib/logger'

const middlewareLogger = logger.withContext('Middleware')

export async function middleware(request: NextRequest) {
  const startTime = Date.now()
  const pathname = request.nextUrl.pathname
  const pathnameLocale = pathname.split('/')[1] ?? ''
  const resolvedLocale = isSeoLocale(pathnameLocale)
    ? pathnameLocale
    : getSeoLocaleOrFallback('en')
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-seo-locale', resolvedLocale)
  const isAccountPage = pathname === '/account' || pathname.startsWith('/account/')
  const localePreferenceCookie = request.cookies.get(SEO_LOCALE_COOKIE_NAME)?.value
  const shouldSyncLocaleCookie =
    isSeoLocale(pathnameLocale) && localePreferenceCookie !== resolvedLocale

  middlewareLogger.debug('Processing request', {
    path: pathname,
    hostname: request.nextUrl.hostname,
    origin: request.nextUrl.origin,
    locale: resolvedLocale,
  })

  // Domain canonicalization disabled - let DNS/CDN handle www/apex redirects
  // Middleware-based redirects can cause loops in certain deployment environments
  // where request.nextUrl.hostname may not reflect the actual user-facing domain

  if (!isAccountPage) {
    middlewareLogger.debug('Skipping auth for non-protected route', {
      path: pathname,
      locale: resolvedLocale,
    })

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })

    if (shouldSyncLocaleCookie) {
      response.cookies.set(SEO_LOCALE_COOKIE_NAME, resolvedLocale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax',
      })
    }

    return response
  }

  // Log all cookies for debugging
  const allCookies = request.cookies.getAll()
  const supabaseCookies = allCookies.filter(c => c.name.startsWith('sb-'))
  middlewareLogger.debug('Cookies received', {
    totalCookies: allCookies.length,
    supabaseCookieCount: supabaseCookies.length,
    supabaseCookieNames: supabaseCookies.map(c => c.name),
    // Don't log values for security, just check if they exist
    hasAuthToken: supabaseCookies.some(c => c.name.includes('auth-token')),
  })

  let supabaseResponse = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          middlewareLogger.debug('Supabase setting cookies', {
            count: cookiesToSet.length,
            names: cookiesToSet.map(c => c.name),
          })
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request: {
              headers: requestHeaders,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Use getUser() instead of getSession() for security
  // This also refreshes the session if needed
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  const elapsed = Date.now() - startTime
  middlewareLogger.debug('User check', {
    hasUser: !!user,
    userId: user?.id,
    error: error?.message,
    elapsedMs: elapsed,
  })
  // Protect /account route
  if (isAccountPage && !user) {
    middlewareLogger.info('No user, redirecting from account page')
    const redirectUrl = new URL('/tools/product-insight', request.nextUrl)
    return NextResponse.redirect(redirectUrl)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     * - robots.txt / sitemap.xml (SEO assets)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
