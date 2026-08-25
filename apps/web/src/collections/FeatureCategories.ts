import type { CollectionConfig } from 'payload'

import { contentLocaleField } from '@/admin/fields/contentLocaleField'

export const FeatureCategories: CollectionConfig = {
  slug: 'feature-categories',

  labels: {
    singular: {
      en: 'Feature Category',
      ru: 'Категория возможностей',
    },
    plural: {
      en: 'Feature Categories',
      ru: 'Категории возможностей',
    },
  },

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'order', 'updatedAt'],
    group: 'Сайт',
  },

  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },

  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Перевод',
          admin: {
            description: 'Название и описание категории зависят от выбранного языка контента.',
          },
          fields: [
            contentLocaleField('featureCategoryContentLocale'),
            {
              name: 'title',
              label: {
                en: 'Title',
                ru: 'Название',
              },
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'description',
              label: {
                en: 'Description',
                ru: 'Описание',
              },
              type: 'textarea',
              localized: true,
            },
          ],
        },
        {
          label: 'Общее',
          admin: {
            description: 'Эти параметры едины для всех языков.',
          },
          fields: [
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
                description: 'Stable category key, e.g. trigger, camera or power.',
              },
            },
            {
              name: 'order',
              label: {
                en: 'Order',
                ru: 'Порядок',
              },
              type: 'number',
              defaultValue: 100,
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
