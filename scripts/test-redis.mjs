import Redis from 'ioredis'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const redis = new Redis(process.env.REDIS_URL)

async function testConnection() {
  try {
    await redis.set('_test_key_', 'test_value', 'EX', 5)
    const value = await redis.get('_test_key_')
    await redis.del('_test_key_')

    if (value === 'test_value') {
      console.log('✓ Redis connection successful!')
      return true
    }
  } catch (error) {
    console.error('❌ Redis connection failed:', error.message)
    return false
  } finally {
    redis.disconnect()
  }
}

testConnection()
