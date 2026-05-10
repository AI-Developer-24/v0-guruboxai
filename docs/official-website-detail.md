# BadgerSignal 官网当前站点总说明与内容审计

> 文档状态：二次重写版  
> 最近更新：2026-05-10  
> 适用范围：官网信息架构、SEO 内容、公开页面、营销转化页面、设计与排版现状、待办事项  
> 本文档只描述当前站点现状与问题审计，不定义最终 UI 排版方案。

## 1. 文档用途

这份文档用于回答一个问题：**BadgerSignal 官网当前到底是什么状态，哪些内容已经存在，哪些内容正在互相重复或抢意图，下一步应该优先修什么。**

后续任何首页重构、SEO 页面补强、导航调整、多语言扩展、视觉精修，都应该先回到本文档确认：

- 当前页面有哪些。
- 每类页面承担什么搜索意图。
- 哪些模块正在重复讲同一件事。
- 哪些内容应该保留在当前页面，哪些应该移动到更合适的页面。
- 哪些事项属于下一轮代码或设计工作，而不是本轮文档规划工作。

## 2. 当前站点一句话判断

BadgerSignal 官网已经具备一个多语言 SEO 站点的基础骨架：有首页、3 个核心工作流页面、guides、comparisons、use cases、public examples，并且已经实现 metadata、canonical、hreflang、sitemap、robots 与本地 SEO 校验脚本。

当前最大问题不再是“页面不够多”，而是：

1. 首页承载了过多解释任务，和核心页、guide 页、example 页之间存在内容重复。
2. 多类页面都在讲“如何选择/如何开始/输出有什么价值”，导致搜索意图边界不够清晰。
3. 子页面模块内容还偏模板化，虽然页面数量完整，但页面之间的内容 ownership 不够强。
4. 新增页面的视觉语言已经接近统一，但中文排版和局部行距仍需要持续 QA。
5. 现有规划文档曾经写了页面模块名称，但对模块具体内容、边界、不能写什么定义不足，容易导致后续落地漂移。

## 3. 当前站点结构概览

### 3.1 公开官网层

当前公开官网主要由以下页面族组成：

- `/en`、`/zh`、`/de`、`/fr`、`/it`、`/es`、`/pt` 首页。
- `/[locale]/ai-startup-idea-generator` 核心工作流页。
- `/[locale]/saas-idea-validation` 核心工作流页。
- `/[locale]/ai-business-opportunity-analysis` 核心工作流页。
- `/[locale]/guides/...` 教程页。
- `/[locale]/comparisons/...` 对比页。
- `/[locale]/use-cases/...` 用例页。
- `/[locale]/examples/...` 公开样例页。

公开官网的主要任务是：

- 承接 Google 自然搜索流量。
- 解释 BadgerSignal 适合解决什么问题。
- 让用户在登录前看到真实输出价值。
- 把用户导向核心产品入口 `Start Analysis`。
- 通过多语言路径覆盖国际化搜索入口。

### 3.2 产品工具层

产品工具区主要承接用户进入产品后的分析流程：

- 用户输入一个方向、想法、市场或业务场景。
- 系统生成或评估多个 AI startup / SaaS / business opportunity。
- 展示 ranking、scoring、workflow、sample report 等结果。
- 登录或授权后可继续保存、导出或深入分析。

当前已明确：**产品工具区中文排版不是本轮文档任务，应该列为下一轮专项处理事项。**

### 3.3 登录、鉴权与后台能力

当前项目包含 Supabase auth 相关逻辑，线上和本地可能出现连接或 token 请求失败问题。之前截图中的 `ERR_CONNECTION_CLOSED` 指向 Supabase auth endpoint，这属于运行环境、网络或 auth 配置层问题，不是 SEO 文档层问题。

从官网规划角度看，公开页面应该尽量做到：

- 登录前可完整浏览。
- 样例页可公开查看。
- `Start Analysis` 可以进入产品流程，但不应让 SEO 页面依赖登录状态才能理解价值。
- 公开页面的 metadata、结构化数据、正文内容应不依赖客户端异步数据才能被搜索引擎读取。

## 4. Current Page Inventory

当前站点共有 **20 个 marketing page groups**。其中 6 个页面组发布 7 种语言，14 个页面组发布英文和中文。

| # | Page group / code key | Route pattern | 页面类型 | 发布语言 | 主要搜索意图 | Primary CTA | 页面角色 |
|---:|---|---|---|---|---|---|---|
| 1 | `home` | `/[locale]` | 首页 / routing page | `en zh de fr it es pt` | 了解产品整体价值并选择下一步 | `Start Analysis` / `View Sample Report` | conversion, routing |
| 2 | `ai-startup-idea-generator` | `/[locale]/ai-startup-idea-generator` | 核心工作流页 | `en zh de fr it es pt` | 从一个方向生成 AI startup ideas | `Start Analysis` | conversion, workflow |
| 3 | `saas-idea-validation` | `/[locale]/saas-idea-validation` | 核心工作流页 | `en zh de fr it es pt` | 判断一个 SaaS idea 是否值得继续 | `Start Analysis` | conversion, validation |
| 4 | `ai-business-opportunity-analysis` | `/[locale]/ai-business-opportunity-analysis` | 核心工作流页 | `en zh de fr it es pt` | 分析业务方向里的 AI opportunity | `Start Analysis` | conversion, workflow |
| 5 | `guides-how-to-validate-an-ai-startup-idea` | `/[locale]/guides/how-to-validate-an-ai-startup-idea` | Guide | `en zh` | 学习如何验证 AI startup idea | `Open validation workflow` | education |
| 6 | `guides-how-to-prioritize-ai-business-opportunities` | `/[locale]/guides/how-to-prioritize-ai-business-opportunities` | Guide | `en zh` | 学习如何给 AI business opportunities 排优先级 | `Open analysis workflow` | education |
| 7 | `guides-how-to-find-an-ai-saas-wedge` | `/[locale]/guides/how-to-find-an-ai-saas-wedge` | Guide | `en zh` | 学习如何找到 AI SaaS wedge | `Open generator` | education |
| 8 | `comparisons-badgersignal-vs-chatgpt-for-startup-idea-validation` | `/[locale]/comparisons/badgersignal-vs-chatgpt-for-startup-idea-validation` | Comparison | `en zh` | 比较 BadgerSignal 与 ChatGPT 在 startup idea validation 场景的适用边界 | `Start Analysis` | comparison |
| 9 | `comparisons-badgersignal-vs-manual-market-research` | `/[locale]/comparisons/badgersignal-vs-manual-market-research` | Comparison | `en zh` | 比较 BadgerSignal 与人工市场研究 | `Start Analysis` | comparison |
| 10 | `comparisons-idea-generator-vs-opportunity-analysis` | `/[locale]/comparisons/idea-generator-vs-opportunity-analysis` | Comparison | `en zh` | 判断 Idea Generator 与 Opportunity Analysis 该用哪个 | `Choose workflow` | comparison, routing |
| 11 | `use-cases-ai-tools-for-recruiters` | `/[locale]/use-cases/ai-tools-for-recruiters` | Use case | `en zh` | 招聘团队寻找 AI 工具机会 | `Explore recruiter workflow` | audience pain, conversion |
| 12 | `use-cases-ai-tools-for-agencies` | `/[locale]/use-cases/ai-tools-for-agencies` | Use case | `en zh` | 代理商寻找可产品化的 AI 服务/工具 | `Explore agency workflow` | audience pain, conversion |
| 13 | `use-cases-ai-tools-for-ecommerce-operators` | `/[locale]/use-cases/ai-tools-for-ecommerce-operators` | Use case | `en zh` | 电商运营团队寻找 AI 自动化机会 | `Explore ecommerce workflow` | audience pain, conversion |
| 14 | `use-cases-ai-tools-for-consultants` | `/[locale]/use-cases/ai-tools-for-consultants` | Use case | `en zh` | 顾问寻找可复用 AI 工作流机会 | `Explore consultant workflow` | audience pain, conversion |
| 15 | `examples-ai-tools-for-freelancers` | `/[locale]/examples/ai-tools-for-freelancers` | Public example | `en zh de fr it es pt` | 查看 freelancer 场景下输出长什么样 | `Start Analysis` | proof |
| 16 | `examples-ai-tools-for-small-business` | `/[locale]/examples/ai-tools-for-small-business` | Public example | `en zh de fr it es pt` | 查看 small business 场景下输出长什么样 | `Start Analysis` | proof |
| 17 | `examples-ai-tools-for-recruiters` | `/[locale]/examples/ai-tools-for-recruiters` | Public example | `en zh` | 查看 recruiter 场景下公开样例报告 | `Start Analysis` | proof |
| 18 | `examples-ai-tools-for-agencies` | `/[locale]/examples/ai-tools-for-agencies` | Public example | `en zh` | 查看 agency 场景下公开样例报告 | `Start Analysis` | proof |
| 19 | `examples-ai-tools-for-ecommerce-operations` | `/[locale]/examples/ai-tools-for-ecommerce-operations` | Public example | `en zh` | 查看 ecommerce operations 场景下公开样例报告 | `Start Analysis` | proof |
| 20 | `examples-ai-tools-for-customer-support-operations` | `/[locale]/examples/ai-tools-for-customer-support-operations` | Public example | `en zh` | 查看 customer support operations 场景下公开样例报告 | `Start Analysis` | proof |

### 4.1 当前语言发布矩阵

| 页面组 | 英文 | 中文 | 德语 | 法语 | 意大利语 | 西班牙语 | 葡萄牙语 |
|---|---:|---:|---:|---:|---:|---:|---:|
| Home | yes | yes | yes | yes | yes | yes | yes |
| 3 core workflow pages | yes | yes | yes | yes | yes | yes | yes |
| Freelancers example | yes | yes | yes | yes | yes | yes | yes |
| Small business example | yes | yes | yes | yes | yes | yes | yes |
| Guides | yes | yes | no | no | no | no | no |
| Comparisons | yes | yes | no | no | no | no | no |
| Use cases | yes | yes | no | no | no | no | no |
| Recruiters / agencies / ecommerce / customer support examples | yes | yes | no | no | no | no | no |

### 4.2 当前多语言策略判断

当前策略是合理的阶段性策略：

- 英文作为主 SEO 内容与国际搜索基础。
- 中文作为第二核心语言，兼顾产品主要使用者与后续中文市场。
- 其他语言先覆盖首页、核心页和两个基础样例页，避免一次性扩展所有 long-tail 页面导致翻译质量和维护成本失控。

需要注意：

- 线上根路径应该根据用户浏览器语言自动跳转或展示对应语言页面。
- `x-default` 应明确指向默认英文或语言选择策略。
- 未来如果扩展 de/fr/it/es/pt 的 guides/use cases/comparisons，需要先确认是否有足够内容质量，而不是机械翻译所有页面。

### 4.3 当前代码 Source of Truth

后续实现不能只看文档里的短页面名，必须以代码里的 `MarketingPageKey` 为准：

| 事项 | 当前 source of truth | 说明 |
|---|---|---|
| Page key 列表 | `lib/seo/metadata.ts` 的 `MARKETING_PAGE_KEYS` | 20 个 page groups 的唯一代码枚举 |
| URL 生成 | `lib/seo/metadata.ts` 的 `PAGE_PATHS` / `getMarketingPagePath` | sitemap、canonical、hreflang、导航和内链都依赖这里 |
| 发布语言 | `lib/seo/metadata.ts` 的 `MARKETING_PAGE_LOCALES` | 决定哪些 locale 允许访问，未发布 locale 会 `404` |
| 页面 route 文件 | `app/[locale]/**/page.tsx` | 每个页面文件通过 `PAGE_KEY` 连接到内容与 metadata |
| 页面内容 | `lib/marketing-content.ts` 和 batch / EU override 文件 | 后续重构内容时最容易改漏的地方 |
| 页面模板 | `components/marketing/marketing-page-templates.tsx` | 当前只有 home / core-like / example 三个模板分支 |

当前必须特别注意：

- Guide / comparison / use case 虽然在内容策略上是不同页面类型，但代码层都属于 `templateKind: 'core'` 并复用 `CoreLandingTemplate`。
- Example 页才使用 `templateKind: 'example'` 和 `PublicExampleTemplate`。
- 首页使用 `templateKind: 'home'` 和 `HomepageTemplate`。
- 如果后续要让 guide / comparison / use case 有真正不同的信息结构，不能只改文案，还要考虑是否拆模板或为 `CoreLandingTemplate` 增加 page-type variant。

## 5. 当前 SEO 实现状态

### 5.1 已具备能力

当前站点已经具备以下 SEO 基础：

- 每个 marketing page group 有独立 metadata。
- 有 canonical URL。
- 有 alternate hreflang。
- 有 sitemap.xml。
- 有 robots.txt。
- 有面向 SEO 页面数量和 locale 矩阵的本地校验脚本。
- 多语言页面路径已按 `/en` 和 `/zh` 等前缀组织。
- 页面正文不是纯客户端空壳，公开页面具备可抓取文本。
- 公开样例页能作为 proof 页面，支持登录前信任建设。

### 5.2 主要 SEO 问题

当前 SEO 问题主要不是技术标签缺失，而是内容意图和页面边界：

| 问题 | 表现 | 风险 |
|---|---|---|
| 首页内容过宽 | 首页同时讲产品 promise、workflow 选择、guide 入门、sample proof、how it works | 首页和子页面互相抢意图，Google 不清楚哪个页面最适合排名 |
| 子页面模板相似 | core / guide / use case / example 之间某些模块都在解释“怎么开始” | 页面差异度不足，长尾页可能被判断为 thin / duplicated intent |
| Example 页容易变教程 | 样例页如果解释过多方法，会和 guide 页冲突 | proof intent 被稀释 |
| Guide 页容易变目录页 | guide 页如果大量列产品入口，会和首页冲突 | education intent 被稀释 |
| Comparison 页容易泛化 | comparison 如果介绍产品太多，会和 core 页冲突 | comparison decision intent 不清晰 |
| OG image 不够定制 | 页面分享图未完全按页面类型区分 | 社交点击率和品牌感不足 |
| Search Console 运营未闭环 | 已部署页面需要持续提交 sitemap、观察 index coverage 和 query | 无法判断真实收录和点击表现 |

### 5.3 当前 SEO 内容层优先级

优先级从高到低：

| 优先级 | 事项 | 原因 |
|---|---|---|
| P0 | 首页去重和内容 ownership 调整 | 首页是所有页面的入口，当前重复会影响整站信息架构 |
| P0 | 子页面内容边界定义 | 避免后续重写时继续产生重复 |
| P1 | 导航重新分组 | 需要让用户和搜索引擎理解 core / guide / comparison / example 的差异 |
| P1 | Example 页 proof 化 | 公开样例是登录前信任的核心 |
| P1 | Guide / comparison 内容补强 | 提升 long-tail SEO 质量 |
| P2 | OG image 和分享预览 | 提升点击和品牌一致性 |
| P2 | Search Console 运维 | 检查收录、query、coverage 和 canonical 状态 |

### 5.4 当前结构化数据语义风险

当前结构化数据已经存在，但 page type 和 schema type 之间并非完全匹配。

| 页面代码类型 | 当前输出 schema | 适配度 | 风险 |
|---|---|---|---|
| `templateKind: 'home'` | `Organization` + `WebSite` | 合理 | 主要风险是 OG image 仍较通用 |
| `templateKind: 'core'` | `BreadcrumbList` + `SoftwareApplication` + `FAQPage` | 对 3 个 core workflow 合理 | Guide / comparison / use case 也复用 core template，因此也会输出 `SoftwareApplication`，语义偏产品页 |
| `templateKind: 'example'` | `BreadcrumbList` + `FAQPage` | 基本合理 | Example 页可后续考虑补充更接近 report / article 的语义，但不是 P0 |

后续实现时应补充一个 schema 决策：

- 3 个核心 workflow 页继续使用 `SoftwareApplication`。
- Guide 页更适合 `Article` / `HowTo` / `FAQPage`，但需要谨慎满足 Google 对 HowTo 的内容要求。
- Comparison 页更适合 `Article` / `FAQPage`，不宜伪装成软件应用页。
- Use case 页更适合 `Article` / `FAQPage` 或保持轻量 `WebPage`，不宜默认当成 software page。
- Example 页可继续 `FAQPage` + `BreadcrumbList`，后续如果内容足够 report-like，可评估 `Article`。

### 5.5 当前全站文案一致性问题：`20+` vs `300`

官网 SEO 页面当前已经基本采用 `20+ evaluated opportunities`，符合之前确认的“不要写死 300，改为 20+”方向。

但真实代码中仍存在多处 `300`：

| 位置 | 当前表现 | 风险 | 处理建议 |
|---|---|---|---|
| 产品工具区 translations | `tool_subtitle`、`stage_generating_desc` 等仍写 `300` | 用户从官网进入工具后感知不一致 | 下一轮产品工具区中文/多语言文案专项一起改 |
| Legal terms | 多语言 terms 中仍写 “up to 300 opportunities” | 法务承诺和营销承诺不一致 | 需要单独确认是否改成更弹性的 `20+` 或 `multiple evaluated opportunities` |
| 常量 | `TOTAL_OPPORTUNITIES = 300` | 产品真实输出目标可能仍是 300 | 如果产品逻辑仍按 300，不应随意改常量；先统一对外表达 |

当前建议：

- 官网营销页继续统一用 `20+ evaluated opportunities`。
- 产品工具区和 legal 文案单独列为下一轮，不在首页 SEO 重构中混改。
- 如果未来产品真实输出从 300 调整为 20+，再同步改常量、工具文案、terms 和报告页。

### 5.6 当前本地 SEO 校验状态

最近一次本地校验结果：

- 命令：`./node_modules/.bin/tsx scripts/validate_multilingual_seo.ts`
- 结果：通过
- 覆盖：`784 checks across 70 published locale-page combinations and 20 page groups`

但需要注意，当前校验脚本仍绑定旧页面结构：

- 首页要求 `supportColumns.length >= 5`。
- 首页要求 `workflowSteps.length === 4`。
- Core-like 页面要求 `diagnosticColumns.length === 3`、`faqItems.length >= 2`、`relatedColumns.length >= 3`。
- Example 页面要求 `supportSnapshots.length === 3`、`opportunityItems.length === 3`。

因此首页重构为 5 个新模块时，必须同步更新校验脚本，否则会出现“内容结构正确但脚本误报失败”的情况。

## 6. 当前网站功能说明

### 6.1 用户公开路径

当前公开用户路径可以概括为：

1. 用户从 Google 或直接访问进入某个语言页面。
2. 用户在首页或子页面理解 BadgerSignal 能帮助评估 AI startup / SaaS / business opportunities。
3. 用户可以选择：
   - 直接 `Start Analysis`。
   - 查看公开样例。
   - 进入某个核心 workflow 页。
   - 阅读 guide / comparison / use case。
4. 用户进入产品工具，输入方向或想法。
5. 用户得到 ranked opportunities / scoring / workflow suggestions / sample report。

### 6.2 当前功能承接问题

当前公开官网和产品工具之间的承接还可以继续优化：

- 首页应更像“选择正确入口的 front door”，而不是把所有工作流细节解释完。
- 核心 workflow 页应更像“这个工具具体怎么判断和输出”的 conversion page。
- Example 页应更像“看结果质量”的 proof page。
- Guide 页应更像“先学方法，再自然连接到工具”的 education page。
- Use case 页应更像“某类用户的场景痛点与机会地图”的 audience page。

## 7. 当前设计与排版状态

### 7.1 已形成的视觉基调

当前新增官网页面已经形成相对统一的视觉语言：

- 浅色背景。
- 蓝色与暖金色渐变。
- 玻璃拟态 / frosted panels。
- 大留白、柔和阴影、细边框。
- 轻量 badge、eyebrow、数字化小组件。
- Hero 区左右结构或居中标题加下方内容。
- 卡片式内容组织。

这个方向与 BadgerSignal 的产品定位基本匹配：理性、轻量、研究感、工具感、不是重 SaaS 黑底风。

### 7.2 当前视觉问题

| 问题 | 具体表现 | 影响 |
|---|---|---|
| 英文首页信息过满 | 多个 section 都在解释选择路径、workflow、输出 | 页面变长但信息层次没有明显增加 |
| Hero visual 与正文 detail 重复 | 首屏右侧 visual 已经讲 workflow，下方又重复讲 workflow | 用户读到后面会感觉重复 |
| 部分卡片层级混乱 | support grid 同时放 core workflow、guide、comparison、example | 用户不清楚这些卡片是不是同一类入口 |
| 中文行距曾有问题 | 中文大标题和多行正文局部仍可能挤压 | 中文页面显得不高级、可读性下降 |
| 产品工具区中文未专项处理 | 官网中文规则尚未扩展到产品工具区 | 从官网进入工具后可能出现体验割裂 |
| 模块高度不一致风险 | 左右结构中一侧内容太少另一侧太密 | 视觉重心失衡 |

### 7.3 中文排版现状

已确认中文需要采用系统兼容优先的字体策略，不引入外部字体依赖作为第一选择。

当前中文排版专项已经处理过一轮，但仍需要继续 QA：

- 大标题行高。
- 两行中文标题的间距。
- 卡片正文行高。
- Hero visual 内短文案的换行。
- 手机端中文标题是否过密。
- 产品工具区中文排版下一轮再处理。

## 8. Sitewide Content Conflict Audit

本节是当前最关键的审计结果。目标不是简单找重复词，而是判断不同页面是否在承接同一个用户问题。

### 8.1 首页 vs 核心 workflow 页：重复讲 workflow

| 项目 | 内容 |
|---|---|
| 冲突位置 | 首页 Hero visual、首页 detail / how it works 区、3 个核心 workflow 页 |
| 冲突原因 | 首页已经解释 input、scoring、ranking、public proof；核心页也解释具体 workflow 如何工作 |
| 应保留页面 | 详细 workflow 判断逻辑应保留在 3 个核心 workflow 页 |
| 首页应调整 | 首页只保留“选择哪个 workflow”的轻量说明，不展开每个 workflow 的判断机制 |
| 后续动作 | 首页保留 3 个核心入口卡片；移除或降级重复的 workflow 细节模块 |

### 8.2 首页 vs Guide 页：重复讲“如何开始”

| 项目 | 内容 |
|---|---|
| 冲突位置 | 首页 support / intent / detail sections、guide pages |
| 冲突原因 | 首页同时在解释“先从哪个页面开始”“如何验证”“如何优先级排序”，这与 guide 的 education intent 重叠 |
| 应保留页面 | 具体方法、步骤、错误、验证框架应保留在 guide 页 |
| 首页应调整 | 首页只保留 `Learn Before You Try` 入口，告诉用户有学习资源，不在首页展开教程 |
| 后续动作 | 首页 guide 入口降级为轻量资源，不抢主 CTA |

### 8.3 首页 vs Example 页：重复讲 proof before login

| 项目 | 内容 |
|---|---|
| 冲突位置 | 首页 hero 文案、sample CTA、support cards、example pages |
| 冲突原因 | 首页多次强调 public sample reports before login，example 页本身就是 proof 页面 |
| 应保留页面 | 具体输出、排名理由、scenario、next validation move 应保留在 example 页 |
| 首页应调整 | 首页只展示 2-3 个样例入口，说明“先看输出质量”，不解释样例细节 |
| 后续动作 | 首页 sample 模块改为 proof gateway，而不是完整 proof 叙述 |

### 8.4 Use case 页 vs Example 页：边界不清

| 项目 | 内容 |
|---|---|
| 冲突位置 | recruiters / agencies / ecommerce use case 与对应 example |
| 冲突原因 | Use case 页如果展示太多输出细节，会变成 example；example 页如果讲太多用户痛点，会变成 use case |
| 应保留页面 | Use case 归属 audience pain、workflow pain、适合的 product wedge；Example 归属输出证明 |
| Use case 应调整 | 强调目标用户、3 个 pain patterns、推荐 workflow、导向哪个 example |
| Example 应调整 | 强调 scenario brief、top opportunities、why ranked high、next validation move |

### 8.5 Comparison 页 vs Core 页：重复解释差异

| 项目 | 内容 |
|---|---|
| 冲突位置 | `comparisons-badgersignal-vs-chatgpt-for-startup-idea-validation`、`comparisons-badgersignal-vs-manual-market-research`、core workflow pages |
| 冲突原因 | Comparison 页解释 BadgerSignal 为什么不同，core 页也容易解释为什么不是 ChatGPT / generic research |
| 应保留页面 | 详细选择判断和 tradeoff 应保留在 comparison 页 |
| Core 页应调整 | Core 页只用一个短模块解释为什么 generic prompting 不够，不展开完整 comparison |
| 后续动作 | Core 页通过 `Why not generic ChatGPT` 模块链接到 comparison，而不是重复比较全文 |

### 8.6 首页内的重复：Support、Intent、Detail 都在做 routing

| 项目 | 内容 |
|---|---|
| 冲突位置 | 首页 `Choose your path`、`Use the right public page`、`How it works` |
| 冲突原因 | 三个 section 都在告诉用户“该先去哪里/怎么开始/怎么选页面” |
| 应保留模块 | 首页只保留一个主 routing 模块：`Pick Your Workflow` |
| 应降级模块 | `Learn Before You Try` 只放 guides / comparisons 的轻量入口 |
| 应删除或重写模块 | `Use the right public page` 不应再作为独立大 section 重复解释路径 |

### 8.7 Hero visual vs Detail section：重复解释产品 motion

| 项目 | 内容 |
|---|---|
| 冲突位置 | 首屏右侧 visual 与下方 detail/how-it-works |
| 冲突原因 | 首屏 visual 已经讲 input、scoring、sample proof，下方又用文字讲同一流程 |
| 应保留页面 | 产品 motion 的详细解释应放 core workflow 页 |
| 首页应调整 | Hero visual 只做价值感和轻量 proof，不承担完整教程 |

### 8.8 Closing CTA vs Hero CTA：重复转化

| 项目 | 内容 |
|---|---|
| 冲突位置 | 首页首屏 CTA 与末尾 CTA |
| 冲突原因 | 末尾 CTA 如果再次完整解释产品，会显得重复 |
| 应保留方式 | Hero CTA 负责第一转化；Closing CTA 只做简短收尾 |
| 后续动作 | Closing CTA 保留一行紧凑价值确认、一个 primary CTA、一个 sample secondary link |

## 9. Current Module-Level Problems

### 9.1 Hero 重复产品 motion

当前首页 Hero 同时承担：

- 产品一句话价值。
- 工作流解释。
- proof before login。
- 入口选择。
- 样例报告承诺。

问题是 Hero 右侧 visual 与后续内容重复，且把本应属于 core workflow 和 example 页的细节提前讲完。

建议：

- Hero 只保留产品 promise、主 CTA、次 CTA、轻量 proof。
- 不在 Hero 中展示完整 workflow 教程。
- 右侧 visual 只做“评估结果感”的视觉证据。

### 9.2 Aside 重复下方卡片标题

当前页面中右侧 aside / steps 列表经常重复下方卡片的标题，例如：

- `AI startup idea generator`
- `SaaS idea validation`
- `AI business opportunity analysis`

问题：

- 视觉上像目录，但下方又出现同样入口。
- 用户会误以为是两个不同导航。
- SEO 内容上重复同一组 anchor 文案。

建议：

- 如果 aside 保留，应承担“当前模块阅读提示”，不能重复卡片标题。
- 首页重构后可移除强 aside，改为更简洁的模块内标签。

### 9.3 Support grid 混放不同内容层级

当前首页 support grid 混合放入：

- 核心 workflow。
- Guide。
- Comparison。
- Example。

问题：

- 用户不知道这些卡片属于同一层级还是不同层级。
- 首页承担过多 routing 任务。
- `core / education / comparison / proof` 的页面角色被混在一起。

建议：

- 首页明确拆成 3 个内容区：
  - `Pick Your Workflow`：只放 3 个 core workflow。
  - `See Sample Output`：只放 2-3 个 examples。
  - `Learn Before You Try`：只放 guides / comparisons 的轻量入口。

### 9.4 Intent section 和 support section 重复解释选择路径

当前首页已经有卡片入口，但又用 intent section 解释：

- Best for。
- Not for。
- Use it when。

问题：

- 这些内容更适合核心 workflow 页。
- 首页的选择路径解释过度。
- 读者从“选择 workflow”进入“如何判断是否适合”时，信息层级跳转不清。

建议：

- 首页不再用完整 Best for / Not for / Use it when。
- 这些内容归属 core workflow pages。

### 9.5 Detail section 和 hero visual 重复解释 workflow

当前 detail section 解释产品如何工作，Hero visual 也解释产品如何工作。

建议：

- 首页 detail section 可删除或压缩为一句“how BadgerSignal thinks”，并链接核心页。
- 详细 input、ranking、scoring、sample proof 归核心 workflow 页。

### 9.6 Closing CTA 重复首屏 CTA

当前 closing CTA 如果继续重复产品全价值，会造成页面结尾疲劳。

建议：

- Closing CTA 只做收束。
- 文案侧重“如果你已经知道方向，现在可以开始分析”。
- 不再重复完整 workflow 和 sample proof 说明。

## 10. Known Content Ownership

这是后续所有内容修改必须遵守的 ownership 规则。

| 内容主题 | 归属页面 | 其他页面如何处理 |
|---|---|---|
| 选择产品工作流 | 首页 | 子页面不再重复讲“全站怎么选”，只链接回首页或相关 comparison |
| 这个 workflow 怎么判断 | 核心 workflow 页 | 首页只做入口卡片，guide 只在方法步骤中轻量引用 |
| 某类用户的痛点是什么 | Use case 页 | Example 页只保留 scenario 背景，不展开痛点分析 |
| 怎么做某件事 | Guide 页 | 首页只放学习入口，core 页只链接 guide |
| A 和 B 怎么选 | Comparison 页 | Core 页只放短说明并链接 comparison |
| 输出长什么样 | Example 页 | 首页只放样例入口，use case 页只链接对应样例 |
| 产品一句话价值 | 首页和各核心页 | 子页面必须根据页面意图重写，不能复制首页 promise |
| 最终转化 | 首页、核心页、相关子页面 | Guide/comparison/example 的 CTA 应服从页面意图，不要全部强推同一句 |

## 11. 当前页面类型边界

### 11.1 Homepage

首页应该是：

- 产品总体 promise。
- 选择正确 workflow 的入口。
- 样例和学习资源的 gateway。
- 轻量 conversion page。

首页不应该是：

- 完整产品教程。
- 完整 guide 列表。
- 完整 example 列表。
- 对比页。
- 每个用户场景的详细解释页。

### 11.2 Core workflow pages

核心页应该是：

- 对某一个核心工作流的详细解释。
- 明确适合谁、不适合谁、什么时候用。
- 展示 input、output、scoring 和结果。
- 把用户转化到 `Start Analysis`。

核心页不应该是：

- 泛泛 SEO landing page。
- 完整 guide。
- 完整 comparison。
- 所有 use cases 的合集。

### 11.3 Guide pages

Guide 页应该是：

- 教方法。
- 解释步骤。
- 说明常见错误。
- 在自然节点连接到 BadgerSignal。

Guide 页不应该是：

- 产品目录。
- 页面入口列表。
- 样例报告详情页。
- 纯 conversion page。

### 11.4 Comparison pages

Comparison 页应该是：

- 做选择判断。
- 给出 verdict。
- 分维度比较。
- 说明 tradeoffs。
- 推荐下一页。

Comparison 页不应该是：

- 泛泛产品介绍。
- 单方面宣传页。
- 工作流教程全文。

### 11.5 Use case pages

Use case 页应该是：

- 讲某类用户的工作流痛点。
- 识别 3 个高频 pain patterns。
- 说明哪些 product wedges 值得看。
- 导向最合适的 workflow 和 example。

Use case 页不应该是：

- 输出样例全文。
- guide 教程全文。
- comparison verdict 页面。

### 11.6 Public example pages

Example 页应该是：

- 证明输出质量。
- 展示具体 scenario。
- 展示 top opportunities。
- 解释 why ranked high。
- 给出 next validation move。

Example 页不应该是：

- 通用 landing page。
- guide 教程。
- 所有功能介绍。
- use case pain analysis。

## 12. 当前导航与内链问题

### 12.1 当前导航问题

当前导航能覆盖核心页面，但从信息架构角度还可以更清晰：

- `Home`
- `Idea Generator`
- `Validation`
- `Opportunity Analysis`
- `Public Examples`

问题：

- Guide、comparison、use case 的入口不够体系化。
- Public Examples 和 use cases 容易被用户混淆。
- 首页 support grid 混放不同类型页面，会加剧导航不清。
- 当前 navbar 没有暴露 guides、comparisons、use cases 入口，只能依赖页面内链和 footer 间接发现。
- 当前 footer 的 marketing 链接只覆盖首页、3 个核心页、freelancers example、small-business example，不覆盖新增的 4 个 example、4 个 use case、3 个 guide、3 个 comparison。
- 当前 `Public Examples` 导航实际链接到 `examples-ai-tools-for-freelancers`，不是一个 examples index page；这在页面数量继续增加后会越来越像“随机跳到某个样例”，不够像导航入口。

### 12.2 建议导航分组

后续可以考虑：

- Product
  - AI Startup Idea Generator
  - SaaS Idea Validation
  - AI Business Opportunity Analysis
- Resources
  - Guides
  - Comparisons
  - Public Examples
- Use Cases
  - Recruiters
  - Agencies
  - Ecommerce Operators
  - Consultants

是否实现下拉导航或资源中心，不属于本文档的代码任务，但应纳入后续 IA 规划。

### 12.3 当前内容源分散问题

当前营销内容不是集中在一个内容文件中，实际来源包括：

| 内容来源 | 作用 | 风险 |
|---|---|---|
| `lib/marketing-content.ts` | 主内容、共享字段、en/zh 大量页面内容 | 文件很大，首页和多个页面内容混在一起，容易改漏 |
| `lib/marketing-content-core-batch3.ts` | Batch 3 core-like 页面 override | Guide / comparison / use case 的一部分内容可能在这里 |
| `lib/marketing-content-core-batch4.ts` | Batch 4 core-like 页面 override | 后续改 use case 内容时要确认是否命中 override |
| `lib/marketing-content-example-batch4.ts` | Batch 4 example override | Customer support example 等内容来源 |
| `lib/marketing-content-core-eu.ts` | EU locales core page override | 其他语言核心页内容，不应在 en/zh 重构中误伤 |
| `lib/marketing-content-example-eu.ts` | EU locales example override | 其他语言样例页内容 |
| `lib/marketing-content-template-eu.ts` | EU template fields | 其他语言模板字段 |

后续实现前必须先确定每一步涉及哪些内容文件，避免出现：

- 页面 shell 是新结构，但 body 仍来自旧 override。
- 英文已更新，中文遗漏。
- en/zh 更新后 EU fallback 被误改。
- 内链改了主文件，但 batch override 里的 related links 仍指向旧路径。

### 12.4 当前营销漏斗埋点能力

站点已经具备一套轻量 marketing funnel tracking：

| 事件 | 覆盖场景 |
|---|---|
| `marketing_cta_click` | Hero、closing、navbar 等 marketing CTA 点击 |
| `marketing_related_link_click` | related section 内链点击 |
| `marketing_locale_switch_click` | marketing navbar 语言切换 |
| `marketing_login_open` | marketing page navbar 打开登录 |
| `auth_google_sign_in_click` | 登录弹窗中的 Google sign-in 点击 |
| `product_login_open` | 产品页未登录用户尝试开始分析 |
| `product_analysis_submit` | 产品页提交分析尝试 |
| `product_analysis_started` | 分析任务创建成功 |

当前埋点的意义：

- 首页重构后可以观察 workflow / sample / learn 三类入口点击分布。
- 子页面边界修正后可以观察 related links 是否把用户导向正确下一页。
- SEO 页面上线后可以结合 Search Console query 和站内点击，判断哪些页面真的在转化。

当前缺口：

- 没有 CTA impression / scroll-depth。
- 没有 login success 作为独立事件。
- 没有 report viewed / export / repeat analysis 的完整生命周期追踪。
- 这些不是首页内容重构的 blocker，但应进入后续增长分析计划。

## 13. Current TODOs

### P0：必须先处理

| 任务 | 说明 | 验收标准 |
|---|---|---|
| 首页结构去重 | 首页从“大杂烩”改为 5 个明确模块 | 首页不再重复 core / guide / example 的详细内容 |
| 内容 ownership 冻结 | 按本文档和 master plan 固化页面职责 | 每个页面类型有明确 primary intent |
| 真实 page key / route 对齐 | 实现时必须使用 `MarketingPageKey` 完整 key，不使用简写名 | 所有文档、代码、内链和校验脚本 key 一致 |
| 模板约束确认 | guide/comparison/use-case 当前复用 `CoreLandingTemplate` | 开工前确认是先内容重组还是先拆 page-type template |
| 首页校验规则同步 | 当前 validation 可能依赖旧模块数量和结构 | 首页重构后校验脚本不误报 |
| 导航重新分组方案 | 先文档确认，再进入实现 | 导航能区分 Product / Resources / Use Cases |

### P1：下一批核心优化

| 任务 | 说明 | 验收标准 |
|---|---|---|
| 核心页内容边界修正 | 每个 core workflow 页只讲一个工作流 | 不再重复首页 routing 和 comparison 全文 |
| Guide 内容补强 | 每篇 guide 明确步骤、错误、连接点 | Guide 不再像产品目录 |
| Comparison 内容补强 | 每篇 comparison 有 verdict、维度、tradeoffs | Comparison 不再像普通 landing page |
| Use case / Example 边界修正 | Use case 讲痛点，Example 讲输出 | 同场景两类页面不再互相复制 |

### P2：体验与运营

| 任务 | 说明 | 验收标准 |
|---|---|---|
| 中文排版继续 QA | 重点检查多行标题、卡片正文、移动端 | 中文页面无明显挤压和行距问题 |
| 产品工具区中文排版 | 下一轮专项处理 | 工具区中文体验与官网一致 |
| `300` 文案一致性审计 | 产品区、legal、translations 仍有 `300` | 对外承诺与官网 `20+` 不冲突 |
| schema 类型校准 | guide/comparison/use-case 当前可能输出 `SoftwareApplication` | 页面类型和 JSON-LD 语义更一致 |
| OG image 定制 | 按页面类型设计 share image | 分享预览不再泛用 |
| Search Console 运营 | 提交 sitemap，观察 coverage 和 query | 有真实收录和点击数据反馈 |

### P3：后续增长

| 任务 | 说明 | 验收标准 |
|---|---|---|
| 新增 SEO 页面规划 | 根据 Search Console 和产品方向选择 | 不新增与现有页面抢意图的页面 |
| 其他语言 long-tail 扩展 | de/fr/it/es/pt 是否扩 guide/use case | 先验证英语/中文内容质量和数据 |
| 资源中心页 | 可聚合 guides/comparisons/examples | 不替代首页，不抢核心页面关键词 |

## 14. 当前风险登记

| 风险 | 等级 | 说明 | 应对 |
|---|---|---|---|
| 首页继续承载过多内容 | 高 | 会让首页和子页面互相抢 SEO intent | 按 5 模块重构首页 |
| 子页面模板化 | 高 | 页面数量多但差异不足 | 每页写具体模块内容规格 |
| 规划与真实 page key 不一致 | 高 | 后续实现可能改错路由或漏改内链 | 所有执行步骤使用 `lib/seo/metadata.ts` 为准 |
| 页面类型与模板不一致 | 高 | Guide/comparison/use-case 在内容规划上不同，但代码同用 core template | 实现前先决定是否拆模板或加 variant |
| Use case 和 Example 混淆 | 中 | 同场景页面可能互相重复 | 固化 use case / example ownership |
| 结构化数据语义偏差 | 中 | Guide/comparison/use-case 可能以 `SoftwareApplication` 输出 | 后续 schema 校准 |
| `20+` 与 `300` 文案冲突 | 中 | 官网、产品区、legal 的承诺不一致 | 分阶段统一对外表达 |
| 中文排版残留问题 | 中 | 影响中文用户第一印象 | 保留中文 QA 专项 |
| 多语言扩展过快 | 中 | 翻译质量和维护成本上升 | 先稳定 en / zh，再扩其他语言 long-tail |
| validation 脚本与新结构不一致 | 中 | 内容重构后测试误判 | 伴随首页代码改动同步更新校验 |
| Search Console 未运营 | 中 | 无法判断真实收录 | 建立上线后检查流程 |

## 15. 当前结论

BadgerSignal 官网已经不是从 0 到 1 的阶段。现在最重要的是从“页面数量完整”进入“内容意图清晰、页面职责清晰、模块不重复”的阶段。

接下来最优先的工作不是继续堆页面，而是：

1. 冻结整站内容 ownership。
2. 重构首页，让首页只承担 front door 和 workflow selection。
3. 修正核心页、guide、comparison、use case、example 的边界。
4. 再进入 UI 排版和视觉实现。
5. 最后根据 Search Console 数据新增页面，而不是凭感觉继续扩张。
