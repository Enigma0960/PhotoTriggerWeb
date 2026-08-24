import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
    slug: 'header',

    label: 'Шапка сайта',

    typescript: {
        interface: 'Header',
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
            name: 'navigation',
            label: 'Навигация',
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
                    admin: {
                        description:
                            'Внутренняя ссылка: /features или /roadmap, документация: /hardware/, внешняя: https://example.com',
                    },
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
