import type { CollectionConfig } from 'payload'

export const SiteEvents: CollectionConfig = {
  slug: 'site-events',

  labels: {
    singular: {
      en: 'Site event',
      ru: 'Событие сайта',
    },
    plural: {
      en: 'Site statistics',
      ru: 'Статистика сайта',
    },
  },

  admin: {
    useAsTitle: 'path',
    defaultColumns: ['eventType', 'path', 'target', 'locale', 'createdAt'],
    group: 'Статистика',
  },

  defaultSort: '-createdAt',

  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },

  fields: [
    {
      name: 'eventType',
      label: {
        en: 'Event type',
        ru: 'Тип события',
      },
      type: 'select',
      required: true,
      index: true,
      options: [
        {
          label: {
            en: 'Page view',
            ru: 'Просмотр страницы',
          },
          value: 'page_view',
        },
        {
          label: {
            en: 'Navigation click',
            ru: 'Переход по сайту',
          },
          value: 'navigation_click',
        },
        {
          label: {
            en: 'External click',
            ru: 'Внешний переход',
          },
          value: 'external_click',
        },
      ],
    },
    {
      name: 'locale',
      label: {
        en: 'Language',
        ru: 'Язык',
      },
      type: 'select',
      required: true,
      index: true,
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
    {
      name: 'path',
      label: {
        en: 'Page path',
        ru: 'Путь страницы',
      },
      type: 'text',
      required: true,
      index: true,
      maxLength: 500,
    },
    {
      name: 'target',
      label: {
        en: 'Click target',
        ru: 'Цель перехода',
      },
      type: 'text',
      index: true,
      maxLength: 1000,
    },
    {
      name: 'title',
      label: {
        en: 'Title',
        ru: 'Заголовок',
      },
      type: 'text',
      maxLength: 300,
    },
    {
      name: 'referrer',
      label: {
        en: 'Referrer',
        ru: 'Источник перехода',
      },
      type: 'text',
      maxLength: 1000,
    },
    {
      name: 'sessionId',
      label: {
        en: 'Session ID',
        ru: 'ID сессии',
      },
      type: 'text',
      index: true,
      maxLength: 120,
    },
    {
      name: 'userAgent',
      label: {
        en: 'User agent',
        ru: 'User agent',
      },
      type: 'textarea',
      maxLength: 500,
    },
  ],
}
