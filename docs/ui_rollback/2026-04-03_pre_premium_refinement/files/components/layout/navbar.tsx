"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { User, LogOut, Check, Globe2, Menu } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { useI18n } from "@/components/i18n/i18n-provider"
import type { Language } from "@/lib/types"
import { LoginDialog } from "@/components/auth/login-dialog"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  getMarketingPagePath,
  type MarketingPageKey,
} from "@/lib/seo/metadata"
import {
  ALL_SEO_LOCALES,
  getHtmlLang,
  type SeoLocale,
} from "@/lib/seo/locales"
import {
  getMarketingRouteState,
  isExampleMarketingPage,
  SEO_LOCALE_LABELS,
} from "@/lib/seo/marketing-shell"
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
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { SUPPORTED_LANGUAGES } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { translations } from "@/lib/translations"
import { logger } from "@/lib/logger"

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
    home: "Home",
    generator: "Idea Generator",
    validation: "Validation",
    analysis: "Opportunity Analysis",
    examples: "Public Examples",
    startAnalysis: "Start Analysis",
    menuLabel: "Explore pages",
    localeSwitcherLabel: "Language",
  },
  zh: {
    home: "首页",
    generator: "点子生成",
    validation: "点子验证",
    analysis: "机会分析",
    examples: "公开样例",
    startAnalysis: "开始分析",
    menuLabel: "浏览页面",
    localeSwitcherLabel: "语言",
  },
  de: {
    home: "Start",
    generator: "Ideengenerator",
    validation: "Validierung",
    analysis: "Chancenanalyse",
    examples: "Beispiele",
    startAnalysis: "Analyse starten",
    menuLabel: "Seiten ansehen",
    localeSwitcherLabel: "Sprache",
  },
  fr: {
    home: "Accueil",
    generator: "Generateur",
    validation: "Validation",
    analysis: "Analyse",
    examples: "Exemples",
    startAnalysis: "Lancer l'analyse",
    menuLabel: "Explorer les pages",
    localeSwitcherLabel: "Langue",
  },
  it: {
    home: "Home",
    generator: "Generatore",
    validation: "Validazione",
    analysis: "Analisi",
    examples: "Esempi",
    startAnalysis: "Avvia analisi",
    menuLabel: "Esplora le pagine",
    localeSwitcherLabel: "Lingua",
  },
  es: {
    home: "Inicio",
    generator: "Generador",
    validation: "Validacion",
    analysis: "Analisis",
    examples: "Ejemplos",
    startAnalysis: "Iniciar analisis",
    menuLabel: "Explorar paginas",
    localeSwitcherLabel: "Idioma",
  },
  pt: {
    home: "Inicio",
    generator: "Gerador",
    validation: "Validacao",
    analysis: "Analise",
    examples: "Exemplos",
    startAnalysis: "Iniciar analise",
    menuLabel: "Explorar paginas",
    localeSwitcherLabel: "Idioma",
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
  const marketingPageKey = marketingRoute.pageKey ?? "home"
  const marketingNavItems = [
    {
      label: marketingCopy.home,
      href: getMarketingPagePath("home", marketingRoute.locale),
      isActive: marketingRoute.pageKey === "home",
    },
    {
      label: marketingCopy.generator,
      href: getMarketingPagePath("ai-startup-idea-generator", marketingRoute.locale),
      isActive: marketingRoute.pageKey === "ai-startup-idea-generator",
    },
    {
      label: marketingCopy.validation,
      href: getMarketingPagePath("saas-idea-validation", marketingRoute.locale),
      isActive: marketingRoute.pageKey === "saas-idea-validation",
    },
    {
      label: marketingCopy.analysis,
      href: getMarketingPagePath("ai-business-opportunity-analysis", marketingRoute.locale),
      isActive: marketingRoute.pageKey === "ai-business-opportunity-analysis",
    },
    {
      label: marketingCopy.examples,
      href: getMarketingPagePath("examples-ai-tools-for-freelancers", marketingRoute.locale),
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
    toast.success(translations[newLocale]?.language_updated || "Language updated")
  }

  const accountDropdown = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2.5 rounded-full py-1 px-1.5 transition-colors hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <Avatar className="size-7">
            <AvatarImage src={user?.avatar ?? undefined} alt={user?.name ?? "User"} />
            <AvatarFallback className="text-xs bg-primary/10 text-primary">
              {user?.name?.charAt(0) ?? "U"}
            </AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium text-foreground sm:inline">
            {user?.name?.split(" ")[0]}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!marketingRoute.isMarketingRoute ? (
          <>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                {t("account_language")}: {SUPPORTED_LANGUAGES.find((l) => l.code === locale)?.label}
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                  >
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
        <DropdownMenuItem
          onClick={logout}
          className="flex items-center gap-2 text-destructive"
        >
          <LogOut className="size-4" />
          {uiTranslations.nav_logout}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <header className="glass-nav fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto flex h-16 max-w-[74rem] items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-5 lg:gap-8">
          <Link
            href={
              marketingRoute.isMarketingRoute
                ? getMarketingPagePath("home", marketingRoute.locale)
                : "/tools/product-insight"
            }
            className="flex shrink-0 items-center gap-3 transition-opacity hover:opacity-80"
          >
            <Image
              src="/images/logo.jpg"
              alt="BadgerSignal"
              width={34}
              height={34}
              className="rounded-xl"
            />
            <span className="font-semibold text-lg tracking-tight text-foreground">
              Badger<span className="bg-gradient-to-r from-[oklch(0.78_0.14_70)] to-[oklch(0.58_0.16_250)] bg-clip-text text-transparent">Signal</span>
            </span>
          </Link>

          {marketingRoute.isMarketingRoute ? (
            <div className="hidden lg:flex items-center gap-1">
              {marketingNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3 py-2 text-[13px] font-medium tracking-[0.04em] transition-colors",
                    item.isActive
                      ? "bg-white/80 text-foreground shadow-sm backdrop-blur-sm"
                      : "text-muted-foreground hover:text-foreground"
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
                    className="hidden md:inline-flex h-10 rounded-full border-border/60 bg-white/62 px-4 shadow-sm backdrop-blur-sm"
                    aria-label={`${marketingCopy.localeSwitcherLabel}: ${SEO_LOCALE_LABELS[marketingRoute.locale]}`}
                  >
                    <Globe2 className="size-4" />
                    <span className="max-w-[7.5rem] truncate text-sm">
                      {SEO_LOCALE_LABELS[marketingRoute.locale]}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuLabel>{marketingCopy.localeSwitcherLabel}</DropdownMenuLabel>
                  {ALL_SEO_LOCALES.map((targetLocale) => {
                    const isActive = targetLocale === marketingRoute.locale

                    return (
                      <DropdownMenuItem key={targetLocale} asChild>
                        <Link
                          href={getMarketingPagePath(marketingPageKey, targetLocale)}
                          hrefLang={getHtmlLang(targetLocale)}
                          lang={getHtmlLang(targetLocale)}
                          className="flex items-center gap-2"
                        >
                          <span className="flex-1">{SEO_LOCALE_LABELS[targetLocale]}</span>
                          {isActive ? <Check className="size-4" /> : null}
                        </Link>
                      </DropdownMenuItem>
                    )
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button asChild size="sm" className="btn-glow hidden sm:inline-flex">
                <Link href="/tools/product-insight">{marketingCopy.startAnalysis}</Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-9 rounded-full border-border/70 bg-white/58 shadow-sm backdrop-blur-sm lg:hidden"
                    aria-label={marketingCopy.menuLabel}
                  >
                    <Menu className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel>{marketingCopy.menuLabel}</DropdownMenuLabel>
                  {marketingNavItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  {ALL_SEO_LOCALES.map((targetLocale) => (
                    <DropdownMenuItem key={targetLocale} asChild>
                      <Link
                        href={getMarketingPagePath(marketingPageKey, targetLocale)}
                        hrefLang={getHtmlLang(targetLocale)}
                        lang={getHtmlLang(targetLocale)}
                      >
                        {SEO_LOCALE_LABELS[targetLocale]}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/tools/product-insight">{marketingCopy.startAnalysis}</Link>
                  </DropdownMenuItem>
                  {!isLoggedIn ? (
                    <DropdownMenuItem onClick={() => setShowLogin(true)}>
                      {uiTranslations.nav_login}
                    </DropdownMenuItem>
                  ) : null}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : null}

          {loading ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-muted" />
          ) : isLoggedIn ? (
            accountDropdown
          ) : marketingRoute.isMarketingRoute ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLogin(true)}
              className="hidden lg:inline-flex text-muted-foreground hover:text-foreground"
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

      <LoginDialog open={showLogin} onOpenChange={setShowLogin} />
    </header>
  )
}
