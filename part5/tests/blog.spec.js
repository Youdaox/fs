import { test, expect, beforeEach, describe, afterEach } from '@playwright/test'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'youdao',
        username: 'youdao',
        password: 'salainen'
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    expect(page.getByRole('heading', { name: 'log in to application' })).toBeVisible()
    expect(page.getByRole('textbox', { name: 'username' })).toBeVisible()
    expect(page.getByRole('textbox', { name: 'password' })).toBeVisible()
    expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      const username = page.getByRole('textbox', { name: 'username' })
      const password = page.getByRole('textbox', { name: 'password' })
      await username.fill('youdao')
      await password.fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
        
      await expect(page.getByText('logged in', { exact: true })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      const username = page.getByRole('textbox', { name: 'username' })
      const password = page.getByRole('textbox', { name: 'password' })
      await username.fill('youdao')
      await password.fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()
      
      await expect(page.getByText('logged in')).not.toBeVisible()
      await expect(page.getByText('wrong credentials')).toBeVisible()
    })
  })
describe('When logged in', () => {
  beforeEach(async ({ page }) => {
    const username = page.getByRole('textbox', { name: 'username' })
    const password = page.getByRole('textbox', { name: 'password' })
    await username.fill('youdao')
    await password.fill('salainen')
    await page.getByRole('button', { name: 'login' }).click()
  })

  test('a new blog can be created', async ({ page }) => {
    const createBlog = page.getByRole('button', { name: 'create blog' })
    await createBlog.click()

    await page.getByRole('textbox', { name: 'title: '}).fill('testblog')
    await page.getByRole('textbox', { name: 'author: '}).fill('testauthor')
    await page.getByRole('textbox', { name: 'url: '}).fill('testurl')
    await page.getByRole('button', { name: 'create' }).click()
    await expect(page.locator('.blog')).toBeVisible()

  })

  describe('When logged in and a post is created', () => {
      beforeEach(async ({ page }) => {
          const createBlog = page.getByRole('button', { name: 'create blog' })
          await createBlog.click()

          await page.getByRole('textbox', { name: 'title: '}).fill('testblog')
          await page.getByRole('textbox', { name: 'author: '}).fill('testauthor')
          await page.getByRole('textbox', { name: 'url: '}).fill('testurl')
          await page.getByRole('button', { name: 'create' }).click()
      })

      test('the created blog can be liked', async ({ page }) => {
        await expect(page.getByRole('button', { name: 'view' })).toBeVisible()
        await page.getByRole('button', { name: 'view' }).click()

        expect(page.getByRole('button', { name: 'like' })).toBeVisible()
        await page.getByRole('button', { name: 'like' }).click()
      })

      test('the created blog can be deleted', async ({ page }) => {
        page.once('dialog', async dialog => {
          await dialog.accept()
        })
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'delete' })).toBeVisible()
        await page.getByRole('button', { name: 'delete' }).click()

        await expect(page.locator('.blog')).not.toBeVisible()
      })

      test('only the user who added the blog can delete', async ({ page, request }) => {
        await request.post('/api/users', {
          data: {
            name: 'anotheruser',
            username: 'anotheruser',
            password: 'salainen'
          }
        })
        await page.getByRole('button', { name: 'logout' }).click({ delay: 500 })

        await page.getByRole('textbox', { name: 'username' }).fill('anotheruser')
        await page.getByRole('textbox', { name: 'password' }).fill('salainen')
        await page.getByRole('button', { name: 'login' }).click()

        await expect(page.getByRole('button', { name: 'view' })).toBeVisible()
        await page.getByRole('button', { name: 'view' }).click()

        await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible()
      })

      test('blog sorted by most likes', async ({ page }) => {
        const createBlog = page.getByRole('button', { name: 'create blog' })
        await createBlog.click()

        await page.getByRole('textbox', { name: 'title: '}).fill('mostlikes')
        await page.getByRole('textbox', { name: 'author: '}).fill('testauthor')
        await page.getByRole('textbox', { name: 'url: '}).fill('testurl')
        await page.getByRole('button', { name: 'create' }).click()

        await expect(page.getByText(/mostlikes/)).toBeVisible()
        await page.getByRole('button', { name: 'view' }).nth(1).click()
        await page.getByRole('button', { name: 'like' }).click()

        const blogList = page.locator('.blogs_list > div')
        await expect(blogList).toHaveText([/mostlikes/, /testblog/])
      })
    })
  })
})
