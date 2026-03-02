import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { unauthorizedResponse } from './response'

export async function getAuthenticatedUser() {
  const cookieStore = await cookies()

  // Debug: Log available cookies
  const allCookies = cookieStore.getAll()
  console.log('[AUTH DEBUG] Available cookies:', allCookies.map(c => ({ name: c.name, hasValue: !!c.value })))

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )

  const { data: { user }, error } = await supabase.auth.getUser()

  console.log('[AUTH DEBUG] getUser result:', { userId: user?.id, error: error?.message || 'none' })

  if (error || !user) {
    return null
  }

  return user
}

export async function requireAuth() {
  const user = await getAuthenticatedUser()

  if (!user) {
    throw new Error('UNAUTHORIZED')
  }

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
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
