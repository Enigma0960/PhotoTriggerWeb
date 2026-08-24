import type { Metadata } from 'next'

import { notFound } from 'next/navigation'

import { isLocale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'

import { submitFeedback } from './actions'

type Props = {
  params: Promise<{
    locale: string
  }>
  searchParams?: Promise<{
    error?: string | string[]
    sent?: string | string[]
  }>
}

function getQueryValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  if (!isLocale(locale)) {
    return {}
  }

  const feedback = getMessages(locale).feedback

  return {
    description: feedback.intro,
    title: feedback.title,
  }
}

export default async function FeedbackPage({ params, searchParams }: Props) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  const query = (await searchParams) ?? {}
  const feedback = getMessages(locale).feedback
  const sent = getQueryValue(query.sent) === '1'
  const error = getQueryValue(query.error)

  return (
    <main className="feedback-page">
      <header>
        <p className="eyebrow">{feedback.eyebrow}</p>

        <h1>{feedback.title}</h1>

        <p className="lede">{feedback.intro}</p>
      </header>

      <section aria-labelledby="feedback-form-title" className="feedback-shell">
        <div className="feedback-copy">
          <h2 id="feedback-form-title">{feedback.formTitle}</h2>

          <p>{feedback.formIntro}</p>
        </div>

        <form action={submitFeedback.bind(null, locale)} className="feedback-form">
          {sent && <p className="form-status form-status--success">{feedback.success}</p>}

          {error === 'validation' && (
            <p className="form-status form-status--error">{feedback.validationError}</p>
          )}

          {error === 'failed' && (
            <p className="form-status form-status--error">{feedback.failedError}</p>
          )}

          <label>
            <span>{feedback.nameLabel}</span>
            <input autoComplete="name" maxLength={120} name="name" required type="text" />
          </label>

          <label>
            <span>{feedback.emailLabel}</span>
            <input autoComplete="email" name="email" type="email" />
          </label>

          <label>
            <span>{feedback.messageLabel}</span>
            <textarea maxLength={5000} minLength={10} name="message" required rows={7} />
          </label>

          <label aria-hidden="true" className="feedback-form__website">
            <span>Website</span>
            <input autoComplete="off" name="website" tabIndex={-1} type="text" />
          </label>

          <button className="button button--primary" type="submit">
            {feedback.submit}
          </button>
        </form>
      </section>
    </main>
  )
}
