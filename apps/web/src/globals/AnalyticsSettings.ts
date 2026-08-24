import type { GlobalConfig } from 'payload'

export const AnalyticsSettings: GlobalConfig = {
  slug: 'analytics-settings',

  label: 'Аналитика',

  typescript: {
    interface: 'AnalyticsSettings',
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
          label: 'Google',
          fields: [
            {
              name: 'googleAnalyticsEnabled',
              label: 'Включить Google Analytics',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'googleAnalyticsMeasurementId',
              label: 'Google Analytics Measurement ID',
              type: 'text',
              admin: {
                description: 'GA4 identifier, for example G-XXXXXXXXXX.',
              },
            },
            {
              name: 'googleAnalyticsAnonymizeIp',
              label: 'Анонимизировать IP',
              type: 'checkbox',
              defaultValue: true,
            },
          ],
        },
      ],
    },
  ],
}
