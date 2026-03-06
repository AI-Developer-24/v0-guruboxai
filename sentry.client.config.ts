/**
 * Sentry 客户端配置
 * 此文件会被 Next.js 自动加载
 */

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // 环境标识
  environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV,

  // 采样率配置
  tracesSampleRate: 0.1, // 10% 的请求追踪

  // 会话重播配置
  replaysSessionSampleRate: 0.1, // 10% 的会话录制
  replaysOnErrorSampleRate: 1.0, // 发生错误时 100% 录制

  // 集成配置
  integrations: [
    Sentry.replayIntegration({
      // 隐藏敏感信息
      maskAllText: true,
      blockAllMedia: true,
    }),
    Sentry.browserTracingIntegration(),
  ],

  // 忽略特定错误
  ignoreErrors: [
    // 浏览器扩展错误
    'top.GLOBALS',
    'Can\'t find variable: ZiteReader',
    'jigsaw is not defined',
    'ComboSearch is not defined',
    'atomicFindClose',
    // 网络错误（用户端）
    'NetworkError',
    'Network request failed',
    'Failed to fetch',
    // 取消请求
    'cancelled',
    'canceled',
  ],

  // 过滤敏感信息
  beforeSend(event, hint) {
    // 移除可能包含敏感信息的 URL 参数
    if (event.request?.url) {
      const url = new URL(event.request.url)
      // 移除敏感查询参数
      const sensitiveParams = ['token', 'key', 'password', 'secret']
      sensitiveParams.forEach(param => {
        url.searchParams.delete(param)
      })
      event.request.url = url.toString()
    }

    return event
  },
})
