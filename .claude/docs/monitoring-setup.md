# 监控和日志系统 - 安装指南

## 概述

本项目已集成以下监控和日志系统：

1. ✅ **Vercel Analytics** - 性能监控（已配置）
2. ✅ **自定义 Logger** - 日志系统（已实现）
3. ⚙️ **Sentry** - 错误追踪（需要安装依赖）

---

## 1. 自定义 Logger（已就绪）

**无需安装**，开箱即用。

### 使用示例

```typescript
import { logger } from '@/lib/logger'

logger.info('User logged in', { userId: '123' })
logger.error('Operation failed', error)
```

查看完整示例：`.claude/examples/monitoring-usage.md`

---

## 2. Sentry 错误追踪（需要配置）

### 步骤 1: 安装依赖

```bash
npm install @sentry/nextjs
```

### 步骤 2: 创建 Sentry 项目

1. 访问 [https://sentry.io](https://sentry.io)
2. 创建账号或登录
3. 创建新项目：
   - Platform: **Next.js**
   - 项目名称: `gurubox-ai`
4. 复制 **DSN**（类似：`https://xxx@xxx.ingest.sentry.io/xxx`）

### 步骤 3: 配置环境变量

在 `.env.local` 中添加：

```env
# Sentry Configuration
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
SENTRY_ENVIRONMENT=development  # 生产环境改为 production
```

### 步骤 4: 验证配置

重启开发服务器：

```bash
npm run dev
```

### 步骤 5: 测试 Sentry（可选）

在任意页面添加测试按钮：

```typescript
'use client'

export function TestSentry() {
  const testError = () => {
    throw new Error('Sentry test error')
  }

  return (
    <button onClick={testError}>
      Test Sentry
    </button>
  )
}
```

点击按钮后，检查 Sentry 控制台是否收到错误报告。

---

## 3. Vercel Analytics（已配置）

如果部署到 Vercel，Analytics 会自动工作。

本地开发时，Analytics 不会发送数据。

---

## 4. 生产环境配置

### 4.1 更新环境变量

```env
# .env.production
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
SENTRY_ENVIRONMENT=production
```

### 4.2 Vercel 部署设置

在 Vercel 项目设置中添加环境变量：

- `SENTRY_DSN`
- `SENTRY_ENVIRONMENT=production`

### 4.3 调整采样率（可选）

编辑 `sentry.client.config.ts` 和 `sentry.server.config.ts`：

```typescript
// 生产环境可以提高采样率
tracesSampleRate: 0.2, // 20%
replaysSessionSampleRate: 0.2, // 20%
replaysOnErrorSampleRate: 1.0, // 错误时 100%
```

---

## 5. Sentry 功能说明

### 已配置的功能

✅ **错误追踪** - 自动捕获未处理的异常
✅ **性能监控** - 追踪 API 响应时间
✅ **会话重播** - 错误时录制用户会话
✅ **敏感信息过滤** - 自动过滤密码、token 等
✅ **环境区分** - 开发/生产环境独立

### 手动使用

```typescript
import { captureException, addBreadcrumb } from '@/lib/sentry'

// 捕获错误
try {
  await riskyOperation()
} catch (error) {
  captureException(error as Error, { operation: 'riskyOperation' })
}

// 添加面包屑（追踪用户行为）
addBreadcrumb({
  category: 'user-action',
  message: 'User clicked export',
  level: 'info',
})
```

---

## 6. 监控检查清单

部署到生产环境前，确保：

- [ ] Sentry 依赖已安装 (`@sentry/nextjs`)
- [ ] Sentry DSN 已配置
- [ ] Sentry Environment 已设置为 `production`
- [ ] Vercel 环境变量已配置
- [ ] 测试错误报告正常工作
- [ ] 查看 Sentry 控制台确认数据接收

---

## 7. 可选：集成到 CI/CD

### GitHub Actions

创建 `.github/workflows/sentry-release.yml`：

```yaml
name: Sentry Release

on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Create Sentry release
        uses: getsentry/action-release@v1
        env:
          SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}
          SENTRY_ORG: your-org-name
          SENTRY_PROJECT: gurubox-ai
        with:
          environment: production
          version: ${{ github.sha }}
```

需要在 GitHub 仓库的 Secrets 中添加 `SENTRY_AUTH_TOKEN`。

---

## 8. 常见问题

### Q: 本地开发时需要配置 Sentry 吗？
**A**: 不需要。本地开发可以不配置 Sentry，系统会自动降级到仅使用本地日志。

### Q: Sentry 会影响性能吗？
**A**: 影响很小。已配置采样率（10%），且为异步上报。

### Q: 如何查看日志？
**A**:
- 开发环境：控制台查看
- 生产环境：Vercel Logs 或配置外部日志服务

### Q: 如何禁用 Sentry？
**A**: 移除 `.env.local` 中的 `SENTRY_DSN` 即可。

---

## 9. 成本估算

### Sentry 免费套餐

- 5,000 错误事件/月
- 10,000 性能事件/月
- 1 个项目
- 1 天数据保留

对于中小型项目，免费套餐足够使用。

### Vercel Analytics

- Hobby 计划：免费
- Pro 计划：包含在套餐中

---

## 10. 下一步

完成配置后：

1. ✅ 测试错误追踪是否工作
2. ✅ 查看完整使用示例：`.claude/examples/monitoring-usage.md`
3. ✅ 在关键代码路径中添加日志和错误追踪
4. ✅ 部署到生产环境
5. ✅ 监控 Sentry 控制台

---

## 支持

遇到问题？

- Sentry 文档：https://docs.sentry.io/platforms/javascript/guides/nextjs/
- Next.js + Sentry：https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries#sentry
