import { supabase, supabaseAdmin } from '../supabase'
import type { Database } from '../supabase-types'

type User = Database['public']['Tables']['users']['Row']
type UserInsert = Database['public']['Tables']['users']['Insert']
type UserUpdate = Database['public']['Tables']['users']['Update']

export async function getUserById(id: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  return { user: data, error }
}

export async function getUserByEmail(email: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .maybeSingle()

  return { user: data, error }
}

export async function upsertUser(user: UserInsert) {
  // Use supabaseAdmin (service role) to bypass RLS for user creation
  const { data, error } = await supabaseAdmin
    .from('users')
    .upsert(user, {
      onConflict: 'id',
      ignoreDuplicates: false,
    })
    .select()
    .single()

  return { user: data, error }
}

export async function updateUser(id: string, updates: UserUpdate) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  return { user: data, error }
}
