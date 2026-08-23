import {postgresAdapter} from '@payloadcms/db-postgres'
import {lexicalEditor} from '@payloadcms/richtext-lexical'
import path from 'path'
import {buildConfig} from 'payload'
import {fileURLToPath} from 'url'
import sharp from 'sharp'


import {ru} from '@payloadcms/translations/languages/ru'

import {Footer} from './globals/Footer'
import {Header} from './globals/Header'
import {SiteSettings} from './globals/SiteSettings'

import {Users} from './collections/Users'
import {Media} from './collections/Media'
import {Features} from './collections/Features'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    i18n: {
        fallbackLanguage: 'ru',

        // Панель администратора всегда русская.
        supportedLanguages: {
            ru,
        },
    },
    localization: {
        locales: [
            {
                code: 'en',
                label: 'English',
            },
            {
                code: 'ru',
                label: 'Русский',
            },
        ],

        defaultLocale: 'en',

        // Если русского перевода ещё нет,
        // временно показываем английский.
        fallback: true,
    },

    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    collections: [
        Users,
        Media,
        Features,
    ],
    globals: [
        SiteSettings,
        Header,
        Footer,
    ],
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URL || '',
        },
    }),
    sharp,
    plugins: [],
})
