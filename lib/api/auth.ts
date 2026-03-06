import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { unauthorizedResponse } from './response'

export async function getAuthenticatedUser() {
  console.log('[Auth] getAuthenticatedUser called')

  const cookieStore = await cookies()
  const allCookies = cookieStore.getAll()

  console.log('[Auth] All cookies', {
    count: allCookies.length,
    cookieNames: allCookies.map(c => c.name),
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        // Note: setAll is not typically needed for read-only auth checks
        // but we include it for completeness
        setAll(cookiesToSet) {
          // API routes don't typically set cookies, but if needed:
          cookiesToSet.forEach(({ name, value, options }) => {
            // In API routes, we can't set cookies directly
            // This would need to be handled by the response
          })
        },
      },
    }
  )

  console.log('[Auth] Calling supabase.auth.getUser()')
  const { data: { user }, error } = await supabase.auth.getUser()

  console.log('[Auth] getUser result', {
    hasUser: !!user,
    userId: user?.id,
    error: error ? {
      message: error.message,
      name: error.name,
    } : null,
  })

  if (error || !user) {
    console.log('[Auth] Authentication failed, returning null')
    return null
  }

  console.log('[Auth] Authentication successful, returning user')
  return user
}

export async function requireAuth() {
  console.log('[Auth] requireAuth called')

  const user = await getAuthenticatedUser()

  if (!user) {
    console.log('[Auth] requireAuth: No user found, throwing UNAUTHORIZED')
    throw new Error('UNAUTHORIZED')
  }

  console.log('[Auth] requireAuth: User authenticated', { userId: user.id })
  return user
}

export async function createSupabaseClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          // Not used in API routes typically
        },
      },
    }
  )
}
