"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import type { User, Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"
import type { AppUser } from "@/lib/types"

interface AuthContextType {
  user: AppUser | null
  session: Session | null
  isLoggedIn: boolean
  loading: boolean
  login: () => Promise<void>
  logout: () => Promise<void>
  setLanguage: (language: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      console.log('[AuthProvider] Getting initial session...')
      const { data: { session }, error } = await supabase.auth.getSession()

      console.log('[AuthProvider] Initial session result', {
        hasSession: !!session,
        userId: session?.user?.id,
        error: error?.message,
      })

      if (session) {
        await loadUser(session.user.id)
      }

      setSession(session)
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('[AuthProvider] Auth state changed', {
        event,
        hasSession: !!session,
        userId: session?.user?.id,
      })

      setSession(session)

      if (session?.user) {
        await loadUser(session.user.id)
      } else {
        setUser(null)
      }

      setLoading(false)
    })

    // Listen for popup auth success message
    const handlePopupMessage = async (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return
      if (event.data?.type === 'GOOGLE_AUTH_SUCCESS') {
        console.log('[AuthProvider] Received popup auth success message')
        // Refresh session to get the new auth state
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          setSession(session)
          await loadUser(session.user.id)
        }
      }
    }

    window.addEventListener('message', handlePopupMessage)

    return () => {
      subscription.unsubscribe()
      window.removeEventListener('message', handlePopupMessage)
    }
  }, [])

  const loadUser = async (userId: string) => {
    const { data: userData, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .maybeSingle()

    if (userData) {
      setUser(userData as AppUser)
    } else {
      // User not found in database, create from auth session
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const newUser = {
          id: user.id,
          email: user.email!,
          name: user.user_metadata.full_name || user.email?.split('@')[0] || '',
          avatar: user.user_metadata.avatar_url || '',
          language: 'en' as const,
        }
        setUser(newUser as AppUser)

        // Create user record in database
        const { upsertUser } = await import("@/lib/supabase/user")
        const { error: upsertError } = await upsertUser(newUser)
        if (upsertError) {
          console.error('Failed to create user record:', upsertError)
        }
      }
    }
  }

  const login = useCallback(async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        skipBrowserRedirect: true,
        redirectTo: `${window.location.origin}/auth/callback?popup=true`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (error) {
      console.error('Sign in error:', error)
      throw error
    }

    if (data.url) {
      // Open OAuth in a popup window
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
  }, [])

  const logout = useCallback(async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Sign out error:', error)
      throw error
    }
    setUser(null)
    setSession(null)
  }, [])

  const setLanguage = useCallback(async (language: string) => {
    if (!user) return

    const { error } = await supabase
      .from('users')
      .update({ language })
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
