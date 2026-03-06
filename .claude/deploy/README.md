# GuruBox.ai 部署指南

## 快速开始

### 部署架构

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Vercel        │     │   Railway        │     │   Supabase      │
│   (Web App)     │────▶│   (Worker)       │────▶│   (Database)    │
│                 │     │                  │     │                 │
│   Next.js 16    │     │   BullMQ Worker  │     │   PostgreSQL    │
└─────────────────┘     └──────────────────┘     └─────────────────┘
        │                        │
        │                        │
        ▼                        ▼
┌─────────────────┐     ┌──────────────────┐
│   Upstash       │     │   AI Providers   │
│   (Redis)       │     │   (OpenAI, etc)  │
└─────────────────┘     └──────────────────┘
```

### 部署顺序

1. **基础设施准备** → `01-infrastructure.md`
2. **环境变量配置** → `02-environment-variables.md`
3. **代码修改** → `03-code-changes.md`
4. **第三方服务** → `03-third-party-services.md`
5. **Vercel 部署** → `05-vercel-deployment.md`
6. **Worker 部署** → `06-railway-worker.md`
7. **验证测试** → `07-verification-checklist.md`

---

## 文档目录

| 文档 | 内容 | 预计时间 |
|------|------|----------|
| [01-infrastructure.md](./01-infrastructure.md) | Supabase、Redis、密钥生成 | 30 分钟 |
| [02-environment-variables.md](./02-environment-variables.md) | 环境变量详细配置说明 | 15 分钟 |
| [03-code-changes.md](./03-code-changes.md) | lib/env.ts, next.config.mjs 等 | 30 分钟 |
| [03-third-party-services.md](./03-third-party-services.md) | Google OAuth, AI 提供商 | 20 分钟 |
| [05-vercel-deployment.md](./05-vercel-deployment.md) | Vercel 部署步骤 | 30 分钟 |
| [06-railway-worker.md](./06-railway-worker.md) | Worker 进程部署 | 20 分钟 |
| [07-verification-checklist.md](./07-verification-checklist.md) | 功能和安全验证 | 30 分钟 |
| [08-troubleshooting.md](./08-troubleshooting.md) | 常见问题排查 | 参考 |

---

## 关键决策

| 决策项 | 选择 | 原因 |
|--------|------|------|
| Web 部署平台 | Vercel | Next.js 原生支持，自动 CI/CD |
| 数据库策略 | 独立 Supabase 项目 | 数据隔离，独立配额 |
| Redis | Upstash | Serverless 友好，与 Vercel 集成 |
| Worker 部署 | Railway | 支持 Node.js 长进程，GitHub 集成 |

---

## 环境差异总结

| 项目 | 开发环境 | 生产环境 |
|------|----------|----------|
| 运行时 | `npm run dev` | Vercel Serverless |
| 数据库 | gurubox-dev | gurubox-prod |
| Redis | localhost:6379 | upstash.io:xxxxx |
| Worker | 本地进程 | Railway 容器 |
| 域名 | localhost:3000 | gurubox.ai |

---

## 预计总时间

| 阶段 | 时间 |
|------|------|
| 基础设施准备 | 30 分钟 |
| 代码修改 | 30 分钟 |
| 服务配置 | 20 分钟 |
| 部署与测试 | 60 分钟 |
| **总计** | **约 2.5 小时** |

---

## 获取帮助

如遇到问题，请参考：
- [08-troubleshooting.md](./08-troubleshooting.md) - 常见问题排查
- 项目 CLAUDE.md - 开发环境配置
