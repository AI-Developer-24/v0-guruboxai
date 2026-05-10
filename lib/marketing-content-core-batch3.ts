import type { CoreLandingTemplateProps } from '@/components/marketing/marketing-page-templates'
import type { SeoLocale } from '@/lib/seo/locales'

type Batch3CorePageKey =
  | 'guides-how-to-find-an-ai-saas-wedge'
  | 'comparisons-idea-generator-vs-opportunity-analysis'
  | 'use-cases-ai-tools-for-ecommerce-operators'

type Batch3CorePageOverride = Partial<Omit<CoreLandingTemplateProps, 'locale'>>

export const BATCH3_CORE_PAGE_OVERRIDES: Partial<Record<
  SeoLocale,
  Partial<Record<Batch3CorePageKey, Batch3CorePageOverride>>
>> = {
  en: {
    'guides-how-to-find-an-ai-saas-wedge': {
      heroVisualEyebrow: 'How-to wedge guide',
      heroVisualTitle: 'Find the narrow AI SaaS wedge before you build a tool that is too broad',
      heroVisualRows: [
        { label: 'Starting point', value: 'One market slice' },
        { label: 'Decision lens', value: 'Workflow wedge' },
        { label: 'Next step', value: 'Generation-ready' },
      ],
      supportEyebrow: 'Why this guide exists',
      supportTitle:
        'Most early AI SaaS ideas feel too broad because the founder starts with a category, not a repeated workflow wedge.',
      supportDescription:
        'This guide is for the moment when “AI for X” still sounds plausible but nowhere near specific enough to validate. It helps you narrow a market into one smaller operational wedge that is easier to explain, price, and test.',
      diagnosticColumns: [
        {
          title: 'Start with one operating context',
          description:
            'A wedge is easier to find when the buyer, workflow, and operating pressure already sit in the same narrow context instead of spanning a whole category.',
        },
        {
          title: 'Follow repeated workflow pain',
          description:
            'The best wedge is usually the painful handoff or cleanup step that happens every week, not the broad “assistant for the whole market” promise.',
        },
        {
          title: 'Choose a wedge before you choose features',
          description:
            'A product becomes easier to validate when you first define the narrow workflow boundary and only then imagine what the software should do.',
        },
      ],
      intentEyebrow: 'Best fit',
      intentTitle: 'Use this guide when you know the broader market but still need a sharper AI SaaS wedge.',
      intentDescription:
        'This page is for founders and operators who already have a market direction in mind but still need to decide which narrow workflow wedge deserves ideation, validation, and customer research next.',
      intentColumns: [
        {
          title: 'Best for',
          description:
            'People who already know the user group or market they care about but still need a narrower wedge than “AI for this entire category.”',
        },
        {
          title: 'Not for',
          description:
            'Visitors who already have one exact wedge ready for validation or those still starting from a completely blank page.',
        },
        {
          title: 'Use it when',
          description:
            'You need to narrow a market into one smaller wedge before idea generation becomes useful again.',
        },
      ],
      detailEyebrow: 'Input and output example',
      detailTitle:
        'A good wedge-finding input starts with one market slice and ends with one repeatable workflow bottleneck.',
      detailDescription:
        'The point is not to become more abstract. The point is to go from a broad AI market idea to a narrower workflow boundary that can produce better ideas and cleaner validation next.',
      inputLabel: 'Example starting directions',
      inputExample: [
        'AI for ecommerce operators who constantly clean product information, returns notes, and support context.',
        'AI for agency delivery teams who lose time translating feedback and recap threads into scoped action items.',
        'AI for recruiters who still hand-build candidate summaries and follow-up actions after every screening call.',
      ],
      outputLabel: 'What a sharper wedge should clarify',
      outputExample: [
        'Which repeated workflow pain is narrow enough to feel like a product wedge instead of a whole market pitch.',
        'Why one operational bottleneck is easier to explain, price, and validate than a broader “AI platform” idea.',
        'Which direction should move into idea generation or comparison next, and which broad concepts should wait.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Questions people ask when trying to find an AI SaaS wedge',
      faqDescription:
        'These answers explain how to narrow a market, what a wedge really is, and why workflow repetition matters more than broad category language.',
      faqItems: [
        {
          question: 'What makes an AI SaaS wedge stronger than a broad category idea?',
          answer:
            'A wedge is easier to validate because it is tied to one repeated workflow pain, a clearer buying story, and a narrower product boundary. Broad category ideas usually blur all three.',
        },
        {
          question: 'Should I start with buyer type or workflow pain first?',
          answer:
            'Ideally both are visible together. A strong wedge usually lives where one buyer repeatedly feels one narrow operational drag, not where a whole category sounds interesting.',
        },
        {
          question: 'What should I do after I find a wedge?',
          answer:
            'Move into idea generation if you still need adjacent wedge options, or go straight to comparison and validation if one candidate wedge is already clearly stronger.',
        },
        {
          question: 'Why not just brainstorm more ideas instead of narrowing first?',
          answer:
            'Because broader brainstorming often produces more vague possibilities. Narrowing first gives the next ideation or validation step a much better frame.',
        },
      ],
      relatedColumns: [
        {
          title: 'AI startup idea generator',
          description:
            'Use a narrower wedge as the input so ideation produces stronger adjacent product directions instead of generic ideas.',
          href: '/en/ai-startup-idea-generator',
          actionLabel: 'Open generator page',
        },
        {
          title: 'Idea generator vs opportunity analysis',
          description:
            'Compare the two workflows if you are unsure whether you still need more ideas or a ranked wedge map next.',
          href: '/en/comparisons/idea-generator-vs-opportunity-analysis',
          actionLabel: 'View comparison page',
        },
        {
          title: 'Ecommerce sample report',
          description:
            'See how a narrow operations wedge appears inside a public ecommerce workflow report before you analyze your own market.',
          href: '/en/examples/ai-tools-for-ecommerce-operations',
          actionLabel: 'View ecommerce sample',
        },
      ],
      closing: {
        eyebrow: 'Narrow before you build',
        title: 'Find the wedge that deserves the next idea or validation pass.',
        description:
          'Use this guide to turn a broad AI direction into one tighter SaaS wedge, then move into the workflow that helps you compare or validate it next.',
        primaryAction: {
          label: 'Start Analysis',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'Open Generator Page',
          href: '/en/ai-startup-idea-generator',
          variant: 'outline',
        },
      },
    },
    'comparisons-idea-generator-vs-opportunity-analysis': {
      heroVisualEyebrow: 'Comparison',
      heroVisualTitle:
        'When you need more candidate wedges, and when you need a ranked opportunity map instead',
      heroVisualRows: [
        { label: 'Breadth need', value: 'Generator' },
        { label: 'Prioritization need', value: 'Analysis' },
        { label: 'Best outcome', value: 'Right sequence' },
      ],
      supportEyebrow: 'Why this comparison exists',
      supportTitle:
        'The real question is not which workflow is better in general. It is whether your next problem is idea breadth or opportunity prioritization.',
      supportDescription:
        'This page is for founders who are unsure whether they still need more candidate wedges or whether the market is already clear enough that they should rank opportunities instead of expanding them again.',
      diagnosticColumns: [
        {
          title: 'Idea generation is stronger when the direction is still thin',
          description:
            'If you only have a broad market direction and need more adjacent product wedges, generation helps you widen the field before you judge any one option too early.',
        },
        {
          title: 'Opportunity analysis is stronger when the field is already crowded',
          description:
            'If you already see several credible wedges inside one market, analysis is better because it compares them against one visible ranking frame.',
        },
        {
          title: 'Most teams need both, but not at the same time',
          description:
            'The practical decision is often about sequence: widen first when the field is empty, rank first when the field is already noisy.',
        },
      ],
      intentEyebrow: 'Best fit',
      intentTitle:
        'Use this comparison when you are stuck between expanding more ideas and ranking the opportunities you already see.',
      intentDescription:
        'This page is for people who already understand both workflows exist but still need help deciding which one matches the current stage of their startup research.',
      intentColumns: [
        {
          title: 'Best for',
          description:
            'Founders who already have a market direction and want to choose between more ideation or clearer prioritization.',
        },
        {
          title: 'Not for',
          description:
            'Visitors looking for a generic product comparison without a real next-step decision to make.',
        },
        {
          title: 'Use it when',
          description:
            'You need to decide whether the market is still too empty or already too crowded for another idea pass.',
        },
      ],
      detailEyebrow: 'Decision frame',
      detailTitle:
        'The best workflow depends on whether your current bottleneck is option scarcity or option overload.',
      detailDescription:
        'Generation helps when you need more candidate wedges worth comparing. Opportunity analysis helps when you already have enough credible wedges and the real job is picking the strongest one.',
      inputLabel: 'When the generator usually fits better',
      inputExample: [
        'You know the market but still only have one or two vague product angles.',
        'You want more adjacent workflow wedges before you commit to deeper evaluation.',
        'You are still shaping how the buyer, workflow, and pain should be framed together.',
      ],
      outputLabel: 'When opportunity analysis usually fits better',
      outputExample: [
        'You already see several credible wedges inside the same market and need a clearer ranking sequence.',
        'You want to compare urgency, willingness to pay, and complexity without generating even more directions first.',
        'You are trying to decide which wedge deserves deeper validation or manual research next.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Questions people ask when choosing between idea generation and opportunity analysis',
      faqDescription:
        'These answers clarify when to widen the field, when to rank it, and how the two workflows fit together without overlap.',
      faqItems: [
        {
          question: 'Should I always start with idea generation first?',
          answer:
            'Not always. If you already see several strong wedges in one market, more generation may just create noise. At that point opportunity analysis is usually more useful.',
        },
        {
          question: 'What is the clearest sign that I should switch to opportunity analysis?',
          answer:
            'When the problem is no longer “I need more ideas” but “I already have too many plausible options and need a cleaner ranking.”',
        },
        {
          question: 'Can I go back to idea generation after opportunity analysis?',
          answer:
            'Yes. Ranking can reveal that the field is still too fuzzy or that the top wedge needs adjacent alternatives. The workflows can loop, but they should not happen blindly in parallel.',
        },
        {
          question: 'What should I open after this comparison?',
          answer:
            'If the field still feels thin, go to the generator. If the field already feels crowded, move into opportunity analysis or inspect a concrete public sample report.',
        },
      ],
      relatedColumns: [
        {
          title: 'AI startup idea generator',
          description:
            'Open the generation workflow when you still need more candidate wedges inside the market.',
          href: '/en/ai-startup-idea-generator',
          actionLabel: 'Open generator page',
        },
        {
          title: 'AI business opportunity analysis',
          description:
            'Open the ranking workflow when you already have enough candidate wedges and need a clearer shortlist.',
          href: '/en/ai-business-opportunity-analysis',
          actionLabel: 'Open analysis workflow',
        },
        {
          title: 'Ecommerce sample report',
          description:
            'Inspect a public report to see what a ranked wedge map looks like before you choose your next workflow.',
          href: '/en/examples/ai-tools-for-ecommerce-operations',
          actionLabel: 'View ecommerce sample',
        },
      ],
      closing: {
        eyebrow: 'Choose the next workflow',
        title: 'Widen the field when it is thin, rank it when it is crowded.',
        description:
          'Pick the workflow that matches the real bottleneck in your startup research so you do not waste the next step on the wrong job.',
        primaryAction: {
          label: 'Start Analysis',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'Open Analysis Workflow',
          href: '/en/ai-business-opportunity-analysis',
          variant: 'outline',
        },
      },
    },
    'use-cases-ai-tools-for-ecommerce-operators': {
      heroVisualEyebrow: 'Ecommerce operations use case',
      heroVisualTitle: 'Ecommerce workflows with repeated catalog, support, and returns drag',
      heroVisualRows: [
        { label: 'Audience fit', value: 'Ecommerce ops' },
        { label: 'Pain shape', value: 'Queue drag' },
        { label: 'Wedge goal', value: 'Resolution clarity' },
      ],
      supportEyebrow: 'Why this page exists',
      supportTitle:
        'The strongest AI tools for ecommerce operators usually begin with one repeated operations bottleneck, not with a broad “AI for ecommerce” promise.',
      supportDescription:
        'This page focuses on ecommerce workflows where catalog cleanup, support routing, returns interpretation, and merchandising coordination create repeated operator drag. Those are the places where narrower software wedges are easier to explain and test.',
      diagnosticColumns: [
        {
          title: 'Catalog work stays manually inconsistent',
          description:
            'Operators still spend time cleaning product attributes, checking copy quality, and reconciling missing information across channels and systems.',
        },
        {
          title: 'Support and returns queues slow everything down',
          description:
            'Ticket summaries, routing choices, and reason clustering still depend on manual review, which stretches time-to-resolution and operator attention.',
        },
        {
          title: 'The best wedges are operator workflows',
          description:
            'The most believable ecommerce AI tools support recurring operations directly instead of promising a broad all-in-one commerce copilot.',
        },
      ],
      intentEyebrow: 'Best fit',
      intentTitle:
        'Use this page when you want ecommerce-specific AI wedges rooted in repeated operations drag.',
      intentDescription:
        'This page is for founders, operators, and systems-minded teams who already understand ecommerce operations but need narrower AI wedges than broad “commerce automation” language usually provides.',
      intentColumns: [
        {
          title: 'Best for',
          description:
            'People exploring catalog cleanup, support triage, returns reasoning, or merchandising handoff workflows with obvious time-to-resolution pressure.',
        },
        {
          title: 'Not for',
          description:
            'Teams looking for a generic article about ecommerce AI trends without one concrete workflow or queue problem in mind.',
        },
        {
          title: 'Use it when',
          description:
            'You want to see whether one repeated ecommerce operations pain can become a wedge worth validating before building a broader platform.',
        },
      ],
      detailEyebrow: 'Input and output example',
      detailTitle:
        'The most useful ecommerce input starts from one repeated operations bottleneck, not the entire store stack.',
      detailDescription:
        'A narrow operator problem makes it easier to compare wedges by review cost, resolution speed, and whether the workflow is structured enough for a simple product story.',
      inputLabel: 'Example ecommerce directions',
      inputExample: [
        'A workflow that enriches missing product attributes and normalizes catalog copy before listings go live across channels.',
        'A system that summarizes support tickets and routes them to the right queue with cleaner context.',
        'A product wedge for clustering return reasons so operations teams can spot the patterns driving repeat issues.',
      ],
      outputLabel: 'What a stronger ecommerce wedge should reveal',
      outputExample: [
        'A clearer ranking of which ecommerce workflow drag is repeated enough to justify a software wedge.',
        'A better read on whether the product saves review time and improves resolution speed instead of only adding another operator dashboard.',
        'A sharper next move: validate the top operator wedge or step back into a broader opportunity map.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Questions people ask when exploring AI tools for ecommerce operators',
      faqDescription:
        'These answers explain which operator pain is strongest, why structured workflows rank well, and how to move from queue drag into product validation.',
      faqItems: [
        {
          question: 'Why focus on ecommerce operations instead of broad commerce AI categories?',
          answer:
            'Because broad categories usually blur the actual buying pain. Narrow workflow drag such as catalog cleanup, support routing, and returns analysis is easier to explain, pilot, and monetize.',
        },
        {
          question: 'What makes catalog or support routing a strong wedge?',
          answer:
            'These workflows happen repeatedly, rely on structured text or attributes, and create visible time-to-resolution costs when they are done manually.',
        },
        {
          question: 'How should I use this page if my ecommerce context is different?',
          answer:
            'Use it as an operator-workflow lens. If your team also loses time normalizing product data, triaging queues, or translating repetitive tickets into actions, the same logic can reveal a stronger wedge.',
        },
        {
          question: 'What should I do after I identify a promising ecommerce wedge?',
          answer:
            'Take the strongest one into opportunity analysis or compare it against a public ecommerce sample report to see whether the product framing still looks specific enough.',
        },
      ],
      relatedColumns: [
        {
          title: 'Ecommerce sample report',
          description:
            'Inspect a public ecommerce report to see ranked operator wedges before you run your own direction.',
          href: '/en/examples/ai-tools-for-ecommerce-operations',
          actionLabel: 'View ecommerce sample',
        },
        {
          title: 'AI business opportunity analysis',
          description:
            'Move one promising ecommerce wedge into the workflow that ranks broader opportunity spaces more explicitly.',
          href: '/en/ai-business-opportunity-analysis',
          actionLabel: 'Open analysis workflow',
        },
        {
          title: 'Wedge guide',
          description:
            'Read the practical sequence for narrowing a broad ecommerce idea into one smaller SaaS wedge.',
          href: '/en/guides/how-to-find-an-ai-saas-wedge',
          actionLabel: 'Open wedge guide',
        },
      ],
      closing: {
        eyebrow: 'Try an ecommerce direction',
        title: 'Test a narrower ecommerce workflow before building a broad commerce copilot.',
        description:
          'Start from one repeated operations drag, then decide whether the buyer, workflow, and review pressure are strong enough to carry the product forward.',
        primaryAction: {
          label: 'Start Analysis',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'View Ecommerce Sample',
          href: '/en/examples/ai-tools-for-ecommerce-operations',
          variant: 'outline',
        },
      },
    },
  },
  zh: {
    'guides-how-to-find-an-ai-saas-wedge': {
      heroVisualEyebrow: '切口指南',
      heroVisualTitle: '先找到更窄的 AI SaaS 切口，再避免把产品做得太宽',
      heroVisualRows: [
        { label: '起点', value: '一个市场切片' },
        { label: '判断镜头', value: '工作流切口' },
        { label: '下一步', value: '可继续生成' },
      ],
      supportEyebrow: '为什么需要这份指南',
      supportTitle:
        '很多早期 AI SaaS 想法之所以显得太宽，不是因为方向错了，而是因为创始人从大类开始，而不是从一个重复工作流切口开始。',
      supportDescription:
        '这份指南适合那种“AI for X”听起来还算合理，但远远不够具体到可以验证的阶段。它会帮助你把一个更宽市场收窄成一个更小、更容易解释、更容易收费和测试的 SaaS 切口。',
      diagnosticColumns: [
        {
          title: '先限定在一个运营场景里',
          description:
            '当买家、工作流和运营压力已经落在同一个更窄场景里时，切口会更容易被找出来，而不是横跨整个大类。',
        },
        {
          title: '沿着重复工作流痛点去找',
          description:
            '最强的切口，通常是那个每周都在发生的交接或清理步骤，而不是一句“给整个市场做 AI 助手”的宽泛承诺。',
        },
        {
          title: '先选切口，再想功能',
          description:
            '当你先把工作流边界说清楚，再去想软件具体做什么时，整个验证过程会更清楚、更可执行。',
        },
      ],
      intentEyebrow: '适用场景',
      intentTitle: '当你已经知道更宽的市场方向，但还需要找到更窄的 AI SaaS 切口时，用这份指南。',
      intentDescription:
        '这个页面适合已经有市场方向，但仍然要决定“哪个更窄工作流切口值得先进入点子生成、验证或调研”的创始人和运营者。',
      intentColumns: [
        {
          title: '适合谁',
          description:
            '已经知道想服务哪个用户群或市场，但还需要一个比“给整个大类做 AI”更窄的 SaaS 切口的人。',
        },
        {
          title: '不适合谁',
          description:
            '已经有一个非常具体切口、可以直接进入验证的人，或者还停留在完全空白页找方向的人。',
        },
        {
          title: '什么时候用',
          description:
            '当你需要先把一个更宽市场收窄成单一工作流切口，再进入下一步点子生成或验证时使用。',
        },
      ],
      detailEyebrow: '输入输出样例',
      detailTitle: '好的切口输入，往往从一个市场切片开始，最后落到一个重复运营瓶颈上。',
      detailDescription:
        '目标不是把问题讲得更抽象，而是把一个更宽的 AI 市场方向，整理成一个更窄的工作流边界，好让后续点子生成和验证都更有框架。',
      inputLabel: '起始方向示例',
      inputExample: [
        '面向电商运营团队的 AI，帮助他们处理商品信息、退货原因和支持上下文。',
        '面向代理公司交付团队的 AI，帮助他们整理反馈线程和会议 recap。',
        '面向招聘顾问的 AI，帮助他们把面试记录和后续动作整理得更快更清楚。',
      ],
      outputLabel: '更强的切口应该澄清什么',
      outputExample: [
        '哪个重复工作流痛点已经足够窄，能成为真正的产品切口，而不是一句更宽的大类定位。',
        '为什么某个运营瓶颈比“做一个更大的 AI 平台”更容易解释、收费和验证。',
        '下一步应该进入哪个流程：继续点子生成、做工作流对比，还是直接进入更深验证。',
      ],
      faqEyebrow: '常见问题',
      faqTitle: '在寻找 AI SaaS 切口时，用户最常问什么',
      faqDescription:
        '这些问题会解释什么叫切口、为什么要先收窄，以及为什么重复工作流痛点通常比宽泛分类更重要。',
      faqItems: [
        {
          question: '什么样的 AI SaaS 切口，才比宽泛大类定位更强？',
          answer:
            '一个更强的切口通常绑定在一个重复工作流痛点上，有更清楚的购买故事，也有更窄的产品边界。宽泛大类通常会把这三件事都讲模糊。',
        },
        {
          question: '我应该先从买家出发，还是先从工作流出发？',
          answer:
            '理想状态是二者同时出现。最强的切口通常出现在“某类买家反复遇到某个窄运营拖拽”的地方，而不是只知道一个很大的行业标签。',
        },
        {
          question: '找到切口以后，下一步该做什么？',
          answer:
            '如果你还需要更多相邻切口，就进入点子生成；如果某个切口已经明显更强，就进入对比或验证流程继续收窄判断。',
        },
        {
          question: '为什么不直接先多 brainstorm 一些想法？',
          answer:
            '因为更宽的 brainstorming 往往只会生成更多模糊方向。先收窄切口，会让后面的点子生成和验证都更有框架。',
        },
      ],
      relatedColumns: [
        {
          title: 'AI 创业点子生成器',
          description:
            '先把更窄的切口带进生成器，让后续点子生成更像相邻工作流展开，而不是泛化灵感堆积。',
          href: '/zh/ai-startup-idea-generator',
          actionLabel: '查看生成器页面',
        },
        {
          title: '点子生成器 vs 机会分析',
          description: '如果你还不确定接下来该继续扩展点子还是先压缩优先级，就先看这页对比。',
          href: '/zh/comparisons/idea-generator-vs-opportunity-analysis',
          actionLabel: '查看对比页面',
        },
        {
          title: '电商运营样例报告',
          description:
            '先看一份电商运营公开样例，感受更窄的运营切口会如何在真实报告里出现。',
          href: '/zh/examples/ai-tools-for-ecommerce-operations',
          actionLabel: '查看电商样例',
        },
      ],
      closing: {
        eyebrow: '先收窄，再推进',
        title: '找到那个真正值得进入下一轮点子生成或验证的切口。',
        description:
          '先把一个更宽的 AI 方向整理成更窄的 SaaS 切口，再进入最适合帮助你比较或验证它的工作流。',
        primaryAction: {
          label: '开始分析',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: '查看生成器页面',
          href: '/zh/ai-startup-idea-generator',
          variant: 'outline',
        },
      },
    },
    'comparisons-idea-generator-vs-opportunity-analysis': {
      heroVisualEyebrow: '对比页面',
      heroVisualTitle: '什么时候你需要更多候选切口，什么时候你更需要一张可排序的机会地图',
      heroVisualRows: [
        { label: '需要更宽广度', value: '生成器' },
        { label: '需要更强优先级', value: '机会分析' },
        { label: '更优顺序', value: '按阶段选' },
      ],
      supportEyebrow: '为什么需要这页对比',
      supportTitle:
        '真正的问题不是哪个流程“更好”，而是你当前的瓶颈，到底是切口太少，还是候选方向太多。',
      supportDescription:
        '这页适合那些还没决定：自己现在到底需要更多候选切口，还是已经有足够多方向、该先做优先级排序的创始人和运营者。',
      diagnosticColumns: [
        {
          title: '当方向还太薄时，生成器更强',
          description:
            '如果你只有一个更宽市场方向，还缺少足够多相邻工作流切口，生成器会更适合先把候选空间展开。',
        },
        {
          title: '当候选已经太多时，机会分析更强',
          description:
            '如果你已经在同一个市场里看到多个可信切口，机会分析更适合，因为它会把这些切口放进同一套排序框架里比较。',
        },
        {
          title: '大多数团队两种都需要，只是不是同一时刻',
          description:
            '真正要做的判断通常是顺序：当候选太少时先展开，当候选已经开始拥挤时先排序。',
        },
      ],
      intentEyebrow: '适用场景',
      intentTitle: '当你卡在“继续扩点子”还是“先排优先级”之间时，用这页对比来选下一步流程。',
      intentDescription:
        '这个页面适合已经知道这两个流程都存在，但还需要帮助判断：哪个更符合自己当前创业研究阶段的人。',
      intentColumns: [
        {
          title: '适合谁',
          description:
            '已经有市场方向，但还需要在“更多相邻切口”和“更清晰优先级排序”之间做判断的创始人。',
        },
        {
          title: '不适合谁',
          description:
            '只想看一篇泛泛对比，却没有真实下一步决策要做的人。',
        },
        {
          title: '什么时候用',
          description:
            '当你需要判断：当前瓶颈到底是候选太少，还是候选已经太多、需要更干净的排序时使用。',
        },
      ],
      detailEyebrow: '决策框架',
      detailTitle: '最合适的流程，取决于你当前的瓶颈到底是“选项稀缺”还是“选项过载”。',
      detailDescription:
        '生成器适合在你还需要更多相邻切口时使用；机会分析适合在你已经有足够多可信切口，而真正任务变成“选出谁最该继续”的时候使用。',
      inputLabel: '什么时候生成器通常更适合',
      inputExample: [
        '你已经知道市场方向，但目前只有一两个还很模糊的产品角度。',
        '你想先得到更多相邻工作流切口，再决定哪个值得深入。',
        '你还在整理买家、工作流和痛点应该如何被放在一起描述。',
      ],
      outputLabel: '什么时候机会分析通常更适合',
      outputExample: [
        '你已经在同一个市场里看到多个可信切口，需要一套更干净的排序顺序。',
        '你想比较紧迫度、付费意愿和复杂度，而不是再继续扩展更多方向。',
        '你正在判断：哪个切口最值得进入更深验证或人工调研。',
      ],
      faqEyebrow: '常见问题',
      faqTitle: '在点子生成器和机会分析之间做选择时，用户最常问什么',
      faqDescription:
        '这些问题会解释什么时候该继续展开候选，什么时候该先排序，以及两种流程该怎样衔接。',
      faqItems: [
        {
          question: '是不是应该永远先从点子生成器开始？',
          answer:
            '不一定。如果你已经在同一个市场里看到了多个可信切口，再继续生成可能只会制造噪音；这时机会分析通常更有价值。',
        },
        {
          question: '什么信号说明我应该切换到机会分析？',
          answer:
            '当你的问题已经不再是“我还需要更多点子”，而是“我已经有很多 plausible 选项，需要更清楚地排序谁最值得继续”。',
        },
        {
          question: '做完机会分析后，还能再回到点子生成器吗？',
          answer:
            '可以。排序之后你可能会发现市场仍然太模糊，或者最强切口还需要更多相邻替代项。两种流程可以循环，但不适合无差别地同时做。',
        },
        {
          question: '看完这页后，最适合打开哪个页面？',
          answer:
            '如果当前候选还是太少，就进生成器；如果当前候选已经太多，就进机会分析，或者先看一份更具体的公开样例报告。',
        },
      ],
      relatedColumns: [
        {
          title: 'AI 创业点子生成器',
          description: '当你还需要更多候选切口时，进入点子生成流程。',
          href: '/zh/ai-startup-idea-generator',
          actionLabel: '查看生成器页面',
        },
        {
          title: 'AI 商业机会分析',
          description: '当你已经有足够多候选切口，真正需要的是 shortlist 排序时，进入机会分析流程。',
          href: '/zh/ai-business-opportunity-analysis',
          actionLabel: '查看分析页面',
        },
        {
          title: '电商运营样例报告',
          description: '先看一份公开样例，感受一张可排序机会地图在真实运营场景里是怎样呈现的。',
          href: '/zh/examples/ai-tools-for-ecommerce-operations',
          actionLabel: '查看电商样例',
        },
      ],
      closing: {
        eyebrow: '选对下一条流程',
        title: '当候选太少时先展开，当候选太多时先排序。',
        description:
          '先选对与你当前研究瓶颈最匹配的流程，避免把下一步时间花在错误的任务上。',
        primaryAction: {
          label: '开始分析',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: '查看分析页面',
          href: '/zh/ai-business-opportunity-analysis',
          variant: 'outline',
        },
      },
    },
    'use-cases-ai-tools-for-ecommerce-operators': {
      heroVisualEyebrow: '电商运营场景页',
      heroVisualTitle: '先看那些反复拖慢目录、售后和退货处理的电商工作流摩擦',
      heroVisualRows: [
        { label: '受众贴合度', value: '电商运营' },
        { label: '痛点形态', value: '队列拖拽' },
        { label: '切口目标', value: '处理清晰度' },
      ],
      supportEyebrow: '为什么需要这个页面',
      supportTitle:
        '最强的电商运营 AI 工具，往往不是宽泛的“给电商做 AI 平台”，而是那些能减少重复运营拖拽的窄工作流切口。',
      supportDescription:
        '这个页面聚焦电商运营团队最容易反复遇到的运营摩擦：目录整理、支持工单分流、退货原因解释，以及多渠道商品运营交接。真正更容易解释和测试的，通常就是这些更贴着操作队列的工作流切口。',
      diagnosticColumns: [
        {
          title: '目录工作仍然要靠人工反复清理',
          description:
            '运营者仍然要花很多时间补齐商品属性、检查文案一致性，并在多个渠道之间修正缺失信息。',
        },
        {
          title: '支持与退货队列会拖慢整体处理速度',
          description:
            '工单摘要、分流判断和退货原因归类，仍然依赖人工逐个查看，拉长了处理时长，也持续消耗运营注意力。',
        },
        {
          title: '最强的切口通常都贴着运营工作流',
          description:
            '比起宽泛的“电商 AI 助手”，更可信的产品切口通常是那些直接减少反复运营拖拽的窄队列流程。',
        },
      ],
      intentEyebrow: '适用场景',
      intentTitle: '当你想找的是扎根在电商重复运营拖拽里的 AI 切口时，用这个页面。',
      intentDescription:
        '这个页面适合已经理解电商运营场景，但还缺少更窄、更可信 AI 产品切口的人。它不会泛泛谈趋势，而是沿着目录、售后和退货流程里的具体摩擦去找更适合先验证的方向。',
      intentColumns: [
        {
          title: '适合谁',
          description:
            '正在探索目录整理、支持分流、退货原因分析或多渠道运营交接切口，并想更快判断哪个方向最值得推进的人。',
        },
        {
          title: '不适合谁',
          description:
            '只想看一篇泛泛“电商 AI 趋势”，却没有具体运营工作流问题要解决的人。',
        },
        {
          title: '什么时候用',
          description:
            '当你想判断某个电商运营重复摩擦，是否足够强、足够窄，也足够值得做成一个独立产品切口时使用。',
        },
      ],
      detailEyebrow: '输入输出样例',
      detailTitle:
        '最有价值的电商输入，应该从一个反复出现的运营瓶颈开始，而不是一上来想覆盖整个店铺栈。',
      detailDescription:
        '当问题已经足够贴近具体运营流程时，更容易比较不同切口在审核成本、处理速度和采用逻辑上的差别，也更容易判断哪个切口最值得先验证。',
      inputLabel: '电商方向示例',
      inputExample: [
        '一个在多渠道上补齐商品属性、规范目录文案并标记缺失字段的工作流。',
        '一个把支持工单先做摘要、再做初步分流的产品方向。',
        '一个围绕退货原因聚类与异常模式识别的 AI 运营切口。',
      ],
      outputLabel: '更强的电商切口应该揭示什么',
      outputExample: [
        '看清哪个运营摩擦重复得足够频繁，值得成为真正的软件切口，而不是一个附属效率功能。',
        '理解这个产品是否真的减少了人工审核和处理时间，而不是只额外增加一个运营面板。',
        '得到更明确的下一步：继续验证最强切口，或退回更宽的机会分析重新排序。',
      ],
      faqEyebrow: '常见问题',
      faqTitle: '在探索电商运营 AI 工具机会时，用户最常问什么',
      faqDescription:
        '这些问题会解释为什么运营型切口往往更强，以及如何从队列拖拽进入真正的产品验证。',
      faqItems: [
        {
          question: '为什么要聚焦电商运营摩擦，而不是宽泛的电商 AI 分类？',
          answer:
            '因为宽泛分类通常会掩盖真正的购买痛点。像目录整理、售后分流和退货原因分析这样的窄工作流，更容易解释、试点和收费。',
        },
        {
          question: '为什么“目录整理”或“支持分流”会是更强切口？',
          answer:
            '因为这些流程高频重复、输入结构化程度高，而且当它们被手工处理时，会直接拉长处理时长并增加审核成本。',
        },
        {
          question: '如果我的电商场景不同，这页还有参考价值吗？',
          answer:
            '有。把它当成运营工作流镜头来用。如果你的团队也在反复处理商品信息、工单队列或退货分类，这套判断逻辑依然能帮助你找出更强切口。',
        },
        {
          question: '找到一个有希望的电商切口后，下一步该做什么？',
          answer:
            '把最强切口带去做机会分析，或者先和一份公开电商样例报告对照，看产品表述是否已经足够具体。',
        },
      ],
      relatedColumns: [
        {
          title: '电商运营样例报告',
          description: '先看一份公开电商报告，感受这些运营工作流切口是如何被排序的。',
          href: '/zh/examples/ai-tools-for-ecommerce-operations',
          actionLabel: '查看电商样例',
        },
        {
          title: 'AI 商业机会分析',
          description: '把一个更有希望的电商切口带入更适合做机会排序的分析工作流。',
          href: '/zh/ai-business-opportunity-analysis',
          actionLabel: '进入分析工作流',
        },
        {
          title: '切口指南',
          description: '先看一遍如何把一个更宽 AI 方向收窄成更适合验证的 SaaS 切口。',
          href: '/zh/guides/how-to-find-an-ai-saas-wedge',
          actionLabel: '查看切口指南',
        },
      ],
      closing: {
        eyebrow: '试一条电商运营方向',
        title: '先验证一个更窄的电商运营工作流，而不是直接做一个泛化电商 copilot。',
        description:
          '先从一个重复、结构化、又贴着队列处理的切口开始，再判断这个买家、工作流和处理压力是否足够强，值得继续推进。',
        primaryAction: {
          label: '开始分析',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: '查看电商样例',
          href: '/zh/examples/ai-tools-for-ecommerce-operations',
          variant: 'outline',
        },
      },
    },
  },
}
