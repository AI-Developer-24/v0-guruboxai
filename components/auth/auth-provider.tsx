"use client"

import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from "react"
import type { User, Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"
import type { AppUser } from "@/lib/types"

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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  // Track current user ID to detect login changes
  const currentUserIdRef = useRef<string | null>(null)
  // Polling state
  const pollingRef = useRef<NodeJS.Timeout | null>(null)

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
          console.error('[AuthProvider] Error loading user from database:', error)
        }

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
            console.error('[AuthProvider] Failed to create user record:', upsertError)
          }
        }
      } catch (error) {
        console.error('[AuthProvider] Error in loadUser:', error)
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
      console.log('[AuthProvider] Getting initial session...')

      try {
        // Use getUser() instead of getSession() for verified auth
        const { data: { user }, error } = await supabase.auth.getUser()

        console.log('[AuthProvider] getUser result', {
          hasUser: !!user,
          userId: user?.id,
          error: error?.message,
        })

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
        console.error('[AuthProvider] Error getting user:', error)
        if (mounted) {
          setLoading(false)
        }
      }
    }

    getInitialSession()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('[AuthProvider] Auth state changed', {
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
        console.log('[AuthProvider] Stopped auth state polling')
      }
    }

    // Start polling function - checks if user has logged in via popup
    const startPolling = () => {
      if (pollingRef.current) return
      console.log('[AuthProvider] Starting auth state polling...')
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
            console.log('[AuthProvider] Detected auth change via polling')
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
      const appUrl = process.env.NEXT_PUBLIC_APP_URL
      const isValidOrigin =
        event.origin === window.location.origin ||
        event.origin === "*" ||
        (appUrl && event.origin === new URL(appUrl).origin)

      if (!isValidOrigin) return

      if (event.data?.type === 'GOOGLE_AUTH_SUCCESS') {
        console.log('[AuthProvider] Received popup auth success message from:', event.origin)
        stopPolling()
        // Refresh session to get the new auth state
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          currentUserIdRef.current = user.id
          const { data: { session } } = await supabase.auth.getSession()
          setSession(session)
          await loadUser(user)
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
    // Use NEXT_PUBLIC_APP_URL for consistent OAuth callback across environments
    // This ensures cookies are set on the correct domain in production
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        skipBrowserRedirect: true,
        redirectTo: `${appUrl}/auth/callback?popup=true`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (error) {
      console.error('Sign in error:', error)
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
  }, [])

  const logout = useCallback(async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Sign out error:', error)
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
      console.error('Language update error:', error)
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
