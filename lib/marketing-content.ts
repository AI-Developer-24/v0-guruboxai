import type {
  CoreLandingTemplateProps,
  HomepageTemplateProps,
  PublicExampleTemplateProps,
} from '@/components/marketing/marketing-page-templates'
import { BATCH3_CORE_PAGE_OVERRIDES } from '@/lib/marketing-content-core-batch3'
import { BATCH4_CORE_PAGE_OVERRIDES } from '@/lib/marketing-content-core-batch4'
import { BATCH4_EXAMPLE_PAGE_OVERRIDES } from '@/lib/marketing-content-example-batch4'
import { EURO_CORE_PAGE_OVERRIDES } from '@/lib/marketing-content-core-eu'
import { EURO_EXAMPLE_PAGE_OVERRIDES } from '@/lib/marketing-content-example-eu'
import { EURO_TEMPLATE_FIELDS } from '@/lib/marketing-content-template-eu'
import { ALL_SEO_LOCALES, type SeoLocale } from '@/lib/seo/locales'
import {
  MARKETING_PAGE_KEYS,
  isMarketingPagePublishedForLocale,
  getMarketingPagePath,
  type MarketingPageKey,
} from '@/lib/seo/metadata'

export type RouteTemplateKind = 'home' | 'core' | 'example'

type SharedTemplateFields = Pick<
  HomepageTemplateProps,
  'sectionLabel' | 'title' | 'description' | 'primaryAction' | 'secondaryAction' | 'signals'
>

type HomepageContentFields = Omit<HomepageTemplateProps, keyof SharedTemplateFields | 'locale'>
type CoreContentFields = Omit<CoreLandingTemplateProps, keyof SharedTemplateFields | 'locale'>
type ExampleContentFields = Omit<PublicExampleTemplateProps, keyof SharedTemplateFields | 'locale'>
type ExamplePageOverride = Partial<Omit<PublicExampleTemplateProps, 'locale'>>
type CorePageKey =
  | 'ai-startup-idea-generator'
  | 'saas-idea-validation'
  | 'ai-business-opportunity-analysis'
  | 'guides-how-to-validate-an-ai-startup-idea'
  | 'guides-how-to-prioritize-ai-business-opportunities'
  | 'guides-how-to-find-an-ai-saas-wedge'
  | 'comparisons-badgersignal-vs-chatgpt-for-startup-idea-validation'
  | 'comparisons-badgersignal-vs-manual-market-research'
  | 'comparisons-idea-generator-vs-opportunity-analysis'
  | 'use-cases-ai-tools-for-recruiters'
  | 'use-cases-ai-tools-for-agencies'
  | 'use-cases-ai-tools-for-ecommerce-operators'
  | 'use-cases-ai-tools-for-consultants'
type ExamplePageKey =
  | 'examples-ai-tools-for-freelancers'
  | 'examples-ai-tools-for-small-business'
  | 'examples-ai-tools-for-recruiters'
  | 'examples-ai-tools-for-agencies'
  | 'examples-ai-tools-for-ecommerce-operations'
  | 'examples-ai-tools-for-customer-support-operations'

export type MarketingPageContent =
  | {
      templateKind: 'home'
      props: Omit<HomepageTemplateProps, 'locale'>
    }
  | {
      templateKind: 'core'
      props: Omit<CoreLandingTemplateProps, 'locale'>
    }
  | {
      templateKind: 'example'
      props: Omit<PublicExampleTemplateProps, 'locale'>
    }

const PAGE_TEMPLATE_KIND: Record<MarketingPageKey, RouteTemplateKind> = {
  home: 'home',
  'ai-startup-idea-generator': 'core',
  'saas-idea-validation': 'core',
  'ai-business-opportunity-analysis': 'core',
  'guides-how-to-validate-an-ai-startup-idea': 'core',
  'guides-how-to-prioritize-ai-business-opportunities': 'core',
  'guides-how-to-find-an-ai-saas-wedge': 'core',
  'comparisons-badgersignal-vs-chatgpt-for-startup-idea-validation': 'core',
  'comparisons-badgersignal-vs-manual-market-research': 'core',
  'comparisons-idea-generator-vs-opportunity-analysis': 'core',
  'use-cases-ai-tools-for-recruiters': 'core',
  'use-cases-ai-tools-for-agencies': 'core',
  'use-cases-ai-tools-for-ecommerce-operators': 'core',
  'use-cases-ai-tools-for-consultants': 'core',
  'examples-ai-tools-for-freelancers': 'example',
  'examples-ai-tools-for-small-business': 'example',
  'examples-ai-tools-for-recruiters': 'example',
  'examples-ai-tools-for-agencies': 'example',
  'examples-ai-tools-for-ecommerce-operations': 'example',
  'examples-ai-tools-for-customer-support-operations': 'example',
}

function getLocaleValue<T>(
  record: Partial<Record<SeoLocale, T>>,
  locale: SeoLocale
): T {
  return record[locale] ?? record.en!
}

function getPageLocaleValue<T>(
  record: Partial<Record<SeoLocale, Record<MarketingPageKey, T>>>,
  locale: SeoLocale,
  pageKey: MarketingPageKey
): T {
  const localeRecord = record[locale] ?? record.en!
  return localeRecord[pageKey] ?? record.en![pageKey]
}

const MARKETING_PATH_TO_PAGE_KEY = new Map<string, MarketingPageKey>(
  ALL_SEO_LOCALES.flatMap((locale) =>
    MARKETING_PAGE_KEYS.flatMap((pageKey) =>
      isMarketingPagePublishedForLocale(pageKey, locale)
        ? [[getMarketingPagePath(pageKey, locale), pageKey] as const]
        : []
    )
  )
)

function localizeMarketingHref(href: string, locale: SeoLocale): string {
  const pageKey = MARKETING_PATH_TO_PAGE_KEY.get(href)
  if (!pageKey) {
    return href
  }

  return getMarketingPagePath(
    pageKey,
    isMarketingPagePublishedForLocale(pageKey, locale) ? locale : 'en'
  )
}

function localizeMarketingLinks<T>(value: T, locale: SeoLocale): T {
  if (Array.isArray(value)) {
    return value.map((item) => localizeMarketingLinks(item, locale)) as T
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, entryValue]) => {
        if (key === 'href' && typeof entryValue === 'string') {
          return [key, localizeMarketingHref(entryValue, locale)]
        }

        return [key, localizeMarketingLinks(entryValue, locale)]
      })
    ) as T
  }

  return value
}

const SHARED_FIELDS: Partial<
  Record<SeoLocale, Omit<SharedTemplateFields, 'sectionLabel' | 'title' | 'description'>>
> = {
  en: {
    primaryAction: {
      label: 'Start Analysis',
      href: '/tools/product-insight',
    },
    secondaryAction: {
      label: 'View Sample Report',
      href: '/en/examples/ai-tools-for-freelancers',
      variant: 'outline',
    },
    signals: [
      { value: '20+', label: 'Evaluated opportunities' },
      { value: '3', label: 'Core workflows' },
      { value: '5', label: 'Public examples' },
    ],
  },
  zh: {
    primaryAction: {
      label: '开始分析',
      href: '/tools/product-insight',
    },
    secondaryAction: {
      label: '查看样例报告',
      href: '/zh/examples/ai-tools-for-freelancers',
      variant: 'outline',
    },
    signals: [
      { value: '20+', label: '评估机会数' },
      { value: '3', label: '核心流程' },
      { value: '5', label: '公开样例' },
    ],
  },
  de: {
    primaryAction: {
      label: 'Analyse starten',
      href: '/tools/product-insight',
    },
    secondaryAction: {
      label: 'Beispielbericht ansehen',
      href: '/de/examples/ai-tools-for-freelancers',
      variant: 'outline',
    },
    signals: [
      { value: '20+', label: 'Bewertete Chancen' },
      { value: '3', label: 'Kern-Workflows' },
      { value: '2', label: 'Offentliche Beispiele' },
    ],
  },
  fr: {
    primaryAction: {
      label: "Lancer l'analyse",
      href: '/tools/product-insight',
    },
    secondaryAction: {
      label: "Voir le rapport d'exemple",
      href: '/fr/examples/ai-tools-for-freelancers',
      variant: 'outline',
    },
    signals: [
      { value: '20+', label: 'Opportunites evaluees' },
      { value: '3', label: 'Workflows principaux' },
      { value: '2', label: 'Exemples publics' },
    ],
  },
  it: {
    primaryAction: {
      label: 'Avvia analisi',
      href: '/tools/product-insight',
    },
    secondaryAction: {
      label: 'Vedi report di esempio',
      href: '/it/examples/ai-tools-for-freelancers',
      variant: 'outline',
    },
    signals: [
      { value: '20+', label: 'Opportunita valutate' },
      { value: '3', label: 'Flussi principali' },
      { value: '2', label: 'Esempi pubblici' },
    ],
  },
  es: {
    primaryAction: {
      label: 'Iniciar analisis',
      href: '/tools/product-insight',
    },
    secondaryAction: {
      label: 'Ver reporte de ejemplo',
      href: '/es/examples/ai-tools-for-freelancers',
      variant: 'outline',
    },
    signals: [
      { value: '20+', label: 'Oportunidades evaluadas' },
      { value: '3', label: 'Flujos clave' },
      { value: '2', label: 'Ejemplos publicos' },
    ],
  },
  pt: {
    primaryAction: {
      label: 'Iniciar analise',
      href: '/tools/product-insight',
    },
    secondaryAction: {
      label: 'Ver relatorio de exemplo',
      href: '/pt/examples/ai-tools-for-freelancers',
      variant: 'outline',
    },
    signals: [
      { value: '20+', label: 'Oportunidades avaliadas' },
      { value: '3', label: 'Fluxos principais' },
      { value: '2', label: 'Exemplos publicos' },
    ],
  },
}

const PAGE_HERO_FIELDS: Partial<Record<
  SeoLocale,
  Record<MarketingPageKey, Pick<SharedTemplateFields, 'sectionLabel' | 'title' | 'description'>>
>> = {
  en: {
    home: {
      sectionLabel: 'AI startup research',
      title: 'Evaluate AI startup directions.',
      description:
        'BadgerSignal turns one product direction into 20+ evaluated opportunities, ranked workflows, and public sample reports so you can see value before any login wall.',
    },
    'ai-startup-idea-generator': {
      sectionLabel: 'AI startup idea generator',
      title: 'Generate structured AI startup ideas.',
      description:
        'Start from one product direction, compare evaluated startup wedges, and carry the strongest idea into validation.',
    },
    'saas-idea-validation': {
      sectionLabel: 'SaaS idea validation',
      title: 'Validate a SaaS direction before you build.',
      description:
        'Pressure-test one SaaS idea, see the trade-offs faster, and decide whether to keep going or cut it.',
    },
    'ai-business-opportunity-analysis': {
      sectionLabel: 'AI business opportunity analysis',
      title: 'Find the AI opportunity worth your next move.',
      description:
        'Map a broader market, rank the strongest AI wedges inside it, and choose the next opportunity to validate.',
    },
    'guides-how-to-validate-an-ai-startup-idea': {
      sectionLabel: 'How-to guide',
      title: 'Validate an AI startup idea before you build.',
      description:
        'Use a practical validation workflow to narrow the market, inspect repeated pain, and decide whether an AI startup wedge deserves deeper work.',
    },
    'guides-how-to-prioritize-ai-business-opportunities': {
      sectionLabel: 'How-to guide',
      title: 'Prioritize AI business opportunities before you chase all of them.',
      description:
        'Use a structured prioritization method to compare urgency, willingness to pay, and implementation drag before you pick the next AI wedge.',
    },
    'guides-how-to-find-an-ai-saas-wedge': {
      sectionLabel: 'How-to guide',
      title: 'Find an AI SaaS wedge before you build the wrong scope.',
      description:
        'Learn how to narrow a broader AI direction into a sharper SaaS wedge by following repeated workflow pain instead of building a generic tool.',
    },
    'comparisons-badgersignal-vs-chatgpt-for-startup-idea-validation': {
      sectionLabel: 'Comparison',
      title: 'BadgerSignal vs ChatGPT for startup idea validation.',
      description:
        'See when generic prompting is enough, when structured scoring matters more, and which workflow gives you a cleaner next decision.',
    },
    'comparisons-badgersignal-vs-manual-market-research': {
      sectionLabel: 'Comparison',
      title: 'BadgerSignal vs manual market research.',
      description:
        'Compare when ranked opportunity analysis speeds you up, when manual research still matters more, and how to combine both without doing too much too early.',
    },
    'comparisons-idea-generator-vs-opportunity-analysis': {
      sectionLabel: 'Comparison',
      title: 'Idea generator vs opportunity analysis, by decision stage.',
      description:
        'See when you need more candidate wedges, when you need prioritization instead, and which workflow fits the next startup question better.',
    },
    'use-cases-ai-tools-for-recruiters': {
      sectionLabel: 'Use case',
      title: 'AI tools for recruiters, narrowed to repeated workflow pain.',
      description:
        'Explore recruiter-specific AI wedges around interview notes, candidate follow-up, and operational handoff before you commit to a product direction.',
    },
    'use-cases-ai-tools-for-agencies': {
      sectionLabel: 'Use case',
      title: 'AI tools for agencies, narrowed to delivery friction.',
      description:
        'Explore agency-specific AI wedges around client feedback loops, recap drift, and margin-eating handoff work before you build a broader service tool.',
    },
    'use-cases-ai-tools-for-ecommerce-operators': {
      sectionLabel: 'Use case',
      title: 'AI tools for ecommerce operators, narrowed to repeated ops drag.',
      description:
        'Explore ecommerce-specific AI wedges around catalog cleanup, support routing, and returns workflows before you build a broader commerce tool.',
    },
    'use-cases-ai-tools-for-consultants': {
      sectionLabel: 'Use case',
      title: 'AI tools for consultants, narrowed to client-service workflow drag.',
      description:
        'Explore consultant-specific AI wedges around follow-up plans, scope drafting, and action summaries before you build a broader expert-workflow tool.',
    },
    'examples-ai-tools-for-freelancers': {
      sectionLabel: 'Public sample report',
      title: 'AI tools for freelancers, ranked by workflow.',
      description:
        'Read a public freelancer report that ranks workflow wedges by repeated pain, time recovery, and willingness to pay.',
    },
    'examples-ai-tools-for-small-business': {
      sectionLabel: 'Public sample report',
      title: 'AI tools for small business, ranked by workflow.',
      description:
        'Review a public small-business report that ranks workflow wedges by revenue recovery, urgency, and operational simplicity.',
    },
    'examples-ai-tools-for-recruiters': {
      sectionLabel: 'Public sample report',
      title: 'AI tools for recruiters, ranked by workflow.',
      description:
        'Read a public recruiter report that ranks workflow wedges by follow-up drag, time-to-response pressure, and product depth.',
    },
    'examples-ai-tools-for-agencies': {
      sectionLabel: 'Public sample report',
      title: 'AI tools for agencies, ranked by workflow.',
      description:
        'Read a public agency report that ranks workflow wedges by rework drag, delivery coordination pressure, and margin visibility.',
    },
    'examples-ai-tools-for-ecommerce-operations': {
      sectionLabel: 'Public sample report',
      title: 'AI tools for ecommerce operations, ranked by workflow.',
      description:
        'Read a public ecommerce-operations report that ranks workflow wedges by resolution speed, operator drag, and structured-input fit.',
    },
    'examples-ai-tools-for-customer-support-operations': {
      sectionLabel: 'Public sample report',
      title: 'AI tools for customer support operations, ranked by workflow.',
      description:
        'Read a public support-operations report that ranks workflow wedges by queue drag, response clarity, and routing confidence.',
    },
  },
  zh: {
    home: {
      sectionLabel: 'AI 创业研究',
      title: '评估 AI 创业方向',
      description: 'BadgerSignal 会把一个产品方向转成 20+ 个经过评估的机会、可排序的分析流程和公开样例报告，让访客在登录前先看到真实价值。',
    },
    'ai-startup-idea-generator': {
      sectionLabel: 'AI 创业点子生成器',
      title: '把方向扩展成更靠谱的 AI 创业点子',
      description: '围绕一个产品方向比较经过评估的创业切口，更快决定先验证哪一个。',
    },
    'saas-idea-validation': {
      sectionLabel: 'SaaS 点子验证',
      title: '先验证这个 SaaS 方向值不值得做',
      description: '围绕一个 SaaS 点子做压力测试，更快看清关键取舍，并判断该继续还是停下。',
    },
    'ai-business-opportunity-analysis': {
      sectionLabel: 'AI 商业机会分析',
      title: '找出最值得投入的 AI 机会',
      description: '从更宽的市场方向出发，比较其中最强的 AI 机会切口，找出下一步该优先验证的方向。',
    },
    'guides-how-to-validate-an-ai-startup-idea': {
      sectionLabel: '操作指南',
      title: '在投入开发前先验证 AI 创业点子',
      description: '用一套更实用的验证流程，先收窄市场、检查重复痛点，再判断这个 AI 创业切口值不值得继续。',
    },
    'guides-how-to-prioritize-ai-business-opportunities': {
      sectionLabel: '操作指南',
      title: '先给 AI 商业机会排优先级，再决定先做哪一个',
      description: '用一套更清晰的排序方法，先比较紧迫度、付费意愿和实现复杂度，再决定最值得先推进的 AI 切口。',
    },
    'guides-how-to-find-an-ai-saas-wedge': {
      sectionLabel: '操作指南',
      title: '先找到 AI SaaS 切口，再避免把产品做得太宽',
      description: '学习如何沿着重复工作流痛点收窄方向，把一个更宽的 AI 想法整理成更适合验证的 SaaS 切口。',
    },
    'comparisons-badgersignal-vs-chatgpt-for-startup-idea-validation': {
      sectionLabel: '对比指南',
      title: 'BadgerSignal 和 ChatGPT，谁更适合验证创业点子',
      description: '看清什么时候通用聊天已经够用，什么时候结构化评分更重要，以及哪条工作流更适合帮助你做下一步判断。',
    },
    'comparisons-badgersignal-vs-manual-market-research': {
      sectionLabel: '对比指南',
      title: 'BadgerSignal 和人工市场调研，什么时候该先用哪个',
      description: '看清什么时候应该先用结构化机会分析收窄方向，什么时候仍然需要更深的人工研究，以及两者怎么衔接。',
    },
    'comparisons-idea-generator-vs-opportunity-analysis': {
      sectionLabel: '对比指南',
      title: '点子生成器和机会分析，应该什么时候分别使用',
      description: '看清什么时候该先扩展更多候选切口，什么时候该把一个更宽空间压成可排序的优先列表。',
    },
    'use-cases-ai-tools-for-recruiters': {
      sectionLabel: '场景页',
      title: '面向招聘顾问的 AI 工具机会，先看重复工作流痛点',
      description: '围绕面试记录、候选人跟进和招聘运营交接，查看更适合招聘场景的 AI 产品切口。',
    },
    'use-cases-ai-tools-for-agencies': {
      sectionLabel: '场景页',
      title: '面向代理公司的 AI 工具机会，先看交付摩擦和返工成本',
      description: '围绕客户反馈循环、项目交接和交付整理，查看更适合代理公司场景的 AI 产品切口。',
    },
    'use-cases-ai-tools-for-ecommerce-operators': {
      sectionLabel: '场景页',
      title: '面向电商运营团队的 AI 工具机会，先看目录与售后拖拽',
      description: '围绕目录整理、售后分流和多渠道运营摩擦，查看更适合电商运营场景的 AI 产品切口。',
    },
    'use-cases-ai-tools-for-consultants': {
      sectionLabel: '场景页',
      title: '面向顾问型服务者的 AI 工具机会，先看跟进与 scope 拖拽',
      description:
        '围绕会后跟进、scope 草稿和行动摘要这些重复客户服务摩擦，查看更适合顾问场景的 AI 产品切口。',
    },
    'examples-ai-tools-for-freelancers': {
      sectionLabel: '公开样例报告',
      title: '自由职业者 AI 工具机会排序',
      description:
        '阅读一份自由职业者公开样例报告，看不同工作流切口如何按痛点强度、时间回收和付费意愿排序。',
    },
    'examples-ai-tools-for-small-business': {
      sectionLabel: '公开样例报告',
      title: '中小企业 AI 工具机会排序',
      description:
        '查看一份中小企业公开样例报告，看不同工作流切口如何按收入影响、紧迫度和执行复杂度排序。',
    },
    'examples-ai-tools-for-recruiters': {
      sectionLabel: '公开样例报告',
      title: '招聘顾问 AI 工具机会排序',
      description:
        '阅读一份招聘顾问公开样例报告，看不同招聘工作流切口如何按跟进拖延、响应压力和产品深度排序。',
    },
    'examples-ai-tools-for-agencies': {
      sectionLabel: '公开样例报告',
      title: '代理公司 AI 工具机会排序',
      description:
        '阅读一份代理公司公开样例报告，看不同交付工作流切口如何按返工压力、交接摩擦和利润信号排序。',
    },
    'examples-ai-tools-for-ecommerce-operations': {
      sectionLabel: '公开样例报告',
      title: '电商运营 AI 工具机会排序',
      description:
        '阅读一份电商运营公开样例报告，看不同目录、退货和支持工作流切口如何按处理速度、运营拖拽和产品化信号排序。',
    },
    'examples-ai-tools-for-customer-support-operations': {
      sectionLabel: '公开样例报告',
      title: '客户支持运营 AI 工具机会排序',
      description:
        '阅读一份客户支持运营公开样例报告，看不同分流、投诉聚类和升级准备切口如何按队列拖拽、响应清晰度和路由置信度排序。',
    },
  },
  de: {
    home: {
      sectionLabel: 'KI-Startup-Recherche',
      title: 'Bewerte KI-Startup-Richtungen.',
      description:
        'BadgerSignal verwandelt eine Produktrichtung in 20+ bewertete Chancen, priorisierte Workflows und offentliche Beispielberichte, damit Besucher den Wert vor jeder Login-Hurde sehen.',
    },
    'ai-startup-idea-generator': {
      sectionLabel: 'KI-Startup-Ideengenerator',
      title: 'Forme aus einer Richtung klare KI-Startup-Ideen.',
      description:
        'Starte mit einer Produktrichtung, vergleiche bewertete Startup-Keile und nimm den starksten in die Validierung.',
    },
    'saas-idea-validation': {
      sectionLabel: 'SaaS-Ideenvalidierung',
      title: 'Prufe eine SaaS-Richtung vor dem Bauen.',
      description:
        'Prufe eine SaaS-Idee, sieh die Abwagungen fruher und entscheide schneller zwischen weiter oder stoppen.',
    },
    'ai-business-opportunity-analysis': {
      sectionLabel: 'KI-Geschaftschancenanalyse',
      title: 'Finde die KI-Chance fur deinen nachsten Schritt.',
      description:
        'Kartiere einen breiteren Markt, priorisiere die starksten KI-Keile darin und wahl den nachsten Validierungsschritt.',
    },
    'examples-ai-tools-for-freelancers': {
      sectionLabel: 'Offentlicher Beispielbericht',
      title: 'KI-Tools fur Freelancer, priorisiert nach Workflow.',
      description:
        'Lies einen offentlichen Freelancer-Bericht, der Workflow-Keile nach Schmerz, Zeiterholung und Zahlungsbereitschaft ordnet.',
    },
    'examples-ai-tools-for-small-business': {
      sectionLabel: 'Offentlicher Beispielbericht',
      title: 'KI-Tools fur kleine Unternehmen, priorisiert nach Workflow.',
      description:
        'Prufe einen offentlichen Bericht fur kleine Unternehmen, der Workflow-Keile nach Umsatzhebel, Dringlichkeit und Einfachheit ordnet.',
    },
  },
  fr: {
    home: {
      sectionLabel: 'Recherche startup IA',
      title: 'Evaluez des directions startup IA.',
      description:
        "BadgerSignal transforme une direction produit en 20+ opportunites evaluees, workflows classes et rapports d'exemple publics afin que le visiteur voie la valeur avant toute friction de connexion.",
    },
    'ai-startup-idea-generator': {
      sectionLabel: "Generateur d'idees startup IA",
      title: "Transformez une direction en idees startup IA plus nettes.",
      description:
        "Partez d une direction produit, comparez des wedges startup evalues et retenez celui a valider ensuite.",
    },
    'saas-idea-validation': {
      sectionLabel: "Validation d'idee SaaS",
      title: 'Validez une direction SaaS avant de construire.',
      description:
        "Mettez une idee SaaS a l epreuve, voyez les arbitrages plus vite et decidez de continuer ou non.",
    },
    'ai-business-opportunity-analysis': {
      sectionLabel: 'Analyse des opportunites IA',
      title: 'Identifiez l opportunite IA pour votre prochain mouvement.',
      description:
        'Cartographiez un marche plus large, classez les wedges IA les plus solides et choisissez la prochaine piste a valider.',
    },
    'examples-ai-tools-for-freelancers': {
      sectionLabel: "Rapport d'exemple public",
      title: 'Outils IA pour freelances, tries par workflow.',
      description:
        'Lisez un rapport public freelance qui classe les wedges workflow par douleur repetee, temps recupere et volonte de payer.',
    },
    'examples-ai-tools-for-small-business': {
      sectionLabel: "Rapport d'exemple public",
      title: 'Outils IA pour petites entreprises, tries par workflow.',
      description:
        'Consultez un rapport public petites entreprises qui classe les wedges workflow par effet revenu, urgence et simplicite operationnelle.',
    },
  },
  it: {
    home: {
      sectionLabel: 'Ricerca startup AI',
      title: 'Valuta direzioni startup AI.',
      description:
        'BadgerSignal trasforma una direzione di prodotto in 20+ opportunita valutate, workflow ordinati e report pubblici di esempio, cosi il visitatore vede il valore prima del login.',
    },
    'ai-startup-idea-generator': {
      sectionLabel: 'Generatore di idee startup AI',
      title: 'Trasforma una direzione in idee startup AI piu solide.',
      description:
        'Parti da una direzione prodotto, confronta wedge startup valutati e porta avanti quello piu forte.',
    },
    'saas-idea-validation': {
      sectionLabel: 'Validazione idea SaaS',
      title: 'Valida una direzione SaaS prima di sviluppare.',
      description:
        'Metti alla prova un idea SaaS, chiarisci prima i trade-off e decidi se continuare o fermarti.',
    },
    'ai-business-opportunity-analysis': {
      sectionLabel: 'Analisi opportunita AI',
      title: 'Trova l opportunita AI per il tuo prossimo passo.',
      description:
        'Mappa un mercato piu ampio, ordina i wedge AI piu forti e scegli la prossima opportunita da validare.',
    },
    'examples-ai-tools-for-freelancers': {
      sectionLabel: 'Report pubblico di esempio',
      title: 'Strumenti AI per freelance, ordinati per workflow.',
      description:
        'Leggi un report pubblico freelance che ordina i wedge di workflow per dolore ricorrente, tempo recuperato e volonta di pagare.',
    },
    'examples-ai-tools-for-small-business': {
      sectionLabel: 'Report pubblico di esempio',
      title: 'Strumenti AI per piccole imprese, ordinati per workflow.',
      description:
        'Consulta un report pubblico per piccole imprese che ordina i wedge di workflow per recupero ricavi, urgenza e semplicita operativa.',
    },
  },
  es: {
    home: {
      sectionLabel: 'Investigacion de startups con IA',
      title: 'Evalua direcciones de startup con IA.',
      description:
        'BadgerSignal convierte una direccion de producto en 20+ oportunidades evaluadas, flujos priorizados y reportes publicos de ejemplo para que el visitante vea valor antes del login.',
    },
    'ai-startup-idea-generator': {
      sectionLabel: 'Generador de ideas de startup con IA',
      title: 'Convierte una direccion en ideas de startup con IA mas claras.',
      description:
        'Parte de una direccion de producto, compara wedges de startup evaluados y lleva el mas fuerte a validacion.',
    },
    'saas-idea-validation': {
      sectionLabel: 'Validacion de idea SaaS',
      title: 'Valida una direccion SaaS antes de construirla.',
      description:
        'Pon a prueba una idea SaaS, aclara antes los trade-offs y decide si seguir o parar.',
    },
    'ai-business-opportunity-analysis': {
      sectionLabel: 'Analisis de oportunidades IA',
      title: 'Encuentra la oportunidad IA para tu siguiente paso.',
      description:
        'Mapea un mercado mas amplio, ordena los wedges IA mas fuertes y elige la siguiente oportunidad a validar.',
    },
    'examples-ai-tools-for-freelancers': {
      sectionLabel: 'Reporte publico de ejemplo',
      title: 'Herramientas IA para freelancers, ordenadas por flujo.',
      description:
        'Lee un reporte publico para freelancers que ordena wedges de workflow por dolor repetido, tiempo recuperado y disposicion a pagar.',
    },
    'examples-ai-tools-for-small-business': {
      sectionLabel: 'Reporte publico de ejemplo',
      title: 'Herramientas IA para pequenas empresas, ordenadas por flujo.',
      description:
        'Revisa un reporte publico para pequenas empresas que ordena wedges de workflow por impacto en ingresos, urgencia y simplicidad operativa.',
    },
  },
  pt: {
    home: {
      sectionLabel: 'Pesquisa de startups com IA',
      title: 'Avalie direcoes de startup com IA.',
      description:
        'BadgerSignal transforma uma direcao de produto em 20+ oportunidades avaliadas, fluxos priorizados e relatorios publicos de exemplo para que o visitante veja valor antes do login.',
    },
    'ai-startup-idea-generator': {
      sectionLabel: 'Gerador de ideias de startup com IA',
      title: 'Transforme uma direcao em ideias de startup com IA mais claras.',
      description:
        'Comece com uma direcao de produto, compare wedges de startup avaliados e leve adiante o mais forte.',
    },
    'saas-idea-validation': {
      sectionLabel: 'Validacao de ideia SaaS',
      title: 'Valide uma direcao SaaS antes de construir.',
      description:
        'Teste uma ideia SaaS, enxergue antes os trade-offs e decida se continua ou para.',
    },
    'ai-business-opportunity-analysis': {
      sectionLabel: 'Analise de oportunidades IA',
      title: 'Encontre a oportunidade IA para o seu proximo passo.',
      description:
        'Mapeie um mercado mais amplo, ordene os wedges de IA mais fortes e escolha a proxima oportunidade para validar.',
    },
    'examples-ai-tools-for-freelancers': {
      sectionLabel: 'Relatorio publico de exemplo',
      title: 'Ferramentas de IA para freelancers, ordenadas por workflow.',
      description:
        'Leia um relatorio publico para freelancers que ordena wedges de workflow por dor recorrente, tempo recuperado e disposicao para pagar.',
    },
    'examples-ai-tools-for-small-business': {
      sectionLabel: 'Relatorio publico de exemplo',
      title: 'Ferramentas de IA para pequenas empresas, ordenadas por workflow.',
      description:
        'Revise um relatorio publico para pequenas empresas que ordena wedges de workflow por impacto em receita, urgencia e simplicidade operacional.',
    },
  },
}

const TEMPLATE_FIELDS: Partial<Record<
  SeoLocale,
  {
    home: HomepageContentFields
    core: CoreContentFields
    example: ExampleContentFields
  }
>> = {
  en: {
    home: {
      heroVisualEyebrow: 'What you get',
      heroVisualTitle: 'Turn one direction into a ranked opportunity map',
      heroVisualLayers: [
        'Product direction input',
        'Scoring dimensions and ranked opportunities',
        'Public sample reports before login',
      ],
      supportEyebrow: 'Choose your path',
      supportTitle: 'Start with the page that matches your next question.',
      supportDescription:
        'Use the homepage as a decision hub: jump into a core workflow if you know what you need, or inspect a public sample report first if you want to see output quality before trying the product.',
      supportColumns: [
        {
          title: 'AI startup idea generator',
          description:
            'Explore startup directions from one product theme and compare which wedges look worth validating first.',
          href: '/en/ai-startup-idea-generator',
          actionLabel: 'Explore generator page',
        },
        {
          title: 'SaaS idea validation',
          description:
            'See how structured scoring helps narrow a SaaS direction before you spend time building the wrong thing.',
          href: '/en/saas-idea-validation',
          actionLabel: 'Open validation page',
        },
        {
          title: 'AI business opportunity analysis',
          description:
            'Move from a broad market direction to a clearer read on which opportunity deserves the next step.',
          href: '/en/ai-business-opportunity-analysis',
          actionLabel: 'View analysis page',
        },
        {
          title: 'Guide: validate an AI startup idea',
          description:
            'Follow the practical validation sequence before you build, and see which questions matter before deeper product work.',
          href: '/en/guides/how-to-validate-an-ai-startup-idea',
          actionLabel: 'Open validation guide',
        },
        {
          title: 'Comparison: BadgerSignal vs ChatGPT',
          description:
            'Compare generic prompting with structured validation before deciding which workflow matches your next decision.',
          href: '/en/comparisons/badgersignal-vs-chatgpt-for-startup-idea-validation',
          actionLabel: 'Open comparison page',
        },
        {
          title: 'Sample report: recruiters',
          description:
            'Inspect a public recruiter workflow report before login and judge whether ranked hiring-operation wedges feel concrete enough.',
          href: '/en/examples/ai-tools-for-recruiters',
          actionLabel: 'View recruiter sample',
        },
        {
          title: 'Guide: prioritize AI opportunities',
          description:
            'Use a practical ranking method when you already see too many possible wedges and need to decide what deserves the next move.',
          href: '/en/guides/how-to-prioritize-ai-business-opportunities',
          actionLabel: 'Open prioritization guide',
        },
        {
          title: 'Sample report: agencies',
          description:
            'Inspect a public agency workflow report built around delivery coordination, feedback loops, and margin-sensitive rework.',
          href: '/en/examples/ai-tools-for-agencies',
          actionLabel: 'View agency sample',
        },
        {
          title: 'Guide: find an AI SaaS wedge',
          description:
            'Learn how to narrow a broader AI direction into a sharper SaaS wedge before you build a tool that is too wide to validate.',
          href: '/en/guides/how-to-find-an-ai-saas-wedge',
          actionLabel: 'Open wedge guide',
        },
        {
          title: 'Sample report: ecommerce operations',
          description:
            'Inspect a public ecommerce-operations report built around catalog cleanup, support routing, and returns workflow drag.',
          href: '/en/examples/ai-tools-for-ecommerce-operations',
          actionLabel: 'View ecommerce sample',
        },
      ],
      intentEyebrow: 'Use the right public page',
      intentTitle: 'Use the homepage when you need orientation before choosing a workflow.',
      intentDescription:
        'The homepage is best when you do not yet know whether you need more ideas, sharper validation, or a public proof example. It helps you pick the right next page instead of dropping straight into the app.',
      intentColumns: [
        {
          title: 'Best for',
          description:
            'Visitors comparing the overall product motion and deciding which public page fits their next question.',
        },
        {
          title: 'Not for',
          description:
            'People who already know they want one specific workflow and would be better served by opening that page directly.',
        },
        {
          title: 'Use it when',
          description:
            'You want a quick map of the public journey before committing to idea generation, validation, opportunity analysis, or sample reports.',
        },
      ],
      detailEyebrow: 'How it works',
      detailTitle: 'See the product workflow before you ever sign in.',
      detailDescription:
        'The homepage explains the motion from direction to ranked opportunity set so search visitors can understand the product without being pushed straight into the app.',
      workflowSteps: [
        {
          label: 'Step 01',
          title: 'Bring one product direction',
          description: 'Start with a market theme, user type, or product wedge you want to explore.',
        },
        {
          label: 'Step 02',
          title: 'Review ranked opportunities',
          description: 'Compare a structured set of evaluated opportunities instead of collecting scattered ideas.',
        },
        {
          label: 'Step 03',
          title: 'Inspect scoring dimensions',
          description: 'Use visible scoring logic and market-signal framing to understand why a direction stands out.',
        },
        {
          label: 'Step 04',
          title: 'Continue with the strongest wedge',
          description: 'Take the next step with more confidence instead of guessing which opportunity to validate first.',
        },
      ],
      closing: {
        eyebrow: 'Ready to try it',
        title: 'Start with your own direction or review a public sample first.',
        description:
          'BadgerSignal is designed to show structure before friction. Enter your own direction when you are ready, or inspect a sample report to see how the workflow looks in practice.',
        primaryAction: {
          label: 'Start Analysis',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'View Sample Report',
          href: '/en/examples/ai-tools-for-freelancers',
          variant: 'outline',
        },
      },
    },
    core: {
      heroVisualEyebrow: 'Landing lens',
      heroVisualTitle: 'One keyword, one promise, one next step',
      heroVisualRows: [
        { label: 'Intent fit', value: 'High' },
        { label: 'Scoring depth', value: 'Ready' },
        { label: 'Public proof', value: 'Visible' },
      ],
      supportEyebrow: 'Template role',
      supportTitle:
        'The core landing template is now structured around one intent, one proof rail, and one conversion path.',
      supportDescription:
        'This layout is built for high-intent SEO pages such as generator, validation, and opportunity-analysis routes.',
      diagnosticColumns: [
        {
          title: 'Intent clarity',
          description:
            'The hero is tuned for a single search intent so the page can rank and convert without diluting the promise.',
        },
        {
          title: 'Proof structure',
          description:
            'The support section leaves room for product logic, scoring method, and visible trust signals.',
        },
        {
          title: 'Input-output bridge',
          description:
            'The detail section is already split to show what users bring in and what they receive back.',
        },
      ],
      intentEyebrow: 'Choose the right workflow',
      intentTitle: 'Use the page that matches the decision you need to make next.',
      intentDescription:
        'Core pages work best when they help visitors self-select quickly. This section clarifies whether the workflow is right for the current stage or whether another page is a better fit first.',
      intentColumns: [
        {
          title: 'Best for',
          description:
            'Visitors who already know the market, workflow, or candidate idea they want to inspect more seriously.',
        },
        {
          title: 'Not for',
          description:
            'People looking for a generic brainstorm or a final guarantee without enough context to evaluate.',
        },
        {
          title: 'Use it when',
          description:
            'You need a sharper next-step decision than “keep exploring” and want visible structure before logging in.',
        },
      ],
      detailEyebrow: 'Example framing',
      detailTitle: 'The template already separates user input from final outcome.',
      detailDescription:
        'This gives us a clean place to insert real sample prompts, result summaries, and structured scoring later on.',
      inputLabel: 'Input lane',
      inputExample: [
        'A focused product direction or market theme.',
        'A startup question that needs prioritization.',
        'A narrow wedge that still needs structured validation.',
      ],
      outputLabel: 'Output lane',
      outputExample: [
        '20+ evaluated opportunities with ranked structure.',
        'A clearer read on which direction deserves attention first.',
        'Public-facing proof blocks we can later localize and expand.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Common questions about this workflow',
      faqDescription:
        'These placeholder answers will be replaced by route-specific FAQs as each core page is implemented.',
      faqItems: [
        {
          question: 'What does this page help me do?',
          answer:
            'It explains one focused workflow, shows the structure of the output, and points you to the next product action.',
        },
        {
          question: 'Will this page show example input and output?',
          answer:
            'Yes. Each core landing page includes a visible input-output frame so visitors understand the workflow before logging in.',
        },
      ],
      relatedEyebrow: 'Keep exploring',
      relatedTitle: 'Move to the next page that sharpens your decision.',
      relatedDescription:
        'Each core workflow should connect to the homepage, a neighboring workflow, and at least one public sample so visitors can keep narrowing the decision without hitting a dead end.',
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Return to the main decision hub and compare the full set of public entry points.',
          href: '/en',
          actionLabel: 'Back to homepage',
        },
        {
          title: 'SaaS idea validation',
          description: 'Pressure-test one candidate idea after you narrow the field.',
          href: '/en/saas-idea-validation',
          actionLabel: 'Open validation page',
        },
        {
          title: 'Freelancer sample report',
          description: 'Inspect a public report to see how ranked opportunities are presented before login.',
          href: '/en/examples/ai-tools-for-freelancers',
          actionLabel: 'View public sample',
        },
      ],
      closing: {
        eyebrow: 'Next stage',
        title: 'This landing template is ready for keyword-specific content.',
        description:
          'The next pass will replace scaffold copy with route-specific messaging, proof, and FAQs.',
        primaryAction: {
          label: 'Start Analysis',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'View Sample Report',
          href: '/en/examples/ai-tools-for-freelancers',
          variant: 'outline',
        },
      },
    },
    example: {
      heroVisualEyebrow: 'Example spine',
      heroVisualTitle: 'A public report before sign-in friction',
      heroVisualSteps: ['Scenario brief', 'Ranked opportunities', 'Why this set wins'],
      supportEyebrow: 'Template role',
      supportTitle: 'The public example template is shaped to show real output before login friction.',
      supportDescription:
        'This is the structure we will use for public reports that prove the product quality to search visitors.',
      supportSnapshots: [
        {
          label: 'Market slice',
          value: 'Defined use case',
          description: 'A real public sample needs a concrete audience and a clear operating context.',
        },
        {
          label: 'Main pain',
          value: 'Operational drag',
          description: 'The sample should explain what repetitive pain makes the workflow worth paying for.',
        },
        {
          label: 'Best next move',
          value: 'Validate the top wedge',
          description: 'The page should leave the visitor with a stronger next action, not just curiosity.',
        },
      ],
      intentEyebrow: 'How to use this sample',
      intentTitle: 'Use sample reports to judge output quality before you run your own direction.',
      intentDescription:
        'Public examples are meant to answer a simple question for search visitors: does the workflow produce ranked output that looks credible enough to try with my own market, audience, or problem?',
      intentColumns: [
        {
          title: 'Best for',
          description:
            'Visitors who want to inspect real output shape and ranking logic before spending time inside the product.',
        },
        {
          title: 'Not for',
          description:
            'People who already know their own market direction and are ready to run an analysis instead of reviewing a public sample first.',
        },
        {
          title: 'Use it when',
          description:
            'You want to compare how the product frames a real scenario, ranks wedges, and turns raw pain into a next validation move.',
        },
      ],
      opportunityEyebrow: 'Ranked opportunities',
      opportunityTitle: 'This section is reserved for the highest-confidence product wedges.',
      opportunityDescription:
        'Each opportunity block is designed to show score, audience fit, timing logic, and a concrete next validation move.',
      opportunityLabels: {
        score: 'Score',
        audience: 'Audience',
        whyNow: 'Why now',
        nextMove: 'Next move',
      },
      opportunityItems: [
        {
          title: 'Top opportunity lane',
          score: 'Score-ready',
          description:
            'The first example block is already shaped for ranked opportunity summaries with visible confidence cues.',
        },
        {
          title: 'Scenario fit lane',
          score: 'Intent-ready',
          description:
            'A second column can explain why the scenario is attractive without forcing the visitor to sign in first.',
        },
        {
          title: 'Decision lane',
          score: 'CTA-ready',
          description:
            'The third column is reserved for the reasoning that turns curiosity into product trial.',
        },
      ],
      detailEyebrow: 'Example anatomy',
      detailTitle:
        'The template already leaves room for methodology, scoring logic, and scenario context.',
      detailDescription:
        'That means we can publish sample pages that feel substantive, not like teaser stubs with screenshots only.',
      diagnosticColumns: [
        {
          title: 'Scenario brief',
          description:
            'A clear first paragraph explains the market slice and why this sample exists.',
        },
        {
          title: 'Ranked output',
          description:
            'The middle band is built for visible opportunity ranking instead of vague narrative copy.',
        },
        {
          title: 'Why it wins',
          description:
            'The last band is reserved for the reasoning, scoring, and next-step CTA that move visitors forward.',
        },
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Common questions about reading a public sample report',
      faqDescription:
        'These answers help search visitors understand what a sample report proves, how to read it, and when it is time to run their own direction.',
      faqItems: [
        {
          question: 'What should I use this sample report for?',
          answer:
            'Use it to judge whether the output feels concrete, ranked, and actionable enough before you submit your own market direction.',
        },
        {
          question: 'Is this sample based on a real workflow scenario?',
          answer:
            'Yes. Public samples are organized around a concrete audience and workflow so visitors can inspect a realistic output shape, not just a generic demo.',
        },
        {
          question: 'What should I do after reading the sample?',
          answer:
            'If the ranking logic and output quality feel relevant, run your own direction next or compare another public workflow before you decide.',
        },
      ],
      relatedEyebrow: 'Continue exploring',
      relatedTitle: 'Use the sample as a bridge into the rest of the public site.',
      relatedDescription:
        'A public sample should lead visitors back to the homepage and into the most relevant workflow pages, so the sample feels like part of a connected site instead of a dead-end report.',
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Go back to the main hub and compare the rest of the public entry points.',
          href: '/en',
          actionLabel: 'Back to homepage',
        },
        {
          title: 'AI startup idea generator',
          description: 'See how the product expands one direction into ranked startup wedges.',
          href: '/en/ai-startup-idea-generator',
          actionLabel: 'Explore generator page',
        },
        {
          title: 'SaaS idea validation',
          description: 'Inspect the workflow that pressure-tests one candidate idea more directly.',
          href: '/en/saas-idea-validation',
          actionLabel: 'Open validation page',
        },
      ],
      closing: {
        eyebrow: 'Next stage',
        title: 'The example template is ready for public report content.',
        description:
          'The next content pass can plug in scenario-specific briefs, top opportunities, and public proof blocks.',
        primaryAction: {
          label: 'Start Analysis',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'Back to homepage',
          href: '/en',
          variant: 'outline',
        },
      },
    },
    'examples-ai-tools-for-recruiters': {
      primaryAction: {
        label: 'Run your own analysis',
        href: '/tools/product-insight',
      },
      secondaryAction: {
        label: 'Back to homepage',
        href: '/en',
        variant: 'outline',
      },
      heroVisualEyebrow: 'Public sample report',
      heroVisualTitle: 'Recruiter workflows, ranked by follow-up speed and handoff clarity',
      heroVisualSteps: ['Recruiter context', 'Top workflow wedges', 'Recommended next validation move'],
      supportEyebrow: 'Scenario brief',
      supportTitle: 'AI tools for recruiters: a public sample report built around interview-note cleanup and candidate follow-up.',
      supportDescription:
        'This sample report focuses on the places where recruiters lose momentum between calls, summaries, and next actions. It frames the hiring context, the repeated admin drag, and the first wedge worth testing before you read the ranked opportunities.',
      supportSnapshots: [
        {
          label: 'Market slice',
          value: 'Independent recruiters and lean hiring operators',
          description:
            'People who handle screening conversations, role briefs, and candidate movement without a large internal ops layer.',
        },
        {
          label: 'Core pain',
          value: 'Candidate movement slows after every conversation',
          description:
            'The strongest opportunities sit where interview notes, summaries, and follow-up actions remain manual and time sensitive.',
        },
        {
          label: 'Best first wedge',
          value: 'Interview notes to candidate-summary assistant',
          description:
            'The sample suggests that structured note cleanup and next-step drafting is the strongest first wedge before broader recruiting automation.',
        },
      ],
      opportunityEyebrow: 'Ranked opportunities',
      opportunityTitle: 'The strongest recruiter wedge is operational note-to-follow-up cleanup, not broad recruiting AI.',
      opportunityDescription:
        'These rankings favor wedges with repeated usage, visible time-to-response value, and a simple enough product story that recruiters can try it without changing the whole hiring stack.',
      opportunityItems: [
        {
          rank: 'Rank 01',
          title: 'Interview notes to candidate-summary assistant',
          score: '8.8/10',
          description:
            'Turn interview notes, transcripts, and messy recruiter observations into a clean candidate summary with next actions, open questions, and role-fit signals.',
          audience: 'Independent recruiters, boutique search teams, and hiring operators handling high note volume.',
          whyNow:
            'LLMs are strong enough at extracting structure from messy conversational input, which makes time saved and handoff quality visible immediately.',
          nextMove:
            'Validate whether recruiters trust AI-generated summaries if each point stays anchored to source notes and can be reviewed quickly.',
          highlights: [
            'Clear value because it speeds candidate movement after every call.',
            'Narrow enough to explain without sounding like a full recruiting platform.',
            'Creates a credible expansion path into follow-up and internal handoff workflows.',
          ],
        },
        {
          rank: 'Rank 02',
          title: 'Recruiter follow-up draft and reminder copilot',
          score: '8.2/10',
          description:
            'Track who needs an update next, draft context-aware follow-up messages, and reduce the chance that strong candidates stall because the recruiter is buried in admin.',
          audience: 'Recruiters managing multiple open roles and fast-moving candidate pipelines.',
          whyNow:
            'Response speed is a major competitive advantage in recruiting, but follow-up is still fragmented across notes, inboxes, and ATS reminders.',
          nextMove:
            'Test whether recruiters care more about the draft quality or the prioritization layer that tells them who needs attention first.',
          highlights: [
            'Easy ROI story because candidate loss is expensive.',
            'Fits naturally after the note-to-summary workflow.',
            'Needs careful scoping to avoid becoming a generic outreach tool.',
          ],
        },
        {
          rank: 'Rank 03',
          title: 'Role brief to candidate-fit handoff assistant',
          score: '7.7/10',
          description:
            'Translate hiring-manager requirements, call notes, and recruiter observations into a cleaner internal fit narrative before the candidate moves to the next reviewer.',
          audience: 'Teams where recruiter quality and hiring-manager handoff quality heavily affect the funnel.',
          whyNow:
            'The handoff pain is real, but the workflow can vary more between teams, which makes the first product scope less universal than summary cleanup.',
          nextMove:
            'Validate whether this wedge should be sold as a second-layer workflow after the stronger summary and follow-up wedge is proven.',
          highlights: [
            'Strong downstream value when handoff quality is a real bottleneck.',
            'More variable process shape than the top-ranked wedge.',
            'Likely better as an expansion wedge than the first entry point.',
          ],
        },
      ],
      detailEyebrow: 'Why these opportunities scored well',
      detailTitle: 'These scores reward wedges with repeated recruiter usage, visible urgency, and low adoption friction.',
      detailDescription:
        'The top ideas here are not just painful. They also fit how recruiting tools get adopted: they solve an obvious workflow drag, improve movement speed, and do not force a full system change before value appears.',
      diagnosticColumns: [
        {
          title: 'Why recruiters buy',
          description:
            'They buy when a tool saves time inside candidate movement, improves summary quality, or reduces dropped follow-up without adding another heavy ops layer.',
        },
        {
          title: 'What keeps scores from being higher',
          description:
            'Recruiting stacks are fragmented, and trust matters. Products that over-automate too early or require deep workflow change will struggle to get adopted.',
        },
        {
          title: 'Recommended next move',
          description:
            'Interview recruiters who already juggle many screening conversations and position the first wedge as candidate-movement speed plus handoff clarity.',
        },
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Questions people ask when reading this recruiter sample report',
      faqDescription:
        'These answers explain what the sample proves, why note cleanup scored highest, and how to use the report before testing your own recruiting direction.',
      faqItems: [
        {
          question: 'What is this recruiter sample report trying to prove?',
          answer:
            'It shows how the product turns recruiter workflow pain into ranked wedges, so visitors can judge whether the output is specific enough before running their own market direction.',
        },
        {
          question: 'Why did interview-note cleanup rank above broader recruiting AI ideas?',
          answer:
            'Because it combines repeated pain, clear time pressure, and a narrow enough workflow that the product can be explained and tested without becoming a full recruiting suite.',
        },
        {
          question: 'How should I use this sample if my recruiting context is different?',
          answer:
            'Use the ranking logic as the reference point. If the reasoning feels useful, run your own buyer and workflow through the product to see whether a different recruiting wedge scores higher.',
        },
      ],
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Return to the public hub and compare the broader product journey before running your own analysis.',
          href: '/en',
          actionLabel: 'Back to homepage',
        },
        {
          title: 'Recruiter use case',
          description: 'Read the recruiter-specific use-case page that explains why these workflows create stronger product wedges.',
          href: '/en/use-cases/ai-tools-for-recruiters',
          actionLabel: 'View use-case page',
        },
        {
          title: 'SaaS idea validation',
          description: 'Take one promising recruiter wedge into a tighter continue-or-stop workflow after reading the sample.',
          href: '/en/saas-idea-validation',
          actionLabel: 'Open validation workflow',
        },
      ],
      closing: {
        eyebrow: 'Run your own analysis',
        title: 'Compare your own recruiting direction against the sample.',
        description:
          'Use this public sample to see how recruiting workflow pain becomes ranked product wedges, then analyze your own direction to see whether a different audience or bottleneck scores higher.',
        primaryAction: {
          label: 'Start Analysis',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'Back to homepage',
          href: '/en',
          variant: 'outline',
        },
      },
    },
    'examples-ai-tools-for-agencies': {
      primaryAction: {
        label: 'Run your own analysis',
        href: '/tools/product-insight',
      },
      secondaryAction: {
        label: 'View another sample',
        href: '/en/examples/ai-tools-for-small-business',
        variant: 'outline',
      },
      heroVisualEyebrow: 'Public sample report',
      heroVisualTitle: 'Agency delivery wedges, ranked by rework drag and handoff clarity',
      heroVisualSteps: ['Agency scenario brief', 'Top workflow wedges', 'Recommended next validation move'],
      supportEyebrow: 'Scenario brief',
      supportTitle:
        'AI tools for agencies: a public sample report built around client-delivery friction and margin-eating rework.',
      supportDescription:
        'This sample report focuses on the repeated coordination drag inside boutique agencies: feedback loops that become scoped action items, recap drift that blurs ownership, and deliverable QA that still depends on manual cleanup. It shows which wedge looks strongest before you run your own agency direction.',
      supportSnapshots: [
        {
          label: 'Market slice',
          value: 'Boutique agencies and client-delivery operators',
          description:
            'These teams usually translate client calls, feedback threads, and internal project updates themselves, so small coordination failures quickly turn into expensive rework.',
        },
        {
          label: 'Core pain',
          value: 'Delivery context leaks between feedback, recap, and execution',
          description:
            'The strongest opportunities appear where agencies still hand-convert client feedback into scoped tasks, project updates, and QA checks under deadline pressure.',
        },
        {
          label: 'Best first wedge',
          value: 'Client feedback to scoped action-items assistant',
          description:
            'This sample argues that the strongest first wedge is a workflow that turns loose client feedback into assignable actions before it expands into a broader delivery copilot.',
        },
      ],
      opportunityEyebrow: 'Opportunity ranking',
      opportunityTitle: 'The strongest agency wedge usually starts with feedback-to-action translation, not broad service AI.',
      opportunityDescription:
        'These rankings favor wedges that cut repeated coordination drag, protect margin from rework, and fit the way service teams actually adopt new tooling inside live delivery workflows.',
      opportunityItems: [
        {
          rank: 'Rank 01',
          title: 'Client feedback to scoped action-items assistant',
          score: '8.9/10',
          description:
            'Turn client comments, annotated docs, and async feedback threads into clean action items, owners, due dates, and open questions for the delivery team.',
          audience: 'Boutique agencies, account leads, and delivery managers who repeatedly translate messy feedback into execution.',
          whyNow:
            'Feedback volume is rising while delivery teams are still stitching action items together manually, which makes the value of faster scoping and lower rework immediately visible.',
          nextMove:
            'Validate whether agencies value stronger task extraction most, or whether the bigger win is preserving client context as work moves between account and delivery roles.',
          highlights: [
            'The ROI story is clear because rework and misalignment directly erode service margin.',
            'The workflow is narrow enough to explain without becoming a full agency operating system on day one.',
            'It creates a natural expansion path into recap automation, QA, and handoff workflows.',
          ],
        },
        {
          rank: 'Rank 02',
          title: 'Meeting recap to project-update assistant',
          score: '8.3/10',
          description:
            'Transform call notes, recap threads, and project discussions into cleaner status updates, owner assignments, and next-step summaries.',
          audience: 'Agency teams running frequent client calls and cross-functional delivery syncs.',
          whyNow:
            'Project alignment still depends on humans rewriting the same decisions across docs, boards, and chat, so recap drift remains a common source of wasted time.',
          nextMove:
            'Validate whether agencies care more about recap quality itself, or about the downstream speed of updating project systems after every call.',
          highlights: [
            'The pain is repeated and easy to recognize across service teams.',
            'It connects naturally to the top-ranked feedback-to-action wedge.',
            'The product needs clear boundaries so it does not become a generic note-taking tool.',
          ],
        },
        {
          rank: 'Rank 03',
          title: 'Recurring deliverable QA copilot',
          score: '7.8/10',
          description:
            'Support pre-delivery quality checks by flagging missing items, consistency gaps, and review issues before work reaches the client.',
          audience: 'Delivery teams shipping recurring reports, campaign assets, audits, or content packages.',
          whyNow:
            'QA pain is real and margin-sensitive, but the exact checklist logic varies more across agency specializations than the top two wedges.',
          nextMove:
            'Validate whether QA support works better as a second-layer expansion after feedback and recap workflows already prove trust and operational value.',
          highlights: [
            'The value becomes strong when a team already feels the cost of avoidable rework.',
            'Workflow variation is higher than in the top two ranked wedges.',
            'It feels more like a second-phase wedge than the best initial entry point.',
          ],
        },
      ],
      detailEyebrow: 'Why these opportunities scored well',
      detailTitle: 'These scores reward agency wedges that reduce repeated coordination drag and protect margin without demanding a full process rewrite.',
      detailDescription:
        'The strongest agency ideas are not just painful. They are painful in a way that is repeated, visible to delivery leaders, and simple enough to trial without rebuilding the whole client-service stack.',
      diagnosticColumns: [
        {
          title: 'Why agencies buy',
          description:
            'Value becomes obvious when a tool reduces rework, preserves delivery context, and makes handoffs cleaner between account, project, and production roles.',
        },
        {
          title: 'What lowers the score',
          description:
            'Agencies already juggle many tools and client-specific workflows. Anything that feels like a heavy process migration or generic AI layer will be harder to adopt.',
        },
        {
          title: 'Recommended next move',
          description:
            'Interview delivery leads who already feel margin pressure from recap drift and feedback cleanup, then position the first wedge around faster execution plus cleaner accountability.',
        },
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Questions people ask when reading this agency sample report',
      faqDescription:
        'These answers explain what the sample demonstrates, why delivery friction ranks above broad agency AI, and how to use the report before testing your own direction.',
      faqItems: [
        {
          question: 'What does this agency sample report demonstrate?',
          answer:
            'It shows how the product turns service-delivery friction into a ranked set of wedges, so visitors can judge whether the output feels concrete enough before running their own agency workflow.',
        },
        {
          question: 'Why does feedback-to-action rank ahead of broad agency AI?',
          answer:
            'Because it combines repeated coordination pain, direct margin impact, and a narrow workflow boundary that can be explained and trialed without becoming a full service platform.',
        },
        {
          question: 'Is this sample still useful if my agency specialty is different?',
          answer:
            'Yes. Treat the ranking logic as the reference point. If the reasoning feels useful, run your own buyer and delivery workflow to see whether a different wedge rises to the top.',
        },
      ],
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Go back to the public hub and compare the full product path again before analyzing your own direction.',
          href: '/en',
          actionLabel: 'Back to homepage',
        },
        {
          title: 'Agency use-case page',
          description: 'Open the agency use-case page to understand why these delivery workflows are more likely to become product wedges.',
          href: '/en/use-cases/ai-tools-for-agencies',
          actionLabel: 'View use-case page',
        },
        {
          title: 'AI business opportunity analysis',
          description: 'Take the most promising agency wedge into the broader ranking workflow once you want to compare it inside a market slice.',
          href: '/en/ai-business-opportunity-analysis',
          actionLabel: 'Open analysis workflow',
        },
      ],
      closing: {
        eyebrow: 'Analyze your agency direction',
        title: 'Compare your own agency workflow against this sample.',
        description:
          'Use this public sample to see how delivery friction becomes ranked product wedges, then analyze your own agency direction to learn whether a different buyer, handoff, or QA bottleneck should come first.',
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
      detailTitle: 'A good wedge-finding input starts with one market slice and ends with one repeatable workflow bottleneck.',
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
          description: 'Use a narrower wedge as the input so ideation produces stronger adjacent product directions instead of generic ideas.',
          href: '/en/ai-startup-idea-generator',
          actionLabel: 'Open generator page',
        },
        {
          title: 'Idea generator vs opportunity analysis',
          description: 'Compare the two workflows if you are unsure whether you still need more ideas or a ranked wedge map next.',
          href: '/en/comparisons/idea-generator-vs-opportunity-analysis',
          actionLabel: 'View comparison page',
        },
        {
          title: 'Ecommerce sample report',
          description: 'See how a narrow operations wedge appears inside a public ecommerce workflow report before you analyze your own market.',
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
      heroVisualTitle: 'When you need more candidate wedges, and when you need a ranked opportunity map instead',
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
      intentTitle: 'Use this comparison when you are stuck between expanding more ideas and ranking the opportunities you already see.',
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
      detailTitle: 'The best workflow depends on whether your current bottleneck is option scarcity or option overload.',
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
          description: 'Open the generation workflow when you still need more candidate wedges inside the market.',
          href: '/en/ai-startup-idea-generator',
          actionLabel: 'Open generator page',
        },
        {
          title: 'AI business opportunity analysis',
          description: 'Open the ranking workflow when you already have enough candidate wedges and need a clearer shortlist.',
          href: '/en/ai-business-opportunity-analysis',
          actionLabel: 'Open analysis workflow',
        },
        {
          title: 'Ecommerce sample report',
          description: 'Inspect a public report to see what a ranked wedge map looks like before you choose your next workflow.',
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
      intentTitle: 'Use this page when you want ecommerce-specific AI wedges rooted in repeated operations drag.',
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
      detailTitle: 'The most useful ecommerce input starts from one repeated operations bottleneck, not the entire store stack.',
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
          description: 'Inspect a public ecommerce report to see ranked operator wedges before you run your own direction.',
          href: '/en/examples/ai-tools-for-ecommerce-operations',
          actionLabel: 'View ecommerce sample',
        },
        {
          title: 'AI business opportunity analysis',
          description: 'Move one promising ecommerce wedge into the workflow that ranks broader opportunity spaces more explicitly.',
          href: '/en/ai-business-opportunity-analysis',
          actionLabel: 'Open analysis workflow',
        },
        {
          title: 'Wedge guide',
          description: 'Read the practical sequence for narrowing a broad ecommerce idea into one smaller SaaS wedge.',
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
          description: '先把更窄的切口带进生成器，让后续点子生成更像相邻工作流展开，而不是泛化灵感堆积。',
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
          description: '先看一份电商运营公开样例，感受更窄的运营切口会如何在真实报告里出现。',
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
      detailTitle: '最有价值的电商输入，应该从一个反复出现的运营瓶颈开始，而不是一上来想覆盖整个店铺栈。',
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
    'examples-ai-tools-for-ecommerce-operations': {
      primaryAction: {
        label: 'Run your own analysis',
        href: '/tools/product-insight',
      },
      secondaryAction: {
        label: 'View another sample',
        href: '/en/examples/ai-tools-for-small-business',
        variant: 'outline',
      },
      heroVisualEyebrow: 'Public sample report',
      heroVisualTitle: 'Ecommerce operations wedges, ranked by cleanup drag and resolution speed',
      heroVisualSteps: ['Ecommerce scenario brief', 'Top workflow wedges', 'Recommended next validation move'],
      supportEyebrow: 'Scenario brief',
      supportTitle:
        'AI tools for ecommerce operations: a public sample report built around catalog cleanup, support routing, and returns review.',
      supportDescription:
        'This sample report focuses on the operator queues that quietly absorb time inside ecommerce teams: product-data cleanup, ticket triage, and return-pattern review. It sets up the operating context, the repeated drag, and the most believable first wedge before you read the ranked opportunities.',
      supportSnapshots: [
        {
          label: 'Market slice',
          value: 'DTC brands and marketplace operations teams',
          description:
            'These teams constantly coordinate product information, support context, and post-purchase issues across multiple tools, channels, and people.',
        },
        {
          label: 'Core pain',
          value: 'Cleanup and routing queues stay manual for too long',
          description:
            'The strongest opportunities appear where operators still normalize product data, summarize support context, and interpret return reasons by hand under time pressure.',
        },
        {
          label: 'Best first wedge',
          value: 'Catalog enrichment and cleanup assistant',
          description:
            'This sample argues that the strongest entry point is a workflow that fixes missing attributes, inconsistent copy, and incomplete catalog context before teams expand into broader commerce tooling.',
        },
      ],
      intentEyebrow: 'How to use this sample',
      intentTitle: 'Use the sample report to judge output quality before you analyze your own ecommerce direction.',
      intentDescription:
        'Public samples help search visitors answer one question first: does this product produce rankings, reasoning, and next-step guidance that feel concrete enough to trust with my own workflow?',
      intentColumns: [
        {
          title: 'Best for',
          description:
            'Visitors who want to inspect the output structure, ranking logic, and recommendation style before running their own ecommerce operations direction.',
        },
        {
          title: 'Not for',
          description:
            'Teams that already know their workflow direction clearly and are ready to go straight into analysis without reviewing a public example first.',
        },
        {
          title: 'Use it when',
          description:
            'You want to compare a real ecommerce operations scenario against the product output before deciding whether to analyze your own queue problem.',
        },
      ],
      opportunityEyebrow: 'Opportunity ranking',
      opportunityTitle: 'The strongest ecommerce wedge starts with catalog and queue cleanup, not a generic commerce copilot.',
      opportunityDescription:
        'These rankings reward repeated operator pain, clear time-to-resolution value, and whether the wedge is narrow enough to earn trust before it expands into a wider commerce platform.',
      opportunityItems: [
        {
          rank: 'Rank 01',
          title: 'Catalog enrichment and cleanup assistant',
          score: '8.8/10',
          description:
            'Normalize product attributes, flag missing fields, tighten listing copy, and prepare channel-ready catalog records before teams publish or sync inventory updates.',
          audience: 'Ecommerce operators, merchandising leads, and catalog managers who constantly repair incomplete or inconsistent product data.',
          whyNow:
            'Catalog debt is growing as brands publish across more channels, but the review work is still manual enough that faster cleanup creates an immediate operational payoff.',
          nextMove:
            'Validate whether operators care most about attribute completion, copy consistency, or exception review so the first wedge stays narrow and clearly priced.',
          highlights: [
            'The pain is repeated and tied directly to launch speed and channel quality.',
            'The workflow is structured enough for a focused first product wedge.',
            'It creates a natural expansion path into merchandising QA and publishing workflows.',
          ],
        },
        {
          rank: 'Rank 02',
          title: 'Support summary and routing assistant',
          score: '8.2/10',
          description:
            'Summarize incoming support context, identify missing order details, and route tickets into the right queue before agents or operations leads spend more manual review time.',
          audience: 'Lean ecommerce support and operations teams dealing with high ticket volume and fragmented inbox context.',
          whyNow:
            'Response speed matters, but teams still lose time deciding what each case is about and who should own it, which makes queue triage pain easy to spot and easy to value.',
          nextMove:
            'Validate whether the first product should focus on faster summaries, better routing, or higher-confidence escalation signals for edge cases.',
          highlights: [
            'The ROI is visible because it reduces triage delay and queue confusion.',
            'It connects naturally with the catalog and post-purchase workflow data that teams already maintain.',
            'The scope needs discipline so it does not become a generic support suite too early.',
          ],
        },
        {
          rank: 'Rank 03',
          title: 'Returns-reason clustering workflow',
          score: '7.8/10',
          description:
            'Group return notes into repeatable reason clusters, surface quality or merchandising patterns, and help operators see which problems deserve action first.',
          audience: 'Post-purchase and operations teams trying to learn from high return volume without reading every case manually.',
          whyNow:
            'Return data is increasingly rich but still messy, which makes clustering valuable even though the path from insight to action can vary more than the top two wedges.',
          nextMove:
            'Validate whether teams want insight reporting first, or whether the stronger entry point is operational action tied directly to catalog fixes or support routing.',
          highlights: [
            'Pain is real because returns affect margin, CX, and inventory decisions at the same time.',
            'The workflow benefits from structured clustering but may need a tighter first action layer.',
            'It feels strongest as a product wedge once teams already trust the cleanup and routing foundation.',
          ],
        },
      ],
      detailEyebrow: 'Why these opportunities scored well',
      detailTitle: 'These scores favor wedges that reduce repeated operator review work without forcing a full commerce-platform rewrite.',
      detailDescription:
        'The top ideas here are not just painful. They also fit how ecommerce operations teams adopt tools: one clear queue problem, a visible speed or quality win, and a workflow narrow enough to test before it becomes another heavy system.',
      diagnosticColumns: [
        {
          title: 'Why ecommerce teams buy',
          description:
            'Teams buy when a product shortens review loops, reduces cleanup work, or makes routing decisions clearer without creating another layer of operational overhead.',
        },
        {
          title: 'What lowers the score',
          description:
            'Commerce stacks are already crowded. Products that require too much process change, too many integrations, or too broad a promise will struggle to win trust quickly.',
        },
        {
          title: 'Recommended next move',
          description:
            'Interview operators who already spend time repairing catalog records or triaging support queues, and position the first wedge around faster resolution plus cleaner operational visibility.',
        },
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Questions people ask when reading this ecommerce operations sample report',
      faqDescription:
        'These answers explain what the sample demonstrates, why queue cleanup ranks highly, and how to use the report before testing your own ecommerce workflow.',
      faqItems: [
        {
          question: 'What does this ecommerce operations sample report demonstrate?',
          answer:
            'It shows how the product turns repeated ecommerce queue drag into ranked opportunity wedges, so visitors can judge whether the reasoning is concrete enough before they run their own operations direction.',
        },
        {
          question: 'Why does catalog cleanup rank ahead of broad commerce AI?',
          answer:
            'Because it combines repeated review work, a visible quality payoff, and a narrow workflow boundary that teams can pilot without committing to a full commerce platform change.',
        },
        {
          question: 'How should I use this sample if my ecommerce context is different?',
          answer:
            'Use the ranking logic as the reference point. If your team also loses time inside catalog, support, or returns queues, run your own buyer and workflow shape through the product to see which wedge scores highest.',
        },
      ],
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Go back to the public hub and compare the broader product journey before analyzing your own ecommerce direction.',
          href: '/en',
          actionLabel: 'Back to homepage',
        },
        {
          title: 'Ecommerce use-case page',
          description: 'Open the ecommerce use-case page to understand why these queue-heavy workflows are more likely to become product wedges.',
          href: '/en/use-cases/ai-tools-for-ecommerce-operators',
          actionLabel: 'View use-case page',
        },
        {
          title: 'AI business opportunity analysis',
          description: 'Take the strongest ecommerce wedge into the broader ranking workflow once you want to compare it against a wider market slice.',
          href: '/en/ai-business-opportunity-analysis',
          actionLabel: 'Open analysis workflow',
        },
      ],
      closing: {
        eyebrow: 'Analyze your ecommerce direction',
        title: 'Compare your own ecommerce workflow against the sample.',
        description:
          'Use this public sample to see how ecommerce operations drag becomes ranked product wedges, then analyze your own direction to learn whether a different queue, buyer, or review bottleneck should come first.',
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
    home: {
      heroVisualEyebrow: '你会得到什么',
      heroVisualTitle: '把一个方向整理成可排序的机会地图',
      heroVisualLayers: ['输入一个产品方向', '查看评分维度与机会排序', '在登录前先看公开样例'],
      supportEyebrow: '选择入口',
      supportTitle: '先进入最符合你当下问题的页面。',
      supportDescription: '首页不是简单概览页，而是一个决策入口：如果你已经知道想解决什么问题，就进入对应核心页；如果你想先看输出质量，就先看公开样例报告。',
      supportColumns: [
        {
          title: 'AI 创业点子生成器',
          description: '从一个产品主题出发，快速展开创业方向，并比较哪些切口更值得优先验证。',
          href: '/zh/ai-startup-idea-generator',
          actionLabel: '查看生成器页面',
        },
        {
          title: 'SaaS 点子验证',
          description: '通过结构化评分判断一个 SaaS 方向是否值得继续投入，而不是边做边猜。',
          href: '/zh/saas-idea-validation',
          actionLabel: '进入验证页面',
        },
        {
          title: 'AI 商业机会分析',
          description: '把宽泛市场方向收敛成更清晰的优先级判断，知道下一步先切哪个机会。',
          href: '/zh/ai-business-opportunity-analysis',
          actionLabel: '查看分析页面',
        },
        {
          title: '指南：如何验证 AI 创业点子',
          description: '先走一遍更实用的验证步骤，理解在真正投入开发前，哪些判断最应该先做。',
          href: '/zh/guides/how-to-validate-an-ai-startup-idea',
          actionLabel: '查看验证指南',
        },
        {
          title: '对比：BadgerSignal vs ChatGPT',
          description: '先看通用聊天和结构化验证有什么差异，再决定哪条流程更适合你当下的问题。',
          href: '/zh/comparisons/badgersignal-vs-chatgpt-for-startup-idea-validation',
          actionLabel: '查看对比页面',
        },
        {
          title: '样例报告：招聘顾问',
          description: '先看一份招聘工作流公开样例，判断登录前的机会排序是否已经足够具体。',
          href: '/zh/examples/ai-tools-for-recruiters',
          actionLabel: '查看招聘样例',
        },
        {
          title: '指南：如何给 AI 机会排优先级',
          description: '当你已经看到太多可能切口时，先用一套更实用的排序方法决定最该推进哪一个。',
          href: '/zh/guides/how-to-prioritize-ai-business-opportunities',
          actionLabel: '查看排序指南',
        },
        {
          title: '样例报告：代理公司',
          description: '先看一份代理公司公开样例，感受交付摩擦、反馈循环和返工成本是如何被排序的。',
          href: '/zh/examples/ai-tools-for-agencies',
          actionLabel: '查看代理公司样例',
        },
        {
          title: '指南：如何找到 AI SaaS 切口',
          description: '学习如何把一个更宽的 AI 方向收窄成更适合验证的 SaaS 切口，避免一开始把产品做得太宽。',
          href: '/zh/guides/how-to-find-an-ai-saas-wedge',
          actionLabel: '查看切口指南',
        },
        {
          title: '样例报告：电商运营',
          description: '查看一份围绕目录整理、售后分流和退货工作流拖拽构建的电商运营公开样例报告。',
          href: '/zh/examples/ai-tools-for-ecommerce-operations',
          actionLabel: '查看电商样例',
        },
      ],
      intentEyebrow: '公开路径怎么选',
      intentTitle: '当你还在判断下一步该走哪条公开路径时，先看首页。',
      intentDescription:
        '首页最适合“还没有决定该直接进入哪个工作流”的访客。它会先帮你判断：你是需要更多点子、需要更深验证，还是应该先看公开样例再决定。',
      intentColumns: [
        {
          title: '适合谁',
          description:
            '还在比较整个产品路径，想先理解公开站能提供哪些页面与判断方式的访客。',
        },
        {
          title: '不适合谁',
          description:
            '已经明确知道自己要进入哪个具体工作流，只差直接打开对应页面的人。',
        },
        {
          title: '什么时候用',
          description:
            '当你想先看清整条公开路径，再决定进入点子生成、验证、机会分析还是样例报告时使用。',
        },
      ],
      detailEyebrow: '工作方式',
      detailTitle: '先把工作流讲清楚，再让访客决定要不要进入产品。',
      detailDescription: '首页会先说明从方向输入到机会排序的大致过程，让搜索访客在不登录的情况下也能理解这个产品如何工作。',
      workflowSteps: [
        {
          label: '步骤 01',
          title: '带着一个方向进入',
          description: '从一个市场主题、用户类型或你已经在考虑的产品切口开始。',
        },
        {
          label: '步骤 02',
          title: '查看机会排序',
          description: '先看一组经过评估的机会，而不是收集一堆没有结构的零散点子。',
        },
        {
          label: '步骤 03',
          title: '理解评分维度',
          description: '结合评分逻辑和市场信号，判断为什么某些方向更值得优先关注。',
        },
        {
          label: '步骤 04',
          title: '继续验证最强切口',
          description: '把精力放在更值得做的方向上，而不是在多个模糊机会之间反复摇摆。',
        },
      ],
      closing: {
        eyebrow: '准备开始',
        title: '直接分析你的方向，或者先看公开样例。',
        description: 'BadgerSignal 的公开首页应该先展示结构，再请求行动。你可以直接开始分析，也可以先通过样例报告判断这是不是适合你的工作流。',
        primaryAction: {
          label: '开始分析',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: '查看样例报告',
          href: '/zh/examples/ai-tools-for-freelancers',
          variant: 'outline',
        },
      },
    },
    core: {
      heroVisualEyebrow: '落地页透镜',
      heroVisualTitle: '一个关键词，一个承诺，一个下一步',
      heroVisualRows: [
        { label: '搜索意图贴合', value: '高' },
        { label: '评分结构深度', value: '已就绪' },
        { label: '公开证明材料', value: '可见' },
      ],
      supportEyebrow: '模板职责',
      supportTitle: '核心落地页模板已经围绕单一意图、证明轨道和单一路径转化来组织。',
      supportDescription: '这个版式就是为 generator、validation、opportunity analysis 这类高意图 SEO 页准备的。',
      diagnosticColumns: [
        {
          title: '意图清晰',
          description: '首屏围绕单一搜索意图展开，既方便收录，也方便转化，不会把承诺讲散。',
        },
        {
          title: '证明结构',
          description: '第二屏已经给产品逻辑、评分方式和可信信号预留了稳定位置。',
        },
        {
          title: '输入输出桥梁',
          description: '第三屏天然就是输入和输出的对应关系，后面填内容时不需要再改结构。',
        },
      ],
      intentEyebrow: '选择合适路径',
      intentTitle: '先判断你下一步要做什么，再进入对应页面。',
      intentDescription:
        '核心页最有价值的地方，不只是解释功能，而是帮助访客快速判断：这个页面是不是当前阶段最合适的工作流，还是应该先切到别的页面。',
      intentColumns: [
        {
          title: '适合谁',
          description:
            '已经知道自己要看哪个市场、工作流或候选点子，并希望更认真地继续判断的人。',
        },
        {
          title: '不适合谁',
          description:
            '只想做泛泛头脑风暴，或者没有足够上下文却期待直接得到最终答案的人。',
        },
        {
          title: '什么时候用',
          description:
            '当你需要比“继续看看”更清晰的下一步判断，并且想在登录前先看见结构化承接时使用。',
        },
      ],
      detailEyebrow: '样例框架',
      detailTitle: '模板已经把用户输入与最终产出区分开了。',
      detailDescription: '这样后面可以很自然地填入真实输入样例、结果摘要和结构化评分。',
      inputLabel: '输入轨道',
      inputExample: [
        '一个聚焦的产品方向或市场主题。',
        '一个需要排序和筛选的创业问题。',
        '一个还需要结构化验证的细分切口。',
      ],
      outputLabel: '输出轨道',
      outputExample: [
        '20+ 个经过评估并可排序的机会方向。',
        '更清晰的优先级判断，知道先看哪个方向。',
        '可继续扩写和本地化的公开证明区块。',
      ],
      faqEyebrow: '常见问题',
      faqTitle: '关于这个工作流，用户最常问什么',
      faqDescription: '这些占位 FAQ 会在后续核心页逐个落地时替换成页面专属问答。',
      faqItems: [
        {
          question: '这个页面主要解决什么问题？',
          answer: '它会解释一个明确工作流，展示输入输出结构，并把访客引导到下一步产品动作。',
        },
        {
          question: '页面里会看到输入输出样例吗？',
          answer: '会。每个核心落地页都会公开展示输入输出框架，让访客在登录前先理解流程。',
        },
      ],
      relatedEyebrow: '继续浏览',
      relatedTitle: '进入下一页，把判断再收紧一步。',
      relatedDescription:
        '每个核心工作流都应该自然连回首页、相邻工作流和至少一个公开样例，让访客不用走回头路，也能继续推进判断。',
      relatedColumns: [
        {
          title: '首页',
          description: '回到公开站的决策入口，重新比较全部公开页面。',
          href: '/zh',
          actionLabel: '返回首页',
        },
        {
          title: 'SaaS 点子验证',
          description: '在缩小方向之后，进一步判断某个候选点子该不该继续。',
          href: '/zh/saas-idea-validation',
          actionLabel: '进入验证页面',
        },
        {
          title: '自由职业者样例报告',
          description: '先看一份公开样例，了解登录前能看到怎样的机会排序。',
          href: '/zh/examples/ai-tools-for-freelancers',
          actionLabel: '查看公开样例',
        },
      ],
      closing: {
        eyebrow: '下一阶段',
        title: '这个落地页模板已经可以承接关键词定制内容了。',
        description: '下一轮只需要把占位文案换成页面专属的承诺、证明材料和 FAQ。',
        primaryAction: {
          label: '开始分析',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: '查看样例报告',
          href: '/zh/examples/ai-tools-for-freelancers',
          variant: 'outline',
        },
      },
    },
    example: {
      heroVisualEyebrow: '样例骨架',
      heroVisualTitle: '先给公开样例，再谈登录转化',
      heroVisualSteps: ['场景 brief', '机会排序', '为什么这组更强'],
      supportEyebrow: '模板职责',
      supportTitle: '公开样例页模板已经按“先给结果，再谈登录”来组织。',
      supportDescription: '这就是后续公开样例报告会使用的结构，用来向搜索访客证明产品输出质量。',
      supportSnapshots: [
        {
          label: '市场切片',
          value: '明确场景',
          description: '真实公开样例必须先有清晰 audience 和使用场景，不能只写泛概念。',
        },
        {
          label: '核心痛点',
          value: '重复性运营摩擦',
          description: '样例页需要解释清楚，为什么这个问题足够频繁，值得用户为之付费。',
        },
        {
          label: '最佳下一步',
          value: '验证最强切口',
          description: '页面应该帮助访客得到更清晰的下一步动作，而不只是留下兴趣。',
        },
      ],
      opportunityEyebrow: '排序后的机会',
      opportunityTitle: '这里专门用来承接最值得优先验证的产品切口。',
      opportunityDescription:
        '每个机会块都要同时给出评分、适配受众、时机判断，以及更具体的下一步验证动作。',
      opportunityLabels: {
        score: '评分',
        audience: '适合谁',
        whyNow: '为什么现在',
        nextMove: '下一步',
      },
      opportunityItems: [
        {
          title: 'Top 机会轨道',
          score: '可接评分',
          description: '第一列已经按可排序机会摘要来组织，后面可以直接接上得分和优先级。',
        },
        {
          title: '场景贴合轨道',
          score: '可接意图',
          description: '第二列用于解释为什么这个场景值得做，不需要先让用户登录才能看到价值。',
        },
        {
          title: '决策轨道',
          score: '可接 CTA',
          description: '第三列负责把“有兴趣”推进到“愿意试用”，承接最终的产品入口。',
        },
      ],
      detailEyebrow: '样例结构',
      detailTitle: '模板已经给方法、评分逻辑和场景上下文都留好了位置。',
      detailDescription: '这意味着后续样例页会更像完整公开报告，而不是只有几张截图的 teaser。',
      diagnosticColumns: [
        {
          title: '场景 brief',
          description: '第一页先说明这是哪个市场切片，以及为什么要公开这个样例。',
        },
        {
          title: '机会排序',
          description: '中间区域天生适合放机会排序，而不是空泛的概念型文案。',
        },
        {
          title: '为什么值得做',
          description: '最后一区专门承接理由、评分和下一步 CTA，用来把兴趣推向使用。',
        },
      ],
      faqEyebrow: '常见问题',
      faqTitle: '在阅读公开样例报告前，用户最常问什么',
      faqDescription:
        '这些问题帮助搜索访客理解：样例页能证明什么、应该怎么看，以及看完之后下一步该做什么。',
      faqItems: [
        {
          question: '我应该把这份样例报告当成什么来看？',
          answer:
            '最适合把它当成“先判断输出质量”的公开参考。你可以先看排序结果是否具体、是否有可执行性，再决定要不要提交你自己的方向。',
        },
        {
          question: '这份样例真的对应一个真实工作流场景吗？',
          answer:
            '是的。公开样例都会围绕一个具体受众和工作流来组织，让访客看到更像真实市场判断的输出，而不是泛化演示。',
        },
        {
          question: '看完样例之后，我下一步应该做什么？',
          answer:
            '如果你觉得排序逻辑和输出质量对你的市场也有参考价值，下一步就是分析你自己的方向，或者继续对照别的公开样例。',
        },
      ],
      relatedEyebrow: '继续浏览',
      relatedTitle: '把样例页当作进入其他公开页面的桥梁。',
      relatedDescription:
        '一份公开样例不应该把访客留在终点，它应该自然连回首页，并把访客带到最相关的核心工作流页面。',
      relatedColumns: [
        {
          title: '首页',
          description: '回到公开站总入口，重新比较其他公开页面。',
          href: '/zh',
          actionLabel: '返回首页',
        },
        {
          title: 'AI 创业点子生成器',
          description: '查看产品如何把一个方向扩展成一组可排序的创业切口。',
          href: '/zh/ai-startup-idea-generator',
          actionLabel: '查看生成器页面',
        },
        {
          title: 'SaaS 点子验证',
          description: '继续查看那个更适合判断单个候选点子是否该继续投入的工作流。',
          href: '/zh/saas-idea-validation',
          actionLabel: '进入验证页面',
        },
      ],
      closing: {
        eyebrow: '下一阶段',
        title: '这个样例页模板已经准备好接公开报告内容了。',
        description: '下一轮只需要把场景 brief、Top opportunities 和公开证明区块逐步填进来。',
        primaryAction: {
          label: '开始分析',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: '返回首页',
          href: '/zh',
          variant: 'outline',
        },
      },
    },
  },
  ...EURO_TEMPLATE_FIELDS,
}

const CORE_PAGE_OVERRIDES: Partial<Record<
  SeoLocale,
  Partial<Record<CorePageKey, Partial<CoreContentFields>>>
>> = {
  en: {
    'ai-startup-idea-generator': {
      heroVisualEyebrow: 'Idea generation',
      heroVisualTitle: 'One direction in, ranked startup wedges out',
      heroVisualRows: [
        { label: 'Idea breadth', value: '20+' },
        { label: 'Scoring view', value: 'Structured' },
        { label: 'Next action', value: 'Validation-ready' },
      ],
      supportEyebrow: 'Why this page exists',
      supportTitle:
        'A useful AI startup idea generator should help you compare startup wedges, not just spit out random prompts.',
      supportDescription:
        'This landing page is focused on idea generation with evaluation. It starts from one direction, expands it into multiple startup angles, and gives you enough structure to see which ideas deserve the next round of work.',
      diagnosticColumns: [
        {
          title: 'Start from one direction',
          description:
            'Bring a product direction, market theme, or user segment so the generator expands within a useful frame instead of producing disconnected ideas.',
        },
        {
          title: 'See evaluated startup wedges',
          description:
            'Review 20+ evaluated opportunities with visible ranking signals, rather than a flat list of inspiration bullets.',
        },
        {
          title: 'Carry the best ideas forward',
          description:
            'Use the strongest wedges as inputs for deeper validation, scoping, or public sample comparisons on the next page.',
        },
      ],
      intentEyebrow: 'Best fit',
      intentTitle: 'Use the generator when you need better startup wedges, not a final yes-or-no verdict.',
      intentDescription:
        'This page is built for founders, operators, and product thinkers who already know the market they want to inspect but still need multiple credible startup wedges to compare before they narrow the field.',
      intentColumns: [
        {
          title: 'Best for',
          description:
            'People with a market direction, user group, or workflow in mind who need more than one promising startup wedge to compare.',
        },
        {
          title: 'Not for',
          description:
            'Teams that already chose one exact idea and only need a go-or-no-go validation decision.',
        },
        {
          title: 'Use it when',
          description:
            'You want to expand one direction into 20+ ranked opportunity wedges before deciding which idea deserves deeper validation.',
        },
      ],
      detailEyebrow: 'Input and output example',
      detailTitle: 'The clearest idea spread starts from a direction with a visible user, workflow, or market edge.',
      detailDescription:
        'A stronger prompt gives the generator something specific to expand. The output then turns that direction into adjacent wedges you can compare side by side, not just a loose batch of startup suggestions.',
      inputLabel: 'Example input',
      inputExample: [
        'An AI tool for solo consultants who spend too much time turning calls into project follow-ups.',
        'A direction around compliance-heavy workflows for small healthcare teams.',
        'A product wedge for e-commerce operators who need faster catalog and campaign iteration.',
      ],
      outputLabel: 'What the generator returns',
      outputExample: [
        '20+ evaluated startup opportunities connected to the original direction.',
        'A clearer set of wedges to compare by urgency, audience fit, and product depth.',
        'A shortlist of ideas that can move into SaaS idea validation or opportunity analysis next.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Questions people ask before using an AI startup idea generator',
      faqDescription:
        'These answers explain how this page differs from a generic brainstorm tool and why the workflow is designed around evaluated ideas.',
      faqItems: [
        {
          question: 'What makes this different from a generic AI brainstorm prompt?',
          answer:
            'A generic prompt usually gives you scattered ideas. This workflow keeps one direction fixed, expands into multiple startup wedges, and shows a structured set of evaluated opportunities you can compare.',
        },
        {
          question: 'Do I need a fully formed startup idea before using it?',
          answer:
            'No. A strong starting direction is enough. The page is designed for people who know the space they want to explore but need help turning that space into clearer startup options.',
        },
        {
          question: 'Will this page validate the idea for me?',
          answer:
            'Not completely. This page is about idea generation plus initial evaluation. If you want to pressure-test one option more deeply, the next step is the SaaS idea validation workflow.',
        },
        {
          question: 'What kind of output should I expect?',
          answer:
            'Expect 20+ evaluated opportunities, visible scoring logic, and a better sense of which startup wedges deserve your next hour instead of another round of vague brainstorming.',
        },
        {
          question: 'Why not just ask ChatGPT for startup ideas?',
          answer:
            'You can, but a generic chat prompt usually returns uneven ideas without a stable comparison frame. This page keeps one direction fixed, expands adjacent wedges, and shows structured scoring so you can compare ideas instead of just collecting them.',
        },
      ],
      relatedColumns: [
        {
          title: 'Validation guide',
          description: 'Read the practical sequence for narrowing, testing, and choosing the next wedge before you build.',
          href: '/en/guides/how-to-validate-an-ai-startup-idea',
          actionLabel: 'Open validation guide',
        },
        {
          title: 'SaaS idea validation',
          description: 'Take one promising wedge into the workflow that pressures a candidate idea more directly.',
          href: '/en/saas-idea-validation',
          actionLabel: 'Open validation page',
        },
        {
          title: 'Recruiter sample report',
          description: 'Inspect a hiring-workflow sample to see how ranked wedges become a public report before login.',
          href: '/en/examples/ai-tools-for-recruiters',
          actionLabel: 'View recruiter sample',
        },
        {
          title: 'Wedge guide',
          description: 'Learn how to narrow a broader AI direction into a tighter SaaS wedge before generating even more ideas.',
          href: '/en/guides/how-to-find-an-ai-saas-wedge',
          actionLabel: 'Open wedge guide',
        },
      ],
      closing: {
        eyebrow: 'Try your own direction',
        title: 'Generate startup ideas from a real product direction.',
        description:
          'BadgerSignal is most useful when you bring a real theme, market, or user problem. Start with your own direction, or inspect a public sample report before you move into deeper validation.',
        primaryAction: {
          label: 'Start Analysis',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'View Sample Report',
          href: '/en/examples/ai-tools-for-freelancers',
          variant: 'outline',
        },
      },
    },
    'saas-idea-validation': {
      heroVisualEyebrow: 'Validation workflow',
      heroVisualTitle: 'Test one SaaS idea toward go or no-go',
      heroVisualRows: [
        { label: 'Validation depth', value: 'Focused' },
        { label: 'Trade-off view', value: 'Visible' },
        { label: 'Decision goal', value: 'Commit or drop' },
      ],
      supportEyebrow: 'Why this page exists',
      supportTitle:
        'SaaS idea validation should help you disqualify weak directions, not just make every idea sound promising.',
      supportDescription:
        'This page is built for founders who already have a candidate idea. Instead of expanding into more ideas, the workflow tries to pressure-test one direction so you can decide whether it deserves product time, customer discovery, or a hard stop.',
      diagnosticColumns: [
        {
          title: 'Focus on one candidate idea',
          description:
            'Bring one SaaS direction you are considering, so the page can evaluate that specific product wedge instead of widening the idea set.',
        },
        {
          title: 'See the risk and fit more clearly',
          description:
            'Use structured scoring to understand urgency, audience pain, implementation depth, and whether the market shape looks attractive enough.',
        },
        {
          title: 'Decide what happens next',
          description:
            'The goal is not endless exploration. The goal is to decide whether to keep validating, refine the wedge, or stop before you overinvest.',
        },
      ],
      intentEyebrow: 'Best fit',
      intentTitle: 'Use validation when you already have one SaaS candidate and need a sharper continue-or-stop decision.',
      intentDescription:
        'This page is for founders who are past open-ended brainstorming. It is strongest when a candidate idea already exists and you need to understand whether the wedge deserves more product time, customer discovery, or an early stop.',
      intentColumns: [
        {
          title: 'Best for',
          description:
            'Founders with one candidate SaaS idea who want clearer trade-offs around pain strength, fit, and execution risk.',
        },
        {
          title: 'Not for',
          description:
            'Visitors who still need to explore a wider idea set or map a broader opportunity space before committing to one wedge.',
        },
        {
          title: 'Use it when',
          description:
            'You need help deciding whether to continue, tighten the wedge, or stop before investing more build time.',
        },
      ],
      detailEyebrow: 'Input and output example',
      detailTitle: 'Validation is most useful when the candidate idea already names one buyer, one workflow, and one pain.',
      detailDescription:
        'The input should be concrete enough to judge the wedge on fit, urgency, and product shape. The output should help you see the biggest risks fast and make a cleaner continue, refine, or stop decision.',
      inputLabel: 'Example input',
      inputExample: [
        'A SaaS for independent recruiters that turns interview notes into candidate summaries and next actions.',
        'A compliance-oriented product for small finance teams that need faster review workflows.',
        'An AI operations tool for agencies that want to turn client feedback into project changes more reliably.',
      ],
      outputLabel: 'What the validation page returns',
      outputExample: [
        'A structured read on whether the idea looks worth deeper validation or should be tightened first.',
        'Clearer strengths and weaknesses across audience pain, product depth, and execution trade-offs.',
        'A stronger next-step decision: continue, refine the wedge, or deprioritize the idea entirely.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Questions people ask before validating a SaaS idea',
      faqDescription:
        'These answers clarify when to use the validation workflow and how it differs from the generator page.',
      faqItems: [
        {
          question: 'How is this different from the AI startup idea generator page?',
          answer:
            'The generator page expands one direction into multiple startup wedges. This page does the opposite: it focuses on one candidate SaaS idea and tries to judge whether it is worth continued effort.',
        },
        {
          question: 'Do I need a complete product plan before validating?',
          answer:
            'No. You just need a clear enough SaaS direction to evaluate. The page is meant to help you understand whether that direction deserves more customer work or product scoping.',
        },
        {
          question: 'Will this tell me with certainty whether the idea will win?',
          answer:
            'No validation page can do that. What it can do is make the trade-offs clearer, surface weak spots earlier, and reduce the chance that you spend months building an idea with poor signal.',
        },
        {
          question: 'What should I do after this page?',
          answer:
            'If the idea still looks strong, move into deeper customer validation or a narrower opportunity analysis. If it looks weak, revise the wedge or drop it before you sink more time into it.',
        },
        {
          question: 'Why not just use ChatGPT to validate the idea?',
          answer:
            'ChatGPT can help you brainstorm risks, but it does not automatically force a clear comparison frame or a continue-versus-stop decision. This workflow is designed to make trade-offs visible and keep the output anchored to one candidate idea.',
        },
      ],
      relatedColumns: [
        {
          title: 'Validation guide',
          description: 'Review the practical validation sequence before you pressure-test one candidate wedge in detail.',
          href: '/en/guides/how-to-validate-an-ai-startup-idea',
          actionLabel: 'Open validation guide',
        },
        {
          title: 'BadgerSignal vs ChatGPT',
          description: 'Compare structured validation with generic prompting before deciding which workflow fits your next decision.',
          href: '/en/comparisons/badgersignal-vs-chatgpt-for-startup-idea-validation',
          actionLabel: 'View comparison',
        },
        {
          title: 'Recruiter sample report',
          description: 'See how one recruiting wedge turns into a public ranked report before you validate your own direction.',
          href: '/en/examples/ai-tools-for-recruiters',
          actionLabel: 'View recruiter sample',
        },
      ],
      closing: {
        eyebrow: 'Validate your candidate idea',
        title: 'Use structure to decide whether this SaaS idea deserves more effort.',
        description:
          'BadgerSignal helps you make the uncomfortable decision earlier: keep going, narrow the wedge, or walk away. Validate your own direction now, or inspect a public sample report first.',
        primaryAction: {
          label: 'Start Analysis',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'View Sample Report',
          href: '/en/examples/ai-tools-for-freelancers',
          variant: 'outline',
        },
      },
    },
    'ai-business-opportunity-analysis': {
      heroVisualEyebrow: 'Opportunity analysis',
      heroVisualTitle: 'Turn a broad direction into a prioritized opportunity map',
      heroVisualRows: [
        { label: 'Market scope', value: 'Defined' },
        { label: 'Ranking logic', value: 'Signal-backed' },
        { label: 'Next move', value: 'Priority-ready' },
      ],
      supportEyebrow: 'Why this page exists',
      supportTitle:
        'Opportunity analysis is for narrowing a space, not just generating more ideas or validating one exact thesis.',
      supportDescription:
        'This page is useful when you already know the area you want to explore, but the opportunity space still feels too wide. Instead of brainstorming endlessly or validating a single product too early, it helps you compare the best wedges inside that broader market.',
      diagnosticColumns: [
        {
          title: 'Map the broader opportunity space',
          description:
            'Start with a larger direction such as a workflow, market, or user group, so the page can identify multiple promising opportunity lanes inside it.',
        },
        {
          title: 'Compare which wedges have better signal',
          description:
            'Use structured scoring to compare urgency, monetization shape, operational pain, and whether an opportunity looks strong enough to justify real attention.',
        },
        {
          title: 'Pick the strongest next wedge',
          description:
            'The goal is to leave with a clearer priority order, not just a pile of options. From there you can validate the strongest wedge more deeply.',
        },
      ],
      intentEyebrow: 'Best fit',
      intentTitle: 'Use opportunity analysis when the market is still too wide and you need a ranked wedge map first.',
      intentDescription:
        'This page is useful one step before validation. It helps founders narrow a broader workflow, market, or user space into a more actionable shortlist of opportunities before they commit to one specific product thesis.',
      intentColumns: [
        {
          title: 'Best for',
          description:
            'People who know the space they want to explore but still need to compare several credible wedges inside that larger opportunity map.',
        },
        {
          title: 'Not for',
          description:
            'Visitors starting from a blank page or teams that already have one specific product idea ready for direct validation.',
        },
        {
          title: 'Use it when',
          description:
            'You need to rank sub-opportunities inside a broader market before deciding which wedge deserves validation next.',
        },
      ],
      detailEyebrow: 'Input and output example',
      detailTitle: 'The best input is a market or workflow frame that is still wide enough to contain several credible wedges.',
      detailDescription:
        'You should come in with a clear space to inspect, not a finished product thesis. The output is most useful when it helps you see which sub-opportunities deserve deeper validation and which ones are weaker than they first appear.',
      inputLabel: 'Example input',
      inputExample: [
        'AI opportunities inside customer-support workflows for mid-market software teams.',
        'A broader direction around compliance-heavy operations in healthcare admin.',
        'Potential AI product wedges across e-commerce merchandising and catalog management.',
      ],
      outputLabel: 'What the analysis returns',
      outputExample: [
        'A prioritized set of opportunity wedges inside the selected market or workflow.',
        'Clearer reasoning about which opportunities look stronger by audience pain, business shape, and execution trade-offs.',
        'A shortlist of the most promising wedges to move into validation or deeper research next.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Questions people ask before running AI business opportunity analysis',
      faqDescription:
        'These answers explain when to use opportunity analysis and how it differs from the generator and validation workflows.',
      faqItems: [
        {
          question: 'How is this different from the AI startup idea generator page?',
          answer:
            'The generator page is for expanding one direction into many startup ideas. This page is for analyzing a broader market or workflow so you can decide which opportunity wedge inside that space looks strongest.',
        },
        {
          question: 'How is this different from SaaS idea validation?',
          answer:
            'Validation pressure-tests one specific idea. Opportunity analysis happens a step earlier: it helps you decide which candidate wedge deserves that deeper validation in the first place.',
        },
        {
          question: 'Do I need a specific product idea before using it?',
          answer:
            'No. In fact, this page is most useful when you have a broad direction but have not yet committed to one precise product wedge. It helps narrow the field.',
        },
        {
          question: 'What should I do after this page?',
          answer:
            'Take the strongest wedge into SaaS idea validation, customer discovery, or a more focused product scoping pass. The outcome should be a better priority order, not just more possibilities.',
        },
        {
          question: 'Why not just use ChatGPT to analyze the market?',
          answer:
            'A general chat workflow can summarize a market, but it rarely forces a ranked wedge map with explicit trade-offs. This page is built to compare opportunity lanes inside one space and help you choose what deserves deeper validation next.',
        },
      ],
      relatedColumns: [
        {
          title: 'Prioritization guide',
          description: 'Read the practical sequence for ranking several wedges inside one market before deeper validation begins.',
          href: '/en/guides/how-to-prioritize-ai-business-opportunities',
          actionLabel: 'Open prioritization guide',
        },
        {
          title: 'BadgerSignal vs manual market research',
          description: 'Compare structured ranking with deeper custom research before deciding how much human effort the next stage deserves.',
          href: '/en/comparisons/badgersignal-vs-manual-market-research',
          actionLabel: 'View comparison page',
        },
        {
          title: 'Agency sample report',
          description: 'See how the same ranking logic plays out inside a margin-sensitive service-delivery workflow.',
          href: '/en/examples/ai-tools-for-agencies',
          actionLabel: 'View agency sample',
        },
        {
          title: 'Idea generator vs opportunity analysis',
          description: 'Compare the two core workflows when you are deciding whether the next step should widen the field or rank the shortlist.',
          href: '/en/comparisons/idea-generator-vs-opportunity-analysis',
          actionLabel: 'View workflow comparison',
        },
        {
          title: 'Customer support operations sample',
          description:
            'Review a queue-heavy support operations sample to see how ranked wedges look inside triage, escalation, and handoff workflows.',
          href: '/en/examples/ai-tools-for-customer-support-operations',
          actionLabel: 'View support-ops sample',
        },
      ],
      closing: {
        eyebrow: 'Analyze your opportunity space',
        title: 'Find the strongest wedge before you go all-in on one direction.',
        description:
          'BadgerSignal helps you move from a wide market idea to a sharper priority list. Analyze your own opportunity space now, or review a public sample report before you commit.',
        primaryAction: {
          label: 'Start Analysis',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'Open Prioritization Guide',
          href: '/en/guides/how-to-prioritize-ai-business-opportunities',
          variant: 'outline',
        },
      },
    },
    'guides-how-to-validate-an-ai-startup-idea': {
      heroVisualEyebrow: 'How-to validation',
      heroVisualTitle: 'Narrow the market, inspect the pain, choose the next test',
      heroVisualRows: [
        { label: 'Idea maturity', value: 'Direction-first' },
        { label: 'Pain test', value: 'Repeated' },
        { label: 'Next action', value: 'Validation-ready' },
      ],
      supportEyebrow: 'Why this guide exists',
      supportTitle:
        'Most founders do not fail because they cannot generate ideas. They fail because they validate too late, too broadly, or against the wrong pain.',
      supportDescription:
        'This guide is designed for visitors who need a practical method before they build. It turns AI startup validation into a sequence: narrow the space, test repeated pain, compare wedges, and leave with a cleaner next action.',
      diagnosticColumns: [
        {
          title: 'Start with a bounded market',
          description:
            'Validation works better when the market slice is narrow enough to describe one buyer, one workflow, and one repeated operational pain.',
        },
        {
          title: 'Look for repeated, paid pain',
          description:
            'The strongest wedge is rarely the most novel idea. It is the one tied to recurring work, visible consequences, and believable willingness to pay.',
        },
        {
          title: 'Pick the next test, not the final answer',
          description:
            'Good validation should tell you what deserves deeper research now, not create a false sense of certainty before customer work happens.',
        },
      ],
      intentEyebrow: 'Best fit',
      intentTitle: 'Use this guide when you need a validation method before you sink more time into one AI startup wedge.',
      intentDescription:
        'This page is best for founders and operators who already have a direction in mind but still need a better way to judge whether the pain, buyer, and workflow are strong enough to keep exploring.',
      intentColumns: [
        {
          title: 'Best for',
          description:
            'People who already see a possible market or wedge and want a repeatable way to decide whether it deserves interviews, scoping, or product time.',
        },
        {
          title: 'Not for',
          description:
            'Visitors who still need a much wider idea set before they can compare candidate wedges at all.',
        },
        {
          title: 'Use it when',
          description:
            'You want to stop guessing and move through a cleaner validation sequence before building or over-researching the wrong idea.',
        },
      ],
      detailEyebrow: 'Input and outcome',
      detailTitle: 'A good validation input names one buyer, one workflow, and one pain that happens often enough to matter.',
      detailDescription:
        'The goal is not to prove the whole business in one shot. The goal is to turn a vague AI startup direction into a better next move: keep going, tighten the wedge, or walk away.',
      inputLabel: 'Example starting point',
      inputExample: [
        'An AI workflow for recruiters who turn interview notes into candidate summaries and next actions.',
        'A tool for solo consultants who lose billable time after every client call because follow-up is manual.',
        'A product direction for small-business owners who send custom quotes but lose deals during slow follow-up.',
      ],
      outputLabel: 'What a good validation pass should clarify',
      outputExample: [
        'Whether the pain is repeated enough to support a real product wedge instead of a nice-to-have feature.',
        'Whether one buyer and one workflow stand out strongly enough to justify deeper interviews or scoping.',
        'Whether the next step should be tighter validation, a broader opportunity map, or abandoning the direction early.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Questions people ask when learning how to validate an AI startup idea',
      faqDescription:
        'These answers help visitors understand how validation differs from ideation, what “good enough to test” means, and where structured workflows fit.',
      faqItems: [
        {
          question: 'What is the first thing I should validate in an AI startup idea?',
          answer:
            'Start by validating that the pain is repeated, expensive enough to matter, and narrow enough to tie to one buyer and one workflow before you worry about broad market stories.',
        },
        {
          question: 'How do I know whether a wedge is still too broad?',
          answer:
            'If the same pitch could apply to many buyer types, many workflows, or many pains at once, the wedge is still too broad. Validation gets stronger when the context becomes easier to explain in one sentence.',
        },
        {
          question: 'Should I validate with ChatGPT prompts alone?',
          answer:
            'Generic prompting can help surface risks, but it rarely creates a stable comparison frame. A structured workflow is more useful when you want to judge several validation signals together and leave with one next move.',
        },
        {
          question: 'When should I move from this guide into the product?',
          answer:
            'Move into the product as soon as you have a direction worth pressure-testing. The guide teaches the sequence; the product helps you apply it with ranked outputs and clearer trade-offs.',
        },
      ],
      relatedColumns: [
        {
          title: 'SaaS idea validation',
          description: 'Jump into the tighter workflow that pressure-tests one candidate wedge more directly.',
          href: '/en/saas-idea-validation',
          actionLabel: 'Open validation workflow',
        },
        {
          title: 'BadgerSignal vs ChatGPT',
          description: 'Compare structured validation against generic prompting before choosing which path to use next.',
          href: '/en/comparisons/badgersignal-vs-chatgpt-for-startup-idea-validation',
          actionLabel: 'View comparison',
        },
        {
          title: 'Recruiter sample report',
          description: 'Read a public recruiter report to see what ranked validation output looks like before login.',
          href: '/en/examples/ai-tools-for-recruiters',
          actionLabel: 'View recruiter sample',
        },
      ],
      closing: {
        eyebrow: 'Apply the method',
        title: 'Run your own AI startup direction through a structured validation workflow.',
        description:
          'Use the guide to sharpen your thinking, then move into the product to test one direction with visible scoring, ranked outputs, and a cleaner next decision.',
        primaryAction: {
          label: 'Start Analysis',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'View Recruiter Sample',
          href: '/en/examples/ai-tools-for-recruiters',
          variant: 'outline',
        },
      },
    },
    'comparisons-badgersignal-vs-chatgpt-for-startup-idea-validation': {
      heroVisualEyebrow: 'Comparison',
      heroVisualTitle: 'When prompting is enough, and when structure wins',
      heroVisualRows: [
        { label: 'Exploration speed', value: 'ChatGPT' },
        { label: 'Ranking clarity', value: 'BadgerSignal' },
        { label: 'Decision goal', value: 'Next-step fit' },
      ],
      supportEyebrow: 'Why this comparison exists',
      supportTitle:
        'ChatGPT is useful for rough exploration, but startup idea validation gets harder when you need stable comparison, scoring logic, and a cleaner next decision.',
      supportDescription:
        'This page is for visitors deciding whether generic prompting is enough for the current job or whether they need a more structured workflow that keeps one wedge fixed and compares the evidence more explicitly.',
      diagnosticColumns: [
        {
          title: 'Where ChatGPT wins',
          description:
            'It is fast for open exploration, quick reframing, and generating more angles when the problem is still loose and you are not ready to judge one wedge carefully.',
        },
        {
          title: 'Where BadgerSignal wins',
          description:
            'It is stronger when you need visible scoring, repeatable ranking, and a workflow designed to decide what deserves the next round of research.',
        },
        {
          title: 'What the real choice is',
          description:
            'The decision is not “which tool is smarter.” The decision is whether your current job is open-ended ideation or structured validation with a cleaner next move.',
        },
      ],
      intentEyebrow: 'Best fit',
      intentTitle: 'Use this comparison when you are choosing between generic prompting and a workflow built for startup idea validation.',
      intentDescription:
        'This page helps founders and operators decide which route matches the job they need done right now: broad exploration, or a more structured attempt to judge one candidate wedge.',
      intentColumns: [
        {
          title: 'Best for',
          description:
            'Visitors who already use ChatGPT and now want to understand whether a dedicated validation workflow gives them a better decision frame.',
        },
        {
          title: 'Not for',
          description:
            'People looking for a broad AI-tool review with no specific validation job in mind.',
        },
        {
          title: 'Use it when',
          description:
            'You need to choose whether to keep prompting loosely or move into a workflow that ranks, scores, and narrows what deserves deeper work.',
        },
      ],
      detailEyebrow: 'Decision frame',
      detailTitle: 'The main difference is not output volume. It is whether the workflow helps you compare, rank, and leave with one next step.',
      detailDescription:
        'Prompting is often enough for first-pass idea expansion. Structured validation becomes more valuable once you need to pressure-test a wedge against repeated pain, buyer fit, and whether the opportunity deserves more time.',
      inputLabel: 'When ChatGPT is often enough',
      inputExample: [
        'You want more angles on a broad market and are still exploring language, framing, or possible product directions.',
        'You are trying to brainstorm adjacent workflows before you settle on one candidate wedge.',
        'You need a fast back-and-forth conversation rather than a stable ranking framework.',
      ],
      outputLabel: 'When BadgerSignal is more useful',
      outputExample: [
        'You want ranked outputs and clearer trade-offs instead of another pile of unstructured ideas.',
        'You need to compare several wedges against the same scoring frame before deciding what to validate next.',
        'You want public proof examples and a workflow designed around the next decision, not just more exploration.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Questions people ask when comparing BadgerSignal and ChatGPT',
      faqDescription:
        'These answers clarify where each workflow fits, how to choose between them, and why structured validation can be more useful than generic prompting alone.',
      faqItems: [
        {
          question: 'Can ChatGPT help me validate a startup idea at all?',
          answer:
            'Yes. It can help you think through risks, objections, or alternative framings. It becomes weaker when you need a repeatable way to rank several wedges or leave with a more explicit next-step decision.',
        },
        {
          question: 'What does BadgerSignal do differently from a good prompt?',
          answer:
            'It keeps the workflow anchored to one direction, adds a more stable comparison frame, and is designed to surface ranked outputs instead of conversational exploration alone.',
        },
        {
          question: 'Should I stop using ChatGPT if I use BadgerSignal?',
          answer:
            'No. They can complement each other. ChatGPT is still useful for loose exploration or rewriting. BadgerSignal becomes more useful when the problem shifts from brainstorming to structured validation.',
        },
        {
          question: 'What is the best next page after reading this comparison?',
          answer:
            'If you already have one candidate wedge, go to SaaS idea validation. If the wedge is still too loose, start with idea generation or read a concrete public sample report first.',
        },
      ],
      relatedColumns: [
        {
          title: 'SaaS idea validation',
          description: 'Move into the workflow that pressure-tests one candidate wedge once you need a clearer keep-going or stop decision.',
          href: '/en/saas-idea-validation',
          actionLabel: 'Open validation workflow',
        },
        {
          title: 'AI startup idea generator',
          description: 'If the idea is still too broad, go back one step and expand the direction into more candidate wedges first.',
          href: '/en/ai-startup-idea-generator',
          actionLabel: 'Explore generator page',
        },
        {
          title: 'Recruiter sample report',
          description: 'Inspect a concrete public report before login to see how ranked outputs look in practice.',
          href: '/en/examples/ai-tools-for-recruiters',
          actionLabel: 'View recruiter sample',
        },
      ],
      closing: {
        eyebrow: 'Choose the right workflow',
        title: 'Move from generic prompting into structured validation when the next decision matters more.',
        description:
          'If you need more than another brainstorm, use a workflow that compares wedges against the same frame and helps you decide what deserves deeper work next.',
        primaryAction: {
          label: 'Start Analysis',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'Open Validation Workflow',
          href: '/en/saas-idea-validation',
          variant: 'outline',
        },
      },
    },
    'use-cases-ai-tools-for-recruiters': {
      heroVisualEyebrow: 'Recruiter use case',
      heroVisualTitle: 'Hiring workflows with repeated note-to-follow-up drag',
      heroVisualRows: [
        { label: 'Audience fit', value: 'Recruiters' },
        { label: 'Pain shape', value: 'Repeated' },
        { label: 'Wedge goal', value: 'Operational' },
      ],
      supportEyebrow: 'Why this page exists',
      supportTitle:
        'Recruiter AI opportunities are strongest when they solve repeated handoff friction, not when they try to be general-purpose recruiting assistants.',
      supportDescription:
        'This page focuses on recruiter workflows where interview notes, candidate summaries, follow-up, and role-to-fit handoffs create repeated operational drag. Those are the places where narrow product wedges are easier to explain and test.',
      diagnosticColumns: [
        {
          title: 'Interview notes stay messy',
          description:
            'Recruiters capture a high volume of conversations, but the handoff from notes to candidate summary is still manual, uneven, and time sensitive.',
        },
        {
          title: 'Follow-up quality drops under load',
          description:
            'When recruiter volume rises, the best candidates can go cold because next steps, recap quality, and internal handoff speed all start to slip.',
        },
        {
          title: 'The best wedges are operational',
          description:
            'The most credible AI tools here are not broad “recruiting copilots.” They are narrower workflows that reduce admin drag inside candidate movement.',
        },
      ],
      intentEyebrow: 'Best fit',
      intentTitle: 'Use this page when you want recruiter-specific AI wedges rooted in repeated workflow pain.',
      intentDescription:
        'This page is best for founders, independent recruiters, and hiring operators who already know the recruiting context but need sharper product wedges than broad AI-for-HR positioning usually provides.',
      intentColumns: [
        {
          title: 'Best for',
          description:
            'People exploring interview-note cleanup, candidate-summary workflows, or recruiter follow-up systems with clear time-to-response pressure.',
        },
        {
          title: 'Not for',
          description:
            'Teams looking for a generic HR stack overview or a very broad article about hiring automation trends.',
        },
        {
          title: 'Use it when',
          description:
            'You want to see whether recruiter-specific workflow pain can turn into a product wedge worth validating next.',
        },
      ],
      detailEyebrow: 'Input and output example',
      detailTitle: 'The most useful recruiter input starts from one workflow bottleneck, not the whole recruiting stack at once.',
      detailDescription:
        'A narrow workflow makes it easier to compare candidate wedges by operational urgency, follow-up risk, and whether the product story is simple enough for recruiters to adopt quickly.',
      inputLabel: 'Example recruiter directions',
      inputExample: [
        'A workflow that turns interview notes into candidate summaries and recommended next actions.',
        'A system for recruiter post-call recap and follow-up drafting after screening interviews.',
        'A product wedge for matching role briefs to candidate-ready narrative summaries before internal handoff.',
      ],
      outputLabel: 'What a stronger recruiter wedge should reveal',
      outputExample: [
        'A clearer ranking of which recruiter workflow pain is repeated enough to justify a real product wedge.',
        'A better read on whether the product saves time inside candidate movement, not just around generic writing.',
        'A sharper next move: validate the top operational wedge or step back into a broader opportunity map.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Questions people ask when exploring AI tools for recruiters',
      faqDescription:
        'These answers explain what kind of recruiter pain is strongest, why operational wedges rank well, and how to move from workflow pain into product validation.',
      faqItems: [
        {
          question: 'Why focus on recruiter workflow pain instead of broad AI recruiting tools?',
          answer:
            'Because broad categories usually hide where the real buying signal sits. Narrow workflow pain such as note cleanup, summary handoff, and follow-up recovery is easier to explain, pilot, and monetize.',
        },
        {
          question: 'What makes recruiter follow-up a strong AI wedge?',
          answer:
            'It happens repeatedly, carries clear time pressure, and directly affects candidate movement. That combination makes the ROI story easier to understand than a general assistant pitch.',
        },
        {
          question: 'How should I use this page if I serve a different hiring context?',
          answer:
            'Use it as a workflow lens. If your audience also loses time between conversation, summary, and next action, the same logic can help you spot a stronger recruiting wedge.',
        },
        {
          question: 'What should I do after I identify a promising recruiter wedge?',
          answer:
            'Take the strongest one into structured validation or compare it against a public recruiter sample report to see whether the product framing still looks specific enough.',
        },
      ],
      relatedColumns: [
        {
          title: 'Recruiter sample report',
          description: 'Inspect a public recruiting report to see ranked workflow wedges before you run your own direction.',
          href: '/en/examples/ai-tools-for-recruiters',
          actionLabel: 'View recruiter sample',
        },
        {
          title: 'SaaS idea validation',
          description: 'Move one promising recruiter wedge into a tighter keep-going or stop decision.',
          href: '/en/saas-idea-validation',
          actionLabel: 'Open validation workflow',
        },
        {
          title: 'Validation guide',
          description: 'Read the practical sequence for deciding whether a wedge is strong enough before you build.',
          href: '/en/guides/how-to-validate-an-ai-startup-idea',
          actionLabel: 'Open validation guide',
        },
      ],
      closing: {
        eyebrow: 'Try a recruiting direction',
        title: 'Test a recruiter workflow before you build a broad hiring copilot.',
        description:
          'Use a narrower recruiting wedge with repeated operational pain, then validate whether the buyer, workflow, and time pressure are strong enough to carry the product forward.',
        primaryAction: {
          label: 'Start Analysis',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'View Recruiter Sample',
          href: '/en/examples/ai-tools-for-recruiters',
          variant: 'outline',
        },
      },
    },
    'guides-how-to-prioritize-ai-business-opportunities': {
      heroVisualEyebrow: 'How-to prioritization',
      heroVisualTitle: 'Rank the wedge that deserves your next move',
      heroVisualRows: [
        { label: 'Market frame', value: 'Defined' },
        { label: 'Decision lens', value: 'Priority-first' },
        { label: 'Next step', value: 'Validation-ready' },
      ],
      supportEyebrow: 'Why this guide exists',
      supportTitle:
        'Most teams do not fail because they lack ideas. They fail because too many plausible AI wedges look attractive at the same time.',
      supportDescription:
        'This guide is for the moment after you have several interesting directions but before you know which one deserves the next hour of research, interviews, or product work. It turns prioritization into a visible sequence instead of a vague gut decision.',
      diagnosticColumns: [
        {
          title: 'Start with one market slice',
          description:
            'Prioritization works best when the candidates all sit inside the same buyer, workflow, or operating context instead of competing across unrelated markets.',
        },
        {
          title: 'Compare repeated pain before novelty',
          description:
            'The wedge with the best story is often the one tied to repeated operational pain, not the one that sounds the most futuristic in a pitch deck.',
        },
        {
          title: 'Rank before you research deeply',
          description:
            'A lightweight ranking pass helps you decide where manual research, interviews, and product time should go next instead of spreading them across every idea.',
        },
      ],
      intentEyebrow: 'Best fit',
      intentTitle: 'Use this guide when you can already see several possible AI wedges and need a cleaner priority order first.',
      intentDescription:
        'This page is built for founders, operators, and service teams who are no longer asking “what could we build?” but instead “which of these opportunities deserves the next step?”',
      intentColumns: [
        {
          title: 'Best for',
          description:
            'People comparing multiple candidate wedges inside one market, workflow, or buyer slice who need a practical ranking method before deeper research.',
        },
        {
          title: 'Not for',
          description:
            'Visitors who still need a wider set of startup ideas or already have one exact wedge ready for direct validation.',
        },
        {
          title: 'Use it when',
          description:
            'You need to make one sharper priority call before interviews, custom research, or product scoping spread across too many options.',
        },
      ],
      detailEyebrow: 'Input and outcome',
      detailTitle: 'A good prioritization input compares wedges inside one operating frame, not across unrelated markets.',
      detailDescription:
        'The goal is not to over-model every opportunity. The goal is to compare urgency, willingness to pay, and implementation drag clearly enough that one wedge earns the next move.',
      inputLabel: 'Example starting comparisons',
      inputExample: [
        'Inside small-business operations: quote follow-up, inbox-to-schedule coordination, and invoice chase workflows.',
        'Inside agency delivery: client feedback cleanup, meeting recap to project update, and deliverable QA support.',
        'Inside recruiting operations: note cleanup, recruiter follow-up, and role-brief handoff workflows.',
      ],
      outputLabel: 'What a stronger prioritization pass should clarify',
      outputExample: [
        'Which wedge has the clearest repeated pain and shortest path to a believable buying story.',
        'Which option deserves deeper interviews or validation first, and which ones should wait.',
        'Why one opportunity outranks another when urgency, ROI visibility, and complexity are compared side by side.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Questions people ask when prioritizing AI business opportunities',
      faqDescription:
        'These answers explain how to rank competing wedges, what signals matter most early, and why prioritization should happen before heavy research.',
      faqItems: [
        {
          question: 'What is the fastest way to prioritize AI business opportunities?',
          answer:
            'Start with one market slice, compare repeated pain and urgency, then pressure-test whether the strongest wedge also has a believable willingness-to-pay and rollout story.',
        },
        {
          question: 'Should I prioritize by novelty or technical excitement?',
          answer:
            'Usually no. Early prioritization is more useful when it favors repeated pain, operational urgency, and clear adoption logic over how impressive the underlying AI feels.',
        },
        {
          question: 'When should I do manual research instead of this kind of ranking?',
          answer:
            'Manual research matters more after you already know which wedge deserves the deeper effort. This guide helps you narrow the field before that costlier stage begins.',
        },
        {
          question: 'What page should I open after this guide?',
          answer:
            'Take the strongest wedge into AI business opportunity analysis or a public example page first, then move into deeper validation once the ranking feels stable enough.',
        },
      ],
      relatedColumns: [
        {
          title: 'AI business opportunity analysis',
          description: 'Move the strongest market slice into the workflow built to rank multiple wedges inside one broader opportunity space.',
          href: '/en/ai-business-opportunity-analysis',
          actionLabel: 'Open analysis workflow',
        },
        {
          title: 'BadgerSignal vs manual market research',
          description: 'Compare structured opportunity analysis with deeper manual research before deciding how much work the next stage deserves.',
          href: '/en/comparisons/badgersignal-vs-manual-market-research',
          actionLabel: 'View comparison',
        },
        {
          title: 'Agency sample report',
          description: 'See how prioritization shows up in a public report built around service-delivery and margin-sensitive workflows.',
          href: '/en/examples/ai-tools-for-agencies',
          actionLabel: 'View agency sample',
        },
      ],
      closing: {
        eyebrow: 'Prioritize your own opportunity space',
        title: 'Rank the AI wedge that deserves the next move.',
        description:
          'Use a clearer prioritization sequence before you spend deeper research or product time on the wrong opportunity. Start with your own market, or inspect a public sample first.',
        primaryAction: {
          label: 'Start Analysis',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'View Agency Sample',
          href: '/en/examples/ai-tools-for-agencies',
          variant: 'outline',
        },
      },
    },
    'comparisons-badgersignal-vs-manual-market-research': {
      heroVisualEyebrow: 'Comparison',
      heroVisualTitle: 'When ranked AI analysis is enough, and when manual research still wins',
      heroVisualRows: [
        { label: 'First shortlist speed', value: 'BadgerSignal' },
        { label: 'Custom nuance depth', value: 'Manual research' },
        { label: 'Best sequence', value: 'AI then human' },
      ],
      supportEyebrow: 'Why this comparison exists',
      supportTitle:
        'Manual market research is still essential, but not every stage of opportunity narrowing needs the same amount of custom effort.',
      supportDescription:
        'This page is for founders and operators deciding whether to keep digging manually right now or first use a structured workflow to turn one market direction into a ranked shortlist. The strongest answer is often not one or the other, but the right order.',
      diagnosticColumns: [
        {
          title: 'Where manual research wins',
          description:
            'Manual research is stronger when the field is already narrow, the stakes are high, and you need custom nuance from interviews, internal context, or messy market signals.',
        },
        {
          title: 'Where BadgerSignal wins',
          description:
            'BadgerSignal is stronger when you still need to compare several wedges quickly and want a visible ranking frame before you invest in deeper human research.',
        },
        {
          title: 'What the better sequence looks like',
          description:
            'Use structured AI analysis first to narrow what deserves attention, then spend manual research effort on the top-ranked wedge instead of every candidate.',
        },
      ],
      intentEyebrow: 'Best fit',
      intentTitle: 'Use this comparison when you are choosing how to narrow a market before deeper interviews or custom research.',
      intentDescription:
        'This page helps people who already know the market they care about but still need to decide whether they should keep manually researching everything or first use a ranked opportunity workflow.',
      intentColumns: [
        {
          title: 'Best for',
          description:
            'Founders, operators, and consultants who need to decide how much research effort the next stage deserves and where that effort should go first.',
        },
        {
          title: 'Not for',
          description:
            'Visitors looking for a generic explanation of market research without an immediate prioritization or wedge-selection decision to make.',
        },
        {
          title: 'Use it when',
          description:
            'You already have a market slice and need to choose between going deeper manually now or first narrowing the shortlist with a structured ranking workflow.',
        },
      ],
      detailEyebrow: 'Decision framing',
      detailTitle: 'The real question is not whether AI replaces manual research, but whether you have narrowed the field enough to justify deeper manual effort.',
      detailDescription:
        'If you still have multiple credible wedges inside one market, structured ranking often saves time. If one wedge already stands out and the stakes are rising, manual research becomes more important.',
      inputLabel: 'When manual research is usually stronger',
      inputExample: [
        'You already narrowed the market to one wedge and now need deeper buyer nuance from interviews and domain-specific context.',
        'The opportunity is high stakes enough that you need more than a ranked shortlist before committing resources.',
        'Important signals live in conversations, custom documents, or context that only hands-on research will uncover.',
      ],
      outputLabel: 'When BadgerSignal is usually stronger',
      outputExample: [
        'You still need a faster ranked shortlist inside one market before deciding what deserves deeper calls or interviews.',
        'You want a repeatable comparison frame for urgency, willingness to pay, and implementation drag across several wedges.',
        'You are early enough that spending manual effort on every option would slow you down more than it helps.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Questions people ask when comparing BadgerSignal with manual market research',
      faqDescription:
        'These answers explain what manual research still does best, where structured AI analysis saves time, and how the two should work together.',
      faqItems: [
        {
          question: 'Does this mean manual market research is obsolete?',
          answer:
            'No. Manual research still matters when you need deep custom nuance, direct buyer language, or higher-confidence evidence before committing. The point is to use it after you narrow what deserves that effort.',
        },
        {
          question: 'What does BadgerSignal do earlier in the process?',
          answer:
            'It helps turn one market direction into a visible ranked shortlist so you can decide which wedge deserves interviews, custom calls, or heavier market diligence next.',
        },
        {
          question: 'Should I use both approaches together?',
          answer:
            'Usually yes. Structured AI analysis helps narrow the shortlist quickly, and manual research then helps pressure-test the top wedge with deeper context and real conversations.',
        },
        {
          question: 'What should I open after this comparison?',
          answer:
            'If you still need to rank several wedges, open AI business opportunity analysis. If you already have a top candidate, move into a sample report or a tighter validation workflow next.',
        },
      ],
      relatedColumns: [
        {
          title: 'AI business opportunity analysis',
          description: 'Use the workflow that ranks several wedges inside one market before you commit to deeper manual research.',
          href: '/en/ai-business-opportunity-analysis',
          actionLabel: 'Open analysis workflow',
        },
        {
          title: 'Prioritization guide',
          description: 'Read the practical sequence for comparing repeated pain, urgency, and willingness to pay before you research deeply.',
          href: '/en/guides/how-to-prioritize-ai-business-opportunities',
          actionLabel: 'Open prioritization guide',
        },
        {
          title: 'Agency sample report',
          description: 'Review a public agency example to see how ranked workflow analysis looks before interviews or custom research begin.',
          href: '/en/examples/ai-tools-for-agencies',
          actionLabel: 'View agency sample',
        },
      ],
      closing: {
        eyebrow: 'Choose the right research sequence',
        title: 'Narrow the shortlist before you spend deeper manual effort.',
        description:
          'Use structured opportunity analysis when you still need a clearer shortlist, then move into deeper manual research once one wedge deserves the time.',
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
    'use-cases-ai-tools-for-agencies': {
      heroVisualEyebrow: 'Agency use case',
      heroVisualTitle: 'Agency workflows with repeated feedback and handoff drag',
      heroVisualRows: [
        { label: 'Audience fit', value: 'Agencies' },
        { label: 'Pain shape', value: 'Margin drag' },
        { label: 'Wedge goal', value: 'Delivery clarity' },
      ],
      supportEyebrow: 'Why this page exists',
      supportTitle:
        'The most believable AI tools for agencies are usually not broad “AI for agencies” platforms. They are narrower wedges that reduce repeated delivery friction and margin leakage.',
      supportDescription:
        'This page focuses on agency workflows where client feedback loops, recap drift, handoff cleanup, and deliverable QA create repeatable operational pain. Those are the places where agency software wedges are easier to explain, pilot, and defend.',
      diagnosticColumns: [
        {
          title: 'Client feedback loops eat margin',
          description:
            'Agencies lose time when vague feedback has to be translated into clear scoped action items by hand across multiple projects and stakeholders.',
        },
        {
          title: 'Recap drift creates project misalignment',
          description:
            'Meetings, calls, and async updates produce scattered decisions that still need to be turned into project-state changes, owner assignments, and next actions.',
        },
        {
          title: 'The strongest wedges are delivery-adjacent',
          description:
            'The most credible agency tools usually support service delivery operations directly instead of trying to become a broad general-purpose creative assistant.',
        },
      ],
      intentEyebrow: 'Best fit',
      intentTitle: 'Use this page when you want agency-specific AI wedges rooted in repeated delivery friction and rework cost.',
      intentDescription:
        'This page is for founders, operators, and delivery leads who understand agency work already but need narrower AI wedges than broad “agency automation” or “marketing AI” language usually provides.',
      intentColumns: [
        {
          title: 'Best for',
          description:
            'People exploring client-feedback cleanup, project recap workflows, or recurring QA processes where delivery drag shows up repeatedly.',
        },
        {
          title: 'Not for',
          description:
            'Teams looking for a generic overview of agency AI trends without a concrete workflow or margin problem in mind.',
        },
        {
          title: 'Use it when',
          description:
            'You want to see whether one repeated agency workflow pain can become a wedge worth validating before you build a broader service platform.',
        },
      ],
      detailEyebrow: 'Input and output example',
      detailTitle: 'The most useful agency input starts from one delivery bottleneck, not the whole agency stack at once.',
      detailDescription:
        'A narrow delivery problem makes it easier to compare wedges by coordination cost, rework risk, and whether the adoption story is simple enough for agencies to try quickly.',
      inputLabel: 'Example agency directions',
      inputExample: [
        'A workflow that turns client feedback into scoped project action items and next-owner assignments.',
        'A system that converts call recaps and meeting decisions into cleaner project updates for delivery teams.',
        'A product wedge for recurring deliverable QA before work goes back to the client.',
      ],
      outputLabel: 'What a stronger agency wedge should reveal',
      outputExample: [
        'A clearer ranking of which agency workflow pain is repeated enough to justify a true software wedge.',
        'A better read on whether the product reduces rework and coordination drag, not just generic writing effort.',
        'A sharper next move: validate the top operational wedge or step back into a broader opportunity map.',
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Questions people ask when exploring AI tools for agencies',
      faqDescription:
        'These answers explain which agency pain is strongest, why delivery-adjacent wedges rank well, and how to move from workflow drag into product validation.',
      faqItems: [
        {
          question: 'Why focus on delivery friction instead of broad agency AI categories?',
          answer:
            'Because broad categories usually hide where the buying pain really lives. Narrow workflow drag such as feedback cleanup, recap drift, and QA coordination is easier to explain, pilot, and monetize.',
        },
        {
          question: 'What makes client feedback cleanup a strong wedge?',
          answer:
            'It happens repeatedly, directly affects margin through rework, and sits in a structured text-heavy workflow where AI can produce visible value quickly.',
        },
        {
          question: 'How should I use this page if I serve a different service team?',
          answer:
            'Use it as a workflow lens. If your team also loses time turning conversation, feedback, or review notes into concrete delivery actions, the same logic can reveal a stronger wedge.',
        },
        {
          question: 'What should I do after I identify a promising agency wedge?',
          answer:
            'Take the strongest one into opportunity analysis or compare it against a public agency sample report to see whether the product framing still looks specific enough.',
        },
      ],
      relatedColumns: [
        {
          title: 'Agency sample report',
          description: 'Inspect a public agency report to see ranked delivery wedges before you run your own direction.',
          href: '/en/examples/ai-tools-for-agencies',
          actionLabel: 'View agency sample',
        },
        {
          title: 'AI business opportunity analysis',
          description: 'Move one promising agency wedge into the workflow that ranks broader opportunity spaces more explicitly.',
          href: '/en/ai-business-opportunity-analysis',
          actionLabel: 'Open analysis workflow',
        },
        {
          title: 'Prioritization guide',
          description: 'Read the practical sequence for deciding which workflow pain should win the next move.',
          href: '/en/guides/how-to-prioritize-ai-business-opportunities',
          actionLabel: 'Open prioritization guide',
        },
      ],
      closing: {
        eyebrow: 'Try an agency direction',
        title: 'Test a narrower agency workflow before building a broad service copilot.',
        description:
          'Start from one repeated delivery pain, then decide whether the buyer, workflow, and rework pressure are strong enough to carry the product forward.',
        primaryAction: {
          label: 'Start Analysis',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'View Agency Sample',
          href: '/en/examples/ai-tools-for-agencies',
          variant: 'outline',
        },
      },
    },
  },
  zh: {
    'ai-startup-idea-generator': {
      heroVisualEyebrow: '点子生成',
      heroVisualTitle: '输入一个方向，得到一组可排序的创业切口',
      heroVisualRows: [
        { label: '点子展开数量', value: '20+' },
        { label: '评分结构', value: '结构化' },
        { label: '下一步动作', value: '可继续验证' },
      ],
      supportEyebrow: '为什么需要这个页面',
      supportTitle:
        '一个真正有用的 AI 创业点子生成器，不应该只吐出随机灵感，而应该帮你比较不同创业切口。',
      supportDescription:
        '这个页面专注于“点子生成 + 初步评估”。它从一个产品方向出发，展开成多个创业角度，并提供足够的结构，帮助你判断哪些点子值得进入下一轮验证。',
      diagnosticColumns: [
        {
          title: '从一个方向开始',
          description:
            '先带着一个产品方向、市场主题或用户群体进入，而不是让生成器在没有边界的情况下吐出一堆不相关点子。',
        },
        {
          title: '看见经过评估的创业切口',
          description:
            '你看到的不是平铺的灵感清单，而是一组带有排序信号的 20+ 个经过评估的机会方向。',
        },
        {
          title: '把更强的点子继续往下推进',
          description:
            '把最值得关注的切口带到下一步，继续做 SaaS 点子验证、商业机会分析，或和公开样例做对照。',
        },
      ],
      intentEyebrow: '适用场景',
      intentTitle: '当你需要更多可比较的创业切口，而不是一个最终结论时，用这个生成器。',
      intentDescription:
        '这个页面适合已经知道自己想看哪个市场或用户问题，但还没决定从哪个创业切口切入的人。它的作用不是替你下最终判断，而是先把候选方向展开并排出优先级。',
      intentColumns: [
        {
          title: '适合谁',
          description:
            '心里已经有市场方向、用户群体或工作流主题，但还需要多个靠谱创业切口进行横向比较的人。',
        },
        {
          title: '不适合谁',
          description:
            '已经选定一个具体点子，只想得到“该不该继续做”判断的团队。',
        },
        {
          title: '什么时候用',
          description:
            '当你想先把一个方向展开成 20+ 个可排序机会，再决定哪个点子值得进入更深验证时使用。',
        },
      ],
      detailEyebrow: '输入输出样例',
      detailTitle: '当输入里已经带有清晰用户、工作流或市场边界时，生成结果会更有比较价值。',
      detailDescription:
        '一个更具体的起点，能让生成器沿着同一条线展开相邻切口。输出重点也不是再给你一堆散点灵感，而是给你一组可以横向比较的候选方向。',
      inputLabel: '输入示例',
      inputExample: [
        '一个面向独立顾问的 AI 工具，帮助他们把通话内容更快转成项目跟进。',
        '一个围绕小型医疗团队合规工作流的产品方向。',
        '一个帮助电商运营更快迭代商品目录与营销活动的 AI 切口。',
      ],
      outputLabel: '生成器会返回什么',
      outputExample: [
        '20+ 个与原始方向相关、且经过初步评估的创业机会。',
        '一组可以按照紧迫度、用户贴合度和产品深度比较的创业切口。',
        '一份更短的优先候选列表，便于继续进入验证或机会分析。',
      ],
      faqEyebrow: '常见问题',
      faqTitle: '在使用 AI 创业点子生成器前，用户最常问什么',
      faqDescription:
        '这些问题重点解释：为什么这个页面不是普通 brainstorming 工具，以及为什么它强调“生成之后还要评估”。',
      faqItems: [
        {
          question: '它和普通的 AI brainstorming prompt 有什么区别？',
          answer:
            '普通提示词往往只会给你一堆零散点子。这个流程会先固定一个方向，再展开多个创业切口，并给出一组可以比较的、经过评估的机会。',
        },
        {
          question: '我必须先有一个很完整的创业点子才能用吗？',
          answer:
            '不需要。你只需要有一个相对清晰的方向。这个页面适合“知道想探索哪个领域，但还不知道具体从哪个切口切入”的人。',
        },
        {
          question: '这个页面会直接帮我完成验证吗？',
          answer:
            '不会完全替代验证。它更适合做“点子生成 + 初步评估”。如果你想继续检验某一个方向是否值得投入，下一步应该进入 SaaS 点子验证页面。',
        },
        {
          question: '我能期待什么样的结果？',
          answer:
            '你会看到 20+ 个经过评估的机会、可见的评分逻辑，以及更清晰的优先级判断，而不是再进行一轮模糊的头脑风暴。',
        },
        {
          question: '为什么不直接用 ChatGPT 生成创业点子？',
          answer:
            '当然可以先问 ChatGPT，但通用聊天往往只会返回一组缺少比较框架的灵感。这个页面会固定一个方向、展开相邻切口，并给出结构化评分，让你比较点子，而不是只是继续收集点子。',
        },
      ],
      relatedColumns: [
        {
          title: '验证指南',
          description: '先看一遍更实用的验证顺序，再决定应该如何收窄、测试和选择下一个切口。',
          href: '/zh/guides/how-to-validate-an-ai-startup-idea',
          actionLabel: '查看验证指南',
        },
        {
          title: 'SaaS 点子验证',
          description: '把更有希望的切口带到更聚焦的验证工作流里继续判断。',
          href: '/zh/saas-idea-validation',
          actionLabel: '进入验证页面',
        },
        {
          title: '招聘样例报告',
          description: '先看一份招聘公开样例，感受可排序切口如何在垂直场景里变成报告。',
          href: '/zh/examples/ai-tools-for-recruiters',
          actionLabel: '查看招聘样例',
        },
        {
          title: '切口指南',
          description: '学习如何先把更宽的 AI 方向收窄成更清晰的 SaaS 切口，再继续扩展点子。',
          href: '/zh/guides/how-to-find-an-ai-saas-wedge',
          actionLabel: '查看切口指南',
        },
      ],
      closing: {
        eyebrow: '开始分析你的方向',
        title: '从一个真实方向出发，生成更值得继续验证的创业点子。',
        description:
          'BadgerSignal 最适合配合真实主题、市场或用户问题使用。你可以直接开始分析，也可以先看公开样例，再决定要不要继续做更深的验证。',
        primaryAction: {
          label: '开始分析',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: '查看样例报告',
          href: '/zh/examples/ai-tools-for-freelancers',
          variant: 'outline',
        },
      },
    },
    'saas-idea-validation': {
      heroVisualEyebrow: '验证流程',
      heroVisualTitle: '聚焦一个 SaaS 点子，判断继续还是停下',
      heroVisualRows: [
        { label: '验证深度', value: '聚焦' },
        { label: '取舍视图', value: '可见' },
        { label: '决策目标', value: '继续或放弃' },
      ],
      supportEyebrow: '为什么需要这个页面',
      supportTitle:
        'SaaS 点子验证真正应该做的事，不是把每个点子都包装得很有希望，而是尽早筛掉不该继续投入的方向。',
      supportDescription:
        '这个页面适合已经有候选点子的人。它不会继续帮你扩展更多点子，而是围绕一个方向做压力测试，让你判断它是否值得继续做用户验证、产品设计，或者干脆停掉。',
      diagnosticColumns: [
        {
          title: '聚焦一个候选方向',
          description:
            '先带着一个明确的 SaaS 点子进入，让页面评估这个具体切口，而不是重新把问题扩展成更多想法。',
        },
        {
          title: '更清楚地看见风险与贴合度',
          description:
            '通过结构化评分理解用户痛点强度、产品复杂度、落地难度，以及这个市场切片是否足够值得做。',
        },
        {
          title: '明确下一步怎么走',
          description:
            '目标不是无限探索，而是更快决定：继续验证、收紧切口，还是在投入更多时间之前先放弃这个方向。',
        },
      ],
      intentEyebrow: '适用场景',
      intentTitle: '当你已经有一个候选 SaaS 点子，并且需要更明确的继续或停下判断时，用验证页。',
      intentDescription:
        '这个页面适合已经走过开放式 brainstorming 的人。它最有价值的场景，是你已经有一个候选方向，需要判断它值不值得继续投入产品时间、用户研究，或者应该尽早止损。',
      intentColumns: [
        {
          title: '适合谁',
          description:
            '已经有一个候选 SaaS 点子，想更清楚看见用户痛点强度、贴合度和执行风险的人。',
        },
        {
          title: '不适合谁',
          description:
            '还需要先扩展更多点子，或者还没有收窄到单一切口、仍在看更宽机会空间的人。',
        },
        {
          title: '什么时候用',
          description:
            '当你需要尽快判断“继续、收紧切口，还是停下”，而不是继续把问题发散开时使用。',
        },
      ],
      detailEyebrow: '输入输出样例',
      detailTitle: '当候选点子已经说清买家、工作流和核心痛点时，验证结果会更有判断力。',
      detailDescription:
        '输入越具体，页面越能更快看清这个切口的贴合度、风险和产品形态。输出的价值在于帮你更干净地做出“继续、收紧、还是停下”的决定。',
      inputLabel: '输入示例',
      inputExample: [
        '一个面向独立招聘顾问的 SaaS，把面试记录自动整理成候选人摘要与后续动作。',
        '一个帮助小型财务团队更快完成合规审核流程的产品方向。',
        '一个帮助代理公司把客户反馈更稳定转成项目改动的 AI 运营工具。',
      ],
      outputLabel: '验证页会返回什么',
      outputExample: [
        '对这个点子是否值得继续深入验证的结构化判断。',
        '围绕用户痛点、产品深度和执行取舍的更清晰优劣势分析。',
        '更明确的下一步建议：继续、收紧切口，还是直接降低优先级。',
      ],
      faqEyebrow: '常见问题',
      faqTitle: '在做 SaaS 点子验证前，用户最常问什么',
      faqDescription:
        '这些问题重点解释什么时候该用验证页，以及它和点子生成页的区别。',
      faqItems: [
        {
          question: '它和 AI 创业点子生成器页面有什么区别？',
          answer:
            '生成器页会把一个方向扩展成多个创业切口；验证页正好相反，它会围绕一个候选 SaaS 点子做判断，看这个方向是否值得继续投入。',
        },
        {
          question: '我必须先有完整的产品方案才能验证吗？',
          answer:
            '不需要。你只要有一个相对明确的 SaaS 方向就够了。这个页面的作用就是帮助你判断这个方向值不值得继续做用户研究或产品设计。',
        },
        {
          question: '它能百分之百告诉我这个点子会不会成功吗？',
          answer:
            '不能。任何验证页都做不到这一点。但它可以更早暴露关键取舍、弱信号和潜在风险，减少你在错误方向上投入数月的概率。',
        },
        {
          question: '验证完之后，下一步应该做什么？',
          answer:
            '如果方向看起来仍然足够强，就继续做更深的用户验证或更窄的机会分析；如果信号偏弱，就收紧切口，或者直接降低优先级。',
        },
        {
          question: '为什么不直接用 ChatGPT 来验证这个点子？',
          answer:
            'ChatGPT 可以帮你列风险，但它不会天然逼你做出“继续还是停下”的结构化判断。这个页面的价值在于把取舍显性化，并且把输出始终锚定在一个候选点子上。',
        },
      ],
      relatedColumns: [
        {
          title: '验证指南',
          description: '先看一遍更实用的验证顺序，再把一个候选切口带进更细的压力测试里。',
          href: '/zh/guides/how-to-validate-an-ai-startup-idea',
          actionLabel: '查看验证指南',
        },
        {
          title: 'BadgerSignal vs ChatGPT',
          description: '先比较结构化验证和通用聊天，再决定下一步该用哪条工作流。',
          href: '/zh/comparisons/badgersignal-vs-chatgpt-for-startup-idea-validation',
          actionLabel: '查看对比页面',
        },
        {
          title: '招聘样例报告',
          description: '先看一份招聘公开样例，再判断自己的候选切口是否也足够具体。',
          href: '/zh/examples/ai-tools-for-recruiters',
          actionLabel: '查看招聘样例',
        },
      ],
      closing: {
        eyebrow: '验证你的候选点子',
        title: '用更早出现的结构化判断，决定这个 SaaS 点子是否值得继续。',
        description:
          'BadgerSignal 帮你更早做出那个不舒服但必要的决定：继续做、缩小切口，还是提前放弃。你可以直接分析自己的方向，或先看公开样例报告。',
        primaryAction: {
          label: '开始分析',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: '查看样例报告',
          href: '/zh/examples/ai-tools-for-freelancers',
          variant: 'outline',
        },
      },
    },
    'ai-business-opportunity-analysis': {
      heroVisualEyebrow: '机会分析',
      heroVisualTitle: '把一个宽方向整理成更清晰的优先机会地图',
      heroVisualRows: [
        { label: '市场范围', value: '已定义' },
        { label: '排序逻辑', value: '基于信号' },
        { label: '下一步', value: '可排序' },
      ],
      supportEyebrow: '为什么需要这个页面',
      supportTitle:
        '机会分析要解决的，不是继续生成更多点子，也不是立刻验证一个精确假设，而是先把一个空间收窄。',
      supportDescription:
        '这个页面适合那些已经知道自己想探索哪个领域，但觉得机会空间仍然太宽的人。与其不断扩展更多点子，或者过早验证一个过窄方向，它会先帮助你比较这个更大空间里的多个机会切口。',
      diagnosticColumns: [
        {
          title: '先画出更宽的机会空间',
          description:
            '从一个更大的方向开始，比如某类工作流、市场或用户群体，让页面先识别其中多个值得关注的机会轨道。',
        },
        {
          title: '比较哪些切口信号更强',
          description:
            '通过结构化评分比较痛点强度、商业化形态、运营摩擦和执行取舍，判断哪个机会更值得认真投入。',
        },
        {
          title: '选出更强的下一步切口',
          description:
            '目标不是带着一堆选项离开，而是得到更清晰的优先级顺序，再把最强的切口带去做更深的验证。',
        },
      ],
      intentEyebrow: '适用场景',
      intentTitle: '当市场还太宽、你需要先得到一张可排序的机会地图时，用机会分析页。',
      intentDescription:
        '这个页面适合“验证之前的那一步”。如果你已经知道想探索哪个领域，但还没有决定押哪个具体切口，它会先帮助你把更宽空间收窄成更可执行的优先列表。',
      intentColumns: [
        {
          title: '适合谁',
          description:
            '已经知道自己想探索哪个空间，但还需要比较其中多个可信切口，再决定先验证哪一个的人。',
        },
        {
          title: '不适合谁',
          description:
            '还停留在空白页找点子阶段的人，或已经有一个非常具体的产品点子、可以直接进入验证的人。',
        },
        {
          title: '什么时候用',
          description:
            '当你需要先对更宽市场中的子机会做排序，再决定下一步该把哪个切口带去验证时使用。',
        },
      ],
      detailEyebrow: '输入输出样例',
      detailTitle: '最合适的输入，是一个仍然容得下多个切口的市场或工作流框架。',
      detailDescription:
        '你带进来的应该是一个清晰但还没缩到单一产品的空间。这个页面真正要帮你做的，是看清里面哪些子机会值得继续验证，哪些看起来热闹但其实不该优先推进。',
      inputLabel: '输入示例',
      inputExample: [
        '面向中型软件团队客户支持工作流中的 AI 机会。',
        '围绕医疗后台合规运营的一组更宽方向。',
        '电商商品运营与目录管理场景中的潜在 AI 产品切口。',
      ],
      outputLabel: '分析页会返回什么',
      outputExample: [
        '当前市场或流程空间内的一组可排序机会切口。',
        '围绕用户痛点、商业形态和执行取舍，对不同机会强弱的更清晰解释。',
        '一份更短的优先列表，帮助你决定下一步该验证哪个切口。',
      ],
      faqEyebrow: '常见问题',
      faqTitle: '在做 AI 商业机会分析前，用户最常问什么',
      faqDescription:
        '这些问题重点解释什么时候该用机会分析，以及它和点子生成、点子验证的区别。',
      faqItems: [
        {
          question: '它和 AI 创业点子生成器页面有什么区别？',
          answer:
            '生成器页更适合把一个方向扩展成多个创业点子；机会分析页更适合分析一个更宽的市场或流程空间，找出其中最值得优先推进的机会切口。',
        },
        {
          question: '它和 SaaS 点子验证有什么区别？',
          answer:
            '验证页是在更晚一步去压力测试一个具体点子；机会分析页更早一些，用来决定“到底哪个切口值得进入验证”。',
        },
        {
          question: '我必须先有很具体的产品方案才能用吗？',
          answer:
            '不需要。恰恰相反，这个页面更适合“方向已经有了，但还没有决定该押注哪个具体切口”的情况。',
        },
        {
          question: '做完机会分析之后，下一步应该是什么？',
          answer:
            '把最强的那个切口带去做 SaaS 点子验证、用户研究或更聚焦的产品设计。这个页面的结果应该是更清晰的优先级，而不是更多可能性。',
        },
        {
          question: '为什么不直接用 ChatGPT 来做市场分析？',
          answer:
            '通用聊天可以帮你概括市场，但很少会逼出一张带取舍逻辑的机会排序图。这个页面的目标不是泛泛总结，而是比较同一空间里的多个机会轨道，并帮助你选出最值得继续验证的那个。',
        },
      ],
      relatedColumns: [
        {
          title: '排序指南',
          description: '先看一遍如何在同一个市场里比较多个切口，再决定更深验证应该先投给谁。',
          href: '/zh/guides/how-to-prioritize-ai-business-opportunities',
          actionLabel: '查看排序指南',
        },
        {
          title: 'BadgerSignal vs 人工调研',
          description: '先比较结构化排序和更深的人工市场调研，再决定下一阶段该投多少人力研究。',
          href: '/zh/comparisons/badgersignal-vs-manual-market-research',
          actionLabel: '查看对比页面',
        },
        {
          title: '代理公司样例报告',
          description: '看看同样的排序逻辑，放到利润更敏感的服务交付工作流里会呈现出什么样的结果。',
          href: '/zh/examples/ai-tools-for-agencies',
          actionLabel: '查看代理公司样例',
        },
        {
          title: '点子生成器 vs 机会分析',
          description: '当你在决定下一步应该继续扩点子还是先排序时，先看这页对比。',
          href: '/zh/comparisons/idea-generator-vs-opportunity-analysis',
          actionLabel: '查看流程对比',
        },
        {
          title: '客户支持运营样例报告',
          description:
            '再看一份围绕工单分流、升级处理和交接动作构建的客户支持运营样例，比较这种队列型工作流的排序结果。',
          href: '/zh/examples/ai-tools-for-customer-support-operations',
          actionLabel: '查看支持运营样例',
        },
      ],
      closing: {
        eyebrow: '分析你的机会空间',
        title: '在真正押注之前，先找出最强的那个机会切口。',
        description:
          'BadgerSignal 帮你把更宽的市场方向收敛成更清晰的优先级列表。你可以直接分析自己的机会空间，或先看公开样例报告再决定下一步。',
        primaryAction: {
          label: '开始分析',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: '查看排序指南',
          href: '/zh/guides/how-to-prioritize-ai-business-opportunities',
          variant: 'outline',
        },
      },
    },
    'guides-how-to-validate-an-ai-startup-idea': {
      heroVisualEyebrow: '验证指南',
      heroVisualTitle: '先收窄市场、检查痛点，再决定下一步验证什么',
      heroVisualRows: [
        { label: '方向成熟度', value: '从方向开始' },
        { label: '痛点测试', value: '重复发生' },
        { label: '下一步', value: '可继续验证' },
      ],
      supportEyebrow: '为什么需要这份指南',
      supportTitle:
        '很多人并不是缺点子，而是太晚验证、验证得太宽，或者验证错了真正该检查的痛点。',
      supportDescription:
        '这份指南适合想先掌握一套实际方法的人。它把 AI 创业点子验证拆成一组动作：先收窄空间，再判断痛点是否重复、是否值得付费，最后再决定该继续深入哪个切口。',
      diagnosticColumns: [
        {
          title: '先限定一个足够窄的市场切片',
          description:
            '当市场切片已经能说清一个买家、一条工作流和一个重复痛点时，验证才更容易产生有用判断。',
        },
        {
          title: '先找“重复而且会为之付费”的痛点',
          description:
            '最强的切口通常不是最新奇的点子，而是那个与重复工作、明显后果和可信付费意愿绑得最紧的痛点。',
        },
        {
          title: '先决定下一步测试什么，而不是追求一次性证明全部',
          description:
            '好的验证不是让你产生虚假的确定感，而是帮你更快决定接下来该继续访谈、收紧切口，还是尽早放弃。',
        },
      ],
      intentEyebrow: '适用场景',
      intentTitle: '当你已经有方向，但还需要一套更可靠的验证方法时，先看这份指南。',
      intentDescription:
        '这个页面最适合已经有市场方向、用户问题或工作流主题的人。它的任务不是继续帮你发散，而是先让你学会如何判断这个方向到底值不值得继续。',
      intentColumns: [
        {
          title: '适合谁',
          description:
            '已经看到一个可能方向，但还需要一套可重复的方法来判断它是否值得进入访谈、产品定义或更深验证的人。',
        },
        {
          title: '不适合谁',
          description:
            '还没有足够方向感、仍然需要先扩展更多候选点子的人。',
        },
        {
          title: '什么时候用',
          description:
            '当你不想再凭感觉判断，而是希望在真正投入开发前，先走一套更清晰的验证顺序时使用。',
        },
      ],
      detailEyebrow: '输入与结果',
      detailTitle: '好的验证输入，应该已经说清一个买家、一条工作流，以及一个足够频繁的痛点。',
      detailDescription:
        '目标不是一次性证明整个生意，而是把一个模糊的 AI 创业方向变成更清楚的下一步：继续、收紧，还是提前放弃。',
      inputLabel: '起始方向示例',
      inputExample: [
        '一个帮助招聘顾问把面试记录整理成候选人摘要和后续动作的 AI 工作流。',
        '一个帮助独立顾问减少通话后跟进负担的产品方向。',
        '一个帮助小企业在报价发出后更快做后续跟进的 AI 切口。',
      ],
      outputLabel: '一轮有效验证应该带来的结果',
      outputExample: [
        '看清这个痛点是否足够重复，是否真的值得做成一个产品切口，而不是一项好用的小功能。',
        '判断买家与工作流是否已经清楚到足以继续访谈或做更窄的产品定义。',
        '得到更明确的下一步：继续深入、回到机会分析，或者尽早停止这个方向。',
      ],
      faqEyebrow: '常见问题',
      faqTitle: '在学习如何验证 AI 创业点子时，用户最常问什么',
      faqDescription:
        '这些问题会帮助访客理解：验证和发散有什么不同，什么叫“足够值得继续测试”，以及结构化工作流为什么更有帮助。',
      faqItems: [
        {
          question: '验证 AI 创业点子时，第一步最该验证什么？',
          answer:
            '先验证痛点是不是重复发生、是不是足够昂贵、是不是已经能被清楚地绑到一个买家和一条工作流上，然后再谈更宽的市场故事。',
        },
        {
          question: '怎么判断一个切口还是太宽了？',
          answer:
            '如果同一句产品描述可以同时适用于很多买家、很多工作流或很多不同痛点，那它通常还太宽。能不能用一句话说清楚情境，是很好的判断标准。',
        },
        {
          question: '只靠 ChatGPT 提示词能完成验证吗？',
          answer:
            '它可以帮你想到风险或反例，但很难自然形成稳定的比较框架。当你需要综合多个验证信号并留下更明确的下一步时，结构化工作流会更有帮助。',
        },
        {
          question: '什么时候该从这份指南进入产品？',
          answer:
            '当你已经有一个值得继续压力测试的方向时，就可以进入产品。指南负责教顺序，产品负责把这套顺序变成带排名、带评分、带取舍的输出。',
        },
      ],
      relatedColumns: [
        {
          title: 'SaaS 点子验证',
          description: '进入更聚焦的工作流，直接对一个候选切口做继续还是停下的判断。',
          href: '/zh/saas-idea-validation',
          actionLabel: '进入验证工作流',
        },
        {
          title: 'BadgerSignal vs ChatGPT',
          description: '先比较结构化验证和通用聊天的差异，再决定下一步该走哪条路径。',
          href: '/zh/comparisons/badgersignal-vs-chatgpt-for-startup-idea-validation',
          actionLabel: '查看对比页面',
        },
        {
          title: '招聘样例报告',
          description: '先看一份招聘公开样例，感受登录前的机会排序是否已经足够具体。',
          href: '/zh/examples/ai-tools-for-recruiters',
          actionLabel: '查看招聘样例',
        },
      ],
      closing: {
        eyebrow: '把方法用到你的方向上',
        title: '把自己的 AI 创业方向放进结构化验证流程里跑一遍。',
        description:
          '先用这份指南把思路收紧，再进入产品，用带评分、带排序和更清楚取舍的输出去判断下一步到底该做什么。',
        primaryAction: {
          label: '开始分析',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: '查看招聘样例',
          href: '/zh/examples/ai-tools-for-recruiters',
          variant: 'outline',
        },
      },
    },
    'comparisons-badgersignal-vs-chatgpt-for-startup-idea-validation': {
      heroVisualEyebrow: '对比页面',
      heroVisualTitle: '什么时候通用聊天已经够用，什么时候结构化流程更值钱',
      heroVisualRows: [
        { label: '发散速度', value: 'ChatGPT' },
        { label: '排序清晰度', value: 'BadgerSignal' },
        { label: '决策目标', value: '更清楚的下一步' },
      ],
      supportEyebrow: '为什么需要这页对比',
      supportTitle:
        'ChatGPT 很适合做粗粒度探索，但当你需要稳定比较、显式评分和更清楚的下一步决策时，创业点子验证会变得更难。',
      supportDescription:
        '这页是给正在犹豫“通用提示词够不够”的访客看的。真正的选择并不是哪一个更聪明，而是你当前的任务到底是开放式发散，还是围绕一个候选切口做结构化验证。',
      diagnosticColumns: [
        {
          title: 'ChatGPT 更擅长什么',
          description:
            '当问题还很松、你还在找角度、改表述或扩展更多方向时，通用聊天通常更快，也更适合来回试探。',
        },
        {
          title: 'BadgerSignal 更擅长什么',
          description:
            '当你需要可见评分、可重复排序，以及一套专门为了“决定下一步该继续研究什么”而设计的流程时，结构化工作流会更强。',
        },
        {
          title: '真正要做的判断是什么',
          description:
            '不是“哪个工具更厉害”，而是你当前需要的是继续发散，还是需要一套更稳定的框架去判断哪个切口值得继续。',
        },
      ],
      intentEyebrow: '适用场景',
      intentTitle: '当你正在比较通用聊天和专门验证工作流时，用这页对比来选正确路径。',
      intentDescription:
        '这页最适合已经在用 ChatGPT，但开始怀疑自己是否需要一套更稳定的验证框架的人。它帮助你根据当前任务，选择更合适的路径。',
      intentColumns: [
        {
          title: '适合谁',
          description:
            '已经会用 ChatGPT，但现在想判断 dedicated validation workflow 是否能带来更清楚决策的人。',
        },
        {
          title: '不适合谁',
          description:
            '只是想看一篇泛泛 AI 工具评测，却没有明确验证任务的人。',
        },
        {
          title: '什么时候用',
          description:
            '当你想决定是继续做松散探索，还是进入一套会排序、会评分、会帮你收窄下一步的流程时使用。',
        },
      ],
      detailEyebrow: '决策框架',
      detailTitle: '关键差别不在于输出多少，而在于它能不能帮助你比较、排序，并留下一个清楚的下一步。',
      detailDescription:
        '做第一轮发散时，通用聊天通常已经足够；一旦你开始需要围绕重复痛点、买家贴合度和是否值得继续投入来判断一个切口，结构化验证会更有价值。',
      inputLabel: '什么时候 ChatGPT 往往已经够用',
      inputExample: [
        '你只是想为一个宽泛市场找到更多角度，暂时还没准备好认真判断一个切口。',
        '你还在拓展更多创业方向，想先快速改写、追问和试探不同表达。',
        '你当前更需要即时对话，而不是稳定的排序框架。',
      ],
      outputLabel: '什么时候 BadgerSignal 更有帮助',
      outputExample: [
        '你不再想继续堆点子，而是想得到一组可排序、可比较的输出。',
        '你需要在同一套评分框架下比较多个切口，再决定哪一个值得更深验证。',
        '你希望在登录前先看公开样例，并用一套围绕下一步决策设计的流程来收窄方向。',
      ],
      faqEyebrow: '常见问题',
      faqTitle: '在比较 BadgerSignal 和 ChatGPT 时，用户最常问什么',
      faqDescription:
        '这些问题会帮助访客理解各自适合什么任务、怎么一起使用，以及为什么结构化验证往往比通用聊天更适合做下一步判断。',
      faqItems: [
        {
          question: 'ChatGPT 完全不能帮我验证创业点子吗？',
          answer:
            '不是。它可以帮你想风险、反例和不同表达。它的弱点在于，当你需要稳定地比较多个切口，或者想留下一个更明确的下一步时，它不会自然形成那套框架。',
        },
        {
          question: 'BadgerSignal 和一个写得很好的 prompt 有什么本质差别？',
          answer:
            '它会把流程锚定在一个方向上，给你更稳定的比较框架，并把输出设计成可以排序和继续推进，而不是只停留在对话式探索里。',
        },
        {
          question: '如果我用 BadgerSignal，就不该再用 ChatGPT 了吗？',
          answer:
            '不是。二者可以配合。ChatGPT 仍适合做松散探索和改写；BadgerSignal 更适合在问题开始收窄、需要结构化判断时接手。',
        },
        {
          question: '看完这页之后，最适合进入哪个页面？',
          answer:
            '如果你已经有一个候选切口，就去 SaaS 点子验证；如果切口还太松，就先回到 AI 创业点子生成器，或者先看一份公开样例。',
        },
      ],
      relatedColumns: [
        {
          title: 'SaaS 点子验证',
          description: '进入更聚焦的工作流，围绕一个候选切口做继续还是停下的判断。',
          href: '/zh/saas-idea-validation',
          actionLabel: '进入验证工作流',
        },
        {
          title: 'AI 创业点子生成器',
          description: '如果方向还太宽，就先回到更前一步，把方向展开成更多候选切口。',
          href: '/zh/ai-startup-idea-generator',
          actionLabel: '查看生成器页面',
        },
        {
          title: '招聘样例报告',
          description: '先看一份公开招聘报告，感受登录前的排序输出到底有多具体。',
          href: '/zh/examples/ai-tools-for-recruiters',
          actionLabel: '查看招聘样例',
        },
      ],
      closing: {
        eyebrow: '选对下一条流程',
        title: '当“下一步该做什么”比继续发散更重要时，进入结构化验证。',
        description:
          '如果你要的已经不再是更多 brainstorm，而是更清楚的下一步，那就进入一条会比较、会排序、会帮助你收窄方向的验证流程。',
        primaryAction: {
          label: '开始分析',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: '进入验证工作流',
          href: '/zh/saas-idea-validation',
          variant: 'outline',
        },
      },
    },
    'use-cases-ai-tools-for-recruiters': {
      heroVisualEyebrow: '招聘场景页',
      heroVisualTitle: '先看招聘工作流里那些反复发生的交接摩擦',
      heroVisualRows: [
        { label: '受众贴合度', value: '招聘顾问' },
        { label: '痛点形态', value: '重复发生' },
        { label: '切口目标', value: '运营型' },
      ],
      supportEyebrow: '为什么需要这个页面',
      supportTitle:
        '招聘场景里的 AI 机会，往往不是来自“泛化招聘助手”，而是来自那些反复发生的交接与跟进摩擦。',
      supportDescription:
        '这个页面聚焦招聘工作流里更像产品切口的地方：面试记录整理、候选人摘要、招聘顾问后续跟进，以及角色需求向内部交接时的信息摩擦。真正更容易卖出去的，通常是这些更窄、更重复、也更容易解释 ROI 的流程切口。',
      diagnosticColumns: [
        {
          title: '面试记录始终很乱',
          description:
            '招聘顾问要处理大量对话，但从记录到候选人摘要的交接仍然偏手工、质量不稳，而且经常受时间压力影响。',
        },
        {
          title: '一忙起来，跟进质量就会下滑',
          description:
            '当招聘量上来时，最好的候选人反而更容易在后续动作、回顾质量和内部交接里被拖慢甚至流失。',
        },
        {
          title: '最强的切口通常是运营型切口',
          description:
            '比起宽泛的“招聘 copilot”，更可信的 AI 工具通常是那些能减少候选人流动过程里行政拖拽的窄工作流。',
        },
      ],
      intentEyebrow: '适用场景',
      intentTitle: '当你想找的是扎根在招聘重复工作流痛点里的 AI 产品切口时，用这个页面。',
      intentDescription:
        '这个页面最适合已经知道招聘场景，但还缺少更清晰产品切口的人。它不是一篇泛泛的 HR AI 综述，而是帮你沿着招聘顾问的具体工作流去找更可信的产品机会。',
      intentColumns: [
        {
          title: '适合谁',
          description:
            '正在探索面试记录整理、候选人摘要、招聘顾问后续跟进等工作流的人，以及想更快看清哪个切口更值得做的人。',
        },
        {
          title: '不适合谁',
          description:
            '只想看一篇泛泛“AI 招聘工具大全”，或者想做完整 HR 平台综述的人。',
        },
        {
          title: '什么时候用',
          description:
            '当你想判断招聘工作流里的某个重复摩擦，是否足够强、足够窄，也足够值得做成产品时使用。',
        },
      ],
      detailEyebrow: '输入输出样例',
      detailTitle: '最有价值的招聘输入，应该从一个明确的瓶颈开始，而不是一次性覆盖整个招聘栈。',
      detailDescription:
        '当一个工作流已经足够窄时，更容易比较不同切口在运营紧迫度、跟进风险和采用难度上的差别，也更容易判断哪一个值得先验证。',
      inputLabel: '招聘方向示例',
      inputExample: [
        '一个把面试记录整理成候选人摘要和后续动作的工作流。',
        '一个帮助招聘顾问在初筛后更快生成回顾和跟进草稿的产品方向。',
        '一个把职位 brief 更快转成内部可交接候选人叙述的 AI 切口。',
      ],
      outputLabel: '更强的招聘切口应该揭示什么',
      outputExample: [
        '看清哪个招聘痛点重复得足够频繁，值得成为真正的产品切口，而不是一个顺手功能。',
        '理解这个切口是否真的在候选人流动过程中节省时间，而不是只是在做泛化写作辅助。',
        '得到更明确的下一步：继续验证最强切口，或退回更宽的机会分析重新排序。',
      ],
      faqEyebrow: '常见问题',
      faqTitle: '在探索招聘顾问 AI 工具机会时，用户最常问什么',
      faqDescription:
        '这些问题会解释为什么运营型切口往往比泛化招聘助手更强，以及如何从招聘工作流痛点进入产品验证。',
      faqItems: [
        {
          question: '为什么要聚焦招聘工作流痛点，而不是直接做一个泛化招聘助手？',
          answer:
            '因为宽泛分类通常掩盖了真正的购买信号。像面试记录整理、候选人摘要和后续跟进这样的窄流程，更容易解释、试点和收钱。',
        },
        {
          question: '为什么“招聘跟进”会是一个强切口？',
          answer:
            '它反复发生、时间压力明显，而且直接影响候选人流动速度。这种组合让 ROI 比泛化辅助更容易讲清楚。',
        },
        {
          question: '如果我做的是别的招聘场景，这页还有参考价值吗？',
          answer:
            '有。把它当成工作流镜头来用。如果你的场景也存在“对话 -> 摘要 -> 下一步动作”的行政拖拽，这套判断逻辑依然适用。',
        },
        {
          question: '找到一个有希望的招聘切口后，下一步该做什么？',
          answer:
            '把最强的那个切口带去做结构化验证，或者先对照一份公开招聘样例报告，看产品表述是否已经足够具体。',
        },
      ],
      relatedColumns: [
        {
          title: '招聘样例报告',
          description: '先看一份公开招聘报告，感受招聘工作流切口是如何被排序的。',
          href: '/zh/examples/ai-tools-for-recruiters',
          actionLabel: '查看招聘样例',
        },
        {
          title: 'SaaS 点子验证',
          description: '把一个更有希望的招聘切口带入更聚焦的验证工作流。',
          href: '/zh/saas-idea-validation',
          actionLabel: '进入验证工作流',
        },
        {
          title: '验证指南',
          description: '先走一遍更实用的验证顺序，再判断这个切口到底值不值得做。',
          href: '/zh/guides/how-to-validate-an-ai-startup-idea',
          actionLabel: '查看验证指南',
        },
      ],
      closing: {
        eyebrow: '试一条招聘方向',
        title: '先验证一个更窄的招聘工作流，而不是直接去做一个泛化招聘 copilot。',
        description:
          '先从一个重复、运营型、时间压力明显的招聘切口开始，再判断这个买家、工作流和痛点是否足够强，值得继续推进。',
        primaryAction: {
          label: '开始分析',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: '查看招聘样例',
          href: '/zh/examples/ai-tools-for-recruiters',
          variant: 'outline',
        },
      },
    },
    'guides-how-to-prioritize-ai-business-opportunities': {
      heroVisualEyebrow: '排序指南',
      heroVisualTitle: '先把最值得推进的 AI 切口排出来',
      heroVisualRows: [
        { label: '市场框架', value: '已限定' },
        { label: '决策镜头', value: '优先级优先' },
        { label: '下一步', value: '可继续验证' },
      ],
      supportEyebrow: '为什么需要这份指南',
      supportTitle:
        '很多团队不是缺方向，而是同时看到太多看起来都像样的 AI 切口，结果谁都没真正推进。',
      supportDescription:
        '这份指南适合“已经有几个候选方向，但还不知道哪一个最值得继续”的阶段。它把优先级判断变成一套可见顺序，而不是继续靠感觉做决定。',
      diagnosticColumns: [
        {
          title: '先限定在同一个市场切片里比较',
          description:
            '只有当候选切口都属于同一个买家、同一类工作流或同一个运营场景时，优先级比较才更有意义。',
        },
        {
          title: '先比较重复痛点，再比较新奇程度',
          description:
            '最值得先做的切口，往往不是最像未来概念的那个，而是那个绑定了重复运营痛点、又更容易讲清价值的方向。',
        },
        {
          title: '先排出顺序，再决定把人工研究花在哪里',
          description:
            '一轮轻量排序能帮你判断：更深的访谈、调研和产品时间，应该先花在谁身上，而不是同时分散在所有方向上。',
        },
      ],
      intentEyebrow: '适用场景',
      intentTitle: '当你已经看到几个可能的 AI 切口，但还需要更干净的优先级顺序时，先看这份指南。',
      intentDescription:
        '这个页面适合已经不再问“能做什么”，而是在问“这几个方向里，哪一个最值得现在继续”的团队、创始人和运营者。',
      intentColumns: [
        {
          title: '适合谁',
          description:
            '正在同一个市场、同一类工作流或同一买家场景里比较多个候选切口，并希望在更深调研前先排出顺序的人。',
        },
        {
          title: '不适合谁',
          description:
            '还需要继续扩展更多创业点子，或者已经有一个非常明确的切口只差直接验证的人。',
        },
        {
          title: '什么时候用',
          description:
            '当你需要在访谈、人工调研和产品定义之前，先更清楚地决定下一步最该押哪一个机会时使用。',
        },
      ],
      detailEyebrow: '输入与结果',
      detailTitle: '好的优先级输入，应该是在同一个运营框架里比较多个切口，而不是跨完全不同的市场乱比。',
      detailDescription:
        '目标不是一次把所有机会算得很精细，而是先比较紧迫度、付费意愿和实现拖拽，让一个切口更明确地赢得下一步。',
      inputLabel: '起始比较示例',
      inputExample: [
        '在中小企业运营里比较：报价跟进、询盘到排期协调、回款提醒这三个工作流。',
        '在代理公司交付里比较：客户反馈整理、会议 recap 到项目更新、交付 QA 支持这三个切口。',
        '在招聘运营里比较：记录整理、招聘跟进、职位 brief 交接这几个工作流。',
      ],
      outputLabel: '一轮有效排序应该带来的结果',
      outputExample: [
        '看清哪个切口最同时满足重复痛点、短价值路径和可信付费故事。',
        '明确谁值得更深访谈或验证，谁应该暂时往后放。',
        '理解为什么某个机会比另一个机会更值得优先推进，而不是只凭直觉选一个。',
      ],
      faqEyebrow: '常见问题',
      faqTitle: '在给 AI 商业机会排优先级时，用户最常问什么',
      faqDescription:
        '这些问题会解释怎样给多个候选切口排序、早期应该看哪些信号，以及为什么排序应该先于重度调研。',
      faqItems: [
        {
          question: '给 AI 商业机会排优先级，最快的方式是什么？',
          answer:
            '先限定一个市场切片，再比较重复痛点和紧迫度，然后判断最强切口是否也具备可信的付费意愿和落地路径。',
        },
        {
          question: '我应该按新奇程度或技术炫酷程度排序吗？',
          answer:
            '通常不应该。早期排序更适合优先看重复痛点、运营紧迫度和采用逻辑，而不是看底层 AI 听起来有多酷。',
        },
        {
          question: '什么时候应该做更深的人工调研，而不是只做这种排序？',
          answer:
            '当你已经知道哪个切口最值得继续时，人工调研会更有价值。这份指南的作用，就是先帮你决定更深调研应该投向哪里。',
        },
        {
          question: '看完这份指南之后，最适合进入哪个页面？',
          answer:
            '把最强切口带去做 AI 商业机会分析，或者先看一份公开样例报告；等排序更稳定以后，再进入更聚焦的验证流程。',
        },
      ],
      relatedColumns: [
        {
          title: 'AI 商业机会分析',
          description: '把最强的市场切片带入更适合在宽空间里排优先级的分析工作流。',
          href: '/zh/ai-business-opportunity-analysis',
          actionLabel: '进入分析工作流',
        },
        {
          title: 'BadgerSignal vs 人工调研',
          description: '先比较结构化机会分析和人工市场调研，再决定下一步要投入多少人力研究。',
          href: '/zh/comparisons/badgersignal-vs-manual-market-research',
          actionLabel: '查看对比页面',
        },
        {
          title: '代理公司样例报告',
          description: '看一份围绕交付摩擦和返工成本的公开样例，感受优先级判断如何落到真实场景里。',
          href: '/zh/examples/ai-tools-for-agencies',
          actionLabel: '查看代理公司样例',
        },
      ],
      closing: {
        eyebrow: '给你自己的机会空间排顺序',
        title: '先排出最值得推进的那个 AI 切口。',
        description:
          '在把更深的调研和产品时间投到错误机会之前，先走一遍更清晰的排序顺序。你可以直接分析自己的市场，或先看公开样例。',
        primaryAction: {
          label: '开始分析',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: '查看代理公司样例',
          href: '/zh/examples/ai-tools-for-agencies',
          variant: 'outline',
        },
      },
    },
    'comparisons-badgersignal-vs-manual-market-research': {
      heroVisualEyebrow: '对比页面',
      heroVisualTitle: '什么时候结构化 AI 分析已经够用，什么时候人工调研仍然更强',
      heroVisualRows: [
        { label: '首轮 shortlist 速度', value: 'BadgerSignal' },
        { label: '深度定制 nuance', value: '人工调研' },
        { label: '更优顺序', value: '先 AI 后人工' },
      ],
      supportEyebrow: '为什么需要这页对比',
      supportTitle:
        '人工市场调研当然仍然重要，但不是每个机会收窄阶段都值得一开始就投入同样重的人力。',
      supportDescription:
        '这页适合那些正在判断：现在是不是应该继续手工调研全部方向，还是先用结构化工作流把一个市场方向压成更清晰的 shortlist。真正重要的通常不是二选一，而是顺序。',
      diagnosticColumns: [
        {
          title: '人工调研更擅长什么',
          description:
            '当场域已经很窄、赌注很高，而且你需要访谈、内部上下文或复杂市场信号带来的细节时，人工调研会更强。',
        },
        {
          title: 'BadgerSignal 更擅长什么',
          description:
            '当你还需要快速比较几个切口，并且想先得到一套可见排序框架，再决定哪些方向值得更深研究时，BadgerSignal 会更强。',
        },
        {
          title: '更合理的顺序是什么',
          description:
            '先用结构化 AI 分析收窄值得关注的 shortlist，再把人工调研真正花在排名最高的那个切口上，而不是平均分给每个候选方向。',
        },
      ],
      intentEyebrow: '适用场景',
      intentTitle: '当你在决定“先继续人工调研，还是先把市场收窄成 shortlist”时，用这页来选顺序。',
      intentDescription:
        '这个页面适合已经知道自己在看哪个市场，但还没决定下一步是不是要立刻做更深人工研究的人。它帮助你判断，什么时候该先把方向排出来。',
      intentColumns: [
        {
          title: '适合谁',
          description:
            '正在决定下一阶段调研应该投入多少精力、以及应该先投向哪个切口的创始人、运营者和顾问。',
        },
        {
          title: '不适合谁',
          description:
            '只想看一篇泛泛“市场调研是什么”的介绍，却没有实际排序或切口选择任务的人。',
        },
        {
          title: '什么时候用',
          description:
            '当你已经有一个市场切片，但还在判断：是现在继续手工深挖，还是先用结构化排序把 shortlist 压出来时使用。',
        },
      ],
      detailEyebrow: '决策框架',
      detailTitle: '关键问题不是 AI 会不会取代人工调研，而是你有没有先把方向收窄到足以值得更深人工投入。',
      detailDescription:
        '如果你仍然在同一个市场里对比多个可信切口，结构化排序通常更省时间；如果已经有一个切口明显领先，而且赌注开始升高，人工调研的重要性就会更高。',
      inputLabel: '什么时候人工调研通常更强',
      inputExample: [
        '你已经把市场收窄到一个切口，现在更需要访谈和领域语境带来的细节。',
        '这个机会的赌注已经足够高，不能只靠一份排序 shortlist 就做决定。',
        '最关键的信号藏在对话、文档和复杂上下文里，只有人工研究能真正挖出来。',
      ],
      outputLabel: '什么时候 BadgerSignal 通常更强',
      outputExample: [
        '你还需要在一个市场里更快排出 shortlist，再决定哪些方向值得更深访谈。',
        '你想用统一框架比较多个切口在紧迫度、付费意愿和实现拖拽上的差别。',
        '你还很早，如果现在就对每个方向都做人工研究，只会让推进速度变慢。',
      ],
      faqEyebrow: '常见问题',
      faqTitle: '在比较 BadgerSignal 和人工市场调研时，用户最常问什么',
      faqDescription:
        '这些问题会解释人工调研仍然最擅长什么、结构化 AI 分析省的是什么时间，以及两者怎么配合。',
      faqItems: [
        {
          question: '这是不是意味着人工市场调研已经过时了？',
          answer:
            '不是。人工调研在需要更深买家细节、真实语言和更高置信度证据时仍然非常重要。重点是：先用它在最值得深入的方向上，而不是一开始平均铺给所有候选切口。',
        },
        {
          question: 'BadgerSignal 在更早阶段能帮我做什么？',
          answer:
            '它能把一个市场方向更快压成一组可见排序 shortlist，帮助你决定哪一个切口更值得进入访谈、电话或更重的人力调研。',
        },
        {
          question: '我应该把两种方式结合起来用吗？',
          answer:
            '通常应该。结构化 AI 分析适合先压缩 shortlist，人工调研再去压力测试排名最高的那个切口，这样顺序通常更高效。',
        },
        {
          question: '看完这页之后，最适合进入哪个页面？',
          answer:
            '如果你还需要在一个市场里排多个切口，就进入 AI 商业机会分析；如果已经有了更强 shortlist，就去看公开样例或更聚焦的验证流程。',
        },
      ],
      relatedColumns: [
        {
          title: 'AI 商业机会分析',
          description: '当你还需要在同一个市场里排多个切口时，进入更适合做结构化排序的分析工作流。',
          href: '/zh/ai-business-opportunity-analysis',
          actionLabel: '进入分析工作流',
        },
        {
          title: '排序指南',
          description: '先看一遍如何比较重复痛点、紧迫度和付费意愿，再决定哪些方向值得更深研究。',
          href: '/zh/guides/how-to-prioritize-ai-business-opportunities',
          actionLabel: '查看排序指南',
        },
        {
          title: '代理公司样例报告',
          description: '先看一份公开代理公司样例，感受在更深访谈前，排序型输出到底有多具体。',
          href: '/zh/examples/ai-tools-for-agencies',
          actionLabel: '查看代理公司样例',
        },
      ],
      closing: {
        eyebrow: '选对调研顺序',
        title: '先收窄 shortlist，再把更深的人力研究投到真正值得的方向上。',
        description:
          '当你还需要更清晰的 shortlist 时，先用结构化机会分析；当一个切口真正跑出来以后，再把人工调研投进去。',
        primaryAction: {
          label: '开始分析',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: '进入分析工作流',
          href: '/zh/ai-business-opportunity-analysis',
          variant: 'outline',
        },
      },
    },
    'use-cases-ai-tools-for-agencies': {
      heroVisualEyebrow: '代理公司场景页',
      heroVisualTitle: '先看那些反复吃掉交付利润的代理公司工作流摩擦',
      heroVisualRows: [
        { label: '受众贴合度', value: '代理公司' },
        { label: '痛点形态', value: '利润拖拽' },
        { label: '切口目标', value: '交付清晰度' },
      ],
      supportEyebrow: '为什么需要这个页面',
      supportTitle:
        '最可信的代理公司 AI 工具，往往不是宽泛的“给代理公司做 AI 平台”，而是那些能减少反复交付摩擦和返工成本的窄切口。',
      supportDescription:
        '这个页面聚焦代理公司最容易反复发生运营拖拽的地方：客户反馈整理、会议 recap 漂移、项目交接清理，以及交付 QA。真正更容易解释、试点和捍卫的，通常就是这些更靠近交付过程的工作流切口。',
      diagnosticColumns: [
        {
          title: '客户反馈循环会持续吃掉利润',
          description:
            '当模糊反馈需要被人工翻译成明确 action items，并在多个项目和多个 stakeholder 之间反复流转时，代理公司的返工成本会不断放大。',
        },
        {
          title: '会议 recap 漂移会让项目对齐失真',
          description:
            '会议、通话和异步更新会留下很多零散决定，而这些决定仍然需要被转成项目状态更新、负责人分配和下一步动作。',
        },
        {
          title: '最强的切口通常都贴着交付流程',
          description:
            '比起宽泛的“代理公司智能助手”，更可信的产品切口通常是那些直接减少服务交付运营拖拽的工作流。',
        },
      ],
      intentEyebrow: '适用场景',
      intentTitle: '当你想找的是扎根在交付摩擦和返工成本里的代理公司 AI 切口时，用这个页面。',
      intentDescription:
        '这个页面适合已经理解代理公司工作方式，但还缺少更窄、更可信 AI 产品切口的人。它不想讲泛化趋势，而是沿着交付流程里的具体摩擦去找更适合先验证的方向。',
      intentColumns: [
        {
          title: '适合谁',
          description:
            '正在探索客户反馈整理、项目 recap、交付 QA 等工作流切口，并想更快判断哪个方向最值得推进的人。',
        },
        {
          title: '不适合谁',
          description:
            '只想看一篇泛泛“代理公司 AI 趋势”，却没有具体工作流或利润问题要解决的人。',
        },
        {
          title: '什么时候用',
          description:
            '当你想判断某个代理公司重复摩擦，是否足够强、足够窄，也足够值得做成一个独立产品切口时使用。',
        },
      ],
      detailEyebrow: '输入输出样例',
      detailTitle: '最有价值的代理公司输入，应该从一个具体交付瓶颈开始，而不是一上来试图覆盖整个代理公司栈。',
      detailDescription:
        '当一个问题已经足够贴近交付流程时，更容易比较不同切口在协调成本、返工风险和采用逻辑上的差别，也更容易判断哪个切口最值得先验证。',
      inputLabel: '代理公司方向示例',
      inputExample: [
        '一个把客户反馈整理成 scoped project action items 和负责人分配的工作流。',
        '一个把通话 recap 和会议决定更快转成项目更新的产品方向。',
        '一个围绕 recurring deliverable QA 的 AI 切口，在交付前减少遗漏和返工。',
      ],
      outputLabel: '更强的代理公司切口应该揭示什么',
      outputExample: [
        '看清哪个交付摩擦重复得足够频繁，值得成为真正的软件切口，而不是内部流程小工具。',
        '理解这个产品是否真的减少了返工和协调拖拽，而不是只做泛化写作或摘要辅助。',
        '得到更明确的下一步：继续验证最强切口，或退回更宽的机会分析重新排序。',
      ],
      faqEyebrow: '常见问题',
      faqTitle: '在探索代理公司 AI 工具机会时，用户最常问什么',
      faqDescription:
        '这些问题会解释为什么交付型切口往往更强，以及如何从工作流摩擦进入真正的产品验证。',
      faqItems: [
        {
          question: '为什么要聚焦交付摩擦，而不是宽泛的代理公司 AI 分类？',
          answer:
            '因为宽泛分类通常掩盖了真正的购买痛点。像反馈整理、recap 漂移和 QA 交接这样的窄工作流，更容易解释、试点和收钱。',
        },
        {
          question: '为什么“客户反馈整理”会是一个强切口？',
          answer:
            '它反复发生，直接影响返工成本，而且本身就是结构化文本很多的工作流，AI 更容易快速展示价值。',
        },
        {
          question: '如果我服务的是别的服务团队，这页还有参考价值吗？',
          answer:
            '有。把它当成工作流镜头来用。如果你的团队也在对话、反馈和项目动作之间不断丢失对齐，这套判断逻辑依然有参考意义。',
        },
        {
          question: '找到一个有希望的代理公司切口后，下一步该做什么？',
          answer:
            '把最强切口带去做机会分析，或者先和一份公开代理公司样例报告对照，看产品表述是否已经足够具体。',
        },
      ],
      relatedColumns: [
        {
          title: '代理公司样例报告',
          description: '先看一份公开代理公司报告，感受交付工作流切口是如何被排序的。',
          href: '/zh/examples/ai-tools-for-agencies',
          actionLabel: '查看代理公司样例',
        },
        {
          title: 'AI 商业机会分析',
          description: '把一个更有希望的代理公司切口带入更适合做机会排序的分析工作流。',
          href: '/zh/ai-business-opportunity-analysis',
          actionLabel: '进入分析工作流',
        },
        {
          title: '排序指南',
          description: '先看一遍更实用的排序顺序，再决定哪个交付痛点最值得赢下下一步。',
          href: '/zh/guides/how-to-prioritize-ai-business-opportunities',
          actionLabel: '查看排序指南',
        },
      ],
      closing: {
        eyebrow: '试一条代理公司方向',
        title: '先验证一个更窄的代理公司交付工作流，而不是直接做一个泛化服务 copilot。',
        description:
          '先从一个重复、利润敏感、又贴着交付流程的切口开始，再判断这个买家、工作流和返工压力是否足够强，值得继续推进。',
        primaryAction: {
          label: '开始分析',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: '查看代理公司样例',
          href: '/zh/examples/ai-tools-for-agencies',
          variant: 'outline',
        },
      },
    },
  },
  ...EURO_CORE_PAGE_OVERRIDES,
}

const EXAMPLE_PAGE_OVERRIDES: Partial<Record<
  SeoLocale,
  Partial<Record<ExamplePageKey, ExamplePageOverride>>
>> = {
  en: {
    'examples-ai-tools-for-freelancers': {
      primaryAction: {
        label: 'Run your own analysis',
        href: '/tools/product-insight',
      },
      secondaryAction: {
        label: 'Back to homepage',
        href: '/en',
        variant: 'outline',
      },
      heroVisualEyebrow: 'Public sample report',
      heroVisualTitle: 'Freelancer workflows, ranked by practical product signal',
      heroVisualSteps: ['Freelancer context', 'Top opportunity wedges', 'Recommended next validation move'],
      supportEyebrow: 'Scenario brief',
      supportTitle: 'AI tools for freelancers: a public sample report built around admin-heavy client work.',
      supportDescription:
        'This sample report looks at where freelancers lose the most time between client conversations and billable delivery. It frames the market slice, the core workflow pain, and the first wedge worth testing before you read the rankings.',
      supportSnapshots: [
        {
          label: 'Market slice',
          value: 'Solo consultants and freelance operators',
          description:
            'People who juggle client calls, scoping, follow-up, and delivery without an internal operations team.',
        },
        {
          label: 'Core pain',
          value: 'Admin work steals billable time',
          description:
            'The strongest opportunities appear where freelancers repeatedly translate calls, notes, and revisions into follow-up actions.',
        },
        {
          label: 'Best first wedge',
          value: 'Post-call brief to action-plan assistant',
          description:
            'The sample suggests that summarizing messy client context into clear next steps is the most promising starting wedge.',
        },
      ],
      opportunityEyebrow: 'Ranked opportunities',
      opportunityTitle: 'The strongest first wedge is post-call operational cleanup, not generic AI assistance.',
      opportunityDescription:
        'These rankings prioritize repeated pain, ease of explaining ROI, and how quickly a freelancer can decide whether the product saves real working hours.',
      opportunityItems: [
        {
          rank: 'Rank 01',
          title: 'Client debrief to action-plan assistant',
          score: '8.9/10',
          description:
            'Turn raw client call notes, voice transcripts, and scattered to-dos into a structured debrief with next actions, deadlines, and follow-up messages.',
          audience: 'Independent consultants, strategists, and operators handling multiple active clients.',
          whyNow:
            'LLMs are now good enough at extracting actions from messy conversational input, which makes the time-saved value immediately visible.',
          nextMove:
            'Validate whether freelancers would trust AI-generated follow-up drafts if every action links back to source notes.',
          highlights: [
            'Clear revenue tie-in because it protects billable hours.',
            'Repeated weekly workflow, not a one-off novelty action.',
            'Strong expansion path into proposal prep and project handoff.',
          ],
        },
        {
          rank: 'Rank 02',
          title: 'Proposal and scope-risk reviewer',
          score: '8.3/10',
          description:
            'Review draft proposals, scope language, and client requests to flag under-scoping, ambiguous deliverables, and likely revision traps before a freelancer sends the quote.',
          audience: 'Freelancers with custom proposals, custom retainers, or high variance in project scope.',
          whyNow:
            'A large amount of freelancer pain happens before work even starts, especially when poor scoping creates weeks of unpaid revision pressure.',
          nextMove:
            'Test whether a pre-send scope review feels more valuable than another generic “proposal writer” product.',
          highlights: [
            'Directly reduces the hidden cost of bad-fit projects.',
            'Positioning is sharper than generic writing assistance.',
            'Works best in niches where project ambiguity is common.',
          ],
        },
        {
          rank: 'Rank 03',
          title: 'Deliverable handoff and revision copilot',
          score: '7.8/10',
          description:
            'Package deliverables, explain decisions, surface open questions, and organize revision cycles so the freelancer spends less time managing back-and-forth after the work is “done.”',
          audience: 'Designers, marketers, and content freelancers who manage iterative review loops.',
          whyNow:
            'Revision fatigue is frequent, but the workflow can become fragmented across email, docs, and messaging tools, which lowers product simplicity.',
          nextMove:
            'Validate whether the handoff layer alone is valuable enough, or whether it needs to bundle with the stronger post-call workflow.',
          highlights: [
            'Good retention potential if the tool becomes part of delivery operations.',
            'Pain is real, but workflow fragmentation makes adoption harder.',
            'May be stronger as a second wedge after proving a simpler admin entry point.',
          ],
        },
      ],
      detailEyebrow: 'Why these opportunities scored well',
      detailTitle: 'These scores favor wedges with fast payback, repeated usage, and low setup friction.',
      detailDescription:
        'The top-ranked ideas are not just painful. They also fit how freelancers buy software: a narrow job to be done, an obvious time-saving story, and a workflow simple enough to adopt without extra ops overhead.',
      diagnosticColumns: [
        {
          title: 'Why freelancers buy',
          description:
            'They do not want another generic assistant. They want less admin drag, faster follow-up, and fewer dropped details between calls and delivery.',
        },
        {
          title: 'What keeps scores from being higher',
          description:
            'Freelancer workflows are fragmented. Products that require too much setup or too many integrations risk being abandoned, even if the pain is real.',
        },
        {
          title: 'Recommended next move',
          description:
            'Validate the top wedge with 5-10 freelancers who already lose time in post-call follow-up, and position the product as billable-time recovery rather than generic AI productivity.',
        },
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Questions people ask when reading this freelancer sample report',
      faqDescription:
        'These answers explain what this sample proves, why the top wedge scored highest, and how to use the report before running your own analysis.',
      faqItems: [
        {
          question: 'What is this freelancer sample report trying to prove?',
          answer:
            'It shows how the product turns a messy freelancer workflow into ranked opportunity wedges, so you can judge whether the output is specific enough before trying your own market.',
        },
        {
          question: 'Why did the post-call workflow rank above broader “AI for freelancers” ideas?',
          answer:
            'Because it combines repeated pain, obvious time-saved ROI, and a narrow enough workflow that a freelancer can adopt without setting up a larger operations stack.',
        },
        {
          question: 'How should I use this report if I serve a different audience?',
          answer:
            'Use it as a reference point. If the ranking style and reasoning look useful, run your own audience and workflow through the product to see whether a different wedge scores higher.',
        },
      ],
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Return to the public hub to compare the rest of the product journeys in one place.',
          href: '/en',
          actionLabel: 'Back to homepage',
        },
        {
          title: 'Validation guide',
          description: 'Read the practical sequence for deciding whether one AI startup wedge deserves deeper work.',
          href: '/en/guides/how-to-validate-an-ai-startup-idea',
          actionLabel: 'Open validation guide',
        },
        {
          title: 'Recruiter sample report',
          description: 'Compare this freelancer sample with a recruiter workflow report to see how vertical-specific wedges differ.',
          href: '/en/examples/ai-tools-for-recruiters',
          actionLabel: 'View recruiter sample',
        },
        {
          title: 'Consultant use case',
          description:
            'See how the same ranking logic changes when the buyer is a client-facing solo consultant rather than a broader freelancer mix.',
          href: '/en/use-cases/ai-tools-for-consultants',
          actionLabel: 'View consultant use case',
        },
      ],
      closing: {
        eyebrow: 'Run your own analysis',
        title: 'Compare your own market slice against the sample.',
        description:
          'Use this public sample as a reference point, then analyze your own direction to see whether a different audience, workflow, or pain pattern produces a stronger opportunity map.',
        primaryAction: {
          label: 'Start Analysis',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'Back to homepage',
          href: '/en',
          variant: 'outline',
        },
      },
    },
    'examples-ai-tools-for-small-business': {
      primaryAction: {
        label: 'Run your own analysis',
        href: '/tools/product-insight',
      },
      secondaryAction: {
        label: 'Back to homepage',
        href: '/en',
        variant: 'outline',
      },
      heroVisualEyebrow: 'Public sample report',
      heroVisualTitle: 'Small-business workflows, ranked by practical revenue signal',
      heroVisualSteps: ['Business context', 'Top workflow wedges', 'Recommended next validation move'],
      supportEyebrow: 'Scenario brief',
      supportTitle: 'AI tools for small business: a public sample report built around owner-led service operations.',
      supportDescription:
        'This sample report focuses on the places where small businesses lose momentum between inquiry, quote, schedule, and payment. It sets up the operating context, the main revenue leak, and the most plausible first wedge before the ranked opportunities begin.',
      supportSnapshots: [
        {
          label: 'Market slice',
          value: 'Owner-led service businesses with lean teams',
          description:
            'Businesses with 2 to 20 people that still rely on the owner or a small admin team to coordinate leads, quotes, scheduling, and customer follow-up.',
        },
        {
          label: 'Core pain',
          value: 'Revenue leaks between inquiry and payment',
          description:
            'The most valuable wedges sit in the handoff gaps where no one has enough time to follow up, confirm details, or chase stalled work.',
        },
        {
          label: 'Best first wedge',
          value: 'Estimate follow-up and no-response recovery assistant',
          description:
            'The strongest starting wedge is the workflow that turns sent quotes and quiet prospects into clear next actions before the lead goes cold.',
        },
      ],
      opportunityEyebrow: 'Ranked opportunities',
      opportunityTitle: 'The strongest small-business wedge is not generic automation, but revenue recovery around follow-up.',
      opportunityDescription:
        'These rankings prioritize near-term ROI, operational simplicity, and whether the owner can feel the value quickly without adding another heavy system.',
      opportunityItems: [
        {
          rank: 'Rank 01',
          title: 'Estimate follow-up and no-response recovery assistant',
          score: '8.8/10',
          description:
            'Track sent estimates, detect stalled prospects, draft contextual follow-ups, and surface which leads need an owner call before the opportunity quietly dies.',
          audience: 'Owner-led home services, agencies, and local operators who send custom quotes and lose deals to slow follow-up.',
          whyNow:
            'Many small businesses already capture inquiries, but the follow-up after quoting is still manual, inconsistent, and tied directly to lost revenue.',
          nextMove:
            'Validate whether owners trust an assistant that recommends the next follow-up step and highlights at-risk quotes before building a full CRM layer.',
          highlights: [
            'Very clear ROI story because it focuses on recovered revenue.',
            'Fits current behavior instead of forcing a brand-new workflow.',
            'Strong expansion path into quote analytics and sales coaching.',
          ],
        },
        {
          rank: 'Rank 02',
          title: 'Inbox-to-schedule coordination assistant',
          score: '8.1/10',
          description:
            'Turn scattered calls, form fills, emails, and text messages into a clean scheduling queue with missing details flagged and the next booking step made obvious.',
          audience: 'Clinics, studios, contractors, and small teams that still coordinate appointments or site visits across multiple channels.',
          whyNow:
            'The scheduling pain is immediate and repeated, but many teams are too small to justify complex ops software or a full-time coordinator.',
          nextMove:
            'Test whether small businesses care more about triaging incomplete inquiries than about yet another calendar integration.',
          highlights: [
            'High frequency operational pain with easy day-one visibility.',
            'Works well where missed calls and partial inquiries are common.',
            'Needs a narrow first scope to avoid becoming bloated scheduling software.',
          ],
        },
        {
          rank: 'Rank 03',
          title: 'Invoice chase and payment-status copilot',
          score: '7.6/10',
          description:
            'Monitor unpaid invoices, prepare tactful reminder sequences, summarize customer payment status, and prompt the team before overdue cash flow becomes a bigger problem.',
          audience: 'Small businesses that deliver work before payment and rely on manual reminders to keep cash moving.',
          whyNow:
            'Cash-flow pain is serious, but the emotional and financial sensitivity around collections means trust and tone matter more than pure automation.',
          nextMove:
            'Validate whether owners want a payment-follow-up copilot that drafts reminders and flags risk, or whether they only want reporting and prioritization first.',
          highlights: [
            'Pain is acute because delayed payment immediately affects operations.',
            'Trust and brand tone make implementation more delicate.',
            'Likely stronger after winning with a less sensitive front-office wedge.',
          ],
        },
      ],
      detailEyebrow: 'Why these opportunities scored well',
      detailTitle: 'These scores reward wedges with visible ROI, light rollout cost, and owner-level urgency.',
      detailDescription:
        'The strongest ideas here are not just operationally painful. They also match how small businesses adopt tools: quick to explain, easy to pilot, and valuable before a team is asked to change its whole operating system.',
      diagnosticColumns: [
        {
          title: 'Why small businesses buy',
          description:
            'Owners buy when a product helps them recover revenue, reduce follow-up chaos, or free up a trusted operator without a long setup project.',
        },
        {
          title: 'What keeps scores from being higher',
          description:
            'Small businesses are budget sensitive and tool-fatigued. Anything that feels like a full platform migration will struggle, even if the pain is real.',
        },
        {
          title: 'Recommended next move',
          description:
            'Interview 5 to 10 owner-led businesses that already lose momentum after sending quotes, and position the first wedge as revenue recovery rather than “AI automation.”',
        },
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Questions people ask when reading this small-business sample report',
      faqDescription:
        'These answers explain what the sample demonstrates, why the follow-up wedge scored highest, and how to use the report before testing your own market.',
      faqItems: [
        {
          question: 'What does this small-business sample report demonstrate?',
          answer:
            'It shows how the product ranks operational wedges inside an owner-led business, so visitors can judge whether the opportunity map feels concrete before running their own analysis.',
        },
        {
          question: 'Why did quote follow-up outrank broader automation ideas?',
          answer:
            'Because the ROI is easier to explain, the pain is tied directly to lost revenue, and the workflow is light enough to adopt without forcing a full platform migration.',
        },
        {
          question: 'How should I use this sample if my business type is different?',
          answer:
            'Treat it as a pattern, not a prescription. If the ranking logic looks helpful, run your own workflow and buyer shape to see whether a different wedge becomes the best first move.',
        },
      ],
      relatedColumns: [
        {
          title: 'AI business opportunity analysis',
          description: 'Inspect the workflow that ranks multiple wedges inside a broader market before deeper validation.',
          href: '/en/ai-business-opportunity-analysis',
          actionLabel: 'View analysis page',
        },
        {
          title: 'Prioritization guide',
          description: 'See how to compare urgency, willingness to pay, and complexity before deciding which workflow deserves the next move.',
          href: '/en/guides/how-to-prioritize-ai-business-opportunities',
          actionLabel: 'Open prioritization guide',
        },
        {
          title: 'Agency sample report',
          description: 'Compare this owner-led operations sample with a delivery-focused agency report to see how adjacent service wedges differ.',
          href: '/en/examples/ai-tools-for-agencies',
          actionLabel: 'View agency sample',
        },
        {
          title: 'Customer support operations sample report',
          description:
            'Compare this owner-led sample with a queue-heavy support operations report built around triage, escalation handling, and follow-up recovery.',
          href: '/en/examples/ai-tools-for-customer-support-operations',
          actionLabel: 'View support-ops sample',
        },
      ],
      closing: {
        eyebrow: 'Run your own analysis',
        title: 'Compare your own small-business wedge against the sample.',
        description:
          'Use this sample to see how operational pain turns into ranked opportunity wedges, then analyze your own market to see whether a different workflow or buyer shape scores higher.',
        primaryAction: {
          label: 'Start Analysis',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'Back to homepage',
          href: '/en',
          variant: 'outline',
        },
      },
    },
    'examples-ai-tools-for-recruiters': {
      primaryAction: {
        label: 'Run your own analysis',
        href: '/tools/product-insight',
      },
      secondaryAction: {
        label: 'Back to homepage',
        href: '/en',
        variant: 'outline',
      },
      heroVisualEyebrow: 'Public sample report',
      heroVisualTitle: 'Recruiter workflow wedges, ranked by follow-up speed and handoff clarity',
      heroVisualSteps: ['Recruiter scenario brief', 'Top opportunity wedges', 'Recommended next validation move'],
      supportEyebrow: 'Scenario brief',
      supportTitle:
        'AI tools for recruiters: a public sample report built around interview-note cleanup and candidate follow-through.',
      supportDescription:
        'This sample report focuses on where recruiters lose momentum between calls, summaries, and next actions. It explains the hiring context, the repeated admin drag, and the first wedge worth pressure-testing before you read the full ranking.',
      supportSnapshots: [
        {
          label: 'Market slice',
          value: 'Independent recruiters and lean hiring-ops teams',
          description:
            'These operators usually handle screening calls, role briefs, candidate movement, and internal handoffs themselves, without a large ops layer catching the details.',
        },
        {
          label: 'Core pain',
          value: 'Candidate momentum slows down after every conversation',
          description:
            'The strongest opportunities appear where interview notes, candidate summaries, and next actions are still stitched together manually under time pressure.',
        },
        {
          label: 'Best first wedge',
          value: 'Interview notes to candidate summary assistant',
          description:
            'This sample argues that before broader recruiting automation, the most credible first product wedge is stronger note cleanup plus a better next-step draft.',
        },
      ],
      opportunityEyebrow: 'Opportunity ranking',
      opportunityTitle: 'The strongest recruiter wedge is usually note-to-follow-up operations, not broad recruiting AI.',
      opportunityDescription:
        'These rankings favor repeated workflow frequency, the value of response speed, and whether the product story is simple enough for recruiters to try without changing their whole system.',
      opportunityItems: [
        {
          rank: 'Rank 01',
          title: 'Interview notes to candidate summary assistant',
          score: '8.8/10',
          description:
            'Turn interview notes, transcripts, and scattered observations into a clean candidate summary, next actions, open questions, and role-fit signals.',
          audience: 'Independent recruiters, boutique search teams, and hiring operators processing a high volume of notes.',
          whyNow:
            'LLMs are now strong enough at extracting structure from messy conversation, which makes the time-saving and handoff-quality value easy to feel quickly.',
          nextMove:
            'Validate whether recruiters will trust AI-generated summaries when every point can be traced back to source notes and human review stays fast.',
          highlights: [
            'The value is obvious because it directly speeds up candidate movement.',
            'It is narrow enough to explain without turning into a full recruiting platform on day one.',
            'It can naturally expand later into follow-up drafting and internal handoff workflows.',
          ],
        },
        {
          rank: 'Rank 02',
          title: 'Recruiter follow-up drafting and reminder assistant',
          score: '8.2/10',
          description:
            'Identify who needs an update most, draft contextual follow-up messages, and reduce the chance that high-quality candidates stall because of admin congestion.',
          audience: 'Recruiters managing multiple roles and candidate stages at once.',
          whyNow:
            'Response speed is already a competitive edge in recruiting, yet follow-up work is still scattered across notes, email, and ATS reminders.',
          nextMove:
            'Validate whether recruiters care more about draft quality, or about the system deciding who needs attention right now.',
          highlights: [
            'ROI is easy to explain because candidate drop-off is expensive.',
            'It connects naturally with the notes-to-summary workflow.',
            'The scope needs discipline so it does not turn into a generic outreach tool.',
          ],
        },
        {
          rank: 'Rank 03',
          title: 'Role brief to candidate-match handoff assistant',
          score: '7.7/10',
          description:
            'Turn hiring-manager needs, call notes, and recruiter observations into a cleaner internal matching narrative before the next handoff.',
          audience: 'Teams where internal handoff quality materially affects funnel progression.',
          whyNow:
            'The handoff pain is real, but workflow differences are larger across teams, so the first version is less universal than the top two wedges.',
          nextMove:
            'Validate whether this wedge fits better as a second-layer expansion after the first two workflows prove themselves.',
          highlights: [
            'The downstream value is strong when handoff quality is the real bottleneck.',
            'Workflow variance is higher than in the top-ranked wedge.',
            'It feels more like a second-phase wedge than the best first entry point.',
          ],
        },
      ],
      detailEyebrow: 'Why these opportunities scored well',
      detailTitle: 'These scores favor recruiter wedges that are repeated, urgent, and easy to adopt.',
      detailDescription:
        'The strongest ideas are not just painful. They also match how recruiting tools actually get adopted: one clear drag point, faster candidate movement, and no need to replace the entire workflow on day one.',
      diagnosticColumns: [
        {
          title: 'Why recruiters buy',
          description:
            'Value becomes obvious when a tool reduces admin drag during candidate movement, improves summary clarity, or lowers the chance that next actions get missed.',
        },
        {
          title: 'What lowers the score',
          description:
            'Recruiting stacks are already fragmented and trust matters. Anything that automates too early or requires deep process change is harder to adopt.',
        },
        {
          title: 'Recommended next move',
          description:
            'Interview recruiters who are already overloaded by screening calls and heavy note volume, then position the first wedge around faster candidate movement plus cleaner handoff clarity.',
        },
      ],
      faqEyebrow: 'FAQ',
      faqTitle: 'Questions people ask when reading this recruiter sample report',
      faqDescription:
        'These answers explain what the sample demonstrates, why note cleanup ranks first, and how to use the report before testing your own direction.',
      faqItems: [
        {
          question: 'What does this recruiter sample report demonstrate?',
          answer:
            'It shows how the product turns recruiting workflow pain into a ranked set of wedges, so visitors can judge whether the output feels concrete enough before running their own direction.',
        },
        {
          question: 'Why does interview-note cleanup rank ahead of broad recruiting AI?',
          answer:
            'Because it combines repeated pain, clear time pressure, and a narrow workflow boundary that can be explained and tested without becoming a full recruiting suite.',
        },
        {
          question: 'Is this sample still useful if my recruiting context is different?',
          answer:
            'Yes. Use the ranking logic as the reference point. If the reasoning feels useful, run your own buyer and workflow shape to see whether a different recruiter wedge scores higher.',
        },
      ],
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Go back to the public hub and compare the full product path again before analyzing your own direction.',
          href: '/en',
          actionLabel: 'Back to homepage',
        },
        {
          title: 'Recruiter use-case page',
          description: 'Open the recruiter use case to understand why these workflows are more likely to become product wedges.',
          href: '/en/use-cases/ai-tools-for-recruiters',
          actionLabel: 'View use-case page',
        },
        {
          title: 'SaaS idea validation',
          description: 'Take the most promising recruiter wedge into a tighter validation workflow after reading the sample.',
          href: '/en/saas-idea-validation',
          actionLabel: 'Open validation workflow',
        },
      ],
      closing: {
        eyebrow: 'Analyze your recruiter direction',
        title: 'Compare your own recruiting workflow against this sample.',
        description:
          'Use this public sample to see how recruiting workflows become ranked wedges, then analyze your own direction to learn whether a different buyer or bottleneck rises to the top.',
        primaryAction: {
          label: 'Start Analysis',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: 'Back to homepage',
          href: '/en',
          variant: 'outline',
        },
      },
    },
  },
  zh: {
    'examples-ai-tools-for-freelancers': {
      primaryAction: {
        label: '分析你自己的方向',
        href: '/tools/product-insight',
      },
      secondaryAction: {
        label: '返回首页',
        href: '/zh',
        variant: 'outline',
      },
      heroVisualEyebrow: '公开样例报告',
      heroVisualTitle: '围绕自由职业者工作流，按产品信号对机会切口排序',
      heroVisualSteps: ['自由职业者场景', '优先级最高的机会切口', '推荐下一步验证动作'],
      supportEyebrow: '场景摘要',
      supportTitle: '自由职业者 AI 工具：一份围绕高行政摩擦工作流构建的公开样例报告。',
      supportDescription:
        '这份样例报告关注的是：自由职业者在客户沟通和真正可计费交付之间，究竟在哪些环节最容易损失时间。它会先交代市场切片、核心痛点和最值得先试的切口，再进入后面的机会排序。',
      supportSnapshots: [
        {
          label: '市场切片',
          value: '独立顾问与自由职业运营者',
          description:
            '他们通常没有内部运营团队，要自己同时处理客户沟通、需求界定、跟进和交付。',
        },
        {
          label: '核心痛点',
          value: '行政事务吞掉了可计费时间',
          description:
            '最强机会通常出现在：如何把通话、笔记和修改请求更稳定地转成明确后续动作。',
        },
        {
          label: '最佳起步切口',
          value: '通话纪要到行动计划助手',
          description:
            '样例判断认为，把混乱客户上下文整理成清晰下一步，是最值得先验证的切口。',
        },
      ],
      intentEyebrow: '怎么使用样例页',
      intentTitle: '先用样例页判断输出质量，再决定要不要分析你自己的方向。',
      intentDescription:
        '公开样例页最重要的作用，是帮搜索访客先回答一个问题：这个产品产出的排序结果、解释逻辑和下一步建议，看起来是否足够可信，值得我拿自己的方向来跑一次。',
      intentColumns: [
        {
          title: '适合谁',
          description:
            '想先看真实输出结构、排序方式和解释逻辑，再决定要不要进入产品的人。',
        },
        {
          title: '不适合谁',
          description:
            '已经清楚自己的市场方向，并且已经准备好直接提交分析，而不是先看公开样例的人。',
        },
        {
          title: '什么时候用',
          description:
            '当你想先对照一个真实场景，看看产品如何把原始痛点整理成可排序机会和下一步验证动作时使用。',
        },
      ],
      opportunityEyebrow: '排序后的机会',
      opportunityTitle: '最值得先切入的，不是抽象的“给自由职业者做 AI”，而是通话后的运营清理工作流。',
      opportunityDescription:
        '这里的排序重点是：问题是否高频重复、价值是否容易讲清楚、以及用户是否能很快感受到它确实回收了工作时间。',
      opportunityItems: [
        {
          rank: '排名 01',
          title: '客户通话纪要到行动计划助手',
          score: '8.9/10',
          description:
            '把客户通话记录、语音转写和零散待办整理成结构化纪要，输出下一步动作、时间节点和可直接使用的跟进内容。',
          audience: '同时服务多个活跃客户的独立顾问、策略顾问和自由职业运营者。',
          whyNow:
            '现在的大模型已经足够擅长从混乱对话里提炼行动项，所以节省时间的价值更容易被直接感知。',
          nextMove:
            '优先验证：如果每个行动项都能回链到原始笔记，自由职业者是否会信任 AI 生成的跟进建议。',
          highlights: [
            '价值和收入直接相关，因为它保护的是可计费时间。',
            '这是每周高频重复流程，不是偶发型动作。',
            '后续可自然扩展到提案准备和项目交接。',
          ],
        },
        {
          rank: '排名 02',
          title: '提案与范围风险审查助手',
          score: '8.3/10',
          description:
            '在提案发送前审查范围描述、交付边界和客户请求，提前标记容易低估工作量或引发无休止修改的风险。',
          audience: '需要发送定制提案、项目报价或长期服务方案的自由职业者。',
          whyNow:
            '很多自由职业者的痛点在项目开始前就已经出现，尤其是模糊范围会在后续几周里演变成大量无偿返工。',
          nextMove:
            '验证用户是否更愿意为“发送前范围审查”付费，而不是再买一个泛写作类提案工具。',
          highlights: [
            '直接减少坏项目和低质量客户带来的隐性成本。',
            '定位比通用写作助手更锐利。',
            '在需求边界不清晰的垂直领域里会更强。',
          ],
        },
        {
          rank: '排名 03',
          title: '交付交接与改稿协作助手',
          score: '7.8/10',
          description:
            '帮助自由职业者整理交付说明、解释关键决策、暴露待确认问题，并更有条理地管理后续改稿循环。',
          audience: '经常经历多轮评审的设计、营销与内容类自由职业者。',
          whyNow:
            '反复改稿带来的疲劳很常见，但这类流程通常分散在邮件、文档和即时通信里，产品入口复杂度会更高。',
          nextMove:
            '验证这个交付交接层本身是否足够独立有价值，还是应该与更强的通话后行政工作流绑定。',
          highlights: [
            '如果产品嵌入交付流程，长期留存潜力不错。',
            '痛点真实，但工作流分散会抬高采用门槛。',
            '更适合作为第二阶段切口，而不是最先切入点。',
          ],
        },
      ],
      detailEyebrow: '为什么这组机会得分更高',
      detailTitle: '这组得分更高的切口，通常同时满足“回报快、使用频繁、接入成本低”。',
      detailDescription:
        '这些高分机会不只是痛点强，还更符合自由职业者的购买逻辑：任务边界清楚、节省时间的价值容易感知，而且不用额外搭一整套运营流程才能开始使用。',
      diagnosticColumns: [
        {
          title: '自由职业者为什么愿意买',
          description:
            '他们不要另一个泛助手，他们要的是更少行政摩擦、更快跟进，以及在沟通和交付之间更少丢失细节。',
        },
        {
          title: '为什么分数没有更高',
          description:
            '自由职业者工作流通常非常碎片化。凡是需要太多配置或太多集成的产品，即使痛点真实，也更容易被放弃。',
        },
        {
          title: '推荐下一步',
          description:
            '优先找 5 到 10 位在客户跟进环节经常丢时间的自由职业者做验证，并把定位放在“恢复可计费时间”，而不是泛化的 AI 效率工具。',
        },
      ],
      faqEyebrow: '常见问题',
      faqTitle: '在阅读这份自由职业者样例报告时，用户最常问什么',
      faqDescription:
        '这些问题解释这份样例到底证明了什么、为什么最高分切口排在最前面，以及看完之后该怎么用这份报告。',
      faqItems: [
        {
          question: '这份自由职业者样例报告想证明什么？',
          answer:
            '它想证明：产品不是只会给出抽象方向，而是能把自由职业者的真实工作流拆成可排序机会，让你在提交自己方向前先判断输出是否够具体。',
        },
        {
          question: '为什么“通话后的运营清理”会排在泛化 AI 点子前面？',
          answer:
            '因为这个切口同时满足高频重复、节省时间的价值容易感知、并且工作流足够窄，用户不需要额外搭一整套运营系统就能开始使用。',
        },
        {
          question: '如果我服务的不是自由职业者，这份样例还有参考价值吗？',
          answer:
            '有。最值得参考的不是具体行业，而是排序逻辑本身。如果你觉得这种判断方式有帮助，下一步就是把自己的受众和工作流带进产品里跑一次。',
        },
      ],
      relatedColumns: [
        {
          title: '首页',
          description: '回到公开站总入口，在一个页面里重新比较其他公开路径。',
          href: '/zh',
          actionLabel: '返回首页',
        },
        {
          title: '验证指南',
          description: '先看一遍如何判断一个 AI 创业切口值不值得继续，再决定是否分析自己的方向。',
          href: '/zh/guides/how-to-validate-an-ai-startup-idea',
          actionLabel: '查看验证指南',
        },
        {
          title: '招聘样例报告',
          description: '对照一份招聘场景公开样例，看看不同垂直工作流的切口排序会怎么变化。',
          href: '/zh/examples/ai-tools-for-recruiters',
          actionLabel: '查看招聘样例',
        },
        {
          title: '顾问场景页',
          description:
            '看看当购买方更接近面向客户的一人顾问时，同一套排序逻辑会如何变化，而不是更泛的自由职业者混合场景。',
          href: '/zh/use-cases/ai-tools-for-consultants',
          actionLabel: '查看顾问场景页',
        },
      ],
      closing: {
        eyebrow: '分析你自己的方向',
        title: '把你的市场切片和这份样例对照起来看。',
        description:
          '先把这份公开样例当作参考，再分析你自己的方向，看看不同受众、工作流或痛点模式是否会导出更强的机会地图。',
        primaryAction: {
          label: '开始分析',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: '返回首页',
          href: '/zh',
          variant: 'outline',
        },
      },
    },
    'examples-ai-tools-for-small-business': {
      primaryAction: {
        label: '分析你自己的方向',
        href: '/tools/product-insight',
      },
      secondaryAction: {
        label: '返回首页',
        href: '/zh',
        variant: 'outline',
      },
      heroVisualEyebrow: '公开样例报告',
      heroVisualTitle: '围绕中小企业工作流，按真实收入信号对机会切口排序',
      heroVisualSteps: ['业务场景', '优先级最高的工作流切口', '推荐下一步验证动作'],
      supportEyebrow: '场景摘要',
      supportTitle: '中小企业 AI 工具：一份围绕老板主导型服务业务构建的公开样例报告。',
      supportDescription:
        '这份样例报告关注的是：中小企业在询盘、报价、排期和回款之间，究竟在哪些环节最容易无声地损失收入。它会先交代业务背景、主要漏损点和最像样的第一切口，再进入后面的排序结果。',
      supportSnapshots: [
        {
          label: '市场切片',
          value: '由老板主导的轻团队服务型企业',
          description:
            '这类企业通常只有 2 到 20 人，仍然依赖老板或极小的行政团队来处理线索、报价、排期和客户跟进。',
        },
        {
          label: '核心痛点',
          value: '收入会在询盘到回款之间悄悄流失',
          description:
            '最有价值的切口通常出现在那些没人有空持续跟进、确认细节或追回停滞进度的交接缝隙里。',
        },
        {
          label: '最佳起步切口',
          value: '报价跟进与沉默客户挽回助手',
          description:
            '最强的起步切口，是把已发报价和沉默客户重新变成明确下一步动作，避免线索在无响应里慢慢变冷。',
        },
      ],
      intentEyebrow: '怎么使用样例页',
      intentTitle: '先用样例页判断输出质量，再决定要不要分析你自己的方向。',
      intentDescription:
        '公开样例页最重要的作用，是帮搜索访客先回答一个问题：这个产品产出的排序结果、解释逻辑和下一步建议，看起来是否足够可信，值得我拿自己的方向来跑一次。',
      intentColumns: [
        {
          title: '适合谁',
          description:
            '想先看真实输出结构、排序方式和解释逻辑，再决定要不要进入产品的人。',
        },
        {
          title: '不适合谁',
          description:
            '已经清楚自己的市场方向，并且已经准备好直接提交分析，而不是先看公开样例的人。',
        },
        {
          title: '什么时候用',
          description:
            '当你想先对照一个真实场景，看看产品如何把原始痛点整理成可排序机会和下一步验证动作时使用。',
        },
      ],
      opportunityEyebrow: '排序后的机会',
      opportunityTitle: '中小企业最值得先切入的，不是泛化自动化，而是围绕跟进环节做收入回收。',
      opportunityDescription:
        '这里的排序重点是：短期回报是否清晰、落地是否足够轻量、以及老板是否能在不引入重系统的前提下很快感受到价值。',
      opportunityItems: [
        {
          rank: '排名 01',
          title: '报价跟进与沉默客户挽回助手',
          score: '8.8/10',
          description:
            '追踪已发报价、识别停滞线索、生成带上下文的跟进内容，并提示哪些机会需要老板亲自介入，避免交易在安静中流失。',
          audience: '会发送定制报价、并经常因为跟进不及时而丢单的本地服务商、小型机构和老板主导型团队。',
          whyNow:
            '很多中小企业已经能收集到询盘，但报价后的跟进仍然高度手工化、不稳定，而且和收入流失直接相关。',
          nextMove:
            '优先验证：老板是否会信任一个先帮他推荐“下一步怎么跟进”的助手，而不是一上来就替换成完整客户管理系统。',
          highlights: [
            '价值回报很容易讲清楚，因为它直接对应收入回收。',
            '贴合现有工作方式，不要求团队先迁移到新流程。',
            '后续可自然扩展到报价分析和销售指导。',
          ],
        },
        {
          rank: '排名 02',
          title: '多渠道询盘到排期协调助手',
          score: '8.1/10',
          description:
            '把电话、表单、邮件和短信里的零散预约需求整理成清晰排期队列，标记缺失信息，并让下一步预约动作一眼可见。',
          audience: '仍然需要跨多个渠道协调预约、上门时间或咨询时段的诊所、工作室、承包商和小团队。',
          whyNow:
            '排期痛点非常即时且高频，但很多团队规模太小，不值得为此采购一整套复杂运营系统或专职协调岗位。',
          nextMove:
            '验证中小企业更在意“先把不完整询盘分拣清楚”，还是更在意再接一个新的日历集成。',
          highlights: [
            '高频运营痛点，第一天就能看到价值。',
            '尤其适合漏接电话和信息不完整的业务场景。',
            '第一阶段必须收窄边界，避免变成臃肿的排期软件。',
          ],
        },
        {
          rank: '排名 03',
          title: '催款与回款状态协作助手',
          score: '7.6/10',
          description:
            '监控未支付账单，准备更得体的提醒节奏，总结客户回款状态，并在现金流问题扩大前主动提醒团队处理。',
          audience: '先交付后收款、且仍靠人工提醒维持现金流运转的中小企业。',
          whyNow:
            '回款痛点很强，但由于催款同时涉及关系、语气和风险判断，用户对纯自动化的信任门槛会更高。',
          nextMove:
            '验证老板更想要的是“提醒文案和风险提示副驾”，还是先只要一个更清晰的回款状态排序与优先级视图。',
          highlights: [
            '痛点足够尖锐，因为延迟回款会立刻影响经营。',
            '但信任与品牌语气让落地方式更需要克制。',
            '更适合作为前台工作流跑通之后的第二阶段切口。',
          ],
        },
      ],
      detailEyebrow: '为什么这组机会得分更高',
      detailTitle: '这组得分更高的切口，通常同时具备“回报可见、上线够轻、老板会着急”。',
      detailDescription:
        '高分机会不只是运营上有痛，还更符合中小企业采纳工具的方式：价值容易讲清楚、试运行门槛低，而且不用先推动整家公司迁移到一套更重的平台。',
      diagnosticColumns: [
        {
          title: '中小企业为什么愿意买',
          description:
            '当一个产品能帮助老板回收收入、减少跟进混乱，或释放出一个关键运营角色，而且不需要漫长部署时，他们才更愿意买单。',
        },
        {
          title: '为什么分数没有更高',
          description:
            '中小企业预算敏感、也容易工具疲劳。凡是看起来像“要整体迁移平台”的方案，即使痛点真实，也更难推进。',
        },
        {
          title: '推荐下一步',
          description:
            '优先访谈 5 到 10 家在发出报价后经常失去跟进节奏的老板主导型企业，把第一切口定位成“收入回收”，而不是泛化的“AI 自动化”。',
        },
      ],
      faqEyebrow: '常见问题',
      faqTitle: '在阅读这份中小企业样例报告时，用户最常问什么',
      faqDescription:
        '这些问题解释这份样例具体展示了什么、为什么最高分切口是跟进收入回收，以及看完之后该怎么继续。',
      faqItems: [
        {
          question: '这份中小企业样例报告主要展示什么？',
          answer:
            '它展示的是：产品如何把老板主导型服务业务里的运营摩擦整理成一组可排序机会，让你先判断这个输出方式是否足够具体。',
        },
        {
          question: '为什么“报价跟进”会排在更泛化的自动化想法前面？',
          answer:
            '因为它的回报更容易讲清楚，问题和收入流失直接相关，而且落地更轻，不需要企业一开始就整体迁移到更重的平台里。',
        },
        {
          question: '如果我的业务类型不同，这份样例还值得看吗？',
          answer:
            '值得。你不一定要复制这个切口，但可以借它理解产品怎样做机会排序。如果这种逻辑对你有帮助，下一步就是把你自己的工作流带进产品里验证。',
        },
      ],
      relatedColumns: [
        {
          title: 'AI 商业机会分析',
          description: '查看那个更适合从宽空间中筛出优先切口的分析工作流。',
          href: '/zh/ai-business-opportunity-analysis',
          actionLabel: '查看分析页面',
        },
        {
          title: '排序指南',
          description: '看一遍如何比较紧迫度、付费意愿和复杂度，再决定哪个工作流最值得下一步投入。',
          href: '/zh/guides/how-to-prioritize-ai-business-opportunities',
          actionLabel: '查看排序指南',
        },
        {
          title: '代理公司样例报告',
          description: '把这份老板主导型运营样例，和围绕服务交付与返工压力的代理公司样例对照着看。',
          href: '/zh/examples/ai-tools-for-agencies',
          actionLabel: '查看代理公司样例',
        },
        {
          title: '客户支持运营样例报告',
          description:
            '再对照一份围绕工单分流、升级处理和后续追踪拖拽构建的客户支持运营公开样例。',
          href: '/zh/examples/ai-tools-for-customer-support-operations',
          actionLabel: '查看支持运营样例',
        },
      ],
      closing: {
        eyebrow: '分析你自己的方向',
        title: '把你自己的中小企业切口，和这份样例放在一起比较。',
        description:
          '先用这份样例理解运营痛点如何变成可排序的机会切口，再分析你自己的市场，看看不同工作流或购买方类型是否会得出更强结果。',
        primaryAction: {
          label: '开始分析',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: '返回首页',
          href: '/zh',
          variant: 'outline',
        },
      },
    },
    'examples-ai-tools-for-recruiters': {
      primaryAction: {
        label: '分析你的方向',
        href: '/tools/product-insight',
      },
      secondaryAction: {
        label: '返回首页',
        href: '/zh',
        variant: 'outline',
      },
      heroVisualEyebrow: '公开样例报告',
      heroVisualTitle: '招聘工作流切口，按跟进速度和交接清晰度排序',
      heroVisualSteps: ['招聘场景背景', 'Top 机会切口', '推荐的下一步验证动作'],
      supportEyebrow: '场景 brief',
      supportTitle: '招聘顾问 AI 工具：一份围绕面试记录整理与候选人跟进的公开样例报告。',
      supportDescription:
        '这份样例报告聚焦招聘顾问在通话、摘要和后续动作之间最容易丢失节奏的地方。它先说明招聘场景、重复出现的行政拖拽，以及在开始看机会排序前最值得先测试的切口。',
      supportSnapshots: [
        {
          label: '市场切片',
          value: '独立招聘顾问与精简招聘运营团队',
          description:
            '这类角色通常要自己处理初筛通话、职位需求、候选人推进和内部交接，却没有很厚的运营层帮忙兜住细节。',
        },
        {
          label: '核心痛点',
          value: '每次对话之后，候选人推进都会变慢',
          description:
            '最强的机会通常出现在那些仍然依赖手工整理面试记录、候选人摘要和下一步动作的地方，而且这些动作还非常受时间压力影响。',
        },
        {
          label: '最佳第一切口',
          value: '面试记录到候选人摘要助手',
          description:
            '这份样例认为，在更宽的招聘自动化之前，先把记录整理与下一步草稿做强，通常是更可信的第一产品切口。',
        },
      ],
      opportunityEyebrow: '机会排序',
      opportunityTitle: '最强的招聘切口通常是“记录到跟进”的运营整理，而不是宽泛的招聘 AI。',
      opportunityDescription:
        '这些排序优先考虑重复使用频率、响应速度价值，以及这个产品故事是否足够简单，能让招聘顾问不改整套系统就先试起来。',
      opportunityItems: [
        {
          rank: '排名 01',
          title: '面试记录到候选人摘要助手',
          score: '8.8/10',
          description:
            '把面试记录、转写文本和分散观察，整理成清晰的候选人摘要、下一步动作、待确认问题以及角色匹配信号。',
          audience: '独立招聘顾问、精品猎头团队，以及要处理大量记录的招聘运营角色。',
          whyNow:
            'LLM 在从混乱对话里提取结构方面已经足够强，这让“节省时间 + 提高手交接质量”的价值可以被很快看见。',
          nextMove:
            '先验证招聘顾问是否愿意信任 AI 生成的摘要，前提是每个要点都能回溯到原始记录，而且人工复核足够快。',
          highlights: [
            '价值清晰，因为它直接加快候选人推进速度。',
            '足够窄，能讲清楚而不必一上来就变成完整招聘平台。',
            '后续还可以自然扩展到跟进草稿和内部交接流程。',
          ],
        },
        {
          rank: '排名 02',
          title: '招聘顾问跟进草稿与提醒助手',
          score: '8.2/10',
          description:
            '自动识别谁最需要更新、起草带上下文的跟进信息，并减少优质候选人因为行政拥堵而停滞的概率。',
          audience: '同时管理多个职位和候选人推进阶段的招聘顾问。',
          whyNow:
            '响应速度在招聘里本来就是竞争优势，但跟进动作仍然分散在记录、邮箱和 ATS 提醒之间，行政拖拽非常明显。',
          nextMove:
            '先验证招聘顾问真正更在意的是草稿质量，还是更在意系统帮他判断“谁现在最该处理”。',
          highlights: [
            'ROI 容易讲清楚，因为候选人流失代价很高。',
            '和“记录到摘要”工作流天然衔接。',
            '需要小心切 scope，避免变成泛化外联工具。',
          ],
        },
        {
          rank: '排名 03',
          title: '职位 brief 到候选人匹配交接助手',
          score: '7.7/10',
          description:
            '把招聘经理需求、通话记录和顾问观察，整理成更清晰的内部匹配叙述，方便候选人进入下一轮前的交接。',
          audience: '内部交接质量会明显影响招聘漏斗推进的团队。',
          whyNow:
            '交接痛点确实存在，但不同团队的流程差异更大，因此第一版产品定义没有前两个切口那么通用。',
          nextMove:
            '先验证这个切口是不是更适合在前两个工作流成立后，作为第二层扩展能力推出。',
          highlights: [
            '当交接质量真的是瓶颈时，它的下游价值很强。',
            '流程差异比排名第一的切口更大。',
            '更像第二阶段切口，而不是最强第一入口。',
          ],
        },
      ],
      detailEyebrow: '为什么这些机会得分更高',
      detailTitle: '这些分数更偏好“重复发生、紧迫度明显、采用门槛低”的招聘工作流切口。',
      detailDescription:
        '最强的想法不只是让人觉得痛，它们还符合招聘工具被采用的方式：能解决一个明显的流程拖拽、能让候选人推进更快，而且不需要团队一开始就换整套系统。',
      diagnosticColumns: [
        {
          title: '招聘顾问为什么会买',
          description:
            '当一个工具能减少候选人推进过程里的行政拖拽、提高清晰摘要质量，或者减少后续动作被遗漏的概率时，价值会非常直观。',
        },
        {
          title: '什么因素会拉低得分',
          description:
            '招聘工具栈本来就很碎，信任也很重要。任何过早自动化、或要求团队做深层流程改造的方案，都会更难采用。',
        },
        {
          title: '推荐的下一步',
          description:
            '先访谈那些已经被初筛通话和大量记录压得很重的招聘顾问，把第一切口定位成“加快候选人推进 + 提高交接清晰度”。',
        },
      ],
      faqEyebrow: '常见问题',
      faqTitle: '在阅读这份招聘样例报告时，用户最常问什么',
      faqDescription:
        '这些问题会帮助访客理解这份样例到底证明了什么、为什么记录整理排在最前，以及如何在测试自己方向前使用它。',
      faqItems: [
        {
          question: '这份招聘样例报告主要想证明什么？',
          answer:
            '它展示的是：产品如何把招聘工作流痛点转成一组可排序切口，让访客在输入自己方向前，先判断输出是否已经足够具体。',
        },
        {
          question: '为什么“面试记录整理”会排在泛化招聘 AI 前面？',
          answer:
            '因为它同时具备重复痛点、清晰时间压力，以及足够窄的流程边界，能让产品在不变成完整招聘套件的前提下被解释和测试。',
        },
        {
          question: '如果我的招聘场景不同，这份样例还有参考价值吗？',
          answer:
            '有。把排序逻辑当成参照物来用。如果这种推理方式对你有帮助，就把你自己的买家与工作流放进去，看看是不是别的招聘切口得分更高。',
        },
      ],
      relatedColumns: [
        {
          title: '首页',
          description: '回到公开站总入口，重新比较整条产品路径，再决定是否分析自己的方向。',
          href: '/zh',
          actionLabel: '返回首页',
        },
        {
          title: '招聘场景页',
          description: '查看招聘 use case 页面，理解为什么这些招聘工作流更容易长成产品切口。',
          href: '/zh/use-cases/ai-tools-for-recruiters',
          actionLabel: '查看场景页',
        },
        {
          title: 'SaaS 点子验证',
          description: '看完样例后，把更有希望的招聘切口带到更聚焦的验证工作流里。',
          href: '/zh/saas-idea-validation',
          actionLabel: '进入验证工作流',
        },
      ],
      closing: {
        eyebrow: '分析你的招聘方向',
        title: '把你自己的招聘工作流和这份样例对照起来看。',
        description:
          '先用这份公开样例感受招聘工作流如何变成一组可排序切口，再分析你自己的方向，看是否会有别的买家或瓶颈排在更前面。',
        primaryAction: {
          label: '开始分析',
          href: '/tools/product-insight',
        },
        secondaryAction: {
          label: '返回首页',
          href: '/zh',
          variant: 'outline',
        },
      },
    },
    'examples-ai-tools-for-agencies': {
      primaryAction: {
        label: '分析你的方向',
        href: '/tools/product-insight',
      },
      secondaryAction: {
        label: '查看另一份样例',
        href: '/zh/examples/ai-tools-for-small-business',
        variant: 'outline',
      },
      heroVisualEyebrow: '公开样例报告',
      heroVisualTitle: '代理公司交付切口，按返工压力和交接清晰度排序',
      heroVisualSteps: ['代理公司场景背景', 'Top 工作流切口', '推荐的下一步验证动作'],
      supportEyebrow: '场景 brief',
      supportTitle: '代理公司 AI 工具：一份围绕交付摩擦与利润流失构建的公开样例报告。',
      supportDescription:
        '这份样例报告聚焦精品代理公司里最反复发生的协调拖拽：客户反馈要被翻成明确动作项、会议 recap 会在交接时漂移、交付 QA 仍然依赖人工清理。它会先告诉你哪个切口最值得先验证，再带你看完整排序。',
      supportSnapshots: [
        {
          label: '市场切片',
          value: '精品代理公司与客户交付运营角色',
          description:
            '这类团队往往要自己把客户通话、反馈线程和内部项目更新串起来，所以很小的协调失误也会快速放大成昂贵返工。',
        },
        {
          label: '核心痛点',
          value: '交付上下文在反馈、recap 和执行之间持续流失',
          description:
            '最强的机会通常出现在那些仍然依赖人工把客户反馈转成 scoped task、项目更新和 QA 检查的地方，而且这些动作非常赶时间。',
        },
        {
          label: '最佳第一切口',
          value: '客户反馈到 scoped action-items 助手',
          description:
            '这份样例认为，最强的第一切口是先把松散客户反馈变成可分配动作项，再逐步扩展成更宽的交付 copilot。',
        },
      ],
      opportunityEyebrow: '机会排序',
      opportunityTitle: '最强的代理公司切口通常从“反馈到动作项”开始，而不是宽泛的服务 AI。',
      opportunityDescription:
        '这些排序优先考虑能否降低重复协调拖拽、保护利润不被返工吃掉，以及是否符合服务团队在真实交付中采用新工具的方式。',
      opportunityItems: [
        {
          rank: '排名 01',
          title: '客户反馈到 scoped action-items 助手',
          score: '8.9/10',
          description:
            '把客户评论、批注文档和异步反馈线程，整理成清晰的动作项、负责人、截止时间和待确认问题，交给交付团队执行。',
          audience: '精品代理公司、客户负责人，以及反复要把模糊反馈翻译成执行动作的交付经理。',
          whyNow:
            '反馈量在上升，但交付团队仍然靠手工整理动作项，这让“更快 scope + 更少返工”的价值可以被立刻感知。',
          nextMove:
            '先验证代理公司更在意的是更强的任务提取能力，还是更在意客户上下文在 account 和 delivery 角色之间不再丢失。',
          highlights: [
            'ROI 容易讲清楚，因为返工和错位会直接吃掉服务利润。',
            '工作流足够窄，能被解释清楚，而不需要一上来就变成完整代理公司操作系统。',
            '后续还能自然扩展到 recap 自动化、QA 和更多交接流程。',
          ],
        },
        {
          rank: '排名 02',
          title: '会议 recap 到项目更新助手',
          score: '8.3/10',
          description:
            '把通话记录、会议 recap 和项目讨论，转成更清晰的状态更新、负责人分配和下一步说明。',
          audience: '频繁进行客户通话和跨团队交付同步的代理公司团队。',
          whyNow:
            '项目对齐仍然依赖人工把同样的决定重复写进文档、项目板和聊天工具里，所以 recap 漂移仍然是常见的时间黑洞。',
          nextMove:
            '先验证代理公司真正更在意的是 recap 质量本身，还是更在意每次会议后更新项目系统的下游速度。',
          highlights: [
            '痛点重复发生，而且服务团队一眼就能认出来。',
            '它和排名第一的“反馈到动作项”切口天然相连。',
            '产品需要边界清晰，避免变成泛化笔记工具。',
          ],
        },
        {
          rank: '排名 03',
          title: '周期性交付 QA copilot',
          score: '7.8/10',
          description:
            '在交付给客户前，辅助团队检查缺项、一致性问题和评审遗漏，减少本可以避免的返工。',
          audience: '需要持续交付报告、活动资产、审计结果或内容包的代理公司团队。',
          whyNow:
            'QA 痛点真实而且直接影响利润，但不同代理公司和不同服务类型之间的 checklist 差异，比前两个切口要更大。',
          nextMove:
            '先验证 QA 支持是否更适合在前两个交付工作流已经建立信任后，作为第二层扩展能力推出。',
          highlights: [
            '当团队已经真切感受到返工代价时，它的价值会非常强。',
            '流程差异比前两个排名切口更大。',
            '更像第二阶段切口，而不是最强的第一入口。',
          ],
        },
      ],
      detailEyebrow: '为什么这些机会得分更高',
      detailTitle: '这些分数更偏好那些能减少重复协调拖拽、又不要求团队重写整套流程的代理公司切口。',
      detailDescription:
        '最强的代理公司点子不只是“让人觉得痛”，而是那种反复发生、交付负责人能马上感知价值、并且足够简单到可以先试起来的流程切口。',
      diagnosticColumns: [
        {
          title: '代理公司为什么会买',
          description:
            '当一个工具能减少返工、保住交付上下文，并让 account、project 和 production 角色之间的交接更干净时，价值会很直观。',
        },
        {
          title: '什么因素会拉低得分',
          description:
            '代理公司本来就同时在用很多工具，而且每个客户流程都略有不同。任何像“重做整套流程”或“泛化 AI 层”的方案，都会更难采用。',
        },
        {
          title: '推荐的下一步',
          description:
            '先访谈那些已经能明显感受到 recap 漂移和反馈整理压力的交付负责人，把第一切口定位成“加快执行 + 提高清晰责任归属”。',
        },
      ],
      faqEyebrow: '常见问题',
      faqTitle: '在阅读这份代理公司样例报告时，用户最常问什么',
      faqDescription:
        '这些问题会帮助访客理解这份样例到底证明了什么、为什么交付摩擦比宽泛代理公司 AI 更值得优先做，以及如何在测试自己方向前使用它。',
      faqItems: [
        {
          question: '这份代理公司样例报告主要想证明什么？',
          answer:
            '它展示的是：产品如何把服务交付摩擦转成一组可排序切口，让访客在输入自己方向前，先判断输出是否已经足够具体和值得相信。',
        },
        {
          question: '为什么“客户反馈到动作项”会排在宽泛代理公司 AI 前面？',
          answer:
            '因为它同时具备重复协调痛点、直接利润影响，以及足够窄的流程边界，能让产品在不变成完整服务平台的前提下被解释和试用。',
        },
        {
          question: '如果我的代理公司服务类型不同，这份样例还有参考价值吗？',
          answer:
            '有。把排序逻辑当成参照物来用。如果这种推理方式对你有帮助，就把你自己的买家、服务类型和交付流程带进去，看看是不是别的切口会排在更前面。',
        },
      ],
      relatedColumns: [
        {
          title: '首页',
          description: '回到公开站总入口，重新比较整条产品路径，再决定是否分析自己的方向。',
          href: '/zh',
          actionLabel: '返回首页',
        },
        {
          title: '代理公司场景页',
          description: '查看代理公司 use case 页面，理解为什么这些交付工作流更容易长成产品切口。',
          href: '/zh/use-cases/ai-tools-for-agencies',
          actionLabel: '查看场景页',
        },
        {
          title: 'AI 商业机会分析',
          description: '当你想把最有希望的代理公司切口放回一个市场切片里比较时，进入更适合做排序的分析工作流。',
          href: '/zh/ai-business-opportunity-analysis',
          actionLabel: '进入分析工作流',
        },
      ],
      closing: {
        eyebrow: '分析你的代理公司方向',
        title: '把你自己的代理公司工作流和这份样例对照起来看。',
        description:
          '先用这份公开样例感受交付摩擦如何变成一组可排序切口，再分析你自己的代理公司方向，看是否会有别的买家、交接环节或 QA 瓶颈排在更前面。',
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
    'examples-ai-tools-for-ecommerce-operations': {
      primaryAction: {
        label: '分析你的方向',
        href: '/tools/product-insight',
      },
      secondaryAction: {
        label: '查看另一份样例',
        href: '/zh/examples/ai-tools-for-small-business',
        variant: 'outline',
      },
      heroVisualEyebrow: '公开样例报告',
      heroVisualTitle: '电商运营切口，按清理拖拽和处理速度排序',
      heroVisualSteps: ['电商场景背景', 'Top 工作流切口', '推荐的下一步验证动作'],
      supportEyebrow: '场景 brief',
      supportTitle: '电商运营 AI 工具：一份围绕目录清理、售后分流和退货复盘构建的公开样例报告。',
      supportDescription:
        '这份样例报告聚焦电商团队里那些悄悄吞掉运营时间的队列：商品信息清理、支持工单分流，以及退货原因复盘。它会先交代运营背景、重复摩擦和最像样的第一切口，再带你看完整排序。',
      supportSnapshots: [
        {
          label: '市场切片',
          value: 'DTC 品牌与平台型电商运营团队',
          description:
            '这类团队要同时处理商品信息、售后上下文和履约后问题，而且这些工作往往分散在多个系统、渠道和角色之间。',
        },
        {
          label: '核心痛点',
          value: '清理与分流队列长期停留在手工处理',
          description:
            '最强的机会通常出现在：运营者仍然要在高时间压力下，手工规范商品数据、摘要售后上下文和解释退货原因的地方。',
        },
        {
          label: '最佳第一切口',
          value: '目录补全与清理助手',
          description:
            '这份样例认为，最强的第一入口是先把缺失属性、文案不一致和目录上下文不完整的问题整理干净，再逐步扩成更宽的电商工具层。',
        },
      ],
      intentEyebrow: '怎么使用样例页',
      intentTitle: '先用样例页判断输出质量，再决定要不要分析你自己的电商方向。',
      intentDescription:
        '公开样例页的作用，是先帮搜索访客回答一个问题：这个产品给出的排序、解释逻辑和下一步建议，是否足够具体到值得我拿自己的电商工作流来跑一次。',
      intentColumns: [
        {
          title: '适合谁',
          description:
            '想先看输出结构、排序方式和解释逻辑，再决定要不要把自己的电商运营方向带进产品的人。',
        },
        {
          title: '不适合谁',
          description:
            '已经很清楚自己的工作流方向，并且已经准备好直接提交分析，而不是先看公开样例的人。',
        },
        {
          title: '什么时候用',
          description:
            '当你想先对照一个真实电商场景，看看产品如何把原始运营摩擦整理成可排序机会和下一步验证动作时使用。',
        },
      ],
      opportunityEyebrow: '机会排序',
      opportunityTitle: '最强的电商切口往往从目录与队列清理开始，而不是一句宽泛的“电商 AI copilot”。',
      opportunityDescription:
        '这里的排序优先考虑重复运营痛点、处理速度价值，以及这个切口是否足够窄，能在扩成更大平台前先赢得团队信任。',
      opportunityItems: [
        {
          rank: '排名 01',
          title: '目录补全与清理助手',
          score: '8.8/10',
          description:
            '帮助团队规范商品属性、补齐缺失字段、统一 listing 文案，并在发布或同步渠道前产出更干净的目录记录。',
          audience: '经常要修复商品信息不完整或多渠道文案不一致的电商运营、选品和目录管理角色。',
          whyNow:
            '随着品牌同步的渠道越来越多，目录债务会持续堆积，而清理工作仍然足够手工化，所以更快补齐和纠错能立刻带来运营收益。',
          nextMove:
            '优先验证团队真正更在意的是属性补全、文案一致性，还是异常项审核，这样第一切口才足够窄、足够容易定价。',
          highlights: [
            '痛点高频重复，而且直接影响上架速度与渠道质量。',
            '工作流结构化程度高，适合作为清晰的第一产品切口。',
            '后续还能自然扩展到商品审核、发布 QA 和更多运营流程。',
          ],
        },
        {
          rank: '排名 02',
          title: '售后摘要与分流助手',
          score: '8.2/10',
          description:
            '先摘要售后上下文、补出缺失订单信息，再把工单更干净地分到正确队列，减少客服和运营负责人浪费在初步判断上的时间。',
          audience: '支持量高、上下文零碎、且需要多角色协作处理工单的电商支持与运营团队。',
          whyNow:
            '响应速度很重要，但很多团队现在仍然把大量时间耗在“这单到底是什么问题、该谁接”上，所以分流痛点既容易被看见，也容易被估值。',
          nextMove:
            '先验证第一版产品应该更强调摘要速度、分流准确度，还是边缘工单的升级判断信号。',
          highlights: [
            'ROI 清晰，因为它直接减少队列延迟和判断混乱。',
            '它和目录、售后、履约数据天然相连，不需要凭空造流程。',
            '需要小心边界，避免过早膨胀成一个泛化客服套件。',
          ],
        },
        {
          rank: '排名 03',
          title: '退货原因聚类工作流',
          score: '7.8/10',
          description:
            '把退货备注与售后记录聚成可重复原因簇，帮助团队看清哪些质量、选品或描述问题最值得优先处理。',
          audience: '退货量高、但没有时间逐单手读原因说明的售后与运营团队。',
          whyNow:
            '退货数据越来越丰富，但仍然足够混乱，所以聚类很有价值；只是从洞察走到具体动作的路径，通常比前两个切口更不稳定。',
          nextMove:
            '先验证团队更想要的是“洞察型看板”，还是直接与目录修复或售后分流动作绑定的执行入口。',
          highlights: [
            '这个痛点真实存在，因为退货会同时影响利润、体验和库存决策。',
            '聚类能力本身很强，但第一版可能还需要更明确的动作层。',
            '它更适合建立在清理与分流基础能力已经被信任之后。',
          ],
        },
      ],
      detailEyebrow: '为什么这些机会得分更高',
      detailTitle: '这些分数更偏好那些能减少重复运营审核、又不要求团队重写整套电商系统的切口。',
      detailDescription:
        '这里高分的想法不只是痛点强，还符合电商运营团队的采用方式：一个清晰队列问题、一个看得见的速度或质量收益，以及一个足够窄、可以先试起来的流程。',
      diagnosticColumns: [
        {
          title: '电商团队为什么会买',
          description:
            '当一个工具能缩短审核循环、减少清理工作，或让分流判断更清楚，又不增加新的运营负担时，价值会非常直观。',
        },
        {
          title: '什么因素会拉低得分',
          description:
            '电商工具栈已经很拥挤。任何需要太多流程改造、太多集成，或承诺过宽的产品，都更难在早期赢得团队信任。',
        },
        {
          title: '推荐的下一步',
          description:
            '优先访谈那些已经明显被目录修复或工单分流拖慢的运营团队，把第一切口定位成“更快处理 + 更清晰运营可见性”。',
        },
      ],
      faqEyebrow: '常见问题',
      faqTitle: '在阅读这份电商运营样例报告时，用户最常问什么',
      faqDescription:
        '这些问题会帮助访客理解这份样例到底证明了什么、为什么队列清理排在前面，以及如何在测试自己方向前使用它。',
      faqItems: [
        {
          question: '这份电商运营样例报告主要想证明什么？',
          answer:
            '它展示的是：产品如何把重复发生的电商队列拖拽转成一组可排序切口，让访客在输入自己方向前，先判断这套推理是否已经足够具体。',
        },
        {
          question: '为什么“目录清理”会排在宽泛电商 AI 前面？',
          answer:
            '因为它同时具备重复审核工作、清晰质量收益，以及足够窄的流程边界，能让团队在不重做整套平台的前提下先试起来。',
        },
        {
          question: '如果我的电商场景不同，这份样例还有参考价值吗？',
          answer:
            '有。把排序逻辑当成参照物来用。如果你的团队也在反复处理目录、售后或退货队列，就把你自己的买家与工作流带进去，看哪个切口得分最高。',
        },
      ],
      relatedColumns: [
        {
          title: '首页',
          description: '回到公开站总入口，重新比较整条产品路径，再决定是否分析你的电商方向。',
          href: '/zh',
          actionLabel: '返回首页',
        },
        {
          title: '电商运营场景页',
          description: '查看电商 use case 页面，理解为什么这些队列型工作流更容易长成产品切口。',
          href: '/zh/use-cases/ai-tools-for-ecommerce-operators',
          actionLabel: '查看场景页',
        },
        {
          title: 'AI 商业机会分析',
          description: '当你想把最有希望的电商切口放回更宽市场切片里比较时，进入更适合做排序的分析工作流。',
          href: '/zh/ai-business-opportunity-analysis',
          actionLabel: '进入分析工作流',
        },
      ],
      closing: {
        eyebrow: '分析你的电商方向',
        title: '把你自己的电商工作流和这份样例对照起来看。',
        description:
          '先用这份公开样例感受电商运营拖拽如何变成一组可排序切口，再分析你自己的方向，看是否会有别的队列、买家或审核瓶颈排在更前面。',
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
  ...EURO_EXAMPLE_PAGE_OVERRIDES,
}

export function getMarketingPageContent(
  locale: SeoLocale,
  pageKey: MarketingPageKey
): MarketingPageContent {
  const templateKind = PAGE_TEMPLATE_KIND[pageKey]
  const sharedFields = getLocaleValue(SHARED_FIELDS, locale)
  const heroFields = getPageLocaleValue(PAGE_HERO_FIELDS, locale, pageKey)
  const templateFields = getLocaleValue(TEMPLATE_FIELDS, locale)

  if (templateKind === 'home') {
    return {
      templateKind,
      props: localizeMarketingLinks({
        ...sharedFields,
        ...heroFields,
        ...templateFields.home,
      }, locale),
    }
  }

  if (templateKind === 'core') {
    const batch3CoreOverride =
      (BATCH3_CORE_PAGE_OVERRIDES[locale] ?? BATCH3_CORE_PAGE_OVERRIDES.en)?.[
        pageKey as keyof NonNullable<typeof BATCH3_CORE_PAGE_OVERRIDES.en>
      ] ?? {}
    const batch4CoreOverride =
      (BATCH4_CORE_PAGE_OVERRIDES[locale] ?? BATCH4_CORE_PAGE_OVERRIDES.en)?.[
        pageKey as keyof NonNullable<typeof BATCH4_CORE_PAGE_OVERRIDES.en>
      ] ?? {}
    const coreOverride = (CORE_PAGE_OVERRIDES[locale] ?? CORE_PAGE_OVERRIDES.en)?.[
      pageKey as CorePageKey
    ] ?? {}

    return {
      templateKind,
      props: localizeMarketingLinks({
        ...sharedFields,
        ...heroFields,
        ...templateFields.core,
        ...batch4CoreOverride,
        ...batch3CoreOverride,
        ...coreOverride,
      }, locale),
    }
  }

  if (templateKind === 'example') {
    const batch4ExampleOverride =
      (BATCH4_EXAMPLE_PAGE_OVERRIDES[locale] ?? BATCH4_EXAMPLE_PAGE_OVERRIDES.en)?.[
        pageKey as keyof NonNullable<typeof BATCH4_EXAMPLE_PAGE_OVERRIDES.en>
      ] ?? {}
    const exampleOverride = (EXAMPLE_PAGE_OVERRIDES[locale] ?? EXAMPLE_PAGE_OVERRIDES.en)?.[
      pageKey as ExamplePageKey
    ] ?? {}

    return {
      templateKind,
      props: localizeMarketingLinks({
        ...sharedFields,
        ...heroFields,
        ...templateFields.example,
        ...batch4ExampleOverride,
        ...exampleOverride,
      }, locale),
    }
  }

  return {
    templateKind,
    props: localizeMarketingLinks({
      ...sharedFields,
      ...heroFields,
      ...templateFields.example,
    }, locale),
  }
}
