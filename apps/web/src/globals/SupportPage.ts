import type { GlobalConfig } from 'payload'

import { contentLocaleField } from '@/admin/fields/contentLocaleField'
import { isLocale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'

function getSupportDefaults(locale: unknown) {
  return getMessages(typeof locale === 'string' && isLocale(locale) ? locale : 'en').support
}

function textDefault(select: (support: ReturnType<typeof getSupportDefaults>) => string) {
  return ({ locale }: { locale?: unknown }) => select(getSupportDefaults(locale))
}

function supportOptionsDefault({ locale }: { locale?: unknown }) {
  return getSupportDefaults(locale).supportOptions.map((option) => ({
    ctaLabel: option.ctaLabel,
    href: option.href,
    newTab: false,
    text: option.text,
    title: option.title,
  }))
}

export const SupportPage: GlobalConfig = {
  slug: 'support-page',

  label: 'Страница поддержки',

  typescript: {
    interface: 'SupportPage',
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
          fields: [
            contentLocaleField('supportHeroContentLocale'),
            {
              name: 'eyebrow',
              label: 'Надзаголовок',
              type: 'text',
              localized: true,
              defaultValue: textDefault((support) => support.eyebrow),
            },
            {
              name: 'title',
              label: 'Заголовок',
              type: 'text',
              localized: true,
              defaultValue: textDefault((support) => support.title),
            },
            {
              name: 'intro',
              label: 'Вводный текст',
              type: 'textarea',
              localized: true,
              defaultValue: textDefault((support) => support.intro),
            },
          ],
        },
        {
          label: 'Поддержка',
          fields: [
            contentLocaleField('supportOptionsContentLocale'),
            {
              name: 'supportOptionsTitle',
              label: 'Заголовок блока',
              type: 'text',
              localized: true,
              defaultValue: textDefault((support) => support.supportOptionsTitle),
            },
            {
              name: 'supportOptionsIntro',
              label: 'Вводный текст',
              type: 'textarea',
              localized: true,
              defaultValue: textDefault((support) => support.supportOptionsIntro),
            },
            {
              name: 'supportOptions',
              label: 'Способы поддержки',
              type: 'array',
              defaultValue: supportOptionsDefault,
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
                {
                  name: 'href',
                  label: 'Ссылка',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Например: /feedback, /dev-blog или https://example.com.',
                  },
                },
                {
                  name: 'ctaLabel',
                  label: 'Текст кнопки',
                  type: 'text',
                  localized: true,
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
        {
          label: 'Обратная связь',
          fields: [
            contentLocaleField('supportFeedbackContentLocale'),
            {
              name: 'feedbackCtaTitle',
              label: 'Заголовок CTA',
              type: 'text',
              localized: true,
              defaultValue: textDefault((support) => support.feedbackCtaTitle),
            },
            {
              name: 'feedbackCtaText',
              label: 'Текст CTA',
              type: 'textarea',
              localized: true,
              defaultValue: textDefault((support) => support.feedbackCtaText),
            },
            {
              name: 'feedbackCtaButton',
              label: 'Текст кнопки',
              type: 'text',
              localized: true,
              defaultValue: textDefault((support) => support.feedbackCtaButton),
            },
          ],
        },
      ],
    },
  ],
}
