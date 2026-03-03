"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { useI18n } from "@/components/i18n/i18n-provider"
import { AnalysisSteps } from "@/components/analysis/analysis-steps"
import { ScanningAnimation } from "@/components/analysis/scanning-animation"
import { ANALYSIS_STAGES } from "@/lib/constants"
import { api, ApiError, type TaskStatusResponse } from "@/lib/api/client"
import type { AnalysisStage } from "@/lib/types"
import Link from "next/link"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

// Stage key mapping for the API
const STAGE_KEY_MAP: Record<string, AnalysisStage> = {
  'understanding': 'understanding',
  'analyzing': 'analyzing',
  'scanning': 'scanning',
  'generating': 'generating',
  'scoring': 'scoring',
  'finalizing': 'finalizing',
}

export default function AnalysisPage() {
  const params = useParams()
  const router = useRouter()
  const taskId = params.task_id as string
  const { user } = useAuth()
  const { t } = useI18n()

  const [currentStageIndex, setCurrentStageIndex] = useState(0)
  const [completedStages, setCompletedStages] = useState<AnalysisStage[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const hasStartedPolling = useRef(false)

  // Convert API stage key to our stage index
  const getStageIndex = (stageKey: string): number => {
    const stageKeys = Object.keys(STAGE_KEY_MAP)
    return stageKeys.indexOf(stageKey)
  }

  // Poll task status from API
  useEffect(() => {
    if (!user || hasStartedPolling.current) return

    hasStartedPolling.current = true
    console.log(`[AnalysisPage] Starting polling for task: ${taskId}`)

    const pollTaskStatus = async () => {
      console.log(`[AnalysisPage] Polling task status: ${taskId}`)
      try {
        const data = await api.get<TaskStatusResponse>(`/tasks/${taskId}`)
        console.log(`[AnalysisPage] Task status response:`, {
          status: data.status,
          current_stage: data.current_stage,
          stages_completed: data.stages_completed,
          report_status: data.report_status,
        })

        // Update completed stages
        const apiCompletedStages = data.stages_completed || []
        const completedStageKeys = apiCompletedStages
          .map((key) => STAGE_KEY_MAP[key])
          .filter(Boolean) as AnalysisStage[]

        setCompletedStages(completedStageKeys)

        // Update current stage
        const currentStageKey = data.current_stage || 'understanding'
        const stageIdx = getStageIndex(currentStageKey)
        if (stageIdx >= 0) {
          setCurrentStageIndex(stageIdx)
        }

        // Check if task is complete
        if (data.status === 'completed' && data.report_status === 'completed') {
          console.log(`[AnalysisPage] Task completed! Redirecting to report...`)
          setIsComplete(true)
          if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current)
          }

          // Redirect to report page after a short delay
          const redirectTimer = setTimeout(() => {
            router.push(`/report/${taskId}`)
          }, 2000)

          return () => clearTimeout(redirectTimer)
        }

        // Check if task failed
        if (data.status === 'failed' || data.report_status === 'failed') {
          console.error(`[AnalysisPage] Task failed!`)
          setHasError(true)
          setErrorMessage(t("analysis_failed") || "Analysis failed. Please try again.")
          if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current)
          }
        }
      } catch (error) {
        console.error(`[AnalysisPage] Poll error:`, error)
        if (error instanceof ApiError) {
          if (error.status === 404) {
            setHasError(true)
            setErrorMessage(t("error_task_not_found") || "Task not found.")
          } else if (error.status === 401) {
            setHasError(true)
            setErrorMessage(t("error_unauthorized") || "Please sign in to view this analysis.")
          } else {
            console.error('[AnalysisPage] Poll error:', error)
          }
        }
      }
    }

    // Initial poll
    console.log(`[AnalysisPage] Performing initial poll...`)
    pollTaskStatus()

    // Set up polling interval (every 2 seconds)
    console.log(`[AnalysisPage] Setting up polling interval (2s)`)
    pollIntervalRef.current = setInterval(pollTaskStatus, 2000)

    return () => {
      console.log(`[AnalysisPage] Cleaning up polling`)
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current)
      }
    }
  }, [taskId, user, router, t])

  // Show error state
  if (hasError) {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-4 px-4 page-fade">
        <div className="flex items-center gap-3 text-destructive">
          <AlertCircle className="h-8 w-8" />
          <p className="text-lg font-medium">{errorMessage}</p>
        </div>
        <Button
          onClick={() => router.push('/tools/product-insight')}
          variant="outline"
        >
          {t("back_to_tools") || "Back to Tools"}
        </Button>
      </div>
    )
  }

  const currentStage = ANALYSIS_STAGES[currentStageIndex]?.id ?? "understanding"

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4 py-16 page-fade">
      <div className="flex w-full max-w-lg flex-col gap-8">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            {isComplete ? t("analysis_complete") : t("analysis_title")}
          </h1>
          {isComplete && (
            <p className="mt-2 text-sm text-primary">
              {t("analysis_redirecting")}
            </p>
          )}
        </div>

        {/* Scanning animation */}
        <ScanningAnimation isActive={!isComplete} />

        {/* Steps */}
        <AnalysisSteps
          currentStage={currentStage}
          completedStages={completedStages}
          isComplete={isComplete}
        />
      </div>
    </div>
  )
}
