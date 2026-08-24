import config from '@/payload.config'

import { fallbackLocale, type Locale } from '@/i18n/config'
import { getPayload } from 'payload'
import { cache } from 'react'

async function findOptionalGlobal(
  payload: Awaited<ReturnType<typeof getPayload>>,
  slug: 'analytics-settings',
  locale: Locale,
) {
  try {
    return await payload.findGlobal({
      slug,
      locale,
      fallbackLocale,
    })
  } catch (error) {
    console.error(`Failed to load optional global "${slug}".`, error)

    return null
  }
}

export const getSiteGlobals = cache(async (locale: Locale) => {
  const payload = await getPayload({ config })

  const [settings, header, footer, analytics] = await Promise.all([
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

    findOptionalGlobal(payload, 'analytics-settings', locale),
  ])

  return {
    analytics,
    settings,
    header,
    footer,
  }
})
