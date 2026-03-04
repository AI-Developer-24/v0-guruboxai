"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { useI18n } from "@/components/i18n/i18n-provider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SUPPORTED_LANGUAGES } from "@/lib/constants"
import { api, ApiError } from "@/lib/api/client"
import { toast } from "sonner"
import type { Language } from "@/lib/types"

export function LanguageSwitch() {
  const { user, loading: authLoading } = useAuth()
  const { t, locale, setLocale: setI18nLocale } = useI18n()
  const [loading, setLoading] = useState(false)

  // Sync user's language preference from database to i18n state on mount
  useEffect(() => {
    if (user?.language && user.language !== locale) {
      setI18nLocale(user.language)
    }
  }, [user?.language, locale, setI18nLocale])

  // Use i18n locale as the source of truth for current language
  const currentLanguage = locale

  async function handleLanguageChange(code: string) {
    const newLocale = code as Language
    if (newLocale === currentLanguage) return

    setLoading(true)
    try {
      // Update user language in database if logged in
      if (user) {
        await api.put('/users/language', { language: newLocale })
      }

      // Update local i18n state
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
    <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
      <span className="text-sm font-medium text-foreground">{t("account_language") || "Language"}</span>
      <Select
        value={currentLanguage}
        onValueChange={handleLanguageChange}
        disabled={authLoading || loading}
      >
        <SelectTrigger className="w-40 border-border">
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          ) : (
            <SelectValue />
          )}
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
