type FeatureCategoryValue =
  | {
      title?: string | null
    }
  | number
  | string
  | null
  | undefined

export function getFeatureCategoryTitle(category: FeatureCategoryValue, fallback: string) {
  if (category && typeof category === 'object' && category.title) {
    return category.title
  }

  return fallback
}
