# BadgerSignal 官网页面级实施计划

> 文档状态：待确认版  
> 最近更新：2026-05-10  
> 适用范围：官网所有公开 SEO 页面、导航、页脚、页面级 UI 修改流程  
> 核心规则：每个界面开工前必须先给线框稿、模块布局说明和 SEO/内容边界说明，经确认后才允许动代码。

## 1. 为什么需要这份页面级计划

之前的规划已经解决了“每类页面讲什么、不能讲什么、内容归属在哪里”的问题，但还不够落地。

后续真正改页面时，不能只按“首页一批、core 一批、guide 一批”粗粒度推进。因为每个页面都有自己的：

- 搜索意图。
- 首屏信息密度。
- 模块顺序。
- 左右内容比例。
- CTA 权重。
- 内链责任。
- 中文和移动端排版风险。

因此，本轮实现必须改成页面级流程：

1. 一个页面一个步骤。
2. 同一类页面也不能合并实现。
3. 每个页面先线框稿确认，再写代码。
4. 共享组件改动也必须先说明会影响哪些页面。
5. 先完成所有英文页面，再基于最终英文页面一次性生成多语言页面。
6. 页面完成后单独验证，再进入下一页。

## 2. 绝对执行规则

### 2.1 不经确认不动代码

任何页面级 UI 修改前，必须先输出：

- 页面 code key。
- 页面 route。
- 页面目标。
- 修改范围。
- Desktop wireframe。
- Mobile wireframe。
- 模块顺序。
- 每个模块的内容责任。
- 每个模块的视觉/排版说明。
- SEO 注意点。
- 预期影响的文件。
- 验收方式。

用户确认后，才允许进入该页面代码修改。

### 2.2 一个页面一个实现任务

即使同一件事要应用到多个页面，也必须拆开：

- 不能一次性改 3 个 core pages。
- 不能一次性改 3 个 guides。
- 不能一次性改 6 个 examples。
- 不能一次性把一个新卡片样式应用到所有页面。

正确做法：

1. 先选一个页面做线框稿。
2. 确认。
3. 实现。
4. 验证。
5. 再进入下一个页面。

### 2.3 共享组件修改规则

如果某个页面修改需要调整共享组件，例如：

- `HomepageTemplate`
- `CoreLandingTemplate`
- `PublicExampleTemplate`
- `MarketingNarrativeSection`
- `MarketingBalancedFeatureGrid`
- `MarketingSectionAside`

必须先说明：

- 为什么不能只改内容。
- 这个组件被哪些页面使用。
- 本次组件改动是否会影响未确认页面。
- 是否需要 feature variant，避免全站被动变化。

原则：

- 优先新增 variant，不直接改坏所有页面。
- 先在一个页面试点。
- 试点确认后，再逐页应用。

### 2.4 页面完成定义

一个页面完成必须同时满足：

- 内容符合该页面 ownership。
- 页面模块顺序与确认线框一致。
- Desktop 视觉可用。
- Mobile 视觉可用。
- 英文页面先完成并确认。
- 相关内链正确。
- SEO validation 不失败。
- 如有截图要求，必须截图复核。

### 2.5 English-first 多语言生成规则

这是后续实现的硬规则：

- 所有页面先只以英文为 canonical source 完成内容、结构、排版、模块样式和 SEO 意图。
- 在 20 个英文页面全部确认前，不逐页修改中文或其他语言正文。
- 共享模板样式可能会影响所有 locale，但内容重写、模块文案、metadata 改写先以英文为准。
- 英文页面全部通过后，再基于最终英文页面一次性生成中文和其他已发布语言页面。
- 多语言生成不是机械翻译，必须保留页面结构、模块意图、SEO intent 和本地化表达。
- 多语言生成阶段需要单独做中文排版 QA 和其他语言 smoke check。

例外：

- 如果某次共享组件改动会导致中文或其他语言页面明显破版，可以做最低限度兼容修复。
- 这种兼容修复不能改写非英文页面内容，只能修布局或防破版。

## 3. 每个页面开工前的线框稿模板

每个页面开始前，先按这个格式提交给用户确认。

```text
页面：
Code key：
Route：
本次目标：

Desktop wireframe：
[ASCII 线框或 Mermaid / 简图]

Mobile wireframe：
[窄屏模块顺序和折叠方式]

模块清单：
1. Hero
   - 内容：
   - 布局：
   - CTA：
   - SEO：

2. Module name
   - 内容：
   - 布局：
   - CTA / links：
   - 不允许出现：

视觉说明：
- 信息密度：
- 卡片风格：
- 左右结构是否使用：
- 是否需要 visual：
- 中文排版注意：

预计改动文件：
- ...

验收方式：
- ...
```

用户明确确认后，才能进入代码修改。

## 4. 页面级任务总览

### Phase A：执行前基线

#### A1. 文档冻结确认

任务：

- 确认本页面级计划与 `official-website-master-plan.md` 一起作为后续实现依据。
- 确认每个页面都需要线框稿门禁。

验收：

- 用户回复确认。

#### A2. 当前状态基线

任务：

- 记录 `git status`。
- 运行 `validate_multilingual_seo.ts`。
- 截图当前 `/en`、`/zh` 首页。
- 记录当前页面模板和内容来源。

验收：

- 有可对比和可回滚参考。

## 5. 导航和全局框架任务

导航和页脚不是单个 SEO 页面，但它们是界面，也必须先出线框稿。

### N1. Navbar 线框稿

任务：

- 画出 desktop navbar。
- 画出 mobile menu。
- 说明 Product / Resources / Use Cases 是否使用下拉或分组。
- 说明未发布 locale 页面如何避免死链。

确认后实现：

- 修改 navbar。
- 验证所有 locale 的导航链接。

### N2. Footer 线框稿

任务：

- 画出 footer 分组。
- 确认是否加入 guides / comparisons / use cases / more examples。
- 控制 footer 不变成 sitemap。

确认后实现：

- 修改 footer。
- 验证链接和移动端布局。

## 6. 首页页面级任务

### H1-W. 首页 `/[locale]` 线框稿

Code key：`home`  
Routes：`/en`、`/zh`、`/de`、`/fr`、`/it`、`/es`、`/pt`

任务：

- 画出首页 5 模块结构。
- Hero 标题、视觉、CTA、proof strip 的布局说明。
- Pick Your Workflow 的 3 卡片布局。
- See Sample Output 的 2-3 个样例入口布局。
- Learn Before You Try 的轻量资源布局。
- Final CTA 的收尾样式。

必须确认：

- 首页是否继续使用大 hero visual。
- 首页下方是否继续使用左右结构。
- 每个模块是否需要 aside。
- 中文标题和移动端标题行数。

### H1-I. 首页实现

前置条件：

- H1-W 已确认。

任务：

- 先改英文首页内容。
- 改首页模板。
- 更新首页 validation shape。
- 先检查 `/en`。
- 非英文内容等 English-first 阶段完成后再统一生成。

验收：

- 首页不再重复讲 core / guide / example 的详细内容。
- 首页模块和确认线框一致。
- SEO validation 通过。

## 7. Core Workflow 页面级任务

### C1-W. AI Startup Idea Generator 线框稿

Code key：`ai-startup-idea-generator`  
Route：`/[locale]/ai-startup-idea-generator`

任务：

- 画出该页面的 Hero、Best for、What you get、Input/Output、Why not ChatGPT、Proof、FAQ、CTA。
- 说明如何避免和首页重复。
- 说明是否继续用现有 `CoreLandingTemplate` 或新增 variant。

### C1-I. AI Startup Idea Generator 实现

前置条件：

- C1-W 已确认。

验收：

- 页面只讲 idea generation，不讲完整 validation 或全站 routing。

### C2-W. SaaS Idea Validation 线框稿

Code key：`saas-idea-validation`  
Route：`/[locale]/saas-idea-validation`

任务：

- 画出 validation 页模块。
- 说明 verdict / risk / assumption / next test 如何展示。
- 说明和 guide `guides-how-to-validate-an-ai-startup-idea` 的边界。

### C2-I. SaaS Idea Validation 实现

前置条件：

- C2-W 已确认。

验收：

- 页面聚焦一个 SaaS idea 的验证，不变成 idea generator。

### C3-W. AI Business Opportunity Analysis 线框稿

Code key：`ai-business-opportunity-analysis`  
Route：`/[locale]/ai-business-opportunity-analysis`

任务：

- 画出 opportunity map / scoring / prioritization 的页面结构。
- 说明如何链接 ecommerce / customer support examples。
- 说明和 manual research comparison 的边界。

### C3-I. AI Business Opportunity Analysis 实现

前置条件：

- C3-W 已确认。

验收：

- 页面聚焦 opportunity prioritization，不变成泛市场研究页。

## 8. Guide 页面级任务

### G1-W. Validate an AI Startup Idea Guide 线框稿

Code key：`guides-how-to-validate-an-ai-startup-idea`  
Route：`/[locale]/guides/how-to-validate-an-ai-startup-idea`

任务：

- 画出 how-to guide 样式。
- 明确步骤框架、常见错误、产品连接点。
- 说明如何在现有 core-like template 内表现 guide，或是否需要 guide variant。

### G1-I. Validate an AI Startup Idea Guide 实现

前置条件：

- G1-W 已确认。

验收：

- 页面像教程，不像产品目录。

### G2-W. Prioritize AI Business Opportunities Guide 线框稿

Code key：`guides-how-to-prioritize-ai-business-opportunities`  
Route：`/[locale]/guides/how-to-prioritize-ai-business-opportunities`

任务：

- 画出 prioritization guide 的步骤和 scoring 视觉。
- 明确和 opportunity analysis core page 的边界。

### G2-I. Prioritize AI Business Opportunities Guide 实现

前置条件：

- G2-W 已确认。

验收：

- 页面教排序方法，不抢 core workflow 转化。

### G3-W. Find an AI SaaS Wedge Guide 线框稿

Code key：`guides-how-to-find-an-ai-saas-wedge`  
Route：`/[locale]/guides/how-to-find-an-ai-saas-wedge`

任务：

- 画出从 broad market 到 wedge 的教学结构。
- 明确和 idea generator 的边界。

### G3-I. Find an AI SaaS Wedge Guide 实现

前置条件：

- G3-W 已确认。

验收：

- 页面教 wedge discovery，不变成 idea list。

## 9. Comparison 页面级任务

### P1-W. BadgerSignal vs ChatGPT 线框稿

Code key：`comparisons-badgersignal-vs-chatgpt-for-startup-idea-validation`  
Route：`/[locale]/comparisons/badgersignal-vs-chatgpt-for-startup-idea-validation`

任务：

- 画出 verdict、comparison table、when to use each、tradeoffs、next page。
- 说明如何避免攻击式对比。

### P1-I. BadgerSignal vs ChatGPT 实现

前置条件：

- P1-W 已确认。

验收：

- 页面给出清晰选择判断，不像普通产品页。

### P2-W. BadgerSignal vs Manual Market Research 线框稿

Code key：`comparisons-badgersignal-vs-manual-market-research`  
Route：`/[locale]/comparisons/badgersignal-vs-manual-market-research`

任务：

- 画出 “先结构化收窄，再人工深挖” 的对比结构。
- 说明 tradeoffs 和 next workflow。

### P2-I. BadgerSignal vs Manual Market Research 实现

前置条件：

- P2-W 已确认。

验收：

- 页面不宣称替代所有人工调研。

### P3-W. Idea Generator vs Opportunity Analysis 线框稿

Code key：`comparisons-idea-generator-vs-opportunity-analysis`  
Route：`/[locale]/comparisons/idea-generator-vs-opportunity-analysis`

任务：

- 画出两个 workflow 的选择树或决策矩阵。
- 明确这是 workflow choice 页，不是首页。

### P3-I. Idea Generator vs Opportunity Analysis 实现

前置条件：

- P3-W 已确认。

验收：

- 页面帮助用户选择两个 workflow，不抢首页全站 routing。

## 10. Use Case 页面级任务

### U1-W. Recruiters Use Case 线框稿

Code key：`use-cases-ai-tools-for-recruiters`  
Route：`/[locale]/use-cases/ai-tools-for-recruiters`

任务：

- 画出 recruiter audience、3 pain patterns、wedges、recommended workflow、example link。

### U1-I. Recruiters Use Case 实现

前置条件：

- U1-W 已确认。

验收：

- 页面讲招聘痛点，不复制 recruiter example 输出。

### U2-W. Agencies Use Case 线框稿

Code key：`use-cases-ai-tools-for-agencies`  
Route：`/[locale]/use-cases/ai-tools-for-agencies`

任务：

- 画出 agency delivery friction、pain patterns、product wedges、example link。

### U2-I. Agencies Use Case 实现

前置条件：

- U2-W 已确认。

验收：

- 页面聚焦代理公司交付摩擦。

### U3-W. Ecommerce Operators Use Case 线框稿

Code key：`use-cases-ai-tools-for-ecommerce-operators`  
Route：`/[locale]/use-cases/ai-tools-for-ecommerce-operators`

任务：

- 画出 catalog、support、returns 三类运营拖拽和对应 wedges。

### U3-I. Ecommerce Operators Use Case 实现

前置条件：

- U3-W 已确认。

验收：

- 页面讲 ecommerce operator pain，不变成 ecommerce example。

### U4-W. Consultants Use Case 线框稿

Code key：`use-cases-ai-tools-for-consultants`  
Route：`/[locale]/use-cases/ai-tools-for-consultants`

任务：

- 画出 consultant discovery、scope、follow-up、roadmap 相关 pain。
- 说明当前没有 consultant example 时如何链接相邻 proof。

### U4-I. Consultants Use Case 实现

前置条件：

- U4-W 已确认。

验收：

- 页面聚焦顾问工作流，不和 freelancers/small business 混淆。

## 11. Public Example 页面级任务

### E1-W. Freelancers Example 线框稿

Code key：`examples-ai-tools-for-freelancers`  
Route：`/[locale]/examples/ai-tools-for-freelancers`

任务：

- 画出 report-like proof 页面。
- 明确 scenario、top opportunities、why ranked high、next validation move。

### E1-I. Freelancers Example 实现

前置条件：

- E1-W 已确认。

验收：

- 页面证明输出质量，不变成 freelancer guide。

### E2-W. Small Business Example 线框稿

Code key：`examples-ai-tools-for-small-business`  
Route：`/[locale]/examples/ai-tools-for-small-business`

任务：

- 画出 small business scenario 和 ranked opportunities。

### E2-I. Small Business Example 实现

前置条件：

- E2-W 已确认。

验收：

- 页面聚焦样例报告，不变成 SMB landing page。

### E3-W. Recruiters Example 线框稿

Code key：`examples-ai-tools-for-recruiters`  
Route：`/[locale]/examples/ai-tools-for-recruiters`

任务：

- 画出 recruiter sample report。
- 说明和 recruiters use case 的边界。

### E3-I. Recruiters Example 实现

前置条件：

- E3-W 已确认。

验收：

- 页面展示输出，不重复讲 audience pain。

### E4-W. Agencies Example 线框稿

Code key：`examples-ai-tools-for-agencies`  
Route：`/[locale]/examples/ai-tools-for-agencies`

任务：

- 画出 agency sample report。
- 强调 ranked output 和 margin/rework reasoning。

### E4-I. Agencies Example 实现

前置条件：

- E4-W 已确认。

验收：

- 页面像样例报告，不像 agency use case。

### E5-W. Ecommerce Operations Example 线框稿

Code key：`examples-ai-tools-for-ecommerce-operations`  
Route：`/[locale]/examples/ai-tools-for-ecommerce-operations`

任务：

- 画出 ecommerce operations sample report。
- 展示 catalog / returns / support opportunities。

### E5-I. Ecommerce Operations Example 实现

前置条件：

- E5-W 已确认。

验收：

- 页面展示 ecommerce operations 输出，不抢 use case。

### E6-W. Customer Support Operations Example 线框稿

Code key：`examples-ai-tools-for-customer-support-operations`  
Route：`/[locale]/examples/ai-tools-for-customer-support-operations`

任务：

- 画出 customer support operations sample report。
- 说明当前没有 customer support use case 时如何回链。

### E6-I. Customer Support Operations Example 实现

前置条件：

- E6-W 已确认。

验收：

- 页面聚焦 support operations 输出和 next validation move。

## 12. 非页面但必须独立确认的任务

### T1. Structured Data 方案确认

任务：

- 先给 schema map。
- 确认 guide/comparison/use-case 是否继续输出 `SoftwareApplication`。

确认后实现。

### T2. Metadata 改写方案确认

任务：

- 按页面逐个列 title / description 修改建议。
- 用户确认后逐页修改。

### T3. `20+` vs `300` 文案方案确认

任务：

- 列出所有 `300` 出现位置。
- 区分营销文案、产品承诺、法律条款、产品真实常量。
- 用户确认后再改。

### T4. 中文排版专项确认

任务：

- 官网中文页面和产品工具区中文页面分开处理。
- 每个页面先截图分析，再提出局部调整。

## 13. 推荐执行顺序

推荐从风险最低、影响最大的页面开始：

1. A1 文档冻结确认。
2. A2 当前状态基线。
3. H1-W `/en` 首页线框稿。
4. H1-I `/en` 首页实现。
5. N1 Navbar 线框稿与英文导航实现。
6. N2 Footer 线框稿与英文页脚实现。
7. C1-W / C1-I：`/en/ai-startup-idea-generator`。
8. C2-W / C2-I：`/en/saas-idea-validation`。
9. C3-W / C3-I：`/en/ai-business-opportunity-analysis`。
10. G1-W / G1-I：`/en/guides/how-to-validate-an-ai-startup-idea`。
11. G2-W / G2-I：`/en/guides/how-to-prioritize-ai-business-opportunities`。
12. G3-W / G3-I：`/en/guides/how-to-find-an-ai-saas-wedge`。
13. P1-W / P1-I：`/en/comparisons/badgersignal-vs-chatgpt-for-startup-idea-validation`。
14. P2-W / P2-I：`/en/comparisons/badgersignal-vs-manual-market-research`。
15. P3-W / P3-I：`/en/comparisons/idea-generator-vs-opportunity-analysis`。
16. U1-W / U1-I：`/en/use-cases/ai-tools-for-recruiters`。
17. U2-W / U2-I：`/en/use-cases/ai-tools-for-agencies`。
18. U3-W / U3-I：`/en/use-cases/ai-tools-for-ecommerce-operators`。
19. U4-W / U4-I：`/en/use-cases/ai-tools-for-consultants`。
20. E1-W / E1-I：`/en/examples/ai-tools-for-freelancers`。
21. E2-W / E2-I：`/en/examples/ai-tools-for-small-business`。
22. E3-W / E3-I：`/en/examples/ai-tools-for-recruiters`。
23. E4-W / E4-I：`/en/examples/ai-tools-for-agencies`。
24. E5-W / E5-I：`/en/examples/ai-tools-for-ecommerce-operations`。
25. E6-W / E6-I：`/en/examples/ai-tools-for-customer-support-operations`。
26. T1 Schema。
27. T2 English metadata。
28. M1 基于英文生成中文页面。
29. M2 基于英文生成已发布的其他语言页面。
30. M3 多语言页面 QA。
31. T3 `20+` vs `300`。
32. T4 中文排版专项。

## 14. 多语言生成阶段

### M1. 基于英文生成中文页面

前置条件：

- 20 个英文页面全部确认。
- 英文导航、页脚、内链、metadata、schema 已稳定。

任务：

- 基于最终英文页面统一生成中文内容。
- 保持模块结构和 SEO intent 一致。
- 避免机械直译，中文要自然、简洁、适合网页阅读。

验收：

- `/zh` 和所有已发布中文页面内容完整。
- 中文页面没有明显行距、标题换行、卡片密度问题。

### M2. 基于英文生成其他已发布语言页面

前置条件：

- M1 完成。
- 确认其他语言发布范围仍为当前 `MARKETING_PAGE_LOCALES`。

任务：

- 基于最终英文页面生成 de/fr/it/es/pt 已发布页面。
- 仅生成当前已发布 locale-page combinations，不新增未发布 long-tail 页面。

验收：

- 其他语言页面不缺模块。
- 未发布 long-tail locale 仍保持 404。

### M3. 多语言页面 QA

任务：

- 运行 SEO validation。
- 抽查 `/zh`、`/de`、`/fr`、`/it`、`/es`、`/pt` 首页。
- 抽查其他语言 core/example 页面。
- 检查 hreflang、localized internal links、metadata、移动端换行。

验收：

- SEO validation 通过。
- 多语言页面无明显破版。
- 中文页面通过重点视觉 QA。

## 15. 确认规则

后续我不能直接说“开始下一步”就改代码。每个页面必须按以下顺序：

1. 我输出该页面线框稿。
2. 我解释每个模块的样式、布局、内容和 SEO 边界。
3. 你确认或要求调整。
4. 只有确认后，我才修改代码。
5. 修改后我验证，并进入下一页面线框稿。

如果你只说“下一步”，默认只进入下一个页面的线框稿，不直接进入代码实现。
