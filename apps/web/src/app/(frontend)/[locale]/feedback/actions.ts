'use server'

import config from '@/payload.config'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

import { isLocale, type Locale } from '@/i18n/config'

function cleanFormValue(value: FormDataEntryValue | null) {
  return typeof value === 'string' ? value.trim() : ''
}

function feedbackPath(locale: Locale, query: string) {
  return `/${locale}/feedback?${query}`
}

export async function submitFeedback(locale: Locale, formData: FormData) {
  if (!isLocale(locale)) {
    redirect('/ru/feedback?error=validation')
  }

  const honeypot = cleanFormValue(formData.get('website'))

  if (honeypot) {
    redirect(feedbackPath(locale, 'sent=1'))
  }

  const name = cleanFormValue(formData.get('name'))
  const email = cleanFormValue(formData.get('email'))
  const message = cleanFormValue(formData.get('message'))

  if (!name || message.length < 10 || message.length > 5000) {
    redirect(feedbackPath(locale, 'error=validation'))
  }

  let failed = false

  try {
    const payload = await getPayload({ config })

    await payload.create({
      collection: 'feedback-messages',
      data: {
        email: email || undefined,
        locale,
        message,
        name,
        status: 'new',
      },
      draft: false,
    })
  } catch (error) {
    failed = true
    console.error('Failed to save feedback message.', error)
  }

  if (failed) {
    redirect(feedbackPath(locale, 'error=failed'))
  }

  redirect(feedbackPath(locale, 'sent=1'))
}
