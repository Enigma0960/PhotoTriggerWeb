import type { UIField } from 'payload'

export function contentLocaleField(name = 'contentLocale'): UIField {
  return {
    name,
    type: 'ui',
    admin: {
      components: {
        Field: '@/admin/components/AdminLocaleTabs#AdminLocaleTabs',
      },
    },
  }
}
