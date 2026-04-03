import type { Metadata } from 'next'
import { buildNoIndexMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildNoIndexMetadata(
  'Privacy Policy',
  'Privacy information for BadgerSignal.'
)

export default function PrivacyLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
