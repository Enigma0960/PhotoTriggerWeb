'use client'

import { useEffect, useState } from 'react'

import type { Locale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'

type Theme = 'light' | 'dark'

type Props = {
  locale: Locale
}

const themeStorageKey = 'iris_theme'
const docsThemeStorageKey = 'starlight-theme'

function isTheme(value: string | null): value is Theme {
  return value === 'light' || value === 'dark'
}

function getPreferredTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const storedTheme =
    window.localStorage.getItem(themeStorageKey) || window.localStorage.getItem(docsThemeStorageKey)

  if (isTheme(storedTheme)) {
    return storedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
}

export function ThemeSwitcher({ locale }: Props) {
  const messages = getMessages(locale)
  const [theme, setTheme] = useState<Theme>(getPreferredTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  function switchTheme(nextTheme: Theme) {
    setTheme(nextTheme)
    window.localStorage.setItem(themeStorageKey, nextTheme)
    window.localStorage.setItem(docsThemeStorageKey, nextTheme)
  }

  return (
    <div
      aria-label={messages.common.colorTheme}
      className="theme-switcher"
      suppressHydrationWarning
    >
      {(['light', 'dark'] as const).map((item) => (
        <button
          aria-pressed={item === theme}
          key={item}
          onClick={() => switchTheme(item)}
          type="button"
        >
          {item === 'light' ? messages.common.lightTheme : messages.common.darkTheme}
        </button>
      ))}
    </div>
  )
}
