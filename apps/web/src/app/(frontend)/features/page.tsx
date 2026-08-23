import config from '@/payload.config'
import Link from 'next/link'
import { getPayload } from 'payload'

export default async function FeaturesPage() {
    const payload = await getPayload({ config })

    const result = await payload.find({
        collection: 'features',
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
                <h1>Features</h1>

                <p>
                    Camera automation, sensors and triggering capabilities
                    available in Project Iris.
                </p>
            </header>

            <section>
                {result.docs.map((feature) => (
                    <article key={feature.id}>
                        <p>{feature.category}</p>

                        <h2>
                            <Link href={`/features/${feature.slug}`}>
                                {feature.title}
                            </Link>
                        </h2>

                        <p>{feature.summary}</p>

                        <p>
                            Development status: {feature.developmentStatus}
                        </p>

                        {feature.featured && <span>Featured</span>}
                    </article>
                ))}
            </section>
        </main>
    )
}
