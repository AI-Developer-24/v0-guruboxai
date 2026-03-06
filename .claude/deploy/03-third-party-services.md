# 第三方服务配置

本文档涵盖 Google OAuth、AI 提供商等第三方服务的生产配置。

---

## 1. Google OAuth 配置

### 1.1 Google Cloud Console

1. 登录 [Google Cloud Console](https://console.cloud.google.com)
2. 选择项目或创建新项目
3. 进入 **APIs & Services > Credentials**

### 1.2 配置 OAuth 2.0 客户端

找到现有的 OAuth 2.0 客户端 ID，或创建新的：

**类型**: Web application

**已授权的重定向 URI**:

| 用途 | URI |
|------|-----|
| Supabase Auth | `https://gurubox.ai/auth/v1/callback` |
| Google Docs 导出 | `https://gurubox.ai/api/v1/auth/google/callback` |

**⚠️ 注意**: 同时保留开发环境的 URI：
- `http://localhost:3000/auth/v1/callback`
- `http://localhost:3000/api/v1/auth/google/callback`

### 1.3 获取凭证

记录以下信息：

```
GOOGLE_CLIENT_ID=XXXXX.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-XXXXX
```

---

## 2. Supabase Auth 配置

### 2.1 配置 Google Provider

1. 登录 Supabase Dashboard
2. 选择生产项目
3. 进入 **Authentication > Providers**
4. 启用 **Google** provider
5. 填入 Google Cloud Console 获取的 Client ID 和 Secret

### 2.2 配置 Site URL 和 Redirect URLs

在 **Authentication > URL Configuration** 中：

| 配置项 | 值 |
|--------|-----|
| Site URL | `https://gurubox.ai` |
| Redirect URLs | `https://gurubox.ai/**` |

### 2.3 邮件模板（可选）

在 **Authentication > Email Templates** 中自定义：
- 确认邮件
- 密码重置邮件
- 魔法链接邮件

将模板中的 `{{ .SiteURL }}` 替换为生产域名。

---

## 3. AI 提供商配置

### 3.1 OpenAI

1. 登录 [OpenAI Platform](https://platform.openai.com)
2. 进入 **API Keys**
3. 创建或使用现有 API Key

**用量监控**:
- 设置 **Usage Limits** 避免超支
- 配置 **Billing alerts**

### 3.2 Anthropic

1. 登录 [Anthropic Console](https://console.anthropic.com)
2. 进入 **API Keys**
3. 创建 API Key

**注意事项**:
- Anthropic 按输入/输出 token 分别计费
- 建议设置月度预算

### 3.3 阿里云 DashScope

1. 登录 [阿里云 DashScope](https://dashscope.console.aliyun.com)
2. 进入 **API-KEY 管理**
3. 创建 API Key

**注意事项**:
- 国内服务，海外部署可能有延迟
- 建议在 Vercel 选择亚洲区域部署

---

## 4. 用量监控建议

### 4.1 设置预算告警

| 提供商 | 告警阈值 | 配置位置 |
|--------|----------|----------|
| OpenAI | $50/月 | Platform > Billing |
| Anthropic | $50/月 | Console > Billing |
| DashScope | ¥300/月 | 控制台 > 费用中心 |

### 4.2 监控指标

建议监控以下指标：

- API 调用次数
- Token 使用量
- 错误率
- 平均响应时间

---

## 5. 验证清单

完成本步骤后，确认：

- [ ] Google OAuth 已添加生产回调 URL
- [ ] Supabase Auth 已配置 Site URL
- [ ] 所有 AI 提供商 API Key 已配置
- [ ] 用量告警已设置

---

## 下一步

继续 [05-vercel-deployment.md](./05-vercel-deployment.md) 进行 Vercel 部署。
