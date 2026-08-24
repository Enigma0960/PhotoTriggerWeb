import type { Locale } from './config'

const messages = {
  en: {
    common: {
      language: 'Language',
      home: 'Home',
    },
    home: {
      eyebrow: 'Project Iris',
      title: 'Programmable camera trigger and photography automation platform.',
      intro:
        'Open hardware for interval, HDR, lightning, sound and external-trigger photography.',
      featuresLink: 'Explore features',
      roadmapLink: 'View roadmap',
      docsLink: 'Open documentation',
      adminLink: 'Admin panel',
    },
    roadmap: {
      title: 'Project roadmap',
      intro:
        'A sequential view of the Project Iris milestones from foundation work to release readiness.',
      completed: 'Completed',
      current: 'Current stage',
      planned: 'Planned',
      empty: 'No roadmap stages yet.',
    },
    features: {
      title: 'Features',
      intro:
        'Camera automation, sensors and triggering capabilities available in Project Iris.',
      developmentStatus: 'Development status',
      featured: 'Featured',
      allFeatures: 'All features',
      empty: 'No published features yet.',
      technicalDocumentation: 'Technical documentation',
      documentationIntro:
        'Detailed implementation information is available in the Project Iris documentation.',
      openDocumentation: 'Open technical documentation',
    },
    statuses: {
      planned: 'Planned',
      design: 'Design',
      prototype: 'Prototype',
      testing: 'Testing',
      ready: 'Ready',
    },
    categories: {
      trigger: 'Trigger',
      camera: 'Camera',
      automation: 'Automation',
      connectivity: 'Connectivity',
      system: 'System',
    },
  },
  ru: {
    common: {
      language: 'Язык',
      home: 'Главная',
    },
    home: {
      eyebrow: 'Project Iris',
      title: 'Программируемый триггер камеры и платформа автоматизации съемки.',
      intro:
        'Открытая аппаратная платформа для интервальной, HDR, молниевой, звуковой съемки и внешних событий спуска.',
      featuresLink: 'Смотреть возможности',
      roadmapLink: 'Смотреть роадмап',
      docsLink: 'Открыть документацию',
      adminLink: 'Админ-панель',
    },
    roadmap: {
      title: 'Роадмап проекта',
      intro:
        'Последовательность этапов Project Iris от базовой разработки до готовности к релизу.',
      completed: 'Выполнено',
      current: 'Текущий этап',
      planned: 'Запланировано',
      empty: 'Этапы роадмапа пока не добавлены.',
    },
    features: {
      title: 'Возможности',
      intro: 'Автоматизация съемки, датчики и режимы срабатывания Project Iris.',
      developmentStatus: 'Статус разработки',
      featured: 'Основная функция',
      allFeatures: 'Все возможности',
      empty: 'Опубликованных возможностей пока нет.',
      technicalDocumentation: 'Техническая документация',
      documentationIntro:
        'Подробная информация о реализации доступна в документации Project Iris.',
      openDocumentation: 'Открыть техническую документацию',
    },
    statuses: {
      planned: 'Запланировано',
      design: 'Проектирование',
      prototype: 'Прототип',
      testing: 'Тестирование',
      ready: 'Готово',
    },
    categories: {
      trigger: 'Триггер',
      camera: 'Камера',
      automation: 'Автоматизация',
      connectivity: 'Подключение',
      system: 'Система',
    },
  },
} as const

export function getMessages(locale: Locale) {
  return messages[locale]
}
