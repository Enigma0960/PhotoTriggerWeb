import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { SiteAnalyticsTracker } from '@/components/SiteAnalyticsTracker'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { isLocale, locales } from '@/i18n/config'
import { getSiteGlobals } from '@/lib/getSiteGlobals'
import { notFound } from 'next/navigation'
import Script from 'next/script'

import '../styles.css'

export const dynamic = 'force-dynamic'

const themeInitScript = `
(() => {
  try {
    const storedTheme =
      window.localStorage.getItem('iris_theme') ||
      window.localStorage.getItem('starlight-theme');
    const theme = storedTheme === 'light' || storedTheme === 'dark'
      ? storedTheme
      : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {
    document.documentElement.dataset.theme = 'light';
  }
})();
`

function createGoogleAnalyticsScript(measurementId: string, anonymizeIp: boolean) {
  const measurementIdLiteral = JSON.stringify(measurementId)
  const config = anonymizeIp ? ', {"anonymize_ip":true}' : ''

  return `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${measurementIdLiteral}${config});
`
}

type Props = {
  children: ReactNode
  params: Promise<{
    locale: string
  }>
}

type MetadataProps = {
  params: Promise<{
    locale: string
  }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }))
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { locale } = await params

  if (!isLocale(locale)) {
    return {}
  }

  const { settings } = await getSiteGlobals(locale)

  const title = settings.metaTitle || settings.siteName || 'Project Iris'

  const description = settings.metaDescription || settings.description || undefined

  return {
    title: {
      default: title,
      template: `%s | ${settings.siteName}`,
    },

    description,
    icons: {
      icon: '/favicon.svg',
    },
  }
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  const { analytics, settings, header, footer } = await getSiteGlobals(locale)
  const googleAnalyticsMeasurementId =
    analytics?.googleAnalyticsEnabled && analytics.googleAnalyticsMeasurementId
      ? analytics.googleAnalyticsMeasurementId.trim()
      : ''

  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body>
        <Script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
          id="iris-theme-init"
          strategy="beforeInteractive"
        />

        {googleAnalyticsMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
                googleAnalyticsMeasurementId,
              )}`}
              strategy="afterInteractive"
            />
            <Script
              dangerouslySetInnerHTML={{
                __html: createGoogleAnalyticsScript(
                  googleAnalyticsMeasurementId,
                  analytics?.googleAnalyticsAnonymizeIp !== false,
                ),
              }}
              id="iris-google-analytics"
              strategy="afterInteractive"
            />
          </>
        )}

        <SiteAnalyticsTracker locale={locale} />

        <SiteHeader header={header} locale={locale} settings={settings} />

        <div className="site-content">{children}</div>

        <SiteFooter footer={footer} locale={locale} settings={settings} />
      </body>
    </html>
  )
}
