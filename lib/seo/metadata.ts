import type { Metadata } from 'next'
import {
  ALL_SEO_LOCALES,
  getOpenGraphLocale,
  type SeoLocale,
} from '@/lib/seo/locales'

const DEFAULT_SITE_URL = 'http://localhost:3000'
export const SITE_NAME = 'BadgerSignal'
export const DEFAULT_OG_IMAGE_PATH = '/images/logo.jpg'
const X_DEFAULT_LOCALE: SeoLocale = 'en'

export type MarketingPageKey =
  | 'home'
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
  | 'examples-ai-tools-for-freelancers'
  | 'examples-ai-tools-for-small-business'
  | 'examples-ai-tools-for-recruiters'
  | 'examples-ai-tools-for-agencies'
  | 'examples-ai-tools-for-ecommerce-operations'
  | 'examples-ai-tools-for-customer-support-operations'

export const MARKETING_PAGE_KEYS: MarketingPageKey[] = [
  'home',
  'ai-startup-idea-generator',
  'saas-idea-validation',
  'ai-business-opportunity-analysis',
  'guides-how-to-validate-an-ai-startup-idea',
  'guides-how-to-prioritize-ai-business-opportunities',
  'guides-how-to-find-an-ai-saas-wedge',
  'comparisons-badgersignal-vs-chatgpt-for-startup-idea-validation',
  'comparisons-badgersignal-vs-manual-market-research',
  'comparisons-idea-generator-vs-opportunity-analysis',
  'use-cases-ai-tools-for-recruiters',
  'use-cases-ai-tools-for-agencies',
  'use-cases-ai-tools-for-ecommerce-operators',
  'use-cases-ai-tools-for-consultants',
  'examples-ai-tools-for-freelancers',
  'examples-ai-tools-for-small-business',
  'examples-ai-tools-for-recruiters',
  'examples-ai-tools-for-agencies',
  'examples-ai-tools-for-ecommerce-operations',
  'examples-ai-tools-for-customer-support-operations',
]

type LocalizedPageMeta = {
  title: string
  description: string
}

const PAGE_PATHS: Record<MarketingPageKey, (locale: SeoLocale) => string> = {
  home: (locale) => `/${locale}`,
  'ai-startup-idea-generator': (locale) => `/${locale}/ai-startup-idea-generator`,
  'saas-idea-validation': (locale) => `/${locale}/saas-idea-validation`,
  'ai-business-opportunity-analysis': (locale) =>
    `/${locale}/ai-business-opportunity-analysis`,
  'guides-how-to-validate-an-ai-startup-idea': (locale) =>
    `/${locale}/guides/how-to-validate-an-ai-startup-idea`,
  'guides-how-to-prioritize-ai-business-opportunities': (locale) =>
    `/${locale}/guides/how-to-prioritize-ai-business-opportunities`,
  'guides-how-to-find-an-ai-saas-wedge': (locale) =>
    `/${locale}/guides/how-to-find-an-ai-saas-wedge`,
  'comparisons-badgersignal-vs-chatgpt-for-startup-idea-validation': (locale) =>
    `/${locale}/comparisons/badgersignal-vs-chatgpt-for-startup-idea-validation`,
  'comparisons-badgersignal-vs-manual-market-research': (locale) =>
    `/${locale}/comparisons/badgersignal-vs-manual-market-research`,
  'comparisons-idea-generator-vs-opportunity-analysis': (locale) =>
    `/${locale}/comparisons/idea-generator-vs-opportunity-analysis`,
  'use-cases-ai-tools-for-recruiters': (locale) =>
    `/${locale}/use-cases/ai-tools-for-recruiters`,
  'use-cases-ai-tools-for-agencies': (locale) =>
    `/${locale}/use-cases/ai-tools-for-agencies`,
  'use-cases-ai-tools-for-ecommerce-operators': (locale) =>
    `/${locale}/use-cases/ai-tools-for-ecommerce-operators`,
  'use-cases-ai-tools-for-consultants': (locale) =>
    `/${locale}/use-cases/ai-tools-for-consultants`,
  'examples-ai-tools-for-freelancers': (locale) =>
    `/${locale}/examples/ai-tools-for-freelancers`,
  'examples-ai-tools-for-small-business': (locale) =>
    `/${locale}/examples/ai-tools-for-small-business`,
  'examples-ai-tools-for-recruiters': (locale) =>
    `/${locale}/examples/ai-tools-for-recruiters`,
  'examples-ai-tools-for-agencies': (locale) =>
    `/${locale}/examples/ai-tools-for-agencies`,
  'examples-ai-tools-for-ecommerce-operations': (locale) =>
    `/${locale}/examples/ai-tools-for-ecommerce-operations`,
  'examples-ai-tools-for-customer-support-operations': (locale) =>
    `/${locale}/examples/ai-tools-for-customer-support-operations`,
}

export function getMarketingPagePath(
  pageKey: MarketingPageKey,
  locale: SeoLocale
): string {
  return PAGE_PATHS[pageKey](locale)
}

const EN_ZH_SEO_LOCALES = ['en', 'zh'] as const

const MARKETING_PAGE_LOCALES: Record<MarketingPageKey, readonly SeoLocale[]> = {
  home: ALL_SEO_LOCALES,
  'ai-startup-idea-generator': ALL_SEO_LOCALES,
  'saas-idea-validation': ALL_SEO_LOCALES,
  'ai-business-opportunity-analysis': ALL_SEO_LOCALES,
  'guides-how-to-validate-an-ai-startup-idea': EN_ZH_SEO_LOCALES,
  'guides-how-to-prioritize-ai-business-opportunities': EN_ZH_SEO_LOCALES,
  'guides-how-to-find-an-ai-saas-wedge': EN_ZH_SEO_LOCALES,
  'comparisons-badgersignal-vs-chatgpt-for-startup-idea-validation': EN_ZH_SEO_LOCALES,
  'comparisons-badgersignal-vs-manual-market-research': EN_ZH_SEO_LOCALES,
  'comparisons-idea-generator-vs-opportunity-analysis': EN_ZH_SEO_LOCALES,
  'use-cases-ai-tools-for-recruiters': EN_ZH_SEO_LOCALES,
  'use-cases-ai-tools-for-agencies': EN_ZH_SEO_LOCALES,
  'use-cases-ai-tools-for-ecommerce-operators': EN_ZH_SEO_LOCALES,
  'use-cases-ai-tools-for-consultants': EN_ZH_SEO_LOCALES,
  'examples-ai-tools-for-freelancers': ALL_SEO_LOCALES,
  'examples-ai-tools-for-small-business': ALL_SEO_LOCALES,
  'examples-ai-tools-for-recruiters': EN_ZH_SEO_LOCALES,
  'examples-ai-tools-for-agencies': EN_ZH_SEO_LOCALES,
  'examples-ai-tools-for-ecommerce-operations': EN_ZH_SEO_LOCALES,
  'examples-ai-tools-for-customer-support-operations': EN_ZH_SEO_LOCALES,
}

export function getMarketingPageLocales(pageKey: MarketingPageKey): readonly SeoLocale[] {
  return MARKETING_PAGE_LOCALES[pageKey]
}

export function isMarketingPagePublishedForLocale(
  pageKey: MarketingPageKey,
  locale: SeoLocale
): boolean {
  return getMarketingPageLocales(pageKey).includes(locale)
}

const MARKETING_METADATA: Partial<Record<
  SeoLocale,
  Partial<Record<MarketingPageKey, LocalizedPageMeta>>
>> = {
  en: {
    home: {
      title: 'AI Startup Idea Generator and Opportunity Analysis',
      description:
        'Turn a product direction into 20+ evaluated opportunities with structured scoring, sample reports, and a faster AI startup research workflow.',
    },
    'ai-startup-idea-generator': {
      title: 'AI Startup Idea Generator for Evaluated Opportunities',
      description:
        'Explore AI startup directions, compare opportunity quality, and turn one product direction into 20+ evaluated ideas with clear scoring.',
    },
    'saas-idea-validation': {
      title: 'SaaS Idea Validation with Structured Opportunity Scoring',
      description:
        'Validate a SaaS direction with structured scoring, market-signal framing, and a ranked set of evaluated opportunities before you commit.',
    },
    'ai-business-opportunity-analysis': {
      title: 'AI Business Opportunity Analysis for Startup Directions',
      description:
        'Analyze a product direction with signal-backed opportunity scoring, structured evaluation, and public examples that show what good output looks like.',
    },
    'guides-how-to-validate-an-ai-startup-idea': {
      title: 'How to Validate an AI Startup Idea Before You Build',
      description:
        'Learn how to validate an AI startup idea with clearer wedge selection, repeated-pain checks, and a structured workflow before you commit product time.',
    },
    'guides-how-to-prioritize-ai-business-opportunities': {
      title: 'How to Prioritize AI Business Opportunities Clearly',
      description:
        'Learn how to prioritize AI business opportunities by repeated pain, willingness to pay, urgency, and implementation complexity before you build the wrong wedge.',
    },
    'guides-how-to-find-an-ai-saas-wedge': {
      title: 'How to Find an AI SaaS Wedge Before You Build',
      description:
        'Learn how to find an AI SaaS wedge by narrowing one market, spotting repeated workflow pain, and choosing a niche worth validating before you build.',
    },
    'comparisons-badgersignal-vs-chatgpt-for-startup-idea-validation': {
      title: 'BadgerSignal vs ChatGPT for AI Startup Idea Validation',
      description:
        'Compare BadgerSignal and ChatGPT for AI startup idea validation, structured scoring, repeatable ranking, and deciding when a wedge deserves deeper work.',
    },
    'comparisons-badgersignal-vs-manual-market-research': {
      title: 'BadgerSignal vs Manual Market Research for AI Wedges',
      description:
        'Compare BadgerSignal with manual market research to see when faster ranked opportunity analysis helps narrow the market before deeper interviews and calls.',
    },
    'comparisons-idea-generator-vs-opportunity-analysis': {
      title: 'Idea Generator vs Opportunity Analysis for AI Startups',
      description:
        'Compare idea generation and opportunity analysis to see when you need more candidate wedges, when you need prioritization, and which workflow fits your next decision.',
    },
    'use-cases-ai-tools-for-recruiters': {
      title: 'AI Tools for Recruiters and Hiring Workflow Operators',
      description:
        'Explore AI tools for recruiters through workflow pain, ranked product wedges, and a clearer path from interview notes to candidate follow-up.',
    },
    'use-cases-ai-tools-for-agencies': {
      title: 'AI Tools for Agencies and Client Delivery Workflows',
      description:
        'Explore AI tools for agencies through delivery friction, feedback loops, project handoffs, and ranked workflow wedges tied to margin and rework pain.',
    },
    'use-cases-ai-tools-for-ecommerce-operators': {
      title: 'AI Tools for Ecommerce Operators and Catalog Workflows',
      description:
        'Explore AI tools for ecommerce operators through catalog cleanup, support-routing friction, and ranked workflow wedges tied to resolution speed and operator drag.',
    },
    'use-cases-ai-tools-for-consultants': {
      title: 'AI Tools for Consultants and Client Follow-Up Workflows',
      description:
        'Explore AI tools for consultants through follow-up drafting, scope cleanup, and ranked client-service workflow wedges tied to repeated admin drag.',
    },
    'examples-ai-tools-for-freelancers': {
      title: 'AI Tools for Freelancers Sample Opportunity Report',
      description:
        'See a public sample report for AI tools for freelancers, including ranked opportunities, scoring logic, and what makes each direction promising.',
    },
    'examples-ai-tools-for-small-business': {
      title: 'AI Tools for Small Business Sample Opportunity Report',
      description:
        'Review a public sample report for AI tools for small businesses with ranked opportunities, evaluation logic, and practical product directions.',
    },
    'examples-ai-tools-for-recruiters': {
      title: 'AI Tools for Recruiters Sample Opportunity Report',
      description:
        'Read a public sample report for AI tools for recruiters with ranked workflow wedges, score logic, and why recruiting follow-up pain matters.',
    },
    'examples-ai-tools-for-agencies': {
      title: 'AI Tools for Agencies Sample Opportunity Report',
      description:
        'Read a public sample report for AI tools for agencies with ranked workflow wedges, margin-aware score logic, and concrete client-delivery opportunities.',
    },
    'examples-ai-tools-for-ecommerce-operations': {
      title: 'AI Tools for Ecommerce Operations Sample Opportunity Report',
      description:
        'Read a public sample report for ecommerce operations AI tools with ranked catalog, support, and returns wedges plus clear workflow scoring logic.',
    },
    'examples-ai-tools-for-customer-support-operations': {
      title: 'AI Tools for Customer Support Operations Sample Report',
      description:
        'Read a public sample report for customer support operations AI tools with ranked triage, routing, and escalation wedges plus clear queue-scoring logic.',
    },
  },
  zh: {
    home: {
      title: 'AI 创业点子生成与机会分析',
      description:
        '把产品方向转成 20+ 个经过评估的机会，查看结构化评分、样例报告，以及更快的 AI 创业研究流程。',
    },
    'ai-startup-idea-generator': {
      title: 'AI 创业点子生成器与机会评估',
      description:
        '围绕一个产品方向探索 AI 创业机会，获得 20+ 个经过评估和排序的方向，并快速比较哪些更值得优先验证。',
    },
    'saas-idea-validation': {
      title: 'SaaS 点子验证与结构化机会评分',
      description:
        '通过结构化评分、市场信号和机会排序来验证 SaaS 方向，在投入开发前先判断哪些方向更有价值。',
    },
    'ai-business-opportunity-analysis': {
      title: 'AI 商业机会分析与方向筛选',
      description:
        '基于产品方向进行 AI 商业机会分析，查看结构化评分、公开样例和更清晰的优先级判断。',
    },
    'guides-how-to-validate-an-ai-startup-idea': {
      title: '如何验证一个 AI 创业点子再决定是否投入',
      description:
        '学习如何验证 AI 创业点子，先检查重复痛点、切口优先级和结构化判断，再决定是否投入产品时间。',
    },
    'guides-how-to-prioritize-ai-business-opportunities': {
      title: '如何给 AI 商业机会排优先级',
      description:
        '学习如何根据重复痛点、付费意愿、紧迫度和实现复杂度，为 AI 商业机会排优先级，避免先做错方向。',
    },
    'guides-how-to-find-an-ai-saas-wedge': {
      title: '如何找到真正值得做的 AI SaaS 切口',
      description:
        '学习如何从一个更宽市场里收窄出 AI SaaS 切口，先抓重复工作流痛点，再决定哪个细分机会值得继续验证。',
    },
    'comparisons-badgersignal-vs-chatgpt-for-startup-idea-validation': {
      title: 'AI 创业点子验证：ChatGPT 对比',
      description:
        '对比 BadgerSignal 和 ChatGPT 在 AI 创业点子验证中的表现，理解结构化评分、机会排序和何时该继续深入。',
    },
    'comparisons-badgersignal-vs-manual-market-research': {
      title: 'AI 机会分析：人工调研对比',
      description:
        '对比 BadgerSignal 和人工市场调研，理解什么时候应该先用结构化机会分析收窄方向，什么时候再做更深的人工研究。',
    },
    'comparisons-idea-generator-vs-opportunity-analysis': {
      title: '点子生成器 vs 机会分析：什么时候用哪个',
      description:
        '对比创业点子生成器和机会分析，理解什么时候该先扩展更多切口，什么时候该把一个更宽空间压成可排序的优先列表。',
    },
    'use-cases-ai-tools-for-recruiters': {
      title: '招聘顾问与招聘运营场景的 AI 工具机会',
      description:
        '围绕招聘顾问和招聘运营的真实工作流痛点，查看 AI 工具机会、可排序切口，以及从面试记录到后续跟进的产品方向。',
    },
    'use-cases-ai-tools-for-agencies': {
      title: '面向代理公司与交付团队的 AI 工具机会',
      description:
        '围绕代理公司交付摩擦、客户反馈循环和项目交接，查看 AI 工具机会、可排序切口，以及更适合先验证的工作流方向。',
    },
    'use-cases-ai-tools-for-ecommerce-operators': {
      title: '面向电商运营与目录团队的 AI 工具机会',
      description:
        '围绕电商目录整理、售后分流和多渠道运营拖拽，查看 AI 工具机会、可排序切口，以及更适合先验证的工作流方向。',
    },
    'use-cases-ai-tools-for-consultants': {
      title: '面向顾问与独立咨询服务者的 AI 工具机会',
      description:
        '围绕会后跟进、scope 草稿和客户行动摘要等重复服务摩擦，查看 AI 工具机会、可排序切口，以及更适合先验证的顾问工作流方向。',
    },
    'examples-ai-tools-for-freelancers': {
      title: '自由职业者 AI 工具样例机会报告',
      description:
        '查看面向自由职业者的 AI 工具公开样例报告，了解机会排序、评分逻辑，以及这些方向为什么值得做。',
    },
    'examples-ai-tools-for-small-business': {
      title: '中小企业 AI 工具样例机会报告',
      description:
        '查看面向中小企业的 AI 工具公开样例报告，了解机会排序、评估逻辑，以及适合优先验证的产品方向。',
    },
    'examples-ai-tools-for-recruiters': {
      title: '招聘顾问 AI 工具样例机会报告',
      description:
        '查看面向招聘顾问与招聘团队的 AI 工具公开样例报告，了解招聘工作流切口如何排序以及为什么这些方向更值得优先验证。',
    },
    'examples-ai-tools-for-agencies': {
      title: '代理公司 AI 工具样例机会报告',
      description:
        '查看面向代理公司与交付团队的 AI 工具公开样例报告，了解交付工作流切口如何排序以及哪些方向更值得优先验证。',
    },
    'examples-ai-tools-for-ecommerce-operations': {
      title: '电商运营与目录工作流 AI 工具样例报告',
      description:
        '查看面向电商运营团队的 AI 工具公开样例报告，了解目录、退货和支持工作流切口如何排序，以及哪些方向更值得优先验证。',
    },
    'examples-ai-tools-for-customer-support-operations': {
      title: '客户支持运营 AI 工具样例机会报告',
      description:
        '查看客户支持运营 AI 工具公开样例报告，了解分流、投诉聚类和升级准备切口如何排序，以及哪些方向更值得先验证。',
    },
  },
  de: {
    home: {
      title: 'KI-Startup-Ideengenerator und Chancenanalyse',
      description:
        'Verwandle eine Produktrichtung in 20+ bewertete Chancen mit strukturierter Bewertung, Beispielberichten und einem schnelleren KI-Startup-Research-Workflow.',
    },
    'ai-startup-idea-generator': {
      title: 'KI-Startup-Ideengenerator für bewertete Chancen',
      description:
        'Erkunde KI-Startup-Richtungen, vergleiche Chancenqualität und verwandle eine Produktrichtung in 20+ bewertete Ideen mit klarer Bewertung.',
    },
    'saas-idea-validation': {
      title: 'SaaS-Ideenvalidierung mit strukturierter Chancenbewertung',
      description:
        'Validiere eine SaaS-Richtung mit strukturierter Bewertung, Marktsignalen und einer priorisierten Menge bewerteter Chancen, bevor du dich festlegst.',
    },
    'ai-business-opportunity-analysis': {
      title: 'KI-Geschäftschancenanalyse für Startup-Richtungen',
      description:
        'Analysiere eine Produktrichtung mit signalgestützter Chancenbewertung, strukturierter Auswertung und öffentlichen Beispielen mit nachvollziehbarem Output.',
    },
    'examples-ai-tools-for-freelancers': {
      title: 'Beispielbericht zu KI-Tools für Freelancer',
      description:
        'Sieh dir einen öffentlichen Beispielbericht zu KI-Tools für Freelancer mit priorisierten Chancen, Bewertungslogik und vielversprechenden Richtungen an.',
    },
    'examples-ai-tools-for-small-business': {
      title: 'Beispielbericht zu KI-Tools für kleine Unternehmen',
      description:
        'Prüfe einen öffentlichen Beispielbericht zu KI-Tools für kleine Unternehmen mit priorisierten Chancen, Bewertungslogik und praktischen Produktrichtungen.',
    },
  },
  fr: {
    home: {
      title: "Générateur d'idées de startup IA et analyse d'opportunités",
      description:
        "Transformez une direction produit en 20+ opportunités évaluées grâce à une notation structurée, des rapports d'exemple et un workflow de recherche startup IA plus rapide.",
    },
    'ai-startup-idea-generator': {
      title: "Générateur d'idées de startup IA pour opportunités évaluées",
      description:
        "Explorez des directions de startup IA, comparez la qualité des opportunités et transformez une direction produit en 20+ idées évaluées avec une notation claire.",
    },
    'saas-idea-validation': {
      title: "Validation d'idée SaaS avec notation structurée des opportunités",
      description:
        "Validez une direction SaaS avec une notation structurée, des signaux de marché et un ensemble classé d'opportunités évaluées avant de vous engager.",
    },
    'ai-business-opportunity-analysis': {
      title: "Analyse d'opportunités business IA pour directions startup",
      description:
        "Analysez une direction produit avec une notation des opportunités appuyée par des signaux, une évaluation structurée et des exemples publics montrant un bon niveau de sortie.",
    },
    'examples-ai-tools-for-freelancers': {
      title: "Rapport d'exemple d'opportunités IA pour freelances",
      description:
        "Consultez un rapport d'exemple public pour des outils IA destinés aux freelances, avec opportunités classées, logique de scoring et pistes les plus prometteuses.",
    },
    'examples-ai-tools-for-small-business': {
      title: "Rapport d'exemple d'opportunités IA pour petites entreprises",
      description:
        "Consultez un rapport d'exemple public pour des outils IA destinés aux petites entreprises, avec opportunités classées, logique d'évaluation et directions produit concrètes.",
    },
  },
  it: {
    home: {
      title: 'Generatore di idee startup AI e analisi delle opportunita',
      description:
        'Trasforma una direzione di prodotto in 20+ opportunita valutate con punteggi strutturati, report di esempio e un workflow di ricerca startup AI piu rapido.',
    },
    'ai-startup-idea-generator': {
      title: 'Generatore di idee startup AI per opportunita valutate',
      description:
        'Esplora direzioni startup AI, confronta la qualita delle opportunita e trasforma una direzione di prodotto in 20+ idee valutate con punteggi chiari.',
    },
    'saas-idea-validation': {
      title: 'Validazione SaaS con punteggio delle opportunita',
      description:
        'Valida una direzione SaaS con punteggi strutturati, segnali di mercato e un insieme ordinato di opportunita valutate prima di impegnarti.',
    },
    'ai-business-opportunity-analysis': {
      title: 'Analisi delle opportunita di business AI per direzioni startup',
      description:
        'Analizza una direzione di prodotto con scoring delle opportunita basato sui segnali, valutazione strutturata ed esempi pubblici che mostrano un output convincente.',
    },
    'examples-ai-tools-for-freelancers': {
      title: 'Report di esempio su strumenti AI per freelance',
      description:
        'Consulta un report pubblico di esempio su strumenti AI per freelance con opportunita classificate, logica di valutazione e direzioni piu promettenti.',
    },
    'examples-ai-tools-for-small-business': {
      title: 'Report di esempio su strumenti AI per piccole imprese',
      description:
        'Esamina un report pubblico di esempio su strumenti AI per piccole imprese con opportunita classificate, logica di valutazione e direzioni di prodotto pratiche.',
    },
  },
  es: {
    home: {
      title: 'Generador de ideas de startups con IA y analisis de oportunidades',
      description:
        'Convierte una direccion de producto en 20+ oportunidades evaluadas con puntuacion estructurada, reportes de ejemplo y un flujo de investigacion de startups con IA mas rapido.',
    },
    'ai-startup-idea-generator': {
      title: 'Generador de ideas startup IA con oportunidades evaluadas',
      description:
        'Explora direcciones de startups con IA, compara la calidad de las oportunidades y convierte una direccion de producto en 20+ ideas evaluadas con puntuacion clara.',
    },
    'saas-idea-validation': {
      title: 'Validacion SaaS con puntuacion de oportunidades',
      description:
        'Valida una direccion SaaS con puntuacion estructurada, senales de mercado y un conjunto priorizado de oportunidades evaluadas antes de comprometerte.',
    },
    'ai-business-opportunity-analysis': {
      title: 'Analisis de oportunidades IA para startups',
      description:
        'Analiza una direccion de producto con puntuacion de oportunidades basada en senales, evaluacion estructurada y ejemplos publicos que muestran un buen resultado.',
    },
    'examples-ai-tools-for-freelancers': {
      title: 'Reporte de ejemplo de herramientas IA para freelancers',
      description:
        'Consulta un reporte publico de ejemplo de herramientas IA para freelancers con oportunidades priorizadas, logica de evaluacion y direcciones prometedoras.',
    },
    'examples-ai-tools-for-small-business': {
      title: 'Reporte de ejemplo de herramientas IA para pequenas empresas',
      description:
        'Revisa un reporte publico de ejemplo de herramientas IA para pequenas empresas con oportunidades priorizadas, logica de evaluacion y direcciones de producto practicas.',
    },
  },
  pt: {
    home: {
      title: 'Gerador de ideias de startup com IA e analise de oportunidades',
      description:
        'Transforme uma direcao de produto em 20+ oportunidades avaliadas com pontuacao estruturada, relatorios de exemplo e um fluxo de pesquisa de startups com IA mais rapido.',
    },
    'ai-startup-idea-generator': {
      title: 'Gerador de ideias de startup com IA para oportunidades avaliadas',
      description:
        'Explore direcoes de startup com IA, compare a qualidade das oportunidades e transforme uma direcao de produto em 20+ ideias avaliadas com pontuacao clara.',
    },
    'saas-idea-validation': {
      title: 'Validacao SaaS com pontuacao de oportunidades',
      description:
        'Valide uma direcao SaaS com pontuacao estruturada, sinais de mercado e um conjunto priorizado de oportunidades avaliadas antes de se comprometer.',
    },
    'ai-business-opportunity-analysis': {
      title: 'Analise de oportunidades IA para startups',
      description:
        'Analise uma direcao de produto com scoring de oportunidades orientado por sinais, avaliacao estruturada e exemplos publicos que mostram um bom tipo de resultado.',
    },
    'examples-ai-tools-for-freelancers': {
      title: 'Relatorio de exemplo de ferramentas de IA para freelancers',
      description:
        'Veja um relatorio publico de exemplo de ferramentas de IA para freelancers com oportunidades ranqueadas, logica de avaliacao e direcoes promissoras.',
    },
    'examples-ai-tools-for-small-business': {
      title: 'Relatorio de exemplo de ferramentas de IA para pequenas empresas',
      description:
        'Confira um relatorio publico de exemplo de ferramentas de IA para pequenas empresas com oportunidades ranqueadas, logica de avaliacao e direcoes praticas de produto.',
    },
  },
}

function normalizeOrigin(rawUrl: string | undefined): URL | null {
  if (!rawUrl?.trim()) {
    return null
  }

  try {
    return new URL(new URL(rawUrl).origin)
  } catch {
    return null
  }
}

function isLocalHostname(hostname: string): boolean {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0' || hostname === '::1'
}

function shouldEnforceProductionOrigin(): boolean {
  return (
    process.env.VERCEL_ENV === 'production' ||
    process.env.APP_ENV === 'production' ||
    process.env.DEPLOYMENT_ENV === 'production'
  )
}

export function getSiteUrl(): URL {
  const appUrl = normalizeOrigin(process.env.NEXT_PUBLIC_APP_URL)
  const authUrl = normalizeOrigin(process.env.NEXTAUTH_URL)

  if (shouldEnforceProductionOrigin()) {
    if (!appUrl) {
      throw new Error(
        'NEXT_PUBLIC_APP_URL must be a valid absolute HTTPS URL in production.'
      )
    }

    if (!authUrl) {
      throw new Error('NEXTAUTH_URL must be a valid absolute HTTPS URL in production.')
    }

    if (appUrl.protocol !== 'https:' || authUrl.protocol !== 'https:') {
      throw new Error('NEXT_PUBLIC_APP_URL and NEXTAUTH_URL must use HTTPS in production.')
    }

    if (isLocalHostname(appUrl.hostname) || isLocalHostname(authUrl.hostname)) {
      throw new Error(
        'NEXT_PUBLIC_APP_URL and NEXTAUTH_URL cannot point to localhost in production.'
      )
    }

    if (appUrl.origin !== authUrl.origin) {
      throw new Error(
        `NEXT_PUBLIC_APP_URL (${appUrl.origin}) and NEXTAUTH_URL (${authUrl.origin}) must share the same origin in production.`
      )
    }

    return appUrl
  }

  return appUrl ?? authUrl ?? new URL(DEFAULT_SITE_URL)
}

function getAbsoluteUrl(path: string): string {
  return new URL(path, getSiteUrl()).toString()
}

export const siteRootMetadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: SITE_NAME,
  description: 'Structured AI startup idea generation, validation, and opportunity analysis.',
  applicationName: SITE_NAME,
  generator: SITE_NAME,
  icons: {
    icon: '/images/logo.jpg',
    apple: '/images/logo.jpg',
  },
  openGraph: {
    siteName: SITE_NAME,
    type: 'website',
    images: [
      {
        url: getAbsoluteUrl(DEFAULT_OG_IMAGE_PATH),
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [getAbsoluteUrl(DEFAULT_OG_IMAGE_PATH)],
  },
}

export function buildNoIndexMetadata(title: string, description?: string): Metadata {
  return {
    title: `${title} | ${SITE_NAME}`,
    ...(description ? { description } : {}),
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
  }
}

export function buildMarketingMetadata(
  locale: SeoLocale,
  pageKey: MarketingPageKey
): Metadata {
  const localizedMeta = MARKETING_METADATA[locale]?.[pageKey] ?? MARKETING_METADATA.en?.[pageKey]
  if (!localizedMeta) {
    throw new Error(`Missing localized metadata for ${locale}:${pageKey}`)
  }
  const canonicalPath = getMarketingPagePath(pageKey, locale)
  const fullTitle = `${localizedMeta.title} | ${SITE_NAME}`
  const publishedLocales = getMarketingPageLocales(pageKey)
  const languageAlternates = Object.fromEntries(
    publishedLocales.map((alternateLocale) => [
      alternateLocale,
      getAbsoluteUrl(getMarketingPagePath(pageKey, alternateLocale)),
    ])
  )

  return {
    title: fullTitle,
    description: localizedMeta.description,
    alternates: {
      canonical: getAbsoluteUrl(canonicalPath),
      languages: {
        ...languageAlternates,
        'x-default': getAbsoluteUrl(getMarketingPagePath(pageKey, X_DEFAULT_LOCALE)),
      },
    },
    openGraph: {
      title: fullTitle,
      description: localizedMeta.description,
      url: getAbsoluteUrl(canonicalPath),
      siteName: SITE_NAME,
      locale: getOpenGraphLocale(locale),
      type: 'website',
      images: [
        {
          url: getAbsoluteUrl(DEFAULT_OG_IMAGE_PATH),
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: localizedMeta.description,
      images: [getAbsoluteUrl(DEFAULT_OG_IMAGE_PATH)],
    },
  }
}
