import type { CollectionConfig } from 'payload'

export const Features: CollectionConfig = {
    slug: 'features',

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
            type: 'text',
            required: true,
        },

        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            index: true,
        },

        {
            name: 'summary',
            type: 'textarea',
            required: true,
        },

        {
            name: 'description',
            type: 'richText',
            required: true,
        },

        {
            name: 'category',
            type: 'select',
            required: true,
            options: [
                {
                    label: 'Trigger',
                    value: 'trigger',
                },
                {
                    label: 'Camera',
                    value: 'camera',
                },
                {
                    label: 'Automation',
                    value: 'automation',
                },
                {
                    label: 'Connectivity',
                    value: 'connectivity',
                },
                {
                    label: 'System',
                    value: 'system',
                },
            ],
        },

        {
            name: 'developmentStatus',
            label: 'Development Status',
            type: 'select',
            required: true,
            defaultValue: 'planned',
            options: [
                {
                    label: 'Planned',
                    value: 'planned',
                },
                {
                    label: 'Design',
                    value: 'design',
                },
                {
                    label: 'Prototype',
                    value: 'prototype',
                },
                {
                    label: 'Testing',
                    value: 'testing',
                },
                {
                    label: 'Ready',
                    value: 'ready',
                },
            ],
        },

        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
        },

        {
            name: 'featured',
            type: 'checkbox',
            defaultValue: false,
        },

        {
            name: 'order',
            type: 'number',
            defaultValue: 100,
            required: true,
        },

        {
            name: 'documentationPath',
            type: 'text',
            admin: {
                description:
                    'Relative path in Starlight, e.g. /hardware/triggers/lightning/',
            },
        },
    ],
}
