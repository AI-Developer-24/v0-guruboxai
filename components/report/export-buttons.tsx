"use client"

import { useState, useCallback, useEffect } from "react"
import { FileText, FileDown, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/components/auth/auth-provider"
import { useI18n } from "@/components/i18n/i18n-provider"
import { Button } from "@/components/ui/button"
import { api, ApiError } from "@/lib/api/client"

interface ExportButtonsProps {
  reportId: string
}

// OAuth popup window management
let oauthWindow: Window | null = null

export function ExportButtons({ reportId }: ExportButtonsProps) {
  const { t } = useI18n()
  const { user } = useAuth()
  const [exporting, setExporting] = useState<string | null>(null)
  const [waitingForOAuth, setWaitingForOAuth] = useState(false)

  // Listen for OAuth callback messages from popup
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Only accept messages from our origin
      if (event.origin !== window.location.origin) return

      if (event.data?.type === 'GOOGLE_OAUTH_SUCCESS') {
        setWaitingForOAuth(false)
        toast.success(t("google_auth_success") || "Google authorization successful!")
        // Automatically retry export after successful auth
        handleExportDocs(true)
      } else if (event.data?.type === 'GOOGLE_OAUTH_ERROR') {
        setWaitingForOAuth(false)
        toast.error(t("google_auth_failed") || "Google authorization failed. Please try again.")
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [t])

  const handleExportPdf = async () => {
    if (!user) {
      toast.error(t("error_unauthorized") || "Please sign in to export reports")
      return
    }

    setExporting('pdf')
    try {
      // Use fetch directly to handle binary response
      const response = await fetch(`/api/v1/reports/${reportId}/export/pdf`, {
        method: 'POST',
        credentials: 'include',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || 'Failed to generate PDF')
      }

      // Get the blob from response
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)

      // Create download link
      const link = document.createElement('a')
      link.href = url
      link.download = `gurubox-report-${reportId.slice(0, 8)}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      toast.success(t("export_success") || "PDF exported successfully!")
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error(t("export_failed") || "Export failed. Please try again.")
      }
    } finally {
      setExporting(null)
    }
  }

  const openOAuthPopup = async () => {
    try {
      // Get the OAuth authorization URL from backend
      const response = await api.post<{ auth_url: string; state: string }>(
        '/auth/google/docs',
        {}
      )

      // Open popup window
      const width = 600
      const height = 700
      const left = window.screenX + (window.outerWidth - width) / 2
      const top = window.screenY + (window.outerHeight - height) / 2

      oauthWindow = window.open(
        response.auth_url,
        'GoogleOAuth',
        `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,location=no,status=no`
      )

      if (!oauthWindow) {
        toast.error(t("popup_blocked") || "Popup blocked. Please allow popups for this site.")
        return false
      }

      setWaitingForOAuth(true)
      return true
    } catch (error) {
      console.error('[Export] Failed to open OAuth popup:', error)
      toast.error(t("oauth_init_failed") || "Failed to initiate Google authorization.")
      return false
    }
  }

  const handleExportDocs = useCallback(async (isRetry = false) => {
    if (!user) {
      toast.error(t("error_unauthorized") || "Please sign in to export reports")
      return
    }

    if (!isRetry) {
      setExporting('docs')
    }

    try {
      const response = await api.post<{ url: string; document_id: string }>(
        `/reports/${reportId}/export/gdocs`,
        {}
      )

      if (response.url) {
        // Open the Google Doc in a new tab
        window.open(response.url, '_blank')
        toast.success(t("export_success") || "Google Doc created successfully!")
      } else {
        toast.error(t("export_failed") || "Export failed. Please try again.")
      }
    } catch (error) {
      if (error instanceof ApiError) {
        // Check if user needs to authorize with Google
        if (error.code === 'GOOGLE_AUTH_REQUIRED') {
          // The response contains the auth_url in data
          const authUrl = (error as any).details?.auth_url

          if (authUrl) {
            // Open OAuth popup
            const width = 600
            const height = 700
            const left = window.screenX + (window.outerWidth - width) / 2
            const top = window.screenY + (window.outerHeight - height) / 2

            oauthWindow = window.open(
              authUrl,
              'GoogleOAuth',
              `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,location=no,status=no`
            )

            if (!oauthWindow) {
              toast.error(t("popup_blocked") || "Popup blocked. Please allow popups for this site.")
            } else {
              setWaitingForOAuth(true)
            }
          } else {
            // Fallback: get auth URL from API
            await openOAuthPopup()
          }
        } else {
          toast.error(error.message || t("export_failed") || "Export failed")
        }
      } else {
        toast.error(t("export_failed") || "Export failed. Please try again.")
      }
    } finally {
      setExporting(null)
    }
  }, [user, reportId, t])

  const isDisabled = exporting !== null || waitingForOAuth

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        variant="outline"
        onClick={handleExportPdf}
        disabled={isDisabled}
        className="btn-glow gap-2"
      >
        {exporting === 'pdf' ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <FileText className="size-4" />
        )}
        {t("report_export_pdf")}
      </Button>
      <Button
        variant="outline"
        onClick={() => handleExportDocs(false)}
        disabled={isDisabled}
        className="btn-glow gap-2"
      >
        {exporting === 'docs' || waitingForOAuth ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <FileDown className="size-4" />
        )}
        {waitingForOAuth
          ? t("waiting_for_google_auth") || "Waiting for Google authorization..."
          : t("report_export_docs")}
      </Button>
    </div>
  )
}
