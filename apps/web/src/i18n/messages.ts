import type { Locale } from './config'

const messages = {
  en: {
    common: {
      colorTheme: 'Color theme',
      darkTheme: 'Dark',
      language: 'Language',
      lightTheme: 'Light',
      home: 'Home',
    },
    devBlog: {
      title: 'Dev blog',
      intro: 'Engineering notes, design decisions and development updates from Project Iris.',
      allPosts: 'All dev-blog posts',
      createdAt: 'Created',
      draftPreview: 'Draft preview',
      draftPreviewDescription:
        'This page is visible through a private review link before publication.',
      empty: 'No published dev-blog posts yet.',
      readPost: 'Read post',
    },
    home: {
      eyebrow: 'Project Iris',
      productName: 'PhotoTrigger Rev.A',
      subtitle: 'Programmable multi-source camera trigger',
      intro:
        'An autonomous camera controller that can capture by time, light, sound, an external sensor, a remote command, or a manual trigger.',
      renderAlt: 'Render of the final PhotoTrigger Rev.A device',
      renderCaption: 'Concept render, not an actual product photo.',
      signalTitle: 'Time, light, sound, external sensor, remote command',
      galleryEyebrow: 'Reference images',
      galleryTitle: 'Interface and product references in one place',
      galleryIntro:
        'These examples are used as visual references while the hardware, enclosure and interface are being refined.',
      galleryItems: [
        {
          alt: 'PhotoTrigger reference image, example 1',
          caption: 'Reference example 1',
        },
        {
          alt: 'PhotoTrigger reference image, example 2',
          caption: 'Reference example 2',
        },
        {
          alt: 'PhotoTrigger reference image, example 3',
          caption: 'Reference example 3',
        },
      ],
      flowEyebrow: 'How it works',
      flowTitle: 'From event to frame in one predictable chain',
      flowIntro:
        'The device is built around a single Trigger Manager: every source follows the same path from detection to camera action.',
      steps: [
        {
          title: 'Choose the event source',
          text: 'Use an interval, RTC schedule, lightning sensor, sound trigger, external 5-24 V input, Wi-Fi, Bluetooth LE, or the device controls.',
        },
        {
          title: 'Set the camera action',
          text: 'Configure focus, shutter, delays, cooldown, repetition, Bulb timing, or a saved shooting profile.',
        },
        {
          title: 'Arm PhotoTrigger',
          text: 'The controller can work on its own, with a 128x64 OLED interface and no required phone, computer, cloud service, or live browser session.',
        },
        {
          title: 'React through hardware paths',
          text: 'Lightning and sound events are detected by analog frontends and comparators, while the ESP32-S3 handles programs, profiles, web UI, BLE, logs, and OTA updates.',
        },
        {
          title: 'Trigger the camera safely',
          text: 'PhotoTrigger can control focus and shutter through isolated wired outputs, or send infrared remote commands where the camera supports them.',
        },
      ],
      capabilitiesTitle: 'What the device combines',
      capabilities: [
        'Intervalometer and scheduled shooting with an always-on RTC',
        'Lightning trigger with adjustable sensitivity and light-level monitoring',
        'Sound trigger with adjustable threshold and visual level feedback',
        'Isolated external input for sensors, lab automation, or custom electronics',
        'Wired focus/shutter control plus three-direction IR output',
        'On-device UI, Wi-Fi, Bluetooth LE, local profiles, and OTA-ready firmware space',
      ],
      advantagesTitle: 'Why it is useful',
      advantages: [
        'One compact device replaces several separate camera accessories.',
        'The camera can stay unattended for timelapse, sunrise, night, weather, and lab scenarios.',
        'Power can be fully switched off until an RTC alarm wakes the device for scheduled work.',
        'Camera and external-trigger connections are electrically isolated for safer mixed setups.',
      ],
      statusEyebrow: 'Current state',
      statusTitle: 'Rev.A is designed as the first hardware revision',
      statusText:
        'The architecture, main components, power domains, trigger paths, and camera outputs are defined in the project documentation. The next important step is proving the design on a physical Rev.A prototype.',
    },
    support: {
      eyebrow: 'Support',
      title: 'Support Project Iris',
      intro:
        'Help turn PhotoTrigger Rev.A from a documented design into tested hardware, firmware and field-ready camera workflows.',
      supportOptionsTitle: 'Ways to support the project',
      supportOptionsIntro:
        'The most useful support right now is practical feedback, testing ideas and help finding real shooting scenarios.',
      supportOptions: [
        {
          title: 'Follow development',
          text: 'Read engineering notes and implementation updates as the prototype moves forward.',
          href: '/dev-blog',
          ctaLabel: 'Read dev blog',
        },
        {
          title: 'Check the roadmap',
          text: 'See which milestones are done, current and planned before suggesting the next priority.',
          href: '/roadmap',
          ctaLabel: 'Open roadmap',
        },
      ],
      feedbackCtaTitle: 'Have a suggestion or question?',
      feedbackCtaText:
        'Leave a message from the feedback page. It will be saved privately and reviewed in the admin panel.',
      feedbackCtaButton: 'Leave feedback',
    },
    feedback: {
      eyebrow: 'Feedback',
      title: 'Feedback',
      intro:
        'Leave a message, project idea or question. Your note will be saved for review in the admin panel.',
      formTitle: 'Message form',
      formIntro:
        'Short, specific notes are the most useful: camera model, shooting scenario, trigger source or feature request.',
      nameLabel: 'Name',
      emailLabel: 'Email, optional',
      messageLabel: 'Message',
      submit: 'Send message',
      success: 'Thank you. Your message has been saved.',
      validationError: 'Please add your name and a message of at least 10 characters.',
      failedError: 'The message could not be saved. Please try again later.',
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
      intro: 'Camera automation, sensors and triggering capabilities available in Project Iris.',
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
      colorTheme: 'Цветовая тема',
      darkTheme: 'Темная',
      language: 'Язык',
      lightTheme: 'Светлая',
      home: 'Главная',
    },
    devBlog: {
      title: 'Dev-blog',
      intro: 'Инженерные заметки, проектные решения и новости разработки Project Iris.',
      allPosts: 'Все записи dev-blog',
      createdAt: 'Создано',
      draftPreview: 'Предпросмотр черновика',
      draftPreviewDescription:
        'Эта страница доступна по приватной ссылке для вычитки до публикации.',
      empty: 'Опубликованных записей dev-blog пока нет.',
      readPost: 'Читать запись',
    },
    home: {
      eyebrow: 'Project Iris',
      productName: 'PhotoTrigger Rev.A',
      subtitle: 'Программируемый multi-source триггер для фотокамеры',
      intro:
        'Автономный контроллер камеры, который может сделать кадр по времени, свету, звуку, внешнему датчику, удаленной команде или ручному спуску.',
      renderAlt: 'Рендер финального устройства PhotoTrigger Rev.A',
      renderCaption: 'Рендер концепта, не реальное фото устройства.',
      signalTitle: 'Время, свет, звук, внешний датчик, удаленная команда',
      galleryEyebrow: 'Референсы',
      galleryTitle: 'Примеры интерфейса и визуальных состояний',
      galleryIntro:
        'Эти изображения помогают сверять внешний вид устройства, интерфейс и сценарии использования во время разработки.',
      galleryItems: [
        {
          alt: 'Референс PhotoTrigger, пример 1',
          caption: 'Пример референса 1',
        },
        {
          alt: 'Референс PhotoTrigger, пример 2',
          caption: 'Пример референса 2',
        },
        {
          alt: 'Референс PhotoTrigger, пример 3',
          caption: 'Пример референса 3',
        },
      ],
      flowEyebrow: 'Как это работает',
      flowTitle: 'От события к кадру в одной понятной цепочке',
      flowIntro:
        'В основе устройства единый Trigger Manager: любой источник проходит один путь от обнаружения события до действия камеры.',
      steps: [
        {
          title: 'Выберите источник события',
          text: 'Интервал, расписание RTC, датчик молнии, звуковой триггер, внешний вход 5-24 В, Wi-Fi, Bluetooth LE или управление на корпусе.',
        },
        {
          title: 'Настройте действие камеры',
          text: 'Focus, Shutter, задержки, cooldown, повторения, Bulb-выдержка или заранее сохраненный профиль съемки.',
        },
        {
          title: 'Поставьте PhotoTrigger на дежурство',
          text: 'Устройство работает самостоятельно: есть OLED 128x64, локальное управление, и ему не нужен постоянный телефон, компьютер, облако или открытый браузер.',
        },
        {
          title: 'Событие проходит через быстрый аппаратный путь',
          text: 'Молния и звук определяются аналоговыми трактами и компараторами, а ESP32-S3 отвечает за программы, профили, web-интерфейс, BLE, логи и OTA.',
        },
        {
          title: 'Камера срабатывает безопасно',
          text: 'PhotoTrigger управляет Focus и Shutter через изолированные проводные выходы или отправляет IR-команды, если камера их поддерживает.',
        },
      ],
      capabilitiesTitle: 'Что объединяет устройство',
      capabilities: [
        'Интервалометр и съемка по расписанию с отдельным always-on RTC',
        'Lightning trigger с регулируемой чувствительностью и мониторингом уровня света',
        'Sound trigger с настраиваемым порогом и визуальной обратной связью',
        'Изолированный внешний вход для датчиков, лабораторной автоматики и пользовательской электроники',
        'Проводное управление Focus/Shutter и трехнаправленный IR-выход',
        'Интерфейс на устройстве, Wi-Fi, Bluetooth LE, локальные профили и место под OTA-прошивки',
      ],
      advantagesTitle: 'Почему это полезно',
      advantages: [
        'Одно компактное устройство заменяет несколько отдельных аксессуаров камеры.',
        'Камеру можно оставлять без присмотра для timelapse, рассветов, ночной съемки, погоды и лабораторных сценариев.',
        'Питание может полностью выключаться до момента, когда RTC разбудит устройство по расписанию.',
        'Камера и внешний вход электрически изолированы, что безопаснее для смешанных схем и разных моделей камер.',
      ],
      statusEyebrow: 'Текущий статус',
      statusTitle: 'Rev.A проектируется как первая аппаратная ревизия',
      statusText:
        'В документации уже определены архитектура, основные компоненты, домены питания, триггерные тракты и выходы камеры. Следующий важный шаг - подтвердить решения на физическом прототипе Rev.A.',
    },
    support: {
      eyebrow: 'Поддержка',
      title: 'Поддержать Project Iris',
      intro:
        'Помогите довести PhotoTrigger Rev.A от описанного проекта до проверенного железа, прошивки и рабочих сценариев съемки.',
      supportOptionsTitle: 'Как можно поддержать проект',
      supportOptionsIntro:
        'Сейчас особенно полезны практическая обратная связь, идеи тестирования и реальные сценарии съемки.',
      supportOptions: [
        {
          title: 'Следить за разработкой',
          text: 'Читайте инженерные заметки и обновления реализации по мере движения к прототипу.',
          href: '/dev-blog',
          ctaLabel: 'Читать dev-blog',
        },
        {
          title: 'Посмотреть роадмап',
          text: 'Проверьте выполненные, текущие и запланированные этапы перед предложением следующего приоритета.',
          href: '/roadmap',
          ctaLabel: 'Открыть роадмап',
        },
      ],
      feedbackCtaTitle: 'Есть предложение или вопрос?',
      feedbackCtaText:
        'Оставьте сообщение на странице обратной связи. Оно сохранится приватно и будет видно в админ-панели.',
      feedbackCtaButton: 'Оставить сообщение',
    },
    feedback: {
      eyebrow: 'Обратная связь',
      title: 'Обратная связь',
      intro:
        'Оставьте сообщение, идею по проекту или вопрос. Запись сохранится для просмотра в админ-панели.',
      formTitle: 'Форма сообщения',
      formIntro:
        'Лучше всего помогают конкретные заметки: модель камеры, сценарий съемки, источник триггера или запрос функции.',
      nameLabel: 'Имя',
      emailLabel: 'Email, необязательно',
      messageLabel: 'Сообщение',
      submit: 'Отправить сообщение',
      success: 'Спасибо. Сообщение сохранено.',
      validationError: 'Укажите имя и сообщение длиной не менее 10 символов.',
      failedError: 'Не удалось сохранить сообщение. Попробуйте позже.',
    },
    roadmap: {
      title: 'Роадмап проекта',
      intro: 'Последовательность этапов Project Iris от базовой разработки до готовности к релизу.',
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
      documentationIntro: 'Подробная информация о реализации доступна в документации Project Iris.',
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
