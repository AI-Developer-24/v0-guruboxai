/**
 * Sentry Edge 配置（用于 Middleware 和 Edge Runtime）
 * 此文件会被 Next.js 自动加载
 */

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // 环境标识
  environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV,

  // 采样率配置（Edge Runtime 通常较低）
  tracesSampleRate: 0.05, // 5% 的请求追踪

  // Edge Runtime 的配置较简单
  ignoreErrors: [
    'NetworkError',
    'Failed to fetch',
    'cancelled',
    'canceled',
  ],
})
