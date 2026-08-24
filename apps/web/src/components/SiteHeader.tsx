import type { Header, SiteSettings } from '@/payload-types'

import { SiteControls } from '@/components/SiteControls'
import type { Locale } from '@/i18n/config'
import { getLocalizedPath } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'
import Link from 'next/link'

import { isExternalNavigation, resolveNavigationHref } from '@/lib/navigation'

type Props = {
  header: Header
  locale: Locale
  settings: SiteSettings
}

export function SiteHeader({ header, locale, settings }: Props) {
  const messages = getMessages(locale)

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-brand" href={getLocalizedPath(locale, '/')}>
          {settings.siteName}
        </Link>

        <nav aria-label={messages.common.home} className="site-navigation">
          {header.navigation?.map((item) => {
            const href = resolveNavigationHref(item, locale)

            if (isExternalNavigation(item)) {
              return (
                <a
                  href={href}
                  key={item.id}
                  rel={item.newTab ? 'noopener noreferrer' : undefined}
                  target={item.newTab ? '_blank' : undefined}
                >
                  {item.label}
                </a>
              )
            }

            return (
              <Link href={href} key={item.id}>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <SiteControls locale={locale} />
      </div>
    </header>
  )
}
