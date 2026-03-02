import { createClient } from '@supabase/supabase-js'
import { Database } from './supabase-types'

// Client Supabase instance (for client components)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Server Supabase instance (using service role key, bypasses RLS)
export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      persistSession: false,
    },
  }
)

// Type exports
export type { Database }
export type { SupabaseClient } from '@supabase/supabase-js'
