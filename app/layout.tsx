import type { Metadata, Viewport } from 'next'
import { headers } from 'next/headers'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/components/auth/auth-provider'
import { I18nProvider } from '@/components/i18n/i18n-provider'
import { GradientBackground } from '@/components/layout/gradient-background'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { getHtmlLang, getSeoLocaleOrFallback } from '@/lib/seo/locales'
import { siteRootMetadata } from '@/lib/seo/metadata'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = siteRootMetadata

export const viewport: Viewport = {
  themeColor: '#f7f8fc',
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const headerStore = await headers()
  const currentLocale = headerStore.get('x-seo-locale')
  const htmlLang = getHtmlLang(getSeoLocaleOrFallback(currentLocale ?? 'en'))

  return (
    <html lang={htmlLang} suppressHydrationWarning>
        <body className="font-sans antialiased flex min-h-screen flex-col" suppressHydrationWarning>
        <AuthProvider>
          <I18nProvider>
            <GradientBackground />
            <Navbar />
            <main className="flex-1 pt-14">
              {children}
            </main>
            <Footer />
            <Toaster
              position="top-right"
              theme="light"
              toastOptions={{
                style: {
                  background: 'oklch(0.995 0.002 250)',
                  border: '1px solid oklch(0.91 0.006 250)',
                  color: 'oklch(0.16 0.02 250)',
                },
              }}
            />
          </I18nProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
