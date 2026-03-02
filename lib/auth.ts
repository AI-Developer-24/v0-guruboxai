import { supabase } from './supabase'
import type { User } from './types'

/**
 * Sign in with Google OAuth
 */
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })

  return { data, error }
}

/**
 * Sign out current user
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

/**
 * Get current logged in user
 */
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  // Get extended user info from users table
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (userError) {
    // If extended user info doesn't exist, use Auth user info
    return {
      id: user.id,
      google_id: user.id,
      email: user.email!,
      name: user.user_metadata.full_name || user.email?.split('@')[0],
      avatar: user.user_metadata.avatar_url || '',
      language: 'en' as const,
    } as User
  }

  return userData as User
}

/**
 * Get current Session
 */
export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession()
  return { session, error }
}

/**
 * Update user language preference
 */
export async function updateUserLanguage(userId: string, language: string) {
  const { data, error } = await supabase
    .from('users')
    .update({ language })
    .eq('id', userId)
    .select()
    .single()

  return { user: data, error }
}

/**
 * Ensure/create user record in users table
 */
export async function ensureUserExists(userId: string, metadata: {
  email: string
  name?: string
  avatar?: string
}) {
  const { data, error } = await supabase
    .from('users')
    .upsert({
      id: userId,
      email: metadata.email,
      name: metadata.name,
      avatar: metadata.avatar,
    }, {
      onConflict: 'id',
      ignoreDuplicates: false,
    })
    .select()
    .single()

  return { user: data, error }
}
