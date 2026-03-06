# Railway Worker 部署指南

本文档详细说明如何将 BullMQ Worker 部署到 Railway。

---

## 为什么需要独立部署 Worker？

| 特性 | Vercel Serverless | Railway Worker |
|------|-------------------|----------------|
| 执行时间限制 | 10-60 秒 | 无限制 |
| 运行模式 | 按需启动 | 持续运行 |
| 适合任务 | HTTP 请求处理 | 长时间后台任务 |
| 费用 | 按调用次数 | 按运行时间 |

GuruBox.ai 的分析任务可能需要 30 秒到 5 分钟，因此必须使用独立部署的 Worker。

---

## 1. 创建 Railway 项目

### 1.1 注册 Railway

1. 访问 [Railway](https://railway.app)
2. 使用 GitHub 账号登录
3. 授权 Railway 访问你的仓库

### 1.2 创建新项目

1. 点击 **New Project**
2. 选择 **Deploy from GitHub repo**
3. 选择 `GuruBoxAI` 仓库

### 1.3 配置服务

| 配置项 | 值 |
|--------|-----|
| Root Directory | `/` |
| Start Command | `npx tsx scripts/worker.ts` |
| Build Command | `npm install` |

**注意**: Railway 会自动检测 Node.js 项目并安装依赖。

---

## 2. 配置环境变量

### 2.1 进入变量设置

在 Railway 项目中，进入 **Settings > Variables**

### 2.2 添加所有必需变量

Worker 需要的环境变量（复制 Vercel 的配置）：

```env
# 运行环境
NODE_ENV=production

# Redis（必须与 Vercel 使用同一个）
REDIS_URL=rediss://default:xxxxx@xxxxx.upstash.io:6379

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...

# AI 提供商
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
DASHSCOPE_API_KEY=sk-...
DASHSCOPE_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1

# 模型配置
DEFAULT_MODEL=gpt-4o-mini
CHEAP_MODEL=gpt-4o-mini
PREMIUM_MODEL=gpt-4o
```

### 2.3 使用 JSON 导入（可选）

点击 **Raw Editor**，直接粘贴 JSON：

```json
{
  "NODE_ENV": "production",
  "REDIS_URL": "rediss://...",
  "NEXT_PUBLIC_SUPABASE_URL": "https://...",
  "SUPABASE_SERVICE_ROLE_KEY": "eyJ...",
  "OPENAI_API_KEY": "sk-...",
  "ANTHROPIC_API_KEY": "sk-ant-...",
  "DASHSCOPE_API_KEY": "sk-...",
  "DEFAULT_MODEL": "gpt-4o-mini",
  "CHEAP_MODEL": "gpt-4o-mini",
  "PREMIUM_MODEL": "gpt-4o"
}
```

---

## 3. 配置健康检查

### 3.1 添加健康检查脚本

在 `scripts/worker.ts` 中添加 HTTP 健康检查端点：

```typescript
// 在 worker.ts 开头添加
import http from 'http'

// 简单的健康检查服务器
const healthServer = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }))
  } else {
    res.writeHead(404)
    res.end()
  }
})

const PORT = process.env.PORT || 3001
healthServer.listen(PORT, () => {
  console.log(`Health check server running on port ${PORT}`)
})
```

### 3.2 在 Railway 配置健康检查

在 **Settings > Healthcheck** 中：

| 配置项 | 值 |
|--------|-----|
| Path | `/health` |
| Port | `3001` (或使用 `$PORT`) |
| Timeout | 30 秒 |

---

## 4. 部署和验证

### 4.1 触发部署

点击 **Deploy** 或推送新的 commit 到 GitHub。

### 4.2 查看日志

在 **Deployments** 标签查看实时日志。

预期输出：
```
✅ Environment validation passed
✅ Redis connected
Health check server running on port 3001
Worker started, listening for jobs...
```

### 4.3 验证连接

检查 Worker 是否正确连接 Redis：

```bash
# 在 Upstash Console 中查看连接数
# 应该看到来自 Railway 的连接
```

---

## 5. 配置自动重启

### 5.1 设置重启策略

在 **Settings > Restart Policy** 中：

| 策略 | 推荐 |
|------|------|
| On Failure | ✅ 启用 |
| Max Retries | 3 |

### 5.2 配置资源限制

在 **Settings > Resources** 中：

| 资源 | 推荐值 |
|------|--------|
| Memory | 512MB - 1GB |
| CPU | 0.5 - 1 vCPU |

---

## 6. 监控和告警

### 6.1 配置日志告警

Railway 支持在检测到错误时发送通知：

1. 进入 **Settings > Notifications**
2. 配置 Slack 或 Discord webhook
3. 设置触发条件（如包含 "error" 的日志）

### 6.2 监控指标

关注以下指标：

| 指标 | 健康范围 |
|------|----------|
| CPU 使用率 | < 80% |
| 内存使用率 | < 85% |
| 重启次数 | < 5/天 |

---

## 7. 费用预估

### Railway 计费方式

- **免费额度**: $5/月（约 500 小时）
- **按用量计费**: $0.000463/GB-hour (内存) + $0.000231/vCPU-hour

### GuruBox.ai 预估

| 项目 | 用量 | 费用 |
|------|------|------|
| 运行时间 | 720 小时/月 | $3-5 |
| 内存 (512MB) | 360 GB-hours | ~$0.17 |
| CPU (0.5 vCPU) | 360 vCPU-hours | ~$0.08 |
| **总计** | - | **~$5-10/月** |

---

## 8. 故障排除

### Worker 无法启动

检查日志中的错误信息：
- 环境变量缺失
- Redis 连接失败
- 依赖安装失败

### 任务积压

检查：
- Worker 是否正在运行
- Redis 连接是否正常
- AI API 是否返回错误

### 内存溢出

如果任务处理大量数据，可能需要增加内存限制。

---

## 验证清单

完成本步骤后，确认：

- [ ] Railway 项目已创建
- [ ] 环境变量已配置
- [ ] Worker 成功启动
- [ ] 健康检查正常
- [ ] 日志显示连接成功
- [ ] 测试任务可以执行

---

## 下一步

继续 [07-verification-checklist.md](./07-verification-checklist.md) 进行全面验证。
