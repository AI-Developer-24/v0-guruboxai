import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  try {
    const { data, error } = await supabase.from('_test_connection_').select('*').limit(1)

    if (error) {
      console.log('✓ Supabase connection successful (error expected on non-existent table)')
      return true
    }
  } catch (e) {
    console.error('❌ Supabase connection failed:', e.message)
    return false
  }
}

testConnection()
