import { RichText } from '@/components/RichText'
import config from '@/payload.config'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

type Props = {
    params: Promise<{
        slug: string
    }>
}

export default async function FeaturePage({ params }: Props) {
    const { slug } = await params

    const payload = await getPayload({ config })

    const result = await payload.find({
        collection: 'features',
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

    const feature = result.docs[0]

    if (!feature) {
        notFound()
    }

    const docsBaseURL =
        process.env.NEXT_PUBLIC_DOCS_URL ?? 'http://localhost:4321'

    return (
        <main>
            <nav>
                <Link href="/features">
                    ← All features
                </Link>
            </nav>

            <header>
                <p>{feature.category}</p>

                <h1>{feature.title}</h1>

                <p>{feature.summary}</p>

                <p>
                    Development status: {feature.developmentStatus}
                </p>
            </header>

            <section>
                <RichText data={feature.description} />
            </section>

            {feature.documentationPath && (
                <section>
                    <h2>Technical documentation</h2>

                    <p>
                        Detailed implementation information is available
                        in the Project Iris documentation.
                    </p>

                    <a
                        href={`${docsBaseURL}${feature.documentationPath}`}
                    >
                        Open technical documentation →
                    </a>
                </section>
            )}
        </main>
    )
}
