# 代码修改方案

本文档描述生产环境部署所需的代码修改。

---

## 修改清单

| 文件 | 修改类型 | 说明 |
|------|----------|------|
| `lib/env.ts` | 新增 | 环境变量验证模块 |
| `next.config.mjs` | 修改 | 生产环境优化配置 |
| `lib/supabase.ts` | 增强 | 添加环境验证 |
| `lib/redis.ts` | 增强 | TLS 连接检查 |

---

## 1. 新增 lib/env.ts

### 功能说明

- 启动时验证必需环境变量
- 区分公开变量和敏感变量
- 提供类型安全的变量访问
- 检查敏感变量是否意外暴露

### 代码实现

```typescript
// lib/env.ts
/**
 * 环境变量验证和安全检查模块
 *
 * 功能：
 * - 启动时验证必需环境变量
 * - 区分公开变量（NEXT_PUBLIC_*）和敏感变量
 * - 检查敏感变量是否意外暴露到客户端
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
 * 验证必需环境变量
 * 在应用启动时调用
 */
export function validateEnv(): { valid: boolean; errors: string[] } {
  const errors: string[] = []

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
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * 检查敏感变量是否意外暴露
 * 用于客户端代码中调用
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
 * 获取 AI 提供商配置
 */
export function getAIConfig() {
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

// 在服务端启动时自动验证
if (typeof window === 'undefined') {
  const { valid, errors } = validateEnv()
  if (!valid) {
    console.error('❌ Environment validation failed:')
    errors.forEach((error) => console.error(`  - ${error}`))

    // 生产环境严格模式：启动失败
    if (isProduction) {
      throw new Error('Environment validation failed. See errors above.')
    }
    // 开发环境：仅警告
    else {
      console.warn('⚠️ Some environment variables are missing. App may not work correctly.')
    }
  } else {
    console.log('✅ Environment validation passed')
  }
}
```

---

## 2. 修改 next.config.mjs

### 当前问题

```javascript
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,  // ⚠️ 生产环境应移除
  },
  images: {
    unoptimized: true,  // ⚠️ 生产环境应使用优化
  },
}
```

### 修改后

```javascript
// next.config.mjs
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  // TypeScript 构建检查：开发环境忽略，生产环境严格
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },

  // 图片优化：生产环境启用 Vercel Image Optimization
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },

  // 生产环境优化
  ...(process.env.NODE_ENV === 'production' && {
    // 启用压缩
    compress: true,
    // 生成 source map 用于错误追踪
    productionBrowserSourceMaps: true,
  }),
}

export default withNextIntl(nextConfig)
```

---

## 3. 增强 lib/supabase.ts

### 修改内容

在文件开头添加环境验证：

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
import { validateEnv, getEnv } from './env'

// 验证环境变量
const { valid, errors } = validateEnv()
if (!valid) {
  console.error('Supabase configuration errors:', errors)
}

const supabaseUrl = getEnv('NEXT_PUBLIC_SUPABASE_URL')
const supabaseAnonKey = getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY')

// ... 其余代码保持不变
```

---

## 4. 增强 lib/redis.ts

### 修改内容

添加生产环境 TLS 检查：

```typescript
// lib/redis.ts
import IORedis from 'ioredis'
import { getEnv, isProduction } from './env'

const redisUrl = getEnv('REDIS_URL')

// 生产环境验证 TLS
if (isProduction && !redisUrl.startsWith('rediss://')) {
  throw new Error(
    'Production environment requires TLS-enabled Redis connection (rediss://). ' +
    'Current URL starts with: ' + redisUrl.substring(0, 10) + '...'
  )
}

// Redis 配置
const redisConfig = {
  maxRetriesPerRequest: 3,
  retryDelayOnFailover: 100,
  enableReadyCheck: true,
  // 生产环境添加连接超时
  ...(isProduction && {
    connectTimeout: 10000,
    commandTimeout: 5000,
  }),
}

export const redis = new IORedis(redisUrl, redisConfig)

// 连接事件监听
redis.on('connect', () => {
  console.log('✅ Redis connected')
})

redis.on('error', (err) => {
  console.error('❌ Redis connection error:', err.message)
})

// ... 其余代码保持不变
```

---

## 验证修改

### 本地测试

```bash
# 1. 设置生产环境变量测试
NODE_ENV=production npm run build

# 2. 预期输出
# ✅ Environment validation passed
# ✅ Redis connected
```

### 检查清单

- [ ] `lib/env.ts` 已创建
- [ ] `next.config.mjs` 已更新
- [ ] `lib/supabase.ts` 已增强
- [ ] `lib/redis.ts` 已增强
- [ ] 本地构建成功

---

## 下一步

继续 [03-third-party-services.md](./03-third-party-services.md) 配置第三方服务。
