import type {
  CoreLandingTemplateProps,
  HomepageTemplateProps,
  PublicExampleTemplateProps,
} from '@/components/marketing/marketing-page-templates'
import { EURO_CORE_PAGE_OVERRIDES } from '@/lib/marketing-content-core-eu'
import { EURO_EXAMPLE_PAGE_OVERRIDES } from '@/lib/marketing-content-example-eu'
import { EURO_TEMPLATE_FIELDS } from '@/lib/marketing-content-template-eu'
import { ALL_SEO_LOCALES, type SeoLocale } from '@/lib/seo/locales'
import {
  MARKETING_PAGE_KEYS,
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
type ExamplePageKey =
  | 'examples-ai-tools-for-freelancers'
  | 'examples-ai-tools-for-small-business'

type MarketingPageContent =
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
  'examples-ai-tools-for-freelancers': 'example',
  'examples-ai-tools-for-small-business': 'example',
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
    MARKETING_PAGE_KEYS.map((pageKey) => [getMarketingPagePath(pageKey, locale), pageKey] as const)
  )
)

function localizeMarketingHref(href: string, locale: SeoLocale): string {
  const pageKey = MARKETING_PATH_TO_PAGE_KEY.get(href)
  return pageKey ? getMarketingPagePath(pageKey, locale) : href
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
      { value: '2', label: 'Public examples' },
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
      { value: '2', label: '公开样例' },
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
          title: 'Sample report: freelancers',
          description:
            'Inspect a public example for AI tools built around freelancer workflows, ranked outputs, and scenario fit.',
          href: '/en/examples/ai-tools-for-freelancers',
          actionLabel: 'View freelancer sample',
        },
        {
          title: 'Sample report: small business',
          description:
            'Review a public sample focused on practical AI opportunities for small businesses before trying your own direction.',
          href: '/en/examples/ai-tools-for-small-business',
          actionLabel: 'View small-business sample',
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
          title: '样例报告：自由职业者',
          description: '先看一个面向自由职业者场景的公开样例，了解输出结构、排序逻辑和场景贴合度。',
          href: '/zh/examples/ai-tools-for-freelancers',
          actionLabel: '查看自由职业者样例',
        },
        {
          title: '样例报告：中小企业',
          description: '查看一个面向中小企业的公开样例报告，再决定是否分析自己的方向。',
          href: '/zh/examples/ai-tools-for-small-business',
          actionLabel: '查看中小企业样例',
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
      ],
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Go back to the main hub and compare the full public journey before you commit.',
          href: '/en',
          actionLabel: 'Back to homepage',
        },
        {
          title: 'SaaS idea validation',
          description: 'Take one promising wedge into the workflow that pressures a candidate idea more directly.',
          href: '/en/saas-idea-validation',
          actionLabel: 'Open validation page',
        },
        {
          title: 'Freelancer sample report',
          description: 'See a public report that turns ranked opportunities into a concrete market example.',
          href: '/en/examples/ai-tools-for-freelancers',
          actionLabel: 'View freelancer sample',
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
      ],
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Return to the public hub if you want to compare the rest of the workflows first.',
          href: '/en',
          actionLabel: 'Back to homepage',
        },
        {
          title: 'AI business opportunity analysis',
          description: 'Step back one level if you still need to compare multiple wedges inside a broader market.',
          href: '/en/ai-business-opportunity-analysis',
          actionLabel: 'View analysis page',
        },
        {
          title: 'Freelancer sample report',
          description: 'Review a public sample to compare how ranked opportunities look in a real scenario.',
          href: '/en/examples/ai-tools-for-freelancers',
          actionLabel: 'View freelancer sample',
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
      ],
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Go back to the main hub if you want to compare the public workflows side by side.',
          href: '/en',
          actionLabel: 'Back to homepage',
        },
        {
          title: 'SaaS idea validation',
          description: 'Move the strongest wedge into a tighter decision workflow once you know what to test.',
          href: '/en/saas-idea-validation',
          actionLabel: 'Open validation page',
        },
        {
          title: 'Small-business sample report',
          description: 'Compare the analysis workflow with a public report built around owner-led operations.',
          href: '/en/examples/ai-tools-for-small-business',
          actionLabel: 'View small-business sample',
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
          label: 'View Sample Report',
          href: '/en/examples/ai-tools-for-small-business',
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
      ],
      relatedColumns: [
        {
          title: '首页',
          description: '回到公开站总入口，重新比较整个公开路径之后再决定下一步。',
          href: '/zh',
          actionLabel: '返回首页',
        },
        {
          title: 'SaaS 点子验证',
          description: '把更有希望的切口带到更聚焦的验证工作流里继续判断。',
          href: '/zh/saas-idea-validation',
          actionLabel: '进入验证页面',
        },
        {
          title: '自由职业者样例报告',
          description: '看一份公开报告，感受机会排序如何落到真实场景中。',
          href: '/zh/examples/ai-tools-for-freelancers',
          actionLabel: '查看自由职业者样例',
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
      ],
      relatedColumns: [
        {
          title: '首页',
          description: '如果你还想先横向比较全部公开工作流，可以先回到总入口。',
          href: '/zh',
          actionLabel: '返回首页',
        },
        {
          title: 'AI 商业机会分析',
          description: '如果还没确定要压哪个切口，就先回到更宽空间里继续比较机会。',
          href: '/zh/ai-business-opportunity-analysis',
          actionLabel: '查看分析页面',
        },
        {
          title: '自由职业者样例报告',
          description: '对照一份公开样例，看看真实场景下的机会排序长什么样。',
          href: '/zh/examples/ai-tools-for-freelancers',
          actionLabel: '查看自由职业者样例',
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
      ],
      relatedColumns: [
        {
          title: '首页',
          description: '回到公开站总入口，重新比较各条公开路径再决定下一步。',
          href: '/zh',
          actionLabel: '返回首页',
        },
        {
          title: 'SaaS 点子验证',
          description: '一旦选出最强切口，就进入更聚焦的验证工作流继续判断。',
          href: '/zh/saas-idea-validation',
          actionLabel: '进入验证页面',
        },
        {
          title: '中小企业样例报告',
          description: '看看一份围绕老板主导型运营场景的公开样例是如何展开的。',
          href: '/zh/examples/ai-tools-for-small-business',
          actionLabel: '查看中小企业样例',
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
          label: '查看样例报告',
          href: '/zh/examples/ai-tools-for-small-business',
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
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Return to the public hub to compare the rest of the product journeys in one place.',
          href: '/en',
          actionLabel: 'Back to homepage',
        },
        {
          title: 'AI startup idea generator',
          description: 'See how the product expands one market direction into multiple startup wedges before validation.',
          href: '/en/ai-startup-idea-generator',
          actionLabel: 'Explore generator page',
        },
        {
          title: 'SaaS idea validation',
          description: 'Open the tighter workflow that judges whether one candidate wedge deserves more effort.',
          href: '/en/saas-idea-validation',
          actionLabel: 'Open validation page',
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
      relatedColumns: [
        {
          title: 'Homepage',
          description: 'Go back to the public hub and compare the other workflows before running your own analysis.',
          href: '/en',
          actionLabel: 'Back to homepage',
        },
        {
          title: 'AI business opportunity analysis',
          description: 'Inspect the workflow that ranks multiple wedges inside a broader market before deeper validation.',
          href: '/en/ai-business-opportunity-analysis',
          actionLabel: 'View analysis page',
        },
        {
          title: 'SaaS idea validation',
          description: 'Move a promising small-business wedge into a tighter decision workflow once it stands out.',
          href: '/en/saas-idea-validation',
          actionLabel: 'Open validation page',
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
      relatedColumns: [
        {
          title: '首页',
          description: '回到公开站总入口，在一个页面里重新比较其他公开路径。',
          href: '/zh',
          actionLabel: '返回首页',
        },
        {
          title: 'AI 创业点子生成器',
          description: '看产品如何把一个市场方向扩展成多个创业切口，再决定往哪条线继续。',
          href: '/zh/ai-startup-idea-generator',
          actionLabel: '查看生成器页面',
        },
        {
          title: 'SaaS 点子验证',
          description: '进入更聚焦的工作流，判断某一个候选切口是否值得继续投入。',
          href: '/zh/saas-idea-validation',
          actionLabel: '进入验证页面',
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
      relatedColumns: [
        {
          title: '首页',
          description: '回到公开站总入口，重新比较其他公开工作流之后再决定要不要试用。',
          href: '/zh',
          actionLabel: '返回首页',
        },
        {
          title: 'AI 商业机会分析',
          description: '查看那个更适合从宽空间中筛出优先切口的分析工作流。',
          href: '/zh/ai-business-opportunity-analysis',
          actionLabel: '查看分析页面',
        },
        {
          title: 'SaaS 点子验证',
          description: '当某个中小企业切口已经更明确时，进入更聚焦的验证工作流继续判断。',
          href: '/zh/saas-idea-validation',
          actionLabel: '进入验证页面',
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
    const coreOverride = (CORE_PAGE_OVERRIDES[locale] ?? CORE_PAGE_OVERRIDES.en)?.[
      pageKey as CorePageKey
    ] ?? {}

    return {
      templateKind,
      props: localizeMarketingLinks({
        ...sharedFields,
        ...heroFields,
        ...templateFields.core,
        ...coreOverride,
      }, locale),
    }
  }

  if (templateKind === 'example') {
    const exampleOverride = (EXAMPLE_PAGE_OVERRIDES[locale] ?? EXAMPLE_PAGE_OVERRIDES.en)?.[
      pageKey as ExamplePageKey
    ] ?? {}

    return {
      templateKind,
      props: localizeMarketingLinks({
        ...sharedFields,
        ...heroFields,
        ...templateFields.example,
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
