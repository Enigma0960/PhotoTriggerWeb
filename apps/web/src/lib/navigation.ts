import { getLocalizedPath, type Locale } from '@/i18n/config'

type NavigationItem = {
  destination?: 'internal' | 'docs' | 'external' | null
  href?: string | null
  newTab?: boolean | null
}

function joinURL(base: string, path: string): string {
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}

export function resolveNavigationHref(item: NavigationItem, locale: Locale): string {
  const href = item.href || '/'

  if (item.destination === 'docs') {
    const docsBaseURL = process.env.NEXT_PUBLIC_DOCS_URL ?? 'http://localhost:4321'

    return joinURL(docsBaseURL, getLocalizedPath(locale, href))
  }

  if (item.destination === 'external') {
    return href
  }

  return getLocalizedPath(locale, href)
}

export function isExternalNavigation(item: NavigationItem): boolean {
  return item.destination === 'docs' || item.destination === 'external'
}
