"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Loader2 } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { useI18n } from "@/components/i18n/i18n-provider"
import { LoginDialog } from "@/components/auth/login-dialog"
import { Button } from "@/components/ui/button"
import { SUGGESTIONS } from "@/lib/constants"
import { api, ApiError } from "@/lib/api/client"
import { toast } from "sonner"
import Link from "next/link"

export function InputSection() {
  const [input, setInput] = useState("")
  const [showLogin, setShowLogin] = useState(false)
  const [pendingStart, setPendingStart] = useState(false)
  const [loading, setLoading] = useState(false)
  const { user, session, loading: authLoading } = useAuth()
  const { t } = useI18n()
  const router = useRouter()

  const handleStartAnalysis = useCallback(async () => {
    if (!input.trim()) return

    if (!user) {
      setPendingStart(true)
      setShowLogin(true)
      return
    }

    setLoading(true)

    try {
      const response = await api.post<{ task_id: string; report_id: string }>(
        '/tools/product-insight/tasks',
        { input_text: input }
      )

      toast.success(t("analysis_started") || "Analysis started!")

      router.push(`/analysis/${response.task_id}`)
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.code === 'CONCURRENT_TASK_LIMIT') {
          toast.error(t("error_concurrent_task") || "You already have an analysis running", {
            description: t("error_wait_complete") || "Please wait for it to complete",
            action: error.details?.task_id ? {
              label: t("tool_go_to_analysis") || "Go to analysis",
              onClick: () => router.push(`/analysis/${error.details.task_id}`),
            } : undefined,
          })
        } else {
          toast.error(error.message || t("error_analysis_failed") || "Failed to start analysis")
        }
      } else {
        toast.error(t("error_analysis_failed") || "Failed to start analysis")
      }
    } finally {
      setLoading(false)
    }
  }, [input, user, router, t])

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
    setTimeout(() => handleStartAnalysis(), 100)
  }

  const handleLoginSuccess = () => {
    if (pendingStart) {
      setPendingStart(false)
      setTimeout(() => {
        handleStartAnalysis()
      }, 100)
    }
  }

  return (
    <div className="flex w-full max-w-2xl flex-col gap-6 page-fade">
      {/* Input area */}
      <div className="input-glow rounded-xl border border-border bg-card p-1 transition-all duration-300">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleStartAnalysis()
            }
          }}
          placeholder={t("tool_placeholder")}
          rows={3}
          className="w-full resize-none rounded-lg bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none leading-relaxed"
          disabled={loading || authLoading}
        />
        <div className="flex items-center justify-end px-2 pb-2">
          <Button
            onClick={handleStartAnalysis}
            disabled={!input.trim() || loading || authLoading}
            className="btn-glow gap-2 disabled:opacity-40"
            style={{
              background: !input.trim() || loading ? undefined : 'linear-gradient(135deg, oklch(0.58 0.16 250), oklch(0.52 0.14 260))',
            }}
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                {t("analyzing") || "Analyzing..."}
              </>
            ) : (
              <>
                {t("tool_start")}
                <ArrowRight className="size-4" />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Running task warning - now checks for running task via API */}
      {/* Note: This will be handled by the API response on next analysis attempt */}

      {/* Suggestions */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => handleSuggestionClick(suggestion)}
            className="suggestion-pill rounded-full border border-border bg-card/80 px-3.5 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/30"
            disabled={loading || authLoading}
          >
            {suggestion}
          </button>
        ))}
      </div>

      <LoginDialog
        open={showLogin}
        onOpenChange={setShowLogin}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  )
}
