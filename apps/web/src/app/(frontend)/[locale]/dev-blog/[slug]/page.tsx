import { RichText } from '@/components/RichText'
import { fallbackLocale, getLocalizedPath, isLocale, type Locale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'
import config from '@/payload.config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

type Props = {
  params: Promise<{
    locale: string
    slug: string
  }>
  searchParams: Promise<{
    draftToken?: string | string[]
  }>
}

function getDraftToken(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function formatDate(locale: Locale, value: string) {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))
}

async function getPost(locale: Locale, slug: string, draftToken?: string) {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'dev-blog-posts',
    locale,
    fallbackLocale,
    draft: Boolean(draftToken),
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        draftToken
          ? {
              reviewToken: {
                equals: draftToken,
              },
            }
          : {
              _status: {
                equals: 'published',
              },
            },
      ],
    },
    limit: 1,
    overrideAccess: true,
  })

  return result.docs[0] ?? null
}

export async function generateMetadata({ params, searchParams }: Props) {
  const { locale, slug } = await params
  const { draftToken } = await searchParams

  if (!isLocale(locale)) {
    return {}
  }

  const post = await getPost(locale, slug, getDraftToken(draftToken))

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function DevBlogPostPage({ params, searchParams }: Props) {
  const { locale, slug } = await params
  const { draftToken } = await searchParams

  if (!isLocale(locale)) {
    notFound()
  }

  const token = getDraftToken(draftToken)
  const messages = getMessages(locale)
  const post = await getPost(locale, slug, token)

  if (!post) {
    notFound()
  }

  return (
    <main>
      <nav>
        <Link href={getLocalizedPath(locale, '/dev-blog')}>← {messages.devBlog.allPosts}</Link>
      </nav>

      {token && (
        <section className="draft-preview-banner">
          <strong>{messages.devBlog.draftPreview}</strong>
          <p>{messages.devBlog.draftPreviewDescription}</p>
        </section>
      )}

      <article className="dev-blog-post">
        <header>
          <p className="dev-blog-date">
            {messages.devBlog.createdAt}:{' '}
            <time dateTime={post.createdAt}>{formatDate(locale, post.createdAt)}</time>
          </p>

          <h1>{post.title}</h1>
          <p className="lede">{post.excerpt}</p>
        </header>

        <section className="dev-blog-content">
          <RichText data={post.content} />
        </section>
      </article>
    </main>
  )
}
