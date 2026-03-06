/**
 * 自定义日志系统
 * - 开发环境：输出到控制台，带格式化
 * - 生产环境：可扩展为发送到日志服务（如 LogDNA, Datadog 等）
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  data?: any
  context?: string
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'
  private isServer = typeof window === 'undefined'

  /**
   * 格式化日志条目
   */
  private formatEntry(level: LogLevel, message: string, data?: any, context?: string): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...(data && { data }),
      ...(context && { context }),
    }
  }

  /**
   * 核心日志方法
   */
  private log(level: LogLevel, message: string, data?: any, context?: string) {
    const entry = this.formatEntry(level, message, data, context)

    if (this.isDevelopment) {
      // 开发环境：彩色控制台输出
      const colors = {
        debug: '\x1b[36m', // 青色
        info: '\x1b[32m', // 绿色
        warn: '\x1b[33m', // 黄色
        error: '\x1b[31m', // 红色
      }
      const reset = '\x1b[0m'
      const color = colors[level]
      const prefix = this.isServer ? '[Server]' : '[Client]'
      const contextStr = context ? ` [${context}]` : ''

      const consoleMethod = level === 'debug' ? 'log' : level
      console[consoleMethod](
        `${color}${prefix}${contextStr} [${entry.timestamp}] ${level.toUpperCase()}:${reset}`,
        message,
        data || ''
      )
    } else {
      // 生产环境：JSON 格式（便于日志聚合工具解析）
      console.log(JSON.stringify(entry))

      // 可扩展：发送到外部日志服务
      // this.sendToLogService(entry)
    }
  }

  /**
   * Debug 级别日志（仅开发环境）
   */
  debug(message: string, data?: any, context?: string) {
    if (this.isDevelopment) {
      this.log('debug', message, data, context)
    }
  }

  /**
   * Info 级别日志
   */
  info(message: string, data?: any, context?: string) {
    this.log('info', message, data, context)
  }

  /**
   * Warning 级别日志
   */
  warn(message: string, data?: any, context?: string) {
    this.log('warn', message, data, context)
  }

  /**
   * Error 级别日志
   */
  error(message: string, error?: any, context?: string) {
    const errorData = error instanceof Error
      ? {
          name: error.name,
          message: error.message,
          stack: error.stack,
        }
      : error

    this.log('error', message, errorData, context)
  }

  /**
   * 创建带上下文的子 logger
   */
  withContext(context: string) {
    return {
      debug: (message: string, data?: any) => this.debug(message, data, context),
      info: (message: string, data?: any) => this.info(message, data, context),
      warn: (message: string, data?: any) => this.warn(message, data, context),
      error: (message: string, error?: any) => this.error(message, error, context),
    }
  }

  /**
   * 性能计时器
   */
  time(label: string) {
    if (this.isDevelopment) {
      console.time(label)
    }
  }

  timeEnd(label: string) {
    if (this.isDevelopment) {
      console.timeEnd(label)
    }
  }

  /**
   * 发送日志到外部服务（可扩展）
   */
  private async sendToLogService(entry: LogEntry) {
    // 示例：发送到日志服务
    // try {
    //   await fetch('/api/logs', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(entry),
    //   })
    // } catch (error) {
    //   console.error('Failed to send log:', error)
    // }
  }
}

// 导出单例实例
export const logger = new Logger()

// 导出类型
export type { LogLevel, LogEntry }
