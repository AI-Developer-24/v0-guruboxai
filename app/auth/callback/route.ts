import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  console.log('[Auth Callback] GET /auth/callback called')

  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const isPopup = requestUrl.searchParams.get('popup') === 'true'
  const next = requestUrl.searchParams.get('next') || '/tools/product-insight'

  console.log('[Auth Callback] Params', { code: !!code, next, isPopup })

  if (code) {
    console.log('[Auth Callback] Creating response and server client...')

    // Determine redirect target based on popup mode
    const redirectTarget = isPopup ? '/auth/popup-success' : next

    // Create response FIRST
    const response = NextResponse.redirect(new URL(redirectTarget, requestUrl.origin))

    // Create Supabase client for server-side
    // IMPORTANT: set/remove cookies on RESPONSE, not request
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            const value = request.cookies.get(name)?.value
            console.log(`[Auth Callback] Get cookie ${name}:`, value ? 'found' : 'not found')
            return value
          },
          set(name: string, value: string, options: any) {
            console.log(`[Auth Callback] Set cookie ${name} on response`)
            response.cookies.set({ name, value, ...options })
          },
          remove(name: string, options: any) {
            console.log(`[Auth Callback] Remove cookie ${name} from response`)
            response.cookies.delete({ name, ...options })
          },
        },
      }
    )

    // Exchange code for session
    console.log('[Auth Callback] Exchanging code for session...')
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('[Auth Callback] Auth error:', error)
      // Return error response
      const errorResponse = NextResponse.redirect(
        new URL('/auth/error', requestUrl.origin)
      )
      return errorResponse
    }

    console.log('[Auth Callback] Session exchange successful', {
      hasSession: !!data.session,
      hasUser: !!data.user,
    })

    // Get user info
    const { data: { user } } = await supabase.auth.getUser()

    console.log('[Auth Callback] Get user result', {
      hasUser: !!user,
      userId: user?.id,
    })

    if (user) {
      // Ensure user record exists in users table using admin client (bypasses RLS)
      console.log('[Auth Callback] Upserting user to database...')
      const { error: upsertError } = await supabaseAdmin
        .from('users')
        .upsert({
          id: user.id,
          email: user.email!,
          name: user.user_metadata.full_name,
          avatar: user.user_metadata.avatar_url,
        }, {
          onConflict: 'id',
        })

      if (upsertError) {
        console.error('[Auth Callback] User upsert error:', upsertError)
      } else {
        console.log('[Auth Callback] User upsert successful')
      }
    }

    console.log('[Auth Callback] Response cookies:', response.cookies.getAll())
    console.log('[Auth Callback] Redirecting to:', redirectTarget)

    return response
  }

  console.log('[Auth Callback] No code, redirecting to:', next)
  // Redirect to target page
  return NextResponse.redirect(new URL(next, requestUrl.origin))
}
