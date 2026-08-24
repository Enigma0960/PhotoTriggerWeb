import { fallbackLocale, getLocalizedPath, isLocale, type Locale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'
import config from '@/payload.config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

type Props = {
    params: Promise<{
        locale: string
    }>
}

function formatDate(locale: Locale, value: string) {
    return new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(value))
}

export async function generateMetadata({ params }: Props) {
    const { locale } = await params

    if (!isLocale(locale)) {
        return {}
    }

    const messages = getMessages(locale)

    return {
        title: messages.devBlog.title,
        description: messages.devBlog.intro,
    }
}

export default async function DevBlogPage({ params }: Props) {
    const { locale } = await params

    if (!isLocale(locale)) {
        notFound()
    }

    const messages = getMessages(locale)
    const payload = await getPayload({ config })
    const posts = await payload.find({
        collection: 'dev-blog-posts',
        locale,
        fallbackLocale,
        draft: false,
        where: {
            _status: {
                equals: 'published',
            },
        },
        sort: '-publishedAt',
        limit: 30,
    })

    return (
        <main>
            <header>
                <p>Project Iris</p>
                <h1>{messages.devBlog.title}</h1>
                <p>{messages.devBlog.intro}</p>
            </header>

            <section className="dev-blog-list">
                {posts.docs.length === 0 && <p>{messages.devBlog.empty}</p>}

                {posts.docs.map((post) => (
                    <article className="dev-blog-card" key={post.id}>
                        <p className="dev-blog-date">
                            {messages.devBlog.createdAt}:{' '}
                            <time dateTime={post.createdAt}>{formatDate(locale, post.createdAt)}</time>
                        </p>

                        <h2>
                            <Link href={getLocalizedPath(locale, `/dev-blog/${post.slug}`)}>
                                {post.title}
                            </Link>
                        </h2>

                        <p>{post.excerpt}</p>

                        <Link className="text-link" href={getLocalizedPath(locale, `/dev-blog/${post.slug}`)}>
                            {messages.devBlog.readPost} →
                        </Link>
                    </article>
                ))}
            </section>
        </main>
    )
}
