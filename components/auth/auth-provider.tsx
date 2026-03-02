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
      const { data: { session } } = await supabase.auth.getSession()

      if (session) {
        await loadUser(session.user.id)
      }

      setSession(session)
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)

      if (session?.user) {
        await loadUser(session.user.id)
      } else {
        setUser(null)
      }

      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const loadUser = async (userId: string) => {
    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (userData) {
      setUser(userData as AppUser)
    } else {
      // Fallback to session user info
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const newUser: AppUser = {
          id: user.id,
          google_id: user.id,
          email: user.email!,
          name: user.user_metadata.full_name || user.email?.split('@')[0] || '',
          avatar: user.user_metadata.avatar_url || '',
          language: 'en',
        }
        setUser(newUser)

        // Create user record in database
        const { upsertUser } = await import("@/lib/supabase/user")
        await upsertUser(newUser)
      }
    }
  }

  const login = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
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
