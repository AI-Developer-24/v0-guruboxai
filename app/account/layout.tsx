import type { Metadata } from 'next'
import { buildNoIndexMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildNoIndexMetadata(
  'Account',
  'User account settings and report history.'
)

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
