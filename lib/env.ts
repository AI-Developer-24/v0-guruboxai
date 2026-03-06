/**
 * 环境变量验证和安全检查模块
 *
 * 功能：
 * - 启动时验证必需环境变量
 * - 区分公开变量（NEXT_PUBLIC_*）和敏感变量
 * - 检查敏感变量是否意外暴露到客户端
 * - 生产环境强制安全配置检查
 */

// 必需的环境变量
const REQUIRED_VARS = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
  'REDIS_URL',
] as const

// 敏感的环境变量（绝不能暴露到客户端）
const SENSITIVE_VARS = [
  'SUPABASE_SERVICE_ROLE_KEY',
  'NEXTAUTH_SECRET',
  'OPENAI_API_KEY',
  'ANTHROPIC_API_KEY',
  'DASHSCOPE_API_KEY',
  'GOOGLE_CLIENT_SECRET',
  'GOOGLE_DOCS_CREDENTIALS',
] as const

// 公开变量（可以暴露到客户端）
const PUBLIC_VARS = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_APP_URL',
] as const

export type RequiredVar = (typeof REQUIRED_VARS)[number]
export type SensitiveVar = (typeof SENSITIVE_VARS)[number]
export type PublicVar = (typeof PUBLIC_VARS)[number]

/**
 * 判断是否为生产环境
 */
export const isProduction = process.env.NODE_ENV === 'production'

/**
 * 判断是否为开发环境
 */
export const isDevelopment = process.env.NODE_ENV === 'development'

/**
 * 安全获取环境变量
 * @param key - 环境变量名
 * @param defaultValue - 默认值（可选）
 * @returns 环境变量值
 * @throws 如果变量不存在且没有默认值
 */
export function getEnv(key: RequiredVar): string
export function getEnv(key: string, defaultValue?: string): string | undefined
export function getEnv(key: string, defaultValue?: string): string | undefined {
  const value = process.env[key]
  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue
    }
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value
}

/**
 * 验证结果
 */
export interface ValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
}

/**
 * 验证必需环境变量
 * 在应用启动时调用
 */
export function validateEnv(): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // 检查必需变量
  for (const varName of REQUIRED_VARS) {
    if (!process.env[varName]) {
      errors.push(`Missing required environment variable: ${varName}`)
    }
  }

  // 生产环境额外检查
  if (isProduction) {
    // 检查 Redis URL 是否使用 TLS
    const redisUrl = process.env.REDIS_URL
    if (redisUrl && !redisUrl.startsWith('rediss://')) {
      errors.push('Production REDIS_URL must use TLS (rediss://)')
    }

    // 检查 NEXTAUTH_URL 是否使用 HTTPS
    const nextauthUrl = process.env.NEXTAUTH_URL
    if (nextauthUrl && !nextauthUrl.startsWith('https://')) {
      errors.push('Production NEXTAUTH_URL must use HTTPS')
    }

    // 检查 NEXT_PUBLIC_APP_URL 是否使用 HTTPS
    const appUrl = process.env.NEXT_PUBLIC_APP_URL
    if (appUrl && !appUrl.startsWith('https://')) {
      warnings.push('Production NEXT_PUBLIC_APP_URL should use HTTPS')
    }
  }

  // 检查是否至少配置了一个 AI 提供商
  const hasAIProvider =
    process.env.OPENAI_API_KEY ||
    process.env.ANTHROPIC_API_KEY ||
    process.env.DASHSCOPE_API_KEY

  if (!hasAIProvider) {
    errors.push('At least one AI provider API key is required (OPENAI_API_KEY, ANTHROPIC_API_KEY, or DASHSCOPE_API_KEY)')
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  }
}

/**
 * 检查敏感变量是否意外暴露
 * 用于客户端代码中调用
 * @param vars - 要检查的变量对象
 * @returns 泄露的变量名列表
 */
export function checkSensitiveLeak(vars: Record<string, string | undefined>): string[] {
  const leaks: string[] = []

  for (const varName of SENSITIVE_VARS) {
    if (vars[varName]) {
      leaks.push(varName)
    }
  }

  return leaks
}

/**
 * 获取所有公开环境变量
 * 用于传递给客户端
 */
export function getPublicEnv(): Record<PublicVar, string | undefined> {
  return {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  }
}

/**
 * AI 提供商配置
 */
export interface AIConfig {
  openai: { apiKey: string } | null
  anthropic: { apiKey: string } | null
  dashscope: { apiKey: string; baseUrl: string } | null
  models: {
    default: string
    cheap: string
    premium: string
  }
}

/**
 * 获取 AI 提供商配置
 */
export function getAIConfig(): AIConfig {
  return {
    openai: process.env.OPENAI_API_KEY ? { apiKey: process.env.OPENAI_API_KEY } : null,
    anthropic: process.env.ANTHROPIC_API_KEY ? { apiKey: process.env.ANTHROPIC_API_KEY } : null,
    dashscope: process.env.DASHSCOPE_API_KEY
      ? {
          apiKey: process.env.DASHSCOPE_API_KEY,
          baseUrl: process.env.DASHSCOPE_BASE_URL || 'https://dashscope.aliyuncs.com/compatible-mode/v1',
        }
      : null,
    models: {
      default: process.env.DEFAULT_MODEL || 'gpt-4o-mini',
      cheap: process.env.CHEAP_MODEL || 'gpt-4o-mini',
      premium: process.env.PREMIUM_MODEL || 'gpt-4o',
    },
  }
}

/**
 * 获取 Google OAuth 配置
 */
export function getGoogleOAuthConfig(): { clientId: string; clientSecret: string } | null {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET

  if (clientId && clientSecret) {
    return { clientId, clientSecret }
  }

  return null
}

/**
 * 获取 Redis 配置
 */
export function getRedisConfig(): { url: string; tlsEnabled: boolean } {
  const url = process.env.REDIS_URL || 'redis://localhost:6379'
  const tlsEnabled = url.startsWith('rediss://')

  return { url, tlsEnabled }
}

// 在服务端启动时自动验证
if (typeof window === 'undefined') {
  const { valid, errors, warnings } = validateEnv()

  if (warnings.length > 0) {
    console.warn('⚠️ Environment warnings:')
    warnings.forEach((warning) => console.warn(`  - ${warning}`))
  }

  if (!valid) {
    console.error('❌ Environment validation failed:')
    errors.forEach((error) => console.error(`  - ${error}`))

    // 仅警告，不阻止启动
    console.warn('⚠️ Some environment variables are missing. App may not work correctly.')
  } else {
    console.log('✅ Environment validation passed')
  }
}
