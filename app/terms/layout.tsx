import type { Metadata } from 'next'
import { buildNoIndexMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildNoIndexMetadata(
  'Terms of Service',
  'Terms and conditions for BadgerSignal.'
)

export default function TermsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
