import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  // Create Supabase client for middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set({ name, value, ...options })
          })
        },
      },
    }
  )

  // This will refresh the session if needed
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Debug logging for API and analysis routes
  if (req.nextUrl.pathname.includes('api') || req.nextUrl.pathname.includes('analysis')) {
    console.log('[MIDDLEWARE] Path:', req.nextUrl.pathname)
    console.log('[MIDDLEWARE] Session exists:', !!session, 'User:', session?.user?.id)
    console.log('[MIDDLEWARE] Cookies:', req.cookies.getAll().map(c => c.name))
  }

  const isAccountPage = req.nextUrl.pathname.startsWith('/account')

  // Protect /account route
  if (isAccountPage && !session) {
    const redirectUrl = new URL('/tools/product-insight', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  return res
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
