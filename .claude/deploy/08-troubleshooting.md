# 故障排除指南

本文档涵盖生产环境常见问题和解决方案。

---

## 1. 部署问题

### 1.1 Vercel 构建失败

**症状**: Build failed during `npm run build`

**可能原因**:
1. TypeScript 类型错误
2. 缺少依赖
3. 环境变量缺失

**解决方案**:

```bash
# 本地测试构建
npm run build

# 检查 TypeScript 错误
npx tsc --noEmit
```

检查 `next.config.mjs`：
```javascript
// 确保生产环境不忽略类型错误
typescript: {
  ignoreBuildErrors: false, // 或 process.env.NODE_ENV === 'development'
}
```

### 1.2 环境变量未生效

**症状**: 应用行为异常，提示环境变量缺失

**解决方案**:

1. 在 Vercel Dashboard 检查 **Settings > Environment Variables**
2. 确保变量名完全匹配（区分大小写）
3. 确保勾选了 **Production** 环境
4. 更新变量后需要重新部署

```bash
# 使用 Vercel CLI 检查
vercel env ls
```

---

## 2. 认证问题

### 2.1 Google OAuth 回调失败

**症状**: "Redirect URI mismatch" 错误

**解决方案**:

1. 检查 Google Cloud Console 的授权重定向 URI
2. 确保包含生产 URL：
   - `https://gurubox.ai/auth/v1/callback`
   - `https://gurubox.ai/api/v1/auth/google/callback`
3. 检查 Supabase Auth 配置的 Redirect URLs

### 2.2 Session 丢失

**症状**: 登录后立即登出，或刷新页面后需要重新登录

**可能原因**:
1. `NEXTAUTH_SECRET` 配置错误
2. `NEXTAUTH_URL` 与实际域名不匹配
3. Cookie 设置问题

**解决方案**:

1. 确保 `NEXTAUTH_URL` 与域名匹配：
   ```
   NEXTAUTH_URL=https://gurubox.ai
   ```

2. 重新生成 `NEXTAUTH_SECRET`：
   ```bash
   openssl rand -base64 32
   ```

3. 清除浏览器 Cookie 后重试

### 2.3 Supabase Auth 错误

**症状**: "Invalid API key" 或连接失败

**解决方案**:

1. 检查 Supabase 项目状态
2. 验证 URL 和 API Key 正确
3. 检查项目是否被暂停（免费版闲置会暂停）

---

## 3. Worker 问题

### 3.1 Worker 无法启动

**症状**: Railway 部署失败或立即退出

**解决方案**:

1. 检查 Railway 日志
2. 验证所有必需环境变量已配置
3. 确保 `REDIS_URL` 正确
4. 检查 Node.js 版本兼容性

```bash
# 本地测试 Worker
npm run worker
```

### 3.2 任务积压

**症状**: 任务创建后长时间处于 pending 状态

**诊断**:

```bash
# 检查 Redis 连接
# 在 Upstash Console 中查看连接数

# 检查 Worker 日志
# 在 Railway Dashboard 中查看
```

**解决方案**:

1. 确保 Worker 正在运行
2. 检查 Worker 并发配置
3. 检查 AI API 是否返回错误
4. 考虑增加 Worker 实例

### 3.3 Worker 内存溢出

**症状**: Worker 崩溃，日志显示 "JavaScript heap out of memory"

**解决方案**:

1. 增加 Railway 内存限制
2. 优化任务处理逻辑
3. 检查是否有内存泄漏

```typescript
// 在 worker.ts 中添加内存监控
setInterval(() => {
  const used = process.memoryUsage()
  console.log(`Memory: ${Math.round(used.heapUsed / 1024 / 1024)}MB`)
}, 60000)
```

---

## 4. 数据库问题

### 4.1 RLS 策略阻止访问

**症状**: API 返回空数据或 403 错误

**诊断**:

```sql
-- 在 Supabase SQL Editor 中检查 RLS
SELECT * FROM pg_tables WHERE tablename = 'reports';

-- 检查策略
SELECT * FROM pg_policies WHERE tablename = 'reports';
```

**解决方案**:

1. 确保用户已正确认证
2. 检查 JWT claims 是否包含正确的 user id
3. 验证 RLS 策略语法

### 4.2 连接数超限

**症状**: "too many connections" 错误

**解决方案**:

1. Supabase 免费版限制 60 个连接
2. 使用连接池（Supabase 自动提供）
3. 检查是否有连接泄漏

---

## 5. AI 提供商问题

### 5.1 API 限流

**症状**: 429 Too Many Requests

**解决方案**:

1. 检查 API 用量
2. 设置重试逻辑（已在代码中实现）
3. 考虑升级 API 计划
4. 启用多提供商切换

### 5.2 响应超时

**症状**: 任务执行超时

**解决方案**:

1. 检查网络延迟
2. 增加超时配置
3. 优化 prompt 长度

```typescript
// 在 AI 调用中增加超时
const response = await openai.chat.completions.create({
  // ...
  timeout: 120000, // 2 分钟
})
```

### 5.3 费用异常

**症状**: API 费用超出预期

**解决方案**:

1. 设置用量告警
2. 检查是否有异常调用
3. 优化 token 使用
4. 考虑使用更便宜的模型

---

## 6. Redis 问题

### 6.1 连接失败

**症状**: "Connection refused" 或超时

**解决方案**:

1. 检查 Upstash Redis 状态
2. 验证 `REDIS_URL` 格式正确
3. 确保使用 `rediss://`（TLS）
4. 检查 IP 白名单（如有配置）

### 6.2 内存超限

**症状**: Redis 写入失败

**解决方案**:

1. 检查 Upstash 内存使用
2. 配置淘汰策略
3. 清理旧的任务数据

---

## 7. 性能问题

### 7.1 页面加载慢

**诊断工具**:
- Chrome DevTools Performance
- [PageSpeed Insights](https://pagespeed.web.dev/)
- Vercel Analytics

**解决方案**:

1. 启用 Vercel Image Optimization
2. 检查大型依赖
3. 优化首屏加载
4. 使用 `next/dynamic` 延迟加载

### 7.2 API 响应慢

**解决方案**:

1. 检查数据库查询性能
2. 添加适当的索引
3. 使用分页减少数据量
4. 启用 Vercel Edge Functions（如适用）

---

## 8. 监控和告警

### 8.1 设置 Vercel 告警

1. 进入 **Settings > Notifications**
2. 配置邮件或 Slack 通知
3. 设置部署失败告警

### 8.2 设置 Railway 告警

1. 进入项目 **Settings > Notifications**
2. 配置 Slack/Discord webhook
3. 设置资源使用告警

### 8.3 监控脚本

```bash
#!/bin/bash
# health-check.sh

# 检查 Web 应用
WEB_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://gurubox.ai)
if [ "$WEB_STATUS" != "200" ]; then
  echo "Web app returned $WEB_STATUS"
  # 发送告警
fi

# 检查 Worker
WORKER_STATUS=$(curl -s https://your-railway-app.up.railway.app/health)
if [ "$WORKER_STATUS" != '{"status":"ok"}' ]; then
  echo "Worker health check failed"
  # 发送告警
fi
```

---

## 9. 紧急恢复

### 9.1 回滚部署

**Vercel**:
1. 进入 **Deployments**
2. 找到上一个稳定版本
3. 点击 **...** > **Promote to Production**

**Railway**:
1. 进入 **Deployments**
2. 找到上一个稳定版本
3. 点击 **Rollback**

### 9.2 数据库恢复

1. 在 Supabase Dashboard 进入 **Database > Backups**
2. 选择要恢复的备份
3. 点击 **Restore**

---

## 10. 获取帮助

### 日志收集

收集以下信息以便诊断：

```bash
# Vercel 日志
vercel logs --output raw

# Railway 日志
# 在 Dashboard 中导出

# Supabase 日志
# Dashboard > Logs
```

### 联系支持

| 服务 | 支持渠道 |
|------|----------|
| Vercel | [vercel.com/support](https://vercel.com/support) |
| Supabase | [supabase.com/support](https://supabase.com/support) |
| Railway | [railway.app/help](https://railway.app/help) |
| Upstash | [upstash.com/support](https://upstash.com/support) |

---

## 常见错误代码

| 错误 | 原因 | 解决方案 |
|------|------|----------|
| `500` | 服务器内部错误 | 检查日志，修复代码 |
| `401` | 未认证 | 检查 Session 和 Token |
| `403` | 权限不足 | 检查 RLS 策略 |
| `429` | 请求过多 | 检查 API 限流 |
| `502` | 网关错误 | 检查上游服务状态 |
| `503` | 服务不可用 | 检查服务是否运行 |
