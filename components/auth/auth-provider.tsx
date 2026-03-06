"use client"

import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from "react"
import type { User, Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"
import type { AppUser } from "@/lib/types"
import { logger } from "@/lib/logger"

const authLogger = logger.withContext('AuthProvider')

interface AuthContextType {
  user: AppUser | null
  session: Session | null
  isLoggedIn: boolean
  loading: boolean
  login: (popup?: Window | null) => Promise<void>
  logout: () => Promise<void>
  setLanguage: (language: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

// Database query timeout (for loadUser)
const DB_QUERY_TIMEOUT = 5000

// Popup login retry configuration
const POPUP_LOGIN_RETRY_ATTEMPTS = 5
const POPUP_LOGIN_RETRY_DELAYS_MS = [200, 400, 800, 1600, 3200]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  // Track current user ID to detect login changes
  const currentUserIdRef = useRef<string | null>(null)
  // Polling state
  const pollingRef = useRef<NodeJS.Timeout | null>(null)

  const collectSupabaseCookieNames = useCallback(() => {
    if (typeof document === 'undefined' || !document.cookie) return [] as string[]
    return document.cookie
      .split(';')
      .map((cookie) => cookie.trim().split('=')[0])
      .filter((name) => name.startsWith('sb-'))
  }, [])

  useEffect(() => {
    let mounted = true

    const loadUser = async (authUser: User) => {
      const startTime = Date.now()
      authLogger.debug('loadUser started', {
        userId: authUser.id,
        email: authUser.email,
        hasMetadata: !!authUser.user_metadata,
      })

      // Prevent duplicate calls for the same user
      if (currentUserIdRef.current === authUser.id && user) {
        authLogger.debug('loadUser: user already loaded, skipping', { userId: authUser.id })
        setLoading(false)
        return
      }

      // Create fallback user data (used on timeout or error)
      const fallbackUser: AppUser = {
        id: authUser.id,
        email: authUser.email!,
        name: authUser.user_metadata.full_name || authUser.email?.split('@')[0] || '',
        avatar: authUser.user_metadata.avatar_url || '',
        language: 'en' as const,
      }

      try {
        // Database query with timeout
        authLogger.debug('Querying users table...')
        const dbQueryPromise = supabase
          .from('users')
          .select('*')
          .eq('id', authUser.id)
          .maybeSingle()

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('DB_QUERY_TIMEOUT')), DB_QUERY_TIMEOUT)
        )

        const { data: userData, error } = await Promise.race([dbQueryPromise, timeoutPromise])

        if (error) {
          authLogger.error('Error loading user from database', {
            error: error.message,
            code: error.code,
          })
        } else {
          authLogger.debug('Users table query result', {
            found: !!userData,
            userId: userData?.id,
          })
        }

        if (!mounted) {
          authLogger.debug('Component unmounted, aborting loadUser')
          return
        }

        if (userData) {
          authLogger.info('User loaded from database', {
            userId: userData.id,
            email: userData.email,
            language: userData.language,
            elapsedMs: Date.now() - startTime,
          })
          setUser(userData as AppUser)
        } else {
          // User not found in database, use fallback and create record
          authLogger.info('User not found in database, using fallback', {
            userId: authUser.id,
          })
          setUser(fallbackUser)

          // Create user record in database (non-blocking)
          const { upsertUser } = await import("@/lib/supabase/user")
          const { error: upsertError } = await upsertUser(fallbackUser)
          if (upsertError) {
            authLogger.error('Failed to create user record', {
              error: upsertError.message,
              code: upsertError.code,
            })
          } else {
            authLogger.info('User record created in database', { userId: fallbackUser.id })
          }
        }
      } catch (error) {
        const elapsed = Date.now() - startTime
        const isTimeout = error instanceof Error && error.message === 'DB_QUERY_TIMEOUT'

        if (isTimeout) {
          authLogger.warn('Database query timed out, using fallback user', {
            elapsedMs: elapsed,
            timeoutMs: DB_QUERY_TIMEOUT,
          })
        } else {
          authLogger.error('Error in loadUser', {
            error: error instanceof Error ? error.message : String(error),
            elapsedMs: elapsed,
          })
        }

        if (!mounted) return

        // Use fallback user data
        authLogger.info('Using fallback user data from auth', { userId: fallbackUser.id })
        setUser(fallbackUser)
      } finally {
        setLoading(false)
        authLogger.debug('loadUser completed', {
          elapsedMs: Date.now() - startTime,
        })
      }
    }

    // Get initial session quickly from local storage (no server call)
    const getInitialSession = async () => {
      const startTime = Date.now()
      authLogger.info('getInitialSession started', {
        href: typeof window !== 'undefined' ? window.location.href : 'SSR',
        pathname: typeof window !== 'undefined' ? window.location.pathname : 'SSR',
      })

      const currentOrigin = window.location.origin
      const configuredAppUrl = process.env.NEXT_PUBLIC_APP_URL
      const configuredAppOrigin = configuredAppUrl ? (() => {
        try {
          return new URL(configuredAppUrl).origin
        } catch {
          return 'INVALID_URL'
        }
      })() : 'NOT_SET'
      authLogger.info('Auth init diagnostics', {
        currentOrigin,
        configuredAppOrigin,
        originsMatch: currentOrigin === configuredAppOrigin,
        supabaseCookies: collectSupabaseCookieNames(),
      })

      try {
        // Use getSession() for fast local session check (no server validation)
        // onAuthStateChange will handle the actual auth state
        const { data: { session }, error } = await supabase.auth.getSession()

        const elapsed = Date.now() - startTime
        authLogger.info('getSession result', {
          hasSession: !!session,
          userId: session?.user?.id,
          error: error?.message,
          elapsedMs: elapsed,
        })

        if (!mounted) {
          authLogger.debug('Component unmounted, aborting getInitialSession')
          return
        }

        if (session?.user) {
          currentUserIdRef.current = session.user.id
          setSession(session)
          await loadUser(session.user)
          authLogger.info('getInitialSession completed with user', {
            userId: session.user.id,
            totalElapsedMs: Date.now() - startTime,
          })
        } else {
          authLogger.info('getInitialSession completed without user (not logged in)', {
            totalElapsedMs: Date.now() - startTime,
          })
          setLoading(false)
        }
      } catch (error) {
        const elapsed = Date.now() - startTime
        authLogger.error('Error getting session during init', {
          error: error instanceof Error ? error.message : String(error),
          elapsedMs: elapsed,
        })
        if (mounted) {
          setLoading(false)
        }
      }
    }

    getInitialSession()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      authLogger.info('Auth state changed', {
        event,
        hasSession: !!session,
        userId: session?.user?.id,
        userEmail: session?.user?.email,
        accessTokenPresent: !!session?.access_token,
        expiresAt: session?.expires_at,
      })

      if (!mounted) {
        authLogger.debug('Component unmounted, ignoring auth state change')
        return
      }

      setSession(session)

      if (session?.user) {
        // Only process if this is a new user (login) or initial check not complete
        if (currentUserIdRef.current !== session.user.id) {
          currentUserIdRef.current = session.user.id
          await loadUser(session.user)
        } else {
          authLogger.debug('Same user already set, skipping loadUser')
          setLoading(false)
        }
      } else {
        authLogger.info('No session in auth state change, clearing user')
        currentUserIdRef.current = null
        setUser(null)
        setLoading(false)
      }
    })

    // Stop polling function
    const stopPolling = () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current)
        pollingRef.current = null
        authLogger.debug('Stopped auth state polling')
      }
    }

    // Start polling function - checks if user has logged in via popup
    const startPolling = () => {
      if (pollingRef.current) return
      authLogger.debug('Starting auth state polling...')
      let pollCount = 0
      const MAX_POLLS = 60 // Poll for up to 60 seconds

      pollingRef.current = setInterval(async () => {
        pollCount++
        if (pollCount > MAX_POLLS) {
          stopPolling()
          return
        }
        try {
          const { data: { user } } = await supabase.auth.getUser()
          // Detect login: user exists and is different from current user
          if (user && user.id !== currentUserIdRef.current) {
            authLogger.debug('Detected auth change via polling')
            stopPolling()
            currentUserIdRef.current = user.id
            const { data: { session } } = await supabase.auth.getSession()
            setSession(session)
            await loadUser(user)
          }
        } catch {
          // Ignore polling errors
        }
      }, 1000)
    }

    // Listen for popup auth success message
    const handlePopupMessage = async (event: MessageEvent) => {
      // Accept messages from the same origin or from NEXT_PUBLIC_APP_URL
      // Note: event.origin is never "*", that's only for targetOrigin in postMessage
      const appUrl = process.env.NEXT_PUBLIC_APP_URL
      const currentOrigin = window.location.origin

      // Build list of valid origins
      const validOrigins = [currentOrigin]
      if (appUrl) {
        try {
          const appOrigin = new URL(appUrl).origin
          if (appOrigin !== currentOrigin) {
            validOrigins.push(appOrigin)
          }
        } catch {
          // Invalid URL, ignore
        }
      }

      if (!validOrigins.includes(event.origin)) {
        authLogger.debug('Ignoring message from invalid origin', { origin: event.origin, expected: validOrigins })
        return
      }

      if (event.data?.type === 'GOOGLE_AUTH_SUCCESS') {
        authLogger.info('Received popup auth success message', {
          messageOrigin: event.origin,
          currentOrigin,
          configuredAppUrl: appUrl || 'NOT_SET',
          supabaseCookies: collectSupabaseCookieNames(),
        })
        stopPolling()

        // Retry loop: wait for cookies to sync and verify user
        let userFound = false
        for (let attempt = 1; attempt <= POPUP_LOGIN_RETRY_ATTEMPTS; attempt++) {
          const delay = POPUP_LOGIN_RETRY_DELAYS_MS[attempt - 1] ?? 1000

          authLogger.debug('Popup login verification attempt', {
            attempt,
            maxAttempts: POPUP_LOGIN_RETRY_ATTEMPTS,
            delayMs: delay,
            cookiesBeforeAttempt: collectSupabaseCookieNames(),
          })

          // Wait for cookies to sync (increasing delay for each attempt)
          await new Promise(resolve => setTimeout(resolve, delay))

          // Force refresh the session by calling getUser()
          // This will read the new cookies and validate with Supabase
          const { data: { user }, error } = await supabase.auth.getUser()

          authLogger.debug('getUser result after popup login', {
            attempt,
            hasUser: !!user,
            userId: user?.id,
            error: error?.message,
            cookiesAfterAttempt: collectSupabaseCookieNames(),
          })

          if (error) {
            authLogger.warn('Error getting user after popup login', {
              attempt,
              error: error.message,
            })
          }

          if (user) {
            authLogger.info('User found after popup login', {
              attempt,
              userId: user.id,
              totalDelayMs: POPUP_LOGIN_RETRY_DELAYS_MS.slice(0, attempt).reduce((a, b) => a + b, 0),
            })
            userFound = true
            currentUserIdRef.current = user.id
            const { data: { session } } = await supabase.auth.getSession()
            setSession(session)
            await loadUser(user)
            break
          }
        }

        if (!userFound) {
          authLogger.error('Popup login failed: no user found after all retries', {
            attempts: POPUP_LOGIN_RETRY_ATTEMPTS,
            totalDelayMs: POPUP_LOGIN_RETRY_DELAYS_MS.reduce((a, b) => a + b, 0),
            finalCookies: collectSupabaseCookieNames(),
          })
          // Ensure loading state is cleared
          setLoading(false)
        }
      }
    }

    // Listen for when a login popup is opened
    const originalOpen = window.open
    window.open = (...args) => {
      const popup = originalOpen(...args)
      if (popup && args[1] === 'google-auth') {
        startPolling()
        // Stop polling when popup closes
        // Note: popup.closed may throw due to COOP when popup navigates to cross-origin
        const checkClosed = setInterval(() => {
          try {
            if (popup.closed) {
              clearInterval(checkClosed)
              stopPolling()
            }
          } catch {
            // Cross-Origin-Opener-Policy blocks access to popup.closed
            // This is expected when popup navigates to Google OAuth
            // Polling will continue until postMessage arrives or timeout
          }
        }, 500)
      }
      return popup
    }

    window.addEventListener('message', handlePopupMessage)

    return () => {
      mounted = false
      subscription.unsubscribe()
      window.removeEventListener('message', handlePopupMessage)
      stopPolling()
      window.open = originalOpen
    }
  }, [])

  const login = useCallback(async (popup?: Window | null) => {
    // Always use current page origin to avoid cross-domain cookie issues
    // when production traffic can arrive from multiple hostnames.
    const redirectOrigin = window.location.origin
    const configuredAppUrl = process.env.NEXT_PUBLIC_APP_URL
    const configuredAppOrigin = configuredAppUrl ? (() => {
      try {
        return new URL(configuredAppUrl).origin
      } catch {
        return 'INVALID_URL'
      }
    })() : 'NOT_SET'

    authLogger.info('Starting Google OAuth login', {
      currentOrigin: redirectOrigin,
      configuredAppOrigin,
      redirectTo: `${redirectOrigin}/auth/callback?popup=true`,
      supabaseCookies: collectSupabaseCookieNames(),
    })

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        skipBrowserRedirect: true,
        redirectTo: `${redirectOrigin}/auth/callback?popup=true`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (error) {
      authLogger.error('Sign in error', error)
      // Close popup on error
      if (popup && !popup.closed) {
        popup.close()
      }
      throw error
    }

    if (data.url) {
      if (popup && !popup.closed) {
        // Use the pre-opened popup (Safari compatible)
        popup.location.href = data.url
      } else {
        // Fallback: open new popup (may be blocked by Safari)
        const width = 500
        const height = 600
        const left = window.screenX + (window.outerWidth - width) / 2
        const top = window.screenY + (window.outerHeight - height) / 2

        window.open(
          data.url,
          'google-auth',
          `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,resizable=yes,scrollbars=yes`
        )
      }
    }
  }, [collectSupabaseCookieNames])

  const logout = useCallback(async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      authLogger.error('Sign out error', error)
      throw error
    }
    setUser(null)
    setSession(null)
    currentUserIdRef.current = null
  }, [])

  const setLanguage = useCallback(async (language: string) => {
    if (!user) return

    const { error } = await supabase
      .from('users')
      .update({ language } as never)
      .eq('id', user.id)

    if (error) {
      authLogger.error('Language update error', error)
      throw error
    }

    setUser({ ...user, language: language as AppUser['language'] })
  }, [user])

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoggedIn: !!user,
        loading,
        login,
        logout,
        setLanguage,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
