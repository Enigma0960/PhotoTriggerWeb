import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'

type Props = {
  data: SerializedEditorState
}

export function RichText({ data }: Props) {
  return <PayloadRichText data={data} />
}
