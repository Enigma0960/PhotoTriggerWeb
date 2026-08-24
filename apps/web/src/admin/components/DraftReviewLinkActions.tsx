'use client'

import { useField } from '@payloadcms/ui'
import { useMemo, useState } from 'react'

type Props = {
  path: string
}

function getAbsoluteReviewUrl(value: string | undefined) {
  if (!value) {
    return ''
  }

  return new URL(value, window.location.origin).toString()
}

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value)
      return
    } catch {
      // Fall back for browsers that expose Clipboard API but deny writes.
    }
  }

  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.setAttribute('readonly', 'true')
  textarea.style.position = 'fixed'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}

export function DraftReviewLinkActions({ path }: Props) {
  const [copied, setCopied] = useState(false)
  const { value } = useField<string>({ path })
  const href = useMemo(() => getAbsoluteReviewUrl(value), [value])
  const disabled = !href

  async function handleCopy() {
    if (!href) {
      return
    }

    await copyText(href)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  function handleOpen() {
    if (!href) {
      return
    }

    window.open(href, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="iris-inline-actions">
      <button
        className="iris-inline-actions__button"
        disabled={disabled}
        onClick={handleCopy}
        type="button"
      >
        {copied ? 'Ссылка скопирована' : 'Скопировать ссылку'}
      </button>
      <button
        className="iris-inline-actions__button"
        disabled={disabled}
        onClick={handleOpen}
        type="button"
      >
        Открыть в новой вкладке
      </button>
    </div>
  )
}
