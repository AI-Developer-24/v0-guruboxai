# Vercel 部署指南

本文档详细说明如何将 GuruBox.ai 部署到 Vercel。

---

## 前置条件

- GitHub 仓库已推送代码
- Supabase 生产项目已创建
- Upstash Redis 已创建
- 环境变量已准备好

---

## 1. 创建 Vercel 项目

### 1.1 导入 GitHub 仓库

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 **Add New > Project**
3. 选择 **Import Git Repository**
4. 授权 GitHub 并选择 `GuruBoxAI` 仓库

### 1.2 配置项目

| 配置项 | 值 |
|--------|-----|
| Framework Preset | Next.js |
| Root Directory | `./` |
| Build Command | `npm run build` |
| Output Directory | `.next` |
| Install Command | `npm install` |

### 1.3 环境变量（首次部署）

在 **Environment Variables** 部分添加关键变量：

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=https://your-vercel-app.vercel.app
REDIS_URL=rediss://default:xxxxx@xxxxx.upstash.io:6379
```

**注意**: 首次部署可以先用 Vercel 默认域名，稍后再配置自定义域名。

### 1.4 部署

点击 **Deploy**，等待构建完成（约 2-3 分钟）。

---

## 2. 配置环境变量

### 2.1 完整变量配置

部署成功后，进入 **Settings > Environment Variables**，添加所有变量：

**必须变更的变量**:
```
NEXTAUTH_URL=https://gurubox.ai
NEXT_PUBLIC_APP_URL=https://gurubox.ai
NODE_ENV=production
REDIS_URL=rediss://default:xxxxx@xxxxx.upstash.io:6379
```

**Supabase**:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

**NextAuth**:
```
NEXTAUTH_SECRET=your-generated-secret
NEXTAUTH_URL=https://gurubox.ai
```

**AI 提供商**:
```
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
DASHSCOPE_API_KEY=sk-...
DASHSCOPE_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
```

**Google OAuth**:
```
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxx
```

**模型配置**:
```
DEFAULT_MODEL=gpt-4o-mini
CHEAP_MODEL=gpt-4o-mini
PREMIUM_MODEL=gpt-4o
```

### 2.2 环境选择

对于每个变量，确保勾选 **Production** 环境。

---

## 3. 配置自定义域名

### 3.1 添加域名

1. 进入 **Settings > Domains**
2. 输入 `gurubox.ai`
3. 点击 **Add**

### 3.2 配置 DNS

Vercel 会提供 DNS 配置信息：

**A 记录** (如果使用根域名):
```
类型: A
名称: @
值: 76.76.21.21
```

**CNAME 记录** (如果使用 www):
```
类型: CNAME
名称: www
值: cname.vercel-dns.com
```

### 3.3 验证 SSL

域名配置完成后，Vercel 会自动配置 SSL 证书（Let's Encrypt）。

验证：
```bash
curl -I https://gurubox.ai
# 应返回 HTTP/2 200
```

---

## 4. 更新回调 URL

域名配置完成后，更新以下服务的回调 URL：

### 4.1 Google Cloud Console

添加生产回调 URL：
- `https://gurubox.ai/auth/v1/callback`
- `https://gurubox.ai/api/v1/auth/google/callback`

### 4.2 Supabase Auth

更新 **Site URL** 为 `https://gurubox.ai`

### 4.3 Vercel 环境变量

更新 `NEXTAUTH_URL` 和 `NEXT_PUBLIC_APP_URL` 为 `https://gurubox.ai`

---

## 5. 重新部署

环境变量更新后，需要重新部署：

1. 进入 **Deployments**
2. 找到最新的部署
3. 点击 **...** > **Redeploy**

或触发新的 Git push。

---

## 6. 验证部署

### 6.1 健康检查

```bash
# 检查首页
curl -I https://gurubox.ai

# 检查 API
curl https://gurubox.ai/api/health
```

### 6.2 功能测试

访问 `https://gurubox.ai`，测试：
- [ ] 首页加载正常
- [ ] Google OAuth 登录正常
- [ ] 创建分析任务正常

---

## 7. Vercel 配置优化（可选）

### 7.1 启用 Analytics

1. 进入 **Analytics** 标签
2. 点击 **Enable Analytics**
3. 免费版每月 100k 事件

### 7.2 配置 Speed Insights

同上，启用 **Speed Insights** 监控性能。

### 7.3 设置部署保护

在 **Settings > Deployment Protection** 中：
- 启用 **Vercel Authentication**（预览部署需要登录）
- 或配置 **Trusted IPs**

---

## 验证清单

完成本步骤后，确认：

- [ ] Vercel 项目已创建
- [ ] 所有环境变量已配置
- [ ] 自定义域名已配置
- [ ] SSL 证书已生效
- [ ] Google OAuth 回调已更新
- [ ] 首次访问测试成功

---

## 下一步

继续 [06-railway-worker.md](./06-railway-worker.md) 部署 Worker 进程。
