import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { en } from '@payloadcms/translations/languages/en'
import { ru } from '@payloadcms/translations/languages/ru'

import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { HomePage } from './globals/HomePage'
import { Roadmap } from './globals/Roadmap'
import { SiteSettings } from './globals/SiteSettings'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Features } from './collections/Features'
import { DevBlogPosts } from './collections/DevBlogPosts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  i18n: {
    fallbackLanguage: 'ru',

    // Язык интерфейса админки меняется верхним переключателем
    // и не связан с языком редактируемого контента.
    supportedLanguages: {
      en,
      ru,
    },
  },
  localization: {
    locales: [
      {
        code: 'en',
        label: {
          en: 'English',
          ru: 'Английский',
        },
      },
      {
        code: 'ru',
        label: {
          en: 'Russian',
          ru: 'Русский',
        },
      },
    ],

    defaultLocale: 'en',

    // Если русского перевода ещё нет,
    // временно показываем английский.
    fallback: true,
  },

  admin: {
    user: Users.slug,
    theme: 'all',
    components: {
      actions: [
        '@/admin/components/AdminLanguageToggle#AdminLanguageToggle',
        '@/admin/components/AdminThemeToggle#AdminThemeToggle',
      ],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Features, DevBlogPosts],
  globals: [SiteSettings, Header, Footer, HomePage, Roadmap],
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
