"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FileText, FileDown, Trash2, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/components/auth/auth-provider"
import { useI18n } from "@/components/i18n/i18n-provider"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { api, ApiError } from "@/lib/api/client"

interface ExportButtonsProps {
  reportId: string
  onDelete?: () => void | Promise<void>
}

export function ExportButtons({ reportId, onDelete }: ExportButtonsProps) {
  const { t } = useI18n()
  const { user } = useAuth()
  const router = useRouter()
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [exporting, setExporting] = useState<string | null>(null)

  const handleExportPdf = async () => {
    if (!user) {
      toast.error(t("error_unauthorized") || "Please sign in to export reports")
      return
    }

    setExporting('pdf')
    try {
      const response = await api.post<{ export_url: string }>(
        `/reports/${reportId}/exports/pdf`,
        {}
      )

      if (response.export_url) {
        // Download the file
        const link = document.createElement('a')
        link.href = response.export_url
        link.download = `gurubox-report-${reportId}.pdf`
        link.click()
        toast.success(t("export_success") || "Export successful!")
      } else {
        toast.error(t("export_failed") || "Export failed. Please try again.")
      }
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message || t("export_failed") || "Export failed")
      } else {
        toast.error(t("export_failed") || "Export failed. Please try again.")
      }
    } finally {
      setExporting(null)
    }
  }

  const handleExportDocs = async () => {
    if (!user) {
      toast.error(t("error_unauthorized") || "Please sign in to export reports")
      return
    }

    setExporting('docs')
    try {
      const response = await api.post<{ export_url: string; document_id: string }>(
        `/reports/${reportId}/exports/google-docs`,
        {}
      )

      if (response.export_url) {
        // Open the Google Doc in a new tab
        window.open(response.export_url, '_blank')
        toast.success(t("export_success") || "Google Doc created successfully!")
      } else {
        toast.error(t("export_failed") || "Export failed. Please try again.")
      }
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message || t("export_failed") || "Export failed")
      } else {
        toast.error(t("export_failed") || "Export failed. Please try again.")
      }
    } finally {
      setExporting(null)
    }
  }

  const handleDelete = async () => {
    if (onDelete) {
      await onDelete()
    } else {
      // Default behavior if no onDelete provided
      try {
        await api.delete(`/reports/${reportId}`)
        toast.success(t("report_deleted") || "Report deleted")
        router.push("/account")
      } catch (error) {
        toast.error(t("error_delete_report") || "Failed to delete report")
      }
    }
    setDeleteOpen(false)
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        variant="outline"
        onClick={handleExportPdf}
        disabled={exporting !== null}
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
        onClick={handleExportDocs}
        disabled={exporting !== null}
        className="btn-glow gap-2"
      >
        {exporting === 'docs' ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <FileDown className="size-4" />
        )}
        {t("report_export_docs")}
      </Button>
      <div className="flex-1" />
      <Button
        variant="outline"
        onClick={() => setDeleteOpen(true)}
        className="gap-2 border-destructive/30 text-destructive-foreground hover:bg-destructive/10"
      >
        <Trash2 className="size-4" />
        {t("report_delete")}
      </Button>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
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
              onClick={() => setDeleteOpen(false)}
            >
              {t("report_delete_cancel")}
            </Button>
            <Button
              onClick={handleDelete}
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
