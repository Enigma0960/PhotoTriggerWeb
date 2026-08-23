import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
    slug: 'site-settings',

    label: 'Настройки сайта',

    typescript: {
        interface: 'SiteSettings',
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
            name: 'siteName',
            label: 'Название сайта',
            type: 'text',
            required: true,
            defaultValue: 'Project Iris',
        },
        {
            name: 'tagline',
            label: 'Короткое описание',
            type: 'text',
            required: true,
            localized: true,
            defaultValue:
                'Programmable camera trigger and photography automation platform.',
        },
        {
            name: 'description',
            label: 'Описание',
            type: 'textarea',
            required: true,
            localized: true,
            defaultValue:
                'Project Iris is an open hardware configurable camera trigger for interval, HDR, lightning, sound and external-trigger photography.',
        },
        {
            name: 'metaTitle',
            label: 'Meta title по умолчанию',
            type: 'text',
            localized: true,
            defaultValue: 'Project Iris',
        },
        {
            name: 'metaDescription',
            label: 'Meta description по умолчанию',
            type: 'textarea',
            localized: true,
        },
    ],
}
