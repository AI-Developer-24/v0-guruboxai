import type { Metadata } from 'next'
import {
  ALL_SEO_LOCALES,
  getOpenGraphLocale,
  type SeoLocale,
} from '@/lib/seo/locales'

const DEFAULT_SITE_URL = 'http://localhost:3000'
const SITE_NAME = 'BadgerSignal'
const DEFAULT_OG_IMAGE_PATH = '/images/logo.jpg'

export type MarketingPageKey =
  | 'home'
  | 'ai-startup-idea-generator'
  | 'saas-idea-validation'
  | 'ai-business-opportunity-analysis'
  | 'examples-ai-tools-for-freelancers'
  | 'examples-ai-tools-for-small-business'

export const MARKETING_PAGE_KEYS: MarketingPageKey[] = [
  'home',
  'ai-startup-idea-generator',
  'saas-idea-validation',
  'ai-business-opportunity-analysis',
  'examples-ai-tools-for-freelancers',
  'examples-ai-tools-for-small-business',
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
  'examples-ai-tools-for-freelancers': (locale) =>
    `/${locale}/examples/ai-tools-for-freelancers`,
  'examples-ai-tools-for-small-business': (locale) =>
    `/${locale}/examples/ai-tools-for-small-business`,
}

export function getMarketingPagePath(
  pageKey: MarketingPageKey,
  locale: SeoLocale
): string {
  return PAGE_PATHS[pageKey](locale)
}

const MARKETING_METADATA: Record<
  SeoLocale,
  Record<MarketingPageKey, LocalizedPageMeta>
> = {
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
      title: 'Validazione di idee SaaS con punteggio strutturato delle opportunita',
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
      title: 'Generador de ideas de startups con IA para oportunidades evaluadas',
      description:
        'Explora direcciones de startups con IA, compara la calidad de las oportunidades y convierte una direccion de producto en 20+ ideas evaluadas con puntuacion clara.',
    },
    'saas-idea-validation': {
      title: 'Validacion de ideas SaaS con puntuacion estructurada de oportunidades',
      description:
        'Valida una direccion SaaS con puntuacion estructurada, senales de mercado y un conjunto priorizado de oportunidades evaluadas antes de comprometerte.',
    },
    'ai-business-opportunity-analysis': {
      title: 'Analisis de oportunidades de negocio con IA para direcciones startup',
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
      title: 'Validacao de ideia SaaS com pontuacao estruturada de oportunidades',
      description:
        'Valide uma direcao SaaS com pontuacao estruturada, sinais de mercado e um conjunto priorizado de oportunidades avaliadas antes de se comprometer.',
    },
    'ai-business-opportunity-analysis': {
      title: 'Analise de oportunidades de negocio com IA para direcoes de startup',
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

export function getSiteUrl(): URL {
  const rawSiteUrl = process.env.NEXT_PUBLIC_APP_URL || DEFAULT_SITE_URL

  try {
    const parsed = new URL(rawSiteUrl)
    return new URL(parsed.origin)
  } catch {
    return new URL(DEFAULT_SITE_URL)
  }
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
  const localizedMeta = MARKETING_METADATA[locale][pageKey]
  const canonicalPath = getMarketingPagePath(pageKey, locale)
  const fullTitle = `${localizedMeta.title} | ${SITE_NAME}`
  const languageAlternates = Object.fromEntries(
    ALL_SEO_LOCALES.map((alternateLocale) => [
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
        'x-default': getAbsoluteUrl('/'),
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
