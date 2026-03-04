"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { useI18n } from "@/components/i18n/i18n-provider"
import { AnalysisSteps } from "@/components/analysis/analysis-steps"
import { ScanningAnimation } from "@/components/analysis/scanning-animation"
import { ANALYSIS_STAGES } from "@/lib/constants"
import { api } from "@/lib/api/client"
import { supabase } from "@/lib/supabase"
import type { AnalysisStage } from "@/lib/types"
import { AlertCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

// Stage key mapping
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
  const [reportId, setReportId] = useState<string>('')
  const [isComplete, setIsComplete] = useState(false)
  // Use ref to store reportId to avoid stale closure in redirect
  const reportIdRef = useRef<string>('')
  const [isCancelled, setIsCancelled] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  // Convert stage key to index
  const getStageIndex = (stageKey: string): number => {
    return Object.keys(STAGE_KEY_MAP).indexOf(stageKey)
  }

  // Update UI based on task data
  const updateUI = (task: {
    status: string
    current_stage: string | null
    stages_completed: string[] | null
  }) => {
    console.log('[AnalysisPage] Updating UI with task:', task)

    // Update current stage
    if (task.current_stage) {
      const stageIdx = getStageIndex(task.current_stage)
      if (stageIdx >= 0) {
        setCurrentStageIndex(stageIdx)
      }
    }

    // Update completed stages
    if (task.stages_completed && task.stages_completed.length > 0) {
      const completed = task.stages_completed
        .map((key: string) => STAGE_KEY_MAP[key])
        .filter(Boolean) as AnalysisStage[]
      setCompletedStages(completed)
    }

    // Check terminal states
    if (task.status === 'completed') {
      console.log('[AnalysisPage] Task completed, redirecting...')
      setIsComplete(true)
      // Use ref to get the latest reportId to avoid stale closure
      const currentReportId = reportIdRef.current
      console.log('[AnalysisPage] Redirecting to report:', currentReportId || taskId)
      setTimeout(() => {
        router.push(`/report/${currentReportId || taskId}`)
      }, 2000)
    } else if (task.status === 'cancelled') {
      setIsCancelled(true)
    } else if (task.status === 'failed') {
      setHasError(true)
      setErrorMessage(t("analysis_failed") || "Analysis failed.")
    }
  }

  const handleError = (message: string) => {
    setHasError(true)
    setErrorMessage(message)
  }

  // Cancel the analysis
  const handleCancel = async () => {
    if (isCancelling || isComplete || isCancelled) return

    setIsCancelling(true)
    try {
      await api.delete(`/tasks/${taskId}`)
      setIsCancelled(true)
    } catch (error) {
      console.error('[AnalysisPage] Cancel error:', error)
      handleError(t("analysis_failed") || "Failed to cancel analysis.")
    } finally {
      setIsCancelling(false)
    }
  }

  // Subscribe to realtime updates
  useEffect(() => {
    if (!user || !taskId) return

    let taskChannel: ReturnType<typeof supabase.channel> | null = null
    let mounted = true

    const setupSubscriptions = async () => {
      try {
        // Fetch initial task data
        const { data: task, error } = await supabase
          .from('tasks')
          .select('*, reports!inner(id, status)')
          .eq('id', taskId)
          .eq('user_id', user.id)
          .single()

        if (!mounted) return

        if (error || !task) {
          console.error('[AnalysisPage] Task fetch error:', error)
          handleError(t("error_task_not_found") || "Task not found.")
          return
        }

        console.log('[AnalysisPage] Initial task data:', task)

        const reportData = task.reports as { id: string; status: string }
        setReportId(reportData.id)
        reportIdRef.current = reportData.id
        console.log('[AnalysisPage] Report ID set:', reportData.id)

        // Update UI with initial data
        updateUI(task)

        // Check if already in terminal state
        if (task.status === 'completed' || task.status === 'cancelled' || task.status === 'failed') {
          return
        }

        // Subscribe to task changes
        taskChannel = supabase
          .channel(`task-updates-${taskId}`, {
            config: {
              broadcast: { self: true },
              presence: { key: '' },
            },
          })
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'tasks',
              filter: `id=eq.${taskId}`,
            },
            (payload) => {
              console.log('[AnalysisPage] Realtime update received:', payload)
              console.log('[AnalysisPage] Payload.new:', payload.new)
              if (!mounted) return
              updateUI(payload.new as {
                status: string
                current_stage: string | null
                stages_completed: string[] | null
              })
            }
          )
          .subscribe((status, err) => {
            console.log('[AnalysisPage] Subscription status:', status)
            if (err) {
              console.error('[AnalysisPage] Subscription error:', err)
            }
            if (status === 'CHANNEL_ERROR') {
              console.error('[AnalysisPage] Channel error - Realtime may not be enabled for tasks table')
            }
          })

        console.log('[AnalysisPage] Realtime subscription setup complete')
      } catch (error) {
        if (!mounted) return
        console.error('[AnalysisPage] Error setting up subscriptions:', error)
        handleError(t("error_task_not_found") || "Task not found.")
      }
    }

    console.log('[AnalysisPage] Setting up realtime for task:', taskId)
    setupSubscriptions()

    return () => {
      mounted = false
      console.log('[AnalysisPage] Cleaning up subscriptions')
      if (taskChannel) {
        supabase.removeChannel(taskChannel)
      }
    }
  }, [taskId, user?.id])

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

  // Show cancelled state
  if (isCancelled) {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-4 px-4 page-fade">
        <div className="flex items-center gap-3 text-muted-foreground">
          <XCircle className="h-8 w-8" />
          <p className="text-lg font-medium">{t("analysis_cancelled") || "Analysis cancelled."}</p>
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

        {/* Cancel button */}
        {!isComplete && (
          <div className="flex justify-center">
            <Button
              onClick={handleCancel}
              variant="outline"
              disabled={isCancelling}
              className="text-muted-foreground hover:text-destructive"
            >
              {isCancelling
                ? (t("cancelling") || "Cancelling...")
                : (t("cancel_analysis") || "Cancel Analysis")
              }
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
