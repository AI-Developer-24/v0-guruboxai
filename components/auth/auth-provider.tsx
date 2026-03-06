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

const AUTH_INIT_ATTEMPTS = 3
const AUTH_INIT_TIMEOUT = 8000
const AUTH_INIT_RETRY_DELAYS_MS = [300, 800]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  // Track current user ID to detect login changes
  const currentUserIdRef = useRef<string | null>(null)
  // Polling state
  const pollingRef = useRef<NodeJS.Timeout | null>(null)
  // Track if initial auth check is complete
  const initialCheckCompleteRef = useRef(false)

  const collectSupabaseCookieNames = useCallback(() => {
    if (typeof document === 'undefined' || !document.cookie) return [] as string[]
    return document.cookie
      .split(';')
      .map((cookie) => cookie.trim().split('=')[0])
      .filter((name) => name.startsWith('sb-'))
  }, [])

  const sleep = useCallback(async (ms: number) => {
    await new Promise((resolve) => setTimeout(resolve, ms))
  }, [])

  const getVerifiedUserWithRetry = useCallback(async () => {
    for (let attempt = 1; attempt <= AUTH_INIT_ATTEMPTS; attempt++) {
      try {
        const result = await Promise.race([
          supabase.auth.getUser(),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error(`AUTH_GET_USER_TIMEOUT_${attempt}`)), AUTH_INIT_TIMEOUT)
          ),
        ])

        if (attempt > 1) {
          authLogger.info('Auth check recovered after retry', { attempt })
        }

        return result
      } catch (error) {
        authLogger.warn('Auth check attempt failed', {
          attempt,
          message: error instanceof Error ? error.message : String(error),
        })

        if (attempt < AUTH_INIT_ATTEMPTS) {
          const delay = AUTH_INIT_RETRY_DELAYS_MS[attempt - 1] ?? 1000
          await sleep(delay)
        } else {
          throw error
        }
      }
    }

    throw new Error('AUTH_GET_USER_UNREACHABLE')
  }, [sleep])

  useEffect(() => {
    let mounted = true

    const loadUser = async (authUser: User) => {
      try {
        const { data: userData, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', authUser.id)
          .maybeSingle()

        if (error) {
          authLogger.error('Error loading user from database', error)
        }

        if (!mounted) return

        if (userData) {
          setUser(userData as AppUser)
        } else {
          // User not found in database, create from auth user
          const newUser = {
            id: authUser.id,
            email: authUser.email!,
            name: authUser.user_metadata.full_name || authUser.email?.split('@')[0] || '',
            avatar: authUser.user_metadata.avatar_url || '',
            language: 'en' as const,
          }
          setUser(newUser as AppUser)

          // Create user record in database
          const { upsertUser } = await import("@/lib/supabase/user")
          const { error: upsertError } = await upsertUser(newUser)
          if (upsertError) {
            authLogger.error('Failed to create user record', upsertError)
          }
        }
      } catch (error) {
        authLogger.error('Error in loadUser', error)
        if (!mounted) return
        // Fallback: set user from auth data
        const fallbackUser = {
          id: authUser.id,
          email: authUser.email!,
          name: authUser.user_metadata.full_name || authUser.email?.split('@')[0] || '',
          avatar: authUser.user_metadata.avatar_url || '',
          language: 'en' as const,
        }
        setUser(fallbackUser as AppUser)
      } finally {
        setLoading(false)
      }
    }

    // Get initial session using getUser() for security
    const getInitialSession = async () => {
      authLogger.debug('Getting initial session...')
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
        supabaseCookies: collectSupabaseCookieNames(),
      })

      try {
        // Use getUser() instead of getSession() for verified auth
        const { data: { user }, error } = await getVerifiedUserWithRetry()

        authLogger.debug('getUser result', {
          hasUser: !!user,
          userId: user?.id,
          error: error?.message,
        })
        initialCheckCompleteRef.current = true

        if (!mounted) return

        if (user) {
          currentUserIdRef.current = user.id
          // Get session for token access
          const { data: { session } } = await supabase.auth.getSession()
          setSession(session)
          await loadUser(user)
        } else {
          setLoading(false)
        }
      } catch (error) {
        initialCheckCompleteRef.current = true
        authLogger.error('Error getting user', error)
        if (mounted) {
          setLoading(false)
        }
      }
    }

    getInitialSession()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      authLogger.debug('Auth state changed', {
        event,
        hasSession: !!session,
        userId: session?.user?.id,
      })

      if (!mounted) return

      setSession(session)

      if (session?.user) {
        currentUserIdRef.current = session.user.id
        await loadUser(session.user)
      } else {
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

        // Give browser a moment to process cookies set by the popup
        // This is crucial for production environments where cookie sync may be slower
        await new Promise(resolve => setTimeout(resolve, 100))

        // Force refresh the session by calling getUser()
        // This will read the new cookies and validate with Supabase
        authLogger.debug('Refreshing session after popup login...')
        const { data: { user }, error } = await supabase.auth.getUser()

        if (error) {
          authLogger.error('Error getting user after popup login', error)
        }

        if (user) {
          authLogger.debug('User found after popup login', { userId: user.id })
          currentUserIdRef.current = user.id
          const { data: { session } } = await supabase.auth.getSession()
          setSession(session)
          await loadUser(user)
        } else {
          authLogger.warn('No user found after popup login - cookies may not be synced')
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
        const checkClosed = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkClosed)
            stopPolling()
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
