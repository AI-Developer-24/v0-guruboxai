import Redis from 'ioredis'

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'

console.log(`[Redis] Initializing connection to: ${redisUrl}`)

export const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: null,  // Required by BullMQ for blocking commands
  retryDelayOnFailover: 100,
  lazyConnect: true,
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
