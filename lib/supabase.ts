import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from './supabase-types'

// Client Supabase instance (for client components)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.'
  )
}

export const supabase: SupabaseClient<Database> = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Server Supabase instance (using service role key, bypasses RLS)
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!serviceRoleKey) {
  throw new Error(
    'Missing Supabase service role key. Please set SUPABASE_SERVICE_ROLE_KEY in your .env.local file.'
  )
}

export const supabaseAdmin: SupabaseClient<Database> = createClient<Database>(
  supabaseUrl,
  serviceRoleKey,
  {
    auth: {
      persistSession: false,
    },
  }
)

// Type exports
export type { Database }
export type { SupabaseClient } from '@supabase/supabase-js'
