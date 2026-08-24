import type { CollectionConfig } from 'payload'

export const FeedbackMessages: CollectionConfig = {
  slug: 'feedback-messages',

  labels: {
    singular: {
      en: 'Feedback message',
      ru: 'Сообщение обратной связи',
    },
    plural: {
      en: 'Feedback messages',
      ru: 'Обратная связь',
    },
  },

  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'locale', 'status', 'createdAt'],
    group: 'Сайт',
  },

  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },

  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Сообщение',
          fields: [
            {
              name: 'name',
              label: {
                en: 'Name',
                ru: 'Имя',
              },
              type: 'text',
              required: true,
              maxLength: 120,
            },
            {
              name: 'email',
              label: {
                en: 'Email',
                ru: 'Email',
              },
              type: 'email',
            },
            {
              name: 'message',
              label: {
                en: 'Message',
                ru: 'Сообщение',
              },
              type: 'textarea',
              required: true,
              maxLength: 5000,
            },
            {
              name: 'locale',
              label: {
                en: 'Page language',
                ru: 'Язык страницы',
              },
              type: 'select',
              required: true,
              defaultValue: 'ru',
              options: [
                {
                  label: {
                    en: 'English',
                    ru: 'Английский',
                  },
                  value: 'en',
                },
                {
                  label: {
                    en: 'Russian',
                    ru: 'Русский',
                  },
                  value: 'ru',
                },
              ],
            },
          ],
        },
        {
          label: 'Модерация',
          fields: [
            {
              name: 'status',
              label: {
                en: 'Status',
                ru: 'Статус',
              },
              type: 'select',
              required: true,
              defaultValue: 'new',
              access: {
                create: ({ req: { user } }) => Boolean(user),
                read: ({ req: { user } }) => Boolean(user),
                update: ({ req: { user } }) => Boolean(user),
              },
              options: [
                {
                  label: {
                    en: 'New',
                    ru: 'Новое',
                  },
                  value: 'new',
                },
                {
                  label: {
                    en: 'Reviewed',
                    ru: 'Просмотрено',
                  },
                  value: 'reviewed',
                },
                {
                  label: {
                    en: 'Spam',
                    ru: 'Спам',
                  },
                  value: 'spam',
                },
                {
                  label: {
                    en: 'Archived',
                    ru: 'В архиве',
                  },
                  value: 'archived',
                },
              ],
            },
            {
              name: 'adminNotes',
              label: {
                en: 'Admin notes',
                ru: 'Заметки администратора',
              },
              type: 'textarea',
              access: {
                create: ({ req: { user } }) => Boolean(user),
                read: ({ req: { user } }) => Boolean(user),
                update: ({ req: { user } }) => Boolean(user),
              },
            },
          ],
        },
      ],
    },
  ],
}
