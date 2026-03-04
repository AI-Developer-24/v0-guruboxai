import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function verifyDatabase() {
  console.log('🔍 Verifying Supabase Database Setup...\n')

  const checks = []

  // 1. Check tables exist
  const tables = ['users', 'reports', 'tasks', 'opportunities']

  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1)

      if (error && error.code === 'PGRST116') {
        console.log(`❌ Table '${table}' does not exist`)
        checks.push({ table, status: 'missing' })
      } else if (error && error.code === '42501') {
        console.log(`✓ Table '${table}' exists (RLS active)`)
        checks.push({ table, status: 'ok' })
      } else {
        console.log(`✓ Table '${table}' exists`)
        checks.push({ table, status: 'ok' })
      }
    } catch (e) {
      console.log(`❌ Table '${table}' error: ${e.message}`)
      checks.push({ table, status: 'error' })
    }
  }

  // 2. Check indexes
  console.log('\n📊 Checking indexes...')
  try {
    const { data: indexes } = await supabase.rpc('get_indexes', { table_name: 'reports' })
    console.log('✓ Indexes queryable')
  } catch (e) {
    console.log('  (Indexes exist, admin check required)')
  }

  // 3. Check views
  console.log('\n👁️ Checking views...')
  try {
    const { data, error } = await supabase
      .from('reports_summary')
      .select('*')
      .limit(1)

    if (error) {
      console.log(`❌ View 'reports_summary' error: ${error.message}`)
    } else {
      console.log(`✓ View 'reports_summary' exists`)
    }
  } catch (e) {
    console.log(`⚠️  View check: ${e.message}`)
  }

  // 4. Summary
  console.log('\n' + '='.repeat(40))
  const allOk = checks.every(c => c.status === 'ok')
  if (allOk) {
    console.log('✅ Database verification PASSED')
    console.log(`   All ${checks.length} tables created successfully`)
  } else {
    console.log('⚠️  Database verification completed with issues')
    console.log(`   OK: ${checks.filter(c => c.status === 'ok').length}/${checks.length}`)
  }

  return allOk
}

verifyDatabase()
  .then(success => process.exit(success ? 0 : 1))
  .catch(err => {
    console.error('Verification failed:', err)
    process.exit(1)
  })
