"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ExternalLink, FileDown, Trash2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/components/auth/auth-provider"
import { useI18n } from "@/components/i18n/i18n-provider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { api, ApiError, type ReportResponse } from "@/lib/api/client"

const PAGE_SIZE = 20

export function HistoryTable() {
  const { user } = useAuth()
  const { t } = useI18n()
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [reports, setReports] = useState<ReportResponse[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      loadReports()
    }
  }, [user, page])

  async function loadReports() {
    try {
      setLoading(true)
      const response = await api.get<{
        data: ReportResponse[]
        meta: { pagination: { total_pages: number; total: number } }
      }>('/reports', { page, size: PAGE_SIZE })

      setReports(response.data)
      setTotalPages(response.meta.pagination.total_pages)
      setTotalCount(response.meta.pagination.total)
    } catch (error) {
      if (error instanceof ApiError && error.status !== 401) {
        console.error('Failed to load reports:', error)
      }
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(reportId: string) {
    try {
      setDeleting(reportId)
      await api.delete(`/reports/${reportId}`)
      toast.success(t("report_deleted") || "Report deleted")
      loadReports()
    } catch (error) {
      toast.error(t("error_delete_report") || "Failed to delete report")
    } finally {
      setDeleting(null)
      setDeleteId(null)
    }
  }

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return dateStr
    }
  }

  const getStatusBadge = (report: ReportResponse) => {
    if (report.status === "completed") {
      return (
        <Badge variant="outline" className="border-0 bg-emerald-100 text-emerald-700">
          {t("status_completed")}
        </Badge>
      )
    }
    if (report.status === "generating") {
      return (
        <Badge variant="outline" className="border-0 bg-amber-100 text-amber-700">
          {t("status_generating")}
        </Badge>
      )
    }
    return (
      <Badge variant="outline" className="border-0 bg-muted text-muted-foreground">
        {t("status_deleted")}
      </Badge>
    )
  }

  if (!user) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <p className="text-muted-foreground">{t("account_no_reports") || "Please sign in to view your history"}</p>
      </div>
    )
  }

  if (loading && reports.length === 0) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (reports.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <p className="text-muted-foreground">{t("account_no_reports") || "No reports yet"}</p>
        <Button
          onClick={() => router.push('/tools/product-insight')}
          className="mt-4"
        >
          {t("start_first_analysis") || "Start Your First Analysis"}
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="pl-4 text-left text-muted-foreground">{t("account_col_input")}</TableHead>
              <TableHead className="text-center text-muted-foreground">{t("account_col_created")}</TableHead>
              <TableHead className="text-center text-muted-foreground">{t("account_col_opportunities")}</TableHead>
              <TableHead className="text-center text-muted-foreground">{t("account_col_premium")}</TableHead>
              <TableHead className="text-center text-muted-foreground">{t("account_col_status")}</TableHead>
              <TableHead className="pr-4 text-center text-muted-foreground">{t("account_col_actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report, idx) => (
              <TableRow
                key={report.id}
                className="row-animate border-border hover:bg-accent"
                style={{ animationDelay: `${idx * 30}ms` }}
              >
                <TableCell className="max-w-[200px] truncate pl-4 text-left text-sm font-medium text-foreground">
                  {report.input_text}
                </TableCell>
                <TableCell className="text-center text-xs text-muted-foreground whitespace-nowrap">
                  {formatDate(report.created_at)}
                </TableCell>
                <TableCell className="text-center text-sm tabular-nums text-muted-foreground">
                  {report.total_opportunities || 0}
                </TableCell>
                <TableCell className="text-center tabular-nums text-sm text-muted-foreground">
                  {report.status === "completed"
                    ? `${Math.round((report.premium_ratio || 0) * 100)}%`
                    : "-"}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    {getStatusBadge(report)}
                  </div>
                </TableCell>
                <TableCell className="pr-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    {report.status === "completed" && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            className="size-8 text-foreground hover:text-primary"
                          >
                            <Link href={`/report/${report.id}`}>
                              <ExternalLink className="size-4" />
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>{t("account_open")}</TooltipContent>
                      </Tooltip>
                    )}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toast(t("report_coming_soon") || "Coming soon")}
                          className="size-8 text-muted-foreground"
                        >
                          <FileDown className="size-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>{t("account_export")}</TooltipContent>
                    </Tooltip>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteId(report.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      disabled={deleting === report.id}
                    >
                      {deleting === report.id ? (
                        <Loader2 className="mr-1 size-3 animate-spin" />
                      ) : (
                        <Trash2 className="mr-1 size-3" />
                      )}
                      {t("account_delete")}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end px-1">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground tabular-nums">
              {page} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("report_delete_confirm")}</DialogTitle>
            <DialogDescription>
              {t("report_delete_confirm_desc")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteId(null)}
            >
              {t("report_delete_cancel")}
            </Button>
            <Button
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t("report_delete_yes")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
