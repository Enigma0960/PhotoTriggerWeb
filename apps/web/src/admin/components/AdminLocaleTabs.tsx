'use client'

import { getTranslation } from '@payloadcms/translations'
import { useConfig, useLocale, useTranslation } from '@payloadcms/ui'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function AdminLocaleTabs() {
  const {
    config: { localization },
  } = useConfig()
  const currentLocale = useLocale()
  const { i18n } = useTranslation()
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  if (!localization || localization.locales.length < 2) {
    return null
  }

  const label = i18n.language === 'en' ? 'Translation language' : 'Язык перевода'

  function switchLocale(nextLocale: string) {
    if (nextLocale === currentLocale.code) {
      return
    }

    const params = new URLSearchParams(searchParams.toString())
    params.set('locale', nextLocale)

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <section aria-label={label} className="iris-locale-tabs">
      <span className="iris-locale-tabs__label">{label}</span>

      <div className="iris-locale-tabs__tabs" role="tablist">
        {localization.locales.map((locale) => {
          const label = getTranslation(locale.label, i18n)
          const isActive = locale.code === currentLocale.code

          return (
            <button
              aria-selected={isActive}
              key={locale.code}
              onClick={() => switchLocale(locale.code)}
              role="tab"
              type="button"
            >
              <span>{label}</span>
              <strong>{locale.code.toUpperCase()}</strong>
            </button>
          )
        })}
      </div>
    </section>
  )
}
