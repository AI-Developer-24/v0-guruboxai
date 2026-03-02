"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { useI18n } from "@/components/i18n/i18n-provider"
import { ExpertSummary } from "@/components/report/expert-summary"
import { AnalysisInfo } from "@/components/report/analysis-info"
import { OpportunitiesTable } from "@/components/report/opportunities-table"
import { ExportButtons } from "@/components/report/export-buttons"
import { api, ApiError, type ReportResponse, type OpportunityResponse } from "@/lib/api/client"
import { TOTAL_OPPORTUNITIES } from "@/lib/constants"
import Link from "next/link"
import { Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const PAGE_SIZE = 20

export default function ReportPage() {
  const params = useParams()
  const router = useRouter()
  const reportId = params.report_id as string
  const { user } = useAuth()
  const { t } = useI18n()

  const [loading, setLoading] = useState(true)
  const [report, setReport] = useState<ReportResponse | null>(null)
  const [opportunities, setOpportunities] = useState<OpportunityResponse[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  // Load report data
  const loadReport = useCallback(async () => {
    try {
      const data = await api.get<ReportResponse>(`/reports/${reportId}`)
      setReport(data)
      setHasError(false)
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 404) {
          setHasError(true)
          setErrorMessage(t("error_report_not_found") || "Report not found.")
        } else if (error.status === 401) {
          setHasError(true)
          setErrorMessage(t("error_unauthorized") || "Please sign in to view this report.")
        } else {
          setHasError(true)
          setErrorMessage(error.message || t("error_load_report") || "Failed to load report.")
        }
      } else {
        setHasError(true)
        setErrorMessage(t("error_load_report") || "Failed to load report.")
      }
    } finally {
      setLoading(false)
    }
  }, [reportId, t])

  // Load opportunities
  const loadOpportunities = useCallback(async () => {
    try {
      const response = await api.get<{
        data: OpportunityResponse[]
        meta: { pagination: { total_pages: number } }
      }>(`/reports/${reportId}/opportunities`, {
        page,
        size: PAGE_SIZE,
      })

      setOpportunities(response.data)
      setTotalPages(response.meta.pagination.total_pages)
    } catch (error) {
      console.error('Failed to load opportunities:', error)
    }
  }, [reportId, page])

  // Initial load
  useEffect(() => {
    if (user) {
      loadReport()
    }
  }, [user, loadReport])

  // Load opportunities when page changes
  useEffect(() => {
    if (report && report.status === 'completed') {
      loadOpportunities()
    }
  }, [page, report, loadOpportunities])

  // Handle delete
  const handleDelete = async () => {
    if (!confirm(t("report_delete_confirm") || "Are you sure you want to delete this report?")) return

    try {
      await api.delete(`/reports/${reportId}`)
      toast.success(t("report_deleted") || "Report deleted")
      router.push("/account")
    } catch (error) {
      toast.error(t("error_delete_report") || "Failed to delete report")
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-4 px-4">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="text-sm text-muted-foreground">{t("loading") || "Loading..."}</p>
      </div>
    )
  }

  // Error state
  if (hasError) {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-4 px-4">
        <div className="flex items-center gap-3 text-destructive">
          <AlertCircle className="h-8 w-8" />
          <p className="text-lg font-medium">{errorMessage}</p>
        </div>
        <Button
          onClick={() => router.push('/account')}
          variant="outline"
        >
          {t("back_to_account") || "Back to Account"}
        </Button>
      </div>
    )
  }

  // Report not found
  if (!report) {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-4 px-4">
        <p className="text-muted-foreground">{t("error_report_not_found") || "Report not found."}</p>
        <Link href="/tools/product-insight" className="text-primary underline underline-offset-4">
          {t("back_to_tools") || "Back to Tools"}
        </Link>
      </div>
    )
  }

  // Report still generating
  if (report.status === "generating") {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-4 px-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">{t("report_generating") || "Report is still being generated..."}</p>
        <Button
          onClick={() => router.push(`/analysis/${reportId}`)}
          variant="outline"
        >
          {t("go_to_analysis") || "Go to Analysis"}
        </Button>
      </div>
    )
  }

  // Calculate premium stats
  const premiumCount = opportunities.filter((o) => o.final_score >= 80).length
  const premiumRatio = opportunities.length > 0 ? premiumCount / opportunities.length : 0

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 page-fade">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            {t("report_title")}
          </h1>
          {report.input_text && (
            <p className="mt-1 text-sm text-muted-foreground">{report.input_text}</p>
          )}
        </div>

        {/* Expert Summary */}
        {report.summary_text && <ExpertSummary summary={report.summary_text} />}

        {/* Stats */}
        <AnalysisInfo
          analysisTimeSec={report.analysis_time_sec || 0}
          totalOpportunities={report.total_opportunities || TOTAL_OPPORTUNITIES}
          premiumRatio={report.premium_ratio || premiumRatio}
        />

        {/* Export buttons */}
        <ExportButtons reportId={reportId} onDelete={handleDelete} />

        {/* Opportunities table */}
        <OpportunitiesTable
          opportunities={opportunities}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  )
}
