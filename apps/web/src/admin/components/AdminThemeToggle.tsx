'use client'

import { useTheme } from '@payloadcms/ui'

type Theme = 'light' | 'dark'

const themeStorageKeys = ['iris_theme', 'starlight-theme']

export function AdminThemeToggle() {
  const { setTheme, theme } = useTheme()

  function switchTheme(nextTheme: Theme) {
    setTheme(nextTheme)

    for (const key of themeStorageKeys) {
      window.localStorage.setItem(key, nextTheme)
    }
  }

  return (
    <div aria-label="Цветовая тема" className="iris-admin-theme-toggle">
      {(['light', 'dark'] as const).map((item) => (
        <button
          aria-pressed={theme === item}
          key={item}
          onClick={() => switchTheme(item)}
          type="button"
        >
          {item === 'light' ? 'Светлая' : 'Темная'}
        </button>
      ))}
    </div>
  )
}
