import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { isLocale, locales } from '@/i18n/config'
import { getSiteGlobals } from '@/lib/getSiteGlobals'
import { notFound } from 'next/navigation'

import '../styles.css'

export const dynamic = 'force-dynamic'

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

    const title =
        settings.metaTitle ||
        settings.siteName ||
        'Project Iris'

    const description =
        settings.metaDescription ||
        settings.description ||
        undefined

    return {
        title: {
            default: title,
            template: `%s | ${settings.siteName}`,
        },

        description,
    }
}

export default async function RootLayout({
    children,
    params,
}: Props) {
    const { locale } = await params

    if (!isLocale(locale)) {
        notFound()
    }

    const {
        settings,
        header,
        footer,
    } = await getSiteGlobals(locale)

    return (
        <html lang={locale}>
        <body>
        <SiteHeader
            header={header}
            locale={locale}
            settings={settings}
        />

        <div className="site-content">
            {children}
        </div>

        <SiteFooter
            footer={footer}
            locale={locale}
            settings={settings}
        />
        </body>
        </html>
    )
}
