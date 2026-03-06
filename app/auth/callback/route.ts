import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import type { Database } from '@/lib/supabase-types'
import { logger } from '@/lib/logger'

type UserInsert = Database['public']['Tables']['users']['Insert']

const callbackLogger = logger.withContext('AuthCallback')

function escapeForHtmlScript(input: string): string {
  return input
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n')
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
}

function createPopupResultResponse(
  type: 'GOOGLE_AUTH_SUCCESS' | 'GOOGLE_AUTH_ERROR',
  errorMessage?: string
) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || ''
  const safeAppUrl = escapeForHtmlScript(appUrl)
  const safeError = escapeForHtmlScript(errorMessage || '')
  const safeType = escapeForHtmlScript(type)

  return new NextResponse(
    `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Completing sign in...</title>
      </head>
      <body style="font-family: system-ui, -apple-system, sans-serif; margin: 0; display: grid; place-items: center; min-height: 100vh;">
        <p style="color: #6b7280; font-size: 14px;">Completing sign in...</p>
        <script>
          (function () {
            const message = ${safeType === 'GOOGLE_AUTH_SUCCESS'
              ? "{ type: 'GOOGLE_AUTH_SUCCESS' }"
              : `{ type: 'GOOGLE_AUTH_ERROR', error: '${safeError}' }`}

            const origins = new Set([window.location.origin])
            const appUrl = '${safeAppUrl}'
            if (appUrl) {
              try {
                origins.add(new URL(appUrl).origin)
              } catch {}
            }

            if (window.opener && !window.opener.closed) {
              origins.forEach((origin) => {
                try {
                  window.opener.postMessage(message, origin)
                } catch {}
              })
              // Best-effort fallback for edge cross-origin opener scenarios.
              try {
                window.opener.postMessage(message, '*')
              } catch {}
            }

            setTimeout(() => {
              try {
                window.close()
              } catch {}
            }, 120)
          })()
        </script>
      </body>
    </html>
    `,
    {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  )
}

export async function GET(request: NextRequest) {
  callbackLogger.debug('GET /auth/callback called')

  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const isPopup = requestUrl.searchParams.get('popup') === 'true'
  const next = requestUrl.searchParams.get('next') || '/tools/product-insight'

  callbackLogger.debug('Params', { code: !!code, next, isPopup })

  if (code) {
    callbackLogger.debug('Creating response and server client...')

    // Determine response shape based on popup mode
    const createResponse = () =>
      isPopup
        ? createPopupResultResponse('GOOGLE_AUTH_SUCCESS')
        : NextResponse.redirect(new URL(next, requestUrl.origin))

    // Create response FIRST
    let response = createResponse()

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
            response = createResponse()
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
      if (isPopup) {
        return createPopupResultResponse('GOOGLE_AUTH_ERROR', error.message)
      }
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

    callbackLogger.debug('Returning callback response', {
      mode: isPopup ? 'popup' : 'redirect',
      target: isPopup ? 'popup-close' : next,
    })

    return response
  }

  if (isPopup) {
    callbackLogger.warn('Popup callback missing code')
    return createPopupResultResponse('GOOGLE_AUTH_ERROR', 'missing_code')
  }

  callbackLogger.info('No code, redirecting', { target: next })
  // Redirect to target page
  return NextResponse.redirect(new URL(next, requestUrl.origin))
}
