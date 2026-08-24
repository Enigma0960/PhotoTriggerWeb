import type { CollectionConfig } from 'payload'

import { contentLocaleField } from '@/admin/fields/contentLocaleField'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: {
      en: 'Media',
      ru: 'Медиафайл',
    },
    plural: {
      en: 'Media',
      ru: 'Медиафайлы',
    },
  },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
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
          fields: [
            contentLocaleField('mediaContentLocale'),
            {
              name: 'alt',
              label: {
                en: 'Alt text',
                ru: 'Альтернативный текст',
              },
              type: 'text',
              required: true,
              localized: true,
            },
          ],
        },
      ],
    },
  ],
  upload: true,
}
