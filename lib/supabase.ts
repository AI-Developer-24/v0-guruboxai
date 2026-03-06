import { createBrowserClient } from '@supabase/ssr'
import { Database } from './supabase-types'

// Client Supabase instance (for client components)
// NOTE: Must use process.env.NEXT_PUBLIC_* directly for client-side code
// Next.js inlines these values at build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Use createBrowserClient from @supabase/ssr for proper cookie-based auth
export const supabase = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})

// NOTE: supabaseAdmin is NOT re-exported here to avoid bundling server-only code
// in client bundles. Import directly from '@/lib/supabase-admin' in server code.

// Type exports
export type { Database }
export type { SupabaseClient } from '@supabase/supabase-js'
