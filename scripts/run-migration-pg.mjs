import { readFileSync } from 'fs'
import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

// Extract project ref from URL
const match = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)
if (!match) {
  console.error('❌ Invalid Supabase URL format')
  process.exit(1)
}

const projectRef = match[1]

// Supabase PostgreSQL connection string
// Format: postgresql://postgres:[PASSWORD]@[HOST]/postgres
// We need to get the database password from Supabase Dashboard or convert service role key

// For now, let's use the connection string format that Supabase uses
const connectionString = `postgresql://postgres.${projectRef}:${supabaseKey}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`

const pool = new Pool({ connectionString })

// Read migration SQL
const migrationSQL = readFileSync('./supabase/migrations/001_initial_schema.sql', 'utf-8')

async function runMigration() {
  console.log('🚀 Running database migration...\n')
  console.log(`Connecting to: ${projectRef}\n`)

  const client = await pool.connect()

  try {
    // Split SQL by semicolon, filter out empty and comments
    const statements = migrationSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => {
        const lines = s.split('\n').filter(l => !l.trim().startsWith('--'))
        const cleaned = lines.join('\n').trim()
        return cleaned.length > 0
      })

    let successCount = 0
    let skipCount = 0

    for (const statement of statements) {
      const preview = statement.split('\n')[0].substring(0, 60)
      try {
        await client.query(statement)
        successCount++
        console.log(`✓ ${preview}...`)
      } catch (error) {
        const msg = error.message.toLowerCase()
        if (msg.includes('already exists') || msg.includes('duplicate')) {
          skipCount++
          console.log(`⊙ Skipped (already exists): ${preview}...`)
        } else {
          console.error(`❌ Error: ${preview}...`)
          console.error(`   ${error.message}`)
        }
      }
    }

    console.log(`\n✅ Migration complete!`)
    console.log(`   Executed: ${successCount} statements`)
    console.log(`   Skipped: ${skipCount} statements`)

  } finally {
    client.release()
    await pool.end()
  }
}

runMigration().catch(err => {
  console.error('\n❌ Migration failed:', err.message)
  console.log('\n📋 Alternative: Run the SQL manually in Supabase Dashboard:')
  console.log('   1. Go to: https://supabase.com/dashboard/project/podazxkwulxkudwitocz/sql')
  console.log('   2. Copy content from: supabase/migrations/001_initial_schema.sql')
  console.log('   3. Paste and click "Run"\n')
  process.exit(1)
})
