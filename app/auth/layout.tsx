import type { Metadata } from 'next'
import { buildNoIndexMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildNoIndexMetadata(
  'Authentication',
  'Authentication support routes for sign-in and callback flows.'
)

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
