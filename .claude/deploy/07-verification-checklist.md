# 验证检查清单

本文档提供完整的功能和安全验证清单，确保生产环境正常运行。

---

## 1. 基础设施验证

### 1.1 域名和 SSL

```bash
# 检查 DNS 解析
nslookup gurubox.ai

# 检查 SSL 证书
curl -vI https://gurubox.ai 2>&1 | grep -E "(SSL|TLS|HTTP/2)"

# 检查重定向
curl -I http://gurubox.ai
# 应重定向到 https://
```

- [ ] DNS 解析正确
- [ ] SSL 证书有效
- [ ] HTTP 自动重定向到 HTTPS
- [ ] HTTP/2 已启用

### 1.2 环境变量

```bash
# 检查公开变量
curl https://gurubox.ai | grep -o '__NEXT_DATA__.*' | head -1

# 确保没有敏感变量泄露
# 不应包含: SERVICE_ROLE_KEY, API_KEYS, SECRETS
```

- [ ] 公开变量正确配置
- [ ] 敏感变量未暴露到客户端

---

## 2. 认证功能验证

### 2.1 Google OAuth 登录

测试步骤：
1. 访问 `https://gurubox.ai`
2. 点击 "Sign in with Google"
3. 选择 Google 账号
4. 验证重定向回应用

- [ ] OAuth 弹窗正常显示
- [ ] 登录成功后重定向正确
- [ ] 用户信息正确显示
- [ ] Session 保持正常

### 2.2 登出功能

测试步骤：
1. 登录后点击用户头像
2. 点击 "Sign out"
3. 验证已登出状态

- [ ] 登出成功
- [ ] Session 已清除
- [ ] 受保护页面无法访问

---

## 3. 核心功能验证

### 3.1 创建分析任务

测试步骤：
1. 登录后进入分析页面
2. 输入测试文本（如 "AI productivity tools"）
3. 选择语言
4. 点击开始分析

- [ ] 任务创建成功
- [ ] 显示任务进度
- [ ] 进度更新正常（6 个阶段）

### 3.2 任务执行（Worker 验证）

检查 Railway 日志：
- [ ] Worker 接收到任务
- [ ] 各阶段正常执行
- [ ] 无错误日志

### 3.3 报告生成

测试步骤：
1. 等待任务完成
2. 查看报告详情
3. 检查机会列表

- [ ] 报告生成成功
- [ ] 包含 300 个机会
- [ ] 机会评分正常
- [ ] 分页功能正常（20/页）

### 3.4 导出功能

测试 PDF 导出：
1. 在报告页面点击 "Export"
2. 选择 PDF 格式
3. 下载并打开

- [ ] PDF 下载成功
- [ ] 内容完整
- [ ] 格式正确

测试 Google Docs 导出（如已配置）：
- [ ] OAuth 授权正常
- [ ] 文档创建成功
- [ ] 内容同步正确

---

## 4. 多语言验证

测试各语言的完整流程：

| 语言 | 代码 | 测试 |
|------|------|------|
| English | en | [ ] |
| 中文 | zh | [ ] |
| Deutsch | de | [ ] |
| Français | fr | [ ] |
| Italiano | it | [ ] |
| Español | es | [ ] |
| Português | pt | [ ] |

验证项：
- [ ] 语言切换正常
- [ ] UI 文本正确翻译
- [ ] 分析结果语言正确
- [ ] 语言偏好保存

---

## 5. 安全验证

### 5.1 RLS 策略测试

```sql
-- 在 Supabase SQL Editor 中测试
-- 以用户 A 的身份查询，应该看不到用户 B 的数据

SET request.jwt.claims.sub = 'user-a-id';
SELECT * FROM reports;
-- 应只返回 user-a-id 的报告
```

- [ ] 用户只能访问自己的报告
- [ ] 用户只能访问自己的任务
- [ ] 跨用户访问被拒绝

### 5.2 API 权限

测试未认证访问：
```bash
# 应返回 401
curl https://gurubox.ai/api/v1/reports
```

- [ ] 未认证请求被拒绝
- [ ] 错误响应格式正确

### 5.3 安全头

```bash
curl -I https://gurubox.ai
```

检查响应头：
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `X-Frame-Options: DENY`
- [ ] `Strict-Transport-Security` 存在

---

## 6. 性能验证

### 6.1 页面加载速度

使用 [PageSpeed Insights](https://pagespeed.web.dev/) 测试：

- [ ] 首页 LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1

### 6.2 API 响应时间

```bash
# 测试 API 延迟
curl -w "Time: %{time_total}s\n" -o /dev/null -s https://gurubox.ai/api/v1/reports
```

- [ ] API 响应 < 500ms

### 6.3 Worker 任务处理

- [ ] 单个任务处理 < 5 分钟
- [ ] 并发任务正常处理
- [ ] 无内存泄漏

---

## 7. 监控配置

### 7.1 Vercel Analytics

- [ ] Analytics 已启用
- [ ] 数据开始收集

### 7.2 错误监控（可选）

- [ ] Sentry 或其他错误监控已配置
- [ ] 告警规则已设置

### 7.3 日志访问

- [ ] Vercel 日志可访问
- [ ] Railway 日志可访问
- [ ] Supabase 日志可访问

---

## 8. 备份和恢复

### 8.1 数据库备份

- [ ] Supabase 自动备份已启用
- [ ] 了解恢复流程

### 8.2 环境变量备份

- [ ] 所有环境变量已离线备份
- [ ] 密钥可恢复

---

## 9. 回归测试

完成以上所有测试后，执行一次完整的端到端测试：

1. [ ] 新用户注册/登录
2. [ ] 创建分析任务
3. [ ] 等待任务完成
4. [ ] 查看报告详情
5. [ ] 浏览机会列表（翻页）
6. [ ] 导出报告
7. [ ] 切换语言
8. [ ] 删除报告
9. [ ] 登出

---

## 10. 上线检查

### 上线前最终确认

- [ ] 所有功能测试通过
- [ ] 安全测试通过
- [ ] 性能指标达标
- [ ] 监控已配置
- [ ] 团队已培训（如有）
- [ ] 回滚计划已准备

### 上线后监控

在上线后的 24 小时内：

- [ ] 检查错误日志
- [ ] 监控 API 使用量
- [ ] 验证用户反馈
- [ ] 检查 AI 提供商用费

---

## 问题记录

| 问题 | 严重程度 | 状态 | 备注 |
|------|----------|------|------|
| | | | |

---

## 下一步

如遇到问题，参考 [08-troubleshooting.md](./08-troubleshooting.md)。
