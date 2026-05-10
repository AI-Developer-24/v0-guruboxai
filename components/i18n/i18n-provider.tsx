"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import type { Language } from "@/lib/types"
import { SEO_LOCALE_COOKIE_NAME } from "@/lib/seo/locales"
import { translations, type TranslationKeys } from "@/lib/translations"

interface I18nContextType {
  locale: Language
  setLocale: (locale: Language) => void
  t: (key: keyof TranslationKeys) => string
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Language>("en")

  const syncLocaleCookie = useCallback((newLocale: Language) => {
    document.cookie = `${SEO_LOCALE_COOKIE_NAME}=${newLocale}; path=/; max-age=31536000; samesite=lax`
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem("badgersignal_locale") as Language | null
    if (saved && translations[saved]) {
      setLocaleState(saved)
      syncLocaleCookie(saved)
    }
  }, [syncLocaleCookie])

  const setLocale = useCallback((newLocale: Language) => {
    setLocaleState(newLocale)
    localStorage.setItem("badgersignal_locale", newLocale)
    syncLocaleCookie(newLocale)
  }, [syncLocaleCookie])

  const t = useCallback(
    (key: keyof TranslationKeys): string => {
      return translations[locale]?.[key] ?? translations.en[key] ?? key
    },
    [locale]
  )

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
