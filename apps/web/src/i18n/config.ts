export const locales = ['en', 'ru'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const fallbackLocale: Locale = 'en'

export const localeCookieName = 'iris_locale'

export const localeCookieMaxAge = 60 * 60 * 24 * 365

export function isLocale(value: string | null | undefined): value is Locale {
  return locales.includes(value as Locale)
}

export function getPathLocale(pathname: string): Locale | undefined {
  const segment = pathname.split('/').filter(Boolean)[0]

  return isLocale(segment) ? segment : undefined
}

export function removeLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/')

  if (isLocale(segments[1])) {
    segments.splice(1, 1)
  }

  const path = segments.join('/')

  return path || '/'
}

export function getLocalizedPath(locale: Locale, path: string): string {
  const cleanPath = removeLocaleFromPath(path || '/')
  const normalizedPath = cleanPath === '/' ? '' : cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`

  return `/${locale}${normalizedPath}`
}
