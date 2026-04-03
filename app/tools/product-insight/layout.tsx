import type { Metadata } from 'next'
import { buildNoIndexMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildNoIndexMetadata(
  'Product Insight Tool',
  'Interactive product insight workflow for signed-in use.'
)

export default function ProductInsightLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
