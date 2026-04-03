import { FileSearch, Layers3, LineChart } from 'lucide-react'
import type { SeoLocale } from '@/lib/seo/locales'
import {
  MarketingContainer,
  MarketingCtaBanner,
  MarketingDiagnosticVisual,
  MarketingExampleVisual,
  MarketingExamplePreview,
  MarketingFaqList,
  MarketingFeatureGrid,
  MarketingHeroShell,
  MarketingOpportunityGrid,
  MarketingPosterVisual,
  MarketingProcessSteps,
  MarketingSectionHeading,
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

export function HomepageTemplate(props: HomepageTemplateProps & TemplateRuntimeProps) {
  return (
    <>
      <MarketingHeroShell
        sectionLabel={props.sectionLabel}
        title={props.title}
        titleClassName="font-[580] max-w-none text-[clamp(2.15rem,7vw,3rem)] sm:max-w-[11.8ch] sm:text-[clamp(2.85rem,5.6vw,4rem)] lg:max-w-[12.6ch] lg:text-[clamp(3.35rem,4.3vw,4.6rem)]"
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
        <MarketingContainer className="space-y-10">
          <MarketingSectionHeading
            eyebrow={props.supportEyebrow}
            title={props.supportTitle}
            description={props.supportDescription}
          />
          <MarketingFeatureGrid
            items={props.supportColumns}
            icon={<Layers3 className="size-4 text-[oklch(0.58_0.16_250)]" />}
          />
        </MarketingContainer>
      </MarketingSurface>
      <MarketingSurface className="border-t border-border/45 py-16 sm:py-20">
        <MarketingContainer className="space-y-10">
          <MarketingSectionHeading
            eyebrow={props.detailEyebrow}
            title={props.detailTitle}
            description={props.detailDescription}
          />
          <MarketingProcessSteps steps={props.workflowSteps} />
        </MarketingContainer>
      </MarketingSurface>
      <MarketingCtaBanner closing={props.closing} />
    </>
  )
}

export function CoreLandingTemplate(props: CoreLandingTemplateProps & TemplateRuntimeProps) {
  return (
    <>
      <MarketingHeroShell
        sectionLabel={props.sectionLabel}
        title={props.title}
        titleClassName="font-[560] max-w-none text-[clamp(2.05rem,6.7vw,2.85rem)] sm:max-w-[12.2ch] sm:text-[clamp(2.65rem,4.9vw,3.6rem)] lg:max-w-[13ch] lg:text-[clamp(3.05rem,3.8vw,4rem)]"
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
        <MarketingContainer className="space-y-10">
          <MarketingSectionHeading
            eyebrow={props.supportEyebrow}
            title={props.supportTitle}
            description={props.supportDescription}
          />
          <MarketingFeatureGrid
            items={props.diagnosticColumns}
            icon={<LineChart className="size-4 text-[oklch(0.58_0.16_250)]" />}
          />
        </MarketingContainer>
      </MarketingSurface>
      <MarketingSurface className="border-t border-border/45 py-16 sm:py-20">
        <MarketingContainer className="space-y-10">
          <MarketingSectionHeading
            eyebrow={props.detailEyebrow}
            title={props.detailTitle}
            description={props.detailDescription}
          />
          <MarketingExamplePreview
            inputLabel={props.inputLabel}
            inputExample={props.inputExample}
            outputLabel={props.outputLabel}
            outputExample={props.outputExample}
          />
        </MarketingContainer>
      </MarketingSurface>
      <MarketingSurface className="border-t border-border/45 py-16 sm:py-20">
        <MarketingContainer className="space-y-10">
          <MarketingSectionHeading
            eyebrow={props.faqEyebrow}
            title={props.faqTitle}
            description={props.faqDescription}
          />
          <MarketingFaqList items={props.faqItems} />
        </MarketingContainer>
      </MarketingSurface>
      <MarketingSurface className="border-t border-border/45 py-16 sm:py-20">
        <MarketingContainer className="space-y-10">
          <MarketingSectionHeading
            eyebrow={props.relatedEyebrow}
            title={props.relatedTitle}
            description={props.relatedDescription}
          />
          <MarketingFeatureGrid
            items={props.relatedColumns}
            icon={<Layers3 className="size-4 text-[oklch(0.78_0.14_70)]" />}
          />
        </MarketingContainer>
      </MarketingSurface>
      <MarketingCtaBanner closing={props.closing} />
    </>
  )
}

export function PublicExampleTemplate(props: PublicExampleTemplateProps & TemplateRuntimeProps) {
  return (
    <>
      <MarketingHeroShell
        sectionLabel={props.sectionLabel}
        title={props.title}
        titleClassName="font-[540] max-w-none text-[clamp(1.95rem,6vw,2.7rem)] sm:max-w-[12ch] sm:text-[clamp(2.45rem,4.3vw,3.35rem)] lg:max-w-[12.7ch] lg:text-[clamp(2.8rem,3.45vw,3.55rem)]"
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
        <MarketingContainer className="space-y-10">
        <MarketingSectionHeading
          eyebrow={props.supportEyebrow}
          title={props.supportTitle}
          description={props.supportDescription}
        />
        <MarketingSnapshotGrid items={props.supportSnapshots} />
        <div className="space-y-8 pt-4">
          <MarketingSectionHeading
            eyebrow={props.opportunityEyebrow}
            title={props.opportunityTitle}
            description={props.opportunityDescription}
          />
          <MarketingOpportunityGrid
            items={props.opportunityItems}
            labels={props.opportunityLabels}
          />
        </div>
        </MarketingContainer>
      </MarketingSurface>
      <MarketingSurface className="border-t border-border/45 py-16 sm:py-20">
        <MarketingContainer className="space-y-10">
          <MarketingSectionHeading
            eyebrow={props.detailEyebrow}
            title={props.detailTitle}
            description={props.detailDescription}
          />
          <MarketingFeatureGrid
            items={props.diagnosticColumns}
            icon={<FileSearch className="size-4 text-[oklch(0.78_0.14_70)]" />}
          />
        </MarketingContainer>
      </MarketingSurface>
      <MarketingSurface className="border-t border-border/45 py-16 sm:py-20">
        <MarketingContainer className="space-y-10">
          <MarketingSectionHeading
            eyebrow={props.relatedEyebrow}
            title={props.relatedTitle}
            description={props.relatedDescription}
          />
          <MarketingFeatureGrid
            items={props.relatedColumns}
            icon={<Layers3 className="size-4 text-[oklch(0.58_0.16_250)]" />}
          />
        </MarketingContainer>
      </MarketingSurface>
      <MarketingCtaBanner closing={props.closing} />
    </>
  )
}
