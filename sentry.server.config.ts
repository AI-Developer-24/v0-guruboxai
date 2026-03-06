/**
 * Sentry 服务端配置
 * 此文件会被 Next.js 自动加载
 */

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // 环境标识
  environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV,

  // 采样率配置
  tracesSampleRate: 0.1, // 10% 的请求追踪

  // 集成配置
  integrations: [
    Sentry.httpIntegration(),
    Sentry.nodeContextIntegration(),
  ],

  // 忽略特定错误
  ignoreErrors: [
    // 数据库连接错误（通常是暂时性的）
    'ECONNREFUSED',
    'ETIMEDOUT',
    // Redis 错误
    'MAXCLIENTS',
    // 取消的请求
    'cancelled',
    'canceled',
  ],

  // 过滤敏感信息
  beforeSend(event, hint) {
    // 移除环境变量中的敏感信息
    if (event.contexts?.runtime?.env) {
      const sensitiveKeys = ['API_KEY', 'SECRET', 'PASSWORD', 'TOKEN', 'CREDENTIALS']
      const env = event.contexts.runtime.env as Record<string, string>

      Object.keys(env).forEach(key => {
        if (sensitiveKeys.some(sensitive => key.toUpperCase().includes(sensitive))) {
          env[key] = '[Filtered]'
        }
      })
    }

    return event
  },
})
