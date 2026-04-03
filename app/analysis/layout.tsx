import type { Metadata } from 'next'
import { buildNoIndexMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildNoIndexMetadata(
  'Analysis',
  'Private analysis progress and task state.'
)

export default function AnalysisLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
