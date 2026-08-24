import { randomBytes } from 'crypto'
import type { CollectionConfig } from 'payload'

function createReviewToken() {
    return randomBytes(24).toString('base64url')
}

function buildReviewLink(locale: 'en' | 'ru', slug?: string | null, token?: string | null) {
    if (!slug || !token) {
        return ''
    }

    return `/${locale}/dev-blog/${slug}?draftToken=${token}`
}

export const DevBlogPosts: CollectionConfig = {
    slug: 'dev-blog-posts',

    labels: {
        singular: {
            en: 'Dev Blog Post',
            ru: 'Запись dev-blog',
        },
        plural: {
            en: 'Dev Blog',
            ru: 'Dev-blog',
        },
    },

    admin: {
        useAsTitle: 'title',
        defaultColumns: [
            'title',
            'slug',
            'publishedAt',
            '_status',
            'createdAt',
        ],
        group: 'Сайт',
    },

    access: {
        read: ({ req: { user } }) => {
            if (user) {
                return true
            }

            return {
                _status: {
                    equals: 'published',
                },
            }
        },
        create: ({ req: { user } }) => Boolean(user),
        update: ({ req: { user } }) => Boolean(user),
        delete: ({ req: { user } }) => Boolean(user),
    },

    versions: {
        drafts: true,
        maxPerDoc: 30,
    },

    hooks: {
        beforeValidate: [
            ({ data, originalDoc }) => {
                if (!data) {
                    return data
                }

                const reviewToken = data.reviewToken || originalDoc?.reviewToken || createReviewToken()

                data.reviewToken = reviewToken
                data.reviewLinkRu = buildReviewLink('ru', data.slug, reviewToken)
                data.reviewLinkEn = buildReviewLink('en', data.slug, reviewToken)

                if (data._status === 'published' && !data.publishedAt) {
                    data.publishedAt = new Date().toISOString()
                }

                return data
            },
        ],
    },

    fields: [
        {
            name: 'title',
            label: {
                en: 'Title',
                ru: 'Заголовок',
            },
            type: 'text',
            required: true,
            localized: true,
        },
        {
            name: 'slug',
            label: {
                en: 'Slug',
                ru: 'Slug',
            },
            type: 'text',
            required: true,
            unique: true,
            index: true,
            admin: {
                description: 'Stable URL part, e.g. first-prototype-notes.',
            },
        },
        {
            name: 'excerpt',
            label: {
                en: 'Excerpt',
                ru: 'Краткое описание',
            },
            type: 'textarea',
            required: true,
            localized: true,
        },
        {
            name: 'content',
            label: {
                en: 'Content',
                ru: 'Содержимое',
            },
            type: 'richText',
            required: true,
            localized: true,
        },
        {
            name: 'publishedAt',
            label: {
                en: 'Publication Date',
                ru: 'Дата публикации',
            },
            type: 'date',
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime',
                },
                description:
                    'Заполняется автоматически при первой публикации, но можно изменить вручную.',
            },
        },
        {
            name: 'reviewToken',
            label: {
                en: 'Draft review token',
                ru: 'Токен ссылки на черновик',
            },
            type: 'text',
            admin: {
                readOnly: true,
                description:
                    'Секретная часть ссылки на черновик. Генерируется автоматически при сохранении записи.',
            },
            access: {
                read: ({ req: { user } }) => Boolean(user),
                update: ({ req: { user } }) => Boolean(user),
            },
        },
        {
            name: 'reviewLinkRu',
            label: {
                en: 'RU draft review link',
                ru: 'Ссылка на черновик RU',
            },
            type: 'text',
            admin: {
                readOnly: true,
                description:
                    'Скопируйте эту ссылку и отправьте на вычитку русской версии до публикации.',
                components: {
                    afterInput: [
                        '@/admin/components/DraftReviewLinkActions#DraftReviewLinkActions',
                    ],
                },
            },
            access: {
                read: ({ req: { user } }) => Boolean(user),
                update: ({ req: { user } }) => Boolean(user),
            },
        },
        {
            name: 'reviewLinkEn',
            label: {
                en: 'EN draft review link',
                ru: 'Ссылка на черновик EN',
            },
            type: 'text',
            admin: {
                readOnly: true,
                description:
                    'Скопируйте эту ссылку и отправьте на вычитку английской версии до публикации.',
                components: {
                    afterInput: [
                        '@/admin/components/DraftReviewLinkActions#DraftReviewLinkActions',
                    ],
                },
            },
            access: {
                read: ({ req: { user } }) => Boolean(user),
                update: ({ req: { user } }) => Boolean(user),
            },
        },
    ],
}
