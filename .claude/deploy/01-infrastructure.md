# 基础设施准备

本文档涵盖生产环境所需的基础设施配置。

---

## 1. Supabase 生产项目

### 1.1 创建项目

1. 登录 [Supabase Dashboard](https://supabase.com/dashboard)
2. 点击 "New Project"
3. 配置项目：
   - **Name**: `gurubox-prod`
   - **Database Password**: 使用强密码（保存好）
   - **Region**: 选择离用户最近的区域（推荐：Singapore 或 Tokyo）
4. 等待项目创建完成（约 2 分钟）

### 1.2 获取凭证

创建完成后，在 **Project Settings > API** 获取：

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

**⚠️ 重要**: `SERVICE_ROLE_KEY` 可绕过 RLS，严格保密！

### 1.3 执行数据库迁移

在 **SQL Editor** 中依次执行：

#### 迁移 1: 核心表结构

```sql
-- 复制 supabase/migrations/001_initial_schema.sql 内容
-- 或直接执行以下命令

-- 本地执行方式（推荐）
npx supabase db push --project-ref <your-project-ref>
```

#### 迁移 2: Google Tokens 表

```sql
-- 复制 supabase/migrations/002_google_tokens.sql 内容
```

### 1.4 验证表结构

在 **Table Editor** 中确认以下表已创建：

| 表名 | 说明 |
|------|------|
| `users` | 用户配置（语言偏好等） |
| `reports` | 分析报告 |
| `tasks` | 异步任务 |
| `opportunities` | 产品机会 |
| `google_tokens` | Google OAuth 令牌 |

### 1.5 验证 RLS 策略

在 **Authentication > Policies** 中确认所有表都启用了 RLS。

---

## 2. Upstash Redis

### 2.1 创建实例

1. 登录 [Upstash Console](https://console.upstash.io)
2. 点击 "Create Database"
3. 配置：
   - **Name**: `gurubox-redis`
   - **Region**: 与 Supabase 相同区域
   - **Type**: Regional（非 Global）
4. 创建完成

### 2.2 获取连接 URL

在数据库详情页复制 **UPSTASH_REDIS_REST_URL** 或传统连接字符串：

```
REDIS_URL=rediss://default:xxxxx@us1-xxxxx.upstash.io:6379
```

**注意**: 使用 `rediss://`（带 s）表示 TLS 加密连接。

### 2.3 配置推荐

| 配置项 | 推荐值 | 说明 |
|--------|--------|------|
| Max Memory | 256MB | 免费版足够开发使用 |
| Eviction Policy | allkeys-lru | 内存满时淘汰旧数据 |

---

## 3. 密钥生成

### 3.1 NextAuth Secret

```bash
openssl rand -base64 32
```

输出示例：
```
NEXTAUTH_SECRET=kJ7xY9mN2pL4qR8sT1uV3wX5yZ0aB6cD
```

### 3.2 保存所有凭证

建议使用密码管理器保存以下信息：

| 凭证 | 用途 | 存储位置 |
|------|------|----------|
| Supabase URL | 数据库连接 | Vercel 环境变量 |
| Supabase Anon Key | 客户端访问 | Vercel 环境变量 |
| Supabase Service Role Key | 服务端操作 | Vercel 环境变量 |
| Redis URL | 队列连接 | Vercel + Railway |
| NextAuth Secret | Session 加密 | Vercel + Railway |

---

## 4. 验证清单

完成本步骤后，确认：

- [ ] Supabase 生产项目已创建
- [ ] 所有迁移脚本已执行
- [ ] RLS 策略已启用
- [ ] Upstash Redis 已创建
- [ ] NEXTAUTH_SECRET 已生成
- [ ] 所有凭证已安全保存

---

## 下一步

继续 [02-environment-variables.md](./02-environment-variables.md) 配置环境变量。
