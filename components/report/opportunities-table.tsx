"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useI18n } from "@/components/i18n/i18n-provider"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PAGE_SIZE } from "@/lib/constants"
import type { OpportunityResponse } from "@/lib/api/client"
import { cn } from "@/lib/utils"

interface OpportunitiesTableProps {
  opportunities: OpportunityResponse[]
  page?: number
  totalPages?: number
  totalCount?: number
  onPageChange?: (page: number) => void
}

function ScoreBadge({ score }: { score: number }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "tabular-nums font-semibold border-0",
        score >= 80 && "bg-emerald-100 text-emerald-700",
        score >= 60 && score < 80 && "bg-amber-100 text-amber-700",
        score < 60 && "bg-muted text-muted-foreground"
      )}
    >
      {score}
    </Badge>
  )
}

export function OpportunitiesTable({
  opportunities,
  page: externalPage,
  totalPages: externalTotalPages,
  totalCount: externalTotalCount,
  onPageChange
}: OpportunitiesTableProps) {
  const { t } = useI18n()
  const [internalPage, setInternalPage] = useState(1)

  // Use external pagination if provided, otherwise use internal
  const page = externalPage ?? internalPage
  const setPage = onPageChange ?? setInternalPage

  // Calculate total pages if not provided externally
  const totalPages = externalTotalPages ?? Math.ceil(opportunities.length / PAGE_SIZE)

  // Calculate total count for display
  const totalCount = externalTotalCount ?? opportunities.length

  // Paginate data if no external pagination
  const pageData = useMemo(() => {
    if (externalTotalPages !== undefined) {
      // External pagination: data is already paginated
      return opportunities
    }
    // Internal pagination: slice the data
    const start = (page - 1) * PAGE_SIZE
    return opportunities.slice(start, start + PAGE_SIZE)
  }, [opportunities, page, externalTotalPages])

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-12 text-muted-foreground">{t("report_col_index")}</TableHead>
              <TableHead className="min-w-[180px] text-muted-foreground">{t("report_col_name")}</TableHead>
              <TableHead className="min-w-[140px] text-muted-foreground">{t("report_col_users")}</TableHead>
              <TableHead className="min-w-[180px] text-muted-foreground">{t("report_col_pain")}</TableHead>
              <TableHead className="min-w-[160px] text-muted-foreground">{t("report_col_demands")}</TableHead>
              <TableHead className="min-w-[180px] text-muted-foreground">{t("report_col_solution")}</TableHead>
              <TableHead className="w-24 text-right text-muted-foreground">{t("report_col_score")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData.map((opp, idx) => (
              <TableRow
                key={opp.id}
                className="row-animate border-border hover:bg-accent"
                style={{ animationDelay: `${idx * 15}ms` }}
              >
                <TableCell className="text-muted-foreground tabular-nums text-xs">
                  {opp.index_number}
                </TableCell>
                <TableCell className="font-medium text-foreground text-sm">
                  {opp.name}
                </TableCell>
                <TableCell className="text-muted-foreground text-xs whitespace-normal leading-relaxed">
                  {opp.core_users || '-'}
                </TableCell>
                <TableCell className="text-muted-foreground text-xs whitespace-normal leading-relaxed max-w-[220px]">
                  {opp.pain_points || '-'}
                </TableCell>
                <TableCell className="text-muted-foreground text-xs whitespace-normal leading-relaxed max-w-[200px]">
                  {opp.user_demands || '-'}
                </TableCell>
                <TableCell className="text-muted-foreground text-xs whitespace-normal leading-relaxed max-w-[220px]">
                  {opp.ai_solution || '-'}
                </TableCell>
                <TableCell className="text-right">
                  <ScoreBadge score={opp.final_score} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-muted-foreground tabular-nums">
          {totalCount} {t("report_total_opportunities").toLowerCase()}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="gap-1"
          >
            <ChevronLeft className="size-4" />
            {t("previous")}
          </Button>
          <span className="text-sm text-muted-foreground tabular-nums">
            {page} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="gap-1"
          >
            {t("next")}
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
