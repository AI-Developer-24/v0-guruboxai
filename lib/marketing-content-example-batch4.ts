import type { PublicExampleTemplateProps } from '@/components/marketing/marketing-page-templates'
import type { SeoLocale } from '@/lib/seo/locales'

type Batch4ExamplePageKey = 'examples-ai-tools-for-customer-support-operations'

type Batch4ExamplePageOverride = Partial<Omit<PublicExampleTemplateProps, 'locale'>>

export const BATCH4_EXAMPLE_PAGE_OVERRIDES: Partial<Record<
  SeoLocale,
  Partial<Record<Batch4ExamplePageKey, Batch4ExamplePageOverride>>
>> = {
  en: {
    'examples-ai-tools-for-customer-support-operations': {
      primaryAction: {
        label: 'Start Analysis',
        href: '/tools/product-insight',
      },
      secondaryAction: {
        label: 'View another sample',
        href: '/en/examples/ai-tools-for-small-business',
        variant: 'outline',
      },
      heroVisualEyebrow: 'Public sample report',
      heroVisualTitle: 'Customer-support operations wedges ranked by queue drag and response clarity',
      heroVisualSteps: ['Support-ops scenario brief', 'Top workflow wedges', 'Recommended next validation move'],
      supportEyebrow: 'Scenario brief',
      supportTitle:
        'AI tools for customer support operations: a public sample report built around triage friction, queue routing, and escalation prep.',
      supportDescription:
        'This sample focuses on support-ops teams handling high ticket volume, inconsistent context, and rising escalation pressure. It frames where the drag repeats, which workflow wedge looks strongest first, and why the top recommendation beats broader support-AI promises.',
      supportSnapshots: [
        {
          label: 'Market slice',
          value: 'Support leads and ops teams under queue pressure',
          description:
            'These teams constantly translate ticket volume, inconsistent context, and escalation risk into routing and response decisions that still depend too much on manual review.',
        },
        {
          label: 'Core pain',
          value: 'Triage and summary work stays manual for too long',
          description:
            'The strongest opportunities appear where teams still summarize cases, cluster complaints, and prepare escalation context by hand while response expectations stay high.',
        },
        {
          label: 'Best first wedge',
          value: 'Ticket summary and routing assistant',
          description:
            'This sample argues that the best entry wedge is the workflow that shortens queue review, improves routing confidence, and creates a clearer response path before support complexity spreads wider.',
        },
      ],
      intentEyebrow: 'How to use this sample',
      intentTitle: 'Use this sample to judge the output quality before you analyze your own support-ops workflow.',
      intentDescription:
        'Public samples help visitors answer one question before login: does the ranking logic feel operationally credible enough to trust with my own queue, triage, and escalation workflow?',
      intentColumns: [
        {
          title: 'Best for',
          description:
            'Visitors who want to inspect the ranking logic, sample output, and recommendation style before running their own customer-support operations direction.',
        },
        {
          title: 'Not for',
          description:
            'Teams that already know their support workflow clearly and want to go straight into analysis without reviewing a sample first.',
        },
        {
          title: 'Use it when',
          description:
            'You want to compare a real support-ops scenario against the product output before deciding whether to analyze your own queue problem.',
        },
      ],
      opportunityEyebrow: 'Opportunity ranking',
      opportunityTitle: 'The strongest support-ops wedge starts with queue clarity, not a generic support copilot.',
      opportunityDescription:
        'These rankings reward repeated triage pain, faster time-to-response, and whether a wedge is narrow enough to earn trust before it expands into a broader service platform.',
      opportunityItems: [
        {
          rank: 'Rank 01',
          title: 'Ticket summary and routing assistant',
          score: '8.9/10',
          description:
            'Summarize incoming tickets, highlight missing context, and route them into the right queue before agents or operations leads spend more manual review time.',
          audience:
            'Support-ops leads and queue managers handling high ticket volume across fragmented inboxes and tools.',
          whyNow:
            'Response pressure is immediate, and teams still lose time deciding what each case is about and where it should go. Faster triage creates a visible operational payoff.',
          nextMove:
            'Validate whether the first product should focus on better summaries, higher-confidence routing, or cleaner escalation signals for edge cases.',
          highlights: [
            'The ROI is visible because it reduces review delay and queue confusion.',
            'The workflow repeats often enough to support a focused first wedge.',
            'It creates a natural expansion path into escalation prep and complaint clustering later.',
          ],
        },
        {
          rank: 'Rank 02',
          title: 'Complaint clustering and pattern review',
          score: '8.3/10',
          description:
            'Group recurring complaint language into structured patterns so support leaders can spot repeated product, billing, or delivery issues faster.',
          audience:
            'Support operations teams that need to learn from large ticket volume without reading every message one by one.',
          whyNow:
            'Complaint data is already rich but messy. Pattern visibility matters, especially when the same friction keeps returning across queues and channels.',
          nextMove:
            'Validate whether teams care more about insight reporting first or whether the stronger first wedge is action tied directly to ticket routing and escalation decisions.',
          highlights: [
            'The workflow is valuable because repeated complaints create visible service and product consequences.',
            'It benefits from structured text patterns that are easier to cluster than to resolve manually.',
            'It may work best after a routing wedge already proves trust.',
          ],
        },
        {
          rank: 'Rank 03',
          title: 'Escalation prep and context assembly workflow',
          score: '7.9/10',
          description:
            'Prepare a clean escalation brief by pulling conversation context, repeated signals, and next-step recommendations into one operator-ready handoff.',
          audience:
            'Support leads and senior agents who repeatedly assemble context for escalated cases across teams.',
          whyNow:
            'Escalation quality matters, but the workflow is slightly more specialized than triage and often depends on trust already earned in earlier queue tasks.',
          nextMove:
            'Validate whether escalation prep should be a standalone wedge or a second-layer expansion after routing and summary workflows already prove value.',
          highlights: [
            'The pain is real because bad escalations waste senior support time and slow response quality.',
            'The workflow becomes strongest when tied to structured routing and prior queue context.',
            'It feels more like a phase-two wedge than the first market entry point.',
          ],
        },
      ],
      detailEyebrow: 'Why these opportunities scored well',
      detailTitle:
        'These scores favor wedges that reduce repeated review work and routing delay without forcing a full support-platform rewrite.',
      detailDescription:
        'The strongest ideas here are not just painful. They also match how support-ops teams adopt tools: one clear queue problem, a visible speed or quality win, and a workflow narrow enough to test before it becomes another heavy service layer.',
      diagnosticColumns: [
        {
          title: 'Why support teams buy',
          description:
            'Teams buy when a product shortens triage time, reduces routing confusion, or improves escalation quality without creating another source of operator overhead.',
        },
        {
          title: 'What lowers the score',
          description:
            'Support stacks are already crowded. Products that require too much process change or promise to solve every support problem at once will struggle to win trust quickly.',
        },
        {
          title: 'Recommended next move',
          description:
            'Interview support-ops leads who already feel routing drag and escalation fatigue, then position the first wedge around faster queue decisions plus cleaner response context.',
        },
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Questions people ask when reading this customer-support operations sample report',
      faqDescription:
        'These answers explain what the sample demonstrates, why queue clarity ranks above broad support AI, and how to use the report before testing your own support workflow.',
      faqItems: [
        {
          question: 'What does this customer-support operations sample report demonstrate?',
          answer:
            'It shows how the product turns repeated support-ops drag into ranked workflow wedges, so visitors can judge whether the reasoning feels concrete enough before they run their own queue direction.',
        },
        {
          question: 'Why does ticket summary and routing rank ahead of broad support AI?',
          answer:
            'Because it combines repeated review pain, direct response-speed value, and a narrow workflow boundary that teams can pilot without committing to a full support-platform change.',
        },
        {
          question: 'How should I use this sample if my support setup is different?',
          answer:
            'Use the ranking logic as the reference point. If your team also loses time summarizing cases, routing tickets, or preparing escalations, run your own workflow shape through the product to see which wedge scores highest.',
        },
      ],
      relatedColumns: [
        {
          title: 'Homepage',
          description:
            'Go back to the public hub and compare the broader product journey before analyzing your own support-ops direction.',
          href: '/en',
          actionLabel: 'Back to homepage',
        },
        {
          title: 'AI business opportunity analysis',
          description:
            'Take the strongest support-ops wedge into the broader ranking workflow once you want to compare it against a wider market slice.',
          href: '/en/ai-business-opportunity-analysis',
          actionLabel: 'Open analysis workflow',
        },
        {
          title: 'Small-business sample report',
          description:
            'Compare another operations-heavy sample to see how queue friction differs from owner-led small-business workflow pain.',
          href: '/en/examples/ai-tools-for-small-business',
          actionLabel: 'View small-business sample',
        },
      ],
      closing: {
        eyebrow: 'Analyze your support direction',
        title: 'Compare your own support workflow against this sample.',
        description:
          'Use this public sample to see how queue drag becomes ranked product wedges, then analyze your own support-ops direction to learn whether a different routing, complaint, or escalation bottleneck should come first.',
        primaryAction: {
          label: 'Start Analysis',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'View another sample',
          href: '/en/examples/ai-tools-for-small-business',
          variant: 'outline',
        },
      },
    },
  },
  zh: {
    'examples-ai-tools-for-customer-support-operations': {
      primaryAction: {
        label: '开始分析',
        href: '/tools/product-insight',
      },
      secondaryAction: {
        label: '查看另一份样例',
        href: '/zh/examples/ai-tools-for-small-business',
        variant: 'outline',
      },
      heroVisualEyebrow: '公开样例报告',
      heroVisualTitle: '客户支持运营切口，按队列拖拽和响应清晰度排序',
      heroVisualSteps: ['支持运营场景简报', 'Top 工作流切口', '建议的下一步验证动作'],
      supportEyebrow: '场景简报',
      supportTitle:
        '客户支持运营 AI 工具：一份围绕分流摩擦、队列路由和升级准备的公开样例报告。',
      supportDescription:
        '这份样例聚焦高工单量、上下文不一致、升级压力上升的支持运营团队。它会先界定反复出现的拖拽，再说明为什么最强切口比宽泛“支持 AI 平台”更值得优先做。',
      supportSnapshots: [
        {
          label: '市场切片',
          value: '处在队列压力下的支持负责人和运营团队',
          description:
            '这些团队要反复把高工单量、零散上下文和升级风险转成路由与响应决策，但现在仍然过度依赖人工逐个判断。',
        },
        {
          label: '核心痛点',
          value: '分流和摘要工作手工停留太久',
          description:
            '最强机会通常出现在：团队仍然要手工做工单摘要、投诉聚类和升级上下文准备，而响应时效要求又很高的地方。',
        },
        {
          label: '最佳首个切口',
          value: '工单摘要与路由助手',
          description:
            '这份样例认为最强入口切口，是那个能缩短队列审核时间、提升路由置信度，并在支持复杂度继续扩散前先建立清晰响应路径的工作流。',
        },
      ],
      intentEyebrow: '如何使用这份样例',
      intentTitle: '先用这份样例判断输出质量，再决定要不要分析你自己的支持运营工作流。',
      intentDescription:
        '公开样例先帮助搜索访客回答一个问题：这套排序逻辑，是否足够符合真实支持运营场景，值得我把自己的队列、分流和升级流程带进产品里进一步分析？',
      intentColumns: [
        {
          title: '适合谁',
          description:
            '想先检查排序逻辑、样例输出和推荐方式，再决定要不要分析自己客户支持运营方向的访客。',
        },
        {
          title: '不适合谁',
          description:
            '已经非常清楚自己的支持流程，并且想直接进入分析，而不需要先看样例的人。',
        },
        {
          title: '什么时候用',
          description:
            '当你想先把一个真实支持运营场景和产品输出对照，再决定是否分析自己的队列问题时使用。',
        },
      ],
      opportunityEyebrow: '机会排序',
      opportunityTitle: '最强的支持运营切口，往往从队列清晰度开始，而不是泛化支持 copilot。',
      opportunityDescription:
        '这些排序优先奖励：反复出现的分流痛点、更快的响应速度，以及一个切口是否足够窄、足够可信，能在扩成更大支持平台前先赢得信任。',
      opportunityItems: [
        {
          rank: 'Rank 01',
          title: '工单摘要与路由助手',
          score: '8.9/10',
          description:
            '先为进入队列的工单做摘要、补齐缺失上下文，并把它们路由到更合适的处理队列，再减少支持负责人和运营团队的人工审核时间。',
          audience: '处理高工单量、跨多个收件箱和工具工作的支持运营负责人和队列管理者。',
          whyNow:
            '响应压力是即时的，但团队现在仍然花时间判断“每个 case 到底是什么、该去哪里”，因此更快的分流会产生非常直接的运营价值。',
          nextMove:
            '继续验证：首个产品到底应该更偏更好的摘要、更高置信度的路由，还是更清晰的异常升级信号。',
          highlights: [
            'ROI 很直观，因为它直接减少审核延迟和队列混乱。',
            '这个工作流重复频繁，足以支撑一个聚焦的首个产品切口。',
            '它天然可以继续扩到升级准备和投诉聚类层。',
          ],
        },
        {
          rank: 'Rank 02',
          title: '投诉聚类与模式复盘工作流',
          score: '8.3/10',
          description:
            '把反复出现的投诉文本聚成更清楚的模式，让支持负责人更快看见重复产品、计费或交付问题。',
          audience: '需要从大量工单中提取模式、却不可能逐条阅读所有消息的支持运营团队。',
          whyNow:
            '投诉数据已经非常丰富，但仍然混乱。尤其当同类摩擦不断在多个队列和渠道重复出现时，模式可见性会越来越重要。',
          nextMove:
            '进一步验证团队更关心的是先做 insight reporting，还是把切口直接绑定在和分流、升级决策更接近的动作层上。',
          highlights: [
            '这个工作流很有价值，因为重复投诉会同时带来服务和产品后果。',
            '它很适合利用结构化文本模式做聚类，而不是继续手工整理。',
            '它通常在分流切口先建立信任后会更强。',
          ],
        },
        {
          rank: 'Rank 03',
          title: '升级准备与上下文整理工作流',
          score: '7.9/10',
          description:
            '在升级前先把对话上下文、重复信号和建议下一步整理成更清楚的交接 brief，帮助运营和高级支持更快接手。',
          audience: '需要跨团队反复整理升级上下文的支持负责人和高级支持成员。',
          whyNow:
            '升级质量很重要，但这个流程比单纯的分流更细分，而且往往要建立在前面队列任务已经先赢得信任之上。',
          nextMove:
            '继续验证：升级准备应该是一个独立切口，还是更适合作为“摘要与路由”之后的第二层扩展。',
          highlights: [
            '这个痛点真实存在，因为糟糕升级会浪费高级支持时间并拖慢响应质量。',
            '它在和结构化路由及前置队列上下文结合后会更强。',
            '它更像 phase-two wedge，而不是第一市场入口。',
          ],
        },
      ],
      detailEyebrow: '为什么这些机会得分更高',
      detailTitle:
        '这些评分更偏向那些能减少重复审核和路由延迟、又不需要重写整个支持平台的工作流切口。',
      detailDescription:
        '这里最强的方向，不只是因为痛点明显，还因为它们符合支持运营团队实际采用工具的方式：一个清晰队列问题、一个可见速度或质量收益、再加上一个足够窄、可以先试起来的工作流边界。',
      diagnosticColumns: [
        {
          title: '为什么支持团队会买',
          description:
            '当产品能缩短分流时间、减少路由混乱，或提升升级质量，而且不会再增加一层运营负担时，团队才更愿意采用。',
        },
        {
          title: '什么会拉低得分',
          description:
            '支持栈本来就已经很拥挤。那些需要太多流程改造，或者一上来就承诺解决全部支持问题的产品，很难快速建立信任。',
        },
        {
          title: '建议下一步',
          description:
            '先去访谈那些已经明显感到路由拖拽和升级疲劳的支持运营负责人，再把首个切口定位在“更快队列决策 + 更清楚响应上下文”上。',
        },
      ],
      faqEyebrow: '常见问题',
      faqTitle: '在阅读这份客户支持运营样例报告时，用户最常问什么',
      faqDescription:
        '这些问题会解释这份样例到底展示了什么、为什么队列清晰度比宽泛支持 AI 更重要，以及在测试自己工作流前该怎么使用它。',
      faqItems: [
        {
          question: '这份客户支持运营样例报告主要展示了什么？',
          answer:
            '它展示的是：产品如何把重复支持运营拖拽转成可排序的工作流切口，让访客在带入自己队列方向前，先判断这套推理是否足够具体可信。',
        },
        {
          question: '为什么“工单摘要与路由”会排在宽泛支持 AI 前面？',
          answer:
            '因为它同时具备重复审核痛点、直接响应速度收益，以及一个团队可以先试点而不必重构整个支持平台的窄工作流边界。',
        },
        {
          question: '如果我的支持体系不一样，这份样例还有参考价值吗？',
          answer:
            '有。把它的排序逻辑当成参考点。如果你的团队也会在摘要、路由或升级准备上反复失去时间，就可以把你自己的工作流形态带进产品里继续看哪个切口得分最高。',
        },
      ],
      relatedColumns: [
        {
          title: '首页',
          description: '回到公开站入口，再从更大的产品路径里比较这个支持运营方向。',
          href: '/zh',
          actionLabel: '返回首页',
        },
        {
          title: 'AI 商业机会分析',
          description: '当你想把最强支持运营切口放进更宽的市场排序框架里比较时，进入这个分析工作流。',
          href: '/zh/ai-business-opportunity-analysis',
          actionLabel: '进入分析工作流',
        },
        {
          title: '中小企业样例报告',
          description: '再看一份以老板主导型运营为主的样例，比较它和支持队列摩擦的差异。',
          href: '/zh/examples/ai-tools-for-small-business',
          actionLabel: '查看中小企业样例',
        },
      ],
      closing: {
        eyebrow: '分析你的支持方向',
        title: '把你自己的支持工作流和这份样例对照看看。',
        description:
          '先看这份公开样例是如何把队列拖拽转成可排序的产品切口，再分析你自己的支持运营方向，判断更值得先做的是路由、投诉聚类，还是升级准备。',
        primaryAction: {
          label: '开始分析',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: '查看另一份样例',
          href: '/zh/examples/ai-tools-for-small-business',
          variant: 'outline',
        },
      },
    },
  },
}
