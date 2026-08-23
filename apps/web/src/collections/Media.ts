import type { CollectionConfig } from 'payload'

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
  access: {
    read: () => true,
  },
  fields: [
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
  upload: true,
}
