import Image from 'next/image'
import { notFound } from 'next/navigation'

import { isLocale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'

type Props = {
  params: Promise<{
    locale: string
  }>
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  const messages = getMessages(locale)
  const home = messages.home

  return (
    <main className="home-page">
      <section aria-labelledby="home-title" className="home-hero">
        <div className="home-hero__copy">
          <p className="eyebrow">{home.eyebrow}</p>

          <h1 id="home-title">{home.productName}</h1>

          <p className="home-subtitle">{home.subtitle}</p>

          <p className="lede">{home.intro}</p>

          <p className="home-signal-line">{home.signalTitle}</p>
        </div>

        <figure className="home-hero__media">
          <Image
            alt={home.renderAlt}
            className="home-hero__image"
            height={1086}
            priority
            sizes="(max-width: 760px) 92vw, (max-width: 1100px) 620px, 720px"
            src="/images/phototrigger-reva-render.png"
            width={1448}
          />
          <figcaption>{home.renderCaption}</figcaption>
        </figure>
      </section>

      <section aria-labelledby="home-flow-title" className="home-section home-flow">
        <header>
          <p className="eyebrow">{home.flowEyebrow}</p>
          <h2 id="home-flow-title">{home.flowTitle}</h2>
          <p>{home.flowIntro}</p>
        </header>

        <ol className="home-step-list">
          {home.steps.map((step) => (
            <li className="home-step" key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-label={home.capabilitiesTitle} className="home-band">
        <div className="home-section home-summary-grid">
          <section>
            <h2>{home.capabilitiesTitle}</h2>

            <ul className="home-info-list">
              {home.capabilities.map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>{home.advantagesTitle}</h2>

            <ul className="home-info-list">
              {home.advantages.map((advantage) => (
                <li key={advantage}>{advantage}</li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      <section aria-labelledby="home-status-title" className="home-section home-status">
        <p className="eyebrow">{home.statusEyebrow}</p>

        <h2 id="home-status-title">{home.statusTitle}</h2>

        <p>{home.statusText}</p>
      </section>
    </main>
  )
}
