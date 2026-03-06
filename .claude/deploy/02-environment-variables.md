# 环境变量配置

本文档详细说明所有环境变量的配置方式。

---

## 变量总览

共 **18 个环境变量**，按优先级分类：

### 必须变更（高风险）

| 变量名 | 开发环境 | 生产环境 |
|--------|----------|----------|
| `NEXTAUTH_URL` | `http://localhost:3000` | `https://gurubox.ai` |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` | `https://gurubox.ai` |
| `NODE_ENV` | `development` | `production` |
| `REDIS_URL` | `redis://localhost:6379` | `rediss://...upstash.io:xxxxx` |

### 需要独立实例（中风险）

| 变量名 | 说明 |
|--------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | 生产项目 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 生产项目匿名密钥 |
| `SUPABASE_SERVICE_ROLE_KEY` | 生产项目服务密钥 |
| `NEXTAUTH_SECRET` | **重新生成** |

### 可复用但需审查（低风险）

| 变量名 | 说明 |
|--------|------|
| `OPENAI_API_KEY` | 可复用，监控用量 |
| `ANTHROPIC_API_KEY` | 可复用，监控用量 |
| `DASHSCOPE_API_KEY` | 可复用，监控用量 |
| `GOOGLE_CLIENT_ID` | 需添加生产域名 |
| `GOOGLE_CLIENT_SECRET` | 同上 |
| `DEFAULT_MODEL` | 可复用 |
| `CHEAP_MODEL` | 可复用 |
| `PREMIUM_MODEL` | 可复用 |
| `DASHSCOPE_BASE_URL` | 无需变更 |

---

## Vercel 配置步骤

### 1. 进入项目设置

1. 打开 Vercel Dashboard
2. 选择 GuruBoxAI 项目
3. 进入 **Settings > Environment Variables**

### 2. 添加变量

对于每个变量：

1. **Name**: 输入变量名（如 `NEXTAUTH_URL`）
2. **Value**: 输入生产值
3. **Environment**: 勾选 **Production**
4. 点击 **Add**

### 3. 批量导入（可选）

使用 Vercel CLI 批量导入：

```bash
# 创建 .env.production 文件
vercel env pull .env.production

# 或直接添加
vercel env add NEXTAUTH_URL production
```

---

## 完整配置清单

复制以下内容，替换为实际值：

```env
# ===========================================
# 必须变更 - 生产环境专用
# ===========================================
NEXTAUTH_URL=https://gurubox.ai
NEXT_PUBLIC_APP_URL=https://gurubox.ai
NODE_ENV=production
REDIS_URL=rediss://default:XXXXX@XXXXX.upstash.io:6379

# ===========================================
# Supabase - 生产项目
# ===========================================
NEXT_PUBLIC_SUPABASE_URL=https://XXXXX.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...

# ===========================================
# NextAuth - 重新生成
# ===========================================
NEXTAUTH_SECRET=kJ7xY9mN2pL4qR8sT1uV3wX5yZ0aB6cD

# ===========================================
# AI 提供商 - 可复用
# ===========================================
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
DASHSCOPE_API_KEY=sk-...
DASHSCOPE_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1

# ===========================================
# Google OAuth - 需配置生产域名
# ===========================================
GOOGLE_CLIENT_ID=XXXXX.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-XXXXX

# ===========================================
# AI 模型配置 - 可复用
# ===========================================
DEFAULT_MODEL=gpt-4o-mini
CHEAP_MODEL=gpt-4o-mini
PREMIUM_MODEL=gpt-4o
```

---

## Railway Worker 配置

Worker 进程需要相同的环境变量（除 Next.js 相关的 `NEXT_PUBLIC_*` 外）。

### 方法 1: 手动添加

在 Railway 项目 **Settings > Variables** 中逐个添加。

### 方法 2: 使用 .env 文件

```bash
# 创建 worker.env 文件
# 在 Railway Dashboard 中导入
```

### Worker 必需变量

```env
NODE_ENV=production
REDIS_URL=rediss://default:XXXXX@XXXXX.upstash.io:6379
NEXT_PUBLIC_SUPABASE_URL=https://XXXXX.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
DASHSCOPE_API_KEY=sk-...
DASHSCOPE_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
DEFAULT_MODEL=gpt-4o-mini
CHEAP_MODEL=gpt-4o-mini
PREMIUM_MODEL=gpt-4o
```

---

## 安全注意事项

### ❌ 不要做的事

- 不要在代码中硬编码密钥
- 不要将 `.env` 文件提交到 Git
- 不要在客户端代码中使用 `SUPABASE_SERVICE_ROLE_KEY`
- 不要在日志中打印环境变量

### ✅ 应该做的事

- 使用 Vercel 环境变量加密存储
- 定期轮换敏感密钥
- 设置 API 使用限额和告警
- 审计环境变量访问日志

---

## 验证环境变量

部署后，访问以下端点验证：

```bash
# 检查应用健康状态
curl https://gurubox.ai/api/health

# 预期响应
{
  "status": "ok",
  "environment": "production"
}
```

---

## 下一步

继续 [03-code-changes.md](./03-code-changes.md) 进行代码修改。
