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

  test('can render dev blog and hide drafts from the public list', async ({ page }) => {
    await page.goto('http://localhost:3000/ru/dev-blog')

    await expect(page.locator('h1')).toHaveText('Dev-blog')
    await expect(page.getByRole('heading', { name: 'Dev-blog начинается здесь' })).toBeVisible()
    await expect(page.getByText('Процесс вычитки черновика')).toHaveCount(0)

    await page.getByRole('link', { name: 'Dev-blog начинается здесь' }).click()
    await expect(page).toHaveURL('http://localhost:3000/ru/dev-blog/dev-blog-start')
    await expect(page.getByRole('heading', { name: 'Dev-blog начинается здесь' })).toBeVisible()
  })
})
