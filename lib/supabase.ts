import { createBrowserClient } from '@supabase/ssr'
import { Database } from './supabase-types'

// Client Supabase instance (for client components)
// NOTE: Must use process.env.NEXT_PUBLIC_* directly for client-side code
// Next.js inlines these values at build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Use createBrowserClient from @supabase/ssr for proper cookie-based auth
// IMPORTANT: cookies handlers are required for SSR to work correctly
// This allows the browser client to read cookies set by the server
export const supabase = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey, {
  cookies: {
    getAll() {
      // Read all cookies from document.cookie
      // This is necessary for the browser client to access server-set session cookies
      const cookies: { name: string; value: string }[] = []
      if (typeof document !== 'undefined' && document.cookie) {
        document.cookie.split(';').forEach((cookie) => {
          const [name, ...valueParts] = cookie.trim().split('=')
          if (name) {
            cookies.push({ name, value: valueParts.join('=') })
          }
        })
      }
      return cookies
    },
    setAll(cookiesToSet) {
      // When Supabase needs to set cookies (e.g., session refresh)
      // This ensures cookies are properly updated in the browser
      if (typeof document !== 'undefined') {
        cookiesToSet.forEach(({ name, value, options }) => {
          let cookieString = `${name}=${value}`
          if (options?.path) cookieString += `; path=${options.path}`
          if (options?.domain) cookieString += `; domain=${options.domain}`
          if (options?.maxAge) cookieString += `; max-age=${options.maxAge}`
          if (options?.httpOnly) cookieString += '; HttpOnly'
          if (options?.secure) cookieString += '; Secure'
          if (options?.sameSite) cookieString += `; SameSite=${options.sameSite}`
          document.cookie = cookieString
        })
      }
    },
  },
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
