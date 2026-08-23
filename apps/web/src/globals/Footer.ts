import type { GlobalConfig } from 'payload'

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
            name: 'description',
            label: 'Описание',
            type: 'textarea',
            localized: true,
            defaultValue:
                'Open hardware camera trigger and photography automation project.',
        },
        {
            name: 'links',
            label: 'Ссылки',
            type: 'array',
            maxRows: 8,
            fields: [
                {
                    name: 'label',
                    label: 'Подпись',
                    type: 'text',
                    required: true,
                    localized: true,
                },
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
}
