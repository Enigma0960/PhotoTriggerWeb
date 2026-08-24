import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getLocalizedPath, isLocale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'
import { getSiteGlobals } from '@/lib/getSiteGlobals'
import { resolveNavigationHref } from '@/lib/navigation'

type Props = {
  params: Promise<{
    locale: string
  }>
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  const messages = getMessages(locale)
  const { settings } = await getSiteGlobals(locale)
  const docsHref = resolveNavigationHref(
    {
      destination: 'docs',
      href: '/',
    },
    locale,
  )

  return (
    <main className="home-page">
      <section className="home-hero">
        <p className="eyebrow">{messages.home.eyebrow}</p>

        <h1>{settings.tagline || messages.home.title}</h1>

        <p className="lede">{settings.description || messages.home.intro}</p>

        <div className="home-actions">
          <Link className="button button--primary" href={getLocalizedPath(locale, '/features')}>
            {messages.home.featuresLink}
          </Link>

          <Link className="button" href={getLocalizedPath(locale, '/roadmap')}>
            {messages.home.roadmapLink}
          </Link>

          <Link className="button" href={getLocalizedPath(locale, '/dev-blog')}>
            {messages.home.devBlogLink}
          </Link>

          <a className="button" href={docsHref}>
            {messages.home.docsLink}
          </a>

          <Link className="button button--quiet" href="/admin">
            {messages.home.adminLink}
          </Link>
        </div>
      </section>
    </main>
  )
}
