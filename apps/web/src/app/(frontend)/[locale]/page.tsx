import config from '@/payload.config'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import { fallbackLocale, isLocale, type Locale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'
import type { HomePage, Media } from '@/payload-types'

type Props = {
  params: Promise<{
    locale: string
  }>
}

type ImageViewModel = {
  alt: string
  caption?: string | null
  height: number
  src: string
  width: number
}

type GalleryItemViewModel = ImageViewModel & {
  key: string
}

const fallbackHeroImages: Record<Locale, string> = {
  en: '/images/phototrigger-reva-render-en.png',
  ru: '/images/phototrigger-reva-render-ru.png',
}

const fallbackGalleryImages = [
  '/images/gallery/examples/1.png',
  '/images/gallery/examples/2.png',
  '/images/gallery/examples/3.png',
]

function isMedia(value: unknown): value is Media {
  return typeof value === 'object' && value !== null
}

function resolveImage(image: unknown, fallback: ImageViewModel): ImageViewModel {
  if (!isMedia(image) || !image.url) {
    return fallback
  }

  return {
    alt: image.alt || fallback.alt,
    caption: fallback.caption,
    height: image.height || fallback.height,
    src: image.url,
    width: image.width || fallback.width,
  }
}

function getText(value: string | null | undefined, fallback: string) {
  return value?.trim() || fallback
}

function getTextArray(value: HomePage['capabilities'], fallback: readonly string[]) {
  const items = value?.map((item) => item.text?.trim()).filter(Boolean) ?? []

  return items.length > 0 ? items : fallback
}

function getSteps(value: HomePage['steps'], fallback: readonly { text: string; title: string }[]) {
  const steps =
    value
      ?.map((step) => ({
        text: step.text?.trim(),
        title: step.title?.trim(),
      }))
      .filter((step): step is { text: string; title: string } =>
        Boolean(step.text && step.title),
      ) ?? []

  return steps.length > 0 ? steps : fallback
}

function getGalleryItems(homePage: HomePage | null, locale: Locale): GalleryItemViewModel[] {
  const messages = getMessages(locale).home
  const cmsItems =
    homePage?.galleryItems
      ?.flatMap((item, index) => {
        if (!isMedia(item.image) || !item.image.url) {
          return []
        }

        const fallback = {
          alt: getText(item.alt, messages.galleryItems[index]?.alt ?? messages.galleryTitle),
          caption: item.caption || messages.galleryItems[index]?.caption,
          height: 1086,
          src: item.image.url,
          width: 1448,
        }
        const image = resolveImage(item.image, fallback)

        return [
          {
            ...image,
            alt: getText(item.alt, image.alt),
            caption: item.caption || image.caption,
            key: String(item.image.id),
          },
        ]
      })
      .filter((item) => Boolean(item.src)) ?? []

  if (cmsItems.length > 0) {
    return cmsItems
  }

  return fallbackGalleryImages.map((src, index) => ({
    alt: messages.galleryItems[index]?.alt ?? messages.galleryTitle,
    caption: messages.galleryItems[index]?.caption,
    height: 1086,
    key: `fallback-gallery-${index}`,
    src,
    width: 1448,
  }))
}

async function getHomePage(locale: Locale): Promise<HomePage | null> {
  try {
    const payload = await getPayload({ config })

    return await payload.findGlobal({
      slug: 'home-page',
      locale,
      fallbackLocale,
      depth: 1,
    })
  } catch (error) {
    console.error('Failed to load editable home page content.', error)

    return null
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  const messages = getMessages(locale)
  const home = messages.home
  const homePage = await getHomePage(locale)
  const heroImage = resolveImage(homePage?.heroImage, {
    alt: getText(homePage?.heroImageAlt, home.renderAlt),
    caption: getText(homePage?.heroImageCaption, home.renderCaption),
    height: 1086,
    src: fallbackHeroImages[locale],
    width: 1448,
  })
  const steps = getSteps(homePage?.steps, home.steps)
  const capabilities = getTextArray(homePage?.capabilities, home.capabilities)
  const advantages = getTextArray(homePage?.advantages, home.advantages)
  const galleryItems = getGalleryItems(homePage, locale)

  return (
    <main className="home-page">
      <section aria-labelledby="home-title" className="home-hero">
        <div className="home-hero__copy">
          <p className="eyebrow">{getText(homePage?.eyebrow, home.eyebrow)}</p>

          <h1 id="home-title">{getText(homePage?.productName, home.productName)}</h1>

          <p className="home-subtitle">{getText(homePage?.subtitle, home.subtitle)}</p>

          <p className="lede">{getText(homePage?.intro, home.intro)}</p>

          <p className="home-signal-line">{getText(homePage?.signalTitle, home.signalTitle)}</p>
        </div>

        <figure className="home-hero__media">
          <Image
            alt={heroImage.alt}
            className="home-hero__image"
            height={heroImage.height}
            priority
            sizes="(max-width: 760px) 92vw, (max-width: 1100px) 620px, 720px"
            src={heroImage.src}
            width={heroImage.width}
          />
          {heroImage.caption && <figcaption>{heroImage.caption}</figcaption>}
        </figure>
      </section>

      <section aria-labelledby="home-gallery-title" className="home-section home-gallery">
        <header>
          <p className="eyebrow">{getText(homePage?.galleryEyebrow, home.galleryEyebrow)}</p>
          <h2 id="home-gallery-title">{getText(homePage?.galleryTitle, home.galleryTitle)}</h2>
          <p>{getText(homePage?.galleryIntro, home.galleryIntro)}</p>
        </header>

        <div className="home-gallery__grid">
          {galleryItems.map((item) => (
            <figure className="home-gallery__item" key={item.key}>
              <Image
                alt={item.alt}
                className="home-gallery__image"
                height={item.height}
                sizes="(max-width: 760px) 100vw, (max-width: 1100px) 45vw, 348px"
                src={item.src}
                width={item.width}
              />

              {item.caption && <figcaption>{item.caption}</figcaption>}
            </figure>
          ))}
        </div>
      </section>

      <section aria-labelledby="home-flow-title" className="home-section home-flow">
        <header>
          <p className="eyebrow">{getText(homePage?.flowEyebrow, home.flowEyebrow)}</p>
          <h2 id="home-flow-title">{getText(homePage?.flowTitle, home.flowTitle)}</h2>
          <p>{getText(homePage?.flowIntro, home.flowIntro)}</p>
        </header>

        <ol className="home-step-list">
          {steps.map((step) => (
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
            <h2>{getText(homePage?.capabilitiesTitle, home.capabilitiesTitle)}</h2>

            <ul className="home-info-list">
              {capabilities.map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>{getText(homePage?.advantagesTitle, home.advantagesTitle)}</h2>

            <ul className="home-info-list">
              {advantages.map((advantage) => (
                <li key={advantage}>{advantage}</li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      <section aria-labelledby="home-status-title" className="home-section home-status">
        <p className="eyebrow">{getText(homePage?.statusEyebrow, home.statusEyebrow)}</p>

        <h2 id="home-status-title">{getText(homePage?.statusTitle, home.statusTitle)}</h2>

        <p>{getText(homePage?.statusText, home.statusText)}</p>
      </section>
    </main>
  )
}
