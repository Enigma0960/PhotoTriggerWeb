import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import type { Locale } from '@/i18n/config'

type Props = {
  locale: Locale
}

export function SiteControls({ locale }: Props) {
  return (
    <div className="site-controls">
      <ThemeSwitcher locale={locale} />
      <LanguageSwitcher locale={locale} />
    </div>
  )
}
