import type { GlobalConfig } from 'payload'

import { contentLocaleField } from '@/admin/fields/contentLocaleField'
import { isLocale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'

function getHomeDefaults(locale: unknown) {
  return getMessages(typeof locale === 'string' && isLocale(locale) ? locale : 'en').home
}

function textDefault(select: (home: ReturnType<typeof getHomeDefaults>) => string) {
  return ({ locale }: { locale?: unknown }) => select(getHomeDefaults(locale))
}

function stepsDefault({ locale }: { locale?: unknown }) {
  return getHomeDefaults(locale).steps.map((step) => ({
    text: step.text,
    title: step.title,
  }))
}

function textListDefault(select: (home: ReturnType<typeof getHomeDefaults>) => readonly string[]) {
  return ({ locale }: { locale?: unknown }) =>
    select(getHomeDefaults(locale)).map((text) => ({
      text,
    }))
}

export const HomePage: GlobalConfig = {
  slug: 'home-page',

  label: 'Стартовая страница',

  typescript: {
    interface: 'HomePage',
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
          label: 'Hero',
          admin: {
            description: 'Главный первый экран стартовой страницы.',
          },
          fields: [
            contentLocaleField('homeHeroContentLocale'),
            {
              name: 'eyebrow',
              label: 'Надзаголовок',
              type: 'text',
              localized: true,
              defaultValue: textDefault((home) => home.eyebrow),
            },
            {
              name: 'productName',
              label: 'Название продукта',
              type: 'text',
              localized: true,
              defaultValue: textDefault((home) => home.productName),
            },
            {
              name: 'subtitle',
              label: 'Подзаголовок',
              type: 'text',
              localized: true,
              defaultValue: textDefault((home) => home.subtitle),
            },
            {
              name: 'intro',
              label: 'Вводный текст',
              type: 'textarea',
              localized: true,
              defaultValue: textDefault((home) => home.intro),
            },
            {
              name: 'signalTitle',
              label: 'Строка сигналов',
              type: 'text',
              localized: true,
              defaultValue: textDefault((home) => home.signalTitle),
            },
            {
              name: 'heroImage',
              label: 'Изображение hero',
              type: 'upload',
              relationTo: 'media',
              localized: true,
            },
            {
              name: 'heroImageAlt',
              label: 'Alt hero-изображения',
              type: 'text',
              localized: true,
              defaultValue: textDefault((home) => home.renderAlt),
            },
            {
              name: 'heroImageCaption',
              label: 'Подпись hero-изображения',
              type: 'text',
              localized: true,
              defaultValue: textDefault((home) => home.renderCaption),
            },
          ],
        },
        {
          label: 'Сценарий работы',
          fields: [
            contentLocaleField('homeFlowContentLocale'),
            {
              name: 'flowEyebrow',
              label: 'Надзаголовок',
              type: 'text',
              localized: true,
              defaultValue: textDefault((home) => home.flowEyebrow),
            },
            {
              name: 'flowTitle',
              label: 'Заголовок',
              type: 'text',
              localized: true,
              defaultValue: textDefault((home) => home.flowTitle),
            },
            {
              name: 'flowIntro',
              label: 'Вводный текст',
              type: 'textarea',
              localized: true,
              defaultValue: textDefault((home) => home.flowIntro),
            },
            {
              name: 'steps',
              label: 'Шаги',
              type: 'array',
              defaultValue: stepsDefault,
              fields: [
                {
                  name: 'title',
                  label: 'Заголовок',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'text',
                  label: 'Текст',
                  type: 'textarea',
                  localized: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Списки',
          fields: [
            contentLocaleField('homeListsContentLocale'),
            {
              name: 'capabilitiesTitle',
              label: 'Заголовок возможностей',
              type: 'text',
              localized: true,
              defaultValue: textDefault((home) => home.capabilitiesTitle),
            },
            {
              name: 'capabilities',
              label: 'Возможности',
              type: 'array',
              defaultValue: textListDefault((home) => home.capabilities),
              fields: [
                {
                  name: 'text',
                  label: 'Текст',
                  type: 'textarea',
                  localized: true,
                },
              ],
            },
            {
              name: 'advantagesTitle',
              label: 'Заголовок преимуществ',
              type: 'text',
              localized: true,
              defaultValue: textDefault((home) => home.advantagesTitle),
            },
            {
              name: 'advantages',
              label: 'Преимущества',
              type: 'array',
              defaultValue: textListDefault((home) => home.advantages),
              fields: [
                {
                  name: 'text',
                  label: 'Текст',
                  type: 'textarea',
                  localized: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Галерея',
          admin: {
            description: 'Изображения стартовой страницы. Сами файлы загружаются в Media.',
          },
          fields: [
            contentLocaleField('homeGalleryContentLocale'),
            {
              name: 'galleryEyebrow',
              label: 'Надзаголовок',
              type: 'text',
              localized: true,
              defaultValue: textDefault((home) => home.galleryEyebrow),
            },
            {
              name: 'galleryTitle',
              label: 'Заголовок',
              type: 'text',
              localized: true,
              defaultValue: textDefault((home) => home.galleryTitle),
            },
            {
              name: 'galleryIntro',
              label: 'Вводный текст',
              type: 'textarea',
              localized: true,
              defaultValue: textDefault((home) => home.galleryIntro),
            },
            {
              name: 'galleryItems',
              label: 'Изображения',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  label: 'Изображение',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'alt',
                  label: 'Alt',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'caption',
                  label: 'Подпись',
                  type: 'text',
                  localized: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Статус',
          fields: [
            contentLocaleField('homeStatusContentLocale'),
            {
              name: 'statusEyebrow',
              label: 'Надзаголовок',
              type: 'text',
              localized: true,
              defaultValue: textDefault((home) => home.statusEyebrow),
            },
            {
              name: 'statusTitle',
              label: 'Заголовок',
              type: 'text',
              localized: true,
              defaultValue: textDefault((home) => home.statusTitle),
            },
            {
              name: 'statusText',
              label: 'Текст',
              type: 'textarea',
              localized: true,
              defaultValue: textDefault((home) => home.statusText),
            },
          ],
        },
      ],
    },
  ],
}
