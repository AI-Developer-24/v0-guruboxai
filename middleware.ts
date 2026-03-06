import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { logger } from './lib/logger'

const middlewareLogger = logger.withContext('Middleware')

export async function middleware(request: NextRequest) {
  middlewareLogger.debug('Processing request', { path: request.nextUrl.pathname })

  const canonicalAppUrl = process.env.NEXT_PUBLIC_APP_URL
  if (process.env.NODE_ENV === 'production' && canonicalAppUrl) {
    try {
      const canonicalUrl = new URL(canonicalAppUrl)
      const requestHost = request.nextUrl.hostname.replace(/\.$/, '').toLowerCase()
      const canonicalHost = canonicalUrl.hostname.replace(/\.$/, '').toLowerCase()

      // Only normalize host here. Protocol may be rewritten by upstream proxies/CDN,
      // and strict protocol comparison can cause redirect loops in production.
      if (requestHost !== canonicalHost) {
        // Use request.nextUrl instead of request.url to avoid issues with proxies/CDN
        // that may rewrite the internal URL
        const redirectUrl = new URL(request.nextUrl)
        redirectUrl.hostname = canonicalUrl.hostname
        // Preserve the protocol from the incoming request (handled by CDN/proxy)
        // to avoid redirect loops
        middlewareLogger.info('Redirecting to canonical domain', {
          from: request.nextUrl.origin,
          to: redirectUrl.origin,
          path: request.nextUrl.pathname,
        })
        return NextResponse.redirect(redirectUrl, 308)
      }
    } catch (error) {
      middlewareLogger.warn('Invalid NEXT_PUBLIC_APP_URL, skipping canonical redirect', {
        value: canonicalAppUrl,
        error: error instanceof Error ? error.message : String(error),
      })
    }
  }

  let supabaseResponse = NextResponse.next({
    request,
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
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
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

  middlewareLogger.debug('User check', {
    hasUser: !!user,
    userId: user?.id,
    error: error?.message,
  })

  const isAccountPage = request.nextUrl.pathname.startsWith('/account')

  // Protect /account route
  if (isAccountPage && !user) {
    middlewareLogger.info('No user, redirecting from account page')
    const redirectUrl = new URL('/tools/product-insight', request.url)
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
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
