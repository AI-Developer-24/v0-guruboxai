import { createBrowserClient } from '@supabase/ssr'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from './supabase-types'

// Client Supabase instance (for client components - using createBrowserClient for cookie-based auth)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.'
  )
}

export const createClientComponentClient = () => {
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
}

// Legacy export for backward compatibility - use createClientComponentClient() instead
// This is for client-side auth operations in the auth provider
let _browserClient: SupabaseClient<Database> | null = null

export const getBrowserClient = () => {
  if (!_browserClient) {
    _browserClient = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
  }
  return _browserClient
}

// For use in non-React contexts (e.g., API routes, server components)
// Use createServerClient from @supabase/ssr instead

// Server Supabase instance (using service role key, bypasses RLS)
// Lazy-loaded to avoid requiring service role key on client-side
let _supabaseAdmin: SupabaseClient<Database> | null = null

export function getSupabaseAdmin(): SupabaseClient<Database> {
  if (_supabaseAdmin) {
    return _supabaseAdmin
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!serviceRoleKey) {
    throw new Error(
      'Missing Supabase service role key. Please set SUPABASE_SERVICE_ROLE_KEY in your .env.local file.'
    )
  }

  _supabaseAdmin = createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
    },
  })

  return _supabaseAdmin
}

// Convenience export for backward compatibility (lazily initialized)
export const supabaseAdmin: SupabaseClient<Database> = new Proxy({} as SupabaseClient<Database>, {
  get(target, prop) {
    const admin = getSupabaseAdmin()
    const value = (admin as any)[prop]
    return typeof value === 'function' ? value.bind(admin) : value
  },
})

// Type exports
export type { Database }
export type { SupabaseClient } from '@supabase/supabase-js'
