import config from '@/payload.config'
import { headers } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import { getPayload } from 'payload'

import { isLocale } from '@/i18n/config'

type Props = {
  params: Promise<{
    locale: string
  }>
}

const eventTypes = ['external_click', 'navigation_click', 'page_view'] as const

function isEventType(value: unknown): value is (typeof eventTypes)[number] {
  return typeof value === 'string' && eventTypes.includes(value as (typeof eventTypes)[number])
}

function getText(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : undefined
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isMissingTableError(error: unknown): boolean {
  if (!isRecord(error)) {
    return false
  }

  if (error.code === '42P01') {
    return true
  }

  return isMissingTableError(error.cause)
}

export async function POST(request: NextRequest, { params }: Props) {
  const { locale } = await params

  if (!isLocale(locale)) {
    return NextResponse.json({ ok: false }, { status: 404 })
  }

  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const eventType = 'eventType' in body ? body.eventType : undefined

  if (!isEventType(eventType)) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const path = getText('path' in body ? body.path : undefined, 500)

  if (!path) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  try {
    const payload = await getPayload({ config })
    const requestHeaders = await headers()

    await payload.create({
      collection: 'site-events',
      data: {
        eventType,
        locale,
        path,
        referrer: getText('referrer' in body ? body.referrer : undefined, 1000),
        sessionId: getText('sessionId' in body ? body.sessionId : undefined, 120),
        target: getText('target' in body ? body.target : undefined, 1000),
        title: getText('title' in body ? body.title : undefined, 300),
        userAgent: getText(requestHeaders.get('user-agent'), 500),
      },
      draft: false,
      overrideAccess: true,
    })
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.error('Failed to save site event.', error)
    }

    return NextResponse.json({ ok: false }, { status: 202 })
  }

  return NextResponse.json({ ok: true })
}
