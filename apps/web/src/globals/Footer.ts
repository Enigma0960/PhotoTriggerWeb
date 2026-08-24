import type { GlobalConfig } from 'payload'

import { contentLocaleField } from '@/admin/fields/contentLocaleField'

export const Footer: GlobalConfig = {
  slug: 'footer',

  label: 'Подвал сайта',

  typescript: {
    interface: 'Footer',
  },

  admin: {
    group: 'Сайт',
  },

  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },

  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Перевод',
          fields: [
            contentLocaleField('footerContentLocale'),
            {
              name: 'description',
              label: 'Описание',
              type: 'textarea',
              localized: true,
              defaultValue: 'Open hardware camera trigger and photography automation project.',
            },
          ],
        },
        {
          label: 'Ссылки',
          fields: [
            {
              name: 'links',
              label: 'Ссылки',
              type: 'array',
              maxRows: 8,
              fields: [
                {
                  type: 'tabs',
                  tabs: [
                    {
                      label: 'Перевод',
                      fields: [
                        contentLocaleField('footerLinksContentLocale'),
                        {
                          name: 'label',
                          label: 'Подпись',
                          type: 'text',
                          required: true,
                          localized: true,
                        },
                      ],
                    },
                    {
                      label: 'Общее',
                      fields: [
                        {
                          name: 'destination',
                          label: 'Тип ссылки',
                          type: 'select',
                          required: true,
                          defaultValue: 'internal',
                          options: [
                            {
                              label: 'Внутренняя страница',
                              value: 'internal',
                            },
                            {
                              label: 'Документация',
                              value: 'docs',
                            },
                            {
                              label: 'Внешний URL',
                              value: 'external',
                            },
                          ],
                        },
                        {
                          name: 'href',
                          label: 'Адрес',
                          type: 'text',
                          required: true,
                        },
                        {
                          name: 'newTab',
                          label: 'Открывать в новой вкладке',
                          type: 'checkbox',
                          defaultValue: false,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
