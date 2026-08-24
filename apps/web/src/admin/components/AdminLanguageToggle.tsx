'use client'

import { useTranslation } from '@payloadcms/ui'

export function AdminLanguageToggle() {
  const { i18n, languageOptions, switchLanguage } = useTranslation()

  if (!switchLanguage || !languageOptions || languageOptions.length < 2) {
    return null
  }

  return (
    <div aria-label={i18n.t('general:language')} className="iris-admin-language-toggle">
      {languageOptions.map((language) => (
        <button
          aria-pressed={i18n.language === language.value}
          key={language.value}
          onClick={() => {
            if (i18n.language !== language.value) {
              void switchLanguage(language.value)
            }
          }}
          title={language.label}
          type="button"
        >
          {language.value.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
