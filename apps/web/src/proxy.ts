import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import {
  getPathLocale,
  isLocale,
  localeCookieMaxAge,
  localeCookieName,
  type Locale,
} from './i18n/config'

function detectBrowserLocale(request: NextRequest): Locale {
  const preferredLanguage = request.headers
    .get('accept-language')
    ?.split(',')[0]
    ?.trim()
    .toLowerCase()

  return preferredLanguage?.startsWith('ru') ? 'ru' : 'en'
}

function setLocaleCookie(response: NextResponse, locale: Locale) {
  response.cookies.set({
    name: localeCookieName,
    value: locale,
    path: '/',
    maxAge: localeCookieMaxAge,
    sameSite: 'lax',
  })
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const pathnameLocale = getPathLocale(pathname)

  if (pathnameLocale) {
    const response = NextResponse.next()

    if (request.cookies.get(localeCookieName)?.value !== pathnameLocale) {
      setLocaleCookie(response, pathnameLocale)
    }

    return response
  }

  const cookieLocale = request.cookies.get(localeCookieName)?.value
  const locale = isLocale(cookieLocale) ? cookieLocale : detectBrowserLocale(request)
  const url = request.nextUrl.clone()

  url.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`

  const response = NextResponse.redirect(url)

  setLocaleCookie(response, locale)

  return response
}

export const config = {
  matcher: [
    '/((?!admin|api|graphql|graphql-playground|_next|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
}
