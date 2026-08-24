import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('can go on homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await expect(page).toHaveURL(/http:\/\/localhost:3000\/(en|ru)$/)

    const heading = page.locator('h1').first()

    await expect(heading).toBeVisible()
  })

  test('can render localized roadmap', async ({ page }) => {
    await page.goto('http://localhost:3000/ru/roadmap')

    await expect(page.locator('h1')).toHaveText('Роадмап проекта')
    await expect(page.getByText('Текущий этап')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Прототип триггера молнии' })).toBeVisible()
  })
})
