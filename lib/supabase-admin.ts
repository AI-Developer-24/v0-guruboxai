import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from './supabase-types'
import { getEnv, isProduction } from './env'
import { logger } from './logger'

const supabaseLogger = logger.withContext('SupabaseAdmin')

// Server-only Supabase admin client (using service role key, bypasses RLS)
// This file should only be imported in server-side code

const supabaseUrl = getEnv('NEXT_PUBLIC_SUPABASE_URL')
const serviceRoleKey = getEnv('SUPABASE_SERVICE_ROLE_KEY')

// 生产环境警告：Service Role Key 可绕过 RLS
if (isProduction) {
  supabaseLogger.warn('Using service role key - this bypasses RLS policies')
}

export const supabaseAdmin: SupabaseClient<Database> = createClient<Database>(
  supabaseUrl,
  serviceRoleKey,
  {
    auth: {
      persistSession: false,
    },
  }
)

export type { Database }
export type { SupabaseClient } from '@supabase/supabase-js'
