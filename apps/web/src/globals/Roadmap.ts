import type { GlobalConfig } from 'payload'

import { contentLocaleField } from '@/admin/fields/contentLocaleField'

type StageValue = {
  endDate?: string | null
  endType?: 'date' | 'quarter' | 'year' | null
  isCurrent?: boolean | null
  quarter?: 'q1' | 'q2' | 'q3' | 'q4' | null
  year?: number | null
}

function validateStages(value: unknown): true | string {
  if (!Array.isArray(value) || value.length === 0) {
    return 'Добавьте хотя бы один этап роадмапа.'
  }

  const stages = value as StageValue[]
  const currentCount = stages.filter((stage) => stage.isCurrent).length

  if (currentCount !== 1) {
    return 'В роадмапе должен быть ровно один текущий этап.'
  }

  for (const [index, stage] of stages.entries()) {
    const stageNumber = index + 1

    if (stage.endType === 'date' && !stage.endDate) {
      return `У этапа ${stageNumber} выберите дату окончания.`
    }

    if (stage.endType === 'quarter' && (!stage.quarter || !stage.year)) {
      return `У этапа ${stageNumber} выберите квартал и год окончания.`
    }

    if (stage.endType === 'year' && !stage.year) {
      return `У этапа ${stageNumber} укажите год окончания.`
    }
  }

  return true
}

export const Roadmap: GlobalConfig = {
  slug: 'roadmap',

  label: 'Роадмап',

  typescript: {
    interface: 'Roadmap',
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
          label: 'Перевод страницы',
          admin: {
            description: 'Заголовок и вводный текст зависят от выбранного языка.',
          },
          fields: [
            contentLocaleField('roadmapPageContentLocale'),
            {
              name: 'title',
              label: 'Заголовок страницы',
              type: 'text',
              required: true,
              localized: true,
              defaultValue: 'Project roadmap',
            },
            {
              name: 'intro',
              label: 'Описание страницы',
              type: 'textarea',
              localized: true,
            },
          ],
        },
        {
          label: 'Этапы',
          fields: [
            {
              name: 'stages',
              label: 'Этапы',
              type: 'array',
              minRows: 1,
              validate: validateStages,
              admin: {
                description:
                  'Этапы идут последовательно сверху вниз. Отметьте ровно один этап как текущий; все этапы до него на сайте будут считаться выполненными.',
              },
              fields: [
                {
                  type: 'tabs',
                  tabs: [
                    {
                      label: 'Перевод',
                      fields: [
                        contentLocaleField('roadmapStageContentLocale'),
                        {
                          name: 'title',
                          label: 'Заголовок',
                          type: 'text',
                          required: true,
                          localized: true,
                        },
                        {
                          name: 'description',
                          label: 'Описание',
                          type: 'textarea',
                          required: true,
                          localized: true,
                        },
                      ],
                    },
                    {
                      label: 'Общее',
                      fields: [
                        {
                          name: 'endType',
                          label: 'Формат окончания',
                          type: 'select',
                          required: true,
                          defaultValue: 'quarter',
                          options: [
                            {
                              label: 'Точная дата',
                              value: 'date',
                            },
                            {
                              label: 'Квартал и год',
                              value: 'quarter',
                            },
                            {
                              label: 'Только год',
                              value: 'year',
                            },
                          ],
                        },
                        {
                          name: 'endDate',
                          label: 'Дата окончания',
                          type: 'date',
                          admin: {
                            condition: (_, siblingData) => siblingData?.endType === 'date',
                          },
                        },
                        {
                          name: 'quarter',
                          label: 'Квартал',
                          type: 'select',
                          admin: {
                            condition: (_, siblingData) => siblingData?.endType === 'quarter',
                          },
                          options: [
                            {
                              label: 'I квартал',
                              value: 'q1',
                            },
                            {
                              label: 'II квартал',
                              value: 'q2',
                            },
                            {
                              label: 'III квартал',
                              value: 'q3',
                            },
                            {
                              label: 'IV квартал',
                              value: 'q4',
                            },
                          ],
                        },
                        {
                          name: 'year',
                          label: 'Год окончания',
                          type: 'number',
                          admin: {
                            step: 1,
                          },
                        },
                        {
                          name: 'isCurrent',
                          label: 'Текущий этап',
                          type: 'checkbox',
                          defaultValue: false,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
