import Redis from 'ioredis'
import { getRedisConfig, isProduction } from './env'

const { url: redisUrl, tlsEnabled } = getRedisConfig()

// 生产环境验证 TLS
if (isProduction && !tlsEnabled) {
  throw new Error(
    'Production environment requires TLS-enabled Redis connection (rediss://). ' +
      'Current URL does not use TLS. Please use Upstash or another TLS-enabled Redis provider.'
  )
}

// 开发环境警告
if (!isProduction && !tlsEnabled) {
  console.warn('[Redis] Using non-TLS connection. For production, use rediss://')
}

console.log(`[Redis] Initializing connection to: ${tlsEnabled ? 'rediss://***' : redisUrl}`)

export const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: null, // Required by BullMQ for blocking commands
  lazyConnect: true,
  // 生产环境添加连接超时
  ...(isProduction && {
    connectTimeout: 10000,
    commandTimeout: 5000,
  }),
})

// Connection event listeners
redis.on('connect', () => {
  console.log('[Redis] Connecting...')
})

redis.on('ready', () => {
  console.log('[Redis] Connection ready')
})

redis.on('error', (err) => {
  console.error('[Redis] Connection error:', err)
})

redis.on('close', () => {
  console.log('[Redis] Connection closed')
})

redis.on('reconnecting', () => {
  console.log('[Redis] Reconnecting...')
})

// Connection test
export async function testRedisConnection(): Promise<boolean> {
  try {
    console.log('[Redis] Testing connection...')
    await redis.ping()
    console.log('[Redis] Connection test successful')
    return true
  } catch (error) {
    console.error('[Redis] Connection test failed:', error)
    return false
  }
}

// Graceful shutdown
export async function closeRedisConnection() {
  console.log('[Redis] Closing connection...')
  await redis.quit()
  console.log('[Redis] Connection closed')
}
