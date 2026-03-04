import { readFileSync } from 'fs'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Read migration SQL
const migrationSQL = readFileSync('./supabase/migrations/001_initial_schema.sql', 'utf-8')

async function runMigration() {
  console.log('🚀 Running database migration...\n')

  // Split SQL by semicolon and execute each statement
  const statements = migrationSQL
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'))

  let successCount = 0
  let errorCount = 0

  for (const statement of statements) {
    try {
      const { data, error } = await supabase.rpc('exec_sql', { sql_query: statement })

      if (error) {
        // Some errors are expected (e.g., "already exists")
        if (error.message.includes('already exists')) {
          console.log(`⊙ Skipped (already exists): ${statement.substring(0, 50)}...`)
        } else {
          console.error(`❌ Error: ${error.message}`)
          errorCount++
        }
      } else {
        successCount++
        console.log(`✓ Executed: ${statement.substring(0, 50)}...`)
      }
    } catch (e) {
      console.error(`❌ Exception: ${e.message}`)
      errorCount++
    }
  }

  console.log(`\n✅ Migration complete: ${successCount} statements executed, ${errorCount} errors/skips`)
}

// Note: Direct SQL execution via RPC requires a custom function
// For now, we'll provide manual instructions
console.log(`
⚠️  Note: Supabase doesn't support direct SQL execution via client SDK.

📋 Manual Migration Steps:

1. Go to Supabase Dashboard: https://supabase.com/dashboard/project/podazxkwulxkudwitocz
2. Navigate to: SQL Editor → New Query
3. Copy the content of: supabase/migrations/001_initial_schema.sql
4. Paste and click "Run"

Alternatively, you can execute each statement via psql:

psql -h db.podazxkwulxkudwitocz.supabase.co \\
     -U postgres \\
     -d postgres \\
     -f supabase/migrations/001_initial_schema.sql
`)
