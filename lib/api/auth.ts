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
        get(name: string) {
          const value = cookieStore.get(name)?.value
          console.log(`[Auth] Getting cookie ${name}:`, value ? 'found' : 'not found')
          return value
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
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          // Not used in API routes typically
        },
        remove(name: string, options: any) {
          // Not used in API routes typically
        },
      },
    }
  )
}
