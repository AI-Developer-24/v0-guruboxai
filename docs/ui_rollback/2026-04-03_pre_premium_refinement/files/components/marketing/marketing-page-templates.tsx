import { FileSearch, Layers3, LineChart } from 'lucide-react'
import type { SeoLocale } from '@/lib/seo/locales'
import {
  MarketingBalancedFaqList,
  MarketingBalancedFeatureGrid,
  MarketingBalancedProcessSteps,
  MarketingContainer,
  MarketingCtaBanner,
  MarketingDiagnosticVisual,
  MarketingExampleVisual,
  MarketingExamplePreview,
  MarketingHeroShell,
  MarketingNarrativeSection,
  MarketingOpportunityGrid,
  MarketingPosterVisual,
  MarketingSectionAside,
  MarketingSnapshotGrid,
  MarketingSurface,
  type MarketingAction,
  type MarketingClosing,
  type MarketingColumn,
  type MarketingFaqItem,
  type MarketingOpportunity,
  type MarketingOpportunityLabels,
  type MarketingSnapshot,
  type MarketingSignal,
  type MarketingStep,
  type MarketingAsideItem,
  type MarketingVisualRow,
} from '@/components/marketing/marketing-sections'

interface SharedTemplateProps {
  sectionLabel: string
  title: string
  description: string
  primaryAction: MarketingAction
  secondaryAction?: MarketingAction
  signals: MarketingSignal[]
}

export interface HomepageTemplateProps extends SharedTemplateProps {
  heroVisualEyebrow: string
  heroVisualTitle: string
  heroVisualLayers: string[]
  supportEyebrow: string
  supportTitle: string
  supportDescription: string
  supportColumns: MarketingColumn[]
  detailEyebrow: string
  detailTitle: string
  detailDescription: string
  workflowSteps: MarketingStep[]
  closing: MarketingClosing
}

export interface CoreLandingTemplateProps extends SharedTemplateProps {
  heroVisualEyebrow: string
  heroVisualTitle: string
  heroVisualRows: MarketingVisualRow[]
  supportEyebrow: string
  supportTitle: string
  supportDescription: string
  diagnosticColumns: MarketingColumn[]
  detailEyebrow: string
  detailTitle: string
  detailDescription: string
  inputLabel: string
  inputExample: string[]
  outputLabel: string
  outputExample: string[]
  faqEyebrow: string
  faqTitle: string
  faqDescription: string
  faqItems: MarketingFaqItem[]
  relatedEyebrow: string
  relatedTitle: string
  relatedDescription: string
  relatedColumns: MarketingColumn[]
  closing: MarketingClosing
}

export interface PublicExampleTemplateProps extends SharedTemplateProps {
  heroVisualEyebrow: string
  heroVisualTitle: string
  heroVisualSteps: string[]
  supportEyebrow: string
  supportTitle: string
  supportDescription: string
  supportSnapshots: MarketingSnapshot[]
  opportunityEyebrow: string
  opportunityTitle: string
  opportunityDescription: string
  opportunityLabels: MarketingOpportunityLabels
  opportunityItems: MarketingOpportunity[]
  detailEyebrow: string
  detailTitle: string
  detailDescription: string
  diagnosticColumns: MarketingColumn[]
  relatedEyebrow: string
  relatedTitle: string
  relatedDescription: string
  relatedColumns: MarketingColumn[]
  closing: MarketingClosing
}

interface TemplateRuntimeProps {
  locale: SeoLocale
}

function createIndexedVisualItems(
  items: Array<{ title: string; meta?: string; label?: string }>
): MarketingAsideItem[] {
  return items.map((item, index) => ({
    label: item.label ?? `0${index + 1}`,
    title: item.title,
    meta: item.meta,
  }))
}

export function HomepageTemplate(props: HomepageTemplateProps & TemplateRuntimeProps) {
  const supportVisualItems = createIndexedVisualItems(
    props.supportColumns.slice(0, 3).map((item) => ({
      title: item.title,
      meta: item.actionLabel,
    }))
  )
  const workflowVisualItems = createIndexedVisualItems(
    props.workflowSteps.slice(0, 3).map((step) => ({
      label: step.label,
      title: step.title,
    }))
  )

  return (
    <>
      <MarketingHeroShell
        sectionLabel={props.sectionLabel}
        title={props.title}
        titleClassName="font-[580] sm:max-w-[18ch] lg:max-w-[28ch] lg:text-[clamp(2.7rem,2.85vw,3.75rem)]"
        description={props.description}
        primaryAction={props.primaryAction}
        secondaryAction={props.secondaryAction}
        signals={props.signals}
        visual={
          <MarketingPosterVisual
            locale={props.locale}
            eyebrow={props.heroVisualEyebrow}
            title={props.heroVisualTitle}
            layers={props.heroVisualLayers}
          />
        }
      />
      <MarketingSurface className="py-16 sm:py-20">
        <MarketingContainer>
          <MarketingNarrativeSection
            eyebrow={props.supportEyebrow}
            title={props.supportTitle}
            description={props.supportDescription}
            aside={
              <MarketingSectionAside
                eyebrow={props.supportEyebrow}
                items={supportVisualItems}
                tone="default"
              />
            }
          >
            <MarketingBalancedFeatureGrid
              items={props.supportColumns}
              icon={<Layers3 className="size-4 text-[oklch(0.58_0.16_250)]" />}
            />
          </MarketingNarrativeSection>
        </MarketingContainer>
      </MarketingSurface>
      <MarketingSurface className="border-t border-border/45 py-16 sm:py-20">
        <MarketingContainer>
          <MarketingNarrativeSection
            eyebrow={props.detailEyebrow}
            title={props.detailTitle}
            description={props.detailDescription}
            aside={
              <MarketingSectionAside
                eyebrow={props.detailEyebrow}
                items={workflowVisualItems}
                tone="default"
              />
            }
          >
            <MarketingBalancedProcessSteps steps={props.workflowSteps} />
          </MarketingNarrativeSection>
        </MarketingContainer>
      </MarketingSurface>
      <MarketingCtaBanner closing={props.closing} />
    </>
  )
}

export function CoreLandingTemplate(props: CoreLandingTemplateProps & TemplateRuntimeProps) {
  const supportVisualItems = createIndexedVisualItems(
    props.diagnosticColumns.slice(0, 3).map((item) => ({
      title: item.title,
      meta: item.actionLabel,
    }))
  )
  const previewVisualItems = createIndexedVisualItems(
    props.outputExample.slice(0, 3).map((item, index) => ({
      label: `0${index + 1}`,
      title: item,
    }))
  )
  const faqVisualItems = createIndexedVisualItems(
    props.faqItems.slice(0, 3).map((item, index) => ({
      label: `Q${index + 1}`,
      title: item.question,
    }))
  )
  const relatedVisualItems = createIndexedVisualItems(
    props.relatedColumns.slice(0, 3).map((item) => ({
      title: item.title,
      meta: item.actionLabel,
    }))
  )

  return (
    <>
      <MarketingHeroShell
        sectionLabel={props.sectionLabel}
        title={props.title}
        titleClassName="font-[560] sm:max-w-[18.5ch] lg:max-w-[25ch] lg:text-[clamp(2.6rem,2.65vw,3.55rem)]"
        description={props.description}
        primaryAction={props.primaryAction}
        secondaryAction={props.secondaryAction}
        signals={props.signals}
        visual={
          <MarketingDiagnosticVisual
            eyebrow={props.heroVisualEyebrow}
            title={props.heroVisualTitle}
            rows={props.heroVisualRows}
          />
        }
      />
      <MarketingSurface className="py-16 sm:py-20">
        <MarketingContainer>
          <MarketingNarrativeSection
            eyebrow={props.supportEyebrow}
            title={props.supportTitle}
            description={props.supportDescription}
            aside={
              <MarketingSectionAside
                eyebrow={props.supportEyebrow}
                items={supportVisualItems}
                tone="analysis"
              />
            }
          >
            <MarketingBalancedFeatureGrid
              items={props.diagnosticColumns}
              icon={<LineChart className="size-4 text-[oklch(0.58_0.16_250)]" />}
            />
          </MarketingNarrativeSection>
        </MarketingContainer>
      </MarketingSurface>
      <MarketingSurface className="border-t border-border/45 py-16 sm:py-20">
        <MarketingContainer>
          <MarketingNarrativeSection
            eyebrow={props.detailEyebrow}
            title={props.detailTitle}
            description={props.detailDescription}
            aside={
              <MarketingSectionAside
                eyebrow={props.detailEyebrow}
                items={previewVisualItems}
                tone="analysis"
              />
            }
          >
            <MarketingExamplePreview
              inputLabel={props.inputLabel}
              inputExample={props.inputExample}
              outputLabel={props.outputLabel}
              outputExample={props.outputExample}
            />
          </MarketingNarrativeSection>
        </MarketingContainer>
      </MarketingSurface>
      <MarketingSurface className="border-t border-border/45 py-16 sm:py-20">
        <MarketingContainer>
          <MarketingNarrativeSection
            eyebrow={props.faqEyebrow}
            title={props.faqTitle}
            description={props.faqDescription}
            aside={
              <MarketingSectionAside
                eyebrow={props.faqEyebrow}
                items={faqVisualItems}
                tone="analysis"
              />
            }
          >
            <MarketingBalancedFaqList items={props.faqItems} />
          </MarketingNarrativeSection>
        </MarketingContainer>
      </MarketingSurface>
      <MarketingSurface className="border-t border-border/45 py-16 sm:py-20">
        <MarketingContainer>
          <MarketingNarrativeSection
            eyebrow={props.relatedEyebrow}
            title={props.relatedTitle}
            description={props.relatedDescription}
            aside={
              <MarketingSectionAside
                eyebrow={props.relatedEyebrow}
                items={relatedVisualItems}
                tone="analysis"
              />
            }
          >
            <MarketingBalancedFeatureGrid
              items={props.relatedColumns}
              icon={<Layers3 className="size-4 text-[oklch(0.78_0.14_70)]" />}
            />
          </MarketingNarrativeSection>
        </MarketingContainer>
      </MarketingSurface>
      <MarketingCtaBanner closing={props.closing} />
    </>
  )
}

export function PublicExampleTemplate(props: PublicExampleTemplateProps & TemplateRuntimeProps) {
  const supportVisualItems = createIndexedVisualItems(
    props.supportSnapshots.slice(0, 3).map((item) => ({
      label: item.label,
      title: item.value,
    }))
  )
  const opportunityVisualItems = createIndexedVisualItems(
    props.opportunityItems.slice(0, 3).map((item, index) => ({
      label: item.rank ?? `0${index + 1}`,
      title: item.title,
      meta: `${props.opportunityLabels.score}: ${item.score}`,
    }))
  )
  const detailVisualItems = createIndexedVisualItems(
    props.diagnosticColumns.slice(0, 3).map((item) => ({
      title: item.title,
      meta: item.actionLabel,
    }))
  )
  const relatedVisualItems = createIndexedVisualItems(
    props.relatedColumns.slice(0, 3).map((item) => ({
      title: item.title,
      meta: item.actionLabel,
    }))
  )

  return (
    <>
      <MarketingHeroShell
        sectionLabel={props.sectionLabel}
        title={props.title}
        titleClassName="font-[540] sm:max-w-[19ch] lg:max-w-[27ch] lg:text-[clamp(2.45rem,2.45vw,3.2rem)]"
        description={props.description}
        primaryAction={props.primaryAction}
        secondaryAction={props.secondaryAction}
        signals={props.signals}
        visual={
          <MarketingExampleVisual
            eyebrow={props.heroVisualEyebrow}
            title={props.heroVisualTitle}
            steps={props.heroVisualSteps}
          />
        }
      />
      <MarketingSurface className="py-16 sm:py-20">
        <MarketingContainer>
          <MarketingNarrativeSection
            eyebrow={props.supportEyebrow}
            title={props.supportTitle}
            description={props.supportDescription}
            aside={
              <MarketingSectionAside
                eyebrow={props.supportEyebrow}
                items={supportVisualItems}
                tone="report"
              />
            }
          >
            <MarketingSnapshotGrid items={props.supportSnapshots} />
          </MarketingNarrativeSection>
        </MarketingContainer>
      </MarketingSurface>
      <MarketingSurface className="border-t border-border/45 py-16 sm:py-20">
        <MarketingContainer>
          <MarketingNarrativeSection
            eyebrow={props.opportunityEyebrow}
            title={props.opportunityTitle}
            description={props.opportunityDescription}
            aside={
              <MarketingSectionAside
                eyebrow={props.opportunityEyebrow}
                items={opportunityVisualItems}
                tone="report"
              />
            }
          >
            <MarketingOpportunityGrid
              items={props.opportunityItems}
              labels={props.opportunityLabels}
            />
          </MarketingNarrativeSection>
        </MarketingContainer>
      </MarketingSurface>
      <MarketingSurface className="border-t border-border/45 py-16 sm:py-20">
        <MarketingContainer>
          <MarketingNarrativeSection
            eyebrow={props.detailEyebrow}
            title={props.detailTitle}
            description={props.detailDescription}
            aside={
              <MarketingSectionAside
                eyebrow={props.detailEyebrow}
                items={detailVisualItems}
                tone="report"
              />
            }
          >
            <MarketingBalancedFeatureGrid
              items={props.diagnosticColumns}
              icon={<FileSearch className="size-4 text-[oklch(0.78_0.14_70)]" />}
            />
          </MarketingNarrativeSection>
        </MarketingContainer>
      </MarketingSurface>
      <MarketingSurface className="border-t border-border/45 py-16 sm:py-20">
        <MarketingContainer>
          <MarketingNarrativeSection
            eyebrow={props.relatedEyebrow}
            title={props.relatedTitle}
            description={props.relatedDescription}
            aside={
              <MarketingSectionAside
                eyebrow={props.relatedEyebrow}
                items={relatedVisualItems}
                tone="report"
              />
            }
          >
            <MarketingBalancedFeatureGrid
              items={props.relatedColumns}
              icon={<Layers3 className="size-4 text-[oklch(0.58_0.16_250)]" />}
            />
          </MarketingNarrativeSection>
        </MarketingContainer>
      </MarketingSurface>
      <MarketingCtaBanner closing={props.closing} />
    </>
  )
}
