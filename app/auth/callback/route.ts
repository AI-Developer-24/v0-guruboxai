import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import type { Database } from '@/lib/supabase-types'
import { logger } from '@/lib/logger'

type UserInsert = Database['public']['Tables']['users']['Insert']

const callbackLogger = logger.withContext('AuthCallback')

export async function GET(request: NextRequest) {
  callbackLogger.debug('GET /auth/callback called')

  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const isPopup = requestUrl.searchParams.get('popup') === 'true'
  const next = requestUrl.searchParams.get('next') || '/tools/product-insight'

  callbackLogger.debug('Params', { code: !!code, next, isPopup })

  if (code) {
    callbackLogger.debug('Creating response and server client...')

    // Determine redirect target based on popup mode
    const redirectTarget = isPopup ? '/auth/popup-success' : next

    // Create response FIRST
    let response = NextResponse.redirect(new URL(redirectTarget, requestUrl.origin))

    // Create Supabase client for server-side
    // IMPORTANT: Use getAll/setAll for @supabase/ssr 0.8.0+
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            // Update request cookies for subsequent operations
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            // Create new response with updated cookies
            response = NextResponse.redirect(new URL(redirectTarget, requestUrl.origin))
            // Set cookies on the response
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    // Exchange code for session
    callbackLogger.debug('Exchanging code for session...')
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      callbackLogger.error('Auth error', error)
      // Return error response
      const errorResponse = NextResponse.redirect(
        new URL('/auth/error', requestUrl.origin)
      )
      return errorResponse
    }

    callbackLogger.debug('Session exchange successful', {
      hasSession: !!data.session,
      hasUser: !!data.user,
    })

    // Get user info
    const { data: { user } } = await supabase.auth.getUser()

    callbackLogger.debug('Get user result', {
      hasUser: !!user,
      userId: user?.id,
    })

    if (user) {
      // Ensure user record exists in users table using admin client (bypasses RLS)
      callbackLogger.debug('Upserting user to database...')
      const userData: UserInsert = {
        id: user.id,
        email: user.email!,
        name: user.user_metadata.full_name,
        avatar: user.user_metadata.avatar_url,
      }
      const { error: upsertError } = await supabaseAdmin
        .from('users')
        .upsert(userData as never, {
          onConflict: 'id',
        })

      if (upsertError) {
        callbackLogger.error('User upsert error', upsertError)
      } else {
        callbackLogger.debug('User upsert successful')
      }
    }

    callbackLogger.debug('Redirecting', { target: redirectTarget })

    return response
  }

  callbackLogger.info('No code, redirecting', { target: next })
  // Redirect to target page
  return NextResponse.redirect(new URL(next, requestUrl.origin))
}
