import { supabase } from '../supabase'
import type { Database } from '../supabase-types'

type User = Database['public']['Tables']['users']['Row']
type UserInsert = Database['public']['Tables']['users']['Insert']
type UserUpdate = Database['public']['Tables']['users']['Update']

export async function getUserById(id: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()

  return { user: data, error }
}

export async function getUserByEmail(email: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  return { user: data, error }
}

export async function upsertUser(user: UserInsert) {
  const { data, error } = await supabase
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
