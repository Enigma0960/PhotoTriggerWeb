import { fallbackLocale, isLocale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

type Props = {
    params: Promise<{
        locale: string
    }>
}

type RoadmapStage = {
    description: string
    endDate?: string | null
    endType: 'date' | 'quarter' | 'year'
    id?: string | null
    isCurrent?: boolean | null
    quarter?: 'q1' | 'q2' | 'q3' | 'q4' | null
    title: string
    year?: number | null
}

function getQuarterLabel(locale: 'en' | 'ru', quarter: RoadmapStage['quarter']) {
    const labels = {
        en: {
            q1: 'Q1',
            q2: 'Q2',
            q3: 'Q3',
            q4: 'Q4',
        },
        ru: {
            q1: 'I квартал',
            q2: 'II квартал',
            q3: 'III квартал',
            q4: 'IV квартал',
        },
    } as const

    return quarter ? labels[locale][quarter] : ''
}

function formatStageEnd(locale: 'en' | 'ru', stage: RoadmapStage) {
    if (stage.endType === 'date' && stage.endDate) {
        return new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(new Date(stage.endDate))
    }

    if (stage.endType === 'quarter') {
        return `${getQuarterLabel(locale, stage.quarter)} ${stage.year ?? ''}`.trim()
    }

    return stage.year ? String(stage.year) : ''
}

async function getRoadmap(locale: 'en' | 'ru') {
    const payload = await getPayload({ config })

    return payload.findGlobal({
        slug: 'roadmap',
        locale,
        fallbackLocale,
    })
}

export async function generateMetadata({ params }: Props) {
    const { locale } = await params

    if (!isLocale(locale)) {
        return {}
    }

    const messages = getMessages(locale)
    const roadmap = await getRoadmap(locale)

    return {
        title: roadmap.title || messages.roadmap.title,
        description: roadmap.intro || messages.roadmap.intro,
    }
}

export default async function RoadmapPage({ params }: Props) {
    const { locale } = await params

    if (!isLocale(locale)) {
        notFound()
    }

    const messages = getMessages(locale)
    const roadmap = await getRoadmap(locale)
    const stages = (roadmap.stages ?? []) as RoadmapStage[]
    const currentIndex = stages.findIndex((stage) => stage.isCurrent)

    return (
        <main>
            <header>
                <p>Project Iris</p>
                <h1>{roadmap.title || messages.roadmap.title}</h1>
                <p>{roadmap.intro || messages.roadmap.intro}</p>
            </header>

            {stages.length === 0 ? (
                <section className="roadmap-empty">
                    <p>{messages.roadmap.empty}</p>
                </section>
            ) : (
                <ol className="roadmap-timeline">
                    {stages.map((stage, index) => {
                        const status =
                            currentIndex === -1
                                ? 'planned'
                                : index < currentIndex
                                  ? 'completed'
                                  : index === currentIndex
                                    ? 'current'
                                    : 'planned'
                        const statusLabel = messages.roadmap[status]

                        return (
                            <li className={`roadmap-stage roadmap-stage--${status}`} key={stage.id ?? `${stage.title}-${index}`}>
                                <article className="roadmap-card">
                                    <div className="roadmap-card__meta">
                                        <time>{formatStageEnd(locale, stage)}</time>
                                        <span>{statusLabel}</span>
                                    </div>

                                    <h2>{stage.title}</h2>
                                    <p>{stage.description}</p>
                                </article>

                                <div aria-hidden="true" className="roadmap-node">
                                    <span />
                                </div>
                            </li>
                        )
                    })}
                </ol>
            )}
        </main>
    )
}
