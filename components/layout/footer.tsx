"use client"

import { useState } from "react"
import Link from "next/link"
import { Globe, Check } from "lucide-react"
import { useI18n } from "@/components/i18n/i18n-provider"
import { useAuth } from "@/components/auth/auth-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SUPPORTED_LANGUAGES } from "@/lib/constants"
import { api, ApiError } from "@/lib/api/client"
import { toast } from "sonner"
import type { Language } from "@/lib/types"

export function Footer() {
  const { t, locale, setLocale: setI18nLocale } = useI18n()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const year = new Date().getFullYear()

  async function handleLanguageChange(code: string) {
    const newLocale = code as Language
    if (newLocale === locale) return

    setLoading(true)
    try {
      // Update user language in database if logged in
      if (user) {
        await api.put('/users/language', { language: newLocale })
      }

      // Update local i18n state (works for both logged in and not logged in)
      setI18nLocale(newLocale)

      toast.success(t("language_updated") || "Language updated")
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message || t("error_language_update") || "Failed to update language")
      } else {
        toast.error(t("error_language_update") || "Failed to update language")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="relative z-10 mt-auto border-t border-border/50 bg-card/40 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-6 sm:flex-row sm:justify-between">
        <p className="text-xs text-muted-foreground">
          &copy; {year} {t("footer_copyright")}
        </p>
        <nav className="flex items-center gap-6">
          <Link
            href="/privacy"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("footer_privacy")}
          </Link>
          <Link
            href="/terms"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("footer_terms")}
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger
              className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground focus:outline-none disabled:opacity-50"
              disabled={loading}
            >
              <Globe className="size-3.5" />
              <span className="hidden sm:inline">
                {SUPPORTED_LANGUAGES.find(l => l.code === locale)?.label || "Language"}
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
                  <span className={locale === lang.code ? "" : "pl-5"}>{lang.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </footer>
  )
}
