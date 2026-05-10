'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Globe, Check, ArrowRight } from 'lucide-react'
import { useI18n } from '@/components/i18n/i18n-provider'
import { useAuth } from '@/components/auth/auth-provider'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SUPPORTED_LANGUAGES } from '@/lib/constants'
import { api, ApiError } from '@/lib/api/client'
import { toast } from 'sonner'
import type { Language } from '@/lib/types'
import { translations } from '@/lib/translations'
import { getMarketingPagePath, type MarketingPageKey } from '@/lib/seo/metadata'
import { type SeoLocale } from '@/lib/seo/locales'
import { getMarketingRouteState } from '@/lib/seo/marketing-shell'
import { cn } from '@/lib/utils'

const MARKETING_FOOTER_COPY: Record<
  SeoLocale,
  {
    tagline: string
    product: string
    examples: string
    company: string
    startAnalysis: string
    home: string
    generator: string
    validation: string
    analysis: string
    freelancers: string
    smallBusiness: string
  }
> = {
  en: {
    tagline:
      'Structured AI startup research with public examples, clearer workflows, and a faster path from search intent to product use.',
    product: 'Product',
    examples: 'Examples',
    company: 'Company',
    startAnalysis: 'Start Analysis',
    home: 'Home',
    generator: 'AI Startup Idea Generator',
    validation: 'SaaS Idea Validation',
    analysis: 'AI Opportunity Analysis',
    freelancers: 'Freelancer sample report',
    smallBusiness: 'Small-business sample report',
  },
  zh: {
    tagline:
      '把 AI 创业研究、公开样例和更清晰的工作流放进同一个公开站点，让搜索访客更快理解产品并进入使用。',
    product: '产品',
    examples: '样例',
    company: '公司',
    startAnalysis: '开始分析',
    home: '首页',
    generator: 'AI 创业点子生成器',
    validation: 'SaaS 点子验证',
    analysis: 'AI 商业机会分析',
    freelancers: '自由职业者样例报告',
    smallBusiness: '中小企业样例报告',
  },
  de: {
    tagline:
      'Strukturierte KI-Startup-Recherche mit offentlichen Beispielen, klareren Workflows und einem schnelleren Weg von Suchintention zu Produktnutzung.',
    product: 'Produkt',
    examples: 'Beispiele',
    company: 'Unternehmen',
    startAnalysis: 'Analyse starten',
    home: 'Start',
    generator: 'KI-Startup-Ideengenerator',
    validation: 'SaaS-Ideenvalidierung',
    analysis: 'KI-Chancenanalyse',
    freelancers: 'Freelancer-Beispielbericht',
    smallBusiness: 'Beispielbericht kleine Unternehmen',
  },
  fr: {
    tagline:
      "Une recherche startup IA structuree, des exemples publics, des workflows plus clairs et un chemin plus rapide de l'intention de recherche vers l'usage produit.",
    product: 'Produit',
    examples: 'Exemples',
    company: 'Entreprise',
    startAnalysis: "Lancer l'analyse",
    home: 'Accueil',
    generator: 'Generateur startup IA',
    validation: "Validation d'idee SaaS",
    analysis: "Analyse d'opportunites IA",
    freelancers: "Rapport d'exemple freelance",
    smallBusiness: "Rapport d'exemple petite entreprise",
  },
  it: {
    tagline:
      "Ricerca startup AI strutturata con esempi pubblici, workflow piu chiari e un percorso piu rapido dall'intento di ricerca all'uso del prodotto.",
    product: 'Prodotto',
    examples: 'Esempi',
    company: 'Azienda',
    startAnalysis: 'Avvia analisi',
    home: 'Home',
    generator: 'Generatore startup AI',
    validation: 'Validazione idea SaaS',
    analysis: 'Analisi opportunita AI',
    freelancers: 'Report di esempio freelance',
    smallBusiness: 'Report di esempio piccole imprese',
  },
  es: {
    tagline:
      'Investigacion de startups con IA estructurada con ejemplos publicos, flujos mas claros y un camino mas rapido desde la busqueda hasta el uso del producto.',
    product: 'Producto',
    examples: 'Ejemplos',
    company: 'Empresa',
    startAnalysis: 'Iniciar analisis',
    home: 'Inicio',
    generator: 'Generador de startups IA',
    validation: 'Validacion SaaS',
    analysis: 'Analisis de oportunidades IA',
    freelancers: 'Reporte de ejemplo freelance',
    smallBusiness: 'Reporte de ejemplo pequenas empresas',
  },
  pt: {
    tagline:
      'Pesquisa estruturada de startups com IA com exemplos publicos, fluxos mais claros e um caminho mais rapido da intencao de busca ao uso do produto.',
    product: 'Produto',
    examples: 'Exemplos',
    company: 'Empresa',
    startAnalysis: 'Iniciar analise',
    home: 'Inicio',
    generator: 'Gerador de startups IA',
    validation: 'Validacao SaaS',
    analysis: 'Analise de oportunidades IA',
    freelancers: 'Relatorio de exemplo freelancer',
    smallBusiness: 'Relatorio de exemplo pequenas empresas',
  },
}

const MARKETING_FOOTER_PAGE_KEYS = {
  home: 'home',
  generator: 'ai-startup-idea-generator',
  validation: 'saas-idea-validation',
  analysis: 'ai-business-opportunity-analysis',
  freelancers: 'examples-ai-tools-for-freelancers',
  smallBusiness: 'examples-ai-tools-for-small-business',
} satisfies Record<string, MarketingPageKey>

export function Footer() {
  const pathname = usePathname()
  const marketingRoute = getMarketingRouteState(pathname)
  const { t, locale, setLocale: setI18nLocale } = useI18n()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const year = new Date().getFullYear()
  const uiLocale = marketingRoute.isMarketingRoute ? marketingRoute.locale : locale
  const uiTranslations = translations[uiLocale] ?? translations.en
  const marketingCopy = MARKETING_FOOTER_COPY[marketingRoute.locale]
  const activeMarketingPage = marketingRoute.pageKey ?? 'home'

  async function handleLanguageChange(code: string) {
    const newLocale = code as Language
    if (newLocale === locale) return

    setLoading(true)
    try {
      if (user) {
        await api.put('/users/language', { language: newLocale })
      }

      setI18nLocale(newLocale)
      toast.success(translations[newLocale]?.language_updated || 'Language updated')
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message || t('error_language_update') || 'Failed to update language')
      } else {
        toast.error(t('error_language_update') || 'Failed to update language')
      }
    } finally {
      setLoading(false)
    }
  }

  if (!marketingRoute.isMarketingRoute) {
    return (
      <footer className="border-border/50 bg-card/40 relative z-10 mt-auto border-t backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-6 sm:flex-row sm:justify-between">
          <p className="text-muted-foreground text-xs">
            &copy; {year} {uiTranslations.footer_copyright}
          </p>
          <nav className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-foreground text-xs transition-colors"
            >
              {uiTranslations.footer_privacy}
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-foreground text-xs transition-colors"
            >
              {uiTranslations.footer_terms}
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger
                className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-xs transition-colors focus:outline-none disabled:opacity-50"
                disabled={loading}
              >
                <Globe className="size-3.5" />
                <span className="hidden sm:inline">
                  {SUPPORTED_LANGUAGES.find((l) => l.code === locale)?.label || 'Language'}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className="gap-2"
                  >
                    {locale === lang.code && <Check className="size-3.5" />}
                    <span className={locale === lang.code ? '' : 'pl-5'}>{lang.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </footer>
    )
  }

  const productLinks = [
    {
      label: marketingCopy.home,
      href: getMarketingPagePath(MARKETING_FOOTER_PAGE_KEYS.home, marketingRoute.locale),
      isActive: activeMarketingPage === MARKETING_FOOTER_PAGE_KEYS.home,
    },
    {
      label: marketingCopy.generator,
      href: getMarketingPagePath(MARKETING_FOOTER_PAGE_KEYS.generator, marketingRoute.locale),
      isActive: activeMarketingPage === MARKETING_FOOTER_PAGE_KEYS.generator,
    },
    {
      label: marketingCopy.validation,
      href: getMarketingPagePath(MARKETING_FOOTER_PAGE_KEYS.validation, marketingRoute.locale),
      isActive: activeMarketingPage === MARKETING_FOOTER_PAGE_KEYS.validation,
    },
    {
      label: marketingCopy.analysis,
      href: getMarketingPagePath(MARKETING_FOOTER_PAGE_KEYS.analysis, marketingRoute.locale),
      isActive: activeMarketingPage === MARKETING_FOOTER_PAGE_KEYS.analysis,
    },
  ]

  const exampleLinks = [
    {
      label: marketingCopy.freelancers,
      href: getMarketingPagePath(MARKETING_FOOTER_PAGE_KEYS.freelancers, marketingRoute.locale),
      isActive: activeMarketingPage === MARKETING_FOOTER_PAGE_KEYS.freelancers,
    },
    {
      label: marketingCopy.smallBusiness,
      href: getMarketingPagePath(MARKETING_FOOTER_PAGE_KEYS.smallBusiness, marketingRoute.locale),
      isActive: activeMarketingPage === MARKETING_FOOTER_PAGE_KEYS.smallBusiness,
    },
  ]

  return (
    <footer className="relative z-10 mt-auto border-t border-[var(--line-soft)] bg-transparent">
      <div className="mx-auto max-w-[78rem] px-5 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="marketing-stage px-6 py-7 sm:px-8 sm:py-8 lg:px-10">
          <div className="absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--brand-gold),var(--brand-blue),transparent)]" />
          <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="max-w-[36rem] space-y-6">
              <div className="space-y-4">
                <p className="marketing-kicker">BadgerSignal</p>
                <p className="text-[1.85rem] leading-[0.98] font-[560] tracking-[-0.05em] text-[var(--brand-ink)] sm:text-[2.3rem]">
                  {marketingCopy.startAnalysis}
                </p>
                <p className="marketing-body max-w-[32rem]">{marketingCopy.tagline}</p>
              </div>
              <Link
                href="/tools/product-insight"
                className="marketing-inline-link inline-flex items-center gap-2 text-sm font-medium text-[var(--brand-ink)]"
              >
                <span>{marketingCopy.startAnalysis}</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              <div className="space-y-4">
                <p className="marketing-kicker">{marketingCopy.product}</p>
                <div className="space-y-3">
                  {productLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'block text-sm transition-colors hover:text-[var(--brand-ink)]',
                        link.isActive ? 'text-[var(--brand-ink)]' : 'text-muted-foreground'
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="marketing-kicker">{marketingCopy.examples}</p>
                <div className="space-y-3">
                  {exampleLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'block text-sm transition-colors hover:text-[var(--brand-ink)]',
                        link.isActive ? 'text-[var(--brand-ink)]' : 'text-muted-foreground'
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="marketing-kicker">{marketingCopy.company}</p>
                <div className="space-y-3">
                  <Link
                    href="/privacy"
                    className="text-muted-foreground block text-sm transition-colors hover:text-[var(--brand-ink)]"
                  >
                    {uiTranslations.footer_privacy}
                  </Link>
                  <Link
                    href="/terms"
                    className="text-muted-foreground block text-sm transition-colors hover:text-[var(--brand-ink)]"
                  >
                    {uiTranslations.footer_terms}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <p className="text-muted-foreground text-xs">
            &copy; {year} {uiTranslations.footer_copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
