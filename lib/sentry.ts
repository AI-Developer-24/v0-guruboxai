/**
 * Sentry 错误追踪配置
 *
 * 注意：使用前需要安装 Sentry 依赖：
 * npm install @sentry/nextjs
 *
 * 然后在 .env.local 中配置 SENTRY_DSN
 */

// 仅在 Sentry 已安装且配置了 DSN 时才导入
let Sentry: any = null

if (process.env.SENTRY_DSN) {
  try {
    Sentry = require('@sentry/nextjs')
  } catch (error) {
    console.warn('Sentry not installed. Run: npm install @sentry/nextjs')
  }
}

/**
 * 捕获异常并发送到 Sentry
 */
export function captureException(error: Error, context?: Record<string, any>) {
  if (Sentry) {
    Sentry.captureException(error, {
      extra: context,
    })
  }

  // 同时记录到本地日志
  console.error('[Sentry] Exception captured:', error, context)
}

/**
 * 捕获消息并发送到 Sentry
 */
export function captureMessage(
  message: string,
  level: 'info' | 'warning' | 'error' = 'info',
  context?: Record<string, any>
) {
  if (Sentry) {
    Sentry.captureMessage(message, {
      level,
      extra: context,
    })
  }

  // 同时记录到本地日志
  const logLevel = level === 'warning' ? 'warn' : level
  console[logLevel](`[Sentry] Message captured:`, message, context)
}

/**
 * 设置用户上下文
 */
export function setUser(user: { id: string; email?: string; username?: string } | null) {
  if (Sentry) {
    if (user) {
      Sentry.setUser(user)
    } else {
      Sentry.setUser(null)
    }
  }
}

/**
 * 添加面包屑（Breadcrumbs）用于追踪用户行为
 */
export function addBreadcrumb(breadcrumb: {
  category: string
  message: string
  level?: 'info' | 'warning' | 'error'
  data?: Record<string, any>
}) {
  if (Sentry) {
    Sentry.addBreadcrumb({
      category: breadcrumb.category,
      message: breadcrumb.message,
      level: breadcrumb.level || 'info',
      data: breadcrumb.data,
    })
  }
}

/**
 * 创建一个事务用于性能监控
 */
export function startTransaction(name: string, op: string) {
  if (Sentry) {
    return Sentry.startTransaction({ name, op })
  }

  // 如果 Sentry 未安装，返回一个空的事务对象
  return {
    finish: () => {},
    setStatus: () => {},
    setData: () => {},
  }
}

/**
 * 包装异步函数，自动捕获错误
 */
export function withSentry<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  context?: string
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await fn(...args)
    } catch (error) {
      captureException(error as Error, {
        function: context || fn.name,
        args: args.map(arg => {
          // 避免记录敏感信息
          if (typeof arg === 'object' && arg !== null) {
            return '[Object]'
          }
          return arg
        }),
      })
      throw error
    }
  }) as T
}

/**
 * 检查 Sentry 是否已启用
 */
export function isSentryEnabled(): boolean {
  return !!Sentry && !!process.env.SENTRY_DSN
}
