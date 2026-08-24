import config from '@/payload.config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import { fallbackLocale, getLocalizedPath, isLocale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'

type Props = {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params

  if (!isLocale(locale)) {
    return {}
  }

  const messages = getMessages(locale)

  return {
    title: messages.features.title,
    description: messages.features.intro,
  }
}

export default async function FeaturesPage({ params }: Props) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  const messages = getMessages(locale)
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'features',
    locale,
    fallbackLocale,
    draft: false,
    where: {
      _status: {
        equals: 'published',
      },
    },
    sort: 'order',
    limit: 100,
  })

  return (
    <main>
      <header>
        <p>Project Iris</p>
        <h1>{messages.features.title}</h1>

        <p>{messages.features.intro}</p>
      </header>

      <section className="feature-list">
        {result.docs.length === 0 && <p>{messages.features.empty}</p>}

        {result.docs.map((feature) => (
          <article key={feature.id}>
            <p>{messages.categories[feature.category]}</p>

            <h2>
              <Link href={getLocalizedPath(locale, `/features/${feature.slug}`)}>
                {feature.title}
              </Link>
            </h2>

            <p>{feature.summary}</p>

            <p>
              {messages.features.developmentStatus}: {messages.statuses[feature.developmentStatus]}
            </p>

            {feature.featured && <span>{messages.features.featured}</span>}
          </article>
        ))}
      </section>
    </main>
  )
}
