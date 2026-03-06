import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { logger } from './lib/logger'

const middlewareLogger = logger.withContext('Middleware')

export async function middleware(request: NextRequest) {
  middlewareLogger.debug('Processing request', { path: request.nextUrl.pathname })

  // Domain canonicalization disabled - let DNS/CDN handle www/apex redirects
  // Middleware-based redirects can cause loops in certain deployment environments
  // where request.nextUrl.hostname may not reflect the actual user-facing domain

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
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
