'use client'

import { usePathname, useRouter } from 'next/navigation'

import {
  localeCookieMaxAge,
  localeCookieName,
  locales,
  type Locale,
} from '@/i18n/config'
import { getMessages } from '@/i18n/messages'

type Props = {
  locale: Locale
}

export function LanguageSwitcher({ locale }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const messages = getMessages(locale)

  function switchLocale(nextLocale: Locale) {
    if (nextLocale === locale) {
      return
    }

    // eslint-disable-next-line react-hooks/immutability -- Selecting a language persists an intentional browser cookie.
    document.cookie = [
      `${localeCookieName}=${nextLocale}`,
      'Path=/',
      `Max-Age=${localeCookieMaxAge}`,
      'SameSite=Lax',
    ].join('; ')

    const segments = pathname.split('/')

    if (segments[1] === 'ru' || segments[1] === 'en') {
      segments[1] = nextLocale
    } else {
      segments.splice(1, 0, nextLocale)
    }

    router.push(segments.join('/') || `/${nextLocale}`)
    router.refresh()
  }

  return (
    <div aria-label={messages.common.language} className="language-switcher">
      {locales.map((item) => (
        <button
          aria-pressed={item === locale}
          key={item}
          onClick={() => switchLocale(item)}
          type="button"
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
