'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { User, LogOut, Check, Globe2, Menu } from 'lucide-react'
import { useAuth } from '@/components/auth/auth-provider'
import { useI18n } from '@/components/i18n/i18n-provider'
import type { Language } from '@/lib/types'
import { LoginDialog } from '@/components/auth/login-dialog'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  getMarketingPageLocales,
  getMarketingPagePath,
  type MarketingPageKey,
} from '@/lib/seo/metadata'
import { getHtmlLang, type SeoLocale } from '@/lib/seo/locales'
import {
  getMarketingRouteState,
  isExampleMarketingPage,
  SEO_LOCALE_LABELS,
} from '@/lib/seo/marketing-shell'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { SUPPORTED_LANGUAGES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { translations } from '@/lib/translations'
import { logger } from '@/lib/logger'
import {
  trackMarketingCtaClick,
  trackMarketingLocaleSwitch,
  trackMarketingLoginOpen,
} from '@/lib/analytics/marketing-funnel'

const navLogger = logger.withContext('Navbar')

const MARKETING_COPY: Record<
  SeoLocale,
  {
    home: string
    generator: string
    validation: string
    analysis: string
    examples: string
    startAnalysis: string
    menuLabel: string
    localeSwitcherLabel: string
  }
> = {
  en: {
    home: 'Home',
    generator: 'Idea Generator',
    validation: 'Validation',
    analysis: 'Opportunity Analysis',
    examples: 'Public Examples',
    startAnalysis: 'Start Analysis',
    menuLabel: 'Explore pages',
    localeSwitcherLabel: 'Language',
  },
  zh: {
    home: '首页',
    generator: '点子生成',
    validation: '点子验证',
    analysis: '机会分析',
    examples: '公开样例',
    startAnalysis: '开始分析',
    menuLabel: '浏览页面',
    localeSwitcherLabel: '语言',
  },
  de: {
    home: 'Start',
    generator: 'Ideengenerator',
    validation: 'Validierung',
    analysis: 'Chancenanalyse',
    examples: 'Beispiele',
    startAnalysis: 'Analyse starten',
    menuLabel: 'Seiten ansehen',
    localeSwitcherLabel: 'Sprache',
  },
  fr: {
    home: 'Accueil',
    generator: 'Generateur',
    validation: 'Validation',
    analysis: 'Analyse',
    examples: 'Exemples',
    startAnalysis: "Lancer l'analyse",
    menuLabel: 'Explorer les pages',
    localeSwitcherLabel: 'Langue',
  },
  it: {
    home: 'Home',
    generator: 'Generatore',
    validation: 'Validazione',
    analysis: 'Analisi',
    examples: 'Esempi',
    startAnalysis: 'Avvia analisi',
    menuLabel: 'Esplora le pagine',
    localeSwitcherLabel: 'Lingua',
  },
  es: {
    home: 'Inicio',
    generator: 'Generador',
    validation: 'Validacion',
    analysis: 'Analisis',
    examples: 'Ejemplos',
    startAnalysis: 'Iniciar analisis',
    menuLabel: 'Explorar paginas',
    localeSwitcherLabel: 'Idioma',
  },
  pt: {
    home: 'Inicio',
    generator: 'Gerador',
    validation: 'Validacao',
    analysis: 'Analise',
    examples: 'Exemplos',
    startAnalysis: 'Iniciar analise',
    menuLabel: 'Explorar paginas',
    localeSwitcherLabel: 'Idioma',
  },
}

export function Navbar() {
  const [showLogin, setShowLogin] = useState(false)
  const { user, isLoggedIn, logout, loading, setLanguage } = useAuth()
  const { t, locale, setLocale } = useI18n()
  const pathname = usePathname()
  const marketingRoute = getMarketingRouteState(pathname)
  const uiLocale = marketingRoute.isMarketingRoute ? marketingRoute.locale : locale
  const uiTranslations = translations[uiLocale] ?? translations.en
  const marketingCopy = MARKETING_COPY[marketingRoute.locale]
  const marketingPageKey = marketingRoute.pageKey ?? 'home'
  const publishedMarketingLocales = getMarketingPageLocales(marketingPageKey)
  const marketingNavItems = [
    {
      label: marketingCopy.home,
      href: getMarketingPagePath('home', marketingRoute.locale),
      isActive: marketingRoute.pageKey === 'home',
    },
    {
      label: marketingCopy.generator,
      href: getMarketingPagePath('ai-startup-idea-generator', marketingRoute.locale),
      isActive: marketingRoute.pageKey === 'ai-startup-idea-generator',
    },
    {
      label: marketingCopy.validation,
      href: getMarketingPagePath('saas-idea-validation', marketingRoute.locale),
      isActive: marketingRoute.pageKey === 'saas-idea-validation',
    },
    {
      label: marketingCopy.analysis,
      href: getMarketingPagePath('ai-business-opportunity-analysis', marketingRoute.locale),
      isActive: marketingRoute.pageKey === 'ai-business-opportunity-analysis',
    },
    {
      label: marketingCopy.examples,
      href: getMarketingPagePath('examples-ai-tools-for-freelancers', marketingRoute.locale),
      isActive: isExampleMarketingPage(marketingRoute.pageKey),
    },
  ]

  const handleLanguageChange = async (langCode: string) => {
    const newLocale = langCode as Language
    if (newLocale === locale) return

    setLocale(newLocale)
    if (isLoggedIn && user) {
      try {
        await setLanguage(langCode)
      } catch (error) {
        navLogger.error('Failed to update language preference', error)
      }
    }
    // Use translations directly with new locale to avoid stale closure
    toast.success(translations[newLocale]?.language_updated || 'Language updated')
  }

  const openMarketingLogin = (placement: string) => {
    if (marketingRoute.pageKey) {
      trackMarketingLoginOpen({
        pageKey: marketingRoute.pageKey,
        locale: marketingRoute.locale,
        placement,
        path: pathname ?? getMarketingPagePath(marketingRoute.pageKey, marketingRoute.locale),
      })
    }

    setShowLogin(true)
  }

  const accountDropdown = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus-visible:ring-ring flex items-center gap-2.5 rounded-full border border-[var(--line-soft)] bg-[linear-gradient(180deg,oklch(1_0_0_/_0.82),var(--surface-tint))] px-1.5 py-1 shadow-[inset_0_1px_0_oklch(1_0_0_/_0.65)] transition-colors hover:border-[var(--line-strong)] focus:outline-none focus-visible:ring-2">
          <Avatar className="size-7">
            <AvatarImage src={user?.avatar ?? undefined} alt={user?.name ?? 'User'} />
            <AvatarFallback className="bg-[var(--brand-blue-soft)] text-xs text-[var(--brand-blue)]">
              {user?.name?.charAt(0) ?? 'U'}
            </AvatarFallback>
          </Avatar>
          <span className="text-foreground hidden text-sm font-medium sm:inline">
            {user?.name?.split(' ')[0]}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-1">
            <p className="text-sm leading-none font-medium">{user?.name}</p>
            <p className="text-muted-foreground text-xs">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!marketingRoute.isMarketingRoute ? (
          <>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                {t('account_language')}: {SUPPORTED_LANGUAGES.find((l) => l.code === locale)?.label}
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <DropdownMenuItem key={lang.code} onClick={() => handleLanguageChange(lang.code)}>
                    <span className="flex-1">{lang.label}</span>
                    {locale === lang.code && <Check className="size-4" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
          </>
        ) : null}
        <DropdownMenuItem asChild>
          <Link href="/account" className="flex items-center gap-2">
            <User className="size-4" />
            {uiTranslations.nav_account}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-destructive flex items-center gap-2">
          <LogOut className="size-4" />
          {uiTranslations.nav_logout}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <header className="glass-nav fixed top-0 right-0 left-0 z-50">
      <nav className="mx-auto flex h-16 max-w-[78rem] items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-5 lg:gap-8">
          <Link
            href={
              marketingRoute.isMarketingRoute
                ? getMarketingPagePath('home', marketingRoute.locale)
                : '/tools/product-insight'
            }
            className="group flex shrink-0 items-center gap-3"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-[1.2rem] border border-[var(--line-soft)] bg-[linear-gradient(180deg,oklch(1_0_0_/_0.84),var(--surface-tint))] shadow-[0_18px_34px_oklch(0.18_0.02_250_/_0.05),inset_0_1px_0_oklch(1_0_0_/_0.7)] transition-transform duration-300 group-hover:-translate-y-[1px]">
              <Image
                src="/images/logo.jpg"
                alt="BadgerSignal"
                width={34}
                height={34}
                className="rounded-[0.95rem]"
              />
            </span>
            <span className="text-[1.02rem] font-semibold tracking-[-0.05em] text-[var(--brand-ink)]">
              Badger
              <span className="bg-gradient-to-r from-[var(--brand-gold)] to-[var(--brand-blue)] bg-clip-text text-transparent">
                Signal
              </span>
            </span>
          </Link>

          {marketingRoute.isMarketingRoute ? (
            <div className="hidden items-center gap-1.5 lg:flex">
              {marketingNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={item.isActive}
                  className={cn(
                    'marketing-nav-link px-2 py-2 text-[12px] font-medium tracking-[0.06em]'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {marketingRoute.isMarketingRoute ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="marketing-cta-secondary hidden h-9 rounded-full px-3.5 text-sm text-[var(--brand-ink)] md:inline-flex"
                    aria-label={`${marketingCopy.localeSwitcherLabel}: ${SEO_LOCALE_LABELS[marketingRoute.locale]}`}
                  >
                    <Globe2 className="size-4" />
                    <span className="max-w-[7.5rem] truncate text-sm">
                      {SEO_LOCALE_LABELS[marketingRoute.locale]}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-52 rounded-[1rem] border-[var(--line-soft)] bg-[linear-gradient(180deg,oklch(1_0_0_/_0.9),var(--surface-tint))] shadow-[0_24px_54px_oklch(0.18_0.02_250_/_0.08)] backdrop-blur-xl"
                >
                  <DropdownMenuLabel>{marketingCopy.localeSwitcherLabel}</DropdownMenuLabel>
                  {publishedMarketingLocales.map((targetLocale) => {
                    const isActive = targetLocale === marketingRoute.locale
                    const targetHref = getMarketingPagePath(marketingPageKey, targetLocale)

                    return (
                      <DropdownMenuItem key={targetLocale} asChild>
                        <Link
                          href={targetHref}
                          hrefLang={getHtmlLang(targetLocale)}
                          lang={getHtmlLang(targetLocale)}
                          className="flex items-center gap-2"
                          onClick={() =>
                            trackMarketingLocaleSwitch({
                              pageKey: marketingPageKey,
                              locale: marketingRoute.locale,
                              fromLocale: marketingRoute.locale,
                              toLocale: targetLocale,
                              destinationHref: targetHref,
                              placement: 'navbar_desktop',
                            })
                          }
                        >
                          <span className="flex-1">{SEO_LOCALE_LABELS[targetLocale]}</span>
                          {isActive ? <Check className="size-4" /> : null}
                        </Link>
                      </DropdownMenuItem>
                    )
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                asChild
                size="sm"
                className="marketing-cta-primary text-background hidden h-9 rounded-full px-4 text-sm sm:inline-flex"
              >
                <Link
                  href="/tools/product-insight"
                  onClick={() =>
                    trackMarketingCtaClick({
                      pageKey: marketingPageKey,
                      locale: marketingRoute.locale,
                      placement: 'navbar_primary',
                      actionLabel: marketingCopy.startAnalysis,
                      destinationHref: '/tools/product-insight',
                      actionKind: 'primary',
                    })
                  }
                >
                  {marketingCopy.startAnalysis}
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="marketing-cta-secondary size-9 rounded-full text-[var(--brand-ink)] lg:hidden"
                    aria-label={marketingCopy.menuLabel}
                  >
                    <Menu className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-64 rounded-[1rem] border-[var(--line-soft)] bg-[linear-gradient(180deg,oklch(1_0_0_/_0.9),var(--surface-tint))] shadow-[0_24px_54px_oklch(0.18_0.02_250_/_0.08)] backdrop-blur-xl"
                >
                  <DropdownMenuLabel>{marketingCopy.menuLabel}</DropdownMenuLabel>
                  {marketingNavItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  {publishedMarketingLocales.map((targetLocale) => {
                    const targetHref = getMarketingPagePath(marketingPageKey, targetLocale)

                    return (
                      <DropdownMenuItem key={targetLocale} asChild>
                        <Link
                          href={targetHref}
                          hrefLang={getHtmlLang(targetLocale)}
                          lang={getHtmlLang(targetLocale)}
                          onClick={() =>
                            trackMarketingLocaleSwitch({
                              pageKey: marketingPageKey,
                              locale: marketingRoute.locale,
                              fromLocale: marketingRoute.locale,
                              toLocale: targetLocale,
                              destinationHref: targetHref,
                              placement: 'navbar_mobile',
                            })
                          }
                        >
                          {SEO_LOCALE_LABELS[targetLocale]}
                        </Link>
                      </DropdownMenuItem>
                    )
                  })}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/tools/product-insight"
                      onClick={() =>
                        trackMarketingCtaClick({
                          pageKey: marketingPageKey,
                          locale: marketingRoute.locale,
                          placement: 'navbar_mobile_primary',
                          actionLabel: marketingCopy.startAnalysis,
                          destinationHref: '/tools/product-insight',
                          actionKind: 'primary',
                        })
                      }
                    >
                      {marketingCopy.startAnalysis}
                    </Link>
                  </DropdownMenuItem>
                  {!isLoggedIn ? (
                    <DropdownMenuItem onClick={() => openMarketingLogin('navbar_mobile_login')}>
                      {uiTranslations.nav_login}
                    </DropdownMenuItem>
                  ) : null}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : null}

          {loading ? (
            <div className="bg-muted h-9 w-24 animate-pulse rounded-lg" />
          ) : isLoggedIn ? (
            accountDropdown
          ) : marketingRoute.isMarketingRoute ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openMarketingLogin('navbar_desktop_login')}
              className="text-muted-foreground hidden text-[13px] font-medium hover:text-[var(--brand-ink)] lg:inline-flex"
            >
              {uiTranslations.nav_login}
            </Button>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={() => setShowLogin(true)}
              className="btn-glow"
            >
              {uiTranslations.nav_login}
            </Button>
          )}
        </div>
      </nav>

      <LoginDialog
        open={showLogin}
        onOpenChange={setShowLogin}
        trackingSource={
          marketingRoute.isMarketingRoute
            ? {
                surface: 'marketing_navbar',
                currentPath:
                  pathname ?? getMarketingPagePath(marketingPageKey, marketingRoute.locale),
                locale: marketingRoute.locale,
                sourcePageKey: marketingPageKey,
              }
            : undefined
        }
      />
    </header>
  )
}
