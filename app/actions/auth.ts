'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { User } from '@/lib/types'

export async function getServerUser(): Promise<User | null> {
  const cookieStore = await cookies()

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

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (userData) {
    return userData as User
  }

  // Return basic user info
  return {
    id: user.id,
    google_id: user.id,
    email: user.email!,
    name: user.user_metadata.full_name || user.email?.split('@')[0],
    avatar: user.user_metadata.avatar_url || '',
    language: 'en',
  }
}

export async function requireAuth(): Promise<User> {
  const user = await getServerUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  return user
}
