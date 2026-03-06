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
      const requestHost = request.nextUrl.host
      const canonicalHost = canonicalUrl.host
      const protocol = request.headers.get('x-forwarded-proto') ?? request.nextUrl.protocol.replace(':', '')

      if (requestHost !== canonicalHost || protocol !== canonicalUrl.protocol.replace(':', '')) {
        const redirectUrl = new URL(request.url)
        redirectUrl.protocol = canonicalUrl.protocol
        redirectUrl.host = canonicalHost
        middlewareLogger.info('Redirecting to canonical domain', {
          from: `${protocol}://${requestHost}`,
          to: canonicalUrl.origin,
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
