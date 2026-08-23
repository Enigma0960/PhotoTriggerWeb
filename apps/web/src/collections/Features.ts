import type { CollectionConfig } from 'payload'

export const Features: CollectionConfig = {
    slug: 'features',

    labels: {
        singular: {
            en: 'Feature',
            ru: 'Возможность',
        },

        plural: {
            en: 'Features',
            ru: 'Возможности',
        },
    },

    admin: {
        useAsTitle: 'title',
        defaultColumns: [
            'title',
            'category',
            'developmentStatus',
            'featured',
            'order',
        ],
    },

    versions: {
        drafts: true,
        maxPerDoc: 20,
    },

    fields: [
        {
            name: 'title',
            label: {
                en: 'Title',
                ru: 'Название',
            },
            type: 'text',
            required: true,
            localized: true,
        },

        {
            name: 'slug',
            label: {
                en: 'Slug',
                ru: 'Slug',
            },
            type: 'text',
            required: true,
            unique: true,
            index: true,
        },

        {
            name: 'summary',
            label: {
                en: 'Summary',
                ru: 'Краткое описание',
            },
            type: 'textarea',
            required: true,
            localized: true,
        },

        {
            name: 'description',
            label: {
                en: 'Description',
                ru: 'Описание',
            },
            type: 'richText',
            required: true,
            localized: true,
        },

        {
            name: 'category',
            label: {
                en: 'Category',
                ru: 'Категория',
            },
            type: 'select',
            required: true,
            options: [
                {
                    label: {
                        en: 'Trigger',
                        ru: 'Триггер',
                    },
                    value: 'trigger',
                },
                {
                    label: {
                        en: 'Camera',
                        ru: 'Камера',
                    },
                    value: 'camera',
                },
                {
                    label: {
                        en: 'Automation',
                        ru: 'Автоматизация',
                    },
                    value: 'automation',
                },
                {
                    label: {
                        en: 'Connectivity',
                        ru: 'Подключение',
                    },
                    value: 'connectivity',
                },
                {
                    label: {
                        en: 'System',
                        ru: 'Система',
                    },
                    value: 'system',
                },
            ],
        },

        {
            name: 'developmentStatus',

            label: {
                en: 'Development Status',
                ru: 'Статус разработки',
            },

            type: 'select',
            required: true,
            defaultValue: 'planned',
            options: [
                {
                    label: {
                        en: 'Planned',
                        ru: 'Запланировано',
                    },
                    value: 'planned',
                },
                {
                    label: {
                        en: 'Design',
                        ru: 'Проектирование',
                    },
                    value: 'design',
                },
                {
                    label: {
                        en: 'Prototype',
                        ru: 'Прототип',
                    },
                    value: 'prototype',
                },
                {
                    label: {
                        en: 'Testing',
                        ru: 'Тестирование',
                    },
                    value: 'testing',
                },
                {
                    label: {
                        en: 'Ready',
                        ru: 'Готово',
                    },
                    value: 'ready',
                },
            ],
        },

        {
            name: 'image',
            label: {
                en: 'Image',
                ru: 'Изображение',
            },
            type: 'upload',
            relationTo: 'media',
        },

        {
            name: 'featured',
            label: {
                en: 'Featured',
                ru: 'Основная возможность',
            },
            type: 'checkbox',
            defaultValue: false,
        },

        {
            name: 'order',
            label: {
                en: 'Order',
                ru: 'Порядок',
            },
            type: 'number',
            defaultValue: 100,
            required: true,
        },

        {
            name: 'documentationPath',
            label: {
                en: 'Documentation Path',
                ru: 'Путь в документации',
            },
            type: 'text',
            admin: {
                description:
                    'Relative path in Starlight, e.g. /hardware/triggers/lightning/',
            },
        },
    ],
}
