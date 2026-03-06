import Redis from 'ioredis'
import { getRedisConfig, isProduction } from './env'
import { logger } from './logger'

const redisLogger = logger.withContext('Redis')

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
  redisLogger.warn('Using non-TLS connection. For production, use rediss://')
}

redisLogger.info(`Initializing connection`, { tls: tlsEnabled })

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
  redisLogger.debug('Connecting...')
})

redis.on('ready', () => {
  redisLogger.info('Connection ready')
})

redis.on('error', (err) => {
  redisLogger.error('Connection error', err)
})

redis.on('close', () => {
  redisLogger.info('Connection closed')
})

redis.on('reconnecting', () => {
  redisLogger.info('Reconnecting...')
})

// Connection test
export async function testRedisConnection(): Promise<boolean> {
  try {
    redisLogger.debug('Testing connection...')
    await redis.ping()
    redisLogger.info('Connection test successful')
    return true
  } catch (error) {
    redisLogger.error('Connection test failed', error)
    return false
  }
}

// Graceful shutdown
export async function closeRedisConnection() {
  redisLogger.info('Closing connection...')
  await redis.quit()
  redisLogger.info('Connection closed')
}
