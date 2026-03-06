import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { unauthorizedResponse } from './response'
import { logger } from '../logger'

const authLogger = logger.withContext('Auth')

export async function getAuthenticatedUser() {
  authLogger.debug('getAuthenticatedUser called')

  const cookieStore = await cookies()
  const allCookies = cookieStore.getAll()

  authLogger.debug('All cookies', {
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

  authLogger.debug('Calling supabase.auth.getUser()')
  const { data: { user }, error } = await supabase.auth.getUser()

  authLogger.debug('getUser result', {
    hasUser: !!user,
    userId: user?.id,
    error: error ? {
      message: error.message,
      name: error.name,
    } : null,
  })

  if (error || !user) {
    authLogger.info('Authentication failed, returning null')
    return null
  }

  authLogger.info('Authentication successful', { userId: user.id })
  return user
}

export async function requireAuth() {
  authLogger.debug('requireAuth called')

  const user = await getAuthenticatedUser()

  if (!user) {
    authLogger.warn('requireAuth: No user found, throwing UNAUTHORIZED')
    throw new Error('UNAUTHORIZED')
  }

  authLogger.debug('requireAuth: User authenticated', { userId: user.id })
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
