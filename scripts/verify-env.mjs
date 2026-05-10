import dotenv from 'dotenv'
import { existsSync } from 'fs'

const args = process.argv.slice(2)
const requestedEnvFile = args.find((arg) => arg.startsWith('--env-file='))?.split('=')[1]
const envFile = requestedEnvFile ?? '.env.local'

if (existsSync(envFile)) {
  dotenv.config({ path: envFile })
} else {
  dotenv.config()
}

const enforceProduction =
  args.includes('--production') ||
  process.env.NODE_ENV === 'production' ||
  process.env.VERCEL_ENV === 'production' ||
  process.env.APP_ENV === 'production' ||
  process.env.DEPLOYMENT_ENV === 'production'

const required = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
  'REDIS_URL',
]

const optional = [
  'NEXT_PUBLIC_APP_URL',
  'OPENAI_API_KEY',
  'ANTHROPIC_API_KEY',
  'DASHSCOPE_API_KEY',
  'DASHSCOPE_BASE_URL',
  'DEFAULT_MODEL',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'GOOGLE_DOCS_CREDENTIALS',
]

const errors = []
const warnings = []

function normalizeAbsoluteUrl(rawValue) {
  if (!rawValue?.trim()) {
    return null
  }

  try {
    return new URL(rawValue)
  } catch {
    return null
  }
}

function isLocalHostname(hostname) {
  return (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '0.0.0.0' ||
    hostname === '::1'
  )
}

console.log('Checking required environment variables...\n')

for (const key of required) {
  if (!process.env[key]) {
    errors.push(`Missing required environment variable: ${key}`)
    console.error(`❌ Missing: ${key}`)
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

const hasAIProvider =
  process.env.OPENAI_API_KEY ||
  process.env.ANTHROPIC_API_KEY ||
  process.env.DASHSCOPE_API_KEY

if (!hasAIProvider) {
  errors.push(
    'At least one AI provider API key is required (OPENAI_API_KEY, ANTHROPIC_API_KEY, or DASHSCOPE_API_KEY)'
  )
}

const nextauthUrl = process.env.NEXTAUTH_URL
const appUrl = process.env.NEXT_PUBLIC_APP_URL
const redisUrl = process.env.REDIS_URL

const normalizedNextauthUrl = normalizeAbsoluteUrl(nextauthUrl)
const normalizedAppUrl = normalizeAbsoluteUrl(appUrl)
const normalizedRedisUrl = normalizeAbsoluteUrl(redisUrl)

if (nextauthUrl && !normalizedNextauthUrl) {
  errors.push('NEXTAUTH_URL must be a valid absolute URL')
}

if (appUrl && !normalizedAppUrl) {
  errors.push('NEXT_PUBLIC_APP_URL must be a valid absolute URL')
}

if (redisUrl && !normalizedRedisUrl) {
  errors.push('REDIS_URL must be a valid absolute URL')
}

if (!appUrl) {
  warnings.push('NEXT_PUBLIC_APP_URL is not set. Development fallbacks may work locally, but production must set it explicitly.')
}

if (enforceProduction) {
  console.log('\nRunning additional production checks...\n')

  if (!normalizedNextauthUrl) {
    errors.push('Production NEXTAUTH_URL must be a valid absolute HTTPS URL')
  }

  if (!normalizedAppUrl) {
    errors.push('Production NEXT_PUBLIC_APP_URL must be a valid absolute HTTPS URL')
  }

  if (normalizedNextauthUrl && normalizedNextauthUrl.protocol !== 'https:') {
    errors.push('Production NEXTAUTH_URL must use HTTPS')
  }

  if (normalizedAppUrl && normalizedAppUrl.protocol !== 'https:') {
    errors.push('Production NEXT_PUBLIC_APP_URL must use HTTPS')
  }

  if (normalizedRedisUrl && normalizedRedisUrl.protocol !== 'rediss:') {
    errors.push('Production REDIS_URL must use TLS (rediss://)')
  }

  if (normalizedNextauthUrl && isLocalHostname(normalizedNextauthUrl.hostname)) {
    errors.push('Production NEXTAUTH_URL cannot point to localhost')
  }

  if (normalizedAppUrl && isLocalHostname(normalizedAppUrl.hostname)) {
    errors.push('Production NEXT_PUBLIC_APP_URL cannot point to localhost')
  }

  if (
    normalizedNextauthUrl &&
    normalizedAppUrl &&
    normalizedNextauthUrl.origin !== normalizedAppUrl.origin
  ) {
    errors.push(
      `NEXTAUTH_URL (${normalizedNextauthUrl.origin}) and NEXT_PUBLIC_APP_URL (${normalizedAppUrl.origin}) must share the same origin in production`
    )
  }
}

if (warnings.length > 0) {
  console.log('\nWarnings:\n')
  for (const warning of warnings) {
    console.log(`⚠️  ${warning}`)
  }
}

if (errors.length > 0) {
  console.error('\n❌ Environment verification failed:\n')
  for (const error of errors) {
    console.error(`- ${error}`)
  }
  process.exit(1)
}

console.log('\n✅ Environment verification passed!')
console.log(`Mode: ${enforceProduction ? 'production checks enabled' : 'development/local checks only'}`)
console.log(`Env source: ${existsSync(envFile) ? envFile : 'process environment only'}`)
