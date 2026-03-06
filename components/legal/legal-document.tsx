"use client"

import Link from "next/link"
import { useI18n } from "@/components/i18n/i18n-provider"
import type { Language } from "@/lib/types"
import type { LegalDocument } from "@/lib/legal-content"

interface LegalDocumentProps {
  documents: Record<Language, LegalDocument>
}

export function LegalDocumentView({ documents }: LegalDocumentProps) {
  const { locale } = useI18n()
  const document = documents[locale] ?? documents.en

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 page-fade">
      <article className="max-w-none">
        <h1 className="text-3xl font-bold text-foreground">{document.title}</h1>
        <p className="text-sm text-muted-foreground">
          {document.lastUpdatedLabel}: {document.lastUpdatedDate}
        </p>

        {document.translationNotice ? (
          <p className="mt-3 rounded-md border border-border bg-card/40 px-3 py-2 text-xs text-muted-foreground">
            {document.translationNotice}
          </p>
        ) : null}

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
          {document.sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-3 text-lg font-semibold text-foreground">{section.title}</h2>
              <div className="space-y-3">
                {section.paragraphs.map((paragraph, index) => (
                  <p key={`${section.title}-${index}`}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8">
          <Link href="/tools/product-insight" className="text-sm text-primary underline underline-offset-4">
            {document.backToHomeLabel}
          </Link>
        </div>
      </article>
    </div>
  )
}
