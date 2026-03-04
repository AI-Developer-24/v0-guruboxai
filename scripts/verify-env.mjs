import dotenv from 'dotenv'
import { readFileSync } from 'fs'

dotenv.config({ path: '.env.local' })

const required = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
  'REDIS_URL',
]

const optional = [
  'OPENAI_API_KEY',
  'ANTHROPIC_API_KEY',
  'DASHSCOPE_API_KEY',
  'DASHSCOPE_BASE_URL',
  'DEFAULT_MODEL',
  'GOOGLE_DOCS_CREDENTIALS',
]

console.log('Checking required environment variables...\n')

let missing = false

for (const key of required) {
  if (!process.env[key]) {
    console.error(`❌ Missing: ${key}`)
    missing = true
  } else {
    console.log(`✓ ${key}`)
  }
}

console.log('\nChecking optional environment variables...\n')

for (const key of optional) {
  if (!process.env[key]) {
    console.log(`⚠️  Optional: ${key} (not set)`)
  } else {
    console.log(`✓ ${key}`)
  }
}

if (missing) {
  console.error('\n❌ Some required environment variables are missing!')
  process.exit(1)
}

console.log('\n✅ All required environment variables are set!')
