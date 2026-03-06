# 监控和日志使用示例

## 1. 自定义日志系统 (Logger)

### 基本使用

```typescript
import { logger } from '@/lib/logger'

// 基本日志
logger.info('User logged in', { userId: '123' })
logger.warn('Rate limit approaching', { currentRate: 95, limit: 100 })
logger.error('Failed to create report', new Error('Database connection failed'))

// Debug 日志（仅开发环境）
logger.debug('Processing request', { requestId: 'abc-123' })
```

### 带上下文的日志

```typescript
// 创建带上下文的 logger
const apiLogger = logger.withContext('API:Reports')

apiLogger.info('Fetching reports', { userId: '123' })
apiLogger.error('Failed to fetch', error)
```

### 性能计时

```typescript
logger.time('database-query')
// ... 执行查询
logger.timeEnd('database-query') // 输出: database-query: 123.45ms
```

## 2. Sentry 错误追踪

### 安装依赖

```bash
npm install @sentry/nextjs
```

### 配置环境变量

```env
# .env.local
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
SENTRY_ENVIRONMENT=production
```

### 基本使用

```typescript
import { captureException, captureMessage, addBreadcrumb } from '@/lib/sentry'

// 捕获异常
try {
  await riskyOperation()
} catch (error) {
  captureException(error as Error, {
    operation: 'riskyOperation',
    userId: '123',
  })
  throw error
}

// 捕获消息
captureMessage('Report generation started', 'info', { reportId: '456' })

// 添加面包屑（追踪用户行为）
addBreadcrumb({
  category: 'user-action',
  message: 'User clicked export button',
  level: 'info',
  data: { reportId: '456', format: 'pdf' },
})
```

### 设置用户上下文

```typescript
import { setUser } from '@/lib/sentry'

// 用户登录后
setUser({
  id: user.id,
  email: user.email,
  username: user.name,
})

// 用户登出后
setUser(null)
```

### 包装异步函数

```typescript
import { withSentry } from '@/lib/sentry'

// 自动捕获错误的异步函数
const safeFetchReport = withSentry(
  async (reportId: string) => {
    const response = await fetch(`/api/reports/${reportId}`)
    return response.json()
  },
  'fetchReport'
)
```

## 3. 在 API 路由中使用

```typescript
// app/api/v1/reports/[report_id]/route.ts
import { logger } from '@/lib/logger'
import { captureException, addBreadcrumb } from '@/lib/sentry'
import { NextRequest, NextResponse } from 'next/server'

const apiLogger = logger.withContext('API:Reports')

export async function GET(
  request: NextRequest,
  { params }: { params: { report_id: string } }
) {
  const reportId = params.report_id

  apiLogger.info('Fetching report', { reportId })

  addBreadcrumb({
    category: 'api',
    message: `GET /api/reports/${reportId}`,
    level: 'info',
  })

  try {
    const report = await fetchReportFromDB(reportId)

    if (!report) {
      apiLogger.warn('Report not found', { reportId })
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Report not found' } },
        { status: 404 }
      )
    }

    apiLogger.info('Report fetched successfully', {
      reportId,
      opportunitiesCount: report.total_opportunities
    })

    return NextResponse.json({ data: report })
  } catch (error) {
    apiLogger.error('Failed to fetch report', error, reportId)
    captureException(error as Error, {
      reportId,
      endpoint: '/api/reports/[report_id]',
    })

    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch report' } },
      { status: 500 }
    )
  }
}
```

## 4. 在组件中使用

```typescript
// components/report/export-button.tsx
'use client'

import { useState } from 'react'
import { logger } from '@/lib/logger'
import { captureException, addBreadcrumb } from '@/lib/sentry'

const componentLogger = logger.withContext('ExportButton')

export function ExportButton({ reportId }: { reportId: string }) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    componentLogger.info('Export started', { reportId })

    addBreadcrumb({
      category: 'user-action',
      message: 'User initiated export',
      level: 'info',
      data: { reportId },
    })

    setIsExporting(true)

    try {
      const response = await fetch(`/api/reports/${reportId}/export`, {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Export failed')
      }

      componentLogger.info('Export completed', { reportId })

      // 下载文件...
    } catch (error) {
      componentLogger.error('Export failed', error, reportId)
      captureException(error as Error, {
        reportId,
        action: 'export',
      })

      // 显示错误提示...
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <button onClick={handleExport} disabled={isExporting}>
      {isExporting ? 'Exporting...' : 'Export'}
    </button>
  )
}
```

## 5. 在 Worker 中使用

```typescript
// scripts/worker.ts
import { logger } from '@/lib/logger'
import { captureException, startTransaction } from '@/lib/sentry'
import { Worker } from 'bullmq'

const workerLogger = logger.withContext('Worker:Analysis')

const worker = new Worker('analysis', async job => {
  const transaction = startTransaction(
    `Process analysis task`,
    'worker.task'
  )

  workerLogger.info('Processing task', {
    jobId: job.id,
    taskType: job.name,
  })

  try {
    // 执行分析任务...
    const result = await processAnalysis(job.data)

    transaction.setStatus('ok')
    workerLogger.info('Task completed', {
      jobId: job.id,
      resultSize: result.length,
    })

    return result
  } catch (error) {
    transaction.setStatus('internal_error')
    workerLogger.error('Task failed', error, { jobId: job.id })

    captureException(error as Error, {
      jobId: job.id,
      taskType: job.name,
      data: job.data,
    })

    throw error
  } finally {
    transaction.finish()
  }
})
```

## 6. 性能监控

### API 路由性能

```typescript
import { logger } from '@/lib/logger'
import { startTransaction } from '@/lib/sentry'

export async function GET(request: NextRequest) {
  const transaction = startTransaction('GET /api/reports', 'http.server')

  logger.time('db-query')

  try {
    const reports = await fetchReports()
    logger.timeEnd('db-query')

    transaction.setData('reportsCount', reports.length)
    transaction.setStatus('ok')

    return NextResponse.json({ data: reports })
  } catch (error) {
    transaction.setStatus('internal_error')
    throw error
  } finally {
    transaction.finish()
  }
}
```

## 7. 环境区分

日志和监控会根据环境自动调整：

- **开发环境**:
  - 日志输出到控制台（彩色格式）
  - Sentry 仅在配置了 DSN 时启用
  - Debug 日志可见

- **生产环境**:
  - 日志输出为 JSON 格式
  - Sentry 全功能启用
  - Debug 日志被过滤

## 8. 日志级别使用指南

- **debug**: 详细的调试信息（仅开发环境可见）
  ```typescript
  logger.debug('Variable value', { x: 123 })
  ```

- **info**: 常规信息（操作成功、状态变化等）
  ```typescript
  logger.info('Report created', { reportId: '456' })
  ```

- **warn**: 警告（潜在问题、降级操作等）
  ```typescript
  logger.warn('Rate limit at 90%', { current: 90, limit: 100 })
  ```

- **error**: 错误（异常、失败操作等）
  ```typescript
  logger.error('Failed to connect to database', error)
  ```
