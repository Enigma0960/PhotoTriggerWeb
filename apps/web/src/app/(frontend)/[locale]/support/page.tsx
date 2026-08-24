import type { Metadata } from 'next'

import config from '@/payload.config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import { fallbackLocale, getLocalizedPath, isLocale, type Locale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'
import type { SupportPage } from '@/payload-types'

type Props = {
  params: Promise<{
    locale: string
  }>
}

type SupportOptionViewModel = {
  ctaLabel: string
  href: string
  key: string
  newTab: boolean | null | undefined
  text: string
  title: string
}

function getText(value: string | null | undefined, fallback: string) {
  return value?.trim() || fallback
}

function getSupportOptions(
  value: SupportPage['supportOptions'],
  fallback: readonly { ctaLabel: string; href: string; text: string; title: string }[],
): SupportOptionViewModel[] {
  const options =
    value?.flatMap((option, index) => {
      const ctaLabel = option.ctaLabel?.trim()
      const href = option.href?.trim()
      const text = option.text?.trim()
      const title = option.title?.trim()

      if (!ctaLabel || !href || !text || !title) {
        return []
      }

      return [
        {
          ctaLabel,
          href,
          key: option.id || `support-option-${index}`,
          newTab: option.newTab,
          text,
          title,
        },
      ]
    }) ?? []

  if (options.length > 0) {
    return options
  }

  return fallback.map((option, index) => ({
    ...option,
    key: `fallback-support-option-${index}`,
    newTab: false,
  }))
}

function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href)
}

function resolveHref(locale: Locale, href: string) {
  return isExternalHref(href) ? href : getLocalizedPath(locale, href)
}

async function getSupportPage(locale: Locale): Promise<SupportPage | null> {
  try {
    const payload = await getPayload({ config })

    return await payload.findGlobal({
      slug: 'support-page',
      locale,
      fallbackLocale,
    })
  } catch (error) {
    console.error('Failed to load editable support page content.', error)

    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  if (!isLocale(locale)) {
    return {}
  }

  const support = getMessages(locale).support

  return {
    description: support.intro,
    title: support.title,
  }
}

export default async function SupportPage({ params }: Props) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  const support = getMessages(locale).support
  const supportPage = await getSupportPage(locale)
  const supportOptions = getSupportOptions(supportPage?.supportOptions, support.supportOptions)

  return (
    <main className="support-page">
      <header>
        <p className="eyebrow">{getText(supportPage?.eyebrow, support.eyebrow)}</p>

        <h1>{getText(supportPage?.title, support.title)}</h1>

        <p className="lede">{getText(supportPage?.intro, support.intro)}</p>
      </header>

      <section aria-labelledby="support-options-title" className="support-section">
        <header>
          <h2 id="support-options-title">
            {getText(supportPage?.supportOptionsTitle, support.supportOptionsTitle)}
          </h2>

          <p>{getText(supportPage?.supportOptionsIntro, support.supportOptionsIntro)}</p>
        </header>

        <div className="support-options">
          {supportOptions.map((option) => {
            const href = resolveHref(locale, option.href)
            const isExternal = isExternalHref(href)

            return (
              <article className="support-option" key={option.key}>
                <h3>{option.title}</h3>

                <p>{option.text}</p>

                {isExternal ? (
                  <a
                    className="button button--quiet"
                    href={href}
                    rel={option.newTab ? 'noopener noreferrer' : undefined}
                    target={option.newTab ? '_blank' : undefined}
                  >
                    {option.ctaLabel}
                  </a>
                ) : (
                  <Link className="button button--quiet" href={href}>
                    {option.ctaLabel}
                  </Link>
                )}
              </article>
            )
          })}
        </div>
      </section>

      <section aria-labelledby="support-feedback-title" className="support-feedback-cta">
        <div>
          <h2 id="support-feedback-title">
            {getText(supportPage?.feedbackCtaTitle, support.feedbackCtaTitle)}
          </h2>

          <p>{getText(supportPage?.feedbackCtaText, support.feedbackCtaText)}</p>
        </div>

        <Link className="button button--primary" href={getLocalizedPath(locale, '/feedback')}>
          {getText(supportPage?.feedbackCtaButton, support.feedbackCtaButton)}
        </Link>
      </section>
    </main>
  )
}
