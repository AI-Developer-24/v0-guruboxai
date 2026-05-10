import { createBrowserClient } from '@supabase/ssr'
import { Database } from './supabase-types'

// Client Supabase instance (for client components)
// NOTE: Must use process.env.NEXT_PUBLIC_* directly for client-side code
// Next.js inlines these values at build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseProjectRef = new URL(supabaseUrl).hostname.split('.')[0]

export const SUPABASE_AUTH_STORAGE_KEY = `sb-${supabaseProjectRef}-auth-token`
export const SUPABASE_AUTH_COOKIE_PREFIX = `sb-${supabaseProjectRef}-`

function readCurrentProjectSupabaseCookies() {
  const cookies: { name: string; value: string }[] = []

  if (typeof document === 'undefined' || !document.cookie) {
    return cookies
  }

  document.cookie.split(';').forEach((cookie) => {
    const [name, ...valueParts] = cookie.trim().split('=')
    if (name && name.startsWith(SUPABASE_AUTH_COOKIE_PREFIX)) {
      cookies.push({ name, value: valueParts.join('=') })
    }
  })

  return cookies
}

export function getSupabaseBrowserCookieNames(): string[] {
  if (typeof document === 'undefined') return []
  return readCurrentProjectSupabaseCookies().map((cookie) => cookie.name)
}

export function clearSupabaseBrowserAuthState() {
  if (typeof window === 'undefined') return

  const storageKeys = [
    SUPABASE_AUTH_STORAGE_KEY,
    `${SUPABASE_AUTH_STORAGE_KEY}-code-verifier`,
    `${SUPABASE_AUTH_STORAGE_KEY}-user`,
  ]

  for (const key of storageKeys) {
    window.localStorage.removeItem(key)
    window.sessionStorage.removeItem(key)
  }

  const cookieNames = getSupabaseBrowserCookieNames()
  for (const name of cookieNames) {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
  }
}

// Use createBrowserClient from @supabase/ssr for proper cookie-based auth
// IMPORTANT: cookies handlers are required for SSR to work correctly
// This allows the browser client to read cookies set by the server
export const supabase = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storageKey: SUPABASE_AUTH_STORAGE_KEY,
  },
  cookies: {
    getAll() {
      // Only expose auth cookies for the current Supabase project.
      // This prevents stale localhost cookies from other repos/projects
      // from being interpreted as the active session.
      return readCurrentProjectSupabaseCookies()
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
