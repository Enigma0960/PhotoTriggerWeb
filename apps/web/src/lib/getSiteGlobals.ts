import config from '@/payload.config'

import { fallbackLocale, type Locale } from '@/i18n/config'
import { getPayload } from 'payload'
import { cache } from 'react'

export const getSiteGlobals = cache(async (locale: Locale) => {
    const payload = await getPayload({ config })

    const [settings, header, footer] = await Promise.all([
        payload.findGlobal({
            slug: 'site-settings',
            locale,
            fallbackLocale,
        }),

        payload.findGlobal({
            slug: 'header',
            locale,
            fallbackLocale,
        }),

        payload.findGlobal({
            slug: 'footer',
            locale,
            fallbackLocale,
        }),
    ])

    return {
        settings,
        header,
        footer,
    }
})
