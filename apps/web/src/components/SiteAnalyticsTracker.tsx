'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

import type { Locale } from '@/i18n/config'

type Props = {
  locale: Locale
}

type SiteEventPayload = {
  eventType: 'external_click' | 'navigation_click' | 'page_view'
  path: string
  referrer?: string
  sessionId?: string
  target?: string
  title?: string
}

function getSessionId() {
  const storageKey = 'iris_site_session'

  try {
    const existingSessionId = window.sessionStorage.getItem(storageKey)

    if (existingSessionId) {
      return existingSessionId
    }

    const sessionId =
      typeof window.crypto.randomUUID === 'function'
        ? window.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`

    window.sessionStorage.setItem(storageKey, sessionId)

    return sessionId
  } catch {
    return undefined
  }
}

function trimText(value: string | undefined, maxLength: number) {
  return value ? value.trim().slice(0, maxLength) : undefined
}

function sendSiteEvent(locale: Locale, payload: SiteEventPayload) {
  const body = JSON.stringify({
    ...payload,
    path: trimText(payload.path, 500),
    referrer: trimText(payload.referrer, 1000),
    sessionId: trimText(payload.sessionId, 120),
    target: trimText(payload.target, 1000),
    title: trimText(payload.title, 300),
  })
  const endpoint = `/${locale}/site-events`

  if (typeof navigator.sendBeacon === 'function') {
    const blob = new Blob([body], { type: 'application/json' })

    if (navigator.sendBeacon(endpoint, blob)) {
      return
    }
  }

  void fetch(endpoint, {
    body,
    headers: {
      'content-type': 'application/json',
    },
    keepalive: true,
    method: 'POST',
  }).catch(() => undefined)
}

export function SiteAnalyticsTracker({ locale }: Props) {
  const pathname = usePathname()

  useEffect(() => {
    sendSiteEvent(locale, {
      eventType: 'page_view',
      path: `${window.location.pathname}${window.location.search}`,
      referrer: document.referrer,
      sessionId: getSessionId(),
      title: document.title,
    })
  }, [locale, pathname])

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target

      if (!(target instanceof Element)) {
        return
      }

      const link = target.closest('a')

      if (!link?.href) {
        return
      }

      const targetUrl = new URL(link.href, window.location.href)
      const eventType =
        targetUrl.origin === window.location.origin ? 'navigation_click' : 'external_click'

      sendSiteEvent(locale, {
        eventType,
        path: `${window.location.pathname}${window.location.search}`,
        sessionId: getSessionId(),
        target: targetUrl.href,
        title: link.textContent || undefined,
      })
    }

    document.addEventListener('click', handleClick, { capture: true })

    return () => {
      document.removeEventListener('click', handleClick, { capture: true })
    }
  }, [locale])

  return null
}
