import type { CoreLandingTemplateProps } from '@/components/marketing/marketing-page-templates'
import type { SeoLocale } from '@/lib/seo/locales'

type Batch4CorePageKey = 'use-cases-ai-tools-for-consultants'

type Batch4CorePageOverride = Partial<Omit<CoreLandingTemplateProps, 'locale'>>

export const BATCH4_CORE_PAGE_OVERRIDES: Partial<Record<
  SeoLocale,
  Partial<Record<Batch4CorePageKey, Batch4CorePageOverride>>
>> = {
  en: {
    'use-cases-ai-tools-for-consultants': {
      heroVisualEyebrow: 'Consultant workflow use case',
      heroVisualTitle: 'Solo consultants feel the drag when expert calls never become clean next steps',
      heroVisualRows: [
        { label: 'Audience fit', value: 'Solo consultants' },
        { label: 'Pain shape', value: 'Follow-up drift' },
        { label: 'Wedge goal', value: 'Action clarity' },
      ],
      supportEyebrow: 'Why this page exists',
      supportTitle:
        'The best AI tools for consultants usually start with the admin-heavy workflow around expert calls, not with a broad promise to automate all knowledge work.',
      supportDescription:
        'This page focuses on recurring client-service friction for solo consultants, fractional operators, and independent strategists. The strongest wedges usually live where notes, scopes, and follow-up actions repeatedly stay trapped in manual cleanup.',
      diagnosticColumns: [
        {
          title: 'Calls do not become clean follow-up fast enough',
          description:
            'Consultants often leave discovery and working sessions with useful context but still need to manually turn that context into client-ready follow-up, recap, and next-step plans.',
        },
        {
          title: 'Scope and proposal language drifts across similar projects',
          description:
            'Repeat service lines still need fresh scoping language, but the inputs are similar enough that drafting from scratch wastes time and introduces inconsistency.',
        },
        {
          title: 'The strongest wedge lives around repeated service admin',
          description:
            'A believable consultant AI wedge usually reduces recurring prep, recap, and action-summary work instead of trying to replace the consultant’s judgment directly.',
        },
      ],
      intentEyebrow: 'Best fit',
      intentTitle: 'Use this page when you want consultant-specific AI wedges anchored in repeated client-service workflow drag.',
      intentDescription:
        'This page is for independent consultants and fractional operators who already know their client work well but need sharper product wedges than generic productivity or knowledge-worker AI language usually offers.',
      intentColumns: [
        {
          title: 'Best for',
          description:
            'Solo consultants, boutique advisory operators, and fractional specialists who repeatedly turn calls, notes, and action items into client-facing follow-up.',
        },
        {
          title: 'Not for',
          description:
            'Readers looking for a broad article about AI for experts without one concrete service workflow or repeated admin bottleneck in mind.',
        },
        {
          title: 'Use it when',
          description:
            'You want to test whether one repeated consulting workflow is narrow enough to become a product wedge before you build a broader expert-assistance tool.',
        },
      ],
      detailEyebrow: 'Input and output example',
      detailTitle: 'The most useful consultant input begins with one recurring service workflow, not the whole consulting practice.',
      detailDescription:
        'A tighter workflow frame makes it easier to judge whether the product saves enough admin time, protects enough client clarity, and repeats often enough to justify a paid wedge.',
      inputLabel: 'Example consulting directions',
      inputExample: [
        'A workflow that turns discovery-call notes into a clean client follow-up and action plan within the same day.',
        'A product wedge that drafts repeatable project scopes and proposal language for one consulting service line.',
        'A system that converts working-session notes into a concise client update, owners list, and next-step summary.',
      ],
      outputLabel: 'What a stronger consultant wedge should reveal',
      outputExample: [
        'Which consultant workflow repeats often enough to justify a lightweight product instead of a one-off internal habit.',
        'Whether the wedge creates visible value through faster follow-up, cleaner scoping, or fewer dropped next steps.',
        'Which direction should move into broader idea generation next, and which workflow should be validated first.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Questions people ask when exploring AI tools for consultants',
      faqDescription:
        'These answers explain why consultant workflow drag can become a product wedge, which service patterns matter most, and what to test before building anything larger.',
      faqItems: [
        {
          question: 'Why focus on consultant workflow friction instead of general AI productivity?',
          answer:
            'Because broad productivity language rarely ties to a paid buying trigger. Repeated client-service friction such as follow-up drafting, scope cleanup, and action-summary work is easier to explain, trial, and monetize.',
        },
        {
          question: 'What makes follow-up or scoping a strong wedge for consultants?',
          answer:
            'These tasks repeat across many client engagements, depend on structured language patterns, and directly affect responsiveness, clarity, and trust when they go wrong or stay manual too long.',
        },
        {
          question: 'Is this only relevant for solo consultants?',
          answer:
            'No. It also applies to fractional operators and small advisory teams. The key is repeated client-service admin around notes, proposals, and next-step communication, not company size by itself.',
        },
        {
          question: 'What should I do after I identify a promising consulting wedge?',
          answer:
            'Take the strongest wedge into idea generation if you still want adjacent options, or compare it against a public freelancer-oriented sample to see whether the operational framing still feels concrete enough.',
        },
      ],
      relatedColumns: [
        {
          title: 'AI startup idea generator',
          description:
            'Expand one consulting wedge into adjacent product directions once you know the client-service workflow deserves more ideation.',
          href: '/en/ai-startup-idea-generator',
          actionLabel: 'Open generator page',
        },
        {
          title: 'Freelancer sample report',
          description:
            'Inspect a public sample that already ranks solo-operator workflow wedges before you analyze your own consulting direction.',
          href: '/en/examples/ai-tools-for-freelancers',
          actionLabel: 'View freelancer sample',
        },
        {
          title: 'Validate an AI startup idea',
          description:
            'Use the validation guide when one consulting wedge already looks strong enough that the next job is proving it, not expanding it.',
          href: '/en/guides/how-to-validate-an-ai-startup-idea',
          actionLabel: 'Open validation guide',
        },
      ],
      closing: {
        eyebrow: 'Try a consulting direction',
        title: 'Start with one repeatable client-service workflow before you build a bigger expert tool.',
        description:
          'Use one recurring consulting bottleneck as the frame, then decide whether the wedge deserves more ideation, sharper validation, or a broader opportunity map next.',
        primaryAction: {
          label: 'Start Analysis',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'View Freelancer Sample',
          href: '/en/examples/ai-tools-for-freelancers',
          variant: 'outline',
        },
      },
    },
  },
  zh: {
    'use-cases-ai-tools-for-consultants': {
      heroVisualEyebrow: '顾问工作流场景页',
      heroVisualTitle: '当专家通话始终无法变成干净的后续动作时，独立顾问会持续感到拖拽',
      heroVisualRows: [
        { label: '受众贴合度', value: '独立顾问' },
        { label: '痛点形态', value: '跟进漂移' },
        { label: '切口目标', value: '动作清晰度' },
      ],
      supportEyebrow: '为什么需要这个页面',
      supportTitle:
        '最强的顾问类 AI 工具，通常不是宽泛地“提升知识工作者效率”，而是从专家通话之后那些重复、又很费管理精力的工作流开始。',
      supportDescription:
        '这个页面聚焦独立顾问、fractional operator 和顾问型服务从业者的重复客户交付摩擦。最值得产品化的切口，往往出现在会议记录、scope 草稿和后续动作整理总是靠手工清理的地方。',
      diagnosticColumns: [
        {
          title: '通话之后很难快速变成干净的后续跟进',
          description:
            '顾问往往在 discovery call 或工作会议后拿到很多有价值上下文，但仍然要花时间把这些内容手工转成客户可读的跟进、recap 和下一步计划。',
        },
        {
          title: '相似项目的 scope 和 proposal 语言总会漂移',
          description:
            '重复服务线其实有不少相似输入，但很多顾问仍然从头写提案和项目 scope，既浪费时间，也容易造成表达不一致。',
        },
        {
          title: '最强的切口通常都围绕重复服务管理动作',
          description:
            '更可信的顾问类 AI 切口，通常是减少准备、recap 和 action-summary 这些重复管理工作，而不是直接替代顾问判断。',
        },
      ],
      intentEyebrow: '适用场景',
      intentTitle: '当你想找的是扎根在重复客户服务拖拽里的顾问类 AI 切口时，用这个页面。',
      intentDescription:
        '这个页面适合已经非常理解自己客户工作流，但又不想落入泛化效率工具叙事的独立顾问和顾问型运营者。它帮助你把视角放回那些真正会反复发生的客户服务摩擦。',
      intentColumns: [
        {
          title: '适合谁',
          description:
            '独立顾问、小型咨询团队和 fractional operator，他们会反复把通话、记录和行动项整理成对外可交付的跟进内容。',
        },
        {
          title: '不适合谁',
          description:
            '只想看泛泛“AI 提升知识工作效率”文章、却没有具体顾问工作流问题要解决的人。',
        },
        {
          title: '什么时候用',
          description:
            '当你想判断某个顾问工作流是否足够窄、足够重复，也足够值得先做成独立产品切口时使用。',
        },
      ],
      detailEyebrow: '输入输出样例',
      detailTitle: '最有价值的顾问输入，应该从一个反复出现的服务工作流开始，而不是整个咨询业务本身。',
      detailDescription:
        '当工作流边界足够清楚时，更容易判断这个切口是否真的节省管理时间、改善客户清晰度，也更容易看出它是否值得成为收费产品。',
      inputLabel: '顾问方向示例',
      inputExample: [
        '一个把 discovery call 记录快速整理成客户跟进邮件和行动计划的工作流。',
        '一个为固定服务线生成 scope 草稿和 proposal 语言的产品切口。',
        '一个把工作会议记录整理成客户更新、责任人列表和下一步摘要的系统。',
      ],
      outputLabel: '更强的顾问切口应该揭示什么',
      outputExample: [
        '哪个顾问工作流重复得足够频繁，值得成为轻量产品，而不只是内部习惯。',
        '这个切口到底是通过更快跟进、更清楚 scope，还是更少遗漏动作来体现价值。',
        '下一步应该进入更宽的点子生成，还是先验证这个最强顾问工作流切口。',
      ],
      faqEyebrow: '常见问题',
      faqTitle: '在探索面向顾问的 AI 工具机会时，用户最常问什么',
      faqDescription:
        '这些问题会解释为什么顾问工作流摩擦值得产品化、哪些服务模式最重要，以及在做更大产品前应该先验证什么。',
      faqItems: [
        {
          question: '为什么要聚焦顾问工作流摩擦，而不是泛泛的 AI 效率工具？',
          answer:
            '因为宽泛效率语言很难对应真实付费触发点。像跟进草稿、scope 整理和行动摘要这样的重复客户服务摩擦，更容易解释、试点和收费。',
        },
        {
          question: '为什么“会后跟进”或“scope 草稿”会是强切口？',
          answer:
            '因为这些任务会跨多个客户项目反复出现，依赖结构化语言模式，而且一旦处理不及时，就会直接影响响应速度、清晰度和客户信任。',
        },
        {
          question: '这是不是只适合独立顾问？',
          answer:
            '不只如此。它同样适合 fractional operator 和小型咨询团队。关键不是团队大小，而是围绕记录、提案和下一步沟通的重复客户服务管理动作。',
        },
        {
          question: '找到一个有希望的顾问切口后，下一步该做什么？',
          answer:
            '如果你还想看更多相邻方向，就把它带去点子生成；如果你已经想验证它的产品边界，就先和公开的 freelancer 样例对照，看运营表达是否已经足够具体。',
        },
      ],
      relatedColumns: [
        {
          title: 'AI 创业点子生成器',
          description:
            '当你已经确认某个顾问工作流值得展开时，用生成器把它扩成更多相邻产品方向。',
          href: '/zh/ai-startup-idea-generator',
          actionLabel: '查看生成器页面',
        },
        {
          title: '自由职业者样例报告',
          description:
            '先看一份公开样例，感受 solo operator 工作流切口是如何被排序和解释的。',
          href: '/zh/examples/ai-tools-for-freelancers',
          actionLabel: '查看 freelancer 样例',
        },
        {
          title: '如何验证 AI 创业点子',
          description:
            '当某个顾问切口已经很强、下一步该验证而不是扩展时，进入这份验证指南。',
          href: '/zh/guides/how-to-validate-an-ai-startup-idea',
          actionLabel: '查看验证指南',
        },
      ],
      closing: {
        eyebrow: '试一条顾问方向',
        title: '先从一个重复客户服务工作流开始，而不是直接做一个更大的专家工具。',
        description:
          '先用一个反复出现的顾问瓶颈作为框架，再判断这个切口更适合继续扩展、进入验证，还是带回更宽的机会地图里重新比较。',
        primaryAction: {
          label: '开始分析',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: '查看 freelancer 样例',
          href: '/zh/examples/ai-tools-for-freelancers',
          variant: 'outline',
        },
      },
    },
  },
}
