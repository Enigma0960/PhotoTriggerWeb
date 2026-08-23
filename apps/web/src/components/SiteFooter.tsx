import type { Footer, SiteSettings } from '@/payload-types'

import type { Locale } from '@/i18n/config'
import Link from 'next/link'

import {
    isExternalNavigation,
    resolveNavigationHref,
} from '@/lib/navigation'

type Props = {
    footer: Footer
    locale: Locale
    settings: SiteSettings
}

export function SiteFooter({ footer, locale, settings }: Props) {
    return (
        <footer className="site-footer">
            <div className="site-footer__inner">
                <div>
                    <strong>{settings.siteName}</strong>

                    {footer.description && (
                        <p>{footer.description}</p>
                    )}
                </div>

                <nav aria-label="Footer navigation">
                    {footer.links?.map((item) => {
                        const href = resolveNavigationHref(item, locale)

                        if (isExternalNavigation(item)) {
                            return (
                                <a
                                    href={href}
                                    key={item.id}
                                    rel={item.newTab ? 'noopener noreferrer' : undefined}
                                    target={item.newTab ? '_blank' : undefined}
                                >
                                    {item.label}
                                </a>
                            )
                        }

                        return (
                            <Link href={href} key={item.id}>
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </footer>
    )
}
