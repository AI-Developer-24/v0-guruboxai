# BadgerSignal 官网整站内容规划与模块内容规格

> 文档状态：二次重写版  
> 最近更新：2026-05-10  
> 适用范围：首页、核心 workflow 页、guide、comparison、use case、public example、导航、内链、后续实现顺序  
> 本文档只确定“做什么、内容包含什么、内容边界是什么”，不确定具体 UI 排版样式。

## 1. 规划目标

本规划用于解决 BadgerSignal 官网当前最核心的问题：**页面已经很多，但页面之间的内容责任、模块边界和搜索意图仍需要彻底梳理。**

本轮规划不做代码，不做视觉稿，不定具体布局。它只负责把以下问题讲清楚：

- 首页到底讲什么，不讲什么。
- 3 个核心 workflow 页分别承担什么转化任务。
- Guide / Comparison / Use Case / Example 的内容边界是什么。
- 每个页面的每个模块应该包含哪些内容。
- 哪些模块之间容易冲突，应该如何避免。
- 后续实现应该按什么顺序推进。

## 2. 总体策略

### 2.1 整站角色

BadgerSignal 官网不是传统工具说明页，而是一个面向搜索流量的 product-led SEO funnel。

它应该让不同用户在不同搜索意图下都能找到正确入口：

- 不知道该从哪开始的人：进入首页。
- 已经知道要生成 idea 的人：进入 `AI startup idea generator`。
- 已经有一个 SaaS idea 的人：进入 `SaaS idea validation`。
- 有一个宽泛市场方向的人：进入 `AI business opportunity analysis`。
- 想学习方法的人：进入 guide。
- 想比较工具或路径的人：进入 comparison。
- 属于某类用户角色的人：进入 use case。
- 想先看输出质量的人：进入 public example。

### 2.2 内容规划原则

1. 每类页面只能承担一种主职责。
2. 一个模块只能回答一个用户问题。
3. 首页不能详细解释子页面已经承接的搜索意图。
4. 子页面不能把首页的全站路由说明再讲一遍。
5. Example 页只证明输出质量，不承担教程职责。
6. Guide 页教方法，不承担产品目录职责。
7. Comparison 页做选择判断，不做泛泛产品介绍。
8. Use case 页讲用户痛点和场景，不展示完整样例报告。
9. Core workflow 页讲具体产品工作流，不做整站导航。
10. Final CTA 只做转化收束，不重复整页解释。

## 3. Global Content Ownership Rules

| 内容类型 | Primary owner | Secondary owner | 其他页面规则 |
|---|---|---|---|
| Product promise | Homepage | Core workflow pages | 子页面必须根据页面意图改写，不复制首页标题 |
| Choose workflow | Homepage | `idea-generator-vs-opportunity-analysis` | Core pages 不重复全站选择逻辑 |
| Idea generation | `ai-startup-idea-generator` | Guide: `how-to-find-an-ai-saas-wedge` | Homepage 只作为入口，comparison 只做选择说明 |
| SaaS validation | `saas-idea-validation` | Guide: `guides-how-to-validate-an-ai-startup-idea` | Example 只展示验证后的输出，不讲完整方法 |
| Opportunity analysis | `ai-business-opportunity-analysis` | Guide: `guides-how-to-prioritize-ai-business-opportunities` | Use case 可链接，但不展开 scoring method |
| Proof before login | Public example pages | Homepage sample module | Core pages 只链接 proof，不复制样例全文 |
| How-to education | Guide pages | Core pages 的 FAQ | Homepage 只放轻量学习入口 |
| Comparison decision | Comparison pages | Core pages 的短说明 | Guide 和 example 不展开完整比较 |
| Audience workflow pain | Use case pages | Example scenario brief | Homepage 不列所有行业痛点 |
| Final conversion | Homepage / Core pages | Relevant child pages | Guide / example / comparison CTA 应轻量且符合页面意图 |

## 4. Cross-Page Audit Matrix

标记说明：

- `primary`：该页面类型应该详细承接该主题。
- `secondary`：可以简要出现，用于上下文或转化。
- `link only`：只放链接或一句话，不展开。
- `avoid`：应避免出现，防止抢意图或重复。

| Content theme | Homepage | Core | Guide | Comparison | Use case | Example |
|---|---|---|---|---|---|---|
| product promise | primary | secondary | link only | secondary | secondary | link only |
| choose workflow | primary | link only | avoid | secondary | link only | avoid |
| idea generation | link only | primary | secondary | secondary | secondary | link only |
| SaaS validation | link only | primary | primary for validation guide | secondary | secondary | link only |
| opportunity analysis | link only | primary | primary for prioritization guide | secondary | secondary | link only |
| proof before login | secondary | link only | link only | link only | link only | primary |
| how-to education | link only | secondary | primary | link only | secondary | avoid |
| comparison decision | link only | link only | link only | primary | link only | avoid |
| audience workflow pain | secondary | secondary | secondary | link only | primary | secondary |
| final conversion | primary | primary | secondary | secondary | secondary | secondary |

### 4.1 Matrix 使用规则

后续写任何模块时，如果某段内容在矩阵里是 `avoid`，就不能展开写。

如果是 `link only`，最多只能出现：

- 一个短句。
- 一个卡片链接。
- 一个 FAQ 链接。
- 一个 CTA secondary link。

如果是 `secondary`，可以解释，但不能超过当前模块的主问题。

如果是 `primary`，才允许作为主 section 详细展开。

## 5. 导航与内链规划

### 5.1 推荐一级导航

推荐把当前导航从“平铺所有重要入口”调整为更清晰的分组：

| 导航组 | 包含页面 | 目的 |
|---|---|---|
| Product | AI Startup Idea Generator、SaaS Idea Validation、AI Business Opportunity Analysis | 承接强转化 workflow 搜索意图 |
| Resources | Guides、Comparisons、Public Examples | 承接学习、比较和 proof 搜索意图 |
| Use Cases | Recruiters、Agencies、Ecommerce Operators、Consultants | 承接行业 / 人群类 long-tail |
| Primary CTA | Start Analysis | 直接进入产品 |

### 5.2 内链原则

- 首页链接到 3 个 core workflow、2-3 个 examples、3-4 个 guides/comparisons。
- Core workflow 页链接到对应 guide、comparison、example。
- Guide 页链接到最自然的 workflow 和一个 proof example。
- Comparison 页链接到被比较的 workflow 和最佳下一页。
- Use case 页链接到一个 core workflow 和一个对应 example。
- Example 页链接回对应 use case 和最相关 workflow。

### 5.3 禁止的内链模式

- 不要在每个页面都塞满所有页面链接。
- 不要在 guide 页底部展示完整产品目录。
- 不要在 example 页里放过多 guide 链接。
- 不要让所有 CTA 都叫同一个动作而不区分页面意图。

## 6. 当前代码落地约束

本规划是内容规划，但后续实现必须尊重当前代码结构。否则会出现“文档说的是 6 类页面，代码实际只有 3 类模板”的落差。

### 6.1 Page key 必须使用真实代码 key

后续所有任务说明、内链、校验和代码修改都必须使用 `lib/seo/metadata.ts` 中的完整 `MarketingPageKey`。

| 页面类型 | 示例显示名 | 真实 code key 示例 |
|---|---|---|
| Guide | validate an AI startup idea | `guides-how-to-validate-an-ai-startup-idea` |
| Guide | prioritize AI business opportunities | `guides-how-to-prioritize-ai-business-opportunities` |
| Comparison | BadgerSignal vs ChatGPT | `comparisons-badgersignal-vs-chatgpt-for-startup-idea-validation` |
| Use case | recruiters | `use-cases-ai-tools-for-recruiters` |
| Example | recruiters sample | `examples-ai-tools-for-recruiters` |

短名称可以用于正文展示，但不能用于执行计划、文件查找、内链生成或 validation。

### 6.2 当前模板现实

当前代码只有 3 个 template branch：

| `templateKind` | React template | 当前承载页面 |
|---|---|---|
| `home` | `HomepageTemplate` | 首页 |
| `core` | `CoreLandingTemplate` | 3 个核心 workflow、3 个 guide、3 个 comparison、4 个 use case |
| `example` | `PublicExampleTemplate` | 6 个 public example |

这意味着：

- Guide / comparison / use case 在内容策略上不同，但代码层现在仍共享 `CoreLandingTemplate`。
- 如果只改内容，不拆模板，那么每类页面仍要适配同一组字段：`diagnosticColumns`、`intentColumns`、`input/output example`、`faqItems`、`relatedColumns`。
- 如果要让 guide / comparison / use case 真的具备独立模块结构，后续需要新增 page-type variant 或拆出独立模板。

### 6.3 推荐落地策略

建议不要第一步就拆所有模板。更稳的顺序是：

1. 先重构首页，因为首页当前重复问题最明显，且首页有独立 `HomepageTemplate`。
2. 同步更新首页 validation shape，避免脚本误报。
3. 再处理导航/页脚和内链，确保新首页结构能导向正确页面。
4. 再进入 core-like 子页面内容边界修正；此时先在现有 `CoreLandingTemplate` 字段内完成。
5. 最后评估 guide / comparison / use case 是否需要独立模板或 page-type variant。

### 6.4 Structured data 实施约束

当前 structured data 输出规则：

- Homepage：`Organization` + `WebSite`。
- Core-like：`BreadcrumbList` + `SoftwareApplication` + `FAQPage`。
- Example：`BreadcrumbList` + `FAQPage`。

后续 schema 优化建议：

- 3 个 core workflow 保留 `SoftwareApplication`。
- Guide 页评估 `Article` / `HowTo` / `FAQPage`。
- Comparison 页评估 `Article` / `FAQPage`。
- Use case 页评估 `Article` / `WebPage` / `FAQPage`。
- Example 页短期保留现状，后续再判断是否加 `Article`。

Schema 调整不是首页去重的 blocker，但在 Phase 5 前必须重新评估。

### 6.5 内容源与校验约束

后续实现前必须确认每一步涉及的文件：

| 任务 | 主要文件 | 注意事项 |
|---|---|---|
| 首页内容重组 | `lib/marketing-content.ts` | en/zh 和 EU template fields 不要混改 |
| 首页模板结构 | `components/marketing/marketing-page-templates.tsx` | 当前 validation 依赖旧字段数量 |
| 子页面内容补强 | `lib/marketing-content.ts`、batch override 文件 | 先定位真实 override 来源 |
| SEO metadata | `lib/seo/metadata.ts` | title/description、canonical、hreflang 都从这里生成 |
| sitemap | `app/sitemap.ts` | 自动从 `MARKETING_PAGE_KEYS x MARKETING_PAGE_LOCALES` 生成 |
| structured data | `lib/seo/structured-data.ts` | 页面类型和 schema 类型需对齐 |
| validation | `scripts/validate_multilingual_seo.ts` | 每次结构调整都要同步校验规则 |

### 6.6 当前已知文案一致性约束

官网营销内容应继续使用：

- `20+ evaluated opportunities`
- 中文对应：`20+ 个经过评估的机会`

但产品区、terms、translations 里仍存在 `300` 表达。该问题应单独列为产品工具区/法务文案专项，不和首页结构重构混在同一步处理。

## 7. SEO Keyword and Metadata Planning

本节补齐页面级 SEO 落地信息。后续写 title、description、H1、internal link anchor 时应参考这里。

| Code key | Primary keyword / intent | Supporting intent | Metadata direction |
|---|---|---|---|
| `home` | AI startup idea generator + opportunity analysis | product discovery, AI business ideas | Broad product promise，不抢任一子页 |
| `ai-startup-idea-generator` | AI startup idea generator | generate AI startup ideas, AI SaaS wedges | 强调从一个方向生成 20+ evaluated ideas |
| `saas-idea-validation` | SaaS idea validation | validate SaaS idea, AI startup validation | 强调投入开发前的风险和 next test |
| `ai-business-opportunity-analysis` | AI business opportunity analysis | prioritize AI opportunities, opportunity map | 强调 ranking、scoring、decision support |
| `guides-how-to-validate-an-ai-startup-idea` | how to validate an AI startup idea | validate startup idea before building | How-to title，避免像产品页 |
| `guides-how-to-prioritize-ai-business-opportunities` | how to prioritize AI business opportunities | rank AI opportunities, opportunity scoring | 方法框架和排序维度 |
| `guides-how-to-find-an-ai-saas-wedge` | how to find an AI SaaS wedge | SaaS wedge discovery, AI SaaS niche | 从宽方向收窄到 wedge |
| `comparisons-badgersignal-vs-chatgpt-for-startup-idea-validation` | BadgerSignal vs ChatGPT for startup idea validation | ChatGPT alternative, structured validation | 直接 verdict，不做泛泛工具介绍 |
| `comparisons-badgersignal-vs-manual-market-research` | BadgerSignal vs manual market research | market research alternative, faster shortlist | 强调先收窄，再人工深挖 |
| `comparisons-idea-generator-vs-opportunity-analysis` | idea generator vs opportunity analysis | which workflow to use | 承接 workflow choice intent |
| `use-cases-ai-tools-for-recruiters` | AI tools for recruiters | recruiting automation ideas | 招聘工作流痛点和 wedges |
| `use-cases-ai-tools-for-agencies` | AI tools for agencies | agency automation, client delivery AI | agency delivery friction |
| `use-cases-ai-tools-for-ecommerce-operators` | AI tools for ecommerce operators | ecommerce operations AI | catalog/support/returns pain |
| `use-cases-ai-tools-for-consultants` | AI tools for consultants | consulting workflow AI | discovery、follow-up、roadmap pain |
| `examples-ai-tools-for-freelancers` | AI tools for freelancers sample report | freelancer AI business ideas | proof/report intent |
| `examples-ai-tools-for-small-business` | AI tools for small business sample report | SMB AI opportunities | proof/report intent |
| `examples-ai-tools-for-recruiters` | AI tools for recruiters sample report | recruiter workflow wedges | proof/report intent |
| `examples-ai-tools-for-agencies` | AI tools for agencies sample report | agency workflow wedges | proof/report intent |
| `examples-ai-tools-for-ecommerce-operations` | AI tools for ecommerce operations sample report | ecommerce AI report | proof/report intent |
| `examples-ai-tools-for-customer-support-operations` | AI tools for customer support operations sample report | support AI workflow report | proof/report intent |

## 8. Homepage Module Content Spec

首页最终只保留 5 个内容模块。首页的职责是 front door，不是百科全书。

### 6.1 Module 1：Hero

| 项目 | 规格 |
|---|---|
| 用户问题 | “这个产品一句话到底帮我做什么？” |
| 模块目标 | 在首屏说明 BadgerSignal 的核心价值，并给出直接开始和先看样例两个入口 |
| 必须包含 | 产品一句话价值；适用对象；`20+ evaluated opportunities` 的轻量 proof；主 CTA `Start Analysis`；次 CTA `View Sample Report` |
| 不允许包含 | 完整 workflow 教程；3 个核心页的详细差异；guide 步骤；comparison verdict；过长样例解释 |
| 推荐链接 | Primary: product start；Secondary: 一个强 proof example |
| CTA | `Start Analysis` / `View Sample Report` |
| 与其他页面边界 | Hero 可以说“turn one direction into ranked opportunities”，但不能解释每个 scoring dimension 的方法论 |

建议内容方向：

- 标题强调从一个方向到可排序机会图。
- 副标题强调登录前可看到公开样例和评估结果。
- Hero visual 只展示结果感，不重复教程。
- 轻量 stats 可保留：`20+ opportunities`、`3 workflows`、`public examples`。

### 6.2 Module 2：Pick Your Workflow

| 项目 | 规格 |
|---|---|
| 用户问题 | “我现在应该从哪个产品工作流开始？” |
| 模块目标 | 只帮助用户在 3 个核心 workflow 中选择 |
| 必须包含 | 3 个 workflow 卡片；每张卡片包含适用问题、输入类型、输出结果、下一步 |
| 不允许包含 | Guide、example、comparison、use case 卡片；完整 Best for / Not for；教程步骤 |
| 推荐链接 | `/ai-startup-idea-generator`、`/saas-idea-validation`、`/ai-business-opportunity-analysis` |
| CTA | 每张卡片使用不同但一致的行动文案，例如 `Explore generator`、`Open validation workflow`、`View opportunity analysis` |
| 与其他页面边界 | 首页只讲“选哪个”，具体怎么判断归 core workflow 页 |

三张卡片内容：

| Workflow | 用户状态 | 应写内容 | 不应写内容 |
|---|---|---|---|
| AI Startup Idea Generator | 我有一个方向，但不知道有哪些 AI 产品切口 | 从一个主题生成多个候选 wedge，并初步排序 | 不展开完整验证方法 |
| SaaS Idea Validation | 我已经有一个 SaaS idea，想知道值不值得继续 | 评估风险、需求强度、可验证下一步 | 不讲所有市场研究方法 |
| AI Business Opportunity Analysis | 我有一个市场或业务流程，想知道哪个机会优先做 | 对多个业务机会进行评分和优先级判断 | 不变成 consulting use case 页面 |

### 6.3 Module 3：See Sample Output

| 项目 | 规格 |
|---|---|
| 用户问题 | “我登录前能不能先看看输出质量？” |
| 模块目标 | 把用户导向公开样例页，用 proof 建立信任 |
| 必须包含 | 2-3 个样例入口；每个样例说明 scenario、输出证明什么、适合谁看 |
| 不允许包含 | 完整样例报告全文；教程步骤；行业痛点长文 |
| 推荐链接 | recruiter example、agency example、freelancer 或 small business example |
| CTA | `View sample report` / `See public example` |
| 与其他页面边界 | 首页只展示样例入口，输出细节归 example 页 |

推荐样例组合：

- Recruiters：证明 BadgerSignal 能把高摩擦招聘流程转成 AI tool opportunities。
- Agencies：证明它能识别可产品化的服务流程。
- Small business 或 freelancers：证明它适用于更广泛的小团队场景。

### 6.4 Module 4：Learn Before You Try

| 项目 | 规格 |
|---|---|
| 用户问题 | “如果我还没准备好开始，有没有先学习的内容？” |
| 模块目标 | 提供轻量 guide / comparison 入口，但不抢主转化 |
| 必须包含 | 2 个 guide、1-2 个 comparison；每个资源只写它回答的问题 |
| 不允许包含 | 完整教程；完整 comparison 表格；所有资源列表 |
| 推荐链接 | validate guide、prioritize guide、BadgerSignal vs ChatGPT、idea generator vs opportunity analysis |
| CTA | `Read guide` / `Compare options` |
| 与其他页面边界 | 首页只做 resource gateway，教育内容归 guide，选择判断归 comparison |

推荐卡片：

- `Guide: validate an AI startup idea`：回答“如何判断一个 AI idea 是否值得继续？”
- `Guide: prioritize AI business opportunities`：回答“多个机会怎么排序？”
- `Comparison: BadgerSignal vs ChatGPT`：回答“为什么不用普通 prompt？”
- `Comparison: idea generator vs opportunity analysis`：回答“两个 workflow 怎么选？”

### 6.5 Module 5：Final CTA

| 项目 | 规格 |
|---|---|
| 用户问题 | “我已经看完了，现在下一步是什么？” |
| 模块目标 | 收尾转化，不重复整页解释 |
| 必须包含 | 一句简短价值确认；primary CTA；secondary proof link |
| 不允许包含 | 重新解释所有 workflow；重复首页 Hero 副标题；长篇 FAQ |
| 推荐链接 | product start；sample example |
| CTA | `Start Analysis` / `View Sample Report` |
| 与其他页面边界 | Final CTA 是动作，不是信息模块 |

## 9. Core Workflow Page Module Content Spec

核心 workflow 页负责转化。每页都应该回答：**这个 workflow 解决哪个具体问题，适合谁，输入什么，输出什么，为什么比 generic prompting 更可靠，下一步怎么开始。**

### 7.1 Shared Core Workflow Template

每个核心页应包含这些模块：

1. Hero。
2. Best for / Not for / Use it when。
3. What you get。
4. Input / Output example。
5. Why not generic ChatGPT。
6. Public proof。
7. FAQ。
8. Final CTA。

### 7.2 AI Startup Idea Generator

页面 key：`ai-startup-idea-generator`  
主搜索意图：AI startup idea generator / generate AI startup ideas from a direction  
页面主问题：**“我有一个方向，但不知道有哪些值得验证的 AI startup ideas。”**

#### Hero

必须讲：

- 从一个 broad direction 生成多个 AI startup ideas。
- 输出不是随机灵感，而是 evaluated opportunities。
- 适合还在探索阶段的人。

不能讲：

- 完整 SaaS validation framework。
- 详细 market research comparison。
- 所有 use case 行业痛点。

#### Best for / Not for / Use it when

| 模块 | 应写内容 |
|---|---|
| Best for | 有主题、有行业、有客户群，但还没有明确产品 wedge 的用户 |
| Not for | 已经有唯一 idea 且只需要验证风险的人，此时更适合 SaaS idea validation |
| Use it when | 想从一个方向快速得到 20+ 候选 ideas，并找到前几个值得深入验证的机会 |

#### What you get

必须列出：

- `20+ evaluated AI startup ideas`。
- 每个 idea 的目标用户和 workflow pain。
- Opportunity score / demand signal / implementation difficulty 等评分维度。
- Ranked shortlist。
- Recommended next validation move。

不应列出：

- 完整商业计划书。
- 财务预测。
- 保证成功的市场结论。

#### Input / Output example

输入示例：

- `AI tools for recruiters`
- `AI SaaS for ecommerce operators`
- `AI automation for agencies`

输出示例应该展示：

- Top 3 opportunities。
- 每个 opportunity 为什么排名靠前。
- 下一步应该验证什么。

#### Why not generic ChatGPT

应短讲：

- ChatGPT 适合发散。
- BadgerSignal 适合把发散结果结构化评分。
- 生成不是终点，ranking 和 next validation 才是价值。

链接：

- `comparisons-badgersignal-vs-chatgpt-for-startup-idea-validation`

#### Public proof

推荐链接：

- `examples-ai-tools-for-recruiters` example。
- `examples-ai-tools-for-freelancers` example。
- `examples-ai-tools-for-agencies` example。

#### FAQ

应覆盖：

- Is this just a random startup idea generator?
- Do I need a fully formed product idea?
- How many ideas will I get?
- Can I use this before logging in?
- How is this different from ChatGPT prompts?

### 7.3 SaaS Idea Validation

页面 key：`saas-idea-validation`  
主搜索意图：SaaS idea validation / validate AI startup idea  
页面主问题：**“我已经有一个 SaaS idea，想知道它是否值得继续。”**

#### Hero

必须讲：

- 输入一个具体 SaaS direction。
- 输出 validation signals、risks、assumptions 和 next tests。
- 帮用户避免在弱 idea 上过早投入。

不能讲：

- 大量生成新 idea。
- 宽泛 opportunity map。
- 所有行业用例。

#### Best for / Not for / Use it when

| 模块 | 应写内容 |
|---|---|
| Best for | 已经有一个明确 SaaS idea，需要判断是否继续的人 |
| Not for | 还没有 idea，只想探索方向的人，应去 idea generator |
| Use it when | 准备写 landing page、做访谈、投开发资源前，需要先检查风险 |

#### What you get

必须列出：

- Idea clarity check。
- Target user and pain assumption。
- Demand / urgency / willingness-to-pay signals。
- Risk flags。
- Validation questions。
- Next experiment。

不应列出：

- 大量 unrelated ideas。
- 完整竞品数据库。
- “一定可行”的结论。

#### Input / Output example

输入示例：

- `A SaaS that helps agencies turn client calls into project briefs`
- `A tool that helps recruiters summarize interviews`

输出示例应该展示：

- Validation verdict。
- Strongest assumption。
- Weakest assumption。
- First test。

#### Why not generic ChatGPT

应短讲：

- Generic prompts 容易给正向鼓励。
- Validation 需要专门检查 failure modes。
- BadgerSignal 把 idea 拆成 user, pain, urgency, workflow, risk。

链接：

- `comparisons-badgersignal-vs-chatgpt-for-startup-idea-validation`
- `guides-how-to-validate-an-ai-startup-idea`

#### Public proof

推荐链接：

- `examples-ai-tools-for-small-business` example。
- `examples-ai-tools-for-agencies` example。
- `examples-ai-tools-for-recruiters` example。

#### FAQ

应覆盖：

- What stage should my idea be in?
- Does BadgerSignal tell me if the idea will succeed?
- What does validation mean here?
- Can I validate a non-AI SaaS idea?
- What should I do after the validation report?

### 7.4 AI Business Opportunity Analysis

页面 key：`ai-business-opportunity-analysis`  
主搜索意图：AI business opportunity analysis / prioritize AI opportunities  
页面主问题：**“我有一个市场、行业或业务流程，想知道哪个 AI opportunity 最值得先做。”**

#### Hero

必须讲：

- 把一个 market / workflow direction 拆成多个可比较 opportunity。
- 输出 ranking 和 prioritization。
- 适合需要做决策排序的人。

不能讲：

- 随机 idea brainstorming。
- 单一 SaaS idea validation 全流程。
- 行业长文报告。

#### Best for / Not for / Use it when

| 模块 | 应写内容 |
|---|---|
| Best for | Founder、operator、consultant、agency strategist 需要在多个机会中排序 |
| Not for | 只想要灵感清单的人，应去 idea generator |
| Use it when | 已经知道领域，但不确定哪个 workflow、用户痛点或 wedge 应该优先 |

#### What you get

必须列出：

- Opportunity map。
- Ranked opportunities。
- Scoring dimensions。
- Workflow pain explanation。
- Recommended first move。
- Risk / effort / value tradeoff。

不应列出：

- 完整市场规模预测。
- 深度投资研究报告。
- 所有行业机会百科。

#### Input / Output example

输入示例：

- `AI opportunities in ecommerce operations`
- `AI tools for customer support operations`
- `AI automation for consulting teams`

输出示例应该展示：

- 机会列表。
- 排名依据。
- 哪个机会适合先验证。
- 哪个机会应该暂缓。

#### Why not generic ChatGPT

应短讲：

- ChatGPT 可以列机会，但难以稳定做排序。
- Opportunity analysis 的价值是把多个机会放到同一套 scoring frame 下比较。
- BadgerSignal 输出的是 decision support，不只是 ideas。

链接：

- `comparisons-badgersignal-vs-manual-market-research`
- `guides-how-to-prioritize-ai-business-opportunities`

#### Public proof

推荐链接：

- `examples-ai-tools-for-ecommerce-operations` example。
- `examples-ai-tools-for-customer-support-operations` example。
- `examples-ai-tools-for-small-business` example。

#### FAQ

应覆盖：

- What kind of business direction can I analyze?
- Is this market research?
- How are opportunities ranked?
- Can I use it for client work?
- What should I do after the report?

## 10. Guide Page Module Content Spec

Guide 页负责教育，不负责强推产品。每篇 guide 的结构应回答：**用户想学什么方法，步骤是什么，常见错误是什么，BadgerSignal 在哪个自然节点出现。**

### 8.1 Shared Guide Template

每篇 guide 应包含：

1. Hero：教程核心问题。
2. Quick answer：给出简短方法框架。
3. Step-by-step framework。
4. Common mistakes。
5. Where BadgerSignal helps。
6. Related workflow。
7. Related example / comparison。
8. FAQ。

### 8.2 Guide：Validate an AI Startup Idea

页面 key：`guides-how-to-validate-an-ai-startup-idea`  
核心问题：**“如何判断一个 AI startup idea 是否值得继续？”**

#### Step framework

必须包含：

1. Define the target user precisely。
2. Name the painful workflow。
3. Check whether the pain is frequent and expensive。
4. Identify current workaround。
5. Look for willingness-to-pay or urgency signals。
6. Design the first validation test。

#### Common mistakes

必须覆盖：

- 把 “interesting AI demo” 当作真实需求。
- 只问朋友是否喜欢，不问是否会付费或切换工作流。
- 太早做产品，太晚验证痛点。
- 忽略现有替代方案。

#### BadgerSignal connection

自然连接点：

- 当用户已经写出 idea 和目标用户后，引导到 `SaaS Idea Validation`。
- BadgerSignal 帮助生成 risk flags、validation questions、next test。

#### Links

- Workflow：`saas-idea-validation`
- Comparison：`comparisons-badgersignal-vs-chatgpt-for-startup-idea-validation`
- Example：`examples-ai-tools-for-small-business` or `examples-ai-tools-for-recruiters`

### 8.3 Guide：Prioritize AI Business Opportunities

页面 key：`guides-how-to-prioritize-ai-business-opportunities`  
核心问题：**“多个 AI business opportunities 之间应该怎么排序？”**

#### Step framework

必须包含：

1. List candidate workflows。
2. Score pain urgency。
3. Score buyer clarity。
4. Score repeatability。
5. Score implementation difficulty。
6. Compare upside vs friction。
7. Pick the first validation target。

#### Common mistakes

必须覆盖：

- 只看市场大小，不看具体 workflow。
- 只看技术可行性，不看购买动机。
- 同时验证太多机会。
- 把 personal excitement 当成 priority。

#### BadgerSignal connection

自然连接点：

- 当用户有多个方向或一个行业范围时，引导到 `AI Business Opportunity Analysis`。
- BadgerSignal 帮助把多个机会放到同一套评分维度下比较。

#### Links

- Workflow：`ai-business-opportunity-analysis`
- Comparison：`comparisons-badgersignal-vs-manual-market-research`
- Example：`examples-ai-tools-for-ecommerce-operations`

### 8.4 Guide：How to Find an AI SaaS Wedge

页面 key：`guides-how-to-find-an-ai-saas-wedge`  
核心问题：**“如何从一个宽泛方向找到足够窄、足够痛的 AI SaaS wedge？”**

#### Step framework

必须包含：

1. Start from a user group or workflow。
2. Find repeated manual work。
3. Identify moments of delay, rework, handoff, or judgment。
4. Narrow from category to wedge。
5. Check if the wedge can become a product。
6. Generate multiple wedge candidates before choosing one。

#### Common mistakes

必须覆盖：

- 从技术能力出发，而不是从 workflow pain 出发。
- Wedge 太宽，比如 “AI for sales”。
- Wedge 太像 feature，不像 product。
- 没有比较多个候选 wedge。

#### BadgerSignal connection

自然连接点：

- 当用户有一个方向但没有具体 wedge，引导到 `AI Startup Idea Generator`。
- BadgerSignal 帮助从一个方向生成多个候选 wedge，并给出排序。

#### Links

- Workflow：`ai-startup-idea-generator`
- Comparison：`comparisons-idea-generator-vs-opportunity-analysis`
- Example：`examples-ai-tools-for-agencies`

## 11. Comparison Page Module Content Spec

Comparison 页负责选择判断，不负责泛泛介绍产品。每篇 comparison 必须给出明确 verdict。

### 9.1 Shared Comparison Template

每篇 comparison 应包含：

1. Hero with verdict。
2. Short answer。
3. Comparison table。
4. When to use A。
5. When to use B。
6. Tradeoffs。
7. Best next page。
8. FAQ。

### 9.2 BadgerSignal vs ChatGPT

页面 key：`comparisons-badgersignal-vs-chatgpt-for-startup-idea-validation`  
核心问题：**“我能不能直接用 ChatGPT 做 AI startup / SaaS idea research？”**

#### Verdict

ChatGPT 适合开放式 brainstorming；BadgerSignal 适合当你需要结构化评分、排序和下一步验证建议。

#### 比较维度

必须包含：

- Prompt effort。
- Consistency。
- Opportunity scoring。
- Ranking。
- Validation next steps。
- Public examples。
- Repeatable workflow。

#### When to use ChatGPT

- 想快速发散。
- 还没有清楚问题。
- 只是想写初稿或改写文案。

#### When to use BadgerSignal

- 需要比较多个机会。
- 需要知道哪个 idea 更值得继续。
- 需要一个可复用的 decision frame。

#### Tradeoffs

- ChatGPT 更灵活，但结果依赖 prompt。
- BadgerSignal 更结构化，但不适合无限开放聊天。

#### Best next page

- `ai-startup-idea-generator`
- `saas-idea-validation`

### 9.3 BadgerSignal vs Manual Market Research

页面 key：`comparisons-badgersignal-vs-manual-market-research`  
核心问题：**“BadgerSignal 能不能替代人工市场研究？”**

#### Verdict

BadgerSignal 不替代深度人工研究；它适合在投入大量人工研究前，先生成和排序值得验证的机会。

#### 比较维度

必须包含：

- Speed。
- Cost。
- Depth。
- Repeatability。
- Opportunity ranking。
- Evidence quality。
- Best stage。

#### When to use manual research

- 已经锁定一个机会。
- 需要客户访谈、竞品深挖、定价验证。
- 需要投资级或咨询级报告。

#### When to use BadgerSignal

- 还在选择方向。
- 有多个机会需要排序。
- 想先得到一份 decision map。

#### Tradeoffs

- Manual research 更深，但慢且贵。
- BadgerSignal 更快，但输出是 early-stage decision support。

#### Best next page

- `ai-business-opportunity-analysis`
- `guides-how-to-prioritize-ai-business-opportunities`

### 9.4 Idea Generator vs Opportunity Analysis

页面 key：`comparisons-idea-generator-vs-opportunity-analysis`  
核心问题：**“我应该用 idea generator 还是 opportunity analysis？”**

#### Verdict

如果你需要更多候选 idea，用 Idea Generator；如果你已经有一个市场或多个方向，需要判断优先级，用 Opportunity Analysis。

#### 比较维度

必须包含：

- Starting input。
- Expected output。
- Best stage。
- Number of opportunities。
- Ranking depth。
- Next action。

#### When to use Idea Generator

- 只有 broad theme。
- 想探索多个 product wedge。
- 不确定有什么机会。

#### When to use Opportunity Analysis

- 已经知道行业或业务流程。
- 有多个机会需要比较。
- 想做优先级判断。

#### Tradeoffs

- Idea Generator 更适合发散。
- Opportunity Analysis 更适合决策。

#### Best next page

- `ai-startup-idea-generator`
- `ai-business-opportunity-analysis`

## 12. Use Case Page Module Content Spec

Use case 页负责用户场景和痛点，不负责展示完整输出。每页应回答：**这类用户为什么需要 BadgerSignal，最常见的 workflow pain 是什么，应该从哪个 workflow 开始。**

### 10.1 Shared Use Case Template

每篇 use case 应包含：

1. Hero：目标用户和主要痛点。
2. Workflow pain overview。
3. Three pain patterns。
4. Product wedges worth exploring。
5. Recommended BadgerSignal workflow。
6. Public example link。
7. FAQ。

### 10.2 AI Tools for Recruiters

页面 key：`use-cases-ai-tools-for-recruiters`  
目标用户：recruiters、recruiting teams、talent operators  
主要 workflow pain：候选人沟通、面试总结、岗位匹配、handoff 信息丢失。

#### 3 个 pain patterns

1. Candidate notes and interview summaries take too long。
2. Hiring-manager handoff creates repeated clarification。
3. Follow-up and pipeline updates are fragmented。

#### Product wedges

- Interview summary assistant。
- Candidate-job fit explainer。
- Recruiter follow-up workflow。
- Hiring manager brief generator。

#### Recommended workflow

- 首选：`ai-startup-idea-generator`，用于生成招聘场景的多个 AI tool wedges。
- 次选：`saas-idea-validation`，用于验证其中一个 recruiter SaaS idea。

#### Example link

- `examples-ai-tools-for-recruiters`

### 10.3 AI Tools for Agencies

页面 key：`use-cases-ai-tools-for-agencies`  
目标用户：agencies、studio owners、client service teams  
主要 workflow pain：客户 brief、交付沟通、反馈整理、复盘与可复用流程。

#### 3 个 pain patterns

1. Client inputs are messy and inconsistent。
2. Feedback loops create rework。
3. Delivery knowledge is trapped in one-off projects。

#### Product wedges

- Client brief generator。
- Feedback-to-task converter。
- Scope risk detector。
- Post-project insight extractor。

#### Recommended workflow

- 首选：`ai-startup-idea-generator`，用于探索 agency workflow wedges。
- 次选：`ai-business-opportunity-analysis`，用于比较多个 agency automation opportunities。

#### Example link

- `examples-ai-tools-for-agencies`

### 10.4 AI Tools for Ecommerce Operators

页面 key：`use-cases-ai-tools-for-ecommerce-operators`  
目标用户：ecommerce operators、DTC teams、marketplace operators  
主要 workflow pain：商品信息、客服、退货、库存和运营例行工作碎片化。

#### 3 个 pain patterns

1. Catalog and product content cleanup is repetitive。
2. Support and returns create high-volume operational drag。
3. Promotions and inventory decisions require many manual checks。

#### Product wedges

- Product listing cleanup assistant。
- Return reason clustering。
- Support triage workflow。
- Promo readiness checker。

#### Recommended workflow

- 首选：`ai-business-opportunity-analysis`，用于比较多个运营机会。
- 次选：`saas-idea-validation`，用于验证单个 ecommerce SaaS idea。

#### Example link

- `examples-ai-tools-for-ecommerce-operations`

### 10.5 AI Tools for Consultants

页面 key：`use-cases-ai-tools-for-consultants`  
目标用户：consultants、independent advisors、boutique consulting teams  
主要 workflow pain：客户诊断、资料整理、建议输出、重复交付模板化。

#### 3 个 pain patterns

1. Discovery notes are hard to turn into structured recommendations。
2. Client-specific deliverables repeat similar analysis patterns。
3. Follow-up work is often lost after the engagement。

#### Product wedges

- Discovery-to-roadmap assistant。
- Client opportunity map generator。
- Workshop synthesis tool。
- Follow-up action planner。

#### Recommended workflow

- 首选：`ai-business-opportunity-analysis`，用于为客户场景排序机会。
- 次选：`ai-startup-idea-generator`，用于生成可产品化 consulting tools。

#### Example link

- 当前可链接 `examples-ai-tools-for-small-business` 作为相邻 proof。
- 后续建议新增 consultant-specific public example。

## 13. Public Example Page Module Content Spec

Example 页负责证明输出质量。每页都应围绕一个具体 scenario 展示：**输入是什么，输出了哪些机会，为什么这些机会排名高，下一步怎么验证。**

### 11.1 Shared Example Template

每篇 example 应包含：

1. Scenario brief。
2. Input direction。
3. Top opportunities。
4. Why ranked high。
5. Next validation move。
6. Related workflow。
7. Related use case。
8. CTA。

禁止：

- 不要变成 guide。
- 不要变成 generic landing page。
- 不要讲完整产品目录。
- 不要过度解释“为什么选择 BadgerSignal”，这属于 comparison。

### 11.2 Example：AI Tools for Freelancers

页面 key：`examples-ai-tools-for-freelancers`  
Scenario brief：freelancer 想找到可以减少客户沟通、报价、交付整理的 AI tool opportunities。

#### Top opportunities

- Client brief clarification assistant。
- Proposal and scope generator。
- Post-call recap and action planner。

#### Why ranked high

- 高频重复。
- 用户愿意减少 admin work。
- 输出可以嵌入已有工作流。

#### Next validation move

- 访谈 5-10 个 freelancer，确认哪些 admin tasks 最耗时。
- 用 landing page 测试最痛的一个 wedge。

#### Links

- Workflow：`ai-startup-idea-generator`
- Related use case：未来可新增 freelancer use case；当前可链接 consultants use case 或 small business example。

### 11.3 Example：AI Tools for Small Business

页面 key：`examples-ai-tools-for-small-business`  
Scenario brief：small business owner 想找到能减少日常运营摩擦的 AI automation opportunities。

#### Top opportunities

- Missed lead follow-up assistant。
- Quote / appointment reply assistant。
- Customer question routing。

#### Why ranked high

- 小团队时间稀缺。
- 任务频繁且重复。
- ROI 容易解释。

#### Next validation move

- 先验证 owner 是否愿意把一个高频流程交给工具辅助。
- 收集当前 workaround 和付费意愿。

#### Links

- Workflow：`saas-idea-validation`
- Related use case：consultants 或 ecommerce operators，视具体内容选择。

### 11.4 Example：AI Tools for Recruiters

页面 key：`examples-ai-tools-for-recruiters`  
Scenario brief：recruiting team 想看 BadgerSignal 如何把招聘流程里的摩擦转成 ranked AI opportunities。

#### Top opportunities

- Interview summary assistant。
- Candidate fit explanation tool。
- Hiring-manager update generator。

#### Why ranked high

- 招聘流程高频且信息密集。
- Handoff 成本明显。
- AI 可以减少总结和沟通负担。

#### Next validation move

- 找 recruiter 验证他们最愿意先自动化哪个信息整理任务。
- 对比候选人总结、岗位匹配、follow-up 三个 wedge。

#### Links

- Use case：`use-cases/ai-tools-for-recruiters`
- Workflow：`ai-startup-idea-generator`

### 11.5 Example：AI Tools for Agencies

页面 key：`examples-ai-tools-for-agencies`  
Scenario brief：agency 想看哪些客户交付流程可以变成 AI-assisted product wedges。

#### Top opportunities

- Client brief generator。
- Feedback-to-task converter。
- Delivery risk summary。

#### Why ranked high

- Agency 工作重复但客户上下文复杂。
- 反馈整理和范围控制价值高。
- 产品化潜力强。

#### Next validation move

- 与 agency owner 确认哪个交付节点最常导致返工。
- 用一个 workflow prototype 验证是否减少沟通成本。

#### Links

- Use case：`use-cases/ai-tools-for-agencies`
- Workflow：`ai-business-opportunity-analysis`

### 11.6 Example：AI Tools for Ecommerce Operations

页面 key：`examples-ai-tools-for-ecommerce-operations`  
Scenario brief：ecommerce operator 想看运营流程中哪些 AI opportunities 最值得先验证。

#### Top opportunities

- Product listing cleanup assistant。
- Returns reason clustering。
- Support triage assistant。

#### Why ranked high

- 运营任务高频。
- 数据和文本输入充足。
- 节省时间和降低错误都容易量化。

#### Next validation move

- 先选一个高频任务收集样本数据。
- 验证 AI output 是否能减少人工处理时间。

#### Links

- Use case：`use-cases/ai-tools-for-ecommerce-operators`
- Workflow：`ai-business-opportunity-analysis`

### 11.7 Example：AI Tools for Customer Support Operations

页面 key：`examples-ai-tools-for-customer-support-operations`  
Scenario brief：customer support team 想看如何从支持工单、升级、知识库维护中找到 AI opportunities。

#### Top opportunities

- Ticket triage and routing。
- Complaint clustering。
- Escalation summary generator。

#### Why ranked high

- 工单量大。
- 分类和总结重复。
- 改善响应速度有明确业务价值。

#### Next validation move

- 用真实历史工单样本测试 triage 准确性。
- 确认 support manager 是否愿意采用辅助流程。

#### Links

- Workflow：`ai-business-opportunity-analysis`
- Future use case：建议新增 `use-cases-ai-tools-for-customer-support-teams`

## 14. 页面间冲突修正规则

### 12.1 首页修正规则

必须执行：

- `Pick Your Workflow` 只放 3 个 core workflow。
- `See Sample Output` 只放 example。
- `Learn Before You Try` 只放 guide / comparison。
- 删除或降级重复解释“如何选择页面”的 intent section。
- 删除或压缩重复解释 workflow 的 detail section。
- Final CTA 不再重复 Hero 长文。

### 12.2 Core 页修正规则

必须执行：

- 每个 core 页只讲自己的 workflow。
- `Why not generic ChatGPT` 必须短，并链接 comparison。
- `Public proof` 只链接 example，不复制 example 内容。
- FAQ 只回答 workflow 相关问题。

### 12.3 Guide 页修正规则

必须执行：

- 教程步骤必须具体。
- 产品出现位置必须自然。
- 不要在 guide 中展示完整产品目录。
- 不要把 guide 写成 sales page。

### 12.4 Comparison 页修正规则

必须执行：

- 首屏必须给 verdict。
- 必须有比较维度。
- 必须同时说明两边适用场景。
- 不要把 competitor 或替代方案写成 strawman。

### 12.5 Use case 页修正规则

必须执行：

- 明确目标用户。
- 明确 3 个 workflow pain。
- 明确推荐 workflow。
- 只链接对应 example，不复制样例结果。

### 12.6 Example 页修正规则

必须执行：

- 以 scenario 和输出为中心。
- 展示 top opportunities 和 why ranked high。
- 给 next validation move。
- 不写成 guide。
- 不泛泛介绍所有功能。

## 15. 新增 SEO 页面规划原则

本轮不新增页面，但后续新增页面必须遵守：

1. 先查现有页面是否已经承接该 intent。
2. 如果 intent 已存在，只能优化现有页面，不能新增抢意图页面。
3. 新页面必须明确属于 guide、comparison、use case、example 或 glossary / resource。
4. 新页面必须有唯一 primary keyword 和唯一用户问题。
5. 新页面必须在 matrix 中找到 primary owner 位置。
6. 新页面必须先写 module content spec，再写 UI。

### 13.1 潜在新增页面

| 候选页面 | 类型 | 前置条件 | 风险 |
|---|---|---|---|
| `ai-tools-for-customer-support-teams` | Use case | 已有 customer support example，缺 use case 承接 | 需避免和 ecommerce support 场景重复 |
| `use-cases-ai-tools-for-freelancers` | Use case | 已有 freelancers example，缺 audience pain 页 | 需避免和 consultants 重复 |
| Resource index | Resource hub | guides/comparisons/examples 数量继续增加 | 不能抢首页 routing intent |
| Glossary: AI business opportunity | Glossary | Search Console 出现定义类 query | 内容需避免过薄 |
| Guide: how to score SaaS ideas | Guide | validation guide 数据表现好后扩展 | 需避免和 validation guide 重复 |

## 16. Implementation Sequence

本节是后续真正实现前的拆分计划。当前状态是 **待用户确认，不代表已经开始代码实现**。

更细的页面级执行门禁已拆到独立文档：

- `docs/official-website-page-level-implementation-plan.md`

后续实际执行以该页面级计划为准：每个页面必须先出线框稿、模块样式说明和 SEO 边界说明，经用户确认后才允许动代码。

新增执行规则：

- 所有页面先完成英文版。
- 英文 20 个页面全部确认后，再基于最终英文页面一次性生成中文和其他已发布语言页面。
- 在 English-first 阶段，不逐页改写非英文页面内容；共享模板兼容修复除外。

拆分原则：

- 每一步只改一个相对独立的范围。
- 每一步都有可验证输出。
- 每一步完成后都可以暂停、截图、复核。
- 不把内容、模板、schema、导航、产品工具区文案混在同一步。
- 不把英文页面修改和多语言生成混在同一步。

### Phase A：执行前基线与防漂移

#### A1. 确认文档冻结版本

任务：

- 确认 `official-website-detail.md` 和 `official-website-master-plan.md` 是本轮实现依据。
- 确认所有步骤使用完整 `MarketingPageKey`。

验收：

- 文档中 20 个 page groups 与 `lib/seo/metadata.ts` 一致。
- 用户确认可以进入实现。

#### A2. 建立当前代码基线

任务：

- 记录 `git status`。
- 记录当前 SEO validation 结果。
- 记录当前首页和关键子页面截图。

验收：

- 有可回滚参考。
- `validate_multilingual_seo.ts` 当前通过。

#### A3. 定位内容源

任务：

- 列出首页、3 个 core、3 个 guide、3 个 comparison、4 个 use case、6 个 example 分别来自哪个内容文件。
- 标记 batch override 和 EU override 不应误改的范围。

验收：

- 每个实现步骤都有明确文件范围。

### Phase B：首页去重与 5 模块重组

#### B1. 首页内容字段设计

任务：

- 把现有 homepage 内容映射到 5 个目标模块：Hero、Pick Your Workflow、See Sample Output、Learn Before You Try、Final CTA。
- 决定现有字段是复用、改名、删除还是新增。

验收：

- 首页不再需要 support / intent / detail 三套重复 routing 逻辑。

#### B2. 首页 en 内容重写

任务：

- 只改英文首页内容。
- 去掉重复解释 workflow 的段落。
- 核心入口、样例入口、学习入口分组清晰。

验收：

- 英文首页正文不再混放 core / guide / comparison / example。
- Hero 和 Final CTA 不重复。

#### B3. 首页 zh 内容重写

任务：

- 按英文结构重写中文首页。
- 遵守中文排版语义，避免长句堆叠。

验收：

- 中文首页和英文首页信息一致，但不是机械直译。

#### B4. 首页模板结构调整

任务：

- 让 `HomepageTemplate` 支持新的 5 模块内容。
- 移除旧 intent/detail 重复结构或降级为新模块。

验收：

- 首页 UI 仍保持现有视觉风格。
- 移动端模块顺序合理。

#### B5. 首页 validation 更新

任务：

- 更新 `scripts/validate_multilingual_seo.ts` 中 homepage shape 规则。
- 不再要求旧的 `supportColumns >= 5` 和 `workflowSteps === 4`。

验收：

- SEO validation 通过。
- 校验规则和新首页结构一致。

### Phase C：导航、页脚和首页内链

#### C1. 导航分组方案实现

任务：

- 根据确认方案调整 navbar。
- 优先让用户能区分 Product / Resources / Use Cases。

验收：

- 导航不再只暴露 core pages 和一个 examples 入口。
- 未发布 locale 不会出现不可访问链接。

#### C2. 页脚链接补强

任务：

- 更新 footer，让新增页面至少有合理入口。
- 避免 footer 变成全站 sitemap。

验收：

- Footer 能支持核心 SEO 页面发现。
- 链接数量和信息层级可控。

#### C3. 首页模块内链校准

任务：

- Workflow 模块只链接 3 个 core。
- Sample 模块只链接 examples。
- Learn 模块只链接 guides / comparisons。

验收：

- 首页内链符合 content ownership matrix。

### Phase D：子页面内容边界修正

#### D1. Core workflow 页面内容边界

任务：

- 修正 3 个 core workflow 页。
- 保留 workflow 解释、input/output、why not generic ChatGPT、proof links。
- 删除全站 routing 口吻。

验收：

- 每个 core 页只回答自己的 workflow 问题。

#### D2. Guide 页面内容补强

任务：

- 在现有 core-like template 内补强 3 个 guide 的步骤、错误、自然产品连接点。

验收：

- Guide 页像教程，不像产品目录。

#### D3. Comparison 页面内容补强

任务：

- 补强 3 个 comparison 的 verdict、维度、when to use、tradeoffs。

验收：

- Comparison 页像选择判断页，不像泛产品介绍。

#### D4. Use case 页面内容补强

任务：

- 补强 4 个 use case 的 audience、3 个 pain patterns、product wedges、推荐 workflow 和 example。

验收：

- Use case 页不复制 example 输出细节。

#### D5. Example 页面 proof 化

任务：

- 补强 6 个 example 的 scenario、top opportunities、why ranked high、next validation move。

验收：

- Example 页不变成 guide 或 generic landing page。

### Phase E：schema、metadata 与 SEO 技术校准

#### E1. Schema 类型决策

任务：

- 决定 guide / comparison / use case 是否继续使用 `SoftwareApplication`，还是引入 page-type schema。

验收：

- 有明确 schema map。

#### E2. Structured data 实现

任务：

- 按 E1 的 schema map 修改 `lib/seo/structured-data.ts`。

验收：

- 本地结构化数据校验通过。

#### E3. Metadata keyword pass

任务：

- 按 `SEO Keyword and Metadata Planning` 检查 20 个 page groups 的 title / description。

验收：

- Metadata 不互相抢 intent。
- 长度校验通过。

### Phase F：全站文案一致性专项

#### F1. `20+` vs `300` 审计

任务：

- 完整列出产品区、legal、translations 中所有 `300`。
- 区分“产品真实常量”和“对外营销承诺”。

验收：

- 有明确改或不改的清单。

#### F2. 产品工具区文案调整

任务：

- 如果确认修改，统一产品入口和分析阶段文案。

验收：

- 官网进入产品后文案不割裂。

#### F3. Legal 文案调整

任务：

- 如果确认修改，调整 terms 中 “up to 300” 的表述。

验收：

- 法务文案和产品真实能力一致。

### Phase G：中文排版与移动端 QA

#### G1. 中文官网 QA

任务：

- 检查 `/zh` 首页和主要子页面。
- 重点看标题行高、卡片正文、多行中文 CTA、移动端换行。

验收：

- 中文无明显挤压、过密或行高异常。

#### G2. 产品工具区中文 QA

任务：

- 单独检查 `/tools/product-insight`、analysis、report、account。

验收：

- 产品工具区中文体验不再明显低于官网。

### Phase H：最终验证与上线准备

#### H1. 全量本地验证

任务：

- 运行 lint / build / SEO validation。
- 抽查重点页面 rendered HTML。

验收：

- 构建和 SEO validation 通过。

#### H2. 视觉截图复核

任务：

- 截图首页 en/zh desktop/mobile。
- 抽查 core、guide、comparison、use case、example。

验收：

- 页面可上线，不是 demo 感。

#### H3. 部署后验证

任务：

- 检查线上 `/robots.txt`、`/sitemap.xml`。
- 检查关键 URL 200 / 404 策略。
- 提交 Search Console。

验收：

- 线上 sitemap 包含预期页面。
- Search Console 开始记录覆盖状态。

## 17. 文档完成后的验证清单

本轮文档完成后应检查：

- `official-website-detail.md` 覆盖当前站点结构、SEO、功能、设计、排版、现存问题、待办事项。
- `official-website-master-plan.md` 包含整站内容审计矩阵。
- 所有 20 个 page groups 都在规划中被覆盖。
- 所有 page key 和 route 都与 `lib/seo/metadata.ts` 一致。
- 首页模块内容不再和核心页、guide、example 重复。
- 每类页面都有明确 `primary / secondary / link only / avoid` 内容边界。
- 每个页面类型都有模块级内容规格，而不是只有模块名称。
- 文档明确记录 guide / comparison / use case 当前复用 `CoreLandingTemplate` 的代码约束。
- 文档明确记录 structured data、validation、content source、导航/页脚和 `20+` vs `300` 的后续风险。
- 本轮不运行构建，因为只更新文档。

## 18. 最终判断

BadgerSignal 官网下一阶段的关键不是继续增加内容数量，而是让每个页面承担一个清楚任务：

- 首页负责选择入口。
- Core pages 负责转化。
- Guides 负责教育。
- Comparisons 负责选择判断。
- Use cases 负责用户痛点。
- Examples 负责 proof。

只要这个 ownership 稳定下来，后续无论做 SEO 扩页、中文精修、UI 重构、多语言扩展，都会更稳，不会继续陷入“页面很多但内容互相抢”的问题。
