import type { Metadata } from 'next'
import { buildNoIndexMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildNoIndexMetadata(
  'Report',
  'Private report results and exports.'
)

export default function ReportLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
