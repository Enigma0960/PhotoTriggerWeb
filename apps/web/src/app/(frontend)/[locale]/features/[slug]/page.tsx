import { RichText } from '@/components/RichText'
import { fallbackLocale, getLocalizedPath, isLocale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'
import { resolveNavigationHref } from '@/lib/navigation'
import config from '@/payload.config'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

type Props = {
    params: Promise<{
        locale: string
        slug: string
    }>
}

async function getFeature(locale: string, slug: string) {
    if (!isLocale(locale)) {
        return null
    }

    const payload = await getPayload({ config })

    const result = await payload.find({
        collection: 'features',
        locale,
        fallbackLocale,
        draft: false,
        where: {
            and: [
                {
                    slug: {
                        equals: slug,
                    },
                },
                {
                    _status: {
                        equals: 'published',
                    },
                },
            ],
        },
        limit: 1,
    })

    return result.docs[0] ?? null
}

export async function generateMetadata({ params }: Props) {
    const { locale, slug } = await params
    const feature = await getFeature(locale, slug)

    if (!feature) {
        return {}
    }

    return {
        title: feature.title,
        description: feature.summary,
    }
}

export default async function FeaturePage({ params }: Props) {
    const { locale, slug } = await params

    if (!isLocale(locale)) {
        notFound()
    }

    const messages = getMessages(locale)
    const feature = await getFeature(locale, slug)

    if (!feature) {
        notFound()
    }

    return (
        <main>
            <nav>
                <Link href={getLocalizedPath(locale, '/features')}>
                    ← {messages.features.allFeatures}
                </Link>
            </nav>

            <header>
                <p>{messages.categories[feature.category]}</p>

                <h1>{feature.title}</h1>

                <p>{feature.summary}</p>

                <p>
                    {messages.features.developmentStatus}:{' '}
                    {messages.statuses[feature.developmentStatus]}
                </p>
            </header>

            <section className="feature-body">
                <RichText data={feature.description} />
            </section>

            {feature.documentationPath && (
                <section className="docs-cta">
                    <h2>{messages.features.technicalDocumentation}</h2>

                    <p>{messages.features.documentationIntro}</p>

                    <a
                        href={resolveNavigationHref(
                            {
                                destination: 'docs',
                                href: feature.documentationPath,
                            },
                            locale,
                        )}
                    >
                        {messages.features.openDocumentation} →
                    </a>
                </section>
            )}
        </main>
    )
}
